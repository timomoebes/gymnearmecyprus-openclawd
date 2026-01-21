/**
 * Update Gymania Fitness Club Limassol
 * 
 * Adds "Group Classes" amenity, Facebook link, updates review count to 386,
 * and restores the About section description.
 * 
 * Usage:
 *   npx tsx scripts/update-gymania-fitness-club-limassol.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';

async function updateGymaniaFitnessClubLimassol() {
  console.log('🔄 Updating Gymania Fitness Club Limassol...\n');
  console.log('   - Add amenity: Group Classes');
  console.log('   - Add Facebook: https://www.facebook.com/gymania.fitness.club.gym');
  console.log('   - Change review count: 386');
  console.log('   - Restore About section description\n');

  try {
    // Step 1: Find the gym by slug or name
    console.log('📋 Step 1: Searching for gym...');
    let gym;
    
    // Try slug first (try multiple possible slugs)
    const slugs = ['gymania-fitness-club-limassol', 'gymania-fitness-club', 'gymania-fitness'];
    
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
        .ilike('name', '%Gymania%')
        .ilike('name', '%Fitness Club%')
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
    console.log('   Current description length:', gym.description?.length || 0, 'characters');
    console.log('   Current social_media:', JSON.stringify(gym.social_media, null, 2));
    console.log('');

    // Step 2: Find Group Classes amenity ID
    console.log('📋 Step 2: Finding Group Classes amenity...');
    const { data: amenity, error: amenityError } = await supabaseAdmin
      .from('amenities')
      .select('id, name')
      .ilike('name', '%Group Classes%')
      .single();

    if (amenityError || !amenity) {
      console.error('❌ Amenity not found:', amenityError);
      return;
    }

    console.log('✅ Found amenity:', amenity.name);
    console.log('   Amenity ID:', amenity.id);
    console.log('');

    // Step 3: Check if amenity already exists for this gym
    console.log('📋 Step 3: Checking existing amenities...');
    const { data: existingAmenities, error: existingError } = await supabaseAdmin
      .from('gym_amenities')
      .select('amenity_id')
      .eq('gym_id', gym.id)
      .eq('amenity_id', amenity.id);

    if (existingError) {
      console.error('❌ Error checking existing amenities:', existingError);
      return;
    }

    if (existingAmenities && existingAmenities.length > 0) {
      console.log('⚠️  Group Classes amenity already exists for this gym');
    } else {
      // Step 4: Add Group Classes amenity
      console.log('📋 Step 4: Adding Group Classes amenity...');
      const { error: insertError } = await supabaseAdmin
        .from('gym_amenities')
        .insert({
          gym_id: gym.id,
          amenity_id: amenity.id
        });

      if (insertError) {
        console.error('❌ Error adding amenity:', insertError);
        return;
      }

      console.log('✅ Group Classes amenity added successfully!');
    }
    console.log('');

    // Step 5: Update social_media JSONB field and review count
    console.log('📝 Step 5: Preparing updates...');
    
    // Parse existing social_media or create new object
    let socialMedia: any = gym.social_media || {};
    
    // Update Facebook link
    socialMedia.facebook = 'https://www.facebook.com/gymania.fitness.club.gym';
    
    // Restore or update description
    let updatedDescription = gym.description || '';
    
    // If description is empty or very short, create a new comprehensive one
    if (!updatedDescription || updatedDescription.trim().length < 50) {
      updatedDescription = `Gymania Fitness Club in Limassol, Cyprus, is a premier fitness facility specializing in Zumba, Pilates, and group fitness classes. With a perfect 5.0 rating from 386 reviews, this family-friendly fitness club offers a comprehensive range of programs including Zumba classes, Pilates sessions, trampoline workouts, TRX training, yoga, and specialized classes for abs and legs. Perfect for all fitness levels, Gymania Fitness Club provides a welcoming environment with modern equipment, group classes, and flexible membership options starting from €35 per month. Whether you're looking for Zumba classes near me in Limassol, Pilates training, or family fitness programs, this facility caters to diverse fitness needs. Located in Limassol, the club features changing rooms, a kids' playground, and a supportive community atmosphere. Join Gymania Fitness Club and discover why it's one of the most highly rated fitness centers in Limassol with 386 positive reviews.`;
      console.log('   Creating new description (was empty or too short)');
    } else {
      // Update existing description to replace any review count mentions with 386
      updatedDescription = updatedDescription
        .replace(/\b\d+\s+reviews?\b/gi, '386 reviews')
        .replace(/from\s+\d+\s+reviews?\b/gi, 'from 386 reviews')
        .replace(/\(\d+\s+reviews?\)/gi, '(386 reviews)')
        .replace(/with\s+\d+\s+reviews?\b/gi, 'with 386 reviews');
      console.log('   Updating existing description');
    }
    
    console.log('   New social_media:');
    console.log('     Facebook:', socialMedia.facebook);
    if (socialMedia.instagram) {
      console.log('     Instagram:', socialMedia.instagram);
    }
    if (socialMedia.website) {
      console.log('     Website:', socialMedia.website);
    }
    console.log('   New review_count: 386');
    console.log('   Description length:', updatedDescription.length, 'characters');
    console.log('   Description updated:', updatedDescription !== (gym.description || '') ? 'YES' : 'NO');
    if (updatedDescription && updatedDescription.length > 0) {
      console.log('   Description preview:', updatedDescription.substring(0, 200) + '...');
    }
    console.log('');

    // Step 6: Apply updates
    console.log('🔄 Step 6: Updating database...');
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('gyms')
      .update({
        social_media: socialMedia,
        review_count: 386,
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
    console.log('   Description length:', updated[0].description?.length || 0, 'characters');
    console.log('   Social Media:');
    console.log('     Facebook:', updated[0].social_media?.facebook || 'Not set');
    if (updated[0].social_media?.instagram) {
      console.log('     Instagram:', updated[0].social_media.instagram);
    }
    console.log('   Updated at:', updated[0].updated_at);
    console.log('');
    console.log('🎉 Successfully updated Gymania Fitness Club Limassol!');
    console.log('   ✓ Group Classes amenity added');
    console.log('   ✓ Facebook: https://www.facebook.com/gymania.fitness.club.gym');
    console.log('   ✓ Review count: 386');
    console.log('   ✓ About section description restored');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updateGymaniaFitnessClubLimassol();
