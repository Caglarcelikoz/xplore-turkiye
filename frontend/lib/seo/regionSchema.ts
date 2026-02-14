import { RegionInfo } from "@/types";

/**
 * Generate Schema.org Place markup for a Turkish region
 *
 * Creates a Place schema with additional TouristDestination and
 * TouristAttraction context for better search visibility.
 */
export function generateRegionSchema(
  region: RegionInfo,
  url: string,
  tripCount?: number
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://xploreturkiye.be";
  const fullUrl = `${baseUrl}${url}`;
  const imageUrl = region.images?.[0]
    ? `${baseUrl}${region.images[0]}`
    : `${baseUrl}/og-default.jpg`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Main Place schema for the region
      {
        "@type": "Place",
        "@id": `${fullUrl}#place`,
        name: region.name,
        description: region.description,
        geo: {
          "@type": "GeoCoordinates",
          latitude: region.coordinates[1],
          longitude: region.coordinates[0],
        },
        ...(region.bounds && {
          geoShape: {
            "@type": "GeoShape",
            box: `${region.bounds[0][1]} ${region.bounds[0][0]} ${region.bounds[1][1]} ${region.bounds[1][0]}`,
          },
        }),
        containedInPlace: {
          "@type": "Country",
          name: "Turkije",
          "@id": "https://www.wikidata.org/wiki/Q43",
        },
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          description: `${region.name} - ${region.shortDescription}`,
        },
        url: fullUrl,
      },
      // TouristDestination schema
      {
        "@type": "TouristDestination",
        "@id": `${fullUrl}#destination`,
        name: `${region.name} - Turkije`,
        description: region.description,
        ...(region.longDescription && {
          disambiguatingDescription: region.longDescription
            .split("\n\n")[0]
            .substring(0, 250),
        }),
        geo: {
          "@type": "GeoCoordinates",
          latitude: region.coordinates[1],
          longitude: region.coordinates[0],
        },
        image: imageUrl,
        url: fullUrl,
        ...(tripCount &&
          tripCount > 0 && {
            touristType: ["Cultuurreiziger", "Avonturier", "Foodliefhebber"],
          }),
      },
      // Webpage schema
      {
        "@type": "WebPage",
        "@id": `${fullUrl}#webpage`,
        url: fullUrl,
        name: `${region.name} - Ontdek de regio | Xplore Turkiye`,
        description: region.description,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}#website`,
          name: "Xplore Turkiye & Beyond",
          url: baseUrl,
        },
        about: {
          "@id": `${fullUrl}#place`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
        },
        ...(region.insight && {
          mainEntity: {
            "@type": "Thing",
            name: region.insight.title,
            description: region.insight.content,
          },
        }),
      },
      // BreadcrumbList schema
      {
        "@type": "BreadcrumbList",
        "@id": `${fullUrl}#breadcrumb`,
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
          {
            "@type": "ListItem",
            position: 3,
            name: region.name,
            item: fullUrl,
          },
        ],
      },
    ],
  };
}

/**
 * Helper to create JSON-LD script tag content
 */
export function getRegionSchemaScript(
  region: RegionInfo,
  url: string,
  tripCount?: number
): string {
  const schema = generateRegionSchema(region, url, tripCount);
  return JSON.stringify(schema);
}
