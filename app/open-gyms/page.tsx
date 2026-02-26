import React from 'react';
import type { Metadata } from 'next';
import { Clock, MapPin } from 'lucide-react';
import { getAllGyms } from '@/lib/data';
import { isGymOpenNow } from '@/lib/utils/opening-hours';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { GymCard } from '@/components/gym/GymCard';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/utils/schema';

// Enable revalidation so page updates frequently (since "open now" status changes)
export const revalidate = 300; // Revalidate every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const allGyms = await getAllGyms();
  const openGymsCount = allGyms.filter(gym => isGymOpenNow(gym.openingHours)).length;

  const title = `Open Gyms Today in Cyprus | Gyms Open Now Near Me`;
  const description = `Find open gyms near me in Cyprus right now. ${openGymsCount}+ gyms are open today. See real-time gym status, hours, and location. 24/7 gyms and open gyms available.`;
  const keywords = 'open gyms today, open gyms near me, gyms open now, 24 hour gym cyprus, gym hours cyprus, open gyms cyprus';

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.gymnearme.cy' },
    { name: 'Open Gyms Today', url: 'https://www.gymnearme.cy/open-gyms' },
  ]);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: 'https://www.gymnearme.cy/open-gyms',
      siteName: 'Gym Near Me Cyprus',
      type: 'website',
      images: [
        {
          url: 'https://www.gymnearme.cy/logo.png',
          width: 1200,
          height: 630,
          alt: 'Open Gyms Today in Cyprus',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.gymnearme.cy/logo.png'],
    },
    alternates: {
      canonical: 'https://www.gymnearme.cy/open-gyms',
    },
    other: {
      'article:published_time': new Date().toISOString(),
    },
  };
}

export default async function OpenGymsPage() {
  const allGyms = await getAllGyms();

  // Filter gyms that are open now or 24/7
  const openGyms = allGyms.filter(gym => isGymOpenNow(gym.openingHours));

  // Sort by rating (most relevant open gyms first)
  const sortedOpenGyms = openGyms.sort((a, b) => b.rating - a.rating);

  const openGymsCount = sortedOpenGyms.length;
  const currentHour = new Date().getHours();
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 18 ? 'afternoon' : 'evening';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Open Gyms Today', href: '/open-gyms', active: true },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-green-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Open Gyms Today
              </h1>
            </div>

            <p className="text-xl text-gray-600 mb-6">
              {openGymsCount} gyms are open right now in Cyprus. Find a gym near you that's accepting members.
            </p>

            {/* Info Box */}
            <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Real-Time Status</h3>
                  <p className="text-gray-700 text-sm">
                    This page shows {openGymsCount}+ gyms that are currently open in Cyprus for {timeOfDay} workouts. 
                    Hours are updated regularly. Find your perfect gym now, or browse by city for more options.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-3xl font-bold text-green-600">{openGymsCount}</div>
                <p className="text-gray-600 text-sm mt-1">Gyms Open Now</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-3xl font-bold text-blue-600">{allGyms.length}</div>
                <p className="text-gray-600 text-sm mt-1">Total Gyms in Cyprus</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-3xl font-bold text-orange-600">
                  {allGyms.filter(g => g.openingHours.monday?.toLowerCase().includes('24/7')).length}
                </div>
                <p className="text-gray-600 text-sm mt-1">24/7 Gyms Available</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Looking for something specific?</h3>
              <p className="text-gray-700 text-sm mb-4">
                Browse gyms by city or specialty to find the perfect fitness center for your needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/cities/limassol"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-300 hover:bg-blue-50 font-medium text-sm transition"
                >
                  Gyms in Limassol
                </a>
                <a
                  href="/cities/nicosia"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-300 hover:bg-blue-50 font-medium text-sm transition"
                >
                  Gyms in Nicosia
                </a>
                <a
                  href="/cities/paphos"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-300 hover:bg-blue-50 font-medium text-sm transition"
                >
                  Gyms in Paphos
                </a>
              </div>
            </div>
          </div>

          {/* Gym Cards Grid */}
          {sortedOpenGyms.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {openGymsCount} Open Gyms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedOpenGyms.map((gym) => (
                  <GymCard key={gym.id} gym={gym} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Gyms Open Right Now</h3>
              <p className="text-gray-600 mb-6">
                Check back later or browse all {allGyms.length} gyms by city to see their hours.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
              >
                Browse All Gyms
              </a>
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How often is this page updated?</h3>
                <p className="text-gray-700 text-sm">
                  This page updates every 5 minutes to reflect the most current gym status. Gym hours are sourced from verified directory data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I filter by specialty?</h3>
                <p className="text-gray-700 text-sm">
                  Yes! Browse our specialty pages for yoga, CrossFit, boxing, and more. This page shows all open gyms regardless of specialty.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What about 24/7 gyms?</h3>
                <p className="text-gray-700 text-sm">
                  24/7 gyms are included on this page. They appear for all searches since they're always open.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do I need to book in advance?</h3>
                <p className="text-gray-700 text-sm">
                  Most gyms accept walk-ins during posted hours. Click the gym card to find contact details and confirm availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
