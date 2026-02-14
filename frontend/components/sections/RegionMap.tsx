"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { regions } from "@/lib/data/regions";
import { Region } from "@/types";

interface RegionMapProps {
  selectedRegion?: Region | "all";
  onRegionClick?: (region: Region) => void;
}

// Region positions as percentages of the map (left, top)
const regionPositions: Record<
  Region,
  { left: number; top: number; label: string }
> = {
  "centraal-anatolie": { left: 45, top: 42, label: "Centraal" },
  "egeische-kust": { left: 18, top: 45, label: "Egeïsche" },
  "mediterrane-riviera": { left: 22, top: 68, label: "Mediterrane" },
  marmara: { left: 12, top: 28, label: "Marmara" },
  "zwarte-zee": { left: 38, top: 18, label: "Zwarte Zee" },
  "oost-turkije": { left: 78, top: 38, label: "Oost" },
  "zuidoost-mesopotamie": { left: 72, top: 65, label: "Zuidoost" },
};


export default function RegionMap({
  selectedRegion,
  onRegionClick,
}: RegionMapProps) {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 to-background relative">
      {/* Turkey Map Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80"
          alt="Turkije Kaart"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          unoptimized
        />
        {/* Fallback: Simple Turkey outline using CSS */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full relative">
            {/* Simple Turkey shape using CSS */}
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Turkey outline - simplified shape */}
              <path
                d="M 150 200 Q 200 150 300 180 T 500 200 T 700 220 T 850 240 L 900 260 L 920 280 L 930 300 L 925 320 L 910 340 L 880 360 L 850 380 L 800 400 L 750 420 L 700 440 L 650 460 L 600 480 L 550 500 L 500 520 L 450 540 L 400 560 L 350 580 L 300 590 L 250 580 L 200 560 L 150 540 L 120 520 L 100 500 L 90 480 L 95 460 L 110 440 L 130 420 L 150 400 L 160 380 L 165 360 L 160 340 L 150 320 L 145 300 L 150 280 L 155 260 L 150 240 Z"
                fill="#294d54"
                fillOpacity="0.1"
                stroke="#294d54"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Region Markers */}
      {regions.map((region) => {
        const position = regionPositions[region.id as Region];
        const isSelected = selectedRegion === region.id;

        return (
          <div
            key={region.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-full bg-accent/30"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ width: "60px", height: "60px", margin: "-30px" }}
              />
            )}
            <motion.button
              onClick={() => onRegionClick?.(region.id as Region)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-3 border-white shadow-xl ${
                isSelected ? "bg-accent" : "bg-primary"
              }`}
              title={region.name}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white" />
              </div>
            </motion.button>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isSelected ? 1 : 0.7 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap"
            >
              <span
                className={`text-xs sm:text-sm font-bold px-2 py-1 rounded ${
                  isSelected
                    ? "bg-accent text-white"
                    : "bg-white/90 text-primary shadow-md"
                }`}
              >
                {position.label}
              </span>
            </motion.div>
          </div>
        );
      })}

      {/* Interactive Region List */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-primary/20"
        >
          <h3 className="text-xs sm:text-sm font-semibold text-primary mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Kies een Regio
          </h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {regions.map((region) => {
              const isSelected = selectedRegion === region.id;
              return (
                <motion.button
                  key={region.id}
                  onClick={() => onRegionClick?.(region.id as Region)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm transition-all ${
                    isSelected
                      ? "bg-primary text-white shadow-md"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{region.name}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
            {selectedRegion !== "all" && (
              <button
                onClick={() => onRegionClick?.("all" as Region)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all mt-2"
              >
                Alle Regio&apos;s
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
