'use client';

import React from 'react';
import type { BadgeTrendPoint } from '@/lib/types';

interface BadgeTrendMiniChartProps {
  points: BadgeTrendPoint[];
  className?: string;
  height?: number;
  width?: number;
}

/**
 * Inline SVG mini line chart for last 30 days of badge clicks. No recharts dependency.
 */
export function BadgeTrendMiniChart({
  points,
  className = '',
  height = 80,
  width = 320,
}: BadgeTrendMiniChartProps) {
  if (!points.length) {
    return (
      <div
        className={`flex items-center justify-center text-text-muted text-sm ${className}`}
        style={{ height, minWidth: width }}
      >
        No clicks yet
      </div>
    );
  }

  const maxClicks = Math.max(1, ...points.map((p) => p.clicks));
  const padding = { top: 4, right: 4, bottom: 16, left: 28 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const xScale = (i: number) => padding.left + (i / (points.length - 1 || 1)) * chartWidth;
  const yScale = (v: number) => padding.top + chartHeight - (v / maxClicks) * chartHeight;

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(p.clicks)}`)
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      className={className}
      style={{ maxWidth: width, minHeight: height }}
      aria-label="Badge clicks last 30 days"
    >
      {points.map((p, i) => (
        <line
          key={p.date}
          x1={xScale(i)}
          y1={yScale(p.clicks)}
          x2={xScale(i)}
          y2={padding.top + chartHeight}
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={1}
        />
      ))}
      <path
        d={pathD}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary-blue"
      />
    </svg>
  );
}
