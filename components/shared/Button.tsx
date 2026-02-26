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
    const baseStyles = 'font-semibold tracking-wide rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark inline-flex items-center justify-center active:scale-[0.98]';
    
    // Use explicit hex values so production build always includes these styles (no theme dependency)
    const variants = {
      primary:
        'bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] text-white shadow-[0_4px_20px_-2px_rgba(14,165,233,0.28),0_0_0_1px_rgba(255,255,255,0.06)_inset] hover:shadow-[0_8px_28px_-4px_rgba(99,102,241,0.32),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:scale-[1.02] focus:ring-[#0EA5E9]',
      secondary:
        'bg-gradient-to-r from-[#059669] to-[#B45309] text-white shadow-[0_4px_20px_-2px_rgba(5,150,105,0.28),0_0_0_1px_rgba(255,255,255,0.06)_inset] hover:shadow-[0_8px_28px_-4px_rgba(180,83,9,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:scale-[1.02] focus:ring-[#059669]',
      outline:
        'border border-[#64748B] text-[#E0E0E0] bg-transparent hover:bg-[#64748B]/20 hover:border-[#64748B] hover:text-white hover:shadow-[0_4px_16px_-2px_rgba(100,116,139,0.25)] focus:ring-[#64748B]',
      ghost: 'text-text-light hover:bg-surface-card focus:ring-primary-blue',
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

