"use client";

import { useState, useMemo } from "react";
import { TripType, Region } from "@/types";
import TripFilters from "@/components/trips/TripFilters";
import TripCard from "@/components/trips/TripCard";
import { getAllTrips } from "@/lib/data/trips";

export default function AllTripsPage() {
  const [selectedType, setSelectedType] = useState<TripType | "all">("all");
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");

  const allTrips = getAllTrips();

  const filteredTrips = useMemo(() => {
    return allTrips.filter((trip) => {
      const typeMatch = selectedType === "all" || trip.type === selectedType;
      const regionMatch = selectedRegion === "all" || trip.region === selectedRegion;
      return typeMatch && regionMatch;
    });
  }, [selectedType, selectedRegion, allTrips]);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">Alle Reizen</h1>
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
        {filteredTrips.length} {filteredTrips.length === 1 ? "reis gevonden" : "reizen gevonden"}
      </div>

      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Geen reizen gevonden met de geselecteerde filters.
          </p>
        </div>
      )}
    </div>
  );
}

