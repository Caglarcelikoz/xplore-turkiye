"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { TripType, Trip } from "@/types";
import TripFilters from "@/components/trips/TripFilters";
import TripsEmptyState from "@/components/trips/TripsEmptyState";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TripListWithTypeFilterProps {
  trips: Trip[];
  accentColor?: string;
}

function tripMatchesType(trip: Trip, typeId: TripType): boolean {
  if (trip.tripTypes) {
    return trip.tripTypes.includes(typeId);
  }
  const typeMapping: Record<string, TripType> = {
    citytrips: "cities",
    groepsreizen: "group",
    "self-drives": "road-trips",
    maatwerk: "different",
  };
  const mapped = typeMapping[trip.type] || trip.type;
  return mapped === typeId;
}

export default function TripListWithTypeFilter({
  trips,
  accentColor = "#294d54",
}: TripListWithTypeFilterProps) {
  const [selectedType, setSelectedType] = useState<TripType | "all">("all");

  const filteredTrips = useMemo(() => {
    if (selectedType === "all") return trips;
    return trips.filter((trip) => tripMatchesType(trip, selectedType));
  }, [trips, selectedType]);

  return (
    <>
      <TripFilters
        selectedType={selectedType}
        selectedRegion="all"
        onTypeChange={setSelectedType}
        onRegionChange={() => {}}
        showTypeFilter={true}
        showRegionFilter={false}
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
                    Featured
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
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <MapPin className="h-4 w-4" />
                    <span>{trip.departureCity}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 pt-4 border-t border-primary/10">
                  <span className="text-2xl font-bold text-primary">
                    {trip.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-foreground/60">p.p.</span>
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
        <TripsEmptyState variant="type" />
      )}
    </>
  );
}
