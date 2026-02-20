'use client';

import React from 'react';
import { Clock, CheckCircle, MapPin, Star } from 'lucide-react';

export function HomeBenefitsSection() {
  const benefits = [
    {
      icon: MapPin,
      iconBg: 'bg-primary-blue/20',
      iconColor: 'text-primary-blue',
      title: 'Find the Right Gym Fast',
      text: 'Search by location or browse by city. See amenities, hours, and specialties without hopping between sites.',
    },
    {
      icon: Star,
      iconBg: 'bg-secondary-green/20',
      iconColor: 'text-secondary-green',
      title: 'Compare Ratings & Specialties',
      text: 'Read reviews and compare ratings. Filter by CrossFit, yoga, pilates, MMA, or general fitness.',
    },
    {
      icon: Clock,
      iconBg: 'bg-primary-purple/20',
      iconColor: 'text-primary-purple',
      title: '24/7 Access & Up-to-Date Info',
      text: 'See which gyms are open around the clock. We keep opening hours and contact details updated.',
    },
  ];

  return (
    <section className="py-16 bg-background-dark-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            Compare Gyms Without the Guesswork
          </h2>
          <p className="text-lg text-text-light max-w-3xl mx-auto">
            See fitness centers and gyms across Cyprus in one place—ratings, opening hours, and what each offers.
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
