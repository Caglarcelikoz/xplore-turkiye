/**
 * Static Content (Temporary CMS Replacement)
 *
 * This file contains static data that mimics Strapi API responses.
 * Used when NEXT_PUBLIC_USE_CMS is set to "false".
 *
 * Structure matches types from @/types/strapi to ensure type safety.
 * To re-enable CMS: Set NEXT_PUBLIC_USE_CMS=true in .env.local
 */

import type { LandingPage, Global } from "@/types/strapi";

/**
 * Static landing page data (mimics Strapi API response)
 * Used when NEXT_PUBLIC_USE_CMS is false
 */
export const staticLandingPage: LandingPage = {
  id: 1,
  documentId: "static-landing-page",
  attributes: {
    title: "Xplore Turkiye - Ontdek de Mooiste Reizen naar Turkije",
    description: "Groepsreizen en maatwerk avonturen door Turkije",
    blocks: [
      {
        __component: "blocks.hero",
        id: 1,
        heading: "Ontdek de Mooiste",
        heading2: "Reizen naar Turkije",
        text: "<p>Van groepsreizen tot maatwerk avonturen. Beleef Turkije zoals het bedoeld is.</p>",
        links: [
          {
            id: 1,
            href: "/reizen",
            label: "Ontdek Onze Reizen",
            isExternal: false,
            isButtonLink: true,
            type: "PRIMARY",
          },
          {
            id: 2,
            href: "/contact",
            label: "Neem Contact Op",
            isExternal: false,
            isButtonLink: true,
            type: "SECONDARY",
          },
        ],
        background: undefined, // Will use fallback image in mapper
        stats: [
          {
            id: 1,
            icon: "MAP_PIN",
            label: "5 Regio's",
            value: "Turkije",
          },
          {
            id: 2,
            icon: "CALENDAR",
            label: "12+ Reizen",
            value: "Beschikbaar",
          },
          {
            id: 3,
            icon: "USERS",
            label: "100%",
            value: "Tevreden Klanten",
          },
        ],
      },
    ],
  },
};

/**
 * Static global settings (mimics Strapi API response)
 * Used when NEXT_PUBLIC_USE_CMS is false
 */
export const staticGlobal: Global = {
  id: 1,
  documentId: "static-global",
  attributes: {
    siteName: "Xplore Turkiye",
    siteDescription: "Ontdek de mooiste reizen naar Turkije",
    contactInfo: {
      id: 1,
      phone: "+32 3 886 04 00",
      email: "info@xploreturkiye.be",
      address: "Dokter Persoonslaan 8, 2830 Willebroek",
      openingHours: [
        { day: "Maandag – Vrijdag", time: "09:00 – 18:00" },
        { day: "Zaterdag", time: "Gesloten" },
        { day: "Zondag", time: "Gesloten" },
      ],
    },
    socialLinks: {
      id: 1,
      instagram: "https://instagram.com/xploreturkiye",
      facebook: "https://facebook.com/xploreturkiye",
      linkedin: "https://linkedin.com/company/xploreturkiye",
      tiktok: "https://tiktok.com/@xploreturkiye",
    },
    favicon: undefined,
    defaultSeo: undefined,
  },
};
