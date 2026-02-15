import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function updatePosedonioPricing() {
  try {
    // Find Poseidonio gym (search by name, case-insensitive)
    const { data: gym, error: fetchError } = await supabase
      .from("gyms")
      .select("id, name, city_id, pricing")
      .ilike("name", "%Poseidonio%")
      .single();

    if (fetchError) {
      console.error("Error fetching gym:", fetchError);
      process.exit(1);
    }

    if (!gym) {
      console.error("Poseidonio gym not found");
      process.exit(1);
    }

    console.log(`Found gym: ${gym.name} (ID: ${gym.id})`);
    console.log(`Current pricing:`, gym.pricing);

    // Update pricing
    const newPricing = {
      membership_12_months: {
        price: 199,
        currency: "EUR",
        description: "12-month membership"
      }
    };

    const { data: updated, error: updateError } = await supabase
      .from("gyms")
      .update({ pricing: newPricing })
      .eq("id", gym.id)
      .select();

    if (updateError) {
      console.error("Error updating pricing:", updateError);
      process.exit(1);
    }

    console.log("✅ Pricing updated successfully!");
    console.log(`New pricing for ${gym.name}:`, updated[0].pricing);
  } catch (error) {
    console.error("Unexpected error:", error);
    process.exit(1);
  }
}

updatePosedonioPricing();
