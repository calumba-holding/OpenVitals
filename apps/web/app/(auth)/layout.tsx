import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col justify-between p-10 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #1D3DB3 0%, #3162FF 50%, #5A75FF 100%)' }}>
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.5 3 4 6 4 9.5c0 2.5 1.5 4.5 3.5 5.5L6 21l3-2 3 2 3-2 3 2-1.5-6c2-1 3.5-3 3.5-5.5C21 6 17.5 3 12 3z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 10h.01M15 10h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9.5 13.5c.8.8 2.2 1 3 .5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[18px] font-semibold text-white tracking-[-0.01em]" style={{ fontFamily: 'var(--font-display)' }}>
              OpenVitals
            </span>
          </Link>
        </div>

        {/* Central content */}
        <div className="relative z-10 space-y-8">
          <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.03em] text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Your health data,<br />traced to the source.
          </h2>

          {/* Mini data showcase */}
          <div className="space-y-3">
            {[
              { metric: 'LDL Cholesterol', value: '98', unit: 'mg/dL', status: 'Normal' },
              { metric: 'HbA1c', value: '5.9', unit: '%', status: 'Borderline' },
              { metric: 'Ferritin', value: '14', unit: 'ng/mL', status: 'Low' },
            ].map((row) => (
              <div key={row.metric} className="flex items-center justify-between rounded-lg bg-white/10 backdrop-blur-sm px-4 py-3">
                <span className="text-[13px] font-medium text-white/80" style={{ fontFamily: 'var(--font-body)' }}>
                  {row.metric}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-semibold text-white tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                    {row.value}
                  </span>
                  <span className="text-[10px] text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
                    {row.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            {['◎ Quest Diagnostics', '⚙ lab-pdf-parser v2.1', '◉ 0.94'].map((pill) => (
              <span
                key={pill}
                className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-white/60"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-white p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}
