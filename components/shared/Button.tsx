import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, asChild, ...props }, ref) => {
    const baseStyles = 'font-semibold tracking-wide rounded-xl transition-all duration-300 inline-flex items-center justify-center active:scale-[0.98]';
    // CTA variants use global CSS classes (globals.css) so they always ship on every page including /pricing
    const variants = {
      primary: 'btn-cta-primary',
      secondary: 'btn-cta-secondary',
      outline: 'btn-cta-outline',
      ghost: 'text-text-light hover:bg-surface-card focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary-blue',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    const classes = cn(baseStyles, variants[variant], sizes[size], className);
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(classes, children.props.className),
        ...props,
      });
    }
    
    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

