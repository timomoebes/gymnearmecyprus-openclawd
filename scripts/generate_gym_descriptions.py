#!/usr/bin/env python3
"""
Generate SEO-optimized descriptions for the 5 test gyms
"""

descriptions = {
    'ballet-school-pilates-studio-monika-perikleous': """Ballet School & Pilates Studio Monika Perikleous is a premier Pilates studio in Limassol, Cyprus, offering professional Pilates instruction and ballet training. Located on Kosti Palama 57, this studio combines classical ballet techniques with modern Pilates methods to provide a comprehensive fitness experience. Perfect for those seeking Pilates classes in Limassol, the studio offers personalized instruction suitable for all fitness levels. With a 5.0 rating and 18 reviews, it's recognized as one of the best Pilates studios in Limassol. Whether you're looking for Pilates near me in Limassol or specialized ballet training, this studio provides expert guidance in a welcoming environment.""",

    'vinyasa-yoga-studio-limassol': """Vinyasa Yoga Studio Limassol is a top-rated yoga studio in Limassol, Cyprus, specializing in Vinyasa flow yoga classes. Located at Athina Court on Ypsilantou 6, this studio offers dynamic yoga sessions that combine movement with breath for a transformative practice. With a perfect 5.0 rating and 17 reviews, it's one of the most highly regarded yoga studios in Limassol. Whether you're a beginner looking for yoga classes near me in Limassol or an experienced practitioner seeking advanced Vinyasa flows, this studio provides expert instruction in a serene setting. Find your perfect yoga practice at this premier Limassol yoga studio.""",

    'piero-judo-academy': """Piero Judo Academy is a leading martial arts school in Limassol, Cyprus, specializing in Judo and MMA training. Located on Eustathiou Paraskeva 18, this academy offers professional martial arts instruction for all ages and skill levels. With an impressive 5.0 rating and 122 reviews, it's one of the most trusted MMA and Judo facilities in Limassol. Whether you're looking for MMA training near me in Limassol, Judo classes, or self-defense instruction, Piero Judo Academy provides expert coaching in a supportive environment. Join one of Limassol's premier martial arts academies and develop your skills with experienced instructors.""",

    'limassol-fitness': """Limassol Fitness is a professional personal training facility in Limassol, Cyprus, offering personalized fitness coaching and training programs. Located on Eleftherias 109-3042, this fitness center specializes in one-on-one personal training sessions tailored to individual goals. With a perfect 5.0 rating and 11 reviews, it's recognized as one of the best personal training studios in Limassol. Whether you're looking for a personal trainer near me in Limassol, weight loss coaching, strength training, or fitness guidance, Limassol Fitness provides expert instruction to help you achieve your fitness goals. Experience personalized training at this premier Limassol fitness facility.""",

    'soul-vibe-space': """Soul Vibe Space is a welcoming yoga and wellness studio in Limassol, Cyprus, offering yoga classes and holistic wellness services. Located on Agias Zonis 50, this studio creates a peaceful environment for yoga practice and personal growth. With a 4.7 rating and 12 reviews, it's a popular choice for yoga enthusiasts in Limassol. Whether you're searching for yoga classes near me in Limassol, meditation sessions, or a space for mindfulness practice, Soul Vibe Space provides a nurturing atmosphere for your wellness journey. Discover your inner peace at this serene Limassol yoga studio."""
}

# Print descriptions for review
for slug, desc in descriptions.items():
    print(f"\n{'='*80}")
    print(f"Slug: {slug}")
    print(f"Length: {len(desc)} characters")
    print(f"\n{desc}\n")

print(f"\n{'='*80}")
print("Total descriptions: 5")
print("Average length:", sum(len(d) for d in descriptions.values()) // 5, "characters")

