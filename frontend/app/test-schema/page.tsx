"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Copy, Check } from "lucide-react";

// Organization Schema - same as used on homepage
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://xploreturkiye.be/#organization",
  name: "Xplore Türkiye",
  alternateName: "Xplore Turkiye & Beyond",
  url: "https://xploreturkiye.be",
  logo: "https://xploreturkiye.be/logo.png",
  description:
    "Gespecialiseerd in groepsreizen, maatwerk reizen en rondreizen naar Turkije. Authentieke reiservaringen met lokale expertise.",
  email: "info@xploreturkiye.be",
  telephone: "+32 3 886 04 00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dokter Persoonslaan 8",
    postalCode: "2830",
    addressLocality: "Willebroek",
    addressCountry: "BE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+32 3 886 04 00",
    email: "info@xploreturkiye.be",
    contactType: "Customer Service",
    availableLanguage: ["nl", "en", "tr"],
  },
  areaServed: {
    "@type": "Country",
    name: "Turkey",
  },
  sameAs: [
    "https://www.facebook.com/xploreturkiyebe",
    "https://www.instagram.com/xplore.turkiye/",
  ],
};

export default function SchemaTestPage() {
  const schemas = [organizationSchema];
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (schema: any) => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Schema Markup Tester
              </h1>
              <p className="text-foreground/70">
                JSON-LD Structured Data voor SEO
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
            >
              ← Terug naar Home
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-900">Status</span>
              </div>
              <p className="text-sm text-green-700">
                {schemas.length} schema{schemas.length !== 1 ? "'s" : ""}{" "}
                gevonden
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="font-semibold text-blue-900 mb-1">Homepage</div>
              <p className="text-sm text-blue-700">Organization Schema ✓</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <div className="font-semibold text-purple-900 mb-1">Format</div>
              <p className="text-sm text-purple-700">JSON-LD (Aanbevolen)</p>
            </div>
          </div>
        </div>

        {/* Validation Tools */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            🧪 Test Je Schema
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg border-2 border-blue-200 transition-all group"
            >
              <div>
                <div className="font-semibold text-blue-900">
                  Google Rich Results Test
                </div>
                <div className="text-sm text-blue-700">Test rich snippets</div>
              </div>
              <ExternalLink className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://validator.schema.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg border-2 border-green-200 transition-all group"
            >
              <div>
                <div className="font-semibold text-green-900">
                  Schema.org Validator
                </div>
                <div className="text-sm text-green-700">
                  Valideer schema markup
                </div>
              </div>
              <ExternalLink className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Schema Display */}
        {schemas.map((schema, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-1">
                  {schema["@type"]} Schema
                </h2>
                <p className="text-sm text-foreground/70">
                  {schema.name || "Structured Data"}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(schema)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Gekopieerd!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Kopieer JSON
                  </>
                )}
              </button>
            </div>

            {/* Key Properties */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-foreground/90 border-b pb-2">
                📋 Belangrijkste Properties
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(schema)
                  .filter(([key]) => !key.startsWith("@"))
                  .slice(0, 8)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-background/50 rounded-lg p-3 border border-primary/10"
                    >
                      <div className="text-xs font-mono text-primary/70 mb-1">
                        {key}
                      </div>
                      <div className="text-sm text-foreground/90 break-words">
                        {typeof value === "object" ? (
                          <code className="text-xs bg-primary/5 px-2 py-1 rounded">
                            {JSON.stringify(value, null, 2)}
                          </code>
                        ) : (
                          String(value)
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Full JSON */}
            <div>
              <h3 className="font-semibold text-foreground/90 border-b pb-2 mb-3">
                📄 Volledige JSON-LD
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono">
                  {JSON.stringify(schema, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}

        {schemas.length === 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-yellow-900 mb-2">
              Geen schema's gevonden op de homepage.
            </p>
            <p className="text-sm text-yellow-700">
              Zorg dat de dev server draait en refresh deze pagina.
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            💡 Hoe Te Gebruiken
          </h2>
          <div className="space-y-3 text-foreground/80">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <p>
                <strong>Kopieer de JSON</strong> - Klik op "Kopieer JSON" om de
                schema naar je klembord te kopiëren
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <p>
                <strong>Test met Google</strong> - Plak je schema in de Google
                Rich Results Test
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <p>
                <strong>Valideer</strong> - Gebruik de Schema.org Validator om
                te checken of alles correct is
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">4</span>
              </div>
              <p>
                <strong>Deploy</strong> - Als alles groen is, kun je deployen
                naar productie!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
