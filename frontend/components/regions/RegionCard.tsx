"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { RegionInfo } from "@/types";
import { getRegionImage } from "@/lib/data/regionImages";

interface RegionCardProps {
  region: RegionInfo;
  tripCount?: number;
}

export default function RegionCard({ region, tripCount }: RegionCardProps) {
  const image =
    region.images?.[0] ?? getRegionImage(region.id);

  return (
    <Link
      href={`/regios/${region.id}`}
      className="group block overflow-hidden rounded-xl border border-primary/10 bg-white transition-all duration-300 hover:shadow-lg"
    >
      {image ? (
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={image}
            alt={region.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="aspect-[3/2] bg-primary/5 flex items-center justify-center">
          <span className="text-primary/40 text-sm font-medium">
            {region.name}
          </span>
        </div>
      )}

      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-foreground text-lg tracking-tight">
          {region.name}
        </h3>
        <p className="text-sm text-foreground/70 mt-1.5 line-clamp-2 leading-relaxed">
          {region.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {tripCount !== undefined && (
            <span className="text-xs text-foreground/55 tabular-nums">
              {tripCount === 0
                ? "Binnenkort"
                : `${tripCount} ${tripCount === 1 ? "reis" : "reizen"}`}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary ml-auto">
            Bekijk regio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
