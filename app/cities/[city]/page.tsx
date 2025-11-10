import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MapPin, Star } from 'lucide-react';
import { getCityBySlug, getGymsByCity, cities } from '@/lib/data';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { GymCard } from '@/components/gym/GymCard';
import { Badge } from '@/components/shared/Badge';
import { CityMap } from '@/components/city/CityMapWrapper';
import { CityPageClient } from './CityPageClient';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/utils/schema';

interface CityPageProps {
  params: {
    city: string;
  };
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  
  if (!city) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `Best Gyms in ${city.name}, Cyprus | ${city.gymCount} Gyms Listed`,
    description: city.description,
    keywords: `gyms ${city.name}, fitness centers ${city.name}, ${city.name} gyms, cyprus gyms`,
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = getCityBySlug(params.city);
  
  if (!city) {
    notFound();
  }

  const gyms = getGymsByCity(city.id);
  const featuredGyms = gyms.filter(gym => gym.featured);

  // Generate Schema.org JSON-LD
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://gymnearme.cy' },
    { name: 'Cities', url: 'https://gymnearme.cy/cities' },
    { name: city.name, url: `https://gymnearme.cy/cities/${city.slug}` },
  ]);

  const collectionSchema = generateCollectionPageSchema(
    `Best Gyms in ${city.name}, Cyprus`,
    city.description,
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
            { label: 'Cities', href: '/cities' },
            { label: city.name, href: `/cities/${city.slug}` },
          ]}
        />

        {/* City Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-text-white">
              Best Gyms in {city.name}
            </h1>
            <MapPin className="w-8 h-8 text-primary-blue" />
          </div>
          <p className="text-xl text-text-light max-w-3xl mb-4">
            {city.description}
          </p>
          <div className="flex items-center gap-4 text-text-muted">
            <span className="text-lg font-semibold text-text-white">
              {city.gymCount} {city.gymCount === 1 ? 'Gym' : 'Gyms'} Listed
            </span>
            {featuredGyms.length > 0 && (
              <Badge variant="featured">
                {featuredGyms.length} Featured {featuredGyms.length === 1 ? 'Gym' : 'Gyms'}
              </Badge>
            )}
          </div>
        </div>

        {/* Map Section */}
        {gyms.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-white mb-6">Gym Locations</h2>
            <CityMap cityId={city.id} gyms={gyms} />
          </section>
        )}

        {/* Client Component for Filtering/Sorting */}
        <CityPageClient city={city} initialGyms={gyms} />
      </div>
    </div>
    </>
  );
}

