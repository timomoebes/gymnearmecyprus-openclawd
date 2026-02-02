# GymNearMe Cyprus Directory — Development Plan

## 🎯 Project Overview

**Goal**: Build a high-credibility, visually stunning gym directory for Cyprus optimized for Google Page 1 rankings, modeled after scratchanddentlocator.com.

**Strategy**: Frontend MVP first with mock data, then backend/database integration later.

---

## 📐 Architecture & Technology Stack

### Frontend Framework
- **Next.js 14+** (App Router) - SEO-optimized, server-side rendering, excellent performance
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Rapid UI development with custom design system
- **React** - Component-based architecture

### Mapping
- **Leaflet.js** with **OpenStreetMap** - Interactive maps (no Google Maps)
- **React-Leaflet** - React bindings for Leaflet

### Styling & UI
- **Tailwind CSS** with custom configuration
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Modern icon library
- Custom color palette: Neon/dark theme inspiration

### SEO & Metadata
- **next-seo** or native Next.js metadata API
- **Schema.org** JSON-LD for LocalBusiness, AggregateRating, BreadcrumbList
- Semantic HTML5 throughout

### Data Management (MVP Phase)
- **Mock data files** (JSON/TypeScript) organized by:
  - Cities
  - Gyms
  - Specialties
  - Reviews
  - Owners
- Structured for easy migration to Supabase later

---

## 🏗️ Project Structure

```
new-gym/
├── public/
│   ├── images/
│   │   ├── gyms/          # Gym photos
│   │   ├── cities/        # City hero images
│   │   └── logos/         # Gym logos
│   └── icons/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (home)/        # Home page route group
│   │   │   └── page.tsx
│   │   ├── cities/        # City pages
│   │   │   ├── [city]/    # Dynamic city route
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx   # All cities index
│   │   ├── gyms/          # Gym detail pages
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── specialties/   # Specialty pages
│   │   │   ├── [specialty]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── pricing/       # Pricing page
│   │   │   └── page.tsx
│   │   ├── add-gym/       # Owner submission flow
│   │   │   └── page.tsx
│   │   ├── dashboard/     # Owner dashboard (mock)
│   │   │   └── page.tsx
│   │   ├── layout.tsx     # Root layout
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── CityCards.tsx
│   │   │   ├── SpecialtiesGrid.tsx
│   │   │   └── TrustSignals.tsx
│   │   ├── gym/
│   │   │   ├── GymCard.tsx
│   │   │   ├── GymDetail.tsx
│   │   │   ├── GymGallery.tsx
│   │   │   ├── GymAmenities.tsx
│   │   │   ├── GymReviews.tsx
│   │   │   └── GymMap.tsx
│   │   ├── city/
│   │   │   ├── CityHero.tsx
│   │   │   ├── CityGymsGrid.tsx
│   │   │   └── CityMap.tsx
│   │   ├── shared/
│   │   │   ├── Rating.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── CTA.tsx
│   │   └── pricing/
│   │       ├── PricingTable.tsx
│   │       └── PricingCard.tsx
│   ├── lib/
│   │   ├── data/          # Mock data
│   │   │   ├── cities.ts
│   │   │   ├── gyms.ts
│   │   │   ├── specialties.ts
│   │   │   ├── reviews.ts
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── seo.ts     # SEO helpers
│   │   │   ├── schema.ts  # Schema.org generators
│   │   │   └── formatting.ts
│   │   └── types/
│   │       └── index.ts   # TypeScript types
│   └── hooks/
│       ├── useMap.ts
│       └── useGymData.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

---

## 🎨 Design System

### Color Palette (Neon/Dark Theme)
- **Primary**: Electric Blue (#00D9FF) / Deep Purple (#6C5CE7)
- **Secondary**: Neon Green (#00FF88) / Coral (#FF6B6B)
- **Background**: Dark (#0A0E27) / Dark Gray (#1A1F3A)
- **Surface**: Card Dark (#252B42) / Lighter (#2D3447)
- **Text**: White (#FFFFFF) / Light Gray (#E0E0E0) / Muted (#9CA3AF)
- **Accent**: Gold (#FFD700) for featured badges

### Typography
- **Headings**: Bold, modern sans-serif (Inter/Poppins)
- **Body**: Clean, readable (Inter/System)
- **Hero**: Large, impactful (72px+ on desktop)
- **Hierarchy**: Clear H1-H6 structure for SEO

### Components Style
- **Cards**: Rounded corners (12px), subtle shadows, hover effects
- **Buttons**: Rounded, gradient backgrounds, smooth transitions
- **Badges**: Pill-shaped, vibrant colors
- **Ratings**: Star icons with color coding (gold for high, gray for low)

---

## 📄 Page Specifications

### 1. Home Page (`/`)
**Purpose**: Conversion-optimized landing page

**Sections**:
1. **Hero Section**
   - Large headline: "Find the Perfect Gym in Cyprus"
   - Subheadline with value proposition
   - Search bar (city/specialty)
   - CTA: "Explore Gyms" / "List Your Gym Free"

2. **City Cards Grid**
   - 6-8 major cities (Limassol, Nicosia, Paphos, Larnaca, Ayia Napa, etc.)
   - Each card: City name, gym count, featured image, "View Gyms" CTA
   - Hover effects with city highlights

3. **Specialties Grid**
   - Categories: CrossFit, Bodybuilding, Yoga, Pilates, MMA, Boxing, etc.
   - Icon + name + gym count per specialty
   - Links to specialty pages

4. **Trust Signals**
   - "X+ Gyms Listed"
   - "X+ Happy Members"
   - "100% Free to List"
   - Testimonials or stats

5. **Featured Gyms Preview**
   - 3-4 featured gyms with large cards
   - Ratings, location, specialty badges
   - "View All Featured" CTA

6. **Footer**
   - Links to all cities, specialties
   - Owner resources
   - Contact info

**SEO**:
- H1: "Find the Best Gyms in Cyprus | GymNearMe"
- Meta description: Keyword-rich, compelling
- Schema: Organization, WebSite

---

### 2. City Pages (`/cities/[city]`)
**Purpose**: Local SEO pillar pages

**Structure**:
1. **City Hero**
   - City name, gym count, map preview
   - Breadcrumbs: Home > Cities > [City]

2. **City Overview**
   - Brief description of city's fitness scene
   - Key statistics

3. **Featured Gyms Section** (if any)
   - Prominent placement with badges
   - Larger cards

4. **All Gyms Grid**
   - Filterable by specialty
   - Sortable by: Rating, Name, Featured
   - Each card: Photo, name, rating, specialties, amenities icons, "View Details" CTA

5. **City Map**
   - OpenStreetMap with all gym pins
   - Clickable pins show gym preview

6. **Specialties in [City]**
   - Links to specialty pages filtered by city

**SEO**:
- H1: "Best Gyms in [City], Cyprus | [X] Gyms Listed"
- Meta: "[City] gym directory with ratings, reviews, and maps"
- Schema: LocalBusiness collection, BreadcrumbList

---

### 3. Gym Detail Pages (`/gyms/[slug]`)
**Purpose**: Premium, conversion-focused individual gym pages

**Structure**:
1. **Hero Section**
   - Large photo gallery (carousel)
   - Gym name, rating (stars + number), review count
   - Featured badge (if applicable)
   - Location (city, address)
   - Quick actions: Call, Directions, Website

2. **Key Stats Bar**
   - Rating, Reviews, Member Count, Years in Business

3. **About Section**
   - Description, specialties, amenities table
   - Opening hours

4. **Top Reviews** (3-5 only)
   - Google Maps reviews (mocked)
   - Star rating, reviewer name, date, excerpt
   - "View on Google Maps" link
   - Space reserved for future local reviews

5. **Amenities & Facilities**
   - Icon grid with labels
   - Grouped by category (Equipment, Services, etc.)

6. **Map Section**
   - OpenStreetMap with gym location pin
   - Address, directions link

7. **Related Gyms**
   - Same city, same specialty
   - Horizontal scroll cards

8. **Owner CTA** (if not owner)
   - "Claim This Listing" / "Update Information"

**SEO**:
- H1: "[Gym Name] - [City] | Ratings, Reviews, Amenities"
- Meta: Comprehensive description with keywords
- Schema: LocalBusiness (complete), AggregateRating, BreadcrumbList

---

### 4. Specialty Pages (`/specialties/[specialty]`)
**Purpose**: Cluster pages for specialty SEO

**Structure**:
1. **Specialty Hero**
   - Specialty name, description
   - Total gyms count across Cyprus

2. **Gyms by City**
   - Grouped sections per city
   - Gym cards with ratings

3. **City Map**
   - All gyms of this specialty pinned

4. **Related Specialties**
   - Links to similar categories

**SEO**:
- H1: "Best [Specialty] Gyms in Cyprus"
- Meta: Specialty-focused keywords
- Schema: Collection of LocalBusiness

---

### 5. Pricing Page (`/pricing`)
**Purpose**: Monetization transparency

**Structure**:
1. **Hero**
   - "Get Featured on GymNearMe"
   - Value proposition

2. **Pricing Tiers**
   - **Free**: Basic listing
   - **Featured Monthly**: €X/month
   - **Featured Yearly**: €X/year (discount)
   - **Featured Lifetime**: €X one-time
   - Comparison table

3. **Featured Benefits**
   - Badge, priority placement, analytics, etc.

4. **Urgency Elements**
   - "2 slots left in Limassol!" banners
   - Limited availability messaging

5. **FAQ Section**

**SEO**:
- H1: "Gym Listing Pricing | List Your Gym on GymNearMe"
- Meta: Pricing-focused keywords

---

### 6. Add Gym Page (`/add-gym`)
**Purpose**: Owner submission flow

**Structure**:
1. **Multi-step Form**
   - Step 1: Basic info (name, city, address)
   - Step 2: Details (specialties, amenities, hours)
   - Step 3: Photos, contact info
   - Step 4: Preview & submit

2. **Progress Indicator**
3. **Instant Claim Flow** (mock)
4. **Upgrade Prompt** (to featured)

---

### 7. Owner Dashboard (`/dashboard`)
**Purpose**: Mock owner experience

**Structure**:
1. **Overview Cards**
   - Views, clicks, inquiries
   - Current plan (Free/Featured)

2. **Gym Management**
   - Edit listing
   - Upload photos
   - Update hours/amenities

3. **Upgrade Prompts**
   - Featured benefits
   - CTA to pricing

4. **Analytics Preview** (mock data)

---

## 🔍 SEO Strategy

### On-Page SEO
- **Semantic HTML**: Proper heading hierarchy (H1-H6)
- **Meta Tags**: Unique title, description per page
- **Alt Text**: All images descriptive
- **Internal Linking**: City → Gyms → Specialties (hub & spoke)
- **URL Structure**: Clean, keyword-rich slugs

### Schema Markup
- **LocalBusiness**: Every gym (name, address, phone, rating, etc.)
- **AggregateRating**: Star ratings and review counts
- **BreadcrumbList**: Navigation hierarchy
- **Organization**: Site-wide
- **WebSite**: Search action schema

### Content Strategy
- **City Pages**: Unique descriptions per city
- **Gym Pages**: Rich, keyword-optimized descriptions
- **Specialty Pages**: Educational content about each specialty

### Technical SEO
- **Sitemap**: Auto-generated for all pages
- **Robots.txt**: Proper crawling directives
- **Page Speed**: Optimized images, lazy loading
- **Mobile-First**: Responsive design

---

## 🗺️ Map Integration (OpenStreetMap)

### Implementation
- **Leaflet.js** with OpenStreetMap tiles
- **React-Leaflet** for React integration
- **Custom markers** for gyms (different for featured)
- **Clustering** for city pages with many gyms
- **Popup cards** on marker click

### Features
- Interactive zoom/pan
- Clickable pins with gym preview
- Directions link (external to OSM routing)
- Full-screen map option

---

## 📊 Mock Data Structure

### Cities
```typescript
{
  id: string;
  name: string;
  slug: string;
  description: string;
  gymCount: number;
  coordinates: [lat, lng];
  heroImage: string;
}
```

### Gyms
```typescript
{
  id: string;
  name: string;
  slug: string;
  cityId: string;
  address: string;
  coordinates: [lat, lng];
  phone?: string;
  website?: string;
  email?: string;
  specialties: string[];
  amenities: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  description: string;
  images: string[];
  openingHours: Record<string, string>;
  memberCount?: number;
  yearsInBusiness?: number;
  ownerId?: string;
}
```

### Reviews
```typescript
{
  id: string;
  gymId: string;
  source: 'google' | 'local';
  reviewerName: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}
```

### Specialties
```typescript
{
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  gymCount: number;
}
```

---

## 🎯 Development Phases

### Phase 1: Foundation (Days 1-2)
- [ ] Next.js project setup with TypeScript
- [ ] Tailwind CSS configuration
- [ ] Basic layout components (Header, Footer, Navigation)
- [ ] Type definitions
- [ ] Mock data structure setup

### Phase 2: Core Pages (Days 3-5)
- [ ] Home page (Hero, City Cards, Specialties Grid)
- [ ] City pages (dynamic routing)
- [ ] Gym detail pages (dynamic routing)
- [ ] Specialty pages
- [ ] Basic styling and responsiveness

### Phase 3: Advanced Features (Days 6-7)
- [ ] OpenStreetMap integration
- [ ] Review components (top 3-5)
- [ ] Featured badges and priority placement
- [ ] Search functionality
- [ ] Filtering and sorting

### Phase 4: Owner Experience (Days 8-9)
- [ ] Add Gym form (multi-step)
- [ ] Owner dashboard (mock)
- [ ] Pricing page
- [ ] Upgrade prompts

### Phase 5: SEO & Polish (Days 10-11)
- [ ] Schema markup implementation
- [ ] Meta tags optimization
- [ ] Internal linking strategy
- [ ] Image optimization
- [ ] Performance optimization
- [ ] Final design polish

### Phase 6: Testing & Documentation (Day 12)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check
- [ ] SEO audit
- [ ] Documentation updates
- [ ] Deployment preparation

---

## 🚀 Key Features to Implement

### Must-Have (MVP)
✅ Responsive design (mobile-first)
✅ City directory pages
✅ Gym detail pages with ratings
✅ OpenStreetMap integration
✅ Top 3-5 reviews display
✅ Featured listing badges
✅ SEO-optimized structure
✅ Schema markup
✅ Internal linking
✅ Owner submission flow (mock)

### Nice-to-Have (Post-MVP)
- Advanced search with filters
- Comparison tool (gym vs gym)
- User favorites/bookmarks
- Email notifications
- Social sharing
- Blog section for SEO content

---

## 📝 Notes for Backend Integration

### Data Migration Path
- All mock data in TypeScript/JSON files
- Clear separation: `lib/data/` folder
- Type-safe interfaces ready for database schema
- API route placeholders: `/api/gyms`, `/api/cities`, etc.

### Supabase Preparation
- Tables: `gyms`, `cities`, `specialties`, `reviews`, `owners`
- Relationships: Foreign keys defined in types
- Authentication: Owner login/claim flow ready
- Storage: Image uploads structure planned

---

## 🎨 Design Inspiration

- **Reference**: scratchanddentlocator.com
- **Style**: Modern, clean, conversion-focused
- **Colors**: Neon/dark theme with vibrant accents
- **Typography**: Bold, readable, hierarchy-focused
- **Components**: Card-based, hover effects, smooth transitions

---

## ✅ Success Criteria

1. **Visual Excellence**: Stunning, professional design
2. **Mobile Perfect**: Flawless on all devices
3. **SEO Ready**: Schema, meta tags, semantic HTML
4. **Performance**: Fast load times, optimized images
5. **User Experience**: Intuitive navigation, clear CTAs
6. **Backend Ready**: Clean data structure for easy migration

---

## 📚 Next Steps

1. **Review this plan** with stakeholder
2. **Set up project** (Next.js, dependencies)
3. **Create design system** (colors, typography, components)
4. **Build mock data** (realistic Cyprus gym data)
5. **Develop pages** in priority order
6. **Integrate maps** (OpenStreetMap)
7. **Implement SEO** (schema, meta tags)
8. **Polish & test** (responsive, performance)
9. **Document** (for backend integration)

---

**Ready to begin development?** This plan provides a comprehensive roadmap for building a world-class gym directory that's optimized for rankings and ready for backend integration.

