import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { getCurrentUser, isAdminEmail } from '@/lib/supabase/server';
import { getPendingClaimsAction, approveClaimFormAction, rejectClaimFormAction } from '@/lib/actions/admin-claims';
import { Button } from '@/components/shared/Button';
import { 
  Shield, 
  FileCheck, 
  Users, 
  Building2, 
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Activity,
  Check,
  X
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent('/admin')}`);
  }
  if (!isAdminEmail(user.email)) {
    redirect('/');
  }

  const claimsResult = await getPendingClaimsAction();
  const pendingClaims = claimsResult.ok ? claimsResult.claims : [];
  const pendingCount = pendingClaims.length;
  const latestClaims = pendingClaims.slice(0, 3);
  const formatDate = (s: string) =>
    new Date(s).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Admin', href: '/admin' },
            { label: 'Dashboard', href: '/admin' },
          ]}
        />

        {/* Single header: title + subtitle + badge */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-primary-blue/20 to-primary-purple/20 rounded-card border border-primary-blue/30">
              <Shield className="w-8 h-8 text-primary-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-white">Admin Dashboard</h1>
              <p className="text-text-muted text-sm mt-0.5">Approve or reject gym ownership claims below.</p>
            </div>
          </div>
          <span className="ml-auto inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-blue/25 text-primary-blue border border-primary-blue/40">
            Administrator
          </span>
        </div>

        {/* Pending claims right in your face – latest 3 with actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary-blue" />
              Pending claims to review
              {pendingCount > 0 && (
                <span className="text-sm font-normal text-text-muted">(latest {Math.min(3, pendingCount)} of {pendingCount})</span>
              )}
            </h2>
            {pendingCount > 0 && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/claims">View all</Link>
              </Button>
            )}
          </div>
          {latestClaims.length > 0 ? (
            <div className="space-y-3">
              {latestClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface-card rounded-card border border-surface-lighter hover:border-primary-blue/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-primary-blue flex-shrink-0" />
                      <Link
                        href={`/gyms/${claim.gymSlug}`}
                        className="font-semibold text-text-white hover:text-primary-blue transition-colors truncate"
                      >
                        {claim.gymName}
                      </Link>
                    </div>
                    <div className="text-sm text-text-muted">
                      Claimed by: <span className="text-text-light">{claim.userEmail ?? 'Unknown'}</span>
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {formatDate(claim.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <form action={approveClaimFormAction} className="inline">
                      <input type="hidden" name="gym_id" value={claim.gymId} />
                      <input type="hidden" name="user_id" value={claim.userId} />
                      <Button type="submit" variant="primary" className="!py-1.5 !text-sm gap-1">
                        <Check className="w-4 h-4" /> Approve
                      </Button>
                    </form>
                    <form action={rejectClaimFormAction} className="inline">
                      <input type="hidden" name="gym_id" value={claim.gymId} />
                      <input type="hidden" name="user_id" value={claim.userId} />
                      <Button type="submit" variant="outline" className="!py-1.5 !text-sm gap-1">
                        <X className="w-4 h-4" /> Reject
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-surface-lighter bg-surface-card/50 p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-secondary-green mx-auto mb-2 opacity-80" />
              <p className="text-text-muted">No pending claims. New requests will appear here.</p>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <Link href="/admin/claims">Open claims page</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Pending Claims Card */}
          <Link href="/admin/claims" className="group">
            <div className="bg-surface-card rounded-card p-6 border border-surface-lighter hover:border-primary-blue/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary-blue/10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary-blue/20 rounded-lg">
                  <FileCheck className="w-6 h-6 text-primary-blue" />
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary-blue group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-3xl font-bold text-text-white mb-1">{pendingCount}</div>
              <div className="text-text-muted text-sm">Pending Claims</div>
              {pendingCount > 0 && (
                <div className="mt-2 flex items-center gap-2 text-xs text-primary-blue">
                  <Clock className="w-3 h-3" />
                  <span>Requires attention</span>
                </div>
              )}
            </div>
          </Link>

          {/* Total Gyms Card */}
          <div className="bg-surface-card rounded-card p-6 border border-surface-lighter">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary-green/20 rounded-lg">
                <Building2 className="w-6 h-6 text-secondary-green" />
              </div>
            </div>
            <div className="text-3xl font-bold text-text-white mb-1">—</div>
            <div className="text-text-muted text-sm">Total Gyms</div>
            <div className="mt-2 text-xs text-text-muted">Coming soon</div>
          </div>

          {/* Active Users Card */}
          <div className="bg-surface-card rounded-card p-6 border border-surface-lighter">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary-purple/20 rounded-lg">
                <Users className="w-6 h-6 text-primary-purple" />
              </div>
            </div>
            <div className="text-3xl font-bold text-text-white mb-1">—</div>
            <div className="text-text-muted text-sm">Active Users</div>
            <div className="mt-2 text-xs text-text-muted">Coming soon</div>
          </div>

          {/* Platform Activity Card */}
          <div className="bg-surface-card rounded-card p-6 border border-surface-lighter">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-accent-gold/20 rounded-lg">
                <Activity className="w-6 h-6 text-accent-gold" />
              </div>
            </div>
            <div className="text-3xl font-bold text-text-white mb-1">—</div>
            <div className="text-text-muted text-sm">Platform Activity</div>
            <div className="mt-2 text-xs text-text-muted">Coming soon</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/admin/claims">
              <div className="bg-gradient-to-br from-primary-blue/10 to-primary-purple/10 rounded-card p-6 border border-primary-blue/30 hover:border-primary-blue/50 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-blue/20 rounded-lg group-hover:scale-110 transition-transform">
                    <FileCheck className="w-6 h-6 text-primary-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-white mb-1">Manage Claims</h3>
                    <p className="text-sm text-text-muted">Review and approve gym ownership claims</p>
                    {pendingCount > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-primary-blue">
                        <span className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></span>
                        <span>{pendingCount} pending</span>
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary-blue group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>

            <div className="bg-surface-card rounded-card p-6 border border-surface-lighter opacity-60">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface-lighter rounded-lg">
                  <Users className="w-6 h-6 text-text-muted" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-white mb-1">User Management</h3>
                  <p className="text-sm text-text-muted">Coming soon</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-card rounded-card p-6 border border-surface-lighter opacity-60">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface-lighter rounded-lg">
                  <TrendingUp className="w-6 h-6 text-text-muted" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-white mb-1">Analytics</h3>
                  <p className="text-sm text-text-muted">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
