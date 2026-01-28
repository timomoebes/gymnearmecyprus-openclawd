/**
 * Delete Ananda Yoga Studio Nicosia
 * 
 * Completely removes this gym from the database.
 * 
 * Usage:
 *   npx tsx scripts/delete-ananda-yoga-studio.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

async function deleteAnandaYogaStudio() {
  console.log('🗑️  Deleting Ananda Yoga Studio Nicosia...\n');

  // Find the gym
  const { data: gym, error: findError } = await supabaseAdmin
    .from('gyms')
    .select('id, name, slug')
    .ilike('name', '%Ananda Yoga Studio%')
    .single();

  if (findError || !gym) {
    console.error('❌ Gym not found:', findError?.message);
    return;
  }

  console.log(`✅ Found: ${gym.name}`);
  console.log(`   ID: ${gym.id}`);
  console.log(`   Slug: ${gym.slug}\n`);

  // Delete related records first (if any)
  console.log('📋 Checking for related records...');
  
  // Delete gym_specialties
  const { error: specialtiesError } = await supabaseAdmin
    .from('gym_specialties')
    .delete()
    .eq('gym_id', gym.id);
  
  if (specialtiesError) {
    console.log(`   ⚠️  Error deleting gym_specialties: ${specialtiesError.message}`);
  } else {
    console.log('   ✅ Deleted gym_specialties');
  }

  // Delete gym_amenities
  const { error: amenitiesError } = await supabaseAdmin
    .from('gym_amenities')
    .delete()
    .eq('gym_id', gym.id);
  
  if (amenitiesError) {
    console.log(`   ⚠️  Error deleting gym_amenities: ${amenitiesError.message}`);
  } else {
    console.log('   ✅ Deleted gym_amenities');
  }

  // Delete reviews
  const { error: reviewsError } = await supabaseAdmin
    .from('reviews')
    .delete()
    .eq('gym_id', gym.id);
  
  if (reviewsError) {
    console.log(`   ⚠️  Error deleting reviews: ${reviewsError.message}`);
  } else {
    console.log('   ✅ Deleted reviews');
  }

  // Delete gym_images
  const { error: imagesError } = await supabaseAdmin
    .from('gym_images')
    .delete()
    .eq('gym_id', gym.id);
  
  if (imagesError) {
    console.log(`   ⚠️  Error deleting gym_images: ${imagesError.message}`);
  } else {
    console.log('   ✅ Deleted gym_images');
  }

  console.log();

  // Finally delete the gym
  console.log('🗑️  Deleting gym record...');
  const { error: deleteError } = await supabaseAdmin
    .from('gyms')
    .delete()
    .eq('id', gym.id);

  if (deleteError) {
    console.error('❌ Delete error:', deleteError.message);
    return;
  }

  console.log('✅ Successfully deleted Ananda Yoga Studio Nicosia');
  console.log(`   Gym ID: ${gym.id}`);
  console.log(`   Name: ${gym.name}`);
}

deleteAnandaYogaStudio().catch(console.error);
