import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xploreturkiye.be'

  // Static pages
  const staticPages = [
    '',
    '/over-ons',
    '/contact',
    '/privacy',
    '/disclaimer',
    '/reizen',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Region pages
  const regions = [
    'marmara',
    'centraal-anatolie',
    'egeische-kust',
    'mediterrane-riviera',
    'zwarte-zee',
    'oost-turkije',
    'zuidoost-mesopotamie',
  ].map(slug => ({
    url: `${baseUrl}/regios/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Trip type pages
  const tripTypes = [
    'cities',
    'round-trips',
    'road-trips',
    'group',
    'different',
  ].map(slug => ({
    url: `${baseUrl}/xplore-your-way/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Trip packages
  const trips = [
    'cappadocie-rondreis',
    'mezopotamie-rondreis',
    'istanbul-citytrip',
  ].map(slug => ({
    url: `${baseUrl}/reizen/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  return [...staticPages, ...regions, ...tripTypes, ...trips]
}
