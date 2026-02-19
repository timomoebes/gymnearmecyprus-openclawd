/**
 * Assign amenities to gyms that have none, using heuristics from opening_hours and specialties.
 * Run: npx tsx scripts/assign-amenities-heuristics.ts
 * Optional: npx tsx scripts/assign-amenities-heuristics.ts --dry-run  (log only, no DB writes)
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
const DRY_RUN = process.argv.includes('--dry-run');

function is24Hour(hours: unknown): boolean {
  if (!hours || typeof hours !== 'object') return false;
  const dayValues = Object.values(hours) as string[];
  if (dayValues.length === 0) return false;
  return dayValues.every((day: string) => {
    if (!day) return false;
    const d = String(day).toLowerCase();
    return d.includes('00:00-23:59') || d.includes('24/7') || d.includes('24 hours');
  });
}

const SPECIALTIES_GROUP_CLASSES = new Set([
  'CrossFit', 'Dance & Group Fitness', 'Yoga & Pilates', 'Boxing', 'Martial Arts & MMA',
]);
const SPECIALTIES_CARDIO = new Set(['Fitness/Gym', 'CrossFit', 'Strength Training']);
const SPECIALTIES_FULL_GYM = new Set(['Fitness/Gym', 'CrossFit', 'Strength Training']);
const SPECIALTY_SWIMMING = 'Swimming & Aquatics';

function suggestAmenities(specialties: string[], openingHours: unknown): string[] {
  const out = new Set<string>();

  if (is24Hour(openingHours)) out.add('24/7 Access');
  if (specialties.some(s => SPECIALTIES_GROUP_CLASSES.has(s))) out.add('Group Classes');
  if (specialties.some(s => SPECIALTIES_CARDIO.has(s))) out.add('Cardio Equipment');
  if (specialties.some(s => SPECIALTIES_FULL_GYM.has(s))) {
    out.add('Showers');
    out.add('Toilets');
    out.add('Locker Room');
  }
  if (specialties.includes(SPECIALTY_SWIMMING)) out.add('Swimming Pool');

  return Array.from(out);
}

async function main() {
  console.log(DRY_RUN ? '🔍 [DRY RUN] Assigning amenities by heuristics (no writes)\n' : '🔍 Assigning amenities by heuristics...\n');

  const { data: gyms, error: gymsError } = await supabase
    .from('gyms')
    .select(`
      id,
      name,
      slug,
      opening_hours,
      gym_specialties ( specialty:specialties (name) )
    `)
    .order('name');

  if (gymsError || !gyms?.length) {
    console.error('❌ Error or no gyms:', gymsError);
    process.exit(1);
  }

  const { data: gaRows } = await supabase.from('gym_amenities').select('gym_id');
  const withAmenities = new Set((gaRows || []).map((r: any) => r.gym_id));
  const noAmenities = gyms.filter((g: any) => !withAmenities.has(g.id));

  if (noAmenities.length === 0) {
    console.log('✅ No gyms without amenities.');
    return;
  }

  const { data: amenities } = await supabase.from('amenities').select('id, name');
  const nameToId = new Map<string, string>((amenities || []).map((a: any) => [a.name, a.id]));

  let added = 0;
  for (const gym of noAmenities) {
    const rawSpecs = (gym.gym_specialties || []).map((gs: any) => gs.specialty?.name).filter(Boolean);
    const suggested = suggestAmenities(rawSpecs, gym.opening_hours);
    if (suggested.length === 0) continue;

    const toInsert = suggested
      .map(name => ({ gym_id: gym.id, amenity_id: nameToId.get(name) }))
      .filter(x => x.amenity_id) as { gym_id: string; amenity_id: string }[];

    if (toInsert.length === 0) continue;

    if (DRY_RUN) {
      console.log(`  [dry-run] ${gym.name} → ${suggested.join(', ')}`);
      added += toInsert.length;
      continue;
    }

    const { error: insErr } = await supabase.from('gym_amenities').insert(toInsert);
    if (insErr) {
      console.error(`  ❌ ${gym.slug}:`, insErr.message);
      continue;
    }
    console.log(`  ✅ ${gym.name} → ${suggested.join(', ')}`);
    added += toInsert.length;
  }

  console.log(DRY_RUN ? `\n[dry-run] Would add ${added} gym_amenities rows.` : `\n✅ Added ${added} gym_amenities rows.`);
}

main();
