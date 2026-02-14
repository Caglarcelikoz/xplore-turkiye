"use client";

import { memo, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import type { Region } from "@/types";
import { regionProvinces } from "@/lib/data/regionProvinces";
import { getRegionById } from "@/lib/data/regions";

const TURKEY_GEO_URL = "/turkey-provinces.json";

export interface TurkeyProvincesMapProps {
  /** Optional CSS class */
  className?: string;
}

/* ─── SVG colours ─── */
const sc = {
  hover: "#d44e42",
  stroke: "#ffffff",
  strokeDark: "#1c3a40",
  bg: "#faf9f7",
  text: "#142628",
};

/**
 * Get the region ID for a given province name
 */
function getRegionForProvince(provinceName: string): Region | null {
  for (const [regionId, provinces] of Object.entries(regionProvinces)) {
    if (provinces.includes(provinceName)) {
      return regionId as Region;
    }
  }
  return null;
}

/**
 * Interactive Turkey map showing all 81 provinces, colored by region.
 * Each province is clickable and navigates to its region detail page.
 */
function TurkeyProvincesMap({ className }: TurkeyProvincesMapProps) {
  const router = useRouter();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  // Build a map of province name -> region color
  const provinceColorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const [regionId, provinces] of Object.entries(regionProvinces)) {
      const region = getRegionById(regionId as Region);
      const color = region?.color ?? sc.hover;
      provinces.forEach((province) => {
        map.set(province, color);
      });
    }
    return map;
  }, []);

  const handleProvinceClick = useCallback(
    (provinceName: string) => {
      const regionId = getRegionForProvince(provinceName);
      if (regionId) {
        router.push(`/regios/${regionId}`);
      }
    },
    [router]
  );

  const getProvinceStyle = useCallback(
    (provinceName: string) => {
      const isHovered = hoveredProvince === provinceName;
      const baseColor = provinceColorMap.get(provinceName) ?? sc.hover;

      return {
        default: {
          fill: baseColor,
          fillOpacity: isHovered ? 0.95 : 0.75,
          stroke: sc.stroke,
          strokeWidth: isHovered ? 1.2 : 0.5,
          outline: "none" as const,
          cursor: "pointer" as const,
          transition: "all 0.2s ease",
        },
        hover: {
          fill: baseColor,
          fillOpacity: 0.95,
          stroke: sc.hover,
          strokeWidth: 1.5,
          outline: "none" as const,
          cursor: "pointer" as const,
        },
        pressed: {
          fill: baseColor,
          fillOpacity: 1,
          stroke: sc.hover,
          strokeWidth: 1.5,
          outline: "none" as const,
          cursor: "pointer" as const,
        },
      };
    },
    [hoveredProvince, provinceColorMap]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      <ComposableMap
        width={800}
        height={480}
        projection="geoMercator"
        projectionConfig={{
          center: [35.5, 39.2],
          scale: 2200,
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <filter id="provinceMapShadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#0e1f22"
              floodOpacity="0.18"
            />
          </filter>
        </defs>

        {/* Provinces with region colors */}
        <g filter="url(#provinceMapShadow)">
          <Geographies geography={TURKEY_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = (geo.properties?.name as string) ?? "";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHoveredProvince(name)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(name)}
                    style={getProvinceStyle(name)}
                  />
                );
              })
            }
          </Geographies>
        </g>

        {/* Country border */}
        <Geographies geography={TURKEY_GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={`b-${geo.rsmKey}`}
                geography={geo}
                style={{
                  default: {
                    fill: "none",
                    stroke: sc.strokeDark,
                    strokeWidth: 1.2,
                    outline: "none",
                    pointerEvents: "none" as const,
                  },
                  hover: {
                    fill: "none",
                    stroke: sc.strokeDark,
                    strokeWidth: 1.2,
                    outline: "none",
                    pointerEvents: "none" as const,
                  },
                  pressed: {
                    fill: "none",
                    stroke: sc.strokeDark,
                    strokeWidth: 1.2,
                    outline: "none",
                    pointerEvents: "none" as const,
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>

      {/* Hover tooltip */}
      {hoveredProvince && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/95 text-white px-4 py-2 rounded-lg shadow-lg pointer-events-none"
        >
          <p className="text-sm font-semibold">{hoveredProvince}</p>
          <p className="text-xs text-white/80">Klik om de regio te bekijken</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default memo(TurkeyProvincesMap);
