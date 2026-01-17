/**
 * About Block Mapper
 * Transforms Strapi about block data to AboutSection component props
 */

import { getStrapiImageUrl, extractPlainText } from "../utils";
import type { BlockAbout } from "../../../types/strapi";
import type { StrapiIconType } from "./icons";
import { isValidIconType } from "./icons";

/**
 * Transform Strapi about block to AboutSection props
 */
export interface AboutSectionProps {
  badge?: {
    icon?: StrapiIconType;
    label: string;
  };
  title: string;
  description: string; // Markdown string
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

export function mapAboutBlockToProps(block: BlockAbout): AboutSectionProps {
  // Get badge data
  const badge = block.badge
    ? {
        icon: block.badge.icon && isValidIconType(block.badge.icon) 
          ? block.badge.icon 
          : undefined,
        label: block.badge.label || "",
      }
    : undefined;

  // Get title
  const title = block.title || "";

  // Get description (markdown string)
  const description = block.description || "";

  // Get image
  const imageUrl =
    getStrapiImageUrl(block.image, "large") ||
    getStrapiImageUrl(block.image, "original") ||
    "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80"; // Fallback

  const imageAlt = block.image
    ? (block.image.data?.attributes?.alternativeText ||
       block.image.alternativeText ||
       title ||
       "About Xplore Turkiye")
    : "About Xplore Turkiye";

  const imageDimensions = block.image
    ? (block.image.data?.attributes
        ? {
            width: block.image.data.attributes.width,
            height: block.image.data.attributes.height,
          }
        : block.image.width && block.image.height
        ? {
            width: block.image.width,
            height: block.image.height,
          }
        : undefined)
    : undefined;

  return {
    badge,
    title: title || "Over Xplore Turkiye & Beyond",
    description: description || "",
    image: {
      url: imageUrl,
      alt: imageAlt,
      ...imageDimensions,
    },
  };
}

