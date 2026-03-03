import { NextResponse } from 'next/server';
import { getCurrentUser, isAdminEmail } from '@/lib/supabase/server';
import { getBadgeAnalyticsForAdmin } from '@/lib/actions/badge-analytics';

const MAX_ROWS = 10_000;

function escapeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const s = String(value);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await getBadgeAnalyticsForAdmin();
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  const rows = result.gyms.slice(0, MAX_ROWS);
  const headers = [
    'gym_id',
    'gym_name',
    'owner_email',
    'total_clicks',
    'clicks_last_30d',
    'minimal_clicks',
    'card_clicks',
    'button_clicks',
  ];
  const lines: string[] = [headers.join(',')];
  for (const row of rows) {
    lines.push(
      [
        escapeCsvCell(row.gymId),
        escapeCsvCell(row.gymName),
        escapeCsvCell(row.ownerEmail),
        escapeCsvCell(row.totalClicks),
        escapeCsvCell(row.clicksLast30d),
        escapeCsvCell(row.minimalClicks),
        escapeCsvCell(row.cardClicks),
        escapeCsvCell(row.buttonClicks),
      ].join(',')
    );
  }
  const csv = lines.join('\n');
  const filename = `badge-analytics-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
