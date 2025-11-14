"""
Generate SEO-optimized descriptions for all gyms missing descriptions
"""

import json
from pathlib import Path

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
}

def generate_description(gym_data):
    """Generate SEO-optimized description for a gym"""
    name = gym_data['name']
    slug = gym_data['slug']
    rating = float(gym_data['rating'])
    review_count = int(gym_data['review_count'])
    address = gym_data['address']
    specialties = gym_data.get('specialties', '24 Hour Gym')
    
    # Extract city from address (usually "Limassol, Cyprus")
    city = 'Limassol'
    if 'Limassol' in address:
        city = 'Limassol'
    
    # Get specialty info
    specialty = specialties.split(',')[0].strip() if specialties else '24 Hour Gym'
    template = SPECIALTY_TEMPLATES.get(specialty, SPECIALTY_TEMPLATES['24 Hour Gym'])
    
    # Build description
    keywords = template['keywords']
    features = template['features']
    
    # Rating description
    if rating >= 4.8:
        rating_desc = f"highly rated {rating:.1f}-star"
    elif rating >= 4.5:
        rating_desc = f"top-rated {rating:.1f}-star"
    else:
        rating_desc = f"{rating:.1f}-star"
    
    # Review description
    if review_count >= 100:
        review_desc = f"with {review_count} reviews"
    elif review_count >= 50:
        review_desc = f"with {review_count} reviews"
    else:
        review_desc = f"with {review_count} reviews"
    
    # Generate description
    description = f"{name} is a {rating_desc} {keywords[0]} in {city}, Cyprus, {features[0]}. "
    
    if address and address != 'null':
        # Extract street/area from address
        address_parts = address.split(',')
        if len(address_parts) > 0:
            location = address_parts[0].strip()
            description += f"Located {location.lower() if not location[0].isupper() else 'on ' + location}, "
    
    description += f"this {keywords[1] if len(keywords) > 1 else keywords[0]} offers {features[1] if len(features) > 1 else features[0]} "
    description += f"suitable for all fitness levels. "
    
    description += f"With a {rating:.1f} rating and {review_count} reviews, "
    
    if rating >= 4.8:
        description += f"it's recognized as one of the best {keywords[0]}s in {city}. "
    elif rating >= 4.5:
        description += f"it's a popular choice for fitness enthusiasts in {city}. "
    else:
        description += f"it provides quality {keywords[0]} services in {city}. "
    
    description += f"Whether you're looking for {keywords[-1]} in {city}, {features[2] if len(features) > 2 else features[0]}, "
    description += f"or {features[3] if len(features) > 3 else features[1] if len(features) > 1 else features[0]}, "
    description += f"{name} provides expert instruction in a welcoming environment. "
    
    description += f"Find your perfect {keywords[0]} experience at this premier {city} {keywords[1] if len(keywords) > 1 else keywords[0]}."
    
    # Ensure description is between 400-600 characters for SEO
    if len(description) < 400:
        # Add more content
        description += f" Discover {keywords[0]} classes, {features[0]}, and professional guidance tailored to your fitness goals in {city}."
    elif len(description) > 600:
        # Trim description
        description = description[:550] + "..."
    
    return description.strip()

def main():
    # Gym data from the database query
    gyms_data = [
        {"id": "f14a5902-dd82-4acc-989e-21ade93ee710", "name": "5 Rounds Mma Limassol", "slug": "5-rounds-mma-limassol", "rating": "4.90", "review_count": 37, "address": "BASEMENT, Misiaouli & Kavazoglou 27, Limassol, Cyprus", "website": "https://www.facebook.com/5-Rounds-MMA-Limassol-110644453668694/", "specialties": "24 Hour Gym"},
        {"id": "672c643d-1345-48d8-bb4b-6a4d08eb7995", "name": "Anaplasis Gym Fitness Center Limassol", "slug": "anaplasis-gym-fitness-center-limassol", "rating": "4.80", "review_count": 751, "address": "Kanika Business Center, Enaerios, 28 October Ave 319A, Limassol, Cyprus", "website": "https://www.anaplasisgym.com.cy/", "specialties": "24 Hour Gym"},
        {"id": "7ff899aa-1049-49c8-9c9b-c83b0b515fc7", "name": "Ara Gym Xl", "slug": "ara-gym-xl", "rating": "4.50", "review_count": 166, "address": "Mishiaouli kai kavazglou kai anti filita 1 LIMASSOL, Limassol, Cyprus", "website": None, "specialties": "24 Hour Gym"},
        {"id": "68b740e3-e41b-46f4-86fe-b9bd55f13bc4", "name": "Asf&Performance Limassol Cyprus Gym Taekwondo ", "slug": "asfperformance-limassol-cyprus-gym-taekwondo", "rating": "5.00", "review_count": 23, "address": "Vasileos Konstantinou 21-SHOP 5, Limassol, Cyprus", "website": None, "specialties": "24 Hour Gym"},
        {"id": "aa9ecf72-204b-4e56-a44f-10bf94546e49", "name": "Body Advance Personal Training Studio", "slug": "body-advance-personal-training-studio", "rating": "4.90", "review_count": 22, "address": "Akapnitis Court, 2nd Floor, Arch. Makarios III Avenue 161, Limassol, Cyprus", "website": "http://www.bodyadvance.net/", "specialties": "24 Hour Gym"},
        {"id": "ee2b54d4-8643-47f9-b841-4e15c7d4a38a", "name": "Bodyfitness Gym Center", "slug": "bodyfitness-gym-center", "rating": "4.70", "review_count": 45, "address": "Jean Sibelius, Limassol, Cyprus", "website": "https://bodyfitnessgymcentre.com/", "specialties": "24 Hour Gym"},
        {"id": "af1fed48-1ca3-4a2f-8251-d31241929a45", "name": "Bodysense Health&Fitness Centre", "slug": "bodysense-healthfitness-centre", "rating": "4.80", "review_count": 37, "address": "Αγγαιου 3-4154, Limassol, Cyprus", "website": "https://www.facebook.com/BodysenseLimassol/", "specialties": "24 Hour Gym"},
        {"id": "ee0123e8-49df-4c2b-8f9b-ab46d9fcf21e", "name": "Catman Olympic Boxing Academy C7M", "slug": "catman-olympic-boxing-academy-c7m", "rating": "4.60", "review_count": 11, "address": "Riga Fereou 2, Limassol, Cyprus", "website": None, "specialties": "24 Hour Gym"},
        {"id": "1d89e871-d43e-4565-9f7c-e4674aa84112", "name": "Champ Boxing Academy", "slug": "champ-boxing-academy", "rating": "5.00", "review_count": 11, "address": "TK 3082, Rizokarpasou 27, Limassol, Cyprus", "website": "http://www.champboxingacademy.com/", "specialties": "Boxing"},
        {"id": "4febf585-14d9-4cae-8689-54440536d221", "name": "Checkmat Limassol", "slug": "checkmat-limassol", "rating": "5.00", "review_count": 22, "address": "Pafou 74, Limassol, Cyprus", "website": "https://checkmat.cy/", "specialties": "MMA"},
        {"id": "233f6806-4391-4fcd-9cc9-5e680d3881f1", "name": "Combat & Fitness", "slug": "combat-fitness", "rating": "5.00", "review_count": 15, "address": "Vasileos Pavlou 44, Limassol, Cyprus", "website": "https://www.combatandfitness.com/", "specialties": "24 Hour Gym"},
        {"id": "da9cd76e-633e-4f42-9864-1c5537f2419e", "name": "Contrology Studio", "slug": "contrology-studio", "rating": "4.80", "review_count": 12, "address": "Arch. Makarios III Avenue 59, Limassol, Cyprus", "website": "https://linktr.ee/Contrologystudio", "specialties": "24 Hour Gym"},
        {"id": "d86f1e1e-1049-4acc-a8bb-7d0b4e8fd8b3", "name": "Crossfit Limassol", "slug": "crossfit-limassol", "rating": "4.80", "review_count": 87, "address": "Shakespeare 9, Limassol, Cyprus", "website": "http://www.crossfitlimassol.com/", "specialties": "24 Hour Gym"},
        {"id": "8b4a729b-e7af-4902-a090-bca0ec34d564", "name": "Dainas Planet Fitness", "slug": "dainas-planet-fitness", "rating": "4.90", "review_count": 14, "address": "Ekalis 16, Limassol, Cyprus", "website": None, "specialties": "24 Hour Gym"},
        {"id": "c05a935d-e997-44bd-80ed-3b74c11b34f7", "name": "Dreamchasers Fitness Studio", "slug": "dreamchasers-fitness-studio", "rating": "5.00", "review_count": 56, "address": "Kekropos 8, Limassol, Cyprus", "website": "https://dreamchasers.cy/", "specialties": "24 Hour Gym"},
        {"id": "14b5d2f7-21dd-429a-a70d-2637580bc5c0", "name": "Endless Flow", "slug": "endless-flow", "rating": "5.00", "review_count": 10, "address": "Amfissis 6, Limassol, Cyprus", "website": None, "specialties": "Pilates"},
        {"id": "76b10876-ba56-4bfc-bb4f-02b9a2f26a05", "name": "Fitness Lab", "slug": "fitness-lab", "rating": "5.00", "review_count": 16, "address": "M2XC+WP6, Limassol, Cyprus", "website": None, "specialties": "24 Hour Gym"},
        {"id": "7100847d-4663-4523-9087-5e41c4f99b04", "name": "Grind Fitness", "slug": "grind-fitness", "rating": "5.00", "review_count": 73, "address": "Steliou Kiriakidi, Limassol, Cyprus", "website": "https://grindfitnesscy.com/", "specialties": "24 Hour Gym"},
        {"id": "ba760ac1-86d8-4c25-950f-9248084d8e69", "name": "Gymania Fitness Club", "slug": "gymania-fitness-club", "rating": "4.90", "review_count": 363, "address": "Agias Filaxeos, Limassol, Cyprus", "website": "http://www.gymaniafitnessclub.com/", "specialties": "24 Hour Gym"},
        {"id": "30624470-1e15-4a86-9c3d-04e1ace4f6a3", "name": "Gymania Personal Trainer", "slug": "gymania-personal-trainer", "rating": "5.00", "review_count": 103, "address": "Ierou Lochou, Limassol, Cyprus", "website": "http://www.gymaniafitnessclub.com/", "specialties": "Personal Trainer"},
        {"id": "26de65c7-78de-4e31-afc4-fd431078620f", "name": "Her Gym Limassol", "slug": "her-gym-limassol", "rating": "4.80", "review_count": 109, "address": "Omonoias 19, Limassol, Cyprus", "website": "https://hergym.cy/", "specialties": "24 Hour Gym"},
        {"id": "9d6ad166-f14a-4368-b554-c1be4942bca5", "name": "Iron Fitness", "slug": "iron-fitness", "rating": "5.00", "review_count": 234, "address": "Agias Fylaxeos, & 1, Limassol, Cyprus", "website": "http://ironfitnesslimassol.com/", "specialties": "Personal Trainer"},
        {"id": "89e1e5b8-e331-4e46-823d-42478fc9904f", "name": "Kalopedi Gym", "slug": "kalopedi-gym", "rating": "4.80", "review_count": 33, "address": "Pikioni, Limassol, Cyprus", "website": "https://www.instagram.com/kalopedifitnessclub/", "specialties": "24 Hour Gym"},
        {"id": "974fde39-ac69-4e4d-ae57-1d5741e63c78", "name": "Kinetic Fitness Studio", "slug": "kinetic-fitness-studio", "rating": "5.00", "review_count": 54, "address": "Aygerinou, Limassol, Cyprus", "website": None, "specialties": "24 Hour Gym"},
        {"id": "987609c1-0f6b-429f-a7f2-7a0a76bfdc51", "name": "Kinetic Pilates Studio", "slug": "kinetic-pilates-studio", "rating": "5.00", "review_count": 44, "address": "Archiepiskopou Makariou C' Avenue 71, Limassol, Cyprus", "website": "https://instagram.com/kineticpilates_studio?igshid=NTc4MTIwNjQ2YQ==", "specialties": "Pilates"},
        {"id": "c0f6db87-bd17-4e22-8503-25a49b0624b9", "name": "Kpk Performance & Rehabilitation Center", "slug": "kpk-performance-rehabilitation-center", "rating": "5.00", "review_count": 16, "address": "Spyrou Kyprianou Ave 124, Limassol, Cyprus", "website": None, "specialties": "24 Hour Gym"},
        {"id": "a34ec215-d257-4bc3-97dc-75ab91479009", "name": "Limassol Sporting Center", "slug": "limassol-sporting-center", "rating": "3.20", "review_count": 276, "address": "I BRIDGE, GEORGIOU NEOFYDOU 24,MESA GEITONIA, HOUSE BLOCK D, FLAT G2, Limassol, Cyprus", "website": "https://www.limassolsportingcenter.com/", "specialties": "24 Hour Gym"},
        {"id": "0ba7b97e-f557-4f34-9793-b37f7195fe75", "name": "Lumpinee Gym - Muay Thai - Muay Boran - Personal Training - Fighting Club - Limassol - Cyprus", "slug": "lumpinee-gym-muay-thai-muay-boran-personal-training-fighting-club-limassol-cyprus", "rating": "5.00", "review_count": 22, "address": "Akarnanias, Limassol, Cyprus", "website": "https://lumpineegymlimassol.wixsite.com/lumpineegym", "specialties": "MMA"},
        {"id": "edeeb1aa-ad6b-457c-a840-89bfc8249b10", "name": "Mma School The Cage", "slug": "mma-school-the-cage", "rating": "4.50", "review_count": 23, "address": "Jean Sibelius και, Γεωργίου Παυλίδη 12, Limassol, Cyprus", "website": "http://www.mmathecage.com/", "specialties": "24 Hour Gym"},
        {"id": "3639691d-02df-400d-9e5a-60700a4f4020", "name": "Muscle Factory 24 Hours", "slug": "muscle-factory-24-hours", "rating": "4.50", "review_count": 203, "address": "Georgiou Griva Digeni 16, Limassol, Cyprus", "website": "https://www.musclefactory24hrs.com/", "specialties": "24 Hour Gym"},
        {"id": "553dce90-66b2-4015-b00c-31df15bfe9b1", "name": "Nicos Solomonides Indoor Arena Ael", "slug": "nicos-solomonides-indoor-arena-ael", "rating": "4.50", "review_count": 19, "address": "Μόρφου 9A, Limassol, Cyprus", "website": "http://actioninsports.com/", "specialties": "24 Hour Gym"},
        {"id": "abc2af98-a955-4b26-a23d-2d71c5bc7592", "name": "No75Space", "slug": "no75space", "rating": "5.00", "review_count": 27, "address": "Thesalonikis 75-3025, Limassol, Cyprus", "website": "http://no75space.com/", "specialties": "Pilates"},
        {"id": "8556221d-e40f-4291-9c84-85fd6990bd87", "name": "Peak Condition Cyprus", "slug": "peak-condition-cyprus", "rating": "5.00", "review_count": 43, "address": "Vasileos Konstantinou 152-1st Floor, Limassol, Cyprus", "website": "https://www.peakconditioncy.com/", "specialties": "Personal Trainer"},
        {"id": "43af1896-8137-4c02-a601-1b34fbda6c2d", "name": "Progress Gym", "slug": "progress-gym", "rating": "4.50", "review_count": 30, "address": "Katholiki, 1,Voriou Ipeirou Street, Limassol, Cyprus", "website": "https://www.instagram.com/progressgymcy?igsh=MWFodW9pbWJnOWI5Nw==", "specialties": "24 Hour Gym"},
        {"id": "4fca35b5-7f82-426c-9193-a8add7136a56", "name": "R-Evolution Of Gym", "slug": "r-evolution-of-gym", "rating": "4.60", "review_count": 12, "address": "Franklin Roosevelt 216, Limassol, Cyprus", "website": "https://m.facebook.com/Revolutionofgym/", "specialties": "24 Hour Gym"},
        {"id": "cf7a453b-01b5-4d59-88a5-f99a889e9cd8", "name": "Raw Calisthenics Academy", "slug": "raw-calisthenics-academy", "rating": "5.00", "review_count": 92, "address": "M.L.K., Limassol, Cyprus", "website": "https://instagram.com/raw_calisthenicsacademy?igshid=YmMyMTA2M2Y=", "specialties": "24 Hour Gym"},
        {"id": "614d148a-ee1b-4b54-b3e7-d00e1374781b", "name": "Reload Fitness Studio", "slug": "reload-fitness-studio", "rating": "4.90", "review_count": 71, "address": "Eleftherias 119, Limassol, Cyprus", "website": "https://reload-fitness.com/", "specialties": "24 Hour Gym"},
        {"id": "fa367703-9522-43b5-a65e-33c04e0371e6", "name": "SavS Gym", "slug": "savs-gym", "rating": "5.00", "review_count": 15, "address": "214 Kanika Ideal Building, Μακαρίου ΙΙΙ, Limassol, Cyprus", "website": None, "specialties": "24 Hour Gym"},
        {"id": "28b34302-f8cd-457f-8bd2-90e6bb9aaa71", "name": "Slim And Smart Fitness Studio", "slug": "slim-and-smart-fitness-studio", "rating": "4.40", "review_count": 13, "address": "Agiou Andreou 350, Limassol, Cyprus", "website": "https://www.instagram.com/slim_and_smart_cyprus/", "specialties": "24 Hour Gym"},
        {"id": "2afce707-d5f5-4e6a-bc0e-69d74a57ca8c", "name": "Studio Iv 360 Pilates & Beyond", "slug": "studio-iv-360-pilates-beyond", "rating": "4.00", "review_count": 14, "address": "Nikodimou Milona 7, Limassol, Cyprus", "website": "https://instagram.com/studio_iv_pilates?igshid=YmMyMTA2M2Y=", "specialties": "Pilates"},
        {"id": "1f9fcb9b-48b9-487b-9d8d-0d31a100da1d", "name": "Target Boxing Club", "slug": "target-boxing-club", "rating": "5.00", "review_count": 21, "address": "Eleftherias 129, Limassol, Cyprus", "website": None, "specialties": "Boxing"},
        {"id": "8a1f20bd-14d7-4638-bb19-50ac20672d26", "name": "Team Rogue Forge", "slug": "team-rogue-forge", "rating": "4.80", "review_count": 19, "address": "Spyrou Kyprianou Ave 116, Limassol, Cyprus", "website": "https://www.teamrogueforge.com.cy/", "specialties": "24 Hour Gym"},
        {"id": "083306fa-58c3-4195-96b4-ff51789b3369", "name": "The Fitzone By Kondylis", "slug": "the-fitzone-by-kondylis", "rating": "4.80", "review_count": 42, "address": "Spyrou Kyprianou Ave 145, Limassol, Cyprus", "website": "https://linktr.ee/thefitzonebykondylis", "specialties": "24 Hour Gym"},
        {"id": "35df2ba5-6a08-4a15-b5de-10914a651c11", "name": "Un1T", "slug": "un1t", "rating": "4.80", "review_count": 32, "address": "Georgiou 'A 45, Limassol, Cyprus", "website": "https://un1t.com/un1t-limassol/", "specialties": "24 Hour Gym"},
        {"id": "242239c1-b299-463c-8081-4e9180d17c35", "name": "Vip-Gym", "slug": "vip-gym", "rating": "4.60", "review_count": 93, "address": "Steliou Kiriakidi, Limassol, Cyprus", "website": "http://www.vipgym.com.cy/", "specialties": "24 Hour Gym"},
    ]
    
    print("=" * 80)
    print("GENERATING SEO DESCRIPTIONS FOR BULK GYMS")
    print("=" * 80)
    print()
    
    descriptions = {}
    sql_updates = []
    
    for gym in gyms_data:
        desc = generate_description(gym)
        descriptions[gym['slug']] = desc
        sql_updates.append({
            'id': gym['id'],
            'name': gym['name'],
            'slug': gym['slug'],
            'description': desc
        })
        print(f"[OK] Generated description for: {gym['name']} ({len(desc)} chars)")
    
    print()
    print(f"Total descriptions generated: {len(descriptions)}")
    print(f"Average length: {sum(len(d) for d in descriptions.values()) // len(descriptions)} characters")
    print()
    
    # Generate SQL update file
    sql_file = Path(__file__).parent.parent / "scripts" / "update_bulk_descriptions.sql"
    with open(sql_file, 'w', encoding='utf-8') as f:
        f.write("-- Update SEO descriptions for bulk imported gyms\n")
        f.write(f"-- Generated: {__import__('datetime').datetime.now().isoformat()}\n")
        f.write(f"-- Total gyms: {len(sql_updates)}\n\n")
        f.write("BEGIN;\n\n")
        
        for update in sql_updates:
            # Escape single quotes in description
            desc_escaped = update['description'].replace("'", "''")
            f.write(f"UPDATE gyms\n")
            f.write(f"SET description = '{desc_escaped}', updated_at = NOW()\n")
            f.write(f"WHERE id = '{update['id']}';\n\n")
        
        f.write("COMMIT;\n")
    
    print(f"[OK] SQL update file generated: {sql_file}")
    print()
    print("=" * 80)
    print("NEXT STEP:")
    print("=" * 80)
    print(f"Execute the SQL file: {sql_file}")
    print("Or use Supabase MCP to apply the updates")
    print()

if __name__ == "__main__":
    main()

