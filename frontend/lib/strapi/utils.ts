/**
 * Strapi Utility Functions
 * Helper functions for working with Strapi data
 */

/**
 * Strapi Media object structure
 */
export interface StrapiMedia {
  data?: {
    id: number;
    documentId: string;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats?: {
        thumbnail?: MediaFormat;
        small?: MediaFormat;
        medium?: MediaFormat;
        large?: MediaFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: unknown;
    };
  } | null;
  // Strapi v5 sometimes returns images directly (flattened structure)
  id?: number;
  documentId?: string;
  url?: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

/**
 * Type guard to check if an object is a Strapi media object
 */
export function isStrapiMedia(value: unknown): value is StrapiMedia {
  if (!value || typeof value !== "object") {
    return false;
  }

  // Check for nested structure (Strapi v4 style)
  if ("data" in value) {
    return true;
  }

  // Check for flattened structure (Strapi v5 style)
  if ("url" in value || ("id" in value && "documentId" in value)) {
    return true;
  }

  return false;
}

/**
 * Get the base URL for Strapi media
 * Supports both NEXT_PUBLIC_STRAPI_API_URL and NEXT_PUBLIC_STRAPI_URL
 */
function getStrapiBaseUrl(): string {
  // Try NEXT_PUBLIC_STRAPI_URL first (without /api)
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (strapiUrl) {
    return strapiUrl;
  }

  // Fallback to NEXT_PUBLIC_STRAPI_API_URL and remove /api suffix
  const apiUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
  return apiUrl.replace(/\/api$/, "");
}

/**
 * Get full URL for a Strapi media file
 * Handles both relative and absolute URLs
 * Ensures proper URL encoding for Next.js Image component
 */
function getFullMediaUrl(url: string): string {
  if (!url) {
    return "";
  }

  // If already absolute URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If starts with /, it's a relative path from Strapi root
  if (url.startsWith("/")) {
    const baseUrl = getStrapiBaseUrl();
    const fullUrl = `${baseUrl}${url}`;
    // Ensure URL is properly formatted (no double slashes except after protocol)
    return fullUrl.replace(/([^:]\/)\/+/g, "$1");
  }

  // Otherwise, prepend base URL
  const baseUrl = getStrapiBaseUrl();
  const fullUrl = `${baseUrl}/${url}`;
  // Ensure URL is properly formatted (no double slashes except after protocol)
  return fullUrl.replace(/([^:]\/)\/+/g, "$1");
}

/**
 * Get Strapi media URL
 * Returns the URL for a Strapi media object, with optional format selection
 */
export function getStrapiMediaUrl(
  media: StrapiMedia | null | undefined,
  format: "thumbnail" | "small" | "medium" | "large" | "original" = "original"
): string | null {
  if (!media) {
    return null;
  }

  // Handle nested structure (Strapi v4 style)
  if (media.data) {
    if (!media.data.attributes) {
      return null;
    }

    const attrs = media.data.attributes;

    // If format is specified and exists, use it
    if (format !== "original" && attrs.formats?.[format]) {
      return getFullMediaUrl(attrs.formats[format].url);
    }

    // Otherwise use original URL
    return getFullMediaUrl(attrs.url);
  }

  // Handle flattened structure (Strapi v5 style)
  if (media.url) {
    return getFullMediaUrl(media.url);
  }

  return null;
}

/**
 * Get Strapi image URL with format selection
 * Alias for getStrapiMediaUrl with better naming for images
 */
export function getStrapiImageUrl(
  media: StrapiMedia | null | undefined,
  format: "thumbnail" | "small" | "medium" | "large" | "original" = "original"
): string | null {
  return getStrapiMediaUrl(media, format);
}

/**
 * Get alternative text from Strapi media
 */
export function getStrapiMediaAlt(
  media: StrapiMedia | null | undefined
): string {
  if (!media) {
    return "";
  }

  // Handle nested structure
  if (media.data?.attributes?.alternativeText) {
    return media.data.attributes.alternativeText;
  }

  // Handle flattened structure
  if (media.alternativeText) {
    return media.alternativeText;
  }

  return "";
}

/**
 * Get image dimensions from Strapi media
 */
export function getStrapiMediaDimensions(
  media: StrapiMedia | null | undefined
): { width: number; height: number } | null {
  if (!media) {
    return null;
  }

  // Handle nested structure
  if (media.data?.attributes) {
    return {
      width: media.data.attributes.width,
      height: media.data.attributes.height,
    };
  }

  // Handle flattened structure
  if (media.width && media.height) {
    return {
      width: media.width,
      height: media.height,
    };
  }

  return null;
}

/**
 * Extract plain text from Strapi rich text (richtext field)
 * Simple implementation - can be extended with proper rich text parsing
 * Server-safe implementation (no DOM usage)
 */
export function extractPlainText(richtext: string | null | undefined): string {
  if (!richtext) {
    return "";
  }

  // Remove HTML tags
  let text = richtext.replace(/<[^>]*>/g, "");

  // Decode common HTML entities (server-safe)
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
  };

  text = text.replace(/&[#\w]+;/g, (entity) => {
    return entities[entity] || entity;
  });

  // Clean up whitespace
  return text.trim().replace(/\s+/g, " ");
}
