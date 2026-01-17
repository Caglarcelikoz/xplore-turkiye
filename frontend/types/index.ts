export type TripType = "groepsreizen" | "maatwerk" | "self-drives" | "citytrips";

export type Region =
  | "centraal-anatolie"
  | "egeische-kust"
  | "mediterrane-riviera"
  | "oost-turkije"
  | "zuidoost-mesopotamie";

export interface DayPlan {
  day: number;
  title: string;
  description: string;
  locations?: string[];
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: TripType;
  region: Region;
  duration: number; // days
  price: number; // from price
  priceNote: string;
  bestTravelTime: string;
  departureCity: string;
  images: string[];
  overview: string;
  highlights: string[];
  itinerary: DayPlan[];
  included: string[];
  excluded: string[];
  featured: boolean;
  coordinates?: [number, number]; // for map [lng, lat]
  route?: [number, number][]; // for route display
}

export interface RegionInfo {
  id: Region;
  name: string;
  description: string;
  coordinates: [number, number];
  bounds?: [[number, number], [number, number]];
}

