import React from 'react';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import { Gym } from '@/lib/types';
import { Rating } from '@/components/shared/Rating';
import { Badge } from '@/components/shared/Badge';
import { getCityById } from '@/lib/data';
import { formatGymNameWithCity } from '@/lib/utils/gym-name';
import { sortSpecialties } from '@/lib/utils/sort-specialties-amenities';
import { GymOpenStatus } from './GymOpenStatus';

interface GymCardProps {
  gym: Gym;
  showCity?: boolean;
  variant?: 'default' | 'guide-style';
  index?: number;
}

export const GymCard: React.FC<GymCardProps> = ({ 
  gym, 
  showCity = true, 
  variant = 'default',
  index 
}) => {
  const city = getCityById(gym.cityId);

  // Guide-style variant matching the guide design
  if (variant === 'guide-style') {
    return (
      <div className="border-b border-[#00D9FF]/15 pb-6 mb-6 last:border-b-0 last:mb-0">
        <div className="mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-text-white mb-2 flex items-center gap-2 flex-wrap">
            {index !== undefined && (
              <span className="text-text-white font-bold">{index}.</span>
            )}
            <Link
              href={`/gyms/${gym.slug}`}
              className="text-[#00D9FF] hover:text-[#6C5CE7] underline underline-offset-3 decoration-[#00D9FF]/40 hover:decoration-[#6C5CE7]/60 transition-colors font-bold"
            >
              {gym.name}
            </Link>
            <span className="flex items-center gap-1.5 text-text-white font-bold">
              <Star className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              <span>{gym.rating.toFixed(1)}</span>
              <span className="text-text-white">({gym.reviewCount} {gym.reviewCount === 1 ? 'review' : 'reviews'})</span>
            </span>
          </h3>
        </div>
        <p className="text-[#E0E0E0] text-base sm:text-lg leading-relaxed pl-0 mb-0" style={{ lineHeight: '1.9', letterSpacing: '0.02em' }}>
          {gym.description}
        </p>
      </div>
    );
  }

  // Default card variant
  return (
    <Link
      href={`/gyms/${gym.slug}`}
      className="group block bg-surface-card rounded-card p-6 hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3 mb-4 min-w-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-xl font-semibold text-text-white group-hover:text-primary-blue transition-colors break-words min-w-0">
              {formatGymNameWithCity(gym.name, city?.name)}
            </h3>
            {gym.featured && (
              <Badge variant="featured">Featured</Badge>
            )}
            {/* Open/Closed Status Badge - Client-side only to avoid hydration mismatch */}
            <GymOpenStatus openingHours={gym.openingHours} />
          </div>
          {showCity && city && (
            <div className="flex items-center text-text-muted text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{city.name}</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <Rating rating={gym.rating} reviewCount={gym.reviewCount} size="sm" />
        </div>
      </div>

      <p className="text-text-muted text-sm mb-4 line-clamp-2">
        {gym.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {sortSpecialties(gym.specialties).slice(0, 3).map((specialty) => (
          <Badge key={specialty} variant="specialty">
            {specialty}
          </Badge>
        ))}
        {gym.specialties.length > 3 && (
          <span className="text-text-muted text-xs">+{gym.specialties.length - 3} more</span>
        )}
        {gym.vibeTags && gym.vibeTags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="specialty" className="bg-primary-purple/20 text-primary-purple border border-primary-purple/40">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-surface-lighter">
        <span className="text-primary-blue text-sm font-medium group-hover:underline">
          View Details →
        </span>
      </div>
    </Link>
  );
};

