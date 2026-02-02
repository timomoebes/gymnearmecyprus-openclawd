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

async function find24HourGymsByName() {
  console.log('🔍 Finding potential 24-hour gyms by name...\n');

  // Get all gyms
  const { data: allGyms, error } = await supabase
    .from('gyms')
    .select('id, name, slug, opening_hours')
    .order('name');

  if (error) {
    console.error('❌ Error fetching gyms:', error);
    return;
  }

  if (!allGyms || allGyms.length === 0) {
    console.log('❌ No gyms found');
    return;
  }

  // Find gyms with "24" in name
  const potential24HourGyms = allGyms.filter((gym: any) => {
    const nameLower = gym.name.toLowerCase();
    return nameLower.includes('24') || 
           nameLower.includes('24/7') ||
           nameLower.includes('24-hour') ||
           nameLower.includes('24 hour');
  });

  console.log(`⏰ Found ${potential24HourGyms.length} gyms with "24" in name:\n`);
  
  if (potential24HourGyms.length > 0) {
    potential24HourGyms.forEach((gym: any) => {
      console.log(`🏋️  ${gym.name}`);
      console.log(`   Slug: ${gym.slug}`);
      console.log(`   ID: ${gym.id}`);
      if (gym.opening_hours) {
        console.log(`   Opening Hours: ${JSON.stringify(gym.opening_hours)}`);
      } else {
        console.log(`   Opening Hours: Not set`);
      }
      console.log('');
    });

    // Get the 24/7 Access amenity ID
    const { data: amenity } = await supabase
      .from('amenities')
      .select('id')
      .eq('name', '24/7 Access')
      .single();

    if (amenity) {
      console.log(`\n📋 Assigning "24/7 Access" amenity to these gyms...`);
      const assignments = potential24HourGyms.map((gym: any) => ({
        gym_id: gym.id,
        amenity_id: amenity.id,
      }));

      // Check existing assignments first
      const gymIds = potential24HourGyms.map((g: any) => g.id);
      const { data: existing } = await supabase
        .from('gym_amenities')
        .select('gym_id')
        .eq('amenity_id', amenity.id)
        .in('gym_id', gymIds);

      const assignedIds = new Set((existing || []).map((a: any) => a.gym_id));
      const toAssign = assignments.filter((a: any) => !assignedIds.has(a.gym_id));

      if (toAssign.length > 0) {
        const { data: inserted, error: insertError } = await supabase
          .from('gym_amenities')
          .insert(toAssign)
          .select();

        if (insertError) {
          console.error('❌ Error assigning amenities:', insertError);
        } else {
          console.log(`✅ Successfully assigned to ${inserted?.length || 0} gyms!`);
        }
      } else {
        console.log('✅ All gyms already have the amenity assigned!');
      }
    }
  } else {
    console.log('❌ No gyms found with "24" in name');
  }
}

find24HourGymsByName().catch(console.error);
