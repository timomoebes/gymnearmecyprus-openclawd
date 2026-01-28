/**
 * Update Johnny's Gym Paphos - Review Count
 * 
 * Updates review count to 110 everywhere (database field and description text).
 * 
 * Usage:
 *   npx tsx scripts/update-johnnys-gym-reviews.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

async function updateJohnnysGymReviews() {
  console.log('🔄 Updating Johnny\'s Gym Paphos review count...\n');
  console.log('   - Review count: 110\n');

  try {
    // Step 1: Find the gym by slug or name
    console.log('📋 Step 1: Searching for gym...');
    let gym;
    
    // Try slug first (try multiple possible slugs)
    const slugs = ['johnnys-gym', 'johnnys-gym-paphos', 'johnnys-gym-paphos'];
    
    for (const slug of slugs) {
      const { data: gymBySlug, error: slugError } = await supabaseAdmin
        .from('gyms')
        .select('id, name, slug, review_count, description')
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
        .select('id, name, slug, review_count, description')
        .ilike('name', '%Johnny%Gym%')
        .limit(1);
      
      if (gymsByName && gymsByName.length > 0) {
        gym = gymsByName[0];
      }
    }

    if (!gym) {
      console.error('❌ Gym not found');
      console.error('   Tried slugs:', slugs.join(', '));
      console.error('   Tried name search: Johnny Gym');
      return;
    }

    console.log('✅ Found gym:', gym.name);
    console.log('   Slug:', gym.slug);
    console.log('   Current review_count:', gym.review_count);
    console.log('');

    // Step 2: Update description to replace any review count mentions with 110
    console.log('📝 Step 2: Preparing updates...');
    
    // Update description to replace any review count mentions with 110
    let updatedDescription = gym.description || '';
    updatedDescription = updatedDescription
      .replace(/\b\d+\s+reviews?\b/gi, '110 reviews')
      .replace(/from\s+\d+\s+reviews?\b/gi, 'from 110 reviews')
      .replace(/\(\d+\s+reviews?\)/gi, '(110 reviews)')
      .replace(/with\s+\d+\s+reviews?\b/gi, 'with 110 reviews')
      .replace(/\b\d+\s+rating[s]?\b/gi, '110 reviews')
      .replace(/rated\s+\d+/gi, 'rated 110');
    
    console.log('   New review_count: 110');
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
        review_count: 110,
        description: updatedDescription,
        updated_at: new Date().toISOString()
      })
      .eq('id', gym.id)
      .select('id, name, slug, review_count, description, updated_at');

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
    console.log('   Updated at:', updated[0].updated_at);
    console.log('');
    console.log('🎉 Successfully updated Johnny\'s Gym Paphos!');
    console.log('   ✓ Review count: 110');
    console.log('   ✓ Description updated with new review count');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updateJohnnysGymReviews();
