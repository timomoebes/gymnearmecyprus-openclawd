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

async function add24HourToCalisthenicsNicosia() {
  console.log('🔍 Adding 24/7 Access to Calisthenics Area Nicosia...\n');

  // Find the gym by slug
  const { data: gym, error: gymError } = await supabase
    .from('gyms')
    .select(`
      id,
      name,
      slug,
      opening_hours,
      gym_amenities (
        amenity:amenities (name)
      )
    `)
    .eq('slug', 'calisthenics-area-nicosia')
    .single();

  if (gymError || !gym) {
    console.error('❌ Error finding gym:', gymError);
    return;
  }

  console.log(`✅ Found: ${gym.name}`);
  console.log(`   ID: ${gym.id}`);
  console.log(`   Opening Hours: ${JSON.stringify(gym.opening_hours)}`);

  // Check current amenities
  const currentAmenities = (gym.gym_amenities || [])
    .map((ga: any) => ga.amenity?.name)
    .filter(Boolean);
  
  const has24Hour = currentAmenities.some((a: string) => 
    a.toLowerCase().includes('24') || a.toLowerCase().includes('24/7')
  );

  console.log(`   Current Amenities: ${currentAmenities.join(', ') || 'None'}`);
  console.log(`   Has 24/7 Access: ${has24Hour ? '✅' : '❌'}`);

  if (has24Hour) {
    console.log('\n✅ Gym already has 24/7 Access amenity!');
    return;
  }

  // Get the 24/7 Access amenity ID
  console.log('\n📋 Getting 24/7 Access amenity...');
  const { data: amenity, error: amenityError } = await supabase
    .from('amenities')
    .select('id, name')
    .eq('name', '24/7 Access')
    .single();

  if (amenityError || !amenity) {
    console.error('❌ Error finding amenity:', amenityError);
    return;
  }

  console.log(`✅ Found amenity: ${amenity.name} (ID: ${amenity.id})`);

  // Assign the amenity
  console.log('\n📝 Assigning amenity...');
  const { data: inserted, error: insertError } = await supabase
    .from('gym_amenities')
    .insert({
      gym_id: gym.id,
      amenity_id: amenity.id,
    })
    .select();

  if (insertError) {
    console.error('❌ Error assigning amenity:', insertError);
    return;
  }

  console.log(`✅ Successfully assigned "24/7 Access" to "${gym.name}"!`);
  console.log('\n🎉 Done!');
}

add24HourToCalisthenicsNicosia().catch(console.error);
