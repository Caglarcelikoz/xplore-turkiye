import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "cache-control",
            // 1 day cache (86400 seconds) - matches minimumCacheTTL
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    // Enable modern formats for production optimization
    // AVIF: 30-50% smaller than WebP, WebP fallback for older browsers
    // Next.js automatically handles format negotiation based on browser support
    formats: ["image/avif", "image/webp"],

    // Optimized device breakpoints for travel photo site
    // Covers: mobile (640-750), tablet (828-1024), desktop (1200-1920), 4K (2048)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

    // Responsive image sizes for responsive designs
    // Covers: thumbnails (16-64px), cards (96-256px), sections (384px)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Configure allowed image qualities for Next.js 16
    // 80 is sweet spot for photos (imperceptible from 90, significantly smaller)
    // Required when using quality prop in Image components
    qualities: [75, 80, 90],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Add production Strapi URL here when deploying
      // Uncomment and update with your production Strapi domain:
      // {
      //   protocol: 'https',
      //   hostname: 'your-strapi-domain.com',
      //           pathname: '/uploads/**',
      //       },
    ],

    // Disable optimization in development to avoid Strapi CORS issues
    // In production, images will be automatically optimized with AVIF/WebP
    unoptimized: process.env.NODE_ENV === "development",

    // 1-day cache TTL for Strapi images
    // Balances performance (fewer re-optimizations) with content freshness (CMS updates)
    // Strapi URLs can change when content is updated, so we keep TTL reasonable
    minimumCacheTTL: 60 * 60 * 24,
  },
};

export default nextConfig;
