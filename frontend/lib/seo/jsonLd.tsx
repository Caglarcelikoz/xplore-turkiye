/**
 * JSON-LD Schema Component
 *
 * Following Next.js documentation:
 * https://nextjs.org/docs/app/guides/json-ld
 */

import Script from 'next/script'

interface JsonLdProps {
  data: Record<string, any>
}

/**
 * Renders structured data (JSON-LD) in a script tag
 * Used for SEO and rich snippets in search results
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id={`json-ld-${data['@type']?.toLowerCase() || 'schema'}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
