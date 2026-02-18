'use client';

import React from 'react';
import { Clock, CheckCircle, MapPin, Star } from 'lucide-react';

export function HomeBenefitsSection() {
  const benefits = [
    {
      icon: MapPin,
      iconBg: 'bg-primary-blue/20',
      iconColor: 'text-primary-blue',
      title: 'Find Gyms Near Me & Save Time',
      text: 'Search for gyms close to me, nearby gyms, and fitness centers in your area. No more endless searches for "gym near me"—find amenities, hours, and specialties in one place.',
    },
    {
      icon: Star,
      iconBg: 'bg-secondary-green/20',
      iconColor: 'text-secondary-green',
      title: 'Compare Ratings & Discover Specialties',
      text: 'Read authentic reviews and compare ratings from real members. Find gyms by specialty: CrossFit, yoga, pilates, MMA, fitness studios, and health clubs.',
    },
    {
      icon: Clock,
      iconBg: 'bg-primary-purple/20',
      iconColor: 'text-primary-purple',
      title: '24/7 Access & Accurate Info',
      text: 'Find 24 hour gyms and 24 7 gyms near me for flexible schedules. Get up-to-date opening hours, contact details, and locations—all verified and regularly updated.',
    },
  ];

  return (
    <section className="py-16 bg-background-dark-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            Why Use Gym Near Me Cyprus to Find Your Perfect Gym
          </h2>
          <p className="text-lg text-text-light max-w-3xl mx-auto">
            Discover why thousands of people use our directory to find gyms near me, fitness centers, and health clubs across Cyprus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map(({ icon: Icon, iconBg, iconColor, title, text }) => (
            <div key={title} className="bg-surface-card rounded-card p-6">
              <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-text-white mb-3">{title}</h3>
              <p className="text-text-light">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
