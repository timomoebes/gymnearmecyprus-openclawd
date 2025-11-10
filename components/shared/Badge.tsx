import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'featured' | 'default' | 'specialty' | 'rating';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className,
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';
  
  const variants = {
    featured: 'bg-accent-gold text-background-dark',
    default: 'bg-surface-lighter text-text-white',
    specialty: 'bg-primary-purple text-white',
    rating: 'bg-secondary-green text-white',
  };
  
  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
};

