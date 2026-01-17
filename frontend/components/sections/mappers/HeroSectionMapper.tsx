/**
 * Hero Section Mapper Component
 * Maps Strapi hero block data to HeroSection component
 */

import HeroSection from "../HeroSection";
import { mapHeroBlockToProps } from "@/lib/strapi/mappers/hero";
import type { BlockHero } from "@/types/strapi";

interface HeroSectionMapperProps {
  data: BlockHero;
}

export default function HeroSectionMapper({ data }: HeroSectionMapperProps) {
  // Transform Strapi data to component props
  const props = mapHeroBlockToProps(data);

  return <HeroSection {...props} />;
}
