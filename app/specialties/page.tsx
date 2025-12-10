import React from 'react';
import Link from 'next/link';
import { specialties, HIDDEN_FOR_MVP, getAllGyms } from '@/lib/data';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

// Enable revalidation so page updates when gym counts change
export const revalidate = 0; // 0 = always revalidate, or use a number for seconds

export default async function SpecialtiesPage() {
  // Fetch all gyms to calculate dynamic specialty counts
  const allGyms = await getAllGyms();
  
  // Calculate actual specialty gym counts from fetched data
  const specialtyGymCounts = specialties.reduce((acc, specialty) => {
    acc[specialty.id] = allGyms.filter(gym => 
      gym.specialties.includes(specialty.name)
    ).length;
    return acc;
  }, {} as Record<string, number>);

  // Filter out specialties hidden for MVP
  const visibleSpecialties = specialties.filter(
    specialty => !HIDDEN_FOR_MVP.includes(specialty.slug)
  );
  // Assign emojis to new consolidated specialties (matching homepage)
  const specialtyEmojis: Record<string, string> = {
    'fitness-gym': '💪',
    'crossfit': '🔥',
    'personal-training': '👨‍🏫',
    'martial-arts-mma': '🥊',
    'boxing': '👊',
    'yoga-pilates': '🧘',
    'dance-group-fitness': '💃',
    'strength-training': '🏋️',
    'swimming-aquatics': '🏊',
  };

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
          {visibleSpecialties.map((specialty) => {
            const emoji = specialtyEmojis[specialty.id] || '💪';
            
            return (
              <Link
                key={specialty.id}
                href={`/specialties/${specialty.slug}`}
                className="group relative bg-surface-card rounded-card p-8 text-center hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover overflow-hidden"
              >
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-purple/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary-purple/20 transition-colors" />
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{emoji}</div>
                  <h2 className="text-xl font-bold text-text-white mb-2 group-hover:text-primary-blue transition-colors">
                    {specialty.name}
                  </h2>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2">
                    {specialty.description}
                  </p>
                  <div className="pt-4 border-t border-surface-lighter">
                    <span className="text-text-light font-semibold">
                      {specialtyGymCounts[specialty.id] || 0} {(specialtyGymCounts[specialty.id] || 0) === 1 ? 'Gym' : 'Gyms'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

