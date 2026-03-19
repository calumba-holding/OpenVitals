'use client';

import Link from 'next/link';
import { Logo as LogoIcon } from '@/assets/app/images/logo';

export function Logo() {
  return (
    <Link href="/timeline" className="flex items-center gap-2 group">
      
        <LogoIcon className="size-5.5 text-accent-500" />
      <div className="hidden sm:flex items-baseline">
        <span className="text-[16px] font-semibold text-neutral-900 tracking-tight font-display">
          OpenVitals
        </span>
      </div>
    </Link>
  );
}
