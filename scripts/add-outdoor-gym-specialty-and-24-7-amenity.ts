import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TARGET_GYM_SLUGS = [
  'calisthenics-area-nicosia',
  'municipality-gym-paphos',
  'outdoor-calisthenics-workout-spot-larnaca',
];

async function addOutdoorGymSpecialtyAnd24_7Amenity() {
  console.log('🚀 Starting migration: Add Outdoor Gym specialty and 24/7 amenity\n');

  try {
    // Step 1: Create "Outdoor gym" specialty
    console.log('📋 Step 1: Creating "Outdoor gym" specialty...');
    const { data: outdoorGymSpecialty, error: specialtyError } = await supabase
      .from('specialties')
      .upsert(
        {
          name: 'Outdoor Gym',
          slug: 'outdoor-gym',
          description: 'Outdoor fitness facilities and calisthenics parks offering free or public access to exercise equipment. Perfect for bodyweight training, calisthenics, and outdoor workouts.',
          icon: 'activity',
        },
        {
          onConflict: 'slug',
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (specialtyError) {
      // If upsert fails, try insert (might already exist)
      const { data: existingSpecialty } = await supabase
        .from('specialties')
        .select('id, name, slug')
        .eq('slug', 'outdoor-gym')
        .single();

      if (existingSpecialty) {
        console.log(`✅ Specialty already exists: ${existingSpecialty.name} (ID: ${existingSpecialty.id})`);
        var outdoorGymSpecialtyId = existingSpecialty.id;
      } else {
        console.error('❌ Error creating specialty:', specialtyError);
        throw specialtyError;
      }
    } else {
      console.log(`✅ Created specialty: ${outdoorGymSpecialty.name} (ID: ${outdoorGymSpecialty.id})`);
      var outdoorGymSpecialtyId = outdoorGymSpecialty.id;
    }

    // Step 2: Create "24/7" amenity
    console.log('\n📋 Step 2: Creating "24/7" amenity...');
    const { data: amenity24_7, error: amenityError } = await supabase
      .from('amenities')
      .upsert(
        {
          name: '24/7',
          slug: '24-7',
          icon: 'clock',
        },
        {
          onConflict: 'slug',
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (amenityError) {
      // If upsert fails, try to find existing
      const { data: existingAmenity } = await supabase
        .from('amenities')
        .select('id, name, slug')
        .eq('slug', '24-7')
        .single();

      if (existingAmenity) {
        console.log(`✅ Amenity already exists: ${existingAmenity.name} (ID: ${existingAmenity.id})`);
        var amenity24_7Id = existingAmenity.id;
      } else {
        console.error('❌ Error creating amenity:', amenityError);
        throw amenityError;
      }
    } else {
      console.log(`✅ Created amenity: ${amenity24_7.name} (ID: ${amenity24_7.id})`);
      var amenity24_7Id = amenity24_7.id;
    }

    // Step 3: Get fitness-gym specialty ID (to remove it)
    console.log('\n📋 Step 3: Getting "Fitness/Gym" specialty ID...');
    const { data: fitnessGymSpecialty, error: fitnessGymError } = await supabase
      .from('specialties')
      .select('id, name, slug')
      .eq('slug', 'fitness-gym')
      .single();

    if (fitnessGymError || !fitnessGymSpecialty) {
      console.error('❌ Error finding fitness-gym specialty:', fitnessGymError);
      throw fitnessGymError || new Error('Fitness-gym specialty not found');
    }

    console.log(`✅ Found specialty: ${fitnessGymSpecialty.name} (ID: ${fitnessGymSpecialty.id})`);

    // Step 4: Get all target gyms
    console.log('\n📋 Step 4: Finding target gyms...');
    const { data: gyms, error: gymsError } = await supabase
      .from('gyms')
      .select('id, name, slug')
      .in('slug', TARGET_GYM_SLUGS);

    if (gymsError) {
      console.error('❌ Error finding gyms:', gymsError);
      throw gymsError;
    }

    if (!gyms || gyms.length === 0) {
      console.error('❌ No gyms found with the specified slugs');
      return;
    }

    console.log(`✅ Found ${gyms.length} gym(s):`);
    gyms.forEach((gym) => {
      console.log(`   - ${gym.name} (${gym.slug})`);
    });

    // Step 5: Remove "fitness-gym" specialty from all target gyms
    console.log('\n📋 Step 5: Removing "Fitness/Gym" specialty from target gyms...');
    const gymIds = gyms.map((g) => g.id);
    const { error: deleteSpecialtyError } = await supabase
      .from('gym_specialties')
      .delete()
      .in('gym_id', gymIds)
      .eq('specialty_id', fitnessGymSpecialty.id);

    if (deleteSpecialtyError) {
      console.error('❌ Error removing fitness-gym specialty:', deleteSpecialtyError);
      throw deleteSpecialtyError;
    }

    console.log(`✅ Removed "Fitness/Gym" specialty from ${gyms.length} gym(s)`);

    // Step 6: Add "outdoor-gym" specialty to all target gyms
    console.log('\n📋 Step 6: Adding "Outdoor Gym" specialty to target gyms...');
    const specialtyInserts = gymIds.map((gymId) => ({
      gym_id: gymId,
      specialty_id: outdoorGymSpecialtyId,
    }));

    const { error: insertSpecialtyError } = await supabase
      .from('gym_specialties')
      .upsert(specialtyInserts, {
        onConflict: 'gym_id,specialty_id',
        ignoreDuplicates: false,
      });

    if (insertSpecialtyError) {
      console.error('❌ Error adding outdoor-gym specialty:', insertSpecialtyError);
      throw insertSpecialtyError;
    }

    console.log(`✅ Added "Outdoor Gym" specialty to ${gyms.length} gym(s)`);

    // Step 7: Add "24/7" amenity to all target gyms
    console.log('\n📋 Step 7: Adding "24/7" amenity to target gyms...');
    const amenityInserts = gymIds.map((gymId) => ({
      gym_id: gymId,
      amenity_id: amenity24_7Id,
    }));

    const { error: insertAmenityError } = await supabase
      .from('gym_amenities')
      .upsert(amenityInserts, {
        onConflict: 'gym_id,amenity_id',
        ignoreDuplicates: false,
      });

    if (insertAmenityError) {
      console.error('❌ Error adding 24/7 amenity:', insertAmenityError);
      throw insertAmenityError;
    }

    console.log(`✅ Added "24/7" amenity to ${gyms.length} gym(s)`);

    // Step 8: Verification
    console.log('\n📋 Step 8: Verifying changes...');
    const { data: verificationData, error: verificationError } = await supabase
      .from('gyms')
      .select(`
        id,
        name,
        slug,
        gym_specialties (
          specialty:specialties (name, slug)
        ),
        gym_amenities (
          amenity:amenities (name, slug)
        )
      `)
      .in('slug', TARGET_GYM_SLUGS);

    if (verificationError) {
      console.error('❌ Error verifying changes:', verificationError);
    } else {
      console.log('\n✅ Verification Results:');
      verificationData?.forEach((gym: any) => {
        const specialties = (gym.gym_specialties || [])
          .map((gs: any) => gs.specialty?.name)
          .filter(Boolean);
        const amenities = (gym.gym_amenities || [])
          .map((ga: any) => ga.amenity?.name)
          .filter(Boolean);

        console.log(`\n   ${gym.name}:`);
        console.log(`   - Specialties: ${specialties.join(', ') || 'None'}`);
        console.log(`   - Amenities: ${amenities.join(', ') || 'None'}`);

        const hasOutdoorGym = specialties.some((s: string) =>
          s.toLowerCase().includes('outdoor')
        );
        const has24_7 = amenities.some(
          (a: string) => a.includes('24') || a.includes('24/7')
        );
        const hasFitnessGym = specialties.some((s: string) =>
          s.toLowerCase().includes('fitness/gym')
        );

        if (hasOutdoorGym && has24_7 && !hasFitnessGym) {
          console.log(`   ✅ All changes applied correctly!`);
        } else {
          console.log(`   ⚠️  Issues detected:`);
          if (!hasOutdoorGym) console.log(`      - Missing Outdoor Gym specialty`);
          if (!has24_7) console.log(`      - Missing 24/7 amenity`);
          if (hasFitnessGym) console.log(`      - Still has Fitness/Gym specialty`);
        }
      });
    }

    console.log('\n🎉 Migration completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

addOutdoorGymSpecialtyAnd24_7Amenity().catch(console.error);
