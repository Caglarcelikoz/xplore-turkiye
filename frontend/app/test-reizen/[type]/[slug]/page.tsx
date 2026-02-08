import { use } from "react";
import { notFound } from "next/navigation";
import { getTripBySlug } from "@/lib/data/trips";
import TripDetail from "@/components/trips/TripDetail";

interface TripDetailPageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

export default function TripDetailPage({ params }: TripDetailPageProps) {
  const { type, slug } = use(params);
  const trip = getTripBySlug(slug);

  if (!trip || trip.type !== type) {
    notFound();
  }

  return <TripDetail trip={trip} />;
}
