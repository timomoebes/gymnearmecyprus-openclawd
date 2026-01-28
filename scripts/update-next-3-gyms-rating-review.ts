/**
 * Update Next 3 Gyms - Rating & Review Count
 * 
 * Updates the next 3 gyms alphabetically after Kings Brazilian Jiu Jitsu.
 * 
 * Usage:
 *   npx tsx scripts/update-next-3-gyms-rating-review.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

async function findPlaceId(gymName: string, address: string, cityName: string): Promise<string | null> {
  const query = `${gymName}, ${address}, ${cityName}, Cyprus`;
  const url = `https://places.googleapis.com/v1/places:searchText`;
  
  await new Promise(resolve => setTimeout(resolve, 1100));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'places.id'
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: 1
    })
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.places?.[0]?.id || null;
}

async function getPlaceDetails(placeId: string): Promise<{ rating: number | null; userRatingCount: number | null } | null> {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  
  await new Promise(resolve => setTimeout(resolve, 1100));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'id,rating,userRatingCount'
    }
  });

  if (!response.ok) return null;
  const data = await response.json();
  return {
    rating: data.rating || null,
    userRatingCount: data.userRatingCount || null
  };
}

async function updateNext3Gyms() {
  console.log('🔄 Updating next 3 gyms...\n');

  // Find Kings BJJ
  const { data: kingsBJJ } = await supabaseAdmin
    .from('gyms')
    .select('id, name')
    .ilike('name', '%Kings Brazilian Jiu Jitsu%')
    .single();

  if (!kingsBJJ) {
    console.error('❌ Kings BJJ not found');
    return;
  }

  // Find next 3 gyms
  const { data: nextGyms, error } = await supabaseAdmin
    .from('gyms')
    .select('id, name, address, rating, review_count, city_id, cities!inner(name)')
    .gt('name', kingsBJJ.name)
    .order('name', { ascending: true })
    .limit(3);

  if (error || !nextGyms || nextGyms.length === 0) {
    console.error('❌ Error fetching gyms:', error?.message);
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < nextGyms.length; i++) {
    const gym = nextGyms[i];
    const cityName = (gym.cities as any)?.name || '';
    
    process.stdout.write(`[${i + 1}/3] ${gym.name.substring(0, 40).padEnd(40)} ... `);

    const placeId = await findPlaceId(gym.name, gym.address, cityName);
    if (!placeId) {
      console.log('❌ Place ID not found');
      errorCount++;
      continue;
    }

    const details = await getPlaceDetails(placeId);
    if (!details || details.rating === null || details.userRatingCount === null) {
      console.log('⚠️  No data');
      errorCount++;
      continue;
    }

    const { error: updateError } = await supabaseAdmin
      .from('gyms')
      .update({
        rating: details.rating,
        review_count: details.userRatingCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', gym.id);

    if (updateError) {
      console.log(`❌ ${updateError.message}`);
      errorCount++;
    } else {
      console.log(`✅ ${details.rating.toFixed(1)}⭐ ${details.userRatingCount} reviews`);
      successCount++;
    }
  }

  console.log();
  console.log(`✅ Updated: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
}

updateNext3Gyms().catch(console.error);
