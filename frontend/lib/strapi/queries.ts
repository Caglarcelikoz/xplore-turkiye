/**
 * Strapi Query Functions
 * Pre-configured queries for fetching content from Strapi
 */

import { getSingleType, getEntries, getEntryBySlug } from "./client";
import type { LandingPage, Global } from "../../types/strapi";

/**
 * Get landing page data
 * Optimized: Uses field selection and specific populate to reduce payload
 */
export async function getLandingPage(): Promise<LandingPage | null> {
  return getSingleType<LandingPage>("landing-page", {
    fields: ["title", "description"], // Only scalar fields - relations go in populate
    populate: [
      "blocks.background",
      "blocks.image",
      "blocks.links",
      "blocks.stats",
      "blocks.badge",
    ],
    revalidate: 60, // 1 minute cache
  });
}

/**
 * Get global site settings including contact info and social links
 * Optimized: Uses field selection and specific populate to reduce payload
 */
export async function getGlobal(): Promise<Global | null> {
  return getSingleType<Global>("global", {
    fields: ["siteName", "siteDescription"], // Only scalar fields - relations go in populate
    populate: ["favicon", "defaultSeo", "contactInfo", "socialLinks"],
    revalidate: 300, // 5 minutes cache (global data changes infrequently)
  });
}

// Re-export getEntries for use in pages
export { getEntries } from "./client";

// Future query functions can be added here:
// - getPageBySlug()
// - getTrips()
// - getTripBySlug()
// - etc.
