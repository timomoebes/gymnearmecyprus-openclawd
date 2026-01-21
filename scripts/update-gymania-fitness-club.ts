/**
 * Update Gymania Fitness Club Limassol
 * 
 * - Adds "Group Classes" amenity
 * - Adds Facebook link: https://www.facebook.com/gymania.fitness.club.gym
 * - Changes review count to 386
 * - Does NOT modify description/about section
 * 
 * Usage:
 *   npx tsx scripts/update-gymania-fitness-club.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

// Group Classes amenity UUID (from database)
const GROUP_CLASSES_AMENITY_ID = '10959b05-8018-4780-a7d5-5053086d246a';

async function updateGymaniaFitnessClub() {
  console.log('🔄 Updating Gymania Fitness Club Limassol...\n');
  console.log('   - Add Group Classes amenity');
  console.log('   - Add Facebook: https://www.facebook.com/gymania.fitness.club.gym');
  console.log('   - Change review count to 386');
  console.log('   - Keep description unchanged\n');

  try {
    // Step 1: Find the gym by slug or name
    console.log('📋 Step 1: Searching for gym...');
    let gym;
    
    // Try slug first
    const slugs = ['gymania-fitness-club-limassol', 'gymania-fitness-club'];
    
    for (const slug of slugs) {
      const { data: gymBySlug, error: slugError } = await supabaseAdmin
        .from('gyms')
        .select('id, name, slug, social_media, review_count, description')
        .eq('slug', slug)
        .single();

      if (!slugError && gymBySlug) {
        gym = gymBySlug;
        break;
      }
    }

    // If not found by slug, try by name
    if (!gym) {
      const { data: gymsByName } = await supabaseAdmin
        .from('gyms')
        .select('id, name, slug, social_media, review_count, description')
        .ilike('name', '%Gymania Fitness Club%')
        .limit(1);
      
      if (gymsByName && gymsByName.length > 0) {
        gym = gymsByName[0];
      }
    }

    if (!gym) {
      console.error('❌ Gym not found');
      console.error('   Tried slugs:', slugs.join(', '));
      console.error('   Tried name search: Gymania Fitness Club');
      return;
    }

    console.log('✅ Found gym:', gym.name);
    console.log('   Slug:', gym.slug);
    console.log('   Current review_count:', gym.review_count);
    console.log('   Current social_media:', JSON.stringify(gym.social_media, null, 2));
    console.log('');

    // Step 2: Check if Group Classes amenity already exists
    console.log('📋 Step 2: Checking existing amenities...');
    const { data: existingAmenities, error: amenitiesError } = await supabaseAdmin
      .from('gym_amenities')
      .select('amenity_id')
      .eq('gym_id', gym.id)
      .eq('amenity_id', GROUP_CLASSES_AMENITY_ID);

    if (amenitiesError) {
      console.error('❌ Error checking amenities:', amenitiesError);
      return;
    }

    const hasGroupClasses = existingAmenities && existingAmenities.length > 0;
    console.log('   Group Classes amenity:', hasGroupClasses ? 'Already exists' : 'Will be added');
    console.log('');

    // Step 3: Prepare updates
    console.log('📝 Step 3: Preparing updates...');
    
    // Parse existing social_media or create new object
    let socialMedia: any = gym.social_media || {};
    
    // Update Facebook link
    socialMedia.facebook = 'https://www.facebook.com/gymania.fitness.club.gym';
    
    console.log('   New social_media:');
    console.log('     Facebook:', socialMedia.facebook);
    console.log('   New review_count: 386');
    console.log('   Description: Will NOT be modified (keeping as is)');
    console.log('');

    // Step 4: Add Group Classes amenity if not exists
    if (!hasGroupClasses) {
      console.log('🔄 Step 4: Adding Group Classes amenity...');
      const { error: insertError } = await supabaseAdmin
        .from('gym_amenities')
        .insert({
          gym_id: gym.id,
          amenity_id: GROUP_CLASSES_AMENITY_ID
        });

      if (insertError) {
        console.error('❌ Error adding amenity:', insertError);
        return;
      }
      console.log('✅ Group Classes amenity added');
    } else {
      console.log('✅ Step 4: Group Classes amenity already exists, skipping');
    }
    console.log('');

    // Step 5: Update gym (social media, review count, but NOT description)
    console.log('🔄 Step 5: Updating gym (social media and review count)...');
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('gyms')
      .update({
        social_media: socialMedia,
        review_count: 386,
        // Explicitly NOT updating description - it stays as before
        updated_at: new Date().toISOString()
      })
      .eq('id', gym.id)
      .select('id, name, slug, social_media, review_count, description, updated_at');

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
    console.log('   Slug:', updated[0].slug);
    console.log('   Review count:', updated[0].review_count);
    console.log('   Social Media:');
    console.log('     Facebook:', updated[0].social_media?.facebook || 'Not set');
    console.log('   Description: Unchanged (preserved as requested)');
    console.log('   Updated at:', updated[0].updated_at);
    console.log('');
    console.log('🎉 Successfully updated Gymania Fitness Club!');
    console.log('   ✓ Group Classes amenity added');
    console.log('   ✓ Facebook: https://www.facebook.com/gymania.fitness.club.gym');
    console.log('   ✓ Review count: 386');
    console.log('   ✓ Description: Preserved (not modified)');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updateGymaniaFitnessClub();
