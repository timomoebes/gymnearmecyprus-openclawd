'use client';

import React from 'react';

interface HomeTrustSectionProps {
  totalGyms: number;
  formattedAverageRating: string;
}

export function HomeTrustSection({ totalGyms, formattedAverageRating }: HomeTrustSectionProps) {
  return (
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
            <div className="text-4xl font-bold text-primary-purple mb-2">{formattedAverageRating}+</div>
            <div className="text-text-light">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
