# Data Migration Status

## ✅ Completed

### 1. Database Infrastructure
- ✅ All 5 schema migrations applied
- ✅ All 6 cities present in database
- ✅ All 13 specialties present in database
- ✅ All required fields added to gyms table

### 2. Specialty Visibility Configuration
- ✅ Frontend filtering implemented (`HIDDEN_FOR_MVP`)
- ✅ "Hotel Gym" and "Women-Only" hidden on frontend
- ✅ All 9 active specialties visible on homepage and specialty pages
- ✅ Database retains all 13 specialties for future expansion

### 3. Test Migration
- ✅ Successfully inserted test gym: "Powerhouse Gym Limassol"
- ✅ Gym ID: `45be33c8-555c-4e10-b3f0-a42f10e645d3`
- ✅ 2 specialties linked (Bodybuilding, CrossFit)
- ✅ 5 amenities linked (Parking, Showers, Locker Rooms, Personal Training, 24/7 Access, Sauna)
- ✅ Member count set: 2500 (Demo Data, unverified)

## 📋 Next Steps

### Option 1: Use MCP Server (Recommended)
Insert remaining 19 gyms programmatically using Supabase MCP `execute_sql` function.

**Advantages:**
- Immediate execution
- Can verify each gym as it's inserted
- Easy to handle errors

**Process:**
1. For each gym, execute 3 SQL statements:
   - INSERT INTO gyms
   - INSERT INTO gym_specialties
   - INSERT INTO gym_amenities
2. Verify after each gym or batch

### Option 2: Generate Complete SQL Migration File
Create a comprehensive SQL file with all 20 gyms and apply via Supabase Dashboard or CLI.

**Advantages:**
- Single file to review
- Can be version controlled
- Can be applied in one transaction

**Process:**
1. Use the script template in `scripts/generate-full-migration.mjs`
2. Complete with all 20 gyms from `lib/data/gyms.ts`
3. Review the generated SQL
4. Apply via `mcp_supabase_apply_migration` or Supabase Dashboard

## 📊 Migration Data Summary

### Gyms to Migrate: 20 total
- **Featured Gyms (5):** Have member_count set
  - Powerhouse Gym Limassol ✅ (already inserted)
  - Elite Fitness Nicosia
  - Combat Zone Larnaca
  - Aqua Fitness Nicosia
  - Olympus Health Club Nicosia

- **Unclaimed Gyms (15):** No member_count
  - Zen Yoga Studio Limassol
  - BeachFit Paphos
  - Coastal Fitness Limassol
  - Iron Forge CrossFit Nicosia
  - Flex Pilates Studio Limassol
  - Titan Boxing Club Paphos
  - Ocean Breeze Fitness Larnaca
  - Sunset Yoga Ayia Napa
  - Beach Body Fitness Protaras
  - Warrior MMA Nicosia
  - Flex Fitness 24 Limassol
  - Power Lift Gym Paphos
  - Zenith Personal Training Larnaca
  - Reformer Pilates Nicosia
  - Beachside CrossFit Ayia Napa
  - Tropical Fitness Protaras

### Data Mapping

#### Cities (All Present)
- Limassol: `a8d0fd41-5901-4a94-93d3-ecc28166b137`
- Nicosia: `fa1518c7-1daf-4e05-a27b-d6296176ef2e`
- Paphos: `7978d742-eeea-4c7a-b37f-7dceacd4284b`
- Larnaca: `c2208ba4-aea9-4e22-b256-09177179763f`
- Ayia Napa: `209d0e59-baa3-4a6d-88fa-1e908747bdb3`
- Protaras: `7b90b819-b3a9-43ce-ad48-22b016b9686b`

#### Specialties (All Present)
- CrossFit: `ca21235b-511e-40d0-8772-9fb070ab7cf5`
- Bodybuilding: `b3f29ef7-beb7-432b-8553-9cb1638a9e1b`
- Yoga: `ea4205eb-b55b-4b0d-a762-d267ec55f123`
- Pilates: `b85cb2e6-fb93-4167-aa98-d5f4444061b1`
- MMA: `7a0ab816-372c-410c-a373-9e7794cac9e6`
- Boxing: `f6559489-8266-42f2-aea9-89a3a76eeea0`
- Swimming: `6d24f583-a572-4566-a1d1-bb822e9e0091`
- Powerlifting: `8117e3e2-07b3-46fd-b579-4e04020858a1`
- Personal Training: `1b9ecd3b-fe53-4432-9dc0-978f90eaacb3`

#### Amenities (All Present)
- Parking: `3aca2174-3c20-40f6-a2fb-c0b86ee59240`
- Showers: `abc944b3-8552-4824-829d-164993e15a80`
- Locker Room: `b6a4423a-775c-4c45-beca-f7c183c662e2`
- Personal Training: `e933a6e6-d9b5-4afb-ad9e-54ce90ff8fcd`
- 24 Hour Gym: `175c7168-835e-4955-9d15-730b57f9b9ff`
- Sauna: `555d9fca-3c13-43f3-8139-d56606007b43`
- Steam Room: `78b63197-a11d-4081-a2ba-28cffa215a40`
- Pool: `92c13875-919d-4bf3-b619-0c4005b1d95e`
- Cafe: `5d3ced7f-823a-43dd-91cc-45da729b5496`
- Cardio: `030fd487-234b-450b-9080-c48419d88266`
- Weights: `8f9622bd-57de-44d0-8c34-7be3bd921cdc`
- Classes: `10959b05-8018-4780-a7d5-5053086d246a`

## ⚠️ Important Notes

### Member Count Handling
- **Featured gyms:** `member_count` set, `member_count_source: 'Demo Data'`, `member_count_verified: false`
- **Unclaimed gyms:** `member_count: NULL`, `member_count_source: NULL`

### Amenity Mapping
Some amenities in mock data don't exist in database (e.g., "Beach Access", "Outdoor Training Area"). These will be skipped during migration.

### Specialty Mapping
- "Brazilian Jiu-Jitsu" maps to "MMA" specialty
- "Personal Training" can be both specialty and amenity

## 🚀 Ready to Proceed

The infrastructure is ready. The test gym was successfully inserted, confirming the migration format is correct. 

**Next action:** Insert remaining 19 gyms using the same pattern.

