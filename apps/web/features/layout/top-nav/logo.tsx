'use client';

import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/timeline" className="flex items-center gap-2 group">
      <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-[10px]"
        style={{ background: 'linear-gradient(135deg, #3162FF, #1D3DB3)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 3C7.5 3 4 6 4 9.5c0 2.5 1.5 4.5 3.5 5.5L6 21l3-2 3 2 3-2 3 2-1.5-6c2-1 3.5-3 3.5-5.5C21 6 17.5 3 12 3z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 10h.01M15 10h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9.5 13.5c.8.8 2.2 1 3 .5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="hidden sm:flex items-baseline">
        <span className="text-[16px] font-semibold text-neutral-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          OpenVitals
        </span>
      </div>
    </Link>
  );
}
