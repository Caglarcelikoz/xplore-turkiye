import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getTripTypeBySlug,
  getAllTripTypes,
  getTripTypeHeroImage,
} from "@/lib/data/tripTypes";
import { trips } from "@/lib/data/trips";
import {
  Landmark,
  Route,
  Car,
  Users,
  Sparkles,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripType } from "@/types";
import TripListWithRegionFilter from "@/components/trips/TripListWithRegionFilter";

const iconMap = {
  Landmark,
  Route,
  Car,
  Users,
  Sparkles,
};

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export async function generateStaticParams() {
  const tripTypes = getAllTripTypes();
  return tripTypes.map((type) => ({
    type: type.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  const tripType = getTripTypeBySlug(type);

  if (!tripType) {
    return {
      title: "Trip Type Not Found",
    };
  }

  return {
    title: `${tripType.name} - ${tripType.tagline}`,
    description: tripType.longDescription,
  };
}

export default async function TripTypePage({ params }: PageProps) {
  const { type } = await params;
  const tripType = getTripTypeBySlug(type);

  if (!tripType) {
    notFound();
  }

  // Filter trips by type (support both old 'type' and new 'tripTypes' fields)
  const filteredTrips = trips.filter((trip) => {
    if (trip.tripTypes) {
      return trip.tripTypes.includes(tripType.id as TripType);
    }
    // Fallback to old 'type' field with mapping
    const typeMapping: Record<string, TripType> = {
      citytrips: "cities",
      groepsreizen: "group",
      "self-drives": "road-trips",
      maatwerk: "different",
    };
    const mappedType = typeMapping[trip.type] || trip.type;
    return mappedType === tripType.id;
  });

  const IconComponent = iconMap[tripType.icon as keyof typeof iconMap];
  const heroImage = getTripTypeHeroImage(tripType.id);

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[32vh] sm:min-h-[28vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={tripType.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-br from-primary-dark via-primary-dark/85 to-primary-dark/70 sm:from-primary-dark/70 sm:via-primary-dark/50 sm:to-primary-dark/70" />
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 py-6 sm:py-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white mb-3 transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Terug naar home
            </Link>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white leading-[1.15] tracking-tight">
              {tripType.name}
            </h1>

            <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-white/90 font-light leading-relaxed max-w-xl mx-auto">
              {tripType.tagline}
            </p>

            {filteredTrips.length > 0 && (
              <div className="flex items-center justify-center gap-2 text-white/90 mb-4">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">
                  {filteredTrips.length}{" "}
                  {filteredTrips.length === 1 ? "reis" : "reizen"} in deze
                  categorie
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-2 lg:gap-3">
              <Button
                size="lg"
                asChild
                className="bg-accent hover:bg-accent/90 text-white border-0 shadow-lg text-sm px-5 py-4 font-semibold"
              >
                <Link href={filteredTrips.length > 0 ? "#reizen" : "/contact"}>
                  {filteredTrips.length > 0 ? "Bekijk reizen" : "Reis op maat"}
                </Link>
              </Button>
              {filteredTrips.length > 0 && (
                <Button
                  size="lg"
                  asChild
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm px-5 py-4 font-semibold"
                >
                  <Link href="/contact">Reis op maat</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pt-10 sm:pt-14 lg:pt-16 pb-24">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-white rounded-2xl shadow-lg border border-primary/10 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-1 sm:w-1.5 h-full rounded-l-2xl"
              style={{ backgroundColor: tripType.color }}
              aria-hidden
            />
            <div className="pl-6 sm:pl-8 pr-6 sm:pr-8 py-8 sm:py-10 lg:py-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl font-semibold uppercase tracking-widest text-primary/70">
                  {tripType.description}
                </span>
              </div>

              <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
                <div className="space-y-6 text-foreground/85 leading-[1.75]">
                  {tripType.longDescription
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="text-base sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                </div>
                <div className="relative w-full aspect-[4/5] max-w-sm mx-auto lg:max-w-none lg:mx-0 rounded-xl overflow-hidden border border-primary/10 shadow-md">
                  <Image
                    src={heroImage}
                    alt={tripType.name}
                    fill
                    sizes="(max-width: 1024px)  min(100%, 320px), 320px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-primary/10 lg:hidden">
                <Button
                  size="default"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-sm"
                  asChild
                >
                  <Link href="#reizen">Bekijk reizen</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trips Section with Region Filter */}
      <section id="reizen" className="pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="pb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary/60 mb-2">
                In deze categorie
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                Beschikbare Reizen
              </h2>
              <p className="text-base text-foreground/70">
                {filteredTrips.length > 0
                  ? "Filter op regio om reizen in deze categorie te vinden."
                  : "Binnenkort voegen we reizen in deze categorie toe."}
              </p>
            </div>

            {filteredTrips.length > 0 ? (
              <TripListWithRegionFilter
                trips={filteredTrips}
                accentColor={tripType.color}
              />
            ) : (
              <div className="text-center py-16">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${tripType.color}20` }}
                >
                  {IconComponent && (
                    <IconComponent
                      className="h-10 w-10"
                      style={{ color: tripType.color }}
                    />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Binnenkort beschikbaar
                </h3>
                <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                  We werken aan prachtige reizen in deze categorie. Neem contact
                  met ons op voor een reis op maat.
                </p>
                <Button asChild size="lg">
                  <Link href="/contact">Neem Contact Op</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 max-w-4xl">
        <hr className="border-0 border-t border-primary/15" aria-hidden />
      </div>

      {/* CTA Block */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-white shadow-[0_4px_24px_rgba(41,77,84,0.08)] py-10 sm:py-12 px-6 sm:px-8 lg:px-10 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3">
              Op zoek naar iets anders?
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed max-w-xl mx-auto">
              Ontdek onze andere reistypes of laat ons een reis op maat voor je
              samenstellen.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Reis Op Maat</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
