'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { searchGyms } from '@/lib/utils/search';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // For now, redirect to a search results page or cities page
      // In a full implementation, you'd have a /search page
      router.push(`/cities?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city or gym name..."
            className="w-full pl-12 pr-4 py-3 bg-surface-card border border-surface-lighter rounded-lg text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>
        <Button variant="primary" size="lg" type="submit" className="whitespace-nowrap">
          Search Gyms
        </Button>
      </div>
    </form>
  );
};

