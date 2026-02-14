import { staticLandingPage } from "@/lib/data/static-content";
import HeroSectionMapper from "@/components/sections/mappers/HeroSectionMapper";
import {
  isHeroBlock,
  type DynamicZoneBlock,
} from "@/types/strapi";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedTrips from "@/components/sections/FeaturedTrips";
import XploreYourWaySection from "@/components/sections/XploreYourWaySection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ContactSection from "@/components/sections/ContactSection";
import TurkeyProvincesMap from "@/components/TurkeyProvincesMap";
import { JsonLd } from "@/lib/seo/jsonLd";

/**
 * Helper function to check if a specific block type exists in Strapi blocks
 */
function hasBlockType(
  blocks: DynamicZoneBlock[] | undefined,
  componentType: string
): boolean {
  if (!blocks || blocks.length === 0) return false;
  return blocks.some((block) => block.__component === componentType);
}

export default function Home() {
  // Use static landing page data
  const landingPage = staticLandingPage;
  const blocks = landingPage?.attributes.blocks || [];

  // Check which block types exist in Strapi
  // const hasHeroBlock = hasBlockType(blocks, "blocks.hero");
  // Add more checks here as new block types are added:
  // const hasAboutBlock = hasBlockType(blocks, "blocks.about");
  // const hasFeaturedTripsBlock = hasBlockType(blocks, "blocks.featured-trips");
  // const hasWhyUsBlock = hasBlockType(blocks, "blocks.why-us");

  // Organization Schema for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://xploreturkiye.be/#organization',
    name: 'Xplore Türkiye',
    alternateName: 'Xplore Turkiye & Beyond',
    url: 'https://xploreturkiye.be',
    logo: 'https://xploreturkiye.be/logo.png',
    description: 'Gespecialiseerd in groepsreizen, maatwerk reizen en rondreizen naar Turkije. Authentieke reiservaringen met lokale expertise.',
    email: 'info@xploreturkiye.be',
    telephone: '+32 3 886 04 00',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dokter Persoonslaan 8',
      postalCode: '2830',
      addressLocality: 'Willebroek',
      addressCountry: 'BE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+32 3 886 04 00',
      email: 'info@xploreturkiye.be',
      contactType: 'Customer Service',
      availableLanguage: ['nl', 'en', 'tr'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    sameAs: [
      'https://www.facebook.com/xploreturkiyebe',
      'https://www.instagram.com/xplore.turkiye/',
    ],
  };

  return (
    <>
      {/* Organization Schema for rich snippets */}
      <JsonLd data={organizationSchema} />
      {/* Render blocks from Strapi Dynamic Zone (incremental migration) */}
      {blocks.map((block, index) => {
        if (isHeroBlock(block)) {
          return <HeroSectionMapper key={block.id || index} data={block} />;
        }
        return null;
      })}

      {/* Wie wij zijn — replaces the old Strapi about section */}
      <AboutSection />

      {/* Xplore Your Way - Trip Types Section */}
      <XploreYourWaySection />

      {/* Turkey Provinces Map Section */}
      <section
        id="regios"
        className="py-16 bg-gradient-to-br from-primary/5 via-white to-accent/5"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  XPLORE REGIONS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                Verken alle Regio&apos;s
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Klik op een provincie om de regio te ontdekken. Elke regio heeft
                zijn eigen karakter, keuken en verhaal.
              </p>
            </div>

            {/* Interactive Map */}
            <div className="relative bg-white rounded-2xl shadow-lg border border-primary/10 p-6 sm:p-8">
              <TurkeyProvincesMap className="relative w-full" />
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#fbbf24" }}
                />
                <span className="text-sm text-foreground/70">Marmara</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#c4b5fd" }}
                />
                <span className="text-sm text-foreground/70">
                  Egeïsche Regio
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#3b82f6" }}
                />
                <span className="text-sm text-foreground/70">
                  Mediterrane Regio
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#ef4444" }}
                />
                <span className="text-sm text-foreground/70">
                  Centraal-Anatolië
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#047857" }}
                />
                <span className="text-sm text-foreground/70">
                  Zwarte Zee-regio
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#4ade80" }}
                />
                <span className="text-sm text-foreground/70">
                  Oost-Anatolië
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#f97316" }}
                />
                <span className="text-sm text-foreground/70">
                  Zuidoost-Anatolië
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Render hardcoded sections that are not yet in Strapi */}
      {/* These will be replaced incrementally as content is added to Strapi */}

      {/* Featured Trips Section - render if not in Strapi */}
      {!hasBlockType(blocks, "blocks.featured-trips") && <FeaturedTrips />}

      {/* Why Us Section - render if not in Strapi */}
      {!hasBlockType(blocks, "blocks.why-us") && <WhyUsSection />}

      {/* Contact Section */}
      <ContactSection showHero={false} />
    </>
  );
}
