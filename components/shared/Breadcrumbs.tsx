import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-text-muted mb-6">
      <Link
        href="/"
        className="hover:text-primary-blue transition-colors flex items-center"
      >
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <ChevronRight className="w-4 h-4" />
          {index === items.length - 1 ? (
            <span className="text-text-white font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-primary-blue transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

