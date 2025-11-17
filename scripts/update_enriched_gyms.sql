-- Update Limassol gyms with enriched data
-- Generated: 1763304184.3411193
-- Total gyms: 26

BEGIN;

-- Update Monica Dance Pilates Studio
UPDATE gyms
SET
  description = 'Monica Dance Pilates Studio is a premier fitness destination in Limassol, Cyprus. Specializing in Classical Ballet, Point Work, Contemporary Dance, Pilates, and Stretching & Strengthening, this facility offers expert instruction tailored to all fitness levels. The gym features Ballet Classes, Pilates Group Classes, Pilates Equipment, One-to-One and Duet Sessions, ensuring a comfortable and well-equipped training environment. Operating Monday-Friday: 14:30-20:00, the facility accommodates various schedules and training preferences. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact phone: 99785748, email: MONIKAPILATESTUDIO@HOTMAIL.COM for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Monica Dance Pilates Studio, where quality instruction meets modern facilities.',
  opening_hours = '{"Monday-Friday": "14:30-20:00"}'::jsonb,
  phone = '+35799785748',
  email = 'monikapilatestudio@hotmail.com',
  updated_at = NOW()
WHERE slug = 'monica-dance-pilates-studio'
  OR name ILIKE '%Monica Dance Pilates Studio%';

-- Update Vinyasa Yoga Studio Limassol
UPDATE gyms
SET
  description = 'Vinyasa Yoga Studio Limassol is a premier fitness destination Neapolis, in residential area in Limassol, Cyprus. Specializing in Ashtanga Vinyasa Yoga, Mysore Yoga, Vinyasa Yoga, Aerial Yoga, YogaWorks, Prenatal Yoga, and Private Yoga Classes, this facility offers expert instruction tailored to all fitness levels. The gym features Yoga Studio, Private Classes, Aerial Yoga Space, ensuring a comfortable and well-equipped training environment. Operating Monday: Morning: 8:30AM-10:00AM | Evening: 6:30PM-8:30PM | Tuesday: Evening: 6:00PM-8:00PM | Wednesday: Morning: 8:30AM-10:00AM | Evening: 6:30PM-8:00PM | Thursday: Morning: 8:00AM-10:00AM | Evening: 6:00PM-8:00PM | Friday: Morning: 8:30AM-10:00AM | Evening: 6:30PM-8:00PM | Saturday: Morning: 8:30AM-10:00AM, the facility accommodates various schedules and training preferences. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact phone: 25106848, 99160096, email: info@vinyasayogacyprus.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Vinyasa Yoga Studio Limassol, where quality instruction meets modern facilities.',
  opening_hours = '{"Monday": "Morning: 8:30AM-10:00AM | Evening: 6:30PM-8:30PM", "Tuesday": "Evening: 6:00PM-8:00PM", "Wednesday": "Morning: 8:30AM-10:00AM | Evening: 6:30PM-8:00PM", "Thursday": "Morning: 8:00AM-10:00AM | Evening: 6:00PM-8:00PM", "Friday": "Morning: 8:30AM-10:00AM | Evening: 6:30PM-8:00PM", "Saturday": "Morning: 8:30AM-10:00AM", "Sunday": "Closed"}'::jsonb,
  address = '6 Ypsilanti, Athina Court, Neapolis, Limassol, Cyprus',
  phone = '25106848 99160096',
  email = 'info@vinyasayogacyprus.com',
  updated_at = NOW()
WHERE slug = 'vinyasa-yoga-studio-limassol'
  OR name ILIKE '%Vinyasa Yoga Studio Limassol%';

-- Update Personal Fitness Assistant
UPDATE gyms
SET
  description = 'Personal Fitness Assistant is a premier fitness destination in Limassol, Cyprus. Specializing in Strength Training, Cardio, TRX, HIIT, 3D Training, Animal Flow Stretching, and Foam Rolling, this facility offers expert instruction tailored to all fitness levels. The gym features Water, Towel, Nutritionist Visit, ensuring a comfortable and well-equipped training environment. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: Contact for details for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Personal Fitness Assistant, where quality instruction meets modern facilities.',
  address = 'Eleftherias 119, Limassol',
  updated_at = NOW()
WHERE slug = 'personal-fitness-assistant'
  OR name ILIKE '%Personal Fitness Assistant%';

-- Update Soul Vibe Space
UPDATE gyms
SET
  description = 'Soul Vibe Space is a premier fitness destination in Limassol, Cyprus. Specializing in Contact for details, this facility offers expert instruction tailored to all fitness levels. The gym features Contact for details, ensuring a comfortable and well-equipped training environment. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact phone: Contact for details, email: Contact for details for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Soul Vibe Space, where quality instruction meets modern facilities.',
  updated_at = NOW()
WHERE slug = 'soul-vibe-space'
  OR name ILIKE '%Soul Vibe Space%';

-- Update no.75space
UPDATE gyms
SET
  description = 'no.75space is a premier fitness destination in Limassol, Cyprus. Specializing in Pilates, Private Sessions, Group Sessions, Core Align, and Equipment Training, this facility offers expert instruction tailored to all fitness levels. The gym features Lockers, Showers, Men''s Dressing Room, Ladies'' Dressing Room, Reformer & Wunda Chair Equipment, ensuring a comfortable and well-equipped training environment. Operating Monday-Friday: 06:30-21:00, the facility accommodates various schedules and training preferences. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: info@no75space.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at no.75space, where quality instruction meets modern facilities.',
  opening_hours = '{"Monday-Friday": "06:30-21:00"}'::jsonb,
  address = 'Thesalonikis 75, 3025 Limassol, Cyprus',
  email = 'info@no75space.com',
  updated_at = NOW()
WHERE slug = 'no75space'
  OR name ILIKE '%no.75space%';

-- Update CHECKMAT Limassol
UPDATE gyms
SET
  description = 'CHECKMAT Limassol is a premier fitness destination in Limassol, Cyprus. Specializing in Brazilian Jiu-Jitsu (BJJ), No-Gi BJJ, Boxing, and Kids Martial Arts, this facility offers expert instruction tailored to all fitness levels. The gym features BJJ Classes, Boxing, Kids Classes, Mobility Training, Open Mat, ensuring a comfortable and well-equipped training environment. Operating Monday: 8:00-21:00 | Tuesday: 8:30-20:30 | Wednesday: 8:00-21:00 | Thursday: 8:30-20:30 | Friday: 8:00-22:30, the facility accommodates various schedules and training preferences. Contact phone: 35797442244, email: club@checkmat.cy for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at CHECKMAT Limassol, where quality instruction meets modern facilities.',
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
  description = 'MMA School The Cage is a premier fitness destination in Limassol, Cyprus. Specializing in Taekwondo, Wrestling, Muay Thai, Boxing, Mixed Martial Arts, Kickboxing, and Brazilian Jiu Jitsu, this facility offers expert instruction tailored to all fitness levels. The gym features Contact for details, ensuring a comfortable and well-equipped training environment. Operating Monday-Sunday: 06:30 - 21:45, the facility accommodates various schedules and training preferences. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact phone: 35799817412, email: stefos-cy@hotmail.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at MMA School The Cage, where quality instruction meets modern facilities.',
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
  description = 'Gymania Fitness Club is a premier fitness destination in Limassol, Cyprus. Specializing in Zumba, Pilates, Trampolines, Shaping, Abs & Legs, Anti-Stress Stretching, TRX, Yoga, and Abs Workout, this facility offers expert instruction tailored to all fitness levels. The gym features Fitness Area, Group Classes, Changing Rooms, Kids Playground, ensuring a comfortable and well-equipped training environment. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact phone: Contact for details, email: Contact for details for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Gymania Fitness Club, where quality instruction meets modern facilities.',
  updated_at = NOW()
WHERE slug = 'gymania-fitness-club'
  OR name ILIKE '%Gymania Fitness Club%';

-- Update Lumpinee Gym
UPDATE gyms
SET
  description = 'Lumpinee Gym is a premier fitness destination Agios Athanasios in Limassol, Cyprus. Specializing in Muay Thai, Muay Boran, Kids Martial Arts, Personal Training, and Fight Preparation, this facility offers expert instruction tailored to all fitness levels. The gym features Muay Thai Training, Personal Training, Kids'' Classes, Competitive Training, ensuring a comfortable and well-equipped training environment. Operating Monday: 6:30 am – 9:00 pm | Tuesday: 6:30 am – 9:00 pm | Wednesday: 6:30 am – 9:00 pm | Thursday: 6:30 am – 9:00 pm | Friday: 6:30 am – 9:00 pm | Saturday: 11:00 am – 1:00 pm, the facility accommodates various schedules and training preferences. Contact email: lumpineegymlimassol@gmail.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Lumpinee Gym, where quality instruction meets modern facilities.',
  opening_hours = '{"Monday": "6:30 am – 9:00 pm", "Tuesday": "6:30 am – 9:00 pm", "Wednesday": "6:30 am – 9:00 pm", "Thursday": "6:30 am – 9:00 pm", "Friday": "6:30 am – 9:00 pm", "Saturday": "11:00 am – 1:00 pm", "Sunday": "Closed"}'::jsonb,
  address = 'Akarnanias 4 Yermasogia, Agios Athanasios, Limassol',
  email = 'lumpineegymlimassol@gmail.com',
  updated_at = NOW()
WHERE slug = 'lumpinee-gym'
  OR name ILIKE '%Lumpinee Gym%';

-- Update Peak Condition
UPDATE gyms
SET
  description = 'Peak Condition is a premier fitness destination in Limassol, Cyprus. Specializing in Personal Training, Group Training, Exercise Rehabilitation, Corporate Fitness, 12 Week Body Transformation, 12 Weeks To Peak Condition, and Online Training, this facility offers expert instruction tailored to all fitness levels. The gym features Cardio room, Free weights room, Resistance machine room, Class training room, Consultation area, ensuring a comfortable and well-equipped training environment. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: Contact for details for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Peak Condition, where quality instruction meets modern facilities.',
  address = '152 Vasileos Konstantinou, 1st Floor, Limassol, 3080, Cyprus',
  updated_at = NOW()
WHERE slug = 'peak-condition'
  OR name ILIKE '%Peak Condition%';

-- Update Body Advance Personal Training Studio
UPDATE gyms
SET
  description = 'Body Advance Personal Training Studio is a premier fitness destination near main avenue in Limassol, Cyprus. Specializing in Pilates, Yoga, Aerobics, Weight Lifting, and Personal Training, this facility offers expert instruction tailored to all fitness levels. The gym features Power Plate, Sport Massage, ensuring a comfortable and well-equipped training environment. Operating Week Days: 09:00-18:00, the facility accommodates various schedules and training preferences. Contact email: info@bodyadvance.net for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Body Advance Personal Training Studio, where quality instruction meets modern facilities.',
  opening_hours = '{"Week Days": "09:00-18:00", "Sunday": "Closed"}'::jsonb,
  address = '161. Arch. Makarios III Ave. Akapnitis Court Floor 2, Limassol, Cyprus',
  email = 'info@bodyadvance.net',
  updated_at = NOW()
WHERE slug = 'body-advance-personal-training-studio'
  OR name ILIKE '%Body Advance Personal Training Studio%';

-- Update Contrology Studio
UPDATE gyms
SET
  description = 'Contrology Studio is a premier fitness destination in Limassol, Cyprus. Specializing in Reformer Pilates, Yoga, and Personal Training, this facility offers expert instruction tailored to all fitness levels. The gym features Sauna, Private Reformer Pilates, Yoga Sessions, ensuring a comfortable and well-equipped training environment. Contact phone: 35799282127, email: Contact for details for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Contrology Studio, where quality instruction meets modern facilities.',
  phone = '+35799282127',
  updated_at = NOW()
WHERE slug = 'contrology-studio'
  OR name ILIKE '%Contrology Studio%';

-- Update UN1T Limassol
UPDATE gyms
SET
  description = 'UN1T Limassol is a premier fitness destination Germasogia in Limassol, Cyprus. Specializing in Strength Training, Conditioning, Team-Based Workouts, and Performance Tracking, this facility offers expert instruction tailored to all fitness levels. The gym features Dumbbells, Kettlebells, Barbells, Concept 2 Rowers, Bike Ergs, ensuring a comfortable and well-equipped training environment. Contact phone: 00357 96727088, email: team.limassol@un1t.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at UN1T Limassol, where quality instruction meets modern facilities.',
  address = '45, Georgiou A Street, 4047, Germasogia, Limassol, Cyprus',
  phone = '00357 96727088',
  email = 'team.limassol@un1t.com',
  updated_at = NOW()
WHERE slug = 'un1t-limassol'
  OR name ILIKE '%UN1T Limassol%';

-- Update Combat and Fitness
UPDATE gyms
SET
  description = 'Combat and Fitness is a premier fitness destination in Limassol, Cyprus. Specializing in Muay Thai, HIIT Training, Functional Training, and Kids Muay Thai, this facility offers expert instruction tailored to all fitness levels. The gym features Changing Rooms, Showers, Toilets, Towels, Drinking Water, ensuring a comfortable and well-equipped training environment. Operating Monday-Friday: 6:30 - 9:15 (Morning), 16:00 - 20:00 (Afternoon) | Saturday: 8:30 - 9:30 (Morning), the facility accommodates various schedules and training preferences. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: hello@combatandfitness.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Combat and Fitness, where quality instruction meets modern facilities.',
  opening_hours = '{"Monday-Friday": "6:30 - 9:15 (Morning), 16:00 - 20:00 (Afternoon)", "Saturday": "8:30 - 9:30 (Morning)"}'::jsonb,
  address = 'Vasileos Pavlou 44, 3052 Limassol, Cyprus',
  email = 'hello@combatandfitness.com',
  updated_at = NOW()
WHERE slug = 'combat-and-fitness'
  OR name ILIKE '%Combat and Fitness%';

-- Update Body Fitness Gym Centre
UPDATE gyms
SET
  description = 'Body Fitness Gym Centre is a premier fitness destination in Limassol, Cyprus. Specializing in Les Mills, Circuit Training, TRX, Weightlifting, Personal Training, MMA, and BJJ, this facility offers expert instruction tailored to all fitness levels. The gym features State-of-the-art facilities, Cutting-edge equipment, Shower Access, Free Parking, Cardio Machines, ensuring a comfortable and well-equipped training environment. Operating Monday: Open | Tuesday: Open | Wednesday: Open | Thursday: Open | Friday: Open | Saturday: Open, the facility accommodates various schedules and training preferences. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact phone: 35799817412, email: stefos-cy@hotmail.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Body Fitness Gym Centre, where quality instruction meets modern facilities.',
  opening_hours = '{"Monday": "Open", "Tuesday": "Open", "Wednesday": "Open", "Thursday": "Open", "Friday": "Open", "Saturday": "Open"}'::jsonb,
  phone = '+35799817412',
  email = 'stefos-cy@hotmail.com',
  updated_at = NOW()
WHERE slug = 'body-fitness-gym-centre'
  OR name ILIKE '%Body Fitness Gym Centre%';

-- Update CrossFit Limassol
UPDATE gyms
SET
  description = 'CrossFit Limassol is a premier fitness destination in Limassol, Cyprus. Specializing in CrossFit, Body Recomposition, Competition Prep, and Sport-Specific Nutrition, this facility offers expert instruction tailored to all fitness levels. The gym features Group Training, Personal Training, Digital Coaching, Outdoor Classes, ensuring a comfortable and well-equipped training environment. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: info@crossfitlimassol.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at CrossFit Limassol, where quality instruction meets modern facilities.',
  address = '9 Sheakspear 3041 Limassol, Cyprus',
  email = 'info@crossfitlimassol.com',
  updated_at = NOW()
WHERE slug = 'crossfit-limassol'
  OR name ILIKE '%CrossFit Limassol%';

-- Update Iron Fitness
UPDATE gyms
SET
  description = 'Iron Fitness is a premier fitness destination in Limassol, Cyprus. Specializing in Body Weight Training, TRX, Cardio, CrossFit, and Bodybuilding, this facility offers expert instruction tailored to all fitness levels. The gym features Personal Training, Semi-Personal Training, Group Classes, ensuring a comfortable and well-equipped training environment. Operating Morning Sessions: 7:00AM ~ 9:00AM | Afternoon Sessions: 6:00PM ~ 8:00PM, the facility accommodates various schedules and training preferences. Contact email: contact@ironfitness.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Iron Fitness, where quality instruction meets modern facilities.',
  opening_hours = '{"Morning Sessions": "7:00AM ~ 9:00AM", "Afternoon Sessions": "6:00PM ~ 8:00PM"}'::jsonb,
  address = 'Agias Fylaxeos, & 1, Limassol 3082, Limassol, Cyprus',
  email = 'contact@ironfitness.com',
  updated_at = NOW()
WHERE slug = 'iron-fitness'
  OR name ILIKE '%Iron Fitness%';

-- Update Team Rogue Forge
UPDATE gyms
SET
  description = 'Team Rogue Forge is a premier fitness destination near main avenue in Limassol, Cyprus. Specializing in Cross Training, General Fitness, Physical Fitness, Aerobic & Cardio, Strength & Core, Muscular Fitness, and Stretching & Flexibility, this facility offers expert instruction tailored to all fitness levels. The gym features Group Classes, Cross-Training, Strength Training, ensuring a comfortable and well-equipped training environment. Operating Monday: 07:00 – 21:00 | Tuesday: 07:00 – 21:00 | Wednesday: 07:00 – 21:00 | Thursday: 07:00 – 21:00 | Friday: 07:00 – 21:00 | Saturday: 07:00 – 12:30, the facility accommodates various schedules and training preferences. Contact email: info@teamrogueforge.com.cy for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Team Rogue Forge, where quality instruction meets modern facilities.',
  opening_hours = '{"Monday": "07:00 – 21:00", "Tuesday": "07:00 – 21:00", "Wednesday": "07:00 – 21:00", "Thursday": "07:00 – 21:00", "Friday": "07:00 – 21:00", "Saturday": "07:00 – 12:30", "Sunday": "Closed"}'::jsonb,
  address = '116 Spyrou Kyprianou Ave, Limassol',
  email = 'info@teamrogueforge.com.cy',
  updated_at = NOW()
WHERE slug = 'team-rogue-forge'
  OR name ILIKE '%Team Rogue Forge%';

-- Update Reload Fitness Studio
UPDATE gyms
SET
  description = 'Reload Fitness Studio is a premier fitness destination in Limassol, Cyprus. Specializing in HIIT & RUN, Joy Ride, One on One, Glutes & Abs, HIIT & Box, Rebuild, and Reform / Mat Pilates, this facility offers expert instruction tailored to all fitness levels. The gym features Fuel Bar, App-based Booking, ensuring a comfortable and well-equipped training environment. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: info@reload-fitness.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Reload Fitness Studio, where quality instruction meets modern facilities.',
  address = 'Eleftherias 119, 3042 Limassol, Cyprus',
  email = 'info@reload-fitness.com',
  updated_at = NOW()
WHERE slug = 'reload-fitness-studio'
  OR name ILIKE '%Reload Fitness Studio%';

-- Update Muscle Factory
UPDATE gyms
SET
  description = 'Muscle Factory is a premier fitness destination in Limassol, Cyprus. Specializing in Strength Training, Muscle Building, and Conditioning, this facility offers expert instruction tailored to all fitness levels. The gym features 24/7 Access, Strength Training, Conditioning Training, ensuring a comfortable and well-equipped training environment. With 24/7 access, members can train at their convenience, making it perfect for early morning workouts, late-night sessions, or flexible schedules. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact phone: -438253, email: musclefactory24hoursgym@outlook.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Muscle Factory, where quality instruction meets modern facilities.',
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
  description = 'Grind Fitness is a premier fitness destination in Limassol, Cyprus. Specializing in CrossFit, Group Classes, Personal Training, and Nutrition Coaching, this facility offers expert instruction tailored to all fitness levels. The gym features Free Weights, Cardio Equipment, Lockers, Clean Showers, Parking, ensuring a comfortable and well-equipped training environment. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: giannis1996.g9@hotmail.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Grind Fitness, where quality instruction meets modern facilities.',
  address = 'Steliou Kiriakidi, Limassol 3080, Cyprus',
  email = 'giannis1996.g9@hotmail.com',
  updated_at = NOW()
WHERE slug = 'grind-fitness'
  OR name ILIKE '%Grind Fitness%';

-- Update VIP GYM
UPDATE gyms
SET
  description = 'VIP GYM is a premier fitness destination in Limassol, Cyprus. Specializing in Fight Do, Suspension Training, Step, Aerial Yoga, Pilates, Kickboxing, Personal Training, Semi Personal Training, and Weight Training, this facility offers expert instruction tailored to all fitness levels. The gym features Weight Training, Personal Training, Group Classes, Gymnastics for Kids, ensuring a comfortable and well-equipped training environment. Operating Monday-Friday: 06:00 am - 22:00 pm | Saturday: 07:00 am - 18:00 pm | Sunday: 08:00 am - 14:00 pm, the facility accommodates various schedules and training preferences. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact phone: 77 776525, email: vipgym.livelonger@gmail.com for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at VIP GYM, where quality instruction meets modern facilities.',
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
  description = 'Anaplasis Gym Fitness Center is a premier fitness destination Enaerios in Limassol, Cyprus. Specializing in Personal Training, Body Building, Les Mills™ Classes, and Group Fitness, this facility offers expert instruction tailored to all fitness levels. The gym features Sauna, Locker Rooms, Showers, Free WiFi, Group Exercise Studio, ensuring a comfortable and well-equipped training environment. Operating Monday: 06:30 - 22:00 | Tuesday: 06:30 - 22:00 | Wednesday: 06:30 - 22:00 | Thursday: 06:30 - 22:00 | Friday: 06:30 - 22:00 | Saturday: 08:00 - 18:00 | Sunday: 09:00 - 12:00, the facility accommodates various schedules and training preferences. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: Contact for details for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Anaplasis Gym Fitness Center, where quality instruction meets modern facilities.',
  opening_hours = '{"Monday": "06:30 - 22:00", "Tuesday": "06:30 - 22:00", "Wednesday": "06:30 - 22:00", "Thursday": "06:30 - 22:00", "Friday": "06:30 - 22:00", "Saturday": "08:00 - 18:00", "Sunday": "09:00 - 12:00"}'::jsonb,
  address = '28th Oktovriou str, 319A Kanika Business Center, Enaerios Area, Limassol, Cyprus',
  updated_at = NOW()
WHERE slug = 'anaplasis-gym-fitness-center'
  OR name ILIKE '%Anaplasis Gym Fitness Center%';

-- Update Champ Boxing Academy
UPDATE gyms
SET
  description = 'Champ Boxing Academy is a premier fitness destination in Limassol, Cyprus. Specializing in Boxing, this facility offers expert instruction tailored to all fitness levels. The gym features Boxing Training, ensuring a comfortable and well-equipped training environment. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact phone: Contact for details, email: Contact for details for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Champ Boxing Academy, where quality instruction meets modern facilities.',
  updated_at = NOW()
WHERE slug = 'champ-boxing-academy'
  OR name ILIKE '%Champ Boxing Academy%';

-- Update Her Gym
UPDATE gyms
SET
  description = 'Her Gym is a premier fitness destination near main avenue in Limassol, Cyprus. Specializing in Women''s Only Fitness, Personal Training, Group Classes, Combat Sports, and Nutrition Coaching, this facility offers expert instruction tailored to all fitness levels. The gym features Modern Equipment, Group Classes, Yoga Classes, Pilates Classes, Kickboxing, ensuring a comfortable and well-equipped training environment. Operating Monday: 07:00-22:00 | Tuesday: 07:00-22:00 | Wednesday: 07:00-22:00 | Thursday: 07:00-22:00 | Friday: 07:00-22:00 | Saturday: 07:00-22:00 | Sunday: 08:00-18:00, the facility accommodates various schedules and training preferences. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: info@hergym.cy for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Her Gym, where quality instruction meets modern facilities.',
  opening_hours = '{"Monday": "07:00-22:00", "Tuesday": "07:00-22:00", "Wednesday": "07:00-22:00", "Thursday": "07:00-22:00", "Friday": "07:00-22:00", "Saturday": "07:00-22:00", "Sunday": "08:00-18:00"}'::jsonb,
  address = 'Omonoias Avenue No. 19, 3052 Limassol, Cyprus',
  email = 'info@hergym.cy',
  updated_at = NOW()
WHERE slug = 'her-gym'
  OR name ILIKE '%Her Gym%';

-- Update Dreamchasers Fitness Studio
UPDATE gyms
SET
  description = 'Dreamchasers Fitness Studio is a premier fitness destination Agios Spiridonas in Limassol, Cyprus. Specializing in TRX Training, Functional Training, Weight Loss, Muscle Building, and Personal Training, this facility offers expert instruction tailored to all fitness levels. The gym features Contact for details, ensuring a comfortable and well-equipped training environment. Competitive membership packages and flexible pricing options are available to suit different fitness goals and budgets. Contact email: info@dreamchasers.cy for membership details, class schedules, or to schedule a visit. Experience Limassol''s best fitness training at Dreamchasers Fitness Studio, where quality instruction meets modern facilities.',
  address = 'Kekropos 8, Agios Spiridonas, Limassol 3051',
  email = 'info@dreamchasers.cy',
  updated_at = NOW()
WHERE slug = 'dreamchasers-fitness-studio'
  OR name ILIKE '%Dreamchasers Fitness Studio%';

COMMIT;
