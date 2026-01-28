/**
 * Apply Rating and Review Count Updates to Database
 * 
 * This script reads the updates JSON file and applies rating/review_count updates to Supabase.
 * 
 * Usage:
 *   npx tsx scripts/apply-rating-review-updates.ts
 */

import { supabaseAdmin } from '../lib/supabase/admin-client';
import * as fs from 'fs';
import * as path from 'path';

interface RatingReviewUpdate {
  gymId: string;
  gymName: string;
  currentRating: number | null;
  currentReviewCount: number | null;
  newRating: number | null;
  newReviewCount: number | null;
  needsUpdate: boolean;
}

async function applyUpdates() {
  console.log('='.repeat(80));
  console.log('APPLY RATING & REVIEW COUNT UPDATES');
  console.log('='.repeat(80));
  console.log();

  const updatesFile = path.resolve(process.cwd(), 'scripts/rating-review-updates.json');

  if (!fs.existsSync(updatesFile)) {
    console.error(`❌ Updates file not found: ${updatesFile}`);
    console.error('   Run batch-update-ratings-reviews.ts first to generate updates.');
    return;
  }

  const updates: RatingReviewUpdate[] = JSON.parse(
    fs.readFileSync(updatesFile, 'utf-8')
  );

  const updateableGyms = updates.filter(
    u => u.needsUpdate && u.newRating !== null && u.newReviewCount !== null
  );

  console.log(`📋 Found ${updateableGyms.length} gyms to update`);
  console.log();

  if (updateableGyms.length === 0) {
    console.log('✅ No updates needed!');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < updateableGyms.length; i++) {
    const update = updateableGyms[i];
    
    process.stdout.write(`[${i + 1}/${updateableGyms.length}] ${update.gymName.substring(0, 40).padEnd(40)} ... `);

    const { error } = await supabaseAdmin
      .from('gyms')
      .update({
        rating: update.newRating,
        review_count: update.newReviewCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', update.gymId);

    if (error) {
      console.log(`❌ ${error.message}`);
      errorCount++;
    } else {
      console.log(`✅ Updated`);
      successCount++;
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('UPDATE SUMMARY');
  console.log('='.repeat(80));
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log();
}

applyUpdates().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
