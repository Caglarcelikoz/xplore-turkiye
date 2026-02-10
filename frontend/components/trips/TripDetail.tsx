"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Euro,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Sparkles,
  Clock,
  Hotel,
  Plane,
  Info,
  Sun,
  Cloud,
  Snowflake,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trip } from "@/types";
import { getRegionById } from "@/lib/data/regions";

interface TripDetailProps {
  trip: Trip;
}

export default function TripDetail({ trip }: TripDetailProps) {
  const [openDayIndex, setOpenDayIndex] = useState<number | null>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const region = getRegionById(trip.region);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % trip.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + trip.images.length) % trip.images.length,
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile First */}
      <section className="relative min-h-[70dvh] sm:min-h-[65vh] lg:min-h-[55vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={trip.images[0]}
            alt={trip.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Mobile: stronger overlay, Desktop: subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-br from-primary-dark via-primary-dark/85 to-primary-dark/70 sm:from-primary-dark/70 sm:via-primary-dark/50 sm:to-primary-dark/70" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start lg:items-end">
              {/* Title & Description - Mobile First */}
              <div className="lg:col-span-7 order-1 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  {/* Tags & Region */}
                  {/* <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                    <Badge className="bg-accent hover:bg-accent/90 border-0 text-white px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold shadow-lg">
                      {region?.name}
                    </Badge>
                    {trip.tags &&
                      trip.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium"
                        >
                          {tag}
                        </Badge>
                      ))}
                  </div> */}

                  {/* Title - Mobile First Sizing */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white leading-[1.1] tracking-tight">
                    {trip.title}
                  </h1>

                  {/* Subtitle - Mobile First Sizing */}
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-white/95 font-light leading-relaxed max-w-2xl">
                    {trip.subtitle}
                  </p>

                  {/* CTA Buttons - Hidden on Mobile (shown in price card) */}
                  {/* <div className="hidden sm:flex flex-col sm:flex-row gap-3 lg:gap-4">
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-white border-0 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 text-base lg:text-lg px-6 lg:px-8 py-5 lg:py-6 font-semibold"
                      >
                        Reis Aanvragen
                      </Button>
                    </div> */}
                </motion.div>
              </div>

              {/* Price Card - Mobile First Design */}
              <div className="lg:col-span-5 order-2 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative"
                >
                  {/* Glow effect - subtle on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 lg:from-accent/30 lg:to-primary/30 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl opacity-60" />

                  {/* Card - Compact on Mobile */}
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl border border-white/20">
                    {/* Price Header - Mobile Optimized */}
                    <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-primary/10">
                      <div className="flex items-baseline gap-2 mb-1 sm:mb-2">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                          {trip.price.toLocaleString()}
                        </span>
                        {trip.priceText && (
                          <span className="text-base sm:text-lg text-muted-foreground">
                            {trip.priceText}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {trip.priceNote || ""}
                      </p>
                    </div>

                    {/* Trip Details - Compact on Mobile */}
                    <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                      <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Duur
                          </div>
                          <div className="text-sm sm:text-base font-bold text-primary">
                            {trip.duration} dagen
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Vertrek
                          </div>
                          <div className="text-sm sm:text-base font-bold text-primary">
                            {trip.departureNote}
                          </div>
                        </div>
                      </div>

                      {trip.accommodation && (
                        <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Hotel className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                              Accommodatie
                            </div>
                            <div className="text-sm sm:text-base font-bold text-primary">
                              {typeof trip.accommodation === "string"
                                ? trip.accommodation.split("|")[0]
                                : trip.accommodation.name}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Included Benefits */}
                    {trip.transportationIncluded && (
                      <div className="pt-5 sm:pt-6 border-t border-primary/10 mb-5 sm:mb-0">
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-primary mb-0.5 sm:mb-1">
                              Inclusief vluchten
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mobile CTA Buttons - Only visible on mobile */}
                    {/* <div className="flex flex-col gap-2.5 sm:hidden pt-5 border-t border-primary/10">
                      <Button
                        size="default"
                        className="w-full bg-accent hover:bg-accent/90 text-white border-0 shadow-lg font-semibold text-sm py-5"
                      >
                        Reis Aanvragen
                      </Button>
                      <Button
                        size="default"
                        variant="outline"
                        className="w-full bg-primary/5 hover:bg-primary/10 text-primary border-2 border-primary/20 hover:border-primary/30 font-semibold text-sm py-5"
                      >
                        Meer Informatie
                      </Button>
                    </div> */}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Accent bar - responsive height */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-accent via-primary to-accent opacity-60" />
      </section>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-background via-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-12 bg-accent rounded-full" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                  Over deze reis
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Text Content */}
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-primary/10 shadow-lg">
                    {trip.introductionText && (
                      <div className="text-base text-foreground/90 leading-relaxed whitespace-pre-line space-y-4">
                        {trip.introductionText
                          .split("\n\n")
                          .map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image */}
                {trip.images && trip.images.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
                  >
                    <Image
                      src={trip.images[1]}
                      alt={trip.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Carousel */}
      {trip.images.length > 1 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-background via-white to-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-8 text-center">
                Impressie van jouw reis
              </h2>

              <div className="relative">
                {/* Carousel Container */}
                <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute inset-0"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = Math.abs(offset.x) * velocity.x;
                        if (swipe < -10000) {
                          nextImage();
                        } else if (swipe > 10000) {
                          prevImage();
                        }
                      }}
                    >
                      <Image
                        src={trip.images[currentImageIndex]}
                        alt={`${trip.title} - Foto ${currentImageIndex + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                        className="object-cover"
                        priority={currentImageIndex === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center text-primary hover:bg-white hover:scale-110 transition-all group"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 group-hover:-translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center text-primary hover:bg-white hover:scale-110 transition-all group"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 z-20 bg-primary-dark/80 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20">
                    {currentImageIndex + 1} / {trip.images.length}
                  </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {trip.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentImageIndex
                          ? "w-8 h-3 bg-primary"
                          : "w-3 h-3 bg-primary/30 hover:bg-primary/50"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Thumbnail Preview (Optional - for larger screens) */}
                <div className="hidden lg:grid grid-cols-5 gap-3 mt-6">
                  {trip.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                        index === currentImageIndex
                          ? "ring-2 ring-primary scale-105 shadow-lg"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 0vw, 200px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Itinerary Section with Accordion */}
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
                <Clock className="h-8 w-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                  Reisplan per dag
                </h2>
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
                                <p className="text-base text-foreground mb-4 leading-relaxed whitespace-pre-line">
                                  {day.description}
                                </p>
                                {day.image && (
                                  <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden mb-4">
                                    <Image
                                      src={day.image}
                                      alt={day.title}
                                      fill
                                      sizes="(max-width: 768px) 100vw, 50vw"
                                      className="object-cover"
                                    />
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

      {/* Highlights Section */}
      {/* <section className="py-12 sm:py-16 md:py-20 bg-background">
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
                      <p className="text-foreground font-medium pt-2">
                        {highlight}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Best Travel Time Section */}
      {trip.bestTravelTimeDetailed && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sun className="h-8 w-8 text-accent" />
                  <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                    Beste reistijd
                  </h2>
                </div>
                <div className="bg-white rounded-xl p-6 border border-primary/10 shadow-sm">
                  <p className="text-base sm:text-lg text-foreground leading-relaxed whitespace-pre-line">
                    {trip.bestTravelTimeDetailed}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Included/Excluded Section */}
      <section className=" bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">
              Wat is inbegrepen?
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Inclusief */}
              <div className="relative bg-white rounded-xl border border-primary/10 overflow-hidden shadow-sm">
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 rounded-l-xl bg-green-600"
                  aria-hidden
                />
                <div className="pl-5 sm:pl-6 pr-5 sm:pr-6 py-5 sm:py-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">
                    Inclusief
                  </p>
                  <ul className="space-y-2.5">
                    {trip.included.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-foreground leading-snug"
                      >
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exclusief */}
              <div className="relative bg-white rounded-xl border border-primary/10 overflow-hidden shadow-sm">
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 rounded-l-xl bg-accent"
                  aria-hidden
                />
                <div className="pl-5 sm:pl-6 pr-5 sm:pr-6 py-5 sm:py-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                    Exclusief
                  </p>
                  <ul className="space-y-2.5">
                    {trip.excluded.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/90 leading-snug"
                      >
                        <X className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notes Section – per notitie een apart blok met info-styling */}
      {trip.importantNotes &&
        (() => {
          const notes = Array.isArray(trip.importantNotes)
            ? trip.importantNotes
            : [trip.importantNotes];
          return (
            <section className="py-12 bg-background">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl font-bold text-primary mb-6"
                  >
                    Belangrijk om te weten
                  </motion.h2>
                  <div className="space-y-4">
                    {notes.map((note, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/90 p-4 sm:p-5"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Info className="h-4 w-4 text-blue-700" />
                        </div>
                        <p className="text-sm sm:text-base text-foreground leading-relaxed pt-0.5">
                          {note}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })()}
    </div>
  );
}
