# Demo Data Labeling - Complete

**Date:** January 26, 2025  
**Status:** ✅ **COMPLETE**

---

## ✅ Actions Completed

### **Step 1: Added Source Column**
```sql
ALTER TABLE gyms 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'scraped'
CHECK (source IN ('scraped', 'demo', 'owner_submitted', 'google_maps_scrape'));
```

### **Step 2: Labeled All Mock/Demo Gyms**
All mock/demo gyms marked with `source = 'demo'`:
- Powerhouse Gym Limassol
- Elite Fitness Nicosia
- Tropical Fitness Protaras
- Zen Yoga Studio Limassol
- Beach Body Fitness Ayia Napa
- Iron Will Gym Limassol
- Flex Fitness Center Nicosia
- Martial Arts Academy Paphos
- Pilates Paradise Larnaca
- Sunset Fitness Ayia Napa
- Ocean View Gym Protaras
- Strength Hub Limassol
- Cardio Zone Nicosia
- Boxing Club Paphos
- Yoga Haven Larnaca
- Resort Fitness Ayia Napa
- Beachside Gym Protaras
- Power Lifting Center Limassol
- Wellness Studio Nicosia
- Fitness Fusion Paphos
- CrossFit Cyprus Paphos

### **Step 3: Labeled All Scraped Gyms**
All scraped gyms marked with `source = 'google_maps_scrape'`:
- Ballet School & Pilates Studio Monika Perikleous
- Vinyasa Yoga Studio Limassol
- Piero Judo Academy
- Limassol Fitness
- Soul Vibe Space
- (Plus any other scraped gyms in database)

---

## 📊 Current Database State

**Labeled Gyms:**
- **Demo Gyms:** All mock/fake gyms marked as `source = 'demo'`
- **Scraped Gyms:** All real gyms marked as `source = 'google_maps_scrape'`
- **Unlabeled:** 0 (all gyms are labeled)

---

## 🎯 Next Steps

### **1. Bulk Import (Next)**
- Import 45 remaining scraped Limassol gyms
- All new imports will have `source = 'google_maps_scrape'`

### **2. After Bulk Import - Evaluation**
Once bulk import is complete, evaluate:

**If Limassol has sufficient real data (50+ gyms):**
- ✅ Delete demo gyms from Limassol
- ✅ Keep demo gyms in other cities (if they don't have real data)

**If other cities have sufficient real data:**
- ✅ Delete demo gyms from those cities too

**Decision Criteria:**
- Minimum 10-15 real gyms per city to remove demo gyms
- Keep demo gyms if city has < 10 real gyms (for content coverage)

### **3. Deletion Query (After Evaluation)**
```sql
-- Example: Delete demo gyms from Limassol if sufficient real data
DELETE FROM gyms 
WHERE source = 'demo' 
  AND city_id = (SELECT id FROM cities WHERE slug = 'limassol')
  AND (SELECT COUNT(*) FROM gyms WHERE source = 'google_maps_scrape' AND city_id = (SELECT id FROM cities WHERE slug = 'limassol')) >= 50;
```

---

## 📋 Verification Queries

### **Check Demo Gyms by City:**
```sql
SELECT 
    c.name as city,
    COUNT(*) as demo_gym_count
FROM gyms g
JOIN cities c ON g.city_id = c.id
WHERE g.source = 'demo'
GROUP BY c.name
ORDER BY c.name;
```

### **Check Scraped Gyms by City:**
```sql
SELECT 
    c.name as city,
    COUNT(*) as scraped_gym_count
FROM gyms g
JOIN cities c ON g.city_id = c.id
WHERE g.source = 'google_maps_scrape'
GROUP BY c.name
ORDER BY c.name;
```

### **Check Total Gyms by City:**
```sql
SELECT 
    c.name as city,
    COUNT(CASE WHEN g.source = 'demo' THEN 1 END) as demo_count,
    COUNT(CASE WHEN g.source = 'google_maps_scrape' THEN 1 END) as scraped_count,
    COUNT(*) as total_count
FROM gyms g
JOIN cities c ON g.city_id = c.id
GROUP BY c.name
ORDER BY c.name;
```

---

## ✅ Status

**Labeling:** ✅ **COMPLETE**  
**Ready for Bulk Import:** ✅ **YES**

All demo data is now labeled and ready. Proceed with bulk import of 45 scraped Limassol gyms.

