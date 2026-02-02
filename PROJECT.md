# Product Requirements Document (PRD)
## GymNearMe Cyprus - Online Gym Directory

**Version:** 1.1  
**Last Updated:** February 2026  
**Status:** Active Development  
**Document Owner:** Project Team

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Vision & Mission](#project-vision--mission)
3. [Target Audience](#target-audience)
4. [Business Model & Revenue Strategy](#business-model--revenue-strategy)
5. [Core Features & Functionality](#core-features--functionality)
6. [Technical Architecture](#technical-architecture)
7. [Data Model & Database](#data-model--database)
8. [SEO Strategy](#seo-strategy)
9. [User Experience & Design](#user-experience--design)
10. [Development Roadmap](#development-roadmap)
11. [Success Metrics & KPIs](#success-metrics--kpis)
12. [Governance & Decision-Making Principles](#governance--decision-making-principles)

---

## 1. Executive Summary

### 1.1 Project Overview

**GymNearMe Cyprus** is a high-credibility, visually stunning online directory for fitness centers, gyms, and health clubs across Cyprus. The platform serves as the definitive resource for individuals seeking gym facilities and provides gym owners with a powerful marketing and discovery tool.

### 1.2 Key Objectives

- **Primary Goal:** Achieve Google Page 1 rankings for high-volume fitness-related search queries in Cyprus
- **User Goal:** Help users find the perfect gym based on location, specialty, amenities, and preferences
- **Business Goal:** Build a sustainable revenue model through featured listings and premium services
- **Data Goal:** Maintain high data quality and credibility through owner-verified information

### 1.3 Current Status

- **Phase:** Production-Ready MVP
- **Database:** 198 gyms across 6 cities (Limassol, Nicosia, Larnaca, Paphos, Ayia Napa, Paralimni) — counts are dynamic from the database
- **Frontend:** Fully functional with Supabase backend integration
- **SEO:** Comprehensive schema markup, FAQ sections, keyword optimization
- **Revenue Model:** Free listings + Featured subscription tiers (Monthly €49, Yearly €490, Lifetime €999)

---

## 2. Project Vision & Mission

### 2.1 Vision Statement

To become the most trusted and comprehensive gym directory in Cyprus, connecting fitness enthusiasts with the perfect gym while empowering gym owners to grow their businesses.

### 2.2 Mission Statement

Provide a user-friendly, SEO-optimized platform that:
- Makes finding the right gym effortless for users
- Offers transparent, value-driven marketing opportunities for gym owners
- Maintains the highest standards of data accuracy and credibility
- Continuously improves through user feedback and data-driven decisions

### 2.3 Core Values

1. **Trust Over Quantity** - Only display verified, owner-provided data
2. **Data Richness** - Comprehensive listings with detailed information
3. **SEO-First** - Optimize for search engine visibility and user discovery
4. **Owner-Centric** - Clear value proposition and monetization paths
5. **Scalable Architecture** - Build for growth and future expansion

---

## 3. Target Audience

### 3.1 Primary Users

#### 3.1.1 Fitness Seekers
- **Demographics:** Adults aged 18-65, living in or visiting Cyprus
- **Needs:**
  - Find gyms near their location
  - Compare gyms by specialty, amenities, and pricing
  - Read reviews and ratings
  - View opening hours and contact information
  - Get directions to gym locations
- **Search Behavior:** "gym near me", "best gym [city]", "[specialty] gym Cyprus"
- **Device Usage:** Mobile-first (60%+ mobile traffic expected)

#### 3.1.2 Gym Owners
- **Demographics:** Gym owners, managers, marketing staff
- **Needs:**
  - Increase gym visibility and discoverability
  - Attract new members
  - Manage their listing information
  - Track listing performance
  - Upgrade to featured listings for premium placement
- **Pain Points:** Limited online visibility, difficulty reaching local customers

### 3.2 Secondary Users

- **Tourists/Visitors:** Temporary residents seeking temporary gym access
- **Fitness Professionals:** Personal trainers, instructors looking for facilities
- **Real Estate Agents:** Seeking gym amenities for property listings

---

## 4. Business Model & Revenue Strategy

### 4.1 Freemium Model

The platform operates on a **freemium model** with free basic listings and premium featured listings.

### 4.2 Pricing Tiers

#### 4.2.1 Free Tier (€0)
**Target:** All gym owners (entry point)

**Features:**
- Basic gym listing with name, address, contact info
- Location on interactive map
- Up to 3 photos
- Basic amenities list
- Standard placement in search results
- Opening hours display
- Reviews and ratings display

**Limitations:**
- Standard placement (not prioritized)
- Limited photo uploads (3 max)
- Basic description
- No analytics dashboard
- No featured badge

#### 4.2.2 Featured Monthly (€49/month)
**Target:** Active gyms seeking ongoing visibility

**Features:**
- Everything in Free tier
- **Featured badge** (gold badge, priority visibility)
- **Priority placement** (appears first in search results)
- Up to 10 photos
- Enhanced description with rich formatting
- Analytics dashboard (views, clicks, inquiries)
- Email support
- Cancel anytime (no contracts)

**Value Proposition:** 5x more visibility than standard listings

#### 4.2.3 Featured Yearly (€490/year)
**Target:** Established gyms seeking long-term visibility

**Features:**
- Everything in Monthly tier
- **2 months free** (17% savings vs. monthly)
- Priority support
- Custom listing design options
- Social media promotion
- Monthly performance reports

**Value Proposition:** Best value for committed gyms

#### 4.2.4 Featured Lifetime (€999 one-time)
**Target:** Long-term established gyms

**Features:**
- Everything in Yearly tier
- **Lifetime featured status** (never pay again)
- Unlimited photos
- Premium support
- Exclusive placement opportunities
- Future feature access

**Value Proposition:** Pay once, featured forever

### 4.3 Revenue Projections

**Assumptions:**
- 198 gyms in database (all unclaimed initially; ready for owner claims)
- Target: 10% conversion to featured listings within 6 months (~20 gyms)
- Mix: 60% Monthly, 30% Yearly, 10% Lifetime

**6-Month Projection:**
- Monthly subscribers: 12 × €49 = €588/month
- Yearly subscribers: 6 × €490/12 = €245/month
- Lifetime: 2 × €999 (one-time) = €1,998
- **Monthly Recurring Revenue (MRR):** ~€833/month
- **Total 6-Month Revenue:** ~€6,990

### 4.4 Monetization Strategy

1. **Free Listings as Lead Generation:** Free tier attracts gym owners, creates database
2. **Upgrade Prompts:** Strategic CTAs throughout platform encouraging upgrades
3. **Urgency Elements:** "Limited slots available" messaging (e.g., "2 slots left in Limassol")
4. **Value Demonstration:** Analytics dashboard shows ROI for featured listings
5. **Owner Claim System:** Unclaimed listings show "Claim your gym" CTAs

### 4.5 Future Revenue Opportunities

- **Premium Add-ons:** Photo uploads beyond limit, enhanced descriptions
- **Advertising:** Banner ads for fitness-related businesses
- **Partnerships:** Affiliate commissions from gym memberships
- **Data Licensing:** Aggregated, anonymized data for market research
- **White-Label Solutions:** License platform to other regions/industries

---

## 5. Core Features & Functionality

### 5.1 User-Facing Features

#### 5.1.1 Homepage
- **Hero Section:** Search bar with "Find Gyms Near Me" focus
- **City Cards:** Visual grid of 6 cities with gym counts
- **Specialty Cards:** Grid of 9 fitness specialties
- **Trust Signals:** "198 Gyms Listed", "Verified Listings"
- **Content Sections:**
  - "Find Gyms Near Me in Cyprus"
  - "24 Hour Gyms Near Me"
  - "Benefits" section
  - "Complete Guide" section
  - FAQ section (visible + schema markup)

#### 5.1.2 City Pages (`/cities/[city]`)
- **Dynamic Routing:** One page per city (6 cities total)
- **Features:**
  - City hero with description
  - Interactive map with all gyms (clustered markers)
  - Gym listings with filtering and sorting
  - Filter by: Specialty, Rating, Amenities
  - Sort by: Rating, Name, Featured
  - "Best Gyms in [City]" content section
  - FAQ section targeting city-specific queries
- **SEO:** Optimized for "gym [city]" keywords (2,400-1,000 monthly searches per city)

#### 5.1.3 Gym Detail Pages (`/gyms/[slug]`)
- **Comprehensive Information:**
  - Hero section with photo gallery
  - Gym name, rating, review count
  - Featured badge (if applicable)
  - Location (address, city, map)
  - Quick actions: Call, Directions, Website, Social Media
- **Key Stats Bar:** Rating, Reviews, Member Count (if verified), Years in Business
- **About Section:** Detailed description (150-300 words, SEO-optimized)
- **Opening Hours:** Real-time "Open Now" / "Closed" status (Cyprus timezone)
- **Specialties & Amenities:** Sorted by priority order
- **Top Reviews:** 3-5 reviews (Google Maps or local)
- **Map Section:** Interactive OpenStreetMap with gym location
- **Related Gyms Section:** Dynamic specialty-based related gyms
  - Shows "Other [Specialty] in [City]" based on gym's primary specialty
  - Examples: "Other CrossFit Gyms in Nicosia", "Other Yoga & Pilates Studios in Larnaca", "Other Martial Arts & MMA Gyms in Paphos"
  - Handles gyms with multiple specialties by prioritizing primary specialty
  - Falls back to "Other Gyms in [City]" if no specialty matches found
  - Special formatting for specific specialties (adds "Gyms" or "Studios" as appropriate)
- **Owner CTA:** "Claim This Listing" for unclaimed gyms

#### 5.1.4 Specialty Pages (`/specialties/[specialty]`)
- **9 Specialties:**
  1. Fitness/Gym (consolidated)
  2. CrossFit
  3. Personal Training
  4. Martial Arts & MMA
  5. Boxing
  6. Yoga & Pilates
  7. Dance & Group Fitness
  8. Strength Training
  9. Swimming & Aquatics
- **Features:**
  - Specialty description
  - Gyms grouped by city
  - Map with all specialty gyms
  - Related specialties
  - FAQ section
- **SEO:** Optimized for specialty keywords (e.g., "pilates near me" - 880 monthly searches)

#### 5.1.5 Search Functionality
- **Smart Search:** Search by city name or gym name
- **Priority Logic:**
  - City names take priority over gym names
  - Exact matches prioritized over partial matches
  - Redirects to gym page for gym matches
  - Redirects to city page for city matches
- **Search Bar:** Prominent on homepage and all pages

#### 5.1.6 Filtering & Sorting
- **Filters:**
  - By Specialty (multi-select)
  - By Rating (minimum rating)
  - By Amenities (multi-select)
  - By Featured Status
- **Sorting:**
  - By Rating (highest first)
  - By Name (A-Z)
  - By Featured (featured first)
  - By Review Count

### 5.2 Owner-Facing Features

#### 5.2.1 Add Gym Form (`/add-gym`)
- **Single-Page Form:**
  - Basic Information: Name, City, Address
  - Details: Specialties, Amenities, Opening Hours
  - Contact: Phone, Email, Website, Social Media
  - Photos: Upload up to 3 (free) or 10 (featured)
  - Pricing: Optional pricing information
- **"How It Works" Section:** Explains submission process
- **Upgrade Prompts:** CTAs to featured listings

#### 5.2.2 Owner Dashboard (`/dashboard`)
- **Overview Metrics:**
  - Listing views
  - Profile clicks
  - Contact inquiries
  - Current plan status
- **Gym Management:**
  - Edit listing information
  - Upload/manage photos
  - Update opening hours
  - Manage amenities and specialties
  - Update pricing information
  - Member count management (optional, owner-verified only)
- **Upgrade Prompts:** CTAs to featured listings with benefits
- **Analytics Dashboard:** (Featured listings only)
  - Views over time
  - Click-through rates
  - Inquiry sources

#### 5.2.3 Claim System
- **Unclaimed Listings:** All 198 gyms in the directory are unclaimed initially; show "Claim Your Gym" CTAs on each gym page. (See §7.2 Current Data Status for database counts.)
- **Claim Process:**
  1. Owner verifies identity
  2. Claims listing
  3. Gains edit access
  4. Can upgrade to featured
- **Benefits of Claiming:**
  - Edit listing information
  - Add photos
  - Update member count (optional, verified)
  - Respond to reviews
  - Access analytics (if featured)

### 5.3 Technical Features

#### 5.3.1 Map Integration
- **Technology:** Leaflet.js with OpenStreetMap (no Google Maps)
- **Features:**
  - Interactive maps on city and gym pages
  - Custom markers for featured gyms (gold)
  - Standard markers for regular gyms (blue)
  - Clustering for city pages with many gyms
  - Clickable pins with gym previews
  - Directions links to OpenStreetMap routing

#### 5.3.2 Opening Hours System
- **Format:** Standardized HH:MM-HH:MM (24-hour format)
- **Features:**
  - All 7 days (Monday-Sunday) required
  - Support for multiple time ranges per day (e.g., "06:30-11:00, 15:30-20:30")
  - Real-time "Open Now" / "Closed" status using Cyprus timezone (Europe/Nicosia)
  - Current day highlighting (bold text with tinted background)
  - Handles hyphens (-) and em dashes (—)
  - "Contact for opening hour details" option

#### 5.3.3 Social Media Integration
- **Automatic Detection:**
  - Facebook URLs in website field → Facebook icon + "Visit Facebook"
  - Instagram URLs in website field → Instagram icon + "Visit Instagram"
  - Regular websites → Globe icon + "Visit Website"
- **Separate Fields:** Database supports separate website, Facebook, Instagram fields
- **Display:** Quick actions and contact sections

#### 5.3.4 Review System
- **Current:** Display top 3-5 reviews per gym
- **Sources:** Google Maps reviews (scraped/imported) or local reviews
- **Future:** Local review system with owner responses

#### 5.3.5 Dynamic Related Gyms System
- **Specialty-Based Display:** Related gyms section dynamically shows gyms of the same specialty in the same city
- **Primary Specialty Selection:** For gyms with multiple specialties, system prioritizes primary specialty using predefined logic
  - Priority order: Fitness/Gym → Yoga & Pilates → Martial Arts & MMA → Strength Training → Swimming & Aquatics → Dance & Group Fitness → First specialty in list
- **Heading Formatting:** Special formatting for different specialties
  - "Other CrossFit Gyms in [City]"
  - "Other Yoga & Pilates Studios in [City]"
  - "Other Boxing Gyms in [City]"
  - "Other Martial Arts & MMA Gyms in [City]"
  - "Other Fitness/Gyms in [City]"
  - Generic: "Other [Specialty] in [City]"
- **Fallback Logic:** If no specialty matches found, shows general city gyms with "Other Gyms in [City]" heading
- **Implementation:** Utility functions in `lib/utils/specialty-heading.ts` and API function `getGymsBySpecialtyAndCityFromDB` in `lib/api/gyms.ts`

---

## 6. Technical Architecture

### 6.1 Technology Stack

#### 6.1.1 Frontend
- **Framework:** Next.js 14+ (App Router)
  - Server-side rendering (SSR) for SEO
  - Static site generation (SSG) where possible
  - Dynamic routing for cities, gyms, specialties
- **Language:** TypeScript (type safety)
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** React components with Lucide React icons
- **Animations:** Framer Motion for smooth transitions
- **Maps:** Leaflet.js + React-Leaflet (OpenStreetMap)

#### 6.1.2 Backend
- **Database:** Supabase (PostgreSQL)
- **API:** Supabase REST API + TypeScript client
- **Authentication:** Supabase Auth (for owner accounts)
- **File Storage:** Supabase Storage (for gym photos)

#### 6.1.3 Data Processing
- **Language:** Python
- **Libraries:** pandas, geopy, fuzzywuzzy
- **Scripts:** Data cleaning, enrichment, import automation

### 6.2 Project Structure

```
new-gym/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with SEO schemas
│   ├── cities/            # City pages
│   ├── gyms/              # Gym detail pages
│   ├── specialties/       # Specialty pages
│   ├── pricing/           # Pricing page
│   ├── add-gym/           # Add gym form
│   ├── advertise-with-us/ # Advertise page
│   ├── dashboard/         # Owner dashboard
│   ├── sitemap.ts         # Auto-generated sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── layout/           # Header, Footer, Navigation
│   ├── shared/           # Reusable UI components
│   ├── home/             # Homepage components
│   ├── gym/              # Gym-related components
│   └── city/             # City page components
├── lib/                  # Utilities and data access
│   ├── data/             # Data access layer (Supabase)
│   ├── api/              # API integration
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── data/                 # Data processing
│   ├── raw/              # Raw scraped data
│   └── clean/            # Cleaned data ready for import
├── scripts/              # Data processing scripts
└── supabase/             # Database migrations
```

### 6.3 Data Access Pattern

**Unified Data Layer:**
- Centralized data access functions in `lib/data/`
- Supabase client integration
- Fallback to mock data during development
- Type-safe interfaces for all data models

### 6.4 Performance Targets

- **Lighthouse Score:** 90+ (all categories)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Image Optimization:** WebP format, lazy loading via next/image
- **Code Splitting:** Route-based and component-based

---

## 7. Data Model & Database

### 7.1 Database Schema (Supabase PostgreSQL)

#### 7.1.1 Core Tables

**Cities**
- `id` (UUID, primary key)
- `name` (text)
- `slug` (text, unique)
- `description` (text, SEO-rich)
- `latitude` (numeric)
- `longitude` (numeric)
- `hero_image` (text, URL)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Gyms**
- `id` (UUID, primary key)
- `name` (text)
- `slug` (text, unique)
- `city_id` (UUID, foreign key → cities)
- `address` (text)
- `latitude` (numeric)
- `longitude` (numeric)
- `phone` (text, nullable)
- `email` (text, nullable)
- `website` (text, nullable)
- `social_media` (jsonb) - {website, facebook, instagram}
- `rating` (numeric(3,2), 0-5)
- `review_count` (integer, default 0)
- `featured` (boolean, default false)
- `description` (text, SEO-rich, 150-300 words)
- `opening_hours` (jsonb) - {monday, tuesday, ..., sunday}
- `pricing` (jsonb) - Structured pricing plans
- `years_in_business` (integer, nullable)
- `owner_id` (UUID, nullable, foreign key → gym_owners)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Specialties**
- `id` (UUID, primary key)
- `name` (text)
- `slug` (text, unique)
- `description` (text, SEO-rich)
- `icon` (text)
- `created_at` (timestamptz)

**Amenities**
- `id` (UUID, primary key)
- `name` (text)
- `slug` (text, unique)
- `icon` (text, nullable)
- `created_at` (timestamptz)

**Junction Tables**
- `gym_specialties` (gym_id, specialty_id)
- `gym_amenities` (gym_id, amenity_id)

**Reviews**
- `id` (UUID, primary key)
- `gym_id` (UUID, foreign key → gyms)
- `source` (text, enum: 'google', 'local', 'internal')
- `reviewer_name` (text)
- `rating` (integer, 1-5)
- `text` (text)
- `date` (date)
- `verified` (boolean, default false)
- `helpful` (integer, default 0)
- `created_at` (timestamptz)

**Gym Images**
- `id` (UUID, primary key)
- `gym_id` (UUID, foreign key → gyms)
- `url` (text)
- `alt_text` (text, nullable)
- `order` (integer)
- `created_at` (timestamptz)

**Gym Owners**
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key → user_profiles)
- `gym_id` (UUID, foreign key → gyms)
- `plan` (text, enum: 'free', 'featured-monthly', 'featured-yearly', 'featured-lifetime')
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Featured Listings**
- `id` (UUID, primary key)
- `gym_id` (UUID, foreign key → gyms)
- `plan` (text)
- `start_date` (date)
- `end_date` (date, nullable for lifetime)
- `status` (text, enum: 'active', 'expired', 'cancelled')
- `created_at` (timestamptz)

### 7.2 Current Data Status

- **Total Gyms:** 198 gyms across 6 cities (counts loaded dynamically from database)
  - Limassol, Nicosia, Larnaca, Paphos, Ayia Napa, Paralimni (Protaras gyms merged into Paralimni)
  - Per-city counts are calculated at runtime from the database
- **Featured Gyms:** 0 (all unclaimed; ready for gym owner claim feature)
- **Specialties:** 9 consolidated specialties
- **Data Source:** All gyms scraped from Google Maps
- **Data Quality:** Ongoing enrichment (opening hours, social media, amenities, pricing, review counts, specialty assignments)
  - **Recent Updates (January 2026):**
    - Review counts updated for 30+ gyms (Gabriel Fitness & Boxing Gym: 73, FUELHOUSE Boutique Fitness Club: 115, Forma Personal Training Studio Gym Paphos: 85, Global Vale Tudo Combat Sports Academy: 27, and more)
    - Gym names standardized (e.g., FORTIUS BOXING ACADEMY, FUELHOUSE Boutique Fitness Club, EUROGYM)
    - Specialty assignments refined (removed Fitness/Gym from MMA gyms, removed Strength Training from specific gyms, added Swimming & Aquatics to FiveStar SportCenter)
    - Social media links added/updated (Fortius Boxing Academy, FUELHOUSE Boutique Fitness Club)
    - Email addresses added (Gabriel Fitness & Boxing Gym, Energea Fitness Studio)
    - Amenities added (Swimming Pool to FiveStar SportCenter Larnaca)

### 7.3 Data Quality Principles

1. **Trust Over Quantity:** Only display verified, owner-provided data
2. **No Scraped Member Counts:** Never guess or scrape member counts
3. **Standardized Formats:** Opening hours, pricing, contact info in consistent formats
4. **SEO-Rich Descriptions:** 150-300 words per gym, keyword-optimized
5. **Regular Updates:** Encourage owners to keep information current

---

## 8. SEO Strategy

### 8.1 Target Keywords

**Primary Keywords (Tier 1):**
- "gym near me" - 9,900 monthly searches (homepage)
- "gym limassol" - 2,400 monthly searches (city page)
- "gym nicosia" - 1,600 monthly searches (city page)
- "gym larnaca" - 1,300 monthly searches (city page)
- "gym paphos" - 1,000 monthly searches (city page)
- "swimming pool nicosia" - 1,000 monthly searches (specialty page)
- "pilates near me" - 880 monthly searches (specialty page)

**Total Potential:** ~20,700+ monthly searches across 30 target keywords

### 8.2 On-Page SEO

#### 8.2.1 Meta Tags
- **Unique Titles:** Keyword-rich, 50-60 characters
- **Descriptions:** Compelling, 150-160 characters, include primary keyword
- **Open Graph:** Social sharing optimization
- **Twitter Cards:** Twitter sharing optimization

#### 8.2.2 Schema.org Markup
- **LocalBusiness:** Every gym page (name, address, phone, rating, opening hours)
- **AggregateRating:** Star ratings and review counts
- **BreadcrumbList:** Navigation hierarchy
- **Organization:** Site-wide organization info
- **WebSite:** Search action schema
- **CollectionPage:** City and specialty pages
- **FAQPage:** Homepage, city pages, specialty pages (targeting "People Also Ask")

#### 8.2.3 Content Strategy
- **Homepage:** "Find Gyms Near Me", "24 Hour Gyms", "Benefits" sections
- **City Pages:** "Best Gyms in [City]" content, FAQ sections
- **Specialty Pages:** Specialty-focused content, FAQ sections
- **Gym Pages:** 150-300 word descriptions, keyword-rich

### 8.3 Technical SEO

- **Sitemap:** Auto-generated sitemap.xml
- **Robots.txt:** Proper search engine configuration
- **Internal Linking:** Comprehensive linking between pages
- **Image Optimization:** Alt text, descriptive filenames, WebP format
- **Mobile-First:** Responsive design, fast mobile performance
- **URL Structure:** Clean, keyword-rich slugs (e.g., `/gyms/powerhouse-gym-limassol`)

### 8.4 SERP Features Targeting

1. **Local Pack:** Optimize for Google Business Profile integration
2. **People Also Ask:** FAQ sections with FAQPage schema
3. **Reviews:** AggregateRating schema, prominent review display
4. **Image Pack:** Optimized images with alt text
5. **Featured Snippets:** Structured content, clear answers

---

## 9. User Experience & Design

### 9.1 Design System

#### 9.1.1 Color Palette
- **Primary:** Electric Blue (#00D9FF), Deep Purple (#6C5CE7)
- **Secondary:** Neon Green (#00FF88), Coral (#FF6B6B)
- **Background:** Dark (#0A0E27), Dark Gray (#1A1F3A)
- **Surface:** Card (#252B42), Lighter (#2D3447)
- **Text:** White (#FFFFFF), Light (#E0E0E0), Muted (#9CA3AF)
- **Accent:** Gold (#FFD700) for featured items

#### 9.1.2 Typography
- **Sans:** Inter (body text)
- **Display:** Poppins (headings)

#### 9.1.3 Components
- Card-based design with rounded corners
- Hover effects and smooth transitions
- Gradient buttons with glow shadows
- Responsive grid layouts
- Badge components (Featured, Specialty, Rating)

### 9.2 User Experience Principles

1. **Mobile-First:** 60%+ traffic expected on mobile
2. **Fast Loading:** < 1.5s First Contentful Paint
3. **Clear Navigation:** Intuitive menu, breadcrumbs, search
4. **Trust Signals:** Verified badges, review counts, owner-provided data
5. **Action-Oriented:** Clear CTAs, easy contact methods
6. **Accessibility:** Semantic HTML, keyboard navigation, screen reader support

### 9.3 Responsive Design

- **Breakpoints:**
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **Touch Targets:** Minimum 44px for mobile
- **Navigation:** Hamburger menu on mobile, full nav on desktop

---

## 10. Development Roadmap

### 10.1 Completed Phases ✅

#### Phase 1: Foundation
- ✅ Next.js project setup with TypeScript
- ✅ Tailwind CSS configuration
- ✅ Basic layout components
- ✅ Type definitions for all data models
- ✅ Mock data structure setup

#### Phase 2: Core Pages
- ✅ Homepage with search, city cards, specialties
- ✅ City pages with dynamic routing
- ✅ Gym detail pages
- ✅ Specialty pages
- ✅ All cities and specialties listing pages

#### Phase 3: Advanced Features
- ✅ OpenStreetMap integration
- ✅ Review system display
- ✅ Featured listings badges
- ✅ Search functionality
- ✅ Filtering & sorting
- ✅ Opening hours system with real-time status
- ✅ Social media integration
- ✅ Specialty system consolidation

#### Phase 4: Owner Experience
- ✅ Add gym form
- ✅ Owner dashboard (mock)
- ✅ Pricing page
- ✅ Advertise with us page

#### Phase 5: SEO & Polish
- ✅ Schema.org JSON-LD markup (LocalBusiness, BreadcrumbList, Organization, WebSite, CollectionPage, FAQPage)
- ✅ Enhanced meta tags
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Internal linking strategy
- ✅ Image optimization
- ✅ Homepage SEO optimization
- ✅ City pages SEO
- ✅ Specialty pages SEO

#### Phase 6: Backend Integration
- ✅ Supabase database setup
- ✅ 198 gyms in database (all cities)
- ✅ Frontend connected to Supabase API
- ✅ Dynamic counts from database
- ✅ Data enrichment (opening hours, social media, amenities, pricing)
- ✅ Dynamic related gyms system (specialty-based related gyms display)
- ✅ Recent data updates (January 2026):
  - Review counts updated for 30+ gyms
  - Gym names standardized (FORTIUS BOXING ACADEMY, FUELHOUSE Boutique Fitness Club, EUROGYM, EPlarkou Pilates, Energea Fitness Studio - EMS Training & Pilates Reformer)
  - Specialty assignments refined (removed Fitness/Gym from MMA/Boxing gyms, removed Strength Training from specific gyms, added Swimming & Aquatics)
  - Social media links added/updated (Fortius Boxing Academy, FUELHOUSE Boutique Fitness Club)
  - Email addresses added (Gabriel Fitness & Boxing Gym, Energea Fitness Studio)
  - Amenities added (Swimming Pool to FiveStar SportCenter Larnaca)
  - Opening hours updated (Demari Wellness And Spa Paralimni)
  - Postal codes added (Demari Wellness And Spa Paralimni)

### 10.2 Current Phase: Production Optimization

#### Immediate Priorities
1. **Internal Linking Optimization**
   - Audit all pages for internal links
   - Add "Best Gyms in [City]" links
   - Add "Best [Specialty] Gyms" links
   - Create hub pages

2. **Owner Claim System**
   - Implement claim workflow
   - Owner authentication
   - Claim status badges
   - Upgrade prompts for unclaimed listings

3. **Analytics Integration**
   - Google Analytics 4 setup
   - Conversion tracking
   - Search Console setup
   - Performance monitoring

4. **Data Quality Improvements**
   - Continue data enrichment
   - Verify opening hours
   - Add more pricing information
   - Update review counts

### 10.3 Future Phases

#### Phase 7: Advanced Features
- [ ] User authentication system
- [ ] Real review system (local reviews + owner responses)
- [ ] Advanced search filters
- [ ] Comparison tool
- [ ] User favorites/bookmarks
- [ ] Email notifications

#### Phase 8: Content & Marketing
- [ ] Blog section for SEO content
- [ ] Gym comparison guides
- [ ] Owner interviews
- [ ] Local fitness tips
- [ ] News and updates

#### Phase 9: Expansion
- [ ] Neighborhood pages (Strovolos, Engomi, etc.)
- [ ] Additional cities/regions
- [ ] Multi-language support (Greek, Turkish)
- [ ] Mobile app (future consideration)

---

## 11. Success Metrics & KPIs

### 11.1 User Metrics

#### Traffic Metrics
- **Monthly Organic Visitors:** Target 1,000+ within 3 months
- **Page Views:** Track per page type (homepage, city, gym, specialty)
- **Bounce Rate:** Target < 50%
- **Average Session Duration:** Target > 2 minutes
- **Pages per Session:** Target > 2.5

#### Engagement Metrics
- **Gym Detail Page Views:** Track which gyms are most viewed
- **Search Usage:** Track search queries
- **Filter Usage:** Track which filters are most used
- **Map Interactions:** Track map clicks and interactions
- **Contact Clicks:** Track phone, email, website clicks

### 11.2 Business Metrics

#### Revenue Metrics
- **Featured Listings:** Number of paid listings
- **Monthly Recurring Revenue (MRR):** Target ~€833/month within 6 months (based on 198 gyms, 10% conversion)
- **Conversion Rate:** Free → Featured conversion rate (target 10%)
- **Average Revenue Per User (ARPU):** Track per plan type
- **Churn Rate:** Track subscription cancellations

#### Owner Metrics
- **Owner Claims:** Number of gyms claimed by owners
- **Add Gym Submissions:** New gym submissions per month
- **Dashboard Usage:** Owner dashboard engagement
- **Upgrade Conversions:** Free → Featured upgrade rate

### 11.3 SEO Metrics

#### Search Performance
- **Keyword Rankings:** Track top 30 target keywords
- **Top 10 Rankings:** Target 5+ keywords in top 10 within 6 months
- **Top 3 Rankings:** Target 2+ keywords in top 3 within 12 months
- **Search Impressions:** Track in Google Search Console
- **Click-Through Rate (CTR):** Target > 3%

#### Technical SEO
- **Lighthouse Score:** Maintain 90+ across all categories
- **Core Web Vitals:** Pass all metrics
- **Indexed Pages:** Track in Search Console
- **Schema Validation:** Ensure all schema markup is valid

### 11.4 Data Quality Metrics

- **Listing Completeness:** % of gyms with complete information
- **Photo Coverage:** % of gyms with photos
- **Review Coverage:** % of gyms with reviews
- **Opening Hours Coverage:** % of gyms with complete opening hours
- **Owner Verification Rate:** % of gyms claimed by owners

### 11.5 Reporting Frequency

- **Daily:** Traffic, revenue, critical errors
- **Weekly:** SEO rankings, owner claims, user engagement
- **Monthly:** Comprehensive KPI report, trend analysis
- **Quarterly:** Strategic review, roadmap adjustments

---

## 12. Governance & Decision-Making Principles

### 12.1 Core Principles

1. **Trust Over Quantity**
   - Never compromise data quality for quantity
   - Only display verified, owner-provided data
   - Never scrape or guess sensitive information (e.g., member counts)

2. **SEO-First Approach**
   - All features evaluated for SEO impact
   - Content decisions prioritize search visibility
   - Technical decisions consider SEO implications

3. **User-Centric Design**
   - Mobile-first development
   - Fast loading times
   - Clear, intuitive navigation
   - Accessibility compliance

4. **Owner Value Proposition**
   - Clear monetization paths
   - Transparent pricing
   - Demonstrable ROI for featured listings
   - Easy claim and management processes

5. **Scalable Architecture**
   - Modular, maintainable code
   - Type-safe development
   - Database-first approach
   - API-ready structure

### 12.2 Decision-Making Framework

#### Feature Prioritization
1. **Impact:** High user value or business value?
2. **Effort:** Development complexity and time required?
3. **SEO Impact:** Will it improve search rankings?
4. **Revenue Impact:** Will it drive featured listing conversions?
5. **Data Quality:** Does it maintain or improve data credibility?

#### Data Quality Decisions
- **Rule:** When in doubt, leave it blank rather than guess
- **Verification:** Owner-provided data preferred over scraped
- **Transparency:** Always indicate data source (Owner Provided, Verified, Demo Data)

#### Technical Decisions
- **Performance:** Must not degrade Lighthouse scores
- **Maintainability:** Code must be type-safe, well-documented
- **Scalability:** Architecture must support growth
- **SEO:** Must not negatively impact search rankings

### 12.3 Documentation Standards

- **Code Documentation:** JSDoc/TSDoc for all functions
- **Feature Documentation:** Update PROJECT.md for major features
- **API Documentation:** Document all API endpoints
- **Data Documentation:** Document data sources and quality standards

### 12.4 Quality Assurance

- **Code Quality:** Automated audits via `scripts/code_quality_audit.py`
- **Testing:** Cross-browser, mobile responsiveness, SEO validation
- **Performance:** Regular Lighthouse audits
- **Data Quality:** Regular data completeness audits

---

## 13. Appendices

### 13.1 Glossary

- **Featured Listing:** Premium gym listing with priority placement and enhanced features
- **Unclaimed Listing:** Gym listing not yet claimed by owner
- **Owner Claim:** Process by which gym owner verifies and takes control of their listing
- **Specialty:** Type of fitness focus (e.g., CrossFit, Yoga, Boxing)
- **Amenity:** Facility feature (e.g., Parking, Showers, Swimming Pool)
- **SERP:** Search Engine Results Page
- **Schema.org:** Structured data markup for search engines
- **MRR:** Monthly Recurring Revenue

### 13.2 Related Documents

- **README.md** - Project setup and development guide
- **PROJECT_PLAN.md** - Detailed development plan
- **TECHNICAL_REFERENCE.md** - Quick technical reference
- **KEYWORD_STRATEGY.md** - SEO keyword strategy
- **STRATEGIC_ACTION_PLAN.md** - Tactical roadmap

### 13.3 Contact & Support

- **Project Repository:** [Private repository]
- **Documentation:** `/docs` folder
- **Issues:** Track via project management system
- **Questions:** Refer to this document first, then technical documentation

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 2025 | Project Team | Initial PRD creation |
| 1.1 | February 2026 | Project Team | Updated gym count (199 → 198), clarified dynamic counts from database; aligned revenue projections and data status with current basis for gym owner claim feature |

---

**This document serves as the foundation for all project decisions. All team members, project managers, and stakeholders should refer to this document for guidance on features, priorities, and principles.**

**Last Updated:** February 2026  
**Next Review:** Quarterly or upon major feature releases
