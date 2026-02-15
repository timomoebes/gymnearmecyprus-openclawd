# Landing Page UX & SEO Analysis

**Date:** 2025-02-15  
**Scope:** Index / landing page (homepage)  
**Goals:** Simplify where possible, improve UX, preserve SEO best practices for a local business directory.

---

## Current structure (as analyzed in browser)

1. **Hero** – H1, keyword-rich subtitle, search bar, primary CTA (Search Gyms), secondary links (Explore Gyms · List Your Gym Free)
2. **CityCardGrid** – "Gyms in Cyprus by City" + city cards + View All Cities
3. **SpecialtyCardGrid** – "Fitness Specialties" + specialty cards + View All Specialties
4. **Home24HourSection** – "24 Hour Gyms" + up to 6 gym cards + View All
5. **HomeBenefitsSection** – "Why Use Gym Near Me" with 6 benefit cards
6. **HomeGuideSection** – "Complete Guide" (Tips + Types of Gyms + Pro tip, two columns)
7. **FAQSection** – 4 Q&As (with FAQ schema)
8. **HomeTrustSection** – 3 stats (gyms listed, free to list, average rating)

---

## SEO checklist (keep / strengthen)

- **H1** – "Find Gyms Near Me in Cyprus" (strong local intent)
- **Meta title & description** – Dynamic gym count, keywords
- **Internal linking** – Cities, specialties, 24h gyms, guide
- **Keyword-rich H2s** – Cities, specialties, 24h, benefits, guide, FAQ
- **FAQ schema** – Present for rich results
- **Unique content** – Guide and benefits support E-E-A-T; keep indexable

**Do not remove** city/specialty grids or FAQ content; they support rankings and crawl depth.

---

## Improvement directions

### 1. Simplify: fewer sections, same SEO

- **Benefits:** Reduce from 6 cards to 3 by merging pairs. Keep all keyword phrases in the copy.
- **Guide:** Shorten on homepage to one column (e.g. "Tips" only) and add "Read the full guide" linking to `/guides/...`
- **Trust:** Add a compact trust bar directly under the hero (e.g. "198+ gyms · Free to list · 4.5+ avg rating")

### 2. Progressive disclosure

- **FAQ:** Use accordions/collapsibles so the block takes less vertical space; content stays in the DOM and in FAQ schema.
- **Guide:** Optional "Expand" for the second column (Types of Gyms) so first view is Tips + CTA to full guide.

### 3. Trust-first layout

- Move trust stats higher: compact bar under hero or small strip between hero and cities.
- Optionally add one line of city links under the search for extra internal links.

### 4. Mobile-first and accessibility

- Ensure city/specialty cards have enough touch target size and spacing.
- Add `id` on main sections (e.g. `id="cities"`, `id="specialties"`) for skip links and deep links.

---

## Recommended next steps (priority)

1. Add a compact trust bar under the hero
2. Condense Benefits to 3 cards – merge copy so keywords remain
3. Add section IDs – `id="cities"`, `id="specialties"`, `id="faq"` for skip links
4. Optional: FAQ as accordions – same content and schema, smaller footprint
