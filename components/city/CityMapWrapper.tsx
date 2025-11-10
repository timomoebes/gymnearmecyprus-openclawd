'use client';

import dynamic from 'next/dynamic';

const CityMap = dynamic(() => import('./CityMap').then(mod => ({ default: mod.CityMap })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-card bg-surface-card flex items-center justify-center">
      <p className="text-text-muted">Loading map...</p>
    </div>
  ),
});

export { CityMap };

