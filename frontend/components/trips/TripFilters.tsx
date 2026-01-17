"use client";

import { TripType, Region } from "@/types";
import { tripTypes } from "@/lib/data/constants";
import { regions } from "@/lib/data/regions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TripFiltersProps {
  selectedType: TripType | "all";
  selectedRegion: Region | "all";
  onTypeChange: (type: TripType | "all") => void;
  onRegionChange: (region: Region | "all") => void;
  showTypeFilter?: boolean;
}

export default function TripFilters({
  selectedType,
  selectedRegion,
  onTypeChange,
  onRegionChange,
  showTypeFilter = true,
}: TripFiltersProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Type Filter - Only show if showTypeFilter is true */}
      {showTypeFilter && (
        <div className="bg-background/50 rounded-xl p-4 sm:p-5 border border-primary/10">
          <h3 className="text-sm font-bold text-foreground mb-4">
            Type Reis
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTypeChange("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedType === "all"
                  ? "bg-primary text-white shadow-md hover:bg-primary/90"
                  : "bg-white text-foreground border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              Alle Reizen
            </button>
            {tripTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id as TripType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedType === type.id
                    ? "bg-primary text-white shadow-md hover:bg-primary/90"
                    : "bg-white text-foreground border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Region Filter */}
      <div className="bg-background/50 rounded-xl p-4 sm:p-5 border border-primary/10">
        <h3 className="text-sm font-bold text-foreground mb-4">Regio</h3>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onRegionChange("all")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              selectedRegion === "all"
                ? "bg-primary text-white shadow-lg hover:bg-primary/90 scale-105"
                : "bg-white text-foreground border-2 border-primary/30 hover:border-primary hover:bg-primary/5 hover:shadow-sm"
            }`}
          >
            Alle Regio&apos;s
          </button>
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => onRegionChange(region.id as Region)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                selectedRegion === region.id
                  ? "bg-primary text-white shadow-lg hover:bg-primary/90 scale-105"
                  : "bg-white text-foreground border-2 border-primary/30 hover:border-primary hover:bg-primary/5 hover:shadow-sm"
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedType !== "all" || selectedRegion !== "all") && (
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span className="text-sm font-medium text-muted-foreground">Actieve filters:</span>
          {selectedType !== "all" && (
            <Badge
              variant="secondary"
              className="cursor-pointer group hover:bg-primary/80 transition-colors px-3 py-1.5 flex items-center gap-1.5"
              onClick={() => onTypeChange("all")}
            >
              <span>{tripTypes.find((t) => t.id === selectedType)?.name}</span>
              <X className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform" />
            </Badge>
          )}
          {selectedRegion !== "all" && (
            <Badge
              variant="secondary"
              className="cursor-pointer group hover:bg-primary/80 transition-colors px-3 py-1.5 flex items-center gap-1.5"
              onClick={() => onRegionChange("all")}
            >
              <span>{regions.find((r) => r.id === selectedRegion)?.name}</span>
              <X className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform" />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

