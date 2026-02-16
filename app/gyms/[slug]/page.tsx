import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { MapPin, Phone, Globe, Mail, Clock, DollarSign, Facebook, Instagram } from 'lucide-react';
import { getGymBySlug, getCityById, getTopReviews, getGymsByCity, getAllGyms, getReviewsByGymId, getGymsBySpecialtyAndCity } from '@/lib/data';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Rating } from '@/components/shared/Rating';
import { Badge } from '@/components/shared/Badge';
import { GymCard } from '@/components/gym/GymCard';
import { Button } from '@/components/shared/Button';
import { GymMapWithToggle } from '@/components/gym/GymMapWithToggle';
import { GymOwnerBanner } from '@/components/gym/GymOwnerBanner';
import { getCurrentUserId } from '@/lib/supabase/server';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/utils/schema';
import { isGymOpenNow } from '@/lib/utils/opening-hours';
import { shouldAppendCityName, formatGymNameWithCity } from '@/lib/utils/gym-name';
import { sortSpecialties, sortAmenities } from '@/lib/utils/sort-specialties-amenities';
import { generateGymMetaDescription } from '@/lib/utils/meta-descriptions';
import { getPrimarySpecialty, formatSpecialtyHeading, getSpecialtySlug } from '@/lib/utils/specialty-heading';

interface GymPageProps {
  params: {
    slug: string;
  };
}

// Enable revalidation so pages update when data changes (e.g., when website is added)
export const revalidate = 0; // 0 = always revalidate, or use a number for seconds

// Force dynamic rendering to prevent static caching
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const gyms = await getAllGyms();
  return gyms.map((gym) => ({
    slug: gym.slug,
  }));
}

export async function generateMetadata({ params }: GymPageProps): Promise<Metadata> {
  const gym = await getGymBySlug(params.slug);
  
  if (!gym) {
    return {
      title: 'Gym Not Found',
    };
  }

  const city = getCityById(gym.cityId);
  const firstImage =
    gym.featuredImages?.[0] ?? (gym.images?.length ? gym.images[0] : null);
  const ogImage = firstImage
    ? (firstImage.startsWith('http') ? firstImage : `https://gymnearme.cy${firstImage}`)
    : 'https://gymnearme.cy/logo.png';

  const cityName = city?.name || 'Cyprus';
  const seoTitle = shouldAppendCityName(gym.name, cityName) 
    ? `${gym.name} ${cityName}` 
    : gym.name;

  // Generate optimized meta description using centralized utility
  const metaDescription = generateGymMetaDescription(gym, city ?? null);

  return {
    title: seoTitle,
    description: metaDescription,
    keywords: `${gym.name}, ${cityName} gym, ${gym.specialties.join(', ')}, fitness center ${cityName}`,
    openGraph: {
      title: seoTitle,
      description: metaDescription,
      url: `https://gymnearme.cy/gyms/${gym.slug}`,
      siteName: 'Gym Near Me Cyprus',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: gym.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export default async function GymPage({ params }: GymPageProps) {
  // Decode URL-encoded slug (handles Greek characters and special characters)
  const decodedSlug = decodeURIComponent(params.slug);
  
  // Handle redirects for old slugs
  const oldSlug = 'lumpinee-gym-muay-thai-muay-boran-personal-training-fighting-club-limassol-cyprus-limassol';
  if (decodedSlug === oldSlug) {
    permanentRedirect('/gyms/lumpinee-gym-muay-thai-muay-boran-personal-training-fighting-club-limassol-cyprus');
  }
  
  // Handle redirect for New Life Health Centre old slugs
  if (decodedSlug === 'new-life-health-centre-nicosia-gym-nicosia' || decodedSlug === 'new-life-health-centre-nicosia-gym') {
    permanentRedirect('/gyms/new-life-health-centre-nicosia');
  }
  
  // Handle redirect for University Of Nicosia - Ufit Fitness Centre old slug
  if (decodedSlug === 'university-of-nicosia-ufit-fitness-centre-nicosia') {
    permanentRedirect('/gyms/university-of-nicosia-ufit-fitness-centre');
  }
  
  // Handle redirects for Greek character slugs (transliterated to Latin)
  // Only redirect if it's the exact old Greek character slug, not the new transliterated one
  if (decodedSlug === 'φόρμα-fitness-studio-nicosia' || decodedSlug === '%CF%86%CF%8C%CF%81%CE%BC%CE%B1-fitness-studio-nicosia') {
    permanentRedirect('/gyms/forma-fitness-studio-nicosia');
  }
  // Only redirect exact old Greek slug, not the new transliterated version
  if (decodedSlug === 'μολων-λαβε-gym-nicosia') {
    permanentRedirect('/gyms/molon-labe-gym-nicosia');
  }
  
  // Handle redirect for Gymland Ματσαγγίδης Larnaca old slug (Greek characters)
  if (decodedSlug === 'gymland-ματσαγγίδης-larnaca' || params.slug === 'gymland-%CE%BC%CE%B1%CF%84%CF%83%CE%B1%CE%B3%CE%B3%CE%AF%CE%B4%CE%B7%CF%82-larnaca') {
    permanentRedirect('/gyms/gymland-matsaggides-larnaca');
  }
  
  // Handle redirect for Paphos Professional Boxing Gym old slug
  if (decodedSlug === 'paphos-professional-boxing-gym-paphos') {
    permanentRedirect('/gyms/paphos-professional-boxing-gym');
  }
  
  // Handle redirect for Paphos Thai Boxing & MMA Fight Club | Old Style Muay Thai old slug
  if (decodedSlug === 'paphos-thai-boxing-mma-fight-club-old-style-muay-thai-paphos') {
    permanentRedirect('/gyms/paphos-thai-boxing-mma-fight-club-old-style-muay-thai');
  }
  
  // Handle redirect for Personal Trainer - Paphos Kissonerga & Peyia old slug
  if (decodedSlug === 'personal-trainer-paphos-kissonerga-peyia-paphos') {
    permanentRedirect('/gyms/personal-trainer-paphos-kissonerga-peyia');
  }

  // Handle redirect for Fiit Paphos Training Room old slug
  if (decodedSlug === 'fiit-paphos-training-room-paphos') {
    permanentRedirect('/gyms/fiit-paphos-training-room');
  }

  // Handle redirect for Star Fitness Gym Paphos Cyprus old slug
  if (decodedSlug === 'star-fitness-gym-paphos-cyprus-paphos') {
    permanentRedirect('/gyms/star-fitness-gym-paphos-cyprus');
  }

  // Handle redirect for Aesthetics Fitness Club Paphos old slug
  if (decodedSlug === 'aesthetics-fitness-club-paphos') {
    permanentRedirect('/gyms/aesthetics-fitness-club-arc-paphos');
  }

  // Handle redirect for 5 Rounds MMA Limassol old slug (duplicate limassol removed)
  if (decodedSlug === '5-rounds-mma-limassol-limassol') {
    permanentRedirect('/gyms/5-rounds-mma-limassol');
  }

  // Handle redirect for Soulution Pilates & more Paphos old slug
  if (decodedSlug === 'soulutionpilatesmore-paphos') {
    permanentRedirect('/gyms/soulution-pilates-more-paphos');
  }

  // Handle redirect for Cyprus Top Team CTT Larnaca old slug
  if (decodedSlug === 'cyprus-top-team-cttmma-kickboxing-muaythaibjj-fitness-gym-larnaca') {
    permanentRedirect('/gyms/cyprus-top-team-ctt-larnaca');
  }

  // Handle redirect for RACK GYM Larnaca old slug
  if (decodedSlug === 'rack-gym-ltd-larnaca') {
    permanentRedirect('/gyms/rack-gym-larnaca');
  }

  // Handle redirect for Functional Training + Yoga Boutique by The Big Gym Larnaca old slug
  if (decodedSlug === 'the-big-gym-of-functional-training-and-yoga-larnaca') {
    permanentRedirect('/gyms/functional-training-yoga-boutique-by-the-big-gym-larnaca');
  }

  // Handle redirects for all Protaras -> Paralimni gym slugs
  if (decodedSlug === 'bodyart-fitness-center-protaras') {
    permanentRedirect('/gyms/bodyart-fitness-center-paralimni');
  }
  if (decodedSlug === 'body-shape-gym-protaras') {
    permanentRedirect('/gyms/body-shape-gym-paralimni');
  }
  if (decodedSlug === 'calisthenicsworkout4allcy-protaras') {
    permanentRedirect('/gyms/calisthenicsworkout4allcy-paralimni');
  }
  if (decodedSlug === 'demari-wellness-and-spa-protaras') {
    permanentRedirect('/gyms/demari-wellness-and-spa-paralimni');
  }
  if (decodedSlug === 'mythical-performance-protaras') {
    permanentRedirect('/gyms/mythical-performance-paralimni');
  }
  if (decodedSlug === 'sacred-roots-yoga-massage-protaras') {
    permanentRedirect('/gyms/sacred-roots-yoga-massage-paralimni');
  }

  const gym = await getGymBySlug(decodedSlug);
  
  if (!gym) {
    notFound();
  }

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('[GymPage] Opening hours for', gym.name, ':', gym.openingHours);
  }

  const city = getCityById(gym.cityId);
  const currentUserId = await getCurrentUserId();
  const reviews = getTopReviews(gym.id, 5);
  const allReviews = getReviewsByGymId(gym.id);

  // Get related gyms by specialty and city
  const primarySpecialty = getPrimarySpecialty(gym.specialties);
  const specialtySlug = getSpecialtySlug(primarySpecialty);
  const relatedGyms = (await getGymsBySpecialtyAndCity(specialtySlug, gym.cityId))
    .filter(g => g.id !== gym.id)
    .slice(0, 3);
  
  // Fallback to city gyms if no specialty matches found
  const cityGyms = relatedGyms.length > 0 
    ? relatedGyms 
    : (await getGymsByCity(gym.cityId)).filter(g => g.id !== gym.id).slice(0, 3);
  
  // Format the heading
  const relatedGymsHeading = relatedGyms.length > 0
    ? formatSpecialtyHeading(primarySpecialty, city?.name || 'Cyprus')
    : `Other Gyms in ${city?.name || 'Cyprus'}`;

  // Photos to show on the listing: owner-uploaded (featuredImages) take priority, then legacy images
  const displayImages =
    gym.featuredImages && gym.featuredImages.length > 0
      ? gym.featuredImages
      : gym.images || [];

  // Generate Schema.org JSON-LD
  const localBusinessSchema = generateLocalBusinessSchema(gym, city?.name || 'Cyprus', allReviews);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://gymnearme.cy' },
    { name: 'Cities', url: 'https://gymnearme.cy/cities' },
    ...(city ? [{ name: city.name, url: `https://gymnearme.cy/cities/${city.slug}` }] : []),
    { name: gym.slug === 'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj-ayia-napa' ? 'BAD DOG BJJ | Brazilian Jiu-Jitsu Training Club | NICKBJJ' : gym.slug === 'cyprus-top-team-ctt-larnaca' ? 'Cyprus Top Team CTT' : gym.slug === 'foxteam-taekwondo-larnaca' ? 'FoxTeam Taekwondo' : gym.slug === 'rack-gym-larnaca' ? 'RACK GYM' : gym.slug === 'elit3-fitness-nutrition-larnaca' ? 'ELIT3 Fitness & Nutrition' : gym.slug === 'twp-train-with-passion-larnaca' ? 'TWP-Train With Passion' : gym.slug === 'its-time-fitness-center-larnaca' ? "It's Time Fitness Center" : gym.slug === 'fivestar-sportcenter-larnaca' ? 'FiveStar SportCenter' : gym.slug === 'getfitgym-elite-larnaca' ? 'GetFitGym Elite' : gym.slug === 'profit-center-larnaca' ? 'Pro.fit Center' : gym.slug === 'world-gym-ayia-napa' ? 'World Gym' : gym.name, url: `https://gymnearme.cy/gyms/${gym.slug}` },
  ]);

  // Always show all 7 days - use "Closed" if no hours specified
  const openingHours = [
    { day: 'Monday', hours: gym.openingHours.monday || 'Closed' },
    { day: 'Tuesday', hours: gym.openingHours.tuesday || 'Closed' },
    { day: 'Wednesday', hours: gym.openingHours.wednesday || 'Closed' },
    { day: 'Thursday', hours: gym.openingHours.thursday || 'Closed' },
    { day: 'Friday', hours: gym.openingHours.friday || 'Closed' },
    { day: 'Saturday', hours: gym.openingHours.saturday || 'Closed' },
    { day: 'Sunday', hours: gym.openingHours.sunday || 'Closed' },
  ];
  // Determine current weekday in Cyprus time to highlight in UI
  const currentWeekday = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone: 'Europe/Athens', // Cyprus time
  }).format(new Date());
  
  // Check if all days are "Closed" - if so, show "Contact for opening hour details"
  const allDaysClosed = openingHours.every(item => 
    !item.hours || 
    item.hours.toLowerCase() === 'closed' || 
    item.hours.toLowerCase() === 'no sessions' ||
    item.hours.trim() === ''
  );
  
  // Check if there are valid opening hours (not all "Closed")
  const hasValidOpeningHours = !allDaysClosed;
  
  // Check if all days are "Contact for opening hour details" (don't show Open/Closed badge)
  const isContactForDetails = openingHours.every(item => 
    item.hours && 
    item.hours.toLowerCase().includes('contact for opening hour details')
  );
  
  // Check if website is a Facebook URL
  const isFacebookUrl = gym.website && (
    gym.website.includes('facebook.com') || 
    gym.website.includes('fb.com')
  );
  
  // Check if website is an Instagram URL
  const isInstagramUrl = gym.website && (
    gym.website.includes('instagram.com') || 
    gym.website.includes('instagr.am')
  );

  // Get social media links (prioritize socialMedia object, fallback to website field)
  const websiteUrl = gym.socialMedia?.website || (gym.website && !isFacebookUrl && !isInstagramUrl ? gym.website : undefined);
  const instagramUrl = gym.socialMedia?.instagram || (isInstagramUrl ? gym.website : undefined);
  const facebookUrl = gym.socialMedia?.facebook || (isFacebookUrl ? gym.website : undefined);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Cities', href: '/cities' },
            ...(city ? [{ label: city.name, href: `/cities/${city.slug}` }] : []),
            { label: gym.slug === 'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj-ayia-napa' ? 'BAD DOG BJJ | Brazilian Jiu-Jitsu Training Club | NICKBJJ' : gym.slug === 'cyprus-top-team-ctt-larnaca' ? 'Cyprus Top Team CTT' : gym.slug === 'foxteam-taekwondo-larnaca' ? 'FoxTeam Taekwondo' : gym.slug === 'rack-gym-larnaca' ? 'RACK GYM' : gym.slug === 'elit3-fitness-nutrition-larnaca' ? 'ELIT3 Fitness & Nutrition' : gym.slug === 'twp-train-with-passion-larnaca' ? 'TWP-Train With Passion' : gym.slug === 'its-time-fitness-center-larnaca' ? "It's Time Fitness Center" : gym.slug === 'fivestar-sportcenter-larnaca' ? 'FiveStar SportCenter' : gym.slug === 'getfitgym-elite-larnaca' ? 'GetFitGym Elite' : gym.slug === 'profit-center-larnaca' ? 'Pro.fit Center' : gym.slug === 'world-gym-ayia-napa' ? 'World Gym' : gym.name, href: `/gyms/${gym.slug}` },
          ]}
        />

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold text-text-white">
                  {formatGymNameWithCity(gym.name, city?.name)}
                </h1>
                {gym.featured && <Badge variant="featured">Featured</Badge>}
              </div>
              {city && (
                <div className="flex items-center text-text-muted mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{city.name}, Cyprus</span>
                </div>
              )}
              <Rating rating={gym.rating} reviewCount={gym.reviewCount} size="lg" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-6">
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                </Button>
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                </Button>
              </a>
            )}
            {websiteUrl && (
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </Button>
              </a>
            )}
            {gym.phone && (
              <a href={`tel:${gym.phone}`}>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </a>
            )}
            {gym.coordinates[0] !== 0 && gym.coordinates[1] !== 0 && (
              <a
                href={`https://www.openstreetmap.org/?mlat=${gym.coordinates[0]}&mlon=${gym.coordinates[1]}&zoom=15`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Directions
                </Button>
              </a>
            )}
          </div>

          {/* Owner / Claim banner: Your gym, Claim this gym, or Claimed by other */}
          <GymOwnerBanner gym={gym} currentUserId={currentUserId} />
        </div>

        {/* Image Gallery: owner-uploaded photos (featuredImages) or legacy images */}
        {displayImages.length > 0 && (
          <section className="mb-12" aria-label="Gym photos">
            <h2 className="sr-only">Photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayImages.slice(0, 6).map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] bg-surface-card rounded-card overflow-hidden"
                >
                  <img
                    src={imageUrl}
                    alt={`${gym.name} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-surface-card rounded-card p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-white mb-8">About</h2>
              <p className="text-[#E0E0E0] text-base sm:text-lg leading-[1.9] sm:leading-[2] tracking-[0.02em] mb-6 sm:mb-8">{gym.description}</p>
            </section>

            {/* Specialties & Amenities */}
            <section className="bg-surface-card rounded-card p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-white mb-8">Specialties</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {sortSpecialties(gym.specialties).map((specialty) => (
                  <Badge key={specialty} variant="specialty">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-white mb-8">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sortAmenities(gym.amenities).map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center text-text-light text-sm"
                  >
                    <span className="w-2 h-2 bg-primary-blue rounded-full mr-2" />
                    {amenity}
                  </div>
                ))}
              </div>
            </section>

            {/* Opening Hours - Always show, display "Contact for opening hour details" if all days are Closed */}
              <section className="bg-surface-card rounded-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-white flex items-center gap-2">
                    <Clock className="w-6 h-6" />
                    Opening Hours
                  </h2>
                {/* Open/Closed Status Badge - Only show if not "Contact for opening hour details" and not all days closed */}
                {!allDaysClosed && !isContactForDetails && (() => {
                    const isOpen = isGymOpenNow(gym.openingHours);
                    return (
                      <Badge 
                        variant={isOpen ? "rating" : "specialty"}
                        className={`px-4 py-2 ${
                          isOpen 
                            ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                            : 'bg-red-500/20 text-red-400 border-red-500/50'
                        }`}
                      >
                        {isOpen ? '🟢 Open Now' : '🔴 Closed'}
                      </Badge>
                    );
                  })()}
                </div>
              {allDaysClosed ? (
                <>
                  <p className="text-text-muted">Contact for opening hours details</p>
                  {/* Add schedule link for BAD DOG BJJ when all days are closed */}
                  {gym.slug === 'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj-ayia-napa' && (
                    <div className="mt-4 pt-4 border-t border-surface-lighter">
                      <p className="text-text-muted text-sm mb-2">
                        For the most up-to-date class schedule:
                      </p>
                      <a
                        href="https://www.baddogbjj.com/classschedule"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-blue hover:text-primary-blue-light underline text-sm font-medium"
                      >
                        View Current Class Schedule
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <>
                <div className="space-y-3">
                  {openingHours.map(({ day, hours }) => {
                      const isToday = day.toLowerCase() === currentWeekday.toLowerCase();
                    // Check if hours contain newlines (complex format with sessions)
                    const isComplexFormat = hours && hours.includes('\n');
                    
                    return (
                      <div
                        key={day}
                          className={`py-2 border-b border-surface-lighter last:border-0 px-3 -mx-3 rounded-md ${
                            isToday ? 'bg-primary-blue/10 border-primary-blue/30' : ''
                          }`}
                      >
                        <div className="flex items-start gap-4">
                            <span
                              className={`text-text-light font-medium min-w-[100px] ${
                                isToday ? 'text-text-white font-semibold' : ''
                              }`}
                            >
                              {day}
                            </span>
                          <div className="flex-1">
                            {isComplexFormat ? (
                              // Complex format: render with line breaks and formatting
                              <div className="text-text-muted text-sm whitespace-pre-line">
                                {hours.split('\n').map((line, idx) => {
                                  // Check if line is a section header (ends with colon)
                                  if (line.endsWith(':')) {
                                    return (
                                      <div key={idx} className="font-semibold text-text-light mt-2 first:mt-0">
                                        {line}
                                      </div>
                                    );
                                  }
                                  // Check if line is a bullet point
                                  if (line.trim().startsWith('•')) {
                                    return (
                                      <div key={idx} className="ml-4 text-text-muted">
                                        {line}
                                      </div>
                                    );
                                  }
                                  // Regular line
                                  return (
                                    <div key={idx} className="text-text-muted">
                                      {line}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              // Simple format: single line - normalize "No sessions" to "Closed"
                                <span className={`text-text-muted ${isToday ? 'text-text-white font-semibold' : ''}`}>
                                {hours && hours.toLowerCase() !== 'no sessions' 
                                  ? hours 
                                  : 'Closed'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Add schedule link for BAD DOG BJJ */}
                {gym.slug === 'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj-ayia-napa' && (
                  <div className="mt-4 pt-4 border-t border-surface-lighter">
                    <p className="text-text-muted text-sm mb-2">
                      Schedule may vary. For the most up-to-date class schedule:
                    </p>
                    <a
                      href="https://www.baddogbjj.com/classschedule"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-blue hover:text-primary-blue-light underline text-sm font-medium inline-flex items-center gap-1"
                    >
                      View Current Class Schedule
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>
                )}
                </>
              )}
              </section>

            {/* Pricing Section - Hidden for Calisthenics Area Nicosia, Outdoor Calisthenics Workout Spot, and Municipality Gym */}
            {gym.slug !== 'calisthenics-area-nicosia' && gym.slug !== 'outdoor-calisthenics-workout-spot-larnaca' && gym.slug !== 'municipality-gym-paphos' && (
            <section className="bg-surface-card rounded-card p-6">
              <h2 className="text-2xl font-bold text-text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Pricing
              </h2>
              {gym.pricing && Object.keys(gym.pricing).length > 0 ? (
                <div className="space-y-3">
                    {/* Plans list */}
                    <div className="space-y-2">
                      {Array.isArray((gym.pricing as any)?.plans) ? (
                        // New format: plans array - concise display
                        ((gym.pricing as any).plans as Array<{
                          name: string;
                          price: number;
                          currency: string;
                          validity?: string;
                        }>).map((plan, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-surface-lighter last:border-0"
                          >
                            <span className="text-text-light font-medium">
                              {plan.name}
                              {plan.validity && (
                                <span className="text-text-muted text-sm ml-2">
                                  ({plan.validity})
                                </span>
                              )}
                            </span>
                            <span className="text-text-white font-semibold">
                              {plan.currency === 'EUR' ? '€' : plan.currency || '€'}
                              {plan.price}
                            </span>
                          </div>
                        ))
                      ) : (
                        // Old format: flat object with key-value pairs
                        Object.entries(gym.pricing).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-2 border-b border-surface-lighter last:border-0"
                    >
                      <span className="text-text-light font-medium">{key}</span>
                            <span className="text-text-white font-semibold">
                              {typeof value === 'string' ? value : String(value)}
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Notes / links */}
                    {Array.isArray((gym.pricing as any)?.notes) && (gym.pricing as any).notes.length > 0 && (
                      <div className="pt-2 space-y-1 text-sm text-text-muted">
                        {(gym.pricing as any).notes.map((note: string, idx: number) => {
                          // Skip specific URL for Muscle Factory 24 Hours Limassol,
                          // since we show a nicer dedicated link below
                          if (note === 'https://www.musclefactory24hrs.com/plans') {
                            return null;
                          }

                          const isLink = note.startsWith('http');
                          return (
                            <div key={idx}>
                              {isLink ? (
                                <a
                                  href={note}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-blue hover:underline"
                                >
                                  {note}
                                </a>
                              ) : (
                                <span>{note}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Gym-specific external pricing page links */}
                    {(gym.slug === 'destination-fitness' || gym.slug === 'destination-fitness-nicosia') && (
                      <div className="pt-4 text-sm">
                        <a
                          href="https://www.destinationfitnesscy.com/subscriptions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-blue hover:underline font-medium"
                        >
                          View full membership options on Destination Fitness →
                        </a>
                      </div>
                    )}

                    {gym.slug === 'muscle-factory-24-hours-limassol' && (
                      <div className="pt-2 text-sm">
                        <a
                          href="https://www.musclefactory24hrs.com/plans"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-blue hover:underline font-medium"
                        >
                          View full membership options on Muscle Factory 24 Hours→
                        </a>
                      </div>
                    )}

                    {gym.slug === 'personal-trainer-paphos-kissonerga-peyia' && (
                      <div className="pt-4 text-sm">
                        <a
                          href="https://www.paphos-training.com/packages-1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-blue hover:underline font-medium"
                        >
                          View full packages and pricing →
                        </a>
                    </div>
                    )}

                    {gym.slug === 'combat-fitness-limassol' && (
                      <div className="pt-4 text-sm">
                        <a
                          href="https://combatandfitness.com/#pricing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-blue hover:underline font-medium"
                        >
                          View full membership options on Combat & Fitness →
                        </a>
                      </div>
                    )}

                    {gym.slug === 'bareknuckle-crossfit-larnaca' && (
                      <div className="pt-4 text-sm">
                        <a
                          href="https://bareknucklecrossfit.com/pricing-memberships/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-blue hover:underline font-medium"
                        >
                          View full membership options on Bareknuckle Crossfit →
                        </a>
                      </div>
                    )}

                    {gym.slug === 'vital-strength-training-larnaca' && (
                      <div className="pt-4 text-sm">
                        <a
                          href="https://vitalstrength.fit/services"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-blue hover:underline font-medium"
                        >
                          View full services and packages on Vital Strength Training →
                        </a>
                      </div>
                    )}

                    {gym.slug === 'ironsky-fitness-group-personal-training-in-larnaca' && (
                      <div className="pt-4 text-sm">
                        <a
                          href="https://bio.site/ironsky.fitness"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-blue hover:underline font-medium"
                        >
                          View full pricing and membership options on IRONSKY Fitness →
                        </a>
                      </div>
                    )}
                </div>
              ) : (
                <p className="text-text-muted">Contact for pricing details</p>
              )}
            </section>
            )}

            {/* Top Reviews */}
            {reviews.length > 0 && (
              <section className="bg-surface-card rounded-card p-6">
                <h2 className="text-2xl font-bold text-text-white mb-4">
                  Top Reviews
                </h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-surface-lighter last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-text-white">
                              {review.reviewerName}
                            </span>
                            {review.verified && (
                              <Badge variant="rating" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <Rating rating={review.rating} showCount={false} size="sm" />
                        </div>
                        <span className="text-text-muted text-sm">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-text-light mt-2">{review.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-surface-lighter">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.name + ' ' + gym.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:underline text-sm font-medium"
                  >
                    View all reviews on Google Maps →
                  </a>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-blue mt-0.5 flex-shrink-0" />
                  <span className="text-text-light">{gym.address}</span>
                </div>
                {gym.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-blue flex-shrink-0" />
                    <a
                      href={`tel:${gym.phone}`}
                      className="text-text-light hover:text-primary-blue transition-colors"
                    >
                      {gym.phone}
                    </a>
                  </div>
                )}
                {gym.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-blue flex-shrink-0" />
                    <a
                      href={`mailto:${gym.email}`}
                      className="text-text-light hover:text-primary-blue transition-colors"
                    >
                      {gym.email}
                    </a>
                  </div>
                )}
                {websiteUrl && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary-blue flex-shrink-0" />
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-light hover:text-primary-blue transition-colors"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {facebookUrl && (
                  <div className="flex items-center gap-3">
                        <Facebook className="w-5 h-5 text-primary-blue flex-shrink-0" />
                        <a
                      href={facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-light hover:text-primary-blue transition-colors"
                        >
                          Visit Facebook
                        </a>
                  </div>
                )}
                {instagramUrl && (
                  <div className="flex items-center gap-3">
                        <Instagram className="w-5 h-5 text-primary-blue flex-shrink-0" />
                        <a
                      href={instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-light hover:text-primary-blue transition-colors"
                        >
                          Visit Instagram
                        </a>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            <GymMapWithToggle gym={gym} />

            {/* Related Gyms by Specialty */}
            {cityGyms.length > 0 && (
              <div className="bg-surface-card rounded-card p-6">
                <h3 className="text-xl font-bold text-text-white mb-4">
                  {relatedGymsHeading}
                </h3>
                <div className="space-y-4">
                  {cityGyms.map((relatedGym) => (
                    <GymCard key={relatedGym.id} gym={relatedGym} showCity={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

