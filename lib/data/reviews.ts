import { Review } from '@/lib/types';

// Mock reviews - top reviews for each gym (Google Maps style)
export const reviews: Review[] = [
  // Powerhouse Gym Limassol reviews
  {
    id: 'rev-1',
    gymId: 'powerhouse-gym-limassol',
    source: 'google',
    reviewerName: 'Maria K.',
    rating: 5,
    text: 'Amazing facility with top-notch equipment! The trainers are professional and the atmosphere is motivating. Best gym in Limassol!',
    date: '2024-01-15',
    verified: true,
    helpful: 12,
  },
  {
    id: 'rev-2',
    gymId: 'powerhouse-gym-limassol',
    source: 'google',
    reviewerName: 'Andreas P.',
    rating: 5,
    text: '24/7 access is a game changer. Clean facilities, modern equipment, and friendly staff. Highly recommend!',
    date: '2024-01-10',
    verified: true,
    helpful: 8,
  },
  {
    id: 'rev-3',
    gymId: 'powerhouse-gym-limassol',
    source: 'google',
    reviewerName: 'Sophia L.',
    rating: 4,
    text: 'Great gym overall. Sometimes gets crowded during peak hours, but the equipment quality makes up for it.',
    date: '2024-01-05',
    verified: true,
    helpful: 5,
  },
  // Zen Yoga Studio Limassol reviews
  {
    id: 'rev-4',
    gymId: 'zen-yoga-studio-limassol',
    source: 'google',
    reviewerName: 'Elena M.',
    rating: 5,
    text: 'A peaceful haven in the city. The instructors are knowledgeable and the hot yoga classes are incredible. My stress melts away here.',
    date: '2024-01-18',
    verified: true,
    helpful: 15,
  },
  {
    id: 'rev-5',
    gymId: 'zen-yoga-studio-limassol',
    source: 'google',
    reviewerName: 'Christos D.',
    rating: 5,
    text: 'Best yoga studio in Limassol! The atmosphere is serene and the instructors really care about your practice. Love it!',
    date: '2024-01-12',
    verified: true,
    helpful: 10,
  },
  // Elite Fitness Nicosia reviews
  {
    id: 'rev-6',
    gymId: 'elite-fitness-nicosia',
    source: 'google',
    reviewerName: 'George T.',
    rating: 5,
    text: 'Competition-grade equipment and expert trainers. This is where serious lifters train. The community is amazing!',
    date: '2024-01-20',
    verified: true,
    helpful: 18,
  },
  {
    id: 'rev-7',
    gymId: 'elite-fitness-nicosia',
    source: 'google',
    reviewerName: 'Anna K.',
    rating: 5,
    text: 'Professional facility with everything you need. The personal trainers are top-notch and the nutrition counseling is a bonus!',
    date: '2024-01-14',
    verified: true,
    helpful: 11,
  },
  {
    id: 'rev-8',
    gymId: 'elite-fitness-nicosia',
    source: 'google',
    reviewerName: 'Michael R.',
    rating: 4,
    text: 'Great gym with excellent equipment. Can get busy, but the 24/7 access helps avoid crowds. Worth the membership!',
    date: '2024-01-08',
    verified: true,
    helpful: 7,
  },
  // BeachFit Paphos reviews
  {
    id: 'rev-9',
    gymId: 'beachfit-paphos',
    source: 'google',
    reviewerName: 'Sarah W.',
    rating: 5,
    text: 'Training with a sea view is unbeatable! The outdoor area is perfect and the CrossFit classes are challenging. Love this place!',
    date: '2024-01-16',
    verified: true,
    helpful: 9,
  },
  {
    id: 'rev-10',
    gymId: 'beachfit-paphos',
    source: 'google',
    reviewerName: 'David L.',
    rating: 4,
    text: 'Unique location and great atmosphere. The beach access is a huge plus. Equipment could be newer, but overall a solid gym.',
    date: '2024-01-11',
    verified: true,
    helpful: 6,
  },
  // Combat Zone Larnaca reviews
  {
    id: 'rev-11',
    gymId: 'combat-zone-larnaca',
    source: 'google',
    reviewerName: 'Alex M.',
    rating: 5,
    text: 'Best MMA gym in Cyprus! The coaches are experienced fighters and the training is intense. Perfect for serious martial artists.',
    date: '2024-01-19',
    verified: true,
    helpful: 14,
  },
  {
    id: 'rev-12',
    gymId: 'combat-zone-larnaca',
    source: 'google',
    reviewerName: 'Nikos S.',
    rating: 5,
    text: 'Professional training facility with excellent instruction. The BJJ classes are top-level and the sparring sessions are well-organized.',
    date: '2024-01-13',
    verified: true,
    helpful: 10,
  },
];

// Helper functions
export const getReviewsByGymId = (gymId: string): Review[] => {
  return reviews.filter(review => review.gymId === gymId);
};

export const getTopReviews = (gymId: string, limit: number = 5): Review[] => {
  const gymReviews = getReviewsByGymId(gymId);
  // Sort by rating (descending), then by date (descending), then by helpful votes
  return gymReviews
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (new Date(b.date).getTime() !== new Date(a.date).getTime()) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return (b.helpful || 0) - (a.helpful || 0);
    })
    .slice(0, limit);
};

export const getAverageRating = (gymId: string): number => {
  const gymReviews = getReviewsByGymId(gymId);
  if (gymReviews.length === 0) return 0;
  const sum = gymReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / gymReviews.length) * 10) / 10; // Round to 1 decimal
};

