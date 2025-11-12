# Mock vs Scraped Data Strategy

**Last Updated:** January 26, 2025

---

## 🎯 Data Types Clarification

### **Mock/Fake Gyms** (21 gyms)
- **Source:** Manually created for development/demo
- **Examples:** "Powerhouse Gym Limassol", "Elite Fitness Nicosia", "Tropical Fitness Protaras"
- **Status:** Fictional/demo data
- **Location:** Both frontend (`lib/data/gyms.ts`) and database (Supabase)
- **Purpose:** Development, testing, MVP demonstration

### **Scraped/Real Gyms** (50 total)
- **Source:** Google Maps scrape (Apify)
- **Examples:** "Ballet School & Pilates Studio Monika Perikleous", "Vinyasa Yoga Studio Limassol"
- **Status:** Real business data
- **Location:** Database (Supabase) + frontend mock data (temporary)
- **Progress:** 5 imported, 45 remaining

---

## 📊 Current State

### **Database (Supabase)**
- ✅ ~3-21 mock/fake gyms (need to verify exact count)
- ✅ ~20 scraped/real gyms (including 5 test imports)
- ⏳ 45 scraped/real gyms (ready for import)

### **Frontend (Mock Data)**
- ✅ 21 mock/fake gyms
- ✅ 5 scraped/real gyms (added manually for display)

---

## 🎯 Strategy Options for Mock/Fake Gyms

### **Option 1: Keep Mock Gyms, Mark as "Demo Data"** ⭐ **RECOMMENDED**

**Approach:**
- Keep all mock gyms in database
- Add `source` field to identify them
- Mark as "Demo Data" or "Sample Listing"
- Show badge/indicator on frontend
- Allow owners to claim and replace with real data

**Implementation:**
```sql
-- Add source tracking
ALTER TABLE gyms ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'scraped';
-- Update mock gyms
UPDATE gyms SET source = 'demo' WHERE slug IN ('powerhouse-gym-limassol', ...);
```

**Frontend Display:**
- Show "Demo Listing" badge on mock gyms
- Add note: "This is a sample listing. Claim your gym to add real information."

**Pros:**
- ✅ Shows site functionality (good for demos)
- ✅ Fills gaps in cities without scraped data
- ✅ Can be claimed/replaced by real owners
- ✅ No data loss

**Cons:**
- ⚠️ Users might think they're real gyms
- ⚠️ Need clear labeling

**Best For:** MVP launch, demos, filling content gaps

---

### **Option 2: Remove Mock Gyms After Real Data Import**

**Approach:**
- Delete all mock gyms from database
- Remove from frontend mock data
- Only keep scraped/real gyms

**Pros:**
- ✅ Only real data (no confusion)
- ✅ Cleaner database
- ✅ No misleading information

**Cons:**
- ❌ Lose content (especially for cities without scraped data)
- ❌ Empty pages for some cities
- ❌ Less content = worse SEO

**Best For:** Production when you have enough real data

---

### **Option 3: Keep Mock Gyms for Cities Without Real Data**

**Approach:**
- Keep mock gyms for cities that don't have scraped data yet
- Remove mock gyms from cities that have real scraped data (e.g., Limassol)
- Gradually replace as you scrape more cities

**Example:**
- **Limassol:** Remove mock gyms (has 50+ real gyms after bulk import)
- **Nicosia:** Keep mock gyms (no scraped data yet)
- **Larnaca:** Keep mock gyms (no scraped data yet)

**Pros:**
- ✅ No empty pages
- ✅ Real data where available
- ✅ Gradual cleanup

**Cons:**
- ⚠️ Need to track which cities have real data
- ⚠️ More complex logic

**Best For:** Transitional period

---

### **Option 4: Archive Mock Gyms (Soft Delete)**

**Approach:**
- Add `is_active` or `is_demo` flag
- Hide mock gyms from public view
- Keep in database for reference/development
- Can be reactivated if needed

**Implementation:**
```sql
ALTER TABLE gyms ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT false;
UPDATE gyms SET is_demo = true WHERE source = 'demo';
-- Filter in queries: WHERE is_demo = false
```

**Pros:**
- ✅ No data loss
- ✅ Can be reactivated
- ✅ Clean public view
- ✅ Still available for development

**Cons:**
- ⚠️ Need to filter in all queries
- ⚠️ Slightly more complex

**Best For:** When you want to hide but not delete

---

## 🎯 **Recommended Strategy: Option 1 (Keep & Mark as Demo)**

### **Why This Approach:**

1. **Content Coverage:** Mock gyms fill gaps in cities without scraped data
2. **SEO Benefits:** More content = better SEO (even if marked as demo)
3. **User Experience:** Shows site functionality, no empty pages
4. **Owner Claims:** Real owners can claim and replace demo listings
5. **Flexibility:** Can remove later if needed

### **Implementation Plan:**

#### **Step 1: Add Source Tracking to Database**

```sql
-- Add source column if not exists
ALTER TABLE gyms 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'scraped'
CHECK (source IN ('scraped', 'demo', 'owner_submitted', 'google_maps_scrape'));

-- Mark existing mock gyms (all 21)
UPDATE gyms 
SET source = 'demo' 
WHERE slug IN (
  'powerhouse-gym-limassol',
  'elite-fitness-nicosia',
  'tropical-fitness-protaras',
  'zen-yoga-studio-limassol',
  'beach-body-fitness-ayia-napa',
  'iron-will-gym-limassol',
  'flex-fitness-center-nicosia',
  'martial-arts-academy-paphos',
  'pilates-paradise-larnaca',
  'sunset-fitness-ayia-napa',
  'ocean-view-gym-protaras',
  'strength-hub-limassol',
  'cardio-zone-nicosia',
  'boxing-club-paphos',
  'yoga-haven-larnaca',
  'resort-fitness-ayia-napa',
  'beachside-gym-protaras',
  'power-lifting-center-limassol',
  'wellness-studio-nicosia',
  'fitness-fusion-paphos',
  'crossfit-cyprus-paphos'
);

-- Mark scraped gyms
UPDATE gyms 
SET source = 'google_maps_scrape' 
WHERE slug IN (
  'ballet-school-pilates-studio-monika-perikleous',
  'vinyasa-yoga-studio-limassol',
  'piero-judo-academy',
  'limassol-fitness',
  'soul-vibe-space',
  -- ... all other scraped gym slugs
);
```

#### **Step 2: Update Frontend to Show Demo Badge**

```typescript
// In GymCard component
{gym.source === 'demo' && (
  <Badge variant="secondary">Demo Listing</Badge>
)}
```

#### **Step 3: Add Claim CTA for Demo Gyms**

```typescript
// On demo gym detail pages
{gym.source === 'demo' && (
  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
    <p>This is a sample listing. Are you the owner? Claim your gym to add real information.</p>
    <Button>Claim This Gym</Button>
  </div>
)}
```

---

## 📋 Migration Timeline

### **Before Bulk Import:**
1. ✅ Add `source` column to database
2. ✅ Mark existing 21 mock gyms as `source = 'demo'`
3. ✅ Mark existing scraped gyms as `source = 'google_maps_scrape'`

### **During Bulk Import:**
1. ✅ Import 45 new scraped gyms with `source = 'google_maps_scrape'`

### **After Bulk Import:**
1. ✅ Update frontend to show demo badges
2. ✅ Add claim CTAs to demo gyms
3. ✅ Update mock data file (temporary, for frontend display)

---

## 🎯 **Specific Actions for Bulk Import**

### **Before Import:**
1. ✅ Add `source` column to database
2. ✅ Mark existing mock gyms as `source = 'demo'`
3. ✅ Mark existing scraped gyms as `source = 'google_maps_scrape'`

### **During Import:**
1. ✅ Import 45 new scraped gyms with `source = 'google_maps_scrape'`

### **After Import:**
1. ✅ Update frontend to show demo badges
2. ✅ Add claim CTAs to demo gyms
3. ✅ Update mock data file (temporary, for frontend display)

---

## 📊 Expected Results

### **Database After Bulk Import:**
- **Demo Gyms:** 21 (marked as `source = 'demo'`)
- **Scraped Gyms:** 50 (marked as `source = 'google_maps_scrape'`)
- **Total:** 71 gyms

### **Frontend Display:**
- Demo gyms show "Demo Listing" badge
- Scraped gyms show normally
- Claim CTAs on demo gyms
- All gyms visible (good for SEO)

---

## ✅ **Final Recommendation**

**Keep mock gyms, mark as "Demo Data":**

1. ✅ Add `source` column to track gym type
2. ✅ Mark mock gyms as `source = 'demo'`
3. ✅ Mark scraped gyms as `source = 'google_maps_scrape'`
4. ✅ Show demo badges on frontend
5. ✅ Add claim CTAs to demo gyms
6. ✅ Keep all gyms (better content coverage)

**Benefits:**
- ✅ No empty pages
- ✅ Better SEO (more content)
- ✅ Shows site functionality
- ✅ Owners can claim and replace
- ✅ Can remove later if needed

---

## 🔄 Alternative: Remove Demo Gyms from Limassol Only

If Limassol has enough real gyms (50+), you could:
- Keep demo gyms in other cities
- Remove demo gyms from Limassol (has real data)
- This gives you real data where available, demo data where needed

**Decision Point:** After bulk import, evaluate if Limassol has enough real gyms to remove demo ones.
