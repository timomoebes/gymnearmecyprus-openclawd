'use client';

import React from 'react';
import { Dumbbell, Heart, MapPin, Star } from 'lucide-react';

interface HomeTrustSectionProps {
  totalGyms: number;
  formattedAverageRating: string;
  cityCount?: number;
}

export function HomeTrustSection({ totalGyms, formattedAverageRating, cityCount = 0 }: HomeTrustSectionProps) {
  const stats: Array<{ value: string; label: string; icon: React.ComponentType<{ className?: string }> | null; color: string }> = [
    { value: `${totalGyms}+`, label: 'Gyms', icon: Dumbbell, color: 'text-primary-blue' },
    { value: '100%', label: 'Free to List', icon: Heart, color: 'text-secondary-green' },
    { value: `${formattedAverageRating}+`, label: 'Member Rating', icon: Star, color: 'text-primary-purple' },
    ...(cityCount > 0 ? [{ value: `${cityCount}`, label: 'Cities', icon: MapPin, color: 'text-text-white' }] : []),
  ];

  return (
    <section className="py-20 bg-background-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-blue/5 via-transparent to-primary-purple/5 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <p className="text-center text-text-light/90 text-lg mb-10">
          Join thousands finding their gym in Cyprus
        </p>
        <div className={`grid gap-8 text-center ${cityCount > 0 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
          {stats.map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="bg-surface-card/80 backdrop-blur-sm rounded-card p-6 border border-surface-lighter/20 hover:border-primary-blue/30 transition-colors">
              {Icon ? <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} aria-hidden /> : <span className="block w-8 h-8 mx-auto mb-3" aria-hidden />}
              <div className={`text-4xl md:text-5xl font-bold ${color} mb-1`}>{value}</div>
              <div className="text-text-light text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
