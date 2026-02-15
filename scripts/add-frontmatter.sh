#!/bin/bash

GUIDES_DIR="docs/guides"

# Function to add frontmatter to a file
add_frontmatter() {
  local file=$1
  local title=$2
  local description=$3
  
  # Create frontmatter
  frontmatter="---
title: \"$title\"
description: \"$description\"
---

"
  
  # Create temp file with frontmatter + original content
  echo -n "$frontmatter" | cat - "$file" > "$file.tmp"
  mv "$file.tmp" "$file"
  
  echo "✅ Updated: $(basename $file)"
}

# Add frontmatter to each guide
add_frontmatter "$GUIDES_DIR/5-best-gyms-cyprus.md" \
  "Best Gyms in Cyprus: City Champions 2026 | Top-Rated Fitness Centers" \
  "Discover the #1 gym in each Cyprus city. 5-star rated, verified reviews, expert training. Find your champion gym near you in Limassol, Paphos, Nicosia & more."

add_frontmatter "$GUIDES_DIR/best-gyms-limassol-2026.md" \
  "Best Gyms in Limassol 2026 | Top 10 Fitness Centers & Reviews" \
  "Find the best gyms in Limassol. Compare 10 top-rated fitness centers with verified reviews, pricing, specialties. Iron Fitness, Grind Fitness & more."

add_frontmatter "$GUIDES_DIR/best-gyms-paphos-2026.md" \
  "Best Gyms in Paphos 2026 | Top-Rated Fitness Centers & Pricing" \
  "Discover the best gyms in Paphos. Kings BJJ, Poseidonio Health Spa & more. Compare facilities, pricing, reviews. Find your perfect gym near you."

add_frontmatter "$GUIDES_DIR/best-gyms-nicosia-2026.md" \
  "Best Gyms in Nicosia 2026 | Top Fitness Centers in Cyprus Capital" \
  "Find the best gyms in Nicosia. Gabriel Fitness, Maxx Fitness & more. Expert reviews, pricing, specialties. Your guide to fitness in Cyprus capital."

add_frontmatter "$GUIDES_DIR/best-gyms-larnaca-2026.md" \
  "Best Gyms in Larnaca 2026 | Top-Rated Fitness & Combat Sports Centers" \
  "Explore the best gyms in Larnaca. Samtsihara Fight System (5.0★), CrossFit, MMA & more. Find top-rated fitness centers with verified reviews."

add_frontmatter "$GUIDES_DIR/best-gyms-ayia-napa-2026.md" \
  "Best Gyms in Ayia Napa 2026 | World Gym & Top Fitness Centers" \
  "Find the best gyms in Ayia Napa. World Gym (4.9★, 1,266 reviews), premium facilities, tourist-friendly. Compare fitness centers near you."

add_frontmatter "$GUIDES_DIR/best-gyms-paralimni-2026.md" \
  "Best Gyms in Paralimni 2026 | Top Fitness Centers in East Cyprus" \
  "Discover the best gyms in Paralimni. Bodyart Fitness (5.0★), complete facilities, all fitness levels. Find your gym in Eastern Cyprus."

echo "🎉 All guides updated with SEO frontmatter!"
