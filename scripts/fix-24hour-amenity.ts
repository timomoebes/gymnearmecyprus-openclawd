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

async function fix24HourAmenity() {
  console.log('🔍 Fixing 24-hour amenity...\n');

  // Step 1: Check if "24/7 Access" amenity exists
  console.log('📋 Step 1: Checking for "24/7 Access" amenity...');
  const { data: existingAmenity, error: checkError } = await supabase
    .from('amenities')
    .select('id, name, slug')
    .or('name.ilike.24/7 Access,name.ilike.24-hour,name.ilike.24 hour')
    .limit(1);

  if (checkError) {
    console.error('❌ Error checking amenities:', checkError);
    return;
  }

  let amenityId: string;
  if (existingAmenity && existingAmenity.length > 0) {
    amenityId = existingAmenity[0].id;
    console.log(`✅ Found existing amenity: "${existingAmenity[0].name}" (ID: ${amenityId})`);
  } else {
    // Create the amenity
    console.log('📝 Creating "24/7 Access" amenity...');
    const { data: newAmenity, error: createError } = await supabase
      .from('amenities')
      .insert({
        name: '24/7 Access',
        slug: '24-7-access',
      })
      .select()
      .single();

    if (createError) {
      console.error('❌ Error creating amenity:', createError);
      return;
    }

    amenityId = newAmenity.id;
    console.log(`✅ Created amenity: "${newAmenity.name}" (ID: ${amenityId})`);
  }

  // Step 2: Find gyms with 24/7 opening hours
  console.log('\n📋 Step 2: Finding gyms with 24/7 opening hours...');
  const { data: allGyms, error: gymsError } = await supabase
    .from('gyms')
    .select('id, name, slug, opening_hours')
    .order('name');

  if (gymsError) {
    console.error('❌ Error fetching gyms:', gymsError);
    return;
  }

  if (!allGyms || allGyms.length === 0) {
    console.log('❌ No gyms found');
    return;
  }

  // Check opening hours for 24/7
  const twentyFourHourGyms = allGyms.filter((gym: any) => {
    const hours = gym.opening_hours;
    if (!hours || typeof hours !== 'object') return false;

    // Check if any day has "24/7" or all days are 24/7
    const dayValues = Object.values(hours) as string[];
    return dayValues.some((day: string) => {
      if (!day) return false;
      const dayLower = day.toLowerCase();
      return dayLower.includes('24/7') || 
             dayLower.includes('24 hours') ||
             dayLower === '24/7' ||
             dayLower === '24 hours';
    });
  });

  console.log(`⏰ Found ${twentyFourHourGyms.length} gyms with 24/7 opening hours:`);
  twentyFourHourGyms.forEach((gym: any) => {
    console.log(`   - ${gym.name} (${gym.slug})`);
  });

  if (twentyFourHourGyms.length === 0) {
    console.log('\n⚠️  No gyms found with 24/7 opening hours in the database.');
    console.log('   You may need to check gym names or manually add the amenity.');
    return;
  }

  // Step 3: Check which gyms already have this amenity
  console.log('\n📋 Step 3: Checking existing amenity assignments...');
  const gymIds = twentyFourHourGyms.map((g: any) => g.id);
  const { data: existingAssignments, error: assignError } = await supabase
    .from('gym_amenities')
    .select('gym_id')
    .eq('amenity_id', amenityId)
    .in('gym_id', gymIds);

  if (assignError) {
    console.error('❌ Error checking assignments:', assignError);
    return;
  }

  const assignedGymIds = new Set((existingAssignments || []).map((a: any) => a.gym_id));
  const gymsToUpdate = twentyFourHourGyms.filter((g: any) => !assignedGymIds.has(g.id));

  console.log(`   Already assigned: ${assignedGymIds.size}`);
  console.log(`   Need assignment: ${gymsToUpdate.length}`);

  if (gymsToUpdate.length === 0) {
    console.log('\n✅ All 24-hour gyms already have the amenity assigned!');
    return;
  }

  // Step 4: Assign amenity to gyms
  console.log('\n📋 Step 4: Assigning amenity to gyms...');
  const assignments = gymsToUpdate.map((gym: any) => ({
    gym_id: gym.id,
    amenity_id: amenityId,
  }));

  const { data: inserted, error: insertError } = await supabase
    .from('gym_amenities')
    .insert(assignments)
    .select();

  if (insertError) {
    console.error('❌ Error assigning amenities:', insertError);
    return;
  }

  console.log(`✅ Successfully assigned "24/7 Access" to ${inserted?.length || 0} gyms!`);
  console.log('\n📋 Updated gyms:');
  inserted?.forEach((assignment: any) => {
    const gym = twentyFourHourGyms.find((g: any) => g.id === assignment.gym_id);
    console.log(`   ✅ ${gym?.name}`);
  });
}

fix24HourAmenity().catch(console.error);
