"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { getAllRegions } from "@/lib/data/regions";
import { ArrowRight } from "lucide-react";
import RegionCard from "@/components/regions/RegionCard";

export default function RegionsSection() {
  const regions = getAllRegions();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-white to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Ontdek de 7 Regio&apos;s
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto">
            Van Marmara tot Zuidoost-Anatolië — elk met eigen karakter, keuken en verhaal
          </p>
        </motion.div>

        {/* Regions Grid - same cards as regios overview page */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {regions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <RegionCard region={region} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-10"
        >
          <Link
            href="/regios"
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors group"
          >
            <span>Bekijk alle regio&apos;s</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
