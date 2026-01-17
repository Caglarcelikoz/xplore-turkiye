/**
 * Hero Block Mapper
 * Transforms Strapi hero block data to HeroSection component props
 */

import { extractPlainText, getStrapiImageUrl } from "../utils";
import type { BlockHero, SharedLink } from "../../../types/strapi";
import type { StrapiIconType } from "./icons";
import { isValidIconType } from "./icons";

/**
 * Map Strapi link type to button variant
 */
function getButtonVariant(
  linkType?: SharedLink["type"]
): "default" | "outline" {
  switch (linkType) {
    case "PRIMARY":
      return "default";
    case "SECONDARY":
    case "TERTIARY":
      return "outline";
    default:
      return "default";
  }
}

/**
 * Transform Strapi hero block to HeroSection props
 */
export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  badgeText?: string;
  primaryButton: {
    text: string;
    link: string;
    isExternal?: boolean;
  };
  secondaryButton?: {
    text: string;
    link: string;
    isExternal?: boolean;
  };
  stats: Array<{
    icon?: StrapiIconType; // Icon name (optional - only render if present)
    label: string;
    value: string;
  }>;
}

export function mapHeroBlockToProps(block: BlockHero): HeroSectionProps {
  // Use heading and heading2 directly
  const title = block.heading || "";
  const subtitle = block.heading2 || "";

  // Extract plain text from rich text
  const description = extractPlainText(block.text || "");

  // Get background image URL
  const backgroundImage =
    getStrapiImageUrl(block.background, "original") ||
    getStrapiImageUrl(block.background, "large") ||
    "/cappadocie2.jpg"; // Fallback

  // Process links - first is primary, second is secondary
  const links = block.links || [];
  const primaryLink =
    links.find((link) => link.isButtonLink && link.type === "PRIMARY") ||
    links[0];
  const secondaryLink =
    links.find(
      (link) =>
        link.isButtonLink &&
        (link.type === "SECONDARY" || link.type === "TERTIARY")
    ) || links[1];

  // Map stats with icon names (not components - components can't be serialized)
  // Only include icon if it exists and is valid
  const stats = (block.stats || []).map((stat) => {
    const statData: {
      icon?: StrapiIconType;
      label: string;
      value: string;
    } = {
      label: stat.label || "",
      value: stat.value || "",
    };

    // Only add icon if it exists and is valid
    if (stat.icon && isValidIconType(stat.icon)) {
      statData.icon = stat.icon;
    }

    return statData;
  });

  return {
    title: title || "Ontdek de Mooiste",
    subtitle: subtitle || "Reizen naar Turkije",
    description: description || "Van groepsreizen tot maatwerk avonturen.",
    backgroundImage,
    badgeText: "✈️ Ontdek Turkije met Vertrouwen", // Could come from Strapi in future
    primaryButton: primaryLink
      ? {
          text: primaryLink.label || "Ontdek Onze Reizen",
          link: primaryLink.href || "/reizen",
          isExternal: primaryLink.isExternal || false,
        }
      : {
          text: "Ontdek Onze Reizen",
          link: "/reizen",
          isExternal: false,
        },
    secondaryButton: secondaryLink
      ? {
          text: secondaryLink.label || "Reis Aanvragen",
          link: secondaryLink.href || "/contact",
          isExternal: secondaryLink.isExternal || false,
        }
      : undefined,
    stats:
      stats.length > 0
        ? stats
        : [
            {
              icon: "MAP_PIN" as StrapiIconType,
              label: "5 Regio's",
              value: "Turkije",
            },
            {
              icon: "CALENDAR" as StrapiIconType,
              label: "12+ Reizen",
              value: "Beschikbaar",
            },
            {
              icon: "USERS" as StrapiIconType,
              label: "100%",
              value: "Tevreden Klanten",
            },
          ],
  };
}
