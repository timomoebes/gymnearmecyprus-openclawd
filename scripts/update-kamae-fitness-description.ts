/**
 * Update Kamae Fitness - Add Member Praise to Description
 * 
 * Adds mention that gym members praise the high-quality equipment and professional trainers.
 * 
 * Usage:
 *   npx tsx scripts/update-kamae-fitness-description.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

async function updateKamaeFitnessDescription() {
  console.log('🔄 Updating Kamae Fitness description...\n');
  console.log('   - Add: Gym members praise the high-quality equipment and professional trainers\n');

  try {
    // Step 1: Find the gym by slug or name
    console.log('📋 Step 1: Searching for gym...');
    let gym;
    
    // Try slug first (try multiple possible slugs)
    const slugs = ['kamae-fitness', 'kamae-fitness-nicosia'];
    
    for (const slug of slugs) {
      const { data: gymBySlug, error: slugError } = await supabaseAdmin
        .from('gyms')
        .select('id, name, slug, description')
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
        .select('id, name, slug, description')
        .ilike('name', '%Kamae Fitness%')
        .limit(1);
      
      if (gymsByName && gymsByName.length > 0) {
        gym = gymsByName[0];
      }
    }

    if (!gym) {
      console.error('❌ Gym not found');
      console.error('   Tried slugs:', slugs.join(', '));
      console.error('   Tried name search: Kamae Fitness');
      return;
    }

    console.log('✅ Found gym:', gym.name);
    console.log('   Slug:', gym.slug);
    console.log('   Current description length:', gym.description?.length || 0, 'characters');
    console.log('');

    // Step 2: Update description
    console.log('📝 Step 2: Preparing updates...');
    
    let updatedDescription = gym.description || '';
    
    // Check if the mention already exists
    const praiseMention = 'gym members praise the high-quality equipment and professional trainers';
    const praiseMentionVariations = [
      'high-quality equipment',
      'professional trainers',
      'members praise',
      'praise the'
    ];
    
    const hasPraiseMention = praiseMentionVariations.some(variation => 
      updatedDescription.toLowerCase().includes(variation.toLowerCase())
    );
    
    if (!hasPraiseMention) {
      // Add the praise mention
      if (updatedDescription.trim().length > 0) {
        // Check if description ends with punctuation
        const trimmedDesc = updatedDescription.trim();
        const endsWithPunctuation = /[.!?]$/.test(trimmedDesc);
        
        if (endsWithPunctuation) {
          updatedDescription = trimmedDesc + ' Gym members praise the high-quality equipment in the gym and the professional trainers.';
        } else {
          updatedDescription = trimmedDesc + '. Gym members praise the high-quality equipment in the gym and the professional trainers.';
        }
      } else {
        updatedDescription = `Kamae Fitness is a premier fitness facility. Gym members praise the high-quality equipment in the gym and the professional trainers.`;
      }
      console.log('   Praise mention added to description');
    } else {
      console.log('   Praise mention already exists in description');
    }
    
    console.log('   Description updated:', updatedDescription !== (gym.description || '') ? 'YES' : 'NO');
    if (updatedDescription !== (gym.description || '')) {
      console.log('   Description preview:', updatedDescription.substring(0, 300) + (updatedDescription.length > 300 ? '...' : ''));
    }
    console.log('');

    // Step 3: Apply updates
    console.log('🔄 Step 3: Updating database...');
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('gyms')
      .update({
        description: updatedDescription,
        updated_at: new Date().toISOString()
      })
      .eq('id', gym.id)
      .select('id, name, slug, description, updated_at');

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
    console.log('   Description length:', updated[0].description?.length || 0, 'characters');
    console.log('   Updated at:', updated[0].updated_at);
    console.log('');
    console.log('🎉 Successfully updated Kamae Fitness!');
    console.log('   ✓ Added: Gym members praise the high-quality equipment and professional trainers');
    console.log('   ✓ Description updated');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updateKamaeFitnessDescription();
