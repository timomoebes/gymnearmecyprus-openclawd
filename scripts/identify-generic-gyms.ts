import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the project root
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // 1. Fetch gyms with generic descriptions
  console.log('Fetching gyms with generic descriptions...');
  const { data: gyms, error } = await supabase
    .from('gyms')
    .select('id, name, description')
    .filter('description', 'ilike', '%offers workout equipment suitable for all fitness levels%');

  if (error) {
    console.error('Error fetching gyms:', error);
    return;
  }

  // 2. Filter for unique names
  const uniqueGyms = [];
  const seenNames = new Set();
  
  // Skip names already processed in Batches 1-3
  const processedNames = new Set([
    "Gabriel Fitness & Boxing Gym",
    "Hyper Fitness Club",
    "Science Fit",
    "Mr Cyprus Gym",
    "Athletic Fitness Center",
    "Hupex Fitness",
    "Destination Fitness",
    "World Gym Ayia Napa",
    "ASF&PERFORMANCE",
    "Muscle Factory 24 Hours",
    "Vinyasa Yoga Studio Limassol",
    "Lemesos Sporting Center",
    "FITNESS Lab",
    "Live Studio Mike"
  ]);

  for (const gym of gyms) {
    if (!seenNames.has(gym.name) && !processedNames.has(gym.name)) {
      uniqueGyms.push(gym);
      seenNames.add(gym.name);
    }
  }

  console.log(`Found ${uniqueGyms.length} unique gyms to enrich.`);

  // 2. Output the list to a temporary file for the agent to process
  // We'll process them in batches or one by one using web_search
  const listPath = path.resolve(__dirname, '../../enhancements/enrichment-queue.json');
  const fs = await import('fs');
  fs.writeFileSync(listPath, JSON.stringify(uniqueGyms, null, 2));
  console.log(`Queue saved to ${listPath}`);
}

run();
