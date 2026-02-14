import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTripBySlug, getAllTrips } from "@/lib/data/trips";
import TripDetail from "@/components/trips/TripDetail";
import { generateSEOMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const trips = getAllTrips();
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return { title: "Reis niet gevonden" };

  // Use the trip's first image for OG tags
  const heroImage = trip.images?.[0] || '/og-default.jpg';

  return generateSEOMetadata({
    title: `${trip.title} | XPLORE TÜRKIYE`,
    description: trip.overview,
    path: `/reizen/${slug}`,
    image: heroImage,
  });
}

export default async function TripDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  return <TripDetail trip={trip} />;
}
