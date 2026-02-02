import React from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Login', href: '/login' }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-text-white mb-2">Sign in</h1>
          <p className="text-text-light mb-6">
            Sign in to claim your gym, manage your listing, or access your dashboard.
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
