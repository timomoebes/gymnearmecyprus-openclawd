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
import { generateBreadcrumbSchema, generateCollectionPageSchema, generateFAQPageSchema } from '@/lib/utils/schema';

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

  const cityNameLower = city.name.toLowerCase();
  const isLimassol = cityNameLower.includes('limassol');
  const isNicosia = cityNameLower.includes('nicosia');
  const isLarnaca = cityNameLower.includes('larnaca');
  const isPaphos = cityNameLower.includes('paphos');
  
  // Build keyword-rich title and description
  let title = `Best Gyms in ${city.name}, Cyprus | Find Gyms Near Me in ${city.name}`;
  let description = `Find the best gyms in ${city.name}. Search fitness centers, health clubs, and gyms near me in ${city.name}. Compare ratings, reviews, amenities, and find your perfect workout space.`;
  let keywords = `gym ${cityNameLower}, best gym ${cityNameLower}, gyms in ${cityNameLower}, fitness center ${cityNameLower}, gym near me ${cityNameLower}, ${cityNameLower} gyms, cyprus gyms`;
  
  // Add specific keywords for high-volume cities
  if (isLimassol) {
    title = `Best Gyms in Limassol | Find Gyms Near Me in Limassol, Cyprus | ${city.gymCount} Gyms`;
    keywords += ', best gym limassol, gym limassol';
  } else if (isNicosia) {
    title = `Best Gyms in Nicosia | Find Gyms Near Me in Nicosia, Cyprus | ${city.gymCount} Gyms`;
    keywords += ', best gyms in nicosia, gym nicosia, gym strovolos';
  } else if (isLarnaca) {
    title = `Best Gyms in Larnaca | Find Gyms Near Me in Larnaca, Cyprus | ${city.gymCount} Gyms`;
    keywords += ', gym larnaca';
  } else if (isPaphos) {
    title = `Best Gyms in Paphos | Find Gyms Near Me in Paphos, Cyprus | ${city.gymCount} Gyms`;
    keywords += ', gym paphos';
  }

  return {
    title,
    description,
    keywords,
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

  // City-specific FAQs
  const cityFaqs = [
    {
      question: `What are the best gyms in ${city.name}?`,
      answer: `Our directory lists ${city.gymCount} top-rated gyms and fitness centers in ${city.name}. You can filter by rating, specialty, amenities, and read reviews to find the best gym near me in ${city.name} that matches your fitness goals.`,
    },
    {
      question: `Are there 24-hour gyms in ${city.name}?`,
      answer: `Yes, several gyms in ${city.name} offer 24/7 access. Look for the "24/7 Access" amenity when browsing gym listings in ${city.name}. These facilities are perfect for early morning workouts or late-night training sessions.`,
    },
    {
      question: `How do I find a gym near me in ${city.name}?`,
      answer: `Use our directory to browse gyms in ${city.name}. You can filter by location, specialty, amenities, and ratings. Each listing includes the exact address, opening hours, and a map to help you find the closest gym near me in ${city.name}.`,
    },
    {
      question: `What types of fitness facilities are available in ${city.name}?`,
      answer: `${city.name} offers a variety of fitness options including bodybuilding gyms, CrossFit boxes, yoga studios, MMA facilities, and comprehensive health clubs. Browse our directory to find specialized training facilities that match your interests.`,
    },
  ];

  const faqSchema = generateFAQPageSchema(cityFaqs);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              Best Gyms in {city.name}, Cyprus
            </h1>
            <MapPin className="w-8 h-8 text-primary-blue" />
          </div>
          <p className="text-xl text-text-light max-w-3xl mb-4">
            Find the best gyms in {city.name}. Search fitness centers, health clubs, and gyms near me in {city.name}. Compare ratings, reviews, amenities, and find your perfect workout space. Our directory includes {city.gymCount} top-rated gyms and fitness centers in {city.name}.
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

