import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDataFreshness() {
  console.log('='.repeat(80));
  console.log('CHECKING DATA FRESHNESS');
  console.log('='.repeat(80));
  console.log();

  // Get all gyms with their updated_at timestamps
  const { data: gyms, error } = await supabase
    .from('gyms')
    .select('id, name, updated_at, created_at')
    .order('updated_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching gyms:', error);
    return;
  }

  if (!gyms || gyms.length === 0) {
    console.log('No gyms found');
    return;
  }

  const now = new Date();
  const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // 60 days ago

  console.log(`Current date: ${now.toISOString()}`);
  console.log(`2 months ago: ${twoMonthsAgo.toISOString()}`);
  console.log();

  console.log('Most recently updated gyms:');
  console.log('-'.repeat(80));
  
  let oldDataCount = 0;
  let recentDataCount = 0;

  gyms.forEach((gym, index) => {
    const updatedAt = new Date(gym.updated_at);
    const isOld = updatedAt < twoMonthsAgo;
    const daysSinceUpdate = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
    
    if (isOld) oldDataCount++;
    else recentDataCount++;

    console.log(`${index + 1}. ${gym.name.substring(0, 50).padEnd(50)}`);
    console.log(`   Updated: ${updatedAt.toISOString()} (${daysSinceUpdate} days ago)`);
    console.log(`   Status: ${isOld ? '⚠️  OLD (>2 months)' : '✅ Recent'}`);
    console.log();
  });

  // Check overall statistics
  const { data: allGyms, error: statsError } = await supabase
    .from('gyms')
    .select('updated_at');

  if (!statsError && allGyms) {
    const oldGyms = allGyms.filter(g => new Date(g.updated_at) < twoMonthsAgo);
    const recentGyms = allGyms.filter(g => new Date(g.updated_at) >= twoMonthsAgo);

    console.log('='.repeat(80));
    console.log('OVERALL STATISTICS');
    console.log('='.repeat(80));
    console.log(`Total gyms: ${allGyms.length}`);
    console.log(`Recent updates (last 2 months): ${recentGyms.length} (${Math.round(recentGyms.length / allGyms.length * 100)}%)`);
    console.log(`Old data (>2 months): ${oldGyms.length} (${Math.round(oldGyms.length / allGyms.length * 100)}%)`);
    console.log();
  }

  console.log('='.repeat(80));
}

checkDataFreshness().catch(console.error);
