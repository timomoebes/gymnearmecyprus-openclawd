/**
 * Run Data Migration: Insert all mock gyms into Supabase
 * 
 * This script reads mock gym data and inserts it into Supabase using MCP functions.
 * 
 * Note: This requires the Supabase MCP server to be configured and accessible.
 */

import { gyms } from '../lib/data/gyms';
import { reviews } from '../lib/data/reviews';
import {
  CITY_UUIDS,
  SPECIALTY_UUIDS,
  generateGymInsertSQL,
  generateGymSpecialtiesSQL,
  generateGymAmenitiesSQL,
} from './migrate-mock-data-to-db';

// This script would be run via a Node.js environment with MCP client
// For now, we'll generate the SQL migration file

console.log('Generating migration SQL for', gyms.length, 'gyms...');

let migrationSQL = `
-- Migration: Insert mock gym data
-- Date: ${new Date().toISOString().split('T')[0]}
-- Total gyms: ${gyms.length}

BEGIN;

`;

// Insert each gym
for (const gym of gyms) {
  try {
    // Generate gym insert
    const gymSQL = generateGymInsertSQL(gym);
    
    // Extract gym ID from RETURNING clause (we'll need to capture it)
    migrationSQL += `
-- Insert gym: ${gym.name}
DO $$
DECLARE
  v_gym_id UUID;
BEGIN
  ${gymSQL.replace('RETURNING id;', 'RETURNING id INTO v_gym_id;')}
  
  -- Insert specialties
  ${generateGymSpecialtiesSQL('v_gym_id', gym.specialties)}
  
  -- Insert amenities
  ${generateGymAmenitiesSQL('v_gym_id', gym.amenities)}
END $$;

`;
  } catch (error) {
    console.error(`Error processing gym ${gym.name}:`, error);
  }
}

migrationSQL += `
COMMIT;
`;

// Write to file
import * as fs from 'fs';
import * as path from 'path';

const outputPath = path.join(__dirname, '../supabase/migrations/006_insert_mock_gyms.sql');
fs.writeFileSync(outputPath, migrationSQL);

console.log(`✅ Migration SQL generated: ${outputPath}`);
console.log(`📊 Total gyms: ${gyms.length}`);
console.log(`\n⚠️  Review the SQL file before applying!`);

