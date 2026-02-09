"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Region } from "@/types";
import { Trip } from "@/types";
import TripFilters from "@/components/trips/TripFilters";
import TripsEmptyState from "@/components/trips/TripsEmptyState";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TripListWithRegionFilterProps {
  trips: Trip[];
  accentColor?: string;
}

export default function TripListWithRegionFilter({
  trips,
  accentColor = "#294d54",
}: TripListWithRegionFilterProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");

  const filteredTrips = useMemo(() => {
    if (selectedRegion === "all") return trips;
    return trips.filter((trip) => trip.region === selectedRegion);
  }, [trips, selectedRegion]);

  return (
    <>
      <TripFilters
        selectedType="all"
        selectedRegion={selectedRegion}
        onTypeChange={() => {}}
        onRegionChange={setSelectedRegion}
        showTypeFilter={false}
        showRegionFilter={true}
      />

      <div className="mb-4 text-sm text-muted-foreground">
        {filteredTrips.length}{" "}
        {filteredTrips.length === 1 ? "reis gevonden" : "reizen gevonden"}
      </div>

      {filteredTrips.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTrips.map((trip) => (
            <Link
              key={trip.id}
              href={`/reizen/${trip.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={trip.images[0]}
                  alt={trip.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent opacity-60" />
                {trip.featured && (
                  <Badge className="absolute top-4 right-4 bg-accent text-white border-0">
                    Uitgelicht
                  </Badge>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {trip.title}
                </h3>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                  {trip.subtitle}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Calendar className="h-4 w-4" />
                    <span>{trip.duration} dagen</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 pt-4 border-t border-primary/10">
                  <span className="text-2xl font-bold text-primary">
                    {trip.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-foreground/60">
                    {trip.priceText}
                  </span>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: accentColor }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <TripsEmptyState variant="region" />
      )}
    </>
  );
}
