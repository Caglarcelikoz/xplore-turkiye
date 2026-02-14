# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Xplore Turkiye & Beyond is a travel website monorepo with a Strapi CMS backend and Next.js frontend.

## Commands

### CMS (Strapi)
```bash
cd cms
npm install        # Install dependencies
npm run develop    # Start dev server (http://localhost:1337)
npm run build      # Build for production
npm run start      # Start production server
```

### Frontend (Next.js)
```bash
cd frontend
npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Architecture

### Monorepo Structure
- `/cms` - Strapi 5.x CMS backend (SQLite database)
- `/frontend` - Next.js 16+ frontend (App Router)

### Frontend Key Directories
- `app/` - Next.js App Router pages and API routes
- `components/sections/` - Page section components (HeroSection, AboutSection, etc.)
- `components/layout/` - Header/Footer layout components
- `components/ui/` - Reusable UI components (badge, button, card, markdown)
- `lib/strapi/` - Strapi API client and utilities
- `types/strapi.ts` - TypeScript types for Strapi content

### Strapi API Client (`lib/strapi/client.ts`)
The client handles Strapi v5 API requests with automatic entity transformation:
- `getSingleType<T>(contentType, options)` - Fetch single type (e.g., landing-page, global)
- `getEntries<T>(contentType, options)` - Fetch collection entries with filters/pagination
- `getEntryBySlug<T>(contentType, slug, options)` - Fetch single entry by slug
- `createEntry<T>(contentType, data)` - Create new entry (e.g., contact form submissions)

### Strapi Utilities (`lib/strapi/utils.ts`)
- `getStrapiMediaUrl(media, format)` - Get URL for Strapi media with optional format (thumbnail/small/medium/large)
- `getStrapiMediaAlt(media)` - Get alt text from media
- `getStrapiMediaDimensions(media)` - Get width/height from media
- Handles both Strapi v4 nested structure and v5 flattened structure

### Icon Mapping (`lib/strapi/mappers/icons.ts`)
Maps Strapi enum values (e.g., "MAP_PIN", "CALENDAR") to Lucide React icons via `getIconComponent(iconType)`.

### Dynamic Zone Blocks (`types/strapi.ts`)
Content blocks are defined as a union type `DynamicZoneBlock`. Use type guards `isHeroBlock()` and `isAboutBlock()` to narrow block types.

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=<optional, for protected endpoints>
```

### CMS (.env)
See `cms/.env.example` for required Strapi secrets (APP_KEYS, JWT_SECRET, etc.)

## Tech Stack
- **Frontend**: Next.js 16+, TypeScript, Tailwind CSS, Framer Motion, Lucide React icons
- **CMS**: Strapi 5.x, TypeScript, SQLite (dev)
- **UI Pattern**: shadcn/ui style components with class-variance-authority

## Color Theme
Custom colors defined in `tailwind.config.ts`:
- `primary`: #294d54 (teal)
- `accent`: #d44e42 (red)
- `background`: #faf9f7 (off-white)
- `foreground`: #182e32 (dark teal)
