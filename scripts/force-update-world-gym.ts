import { supabase } from '../lib/supabase/client';

async function forceUpdateWorldGym() {
  console.log('🔄 Force updating World Gym Ayia Napa...\n');

  const newDescription = "World Gym Ayia Napa is a highly rated 4.9-star gym in Ayia Napa, Cyprus, fitness training. Located on monte napa, this fitness center offers workout equipment suitable for all fitness levels. With a 4.9 rating and 1264 reviews, it's recognized as one of the best gyms in Ayia Napa. Whether you're looking for workout facility in Ayia Napa, fitness programs, or gym facilities, World Gym Ayia Napa provides expert instruction in a welcoming environment. Join this premier Ayia Napa gym for expert fitness training.";

  // Try update with detailed response
  const { data, error, status, statusText } = await supabase
    .from('gyms')
    .update({
      description: newDescription,
      updated_at: new Date().toISOString()
    })
    .eq('slug', 'world-gym-ayia-napa')
    .select('id, name, slug, description, updated_at');

  console.log('Update Status:', status, statusText);
  console.log('Error:', error);
  console.log('Data returned:', data);

  if (data && data.length > 0) {
    console.log('\n✅ Update response:');
    console.log('Name:', data[0].name);
    console.log('Description length:', data[0].description?.length);
    console.log('Description preview:', data[0].description?.substring(0, 150));
    console.log('Updated at:', data[0].updated_at);
  }

  // Verify by reading again
  console.log('\n🔍 Reading from database again...');
  const { data: verify } = await supabase
    .from('gyms')
    .select('description, updated_at')
    .eq('slug', 'world-gym-ayia-napa')
    .single();

  if (verify) {
    console.log('Verified description preview:', verify.description?.substring(0, 150));
    console.log('Verified updated_at:', verify.updated_at);
  }
}

forceUpdateWorldGym();
