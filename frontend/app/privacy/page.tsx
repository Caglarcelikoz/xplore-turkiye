"use client";

import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function PrivacyPage() {
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
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Privacy
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Privacyverklaring – XPLORE TÜRKIYE
            </h1>
            <p className="text-foreground/70 text-sm">
              Laatste update: 10 januari 2026
            </p>
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
            <h2
              id="inleiding"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4 first:mt-0"
            >
              1. Inleiding
            </h2>
            <p>
              XPLORE TÜRKIYE respecteert jouw privacy en het recht op
              bescherming van persoonsgegevens. In deze privacyverklaring leggen
              wij uit hoe wij omgaan met persoonsgegevens die wij verzamelen via
              onze website, nieuwsbrief, contactformulieren en andere
              communicatiekanalen.
            </p>
            <p>
              XPLORE TÜRKIYE is een Belgische reisorganisatie en een
              gespecialiseerd merk van Selectair Willebroek Travel, gevestigd te
              Dokter Persoonslaan 8, 2830 Willebroek, België.
            </p>
            <p>
              De verwerking van persoonsgegevens gebeurt in overeenstemming met
              de geldende Belgische en Europese wetgeving, waaronder de Algemene
              Verordening Gegevensbescherming (AVG/GDPR).
            </p>
            <p>
              <strong>Contactpersoon gegevensbescherming:</strong>
              <br />
              Tuana Celiköz – Product Manager
              <br />
              E-mail:{" "}
              <a
                href="mailto:tuana@xploreturkiye.be"
                className="text-primary font-medium underline hover:text-accent transition-colors"
              >
                tuana@xploreturkiye.be
              </a>
            </p>

            <h2
              id="welke-gegevens"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              2. Welke persoonsgegevens verwerken wij?
            </h2>
            <p>
              Afhankelijk van jouw contact met XPLORE TÜRKIYE kunnen wij
              volgende persoonsgegevens verwerken:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-foreground/85">
              <li>Voor- en achternaam</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer</li>
              <li>Inhoud van berichten of aanvragen</li>
              <li>Reisvoorkeuren en interesses</li>
              <li>Gegevens verstrekt bij nieuwsbriefinschrijving</li>
            </ul>
            <p>
              Bij het aanvragen of boeken van een reis kunnen bijkomende
              gegevens worden verwerkt, zoals identificatie- of reisgerelateerde
              informatie, uitsluitend wanneer dit noodzakelijk is voor de
              uitvoering van de reis.
            </p>

            <h2
              id="doeleinden"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              3. Doeleinden van de gegevensverwerking
            </h2>
            <p>Wij verwerken jouw persoonsgegevens uitsluitend voor:</p>
            <ul className="list-disc pl-6 space-y-1 text-foreground/85">
              <li>Het beantwoorden van vragen en aanvragen</li>
              <li>Het organiseren en opvolgen van kennismakingsgesprekken</li>
              <li>Het uitwerken van rondreizen op maat en groepsreizen</li>
              <li>Het uitvoeren van reisovereenkomsten</li>
              <li>
                Het versturen van nieuwsbrieven en inspiratie, indien je
                hiervoor expliciet toestemming gaf
              </li>
              <li>Administratieve en wettelijke verplichtingen</li>
            </ul>
            <p>
              Persoonsgegevens worden enkel verwerkt wanneer dit noodzakelijk is
              en steeds op een zorgvuldige en vertrouwelijke manier.
            </p>

            <h2
              id="nieuwsbrief"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              4. Nieuwsbrief en marketingcommunicatie
            </h2>
            <p>
              Wanneer je je inschrijft voor de nieuwsbrief van XPLORE TÜRKIYE,
              gebruiken wij jouw e-mailadres uitsluitend om je te informeren
              over reisinspiratie, nieuwe programma&apos;s en relevante updates.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-foreground/85">
              <li>Inschrijving gebeurt altijd op basis van toestemming</li>
              <li>
                Je kan je op elk moment uitschrijven via de link in elke
                nieuwsbrief
              </li>
              <li>Wij versturen geen ongevraagde communicatie</li>
              <li>
                Marketinggegevens worden niet doorgegeven aan derden voor
                commerciële doeleinden
              </li>
            </ul>

            <h2
              id="derden"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              5. Doorgifte aan derden
            </h2>
            <p>
              XPLORE TÜRKIYE verkoopt of verhuurt jouw persoonsgegevens nooit
              aan derden.
            </p>
            <p>
              Gegevens worden enkel gedeeld wanneer dit noodzakelijk is voor de
              uitvoering van een reis of wanneer dit wettelijk verplicht is.
            </p>
            <p>
              Indien persoonsgegevens buiten de Europese Economische Ruimte
              (EER) worden verwerkt in het kader van een reis, zorgen wij ervoor
              dat dit gebeurt conform de geldende privacywetgeving en met
              passende beschermingsmaatregelen.
            </p>

            <h2
              id="bewaartermijnen"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              6. Bewaartermijnen
            </h2>
            <p>
              Wij bewaren persoonsgegevens niet langer dan noodzakelijk is voor
              het doel waarvoor ze werden verzameld:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-foreground/85">
              <li>
                Contact- en nieuwsbriefgegevens: zolang je ingeschreven blijft
              </li>
              <li>
                Reisgerelateerde gegevens: zolang wettelijk vereist of nodig
                voor administratieve opvolging
              </li>
            </ul>
            <p>
              Na afloop worden gegevens veilig verwijderd of geanonimiseerd.
            </p>

            <h2
              id="beveiliging"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              7. Beveiliging van gegevens
            </h2>
            <p>
              XPLORE TÜRKIYE neemt passende technische en organisatorische
              maatregelen om jouw persoonsgegevens te beschermen tegen verlies,
              misbruik, onbevoegde toegang of openbaarmaking.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-foreground/85">
              <li>
                Onze systemen zijn beveiligd en enkel toegankelijk voor bevoegde
                personen
              </li>
              <li>
                Gegevensoverdracht via de website gebeurt via beveiligde
                verbindingen (SSL)
              </li>
            </ul>

            <h2
              id="rechten"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              8. Jouw rechten
            </h2>
            <p>Je hebt steeds het recht om:</p>
            <ul className="list-disc pl-6 space-y-1 text-foreground/85">
              <li>Inzage te krijgen in jouw persoonsgegevens</li>
              <li>Je gegevens te laten verbeteren of aanvullen</li>
              <li>Je gegevens te laten verwijderen</li>
              <li>Je toestemming in te trekken</li>
              <li>Bezwaar te maken tegen het gebruik van jouw gegevens</li>
            </ul>
            <p>
              Verzoeken kunnen gericht worden aan:{" "}
              <a
                href="mailto:tuana@xploreturkiye.be"
                className="text-primary font-medium underline hover:text-accent transition-colors"
              >
                tuana@xploreturkiye.be
              </a>
            </p>
            <p>Wij behandelen elk verzoek binnen de wettelijke termijn.</p>

            <h2
              id="klachten"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              9. Klachten
            </h2>
            <p>
              Indien je een klacht hebt over de verwerking van jouw
              persoonsgegevens, kan je contact met ons opnemen. Indien nodig kan
              je ook een klacht indienen bij de Gegevensbeschermingsautoriteit (
              <a
                href="https://www.gegevensbeschermingsautoriteit.be"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium underline hover:text-accent transition-colors"
              >
                www.gegevensbeschermingsautoriteit.be
              </a>
              ).
            </p>

            <h2
              id="wijzigingen"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              10. Wijzigingen aan deze privacyverklaring
            </h2>
            <p>
              XPLORE TÜRKIYE behoudt zich het recht voor deze privacyverklaring
              te wijzigen.
            </p>
            <p>
              De meest recente versie is steeds beschikbaar via onze website.
            </p>
            <p className="text-foreground/70 text-sm">
              Laatste update: 10 januari 2026.
            </p>

            <h2
              id="contact"
              className="text-xl sm:text-2xl font-bold text-primary mt-10 mb-4"
            >
              11. Contactgegevens
            </h2>
            <p>
              <strong>XPLORE TÜRKIYE</strong>
              <br />
              Dokter Persoonslaan 8
              <br />
              2830 Willebroek – België
              <br />
              E-mail:{" "}
              <a
                href="mailto:info@xploreturkiye.be"
                className="text-primary font-medium underline hover:text-accent transition-colors"
              >
                info@xploreturkiye.be
              </a>
              <br />
              Contactpersoon privacy:{" "}
              <a
                href="mailto:tuana@xploreturkiye.be"
                className="text-primary font-medium underline hover:text-accent transition-colors"
              >
                tuana@xploreturkiye.be
              </a>
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
