"use client";

import { motion } from "motion/react";
import { Users } from "lucide-react";
import TurkeyMap from "@/components/TurkeyMap";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function AboutSection() {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Text column */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Xplore US
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
              Jullie lokale partner voor{" "}
              <span className="text-accent">Turkije</span>
            </h2>
            <div className="space-y-5 text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>
                XPLORE Türkiye is ontstaan vanuit de overtuiging dat deze
                veelzijdigheid het vertrekpunt moet zijn van elke reis. Wij
                brachten een team samen met één gedeelde visie: Turkije laten
                ontdekken zoals het werkelijk is. Elk traject dat wij uitwerken
                vertrekt vanuit de eigen identiteit van een regio en de
                samenhang tussen cultuur, geschiedenis en natuur. Reizen groeien
                bij ons uit de plek zelf, niet uit een vast stramien.
              </p>
              <p>
                Onze reizen zijn volledig op maat en gebaseerd op eigen
                ervaringen en diepgaande kennis van het land. Wij luisteren,
                denken mee en begeleiden elke stap. Van het eerste idee tot na
                de terugkeer blijven wij betrokken. Als lokale partner voor
                Turkije, met overzicht, verantwoordelijkheid en oprechte
                betrokkenheid.
              </p>
              <p>
                Gastvrijheid vormt de kern van Turkije en diezelfde houding
                dragen wij uit in onze manier van werken. Met aandacht,
                bereikbaarheid en zorg voor elk detail begeleiden wij elke reis
                van begin tot einde. XPLORE Türkiye staat klaar om deze
                bestemming te laten ontdekken met kennis, overtuiging en respect
                voor haar vele lagen.
              </p>
            </div>
            <div className="w-20 h-1 bg-accent rounded-full mt-8" />
          </motion.div>

          {/* Map column */}
          <div className="order-2 lg:order-2 relative z-10">
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
