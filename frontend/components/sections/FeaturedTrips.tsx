"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import TripCarousel from "@/components/trips/TripCarousel";
import { getFeaturedTrips } from "@/lib/data/trips";

export default function FeaturedTrips() {
  const featuredTrips = getFeaturedTrips();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4 px-4">
            Uitgelichte Reizen
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Ontdek onze meest populaire reizen naar Turkije, zorgvuldig
            samengesteld voor een onvergetelijke ervaring.
          </p>
        </motion.div>

        <TripCarousel trips={featuredTrips} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link
            href="/reizen"
            className={cn(
              buttonStyles.getClasses("outline", "lg"),
              "w-full sm:w-auto flex items-center justify-center",
            )}
          >
            Bekijk Alle Reizen
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

