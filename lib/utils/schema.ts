import { Gym, City, Review } from '@/lib/types';

export function generateLocalBusinessSchema(gym: Gym, cityName: string, reviews: Review[]) {
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : gym.rating;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://gymnearme.cy/gyms/${gym.slug}`,
    name: gym.name,
    image: gym.images.length > 0 ? gym.images.map(img => `https://gymnearme.cy${img}`) : [],
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
    url: `https://gymnearme.cy/gyms/${gym.slug}`,
    telephone: gym.phone,
    email: gym.email,
    priceRange: '$$',
    openingHoursSpecification: Object.entries(gym.openingHours)
      .filter(([_, hours]) => hours && hours !== 'Closed')
      .map(([day, hours]) => {
        const [open, close] = hours.split(' - ');
        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
          opens: open?.trim(),
          closes: close?.trim(),
        };
      }),
    aggregateRating: reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    review: reviews.slice(0, 5).map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.reviewerName,
      },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1',
      },
    })),
    makesOffer: gym.specialties.map(specialty => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `${specialty} Training`,
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
    description: 'Find the best gyms and fitness centers in Cyprus. Your ultimate fitness directory.',
    sameAs: [
      // Add social media links when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@gymnearme.cy',
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

