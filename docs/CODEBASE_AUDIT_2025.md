# Comprehensive Codebase Audit Report
**Date:** November 23, 2025  
**Auditor:** Automated Code Quality Tool + Manual Review  
**Purpose:** Identify redundancies, simplifications, and documentation gaps

---

## Executive Summary

This comprehensive audit identified **7 major areas** for improvement:

1. **Script Redundancy** (HIGH) - 18+ city-specific scripts that can be consolidated
2. **Component Duplication** (MEDIUM) - Map components share duplicate icon definitions
3. **Data Layer Complexity** (MEDIUM) - Two-layer data access with unclear fallback strategy
4. **Documentation Gaps** (MEDIUM) - 51+ undocumented functions/components
5. **Code Duplication** (MEDIUM) - 19 duplicate function signatures across files
6. **Unused/Legacy Code** (LOW) - Mock data and fallback logic may be unnecessary
7. **Missing Type Safety** (LOW) - Some `any` types in API transformations

---

## 1. Script Redundancy (HIGH PRIORITY) ⚠️

### Issue
**18+ city-specific scripts** with ~90% code similarity:

#### Data Cleaning Scripts (6 files)
- `gym_data_cleaner.py` (Limassol - base)
- `gym_data_cleaner_nicosia.py`
- `gym_data_cleaner_larnaca.py`
- `gym_data_cleaner_paphos.py`
- `gym_data_cleaner_ayia_napa.py`
- `gym_data_cleaner_protaras.py`

**Impact:** Only difference is city name and neighborhood lists. All logic is identical.

#### Bulk Import Scripts (6 files)
- `bulk_import_limassol_gyms.py`
- `bulk_import_nicosia_gyms.py`
- `bulk_import_larnaca_gyms.py`
- `bulk_import_paphos_gyms.py`
- `bulk_import_ayia_napa_gyms.py`
- `bulk_import_protaras_gyms.py`

**Impact:** Only difference is input CSV file path. All processing logic is identical.

#### Description Generation Scripts (6 files)
- `generate_bulk_gym_descriptions.py` (base)
- `generate_nicosia_gym_descriptions.py`
- `generate_larnaca_gym_descriptions.py`
- `generate_paphos_gym_descriptions.py`
- `generate_ayia_napa_gym_descriptions.py`
- `generate_protaras_gym_descriptions.py`

**Impact:** Only difference is input/output file paths. All generation logic is identical.

### Recommendation
**Consolidate into 3 parameterized scripts:**

1. **`scripts/gym_data_cleaner.py`** - Accept `--city` parameter
   ```bash
   python scripts/gym_data_cleaner.py --city limassol
   python scripts/gym_data_cleaner.py --city nicosia
   ```

2. **`scripts/bulk_import_gyms.py`** - Accept `--city` parameter
   ```bash
   python scripts/bulk_import_gyms.py --city limassol
   ```

3. **`scripts/generate_gym_descriptions.py`** - Accept `--city` parameter
   ```bash
   python scripts/generate_gym_descriptions.py --city limassol
   ```

**Benefits:**
- Single source of truth for each script type
- Easier maintenance (fix once, works for all cities)
- Consistent behavior across cities
- **~70% reduction in script files** (from 18+ to 3)
- Reduced codebase size (~2000+ lines removed)

**Migration Strategy:**
1. Create parameterized versions
2. Test with one city
3. Migrate remaining cities
4. Archive old scripts in `scripts/archive/`
5. Update documentation

---

## 2. Component Duplication (MEDIUM PRIORITY) ⚠️

### Issue
**Map Components** (`components/gym/GymMap.tsx` and `components/city/CityMap.tsx`):

**Duplicate Code:**
- Icon definitions (lines 10-28 in both files)
  - `defaultIcon` - Identical definition
  - `featuredIcon` - Identical definition
- Map container structure (similar JSX)
- TileLayer configuration (identical)

**Files:**
- `components/gym/GymMap.tsx` (lines 10-28)
- `components/city/CityMap.tsx` (lines 19-37)

### Impact
- Icon changes require updates in 2 places
- Inconsistent styling if one is updated but not the other
- Maintenance burden
- Code bloat (~40 lines duplicated)

### Recommendation
**Create shared map utilities:**

1. **`lib/utils/map-icons.ts`** - Centralized icon definitions
   ```typescript
   export const defaultIcon = new Icon({...});
   export const featuredIcon = new Icon({...});
   ```

2. **`components/shared/BaseMap.tsx`** - Reusable map container (optional)
   - Or just extract icons for now

3. **Refactor both components** to import from shared utilities

**Benefits:**
- Single source of truth for icons
- Consistent styling
- Easier maintenance
- Reduced code duplication

---

## 3. Data Layer Complexity (MEDIUM PRIORITY) ⚠️

### Issue
**Two-layer data access pattern:**

```
Component → lib/data/gyms.ts → lib/api/gyms.ts → Supabase
                ↓ (fallback)
            Mock data (5 gyms)
```

**Current Structure:**
- `lib/api/gyms.ts` - Direct Supabase queries (345 lines)
- `lib/data/gyms.ts` - Wrapper with fallback to mock data (221 lines)

**Problems:**
1. **Unclear fallback strategy** - When does fallback trigger?
2. **Mock data still present** - 5 mock gyms (lines 12-113 in `lib/data/gyms.ts`)
3. **Double abstraction** - Components import from `lib/data`, which imports from `lib/api`
4. **Error handling** - Silent fallback may hide real issues

### Analysis
**Mock data usage:**
- Only 5 test gyms remain (from initial Supabase imports)
- Fallback logic catches errors and uses mock data
- All production code uses Supabase successfully

### Recommendation
**Option A: Simplify to single layer (Recommended)**
- Components import directly from `lib/api/gyms.ts`
- Remove `lib/data/gyms.ts` wrapper
- Remove mock data (or move to test fixtures)
- Add proper error handling/error boundaries

**Option B: Keep fallback but document clearly**
- Document when/why fallback is used
- Add logging for fallback triggers
- Consider if fallback is actually needed in production

**Benefits:**
- Clearer data flow
- Reduced complexity
- Better error visibility
- Single source of truth

---

## 4. Documentation Gaps (MEDIUM PRIORITY) 📝

### Issue
**51+ undocumented functions/components** identified by audit tool.

### Missing Documentation

#### TypeScript/TSX Files
- `lib/utils/opening-hours.ts` - Complex timezone logic needs explanation
  - `getCyprusTime()` - No JSDoc
  - `parseTimeToMinutes()` - No JSDoc
  - `isGymOpenNow()` - No JSDoc
- `lib/api/gyms.ts` - Transform functions need parameter docs
  - `transformGymFromDB()` - No JSDoc (complex function)
- `lib/utils/schema.ts` - Schema generation functions undocumented
- Many React components lack prop documentation

#### Python Scripts
- `scripts/process_enriched_gyms.py` - Complex parsing logic undocumented
  - `parse_pricing()` - No docstring
  - `generate_description()` - No docstring
  - `parse_opening_hours()` - No docstring

### Recommendation
**Add JSDoc/TSDoc to:**
1. All exported functions
2. All component props (using `@param` tags)
3. Complex utility functions (especially timezone/parsing logic)
4. API transformation functions

**Add Python docstrings to:**
1. All public functions
2. Complex parsing/transformation functions
3. Script entry points

**Example:**
```typescript
/**
 * Gets the current time in Cyprus timezone (Europe/Nicosia).
 * Handles both EET (UTC+2) and EEST (UTC+3) automatically.
 * 
 * @returns Object containing day, hours, minutes, and time in minutes
 * @example
 * const { day, hours, minutes } = getCyprusTime();
 */
function getCyprusTime(): { day: number; hours: number; minutes: number; timeInMinutes: number }
```

---

## 5. Code Duplication (MEDIUM PRIORITY) ⚠️

### Issue
**19 duplicate function signatures** found across files.

### Examples

#### 1. `generateStaticParams()` - Found in 3 locations
- `app/cities/[city]/page.tsx:22`
- `app/gyms/[slug]/page.tsx`
- `app/specialties/[specialty]/page.tsx`

**Recommendation:** Extract to shared utility if logic is identical.

#### 2. Helper functions in bulk import scripts
- Found in 7 locations (one per city script)
- Functions like `format_gym_data()`, `clean_phone()`, etc.

**Recommendation:** Already addressed by script consolidation (see #1).

### Impact
- Maintenance burden
- Risk of inconsistent behavior
- Code bloat

---

## 6. Unused/Legacy Code (LOW PRIORITY) 📦

### Issue
**Mock data and fallback logic** may be unnecessary.

**Files:**
- `lib/data/gyms.ts` - 5 mock gyms (lines 12-113)
- Fallback functions (lines 115-159)
- Fallback logic in unified functions (lines 161-217)

### Analysis
- Supabase is production-ready
- All gyms are in database
- Fallback has never been triggered in production (based on console logs)

### Recommendation
**Decision needed:**
- **Option A:** Remove mock data entirely
- **Option B:** Move to `lib/data/__fixtures__/mock-gyms.ts` for testing
- **Option C:** Keep minimal mock data for development (document why)

**If keeping:** Add clear comments explaining when/why fallback is used.

---

## 7. Missing Type Safety (LOW PRIORITY) 🔒

### Issue
**`any` types in API transformations:**

**File:** `lib/api/gyms.ts`
- `transformGymFromDB(dbGym: any, ...)` - Uses `any` type
- Database gym type not defined

### Recommendation
**Create proper types:**
```typescript
interface DatabaseGym {
  id: string;
  name: string;
  slug: string;
  // ... all database fields
}

function transformGymFromDB(dbGym: DatabaseGym, ...): Gym {
  // ...
}
```

**Benefits:**
- Type safety
- Better IDE autocomplete
- Catch errors at compile time

---

## Priority Action Plan

### Immediate (This Week)
1. ✅ **Extract shared map icons** - Create `lib/utils/map-icons.ts`
2. ✅ **Add JSDoc to critical functions** - `opening-hours.ts`, `gyms.ts`
3. ✅ **Document API layer architecture** - Create `docs/ARCHITECTURE.md`

### Short-term (This Month)
1. **Consolidate city-specific scripts** - Start with one script type
   - Priority: `bulk_import_*_gyms.py` (most used)
2. **Simplify data layer** - Remove or document fallback strategy
3. **Add type definitions** - Replace `any` with proper types

### Long-term (Next Quarter)
1. **Complete script consolidation** - All 3 script types
2. **Remove unused mock data** - Or move to test fixtures
3. **Complete documentation** - All functions/components

---

## Metrics

### Current State
- **Total script files:** 61
- **Redundant scripts:** ~18
- **Components:** 28
- **Duplicate code blocks:** ~19
- **Undocumented functions:** 51+
- **Lines of duplicated code:** ~500+

### After Refactoring (Estimated)
- **Total script files:** ~43 (30% reduction)
- **Redundant scripts:** 0
- **Duplicate code blocks:** 0
- **Undocumented functions:** <5
- **Lines of duplicated code:** ~0

---

## Automated Audit Tool

The codebase includes an automated audit tool that can be run regularly:

```bash
# Run audit
python scripts/code_quality_audit.py

# Verbose output
python scripts/code_quality_audit.py --verbose
```

**Output:**
- Console report with issues grouped by severity
- JSON report saved to `docs/code_quality_report.json`
- Exit code 1 if critical errors found

**Integration:**
- Can be added to pre-commit hooks
- Can be run in CI/CD pipeline
- Should be run before major commits

---

## Next Steps

1. **Review this audit** with team/stakeholders
2. **Prioritize action items** based on impact
3. **Create refactoring tickets** for each item
4. **Run audit tool regularly** (weekly or before commits)
5. **Track progress** against metrics

---

## Related Documentation

- `docs/CODEBASE_AUDIT.md` - Previous audit (January 2025)
- `docs/CODE_QUALITY_TOOL.md` - Audit tool documentation
- `README.md` - Project overview
- `DEVELOPMENT_STATUS.md` - Current project status

