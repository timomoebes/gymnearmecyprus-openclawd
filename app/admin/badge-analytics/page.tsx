import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { getCurrentUser, isAdminEmail } from '@/lib/supabase/server';
import { getBadgeAnalyticsForAdmin } from '@/lib/actions/badge-analytics';
import { Button } from '@/components/shared/Button';
import { TrendingUp, Download } from 'lucide-react';
import { BadgeAnalyticsTable } from './BadgeAnalyticsTable';

export default async function AdminBadgeAnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent('/admin/badge-analytics')}`);
  }
  if (!isAdminEmail(user.email)) {
    redirect('/');
  }

  const result = await getBadgeAnalyticsForAdmin();
  const gyms = result.ok ? result.gyms : [];
  const styles = result.ok ? result.styles : [];

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Admin', href: '/admin' },
            { label: 'Badge Analytics', href: '/admin/badge-analytics' },
          ]}
        />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-blue/20 rounded-card border border-primary-blue/30">
              <TrendingUp className="w-8 h-8 text-primary-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-white">Badge Analytics</h1>
              <p className="text-text-muted text-sm mt-0.5">Gym ranking and badge style performance</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/api/admin/badge-analytics/export">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </a>
          </Button>
        </div>

        {!result.ok && (
          <div className="rounded-card border border-surface-lighter bg-surface-card p-6 text-text-muted">
            {result.error}
          </div>
        )}

        {result.ok && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {styles.map((s) => (
                <div
                  key={s.style}
                  className="bg-surface-card rounded-card p-4 border border-surface-lighter"
                >
                  <div className="text-lg font-bold text-text-white capitalize">{s.style}</div>
                  <div className="text-2xl font-bold text-primary-blue mt-1">{s.totalClicks}</div>
                  <div className="text-text-muted text-sm">{s.percentage.toFixed(1)}% of clicks</div>
                </div>
              ))}
            </div>

            <div className="bg-surface-card rounded-card border border-surface-lighter overflow-hidden">
              <h2 className="text-xl font-bold text-text-white p-6 pb-0">Gyms by badge engagement</h2>
              <BadgeAnalyticsTable gyms={gyms} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
