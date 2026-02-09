import type { Region } from "@/types";

/** One image per region for the card. Uses region.images[0] when set; otherwise this fallback. */
const regionImage: Record<Region, string> = {
  marmara:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=85",
  "egeische-kust":
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=85",
  "mediterrane-riviera":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
  "centraal-anatolie":
    "https://images.unsplash.com/photo-1544829099-b9a0c07b926d?w=800&q=85",
  "zwarte-zee":
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=85",
  "oost-turkije":
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85",
  "zuidoost-mesopotamie":
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=85",
};

export function getRegionImage(regionId: string): string | undefined {
  return regionImage[regionId as Region];
}
