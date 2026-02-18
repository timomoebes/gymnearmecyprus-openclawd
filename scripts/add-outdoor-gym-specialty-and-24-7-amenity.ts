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

async function addOutdoorGymSpecialty() {
  console.log('🚀 Starting migration: Add Outdoor Gym specialty (no dedicated 24/7 amenity)\n');

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

    // Step 2: Get fitness-gym specialty ID (to remove it)
    console.log('\n📋 Step 2: Getting "Fitness/Gym" specialty ID...');
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

    // Step 3: Get all target gyms
    console.log('\n📋 Step 3: Finding target gyms...');
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

    // Step 4: Remove "Fitness/Gym" specialty from all target gyms
    console.log('\n📋 Step 4: Removing "Fitness/Gym" specialty from target gyms...');
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

    // Step 5: Add "Outdoor Gym" specialty to all target gyms
    console.log('\n📋 Step 5: Adding "Outdoor Gym" specialty to target gyms...');
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

    // Step 6: Verification
    console.log('\n📋 Step 6: Verifying changes...');
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
        const has24_7Access = amenities.some(
          (a: string) => a.toLowerCase().includes('24/7 access')
        );
        const hasFitnessGym = specialties.some((s: string) =>
          s.toLowerCase().includes('fitness/gym')
        );

        if (hasOutdoorGym && !hasFitnessGym) {
          console.log(`   ✅ All changes applied correctly!`);
        } else {
          console.log(`   ⚠️  Issues detected:`);
          if (!hasOutdoorGym) console.log(`      - Missing Outdoor Gym specialty`);
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

addOutdoorGymSpecialty().catch(console.error);
