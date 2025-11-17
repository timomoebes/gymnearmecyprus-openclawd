-- Update Limassol gyms with enriched data (V2 - with pricing)
-- Total gyms: 26

BEGIN;

-- Update Monica Dance Pilates Studio
UPDATE gyms
SET
  description = 'Monica Dance Pilates Studio brings specialized classical ballet training to Limassol, Cyprus. Specializing in Classical Ballet, Point Work, and Contemporary Dance, this facility caters to all fitness levels. Operating 14:30 to 20:00, perfect for morning and evening workouts. Also offers Contemporary Dance training. Contact for membership details and class schedules.',
  opening_hours = '{"Monday-Friday": "14:30-20:00"}'::jsonb,
  phone = '+35799785748',
  email = 'monikapilatestudio@hotmail.com',
  updated_at = NOW()
WHERE slug = 'monica-dance-pilates-studio'
  OR name ILIKE '%Monica Dance Pilates Studio%';

-- Update Vinyasa Yoga Studio Limassol
UPDATE gyms
SET
  description = 'Located Neapolis, in residential area, Vinyasa Yoga Studio Limassol brings specialized ashtanga vinyasa yoga training to Limassol. Specializing in Ashtanga Vinyasa Yoga, Mysore Yoga, and Vinyasa Yoga, this facility caters to all fitness levels. Features include Aerial Yoga Space for enhanced workouts. Operating 8:30AM to 10:00AM, perfect for morning and evening workouts.',
  opening_hours = '{"Monday": "Morning: 8:30AM-10:00AM | Evening: 6:30PM-8:30PM", "Tuesday": "Evening: 6:00PM-8:00PM", "Wednesday": "Morning: 8:30AM-10:00AM | Evening: 6:30PM-8:00PM", "Thursday": "Morning: 8:00AM-10:00AM | Evening: 6:00PM-8:00PM", "Friday": "Morning: 8:30AM-10:00AM | Evening: 6:30PM-8:00PM", "Saturday": "Morning: 8:30AM-10:00AM", "Sunday": "Closed"}'::jsonb,
  address = '6 Ypsilanti, Athina Court, Neapolis, Limassol, Cyprus',
  phone = '25106848, 99160096',
  email = 'info@vinyasayogacyprus.com',
  updated_at = NOW()
WHERE slug = 'vinyasa-yoga-studio-limassol'
  OR name ILIKE '%Vinyasa Yoga Studio Limassol%';

-- Update Personal Fitness Assistant
UPDATE gyms
SET
  description = 'Located on Eleftherias 119, Personal Fitness Assistant provides top-tier fitness services in Limassol. Specializing in Strength Training, Cardio, and TRX, this facility caters to all fitness levels. Memberships from €750 monthly with flexible payment options. Also offers TRX training. Contact for membership details and class schedules.',
  pricing = '{"8 Trainings": "€750/1 month"}'::jsonb,
  address = 'Eleftherias 119, Limassol',
  updated_at = NOW()
WHERE slug = 'personal-fitness-assistant'
  OR name ILIKE '%Personal Fitness Assistant%';

-- Update Soul Vibe Space
UPDATE gyms
SET
  description = 'Soul Vibe Space offers premier fitness training in Limassol, Cyprus. Specializing in Contact for details, this facility caters to all fitness levels. Contact for membership details and class schedules.',
  updated_at = NOW()
WHERE slug = 'soul-vibe-space'
  OR name ILIKE '%Soul Vibe Space%';

-- Update no.75space
UPDATE gyms
SET
  description = 'no.75space brings specialized pilates training to Limassol, Cyprus. Specializing in Pilates, Private Sessions, and Group Sessions, this facility caters to all fitness levels. Features include Reformer & Wunda Chair Equipment for enhanced workouts. Operating 06:30 to 21:00, perfect for morning and evening workouts. Memberships from €20 monthly with flexible payment options.',
  opening_hours = '{"Monday-Friday": "06:30-21:00"}'::jsonb,
  pricing = '{"GroupSessionsEquipment - SingleClass": "€20", "GroupSessionsEquipment - 5ClassCard": "€90", "GroupSessionsEquipment - 10ClassCard": "€150", "GroupSessionsEquipment - 20ClassCard": "€260", "PrivateSessions - SingleClass": "€60", "PrivateSessions - 10ClassCard": "€500", "SemiPrivateSessions - SingleClass": "€40", "SemiPrivateSessions - 10ClassCard": "€350"}'::jsonb,
  address = 'Thesalonikis 75, 3025 Limassol, Cyprus',
  email = 'info@no75space.com',
  updated_at = NOW()
WHERE slug = 'no75space'
  OR name ILIKE '%no.75space%';

-- Update CHECKMAT Limassol
UPDATE gyms
SET
  description = 'Located on Pafou 74, CHECKMAT Limassol delivers authentic brazilian jiu-jitsu (bjj) instruction in Limassol. Specializing in Brazilian Jiu-Jitsu (BJJ), No-Gi BJJ, and Boxing, this facility caters to all fitness levels. Operating 8:00 to 21:00, perfect for morning and evening workouts. Perfect for families with dedicated kids'' classes and family-friendly facilities.',
  opening_hours = '{"Monday": "8:00-21:00", "Tuesday": "8:30-20:30", "Wednesday": "8:00-21:00", "Thursday": "8:30-20:30", "Friday": "8:00-22:30", "Saturday": "No sessions", "Sunday": "No sessions"}'::jsonb,
  address = 'Pafou 74, Limassol, 3051, CY',
  phone = '+35797442244',
  email = 'club@checkmat.cy',
  updated_at = NOW()
WHERE slug = 'checkmat-limassol'
  OR name ILIKE '%CHECKMAT Limassol%';

-- Update MMA School The Cage
UPDATE gyms
SET
  description = 'Located on Jean Sibelius & Γεωργίου Παυλίδη 12, MMA School The Cage delivers authentic taekwondo instruction in Limassol. Specializing in Taekwondo, Wrestling, and Muay Thai, this facility caters to all fitness levels. Operating 06:30 to 21:45, perfect for morning and evening workouts.',
  opening_hours = '{"Monday-Sunday": "06:30 - 21:45"}'::jsonb,
  address = 'Jean Sibelius & Γεωργίου Παυλίδη 12, Limassol, Cyprus',
  phone = '+35799817412',
  email = 'stefos-cy@hotmail.com',
  updated_at = NOW()
WHERE slug = 'mma-school-the-cage'
  OR name ILIKE '%MMA School The Cage%';

-- Update Gymania Fitness Club
UPDATE gyms
SET
  description = 'Gymania Fitness Club brings specialized zumba training to Limassol, Cyprus. Specializing in Zumba, Pilates, and Trampolines, this facility caters to all fitness levels. Perfect for families with dedicated kids'' classes and family-friendly facilities. Memberships from €35 monthly with flexible payment options.',
  pricing = '{"Pricing": "Weekend Offer: 35 Euros per month"}'::jsonb,
  updated_at = NOW()
WHERE slug = 'gymania-fitness-club'
  OR name ILIKE '%Gymania Fitness Club%';

-- Update Lumpinee Gym
UPDATE gyms
SET
  description = 'Located on Akarnanias 4 Yermasogia, Lumpinee Gym delivers authentic muay thai instruction in Limassol. Specializing in Muay Thai, Muay Boran, and Kids Martial Arts, this facility caters to all fitness levels. Perfect for families with dedicated kids'' classes and family-friendly facilities.',
  opening_hours = '{"Monday": "6:30 am – 9:00 pm", "Tuesday": "6:30 am – 9:00 pm", "Wednesday": "6:30 am – 9:00 pm", "Thursday": "6:30 am – 9:00 pm", "Friday": "6:30 am – 9:00 pm", "Saturday": "11:00 am – 1:00 pm", "Sunday": "Closed"}'::jsonb,
  address = 'Akarnanias 4 Yermasogia, Agios Athanasios, Limassol',
  email = 'lumpineegymlimassol@gmail.com',
  updated_at = NOW()
WHERE slug = 'lumpinee-gym'
  OR name ILIKE '%Lumpinee Gym%';

-- Update Peak Condition
UPDATE gyms
SET
  description = 'Located on 152 Vasileos Konstantinou, Peak Condition provides top-tier fitness services in Limassol. Specializing in Personal Training, Group Training, and Exercise Rehabilitation, this facility caters to all fitness levels. Features include Hot showers for enhanced workouts. Great for one-on-one coaching and personalized fitness programs.',
  address = '152 Vasileos Konstantinou, 1st Floor, Limassol, 3080, Cyprus',
  updated_at = NOW()
WHERE slug = 'peak-condition'
  OR name ILIKE '%Peak Condition%';

-- Update Body Advance Personal Training Studio
UPDATE gyms
SET
  description = 'Located near main avenue, Body Advance Personal Training Studio brings specialized pilates training to Limassol. Specializing in Pilates, Yoga, and Aerobics, this facility caters to all fitness levels. Operating 09:00 to 18:00, perfect for morning and evening workouts. Great for one-on-one coaching and personalized fitness programs.',
  opening_hours = '{"Week Days": "09:00-18:00", "Sunday": "Closed"}'::jsonb,
  address = '161. Arch. Makarios III Ave. Akapnitis Court Floor 2, Limassol, Cyprus',
  email = 'info@bodyadvance.net',
  updated_at = NOW()
WHERE slug = 'body-advance-personal-training-studio'
  OR name ILIKE '%Body Advance Personal Training Studio%';

-- Update Contrology Studio
UPDATE gyms
SET
  description = 'Contrology Studio brings specialized reformer pilates training to Limassol, Cyprus. Specializing in Reformer Pilates, Yoga, and Personal Training, this facility caters to all fitness levels. Features include Sauna and Private Reformer Pilates for a complete training experience. Great for one-on-one coaching and personalized fitness programs.',
  phone = '+35799282127',
  updated_at = NOW()
WHERE slug = 'contrology-studio'
  OR name ILIKE '%Contrology Studio%';

-- Update UN1T Limassol
UPDATE gyms
SET
  description = 'Located Germasogia, UN1T Limassol offers comprehensive fitness training in Limassol. Specializing in Strength Training, Conditioning, and Team-Based Workouts, this facility caters to all fitness levels. Also offers Team-Based Workouts training. Contact for membership details and class schedules.',
  address = '45, Georgiou A Street, 4047, Germasogia, Limassol, Cyprus',
  phone = '00357 96727088',
  email = 'team.limassol@un1t.com',
  updated_at = NOW()
WHERE slug = 'un1t-limassol'
  OR name ILIKE '%UN1T Limassol%';

-- Update Combat and Fitness
UPDATE gyms
SET
  description = 'Located on Vasileos Pavlou 44, Combat and Fitness delivers authentic muay thai instruction in Limassol. Specializing in Muay Thai, HIIT Training, and Functional Training, this facility caters to all fitness levels. Operating 6:30 to 9:15, perfect for morning and evening workouts. Perfect for families with dedicated kids'' classes and family-friendly facilities. Memberships from €2 monthly with flexible payment options.',
  opening_hours = '{"Monday-Friday": "6:30 - 9:15 (Morning), 16:00 - 20:00 (Afternoon)", "Saturday": "8:30 - 9:30 (Morning)"}'::jsonb,
  pricing = '{"FreeTrial": "2 Weeks Unlimited Classes", "PrepaidPackages": ["4 Classes (1 time/week): €70", "8 Classes (1-2 times/week): €120", "12 Classes (1-3 times/week): €150", "16 Classes (1-4 times/week): €180"], "MonthlyPackages": ["Monthly 24 Classes: €160", "Monthly 48 Classes: €240"], "ChildClasses": ["Muay Thai for Kids (5-8 years): €60/month", "Juniors Muay Thai (9-13 years): €70/month"], "Monthly": "€24"}'::jsonb,
  address = 'Vasileos Pavlou 44, 3052 Limassol, Cyprus',
  email = 'hello@combatandfitness.com',
  updated_at = NOW()
WHERE slug = 'combat-and-fitness'
  OR name ILIKE '%Combat and Fitness%';

-- Update Body Fitness Gym Centre
UPDATE gyms
SET
  description = 'Body Fitness Gym Centre delivers authentic les mills instruction in Limassol, Cyprus. Specializing in Les Mills, Circuit Training, and TRX, this facility caters to all fitness levels. Features include Free Parking for enhanced workouts. Great for one-on-one coaching and personalized fitness programs.',
  opening_hours = '{"Monday": "Open", "Tuesday": "Open", "Wednesday": "Open", "Thursday": "Open", "Friday": "Open", "Saturday": "Open"}'::jsonb,
  phone = '+35799817412',
  email = 'stefos-cy@hotmail.com',
  updated_at = NOW()
WHERE slug = 'body-fitness-gym-centre'
  OR name ILIKE '%Body Fitness Gym Centre%';

-- Update CrossFit Limassol
UPDATE gyms
SET
  description = 'Located on 9 Sheakspear 3041 Limassol, CrossFit Limassol provides top-tier fitness services in Limassol. Specializing in CrossFit, Body Recomposition, and Competition Prep, this facility caters to all fitness levels. Also offers Competition Prep training. Contact for membership details and class schedules.',
  address = '9 Sheakspear 3041 Limassol, Cyprus',
  email = 'info@crossfitlimassol.com',
  updated_at = NOW()
WHERE slug = 'crossfit-limassol'
  OR name ILIKE '%CrossFit Limassol%';

-- Update Iron Fitness
UPDATE gyms
SET
  description = 'Located on Agias Fylaxeos, Iron Fitness provides top-tier fitness services in Limassol. Specializing in Body Weight Training, TRX, and Cardio, this facility caters to all fitness levels. Also offers Cardio training. Contact for membership details and class schedules.',
  opening_hours = '{"Morning Sessions": "7:00AM ~ 9:00AM", "Afternoon Sessions": "6:00PM ~ 8:00PM"}'::jsonb,
  address = 'Agias Fylaxeos, & 1, Limassol 3082, Limassol, Cyprus',
  email = 'contact@ironfitness.com',
  updated_at = NOW()
WHERE slug = 'iron-fitness'
  OR name ILIKE '%Iron Fitness%';

-- Update Team Rogue Forge
UPDATE gyms
SET
  description = 'Located near main avenue, Team Rogue Forge offers comprehensive fitness training in Limassol. Specializing in Cross Training, General Fitness, and Physical Fitness, this facility caters to all fitness levels. Also offers Physical Fitness training. Contact for membership details and class schedules.',
  opening_hours = '{"Monday": "07:00 – 21:00", "Tuesday": "07:00 – 21:00", "Wednesday": "07:00 – 21:00", "Thursday": "07:00 – 21:00", "Friday": "07:00 – 21:00", "Saturday": "07:00 – 12:30", "Sunday": "Closed"}'::jsonb,
  address = '116 Spyrou Kyprianou Ave, Limassol',
  email = 'info@teamrogueforge.com.cy',
  updated_at = NOW()
WHERE slug = 'team-rogue-forge'
  OR name ILIKE '%Team Rogue Forge%';

-- Update Reload Fitness Studio
UPDATE gyms
SET
  description = 'Reload Fitness Studio brings specialized hiit & run training to Limassol, Cyprus. Specializing in HIIT & RUN, Joy Ride, and One on One, this facility caters to all fitness levels. Also offers One on One training. Contact for membership details and class schedules.',
  address = 'Eleftherias 119, 3042 Limassol, Cyprus',
  email = 'info@reload-fitness.com',
  updated_at = NOW()
WHERE slug = 'reload-fitness-studio'
  OR name ILIKE '%Reload Fitness Studio%';

-- Update Muscle Factory
UPDATE gyms
SET
  description = 'Muscle Factory stands out as Limassol''s premier 24/7 fitness destination. Specializing in Strength Training, Muscle Building, and Conditioning, this facility caters to all fitness levels. Features include 24/7 Access for enhanced workouts. Open 24/7 for early birds and night owls seeking flexible training schedules.',
  opening_hours = '{"Monday": "24/7", "Tuesday": "24/7", "Wednesday": "24/7", "Thursday": "24/7", "Friday": "24/7", "Saturday": "24/7", "Sunday": "24/7"}'::jsonb,
  address = 'Griva Digeni 16, Limassol, Cyprus',
  phone = '-438253',
  email = 'musclefactory24hoursgym@outlook.com',
  updated_at = NOW()
WHERE slug = 'muscle-factory'
  OR name ILIKE '%Muscle Factory%';

-- Update Grind Fitness
UPDATE gyms
SET
  description = 'Located on Steliou Kiriakidi, Grind Fitness provides top-tier fitness services in Limassol. Specializing in CrossFit, Group Classes, and Personal Training, this facility caters to all fitness levels. Features include Parking for enhanced workouts. Great for one-on-one coaching and personalized fitness programs.',
  address = 'Steliou Kiriakidi, Limassol 3080, Cyprus',
  email = 'giannis1996.g9@hotmail.com',
  updated_at = NOW()
WHERE slug = 'grind-fitness'
  OR name ILIKE '%Grind Fitness%';

-- Update VIP GYM
UPDATE gyms
SET
  description = 'VIP GYM brings specialized fight do training to Limassol, Cyprus. Specializing in Fight Do, Suspension Training, and Step, this facility caters to all fitness levels. Operating 06:00am to 22:00pm, perfect for morning and evening workouts. Perfect for families with dedicated kids'' classes and family-friendly facilities.',
  opening_hours = '{"Monday-Friday": "06:00 am - 22:00 pm", "Saturday": "07:00 am - 18:00 pm", "Sunday": "08:00 am - 14:00 pm"}'::jsonb,
  address = 'Steliou Kyriakide 31A Str., 3080, Limassol',
  phone = '+35777776525',
  email = 'vipgym.livelonger@gmail.com',
  updated_at = NOW()
WHERE slug = 'vip-gym'
  OR name ILIKE '%VIP GYM%';

-- Update Anaplasis Gym Fitness Center
UPDATE gyms
SET
  description = 'Located Enaerios, Anaplasis Gym Fitness Center offers comprehensive fitness training in Limassol. Specializing in Personal Training, Body Building, and Les Mills™ Classes, this facility caters to all fitness levels. Features include Sauna and Free WiFi for a complete training experience. Operating 06:30 to 22:00, perfect for morning and evening workouts. Great for one-on-one coaching and personalized fitness programs.',
  opening_hours = '{"Monday": "06:30 - 22:00", "Tuesday": "06:30 - 22:00", "Wednesday": "06:30 - 22:00", "Thursday": "06:30 - 22:00", "Friday": "06:30 - 22:00", "Saturday": "08:00 - 18:00", "Sunday": "09:00 - 12:00"}'::jsonb,
  pricing = '{"Pricing": "Competitive prices including all fitness equipment, group classes, and one free weekly sauna session"}'::jsonb,
  address = '28th Oktovriou str, 319A Kanika Business Center, Enaerios Area, Limassol, Cyprus',
  updated_at = NOW()
WHERE slug = 'anaplasis-gym-fitness-center'
  OR name ILIKE '%Anaplasis Gym Fitness Center%';

-- Update Champ Boxing Academy
UPDATE gyms
SET
  description = 'Champ Boxing Academy delivers authentic boxing instruction in Limassol, Cyprus. Specializing in Boxing, this facility caters to all fitness levels. Contact for membership details and class schedules.',
  updated_at = NOW()
WHERE slug = 'champ-boxing-academy'
  OR name ILIKE '%Champ Boxing Academy%';

-- Update Her Gym
UPDATE gyms
SET
  description = 'Located near main avenue, Her Gym offers comprehensive fitness training in Limassol. Specializing in Women''s Only Fitness, Personal Training, and Group Classes, this facility caters to all fitness levels. Operating 07:00 to 22:00, perfect for morning and evening workouts. Ideal for women and families seeking a supportive fitness environment. Memberships from €1 monthly with flexible payment options.',
  opening_hours = '{"Monday": "07:00-22:00", "Tuesday": "07:00-22:00", "Wednesday": "07:00-22:00", "Thursday": "07:00-22:00", "Friday": "07:00-22:00", "Saturday": "07:00-22:00", "Sunday": "08:00-18:00"}'::jsonb,
  pricing = '{"SelfTraining - 1Month": "€98", "SelfTraining - 3Months": "€280", "SelfTraining - 6Months": "€518", "SelfTraining - 12Months": "€976", "GroupClasses - 1Month": "€155-€210", "GroupClasses - 3Months": "€436-€568", "GroupClasses - 6Months": "€772-€1,096", "GroupClasses - 12Months": "€1,495-€2,050", "PersonalTraining - 1Month": "€430-€575", "PersonalTraining - 3Months": "€1,232-€1,626", "PersonalTraining - 6Months": "€2,464-€3,252", "PersonalTraining - 12Months": "€4,300-€5,720"}'::jsonb,
  address = 'Omonoias Avenue No. 19, 3052 Limassol, Cyprus',
  email = 'info@hergym.cy',
  updated_at = NOW()
WHERE slug = 'her-gym'
  OR name ILIKE '%Her Gym%';

-- Update Dreamchasers Fitness Studio
UPDATE gyms
SET
  description = 'Located Agios Spiridonas, Dreamchasers Fitness Studio offers comprehensive fitness training in Limassol. Specializing in TRX Training, Functional Training, and Weight Loss, this facility caters to all fitness levels. Great for one-on-one coaching and personalized fitness programs. Memberships from €10 monthly with flexible payment options.',
  pricing = '{"PrivateTraining": "€30", "SemiPrivateTraining": "€40", "MonthlyGroupPackages - 3SessionsPerWeek": "€80", "MonthlyGroupPackages - 4SessionsPerWeek": "€100", "MonthlyGroupPackages - 5SessionsPerWeek": "€120", "DailyPass": "€10"}'::jsonb,
  address = 'Kekropos 8, Agios Spiridonas, Limassol 3051',
  email = 'info@dreamchasers.cy',
  updated_at = NOW()
WHERE slug = 'dreamchasers-fitness-studio'
  OR name ILIKE '%Dreamchasers Fitness Studio%';

COMMIT;
