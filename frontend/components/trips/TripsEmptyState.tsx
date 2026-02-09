"use client";

import { Compass, Sparkles } from "lucide-react";
import NewsletterSignup from "@/components/layout/NewsletterSignup";

export type TripsEmptyStateVariant = "region" | "type" | "filters";

const content: Record<
  TripsEmptyStateVariant,
  { title: string; contextLabel: string }
> = {
  region: {
    title: "Nog geen reizen in deze regio",
    contextLabel: "deze regio",
  },
  type: {
    title: "Nog geen reizen van dit type",
    contextLabel: "dit reistype",
  },
  filters: {
    title: "Geen reizen met deze filters",
    contextLabel: "deze selectie",
  },
};

interface TripsEmptyStateProps {
  variant: TripsEmptyStateVariant;
}

export default function TripsEmptyState({ variant }: TripsEmptyStateProps) {
  const { title, contextLabel } = content[variant];

  return (
    <div className="py-12 sm:py-16">
      <div className="rounded-2xl border border-primary/10 bg-gradient-to-b from-primary/[0.03] to-white p-8 sm:p-10 md:p-12 text-center max-w-xl mx-auto shadow-sm">
        <div className="flex justify-center gap-3 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Compass className="h-7 w-7" aria-hidden />
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Sparkles className="h-7 w-7" aria-hidden />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3">
          {title}
        </h2>
        <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-6">
          Achter de schermen werken we intensief aan nieuwe
          reisprogramma&apos;s. Wilt u op de hoogte blijven wanneer er een reis
          beschikbaar komt voor {contextLabel}? Schrijf u in voor onze
          nieuwsbrief. We laten het u graag als eerste weten.
        </p>

        <div className="rounded-xl bg-primary-dark text-white p-6 text-left">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}
