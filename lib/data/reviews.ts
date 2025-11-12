import { Review } from '@/lib/types';

// Reviews for test-imported gyms
// Currently empty - reviews will be added from database or user submissions
export const reviews: Review[] = [
  // Reviews will be loaded from database or added here as needed
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
