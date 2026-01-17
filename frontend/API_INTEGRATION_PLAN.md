# API Integratie Plan: Strapi CMS → Next.js Frontend

## 📋 Overzicht

Dit document beschrijft de stapsgewijze aanpak voor het integreren van Strapi CMS met de Next.js frontend applicatie. We beginnen met de landing page en de hero section, waarbij we herbruikbare API calls en TypeScript types genereren die later gebruikt kunnen worden voor andere content types.

## 🎯 Doelstellingen

1. **Herbruikbare API Client**: Een robuuste, type-safe Strapi client die gebruikt kan worden voor alle content types
2. **TypeScript Types**: Volledige type definitie voor alle Strapi content types en components
3. **Landing Page Integratie**: Koppeling van de landing page (hero section) aan Strapi
4. **Schaalbaarheid**: Opzet die eenvoudig uit te breiden is voor andere pagina's en content types
5. **Performance**: Optimalisatie met field selection, populate strategie en caching

## 📊 Huidige Situatie

### Strapi CMS (v5)

- ✅ **Landing Page** Single Type bestaat al met Dynamic Zone
- ✅ **Hero Block** component bestaat met:
  - `heading` (string)
  - `text` (richtext)
  - `links` (repeatable shared.link component)
  - `background` (media)
  - `stats` (repeatable blocks.stats component)
- ✅ **Stats Component** met icon enum (MAP_PIN, CALENDAR, USERS), label, value
- ✅ **Shared Link Component** met href, label, isExternal, isButtonLink, type enum

### Next.js Frontend

- ✅ HeroSection component bestaat (hardcoded data)
- ✅ Next.js 14 met App Router
- ✅ TypeScript geconfigureerd
- ✅ Environment variables geconfigureerd (`.env.local`, `.env.example`)
- ✅ Next.js Image configuratie voor Strapi media
- ✅ Strapi API client geïmplementeerd (`client.ts`, `types.ts`, `utils.ts`)
- ✅ TypeScript types voor Strapi content types en components (`types/strapi.ts`)
- ✅ Query functions geïmplementeerd (`queries.ts`)
- ✅ Data mappers geïmplementeerd (`mappers/hero.ts`, `mappers/media.ts`)

## 🏗️ Implementatie Plan

---

### Fase 8: Testing & Validatie

#### Stap 8.1: Development Testing

**Acties**:

- [ ] Strapi CMS draaien (localhost:1337)
- [ ] Landing page content aanmaken in Strapi
- [ ] Hero block met alle velden invullen
- [ ] Frontend testen en data verifiëren
- [ ] Console errors checken
- [ ] Network tab inspecteren (API calls)

#### Stap 8.2: Type Safety Validatie

**Acties**:

- [ ] TypeScript compile check (`npm run build`)
- [ ] Type errors oplossen
- [ ] Type inference verifiëren
- [ ] IntelliSense testen in IDE

#### Stap 8.3: Edge Cases

**Acties**:

- [ ] Testen met ontbrekende data
- [ ] Testen met lege arrays
- [ ] Testen met null/undefined values
- [ ] Error handling verifiëren

---

## 📁 Bestandsstructuur

```
frontend/
├── .env.local                    # Environment variables (nieuw)
├── .env.example                  # Environment template (nieuw)
├── lib/
│   └── strapi/
│       ├── client.ts             # Strapi API client (nieuw)
│       ├── queries.ts            # Query functions (nieuw)
│       ├── utils.ts               # Helper utilities (nieuw)
│       └── mappers/
│           ├── hero.ts           # Hero block mapper (nieuw)
│           └── media.ts          # Media mapper (nieuw)
├── types/
│   └── strapi.ts                 # Strapi TypeScript types (nieuw)
├── components/
│   └── sections/
│       ├── HeroSection.tsx       # Aanpassen (props toevoegen)
│       └── mappers/
│           └── HeroSectionMapper.tsx  # Nieuw
└── app/
    └── page.tsx                  # Aanpassen (data fetching)
```

---

## 🔧 Technische Details

### Strapi v5 Response Structuur

Strapi v5 heeft een andere response structuur dan v4:

**v4 Format** (oud):

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Hello"
    }
  }
}
```

**v5 Format** (nieuw):

```json
{
  "data": {
    "id": 1,
    "documentId": "abc123",
    "title": "Hello"
  }
}
```

**Transformatie nodig**: Client moet v5 format transformeren naar v4-achtige structuur voor backward compatibility, OF we werken direct met v5 structuur.

**Beslissing**: We werken direct met v5 structuur en passen types aan.

### Populate Strategie

Voor optimale performance:

- Gebruik specifieke populate in plaats van `populate=*`
- Selecteer alleen benodigde fields
- Gebruik nested populate voor relations

**Voorbeeld**:

```typescript
populate: {
  blocks: {
    populate: {
      background: true,
      links: true,
      stats: true,
    }
  }
}
```

### Caching Strategie

- **Development**: `revalidate: 0` (geen cache)
- **Production**: `revalidate: 60` (1 minuut)
- **Static Content**: `revalidate: 3600` (1 uur)

---

## ✅ Checklist

### API Client

- [x] `client.ts` implementeren
- [x] `types.ts` implementeren (basis types)
- [x] `utils.ts` implementeren
- [x] Error handling geïmplementeerd
- [x] Response transformatie geïmplementeerd

### Types

- [x] Basis Strapi types (in `lib/strapi/types.ts`)
- [x] Component types (`SharedLink`, `BlockStats`, `BlockHero`)
- [x] Content type types (`LandingPage`)
- [x] Dynamic Zone union type
- [x] Type guards (`isHeroBlock`)

### Queries

- [x] `getLandingPage()` implementeren
- [x] Populate strategie optimaliseren (array syntax met dot notation)
- [x] Field selection geïmplementeerd
- [x] Caching geconfigureerd (60 seconden)

### Mappers

- [x] Hero mapper implementeren (`mapHeroBlockToProps`)
- [x] Media mapper implementeren (`getImageUrl`, `getImageProps`)
- [x] Icon mapping (MAP_PIN → MapPin, etc.)
- [x] Link type mapping (PRIMARY/SECONDARY → button variants)
- [x] Rich text naar plain text extractie
- [x] Heading split logica (title + subtitle)
- [x] Fallback values voor ontbrekende data

### Components

- [x] HeroSection props toevoegen
- [x] HeroSectionMapper implementeren
- [x] Dynamic Zone rendering in page.tsx

### Integration

- [x] Landing page data fetching (`getLandingPage()`)
- [x] Component rendering (Dynamic Zone blocks)
- [x] Error handling (fallback naar hardcoded sections)
- [x] Type-safe block rendering met type guards

### Testing

- [ ] Development testing (zie VERVOLGSTAPPEN.md)
- [ ] Type safety validatie
- [ ] Edge cases
- [ ] Performance check

---

## 🚀 Volgende Stappen (Na Fase 8)

1. **Andere Blocks Toevoegen**: About, FeaturedTrips, WhyUs sections
2. **Navigation API**: Header/Footer data uit Strapi
3. **Trips API**: Reizen ophalen en weergeven
4. **Pages API**: Dynamische pagina's
5. **SEO Integration**: Meta tags uit Strapi
6. **Image Optimization**: Strapi image formats gebruiken
7. **Error Boundaries**: Betere error handling
8. **Loading States**: Skeleton loaders
9. **ISR Setup**: Incremental Static Regeneration

---

## 📝 Notities

### Performance Overwegingen

- Field selection gebruiken om payload te verkleinen
- Specifieke populate in plaats van `*`
- Caching strategie per content type
- Image optimization via Next.js Image component

### Type Safety

- Alle Strapi responses moeten getypeerd zijn
- Geen `any` types gebruiken
- Type guards voor runtime validatie
- Strikte TypeScript configuratie

### Error Handling

- Graceful degradation bij ontbrekende data
- Fallback UI voor errors
- Logging voor development
- User-friendly error messages

### Developer Experience

- Duidelijke error messages
- TypeScript IntelliSense support
- Documentatie in code
- Reusable patterns

---

**Status**: ✅ Basis Setup Compleet - Hero Section Geïntegreerd  
**Auteur**: AI Assistant  
**Datum**: 2025-01-27  
**Versie**: 1.1

---

## 📌 Huidige Status

✅ **Voltooid**:

- Basis Strapi integratie setup
- Hero section volledig geïntegreerd
- Incrementele migratie structuur
- Type-safe implementatie

📋 **Volgende Stappen**: Zie `VERVOLGSTAPPEN.md` voor gedetailleerde vervolgstappen
