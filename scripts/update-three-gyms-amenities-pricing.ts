/**
 * One-off update: add amenities and pricing for three gyms.
 * - 5 Rounds MMA Limassol: add Group Classes
 * - Aesthetics Fitness Club Arc Paphos: pricing €70/month, Cardio Equipment, Locker Room, Showers
 * - Aidinidis Fight Club Paphos: add Group Classes
 *
 * Run: npx tsx scripts/update-three-gyms-amenities-pricing.ts
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function ensureAmenitiesForGym(gymId: string, gymSlug: string, amenityNames: string[], nameToId: Map<string, string>) {
  const ids = amenityNames.map((n) => nameToId.get(n)).filter(Boolean) as string[];
  const unknown = amenityNames.filter((n) => !nameToId.has(n));
  if (unknown.length) {
    console.warn(`  ⚠️  Unknown amenity names for ${gymSlug}: ${unknown.join(', ')}`);
  }
  if (ids.length === 0) return;

  const { data: existing } = await supabase.from('gym_amenities').select('amenity_id').eq('gym_id', gymId);
  const existingIds = new Set((existing || []).map((r: { amenity_id: string }) => r.amenity_id));
  const toAdd = ids.filter((id) => !existingIds.has(id));
  if (toAdd.length === 0) return;

  const { error } = await supabase
    .from('gym_amenities')
    .insert(toAdd.map((amenity_id) => ({ gym_id: gymId, amenity_id })));
  if (error) {
    console.error(`  ❌ ${gymSlug} amenities:`, error.message);
    return;
  }
  console.log(`  ✅ ${gymSlug} → added amenities: ${amenityNames.filter((n) => toAdd.some((id) => nameToId.get(n) === id)).join(', ')}`);
}

async function main() {
  const { data: amenities } = await supabase.from('amenities').select('id, name');
  const nameToId = new Map<string, string>((amenities || []).map((a: { name: string; id: string }) => [a.name, a.id]));

  // 1) 5 Rounds MMA Limassol — add Group Classes
  const r1 = await supabase.from('gyms').select('id, name, slug').eq('slug', '5-rounds-mma-limassol').single();
  if (r1.error || !r1.data) {
    console.error('❌ Gym not found: 5-rounds-mma-limassol', r1.error?.message);
  } else {
    console.log(`\n📌 ${r1.data.name} (${r1.data.slug})`);
    await ensureAmenitiesForGym(r1.data.id, r1.data.slug, ['Group Classes'], nameToId);
  }

  // 2) Aesthetics Fitness Club Arc Paphos — pricing €70/month + Cardio Equipment, Locker Room, Showers
  const r2 = await supabase.from('gyms').select('id, name, slug, pricing').eq('slug', 'aesthetics-fitness-club-arc-paphos').single();
  if (r2.error || !r2.data) {
    console.error('❌ Gym not found: aesthetics-fitness-club-arc-paphos', r2.error?.message);
  } else {
    console.log(`\n📌 ${r2.data.name} (${r2.data.slug})`);
    const newPricing = { Monthly: '€70 per month' };
    const { error: pricingError } = await supabase.from('gyms').update({ pricing: newPricing }).eq('id', r2.data.id).select();
    if (pricingError) {
      console.error('  ❌ Pricing update:', pricingError.message);
    } else {
      console.log('  ✅ Pricing set to: €70 per month');
    }
    await ensureAmenitiesForGym(r2.data.id, r2.data.slug, ['Cardio Equipment', 'Locker Room', 'Showers'], nameToId);
  }

  // 3) Aidinidis Fight Club Paphos — add Group Classes
  const r3 = await supabase.from('gyms').select('id, name, slug').eq('slug', 'aidinidis-fight-club-paphos').single();
  if (r3.error || !r3.data) {
    console.error('❌ Gym not found: aidinidis-fight-club-paphos', r3.error?.message);
  } else {
    console.log(`\n📌 ${r3.data.name} (${r3.data.slug})`);
    await ensureAmenitiesForGym(r3.data.id, r3.data.slug, ['Group Classes'], nameToId);
  }

  console.log('\n✅ Done.');
}

main();
