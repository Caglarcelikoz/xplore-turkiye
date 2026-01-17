/**
 * Media Mapper
 * Transforms Strapi media objects to Next.js Image compatible format
 */

import {
  getStrapiImageUrl,
  getStrapiMediaAlt,
  getStrapiMediaDimensions,
} from "../utils";
import type { StrapiMedia } from "../utils";

/**
 * Get image URL for Next.js Image component
 * Returns the best available format (prefers medium, falls back to original)
 */
export function getImageUrl(
  media: StrapiMedia | null | undefined,
  format: "thumbnail" | "small" | "medium" | "large" | "original" = "medium"
): string | null {
  return getStrapiImageUrl(media, format);
}

/**
 * Get alt text for image
 */
export function getImageAlt(media: StrapiMedia | null | undefined): string {
  return getStrapiMediaAlt(media);
}

/**
 * Get image dimensions for Next.js Image component
 */
export function getImageDimensions(
  media: StrapiMedia | null | undefined
): { width: number; height: number } | null {
  return getStrapiMediaDimensions(media);
}

/**
 * Get complete image props for Next.js Image component
 */
export function getImageProps(media: StrapiMedia | null | undefined) {
  const url = getImageUrl(media, "medium") || getImageUrl(media, "original");
  const alt = getImageAlt(media);
  const dimensions = getImageDimensions(media);

  return {
    src: url || "",
    alt: alt || "",
    width: dimensions?.width,
    height: dimensions?.height,
  };
}
