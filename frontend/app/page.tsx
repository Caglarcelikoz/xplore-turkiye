import { getLandingPage } from "@/lib/strapi/queries";
import HeroSectionMapper from "@/components/sections/mappers/HeroSectionMapper";
import AboutSectionMapper from "@/components/sections/mappers/AboutSectionMapper";
import {
  isHeroBlock,
  isAboutBlock,
  type DynamicZoneBlock,
} from "@/types/strapi";
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

export default async function Home() {
  // Als coming soon mode actief is, toon alleen de coming soon pagina
  if (SHOW_COMING_SOON) {
    return <ComingSoon />;
  }

  // Fetch landing page data from Strapi
  const landingPage = await getLandingPage();
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
        if (isAboutBlock(block)) {
          return <AboutSectionMapper key={block.id || index} data={block} />;
        }
        return null;
      })}

      {/* Render hardcoded sections that are not yet in Strapi */}
      {/* These will be replaced incrementally as content is added to Strapi */}

      {/* Featured Trips Section - render if not in Strapi */}
      {!hasBlockType(blocks, "blocks.featured-trips") && <FeaturedTrips />}

      {/* Why Us Section - render if not in Strapi */}
      {!hasBlockType(blocks, "blocks.why-us") && <WhyUsSection />}
    </>
  );
}
