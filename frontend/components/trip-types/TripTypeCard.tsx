"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Landmark,
  Route,
  Car,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { TripTypeInfo } from "@/types";

const iconMap = {
  Landmark,
  Route,
  Car,
  Users,
  Sparkles,
};

// Fallback images (same as homepage) when type.image is not yet available
const tripTypeImages: Record<string, string> = {
  cities: "/xplore-cities.jpg",
  "round-trips": "/xplore-round-trips.jpg",
  "road-trips": "xplore-road.jpg",
  group: "xplore-group.jpg",
  different: "/xplore-different.jpg",
};

interface TripTypeCardProps {
  type: TripTypeInfo;
}

export default function TripTypeCard({ type }: TripTypeCardProps) {
  const IconComponent = iconMap[type.icon as keyof typeof iconMap];
  const imageSrc = tripTypeImages[type.id] || type.image || "/placeholder.jpg";

  return (
    <Link
      href={`/xplore-your-way/${type.id}`}
      className="group relative overflow-hidden rounded-2xl block h-full"
    >
      {/* Background Image */}
      <div className="relative h-96 sm:h-[450px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={type.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay – neutral dark, subtle so accent doesn’t overpower */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, #182e32E6 0%, #182e3299 35%, #182e3240 70%, transparent 100%)`,
          }}
        />

        {/* Content strip – overlay bar + text on top */}
        <div className="absolute inset-x-0 bottom-0 h-[220px] sm:h-[240px]">
          {/* Overlay behind title, description and Ontdek */}
          <div
            className="absolute inset-0 rounded-b-2xl"
            style={{
              background:
                "linear-gradient(to top, rgba(24,46,50,0.55) 0%, rgba(24,46,50,0.28) 100%)",
            }}
          />
          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col">
            {/* Icon + Title – icon left of title */}
            <div className="flex items-center gap-3 mb-2 min-h-[2.5rem] sm:min-h-[3rem]">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                {IconComponent && (
                  <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                )}
              </div>
              <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 pt-1">
                {type.name}
              </h3>
            </div>

            {/* Tagline – fixed 2-line slot for consistent layout */}
            <p className="text-white/90 text-sm sm:text-base leading-relaxed line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] mb-4">
              {type.tagline}
            </p>

            {/* CTA – directly below tagline slot */}
            <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
              <span>Ontdek</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </Link>
  );
}
