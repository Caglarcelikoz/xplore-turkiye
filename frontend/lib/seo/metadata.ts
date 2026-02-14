import { Metadata } from "next";

/**
 * SEO Metadata Helper
 *
 * Generates consistent metadata for pages including:
 * - Title
 * - Description
 * - Canonical URL
 * - Open Graph tags (for future implementation)
 * - Twitter cards (for future implementation)
 */

interface SEOMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

/**
 * Generate SEO metadata for a page
 *
 * @param options - SEO metadata options
 * @returns Next.js Metadata object
 */
export function generateSEOMetadata({
  title,
  description,
  path = "",
  image = "/og-default.jpg",
  type = "website",
}: SEOMetadataOptions): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://xploreturkiye.be";
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "nl_NL",
      url,
      title,
      description,
      siteName: "Xplore Turkiye & Beyond",
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${image}`],
    },
  };
}
