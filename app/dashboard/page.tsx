'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  Eye, 
  MousePointerClick, 
  Mail, 
  Star, 
  TrendingUp, 
  Edit, 
  Image as ImageIcon,
  Settings,
  Crown,
  Zap
} from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { Rating } from '@/components/shared/Rating';
import { GymCard } from '@/components/gym/GymCard';
import { gyms } from '@/lib/data/gyms';

// Mock data - in real app, this would come from API
const mockGym = gyms[0];
const mockStats = {
  views: 1247,
  clicks: 342,
  inquiries: 28,
  rating: 4.5,
  reviewCount: 127,
  plan: 'free' as const,
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'listing' | 'analytics'>('overview');

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }]} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-text-white mb-2">Owner Dashboard</h1>
              <p className="text-text-light">Manage your gym listing and track performance</p>
            </div>
            <div className="flex items-center gap-3">
              {mockStats.plan === 'free' && (
                <Badge variant="default">Free Plan</Badge>
              )}
              {mockStats.plan !== 'free' && (
                <Badge variant="featured">Featured</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Upgrade Prompt for Free Users */}
        {mockStats.plan === 'free' && (
          <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 rounded-card p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-text-white mb-2 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-accent-gold" />
                  Upgrade to Featured
                </h3>
                <p className="text-text-light">
                  Get priority placement, analytics, and more visibility. Start at just €49/month.
                </p>
              </div>
              <Button variant="primary" asChild>
                <a href="/pricing">View Plans</a>
              </Button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-surface-lighter">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'listing', label: 'My Listing', icon: Edit },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-primary-blue border-primary-blue'
                    : 'text-text-muted border-transparent hover:text-text-light'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-card rounded-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="w-8 h-8 text-primary-blue" />
                  <TrendingUp className="w-5 h-5 text-secondary-green" />
                </div>
                <div className="text-3xl font-bold text-text-white mb-1">
                  {mockStats.views.toLocaleString()}
                </div>
                <div className="text-text-muted">Total Views</div>
                <div className="text-sm text-secondary-green mt-2">+12% this month</div>
              </div>

              <div className="bg-surface-card rounded-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <MousePointerClick className="w-8 h-8 text-primary-purple" />
                  <TrendingUp className="w-5 h-5 text-secondary-green" />
                </div>
                <div className="text-3xl font-bold text-text-white mb-1">
                  {mockStats.clicks.toLocaleString()}
                </div>
                <div className="text-text-muted">Profile Clicks</div>
                <div className="text-sm text-secondary-green mt-2">+8% this month</div>
              </div>

              <div className="bg-surface-card rounded-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <Mail className="w-8 h-8 text-secondary-coral" />
                  <TrendingUp className="w-5 h-5 text-secondary-green" />
                </div>
                <div className="text-3xl font-bold text-text-white mb-1">
                  {mockStats.inquiries}
                </div>
                <div className="text-text-muted">Inquiries</div>
                <div className="text-sm text-secondary-green mt-2">+5 this month</div>
              </div>

              <div className="bg-surface-card rounded-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <Star className="w-8 h-8 text-accent-gold" />
                </div>
                <div className="mb-2">
                  <Rating rating={mockStats.rating} reviewCount={mockStats.reviewCount} size="md" />
                </div>
                <div className="text-text-muted">Average Rating</div>
              </div>
            </div>

            {/* Current Listing Preview */}
            <div className="bg-surface-card rounded-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-white">Your Listing</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('listing')}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
              <GymCard gym={mockGym} showCity={true} />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-card rounded-card p-6">
                <Edit className="w-8 h-8 text-primary-blue mb-4" />
                <h3 className="text-xl font-bold text-text-white mb-2">Edit Listing</h3>
                <p className="text-text-muted mb-4">Update your gym information, photos, and details.</p>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('listing')}>
                  Edit Now
                </Button>
              </div>

              <div className="bg-surface-card rounded-card p-6">
                <ImageIcon className="w-8 h-8 text-primary-purple mb-4" />
                <h3 className="text-xl font-bold text-text-white mb-2">Upload Photos</h3>
                <p className="text-text-muted mb-4">Add more photos to showcase your gym.</p>
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>

              {mockStats.plan === 'free' && (
                <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 rounded-card p-6 border border-primary-blue/30">
                  <Zap className="w-8 h-8 text-accent-gold mb-4" />
                  <h3 className="text-xl font-bold text-text-white mb-2">Upgrade to Featured</h3>
                  <p className="text-text-muted mb-4">Get more visibility and analytics.</p>
                  <Button variant="primary" size="sm" asChild>
                    <a href="/pricing">Upgrade Now</a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Listing Tab */}
        {activeTab === 'listing' && (
          <div className="bg-surface-card rounded-card p-8">
            <h2 className="text-2xl font-bold text-text-white mb-6">Edit Your Listing</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-text-white font-semibold mb-2">Gym Name</label>
                <input
                  type="text"
                  defaultValue={mockGym.name}
                  className="w-full px-4 py-3 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <div>
                <label className="block text-text-white font-semibold mb-2">Description</label>
                <textarea
                  rows={5}
                  defaultValue={mockGym.description}
                  className="w-full px-4 py-3 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <div className="flex gap-4">
                <Button variant="primary">Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {mockStats.plan === 'free' ? (
              <div className="bg-surface-card rounded-card p-12 text-center">
                <BarChart3 className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-text-white mb-2">Analytics Available for Featured Plans</h3>
                <p className="text-text-muted mb-6">
                  Upgrade to featured to access detailed analytics, including traffic sources, peak viewing times, and more.
                </p>
                <Button variant="primary" asChild>
                  <a href="/pricing">Upgrade to Featured</a>
                </Button>
              </div>
            ) : (
              <div className="bg-surface-card rounded-card p-8">
                <h2 className="text-2xl font-bold text-text-white mb-6">Analytics Dashboard</h2>
                <div className="text-text-muted">
                  <p>Detailed analytics coming soon...</p>
                  <p className="mt-2">Track views, clicks, inquiries, and more with our comprehensive analytics dashboard.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

