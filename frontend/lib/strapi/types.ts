/**
 * Strapi API Types
 * Base types for Strapi v5 API responses and entities
 */

/**
 * Strapi API Response wrapper
 */
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Strapi Error response structure
 */
export interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Raw Strapi v5 entity structure (attributes at top level)
 */
export interface RawStrapiEntity {
  id: number;
  documentId: string;
  [key: string]: unknown;
}

/**
 * Transformed Strapi entity structure (with attributes nested)
 * Used for backward compatibility and consistent structure
 */
export interface StrapiEntity<T = unknown> {
  id: number;
  documentId: string;
  attributes: T;
}

/**
 * Type for nested populate structure
 * Supports both simple array format and advanced object format
 */
export type PopulateOption =
  | string[]
  | Record<string, { fields?: string[]; populate?: PopulateOption }>;

/**
 * Options for fetching entries
 */
export interface FetchOptions {
  populate?: PopulateOption;
  fields?: string[];
  revalidate?: number;
}

/**
 * Options for fetching multiple entries
 */
export interface GetEntriesOptions extends FetchOptions {
  filters?: Record<string, unknown>;
  sort?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}
