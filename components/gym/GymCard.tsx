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
}

export const GymCard: React.FC<GymCardProps> = ({ gym, showCity = true }) => {
  const city = getCityById(gym.cityId);

  return (
    <Link
      href={`/gyms/${gym.slug}`}
      className="group block bg-surface-card rounded-card p-6 hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-xl font-semibold text-text-white group-hover:text-primary-blue transition-colors">
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
        <Rating rating={gym.rating} reviewCount={gym.reviewCount} size="sm" />
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
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-surface-lighter">
        <span className="text-primary-blue text-sm font-medium group-hover:underline">
          View Details →
        </span>
      </div>
    </Link>
  );
};

