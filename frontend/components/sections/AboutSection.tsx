"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import TurkeyMap from "@/components/TurkeyMap";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
          {/* Text column */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Wie wij zijn
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Jullie lokale partner voor{" "}
              <span className="text-accent">Turkije</span>
            </h2>
            <div className="space-y-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <p>
                XPLORE Türkiye is ontstaan vanuit de overtuiging dat de
                veelzijdigheid van Turkije het vertrekpunt moet zijn van elke
                reis. Wij brachten een team samen met één gedeelde visie: Turkije
                laten ontdekken zoals het werkelijk is.
              </p>
              <p>
                Onze kennis en ervaring zijn opgebouwd door jarenlange
                betrokkenheid bij de bestemming en door diepgaande verkenning van
                haar regio&apos;s. We kennen Turkije niet als één verhaal, maar als
                een land met vele identiteiten, ritmes en gezichten.
              </p>
              <p>
                Onze expertise is gegroeid uit een sterke verbondenheid met het
                land. Die diversiteit vormt de kern van onze aanpak en bepaalt hoe
                wij reizen vormgeven.
              </p>
            </div>
            <div className="w-20 h-1 bg-accent rounded-full mt-8" />
          </motion.div>

          {/* Map column */}
          <div className="order-2 md:order-2 relative z-10">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl opacity-50" />
            <div className="relative bg-background rounded-2xl shadow-2xl border border-primary/10 p-2 sm:p-4">
              <TurkeyMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
