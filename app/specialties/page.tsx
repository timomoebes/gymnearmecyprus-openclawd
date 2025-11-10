import React from 'react';
import Link from 'next/link';
import { specialties } from '@/lib/data';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export default function SpecialtiesPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Specialties', href: '/specialties' }]} />
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-white mb-4">
            All Fitness Specialties
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            Explore gyms by specialty. Find the perfect training style that matches your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty) => (
            <Link
              key={specialty.id}
              href={`/specialties/${specialty.slug}`}
              className="group bg-surface-card rounded-card p-8 text-center hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover"
            >
              <div className="text-4xl mb-4">💪</div>
              <h2 className="text-xl font-bold text-text-white mb-2 group-hover:text-primary-blue transition-colors">
                {specialty.name}
              </h2>
              <p className="text-text-muted text-sm mb-4 line-clamp-2">
                {specialty.description}
              </p>
              <div className="pt-4 border-t border-surface-lighter">
                <span className="text-text-light font-semibold">
                  {specialty.gymCount} {specialty.gymCount === 1 ? 'Gym' : 'Gyms'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

