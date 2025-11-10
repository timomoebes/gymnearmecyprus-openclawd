import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number; // 0-5
  reviewCount?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewCount,
  showCount = true,
  size = 'md',
  className,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(sizes[size], 'fill-accent-gold text-accent-gold')}
          />
        ))}
        {hasHalfStar && (
          <Star
            className={cn(sizes[size], 'fill-accent-gold text-accent-gold opacity-50')}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizes[size], 'text-text-muted')}
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-text-muted text-sm ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

