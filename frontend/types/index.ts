export type TripType =
  | "cities" // XPLORE CITIES - Citytrips
  | "round-trips" // XPLORE ROUND TRIPS - Rondreizen
  | "road-trips" // XPLORE ON THE ROAD - Selfdrive
  | "group" // XPLORE IN GROUP - Groepsreizen
  | "different"; // XPLORE DIFFERENT - Maatwerk

export type Region =
  | "marmara" // Marmara
  | "egeische-kust" // Egeïsche regio
  | "mediterrane-riviera" // Mediterrane regio
  | "centraal-anatolie" // Centraal-Anatolië
  | "zwarte-zee" // Zwarte Zee-regio
  | "oost-turkije" // Oost-Anatolië
  | "zuidoost-mesopotamie"; // Zuidoost-Anatolië

export interface DayPlan {
  day: number;
  title: string;
  description: string;
  locations?: string[];
  image?: string; // Optional image for each day
}

export interface SeasonalInfo {
  season: string;
  months: string;
  description: string;
  pros?: string[];
  cons?: string[];
}

export interface AccommodationInfo {
  name: string;
  category: string; // e.g., "4*", "5*", "Boutique"
  description?: string;
  image?: string;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: TripType; // Deprecated: use tripTypes instead
  tripTypes?: TripType[]; // New: A trip can have multiple types
  region: Region;
  duration: number; // days
  price: string; // from price
  priceText?: string; // from price
  priceDescription?: string;
  priceNote: string;
  bestTravelTime: string; // Short summary e.g., "april - oktober"
  bestTravelTimeDetailed?: string; // Plain text: wanneer reizen, per seizoen, etc.
  departureCity: string;
  departureNote?: string; // e.g., "Brussel of naar keuze"
  images: string[];
  overview: string; // Short overview
  introductionText?: string; // Longer introduction paragraph
  highlights: string[];
  itinerary: DayPlan[];
  included: string[];
  excluded: string[];
  accommodation?: AccommodationInfo | string; // Hotel/accommodation info
  transportationIncluded?: boolean; // Whether flights are included
  importantNotes?: string | string[]; // Één of meerdere notities (elk in eigen blok)
  tags?: string[]; // e.g., ["xplore cities", "Istanbul"]
  featured: boolean;
  coordinates?: [number, number]; // for map [lng, lat]
  route?: [number, number][]; // for route display
}

export interface RegionInfo {
  id: Region;
  name: string;
  shortDescription: string; // Short one-line description for cards/listings
  description: string; // Main description paragraph(s)
  longDescription?: string; // Extended content with multiple paragraphs
  insight?: {
    title: string;
    content: string;
  }; // XPLORE INSIGHT block
  images?: string[]; // Hero images for the region
  coordinates: [number, number];
  bounds?: [[number, number], [number, number]];
  color?: string; // Theme color for the region
}

export interface TripTypeInfo {
  id: TripType;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  color: string;
}
