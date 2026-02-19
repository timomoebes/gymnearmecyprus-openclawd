/**
 * Export a CSV template of gyms with no amenities for manual enrichment in LibreOffice Calc.
 * Run: npx tsx scripts/export-gyms-no-amenities-template.ts
 * Output: data/enrich/gyms-no-amenities-template.csv
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { writeFileSync, mkdirSync } from 'fs';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function escapeCsv(value: string): string {
  const s = String(value ?? '').replace(/"/g, '""');
  return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s}"` : s;
}

async function main() {
  console.log('🔍 Fetching gyms with no amenities...\n');

  const { data: gyms, error } = await supabase
    .from('gyms')
    .select(`
      id,
      name,
      slug,
      city:cities (name)
    `)
    .order('name');

  if (error) {
    console.error('❌ Error fetching gyms:', error);
    process.exit(1);
  }

  const gymIds = gyms?.map((g: any) => g.id) ?? [];
  const { data: gymAmenities } = await supabase
    .from('gym_amenities')
    .select('gym_id')
    .in('gym_id', gymIds);

  const gymIdsWithAmenities = new Set((gymAmenities || []).map((r: any) => r.gym_id));
  const noAmenities = (gyms || []).filter((g: any) => !gymIdsWithAmenities.has(g.id));

  const outDir = resolve(process.cwd(), 'data', 'enrich');
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, 'gyms-no-amenities-template.csv');

  const header = 'slug,name,city,amenities';
  const rows = noAmenities.map((g: any) => {
    const city = g.city?.name ?? '';
    return [escapeCsv(g.slug), escapeCsv(g.name), escapeCsv(city), ''].join(',');
  });
  const csv = [header, ...rows].join('\n');

  writeFileSync(outPath, csv, 'utf8');
  console.log(`✅ Wrote ${noAmenities.length} rows to ${outPath}`);
  console.log('   Open in LibreOffice Calc and fill the "amenities" column (comma-separated).');
  console.log('   See data/enrich/README-amenities-template.md for allowed amenity names.');
}

main();
