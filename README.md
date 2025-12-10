# GymNearMe Cyprus Directory

A high-credibility, visually stunning gym directory for Cyprus SEO optimized for Google Page 1 rankings.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
new-gym/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with SEO schemas
│   ├── cities/            # City pages
│   │   ├── page.tsx       # All cities listing
│   │   └── [city]/        # Dynamic city pages
│   ├── gyms/              # Gym detail pages
│   │   └── [slug]/        # Dynamic gym pages
│   ├── specialties/       # Specialty pages
│   │   ├── page.tsx       # All specialties listing
│   │   └── [specialty]/   # Dynamic specialty pages
│   ├── pricing/           # Pricing page
│   ├── add-gym/           # Add gym form
│   ├── advertise-with-us/ # Advertise page
│   ├── dashboard/         # Owner dashboard (mock)
│   ├── sitemap.ts         # Auto-generated sitemap
│   ├── robots.ts          # Robots.txt configuration
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── layout/            # Header, Footer, Navigation
│   ├── shared/            # Reusable UI components
│   ├── home/              # Homepage components
│   ├── gym/               # Gym-related components
│   └── city/              # City page components
├── lib/
│   ├── data/              # Mock data (ready for backend)
│   ├── api/               # API integration (Supabase)
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
│       ├── opening-hours.ts  # Opening hours parsing and timezone handling
│       ├── schema.ts         # Schema.org JSON-LD generation
│       └── map-icons.ts      # Shared Leaflet map icon definitions
├── data/                  # Data processing
│   ├── raw/               # Raw scraped data (CSV/JSON)
│   └── clean/             # Cleaned data ready for import
├── scripts/               # Data processing scripts
│   ├── code_quality_audit.py  # Automated code quality audit tool (subagent)
│   ├── inspect_raw_data.py
│   ├── gym_data_cleaner.py
│   ├── process_enriched_gyms.py
│   └── [other data processing scripts]
├── docs/                  # Documentation
│   ├── CODEBASE_AUDIT_2025.md      # Comprehensive codebase audit report
│   ├── AUDIT_SUBAGENT_GUIDE.md     # Guide for using the audit tool
│   ├── CODE_QUALITY_TOOL.md        # Audit tool documentation
│   ├── data_mapping.md
│   └── TEST_IMPORT_REPORT.md
└── public/                # Static assets
    └── logo.png           # Site logo
```

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom design system
- **Leaflet.js** - OpenStreetMap integration
- **Lucide React** - Icons
- **next/image** - Image optimization
- **Supabase** - PostgreSQL database backend
- **Python** - Data processing and cleaning scripts (pandas, geopy, fuzzywuzzy)

## 🔍 Code Quality & Auditing

This project includes an automated **Code Quality Audit Subagent** that continuously monitors code quality:

```bash
# Run code quality audit
python scripts/code_quality_audit.py

# Verbose output
python scripts/code_quality_audit.py --verbose
```

The audit tool checks for:
- Code duplication and redundancies
- Missing documentation (JSDoc/TSDoc)
- Potential bugs (async/await issues, etc.)
- Redundant files and scripts

**See:** `docs/AUDIT_SUBAGENT_GUIDE.md` for complete guide.

## ✨ Features Implemented

### Phase 1: Foundation ✅
- [x] Next.js project setup with TypeScript
- [x] Tailwind CSS configuration with custom design system
- [x] Basic layout components (Header, Footer, Navigation)
- [x] Type definitions for all data models
- [x] Mock data structure setup (cities, gyms, reviews, specialties)

### Phase 2: Core Pages ✅
- [x] **Home Page** - Hero section with search, city cards, specialties grid, trust signals
- [x] **City Pages** - Dynamic routing with gym listings, maps, filtering, and sorting
- [x] **Gym Detail Pages** - Comprehensive gym information with reviews, amenities, maps
- [x] **Specialty Pages** - Dynamic routing for different fitness specialties
- [x] **All Cities Page** - Complete listing of all cities
- [x] **All Specialties Page** - Complete listing of all specialties
- [x] Basic styling and full mobile responsiveness

### Phase 3: Advanced Features ✅
- [x] **OpenStreetMap Integration** - Interactive maps using Leaflet.js
  - City pages with gym clusters
  - Individual gym location maps
  - Custom markers for featured gyms
- [x] **Review System** - Display top 3-5 reviews per gym
- [x] **Featured Listings** - Badges and priority placement for featured gyms
- [x] **Search Functionality** - Smart search by city or gym name with intelligent matching
  - City names take priority over gym names
  - Exact matches prioritized over partial matches
  - Redirects to gym page for gym matches, city page for city matches
- [x] **Filtering & Sorting** - Filter by rating, specialty, amenities; sort by rating, name, featured
- [x] **Opening Hours System** - Comprehensive opening hours display and management
  - All gyms have all 7 days (Monday-Sunday) in opening hours
  - Standardized format: HH:MM-HH:MM (24-hour format, always 2 digits)
  - Real-time "Open Now" / "Closed" status badge using Cyprus local timezone (Europe/Nicosia)
  - Support for multiple time ranges per day (e.g., "06:30-11:00, 15:30-20:30")
  - Handles both hyphens (-) and em dashes (—) in opening hours
  - "Contact for opening hour details" option for gyms without available hours
  - Opening hours section always visible - shows "Contact for opening hour details" when all days are "Closed" (consistent with pricing section UX)
- [x] **Social Media Integration** - Facebook and Instagram button detection and display
  - Automatic detection of Facebook URLs in website field
  - Automatic detection of Instagram URLs in website field
  - Facebook icon and "Visit Facebook" text for Facebook links
  - Instagram icon and "Visit Instagram" text for Instagram links
  - "Facebook"/"Instagram" button in quick actions, "Visit Facebook"/"Visit Instagram" in contact section
  - Regular website links show Globe icon and "Visit Website" text
- [x] **Specialty System** - Consolidated specialty structure with automatic name mapping
  - 9 consolidated specialties (reduced from 11 original categories)
  - Automatic conversion of old specialty names to new consolidated names
  - Backward compatible with existing database entries
  - URL redirects for old specialty slugs to new ones (SEO-friendly)
  - Separate "Boxing" and "Martial Arts & MMA" specialties

### Phase 4: Owner Experience ✅
- [x] **Add Gym Form** - Single-page form for gym owners to submit listings
  - Basic information (name, city, address)
  - Details (specialties, amenities, opening hours)
  - Contact information
  - Photo uploads
  - "How it works" section
- [x] **Owner Dashboard** - Mock dashboard with metrics and gym management
- [x] **Pricing Page** - Transparent pricing tiers (Free, Monthly, Annual, Lifetime)
- [x] **Advertise With Us Page** - Comprehensive advertising page with benefits, testimonials, FAQ
- [x] Upgrade prompts and CTAs throughout

### Phase 5: SEO & Polish ✅
- [x] **Schema.org JSON-LD Markup**
  - LocalBusiness schema for gyms
  - BreadcrumbList schema
  - Organization schema
  - WebSite schema with search action
  - CollectionPage schema for city/specialty pages
  - **FAQPage schema** for homepage, city pages, and specialty pages
- [x] **Enhanced Meta Tags**
  - Open Graph tags for social sharing
  - Twitter Card tags
  - Dynamic meta descriptions
  - Keyword-rich titles
- [x] **Sitemap Generation** - Auto-generated sitemap.xml
- [x] **Robots.txt** - Proper search engine configuration
- [x] **Internal Linking Strategy** - Comprehensive linking between pages
- [x] **Image Optimization** - Using next/image throughout
- [x] **Homepage SEO Optimization**
  - Updated H1 to "Find Gyms Near Me in Cyprus"
  - Added "24 Hour Gyms Near Me" section
  - Added "Benefits" section with keyword-rich content
  - Added "Complete Guide" section
  - Added FAQ section for "People Also Ask" (visible + schema)
- [x] **City Pages SEO** - Enhanced with "Best Gyms in [City]" content
  - Visible FAQ sections on all city pages
  - FAQPage schema for all city pages
- [x] **Specialty Pages SEO** - Created/enhanced Personal Training, Swimming, Pilates, CrossFit pages
  - Visible FAQ sections on all specialty pages
  - FAQPage schema for all specialty pages
- [x] **Keyword Strategy** - Based on SEMrush data (30 keywords, ~20,700+ monthly searches)
- [x] **Content Expansion** - Added 3 new swimming pool gyms (targeting high-volume keywords)

### Navigation & UI Enhancements ✅
- [x] **Modern Navigation Bar**
  - Dark theme with logo
  - Centered navigation links
  - "Browse Cities" dropdown with click-to-open
  - Two-column city list in dropdown
  - Login/Signup buttons on the right
  - Fully responsive mobile menu
- [x] **City Cards Section** - Styled like reference site with emojis
- [x] **Specialty Cards Section** - Grid layout with emojis
- [x] **Button Components** - Gradient and solid variants with glow effects
- [x] **Badge Components** - Featured, specialty, and rating badges

## 🎨 Design System

The project uses a custom dark/neon theme with:

### Colors
- **Primary**: Electric Blue (#00D9FF), Deep Purple (#6C5CE7)
- **Secondary**: Neon Green (#00FF88), Coral (#FF6B6B)
- **Background**: Dark (#0A0E27), Dark Gray (#1A1F3A)
- **Surface**: Card (#252B42), Lighter (#2D3447)
- **Text**: White (#FFFFFF), Light (#E0E0E0), Muted (#9CA3AF)
- **Accent**: Gold (#FFD700) for featured items

### Typography
- **Sans**: Inter (body text)
- **Display**: Poppins (headings)

### Components
- Card-based design with rounded corners
- Hover effects and smooth transitions
- Gradient buttons with glow shadows
- Responsive grid layouts

## 📊 Data Structure

### Data Management

#### Backend Database (Supabase) ✅
- **Database**: Supabase PostgreSQL
- **Total Gyms**: 210 gyms in database (all scraped from Google Maps)
  - Limassol: 50 gyms
  - Nicosia: 71 gyms
  - Larnaca: 43 gyms
  - Paphos: 34 gyms
  - Ayia Napa: 6 gyms
  - Protaras: 7 gyms
- **Featured Gyms**: 0 featured listings (all unclaimed)
- **Cities**: 6 cities (all cities now have gyms imported)
- **Specialties**: 9 consolidated specialties (reduced from 11 original categories)
  - **Specialty Structure**: 
    - Fitness/Gym (consolidated from "Fitness" and "Gym")
    - CrossFit
    - Personal Training
    - Martial Arts & MMA (renamed from "Martial Arts", includes MMA-focused gyms)
    - Boxing (separate specialty for boxing-only gyms)
    - Yoga & Pilates (consolidated from "Yoga" and "Pilates")
    - Dance & Group Fitness
    - Strength Training (consolidated from "Bodybuilding" and "Powerlifting")
    - Swimming & Aquatics (renamed from "Swimming")
  - **Specialty Mapping**: Automatic conversion of old specialty names to new consolidated names
    - Old names like "MMA" automatically display as "Martial Arts & MMA"
    - Backward compatible with existing database entries
- **Specialty Distribution**: 
  - Martial Arts & MMA: Multiple gyms across cities
  - Boxing: Multiple gyms across cities
  - Yoga & Pilates: Multiple gyms across cities
  - Personal Training: Multiple gyms across cities
  - CrossFit: Multiple gyms
  - Fitness/Gym: Multiple general fitness centers
  - Strength Training: Multiple gyms
  - 24 Hour Gym: 1 gym (only verified: "Muscle Factory 24 Hours")
- **Member Count System**: Implemented with verification (no member counts set - all unclaimed)
- **Data Source**: All gyms from Google Maps scrape
  - ✅ 50 Limassol gyms imported (manually via Supabase Dashboard)
  - ✅ 71 Nicosia gyms imported (manually via Supabase Dashboard)
  - ✅ 43 Larnaca gyms imported (manually via Supabase Dashboard)
  - ✅ 34 Paphos gyms imported (manually via Supabase Dashboard)
  - ✅ 6 Ayia Napa gyms imported (manually via Supabase Dashboard)
  - ✅ 7 Protaras gyms imported (manually via Supabase Dashboard)
- **Database Status**: ✅ All 210 gyms are live in the database and visible on frontend
- **Data Quality**: ✅ Specialty assignments verified and corrected (removed incorrect "24-hour-gym" tags)
- **City Assignment Fixes**: ✅ Corrected gym city assignments (e.g., "Bad Dog Bjj" moved from Protaras to Ayia Napa based on address)
- **Opening Hours**: ✅ Standardized opening hours format across all gyms (HH:MM-HH:MM, 24-hour format)
  - All 210 gyms have all 7 days (Monday-Sunday) in opening hours
  - 50+ gyms updated with accurate opening hours from verified sources
  - Real-time open/closed status using Cyprus timezone (Europe/Nicosia)
  - Current day highlighting in opening hours display (bold text with tinted background)
  - Handles both hyphens (-) and em dashes (—) in opening hours for accurate parsing
  - Support for "Contact for opening hour details" for gyms without available hours
  - Support for split time ranges (e.g., "07:00–10:00, 16:00–20:00")
- **Pricing Information**: ✅ Comprehensive pricing system implemented
  - JSONB field in database for structured pricing data
  - Support for detailed pricing plans with name, price, currency, validity, description, and included classes
  - Concise display format showing plan name, validity, and price
  - Backward compatible with simple key-value pricing format
  - Multiple gyms updated with detailed pricing information (e.g., The Yogi Turtle with 11 pricing plans)
- **Social Media Links**: ✅ Comprehensive social media integration with separate website, Facebook, and Instagram support
  - `social_media` JSONB field in database for structured social media data
  - Separate fields for website, Facebook, and Instagram links
  - Facebook links show Facebook icon and "Visit Facebook" text
  - Instagram links show Instagram icon and "Visit Instagram" text
  - Regular website links show Globe icon and "Visit Website" text
  - Automatic detection of Facebook/Instagram URLs in legacy `website` field (backward compatible)
- **Gym Name Formatting**: ✅ Smart gym name display to avoid duplicate city names
  - Automatically detects if gym name already contains city name
  - Prevents duplicate city names in H1 headings and SEO titles
  - Applied across all components (gym cards, maps, listings)
- **Data Enrichment**: ✅ Ongoing data quality improvements
  - 50+ gyms updated with accurate opening hours
  - Specialty assignments updated (add/remove specialties)
  - Amenities added to multiple gyms
  - Email addresses and phone numbers added
  - Social media links (Instagram, Facebook) integrated
  - Review counts updated and synchronized with about sections
  - Pricing information added to gyms with detailed plans
  - Slug corrections (e.g., removed redundant city names from slugs)
- **Specialty System Fixes**: ✅ Resolved specialty mapping and display issues
  - Fixed CrossFit count discrepancy (case-insensitive mapping)
  - Fixed Swimming & Aquatics page empty results (slug conversion with special characters)
  - Improved specialty name mapping utility for better data consistency

#### Frontend Data Access
- **Data Layer**: Unified data access layer with Supabase API integration
- **Fallback**: Mock data available as fallback (5 test gyms)
- **API Integration**: ✅ Frontend connected to Supabase API
- **Dynamic Counts**: ✅ City and specialty counts calculated dynamically from database
- **Reviews**: Empty (reviews will come from database)
- **Specialties**: 9 consolidated specialties (visible for MVP)

**Note:** All mock/demo gyms have been removed. Frontend fetches data from Supabase with fallback to mock data if API fails.

## 🔍 SEO Features

- ✅ Schema.org structured data (LocalBusiness, BreadcrumbList, Organization, WebSite, CollectionPage, **FAQPage**)
- ✅ FAQPage schema on homepage, all city pages, and all specialty pages
- ✅ Visible FAQ sections targeting "People Also Ask" SERP features
- ✅ Open Graph and Twitter Card meta tags
- ✅ Auto-generated sitemap.xml
- ✅ Robots.txt configuration
- ✅ Semantic HTML5 throughout
- ✅ Keyword-rich headings and descriptions
- ✅ Internal linking strategy
- ✅ Image optimization with alt text
- ✅ Mobile-first responsive design

## 🗺️ Map Integration

- **OpenStreetMap** via Leaflet.js (no Google Maps)
- Interactive maps on city and gym pages
- Custom markers for featured gyms
- Clustering for city pages with many gyms
- Clickable pins with gym previews
- Directions links to OpenStreetMap routing

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface (44px minimum touch targets)
- Hamburger menu on mobile
- Optimized layouts for all screen sizes

## 🚀 Performance

- Next.js 14 App Router with server-side rendering
- Image optimization with next/image
- Code splitting and lazy loading
- Static site generation where possible
- Optimized bundle sizes

## 📝 Development Status

### Completed ✅
- All core pages and functionality
- SEO optimization (homepage, city pages, specialty pages)
- Keyword strategy implementation (30 keywords, ~20,700+ monthly searches)
- Map integration
- Owner experience flows
- Navigation and UI polish
- Specialty emojis and visual enhancements
- Swimming pool gyms added (targeting high-volume keywords)

### Current Status
- **Phase 5 Complete**: SEO optimization and content enhancement
- **FAQ Schema Implemented**: FAQPage schema + visible FAQ sections on homepage, all city pages, and all specialty pages
- **Backend Integration**: ✅ Supabase database setup complete with 210 real gyms (all scraped from Google Maps)
- **Data Processing**: ✅ Automated cleaning pipeline for scraped gym data
- **Bulk Import**: ✅ Multi-city bulk imports completed and applied to database
  - ✅ 50 Limassol gyms imported - manually via Supabase Dashboard
  - ✅ 71 Nicosia gyms imported - manually via Supabase Dashboard
  - ✅ 43 Larnaca gyms imported - manually via Supabase Dashboard
  - ✅ 34 Paphos gyms imported - manually via Supabase Dashboard
  - ✅ 6 Ayia Napa gyms imported - manually via Supabase Dashboard
  - ✅ 7 Protaras gyms imported - manually via Supabase Dashboard
- **Database Status**: ✅ All 210 gyms are live and visible on frontend
- **Data Quality Fixes**: ✅ Corrected incorrect "24-hour-gym" specialty assignments
  - Removed "24-hour-gym" from incorrectly tagged gyms
  - Only "Muscle Factory 24 Hours" verified as 24-hour gym
  - Reassigned gyms to correct specialties (Martial Arts & MMA, Boxing, CrossFit, Yoga & Pilates, Personal Training)
  - Updated gym descriptions to remove incorrect "24 hour gym" references
- **Frontend Integration**: ✅ Connected to Supabase API with dynamic counts
- **Mock Data Cleanup**: ✅ All mock/demo gyms removed (clean slate for real data)
- **Site Status**: Stable and production-ready for frontend MVP
- **Next Phase**: Internal linking optimization, owner claim system, expand gym listings further

### Future Enhancements (Post-MVP)
- ✅ FAQ schema markup for better SERP features (COMPLETED)
- ✅ Backend integration (Supabase) - **COMPLETED** (Database setup and migration done)
- ✅ **Data Processing Pipeline** - **COMPLETED** (Automated cleaning scripts for scraped data)
- ✅ **Test Import** - **COMPLETED** (5 Limassol gyms imported and visible in frontend)
- ✅ **Mock Data Cleanup** - **COMPLETED** (All mock/demo gyms removed - clean slate for real data)
- ✅ **Opening Hours System** - **COMPLETED** (Standardized format, all 7 days, real-time status, Cyprus timezone)
- ✅ **Data Enrichment** - **COMPLETED** (Opening hours updates, pricing information, Facebook link detection)
- ✅ Bulk import completed for all 6 cities:
  - ✅ 50 Limassol gyms
  - ✅ 71 Nicosia gyms
  - ✅ 43 Larnaca gyms
  - ✅ 34 Paphos gyms
  - ✅ 6 Ayia Napa gyms
  - ✅ 7 Protaras gyms
- ✅ Frontend connected to Supabase API with dynamic data fetching
- ✅ Specialty assignments corrected and verified
- ✅ Gym descriptions updated to match actual specialties
- ✅ SEO-optimized descriptions generated for all imported gyms
- ⏳ Migrate reviews to database
- ⏳ Internal linking optimization
- ⏳ Location-specific pages (Strovolos, etc.)
- ⏳ Owner claim/upgrade paths with CTAs
- ⏳ User authentication
- ⏳ Real review system
- ✅ **Member Count System** - Database schema implemented with verification
- ⏳ Advanced search filters
- ⏳ Comparison tool
- ⏳ User favorites/bookmarks
- ⏳ Email notifications
- ⏳ Blog section for SEO content
- ⏳ Analytics integration

**See DEVELOPMENT_STATUS.md for detailed progress and roadmap.**

## 🧪 Testing

- Cross-browser compatibility
- Mobile responsiveness verified
- SEO validation ready
- Performance optimization applied

## 📚 Documentation

- **PROJECT_PLAN.md** - Comprehensive development plan
- **TECHNICAL_REFERENCE.md** - Quick reference guide
- **SEO_ANALYSIS.md** - SEO best practices analysis
- **KEYWORD_STRATEGY.md** - SEO keyword strategy based on SEMrush data
- **SEO_INDEX_ANALYSIS.md** - Homepage SEO analysis and improvements
- **DEVELOPMENT_STATUS.md** - Current progress and roadmap
- **MEMBER_COUNT_SPECIFICATION.md** - Member count system implementation specification
- **STRATEGIC_ACTION_PLAN.md** ⭐ - Comprehensive tactical roadmap from MVP to top-ranking directory
- **DATABASE_MIGRATION_STATUS.md** - Database migration status and results
- **docs/data_mapping.md** - Apify to Supabase column mapping documentation
- **docs/TEST_IMPORT_REPORT.md** - Test import results and verification
- **docs/DATA_PROCESSING_GUIDE.md** - Complete data processing pipeline documentation

## 🎯 Key Features

### For Users
- Browse gyms by city or specialty
- View detailed gym information with ratings and reviews
- Interactive maps to find gym locations
- Search functionality
- Filter and sort gyms
- Mobile-optimized experience

### For Gym Owners
- Free listing submission
- Featured listing options
- Owner dashboard (mock)
- Transparent pricing
- Easy submission form

## 📄 License

This project is part of a commercial directory platform.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the project maintainer.

---

**Built with ❤️ for the Cyprus fitness community**
