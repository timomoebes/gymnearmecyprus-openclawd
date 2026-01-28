/**
 * Update Kings Brazilian Jiu Jitsu (Paphos) coordinates
 *
 * Sets lat/lon to Google Geocoding result:
 *   lat: 34.7775625
 *   lon: 32.4400625
 *
 * Usage:
 *   npx tsx scripts/update-kings-bjj-paphos-coordinates.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

const GYM_ID = 'ab6ee237-c6e4-4d7d-9640-ff121ceb9d60';
const NEW_LAT = 34.7775625;
const NEW_LON = 32.4400625;

async function main() {
  console.log('🔧 Updating Kings Brazilian Jiu Jitsu (Paphos) coordinates...\n');

  // Fetch current
  const { data: before, error: beforeError } = await supabaseAdmin
    .from('gyms')
    .select('id, name, address, latitude, longitude, updated_at')
    .eq('id', GYM_ID)
    .single();

  if (beforeError || !before) {
    console.error('❌ Failed to load gym:', beforeError?.message ?? 'unknown error');
    process.exitCode = 1;
    return;
  }

  console.log('📍 Before:');
  console.log(`   Name: ${before.name}`);
  console.log(`   Address: ${before.address}`);
  console.log(`   Latitude: ${before.latitude}`);
  console.log(`   Longitude: ${before.longitude}`);
  console.log(`   Updated at: ${before.updated_at}\n`);

  console.log('📝 Applying update (confirmed by user):');
  console.log(`   Latitude:  ${before.latitude} -> ${NEW_LAT}`);
  console.log(`   Longitude: ${before.longitude} -> ${NEW_LON}\n`);

  const { data: updated, error: updateError } = await supabaseAdmin
    .from('gyms')
    .update({
      latitude: NEW_LAT,
      longitude: NEW_LON,
      updated_at: new Date().toISOString(),
    })
    .eq('id', GYM_ID)
    .select('id, name, address, latitude, longitude, updated_at')
    .single();

  if (updateError || !updated) {
    console.error('❌ Update failed:', updateError?.message ?? 'unknown error');
    process.exitCode = 1;
    return;
  }

  console.log('✅ After:');
  console.log(`   Name: ${updated.name}`);
  console.log(`   Address: ${updated.address}`);
  console.log(`   Latitude: ${updated.latitude}`);
  console.log(`   Longitude: ${updated.longitude}`);
  console.log(`   Updated at: ${updated.updated_at}\n`);

  console.log('🎉 Done.');
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exitCode = 1;
});

