# Xplore Turkiye & Beyond - Travel Agency Website

A modern, marketing-focused frontend for a travel agency promoting group tours and trips to Turkey. Built with Next.js 14+, Tailwind CSS, shadcn/ui, and Framer Motion.

## Features

- 🏠 **Landing Page** with hero section, about us, featured trips carousel, and "Why Us" section
- 🗺️ **Trip Types**: Groepsreizen, Maatwerk Reizen, Self Drives, City Trips
- 🎯 **Filtering**: Filter trips by type and region
- 📍 **Regions**: 5 Turkish regions with Mapbox visualization
- 📄 **Trip Detail Pages**: Comprehensive trip information with itinerary, included/excluded items
- 🎨 **Modern UI**: Clean design with brand colors and smooth animations
- 📱 **Responsive**: Fully responsive design for all devices

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Mapbox GL JS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Mapbox (optional):
   - Get a Mapbox access token from [mapbox.com](https://www.mapbox.com)
   - Create a `.env.local` file:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
travel-tour/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── reizen/            # Trip pages
│   ├── over-ons/          # About page
│   └── contact/           # Contact page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer
│   ├── sections/          # Landing page sections
│   └── trips/             # Trip-related components
├── lib/
│   ├── data/             # Dummy data
│   └── utils.ts          # Utility functions
└── types/                # TypeScript types
```

## Brand Colors

- Primary: `#294d54` (Dark Teal)
- Accent: `#d44e42` (Coral Red - CTAs, borders)
- Background: `#eee8e3` (Light Beige)
- Primary Light: `#3a6c76` (Medium Teal)
- Primary Dark: `#182e32` (Very Dark Teal)

## Features in Detail

### Landing Page
- Hero section with CTA buttons
- About us section
- Featured trips carousel
- "Why Us" section with 5 feature cards
- Footer with social links

### Trip Pages
- Filter by trip type and region
- Trip cards with images, pricing, and details
- Responsive grid layout

### Trip Detail Pages
- Hero image with trip information
- Overview section
- Highlights/attractions
- Day-by-day itinerary
- Included/excluded items
- Image gallery
- CTA section

## Dummy Data

The project includes 8 sample trips across different types and regions. All data is stored in `lib/data/trips.ts` and can be easily extended.

## Deployment

### Vercel (Recommended)

This project is ready to deploy on Vercel:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js
   - Click "Deploy"

3. **No Environment Variables Needed**:
   - This project uses dummy data and doesn't require any API keys
   - All images are from Unsplash (no configuration needed)

### Build Commands

- **Build**: `npm run build`
- **Start**: `npm start`
- **Dev**: `npm run dev`

## Future Enhancements

- CMS integration (Contentful, Sanity, etc.)
- Booking system
- Payment integration
- User accounts
- Reviews and ratings
- Blog section
- Newsletter signup

## License

This is a marketing frontend template. All rights reserved.

