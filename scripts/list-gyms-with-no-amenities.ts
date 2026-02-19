/**
 * List all gyms that have no amenities assigned (for data quality / enrichment).
 * Run: npx tsx scripts/list-gyms-with-no-amenities.ts
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

async function main() {
  console.log('🔍 Fetching all gyms with amenity counts...\n');

  const { data: gyms, error } = await supabase
    .from('gyms')
    .select(`
      id,
      name,
      slug,
      city:cities (name)
    `)
    .order('name');

  if (error) {
    console.error('❌ Error fetching gyms:', error);
    process.exit(1);
  }

  if (!gyms?.length) {
    console.log('No gyms found.');
    return;
  }

  // For each gym, count amenities
  const gymIds = gyms.map((g: any) => g.id);
  const { data: gymAmenities, error: gaError } = await supabase
    .from('gym_amenities')
    .select('gym_id')
    .in('gym_id', gymIds);

  if (gaError) {
    console.error('❌ Error fetching gym_amenities:', gaError);
    process.exit(1);
  }

  const gymIdsWithAmenities = new Set((gymAmenities || []).map((r: any) => r.gym_id));
  const noAmenities = gyms.filter((g: any) => !gymIdsWithAmenities.has(g.id));

  console.log(`Total gyms: ${gyms.length}`);
  console.log(`Gyms with at least one amenity: ${gymIdsWithAmenities.size}`);
  console.log(`Gyms with NO amenities: ${noAmenities.length}\n`);

  if (noAmenities.length === 0) {
    console.log('✅ All gyms have at least one amenity.');
    return;
  }

  console.log('--- Gyms with no amenities ---\n');
  noAmenities.forEach((g: any, i: number) => {
    const city = g.city?.name ?? '—';
    console.log(`${i + 1}. ${g.name}`);
    console.log(`   slug: ${g.slug}`);
    console.log(`   city: ${city}`);
    console.log(`   id: ${g.id}\n`);
  });
}

main();
