/**
 * TypeScript types for Strapi content types and components
 * These types match the Strapi v5 schema structure
 */

import type { StrapiMedia } from "../lib/strapi/utils";
import type { StrapiIconType } from "../lib/strapi/mappers/icons";

// ============================================================================
// Shared Components
// ============================================================================

/**
 * Shared Link Component
 * Used in various places for navigation and CTAs
 */
export interface SharedLink {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type?: "PRIMARY" | "SECONDARY" | "TERTIARY";
}

/**
 * Contact Info Component
 * Reusable contact information (phone, email, address)
 */
export interface SharedContactInfo {
  id: number;
  phone: string;
  email: string;
  address: string;
  openingHours?:
    | Array<{
        day: string;
        time: string;
      }>
    | unknown; // JSON field can be any structure
}

/**
 * Social Links Component
 * Reusable social media links
 */
export interface SharedSocialLinks {
  id: number;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  tiktok?: string;
}

// ============================================================================
// Block Components
// ============================================================================

/**
 * Stats Component
 * Used in hero blocks to display statistics
 */
export interface BlockStats {
  id: number;
  icon: StrapiIconType;
  label: string;
  value: string;
}

/**
 * Shared Badge Component
 * Used in various blocks for badges/labels
 */
export interface SharedBadge {
  id: number;
  icon?: StrapiIconType;
  label: string;
}

/**
 * Hero Block Component
 * Main hero section with heading, text, links, background image, and stats
 */
export interface BlockHero {
  __component: "blocks.hero";
  id: number;
  heading: string;
  heading2?: string; // Optional second heading line
  text: string; // Rich text (richtext)
  links?: SharedLink[];
  background?: StrapiMedia;
  stats?: BlockStats[];
}

/**
 * About Us Block Component
 * About section with badge, title, description, and image
 */
export interface BlockAbout {
  __component: "blocks.about-us";
  id: number;
  badge?: SharedBadge;
  title: string;
  description: string; // Rich text (richtext)
  image?: StrapiMedia;
}

// ============================================================================
// Dynamic Zone Block Union Type
// ============================================================================

/**
 * Union type for all possible block components in Dynamic Zones
 * Add new block types here as they are created
 */
export type DynamicZoneBlock = BlockHero | BlockAbout;

// ============================================================================
// Content Types
// ============================================================================

/**
 * Landing Page Single Type
 * Contains the home page content with Dynamic Zone blocks
 */
export interface LandingPage {
  id: number;
  documentId: string;
  attributes: {
    title: string;
    description: string;
    blocks?: DynamicZoneBlock[];
  };
}

/**
 * Global Single Type
 * Contains global site settings including contact info and social links
 */
export interface Global {
  id: number;
  documentId: string;
  attributes: {
    siteName: string;
    siteDescription: string;
    favicon?: StrapiMedia;
    defaultSeo?: {
      metaTitle: string;
      metaDescription: string;
      shareImage?: StrapiMedia;
    };
    contactInfo?: SharedContactInfo;
    socialLinks?: SharedSocialLinks;
  };
}

// ============================================================================
// Helper Types
// ============================================================================

/**
 * Type guard to check if a block is a Hero block
 */
export function isHeroBlock(block: DynamicZoneBlock): block is BlockHero {
  return block.__component === "blocks.hero";
}

/**
 * Type guard to check if a block is an About block
 */
export function isAboutBlock(block: DynamicZoneBlock): block is BlockAbout {
  return block.__component === "blocks.about-us";
}
