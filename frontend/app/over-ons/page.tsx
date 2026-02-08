"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  Route,
  Ear,
  PenTool,
  Phone,
  ArrowRight,
  Quote,
  Eye,
  Target,
  ShieldCheck,
  Globe,
  Landmark,
  Waypoints,
  Mountain,
} from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AboutSection from "@/components/sections/AboutSection";

/* ─── animation helpers ─── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

/* ─── data ─── */
const pillars = [
  {
    icon: Eye,
    title: "Onze visie",
    description:
      "Turkije laten ontdekken zoals het werkelijk is — met respect voor haar vele lagen, identiteiten en gezichten.",
    color: "from-primary to-primary-dark",
  },
  {
    icon: Target,
    title: "Onze expertise",
    description:
      "Gegroeid uit jarenlange ervaring in verschillende regio's van Turkije en een sterke verbondenheid met het land.",
    color: "from-accent to-accent-hover",
  },
  {
    icon: ShieldCheck,
    title: "Onze belofte",
    description:
      "Volledig op maat gemaakte reizen, gebaseerd op eigen ervaringen en diepgaande kennis. Van het eerste idee tot na de terugkeer.",
    color: "from-primary-light to-primary",
  },
];

const approachSteps = [
  {
    icon: Ear,
    title: "Wij luisteren",
    description:
      "Elk traject begint met jullie verhaal. Wij nemen de tijd om wensen, interesses en verwachtingen te begrijpen.",
    number: "01",
  },
  {
    icon: PenTool,
    title: "Wij ontwerpen",
    description:
      "Op basis van eigen ervaringen en diepgaande kennis werken wij een reis uit die vertrekt vanuit de identiteit van een regio.",
    number: "02",
  },
  {
    icon: Route,
    title: "Wij begeleiden",
    description:
      "Van het eerste idee tot na de terugkeer blijven wij betrokken. Als lokale partner met overzicht, verantwoordelijkheid en oprechte betrokkenheid.",
    number: "03",
  },
];


export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-24 md:py-28 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
            alt="Istanbul skyline — waar Oost en West samenkomen"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary-dark/50" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full mb-5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Over Ons</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              Over <span className="text-accent">XPLORE TÜRKIYE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 font-light"
            >
              Waar passie en expertise samenkomen
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHO WE ARE — XPLORE IDENTITY
      ════════════════════════════════════════════ */}
      <AboutSection />

      {/* ════════════════════════════════════════════
          TURKEY — A LAND OF MANY LAYERS
      ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Section header */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
                Een land met vele lagen
              </h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </motion.div>

            {/* Editorial narrative */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-base sm:text-lg text-foreground/80 leading-relaxed"
            >
              {/* Intro */}
              <p>
                Turkije is een land dat je niet kan herleiden tot één periode,
                één cultuur of één overtuiging. Het is een plek waar lagen van
                de menselijke geschiedenis zich over elkaar hebben gelegd en
                vandaag nog steeds zichtbaar zijn.{" "}
                <span className="font-semibold text-primary">
                  Dat besef vormt het vertrekpunt van XPLORE Türkiye.
                </span>
              </p>
              <p>
                Wij zijn jullie lokale partner voor Turkije. Onze kennis en
                ervaring zijn opgebouwd door jarenlange betrokkenheid bij de
                bestemming en door diepgaande verkenning van haar regio’s. We
                kennen Turkije niet als één verhaal, maar als een land met vele
                identiteiten, ritmes en gezichten. Wie het land echt leert
                kennen, merkt al snel dat elke streek haar eigen karakter,
                geschiedenis en dynamiek heeft.
              </p>
              <p>
                Onze expertise is gegroeid uit jarenlange ervaring in
                verschillende regio’s van Turkije en uit een sterke
                verbondenheid met het land. Die diversiteit vormt de kern van
                onze aanpak en bepaalt hoe wij reizen vormgeven.
              </p>

              {/* History — inline icons as accent */}
              <div className="bg-gradient-to-br from-primary/5 to-background rounded-2xl p-6 sm:p-8 border border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <Landmark className="h-6 w-6 text-primary flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">
                    Duizenden jaren beschaving
                  </h3>
                </div>
                <p className="mb-4">
                  Turkije behoort tot de kerngebieden van de menselijke
                  beschaving. Van{" "}
                  <span className="font-semibold text-foreground">
                    Göbeklitepe
                  </span>{" "}
                  tot{" "}
                  <span className="font-semibold text-foreground">Efeze</span>,
                  van{" "}
                  <span className="font-semibold text-foreground">Troje</span>{" "}
                  tot de oude steden van Mesopotamië liggen hier de eerste
                  sporen van vaste nederzettingen, geloof en samenleven.
                  Geschiedenis is hier geen afgesloten hoofdstuk, maar aanwezig
                  in het landschap, in steden en in tradities die vandaag nog
                  worden beleefd.
                </p>
                <p>
                  Doorheen de eeuwen volgden grote rijken elkaar op. De{" "}
                  <span className="font-semibold text-foreground">
                    Romeinse grootsheid
                  </span>
                  , de{" "}
                  <span className="font-semibold text-foreground">
                    Byzantijnse verfijning
                  </span>{" "}
                  en de{" "}
                  <span className="font-semibold text-foreground">
                    Ottomaanse elegantie
                  </span>{" "}
                  vormen samen één doorlopend verhaal. Die geschiedenis leeft
                  voort in stadsstructuren, architectuur, handelsroutes en
                  gebruiken. Van de skyline van Istanbul tot karavanserais diep
                  in Anatolië loopt een zichtbare lijn die verleden en heden met
                  elkaar verbindt.
                </p>
              </div>

              {/* Culture */}
              <div className="bg-gradient-to-br from-accent/5 to-background rounded-2xl p-6 sm:p-8 border border-accent/10">
                <div className="flex items-center gap-3 mb-4">
                  <Waypoints className="h-6 w-6 text-accent flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">
                    Cultureel kruispunt
                  </h3>
                </div>
                <p className="mb-4">
                  Ook cultureel is Turkije gevormd door ontmoeting. Het land
                  ligt op het{" "}
                  <span className="font-semibold text-foreground">
                    kruispunt van Europa en Azië
                  </span>{" "}
                  en fungeerde eeuwenlang als doorgangsgebied voor volkeren,
                  ideeën en overtuigingen. Verschillende religies, talen en
                  etnische gemeenschappen hebben hier hun voetsporen nagelaten.
                  Niet naast elkaar, maar met elkaar verweven.
                </p>
                <p>
                  Turkije vormt een{" "}
                  <span className="font-semibold text-foreground">
                    cultureel mozaïek
                  </span>{" "}
                  waarin oosterse gastvrijheid en westerse dynamiek samenkomen
                  en het dagelijkse leven bepalen.
                </p>
              </div>

              {/* Geography */}
              <div className="bg-gradient-to-br from-primary/5 to-background rounded-2xl p-6 sm:p-8 border border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <Mountain className="h-6 w-6 text-primary flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">
                    Eindeloze verscheidenheid
                  </h3>
                </div>
                <p className="mb-4">
                  Die culturele rijkdom wordt versterkt door de uitzonderlijke
                  geografische ligging. Turkije wordt omringd door{" "}
                  <span className="font-semibold text-foreground">
                    drie zeeën
                  </span>{" "}
                  en kent een enorme variatie aan landschappen en klimaten. Het
                  noorden, westen, zuiden en oosten verschillen fundamenteel van
                  elkaar.
                </p>
                <p>
                  Elke regio heeft haar eigen tradities, keuken, tempo en
                  seizoensbeleving. In één land ervaar je{" "}
                  <span className="font-semibold text-foreground">
                    berggebieden en hoogvlaktes
                  </span>
                  , uitgestrekte kustlijnen, vruchtbare valleien en levendige
                  steden. Dat maakt Turkije uitzonderlijk veelzijdig en tegelijk
                  onmogelijk te vatten in één beeld.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOSPITALITY QUOTE & CTA
      ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-primary via-primary-dark to-primary text-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 border border-white/10 rounded-full" />
        <div className="absolute bottom-10 right-10 w-64 h-64 border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Quote className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-8 text-accent/60" />
            </motion.div>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto">
              Gastvrijheid vormt de kern van Turkije en diezelfde houding dragen
              wij uit in onze manier van werken. Met aandacht, bereikbaarheid en
              zorg voor elk detail begeleiden wij elke reis van begin tot einde.
            </p>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 sm:p-10 mb-10 inline-block">
              <p className="text-base sm:text-lg text-white/70">
                Zoals men in Turkije zegt:
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold my-3 text-accent">
                &ldquo;Başımızın üstünde yeriniz var.&rdquo;
              </p>
              <p className="text-base sm:text-lg text-white/70">
                Je bent hier meer dan welkom.
              </p>
            </div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                XPLORE Türkiye staat klaar om deze bestemming te laten ontdekken
                met kennis, overtuiging en respect voor haar vele lagen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/contact"
                  className={cn(
                    buttonStyles.getClasses("default", "lg"),
                    "bg-accent hover:bg-accent-hover text-white",
                  )}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Neem contact op
                </Link>
                <Link
                  href="/reizen"
                  className={cn(
                    buttonStyles.getClasses("outline", "lg"),
                    "border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary",
                  )}
                >
                  Ontdek onze reizen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
