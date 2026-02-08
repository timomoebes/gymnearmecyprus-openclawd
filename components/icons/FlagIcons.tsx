'use client';

import React, { useId } from 'react';

const sizeProps = { width: 24, height: 18 };

/** UK flag (Union Jack) – inline SVG for consistent cross‑platform display */
export function FlagGB({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      className={className}
      {...sizeProps}
      aria-hidden
    >
      <defs>
        <clipPath id={`uk-${id}`}>
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id={`uk2-${id}`}>
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#uk-${id})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath={`url(#uk2-${id})`} />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

/** Greece flag – inline SVG for consistent cross‑platform display */
export function FlagGR({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 18"
      className={className}
      {...sizeProps}
      aria-hidden
    >
      {/* 9 stripes: 5 blue, 4 white (top blue) */}
      <path fill="#0D5EAF" d="M0,0 h27 v2 h-27 z M0,4 h27 v2 h-27 z M0,8 h27 v2 h-27 z M0,12 h27 v2 h-27 z M0,16 h27 v2 h-27 z" />
      <path fill="#fff" d="M0,2 h27 v2 h-27 z M0,6 h27 v2 h-27 z M0,10 h27 v2 h-27 z M0,14 h27 v2 h-27 z" />
      {/* Canton: blue with white cross */}
      <path fill="#0D5EAF" d="M0,0 h10 v10 h-10 z" />
      <path fill="#fff" d="M0,4 h10 v2 h-10 z M4,0 h2 v10 h-2 v-10 z" />
    </svg>
  );
}

const FLAG_MAP = { en: FlagGB, el: FlagGR } as const;

export function LanguageFlag({ code, className }: { code: 'en' | 'el'; className?: string }) {
  const Flag = FLAG_MAP[code] ?? FlagGB;
  return <Flag className={className} />;
}
