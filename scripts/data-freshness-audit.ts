import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function auditDataFreshness() {
  console.log("🔍 Starting Data Freshness Audit...\n");

  // Fetch all gyms
  const { data: gyms, error } = await supabase
    .from("gyms")
    .select("*");

  if (error) {
    console.error("Error fetching gyms:", error);
    process.exit(1);
  }

  if (!gyms || gyms.length === 0) {
    console.log("No gyms found in database");
    process.exit(1);
  }

  console.log(`📊 Total gyms in database: ${gyms.length}\n`);

  // Data quality metrics
  const missingFields: any = {
    description: [],
    phone: [],
    email: [],
    website: [],
    logo_url: [],
    cover_image_url: [],
    opening_hours: [],
    pricing: [],
    amenities: [],
    specialties: [],
    featured_images: [],
  };

  const shortDescriptions: any[] = [];
  const lowRatingGyms: any[] = [];
  const noReviewsGyms: any[] = [];
  const outdatedOpeningHours: any[] = [];

  gyms.forEach((gym: any) => {
    // Check for missing critical fields
    if (!gym.description || gym.description.trim() === "") {
      missingFields.description.push({ id: gym.id, name: gym.name });
    }
    if (!gym.phone || gym.phone.trim() === "") {
      missingFields.phone.push({ id: gym.id, name: gym.name });
    }
    if (!gym.email || gym.email.trim() === "") {
      missingFields.email.push({ id: gym.id, name: gym.name });
    }
    if (!gym.website || gym.website.trim() === "") {
      missingFields.website.push({ id: gym.id, name: gym.name });
    }
    if (!gym.logo_url || gym.logo_url.trim() === "") {
      missingFields.logo_url.push({ id: gym.id, name: gym.name });
    }
    if (!gym.cover_image_url || gym.cover_image_url.trim() === "") {
      missingFields.cover_image_url.push({ id: gym.id, name: gym.name });
    }
    if (!gym.opening_hours || Object.keys(gym.opening_hours).length === 0) {
      missingFields.opening_hours.push({ id: gym.id, name: gym.name });
    }
    if (!gym.pricing || Object.keys(gym.pricing).length === 0) {
      missingFields.pricing.push({ id: gym.id, name: gym.name });
    }
    if (!gym.amenities || gym.amenities.length === 0) {
      missingFields.amenities.push({ id: gym.id, name: gym.name });
    }
    if (!gym.specialties || gym.specialties.length === 0) {
      missingFields.specialties.push({ id: gym.id, name: gym.name });
    }
    if (!gym.featured_images || gym.featured_images.length === 0) {
      missingFields.featured_images.push({ id: gym.id, name: gym.name });
    }

    // Check for short descriptions (<150 chars)
    if (gym.description && gym.description.length < 150) {
      shortDescriptions.push({
        id: gym.id,
        name: gym.name,
        descriptionLength: gym.description.length,
      });
    }

    // Check for low ratings (< 4.0)
    if (gym.rating && gym.rating < 4.0) {
      lowRatingGyms.push({
        id: gym.id,
        name: gym.name,
        rating: gym.rating,
      });
    }

    // Check for gyms with no reviews
    if (!gym.review_count || gym.review_count === 0) {
      noReviewsGyms.push({ id: gym.id, name: gym.name });
    }
  });

  // Generate report
  console.log("=" .repeat(80));
  console.log("DATA FRESHNESS AUDIT REPORT");
  console.log("=" .repeat(80));
  console.log("\n");

  console.log("🔴 CRITICAL: Missing Required Fields\n");
  console.log(`Description missing: ${missingFields.description.length} gyms`);
  if (missingFields.description.length > 0) {
    console.log(missingFields.description.slice(0, 5).map((g: any) => `  - ${g.name}`).join("\n"));
    if (missingFields.description.length > 5) {
      console.log(`  ... and ${missingFields.description.length - 5} more\n`);
    }
  }

  console.log(`\nPhone missing: ${missingFields.phone.length} gyms`);
  if (missingFields.phone.length > 0) {
    console.log(missingFields.phone.slice(0, 5).map((g: any) => `  - ${g.name}`).join("\n"));
  }

  console.log(`\nEmail missing: ${missingFields.email.length} gyms`);
  if (missingFields.email.length > 0) {
    console.log(missingFields.email.slice(0, 5).map((g: any) => `  - ${g.name}`).join("\n"));
  }

  console.log("\n");
  console.log("🟡 MEDIUM PRIORITY: Missing Optional Fields\n");
  console.log(`Website missing: ${missingFields.website.length} gyms`);
  console.log(`Logo missing: ${missingFields.logo_url.length} gyms`);
  console.log(`Cover image missing: ${missingFields.cover_image_url.length} gyms`);
  console.log(`Opening hours missing: ${missingFields.opening_hours.length} gyms`);
  console.log(`Pricing info missing: ${missingFields.pricing.length} gyms`);
  console.log(`Amenities missing: ${missingFields.amenities.length} gyms`);
  console.log(`Specialties missing: ${missingFields.specialties.length} gyms`);
  console.log(`Featured images missing: ${missingFields.featured_images.length} gyms`);

  console.log("\n");
  console.log("⚠️  QUALITY ISSUES\n");
  console.log(`Short descriptions (<150 chars): ${shortDescriptions.length} gyms`);
  if (shortDescriptions.length > 0) {
    console.log(shortDescriptions.slice(0, 3).map((g: any) => 
      `  - ${g.name} (${g.descriptionLength} chars)`
    ).join("\n"));
  }

  console.log(`\nLow ratings (<4.0): ${lowRatingGyms.length} gyms`);
  if (lowRatingGyms.length > 0) {
    console.log(lowRatingGyms.slice(0, 3).map((g: any) => 
      `  - ${g.name} (${g.rating}★)`
    ).join("\n"));
  }

  console.log(`\nNo reviews: ${noReviewsGyms.length} gyms`);

  console.log("\n");
  console.log("=" .repeat(80));
  console.log("SUMMARY");
  console.log("=" .repeat(80));
  
  const completenessScore = (
    (gyms.length - missingFields.description.length) / gyms.length * 100
  ).toFixed(1);
  
  console.log(`\nData Completeness Score: ${completenessScore}% (based on description field)`);
  console.log(`Total gyms needing attention: ${
    missingFields.description.length + 
    missingFields.phone.length + 
    shortDescriptions.length
  }`);

  console.log("\n✅ Audit complete. Save this report for reference.\n");

  // Write JSON report
  const report = {
    auditDate: new Date().toISOString(),
    totalGyms: gyms.length,
    missingFields,
    shortDescriptions,
    lowRatingGyms,
    noReviewsGyms,
    completenessScore: parseFloat(completenessScore),
  };

  const fs = require("fs");
  fs.writeFileSync(
    "data-freshness-report.json",
    JSON.stringify(report, null, 2)
  );
  console.log("📄 Detailed report saved to: data-freshness-report.json\n");
}

auditDataFreshness();
