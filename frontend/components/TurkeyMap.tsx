"use client";

import { memo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const TURKEY_GEO_URL = "/turkey-provinces.json";

/* ─── city data ─── */
const cityMarkers = [
  {
    name: "Istanbul",
    label: "Istanbul",
    description: "Waar continenten samenkomen",
    sub: "Historisch hart · Bosphorus · Bazaars",
    coordinates: [29.0, 41.01] as [number, number],
    size: "lg" as const,
  },
  {
    name: "Ankara",
    label: "Ankara",
    description: "Hoofdstad van Turkije",
    sub: "Anıtkabir · Citadel · Musea",
    coordinates: [32.85, 39.93] as [number, number],
    size: "md" as const,
  },
  {
    name: "Cappadocië",
    label: "Cappadocië",
    description: "Sprookjesachtig landschap",
    sub: "Luchtballonnen · Grotwoningen · Valleien",
    coordinates: [34.83, 38.65] as [number, number],
    size: "md" as const,
  },
  {
    name: "Antalya",
    label: "Antalya",
    description: "De Turkse Rivièra",
    sub: "Stranden · Oldtown · Watervallen",
    coordinates: [30.7, 36.9] as [number, number],
    size: "md" as const,
  },
  {
    name: "Izmir",
    label: "İzmir",
    description: "Parel van de Egeïsche kust",
    sub: "Kordon · Kemeraltı · Kustdorpen",
    coordinates: [27.14, 38.42] as [number, number],
    size: "sm" as const,
  },
  {
    name: "Bodrum",
    label: "Bodrum",
    description: "Kustparadijs aan de Egeïsche Zee",
    sub: "Kasteel · Jachthaven · Nachtleven",
    coordinates: [27.43, 37.04] as [number, number],
    size: "sm" as const,
  },
  {
    name: "Trabzon",
    label: "Trabzon",
    description: "Poort tot de Zwarte Zeekust",
    sub: "Sümela · Uzungöl · Theeplantages",
    coordinates: [39.72, 41.0] as [number, number],
    size: "sm" as const,
  },
  {
    name: "Efeze",
    label: "Efeze",
    description: "Antieke wereldstad",
    sub: "Bibliotheek van Celsus · Tempel van Artemis",
    coordinates: [27.35, 37.94] as [number, number],
    size: "sm" as const,
  },
  {
    name: "Mardin",
    label: "Mardin",
    description: "Mesopotamische parel",
    sub: "Stenen architectuur · Kloosters · Bazaars",
    coordinates: [40.73, 37.31] as [number, number],
    size: "sm" as const,
  },
];

type CityData = (typeof cityMarkers)[number];

/* ─── SVG colours ─── */
const sc = {
  hover: "#d44e42",
  stroke: "#ddd8d2",
  strokeDark: "#1c3a40",
  bg: "#faf9f7",
  text: "#142628",
  white: "#ffffff",
};

/* ─── SVG pin (no tooltip — that's HTML now) ─── */
function CityPin({
  city,
  isHovered,
  onHover,
  onLeave,
}: {
  city: CityData;
  isHovered: boolean;
  onHover: (e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const r = city.size === "lg" ? 5.5 : city.size === "md" ? 4.5 : 3.5;
  const fontSize = city.size === "lg" ? 17 : city.size === "md" ? 15 : 13.5;
  const hoverFontSize = city.size === "lg" ? 19 : 17;
  const charWidth = isHovered ? hoverFontSize * 0.58 : fontSize * 0.58;
  const pillW = city.label.length * charWidth + 16;
  const pillH = isHovered ? 28 : 25;
  const pillY = -(r + 14 + pillH / 2);

  return (
    <Marker coordinates={city.coordinates}>
      <g
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        style={{ cursor: "pointer" }}
      >
        {/* Hit area */}
        <rect
          x={-60}
          y={pillY - pillH / 2 - 4}
          width={120}
          height={-pillY + pillH / 2 + r + 18}
          fill="transparent"
        />

        {/* Glow */}
        <circle
          r={isHovered ? 24 : city.size === "lg" ? 13 : 0}
          fill={sc.hover}
          fillOpacity={isHovered ? 0.1 : 0.04}
          stroke={sc.hover}
          strokeWidth={isHovered ? 1.2 : 0.3}
          strokeOpacity={isHovered ? 0.3 : 0.08}
          style={{ transition: "all 250ms ease" }}
        />

        {/* Outer ring */}
        <circle
          r={isHovered ? r + 4.5 : r + 0.5}
          fill={isHovered ? sc.hover : sc.white}
          fillOpacity={isHovered ? 0.12 : 0}
          stroke={sc.hover}
          strokeWidth={isHovered ? 2.2 : 1}
          strokeOpacity={isHovered ? 1 : 0.5}
          style={{ transition: "all 200ms ease" }}
        />

        {/* Dot */}
        <circle
          r={isHovered ? r + 2 : r}
          fill={isHovered ? sc.hover : sc.white}
          stroke={isHovered ? sc.white : sc.hover}
          strokeWidth={isHovered ? 2 : 1.2}
          style={{ transition: "all 200ms ease" }}
        />

        {/* Centre */}
        <circle
          r={isHovered ? 3.5 : r * 0.35}
          fill={isHovered ? sc.white : sc.hover}
          style={{ transition: "all 200ms ease" }}
        />

        {/* Label pill background */}
        <rect
          x={-pillW / 2}
          y={pillY - pillH / 2}
          width={pillW}
          height={pillH}
          rx={pillH / 2}
          ry={pillH / 2}
          fill={isHovered ? sc.hover : sc.text}
          fillOpacity={isHovered ? 0.95 : 0.85}
          style={{ transition: "all 200ms ease" }}
        />

        {/* Label connector line */}
        <line
          x1={0}
          y1={pillY + pillH / 2}
          x2={0}
          y2={-(r + 6)}
          stroke={isHovered ? sc.hover : sc.text}
          strokeWidth={1.2}
          strokeOpacity={isHovered ? 0.6 : 0.3}
          style={{ transition: "all 200ms ease" }}
        />

        {/* Label text */}
        <text
          textAnchor="middle"
          y={pillY + (isHovered ? hoverFontSize : fontSize) * 0.36}
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: isHovered ? hoverFontSize : fontSize,
            fontWeight: isHovered ? 800 : 700,
            fill: sc.white,
            letterSpacing: "0.02em",
            transition: "all 200ms ease",
          }}
        >
          {city.label}
        </text>
      </g>
    </Marker>
  );
}

/* ─── main ─── */
function TurkeyMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleHover = useCallback(
    (city: CityData, e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setHoveredCity(city);
    },
    []
  );

  const handleLeave = useCallback(() => {
    setHoveredCity(null);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full"
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
          <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d6069" />
            <stop offset="100%" stopColor="#1e464e" />
          </linearGradient>
          <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#0e1f22"
              floodOpacity="0.18"
            />
          </filter>
        </defs>

        {/* Static provinces */}
        <g filter="url(#mapShadow)">
          <Geographies geography={TURKEY_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "url(#mapGrad)",
                      fillOpacity: 0.8,
                      stroke: sc.stroke,
                      strokeWidth: 0.35,
                      outline: "none",
                      pointerEvents: "none" as const,
                    },
                    hover: {
                      fill: "url(#mapGrad)",
                      fillOpacity: 0.8,
                      stroke: sc.stroke,
                      strokeWidth: 0.35,
                      outline: "none",
                      pointerEvents: "none" as const,
                    },
                    pressed: {
                      fill: "url(#mapGrad)",
                      fillOpacity: 0.8,
                      stroke: sc.stroke,
                      strokeWidth: 0.35,
                      outline: "none",
                      pointerEvents: "none" as const,
                    },
                  }}
                />
              ))
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
                    strokeWidth: 1,
                    outline: "none",
                    pointerEvents: "none" as const,
                  },
                  hover: {
                    fill: "none",
                    stroke: sc.strokeDark,
                    strokeWidth: 1,
                    outline: "none",
                    pointerEvents: "none" as const,
                  },
                  pressed: {
                    fill: "none",
                    stroke: sc.strokeDark,
                    strokeWidth: 1,
                    outline: "none",
                    pointerEvents: "none" as const,
                  },
                }}
              />
            ))
          }
        </Geographies>

        {/* City pins */}
        {cityMarkers.map((city) => (
          <CityPin
            key={city.name}
            city={city}
            isHovered={hoveredCity?.name === city.name}
            onHover={(e) => handleHover(city, e)}
            onLeave={handleLeave}
          />
        ))}
      </ComposableMap>

      {/* ─── HTML tooltip card ─── */}
      <AnimatePresence>
        {hoveredCity && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y + 20,
              transform: "translateX(-50%)",
            }}
          >
            {/* Arrow */}
            <div className="flex justify-center -mb-1.5">
              <div className="w-3 h-3 bg-white rotate-45 rounded-sm shadow-sm" />
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl shadow-xl border border-primary/10 p-4 min-w-[180px] max-w-[220px]">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-sm font-bold text-primary leading-tight">
                  {hoveredCity.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs font-semibold text-foreground/80 mb-1.5">
                {hoveredCity.description}
              </p>

              {/* Sub highlights */}
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {hoveredCity.sub}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(TurkeyMap);
