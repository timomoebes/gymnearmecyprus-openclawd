/**
 * Apply Geocode Proposals to Database
 * 
 * This script reads the proposals JSON file and applies updates to Supabase.
 * 
 * Usage:
 *   npx tsx scripts/apply-geocode-proposals.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';
import * as fs from 'fs';
import * as path from 'path';

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
  distanceDiff: number | null;
  geocodeResult: GeocodeResult | null;
  needsUpdate: boolean;
}

async function applyProposals() {
  console.log('='.repeat(80));
  console.log('APPLY GEOCODE PROPOSALS');
  console.log('='.repeat(80));
  console.log();

  const proposalsFile = path.resolve(process.cwd(), 'scripts/geocode-proposals-komanetsi-onward.json');

  if (!fs.existsSync(proposalsFile)) {
    console.error(`❌ Proposals file not found: ${proposalsFile}`);
    console.error('   Run batch-geocode-gyms-from-komanetsi.ts first to generate proposals.');
    return;
  }

  const proposals: GymGeocodeProposal[] = JSON.parse(
    fs.readFileSync(proposalsFile, 'utf-8')
  );

  // IGNORE Cyprus bounds - accept all successful geocodes
  const updateableProposals = proposals.filter(
    p => p.needsUpdate && p.geocodeResult?.status === 'OK'
  );

  console.log(`📋 Found ${updateableProposals.length} proposals to apply`);
  console.log();

  if (updateableProposals.length === 0) {
    console.log('✅ No updates needed!');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < updateableProposals.length; i++) {
    const proposal = updateableProposals[i];
    
    process.stdout.write(`[${i + 1}/${updateableProposals.length}] ${proposal.gymName.substring(0, 40).padEnd(40)} ... `);

    const { error } = await supabaseAdmin
      .from('gyms')
      .update({
        latitude: proposal.proposedLat,
        longitude: proposal.proposedLon,
        updated_at: new Date().toISOString()
      })
      .eq('id', proposal.gymId);

    if (error) {
      console.log(`❌ ${error.message}`);
      errorCount++;
    } else {
      console.log(`✅ Updated`);
      successCount++;
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('UPDATE SUMMARY');
  console.log('='.repeat(80));
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log();
}

applyProposals().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
