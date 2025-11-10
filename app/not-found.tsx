import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-text-white mb-4">Page Not Found</h2>
        <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

