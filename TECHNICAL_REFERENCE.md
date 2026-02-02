# Technical Reference — Quick Guide

## 🛠️ Tech Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 14+ (App Router) | SSR, SEO, routing |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Rapid UI development |
| Maps | Leaflet.js + OpenStreetMap | Interactive maps (no Google) |
| Icons | Lucide React | Modern icon set |
| Animations | Framer Motion | Smooth transitions |
| SEO | next-seo / Metadata API | SEO optimization |

---

## 📐 Data Models

### City
```typescript
interface City {
  id: string;
  name: string;           // "Limassol"
  slug: string;           // "limassol"
  description: string;    // SEO-rich description
  gymCount: number;
  coordinates: [number, number]; // [lat, lng]
  heroImage: string;      // Path to image
  specialties: string[];  // Popular specialties in city
}
```

### Gym
```typescript
interface Gym {
  id: string;
  name: string;
  slug: string;           // "powerhouse-gym-limassol"
  cityId: string;
  address: string;
  coordinates: [number, number];
  phone?: string;
  website?: string;
  email?: string;
  specialties: string[];  // ["CrossFit", "Bodybuilding"]
  amenities: string[];    // ["Parking", "Showers", "24/7"]
  rating: number;         // 0-5
  reviewCount: number;
  featured: boolean;
  description: string;    // SEO-rich, detailed
  images: string[];       // Array of image paths
  openingHours: {
    monday?: string;
    tuesday?: string;
    // ... etc
  };
  memberCount?: number;
  yearsInBusiness?: number;
  ownerId?: string;       // For dashboard access
  createdAt: string;
  updatedAt: string;
}
```

### Review
```typescript
interface Review {
  id: string;
  gymId: string;
  source: 'google' | 'local';
  reviewerName: string;
  rating: number;         // 1-5
  text: string;           // Review text
  date: string;           // ISO date
  verified: boolean;      // Verified purchase/review
  helpful?: number;       // Helpful votes
}
```

### Specialty
```typescript
interface Specialty {
  id: string;
  name: string;           // "CrossFit"
  slug: string;           // "crossfit"
  description: string;    // SEO description
  icon: string;           // Icon name/component
  gymCount: number;       // Total across Cyprus
  relatedSpecialties: string[]; // Related specialty IDs
}
```

---

## 🎨 Design Tokens

### Colors
```typescript
const colors = {
  primary: {
    blue: '#00D9FF',
    purple: '#6C5CE7',
  },
  secondary: {
    green: '#00FF88',
    coral: '#FF6B6B',
  },
  background: {
    dark: '#0A0E27',
    darkGray: '#1A1F3A',
  },
  surface: {
    card: '#252B42',
    lighter: '#2D3447',
  },
  text: {
    white: '#FFFFFF',
    light: '#E0E0E0',
    muted: '#9CA3AF',
  },
  accent: {
    gold: '#FFD700',      // Featured badges
  },
};
```

### Typography Scale
- Hero: 72px / 80px (desktop), 48px / 56px (mobile)
- H1: 48px / 56px
- H2: 36px / 44px
- H3: 24px / 32px
- H4: 20px / 28px
- Body: 16px / 24px
- Small: 14px / 20px

---

## 🗺️ Map Configuration

### OpenStreetMap Setup
```typescript
// Map center for Cyprus
const CYPRUS_CENTER: [number, number] = [35.1264, 33.4299];
const DEFAULT_ZOOM = 8;

// City zoom levels
const CITY_ZOOM = 12;
const GYM_ZOOM = 15;
```

### Marker Styles
- **Standard Gym**: Blue pin
- **Featured Gym**: Gold pin with star
- **Cluster**: Grouped markers with count

---

## 🔍 SEO Schema Examples

### LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Powerhouse Gym Limassol",
  "image": "https://gymnearme.cy/images/gyms/...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Limassol",
    "addressCountry": "CY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 34.7071,
    "longitude": 33.0226
  },
  "url": "https://gymnearme.cy/gyms/powerhouse-gym-limassol",
  "telephone": "+357-XX-XXXXXX",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "127"
  }
}
```

### BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://gymnearme.cy"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Limassol",
      "item": "https://gymnearme.cy/cities/limassol"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Powerhouse Gym",
      "item": "https://gymnearme.cy/gyms/powerhouse-gym-limassol"
    }
  ]
}
```

---

## 📁 File Organization Principles

### Component Structure
- **Layout**: Header, Footer, Navigation (shared across pages)
- **Home**: Homepage-specific components
- **Gym**: Gym-related components (reusable)
- **City**: City page components
- **Shared**: Reusable UI components (Button, Card, Badge, etc.)

### Data Access Pattern
```typescript
// lib/data/index.ts - Centralized data access
export const getGymBySlug = (slug: string): Gym | undefined => { ... }
export const getGymsByCity = (cityId: string): Gym[] => { ... }
export const getTopReviews = (gymId: string, limit: number = 5): Review[] => { ... }
```

### Future API Route Structure
```
/api/gyms/[id]          → GET gym details
/api/gyms               → GET all gyms (with filters)
/api/cities/[city]      → GET city with gyms
/api/specialties/[slug] → GET specialty with gyms
/api/reviews/[gymId]    → GET reviews for gym
```

---

## 🎯 Key Implementation Notes

### Featured Listings
- **Visual**: Gold badge, larger cards, priority placement
- **Logic**: `featured: true` flag in gym data
- **Sorting**: Featured first, then by rating/name

### Review Display Strategy
- **Show**: Top 3-5 reviews only (highest rated, most recent)
- **Source**: Mock Google Maps reviews for MVP
- **Future**: Local review system + Google integration

### Internal Linking Strategy
- **City Pages**: Link to all gyms, specialties in city
- **Gym Pages**: Link back to city, related specialties, related gyms
- **Specialty Pages**: Link to cities with that specialty, all gyms
- **Home**: Link to all major cities, all specialties

### Mobile-First Approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Touch-friendly: Minimum 44px touch targets
- Navigation: Hamburger menu on mobile, full nav on desktop

---

## 🚀 Performance Targets

- **Lighthouse Score**: 90+ (all categories)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Image Optimization**: WebP format, lazy loading
- **Code Splitting**: Route-based, component-based

---

## 🔐 Security Considerations (Future)

- **Input Validation**: All forms sanitized
- **Rate Limiting**: API endpoints protected
- **CORS**: Properly configured
- **XSS Prevention**: React's built-in escaping
- **CSRF**: Token-based protection for forms

---

## 📊 Analytics Preparation (Future)

- **Page Views**: Track all page visits
- **Gym Clicks**: Track gym detail page views
- **Owner Actions**: Track "Add Gym" submissions
- **Featured Upgrades**: Track pricing page visits
- **Search Queries**: Track search usage

---

## 🧪 Testing Strategy (Future)

- **Unit Tests**: Utility functions, data helpers
- **Component Tests**: React components with Jest/React Testing Library
- **E2E Tests**: Critical user flows (search, view gym, add gym)
- **SEO Tests**: Schema validation, meta tag verification

---

## 📦 Dependencies (Planned)

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "lucide-react": "^0.294.0",
    "framer-motion": "^10.16.0",
    "next-seo": "^6.4.0"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.8",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

## ✅ Checklist Before Backend Integration

- [ ] All mock data in TypeScript/JSON files
- [ ] Type definitions match database schema
- [ ] API route placeholders created
- [ ] Data access functions abstracted
- [ ] Image upload structure planned
- [ ] Authentication flow designed
- [ ] Owner dashboard structure ready
- [ ] Review system architecture planned

---

**This document serves as a quick reference during development. Refer to PROJECT.md and PRODUCT_ROADMAP.md for current specifications.**

