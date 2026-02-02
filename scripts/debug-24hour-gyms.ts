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

async function debug24HourGyms() {
  console.log('🔍 Searching for 24-hour gyms...\n');

  // Get all gyms with their amenities
  const { data: gyms, error } = await supabase
    .from('gyms')
    .select(`
      id,
      name,
      slug,
      gym_amenities (
        amenity:amenities (name)
      )
    `)
    .order('name');

  if (error) {
    console.error('❌ Error fetching gyms:', error);
    return;
  }

  if (!gyms || gyms.length === 0) {
    console.log('❌ No gyms found');
    return;
  }

  console.log(`📊 Total gyms: ${gyms.length}\n`);

  // Find gyms with 24-hour amenities
  const twentyFourHourGyms = gyms.filter((gym: any) => {
    const amenities = (gym.gym_amenities || []).map((ga: any) => ga.amenity?.name).filter(Boolean);
    return amenities.some((amenity: string) => 
      amenity.toLowerCase().includes('24') || 
      amenity.toLowerCase().includes('24/7')
    );
  });

  console.log(`⏰ Gyms with 24-hour amenities: ${twentyFourHourGyms.length}\n`);

  if (twentyFourHourGyms.length > 0) {
    console.log('📋 24-Hour Gyms:');
    console.log('='.repeat(80));
    twentyFourHourGyms.forEach((gym: any) => {
      const amenities = (gym.gym_amenities || [])
        .map((ga: any) => ga.amenity?.name)
        .filter(Boolean)
        .filter((a: string) => a.toLowerCase().includes('24') || a.toLowerCase().includes('24/7'));
      
      console.log(`\n🏋️  ${gym.name}`);
      console.log(`   Slug: ${gym.slug}`);
      console.log(`   ID: ${gym.id}`);
      console.log(`   Amenities: ${amenities.join(', ')}`);
    });
  } else {
    console.log('❌ No gyms found with 24-hour amenities');
    console.log('\n📋 Checking all unique amenity names:');
    const allAmenities = new Set<string>();
    gyms.forEach((gym: any) => {
      (gym.gym_amenities || []).forEach((ga: any) => {
        if (ga.amenity?.name) {
          allAmenities.add(ga.amenity.name);
        }
      });
    });
    console.log(Array.from(allAmenities).sort().join(', '));
  }
}

debug24HourGyms().catch(console.error);
