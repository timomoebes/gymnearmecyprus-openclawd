/**
 * Batch Geocode Gyms from "Komanetsi Fitness Center" onward
 * 
 * This script geocodes all gyms alphabetically starting from "Komanetsi Fitness Center"
 * through the end of the database (including Φόρμα Fitness Studio).
 * 
 * It generates proposals WITHOUT updating the database, then waits for confirmation.
 * 
 * Usage:
 *   npx tsx scripts/batch-geocode-gyms-from-komanetsi.ts
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
  status: 'OK' | 'ZERO_RESULTS' | 'ERROR';
  errorMessage?: string;
}

interface GymGeocodeProposal {
  gymId: string;
  gymName: string;
  address: string;
  cityName: string;
  currentLat: number | null;
  currentLon: number | null;
  proposedLat: number | null;
  proposedLon: number | null;
  isValidCyprus: boolean;
  distanceDiff: number | null; // in meters (approximate)
  geocodeResult: GeocodeResult | null;
  needsUpdate: boolean;
}

/**
 * Geocode an address using Google Maps Geocoding API
 */
async function geocodeWithGoogle(address: string): Promise<GeocodeResult> {
  if (!GOOGLE_MAPS_API_KEY) {
    return {
      latitude: 0,
      longitude: 0,
      formattedAddress: '',
      status: 'ERROR',
      errorMessage: 'GOOGLE_MAPS_API_KEY not found'
    };
  }

  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    // Add delay to respect rate limits (1 request per second recommended)
    await new Promise(resolve => setTimeout(resolve, 1100));

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
        confidence: result.types?.[0] || 'unknown',
        status: 'OK'
      };
    } else if (data.status === 'ZERO_RESULTS') {
      return {
        latitude: 0,
        longitude: 0,
        formattedAddress: '',
        status: 'ZERO_RESULTS',
        errorMessage: 'No results found'
      };
    } else {
      return {
        latitude: 0,
        longitude: 0,
        formattedAddress: '',
        status: 'ERROR',
        errorMessage: data.error_message || data.status
      };
    }
  } catch (error) {
    return {
      latitude: 0,
      longitude: 0,
      formattedAddress: '',
      status: 'ERROR',
      errorMessage: error instanceof Error ? error.message : 'Network error'
    };
  }
}

/**
 * Validate coordinates are within Cyprus bounds
 */
function validateCyprusCoordinates(lat: number, lon: number): boolean {
  return lat >= 34 && lat <= 35 && lon >= 32 && lon <= 34;
}

/**
 * Calculate approximate distance in meters between two coordinates
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function batchGeocodeGyms() {
  console.log('='.repeat(80));
  console.log('BATCH GEOCODE GYMS - From "Komanetsi Fitness Center" onward');
  console.log('='.repeat(80));
  console.log();

  // Check API key
  if (!GOOGLE_MAPS_API_KEY) {
    console.error('❌ GOOGLE_MAPS_API_KEY not found in .env.local');
    return;
  }

  try {
    // Step 1: Fetch all gyms from "Komanetsi Fitness Center" onward
    console.log('📋 Step 1: Fetching gyms from Supabase...');
    console.log('   Filter: name >= "Komanetsi Fitness Center"');
    console.log('   Order: alphabetical (ASC)');
    console.log();

    const { data: gyms, error: gymsError } = await supabaseAdmin
      .from('gyms')
      .select('id, name, address, latitude, longitude, city_id, cities!inner(name)')
      .gte('name', 'Komanetsi Fitness Center')
      .order('name', { ascending: true });

    if (gymsError) {
      console.error('❌ Error fetching gyms:', gymsError.message);
      return;
    }

    if (!gyms || gyms.length === 0) {
      console.log('⚠️  No gyms found matching criteria');
      return;
    }

    console.log(`✅ Found ${gyms.length} gyms to geocode`);
    console.log(`   First: ${gyms[0].name}`);
    console.log(`   Last: ${gyms[gyms.length - 1].name}`);
    console.log();

    // Step 2: Geocode each gym
    console.log('🌐 Step 2: Geocoding gyms with Google API...');
    console.log(`   Processing ${gyms.length} gyms...`);
    console.log('   Rate limit: ~1 request/second');
    console.log();

    const proposals: GymGeocodeProposal[] = [];
    let successCount = 0;
    let errorCount = 0;
    let skipCount = 0;

    for (let i = 0; i < gyms.length; i++) {
      const gym = gyms[i];
      const cityName = (gym.cities as any)?.name || '';
      const currentLat = gym.latitude ? parseFloat(gym.latitude as any) : null;
      const currentLon = gym.longitude ? parseFloat(gym.longitude as any) : null;

      // Build geocoding query
      const fullAddress = `${gym.name}, ${gym.address}, ${cityName}, Cyprus`
        .replace(/,+/g, ',')
        .replace(/,\s*Cyprus,?\s*Cyprus/g, ', Cyprus');

      process.stdout.write(`   [${i + 1}/${gyms.length}] ${gym.name.substring(0, 40).padEnd(40)} ... `);

      const geocodeResult = await geocodeWithGoogle(fullAddress);

      if (geocodeResult.status === 'OK') {
        // IGNORE Cyprus bounds validation - accept all valid geocodes
        const isValidCyprus = validateCyprusCoordinates(
          geocodeResult.latitude,
          geocodeResult.longitude
        );

        let distanceDiff: number | null = null;
        let needsUpdate = false;

        if (currentLat !== null && currentLon !== null) {
          distanceDiff = calculateDistance(
            currentLat,
            currentLon,
            geocodeResult.latitude,
            geocodeResult.longitude
          );
          // Update if difference is more than 10 meters
          needsUpdate = distanceDiff > 10;
        } else {
          // No current coordinates, always update
          needsUpdate = true;
        }

        proposals.push({
          gymId: gym.id,
          gymName: gym.name,
          address: gym.address,
          cityName: cityName,
          currentLat,
          currentLon,
          proposedLat: geocodeResult.latitude,
          proposedLon: geocodeResult.longitude,
          isValidCyprus,
          distanceDiff,
          geocodeResult,
          needsUpdate
        });

        // Accept all successful geocodes regardless of Cyprus bounds
        console.log(`✅ ${needsUpdate ? 'UPDATE' : 'OK'}${!isValidCyprus ? ' (outside bounds)' : ''}`);
        successCount++;
      } else {
        proposals.push({
          gymId: gym.id,
          gymName: gym.name,
          address: gym.address,
          cityName: cityName,
          currentLat,
          currentLon,
          proposedLat: null,
          proposedLon: null,
          isValidCyprus: false,
          distanceDiff: null,
          geocodeResult,
          needsUpdate: false
        });
        console.log(`❌ ${geocodeResult.status}`);
        errorCount++;
      }
    }

    console.log();
    console.log('='.repeat(80));
    console.log('GEOCODING SUMMARY');
    console.log('='.repeat(80));
    console.log(`   Total gyms processed: ${gyms.length}`);
    console.log(`   ✅ Successful geocodes: ${successCount}`);
    console.log(`   ❌ Errors/No results: ${errorCount}`);
    console.log(`   ⚠️  Note: Cyprus bounds validation IGNORED - all valid geocodes accepted`);
    console.log();

    // Step 3: Show proposals that need updates (IGNORE Cyprus bounds - accept all)
    const updateableProposals = proposals.filter(p => p.needsUpdate && p.geocodeResult?.status === 'OK');
    
    console.log('📊 Step 3: Proposals requiring updates:');
    console.log(`   ${updateableProposals.length} gyms will be updated`);
    console.log();

    if (updateableProposals.length > 0) {
      console.log('DETAILED PROPOSALS:');
      console.log('='.repeat(80));
      
      updateableProposals.forEach((proposal, idx) => {
        console.log(`\n[${idx + 1}] ${proposal.gymName}`);
        console.log(`    Address: ${proposal.address}`);
        console.log(`    City: ${proposal.cityName}`);
        console.log(`    Current: ${proposal.currentLat}, ${proposal.currentLon}`);
        console.log(`    Proposed: ${proposal.proposedLat}, ${proposal.proposedLon}`);
        console.log(`    Distance diff: ${proposal.distanceDiff?.toFixed(1)}m`);
        console.log(`    Formatted: ${proposal.geocodeResult?.formattedAddress}`);
        console.log(`    Location type: ${proposal.geocodeResult?.locationType}`);
      });
    }

    // Step 4: Show errors/warnings
    const errorProposals = proposals.filter(p => 
      p.geocodeResult?.status !== 'OK' || !p.isValidCyprus
    );

    if (errorProposals.length > 0) {
      console.log('\n' + '='.repeat(80));
      console.log('⚠️  GYMS WITH ERRORS OR OUTSIDE CYPRUS:');
      console.log('='.repeat(80));
      
      errorProposals.forEach((proposal, idx) => {
        console.log(`\n[${idx + 1}] ${proposal.gymName}`);
        console.log(`    Address: ${proposal.address}`);
        if (proposal.geocodeResult?.status !== 'OK') {
          console.log(`    Error: ${proposal.geocodeResult?.errorMessage || proposal.geocodeResult?.status}`);
        }
        if (!proposal.isValidCyprus && proposal.geocodeResult?.status === 'OK') {
          console.log(`    ⚠️  Coordinates outside Cyprus bounds!`);
          console.log(`    Lat: ${proposal.proposedLat}, Lon: ${proposal.proposedLon}`);
        }
      });
    }

    console.log('\n' + '='.repeat(80));
    console.log('⚠️  IMPORTANT: No database updates have been made yet!');
    console.log('='.repeat(80));
    console.log();
    console.log('To apply updates, run:');
    console.log('   npx tsx scripts/apply-geocode-proposals.ts');
    console.log();
    console.log('Or review the proposals above and update manually.');
    console.log();

    // Save proposals to JSON file for review/application
    const fs = require('fs');
    const proposalsFile = 'scripts/geocode-proposals-komanetsi-onward.json';
    fs.writeFileSync(
      proposalsFile,
      JSON.stringify(proposals, null, 2)
    );
    console.log(`💾 Proposals saved to: ${proposalsFile}`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
  }
}

batchGeocodeGyms();
