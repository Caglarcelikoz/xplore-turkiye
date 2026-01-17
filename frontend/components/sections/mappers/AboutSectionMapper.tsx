/**
 * About Section Mapper Component
 * Maps Strapi about block data to AboutSection component
 */

import AboutSection from "../AboutSection";
import { mapAboutBlockToProps } from "@/lib/strapi/mappers/about";
import type { BlockAbout } from "@/types/strapi";

interface AboutSectionMapperProps {
  data: BlockAbout;
}

export default function AboutSectionMapper({ data }: AboutSectionMapperProps) {
  // Transform Strapi data to component props
  const props = mapAboutBlockToProps(data);

  return <AboutSection {...props} />;
}




