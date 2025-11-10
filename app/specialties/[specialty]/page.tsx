import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSpecialtyBySlug, getGymsBySpecialty, specialties } from '@/lib/data';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { SpecialtyPageClient } from './SpecialtyPageClient';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/utils/schema';

interface SpecialtyPageProps {
  params: {
    specialty: string;
  };
}

export async function generateStaticParams() {
  return specialties.map((specialty) => ({
    specialty: specialty.slug,
  }));
}

export async function generateMetadata({ params }: SpecialtyPageProps): Promise<Metadata> {
  const specialty = getSpecialtyBySlug(params.specialty);
  
  if (!specialty) {
    return {
      title: 'Specialty Not Found',
    };
  }

  return {
    title: `Best ${specialty.name} Gyms in Cyprus | ${specialty.gymCount} Gyms Listed`,
    description: specialty.description,
    keywords: `${specialty.name} gyms cyprus, ${specialty.name} training, ${specialty.name} fitness centers`,
  };
}

export default function SpecialtyPage({ params }: SpecialtyPageProps) {
  const specialty = getSpecialtyBySlug(params.specialty);
  
  if (!specialty) {
    notFound();
  }

  const gyms = getGymsBySpecialty(specialty.name);

  // Generate Schema.org JSON-LD
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://gymnearme.cy' },
    { name: 'Specialties', url: 'https://gymnearme.cy/specialties' },
    { name: specialty.name, url: `https://gymnearme.cy/specialties/${specialty.slug}` },
  ]);

  const collectionSchema = generateCollectionPageSchema(
    `Best ${specialty.name} Gyms in Cyprus`,
    specialty.description,
    gyms.map(gym => ({
      name: gym.name,
      url: `https://gymnearme.cy/gyms/${gym.slug}`,
    }))
  );

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Specialties', href: '/specialties' },
            { label: specialty.name, href: `/specialties/${specialty.slug}` },
          ]}
        />

        {/* Specialty Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-5xl">💪</div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-white">
              Best {specialty.name} Gyms in Cyprus
            </h1>
          </div>
          <p className="text-xl text-text-light max-w-3xl mb-4">
            {specialty.description}
          </p>
          <div className="text-text-muted">
            <span className="text-lg font-semibold text-text-white">
              {specialty.gymCount} {specialty.gymCount === 1 ? 'Gym' : 'Gyms'} Found
            </span>
          </div>
        </div>

        {/* Client Component for Filtering/Sorting */}
        <SpecialtyPageClient specialty={specialty} initialGyms={gyms} />
      </div>
    </div>
    </>
  );
}

