/**
 * Update Kings Brazilian Jiu Jitsu - Rating & Review Count
 * 
 * Updates rating and review_count from Google Places API.
 * 
 * Usage:
 *   npx tsx scripts/update-kings-bjj-rating-review.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

async function findPlaceId(gymName: string, address: string, cityName: string): Promise<string | null> {
  const query = `${gymName}, ${address}, ${cityName}, Cyprus`;
  const url = `https://places.googleapis.com/v1/places:searchText`;
  
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

async function updateKingsBJJ() {
  console.log('🔄 Updating Kings Brazilian Jiu Jitsu...\n');

  // Fetch gym
  const { data: gym, error: gymError } = await supabaseAdmin
    .from('gyms')
    .select('id, name, address, rating, review_count, city_id, cities!inner(name)')
    .ilike('name', '%Kings Brazilian Jiu Jitsu%')
    .single();

  if (gymError || !gym) {
    console.error('❌ Gym not found:', gymError?.message);
    return;
  }

  const cityName = (gym.cities as any)?.name || '';
  console.log(`✅ Found: ${gym.name}`);
  console.log(`   Current: ${gym.rating || 'N/A'}⭐, ${gym.review_count || 'N/A'} reviews\n`);

  // Get Place ID
  const placeId = await findPlaceId(gym.name, gym.address, cityName);
  if (!placeId) {
    console.error('❌ Place ID not found');
    return;
  }

  // Get Place Details
  const details = await getPlaceDetails(placeId);
  if (!details || details.rating === null || details.userRatingCount === null) {
    console.error('❌ Could not fetch rating/review data');
    return;
  }

  console.log(`📊 Google Places API:`);
  console.log(`   Rating: ${details.rating.toFixed(1)}⭐`);
  console.log(`   Review Count: ${details.userRatingCount}\n`);

  // Update database
  const { error: updateError } = await supabaseAdmin
    .from('gyms')
    .update({
      rating: details.rating,
      review_count: details.userRatingCount,
      updated_at: new Date().toISOString()
    })
    .eq('id', gym.id);

  if (updateError) {
    console.error('❌ Update error:', updateError.message);
    return;
  }

  console.log('✅ Successfully updated!');
  console.log(`   Rating: ${gym.rating || 'N/A'} → ${details.rating.toFixed(1)}`);
  console.log(`   Review Count: ${gym.review_count || 'N/A'} → ${details.userRatingCount}`);
}

updateKingsBJJ().catch(console.error);
