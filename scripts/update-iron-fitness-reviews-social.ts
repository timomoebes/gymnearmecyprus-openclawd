/**
 * Update Iron Fitness Limassol - Review Count and Social Media
 * 
 * Updates review count to 235 everywhere and adds Facebook and Instagram links.
 * 
 * Usage:
 *   npx tsx scripts/update-iron-fitness-reviews-social.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

async function updateIronFitnessReviewsSocial() {
  console.log('🔄 Updating Iron Fitness Limassol...\n');
  console.log('   - Review count: 235');
  console.log('   - Facebook: http://facebook.com/profile.php?id=100044156393070');
  console.log('   - Instagram: https://www.instagram.com/iron_fitness_cy/\n');

  try {
    // Step 1: Find the gym by slug or name
    console.log('📋 Step 1: Searching for gym...');
    let gym;
    
    // Try slug first (try multiple possible slugs)
    const slugs = ['iron-fitness', 'iron-fitness-limassol'];
    
    for (const slug of slugs) {
      const { data: gymBySlug, error: slugError } = await supabaseAdmin
        .from('gyms')
        .select('id, name, slug, review_count, description, social_media')
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
        .select('id, name, slug, review_count, description, social_media')
        .ilike('name', '%Iron Fitness%')
        .limit(1);
      
      if (gymsByName && gymsByName.length > 0) {
        gym = gymsByName[0];
      }
    }

    if (!gym) {
      console.error('❌ Gym not found');
      console.error('   Tried slugs:', slugs.join(', '));
      console.error('   Tried name search: Iron Fitness');
      return;
    }

    console.log('✅ Found gym:', gym.name);
    console.log('   Slug:', gym.slug);
    console.log('   Current review_count:', gym.review_count);
    console.log('   Current social_media:', JSON.stringify(gym.social_media, null, 2));
    console.log('');

    // Step 2: Update description and social media
    console.log('📝 Step 2: Preparing updates...');
    
    // Update description to replace any review count mentions with 235
    let updatedDescription = gym.description || '';
    updatedDescription = updatedDescription
      .replace(/\b\d+\s+reviews?\b/gi, '235 reviews')
      .replace(/from\s+\d+\s+reviews?\b/gi, 'from 235 reviews')
      .replace(/\(\d+\s+reviews?\)/gi, '(235 reviews)')
      .replace(/with\s+\d+\s+reviews?\b/gi, 'with 235 reviews')
      .replace(/\b\d+\s+rating[s]?\b/gi, '235 reviews')
      .replace(/rated\s+\d+/gi, 'rated 235');
    
    // Parse existing social_media or create new object
    let socialMedia: any = gym.social_media || {};
    
    // Update Facebook and Instagram links
    socialMedia.facebook = 'http://facebook.com/profile.php?id=100044156393070';
    socialMedia.instagram = 'https://www.instagram.com/iron_fitness_cy/';
    
    console.log('   New review_count: 235');
    console.log('   New social_media:');
    console.log('     Facebook:', socialMedia.facebook);
    console.log('     Instagram:', socialMedia.instagram);
    if (socialMedia.website) {
      console.log('     Website:', socialMedia.website);
    }
    console.log('   Description updated:', updatedDescription !== (gym.description || '') ? 'YES' : 'NO');
    if (updatedDescription !== (gym.description || '')) {
      console.log('   Description preview:', updatedDescription.substring(0, 200) + (updatedDescription.length > 200 ? '...' : ''));
    }
    console.log('');

    // Step 3: Apply updates
    console.log('🔄 Step 3: Updating database...');
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('gyms')
      .update({
        review_count: 235,
        description: updatedDescription,
        social_media: socialMedia,
        updated_at: new Date().toISOString()
      })
      .eq('id', gym.id)
      .select('id, name, slug, review_count, description, social_media, updated_at');

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
    console.log('     Instagram:', updated[0].social_media?.instagram || 'Not set');
    if (updated[0].social_media?.website) {
      console.log('     Website:', updated[0].social_media.website);
    }
    console.log('   Updated at:', updated[0].updated_at);
    console.log('');
    console.log('🎉 Successfully updated Iron Fitness Limassol!');
    console.log('   ✓ Review count: 235');
    console.log('   ✓ Facebook: http://facebook.com/profile.php?id=100044156393070');
    console.log('   ✓ Instagram: https://www.instagram.com/iron_fitness_cy/');
    console.log('   ✓ Description updated with new review count');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updateIronFitnessReviewsSocial();
