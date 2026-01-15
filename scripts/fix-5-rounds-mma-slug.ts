/**
 * Fix 5 Rounds MMA Limassol Slug
 * 
 * Removes duplicate "limassol" from the slug:
 * From: 5-rounds-mma-limassol-limassol
 * To: 5-rounds-mma-limassol
 * 
 * Usage:
 *   npx tsx scripts/fix-5-rounds-mma-slug.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

async function fix5RoundsMMASlug() {
  console.log('🔄 Fixing 5 Rounds MMA Limassol slug...\n');

  try {
    // Step 1: Find the gym by current slug
    console.log('📋 Step 1: Searching for gym...');
    const { data: gym, error: fetchError } = await supabaseAdmin
      .from('gyms')
      .select('id, name, slug, review_count, rating')
      .eq('slug', '5-rounds-mma-limassol-limassol')
      .single();

    if (fetchError) {
      // Try alternative search by name
      console.log('   Slug not found, searching by name...');
      const { data: gyms, error: nameError } = await supabaseAdmin
        .from('gyms')
        .select('id, name, slug, review_count, rating')
        .ilike('name', '%5 Rounds MMA%')
        .ilike('name', '%Limassol%');

      if (nameError) {
        console.error('❌ Search error:', nameError);
        return;
      }

      if (!gyms || gyms.length === 0) {
        console.error('❌ Gym not found');
        return;
      }

      // Find the one with duplicate limassol in slug
      const gymWithDuplicate = gyms.find(g => g.slug.includes('limassol-limassol'));
      if (!gymWithDuplicate) {
        console.error('❌ Gym with duplicate "limassol" in slug not found');
        console.log('   Found gyms:');
        gyms.forEach(g => console.log(`     - ${g.name} (slug: ${g.slug})`));
        return;
      }

      const gymToUpdate = gymWithDuplicate;
      const newSlug = '5-rounds-mma-limassol';

      console.log('✅ Found gym:', gymToUpdate.name);
      console.log('   Current slug:', gymToUpdate.slug);
      console.log('   New slug:', newSlug);
      console.log('');

      // Check if new slug already exists
      const { data: existingGym, error: checkError } = await supabaseAdmin
        .from('gyms')
        .select('id, name, slug')
        .eq('slug', newSlug)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Error checking for existing slug:', checkError);
        return;
      }

      if (existingGym && existingGym.id !== gymToUpdate.id) {
        console.error(`❌ Slug "${newSlug}" already exists for another gym: ${existingGym.name}`);
        return;
      }

      // Step 2: Update the slug
      console.log('🔄 Step 2: Updating slug...');
      const { data: updated, error: updateError } = await supabaseAdmin
        .from('gyms')
        .update({
          slug: newSlug,
          updated_at: new Date().toISOString()
        })
        .eq('id', gymToUpdate.id)
        .select('id, name, slug, updated_at');

      if (updateError) {
        console.error('❌ Update error:', updateError);
        return;
      }

      if (!updated || updated.length === 0) {
        console.error('❌ Update failed - no rows updated');
        return;
      }

      console.log('✅ Update successful!');
      console.log('📋 Updated gym details:');
      console.log('   Name:', updated[0].name);
      console.log('   Old slug: 5-rounds-mma-limassol-limassol');
      console.log('   New slug:', updated[0].slug);
      console.log('   Updated at:', updated[0].updated_at);
      console.log('');
      console.log('🎉 Successfully updated slug!');
      console.log('');
      console.log('📝 Next step: Add redirect in app/gyms/[slug]/page.tsx:');
      console.log('   if (decodedSlug === \'5-rounds-mma-limassol-limassol\') {');
      console.log('     permanentRedirect(\'/gyms/5-rounds-mma-limassol\');');
      console.log('   }');

      return;
    }

    if (!gym) {
      console.error('❌ Gym not found');
      return;
    }

    const newSlug = '5-rounds-mma-limassol';

    console.log('✅ Found gym:', gym.name);
    console.log('   Current slug:', gym.slug);
    console.log('   New slug:', newSlug);
    console.log('');

    // Check if new slug already exists
    const { data: existingGym, error: checkError } = await supabaseAdmin
      .from('gyms')
      .select('id, name, slug')
      .eq('slug', newSlug)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking for existing slug:', checkError);
      return;
    }

    if (existingGym && existingGym.id !== gym.id) {
      console.error(`❌ Slug "${newSlug}" already exists for another gym: ${existingGym.name}`);
      return;
    }

    // Step 2: Update the slug
    console.log('🔄 Step 2: Updating slug...');
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('gyms')
      .update({
        slug: newSlug,
        updated_at: new Date().toISOString()
      })
      .eq('id', gym.id)
      .select('id, name, slug, updated_at');

    if (updateError) {
      console.error('❌ Update error:', updateError);
      return;
    }

    if (!updated || updated.length === 0) {
      console.error('❌ Update failed - no rows updated');
      return;
    }

    console.log('✅ Update successful!');
    console.log('📋 Updated gym details:');
    console.log('   Name:', updated[0].name);
    console.log('   Old slug: 5-rounds-mma-limassol-limassol');
    console.log('   New slug:', updated[0].slug);
    console.log('   Updated at:', updated[0].updated_at);
    console.log('');
    console.log('🎉 Successfully updated slug!');
    console.log('');
    console.log('📝 Next step: Add redirect in app/gyms/[slug]/page.tsx:');
    console.log('   if (decodedSlug === \'5-rounds-mma-limassol-limassol\') {');
    console.log('     permanentRedirect(\'/gyms/5-rounds-mma-limassol\');');
    console.log('   }');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

fix5RoundsMMASlug();
