"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import NewsletterSignup from "@/components/layout/NewsletterSignup";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ReizenPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-primary/5 to-background border-b border-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Compass className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Reizen
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Onze reizen komen binnenkort online
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80">
              Achter de schermen werken we intensief aan de lancering van ons
              reismerk en de eerste reisprogramma’s. Elk traject wordt
              zorgvuldig opgebouwd, vertrekkend vanuit plaats, context en
              beleving. De officiële lancering staat voor de deur en wat eraan
              komt, belooft bijzonder te worden.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subscribe section */}
      <section
        id="reizen-notify"
        className="py-12 sm:py-16 md:py-20 bg-primary-dark text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-md mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Wil je een seintje krijgen?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6">
              Schrijf je in voor onze nieuwsbrief en we sturen je een bericht
              zodra de reizen online staan.
            </p>
            <div className="bg-white/5 rounded-xl border border-white/10 p-6 sm:p-8">
              <NewsletterSignup />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
