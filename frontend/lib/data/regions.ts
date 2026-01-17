import { RegionInfo } from "@/types";

export const regions: RegionInfo[] = [
  {
    id: "centraal-anatolie",
    name: "Centraal Anatolië",
    description: "Het historische hart van Turkije met Cappadocië en Ankara",
    coordinates: [34.5, 39.0],
    bounds: [
      [32.0, 37.0],
      [37.0, 41.0],
    ],
  },
  {
    id: "egeische-kust",
    name: "Egeïsche Kust",
    description: "Prachtige kustlijn met antieke ruïnes en badplaatsen",
    coordinates: [27.5, 38.5],
    bounds: [
      [26.0, 36.0],
      [29.0, 40.0],
    ],
  },
  {
    id: "mediterrane-riviera",
    name: "Mediterrane Rivièra",
    description: "Turquoise kust met luxe resorts en historische steden",
    coordinates: [30.5, 36.5],
    bounds: [
      [29.0, 35.0],
      [32.0, 38.0],
    ],
  },
  {
    id: "oost-turkije",
    name: "Oost-Turkije",
    description: "Bergachtig gebied met rijke cultuur en natuur",
    coordinates: [41.0, 39.5],
    bounds: [
      [38.0, 37.0],
      [44.0, 42.0],
    ],
  },
  {
    id: "zuidoost-mesopotamie",
    name: "Zuidoost & Mesopotamië",
    description: "Cradle of civilization met unieke historische schatten",
    coordinates: [40.0, 37.5],
    bounds: [
      [37.0, 36.0],
      [43.0, 39.0],
    ],
  },
];

export const getRegionById = (id: string): RegionInfo | undefined => {
  return regions.find((r) => r.id === id);
};
