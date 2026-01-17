"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Euro, ChevronDown, ChevronUp, Check, X, Sparkles, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trip } from "@/types";
import { getRegionById } from "@/lib/data/regions";

interface TripDetailProps {
  trip: Trip;
}

export default function TripDetail({ trip }: TripDetailProps) {
  const [openDayIndex, setOpenDayIndex] = useState<number | null>(0);
  const region = getRegionById(trip.region);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={trip.images[0]}
            alt={trip.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary-dark/60" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 pb-8 sm:pb-12 text-white w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-accent/20 backdrop-blur-sm border border-accent/30 text-white">
                {region?.name}
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                {trip.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/95">
                {trip.subtitle}
              </p>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Euro className="h-5 w-5 text-accent" />
                    <span className="text-xs text-white/80">Prijs vanaf</span>
                  </div>
                  <div className="text-2xl font-bold">€{trip.price.toLocaleString()}</div>
                  <div className="text-xs text-white/70 mt-1">per persoon</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    <span className="text-xs text-white/80">Duur</span>
                  </div>
                  <div className="text-2xl font-bold">{trip.duration}</div>
                  <div className="text-xs text-white/70 mt-1">dagen</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span className="text-xs text-white/80">Vertrek</span>
                  </div>
                  <div className="text-xl font-bold">{trip.departureCity}</div>
                  <div className="text-xs text-white/70 mt-1">Beste tijd: {trip.bestTravelTime}</div>
                </motion.div>
              </div>

              <p className="text-sm text-white/80">{trip.priceNote}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-accent rounded-full" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary">Over deze reis</h2>
              </div>
              <p className="text-lg sm:text-xl text-foreground leading-relaxed">
                {trip.overview}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-accent" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                  Wat kan ik tijdens deze reis bezoeken?
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {trip.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-background rounded-xl p-5 border border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <p className="text-foreground font-medium pt-2">{highlight}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Itinerary Section with Accordion */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-8 w-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary">Reisplan per dag</h2>
              </div>

              <div className="space-y-4">
                {trip.itinerary.map((day, index) => {
                  const isOpen = openDayIndex === index;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="bg-white rounded-xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => setOpenDayIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-primary/5 transition-colors group"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                            {day.day}
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">
                              {day.title}
                            </h3>
                            {!isOpen && (
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {day.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-primary" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
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
                            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                              <div className="pl-16 border-l-2 border-primary/20">
                                <p className="text-base text-foreground mb-4 leading-relaxed">
                                  {day.description}
                                </p>
                                {day.locations && day.locations.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {day.locations.map((location, locIndex) => (
                                      <Badge
                                        key={locIndex}
                                        variant="secondary"
                                        className="bg-primary/10 text-primary border-primary/20"
                                      >
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {location}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Included/Excluded Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/5 to-background rounded-2xl p-6 sm:p-8 border border-primary/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Reis is inclusief</h3>
              </div>
              <ul className="space-y-3">
                {trip.included.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-muted to-background rounded-2xl p-6 sm:p-8 border border-primary/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-muted-foreground/20 flex items-center justify-center">
                  <X className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Reis is exclusief</h3>
              </div>
              <ul className="space-y-3">
                {trip.excluded.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {trip.images.length > 1 && (
        <section className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-8 text-center">
                Impressie van jouw reis
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trip.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative h-64 sm:h-80 rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <Image
                      src={image}
                      alt={`${trip.title} - Foto ${index + 2}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Klaar voor jouw avontuur?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-white/90">
              Neem contact met ons op voor meer informatie of vraag direct een reis aan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-white/90 border-white"
              >
                Reis Aanvragen
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Meer Informatie
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
