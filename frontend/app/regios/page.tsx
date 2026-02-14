import { Metadata } from "next";
import Script from "next/script";
import { getAllRegions } from "@/lib/data/regions";
import RegionCard from "@/components/regions/RegionCard";
import { generateSEOMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "Ontdek de 7 Regio's van Turkije",
  description:
    "Van Marmara tot Zuidoost-Anatolië — ontdek de 7 unieke regio's van Turkije. Elk met eigen karakter, keuken, geschiedenis en cultuur. Vind jouw perfecte reisbestemming.",
  path: "/regios",
  image: "/og-default.jpg",
});

export default function RegiosPage() {
  const regions = getAllRegions();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://xploreturkiye.be";

  // Schema.org structured data
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/regios#page`,
        url: `${baseUrl}/regios`,
        name: "Ontdek de 7 Regio's van Turkije",
        description:
          "Van Marmara tot Zuidoost-Anatolië — ontdek de 7 unieke regio's van Turkije. Elk met eigen karakter, keuken, geschiedenis en cultuur.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}#website`,
          name: "Xplore Turkije & Beyond",
          url: baseUrl,
        },
        about: {
          "@type": "Country",
          name: "Turkije",
          "@id": "https://www.wikidata.org/wiki/Q43",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/regios#list`,
        itemListElement: regions.map((region, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${baseUrl}/regios/${region.id}`,
          name: region.name,
          description: region.shortDescription,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/regios#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Regio's",
            item: `${baseUrl}/regios`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="regios-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary-dark/90 py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Ontdek de 7 Regio&apos;s van Turkije
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
                Van Marmara tot Zuidoost-Anatolië — elk met eigen karakter,
                keuken en verhaal
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Turkije is verdeeld in 7 geografische regio&apos;s, elk met een
                unieke identiteit. Van de bruisende steden aan de Egeïsche kust
                tot de ruige hoogvlaktes van Oost-Anatolië, van de groene
                bergkust van de Zwarte Zee tot de historische steden van
                Zuidoost-Anatolië. Ontdek welke regio bij jou past.
              </p>
            </div>
          </div>
        </section>

        {/* Regions Grid */}
        <section className="pb-16 sm:pb-20 lg:pb-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
              {regions.map((region) => (
                <RegionCard key={region.id} region={region} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 via-white to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                Klaar om Turkije te ontdekken?
              </h2>
              <p className="text-base sm:text-lg text-foreground/70 mb-8">
                Laat ons een reis op maat samenstellen die perfect aansluit bij
                jouw interesses en voorkeuren.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
              >
                Plan jouw reis
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
