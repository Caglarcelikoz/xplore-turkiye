"use client";

import { motion } from "motion/react";
import { FileWarning } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function DisclaimerPage() {
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
              <FileWarning className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Disclaimer
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Disclaimer – XPLORE TÜRKIYE | Selectair Willebroek Travel
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeUp}
            role="article"
            className="max-w-3xl mx-auto space-y-6 text-foreground/85 leading-relaxed"
          >
            <p>
              De informatie die wordt opgenomen op deze website van XPLORE
              TÜRKIYE, een merk van Selectair Willebroek Travel, is uitsluitend
              bestemd voor algemene informatiedoeleinden met betrekking tot onze
              reizen, bestemmingen, diensten en werkwijze.
            </p>
            <p>
              Gezien de veranderlijke aard van wet- en regelgeving,
              reisvoorwaarden, beschikbaarheden en informatie in het algemeen,
              alsook de inherente risico&apos;s verbonden aan elektronische
              communicatie, is het mogelijk dat de informatie op deze website
              onvolledig, verouderd of niet geheel correct is.
            </p>
            <p>
              Hoewel XPLORE TÜRKIYE en Selectair Willebroek Travel de grootst
              mogelijke zorgvuldigheid aan de dag leggen bij het samenstellen en
              actualiseren van de inhoud van deze website, kan niet worden
              gegarandeerd dat alle informatie te allen tijde volledig, actueel
              en foutloos is. XPLORE TÜRKIYE en Selectair Willebroek Travel
              aanvaarden dan ook geen enkele aansprakelijkheid voor directe of
              indirecte schade die voortvloeit uit het gebruik van, het
              vertrouwen op of handelingen gesteld op basis van informatie op
              deze website die onvolledig, verouderd of onjuist blijkt te zijn.
            </p>
            <p>
              Kennelijke materiële vergissingen, waaronder maar niet beperkt tot
              typefouten, programmeerfouten, fouten in prijzen, beschikbaarheden
              of beschrijvingen, kunnen voorkomen en kunnen geen aanleiding
              geven tot het ontstaan van enige overeenkomst of aanspraak.
            </p>

            <h2
              id="externe-links"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              Externe websites en hyperlinks
            </h2>
            <p>
              Deze website kan hyperlinks bevatten naar websites van derden.
              Deze externe websites worden niet beheerd, gecontroleerd of
              onderhouden door XPLORE TÜRKIYE of Selectair Willebroek Travel.
              Wij dragen geen enkele verantwoordelijkheid voor de inhoud,
              correctheid, actualiteit of veiligheid van deze websites, noch
              voor de diensten, producten of informatie die daarop worden
              aangeboden. Het gebruik van externe links gebeurt volledig op
              eigen risico.
            </p>
            <p>
              Het is niet toegestaan om zonder voorafgaande uitdrukkelijke
              schriftelijke toestemming van XPLORE TÜRKIYE hyperlinks te creëren
              naar deze website via technieken zoals deeplinking, framing,
              inlining of gelijkaardige methoden. Bij inbreuk behouden wij ons
              het recht voor om passende juridische stappen te ondernemen.
            </p>

            <h2
              id="intellectuele-eigendom"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              Intellectuele eigendomsrechten
            </h2>
            <p>
              De inhoud van deze website, met inbegrip van maar niet beperkt tot
              teksten, foto&apos;s, logo&apos;s, grafische elementen, lay-out,
              audiovisueel materiaal en concepten, is beschermd door
              auteursrechten en andere intellectuele eigendomsrechten en behoort
              toe aan XPLORE TÜRKIYE, Selectair Willebroek Travel of de
              respectieve rechthebbenden.
            </p>
            <p>
              Behoudens voor strikt persoonlijk en niet-commercieel gebruik mag
              geen enkel onderdeel van deze website worden verveelvoudigd,
              opgeslagen, verspreid of openbaar gemaakt, in welke vorm of op
              welke wijze dan ook, zonder voorafgaande schriftelijke
              toestemming.
            </p>

            <h2
              id="contact"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              Contactgegevens
            </h2>
            <p>
              <strong>XPLORE TÜRKIYE</strong>
              <br />
              Een merk van Selectair Willebroek Travel
              <br />
              E-mail:{" "}
              <a
                href="mailto:info@xploreturkiye.be"
                className="text-primary font-medium underline hover:text-accent transition-colors"
              >
                info@xploreturkiye.be
              </a>
              <br />
              Dokter Persoonslaan 8, 2830 Willebroek
            </p>

            <h2
              id="toepasselijk-recht"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              Toepasselijk recht
            </h2>
            <p>
              Op deze disclaimer en op het gebruik van deze website is
              uitsluitend het Belgisch recht van toepassing. In geval van
              betwisting zijn enkel de bevoegde rechtbanken bevoegd.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="max-w-3xl mx-auto mt-12 pt-8 border-t border-primary/10"
          >
            <Link
              href="/"
              className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors"
            >
              ← Terug naar home pagina
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
