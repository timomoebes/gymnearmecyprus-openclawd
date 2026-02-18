import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function remove24_7Amenity() {
  console.log('🚀 Starting cleanup: remove "24/7" amenity (keep "24/7 Access")\n');

  // 1. Find the amenity with slug '24-7'
  console.log('📋 Step 1: Looking up amenity with slug "24-7"...');
  const { data: amenity, error: amenityError } = await supabase
    .from('amenities')
    .select('id, name, slug')
    .eq('slug', '24-7')
    .single();

  if (amenityError) {
    if ((amenityError as any).code === 'PGRST116' || amenityError.message?.includes('Results contain 0 rows')) {
      console.log('✅ Amenity with slug "24-7" does not exist in database. Nothing to remove.');
      return;
    }
    console.error('❌ Error fetching amenity:', amenityError);
    process.exit(1);
  }

  if (!amenity) {
    console.log('✅ Amenity with slug "24-7" not found. Nothing to remove.');
    return;
  }

  console.log(`✅ Found amenity: ${amenity.name} (ID: ${amenity.id})`);

  // 2. Remove all gym_amenities entries that reference this amenity
  console.log('\n📋 Step 2: Removing gym_amenities rows for "24/7"...');
  const { error: deleteGaError } = await supabase
    .from('gym_amenities')
    .delete()
    .eq('amenity_id', amenity.id);

  if (deleteGaError) {
    console.error('❌ Error deleting gym_amenities rows for "24/7":', deleteGaError);
    process.exit(1);
  }

  console.log('✅ Deleted all gym_amenities rows referencing "24/7".');

  // 3. Delete the amenity itself
  console.log('\n📋 Step 3: Deleting amenity record "24/7"...');
  const { error: deleteAmenityError } = await supabase
    .from('amenities')
    .delete()
    .eq('id', amenity.id);

  if (deleteAmenityError) {
    console.error('❌ Error deleting amenity "24/7":', deleteAmenityError);
    process.exit(1);
  }

  console.log('✅ Amenity "24/7" deleted from amenities table.');

  // 4. Quick verification that "24/7 Access" amenity still exists
  console.log('\n📋 Step 4: Verifying "24/7 Access" amenity still exists...');
  const { data: accessAmenity, error: accessError } = await supabase
    .from('amenities')
    .select('id, name, slug')
    .eq('name', '24/7 Access')
    .single();

  if (accessError || !accessAmenity) {
    console.warn('⚠️ Could not verify "24/7 Access" amenity. Please check manually in Supabase.');
  } else {
    console.log(`✅ "24/7 Access" amenity is present: ${accessAmenity.name} (ID: ${accessAmenity.id}, slug: ${accessAmenity.slug})`);
  }

  console.log('\n🎉 Cleanup completed successfully.');
}

remove24_7Amenity().catch((error) => {
  console.error('❌ Unhandled error while removing 24/7 amenity:', error);
  process.exit(1);
});

