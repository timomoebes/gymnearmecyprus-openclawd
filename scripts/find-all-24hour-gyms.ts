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

function is24Hour(hours: any): boolean {
  if (!hours || typeof hours !== 'object') return false;
  
  const dayValues = Object.values(hours) as string[];
  if (dayValues.length === 0) return false;

  // Check if all days are 24 hours (00:00-23:59 or similar)
  const allDays24Hour = dayValues.every((day: string) => {
    if (!day) return false;
    const dayLower = day.toLowerCase();
    return dayLower.includes('00:00-23:59') ||
           dayLower.includes('24/7') ||
           dayLower.includes('24 hours') ||
           dayLower === '24/7';
  });

  return allDays24Hour;
}

async function findAll24HourGyms() {
  console.log('🔍 Finding all 24-hour gyms...\n');

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

  // Find gyms with 24-hour opening hours
  const twentyFourHourGyms = allGyms.filter((gym: any) => {
    // Check name
    const nameLower = gym.name.toLowerCase();
    const has24InName = nameLower.includes('24') || 
                        nameLower.includes('24/7') ||
                        nameLower.includes('24-hour') ||
                        nameLower.includes('24 hour');
    
    // Check opening hours
    const has24HourHours = is24Hour(gym.opening_hours);
    
    return has24InName || has24HourHours;
  });

  console.log(`⏰ Found ${twentyFourHourGyms.length} potential 24-hour gyms:\n`);
  
  if (twentyFourHourGyms.length > 0) {
    twentyFourHourGyms.forEach((gym: any) => {
      const nameLower = gym.name.toLowerCase();
      const has24InName = nameLower.includes('24') || 
                          nameLower.includes('24/7') ||
                          nameLower.includes('24-hour') ||
                          nameLower.includes('24 hour');
      const has24HourHours = is24Hour(gym.opening_hours);
      
      console.log(`🏋️  ${gym.name}`);
      console.log(`   Slug: ${gym.slug}`);
      console.log(`   ID: ${gym.id}`);
      console.log(`   Has "24" in name: ${has24InName ? '✅' : '❌'}`);
      console.log(`   Has 24h hours: ${has24HourHours ? '✅' : '❌'}`);
      if (gym.opening_hours) {
        console.log(`   Opening Hours: ${JSON.stringify(gym.opening_hours)}`);
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
      const gymIds = twentyFourHourGyms.map((g: any) => g.id);
      
      // Check existing assignments
      const { data: existing } = await supabase
        .from('gym_amenities')
        .select('gym_id')
        .eq('amenity_id', amenity.id)
        .in('gym_id', gymIds);

      const assignedIds = new Set((existing || []).map((a: any) => a.gym_id));
      const toAssign = twentyFourHourGyms
        .filter((g: any) => !assignedIds.has(g.id))
        .map((gym: any) => ({
          gym_id: gym.id,
          amenity_id: amenity.id,
        }));

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
    console.log('❌ No 24-hour gyms found');
  }
}

findAll24HourGyms().catch(console.error);
