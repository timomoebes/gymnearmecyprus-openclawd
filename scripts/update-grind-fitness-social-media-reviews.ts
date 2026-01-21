/**
 * Update Grind Fitness - Social Media Links and Review Count
 * 
 * Updates Facebook and Instagram links in the social_media field
 * and changes review count to 74.
 * 
 * Usage:
 *   npx tsx scripts/update-grind-fitness-social-media-reviews.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

async function updateGrindFitnessSocialMediaReviews() {
  console.log('🔄 Updating Grind Fitness social media links and review count...\n');
  console.log('   - Facebook: https://www.facebook.com/grindfitnesscy');
  console.log('   - Instagram: https://www.instagram.com/grindfitnesscy/');
  console.log('   - Review count: 74\n');

  try {
    // Step 1: Find the gym by slug or name
    console.log('📋 Step 1: Searching for gym...');
    let gym;
    
    // Try slug first (try both possible slugs)
    const slugs = ['grind-fitness-limassol', 'grind-fitness'];
    
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
        .ilike('name', '%Grind Fitness%')
        .limit(1);
      
      if (gymsByName && gymsByName.length > 0) {
        gym = gymsByName[0];
      }
    }

    if (!gym) {
      console.error('❌ Gym not found');
      console.error('   Tried slugs:', slugs.join(', '));
      console.error('   Tried name search: Grind Fitness');
      return;
    }

    console.log('✅ Found gym:', gym.name);
    console.log('   Slug:', gym.slug);
    console.log('   Current review_count:', gym.review_count);
    console.log('   Current social_media:', JSON.stringify(gym.social_media, null, 2));
    console.log('');

    // Step 2: Update social_media JSONB field and review count
    console.log('📝 Step 2: Preparing updates...');
    
    // Parse existing social_media or create new object
    let socialMedia: any = gym.social_media || {};
    
    // Update Facebook and Instagram links
    socialMedia.facebook = 'https://www.facebook.com/grindfitnesscy';
    socialMedia.instagram = 'https://www.instagram.com/grindfitnesscy/';
    
    // Update description to replace any review count mentions with 74
    let updatedDescription = gym.description || '';
    updatedDescription = updatedDescription
      .replace(/\b\d+\s+reviews?\b/gi, '74 reviews')
      .replace(/from\s+\d+\s+reviews?\b/gi, 'from 74 reviews')
      .replace(/\(\d+\s+reviews?\)/gi, '(74 reviews)')
      .replace(/with\s+\d+\s+reviews?\b/gi, 'with 74 reviews');
    
    console.log('   New social_media:');
    console.log('     Facebook:', socialMedia.facebook);
    console.log('     Instagram:', socialMedia.instagram);
    console.log('   New review_count: 74');
    console.log('   Description updated:', updatedDescription !== gym.description ? 'YES' : 'NO');
    if (updatedDescription !== gym.description) {
      console.log('   Description preview:', updatedDescription.substring(0, 150) + '...');
    }
    console.log('');

    // Step 3: Apply updates
    console.log('🔄 Step 3: Updating database...');
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('gyms')
      .update({
        social_media: socialMedia,
        review_count: 74,
        description: updatedDescription,
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
    console.log('     Instagram:', updated[0].social_media?.instagram || 'Not set');
    console.log('   Updated at:', updated[0].updated_at);
    console.log('');
    console.log('🎉 Successfully updated Grind Fitness!');
    console.log('   ✓ Facebook: https://www.facebook.com/grindfitnesscy');
    console.log('   ✓ Instagram: https://www.instagram.com/grindfitnesscy/');
    console.log('   ✓ Review count: 74');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updateGrindFitnessSocialMediaReviews();
