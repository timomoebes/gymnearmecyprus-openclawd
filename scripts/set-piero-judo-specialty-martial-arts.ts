/**
 * Set Piero Judo Academy (Limassol) specialty to "Martial Arts & MMA" everywhere in DB.
 * Run: npx tsx scripts/set-piero-judo-specialty-martial-arts.ts
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const gymSlug = 'piero-judo-academy';
  const targetSpecialtySlug = 'martial-arts-mma';

  const { data: gym, error: gymErr } = await supabase
    .from('gyms')
    .select('id, name')
    .eq('slug', gymSlug)
    .maybeSingle();
  if (gymErr) {
    console.error('❌ Gym lookup error:', gymErr.message);
    process.exit(1);
  }
  if (!gym) {
    console.error('❌ Gym not found:', gymSlug, '(not in DB – static data in lib/data/gyms.ts was updated)');
    process.exit(0);
  }

  const { data: spec, error: specErr } = await supabase
    .from('specialties')
    .select('id, name')
    .eq('slug', targetSpecialtySlug)
    .maybeSingle();
  if (specErr || !spec) {
    console.error('❌ Specialty not found:', targetSpecialtySlug, specErr?.message);
    process.exit(1);
  }

  const { error: delErr } = await supabase
    .from('gym_specialties')
    .delete()
    .eq('gym_id', gym.id);
  if (delErr) {
    console.error('❌ Delete old specialties failed:', delErr.message);
    process.exit(1);
  }

  const { error: insErr } = await supabase
    .from('gym_specialties')
    .insert({ gym_id: gym.id, specialty_id: spec.id });
  if (insErr) {
    console.error('❌ Insert specialty failed:', insErr.message);
    process.exit(1);
  }

  console.log(`✅ ${gym.name}: specialty set to "${spec.name}".`);
}

main();
