/**
 * Test Update Rating & Review Count for a Single Gym
 * 
 * Tests the Google Places API to fetch rating and review count for Kings Brazilian Jiu Jitsu Paphos.
 * 
 * Usage:
 *   npx tsx scripts/test-update-rating-review-single.ts
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

/**
 * Find Place ID using Google Places Text Search API
 */
async function findPlaceId(gymName: string, address: string, cityName: string): Promise<string | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('GOOGLE_MAPS_API_KEY not found');
  }

  const query = `${gymName}, ${address}, ${cityName}, Cyprus`;
  
  console.log('🔍 Step 1: Finding Place ID...');
  console.log(`   Query: ${query}`);
  console.log();

  const url = `https://places.googleapis.com/v1/places:searchText`;
  
  try {
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
      console.error(`❌ API Error: ${response.status}`);
      console.error(`   Response:`, JSON.stringify(errorData, null, 2));
      return null;
    }

    const data = await response.json();
    
    console.log('📋 API Response:');
    console.log(JSON.stringify(data, null, 2));
    console.log();

    if (data.places && data.places.length > 0) {
      const place = data.places[0];
      console.log('✅ Found Place:');
      console.log(`   Place ID: ${place.id}`);
      console.log(`   Display Name: ${place.displayName?.text || 'N/A'}`);
      console.log(`   Formatted Address: ${place.formattedAddress || 'N/A'}`);
      console.log();
      return place.id;
    }
    
    console.log('⚠️  No places found in response');
    return null;
  } catch (error) {
    console.error(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

/**
 * Get Place Details (rating and review count) using Google Places API
 */
async function getPlaceDetails(placeId: string): Promise<{ rating: number | null; userRatingCount: number | null } | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('GOOGLE_MAPS_API_KEY not found');
  }

  console.log('🔍 Step 2: Fetching Place Details...');
  console.log(`   Place ID: ${placeId}`);
  console.log();

  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  
  try {
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
      console.error(`❌ API Error: ${response.status}`);
      console.error(`   Response:`, JSON.stringify(errorData, null, 2));
      return null;
    }

    const data = await response.json();
    
    console.log('📋 API Response:');
    console.log(JSON.stringify(data, null, 2));
    console.log();

    return {
      rating: data.rating || null,
      userRatingCount: data.userRatingCount || null
    };
  } catch (error) {
    console.error(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

async function testSingleGym() {
  console.log('='.repeat(80));
  console.log('TEST UPDATE RATING & REVIEW COUNT - Kings Brazilian Jiu Jitsu');
  console.log('='.repeat(80));
  console.log();

  // Check API key
  if (!GOOGLE_MAPS_API_KEY) {
    console.error('❌ GOOGLE_MAPS_API_KEY not found in .env.local');
    return;
  }

  try {
    // Step 1: Fetch gym from Supabase
    console.log('📋 Fetching gym from Supabase...');
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
    const currentRating = gym.rating ? parseFloat(gym.rating as any) : null;
    const currentReviewCount = gym.review_count || null;

    console.log('✅ Found gym:');
    console.log(`   Name: ${gym.name}`);
    console.log(`   Address: ${gym.address}`);
    console.log(`   City: ${cityName}`);
    console.log(`   Current Rating: ${currentRating?.toFixed(1) || 'N/A'}⭐`);
    console.log(`   Current Review Count: ${currentReviewCount || 'N/A'}`);
    console.log();

    // Step 2: Find Place ID
    const placeId = await findPlaceId(gym.name, gym.address, cityName);
    
    if (!placeId) {
      console.error('❌ Could not find Place ID');
      return;
    }

    // Step 3: Get Place Details
    const details = await getPlaceDetails(placeId);
    
    if (!details) {
      console.error('❌ Could not fetch Place Details');
      return;
    }

    // Step 4: Show comparison
    console.log('='.repeat(80));
    console.log('COMPARISON');
    console.log('='.repeat(80));
    console.log('   Current Database:');
    console.log(`     Rating:       ${currentRating?.toFixed(1) || 'N/A'}⭐`);
    console.log(`     Review Count: ${currentReviewCount || 'N/A'}`);
    console.log('   Google Places API:');
    console.log(`     Rating:       ${details.rating?.toFixed(1) || 'N/A'}⭐`);
    console.log(`     Review Count: ${details.userRatingCount || 'N/A'}`);
    console.log();

    if (details.rating !== null && details.userRatingCount !== null) {
      const ratingChanged = currentRating === null || Math.abs(currentRating - details.rating) > 0.01;
      const reviewCountChanged = currentReviewCount === null || currentReviewCount !== details.userRatingCount;
      
      if (ratingChanged || reviewCountChanged) {
        console.log('📊 Changes detected:');
        if (ratingChanged) {
          console.log(`   Rating: ${currentRating?.toFixed(1) || 'N/A'} → ${details.rating.toFixed(1)}`);
        }
        if (reviewCountChanged) {
          console.log(`   Review Count: ${currentReviewCount || 'N/A'} → ${details.userRatingCount}`);
        }
        console.log();
        console.log('💡 This is a TEST - no database update performed.');
        console.log('   Review the results above and confirm if correct.');
      } else {
        console.log('✅ No changes detected - data is up to date!');
      }
    } else {
      console.log('⚠️  Rating or review count not available from Google Places API');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
  }
}

testSingleGym();
