import { Gym, City, Review } from '@/lib/types';

export function generateLocalBusinessSchema(gym: Gym, cityName: string, reviews: Review[]) {
  // Helper: clean specialty names (remove "Training" suffix duplication)
  const cleanSpecialtyName = (specialty: string) => {
    return specialty.replace(/ Training$/, '').trim();
  };

  // Helper: parse opening hours (handles simple "HH:MM - HH:MM" format, skips complex multi-session)
  const parseOpeningHours = (day: string, hours: string) => {
    if (!hours || hours === 'Closed' || hours.includes('\n') || hours.includes(',')) return null;
    const match = hours.match(/^(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})$/);
    if (!match) return null;
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      opens: match[1],
      closes: match[2],
    };
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation', // More specific than LocalBusiness for gyms
    '@id': `https://gymnearme.cy/gyms/${gym.slug}`,
    name: gym.name,
    // Fallback to logo if no images available
    image: gym.images.length > 0 
      ? gym.images.map(img => `https://gymnearme.cy${img}`) 
      : ['https://gymnearme.cy/logo.png'],
    description: gym.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: gym.address,
      addressLocality: cityName,
      addressCountry: 'CY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: gym.coordinates[0],
      longitude: gym.coordinates[1],
    },
    // Add Google Maps link for better local SEO
    hasMap: gym.coordinates[0] !== 0 && gym.coordinates[1] !== 0 
      ? `https://www.google.com/maps?q=${gym.coordinates[0]},${gym.coordinates[1]}`
      : undefined,
    url: `https://gymnearme.cy/gyms/${gym.slug}`,
    // Only include telephone/email if they exist (avoid null values)
    ...(gym.phone ? { telephone: gym.phone } : {}),
    ...(gym.email ? { email: gym.email } : {}),
    priceRange: '$$',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    // Filter complex multi-session hours (only include simple HH:MM - HH:MM format)
    openingHoursSpecification: Object.entries(gym.openingHours)
      .map(([day, hours]) => parseOpeningHours(day, hours))
      .filter(Boolean),
    // Use gym.rating and gym.reviewCount from Google Maps data (Apify scraper)
    // Only show if rating exists and review count > 0
    ...(gym.rating && gym.reviewCount > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: gym.rating.toFixed(1),
        reviewCount: gym.reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
    } : {}),
    // NOTE: Individual reviews removed until Google Places API integration
    // Real reviews will be fetched via Google Places API and added here
    // Clean specialty names (remove "Training" suffix duplication)
    makesOffer: gym.specialties.map(specialty => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: cleanSpecialtyName(specialty),
        category: 'Fitness Service',
      },
    })),
    amenityFeature: gym.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Gym Near Me Cyprus',
    url: 'https://gymnearme.cy',
    logo: 'https://gymnearme.cy/logo.png',
    description: 'The #1 fitness directory for the best gyms across Cyprus.',
    sameAs: [
      // Add social media links when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'gymnearmecyprus@gmail.com',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gym Near Me Cyprus',
    url: 'https://gymnearme.cy',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://gymnearme.cy/cities?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateCollectionPageSchema(
  name: string,
  description: string,
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'LocalBusiness',
          name: item.name,
          url: item.url,
        },
      })),
    },
  };
}

export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

