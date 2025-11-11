import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { cities, getAllGyms } from '@/lib/data';
import { specialties } from '@/lib/data';
import { SearchBar } from '@/components/home/SearchBar';
import { Clock, CheckCircle, MapPin, Star, Users } from 'lucide-react';
import { generateFAQPageSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Gym Near Me in Cyprus | Find Best Fitness Centers & Health Clubs | 50+ Gyms',
  description: 'Find gyms near me in Cyprus. Search 50+ fitness centers, health clubs, and 24-hour gyms. Compare ratings, reviews, and amenities. List your gym for free.',
  keywords: 'gym near me, fitness near me, gym close to me, nearby gym, fitness center, health club, fitness club, gym cyprus, 24 hour gym near me, 24 7 gym near me, gym limassol, gym nicosia, gym larnaca, gym paphos',
  openGraph: {
    title: 'Gym Near Me in Cyprus | Find Best Fitness Centers & Health Clubs',
    description: 'Find gyms near me in Cyprus. Search 50+ fitness centers, health clubs, and 24-hour gyms. Compare ratings, reviews, and amenities.',
    url: 'https://gymnearme.cy',
    siteName: 'GymNearMe Cyprus',
    images: [
      {
        url: 'https://gymnearme.cy/logo.png',
        width: 1200,
        height: 630,
        alt: 'GymNearMe Cyprus - Find Gyms Near Me',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gym Near Me in Cyprus | Find Best Fitness Centers & Health Clubs',
    description: 'Find gyms near me in Cyprus. Search 50+ fitness centers, health clubs, and 24-hour gyms.',
    images: ['https://gymnearme.cy/logo.png'],
  },
};

export default function HomePage() {
  const totalGyms = getAllGyms().length;
  const allGyms = getAllGyms();
  const twentyFourHourGyms = allGyms.filter(gym => 
    gym.amenities.some(amenity => amenity.toLowerCase().includes('24') || amenity.toLowerCase().includes('24/7'))
  );

  // FAQ data for schema
  const faqs = [
    {
      question: 'How do I find a gym near me in Cyprus?',
      answer: 'Use our search bar to find gyms near me by entering your city or area. You can also browse by city using our city directory, or filter by specialty to find fitness centers that match your interests. Our location-based search helps you find nearby gyms and gyms close to me quickly and easily.',
    },
    {
      question: 'Are there 24 hour gyms near me in Cyprus?',
      answer: 'Yes! Many gyms in Cyprus offer 24/7 access. Look for the "24/7 Access" amenity when browsing gym listings. You can also use our filter to specifically search for 24 hour gyms and 24 7 gyms near me. These facilities are perfect for early morning workouts, late-night training, or anyone with a flexible schedule.',
    },
    {
      question: "What's the difference between a fitness center and a health club?",
      answer: 'Fitness centers typically focus on exercise equipment and workout facilities, while health clubs often offer additional amenities like swimming pools, saunas, group classes, and sometimes spa services. Both are great options when searching for a gym near me - choose based on your specific needs and preferences.',
    },
    {
      question: 'How do I compare gyms near me?',
      answer: 'Our directory makes it easy to compare gyms near me. Each listing shows ratings, reviews, amenities, specialties, opening hours, and location. You can filter by rating, specialty, or amenities to narrow down your search. Read reviews from real members to get insights into each fitness center or health club.',
    },
  ];

  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background-dark via-background-dark-gray to-background-dark py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-white mb-6">
              Find Gyms Near Me in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                Cyprus
              </span>
            </h1>
            <p className="text-xl text-text-light mb-8 max-w-2xl mx-auto">
              Searching for a gym near me? Our comprehensive directory helps you find the best fitness centers, health clubs, and gyms close to you across Cyprus. Whether you're looking for a 24-hour gym, a nearby fitness center, or a health club with specific amenities, we've got you covered.
            </p>
            
            {/* Search Bar */}
            <SearchBar />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cities">
                <Button variant="primary" size="lg">Explore Gyms</Button>
              </Link>
              <Link href="/add-gym">
                <Button variant="outline" size="lg">List Your Gym Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* City Cards Grid */}
      <section className="py-16 bg-background-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
              Gyms in Cyprus by City
            </h2>
            <p className="text-lg text-text-light max-w-3xl mx-auto">
              Find gyms and fitness centers in your city. Our directory includes independent gyms, specialized training facilities, and comprehensive fitness centers offering various training programs and amenities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cities.map((city) => {
              // Assign emojis to cities
              const cityEmojis: Record<string, string> = {
                'limassol': '🌊', // Coastal city
                'nicosia': '🏛️', // Capital city
                'paphos': '🏖️', // Beach/tourist area
                'larnaca': '✈️', // Airport city
                'ayia-napa': '🎉', // Party/tourist destination
                'protaras': '🏝️', // Beach resort
              };
              
              const emoji = cityEmojis[city.id] || '🏋️';
              
              return (
                <Link
                  key={city.id}
                  href={`/cities/${city.slug}`}
                  className="group relative bg-surface-card rounded-card p-6 hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover overflow-hidden"
                >
                  {/* Decorative background shape */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-blue/20 transition-colors" />
                  
                  <div className="relative z-10">
                    {/* Emoji */}
                    <div className="text-4xl mb-3">{emoji}</div>
                    
                    {/* City Name */}
                    <h3 className="text-xl font-bold text-text-white mb-3 group-hover:text-primary-blue transition-colors">
                      {city.name}
                    </h3>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-3 mb-4 text-text-muted text-sm">
                      <span>{city.gymCount} {city.gymCount === 1 ? 'gym' : 'gyms'}</span>
                    </div>
                    
                    {/* View Directory Link */}
                    <div className="flex items-center text-primary-blue font-medium text-sm group-hover:underline">
                      <span>View Directory</span>
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* View All Cities Button */}
          <div className="text-center">
            <Link href="/cities">
              <Button variant="primary" size="lg">
                View All Cities
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="py-16 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
              Fitness Specialties Available at Cyprus Gyms
            </h2>
            <p className="text-lg text-text-light max-w-3xl mx-auto">
              Explore gyms by specialty. Find the perfect training style that matches your fitness goals, from high-intensity workouts to mindful practices.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
            {specialties.filter(s => !['hotel-gym', 'women-only'].includes(s.slug)).map((specialty) => {
              // Assign emojis to specialties
              const specialtyEmojis: Record<string, string> = {
                'crossfit': '🔥',
                'bodybuilding': '💪',
                'yoga': '🧘',
                'pilates': '🤸',
                'mma': '🥊',
                'boxing': '👊',
                'swimming': '🏊',
                'powerlifting': '🏋️',
              };
              
              const emoji = specialtyEmojis[specialty.id] || '💪';
              
              return (
                <Link
                  key={specialty.id}
                  href={`/specialties/${specialty.slug}`}
                  className="group relative bg-surface-card rounded-card p-6 text-center hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover overflow-hidden"
                >
                  {/* Decorative background shape */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-purple/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary-purple/20 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{emoji}</div>
                    <h3 className="text-lg font-bold text-text-white mb-2 group-hover:text-primary-blue transition-colors">
                      {specialty.name}
                    </h3>
                    <p className="text-text-muted text-sm">
                      {specialty.gymCount} {specialty.gymCount === 1 ? 'gym' : 'gyms'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* View All Specialties Button */}
          <div className="text-center">
            <Link href="/specialties">
              <Button variant="outline" size="lg">
                View All Specialties
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 24 Hour Gyms Section */}
      <section className="py-16 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
              24 Hour Gyms Near Me in Cyprus
            </h2>
            <p className="text-lg text-text-light max-w-3xl mx-auto">
              Need a 24/7 gym near me? Find gyms that are open 24 hours a day, 7 days a week. Perfect for early morning workouts, late-night training sessions, or flexible schedules. Search for 24 hour gyms and 24 7 gyms near you.
            </p>
          </div>
          
          {twentyFourHourGyms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {twentyFourHourGyms.slice(0, 6).map((gym) => {
                const city = cities.find(c => c.id === gym.cityId);
                return (
                  <Link
                    key={gym.id}
                    href={`/gyms/${gym.slug}`}
                    className="group bg-surface-card rounded-card p-6 hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-text-white group-hover:text-primary-blue transition-colors">
                        {gym.name}
                      </h3>
                      <Clock className="w-5 h-5 text-primary-blue flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-text-muted text-sm mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {city?.name}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center text-text-light">
                        <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                        {gym.rating}
                      </div>
                      <div className="text-text-muted">
                        {gym.reviewCount} reviews
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
          <div className="text-center">
            <Link href="/cities">
              <Button variant="outline" size="lg">
                View All 24 Hour Gyms
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
              Why Use GymNearMe Cyprus to Find Your Perfect Gym
            </h2>
            <p className="text-lg text-text-light max-w-3xl mx-auto">
              Discover why thousands of people use our directory to find gyms near me, fitness centers, and health clubs across Cyprus.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-surface-card rounded-card p-6">
              <div className="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary-blue" />
              </div>
              <h3 className="text-xl font-bold text-text-white mb-3">Find Gyms Near Me</h3>
              <p className="text-text-light">
                Search for gyms close to me, nearby gyms, and fitness centers in your area. Our location-based search helps you find the perfect gym location near you.
              </p>
            </div>
            
            <div className="bg-surface-card rounded-card p-6">
              <div className="w-12 h-12 bg-secondary-green/20 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-secondary-green" />
              </div>
              <h3 className="text-xl font-bold text-text-white mb-3">Compare Ratings & Reviews</h3>
              <p className="text-text-light">
                Read authentic reviews and compare ratings from real gym members. Make informed decisions based on what others are saying about fitness centers and health clubs.
              </p>
            </div>
            
            <div className="bg-surface-card rounded-card p-6">
              <div className="w-12 h-12 bg-primary-purple/20 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary-purple" />
              </div>
              <h3 className="text-xl font-bold text-text-white mb-3">Save Time Researching</h3>
              <p className="text-text-light">
                No more endless Google searches for "gym near me" or "fitness near me". Find all the information you need in one place - amenities, hours, specialties, and more.
              </p>
            </div>
            
            <div className="bg-surface-card rounded-card p-6">
              <div className="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary-blue" />
              </div>
              <h3 className="text-xl font-bold text-text-white mb-3">Discover Specialties</h3>
              <p className="text-text-light">
                Find gyms by specialty - from CrossFit and bodybuilding to yoga, pilates, and MMA. Whether you need a fitness studio or a comprehensive health club, we've got you covered.
              </p>
            </div>
            
            <div className="bg-surface-card rounded-card p-6">
              <div className="w-12 h-12 bg-secondary-green/20 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-secondary-green" />
              </div>
              <h3 className="text-xl font-bold text-text-white mb-3">24/7 Access Options</h3>
              <p className="text-text-light">
                Find 24 hour gyms and 24 7 gyms near me for maximum flexibility. Perfect for early birds, night owls, or anyone with an unpredictable schedule.
              </p>
            </div>
            
            <div className="bg-surface-card rounded-card p-6">
              <div className="w-12 h-12 bg-primary-purple/20 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary-purple" />
              </div>
              <h3 className="text-xl font-bold text-text-white mb-3">Accurate Information</h3>
              <p className="text-text-light">
                Get up-to-date information on opening hours, amenities, contact details, and locations. All verified and regularly updated to ensure accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Guide Section */}
      <section className="py-16 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
              Complete Guide to Finding the Best Gyms in Cyprus
            </h2>
            <p className="text-lg text-text-light max-w-3xl mx-auto">
              Our comprehensive guide helps you find the perfect gym near me, fitness center, or health club in Cyprus. Learn what to look for, how to compare options, and make the best choice for your fitness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-surface-card rounded-card p-8">
              <h3 className="text-2xl font-bold text-text-white mb-6">Tips for Choosing the Right Gym</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-text-white">Check Location and Accessibility</strong>
                    <p className="text-text-light text-sm mt-1">When searching for a gym near me, consider proximity to your home or work. A nearby gym or gym close to me increases the likelihood of regular attendance.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-text-white">Review Amenities and Equipment</strong>
                    <p className="text-text-light text-sm mt-1">Look for fitness centers and health clubs that offer the equipment and facilities you need. Check for parking, showers, locker rooms, and specialized equipment.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-text-white">Read Reviews and Ratings</strong>
                    <p className="text-text-light text-sm mt-1">Check what other members are saying about the gym. Look for patterns in reviews - are people happy with the facilities, staff, and overall experience?</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-text-white">Consider Specialty Offerings</strong>
                    <p className="text-text-light text-sm mt-1">If you're interested in specific training like CrossFit, pilates, or MMA, look for fitness studios and gyms that specialize in those areas.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-text-white">Visit During Peak Hours</strong>
                    <p className="text-text-light text-sm mt-1">See how crowded the gym gets during your preferred workout times. This helps you understand if the facility can accommodate your schedule.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-text-white">Ask About Membership Options</strong>
                    <p className="text-text-light text-sm mt-1">Inquire about membership plans, trial periods, and cancellation policies. Many fitness clubs offer flexible options to suit different needs.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-surface-card rounded-card p-8">
              <h3 className="text-2xl font-bold text-text-white mb-6">Types of Gyms Available in Cyprus</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-text-white mb-2">🏋️ Bodybuilding Gyms</h4>
                  <p className="text-text-light text-sm">Comprehensive fitness centers with extensive free weights, machines, and bodybuilding-focused equipment. Perfect for serious lifters and strength training enthusiasts.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-white mb-2">🔥 CrossFit Boxes</h4>
                  <p className="text-text-light text-sm">High-intensity functional training facilities offering CrossFit classes, open gym access, and community-driven workouts. Ideal for those seeking challenging, varied workouts.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-white mb-2">🧘 Yoga & Pilates Studios</h4>
                  <p className="text-text-light text-sm">Specialized fitness studios focusing on flexibility, core strength, and mindfulness. Many offer reformer pilates, hot yoga, and various class formats.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-white mb-2">🥊 MMA & Combat Sports</h4>
                  <p className="text-text-light text-sm">Martial arts gyms offering MMA, boxing, Brazilian Jiu-Jitsu, and other combat sports training. Great for self-defense, competition training, or intense cardio workouts.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-white mb-2">🏊 Swimming Facilities</h4>
                  <p className="text-text-light text-sm">Health clubs and fitness centers with swimming pools. Perfect for low-impact cardio, rehabilitation, or cross-training. Many gyms in Nicosia and other cities offer pool access.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-white mb-2">⏰ 24/7 Gyms</h4>
                  <p className="text-text-light text-sm">24 hour gyms and 24 7 gyms near me offer round-the-clock access. Perfect for early morning workouts, late-night training, or flexible schedules. Many fitness centers now offer 24/7 access options.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 rounded-card p-8 border border-primary-blue/30">
            <h3 className="text-2xl font-bold text-text-white mb-4">💡 Pro Tip</h3>
            <p className="text-text-light text-lg">
              When searching for a gym near me, consider visiting multiple options before committing. Many fitness centers and health clubs offer trial periods or day passes. This allows you to experience the facility, equipment, and atmosphere firsthand before making a decision. Also, don't forget to check if the gym offers 24/7 access if you need flexibility in your workout schedule.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background-dark-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
              Frequently Asked Questions About Finding Gyms Near Me
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">How do I find a gym near me in Cyprus?</h3>
              <p className="text-text-light">
                Use our search bar to find gyms near me by entering your city or area. You can also browse by city using our city directory, or filter by specialty to find fitness centers that match your interests. Our location-based search helps you find nearby gyms and gyms close to me quickly and easily.
              </p>
            </div>
            
            <div className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">Are there 24 hour gyms near me in Cyprus?</h3>
              <p className="text-text-light">
                Yes! Many gyms in Cyprus offer 24/7 access. Look for the "24/7 Access" amenity when browsing gym listings. You can also use our filter to specifically search for 24 hour gyms and 24 7 gyms near me. These facilities are perfect for early morning workouts, late-night training, or anyone with a flexible schedule.
              </p>
            </div>
            
            <div className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">What's the difference between a fitness center and a health club?</h3>
              <p className="text-text-light">
                Fitness centers typically focus on exercise equipment and workout facilities, while health clubs often offer additional amenities like swimming pools, saunas, group classes, and sometimes spa services. Both are great options when searching for a gym near me - choose based on your specific needs and preferences.
              </p>
            </div>
            
            <div className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">How do I compare gyms near me?</h3>
              <p className="text-text-light">
                Our directory makes it easy to compare gyms near me. Each listing shows ratings, reviews, amenities, specialties, opening hours, and location. You can filter by rating, specialty, or amenities to narrow down your search. Read reviews from real members to get insights into each fitness center or health club.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-blue mb-2">{totalGyms}+</div>
              <div className="text-text-light">Gyms Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-green mb-2">100%</div>
              <div className="text-text-light">Free to List</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-purple mb-2">4.5+</div>
              <div className="text-text-light">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

