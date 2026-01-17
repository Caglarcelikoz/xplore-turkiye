/**
 * Icon Mapper
 * Maps Strapi icon enum values to Lucide React icon components
 * Reusable across all components
 */

import {
  MapPin,
  Calendar,
  Users,
  Star,
  Award,
  Globe,
  Heart,
  Sparkles,
  Shield,
  CheckCircle,
  Headphones,
  MessageSquare,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

/**
 * Strapi icon enum values
 * Add new icon types here as they are added to Strapi
 */
export type StrapiIconType =
  | "MAP_PIN"
  | "CALENDAR"
  | "USERS"
  | "STAR"
  | "AWARD"
  | "GLOBE"
  | "HEART"
  | "SPARKLES"
  | "SHIELD"
  | "CHECK_CIRCLE"
  | "HEADPHONES"
  | "MESSAGE_SQUARE"
  | "CHECK_CIRCLE_2";

/**
 * Default icon type to use when icon is missing or invalid
 */
export const DEFAULT_ICON_TYPE: StrapiIconType = "MAP_PIN";

/**
 * Icon mapping from Strapi enum to Lucide React icons
 * Extend this map when adding new icon types
 */
const ICON_MAP: Record<StrapiIconType, LucideIcon> = {
  MAP_PIN: MapPin,
  CALENDAR: Calendar,
  USERS: Users,
  STAR: Star,
  AWARD: Award,
  GLOBE: Globe,
  HEART: Heart,
  SPARKLES: Sparkles,
  SHIELD: Shield,
  CHECK_CIRCLE: CheckCircle,
  HEADPHONES: Headphones,
  MESSAGE_SQUARE: MessageSquare,
  CHECK_CIRCLE_2: CheckCircle2,
};

/**
 * Get Lucide React icon component from Strapi icon type
 * Returns a fallback icon (MapPin) if icon type is not found
 */
export function getIconComponent(
  iconType: string | StrapiIconType
): LucideIcon {
  return ICON_MAP[iconType as StrapiIconType] || ICON_MAP[DEFAULT_ICON_TYPE];
}

/**
 * Get valid Strapi icon type from string
 * Returns default icon type if invalid
 */
export function getValidIconType(
  iconType: string | undefined | null
): StrapiIconType {
  if (!iconType || !isValidIconType(iconType)) {
    return DEFAULT_ICON_TYPE;
  }
  return iconType;
}

/**
 * Check if an icon type is valid
 */
export function isValidIconType(iconType: string): iconType is StrapiIconType {
  return iconType in ICON_MAP;
}
