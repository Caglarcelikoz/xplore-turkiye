"use client";

import { motion } from "framer-motion";
import { PenLine, Compass, Telescope, HeartHandshake } from "lucide-react";

const usps = [
  {
    icon: PenLine,
    title: "Reizen op maat, tot in de details",
    description:
      "Elke reis wordt volledig op maat uitgewerkt, afgestemd op jouw wensen, tempo en interesses.",
    gradient: "from-primary to-primary-dark",
    accentBorder: "group-hover:border-primary/30",
  },
  {
    icon: Compass,
    title: "Diepgaande expertise in Turkije",
    description:
      "Gespecialiseerd in Turkije, met jarenlange ervaring in verschillende regio's en culturen.",
    gradient: "from-accent to-accent-hover",
    accentBorder: "group-hover:border-accent/30",
  },
  {
    icon: Telescope,
    title: "Verder kijken dan het bekende",
    description:
      "We laten je Turkije ontdekken in al zijn facetten, voorbij de vanzelfsprekende paden.",
    gradient: "from-primary-light to-primary",
    accentBorder: "group-hover:border-primary/30",
  },
  {
    icon: HeartHandshake,
    title: "Persoonlijke begeleiding van begin tot einde",
    description:
      "Van het eerste idee tot na de terugkeer begeleiden wij elke stap van jouw reis.",
    gradient: "from-accent to-accent-hover",
    accentBorder: "group-hover:border-accent/30",
  },
];

const stagger = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function WhyUsSection() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              Xplore our values
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Wat ons anders maakt
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* USP grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.title}
                {...stagger}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className={`group relative bg-background rounded-2xl p-6 sm:p-8 border border-primary/10 ${usp.accentBorder} hover:shadow-xl transition-all duration-300`}
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start gap-4 sm:gap-5">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${usp.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-primary mb-2 leading-snug">
                      {usp.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {usp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
