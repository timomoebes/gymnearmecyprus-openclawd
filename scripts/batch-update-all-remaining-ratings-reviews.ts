/**
 * Batch Update All Gyms - Rating & Review Count
 *
 * Fetches rating and review_count from Google Places API and updates all gyms
 * in the database. Run periodically to keep gym data fresh.
 *
 * Usage:
 *   npx tsx scripts/batch-update-all-remaining-ratings-reviews.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

// Set to gym names to skip (e.g. if updated separately). Empty = update all gyms.
const EXCLUDE_GYM_NAMES: string[] = [];

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

async function batchUpdateAllRemaining() {
  console.log('='.repeat(80));
  console.log('BATCH UPDATE ALL GYMS - Rating & Review Count (Google Places API)');
  console.log('='.repeat(80));
  console.log();

  if (!GOOGLE_MAPS_API_KEY) {
    console.error('❌ GOOGLE_MAPS_API_KEY not found');
    return;
  }

  // Fetch all gyms
  console.log('📋 Fetching all gyms...');
  const { data: allGyms, error: gymsError } = await supabaseAdmin
    .from('gyms')
    .select('id, name, address, rating, review_count, city_id, cities!inner(name)')
    .order('name', { ascending: true });

  if (gymsError) {
    console.error('❌ Error fetching gyms:', gymsError.message);
    return;
  }

  const gymsToUpdate = (allGyms || []).filter(
    gym => !EXCLUDE_GYM_NAMES.some(name => gym.name.includes(name))
  );

  console.log(`✅ Found ${gymsToUpdate.length} gyms to update`);
  if (EXCLUDE_GYM_NAMES.length > 0) {
    console.log(`   Excluded ${EXCLUDE_GYM_NAMES.length} by name`);
  }
  console.log();

  console.log('🌐 Processing gyms with Google Places API...');
  console.log(`   Rate limit: ~1 request/second per API`);
  console.log(`   Estimated time: ~${Math.ceil((gymsToUpdate.length * 2) / 60)} minutes`);
  console.log();

  let successCount = 0;
  let errorCount = 0;
  let skipCount = 0;

  for (let i = 0; i < gymsToUpdate.length; i++) {
    const gym = gymsToUpdate[i];
    const cityName = (gym.cities as any)?.name || '';
    
    process.stdout.write(`   [${i + 1}/${gymsToUpdate.length}] ${gym.name.substring(0, 45).padEnd(45)} ... `);

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
  console.log(`   Total processed: ${gymsToUpdate.length}`);
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ⚠️  No changes needed: ${skipCount}`);
  console.log(`   ❌ Errors/Not found: ${errorCount}`);
  console.log();
}

batchUpdateAllRemaining().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
