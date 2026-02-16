import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { getCurrentUser, isAdminEmail } from '@/lib/supabase/server';
import { getPendingClaimsAction, approveClaimFormAction, rejectClaimFormAction } from '@/lib/actions/admin-claims';
import { Button } from '@/components/shared/Button';

export default async function AdminClaimsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent('/admin/claims')}`);
  }
  if (!isAdminEmail(user.email)) {
    redirect('/');
  }

  const result = await getPendingClaimsAction();
  if (!result.ok) {
    return (
      <div className="min-h-screen bg-background-dark p-8">
        <p className="text-red-400">{result.error}</p>
      </div>
    );
  }

  const { claims } = result;
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Admin', href: '/admin' },
            { label: 'Pending claims', href: '/admin/claims' },
          ]}
        />
        <div className="flex items-center justify-between mt-4 mb-2">
          <h1 className="text-3xl font-bold text-text-white">Pending claims</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">← Back to Dashboard</Link>
          </Button>
        </div>
        <p className="text-text-light mb-8">
          Approve a claim to make the user the owner of the gym. They will then see it in their dashboard.
        </p>

        {claims.length === 0 ? (
          <div className="bg-surface-card rounded-card p-6 border border-surface-lighter">
            <p className="text-text-muted">No pending claims.</p>
            <Link href="/gyms" className="text-primary-blue hover:underline mt-2 inline-block">
              Browse gyms
            </Link>
          </div>
        ) : (
          <div className="bg-surface-card rounded-card border border-surface-lighter overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-surface-lighter">
                  <th className="px-4 py-3 text-text-muted font-medium text-sm">Gym</th>
                  <th className="px-4 py-3 text-text-muted font-medium text-sm">Claimant</th>
                  <th className="px-4 py-3 text-text-muted font-medium text-sm">Requested</th>
                  <th className="px-4 py-3 text-text-muted font-medium text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((c) => (
                  <tr key={c.id} className="border-b border-surface-lighter last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/gyms/${c.gymSlug}`}
                        className="text-primary-blue hover:underline font-medium"
                      >
                        {c.gymName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-text-light">
                      {c.userEmail ?? c.userId}
                    </td>
                    <td className="px-4 py-3 text-text-muted text-sm">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <form action={approveClaimFormAction} className="inline">
                          <input type="hidden" name="gym_id" value={c.gymId} />
                          <input type="hidden" name="user_id" value={c.userId} />
                          <Button type="submit" variant="primary" className="!py-1.5 !text-sm">
                            Approve
                          </Button>
                        </form>
                        <form action={rejectClaimFormAction} className="inline">
                          <input type="hidden" name="gym_id" value={c.gymId} />
                          <input type="hidden" name="user_id" value={c.userId} />
                          <Button type="submit" variant="outline" className="!py-1.5 !text-sm">
                            Reject
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
