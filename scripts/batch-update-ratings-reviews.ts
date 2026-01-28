/**
 * Batch Update Ratings and Review Counts using Google Places API
 * 
 * This script fetches current ratings and review counts from Google Places API
 * and updates all gyms in the database.
 * 
 * Usage:
 *   npx tsx scripts/batch-update-ratings-reviews.ts
 * 
 * Requirements:
 *   - GOOGLE_MAPS_API_KEY in .env.local (must have Places API enabled)
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

interface PlaceSearchResult {
  placeId: string;
  displayName: string;
  formattedAddress: string;
}

interface PlaceDetailsResult {
  rating: number | null;
  userRatingCount: number | null;
  placeId: string;
}

/**
 * Find Place ID using Google Places Text Search API
 */
async function findPlaceId(gymName: string, address: string, cityName: string): Promise<string | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('GOOGLE_MAPS_API_KEY not found');
  }

  const query = `${gymName}, ${address}, ${cityName}, Cyprus`;
  const encodedQuery = encodeURIComponent(query);
  
  const url = `https://places.googleapis.com/v1/places:searchText`;
  
  try {
    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1100));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress'
      },
      body: JSON.stringify({
        textQuery: query,
        maxResultCount: 1
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`   API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      return null;
    }

    const data = await response.json();
    
    if (data.places && data.places.length > 0) {
      return data.places[0].id;
    }
    
    return null;
  } catch (error) {
    console.error(`   Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

/**
 * Get Place Details (rating and review count) using Google Places API
 */
async function getPlaceDetails(placeId: string): Promise<PlaceDetailsResult | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('GOOGLE_MAPS_API_KEY not found');
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  
  try {
    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1100));

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'id,rating,userRatingCount'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`   API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      return null;
    }

    const data = await response.json();
    
    return {
      placeId: data.id || placeId,
      rating: data.rating || null,
      userRatingCount: data.userRatingCount || null
    };
  } catch (error) {
    console.error(`   Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

async function batchUpdateRatingsReviews() {
  console.log('='.repeat(80));
  console.log('BATCH UPDATE RATINGS & REVIEW COUNTS');
  console.log('='.repeat(80));
  console.log();

  // Check API key
  if (!GOOGLE_MAPS_API_KEY) {
    console.error('❌ GOOGLE_MAPS_API_KEY not found in .env.local');
    return;
  }

  try {
    // Step 1: Fetch all gyms
    console.log('📋 Step 1: Fetching all gyms from Supabase...');
    const { data: gyms, error: gymsError } = await supabaseAdmin
      .from('gyms')
      .select('id, name, address, rating, review_count, city_id, cities!inner(name)')
      .order('name', { ascending: true });

    if (gymsError) {
      console.error('❌ Error fetching gyms:', gymsError.message);
      return;
    }

    if (!gyms || gyms.length === 0) {
      console.log('⚠️  No gyms found');
      return;
    }

    console.log(`✅ Found ${gyms.length} gyms`);
    console.log();

    // Step 2: Process each gym
    console.log('🌐 Step 2: Fetching ratings and reviews from Google Places API...');
    console.log(`   Processing ${gyms.length} gyms...`);
    console.log('   Rate limit: ~1 request/second per API');
    console.log();

    const updates: Array<{
      gymId: string;
      gymName: string;
      currentRating: number | null;
      currentReviewCount: number | null;
      newRating: number | null;
      newReviewCount: number | null;
      needsUpdate: boolean;
    }> = [];

    let successCount = 0;
    let errorCount = 0;
    let skipCount = 0;

    for (let i = 0; i < gyms.length; i++) {
      const gym = gyms[i];
      const cityName = (gym.cities as any)?.name || '';
      const currentRating = gym.rating ? parseFloat(gym.rating as any) : null;
      const currentReviewCount = gym.review_count || null;

      process.stdout.write(`   [${i + 1}/${gyms.length}] ${gym.name.substring(0, 40).padEnd(40)} ... `);

      // Step 2a: Find Place ID
      const placeId = await findPlaceId(gym.name, gym.address, cityName);
      
      if (!placeId) {
        console.log('❌ Place ID not found');
        errorCount++;
        updates.push({
          gymId: gym.id,
          gymName: gym.name,
          currentRating,
          currentReviewCount,
          newRating: null,
          newReviewCount: null,
          needsUpdate: false
        });
        continue;
      }

      // Step 2b: Get Place Details
      const details = await getPlaceDetails(placeId);
      
      if (!details || details.rating === null || details.userRatingCount === null) {
        console.log('⚠️  No rating/review data');
        skipCount++;
        updates.push({
          gymId: gym.id,
          gymName: gym.name,
          currentRating,
          currentReviewCount,
          newRating: details?.rating || null,
          newReviewCount: details?.userRatingCount || null,
          needsUpdate: false
        });
        continue;
      }

      // Check if update is needed
      const ratingChanged = currentRating === null || Math.abs(currentRating - details.rating) > 0.01;
      const reviewCountChanged = currentReviewCount === null || currentReviewCount !== details.userRatingCount;
      const needsUpdate = ratingChanged || reviewCountChanged;

      updates.push({
        gymId: gym.id,
        gymName: gym.name,
        currentRating,
        currentReviewCount,
        newRating: details.rating,
        newReviewCount: details.userRatingCount,
        needsUpdate
      });

      if (needsUpdate) {
        console.log(`✅ ${details.rating.toFixed(1)}⭐ ${details.userRatingCount} reviews`);
        successCount++;
      } else {
        console.log(`✓ No change`);
        skipCount++;
      }
    }

    console.log();
    console.log('='.repeat(80));
    console.log('FETCH SUMMARY');
    console.log('='.repeat(80));
    console.log(`   Total gyms processed: ${gyms.length}`);
    console.log(`   ✅ Found updates: ${successCount}`);
    console.log(`   ⚠️  No changes needed: ${skipCount}`);
    console.log(`   ❌ Errors/Not found: ${errorCount}`);
    console.log();

    // Step 3: Show updates that will be applied
    const updateableGyms = updates.filter(u => u.needsUpdate && u.newRating !== null && u.newReviewCount !== null);
    
    if (updateableGyms.length > 0) {
      console.log('📊 Step 3: Gyms to be updated:');
      console.log('='.repeat(80));
      
      updateableGyms.forEach((update, idx) => {
        console.log(`\n[${idx + 1}] ${update.gymName}`);
        console.log(`    Current: ${update.currentRating?.toFixed(1) || 'N/A'}⭐, ${update.currentReviewCount || 'N/A'} reviews`);
        console.log(`    New:     ${update.newRating?.toFixed(1)}⭐, ${update.newReviewCount} reviews`);
      });
    }

    console.log('\n' + '='.repeat(80));
    console.log('⚠️  IMPORTANT: No database updates have been made yet!');
    console.log('='.repeat(80));
    console.log();
    console.log('To apply updates, run:');
    console.log('   npx tsx scripts/apply-rating-review-updates.ts');
    console.log();

    // Save updates to JSON file
    const fs = require('fs');
    const updatesFile = 'scripts/rating-review-updates.json';
    fs.writeFileSync(
      updatesFile,
      JSON.stringify(updates, null, 2)
    );
    console.log(`💾 Updates saved to: ${updatesFile}`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
  }
}

batchUpdateRatingsReviews();
