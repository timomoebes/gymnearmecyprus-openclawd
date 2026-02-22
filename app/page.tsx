import React from 'react';
import type { Metadata } from 'next';
import { cities, getAllGyms } from '@/lib/data';
import { specialties } from '@/lib/data';
import type { Gym } from '@/lib/types';
import { filterGymsBySpecialty } from '@/lib/utils/specialty-matcher';
import { HomeHero } from '@/components/home/HomeHero';
import { HeroTrustBar } from '@/components/home/HeroTrustBar';
import { CityCardGrid } from '@/components/home/CityCardGrid';
import { SpecialtyCardGrid } from '@/components/home/SpecialtyCardGrid';
import { HomePersonalTrainingSection } from '@/components/home/HomePersonalTrainingSection';
import { HomeBenefitsSection } from '@/components/home/HomeBenefitsSection';
import { HomeGuideSection } from '@/components/home/HomeGuideSection';
import { HomeTrustSection } from '@/components/home/HomeTrustSection';
import { FAQSection } from '@/components/home/FAQSection';
import { FAQ_DATA } from '@/lib/data/faq';
import { generateFAQPageSchema } from '@/lib/utils/schema';

/** Pick up to 3 Personal Training gyms for the homepage: prefer Ufit (Nicosia), then one per other city. */
function selectPersonalTrainingGymsForHome(ptGyms: Gym[]): Gym[] {
  const ufit = ptGyms.find(g => /ufit|university of nicosia.*fitness/i.test(g.name));
  const rest = ufit ? ptGyms.filter(g => g.id !== ufit.id) : ptGyms;
  const result: Gym[] = ufit ? [ufit] : [];
  const usedCities = new Set(result.map(g => g.cityId));
  for (const gym of rest) {
    if (result.length >= 3) break;
    if (usedCities.has(gym.cityId)) continue;
    usedCities.add(gym.cityId);
    result.push(gym);
  }
  return result;
}

// Enable revalidation so homepage updates when gym counts change
export const revalidate = 0; // 0 = always revalidate, or use a number for seconds

export async function generateMetadata(): Promise<Metadata> {
  const allGyms = await getAllGyms();
  const totalGyms = allGyms.length;
  
  const title = `Best Gyms in Cyprus — Compare ${totalGyms}+ Gyms by City & Style`;
  const description = `Free gym directory for Cyprus. Compare gyms, fitness centers, and 24/7 gyms—ratings, hours & amenities by city or specialty.`;

  return {
    title,
    description,
    keywords: 'gym cyprus, gym limassol, gym nicosia, gym larnaca, gym paphos, 24 hour gym cyprus',
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
  const personalTrainingGyms = filterGymsBySpecialty(allGyms, 'personal-training');
  const selectedPersonalTrainingGyms = selectPersonalTrainingGymsForHome(personalTrainingGyms);

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
      <HeroTrustBar totalGyms={totalGyms} formattedAverageRating={formattedAverageRating} cityCount={cities.length} />

      {/* City Cards Grid */}
      <CityCardGrid cities={cities} cityGymCounts={cityGymCounts} />

      {/* Specialties Grid */}
      <SpecialtyCardGrid
        specialties={specialties}
        specialtyGymCounts={specialtyGymCounts}
      />

      <HomePersonalTrainingSection personalTrainingGyms={selectedPersonalTrainingGyms} cities={cities} />

      <HomeBenefitsSection />

      <HomeGuideSection />

      <FAQSection />

      <HomeTrustSection totalGyms={totalGyms} formattedAverageRating={formattedAverageRating} cityCount={cities.length} />
    </div>
    </>
  );
}

