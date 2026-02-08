import { staticLandingPage } from "@/lib/data/static-content";
import HeroSectionMapper from "@/components/sections/mappers/HeroSectionMapper";
import {
  isHeroBlock,
  type DynamicZoneBlock,
} from "@/types/strapi";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedTrips from "@/components/sections/FeaturedTrips";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ComingSoon from "@/components/ComingSoon";

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

const SHOW_COMING_SOON = process.env.NEXT_PUBLIC_SHOW_COMING_SOON === 'true';

export default function Home() {
  // Als coming soon mode actief is, toon alleen de coming soon pagina
  if (SHOW_COMING_SOON) {
    return <ComingSoon />;
  }

  // Use static landing page data
  const landingPage = staticLandingPage;
  const blocks = landingPage?.attributes.blocks || [];

  // Check which block types exist in Strapi
  // const hasHeroBlock = hasBlockType(blocks, "blocks.hero");
  // Add more checks here as new block types are added:
  // const hasAboutBlock = hasBlockType(blocks, "blocks.about");
  // const hasFeaturedTripsBlock = hasBlockType(blocks, "blocks.featured-trips");
  // const hasWhyUsBlock = hasBlockType(blocks, "blocks.why-us");

  return (
    <>
      {/* Render blocks from Strapi Dynamic Zone (incremental migration) */}
      {blocks.map((block, index) => {
        if (isHeroBlock(block)) {
          return <HeroSectionMapper key={block.id || index} data={block} />;
        }
        return null;
      })}

      {/* Wie wij zijn — replaces the old Strapi about section */}
      <AboutSection />

      {/* Render hardcoded sections that are not yet in Strapi */}
      {/* These will be replaced incrementally as content is added to Strapi */}

      {/* Featured Trips Section - render if not in Strapi */}
      {!hasBlockType(blocks, "blocks.featured-trips") && <FeaturedTrips />}

      {/* Why Us Section - render if not in Strapi */}
      {!hasBlockType(blocks, "blocks.why-us") && <WhyUsSection />}
    </>
  );
}
