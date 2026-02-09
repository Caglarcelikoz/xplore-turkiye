"use client";

import { useState, useMemo } from "react";
import { TripType, Region } from "@/types";
import TripFilters from "@/components/trips/TripFilters";
import TripCard from "@/components/trips/TripCard";
import TripsEmptyState from "@/components/trips/TripsEmptyState";
import { getAllTrips } from "@/lib/data/trips";

export default function AllTripsPage() {
  const [selectedType, setSelectedType] = useState<TripType | "all">("all");
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");

  const allTrips = getAllTrips();

  const filteredTrips = useMemo(() => {
    return allTrips.filter((trip) => {
      // Type matching: support both new tripTypes[] and old type field
      let typeMatch = selectedType === "all";
      if (!typeMatch) {
        if (trip.tripTypes) {
          // Use new tripTypes array
          typeMatch = trip.tripTypes.includes(selectedType);
        } else {
          // Fallback to old type field with mapping
          const typeMapping: Record<string, TripType> = {
            citytrips: "cities",
            groepsreizen: "group",
            "self-drives": "road-trips",
            maatwerk: "different",
          };
          const mappedType = typeMapping[trip.type] || (trip.type as TripType);
          typeMatch = mappedType === selectedType;
        }
      }

      const regionMatch =
        selectedRegion === "all" || trip.region === selectedRegion;
      return typeMatch && regionMatch;
    });
  }, [selectedType, selectedRegion, allTrips]);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
          Alle Reizen
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Ontdek onze volledige collectie reizen naar Turkije
        </p>
      </div>

      <TripFilters
        selectedType={selectedType}
        selectedRegion={selectedRegion}
        onTypeChange={setSelectedType}
        onRegionChange={setSelectedRegion}
      />

      <div className="mb-4 text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8">
        {filteredTrips.length}{" "}
        {filteredTrips.length === 1 ? "reis gevonden" : "reizen gevonden"}
      </div>

      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <TripsEmptyState variant="filters" />
      )}
    </div>
  );
}

