# Codebase Audit Report
**Date:** 2025-01-26  
**Purpose:** Identify redundancies, simplification opportunities, and documentation gaps

---

## Executive Summary

This audit identified **6 major areas** for improvement:
1. **Script Redundancy** - 18+ city-specific scripts that can be consolidated
2. **Component Duplication** - Map components share duplicate code
3. **Mock Data Legacy** - Unused mock data still in codebase
4. **API Layer Complexity** - Unnecessary wrapper layer with fallback logic
5. **Documentation Gaps** - Missing JSDoc/TSDoc comments
6. **Bug in Search Utility** - Async function called synchronously

---

## 1. Script Redundancy (HIGH PRIORITY)

### Issue
Multiple city-specific scripts with nearly identical code:

**Data Cleaning Scripts (6 files):**
- `gym_data_cleaner.py` (Limassol)
- `gym_data_cleaner_nicosia.py`
- `gym_data_cleaner_larnaca.py`
- `gym_data_cleaner_paphos.py`
- `gym_data_cleaner_ayia_napa.py`
- `gym_data_cleaner_protaras.py`

**Bulk Import Scripts (6 files):**
- `bulk_import_limassol_gyms.py`
- `bulk_import_nicosia_gyms.py`
- `bulk_import_larnaca_gyms.py`
- `bulk_import_paphos_gyms.py`
- `bulk_import_ayia_napa_gyms.py`
- `bulk_import_protaras_gyms.py`

**Description Generation Scripts (6 files):**
- `generate_bulk_gym_descriptions.py`
- `generate_nicosia_gym_descriptions.py`
- `generate_larnaca_gym_descriptions.py`
- `generate_paphos_gym_descriptions.py`
- `generate_ayia_napa_gym_descriptions.py`
- `generate_protaras_gym_descriptions.py`

### Impact
- **Maintenance burden**: Changes must be replicated across 18+ files
- **Code duplication**: ~90% code similarity between city variants
- **Error-prone**: Easy to miss updates in one city's script
- **Storage**: Unnecessary file bloat

### Recommendation
**Consolidate into parameterized scripts:**
1. `scripts/gym_data_cleaner.py` - Accept `--city` parameter
2. `scripts/bulk_import_gyms.py` - Accept `--city` parameter  
3. `scripts/generate_gym_descriptions.py` - Accept `--city` parameter

**Benefits:**
- Single source of truth
- Easier maintenance
- Consistent behavior across cities
- Reduced codebase size (~70% reduction in script files)

---

## 2. Component Duplication (MEDIUM PRIORITY)

### Issue
**Map Components** (`components/gym/GymMap.tsx` and `components/city/CityMap.tsx`):
- Duplicate icon definitions (defaultIcon, featuredIcon)
- Similar map container structure
- Repeated Leaflet setup code

### Impact
- Icon changes require updates in 2 places
- Inconsistent styling if one is updated but not the other

### Recommendation
**Create shared map utilities:**
1. `lib/utils/map-icons.ts` - Centralized icon definitions
2. `components/shared/BaseMap.tsx` - Reusable map container component
3. Refactor GymMap and CityMap to use shared utilities

---

## 3. Mock Data Legacy (LOW PRIORITY)

### Issue
**File:** `lib/data/gyms.ts`
- Contains 5 mock gym objects (lines 12-113)
- Mock helper functions (lines 115-159)
- Fallback logic that may not be needed (lines 161-217)

### Context
The codebase has migrated to Supabase. The mock data appears to be:
1. Test imports from Supabase (comments indicate this)
2. Fallback for when Supabase fails

### Recommendation
**Decision needed:**
- **Option A**: Keep minimal mock data for development/testing
- **Option B**: Remove entirely if Supabase is always available
- **Option C**: Move to separate test fixtures file

**If keeping:** Document why and when fallback is used.

---

## 4. API Layer Complexity (MEDIUM PRIORITY)

### Issue
**Two-layer data access:**
1. `lib/api/gyms.ts` - Direct Supabase queries
2. `lib/data/gyms.ts` - Wrapper with fallback to mock data

**Current flow:**
```
Component → lib/data/gyms.ts → lib/api/gyms.ts → Supabase
                ↓ (fallback)
            Mock data
```

### Impact
- Extra abstraction layer may not be needed
- Unclear when/why fallback is triggered
- Potential confusion about which file to import from

### Recommendation
**Simplify to single layer:**
- Components import directly from `lib/api/gyms.ts`
- Remove `lib/data/gyms.ts` wrapper (or keep only for backward compatibility)
- Document error handling strategy

**Alternative:** If fallback is intentional, document the strategy clearly.

---

## 5. Documentation Gaps (MEDIUM PRIORITY)

### Missing Documentation
1. **Function JSDoc/TSDoc comments:**
   - `lib/utils/opening-hours.ts` - Complex timezone logic needs explanation
   - `lib/api/gyms.ts` - Transform functions need parameter docs
   - `scripts/process_enriched_gyms.py` - Complex parsing logic undocumented

2. **Component Props:**
   - Many components lack prop documentation
   - Unclear what props are required vs optional

3. **Architecture Decisions:**
   - Why two-layer data access?
   - When to use mock data vs Supabase?
   - Script consolidation strategy

### Recommendation
**Add JSDoc/TSDoc to:**
- All exported functions
- All component props
- Complex utility functions
- API transformation functions

**Create:**
- `docs/ARCHITECTURE.md` - System design decisions
- `docs/API.md` - API layer documentation
- `docs/SCRIPTS.md` - Script usage guide

---

## 6. Bug in Search Utility (HIGH PRIORITY)

### Issue
**File:** `lib/utils/search.ts`
**Line 13:** `let results = getAllGyms();`

**Problem:**
- `getAllGyms()` is `async` (returns `Promise<Gym[]>`)
- `searchGyms()` is synchronous (returns `Gym[]`)
- This will return a Promise object, not an array

### Impact
- Search functionality likely broken
- Type mismatch (Promise vs Array)
- Runtime errors when accessing array methods

### Recommendation
**Fix immediately:**
```typescript
// Option 1: Make searchGyms async
export const searchGyms = async (filters: SearchFilters): Promise<Gym[]> => {
  let results = await getAllGyms();
  // ... rest of function
};

// Option 2: Accept gyms as parameter
export const searchGyms = (gyms: Gym[], filters: SearchFilters): Gym[] => {
  let results = gyms;
  // ... rest of function
};
```

---

## 7. Documentation File Cleanup (LOW PRIORITY)

### Issue
**Multiple status/migration documents:**
- `DATABASE_MIGRATION_PLAN.md`
- `DATABASE_MIGRATION_STATUS.md`
- `DATABASE_READY.md`
- `DATABASE_STATUS.md`
- `MIGRATION_READY.md`
- `MIGRATION_STATUS.md`

### Recommendation
**Consolidate into:**
- `docs/DATABASE.md` - Single source of truth for database status
- Archive or remove outdated status files
- Keep only current status in `DEVELOPMENT_STATUS.md`

---

## Priority Action Items

### Immediate (This Week)
1. ✅ Fix search utility bug (`lib/utils/search.ts`)
2. ✅ Add JSDoc comments to critical functions
3. ✅ Document API layer architecture

### Short-term (This Month)
1. Consolidate city-specific scripts (start with one script type)
2. Extract shared map utilities
3. Clean up documentation files

### Long-term (Next Quarter)
1. Evaluate mock data necessity
2. Simplify API layer if fallback not needed
3. Complete script consolidation

---

## Metrics

**Current State:**
- Total script files: 61
- Redundant scripts: ~18
- Components: 28
- Duplicate code blocks: ~5
- Undocumented functions: ~30+

**After Refactoring (Estimated):**
- Total script files: ~43 (30% reduction)
- Redundant scripts: 0
- Duplicate code blocks: 0
- Undocumented functions: <5

---

## Next Steps

1. Review this audit with team
2. Prioritize action items
3. Create refactoring tickets
4. Run code quality tool regularly (see `scripts/code_quality_audit.py`)

