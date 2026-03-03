'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Eye, 
  MousePointerClick, 
  Mail, 
  Star, 
  TrendingUp, 
  Edit, 
  Image as ImageIcon,
  Crown,
  Zap,
  Building2,
  Megaphone
} from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { Rating } from '@/components/shared/Rating';
import { GymCard } from '@/components/gym/GymCard';
import { BadgeGuide } from '@/components/gym/BadgeGuide';
import { BadgeGenerator } from '@/components/gym/BadgeGenerator';
import { BadgeTrendMiniChart } from '@/components/gym/BadgeTrendMiniChart';
import { getMyGymsAction } from '@/lib/actions/dashboard';
import { getBadgeAnalyticsForOwner } from '@/lib/actions/badge-analytics';
import { OwnerPhotoUpload } from '@/components/owner/OwnerPhotoUpload';
import type { Gym } from '@/lib/types';
import type { BadgeMetrics } from '@/lib/types';

const placeholderStats = {
  views: 0,
  clicks: 0,
  inquiries: 0,
  rating: 0,
  reviewCount: 0,
  plan: 'free' as const,
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'listing' | 'photos' | 'promote' | 'analytics'>('overview');
  const [myGyms, setMyGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoteGymId, setPromoteGymId] = useState<string | null>(null);
  const [badgeMetrics, setBadgeMetrics] = useState<BadgeMetrics | null>(null);
  const [badgeMetricsLoading, setBadgeMetricsLoading] = useState(false);

  useEffect(() => {
    getMyGymsAction().then(({ gyms }) => {
      setMyGyms(gyms);
      if (gyms.length && !promoteGymId) setPromoteGymId(gyms[0].id);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (activeTab !== 'promote' || !promoteGymId) {
      setBadgeMetrics(null);
      return;
    }
    setBadgeMetricsLoading(true);
    getBadgeAnalyticsForOwner(promoteGymId).then((res) => {
      setBadgeMetricsLoading(false);
      if (res.ok) setBadgeMetrics(res.metrics);
      else setBadgeMetrics(null);
    });
  }, [activeTab, promoteGymId]);

  const mockStats = placeholderStats;
  const mockGym = myGyms[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }]} />
          <div className="animate-pulse text-text-muted">Loading dashboard…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }]} />

        {/* No gyms yet: claim CTA */}
        {myGyms.length === 0 && (
          <div className="mb-8 rounded-card border border-primary-blue/30 bg-primary-blue/10 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-primary-blue flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-text-white">You haven&apos;t claimed any gyms yet</h2>
                  <p className="text-text-light mt-1">Claim your gym to manage your listing, add photos, and upgrade to featured.</p>
                </div>
              </div>
              <Button variant="primary" asChild>
                <Link href="/gyms">Browse gyms and claim</Link>
              </Button>
            </div>
          </div>
        )}

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
        <div className="flex gap-4 mb-8 border-b border-surface-lighter overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'listing', label: 'My Listing', icon: Edit },
            { id: 'photos', label: 'Photos', icon: ImageIcon },
            { id: 'promote', label: 'Promote', icon: Megaphone },
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
            {mockGym ? (
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
            ) : (
              <div className="bg-surface-card rounded-card p-6 text-center text-text-muted">
                <p>Claim a gym to see your listing here.</p>
                <Link href="/gyms" className="text-primary-blue hover:underline mt-2 inline-block">Browse gyms</Link>
              </div>
            )}

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
                <Button variant="outline" size="sm" onClick={() => setActiveTab('photos')}>
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
            {mockGym ? (
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
            ) : (
              <p className="text-text-muted">Claim a gym first to edit your listing.</p>
            )}
          </div>
        )}

        {/* Promote Tab */}
        {activeTab === 'promote' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-text-white">Promote Your Listing</h2>
            {myGyms.length === 0 ? (
              <div className="bg-surface-card rounded-card p-8 text-center text-text-muted">
                <p>Claim a gym to generate badges and track engagement.</p>
                <Link href="/gyms" className="text-primary-blue hover:underline mt-2 inline-block">Browse gyms</Link>
              </div>
            ) : (
              <>
                {myGyms.length > 1 && (
                  <div>
                    <label htmlFor="promote-gym-select" className="block text-text-white font-semibold mb-2">Select gym</label>
                    <select
                      id="promote-gym-select"
                      value={promoteGymId ?? ''}
                      onChange={(e) => setPromoteGymId(e.target.value || null)}
                      className="px-4 py-2 rounded-lg bg-surface-lighter border border-surface-lighter text-text-white focus:ring-2 focus:ring-primary-blue"
                    >
                      {myGyms.map((g) => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                <BadgeGuide />
                {(() => {
                  const gym = myGyms.find((g) => g.id === promoteGymId) ?? myGyms[0];
                  return gym ? (
                    <BadgeGenerator slug={gym.slug} gymName={gym.name} rating={gym.rating} />
                  ) : null;
                })()}
                <div className="rounded-card border border-surface-lighter bg-surface-card p-6">
                  <h3 className="text-lg font-bold text-text-white mb-4">Engagement stats</h3>
                  {badgeMetricsLoading ? (
                    <div className="text-text-muted animate-pulse">Loading…</div>
                  ) : badgeMetrics ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-surface-lighter/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-text-white">{badgeMetrics.monthlyClicks}</div>
                          <div className="text-text-muted text-sm">This month</div>
                        </div>
                        <div className="bg-surface-lighter/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-text-white">{badgeMetrics.totalClicks}</div>
                          <div className="text-text-muted text-sm">Total clicks</div>
                        </div>
                        <div className="bg-surface-lighter/50 rounded-lg p-4">
                          <div className="text-lg font-bold text-text-white capitalize">
                            {badgeMetrics.styleBreakdown?.length
                              ? (() => {
                                  const best = badgeMetrics.styleBreakdown!.reduce((a, s) => (s.clicks > a.clicks ? s : a), badgeMetrics.styleBreakdown![0]);
                                  return best.clicks > 0 ? `${best.style} — ${best.percentage.toFixed(0)}%` : '—';
                                })()
                              : '—'}
                          </div>
                          <div className="text-text-muted text-sm">Most effective style</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-text-muted text-sm mb-2">Last 30 days</div>
                        <BadgeTrendMiniChart points={badgeMetrics.trendPoints ?? []} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-text-muted">Share your badge to see clicks here.</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="bg-surface-card rounded-card p-8">
            <h2 className="text-2xl font-bold text-text-white mb-6">Manage Your Gym Photos</h2>
            {mockGym ? (
              <OwnerPhotoUpload
                gymId={mockGym.id}
                maxImages={mockGym.featured ? 10 : 3}
                isFeatured={mockGym.featured}
                onSuccess={(images) => {
                  // Update gym with new images if needed
                  setMyGyms((prevGyms) =>
                    prevGyms.map((gym) =>
                      gym.id === mockGym.id
                        ? { ...gym, images }
                        : gym
                    )
                  );
                }}
              />
            ) : (
              <p className="text-text-muted">Claim a gym first to upload photos.</p>
            )}
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

