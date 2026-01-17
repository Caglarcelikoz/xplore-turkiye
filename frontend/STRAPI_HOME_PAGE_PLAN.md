# Plan: Configureerbare Homepagina met Strapi v5 Dynamic Zones

Dit document beschrijft hoe de homepagina volledig configureerbaar gemaakt wordt in Strapi v5, inclusief navbar, hero section, over ons, uitgelichte reizen, waarom ons sectie en footer.

## Waarom Dynamic Zones?

Dynamic Zones in Strapi v5 bieden de perfecte oplossing voor een flexibele homepagina omdat:

- **Flexibiliteit**: Content editors kunnen secties toevoegen, verwijderen en herordenen zonder code wijzigingen
- **Herbruikbaarheid**: Componenten kunnen op meerdere pagina's gebruikt worden
- **Toekomstbestendig**: Nieuwe secties kunnen eenvoudig toegevoegd worden zonder de bestaande structuur te breken
- **Content-first**: Editors hebben volledige controle over de volgorde en samenstelling van de pagina
- **Type safety**: Elke component heeft een duidelijk gedefinieerde structuur

---

## Overzicht

1. **Single Type**: `home-page` (één homepagina)
   - Er is maar één homepagina, daarom een Single Type in plaats van Collection Type
   - Bevat een Dynamic Zone voor alle secties
2. **Single Type**: `navigation` (navbar configuratie)
   - Navbar is globaal en uniek, daarom ook een Single Type
   - Maakt het mogelijk om menu items dynamisch te beheren
3. **Components**: Herbruikbare sectie-componenten
   - Componenten kunnen hergebruikt worden op andere pagina's
   - Duidelijke scheiding tussen content structuur en presentatie
4. **Dynamic Zone**: Flexibele sectievolgorde op de homepagina
   - Editors kunnen secties toevoegen/verwijderen/herordenen
   - Elke sectie is een component met eigen velden

---

## 1. Single Type: `home-page`

Bevat een Dynamic Zone voor alle secties op de homepagina.

**Waarom Single Type?**

- Er is maar één homepagina in de applicatie
- Single Types zijn perfect voor unieke content zoals homepagina's, contact pagina's, etc.
- Makkelijker te beheren dan een Collection Type met maar één entry

**Dynamic Zone voordelen:**

- Content editors kunnen secties toevoegen/verwijderen zonder developer
- Secties kunnen herordend worden via drag & drop in Strapi Studio
- Nieuwe sectie types kunnen toegevoegd worden zonder bestaande content te breken

### Velden:

- `title` (Text) - SEO titel
- `slug` (UID) - altijd `home`
- `seo` (Component: `seo.meta`)
- `sections` (Dynamic Zone) - zie hieronder

### Dynamic Zone `sections` - Mogelijke componenten:

#### a. `section.hero`

De hero sectie is meestal de eerste sectie op de homepagina en bevat de belangrijkste call-to-action.

**Velden:**

- `title` (Text) - Hoofdtitel, bijvoorbeeld "Ontdek de Mooiste"
- `subtitle` (Text) - Ondertitel, bijvoorbeeld "Reizen naar Turkije"
- `description` (Text) - Korte beschrijving onder de titel
- `background_image` (Media) - Achtergrondafbeelding voor de hero sectie
- `badge_text` (Text, optioneel) - Kleine badge boven de titel, bijvoorbeeld "✈️ Ontdek Turkije met Vertrouwen"
- `primary_button_text` (Text) - Tekst voor primaire CTA button
- `primary_button_link` (Text/URL) - Link voor primaire button
- `secondary_button_text` (Text, optioneel) - Tekst voor secundaire button
- `secondary_button_link` (Text/URL, optioneel) - Link voor secundaire button
- `stats` (Repeatable component: `section.stat-item`) - Statistieken die getoond worden onder de buttons
  - `value` (Text) - Bijvoorbeeld "5 Regio's"
  - `label` (Text) - Bijvoorbeeld "Turkije"
  - `icon` (Enumeration: `map-pin`, `calendar`, `users`, etc.) - Icoon voor de stat

**Gebruik:**
Deze component komt overeen met de huidige `HeroSection` component en maakt alle content configureerbaar.

#### b. `section.about`

De "Over Ons" sectie met informatie over het bedrijf.

**Velden:**

- `badge_text` (Text, optioneel) - Badge boven de titel, bijvoorbeeld "Over Ons"
- `title` (Text) - Hoofdtitel van de sectie
- `description` (Rich Text) - Uitgebreide beschrijving, kan meerdere paragrafen bevatten
- `image` (Media) - Afbeelding die naast of onder de tekst getoond wordt
- `features` (Repeatable component: `section.feature-icon`) - Kleine feature icons onder de tekst
  - `icon` (Enumeration) - Icoon type (heart, award, sparkles, etc.)
  - `label` (Text) - Label bij het icoon (Passie, Expertise, Uniek)

**Gebruik:**
Vervangt de huidige `AboutSection` component en maakt alle tekst en afbeeldingen configureerbaar.

#### c. `section.featured-trips`

Sectie die uitgelichte reizen toont. Biedt flexibiliteit in hoe reizen geselecteerd worden.

**Velden:**

- `title` (Text) - Hoofdtitel, bijvoorbeeld "Uitgelichte Reizen"
- `subtitle` (Text) - Ondertitel/beschrijving
- `trip_selection` (Enumeration: `featured`, `latest`, `manual`) - Hoe worden reizen geselecteerd?
  - `featured`: Toon alleen reizen met `featured: true` flag
  - `latest`: Toon de nieuwste reizen (op basis van `createdAt`)
  - `manual`: Editor selecteert handmatig welke reizen getoond worden
- `manual_trips` (Many-to-Many → `trip`, alleen bij `manual`) - Handmatig geselecteerde reizen
- `limit` (Integer, standaard 6) - Maximum aantal reizen om te tonen
- `cta_text` (Text, optioneel) - Tekst voor "Bekijk Alle Reizen" button
- `cta_link` (Text/URL, optioneel) - Link voor de CTA button

**Gebruik:**
Vervangt de huidige `FeaturedTrips` component. De `trip_selection` enum geeft editors controle over welke reizen getoond worden zonder code wijzigingen.

#### d. `section.why-us`

De "Waarom Kiezen" sectie met voordelen en unique selling points.

**Velden:**

- `badge_text` (Text, optioneel) - Badge boven de titel
- `title` (Text) - Hoofdtitel, bijvoorbeeld "Daarom Xplore Turkiye & Beyond"
- `subtitle` (Text) - Ondertitel, bijvoorbeeld "Heerlijk reizen zonder zorgen"
- `features` (Repeatable component: `section.why-item`) - Lijst met voordelen
  - `icon` (Enumeration) - Icoon voor het voordeel
  - `title` (Text) - Titel van het voordeel, bijvoorbeeld "Persoonlijk reisadvies"
  - `description` (Text) - Beschrijving van het voordeel
  - `highlight` (Text, optioneel) - Highlight tekst, bijvoorbeeld "Expert advies"
- `bottom_cta_text` (Text, optioneel) - Tekst onderaan de sectie, bijvoorbeeld "Meer dan 1000+ tevreden reizigers"

**Gebruik:**
Vervangt de huidige `WhyUsSection` component. Features kunnen eenvoudig toegevoegd/verwijderd worden.

#### e. `section.region-map` (indien nodig)

Optionele sectie voor het tonen van een interactieve kaart met regio's.

**Velden:**

- `title` (Text) - Titel van de sectie
- `subtitle` (Text) - Beschrijving
- `regions` (Many-to-Many → `region`) - Welke regio's moeten op de kaart getoond worden

**Gebruik:**
Kan gebruikt worden om een visuele kaart van Turkije te tonen met de verschillende regio's waar reizen beschikbaar zijn.

#### f. `section.cta` (generieke call-to-action)

Herbruikbare call-to-action sectie die overal op de pagina gebruikt kan worden.

**Velden:**

- `title` (Text) - Hoofdtitel van de CTA
- `description` (Text) - Beschrijvende tekst
- `background_image` (Media, optioneel) - Optionele achtergrondafbeelding
- `primary_button_text` (Text) - Tekst voor primaire button
- `primary_button_link` (Text/URL) - Link voor primaire button
- `secondary_button_text` (Text, optioneel) - Tekst voor secundaire button
- `secondary_button_link` (Text/URL, optioneel) - Link voor secundaire button

**Gebruik:**
Kan gebruikt worden voor extra CTA's op de pagina, bijvoorbeeld na de featured trips sectie of aan het einde van de pagina.

#### g. `section.testimonials` (toekomst)

Voor toekomstige implementatie van klantbeoordelingen/testimonials.

**Velden:**

- `title` (Text) - Titel van de sectie
- `testimonials` (Many-to-Many → `testimonial`) - Geselecteerde testimonials

**Gebruik:**
Kan later toegevoegd worden wanneer een `testimonial` content type beschikbaar is.

#### h. `section.content-block` (generiek)

Flexibele content sectie voor vrije tekst en afbeeldingen.

**Velden:**

- `title` (Text, optioneel) - Optionele titel
- `content` (Rich Text) - Vrije tekst content met formatting
- `image` (Media, optioneel) - Optionele afbeelding
- `image_position` (Enumeration: `left`, `right`, `top`, `bottom`) - Waar wordt de afbeelding getoond ten opzichte van de tekst

**Gebruik:**
Voor extra content secties die niet in de andere componenten passen. Biedt maximale flexibiliteit voor editors.

---

## 2. Single Type: `navigation`

Voor configureerbare navbar.

**Waarom Single Type?**

- Er is maar één navigatie menu in de applicatie
- Menu items kunnen dynamisch beheerd worden zonder code wijzigingen
- Dropdown menu's kunnen genest worden via repeatable components

**Voordelen:**

- Menu items kunnen eenvoudig toegevoegd/verwijderd worden
- Links kunnen aangepast worden zonder deployment
- CTA button tekst en link zijn configureerbaar

### Velden:

- `logo` (Media) - logo afbeelding
- `logo_alt` (Text)
- `menu_items` (Repeatable component: `nav.menu-item`)
  - `label` (Text)
  - `link` (Text/URL)
  - `type` (Enumeration: `link`, `dropdown`)
  - `children` (Repeatable component: `nav.menu-item`, alleen bij `dropdown`)
- `cta_button_text` (Text)
- `cta_button_link` (Text/URL)
- `mobile_menu_enabled` (Boolean, standaard true)

### Component: `nav.menu-item`

- `label` (Text)
- `link` (Text/URL)
- `type` (Enumeration: `link`, `dropdown`)
- `children` (Repeatable component: `nav.menu-item`, alleen bij `dropdown`)

---

## 3. Footer configuratie

Uitbreiden van `site-settings` (uit bestaand plan).

**Waarom in `site-settings`?**

- Footer content is globaal en wordt op alle pagina's getoond
- `site-settings` is al een Single Type voor globale instellingen
- Logische plek voor footer configuratie samen met contact info en social links

**Structuur:**

- Footer links worden gegroepeerd in `link-group` components
- Elke groep heeft een titel en meerdere links
- Flexibel systeem dat makkelijk uit te breiden is

### Extra velden in `site-settings`:

- `footer_company_name` (Text)
- `footer_description` (Text)
- `footer_logo` (Media)
- `footer_links` (Repeatable component: `footer.link-group`)
  - `title` (Text)
  - `links` (Repeatable component: `footer.link`)
    - `label` (Text)
    - `url` (Text/URL)
- `footer_copyright_text` (Text)
- `footer_developer_credit` (Text, optioneel)
- `footer_developer_link` (Text/URL, optioneel)

---

## 4. Componenten structuur

### Herbruikbare components:

#### `section.stat-item`

- `value` (Text)
- `label` (Text)
- `icon` (Enumeration)

#### `section.feature-icon`

- `icon` (Enumeration)
- `label` (Text)

#### `section.why-item`

- `icon` (Enumeration)
- `title` (Text)
- `description` (Text)
- `highlight` (Text, optioneel)

#### `seo.meta` (bestaand)

- `meta_title` (Text)
- `meta_description` (Text)
- `og_image` (Media, optioneel)

---

## 5. Implementatie strategie

### Stap 1: Strapi setup

**Doel:** Content model opzetten in Strapi v5

1. **Maak alle components aan**

   - Begin met de kleinste components (`section.stat-item`, `section.feature-icon`, etc.)
   - Dan de sectie components (`section.hero`, `section.about`, etc.)
   - Test elk component individueel

2. **Maak `home-page` Single Type met Dynamic Zone**

   - Voeg basisvelden toe (`title`, `slug`, `seo`)
   - Voeg Dynamic Zone `sections` toe
   - Voeg alle sectie components toe aan de Dynamic Zone

3. **Maak `navigation` Single Type**

   - Logo en basisvelden
   - Menu items als repeatable component
   - CTA button configuratie

4. **Breid `site-settings` uit met footer velden**
   - Footer link groups
   - Copyright en developer credit

**Tijdsinschatting:** 2-4 uur afhankelijk van ervaring met Strapi

### Stap 2: Frontend aanpassingen

**Doel:** Frontend koppelen aan Strapi API

1. **Maak Strapi API client/service**

   - Setup Strapi client met environment variables
   - Helper functies voor queries
   - TypeScript types genereren

2. **Maak component mappers voor elke sectie-type**

   - Elke mapper transformeert Strapi data naar component props
   - Handelt ontbrekende data af
   - Type-safe implementatie

3. **Update `app/page.tsx` om Dynamic Zone te renderen**

   - Haal `home-page` data op
   - Loop door `sections` array
   - Render juiste component op basis van `__component` type

4. **Update `Header.tsx` om data uit `navigation` te gebruiken**

   - Vervang hardcoded menu items
   - Render dropdown menu's dynamisch
   - Gebruik logo uit Strapi

5. **Update `Footer.tsx` om data uit `site-settings` te gebruiken**
   - Vervang hardcoded links
   - Render link groups dynamisch
   - Gebruik contact info uit Strapi

**Tijdsinschatting:** 4-6 uur

### Stap 3: Component mapping

**Doel:** Elke Strapi component koppelen aan React component

Voor elke sectie-type een mapper component:

- `HeroSectionMapper` → rendert `section.hero`
  - Mapt Strapi hero data naar `HeroSection` props
  - Handelt stats array af
- `AboutSectionMapper` → rendert `section.about`
  - Mapt Strapi about data naar `AboutSection` props
  - Handelt features array af
- `FeaturedTripsMapper` → rendert `section.featured-trips`
  - Haalt trips op op basis van `trip_selection` enum
  - Mapt trips naar `TripCarousel` component
- `WhyUsSectionMapper` → rendert `section.why-us`
  - Mapt features naar `WhyUsSection` props
- `CTASectionMapper` → rendert `section.cta`
  - Generieke CTA component
- `ContentBlockMapper` → rendert `section.content-block`
  - Render Rich Text content
  - Handelt image position af

**Best practice:**

- Maak een `DynamicSectionRenderer` component die de juiste mapper aanroept
- Gebruik een switch statement of object mapping op basis van `__component` type
- Voeg error handling toe voor onbekende component types

---

## 6. Best practices voor Strapi v5

### Dynamic Zones:

- ✅ **Gebruik duidelijke component namen (`section.*`)**

  - Maakt het duidelijk dat het om sectie components gaat
  - Voorkomt naamconflicten met andere components
  - Makkelijker te vinden in Strapi Studio

- ✅ **Maak components herbruikbaar waar mogelijk**

  - `section.cta` kan op meerdere plekken gebruikt worden
  - `section.content-block` is een generieke oplossing
  - Herbruikbare components besparen tijd bij toekomstige pagina's

- ✅ **Voeg validatie toe (min/max aantal secties indien nodig)**
  - Voorkomt lege of overladen pagina's
  - Geeft editors duidelijke richtlijnen
  - Bijvoorbeeld: min 1 hero sectie, max 1 hero sectie

### Performance:

- ✅ **Populate alleen benodigde relaties**

  - Gebruik `populate` parameter specifiek: `populate[sections][populate]=*`
  - Voorkomt onnodige data transfers
  - Snellere API responses

- ✅ **Gebruik `fields` parameter om alleen benodigde velden op te halen**

  - Verminder payload size
  - Snellere parsing in frontend
  - Bijvoorbeeld: `fields[0]=title&fields[1]=slug`

- ✅ **Cache waar mogelijk (Next.js ISR/SSG)**
  - Home page is perfect voor Static Site Generation
  - Gebruik ISR met revalidation voor updates
  - Cache Strapi responses in Next.js
  - Bijvoorbeeld: `revalidate: 3600` (1 uur)

### Content management:

- ✅ **Geef editors duidelijke labels en help teksten**

  - Elke veld moet een duidelijk label hebben
  - Help teksten uitleggen wat het veld doet
  - Voorbeelden waar mogelijk

- ✅ **Gebruik enumerations voor iconen (consistentie)**

  - Voorkomt typefouten
  - Geeft editors duidelijke opties
  - Makkelijker te onderhouden in frontend

- ✅ **Voeg preview functionaliteit toe indien mogelijk**
  - Strapi v5 heeft preview functionaliteit
  - Editors kunnen zien hoe content eruit ziet
  - Voorkomt fouten voordat content live gaat

### Flexibiliteit:

- ✅ **Dynamic Zones maken herordenen mogelijk**

  - Drag & drop in Strapi Studio
  - Geen code wijzigingen nodig
  - A/B testing mogelijk door verschillende volgordes

- ✅ **Components kunnen worden toegevoegd/verwijderd zonder code wijzigingen**

  - Nieuwe sectie types kunnen toegevoegd worden
  - Oude secties kunnen verwijderd worden
  - Frontend moet wel de mapper hebben, maar content kan zonder developer

- ✅ **Toekomstige secties zijn eenvoudig toe te voegen**
  - Nieuwe component maken in Strapi
  - Toevoegen aan Dynamic Zone
  - Mapper component maken in frontend
  - Geen wijzigingen aan bestaande content nodig

---

## 7. Voorbeeld API structuur

### Strapi v5 REST API voorbeeld:

```typescript
// GET /api/home-page?populate=deep
// Of met specifieke populate:
// GET /api/home-page?populate[sections][populate]=*&populate[seo][populate]=*

{
  "data": {
    "id": 1,
    "title": "Home",
    "slug": "home",
    "seo": {
      "meta_title": "Xplore Turkiye & Beyond | Groepsreizen en Maatwerk Reizen",
      "meta_description": "...",
      "og_image": { ... }
    },
    "sections": [
      {
        "__component": "section.hero",
        "id": 1,
        "title": "Ontdek de Mooiste",
        "subtitle": "Reizen naar Turkije",
        "description": "Van groepsreizen tot maatwerk avonturen...",
        "background_image": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/cappadocie2.jpg",
              "width": 1920,
              "height": 1080
            }
          }
        },
        "badge_text": "✈️ Ontdek Turkije met Vertrouwen",
        "primary_button_text": "Ontdek Onze Reizen",
        "primary_button_link": "/reizen",
        "secondary_button_text": "Reis Aanvragen",
        "secondary_button_link": "/contact",
        "stats": [
          {
            "id": 1,
            "value": "5 Regio's",
            "label": "Turkije",
            "icon": "map-pin"
          },
          {
            "id": 2,
            "value": "12+ Reizen",
            "label": "Beschikbaar",
            "icon": "calendar"
          }
        ]
      },
      {
        "__component": "section.about",
        "id": 2,
        "badge_text": "Over Ons",
        "title": "Over Xplore Turkiye & Beyond",
        "description": "<p>Bij Xplore Turkiye & Beyond geloven we...</p>",
        "image": { ... },
        "features": [ ... ]
      },
      {
        "__component": "section.featured-trips",
        "id": 3,
        "title": "Uitgelichte Reizen",
        "subtitle": "Ontdek onze meest populaire reizen...",
        "trip_selection": "featured",
        "limit": 6,
        "cta_text": "Bekijk Alle Reizen",
        "cta_link": "/reizen"
      }
    ]
  },
  "meta": {}
}
```

### TypeScript type voorbeeld:

```typescript
interface HomePage {
  id: number;
  title: string;
  slug: string;
  seo?: SEO;
  sections: Section[];
}

type Section =
  | HeroSection
  | AboutSection
  | FeaturedTripsSection
  | WhyUsSection
  | CTASection
  | ContentBlockSection;

interface HeroSection {
  __component: "section.hero";
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  background_image: Media;
  badge_text?: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  stats: StatItem[];
}
```

### Query optimalisatie:

```typescript
// Alleen benodigde velden ophalen
const query = `
  /api/home-page?
  populate[sections][populate][0]=background_image
  &populate[sections][populate][1]=stats
  &populate[sections][populate][2]=image
  &populate[sections][populate][3]=manual_trips
  &fields[0]=title
  &fields[1]=slug
`;
```

---

## 8. Volgende stappen

**Prioriteit volgorde:**

1. ✅ **Strapi content model opzetten (components + single types)**

   - Begin met kleinste components
   - Test elk component
   - Voeg dan single types toe

2. ✅ **Test data invoeren in Strapi**

   - Gebruik bestaande content als basis
   - Test alle component types
   - Verifieer dat alle velden werken

3. ✅ **Frontend API integratie bouwen**

   - Strapi client setup
   - TypeScript types
   - Helper functies

4. ✅ **Component mappers implementeren**

   - Begin met eenvoudigste (hero)
   - Test elke mapper
   - Voeg error handling toe

5. ✅ **Migratie van hardcoded data naar Strapi**
   - Kopieer bestaande content
   - Test volledige flow
   - Verwijder hardcoded data

**Tijdlijn schatting:**

- Strapi setup: 2-4 uur
- Test data: 1-2 uur
- Frontend integratie: 4-6 uur
- Testing en debugging: 2-4 uur
- **Totaal: 9-16 uur**

---

## 9. Gedetailleerde component definities

### Component: `section.hero`

**Velden:**

- `title` (Text, required)
- `subtitle` (Text, required)
- `description` (Text)
- `background_image` (Media, single, required)
- `badge_text` (Text)
- `primary_button_text` (Text, required)
- `primary_button_link` (Text, required)
- `secondary_button_text` (Text)
- `secondary_button_link` (Text)
- `stats` (Repeatable component: `section.stat-item`)

**Validatie:**

- Min 1 stat item
- Max 4 stat items

---

### Component: `section.about`

**Velden:**

- `badge_text` (Text)
- `title` (Text, required)
- `description` (Rich Text, required)
- `image` (Media, single, required)
- `features` (Repeatable component: `section.feature-icon`)

**Validatie:**

- Min 1 feature
- Max 6 features

---

### Component: `section.featured-trips`

**Velden:**

- `title` (Text, required)
- `subtitle` (Text)
- `trip_selection` (Enumeration: `featured`, `latest`, `manual`, required)
- `manual_trips` (Many-to-Many → `trip`)
- `limit` (Integer, default: 6, min: 1, max: 12)
- `cta_text` (Text)
- `cta_link` (Text)

**Validatie:**

- Als `trip_selection` = `manual`, dan `manual_trips` is required
- `limit` tussen 1 en 12

---

### Component: `section.why-us`

**Velden:**

- `badge_text` (Text)
- `title` (Text, required)
- `subtitle` (Text)
- `features` (Repeatable component: `section.why-item`, required)
- `bottom_cta_text` (Text)

**Validatie:**

- Min 1 feature
- Max 10 features

---

### Component: `section.cta`

**Velden:**

- `title` (Text, required)
- `description` (Text)
- `background_image` (Media, single)
- `primary_button_text` (Text, required)
- `primary_button_link` (Text, required)
- `secondary_button_text` (Text)
- `secondary_button_link` (Text)

---

### Component: `section.content-block`

**Velden:**

- `title` (Text)
- `content` (Rich Text, required)
- `image` (Media, single)
- `image_position` (Enumeration: `left`, `right`, `top`, `bottom`, default: `left`)

---

### Component: `section.stat-item`

**Velden:**

- `value` (Text, required)
- `label` (Text, required)
- `icon` (Enumeration: `map-pin`, `calendar`, `users`, `star`, `award`, `globe`, required)

---

### Component: `section.feature-icon`

**Velden:**

- `icon` (Enumeration: `heart`, `award`, `sparkles`, `star`, `shield`, `check-circle`, required)
- `label` (Text, required)

---

### Component: `section.why-item`

**Velden:**

- `icon` (Enumeration: `headphones`, `message-square`, `shield`, `star`, `globe`, `check-circle-2`, required)
- `title` (Text, required)
- `description` (Text, required)
- `highlight` (Text)

---

### Component: `nav.menu-item`

**Velden:**

- `label` (Text, required)
- `link` (Text, required)
- `type` (Enumeration: `link`, `dropdown`, required, default: `link`)
- `children` (Repeatable component: `nav.menu-item`)

**Validatie:**

- Als `type` = `dropdown`, dan min 1 child item
- Als `type` = `link`, dan geen children

---

### Component: `footer.link-group`

**Velden:**

- `title` (Text, required)
- `links` (Repeatable component: `footer.link`, required)

**Validatie:**

- Min 1 link

---

### Component: `footer.link`

**Velden:**

- `label` (Text, required)
- `url` (Text, required)

---

## 10. Frontend implementatie structuur

### API Service structuur:

```
lib/
  strapi/
    client.ts          # Strapi API client
    queries.ts        # GROQ/GraphQL queries
    types.ts          # TypeScript types
    mappers/
      home-page.ts    # Home page data mapper
      navigation.ts   # Navigation data mapper
      footer.ts       # Footer data mapper
```

### Component mappers:

```
components/
  sections/
    mappers/
      HeroSectionMapper.tsx
      AboutSectionMapper.tsx
      FeaturedTripsMapper.tsx
      WhyUsSectionMapper.tsx
      CTASectionMapper.tsx
      ContentBlockMapper.tsx
      RegionMapMapper.tsx
```

### Dynamic Zone renderer:

```typescript
// components/sections/DynamicSectionRenderer.tsx
// Renders sections based on __component type

interface DynamicSectionRendererProps {
  sections: Section[];
}

export function DynamicSectionRenderer({
  sections,
}: DynamicSectionRendererProps) {
  return (
    <>
      {sections.map((section, index) => {
        switch (section.__component) {
          case "section.hero":
            return <HeroSectionMapper key={index} data={section} />;
          case "section.about":
            return <AboutSectionMapper key={index} data={section} />;
          case "section.featured-trips":
            return <FeaturedTripsMapper key={index} data={section} />;
          case "section.why-us":
            return <WhyUsSectionMapper key={index} data={section} />;
          case "section.cta":
            return <CTASectionMapper key={index} data={section} />;
          case "section.content-block":
            return <ContentBlockMapper key={index} data={section} />;
          default:
            console.warn(`Unknown section type: ${section.__component}`);
            return null;
        }
      })}
    </>
  );
}
```

**Voordelen van deze aanpak:**

- Type-safe: TypeScript weet welke props elke mapper verwacht
- Uitbreidbaar: Nieuwe secties zijn eenvoudig toe te voegen
- Onderhoudbaar: Elke mapper is geïsoleerd
- Testbaar: Elke mapper kan individueel getest worden

---

## 11. Migratie checklist

- [ ] Strapi v5 project opzetten
- [ ] Alle components aanmaken in Strapi
- [ ] Single Types aanmaken (`home-page`, `navigation`)
- [ ] `site-settings` uitbreiden met footer velden
- [ ] Test data invoeren
- [ ] Frontend Strapi client implementeren
- [ ] Component mappers bouwen
- [ ] Dynamic Zone renderer implementeren
- [ ] Header component updaten
- [ ] Footer component updaten
- [ ] Home page component updaten
- [ ] Testen en valideren
- [ ] Productie data migreren

---

## 12. Notities en overwegingen

### Performance optimalisaties:

- **Gebruik Next.js `generateStaticParams` voor statische generatie**

  - Home page is perfect voor SSG
  - Snellere laadtijden
  - Betere SEO

- **Implementeer ISR (Incremental Static Regeneration) voor home page**

  - Content updates zonder volledige rebuild
  - Bijvoorbeeld: `revalidate: 3600` (1 uur)
  - Balans tussen performance en fresh content

- **Cache Strapi responses waar mogelijk**

  - Next.js fetch cache
  - Redis cache voor productie (optioneel)
  - Verminder API calls

- **Lazy load secties indien nodig**
  - Voor zware secties (bijv. kaarten)
  - React.lazy() voor code splitting
  - Betere initial load time

### Content editor ervaring:

- **Voeg duidelijke help teksten toe aan alle velden**

  - Uitleg wat elk veld doet
  - Voorbeelden waar nuttig
  - Best practices in help tekst

- **Gebruik preview functionaliteit in Strapi Studio**

  - Editors kunnen preview zien
  - Voorkomt fouten
  - Betere content kwaliteit

- **Maak duidelijke component namen en labels**

  - "Hero Sectie" in plaats van "section.hero"
  - Beschrijvende labels
  - Groepeer gerelateerde velden

- **Voeg validatie toe om data consistentie te garanderen**
  - Required velden waar nodig
  - Min/max waarden
  - Custom validatie waar nodig

### Toekomstige uitbreidingen:

- **Mogelijkheid om A/B testing toe te voegen**

  - Meerdere versies van een sectie
  - Variant selectie in Strapi
  - Analytics tracking per variant

- **Scheduled publishing voor secties**

  - Strapi v5 heeft scheduled publishing
  - Plan content updates
  - Automatische publicatie

- **Multi-language support (i18n)**

  - Strapi i18n plugin
  - Meerdere talen voor content
  - Language switcher in frontend

- **Analytics tracking per sectie**

  - Track welke secties effectief zijn
  - Scroll depth tracking
  - Click tracking op CTA's

- **Content versioning**
  - Revisie geschiedenis
  - Rollback mogelijkheid
  - Content approval workflow

---

_Laatste update: [Datum]_
_Status: Planning fase_
