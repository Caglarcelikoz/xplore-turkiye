# Xplore Turkiye & Beyond

Monorepo voor de Xplore Turkiye & Beyond reiswebsite, bestaande uit een Strapi CMS backend en een Next.js frontend.

## Project Structuur

```
xplore-turkiye/
├── cms/          # Strapi CMS backend
├── frontend/     # Next.js frontend applicatie
└── README.md     # Dit bestand
```

## Tech Stack

### Backend (CMS)

- **Framework**: Strapi 5.x
- **Database**: SQLite (development)
- **Language**: TypeScript

### Frontend

- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ (zie `cms/package.json` voor exacte versie)
- npm of yarn

### Development Setup

1. **Clone de repository** (als je deze vanuit een remote repository haalt)

2. **Installeer CMS dependencies**:

   ```bash
   cd cms
   npm install
   ```

3. **Installeer Frontend dependencies**:

   ```bash
   cd ../frontend
   npm install
   ```

4. **Start CMS development server**:

   ```bash
   cd cms
   npm run develop
   ```

   CMS draait op: http://localhost:1337

5. **Start Frontend development server** (in een nieuwe terminal):
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend draait op: http://localhost:3000

## Environment Variables

### CMS (.env in `cms/` directory)

Zie Strapi documentatie voor benodigde environment variables.

### Frontend (.env.local in `frontend/` directory)

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Voor productie:

```
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
```

## Deployment

### CMS (Strapi)

Deploy naar Strapi Cloud, Railway, Heroku, of een andere Node.js hosting provider.

### Frontend (Next.js)

Deploy naar Vercel (aanbevolen), Netlify, of een andere Next.js hosting provider.

## Git Workflow

Dit is een monorepo met beide projecten in dezelfde repository. Dit maakt het makkelijker om:

- Wijzigingen tussen frontend en CMS te coördineren
- Versiebeheer te synchroniseren
- Deployment te stroomlijnen

## License

Alle rechten voorbehouden.
