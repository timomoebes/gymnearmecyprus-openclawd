# Mock Data Strategy - Post Bulk Import

**Last Updated:** January 26, 2025

---

## 🎯 Current Situation

**Before Bulk Import:**
- Frontend: Uses mock data from `lib/data/gyms.ts` (26 gyms)
- Database: 26 gyms (21 mock + 5 test imports)
- Data Source: Mock data functions (`getGymBySlug`, `getGymsByCity`, etc.)

**After Bulk Import:**
- Database: ~75+ gyms (26 existing + 45 new Limassol gyms)
- Frontend: Still using mock data (won't see new gyms automatically)

---

## 📋 Strategy Options

### **Option A: Keep Mock Data as Fallback** ⭐ **RECOMMENDED**

**Approach:**
Create a data access layer that:
1. **Primary:** Fetches from Supabase API
2. **Fallback:** Uses mock data if API fails or in development
3. **Gradual Migration:** Keep mock data for cities without real data yet

**Implementation:**
```typescript
// lib/api/gyms.ts
export async function getGymBySlug(slug: string): Promise<Gym | undefined> {
  try {
    // Try Supabase first
    const gym = await fetchFromSupabase(slug);
    if (gym) return gym;
  } catch (error) {
    console.warn('Supabase fetch failed, using mock data');
  }
  
  // Fallback to mock data
  return getGymBySlugMock(slug);
}
```

**Pros:**
- ✅ Graceful degradation (site works even if API fails)
- ✅ Development flexibility (can work offline)
- ✅ Gradual migration (city by city)
- ✅ No breaking changes

**Cons:**
- ⚠️ Data duplication (need to keep mock data updated)
- ⚠️ Sync issues if mock data gets out of date

**Best For:** Production-ready approach with safety net

---

### **Option B: Remove Mock Data Entirely**

**Approach:**
- Delete all mock data files
- Frontend only uses Supabase API
- No fallback mechanism

**Pros:**
- ✅ Single source of truth
- ✅ No sync issues
- ✅ Cleaner codebase

**Cons:**
- ❌ Site breaks if API fails
- ❌ Harder development (need database connection)
- ❌ No offline capability
- ❌ Can't develop without internet

**Best For:** Production only, when you have 100% confidence in API

---

### **Option C: Hybrid - Mock Data for Non-Limassol Cities**

**Approach:**
- Use Supabase API for Limassol (has real data)
- Use mock data for other cities (Nicosia, Larnaca, etc.)
- Gradually migrate as you scrape more cities

**Implementation:**
```typescript
export async function getGymsByCity(cityId: string): Promise<Gym[]> {
  // Limassol has real data
  if (cityId === 'limassol') {
    return await fetchFromSupabase(cityId);
  }
  
  // Other cities use mock data until scraped
  return getGymsByCityMock(cityId);
}
```

**Pros:**
- ✅ Gradual migration (city by city)
- ✅ No breaking changes
- ✅ Real data where available

**Cons:**
- ⚠️ Still have sync issues for mock cities
- ⚠️ Need to remember which cities are "real"

**Best For:** Transitional period

---

## 🎯 **Recommended Strategy: Option A (Fallback Pattern)**

### **Phase 1: Create Data Access Layer** (After Bulk Import)

1. **Create Supabase Client**
   ```typescript
   // lib/supabase/client.ts
   import { createClient } from '@supabase/supabase-js'
   ```

2. **Create API Functions**
   ```typescript
   // lib/api/gyms.ts
   // Functions that fetch from Supabase
   ```

3. **Create Unified Access Layer**
   ```typescript
   // lib/data/gyms.ts (refactor)
   // Keep mock functions but rename to getGymBySlugMock
   // Create new getGymBySlug that tries API first, falls back to mock
   ```

4. **Update All Pages**
   - Change imports to use new unified functions
   - No other code changes needed

### **Phase 2: Gradual Migration**

1. **Limassol:** Use Supabase (has real data)
2. **Other Cities:** Use mock data until scraped
3. **As you scrape:** Switch each city to Supabase

### **Phase 3: Cleanup (Future)**

Once all cities have real data:
- Keep mock data as fallback for development
- Or remove entirely if confident in API

---

## 📁 File Structure After Migration

```
lib/
├── data/              # Mock data (kept as fallback)
│   ├── gyms.ts       # Renamed functions: getGymBySlugMock
│   ├── cities.ts
│   └── ...
├── api/              # NEW: Supabase API functions
│   ├── gyms.ts       # getGymBySlug, getGymsByCity (Supabase)
│   ├── cities.ts
│   └── ...
├── supabase/         # NEW: Supabase client
│   └── client.ts
└── data-access.ts    # NEW: Unified access layer (tries API, falls back to mock)
```

---

## 🔄 Migration Timeline

### **Week 1: After Bulk Import**
- ✅ Bulk import 45 Limassol gyms
- ✅ Update mock data to include new gyms (for frontend display)
- ⏳ Create Supabase client setup
- ⏳ Create API functions for Limassol

### **Week 2: Data Access Layer**
- ⏳ Create unified access layer
- ⏳ Update pages to use new layer
- ⏳ Test fallback mechanism

### **Week 3+: Gradual Migration**
- ⏳ Scrape Nicosia → Switch to Supabase
- ⏳ Scrape Larnaca → Switch to Supabase
- ⏳ Continue for each city

---

## 💡 **Immediate Action Plan (After Bulk Import)**

### **Step 1: Update Mock Data** (Temporary)
- Add all 45 new Limassol gyms to `lib/data/gyms.ts`
- This keeps frontend working while we build API layer
- **Note:** This is temporary - will be replaced by API

### **Step 2: Build Data Access Layer** (Next)
- Create Supabase client
- Create API functions
- Create unified access layer with fallback

### **Step 3: Migrate Frontend** (After API Layer)
- Update all pages to use new access layer
- Test thoroughly
- Remove direct mock data imports

---

## ⚠️ Important Considerations

### **Data Sync**
- Mock data will be out of date after bulk import
- **Solution:** Use API as primary source, mock as fallback only

### **Development Experience**
- Developers need database access to see real data
- **Solution:** Keep mock data for offline development

### **Production Reliability**
- API might fail or be slow
- **Solution:** Fallback to mock data ensures site always works

### **SEO & Static Generation**
- Next.js static generation needs data at build time
- **Solution:** Use Supabase at build time, mock data as fallback

---

## ✅ **Final Recommendation**

**Use Option A (Fallback Pattern):**

1. **After bulk import:** Update mock data temporarily (so frontend works)
2. **Next step:** Build data access layer with Supabase + fallback
3. **Then:** Migrate frontend to use new layer
4. **Future:** Keep mock data as development fallback, or remove once confident

**This gives you:**
- ✅ Site always works (even if API fails)
- ✅ Gradual migration (no big bang)
- ✅ Development flexibility
- ✅ Production reliability

---

## 📝 Summary

**What to do with mock data after bulk import:**

1. **Short term:** Update mock data to include new gyms (temporary)
2. **Medium term:** Build API layer, use mock data as fallback
3. **Long term:** Keep as fallback for development, or remove if confident

**Key Principle:** Mock data becomes a **safety net**, not the primary source.

