import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getRegionBySlug, getAllRegions } from "@/lib/data/regions";
import { getRegionImage } from "@/lib/data/regionImages";
import { trips } from "@/lib/data/trips";
import { MapPin, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import TripListWithTypeFilter from "@/components/trips/TripListWithTypeFilter";
import TurkeyMap from "@/components/TurkeyMap";
import { generateSEOMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{
    region: string;
  }>;
}

export async function generateStaticParams() {
  const regions = getAllRegions();
  return regions.map((region) => ({
    region: region.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region } = await params;
  const regionData = getRegionBySlug(region);

  if (!regionData) {
    return {
      title: "Regio Niet Gevonden",
    };
  }

  // Use the region's hero image for OG tags
  const heroImage = regionData.images?.[0] ?? getRegionImage(regionData.id);

  return generateSEOMetadata({
    title: `${regionData.name} - Ontdek de regio`,
    description: regionData.description,
    path: `/regios/${region}`,
    image: heroImage,
  });
}

export default async function RegionPage({ params }: PageProps) {
  const { region } = await params;
  const regionData = getRegionBySlug(region);

  if (!regionData) {
    notFound();
  }

  const filteredTrips = trips.filter((trip) => trip.region === regionData.id);

  const descriptionParagraphs = regionData.longDescription
    ? regionData.longDescription.split("\n\n")
    : [];

  const heroImage = regionData.images?.[0] ?? getRegionImage(regionData.id);

  return (
    <div className="min-h-screen">
      {/* Hero – compact, gecentreerd, met vlag (zelfde principe als xplore-your-way) */}
      <section className="relative min-h-[32vh] sm:min-h-[28vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImage ? (
            <>
              <Image
                src={heroImage}
                alt={regionData.name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-br from-primary-dark via-primary-dark/85 to-primary-dark/70 sm:from-primary-dark/70 sm:via-primary-dark/50 sm:to-primary-dark/70" />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${regionData.color || "#294d54"} 0%, ${regionData.color || "#294d54"}99 100%)`,
              }}
            />
          )}
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 py-6 sm:py-8 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white leading-[1.15] tracking-tight">
              {regionData.name}
            </h1>

            <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-white/90 font-light leading-relaxed max-w-xl mx-auto">
              {regionData.shortDescription}
            </p>

            {filteredTrips.length > 0 && (
              <div className="flex items-center justify-center gap-2 text-white/90 mb-4">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">
                  {filteredTrips.length}{" "}
                  {filteredTrips.length === 1 ? "reis" : "reizen"} in deze regio
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
              <Button
                size="lg"
                asChild
                variant="outline"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm px-5 py-4 font-semibold"
              >
                <Link href="/contact">Reis op maat</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Description card –zelfde principe als xplore-your-way */}
      <section className="relative z-10 px-4 pt-10 sm:pt-14 lg:pt-16 pb-10">
        <div className="container mx-auto max-w-5xl">
          <div className="relative bg-white rounded-2xl shadow-lg border border-primary/10 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-1 sm:w-1.5 h-full rounded-l-2xl"
              style={{ backgroundColor: regionData.color || "#294d54" }}
              aria-hidden
            />
            <div className="pl-6 sm:pl-8 pr-6 sm:pr-8 py-8 sm:py-10 lg:py-12">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="h-px flex-1 max-w-[60px] rounded-full"
                  style={{ backgroundColor: regionData.color || "#294d54" }}
                />
                <span className="text-xl font-semibold uppercase tracking-widest text-primary/70">
                  Over deze regio
                </span>
              </div>

              <div className="space-y-6 text-foreground/85 leading-[1.75] mb-10">
                <p className="text-xl font-medium text-foreground leading-relaxed">
                  {regionData.description}
                </p>
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-base sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 items-stretch">
                <div className="w-full min-h-[320px] lg:min-h-[400px] lg:min-w-0 lg:flex-[2] rounded-xl overflow-hidden border border-primary/10 shadow-md bg-muted/30">
                  <TurkeyMap
                    highlightRegion={regionData.id}
                    highlightColor={regionData.color}
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

      {/* XPLORE INSIGHT Section */}
      {regionData.insight && (
        <section className="py-16 sm:py-20 bg-gradient-to-br from-accent/5 via-white to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div
                className="relative overflow-hidden rounded-2xl border-2 p-8 sm:p-10 bg-white shadow-lg"
                style={{
                  borderColor: `${regionData.color || "#294d54"}40`,
                }}
              >
                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-10"
                  style={{
                    background: `radial-gradient(circle at top right, ${
                      regionData.color || "#294d54"
                    } 0%, transparent 70%)`,
                  }}
                />

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${regionData.color || "#294d54"}20`,
                    }}
                  >
                    <Lightbulb
                      className="h-6 w-6"
                      style={{ color: regionData.color || "#294d54" }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: regionData.color || "#294d54" }}
                      >
                        XPLORE INSIGHT
                      </span>
                    </div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: regionData.color || "#294d54" }}
                    >
                      {regionData.insight.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <p className="text-base text-foreground/80 leading-relaxed pl-16">
                  {regionData.insight.content}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trips Section with Type Filter */}
      <section id="reizen" className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="pb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary/60 mb-2">
                In deze regio
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                Reizen in deze regio
              </h2>
              <p className="text-base text-foreground/70">
                {filteredTrips.length > 0
                  ? `Filter op reistype om reizen in ${regionData.name} te vinden.`
                  : "Binnenkort voegen we reizen in deze regio toe."}
              </p>
            </div>

            {filteredTrips.length > 0 ? (
              <TripListWithTypeFilter
                trips={filteredTrips}
                accentColor={regionData.color || "#294d54"}
              />
            ) : (
              <div className="text-center py-16">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{
                    backgroundColor: `${regionData.color || "#294d54"}20`,
                  }}
                >
                  <MapPin
                    className="h-10 w-10"
                    style={{ color: regionData.color || "#294d54" }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Binnenkort beschikbaar
                </h3>
                <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                  We werken aan prachtige reizen in deze regio. Neem contact met
                  ons op voor een reis op maat.
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

      {/* Ontdek Andere Regio's - Compact */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">
              Ontdek ook
            </h3>
            {/* Compact Region Pills - 3 per rij */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-w-2xl mx-auto">
              {getAllRegions()
                .filter((r) => r.id !== regionData.id)
                .map((region) => (
                  <Link
                    key={region.id}
                    href={`/regios/${region.id}`}
                    className="group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 hover:scale-105 shadow-sm"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: region.color || "#294d54" }}
                    />
                    <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors whitespace-nowrap">
                      {region.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
