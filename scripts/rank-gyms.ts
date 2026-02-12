import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // First get cities
  const { data: cities } = await supabase.from('cities').select('id, name');
  if (!cities) return;

  const results = {};

  for (const city of cities) {
    const { data: gyms } = await supabase
      .from('gyms')
      .select('name, rating, review_count')
      .eq('city_id', city.id)
      .order('rating', { ascending: false })
      .order('review_count', { ascending: false })
      .limit(5);
    
    results[city.name] = gyms;
  }

  console.log(JSON.stringify(results, null, 2));
}

run();
