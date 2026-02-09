"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getAllTripTypes } from "@/lib/data/tripTypes";
import { ArrowRight, Route } from "lucide-react";
import TripTypeCard from "@/components/trip-types/TripTypeCard";

export default function XploreYourWaySection() {
  const tripTypes = getAllTripTypes();

  return (
    <section className="py-16 bg-gradient-to-br from-background via-white to-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Route className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              XPLORE YOUR WAY
            </span>
          </div>

          <p className="text-start text-lg text-foreground/70 max-w-[1600px] mx-auto">
            Hoe je reist, bepaalt wat je ziet én wat je onthoudt. Turkije
            verandert niet alleen per regio, maar ook per ritme, invalshoek en
            reisvorm. Daarom werkt XPLORE TÜRKIYE met verschillende reistypes.
            Niet als vaste kaders, maar als manieren om de bestemming op een
            andere manier te benaderen. Elke formule vertrekt vanuit het land
            zelf en vertaalt zijn veelzijdigheid naar een doordachte
            reiservaring.
          </p>
        </motion.div>

        {/* Trip Types Grid – 2 cols tablet landscape, 1 row (5) only on xl desktop */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4 lg:gap-5 xl:gap-5 max-w-[1600px] mx-auto">
          {tripTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TripTypeCard type={type} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
