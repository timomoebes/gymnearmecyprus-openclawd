import { supabase } from '../lib/supabase/client';

async function findWorldGym() {
  console.log('🔍 Searching for World Gym...\n');

  // Search by name
  const { data: gyms, error } = await supabase
    .from('gyms')
    .select('id, name, slug, description')
    .ilike('name', '%world%gym%');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${gyms?.length || 0} gyms matching "World Gym":\n`);
  gyms?.forEach((gym, idx) => {
    console.log(`${idx + 1}. ${gym.name}`);
    console.log(`   Slug: ${gym.slug}`);
    console.log(`   Description preview: ${gym.description?.substring(0, 100)}...`);
    console.log('');
  });
}

findWorldGym();
