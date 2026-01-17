"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Heart, Users, Globe, Sparkles, Shield, Check } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Passie",
      description: "Onze diepe liefde voor Turkije drijft ons om de mooiste reizen te creëren",
      color: "from-accent/20 to-accent/5",
    },
    {
      icon: Award,
      title: "Expertise",
      description: "Jarenlange ervaring en uitgebreide kennis van alle regio's in Turkije",
      color: "from-primary/20 to-primary/5",
    },
    {
      icon: Users,
      title: "Persoonlijk",
      description: "Elke reis wordt met persoonlijke aandacht en zorg samengesteld",
      color: "from-primary-light/20 to-primary-light/5",
    },
    {
      icon: Globe,
      title: "Uniek",
      description: "Ontdek verborgen pareltjes en unieke ervaringen die je nergens anders vindt",
      color: "from-accent/20 to-accent/5",
    },
  ];

  const features = [
    "Diepgaande kennis van Turkije en alle regio's",
    "Zorgvuldige planning met aandacht voor detail",
    "Aangesloten bij garantiefondsen voor jouw gemoedsrust",
    "Van groepsreizen tot volledig op maat gemaakte reizen",
    "Begeleiding van boeking tot thuiskomst",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Over Xplore Turkiye & Beyond"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary-dark/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Over Ons</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Xplore Turkiye & Beyond
            </h1>
            <p className="text-xl sm:text-2xl text-white/90">
              Jouw betrouwbare partner voor onvergetelijke reizen naar Turkije
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-12 bg-accent rounded-full" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                  Wie zijn wij?
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                <div className="space-y-4">
                  <p className="text-lg text-foreground leading-relaxed">
                    Xplore Turkiye & Beyond is een gespecialiseerde reisorganisatie
                    die zich volledig richt op het organiseren van onvergetelijke reizen
                    naar Turkije. Met jarenlange ervaring en een diepe passie voor dit
                    prachtige land, helpen wij reizigers om de mooiste plekken te
                    ontdekken.
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    Ons team bestaat uit ervaren reisexperts die Turkije door en door
                    kennen. We hebben alle regio&apos;s zelf bezocht, van de bruisende
                    stranden van de Mediterrane kust tot de mysterieuze landschappen
                    van Cappadocië, en van de historische steden in het oosten tot de
                    moderne metropool Istanbul.
                  </p>
                </div>
                <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80"
                    alt="Team Xplore Turkiye"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Globe className="h-8 w-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                  Onze Missie
                </h2>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-background rounded-2xl p-8 border border-primary/10">
                <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-6">
                  Wij geloven dat elke reis een uniek avontuur zou moeten zijn. Onze
                  missie is om reizigers te helpen de perfecte reis te vinden die
                  aansluit bij hun wensen, budget en reisstijl.
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  We streven ernaar om niet alleen reizen te verkopen, maar echte
                  ervaringen te creëren die een blijvende indruk achterlaten. Met
                  persoonlijk reisadvies, zorgvuldige planning en begeleiding bij
                  elke stap van je reis, zorgen wij ervoor dat je je volledig kunt
                  concentreren op het genieten van je avontuur.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Onze Waarden
            </h2>
            <p className="text-lg text-muted-foreground">
              Wat ons drijft en onderscheidt
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-gradient-to-br ${value.color} rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all`}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Shield className="h-8 w-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                  Waarom Xplore Turkiye & Beyond?
                </h2>
              </div>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-xl border border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-base sm:text-lg text-foreground pt-1">
                      <strong className="text-primary">{feature.split(":")[0]}:</strong>{" "}
                      {feature.includes(":") ? feature.split(":")[1] : feature}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
