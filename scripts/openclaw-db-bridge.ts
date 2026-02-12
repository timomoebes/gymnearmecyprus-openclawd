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
  const command = process.argv[2];
  const table = process.argv[3];
  
  if (command === 'list-gyms') {
    const { data, error } = await supabase
      .from('gyms')
      .select('name, slug, city, created_at')
      .limit(5);
      
    if (error) console.error(error);
    else console.log(JSON.stringify(data, null, 2));
  } else if (command === 'list-all-descriptions') {
    const { data, error } = await supabase
      .from('gyms')
      .select('name, description');
      
    if (error) console.error(error);
    else console.log(JSON.stringify(data));
  } else if (command === 'update-description') {
    const name = process.argv[3];
    const description = process.argv[4];
    const { data, error } = await supabase
      .from('gyms')
      .select('id')
      .eq('name', name)
      .single();
      
    if (error) {
      console.error(`Gym not found: ${name}`);
    } else {
      const { error: updateError } = await supabase
        .from('gyms')
        .update({ description })
        .eq('id', data.id);
        
      if (updateError) console.error(updateError);
      else console.log(`Successfully updated description for: ${name}`);
    }
  } else if (command === 'count') {
    const { count, error } = await supabase
      .from(table || 'gyms')
      .select('*', { count: 'exact', head: true });
      
    if (error) console.error(error);
    else console.log(`${table || 'gyms'} count: ${count}`);
  }
}

run();
