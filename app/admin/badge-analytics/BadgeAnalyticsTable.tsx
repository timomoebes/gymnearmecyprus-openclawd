'use client';

import React from 'react';
import Link from 'next/link';
import type { AdminGymRow } from '@/lib/actions/badge-analytics';

interface BadgeAnalyticsTableProps {
  gyms: AdminGymRow[];
}

export function BadgeAnalyticsTable({ gyms }: BadgeAnalyticsTableProps) {
  if (!gyms.length) {
    return (
      <div className="p-6 text-text-muted text-sm">No badge analytics yet.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-surface-lighter text-text-muted text-sm">
            <th className="p-4 font-semibold">Gym</th>
            <th className="p-4 font-semibold">Owner</th>
            <th className="p-4 font-semibold text-right">Total</th>
            <th className="p-4 font-semibold text-right">Last 30d</th>
            <th className="p-4 font-semibold text-right">Minimal</th>
            <th className="p-4 font-semibold text-right">Card</th>
            <th className="p-4 font-semibold text-right">Button</th>
          </tr>
        </thead>
        <tbody>
          {gyms.map((row) => (
            <tr
              key={row.gymId}
              className="border-b border-surface-lighter hover:bg-surface-lighter/30 transition-colors"
            >
              <td className="p-4">
                <Link
                  href={`/gyms/${row.gymSlug}`}
                  className="font-medium text-primary-blue hover:underline"
                >
                  {row.gymName}
                </Link>
              </td>
              <td className="p-4 text-text-light text-sm">{row.ownerEmail ?? '—'}</td>
              <td className="p-4 text-right text-text-white">{row.totalClicks}</td>
              <td className="p-4 text-right text-text-light">{row.clicksLast30d}</td>
              <td className="p-4 text-right text-text-muted">{row.minimalClicks}</td>
              <td className="p-4 text-right text-text-muted">{row.cardClicks}</td>
              <td className="p-4 text-right text-text-muted">{row.buttonClicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
