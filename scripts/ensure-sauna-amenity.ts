/**
 * Ensure "Sauna" amenity exists in the database so it can be assigned to gyms.
 * Run: npx tsx scripts/ensure-sauna-amenity.ts
 */
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

async function ensureSaunaAmenity() {
  console.log('🔍 Ensuring Sauna amenity exists...\n');

  const { data: existing } = await supabase
    .from('amenities')
    .select('id, name, slug')
    .eq('slug', 'sauna')
    .maybeSingle();

  if (existing) {
    console.log(`✅ Sauna amenity already exists: ${existing.name} (slug: ${existing.slug}, id: ${existing.id})`);
    return;
  }

  const { data: inserted, error } = await supabase
    .from('amenities')
    .insert({
      name: 'Sauna',
      slug: 'sauna',
      icon: 'flame',
    })
    .select('id, name, slug')
    .single();

  if (error) {
    console.error('❌ Failed to create Sauna amenity:', error.message);
    process.exit(1);
  }

  console.log(`✅ Created Sauna amenity: ${inserted?.name} (slug: ${inserted?.slug}, id: ${inserted?.id})`);
}

ensureSaunaAmenity().catch((e) => {
  console.error(e);
  process.exit(1);
});
