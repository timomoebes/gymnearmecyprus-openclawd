/**
 * Update Kalopedi Gym Limassol - Review Count and Location Description
 * 
 * Updates review count to 36 everywhere and adds mention that gym is circa 300m from town hall.
 * 
 * Usage:
 *   npx tsx scripts/update-kalopedi-gym-reviews-location.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

async function updateKalopediGymReviewsLocation() {
  console.log('🔄 Updating Kalopedi Gym Limassol...\n');
  console.log('   - Review count: 36');
  console.log('   - Add location mention: circa 300m from town hall\n');

  try {
    // Step 1: Find the gym by slug or name
    console.log('📋 Step 1: Searching for gym...');
    let gym;
    
    // Try slug first (try multiple possible slugs)
    const slugs = ['kalopedi-gym', 'kalopedi-gym-limassol'];
    
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
        .ilike('name', '%Kalopedi%')
        .limit(1);
      
      if (gymsByName && gymsByName.length > 0) {
        gym = gymsByName[0];
      }
    }

    if (!gym) {
      console.error('❌ Gym not found');
      console.error('   Tried slugs:', slugs.join(', '));
      console.error('   Tried name search: Kalopedi');
      return;
    }

    console.log('✅ Found gym:', gym.name);
    console.log('   Slug:', gym.slug);
    console.log('   Current review_count:', gym.review_count);
    console.log('');

    // Step 2: Update description
    console.log('📝 Step 2: Preparing updates...');
    
    // Update description to replace any review count mentions with 36
    let updatedDescription = gym.description || '';
    updatedDescription = updatedDescription
      .replace(/\b\d+\s+reviews?\b/gi, '36 reviews')
      .replace(/from\s+\d+\s+reviews?\b/gi, 'from 36 reviews')
      .replace(/\(\d+\s+reviews?\)/gi, '(36 reviews)')
      .replace(/with\s+\d+\s+reviews?\b/gi, 'with 36 reviews')
      .replace(/\b\d+\s+rating[s]?\b/gi, '36 reviews')
      .replace(/rated\s+\d+/gi, 'rated 36');
    
    // Add location mention if not already present
    const locationMention = 'circa 300m far from the town hall';
    const locationMentionVariations = [
      '300m',
      '300 m',
      '300 meters',
      'town hall',
      'circa 300'
    ];
    
    const hasLocationMention = locationMentionVariations.some(variation => 
      updatedDescription.toLowerCase().includes(variation.toLowerCase())
    );
    
    if (!hasLocationMention) {
      // Add location mention at the end or in a natural place
      if (updatedDescription.trim().length > 0) {
        // Check if description ends with punctuation
        const trimmedDesc = updatedDescription.trim();
        const endsWithPunctuation = /[.!?]$/.test(trimmedDesc);
        
        if (endsWithPunctuation) {
          updatedDescription = trimmedDesc + ' Conveniently located ' + locationMention + '.';
        } else {
          updatedDescription = trimmedDesc + '. Conveniently located ' + locationMention + '.';
        }
      } else {
        updatedDescription = `Kalopedi Gym is conveniently located ${locationMention}.`;
      }
      console.log('   Location mention added to description');
    } else {
      console.log('   Location mention already exists in description');
    }
    
    console.log('   New review_count: 36');
    console.log('   Description updated:', updatedDescription !== (gym.description || '') ? 'YES' : 'NO');
    if (updatedDescription !== (gym.description || '')) {
      console.log('   Description preview:', updatedDescription.substring(0, 250) + (updatedDescription.length > 250 ? '...' : ''));
    }
    console.log('');

    // Step 3: Apply updates
    console.log('🔄 Step 3: Updating database...');
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('gyms')
      .update({
        review_count: 36,
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
    console.log('🎉 Successfully updated Kalopedi Gym Limassol!');
    console.log('   ✓ Review count: 36');
    console.log('   ✓ Location mention added: circa 300m from town hall');
    console.log('   ✓ Description updated');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updateKalopediGymReviewsLocation();
