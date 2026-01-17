"use client";

import { useState, useMemo, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { TripType, Region } from "@/types";
import TripFilters from "@/components/trips/TripFilters";
import TripCard from "@/components/trips/TripCard";
import { getTripsByType } from "@/lib/data/trips";
import { tripTypes } from "@/lib/data/constants";
import { getTripTypePage } from "@/lib/data/tripTypePages";

interface TripTypePageProps {
  params: Promise<{
    type: string;
  }>;
}

export default function TripTypePage({ params }: TripTypePageProps) {
  const { type } = use(params);
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const tripType = tripTypes.find((t) => t.id === type);
  if (!tripType) {
    notFound();
  }

  const pageContent = getTripTypePage(type as TripType);
  const trips = getTripsByType(type as TripType);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const regionMatch =
        selectedRegion === "all" || trip.region === selectedRegion;
      return regionMatch;
    });
  }, [selectedRegion, trips]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={pageContent.heroImage}
            alt={pageContent.heroTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              {pageContent.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90">
              {pageContent.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trips Section - Moved to top */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
              Beschikbare {tripType.name}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Ontdek onze zorgvuldig samengestelde reizen
            </p>
          </motion.div>

          <TripFilters
            selectedType={type as TripType}
            selectedRegion={selectedRegion}
            onTypeChange={() => {}}
            onRegionChange={setSelectedRegion}
            showTypeFilter={false}
          />

          <div className="mb-4 text-sm text-muted-foreground">
            {filteredTrips.length}{" "}
            {filteredTrips.length === 1 ? "reis gevonden" : "reizen gevonden"}
          </div>

          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Geen reizen gevonden in deze regio.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6">
                Over {tripType.name}
              </h2>
              <p className="text-base sm:text-lg text-foreground leading-relaxed mb-8">
                {pageContent.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {pageContent.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg border border-primary/10"
                  >
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-foreground">
                      {highlight}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
              Waarom kiezen voor {tripType.name}?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pageContent.whyChoose.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-primary/5 to-background rounded-2xl p-6 border border-primary/10"
              >
                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {pageContent.faq && pageContent.faq.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
                Veelgestelde Vragen
              </h2>
              <div className="space-y-4">
                {pageContent.faq.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white rounded-lg border border-primary/10 overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-primary/5 transition-colors"
                    >
                      <span className="font-semibold text-primary text-sm sm:text-base pr-4">
                        {faq.question}
                      </span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.3, ease: "easeInOut" },
                            opacity: { duration: 0.2, ease: "easeInOut" },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
