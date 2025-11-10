import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { cities, getAllGyms } from '@/lib/data';
import { specialties } from '@/lib/data';
import { SearchBar } from '@/components/home/SearchBar';

export const metadata: Metadata = {
  title: 'GymNearMe Cyprus | Find the Best Gyms in Cyprus | 50+ Gyms Listed',
  description: 'Discover the best gyms and fitness centers in Cyprus. Browse by city, specialty, ratings, and reviews. Compare amenities, find your perfect workout space. List your gym for free.',
  keywords: 'gyms cyprus, fitness centers cyprus, limassol gyms, nicosia gyms, paphos gyms, larnaca gyms, gym directory cyprus',
  openGraph: {
    title: 'GymNearMe Cyprus | Find the Best Gyms in Cyprus',
    description: 'Discover top-rated gyms, fitness centers, and specialized training facilities across Cyprus. Compare ratings, reviews, amenities, and find your ideal workout space.',
    url: 'https://gymnearme.cy',
    siteName: 'GymNearMe Cyprus',
    images: [
      {
        url: 'https://gymnearme.cy/logo.png',
        width: 1200,
        height: 630,
        alt: 'GymNearMe Cyprus',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GymNearMe Cyprus | Find the Best Gyms in Cyprus',
    description: 'Discover top-rated gyms, fitness centers, and specialized training facilities across Cyprus.',
    images: ['https://gymnearme.cy/logo.png'],
  },
};

export default function HomePage() {
  const totalGyms = getAllGyms().length;
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background-dark via-background-dark-gray to-background-dark py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-white mb-6">
              Find the Perfect Gym in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                Cyprus
              </span>
            </h1>
            <p className="text-xl text-text-light mb-8 max-w-2xl mx-auto">
              Discover top-rated gyms, fitness centers, and specialized training facilities across Cyprus. 
              Compare ratings, reviews, amenities, and find your ideal workout space.
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
            {specialties.map((specialty) => {
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

      {/* Trust Signals */}
      <section className="py-16 bg-background-dark-gray">
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
  );
}

