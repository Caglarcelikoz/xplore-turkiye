## Strapi v5 content model voor travel-tour

Dit document beschrijft hoe je de huidige frontend-data (trips, regio's, types) het best modelleert in Strapi v5, inclusief blog, tags en koppelingen.

---

## Overzicht van de belangrijkste content types

- **Collections**
  - `region`
  - `trip-type`
  - `trip`
  - `place`
  - `tag`
  - `blog-post`
- **Single types**
  - `site-settings`
- **Components (suggestie)**
  - `geo.point` (`lng`, `lat`)
  - `geo.bounds` (`sw_lng`, `sw_lat`, `ne_lng`, `ne_lat`)
  - `trip.day-plan` (`day`, `title`, `description`, `locations`)
  - `trip.highlight` (`text`)
  - `trip.inclusion` (`label`)
  - `trip.exclusion` (`label`)
  - `trip.why-item` (`title`, `description`)
  - `trip.faq-item` (`question`, `answer`)
  - `seo.meta` (`meta_title`, `meta_description`, `og_image`, …)

---

## 1. `region` (Regio's)

Equivalent van de huidige `RegionInfo`-data uit `regions.ts`.

**Collection type**: `region`

**Velden**

- `name` (Text)
- `slug` (UID, b.v. `centraal-anatolie`)
- `description` (Rich Text)
- `coordinates` (Component: `geo.point`)
- `bounds` (Component: `geo.bounds`, optioneel)
- `hero_image` (Media, single, optioneel)
- `seo` (Component: `seo.meta`, optioneel)

**Relaties**

- `trips` (One-to-Many of Many-to-Many naar `trip`, afhankelijk van voorkeur)
- `blog_posts` (One-to-Many naar `blog-post` voor primaire regio, optioneel)
- `places` (One-to-Many naar `place`)

Frontend-URLs sluiten aan op:

- `/reizen?region=centraal-anatolie`
- of via bestaande structuur waarin `trip.region.slug` gebruikt wordt.

---

## 2. `trip-type` (Reistypes)

Equivalent van `tripTypes` uit `constants.ts` + content uit `tripTypePages.ts`.

**Collection type**: `trip-type`

**Velden**

- `name` (Text) — bv. "Groepsreizen"
- `slug` (UID) — bv. `groepsreizen`, `maatwerk`, `self-drives`, `citytrips`
- `description` (Text)
- `icon` (Enumeration of Text) — bv. `users`, `sparkles`, `car`, `map-pin`

**Content voor type-pagina's (vanuit `tripTypePages.ts`):**

- `hero_title` (Text)
- `hero_subtitle` (Text)
- `hero_image` (Media)
- `description_long` (Rich Text)
- `highlights` (Repeatable component `trip.highlight`)
- `why_choose` (Repeatable component `trip.why-item`)
- `faq` (Repeatable component `trip.faq-item`, optioneel)

**Relaties**

- `trips` (One-to-Many naar `trip`)

Frontend:

- `/reizen/[type]` → filter `trip` op `trip_type.slug`.

---

## 3. `trip` (Reizen)

Equivalent van het huidige `Trip` type in `types/index.ts` en de entries in `trips.ts`.

**Collection type**: `trip`

**Basisvelden**

- `title` (Text)
- `slug` (UID)
- `subtitle` (Text)
- `duration` (Integer, aantal dagen)
- `price_from` (Integer)
- `price_note` (Text)
- `best_travel_time` (Text of Enumeration)
- `departure_city` (Text)
- `images` (Media, multiple)
- `overview` (Rich Text)
- `featured` (Boolean)
- `coordinates` (Component: `geo.point`, optioneel)
- `route` (Repeatable component: `geo.point` of JSON-veld, optioneel)

**Contentvelden**

- `highlights` (Repeatable component `trip.highlight`)
- `itinerary` (Repeatable component `trip.day-plan`)
  - Component `trip.day-plan`:
    - `day` (Integer)
    - `title` (Text)
    - `description` (Rich Text/Text)
    - `locations` (Repeatable Text)
      > Optioneel later vervangen door echte `place`-relaties.
- `included` (Repeatable component `trip.inclusion`)
- `excluded` (Repeatable component `trip.exclusion`)

**Relaties**

- `trip_type` (Many-to-One → `trip-type`)
- `region` (Many-to-One → `region`)
- `tags` (Many-to-Many → `tag`)
- `places` (Many-to-Many → `place`)
- `related_trips` (Many-to-Many self relation → `trip`)
- `related_blog_posts` (Many-to-Many → `blog-post`, optioneel)

Frontend koppelingen:

- `/reizen/[type]/[slug]` → zoek `trip` op `slug` en `trip_type.slug`.
- "Gerelateerde reizen" → gebruik `related_trips` of gemeenschappelijke `tags`/`places`.
- "Gerelateerde blogartikelen" → via `related_blog_posts`, of via overlappende `tags` / `places`.

---

## 4. `place` (Plaatsen / Locaties)

Extra domeinlaag om zowel trips als blogs logisch te koppelen aan concrete plaatsen (Istanbul, Göreme, Cappadocië, Nemrut Dağı, etc.).

**Collection type**: `place`

**Velden**

- `name` (Text)
- `slug` (UID)
- `type` (Enumeration) — bv. `city`, `regio`, `natuurgebied`, `bezienswaardigheid`, …
- `description` (Rich Text, optioneel)
- `coordinates` (Component: `geo.point`, optioneel)
- `images` (Media, multiple, optioneel)

**Relaties**

- `region` (Many-to-One → `region`)
- `trips` (Many-to-Many → `trip`)
- `blog_posts` (Many-to-Many → `blog-post`)

Gebruik:

- Trip detailpagina:
  - Sectie "Bezochte plaatsen" → `trip.places`.
- Blog artikel:
  - Sectie "In dit artikel genoemde plaatsen" → `blog-post.places`.
- Landingspagina's:
  - `/plaatsen/[slug]` → toon bijbehorende trips en blogartikelen.

---

## 5. `tag` (Tags)

Generieke tags voor zowel reizen als blogartikelen.

**Collection type**: `tag`

**Velden**

- `name` (Text)
- `slug` (UID)
- `type` (Enumeration, optioneel)
  - voorbeelden: `thema`, `ervaring`, `doelgroep`, `seizoen`, `bestemming`, `blog-only`, …
- `description` (Text of Rich Text, optioneel)

**Relaties**

- `trips` (Many-to-Many → `trip`)
- `blog_posts` (Many-to-Many → `blog-post`)

Gebruik:

- `/reizen?tag=familie`
- `/blog/tag/[tagSlug]` → alle artikelen met die tag.
- Op trip detailpagina: "Tags" gebruiken om andere, thematisch gelijkaardige trips/blogs te tonen.

---

## 6. `blog-post` (Blogartikelen)

Voor reisverhalen, gidsen, inspiratie, etc. Koppelt aan trips, regio's, tags en plaatsen.

**Collection type**: `blog-post`

**Velden**

- `title` (Text)
- `slug` (UID)
- `excerpt` (Text)
- `cover_image` (Media)
- `content` (Rich Text / Dynamic Zone, afhankelijk van voorkeur)
- `reading_time` (Integer, optioneel)
- `status` (gebruikt standaard Strapi `draft/published`)
- `publishedAt` (datetime, standaard Strapi)
- `seo` (Component `seo.meta`, optioneel)

**Relaties**

- `tags` (Many-to-Many → `tag`)
- `primary_region` (Many-to-One → `region`)
- `places` (Many-to-Many → `place`)
- `related_trips` (Many-to-Many → `trip`)
- `author` (Many-to-One → `admin::user` of eigen `author` collection)

Gebruik in frontend:

- `/blog` → lijst van `blog-post` (gefilterd op `status=published`).
- `/blog/[slug]` → detailpagina.
- "Reizen in dit artikel" → `related_trips`.
- "Meer artikelen over deze regio" → filter op `primary_region.slug`.
- "Meer over deze plaats" → filter op `places.slug`.

---

## 7. `site-settings` (Globale instellingen)

Vervanger voor o.a. `contactInfo` en `socialLinks` in `constants.ts`.

**Single type**: `site-settings`

**Velden**

- `contact_phone` (Text)
- `contact_email` (Email)
- `contact_address` (Text)
- `social_instagram` (Text/URL)
- `social_facebook` (Text/URL)
- `social_linkedin` (Text/URL)
- `social_tiktok` (Text/URL)
- Eventueel:
  - `default_meta` (Component `seo.meta`)
  - `default_hero_image` (Media)

Frontend:

- Eén request naar `/site-settings` om globale data te laden (bijv. in `layout.tsx` of een global provider).

---

## 8. Relaties en typische queries (voor Next.js)

**Trips per type**

- Query in Strapi:
  - `GET /api/trips?filters[trip_type][slug][$eq]=groepsreizen`
- Frontend:
  - `/reizen/groepsreizen`

**Trips per regio**

- `GET /api/trips?filters[region][slug][$eq]=centraal-anatolie`

**Gerelateerde blogartikelen bij een trip**

1. Primair via expliciete relatie:
   - `trip.related_blog_posts`
2. Fallback via tags/places:
   - Query `blog-post` met:
     - `filters[tags][id][$in]=<trip.tags>`
     - of `filters[places][id][$in]=<trip.places>`

**Gerelateerde trips bij een blogartikel**

- Direct via `blog-post.related_trips`.
- Of via overlappende `tags` / `places`.

**Artikelen over een bepaalde plaats**

- `GET /api/blog-posts?filters[places][slug][$eq]=istanbul`

---

## 9. Migratiestrategie vanuit de huidige code

1. **Maak content types aan in Strapi v5**
   - `region`, `trip-type`, `trip`, `place`, `tag`, `blog-post`, `site-settings`.
   - Voeg de voorgestelde components toe.
2. **Vul eerst basisdata in**
   - `region` en `trip-type` opzetten (komt overeen met `regions.ts` en `constants.ts`).
3. **Migreer bestaande trips**
   - Gebruik de gegevens uit `lib/data/trips.ts` om handmatig of via script `trip` entries te maken.
   - Koppel meteen `trip_type` en `region`.
4. **Voeg optioneel `place`-entries toe**
   - Maak plaatsen aan voor de belangrijkste steden/gebieden (Istanbul, Cappadocië, Antalya, etc.).
   - Koppel bestaande trips aan deze plaatsen op hoofdniveau (niet per dag, dat kan later).
5. **Zet blog op**
   - Start met eenvoudige `blog-post` entries.
   - Voeg `tags`, `primary_region`, `places` en `related_trips` toe waar relevant.
6. **Pas de frontend-fetchlaag aan**
   - Vervang functies zoals `getAllTrips`, `getTripsByType`, `getTripsByRegion` door calls naar de Strapi API.
   - Zorg dat de URL-structuur hetzelfde blijft; alleen de datalaag wijzigt.

Met deze structuur blijft je domeinlogica (Trips, Regio's, Types) herkenbaar voor de frontend, terwijl editors in Strapi veel vrijheid krijgen om content, blogartikelen, tags en koppelingen te beheren zonder codewijzigingen.
