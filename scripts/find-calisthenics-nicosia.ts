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

async function findCalisthenicsNicosia() {
  console.log('🔍 Searching for Calisthenics Area Nicosia...\n');

  // Search for gyms with "calisthenics" and "nicosia" in name
  const { data: gyms, error } = await supabase
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
    .or('name.ilike.%calisthenics%,name.ilike.%nicosia%')
    .order('name');

  if (error) {
    console.error('❌ Error fetching gyms:', error);
    return;
  }

  if (!gyms || gyms.length === 0) {
    console.log('❌ No gyms found');
    return;
  }

  console.log(`📊 Found ${gyms.length} potential matches:\n`);

  gyms.forEach((gym: any) => {
    const amenities = (gym.gym_amenities || [])
      .map((ga: any) => ga.amenity?.name)
      .filter(Boolean);
    
    const has24Hour = amenities.some((a: string) => 
      a.toLowerCase().includes('24') || a.toLowerCase().includes('24/7')
    );

    console.log(`🏋️  ${gym.name}`);
    console.log(`   Slug: ${gym.slug}`);
    console.log(`   ID: ${gym.id}`);
    console.log(`   Has 24/7 Access: ${has24Hour ? '✅' : '❌'}`);
    console.log(`   Current Amenities: ${amenities.join(', ') || 'None'}`);
    if (gym.opening_hours) {
      console.log(`   Opening Hours: ${JSON.stringify(gym.opening_hours)}`);
    }
    console.log('');
  });

  // Find the specific gym
  const calisthenicsGym = gyms.find((g: any) => 
    g.name.toLowerCase().includes('calisthenics') && 
    g.name.toLowerCase().includes('nicosia')
  );

  if (!calisthenicsGym) {
    console.log('❌ Calisthenics Area Nicosia not found in results');
    console.log('\n💡 Trying broader search...');
    
    // Try searching all gyms in Nicosia
    const { data: nicosiaGyms } = await supabase
      .from('gyms')
      .select(`
        id,
        name,
        slug,
        opening_hours,
        city:cities!inner (slug)
      `)
      .eq('city.slug', 'nicosia')
      .ilike('name', '%calisthenics%');

    if (nicosiaGyms && nicosiaGyms.length > 0) {
      console.log(`\n📊 Found ${nicosiaGyms.length} calisthenics gym(s) in Nicosia:`);
      nicosiaGyms.forEach((gym: any) => {
        console.log(`   - ${gym.name} (${gym.slug})`);
      });
    }
    return;
  }

  // Check if it needs the 24/7 Access amenity
  const currentAmenities = (calisthenicsGym.gym_amenities || [])
    .map((ga: any) => ga.amenity?.name)
    .filter(Boolean);
  
  const has24Hour = currentAmenities.some((a: string) => 
    a.toLowerCase().includes('24') || a.toLowerCase().includes('24/7')
  );

  // Check opening hours
  const hours = calisthenicsGym.opening_hours;
  const is24HourHours = hours && typeof hours === 'object' && 
    Object.values(hours).some((day: any) => {
      if (!day) return false;
      const dayLower = String(day).toLowerCase();
      return dayLower.includes('00:00-23:59') ||
             dayLower.includes('24/7') ||
             dayLower.includes('24 hours');
    });

  console.log(`\n📋 Analysis for "${calisthenicsGym.name}":`);
  console.log(`   Has 24/7 Access amenity: ${has24Hour ? '✅' : '❌'}`);
  console.log(`   Has 24-hour opening hours: ${is24HourHours ? '✅' : '❌'}`);

  if (!has24Hour && (is24HourHours || calisthenicsGym.name.toLowerCase().includes('24'))) {
    console.log('\n📝 Adding 24/7 Access amenity...');
    
    // Get the 24/7 Access amenity ID
    const { data: amenity } = await supabase
      .from('amenities')
      .select('id')
      .eq('name', '24/7 Access')
      .single();

    if (amenity) {
      const { data: inserted, error: insertError } = await supabase
        .from('gym_amenities')
        .insert({
          gym_id: calisthenicsGym.id,
          amenity_id: amenity.id,
        })
        .select();

      if (insertError) {
        console.error('❌ Error assigning amenity:', insertError);
      } else {
        console.log(`✅ Successfully assigned "24/7 Access" to "${calisthenicsGym.name}"!`);
      }
    } else {
      console.error('❌ 24/7 Access amenity not found in database');
    }
  } else if (has24Hour) {
    console.log('\n✅ Gym already has 24/7 Access amenity assigned!');
  } else {
    console.log('\n⚠️  Gym does not appear to be 24-hour based on opening hours or name.');
  }
}

findCalisthenicsNicosia().catch(console.error);
