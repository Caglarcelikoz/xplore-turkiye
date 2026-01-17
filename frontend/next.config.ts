import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
      //   pathname: '/uploads/**',
      // },
    ],
    // Configure allowed image qualities for Next.js 16
    // Required when using quality prop in Image components (e.g., quality={90})
    qualities: [75, 90, 100],
    // Disable optimization in development to avoid 400 errors with Strapi
    // In production, images will be automatically optimized
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
