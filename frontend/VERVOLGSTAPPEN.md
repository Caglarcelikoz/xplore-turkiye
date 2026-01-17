# 🚀 Vervolgstappen: Strapi Integratie

## ✅ Wat is al gedaan

### Basis Setup

- ✅ Strapi API client (`lib/strapi/client.ts`)
- ✅ TypeScript types (`types/strapi.ts`)
- ✅ Query functions (`lib/strapi/queries.ts`)
- ✅ Data mappers (`lib/strapi/mappers/`)
- ✅ Icon mapper (`lib/strapi/mappers/icons.ts`)
- ✅ Media utilities (`lib/strapi/utils.ts`)

### Hero Section Integratie

- ✅ Hero block type definitie
- ✅ Hero mapper (`mapHeroBlockToProps`)
- ✅ HeroSectionMapper component
- ✅ Landing page Dynamic Zone rendering
- ✅ Incrementele migratie setup (hardcoded + Strapi)

### Code Quality

- ✅ Button component vereenvoudigd
- ✅ TypeScript config voor next.config.ts
- ✅ Error handling en fallbacks

---

## 📋 Volgende Stappen (Prioriteit)

### 1. Testing & Validatie (Korte termijn)

**Doel**: Verifiëren dat alles werkt zoals verwacht

**Acties**:

- [ ] Strapi CMS starten (`npm run develop` in `cms/`)
- [ ] Landing page content aanmaken in Strapi
- [ ] Hero block invullen met alle velden
- [ ] Frontend testen (`npm run dev` in `frontend/`)
- [ ] Browser console checken (geen errors)
- [ ] Network tab inspecteren (API calls)
- [ ] TypeScript build testen (`npm run build`)

**Tijdsinschatting**: 30-60 minuten

---

### 2. About Section Integratie (Middellange termijn)

**Doel**: About section migreren naar Strapi

**Stappen**:

#### 2.1 Strapi Component Aanmaken

- [ ] Maak `blocks.about` component in Strapi met:
  - `title` (Text)
  - `description` (Rich Text)
  - `image` (Media, single)
  - `features` (Repeatable component met icon, title, description)
- [ ] Voeg `blocks.about` toe aan Landing Page Dynamic Zone

#### 2.2 Frontend Implementatie

- [ ] Type definitie toevoegen (`BlockAbout` in `types/strapi.ts`)
- [ ] Type guard toevoegen (`isAboutBlock`)
- [ ] Mapper maken (`lib/strapi/mappers/about.ts`)
- [ ] AboutSectionMapper component maken
- [ ] Update `app/page.tsx` om About block te renderen
- [ ] Testen en valideren

**Tijdsinschatting**: 1-2 uur

---

### 3. Featured Trips Section Integratie

**Doel**: Featured Trips dynamisch maken vanuit Strapi

**Stappen**:

#### 3.1 Strapi Setup

- [ ] Maak `blocks.featured-trips` component met:
  - `title` (Text)
  - `subtitle` (Text)
  - `trip_selection` (Enum: "manual" | "featured" | "latest")
  - `manual_trips` (Relation naar Trip, multiple, alleen bij manual)
  - `limit` (Number, aantal trips)
- [ ] Voeg toe aan Dynamic Zone

#### 3.2 Frontend Implementatie

- [ ] Type definitie (`BlockFeaturedTrips`)
- [ ] Query functie voor trips (`getTrips()` in `queries.ts`)
- [ ] Mapper (`mappers/featured-trips.ts`)
- [ ] FeaturedTripsMapper component
- [ ] Update page.tsx

**Tijdsinschatting**: 2-3 uur

---

### 4. Why Us Section Integratie

**Doel**: Why Us section beheerbaar maken in Strapi

**Stappen**:

- [ ] `blocks.why-us` component in Strapi
- [ ] Type definitie en mapper
- [ ] WhyUsSectionMapper component
- [ ] Integratie in page.tsx

**Tijdsinschatting**: 1-2 uur

---

### 5. Navigation & Header Integratie

**Doel**: Header menu dynamisch maken

**Stappen**:

#### 5.1 Strapi Setup

- [ ] Maak `navigation` Single Type met:
  - `logo` (Media)
  - `menu_items` (Repeatable component met label, href, isExternal, children)
- [ ] Maak `menu-item` component voor nested menu's

#### 5.2 Frontend

- [ ] Query functie (`getNavigation()`)
- [ ] Types en mappers
- [ ] Update `Header.tsx` component
- [ ] Mobile menu support

**Tijdsinschatting**: 2-3 uur

---

### 6. Trips API Integratie

**Doel**: Reizen ophalen en weergeven vanuit Strapi

**Stappen**:

#### 6.1 Strapi Content Type

- [ ] Maak `trip` Collection Type met alle velden:
  - Basis: title, slug, subtitle, type, region
  - Details: duration, price, images, overview
  - Content: highlights, itinerary, included, excluded
  - Metadata: featured, coordinates, route
- [ ] Migreer bestaande trips data naar Strapi

#### 6.2 Frontend

- [ ] Trip types (`types/strapi.ts`)
- [ ] Query functies:
  - `getTrips()` - alle trips
  - `getTripBySlug()` - single trip
  - `getTripsByType()` - filter op type
  - `getTripsByRegion()` - filter op regio
  - `getFeaturedTrips()` - featured trips
- [ ] Trip mappers
- [ ] Update TripCard, TripDetail, TripCarousel components
- [ ] Update `/reizen` en `/reizen/[type]` pages

**Tijdsinschatting**: 4-6 uur

---

### 7. SEO & Meta Tags Integratie

**Doel**: SEO data beheerbaar maken in Strapi

**Stappen**:

- [ ] Maak `seo` component in Strapi:
  - `meta_title`, `meta_description`, `meta_image`, `keywords`
- [ ] Voeg toe aan relevante content types
- [ ] Generate metadata functie
- [ ] Update page metadata

**Tijdsinschatting**: 1-2 uur

---

### 8. Error Handling & Loading States

**Doel**: Betere UX bij loading en errors

**Stappen**:

- [ ] Error boundaries implementeren
- [ ] Loading skeletons voor sections
- [ ] Error fallback UI
- [ ] Retry mechanisme

**Tijdsinschatting**: 2-3 uur

---

### 9. Performance Optimalisaties

**Doel**: Snellere laadtijden

**Stappen**:

- [ ] ISR (Incremental Static Regeneration) setup
- [ ] Image optimization review
- [ ] Query optimalisatie (field selection)
- [ ] Caching strategie per content type

**Tijdsinschatting**: 2-3 uur

---

## 🎯 Quick Start voor Volgende Sessie

### Als je verder wilt met About Section:

1. **Strapi**:

   ```
   - Open Strapi admin (localhost:1337/admin)
   - Content-Type Builder → Create new component
   - Naam: blocks.about
   - Voeg velden toe (zie stap 2.1 hierboven)
   - Voeg toe aan Landing Page Dynamic Zone
   ```

2. **Frontend**:

   ```bash
   # Start development
   cd frontend
   npm run dev

   # In nieuwe terminal, test build
   npm run build
   ```

3. **Volg het patroon van Hero**:
   - Kijk naar `HeroSectionMapper.tsx` als voorbeeld
   - Kijk naar `mappers/hero.ts` voor mapper logica
   - Kijk naar `types/strapi.ts` voor type definitie

### Als je eerst wilt testen:

1. **Strapi starten**:

   ```bash
   cd cms
   npm run develop
   ```

2. **Content aanmaken**:

   - Ga naar Content Manager
   - Selecteer Landing Page
   - Voeg Hero block toe
   - Vul alle velden in
   - Publish

3. **Frontend testen**:
   ```bash
   cd frontend
   npm run dev
   ```
   - Open http://localhost:3000
   - Check browser console
   - Check Network tab voor API calls

---

## 📚 Handige Referenties

### Bestaande Code Voorbeelden

**Hero Section (volledig geïntegreerd)**:

- Type: `types/strapi.ts` → `BlockHero`
- Mapper: `lib/strapi/mappers/hero.ts`
- Component: `components/sections/mappers/HeroSectionMapper.tsx`
- Usage: `app/page.tsx` (regel 35-36)

**API Client**:

- `lib/strapi/client.ts` - Basis client functies
- `lib/strapi/queries.ts` - Specifieke queries
- `lib/strapi/utils.ts` - Helper functies

**Icon Mapping**:

- `lib/strapi/mappers/icons.ts` - Herbruikbare icon mapper

### Strapi v5 Documentatie

- [Strapi v5 Docs](https://docs.strapi.io/dev-docs)
- [Dynamic Zones](https://docs.strapi.io/dev-docs/backend-customization/models#dynamic-zones)
- [REST API](https://docs.strapi.io/dev-docs/api/rest)

### Next.js Documentatie

- [App Router](https://nextjs.org/docs/app)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)

---

## 💡 Tips

1. **Begin klein**: Test eerst met Hero section voordat je verder gaat
2. **Hergebruik patterns**: Volg het patroon van Hero voor andere sections
3. **Type safety**: Gebruik altijd TypeScript types, geen `any`
4. **Incrementeel**: Migreer één section per keer
5. **Test lokaal**: Test altijd eerst lokaal voordat je naar productie gaat

---

## 🐛 Troubleshooting

### Strapi API geeft 404

- Check of Strapi draait op `localhost:1337`
- Check `.env.local` voor `NEXT_PUBLIC_STRAPI_URL`
- Check of content gepubliceerd is in Strapi

### TypeScript errors

- Run `npm run build` om alle type errors te zien
- Check of types correct zijn in `types/strapi.ts`
- Verifieer dat populate correct is in queries

### Images laden niet

- Check `next.config.ts` voor `remotePatterns`
- Verifieer dat Strapi media URL correct is
- Check CORS settings in Strapi

---

**Laatste update**: 2025-01-27  
**Status**: ✅ Basis setup compleet, klaar voor uitbreiding
