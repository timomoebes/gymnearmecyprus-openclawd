import React from 'react';
import type { Metadata } from 'next';
import { cities, getAllGyms } from '@/lib/data';
import { specialties } from '@/lib/data';
import { HomeHero } from '@/components/home/HomeHero';
import { HeroTrustBar } from '@/components/home/HeroTrustBar';
import { CityCardGrid } from '@/components/home/CityCardGrid';
import { SpecialtyCardGrid } from '@/components/home/SpecialtyCardGrid';
import { Home24HourSection } from '@/components/home/Home24HourSection';
import { HomeBenefitsSection } from '@/components/home/HomeBenefitsSection';
import { HomeGuideSection } from '@/components/home/HomeGuideSection';
import { HomeTrustSection } from '@/components/home/HomeTrustSection';
import { FAQSection } from '@/components/home/FAQSection';
import { FAQ_DATA } from '@/lib/data/faq';
import { generateFAQPageSchema } from '@/lib/utils/schema';

// Enable revalidation so homepage updates when gym counts change
export const revalidate = 0; // 0 = always revalidate, or use a number for seconds

export async function generateMetadata(): Promise<Metadata> {
  const allGyms = await getAllGyms();
  const totalGyms = allGyms.length;
  
  const title = `${totalGyms}+ Best Gyms in Cyprus | Find Top Fitness Centers & Health Clubs`;
  const description = `Find the best gyms in Cyprus. Compare ${totalGyms}+ verified fitness centers, health clubs, and 24-hour facilities. Ratings, reviews, and amenities included. Find your perfect workout space today.`;

  return {
    title,
    description,
    keywords: 'gym near me, fitness near me, gym close to me, nearby gym, fitness center, health club, fitness club, gym cyprus, 24 hour gym near me, 24 7 gym near me, gym limassol, gym nicosia, gym larnaca, gym paphos',
    openGraph: {
      title,
      description,
      url: 'https://gymnearme.cy',
      siteName: 'Gym Near Me Cyprus',
      images: [
        {
          url: 'https://gymnearme.cy/logo.png',
          width: 1200,
          height: 630,
          alt: 'Gym Near Me Cyprus - Find Gyms Near Me',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://gymnearme.cy/logo.png'],
    },
  };
}

export default async function HomePage() {
  const allGyms = await getAllGyms();
  const totalGyms = allGyms.length;
  const twentyFourHourGyms = allGyms.filter(gym => 
    gym.amenities.some(amenity => amenity.toLowerCase().includes('24') || amenity.toLowerCase().includes('24/7'))
  );

  // Calculate weighted average rating across all reviews
  const { totalReviews, weightedRatingSum } = allGyms.reduce(
    (acc, gym) => {
      const rating = gym.rating ?? 0;
      const reviewCount = gym.reviewCount ?? 0;

      return {
        totalReviews: acc.totalReviews + reviewCount,
        weightedRatingSum: acc.weightedRatingSum + rating * reviewCount,
      };
    },
    { totalReviews: 0, weightedRatingSum: 0 }
  );

  const averageRating =
    totalReviews > 0 ? weightedRatingSum / totalReviews : 0;
  const formattedAverageRating =
    averageRating > 0 ? averageRating.toFixed(1) : '4.5';

  // Calculate actual city gym counts from fetched data
  const cityGymCounts = cities.reduce((acc, city) => {
    acc[city.id] = allGyms.filter(gym => gym.cityId === city.id).length;
    return acc;
  }, {} as Record<string, number>);

  // Calculate actual specialty gym counts from fetched data
  const specialtyGymCounts = specialties.reduce((acc, specialty) => {
    acc[specialty.id] = allGyms.filter(gym => 
      gym.specialties.includes(specialty.name)
    ).length;
    return acc;
  }, {} as Record<string, number>);

  // FAQ data for schema
  const faqSchema = generateFAQPageSchema(FAQ_DATA);

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen">
      <HomeHero gyms={allGyms} cities={cities} />
      <HeroTrustBar totalGyms={totalGyms} formattedAverageRating={formattedAverageRating} />

      {/* City Cards Grid */}
      <CityCardGrid cities={cities} cityGymCounts={cityGymCounts} />

      {/* Specialties Grid */}
      <SpecialtyCardGrid
        specialties={specialties}
        specialtyGymCounts={specialtyGymCounts}
      />

      <Home24HourSection twentyFourHourGyms={twentyFourHourGyms} cities={cities} />

      <HomeBenefitsSection />

      <HomeGuideSection />

      <FAQSection />

      <HomeTrustSection totalGyms={totalGyms} formattedAverageRating={formattedAverageRating} />
    </div>
    </>
  );
}

