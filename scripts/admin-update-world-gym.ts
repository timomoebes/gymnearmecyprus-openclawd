import { supabaseAdmin } from '../lib/supabase/admin-client';

async function adminUpdateWorldGym() {
  console.log('🔐 Admin Update - World Gym Ayia Napa\n');

  const newDescription = "World Gym Ayia Napa is a highly rated 4.9-star gym in Ayia Napa, Cyprus, fitness training. Located on monte napa, this fitness center offers workout equipment suitable for all fitness levels. With a 4.9 rating and 1264 reviews, it's recognized as one of the best gyms in Ayia Napa. Whether you're looking for workout facility in Ayia Napa, fitness programs, or gym facilities, World Gym Ayia Napa provides expert instruction in a welcoming environment. Join this premier Ayia Napa gym for expert fitness training.";

  try {
    // Update with admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('gyms')
      .update({
        description: newDescription,
        updated_at: new Date().toISOString()
      })
      .eq('slug', 'world-gym-ayia-napa')
      .select('id, name, slug, description, updated_at');

    if (error) {
      console.error('❌ Update failed:', error);
      return;
    }

    if (!data || data.length === 0) {
      console.error('❌ No rows updated - gym not found or RLS policy blocking');
      return;
    }

    console.log('✅ Update successful!');
    console.log('📋 Updated gym:');
    console.log('   Name:', data[0].name);
    console.log('   Slug:', data[0].slug);
    console.log('   Updated at:', data[0].updated_at);
    console.log('   Description length:', data[0].description.length, 'characters');
    console.log('\n📝 New description:');
    console.log(data[0].description);
    console.log('\n🎉 Successfully updated World Gym Ayia Napa!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

adminUpdateWorldGym();
