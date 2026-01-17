"use client";

import { motion } from "framer-motion";
import { Headphones, MessageSquare, Shield, Star, Globe, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "Persoonlijk reisadvies",
    description: "Op maat gemaakte reisadviezen van onze ervaren reisexperts",
    highlight: "Expert advies",
  },
  {
    icon: MessageSquare,
    title: "Begeleiding bij elke stap",
    description: "Van boeking tot thuiskomst, wij staan voor je klaar",
    highlight: "24/7 support",
  },
  {
    icon: Shield,
    title: "Aangesloten bij garantiefondsen",
    description: "Jouw reis is beschermd door erkende garantiefondsen",
    highlight: "Veilig & betrouwbaar",
  },
  {
    icon: Star,
    title: "Vijf sterren bij Google",
    description: "Bewezen kwaliteit door tevreden reizigers",
    highlight: "5★ rating",
  },
  {
    icon: Globe,
    title: "De mooiste reizen",
    description: "Unieke bestemmingen en onvergetelijke ervaringen",
    highlight: "Unieke routes",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23294d54' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
              Waarom Kiezen
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Daarom Xplore Turkiye & Beyond
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Heerlijk reizen zonder zorgen
          </p>
        </motion.div>

        {/* Features Grid - Alternating Layout */}
        <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${
                  isEven 
                    ? "from-primary/5 via-white to-accent/5" 
                    : "from-accent/5 via-white to-primary/5"
                } border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl`}>
                  
                  {/* Icon Section */}
                  <div className={`flex-shrink-0 ${isEven ? "order-1" : "order-2 sm:order-1"}`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${
                        isEven 
                          ? "bg-gradient-to-br from-primary to-primary-dark" 
                          : "bg-gradient-to-br from-accent to-accent-hover"
                      } flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow`}
                    >
                      <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                      {/* Decorative dots */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-80" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full opacity-60" />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className={`flex-1 text-center sm:text-left ${isEven ? "order-2" : "order-1 sm:order-2"}`}>
                    <div className="inline-flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                        {feature.highlight}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 group-hover:text-primary-dark transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Line */}
                  <div className={`hidden sm:block flex-shrink-0 w-px h-16 bg-gradient-to-b ${
                    isEven 
                      ? "from-primary/20 via-primary/40 to-transparent" 
                      : "from-accent/20 via-accent/40 to-transparent"
                  } ${isEven ? "order-3" : "order-3"}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
            <Star className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-primary">
              Meer dan 1000+ tevreden reizigers
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
