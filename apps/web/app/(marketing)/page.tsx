import Link from 'next/link';

const sparkPoints = {
  ldl: [142, 130, 125, 118, 112, 98],
  hba1c: [5.2, 5.3, 5.4, 5.5, 5.6, 5.9],
  vitd: [42, 38, 35, 30, 28, 22],
};

function Spark({ data, color, w = 80, h = 24 }: { data: number[]; color: string; w?: number; h?: number }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 3 - ((v - min) / r) * (h - 6)}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex size-8 items-center justify-center rounded-[10px]"
              style={{ background: 'linear-gradient(135deg, #3162FF, #1D3DB3)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.5 3 4 6 4 9.5c0 2.5 1.5 4.5 3.5 5.5L6 21l3-2 3 2 3-2 3 2-1.5-6c2-1 3.5-3 3.5-5.5C21 6 17.5 3 12 3z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 10h.01M15 10h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9.5 13.5c.8.8 2.2 1 3 .5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[17px] font-semibold text-neutral-900 tracking-[-0.01em]" style={{ fontFamily: 'var(--font-display)' }}>
              OpenVitals
            </span>
          </div>
          <nav className="flex items-center gap-3">
            <Link href="/login" className="px-3 py-1.5 text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-accent-600 px-4 py-2 text-[13px] font-medium text-white hover:bg-accent-700 transition-all active:scale-[0.98] shadow-sm"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(var(--color-neutral-900) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-900) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Blue gradient glow */}
        <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full opacity-[0.08]" style={{
          background: 'radial-gradient(circle, #3162FF 0%, transparent 70%)',
        }} />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pt-32 md:pb-28">
          <div className="max-w-3xl">
            {/* Overline */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent-700" style={{ fontFamily: 'var(--font-mono)' }}>
                Open source &middot; v0.1
              </span>
            </div>

            <h1
              className="text-[clamp(2.5rem,6vw,4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-neutral-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Your health data,
              <br />
              <span className="text-accent-600">in focus.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
              Upload lab reports, track medications, and understand your health records.
              Every value traced back to its source. AI that only speaks from your data.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center rounded-lg px-6 py-3 text-[14px] font-medium text-white transition-all active:scale-[0.98] shadow-md hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #3162FF, #2750D9)' }}
              >
                Start for free
              </Link>
              <a
                href="https://github.com/openvitals/openvitals"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-[14px] font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-70"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Floating data preview */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 stagger-children">
            {[
              { label: 'LDL Cholesterol', value: '98', unit: 'mg/dL', delta: '↓ 14', color: '#16A34A', data: sparkPoints.ldl },
              { label: 'HbA1c', value: '5.9', unit: '%', delta: '↑ 0.3', color: '#D97706', data: sparkPoints.hba1c },
              { label: 'Vitamin D', value: '22', unit: 'ng/mL', delta: '↓ 8', color: '#DC2626', data: sparkPoints.vitd },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="text-[12px] font-medium tracking-[0.02em] text-neutral-400" style={{ fontFamily: 'var(--font-body)' }}>
                  {m.label}
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[28px] font-medium tracking-[-0.03em]" style={{ fontFamily: 'var(--font-display)' }}>
                    {m.value}
                  </span>
                  <span className="text-[12px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{m.unit}</span>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <span className="text-[11px] font-medium" style={{ fontFamily: 'var(--font-mono)', color: m.color }}>
                    {m.delta}
                  </span>
                  <Spark data={m.data} color={m.color} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <h2
              className="text-[28px] font-medium tracking-[-0.025em] text-neutral-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Every value has a story
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] text-neutral-500 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Full provenance from source document to structured observation. Confidence scores, parser versions, and one-click clickback.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 stagger-children">
            {[
              {
                icon: '◎',
                title: 'Source-linked provenance',
                desc: 'Every observation links back to the original PDF, page, and extraction. See exactly where your data came from.',
              },
              {
                icon: '⚙',
                title: 'AI-assisted parsing',
                desc: 'Upload a lab report and watch it transform into structured, queryable data with confidence scores you can trust.',
              },
              {
                icon: '⊟',
                title: 'Scoped data sharing',
                desc: 'Share specific categories with your doctor for 30 days. They see lipids and vitals. Nothing else leaks through.',
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-neutral-200 bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50 text-lg text-accent-600" style={{ fontFamily: 'var(--font-mono)' }}>
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-semibold text-neutral-900 tracking-[-0.01em]" style={{ fontFamily: 'var(--font-body)' }}>
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provenance strip */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: '◎', label: 'Quest Diagnostics PDF' },
              { icon: '⚙', label: 'lab-pdf-parser v2.1' },
              { icon: '◉', label: 'Confidence: 0.94' },
              { icon: '⟐', label: 'LOINC 13457-7' },
              { icon: '✓', label: 'User confirmed' },
            ].map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-[5px] rounded-md border border-secondary-200 bg-secondary-50 px-2.5 py-1 text-[11px] text-neutral-600"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="text-xs">{p.icon}</span>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200" style={{ background: 'linear-gradient(180deg, #F5F5FA 0%, #EBEBF5 100%)' }}>
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2
            className="text-[32px] font-medium tracking-[-0.03em] text-neutral-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Start understanding your data
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-neutral-500 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Free and open source. Upload your first lab report in under a minute.
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex items-center rounded-lg px-8 py-3.5 text-[15px] font-medium text-white transition-all active:scale-[0.98] shadow-lg hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #3162FF, #1D3DB3)' }}
            >
              Create your account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md" style={{ background: 'linear-gradient(135deg, #3162FF, #1D3DB3)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C7.5 3 4 6 4 9.5c0 2.5 1.5 4.5 3.5 5.5L6 21l3-2 3 2 3-2 3 2-1.5-6c2-1 3.5-3 3.5-5.5C21 6 17.5 3 12 3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[13px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>
                OpenVitals v0.1
              </span>
            </div>
            <span className="text-[12px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>
              Open source &middot; Your data, your control
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
