/**
 * Update RACK GYM Larnaca pricing from official membership rates:
 * - SINGLE DROP-IN: €10
 * - STANDARD (GYM + CLASSES): €70
 * - PREMIUM PLUS (GYM + CLASSES + UNLIMITED SAUNA): €100
 *
 * Run: npx tsx scripts/update-rack-gym-pricing.ts
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const RACK_GYM_SLUG = 'rack-gym-larnaca';

const newPricing = {
  plans: [
    { name: 'SINGLE DROP-IN', price: 10, currency: 'EUR' },
    { name: 'STANDARD', price: 70, currency: 'EUR', validity: 'GYM + CLASSES' },
    {
      name: 'PREMIUM PLUS',
      price: 100,
      currency: 'EUR',
      validity: 'GYM + CLASSES + UNLIMITED SAUNA',
    },
  ],
};

async function main() {
  const { data: gym, error: fetchError } = await supabase
    .from('gyms')
    .select('id, name, slug, pricing')
    .eq('slug', RACK_GYM_SLUG)
    .single();

  if (fetchError) {
    console.error('Error fetching gym:', fetchError);
    process.exit(1);
  }
  if (!gym) {
    console.error('RACK GYM (rack-gym-larnaca) not found');
    process.exit(1);
  }

  console.log(`Updating pricing for: ${gym.name} (${gym.slug})`);
  console.log('New plans:', JSON.stringify(newPricing.plans, null, 2));

  const { data: updated, error: updateError } = await supabase
    .from('gyms')
    .update({ pricing: newPricing })
    .eq('id', gym.id)
    .select();

  if (updateError) {
    console.error('Error updating pricing:', updateError);
    process.exit(1);
  }

  console.log('✅ RACK GYM pricing updated successfully.');
  console.log('Pricing on record:', JSON.stringify(updated?.[0]?.pricing, null, 2));
}

main();
