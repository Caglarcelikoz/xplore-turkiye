"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Euro, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trip } from "@/types";
import { getRegionById } from "@/lib/data/regions";

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const region = getRegionById(trip.region);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/reizen/${trip.slug}`} className="block h-full">
        <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-primary/10 min-h-[500px] sm:min-h-[550px]">
          {/* Image Container */}
          <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent z-10" />
            <Image
              src={trip.images[0]}
              alt={trip.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Featured Badge */}
            {trip.featured && (
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
                <Badge className="bg-accent text-white border-0 shadow-lg text-xs">
                  ⭐ Uitgelicht
                </Badge>
              </div>
            )}

            {/* Region Badge */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
              <Badge
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm text-primary border-0 text-xs"
              >
                {region?.name}
              </Badge>
            </div>

            {/* Price Overlay */}
            {/* <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-20">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                    {trip.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col min-h-0">
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors min-h-[3.5rem]">
              {trip.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 flex-1 min-h-[2.5rem]">
              {trip.subtitle}
            </p>

            {/* Info Icons */}
            <div className="space-y-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-primary/10">
              <div className="flex items-center text-xs sm:text-sm text-foreground">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <span className="font-medium">{trip.duration} dagen</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-foreground">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <span className="truncate">{trip.departureNote}</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              variant="outline"
              className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all"
            >
              Meer Informatie
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

