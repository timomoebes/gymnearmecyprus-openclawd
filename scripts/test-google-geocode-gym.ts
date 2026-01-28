/**
 * Test Google Geocoding API for a single gym
 * 
 * This script tests the Google Maps Geocoding API to geocode gyms.
 * It fetches a gym from Supabase, calls the Google API, validates coordinates
 * are in Cyprus, and shows results before updating.
 * 
 * Usage:
 *   npx tsx scripts/test-google-geocode-gym.ts
 * 
 * Requirements:
 *   - GOOGLE_MAPS_API_KEY in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

interface GeocodeResult {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  placeId?: string;
  locationType?: string;
  confidence?: string;
}

/**
 * Geocode an address using Google Maps Geocoding API
 */
async function geocodeWithGoogle(address: string): Promise<GeocodeResult | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('GOOGLE_MAPS_API_KEY not found in environment variables');
  }

  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

  console.log('🌐 Calling Google Geocoding API...');
  console.log(`   URL: https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=***`);
  console.log(`   Address: ${address}\n`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const result = data.results[0];
      const location = result.geometry.location;

      return {
        latitude: location.lat,
        longitude: location.lng,
        formattedAddress: result.formatted_address,
        placeId: result.place_id,
        locationType: result.geometry.location_type,
        confidence: result.types?.[0] || 'unknown'
      };
    } else if (data.status === 'ZERO_RESULTS') {
      console.error('❌ No results found for address');
      return null;
    } else {
      console.error(`❌ Geocoding API error: ${data.status}`);
      if (data.error_message) {
        console.error(`   Error message: ${data.error_message}`);
      }
      return null;
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    throw error;
  }
}

/**
 * Validate coordinates are within Cyprus bounds
 */
function validateCyprusCoordinates(lat: number, lon: number): boolean {
  // Cyprus bounds: lat between 34-35, lon between 32-34
  const isValid = lat >= 34 && lat <= 35 && lon >= 32 && lon <= 34;
  return isValid;
}

async function testGeocodeGym() {
  console.log('='.repeat(80));
  console.log('TEST GOOGLE GEOCODING API - Kings Brazilian Jiu Jitsu');
  console.log('='.repeat(80));
  console.log();

  // Check API key
  if (!GOOGLE_MAPS_API_KEY) {
    console.error('❌ GOOGLE_MAPS_API_KEY not found in .env.local');
    console.error('   Please add: GOOGLE_MAPS_API_KEY=your_api_key_here');
    console.error('   Get your key from: https://console.cloud.google.com/apis/credentials');
    return;
  }

  try {
    // Step 1: Fetch gym from Supabase
    console.log('📋 Step 1: Fetching gym from Supabase...');
    const { data: gym, error: gymError } = await supabaseAdmin
      .from('gyms')
      .select('id, name, address, latitude, longitude, city_id, cities!inner(name)')
      .ilike('name', '%Kings Brazilian Jiu Jitsu%')
      .single();

    if (gymError || !gym) {
      console.error('❌ Gym not found:', gymError?.message);
      return;
    }

    console.log('✅ Found gym:');
    console.log(`   Name: ${gym.name}`);
    console.log(`   Address: ${gym.address}`);
    console.log(`   City: ${(gym.cities as any)?.name || 'Unknown'}`);
    console.log(`   Current Latitude: ${gym.latitude}`);
    console.log(`   Current Longitude: ${gym.longitude}`);
    console.log();

    // Step 2: Build geocoding query
    const cityName = (gym.cities as any)?.name || '';
    const fullAddress = `${gym.name}, ${gym.address}, ${cityName}, Cyprus`.replace(/,+/g, ',').replace(/,\s*Cyprus,?\s*Cyprus/g, ', Cyprus');
    
    console.log('🔍 Step 2: Building geocoding query...');
    console.log(`   Query: ${fullAddress}`);
    console.log();

    // Step 3: Call Google Geocoding API
    const geocodeResult = await geocodeWithGoogle(fullAddress);

    if (!geocodeResult) {
      console.error('❌ Geocoding failed - no results returned');
      return;
    }

    // Step 4: Validate coordinates
    console.log('✅ Step 3: Geocoding successful!');
    console.log('📊 Geocoding Results:');
    console.log(`   Latitude: ${geocodeResult.latitude}`);
    console.log(`   Longitude: ${geocodeResult.longitude}`);
    console.log(`   Formatted Address: ${geocodeResult.formattedAddress}`);
    console.log(`   Place ID: ${geocodeResult.placeId || 'N/A'}`);
    console.log(`   Location Type: ${geocodeResult.locationType || 'N/A'}`);
    console.log(`   Confidence: ${geocodeResult.confidence || 'N/A'}`);
    console.log();

    const isValidCyprus = validateCyprusCoordinates(geocodeResult.latitude, geocodeResult.longitude);
    
    console.log('🔍 Step 4: Validating coordinates...');
    if (isValidCyprus) {
      console.log('✅ Coordinates are within Cyprus bounds');
      console.log(`   Latitude: ${geocodeResult.latitude} (valid: 34-35)`);
      console.log(`   Longitude: ${geocodeResult.longitude} (valid: 32-34)`);
    } else {
      console.log('⚠️  WARNING: Coordinates are OUTSIDE Cyprus bounds!');
      console.log(`   Latitude: ${geocodeResult.latitude} (expected: 34-35)`);
      console.log(`   Longitude: ${geocodeResult.longitude} (expected: 32-34)`);
    }
    console.log();

    // Step 5: Show comparison
    console.log('📊 Step 5: Comparison with current database values:');
    console.log('   Current Database:');
    console.log(`     Latitude:  ${gym.latitude}`);
    console.log(`     Longitude: ${gym.longitude}`);
    console.log('   Google Geocoding API:');
    console.log(`     Latitude:  ${geocodeResult.latitude}`);
    console.log(`     Longitude: ${geocodeResult.longitude}`);
    
    const latDiff = Math.abs(parseFloat(gym.latitude as any) - geocodeResult.latitude);
    const lonDiff = Math.abs(parseFloat(gym.longitude as any) - geocodeResult.longitude);
    
    console.log('   Difference:');
    console.log(`     Latitude:  ${latDiff.toFixed(6)}`);
    console.log(`     Longitude: ${lonDiff.toFixed(6)}`);
    console.log();

    // Step 6: Show update preview (but don't update yet)
    console.log('⚠️  Step 6: Update Preview (NOT APPLIED YET)');
    console.log('   To update the database, you need to confirm.');
    console.log('   The script will update:');
    console.log(`     - Latitude:  ${gym.latitude} → ${geocodeResult.latitude}`);
    console.log(`     - Longitude: ${gym.longitude} → ${geocodeResult.longitude}`);
    console.log();
    console.log('💡 This is a TEST script - it does NOT update the database automatically.');
    console.log('   Review the results above and manually update if correct.');
    console.log();

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
  }
}

testGeocodeGym();
