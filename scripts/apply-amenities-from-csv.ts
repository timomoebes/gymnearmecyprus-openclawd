/**
 * Apply amenity enrichment from a CSV file to the database.
 * CSV must have columns: slug, name, city, amenities (comma-separated amenity names).
 * Run: npx tsx scripts/apply-amenities-from-csv.ts [path/to/enriched.csv]
 * Default path: data/enrich/gyms-no-amenities-enriched.csv
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DEFAULT_CSV = resolve(process.cwd(), 'data', 'enrich', 'gyms-no-amenities-enriched.csv');

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if ((c === ',' && !inQuotes) || (c === '\n' && !inQuotes)) {
      out.push(cur.trim());
      cur = '';
      if (c === '\n') break;
    } else if (c !== '\r') {
      cur += c;
    }
  }
  if (cur.length) out.push(cur.trim());
  return out;
}

async function main() {
  const csvPath = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : DEFAULT_CSV;
  if (!existsSync(csvPath)) {
    console.error(`❌ File not found: ${csvPath}`);
    console.error('   Create it by filling data/enrich/gyms-no-amenities-template.csv and saving as gyms-no-amenities-enriched.csv');
    process.exit(1);
  }

  const raw = readFileSync(csvPath, 'utf8');
  const lines = raw.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) {
    console.error('❌ CSV must have header + at least one data row.');
    process.exit(1);
  }

  const header = parseCsvLine(lines[0]).map(h => h.toLowerCase());
  const slugIdx = header.indexOf('slug');
  const amenitiesIdx = header.indexOf('amenities');
  if (slugIdx === -1 || amenitiesIdx === -1) {
    console.error('❌ CSV must have columns: slug, amenities');
    process.exit(1);
  }

  const rows: { slug: string; amenities: string[] }[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]);
    const slug = (cells[slugIdx] ?? '').trim();
    const amenityCell = (cells[amenitiesIdx] ?? '').trim();
    if (!slug) continue;
    const amenities = amenityCell
      .split(',')
      .map(a => a.trim())
      .filter(Boolean);
    rows.push({ slug, amenities });
  }

  const { data: amenities } = await supabase.from('amenities').select('id, name');
  const nameToId = new Map<string, string>((amenities || []).map((a: any) => [a.name, a.id]));

  let applied = 0;
  let skipped = 0;
  for (const row of rows) {
    if (row.amenities.length === 0) {
      skipped++;
      continue;
    }

    const { data: gym } = await supabase.from('gyms').select('id').eq('slug', row.slug).single();
    if (!gym) {
      console.warn(`  ⚠️  Slug not found: ${row.slug}`);
      continue;
    }

    const ids = row.amenities
      .map(n => nameToId.get(n))
      .filter(Boolean) as string[];
    const unknown = row.amenities.filter(n => !nameToId.has(n));
    if (unknown.length) console.warn(`  ⚠️  Unknown amenity names for ${row.slug}: ${unknown.join(', ')}`);

    const existing = await supabase
      .from('gym_amenities')
      .select('amenity_id')
      .eq('gym_id', gym.id);
    const existingIds = new Set((existing.data || []).map((r: any) => r.amenity_id));
    const toAdd = ids.filter(id => !existingIds.has(id));
    if (toAdd.length === 0) continue;

    const { error } = await supabase
      .from('gym_amenities')
      .insert(toAdd.map(amenity_id => ({ gym_id: gym.id, amenity_id })));
    if (error) {
      console.error(`  ❌ ${row.slug}:`, error.message);
      continue;
    }
    console.log(`  ✅ ${row.slug} → added ${toAdd.length}`);
    applied += toAdd.length;
  }

  console.log(`\n✅ Applied ${applied} new amenity links from ${rows.length} rows (${skipped} rows had empty amenities).`);
}

main();
