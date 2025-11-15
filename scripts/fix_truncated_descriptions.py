"""
Fix truncated gym descriptions that end with "..."
Regenerates descriptions for gyms with truncated text
"""

import pandas as pd
from pathlib import Path
from datetime import datetime

# Specialty slug to name mapping
SPECIALTY_SLUG_TO_NAME = {
    '24-hour-gym': '24 Hour Gym',
    'yoga': 'Yoga',
    'pilates': 'Pilates',
    'mma': 'MMA',
    'boxing': 'Boxing',
    'personal-trainer': 'Personal Trainer',
    'crossfit': 'CrossFit',
}

# Specialty-specific description templates
SPECIALTY_TEMPLATES = {
    '24 Hour Gym': {
        'keywords': ['24 hour gym', '24/7 gym', 'fitness center', 'gym near me', 'fitness facility'],
        'features': ['24-hour access', 'flexible workout schedule', 'state-of-the-art equipment', 'fitness center']
    },
    'Personal Trainer': {
        'keywords': ['personal trainer', 'personal training', 'fitness coach', 'personal trainer near me', 'one-on-one training'],
        'features': ['personalized training', 'one-on-one coaching', 'customized fitness programs', 'personal training sessions']
    },
    'Pilates': {
        'keywords': ['pilates', 'pilates classes', 'pilates studio', 'pilates near me', 'pilates instruction'],
        'features': ['pilates classes', 'pilates instruction', 'pilates studio', 'pilates training']
    },
    'MMA': {
        'keywords': ['MMA', 'mixed martial arts', 'MMA training', 'MMA gym', 'martial arts'],
        'features': ['MMA training', 'mixed martial arts', 'martial arts instruction', 'combat sports']
    },
    'Boxing': {
        'keywords': ['boxing', 'boxing gym', 'boxing classes', 'boxing training', 'boxing near me'],
        'features': ['boxing training', 'boxing classes', 'boxing instruction', 'boxing gym']
    },
    'Yoga': {
        'keywords': ['yoga', 'yoga classes', 'yoga studio', 'yoga near me', 'yoga practice'],
        'features': ['yoga classes', 'yoga instruction', 'yoga studio', 'yoga practice']
    },
    'CrossFit': {
        'keywords': ['crossfit', 'crossfit gym', 'crossfit training', 'crossfit box', 'crossfit near me'],
        'features': ['crossfit training', 'crossfit classes', 'functional fitness', 'crossfit workouts']
    },
    'Gym': {
        'keywords': ['gym', 'fitness center', 'gym near me', 'fitness facility', 'workout facility'],
        'features': ['fitness training', 'workout equipment', 'fitness programs', 'gym facilities']
    },
}

def generate_description_fixed(gym_row):
    """Generate SEO-optimized description for a gym (fixed version without truncation)"""
    name = gym_row['name']
    rating = float(gym_row['rating']) if pd.notna(gym_row['rating']) else 0.0
    review_count = int(gym_row['review_count']) if pd.notna(gym_row['review_count']) else 0
    address = str(gym_row['address']) if pd.notna(gym_row['address']) else ''
    specialty_slug = str(gym_row['specialty_slug']) if pd.notna(gym_row['specialty_slug']) else None
    
    city = 'Nicosia'
    if 'Nicosia' in address:
        city = 'Nicosia'
    elif 'Strovolos' in address:
        city = 'Nicosia'
    elif 'Egkomi' in address or 'Aglantzia' in address:
        city = 'Nicosia'
    
    # Map specialty slug to name
    specialty_name = SPECIALTY_SLUG_TO_NAME.get(specialty_slug, 'Gym') if specialty_slug else 'Gym'
    template = SPECIALTY_TEMPLATES.get(specialty_name, SPECIALTY_TEMPLATES['Gym'])
    
    keywords = template['keywords']
    features = template['features']
    
    # Rating description
    if rating >= 4.8:
        rating_desc = f"highly rated {rating:.1f}-star"
    elif rating >= 4.5:
        rating_desc = f"top-rated {rating:.1f}-star"
    elif rating > 0:
        rating_desc = f"{rating:.1f}-star"
    else:
        rating_desc = "fitness"
    
    # Generate description (more concise to avoid truncation)
    if rating > 0:
        description = f"{name} is a {rating_desc} {keywords[0]} in {city}, Cyprus, offering {features[0]}. "
    else:
        description = f"{name} is a {keywords[0]} in {city}, Cyprus, offering {features[0]}. "
    
    if address and address != 'null' and address != '':
        address_parts = address.split(',')
        if len(address_parts) > 0:
            location = address_parts[0].strip()
            if location:
                description += f"Located {location.lower() if not location[0].isupper() else 'on ' + location}, "
    
    description += f"this {keywords[1] if len(keywords) > 1 else keywords[0]} offers {features[1] if len(features) > 1 else features[0]} suitable for all fitness levels. "
    
    if rating > 0 and review_count > 0:
        description += f"With a {rating:.1f} rating and {review_count} reviews, "
        
        if rating >= 4.8:
            description += f"it's recognized as one of the best {keywords[0]}s in {city}. "
        elif rating >= 4.5:
            description += f"it's a popular choice for fitness enthusiasts in {city}. "
        else:
            description += f"it provides quality {keywords[0]} services in {city}. "
    elif review_count > 0:
        description += f"With {review_count} reviews, it's a trusted {keywords[0]} in {city}. "
    
    # Build final part more concisely to avoid truncation
    description += f"Whether you're looking for {keywords[-1]} in {city}, {features[2] if len(features) > 2 else features[0]}, "
    description += f"or {features[3] if len(features) > 3 else features[1] if len(features) > 1 else features[0]}, "
    description += f"{name} provides expert instruction in a welcoming environment. "
    
    # Shorter closing sentence to fit within 600 chars
    description += f"Join this premier {city} {keywords[0]} for expert {features[0]}."
    
    # Ensure description is between 400-600 characters for SEO
    if len(description) < 400:
        description += f" Discover {keywords[0]} classes and professional guidance tailored to your fitness goals in {city}."
    elif len(description) > 600:
        # If still too long (very long gym names), make it even more concise
        # Remove some redundant parts
        if len(name) > 50:  # Very long name
            # Shorten the middle part
            description = description.split('. ')
            if len(description) > 4:
                # Keep first 3 sentences and last sentence, remove middle
                description = '. '.join(description[:3] + description[-1:])
            else:
                description = '. '.join(description)
        
        # Final check - if still too long, truncate at word boundary
        if len(description) > 600:
            # Find last space before 597 chars
            truncate_at = description[:597].rfind(' ')
            if truncate_at > 500:
                description = description[:truncate_at] + "..."
            else:
                description = description[:597] + "..."
    
    return description.strip()

def main():
    PROJECT_ROOT = Path(__file__).parent.parent
    CLEAN_DATA_PATH = PROJECT_ROOT / "data" / "clean" / "nicosia_gyms_clean.csv"
    SQL_OUTPUT_PATH = PROJECT_ROOT / "scripts" / "fix_truncated_descriptions.sql"
    
    print("=" * 80)
    print("FIXING TRUNCATED GYM DESCRIPTIONS")
    print("=" * 80)
    print()
    
    # Load cleaned data
    print("[1/3] Loading cleaned gym data...")
    df = pd.read_csv(CLEAN_DATA_PATH)
    print(f"  Loaded {len(df)} gyms from CSV")
    print()
    
    # Find gyms with truncated descriptions (ending with "...")
    print("[2/3] Finding truncated descriptions...")
    truncated_slugs = [
        'uppercut-team-cyprus-boxing-kickboxing-school-in-strovolos-nicosia',
        'fitensity-training-club'
    ]
    
    truncated_gyms = df[df['slug'].isin(truncated_slugs)]
    print(f"  Found {len(truncated_gyms)} gyms with truncated descriptions")
    print()
    
    # Generate fixed descriptions
    print("[3/3] Generating fixed descriptions...")
    updates = []
    
    for idx, row in truncated_gyms.iterrows():
        try:
            new_desc = generate_description_fixed(row)
            updates.append({
                'slug': row['slug'],
                'name': row['name'],
                'description': new_desc
            })
            print(f"  [OK] Fixed: {row['slug']} ({len(new_desc)} chars)")
        except Exception as e:
            print(f"  [ERROR] Failed for {row.get('slug', 'Unknown')}: {str(e)[:50]}")
            continue
    
    print()
    
    # Generate SQL update file
    print("[4/4] Generating SQL UPDATE file...")
    with open(SQL_OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write("-- Fix truncated gym descriptions\n")
        f.write(f"-- Generated: {datetime.now().isoformat()}\n")
        f.write(f"-- Total gyms: {len(updates)}\n")
        f.write("-- Note: Uses slug to match gyms (slug is unique)\n\n")
        f.write("BEGIN;\n\n")
        
        for update in updates:
            # Escape single quotes in description
            desc_escaped = update['description'].replace("'", "''")
            f.write(f"UPDATE gyms\n")
            f.write(f"SET description = '{desc_escaped}', updated_at = NOW()\n")
            f.write(f"WHERE slug = '{update['slug']}';\n\n")
        
        f.write("COMMIT;\n")
    
    print(f"  [OK] SQL update file generated: {SQL_OUTPUT_PATH}")
    print()
    print("=" * 80)
    print("NEXT STEP:")
    print("=" * 80)
    print(f"Execute the SQL file: {SQL_OUTPUT_PATH}")
    print("Or use Supabase Dashboard to apply the updates")
    print()

if __name__ == "__main__":
    main()

