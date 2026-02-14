import { Metadata } from "next";
import Link from "next/link";
import { getAllRegions } from "@/lib/data/regions";
import { trips } from "@/lib/data/trips";
import { Button } from "@/components/ui/button";
import { Compass, MapPin } from "lucide-react";
import RegionCard from "@/components/regions/RegionCard";

export const metadata: Metadata = {
  title: "Ontdek de 7 Regio's van Turkije - XPLORE TÜRKIYE",
  description:
    "Van de groene bergen van de Zwarte Zee tot de warme kust van de Middellandse Zee. Ontdek de unieke karakters van alle zeven regio's van Turkije.",
};

export default function RegiosPage() {
  const regions = getAllRegions();

  const tripsPerRegion = regions.map((region) => ({
    region,
    tripCount: trips.filter((trip) => trip.region === region.id).length,
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        {/* Background: gradient + subtle pattern */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/10"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm2 2h36v36H2V2z' fill='%23294d54' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/10 mb-8">
              <Compass className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-primary/80 mb-4">
              7 regio&apos;s · 1 land
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-6 leading-[1.1] tracking-tight">
              Ontdek de Regio&apos;s van Turkije
            </h1>

            <div className="w-16 h-1 rounded-full bg-accent/60 mx-auto mb-8" />

            <p className="text-lg sm:text-xl text-foreground/80 mb-6 leading-relaxed max-w-2xl mx-auto">
              Van de groene bergen van de Zwarte Zee tot de warme kust van de Middellandse Zee —
              elk met eigen karakter, keuken en verhaal.
            </p>

            <p className="text-base text-foreground/65 leading-relaxed max-w-xl mx-auto">
              Kies een regio en ontdek welke reizen er voor je klaarstaan.
            </p>
          </div>
        </div>
      </section>

      {/* Regions grid */}
      <section className="relative py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-10">
              <span className="flex items-center gap-2 text-sm font-semibold text-primary/70">
                <MapPin className="h-4 w-4" />
                Alle regio&apos;s
              </span>
              <span className="h-px flex-1 max-w-[120px] bg-primary/15" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {tripsPerRegion.map(({ region, tripCount }) => (
                <RegionCard
                  key={region.id}
                  region={region}
                  tripCount={tripCount}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl border border-primary/15 bg-gradient-to-br from-white to-primary/[0.03] p-8 sm:p-12 lg:p-16 text-center shadow-sm">

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                Klaar om Turkije te ontdekken?
              </h2>
              <p className="text-base sm:text-lg text-foreground/75 mb-8 max-w-xl mx-auto leading-relaxed">
                Bekijk al onze reizen of laat ons een reis op maat samenstellen die past bij jouw
                interesses en de regio&apos;s die je wilt verkennen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild variant="outline">
                  <Link href="/reizen">Alle Reizen</Link>
                </Button>
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link href="/contact">Reis Op Maat</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
