/**
 * About Section Mapper Component
 * Maps Strapi about block data to AboutSection component
 */

import AboutSection from "../AboutSection";
import type { BlockAbout } from "@/types/strapi";

interface AboutSectionMapperProps {
  data: BlockAbout;
}

export default function AboutSectionMapper({ data }: AboutSectionMapperProps) {
  return <AboutSection />;
}
