# Next Steps - Development Roadmap

**Last Updated:** January 26, 2025

---

## 🎯 Immediate Next Steps (Priority Order)

### **Option 1: Bulk Import Remaining Limassol Gyms** ⭐ **RECOMMENDED**

**Why:** 
- We have 50 cleaned gyms ready (`data/clean/limassol_gyms_clean.csv`)
- Test import of 5 gyms was successful
- More content = better SEO and user experience
- Frontend can continue using mock data until we have more real data

**Steps:**
1. Review the cleaned dataset (50 gyms)
2. Generate SQL migration for bulk import (similar to test import)
3. Import in batches (e.g., 10-15 gyms at a time) to avoid issues
4. Verify each batch before proceeding
5. Update mock data to include new gyms for frontend display

**Estimated Time:** 2-3 hours

**Files Needed:**
- `data/clean/limassol_gyms_clean.csv` (50 gyms)
- `scripts/test_gym_import.py` (adapt for bulk import)
- Generate SEO descriptions for new gyms

---

### **Option 2: Connect Frontend to Supabase API**

**Why:**
- Frontend currently uses mock data from `lib/data/gyms.ts`
- Real-time data from database
- Better for production

**Steps:**
1. Create Supabase client configuration
2. Create data access layer (`lib/api/gyms.ts`, `lib/api/cities.ts`)
3. Update pages to fetch from Supabase instead of mock data
4. Keep mock data as fallback for development
5. Handle loading states and errors

**Estimated Time:** 3-4 hours

**Files to Create/Update:**
- `lib/supabase/client.ts` - Supabase client setup
- `lib/api/gyms.ts` - Gym data fetching functions
- `lib/api/cities.ts` - City data fetching functions
- Update all pages that use `getGymBySlug`, `getGymsByCity`, etc.

---

### **Option 3: Content Expansion (Other Cities)**

**Why:**
- Currently only Limassol has real scraped data
- Need gyms for Nicosia, Larnaca, Paphos, etc.
- Better geographic coverage = better SEO

**Steps:**
1. Scrape gym data for other cities (Nicosia, Larnaca, Paphos)
2. Clean and process data (same pipeline as Limassol)
3. Import to database
4. Update frontend mock data

**Estimated Time:** 4-6 hours per city

---

## 📋 Recommended Sequence

### **Phase 1: Bulk Import (This Week)**
1. ✅ Bulk import remaining 45 Limassol gyms
2. ✅ Generate SEO descriptions for all new gyms
3. ✅ Update mock data to include all new gyms
4. ✅ Verify frontend displays correctly

### **Phase 2: Frontend-Backend Connection (Next Week)**
1. ✅ Set up Supabase client
2. ✅ Create API data layer
3. ✅ Migrate pages to use Supabase
4. ✅ Keep mock data as fallback

### **Phase 3: Content Expansion (Following Weeks)**
1. ✅ Scrape data for Nicosia
2. ✅ Scrape data for Larnaca
3. ✅ Scrape data for Paphos
4. ✅ Import and verify

---

## 🚀 Quick Wins (Can Do Anytime)

1. **Add Missing Amenities to Database**
   - "Childcare" (found during enrichment)
   - "Free Weights" (found during enrichment)
   - "Air Conditioning" (commonly found)

2. **Improve Enrichment Script**
   - Better handling of class schedules vs. opening hours
   - Support for multiple time slots per day
   - Better amenity detection

3. **Analytics Setup**
   - Google Analytics 4
   - Google Search Console
   - Track page views, searches, clicks

4. **Owner Claim System**
   - Build claim workflow
   - Email verification
   - Dashboard for owners

---

## 📊 Current Status Summary

**Database:**
- ✅ 26 gyms (21 mock + 5 test imports)
- ✅ 6 cities
- ✅ 13 specialties
- ✅ Schema complete

**Frontend:**
- ✅ All pages working
- ✅ Using mock data
- ✅ SEO optimized
- ⚠️ Not connected to Supabase yet

**Data Ready:**
- ✅ 50 cleaned Limassol gyms ready for import
- ⚠️ Other cities need scraping

---

## 💡 Recommendation

**Start with Option 1: Bulk Import**

This gives you:
- More content immediately (50 gyms → 75+ total)
- Better SEO with more listings
- Validates the import process
- Can be done in 2-3 hours

Then proceed with Option 2 (Frontend connection) once you have more real data to work with.

---

**Questions?** Review the data processing guide: `docs/DATA_PROCESSING_GUIDE.md`
