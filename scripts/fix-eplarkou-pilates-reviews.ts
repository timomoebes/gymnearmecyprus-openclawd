/**
 * Fix EPlarkou Pilates Larnaca Review Count
 * 
 * Corrects the review count from 86 to 16.
 * 
 * Usage:
 *   npx tsx scripts/fix-eplarkou-pilates-reviews.ts
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
      'X-Goog-FieldMask': 'places.id,places.displayName'
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: 3
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
      'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount'
    }
  });

  if (!response.ok) return null;
  const data = await response.json();
  return {
    rating: data.rating || null,
    userRatingCount: data.userRatingCount || null
  };
}

async function fixEPlarkouPilates() {
  console.log('🔧 Fixing EPlarkou Pilates Larnaca review count...\n');

  // Find the gym
  const { data: gym, error: findError } = await supabaseAdmin
    .from('gyms')
    .select('id, name, address, rating, review_count, city_id, cities!inner(name)')
    .ilike('name', '%EPlarkou Pilates%')
    .single();

  if (findError || !gym) {
    console.error('❌ Gym not found:', findError?.message);
    return;
  }

  const cityName = (gym.cities as any)?.name || '';
  console.log(`✅ Found: ${gym.name}`);
  console.log(`   Address: ${gym.address}`);
  console.log(`   City: ${cityName}`);
  console.log(`   Current: ${gym.rating || 'N/A'}⭐, ${gym.review_count || 'N/A'} reviews\n`);

  // Check what Google Places API returns
  console.log('🔍 Checking Google Places API...');
  const placeId = await findPlaceId(gym.name, gym.address, cityName);
  
  if (!placeId) {
    console.error('❌ Place ID not found');
    return;
  }

  console.log(`   Place ID: ${placeId}`);

  const details = await getPlaceDetails(placeId);
  
  if (!details) {
    console.error('❌ Could not fetch details');
    return;
  }

  console.log(`   Google API Result:`);
  console.log(`     Rating: ${details.rating?.toFixed(1) || 'N/A'}⭐`);
  console.log(`     Review Count: ${details.userRatingCount || 'N/A'}\n`);

  console.log('='.repeat(80));
  console.log('EXPLANATION:');
  console.log('='.repeat(80));
  console.log('The script fetched data from Google Places API.');
  console.log(`Google returned: ${details.userRatingCount} reviews`);
  console.log(`But you say it should be: 16 reviews`);
  console.log();
  console.log('Possible reasons for the discrepancy:');
  console.log('1. Google Places API might have cached/incorrect data');
  console.log('2. The Place ID might match a different location');
  console.log('3. There might be multiple locations with similar names');
  console.log('4. The gym might have been merged with another location');
  console.log();
  console.log('💡 Updating to your verified value: 16 reviews');
  console.log('='.repeat(80));
  console.log();

  // Update to correct value
  const { error: updateError } = await supabaseAdmin
    .from('gyms')
    .update({
      review_count: 16,
      updated_at: new Date().toISOString()
    })
    .eq('id', gym.id);

  if (updateError) {
    console.error('❌ Update error:', updateError.message);
    return;
  }

  console.log('✅ Successfully updated!');
  console.log(`   Review Count: ${gym.review_count} → 16`);
}

fixEPlarkouPilates().catch(console.error);
