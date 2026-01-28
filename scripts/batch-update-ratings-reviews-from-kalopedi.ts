/**
 * Batch Update Ratings & Reviews from Kalopedi Gym onward
 * 
 * Continues updating rating and review_count for all gyms alphabetically
 * starting from after Kalopedi Gym (Kalopedi Gym is correct, so we skip it).
 * 
 * Usage:
 *   npx tsx scripts/batch-update-ratings-reviews-from-kalopedi.ts
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

async function batchUpdateFromKalopedi() {
  console.log('='.repeat(80));
  console.log('BATCH UPDATE RATINGS & REVIEWS - From Kalopedi Gym onward');
  console.log('='.repeat(80));
  console.log();

  if (!GOOGLE_MAPS_API_KEY) {
    console.error('❌ GOOGLE_MAPS_API_KEY not found');
    return;
  }

  // Find Kalopedi Gym
  const { data: kalopediGym, error: kalopediError } = await supabaseAdmin
    .from('gyms')
    .select('id, name')
    .ilike('name', '%Kalopedi Gym%')
    .single();

  if (kalopediError || !kalopediGym) {
    console.error('❌ Kalopedi Gym not found:', kalopediError?.message);
    return;
  }

  console.log(`📍 Starting from after: ${kalopediGym.name}\n`);

  // Fetch all gyms after Kalopedi Gym alphabetically
  const { data: gyms, error: gymsError } = await supabaseAdmin
    .from('gyms')
    .select('id, name, address, rating, review_count, city_id, cities!inner(name)')
    .gt('name', kalopediGym.name)
    .order('name', { ascending: true });

  if (gymsError) {
    console.error('❌ Error fetching gyms:', gymsError.message);
    return;
  }

  if (!gyms || gyms.length === 0) {
    console.log('✅ No gyms found after Kalopedi Gym');
    return;
  }

  console.log(`✅ Found ${gyms.length} gyms to update`);
  console.log(`   First: ${gyms[0].name}`);
  console.log(`   Last: ${gyms[gyms.length - 1].name}`);
  console.log();

  console.log('🌐 Processing gyms with Google Places API...');
  console.log(`   Rate limit: ~1 request/second per API`);
  console.log(`   Estimated time: ~${Math.ceil((gyms.length * 2) / 60)} minutes`);
  console.log();

  let successCount = 0;
  let errorCount = 0;
  let skipCount = 0;

  for (let i = 0; i < gyms.length; i++) {
    const gym = gyms[i];
    const cityName = (gym.cities as any)?.name || '';
    
    process.stdout.write(`   [${i + 1}/${gyms.length}] ${gym.name.substring(0, 45).padEnd(45)} ... `);

    const placeId = await findPlaceId(gym.name, gym.address, cityName);
    if (!placeId) {
      console.log('❌ Place ID not found');
      errorCount++;
      continue;
    }

    const details = await getPlaceDetails(placeId);
    if (!details || details.rating === null || details.userRatingCount === null) {
      console.log('⚠️  No rating/review data');
      skipCount++;
      continue;
    }

    // Check if update needed
    const currentRating = gym.rating ? parseFloat(gym.rating as any) : null;
    const currentReviewCount = gym.review_count || null;
    const ratingChanged = currentRating === null || Math.abs(currentRating - details.rating) > 0.01;
    const reviewCountChanged = currentReviewCount === null || currentReviewCount !== details.userRatingCount;

    if (!ratingChanged && !reviewCountChanged) {
      console.log('✓ No change');
      skipCount++;
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
  console.log('='.repeat(80));
  console.log('UPDATE SUMMARY');
  console.log('='.repeat(80));
  console.log(`   Total processed: ${gyms.length}`);
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ⚠️  No changes needed: ${skipCount}`);
  console.log(`   ❌ Errors/Not found: ${errorCount}`);
  console.log();
}

batchUpdateFromKalopedi().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
