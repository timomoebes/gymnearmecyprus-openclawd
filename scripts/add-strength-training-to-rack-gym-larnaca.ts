import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const GYM_SLUG = 'rack-gym-larnaca';

async function addStrengthTrainingToRackGym() {
  console.log('🚀 Add Strength Training specialty to RACK GYM Larnaca\n');

  const { data: gym, error: gymError } = await supabase
    .from('gyms')
    .select('id, name, slug')
    .or(`slug.eq.${GYM_SLUG},slug.eq.rack-gym-ltd`)
    .limit(1)
    .maybeSingle();

  if (gymError || !gym) {
    console.error('❌ Gym not found:', gymError?.message || 'No gym');
    process.exit(1);
  }

  console.log(`✅ Found gym: ${gym.name} (${gym.slug})`);

  const { data: specialty, error: specError } = await supabase
    .from('specialties')
    .select('id, name, slug')
    .eq('slug', 'strength-training')
    .single();

  if (specError || !specialty) {
    console.error('❌ Strength Training specialty not found:', specError?.message);
    process.exit(1);
  }

  console.log(`✅ Found specialty: ${specialty.name} (${specialty.slug})`);

  const { data: existing } = await supabase
    .from('gym_specialties')
    .select('gym_id')
    .eq('gym_id', gym.id)
    .eq('specialty_id', specialty.id)
    .maybeSingle();

  if (existing) {
    console.log('✅ RACK GYM Larnaca already has Strength Training specialty.');
    return;
  }

  const { error: insertError } = await supabase
    .from('gym_specialties')
    .insert({ gym_id: gym.id, specialty_id: specialty.id });

  if (insertError) {
    console.error('❌ Failed to add specialty:', insertError.message);
    process.exit(1);
  }

  console.log('✅ Strength Training specialty added to RACK GYM Larnaca.');
}

addStrengthTrainingToRackGym().catch((e) => {
  console.error(e);
  process.exit(1);
});
