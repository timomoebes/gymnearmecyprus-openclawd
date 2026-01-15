import { supabaseAdmin } from '../lib/supabase/admin-client';

async function addOverallMagicAmenities() {
  console.log('🔄 Adding amenities to Overall Magic Fitness Center...\n');

  try {
    // Step 1: Get gym ID
    console.log('📋 Step 1: Finding gym...');
    const { data: gym, error: gymError } = await supabaseAdmin
      .from('gyms')
      .select('id, name, slug')
      .eq('slug', 'overall-magic-fitness-center-ayia-napa')
      .single();

    if (gymError || !gym) {
      console.error('❌ Gym not found:', gymError);
      return;
    }

    console.log('✅ Found gym:', gym.name);
    console.log('   Gym ID:', gym.id);
    console.log('');

    // Step 2: Get current amenities
    console.log('📋 Step 2: Checking current amenities...');
    const { data: currentAmenities, error: currentError } = await supabaseAdmin
      .from('gym_amenities')
      .select('amenity:amenities(id, name)')
      .eq('gym_id', gym.id);

    if (currentError) {
      console.error('❌ Error fetching current amenities:', currentError);
      return;
    }

    const currentAmenityNames = currentAmenities?.map((ga: any) => ga.amenity?.name) || [];
    console.log('Current amenities:', currentAmenityNames.length > 0 ? currentAmenityNames.join(', ') : 'None');
    console.log('');

    // Step 3: Find amenity IDs for "Sauna" and "Cardio Equipment"
    console.log('📋 Step 3: Finding amenity IDs...');
    const { data: amenities, error: amenitiesError } = await supabaseAdmin
      .from('amenities')
      .select('id, name')
      .or('name.ilike.%sauna%,name.ilike.%cardio%equipment%');

    if (amenitiesError) {
      console.error('❌ Error finding amenities:', amenitiesError);
      return;
    }

    console.log('Found amenities:', amenities?.map(a => a.name).join(', ') || 'None');
    console.log('');

    if (!amenities || amenities.length === 0) {
      console.error('❌ Amenities "Sauna" or "Cardio Equipment" not found in database');
      console.log('Available amenities need to be checked in the amenities table');
      return;
    }

    // Step 4: Check which amenities to add
    const amenitiesToAdd = amenities.filter(amenity =>
      !currentAmenityNames.includes(amenity.name)
    );

    if (amenitiesToAdd.length === 0) {
      console.log('✅ All requested amenities already exist for this gym!');
      return;
    }

    console.log('📝 Step 4: Adding amenities...');
    console.log('   Amenities to add:', amenitiesToAdd.map(a => a.name).join(', '));
    console.log('');

    // Step 5: Insert gym_amenities records
    const gymAmenitiesRecords = amenitiesToAdd.map(amenity => ({
      gym_id: gym.id,
      amenity_id: amenity.id
    }));

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('gym_amenities')
      .insert(gymAmenitiesRecords)
      .select();

    if (insertError) {
      console.error('❌ Error inserting amenities:', insertError);
      return;
    }

    console.log('✅ Successfully added amenities!');
    console.log('   Added count:', inserted?.length || 0);
    console.log('');

    // Step 6: Verify final amenities list
    console.log('📋 Step 5: Verifying final amenities...');
    const { data: finalAmenities } = await supabaseAdmin
      .from('gym_amenities')
      .select('amenity:amenities(name)')
      .eq('gym_id', gym.id);

    const finalAmenityNames = finalAmenities?.map((ga: any) => ga.amenity?.name) || [];
    console.log('Final amenities:', finalAmenityNames.join(', '));
    console.log('');
    console.log('🎉 Successfully updated amenities for Overall Magic Fitness Center!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

addOverallMagicAmenities();
