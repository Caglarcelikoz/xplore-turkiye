/**
 * Strapi API Client
 * Handles all API requests to Strapi CMS v5
 */

import type {
  StrapiResponse,
  StrapiError,
  RawStrapiEntity,
  PopulateOption,
  FetchOptions,
  GetEntriesOptions,
} from "./types";

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Transform Strapi v5 raw entity to structured format
 */
function transformStrapiEntity<T>(data: RawStrapiEntity): {
  id: number;
  documentId: string;
  attributes: T;
} {
  const { id, documentId, ...attributes } = data;
  return {
    id,
    documentId,
    attributes: attributes as T,
  };
}

/**
 * Fetch data from Strapi API with error handling
 */
async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit & { next?: { revalidate?: number } } = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add API token if available
  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  // Extract next options and default revalidation
  const { next: nextOptions, ...fetchOptions } = options;
  const revalidate = nextOptions?.revalidate ?? 60; // Default 60 seconds

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      // Enable caching with configurable revalidation
      next: { revalidate },
    });

    if (!response.ok) {
      // Don't throw error for 404s, just return null data
      if (response.status === 404) {
        return { data: null } as StrapiResponse<T>;
      }

      const error: StrapiError = await response.json().catch(() => ({
        error: {
          status: response.status,
          name: "Error",
          message: response.statusText,
        },
      }));

      throw new Error(
        `Strapi API Error: ${error.error?.message || response.statusText} (${
          response.status
        })`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // If it's a network error or connection issue, return null data instead of throwing
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("Failed to connect to Strapi API. Is Strapi running?");
      return { data: null } as StrapiResponse<T>;
    }

    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch data from Strapi");
  }
}

/**
 * Get single type entry
 * Strapi v5 returns single types with attributes at the top level
 * Accepts both array (backward compatible) and object (optimized) formats
 */
export async function getSingleType<T>(
  contentType: string,
  populate?: string[] | FetchOptions
): Promise<T | null> {
  // Handle backward compatibility: if populate is an array, convert to options
  const options: FetchOptions = Array.isArray(populate)
    ? { populate }
    : populate || {};

  try {
    const params = new URLSearchParams();

    // Field selection
    if (options.fields && options.fields.length > 0) {
      params.append("fields", options.fields.join(","));
    }

    // Populate handling
    if (options.populate) {
      if (Array.isArray(options.populate)) {
        // Add each populate item separately for Strapi v5
        options.populate.forEach((item) => {
          params.append("populate", item);
        });
      } else {
        // For regular relations, use structured format
        Object.entries(options.populate).forEach(([key, value]) => {
          if (value.fields && value.fields.length > 0) {
            params.append(`populate[${key}][fields]`, value.fields.join(","));
          }
          if (value.populate) {
            if (Array.isArray(value.populate)) {
              params.append(
                `populate[${key}][populate]`,
                value.populate.join(",")
              );
            } else {
              // Nested populate object
              Object.entries(value.populate).forEach(
                ([nestedKey, nestedValue]) => {
                  if (typeof nestedValue === "object" && nestedValue.fields) {
                    params.append(
                      `populate[${key}][populate][${nestedKey}][fields]`,
                      nestedValue.fields.join(",")
                    );
                  }
                  if (
                    typeof nestedValue === "object" &&
                    nestedValue.populate &&
                    Array.isArray(nestedValue.populate)
                  ) {
                    params.append(
                      `populate[${key}][populate][${nestedKey}][populate]`,
                      nestedValue.populate.join(",")
                    );
                  }
                }
              );
            }
          } else {
            params.append("populate", key);
          }
        });
      }
    }

    const queryString = params.toString();
    const endpoint = `/${contentType}${queryString ? `?${queryString}` : ""}`;
    const fetchOptions = options.revalidate
      ? { next: { revalidate: options.revalidate } }
      : {};

    const response = await fetchStrapi<RawStrapiEntity>(endpoint, fetchOptions);

    // Handle case where response.data might be null or undefined
    if (!response || !response.data) {
      return null;
    }

    // Strapi v5 returns single types with attributes at top level
    // Transform to match our expected structure: { id, documentId, attributes: {...} }
    const data = response.data;
    if (
      data &&
      "id" in data &&
      "documentId" in data &&
      !("attributes" in data)
    ) {
      return transformStrapiEntity<T>(data) as T;
    }

    return response.data as T;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return null;
  }
}

/**
 * Get all entries with optional filters and populate
 * Optimized with field selection and selective population
 */
export async function getEntries<T>(
  contentType: string,
  options: GetEntriesOptions = {}
): Promise<{ data: T[]; meta?: StrapiResponse<T>["meta"] }> {
  const params = new URLSearchParams();

  // Field selection - only fetch needed fields
  if (options.fields && options.fields.length > 0) {
    params.append("fields", options.fields.join(","));
  }

  // Advanced populate with field selection
  if (options.populate) {
    if (Array.isArray(options.populate)) {
      // Add each populate item separately for Strapi v5
      options.populate.forEach((item) => {
        params.append("populate", item);
      });
    } else {
      // Advanced populate object with field selection
      const populateEntries = Object.entries(options.populate);
      populateEntries.forEach(([key, value]) => {
        // Type guard: check if value is an object with populate/fields
        if (
          typeof value === "object" &&
          value !== null &&
          ("populate" in value || "fields" in value)
        ) {
          if (
            "fields" in value &&
            Array.isArray(value.fields) &&
            value.fields.length > 0
          ) {
            params.append(`populate[${key}][fields]`, value.fields.join(","));
          }
          if ("populate" in value && value.populate) {
            if (Array.isArray(value.populate)) {
              params.append(
                `populate[${key}][populate]`,
                value.populate.join(",")
              );
            } else {
              // Nested populate object
              Object.entries(value.populate).forEach(
                ([nestedKey, nestedValue]) => {
                  if (
                    typeof nestedValue === "object" &&
                    nestedValue !== null &&
                    "fields" in nestedValue &&
                    Array.isArray(nestedValue.fields)
                  ) {
                    params.append(
                      `populate[${key}][populate][${nestedKey}][fields]`,
                      nestedValue.fields.join(",")
                    );
                  }
                  if (
                    typeof nestedValue === "object" &&
                    nestedValue !== null &&
                    "populate" in nestedValue &&
                    Array.isArray(nestedValue.populate)
                  ) {
                    params.append(
                      `populate[${key}][populate][${nestedKey}][populate]`,
                      nestedValue.populate.join(",")
                    );
                  }
                }
              );
            }
          }
        } else {
          params.append("populate", key);
        }
      });
    }
  }

  // Filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      // Handle nested filters like "author.id"
      if (key.includes(".")) {
        const [relation, field] = key.split(".");
        params.append(`filters[${relation}][${field}][$eq]`, String(value));
      } else {
        params.append(`filters[${key}][$eq]`, String(value));
      }
    });
  }

  // Sort
  if (options.sort && options.sort.length > 0) {
    params.append("sort", options.sort.join(","));
  }

  // Pagination
  if (options.pagination) {
    if (options.pagination.page) {
      params.append("pagination[page]", String(options.pagination.page));
    }
    if (options.pagination.pageSize) {
      params.append(
        "pagination[pageSize]",
        String(options.pagination.pageSize)
      );
    }
  }

  const queryString = params.toString();
  const endpoint = `/${contentType}${queryString ? `?${queryString}` : ""}`;

  // Use custom revalidation if provided
  const fetchOptions = options.revalidate
    ? { next: { revalidate: options.revalidate } }
    : {};

  const response = await fetchStrapi<RawStrapiEntity[]>(endpoint, fetchOptions);

  // Transform collection type responses to match expected structure
  const transformedData = (
    Array.isArray(response.data) ? response.data : []
  ).map((item) => {
    if (item && item.id && !item.attributes) {
      return transformStrapiEntity<T>(item);
    }
    return item;
  });

  return {
    data: transformedData as T[],
    meta: response.meta,
  };
}

/**
 * Get single entry by slug
 * Strapi v5 returns collection types with attributes at the top level
 * Accepts both array (backward compatible) and object (optimized) formats
 */
export async function getEntryBySlug<T>(
  contentType: string,
  slug: string,
  populate?: string[] | FetchOptions
): Promise<T | null> {
  // Handle backward compatibility: if populate is an array, convert to options
  const options: FetchOptions = Array.isArray(populate)
    ? { populate }
    : populate || {};

  const params = new URLSearchParams();
  params.append("filters[slug][$eq]", slug);

  // Field selection
  if (options.fields && options.fields.length > 0) {
    params.append("fields", options.fields.join(","));
  }

  // Populate handling
  if (options.populate) {
    if (Array.isArray(options.populate)) {
      // Add each populate item separately for Strapi v5
      options.populate.forEach((item) => {
        params.append("populate", item);
      });
    } else {
      // For regular relations, use structured format
      Object.entries(options.populate).forEach(([key, value]) => {
        // Type guard: check if value is an object with populate/fields
        if (
          typeof value === "object" &&
          value !== null &&
          ("populate" in value || "fields" in value)
        ) {
          if (
            "fields" in value &&
            Array.isArray(value.fields) &&
            value.fields.length > 0
          ) {
            params.append(`populate[${key}][fields]`, value.fields.join(","));
          }
          if ("populate" in value && value.populate) {
            if (Array.isArray(value.populate)) {
              params.append(
                `populate[${key}][populate]`,
                value.populate.join(",")
              );
            } else {
              // Nested populate object
              Object.entries(value.populate).forEach(
                ([nestedKey, nestedValue]) => {
                  if (
                    typeof nestedValue === "object" &&
                    nestedValue !== null &&
                    "fields" in nestedValue &&
                    Array.isArray(nestedValue.fields)
                  ) {
                    params.append(
                      `populate[${key}][populate][${nestedKey}][fields]`,
                      nestedValue.fields.join(",")
                    );
                  }
                  if (
                    typeof nestedValue === "object" &&
                    nestedValue !== null &&
                    "populate" in nestedValue &&
                    Array.isArray(nestedValue.populate)
                  ) {
                    params.append(
                      `populate[${key}][populate][${nestedKey}][populate]`,
                      nestedValue.populate.join(",")
                    );
                  }
                }
              );
            }
          }
        } else {
          params.append("populate", key);
        }
      });
    }
  }

  const queryString = params.toString();
  const fetchOptions = options.revalidate
    ? { next: { revalidate: options.revalidate } }
    : {};

  const response = await fetchStrapi<RawStrapiEntity | RawStrapiEntity[]>(
    `/${contentType}?${queryString}`,
    fetchOptions
  );

  if (
    !response.data ||
    (Array.isArray(response.data) && response.data.length === 0)
  ) {
    return null;
  }

  const data = Array.isArray(response.data) ? response.data[0] : response.data;

  // Transform collection type response to match expected structure
  if (data && "id" in data && "documentId" in data && !("attributes" in data)) {
    return transformStrapiEntity<T>(data) as T;
  }

  return data as T;
}

/**
 * Create a new entry in Strapi
 * Used for creating content like newsletter subscriptions
 */
export async function createEntry<T>(
  contentType: string,
  data: Record<string, unknown>
): Promise<T | null> {
  const url = `${STRAPI_API_URL}/${contentType}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add API token if available (required for creating entries)
  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  } else {
    console.warn("STRAPI_API_TOKEN not set. Creating entries may fail.");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ data }),
      // Don't cache POST requests
      cache: "no-store",
    });

    if (!response.ok) {
      const error: StrapiError = await response.json().catch(() => ({
        error: {
          status: response.status,
          name: "Error",
          message: response.statusText,
        },
      }));

      throw new Error(
        `Strapi API Error: ${error.error?.message || response.statusText} (${
          response.status
        })`
      );
    }

    const result = await response.json();

    // Handle Strapi v5 response structure
    if (result.data) {
      const responseData = result.data;
      // If attributes are at top level, transform to expected structure
      if (
        responseData &&
        "id" in responseData &&
        "documentId" in responseData &&
        !("attributes" in responseData)
      ) {
        return transformStrapiEntity<T>(responseData) as T;
      }
      return responseData as T;
    }

    return null;
  } catch (error) {
    console.error(`Error creating ${contentType}:`, error);
    throw error;
  }
}

// Export types and internal fetch function for advanced use cases
export { fetchStrapi };
export type {
  StrapiResponse,
  StrapiError,
  PopulateOption,
  FetchOptions,
  GetEntriesOptions,
};
