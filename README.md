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
│   ├── gyms/              # Gym detail pages
│   ├── specialties/       # Specialty pages
│   ├── pricing/           # Pricing page
│   ├── add-gym/           # Add gym form
│   ├── advertise-with-us/ # Advertise page
│   ├── dashboard/         # Owner dashboard (mock)
│   ├── sitemap.ts         # Auto-generated sitemap
│   └── robots.ts          # Robots.txt configuration
├── components/            # React components
│   ├── layout/            # Header, Footer, Navigation
│   ├── shared/            # Reusable UI components
│   ├── home/              # Homepage components
│   ├── gym/               # Gym-related components
│   └── city/              # City page components
├── lib/
│   ├── data/              # Data access layer (Supabase)
│   ├── api/               # API integration
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── data/                  # Data processing
│   ├── raw/               # Raw scraped data (CSV/JSON)
│   └── clean/             # Cleaned data ready for import
├── scripts/               # Data processing scripts
├── docs/                  # Documentation
└── public/                # Static assets
```

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom design system
- **Leaflet.js** - OpenStreetMap integration
- **Lucide React** - Icons
- **next/image** - Image optimization
- **Supabase** - PostgreSQL database backend
- **Python** - Data processing and cleaning scripts

## ✨ Key Features

### For Users
- Browse gyms by city or specialty
- View detailed gym information with ratings and reviews
- Interactive maps to find gym locations
- Search functionality with intelligent matching
- Filter and sort gyms
- Mobile-optimized experience

### For Gym Owners
- Free listing submission
- **Claim a gym** – Sign in, submit a claim request; admin approves to assign ownership
- Owner dashboard – View and manage claimed gyms (after approval)
- Auth-aware nav – Dashboard and Sign out when logged in
- Transparent pricing
- Easy submission form

## 📊 Current Status

- **Total Gyms:** 198 gyms across 6 cities (Limassol, Nicosia, Larnaca, Paphos, Ayia Napa, Paralimni)
- **Database:** Supabase PostgreSQL with real gym data
- **Frontend:** Connected to Supabase API with dynamic data fetching
- **Specialties:** 9 consolidated specialties
- **Status:** Production-ready MVP

## 🔍 SEO Features

- Schema.org structured data (LocalBusiness, BreadcrumbList, Organization, WebSite, CollectionPage, FAQPage)
- Centralized meta description system (150-160 characters)
- Open Graph and Twitter Card meta tags
- Auto-generated sitemap.xml
- Robots.txt configuration
- Internal linking strategy
- Image optimization with alt text
- Mobile-first responsive design

## 🗺️ Map Integration

- **OpenStreetMap** via Leaflet.js
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

## 📚 Documentation

- **PROJECT.md** ⭐ - Product Requirements Document (PRD)
- **PRODUCT_ROADMAP.md** ⭐ - Strategic 12-month product roadmap
- **DEVELOPMENT_STATUS.md** - Current progress and detailed status
- **TECHNICAL_REFERENCE.md** - Quick reference guide
- **docs/CHANGELOG.md** - Repo-wide change notes
- **docs/ADMIN_CLAIMS.md** - How to manage claim requests as an admin (approve/reject)
- **docs/APPROVE_CLAIM_SUPABASE.md** - Full reference: in-app admin, Supabase Table Editor, and SQL approval scripts
- **docs/HCAPTCHA_SETUP.md** - hCaptcha (Claim, Login, Signup): Site anlegen, Keys in `.env.local`
- **docs/META_DESCRIPTION_GUIDE.md** - Meta description system documentation
- **docs/DATA_PROCESSING_GUIDE.md** - Data processing pipeline documentation

## Claim flow and admin (recent)

- **Users:** Sign in (or sign up and confirm email), go to a gym page → “Claim this gym” → submit request. After admin approval, the gym appears in **Dashboard**.
- **Admins:** Set `ADMIN_EMAILS` in `.env.local` (never commit it), sign in with one of those emails, open **/admin/claims** to approve or reject pending claims. See **docs/ADMIN_CLAIMS.md** and **docs/APPROVE_CLAIM_SUPABASE.md** for full instructions.
- **Security:** `.env.local` and `.env` are in `.gitignore`; do not commit env files or real emails. For captcha (claim/login/signup), set `NEXT_PUBLIC_HCAPTCHA_SITEKEY` and `HCAPTCHA_SECRET` — see **docs/HCAPTCHA_SETUP.md**.

## Changelog

See `docs/CHANGELOG.md` for repo-wide change notes, including rationale, touched areas, and a manual test plan for each entry.

## 📄 License

This project is part of a commercial directory platform.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the project maintainer.

---

**Built with ❤️ for the Cyprus fitness community**
