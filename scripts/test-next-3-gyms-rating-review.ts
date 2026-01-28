/**
 * Test Next 3 Gyms Alphabetically - Rating & Review Count
 * 
 * Finds the next 3 gyms alphabetically after Kings Brazilian Jiu Jitsu
 * and fetches their rating/review data from Google Places API for verification.
 * 
 * Usage:
 *   npx tsx scripts/test-next-3-gyms-rating-review.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

async function findPlaceId(gymName: string, address: string, cityName: string): Promise<string | null> {
  const query = `${gymName}, ${address}, ${cityName}, Cyprus`;
  const url = `https://places.googleapis.com/v1/places:searchText`;
  
  await new Promise(resolve => setTimeout(resolve, 1100)); // Rate limit

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
  
  await new Promise(resolve => setTimeout(resolve, 1100)); // Rate limit

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

async function testNext3Gyms() {
  console.log('='.repeat(80));
  console.log('TEST NEXT 3 GYMS - Rating & Review Count');
  console.log('='.repeat(80));
  console.log();

  // Find Kings BJJ to get the starting point
  const { data: kingsBJJ } = await supabaseAdmin
    .from('gyms')
    .select('id, name')
    .ilike('name', '%Kings Brazilian Jiu Jitsu%')
    .single();

  if (!kingsBJJ) {
    console.error('❌ Kings BJJ not found');
    return;
  }

  console.log(`📍 Starting from: ${kingsBJJ.name}\n`);

  // Find next 3 gyms alphabetically
  const { data: nextGyms, error } = await supabaseAdmin
    .from('gyms')
    .select('id, name, address, rating, review_count, city_id, cities!inner(name)')
    .gt('name', kingsBJJ.name)
    .order('name', { ascending: true })
    .limit(3);

  if (error || !nextGyms || nextGyms.length === 0) {
    console.error('❌ Error fetching next gyms:', error?.message);
    return;
  }

  console.log(`✅ Found ${nextGyms.length} gyms to test:\n`);

  const results: Array<{
    gymName: string;
    currentRating: number | null;
    currentReviewCount: number | null;
    newRating: number | null;
    newReviewCount: number | null;
    placeId: string | null;
    found: boolean;
  }> = [];

  for (let i = 0; i < nextGyms.length; i++) {
    const gym = nextGyms[i];
    const cityName = (gym.cities as any)?.name || '';
    const currentRating = gym.rating ? parseFloat(gym.rating as any) : null;
    const currentReviewCount = gym.review_count || null;

    console.log(`[${i + 1}/3] ${gym.name}`);
    console.log(`   Address: ${gym.address}`);
    console.log(`   City: ${cityName}`);
    console.log(`   Current: ${currentRating?.toFixed(1) || 'N/A'}⭐, ${currentReviewCount || 'N/A'} reviews`);

    // Find Place ID
    process.stdout.write(`   Finding Place ID... `);
    const placeId = await findPlaceId(gym.name, gym.address, cityName);
    
    if (!placeId) {
      console.log('❌ Not found');
      results.push({
        gymName: gym.name,
        currentRating,
        currentReviewCount,
        newRating: null,
        newReviewCount: null,
        placeId: null,
        found: false
      });
      console.log();
      continue;
    }

    console.log(`✅ ${placeId}`);

    // Get Place Details
    process.stdout.write(`   Fetching details... `);
    const details = await getPlaceDetails(placeId);
    
    if (!details || details.rating === null || details.userRatingCount === null) {
      console.log('⚠️  No rating/review data');
      results.push({
        gymName: gym.name,
        currentRating,
        currentReviewCount,
        newRating: null,
        newReviewCount: null,
        placeId,
        found: false
      });
      console.log();
      continue;
    }

    console.log(`✅ ${details.rating.toFixed(1)}⭐, ${details.userRatingCount} reviews`);

    results.push({
      gymName: gym.name,
      currentRating,
      currentReviewCount,
      newRating: details.rating,
      newReviewCount: details.userRatingCount,
      placeId,
      found: true
    });

    console.log();
  }

  // Show summary
  console.log('='.repeat(80));
  console.log('VERIFICATION SUMMARY');
  console.log('='.repeat(80));
  console.log();

  results.forEach((result, idx) => {
    console.log(`[${idx + 1}] ${result.gymName}`);
    console.log(`    Current: ${result.currentRating?.toFixed(1) || 'N/A'}⭐, ${result.currentReviewCount || 'N/A'} reviews`);
    if (result.found) {
      console.log(`    Google:  ${result.newRating?.toFixed(1)}⭐, ${result.newReviewCount} reviews`);
      const ratingChanged = result.currentRating === null || Math.abs(result.currentRating - result.newRating!) > 0.01;
      const reviewCountChanged = result.currentReviewCount === null || result.currentReviewCount !== result.newReviewCount;
      if (ratingChanged || reviewCountChanged) {
        console.log(`    ⚠️  Changes detected!`);
      } else {
        console.log(`    ✅ No changes`);
      }
    } else {
      console.log(`    ❌ Could not fetch data`);
    }
    console.log();
  });

  console.log('💡 This is a TEST - no database updates performed.');
  console.log('   Review the results above and confirm if correct before updating.');
}

testNext3Gyms().catch(console.error);
