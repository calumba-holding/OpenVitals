import Link from 'next/link';

/* ── sparkline ─────────────────────────────────────────────── */
function Spark({ data, color, w = 100, h = 28 }: { data: number[]; color: string; w?: number; h?: number }) {
  const mn = Math.min(...data), mx = Math.max(...data), r = mx - mn || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 3 - ((v - mn) / r) * (h - 6)}`).join(' ');
  const last = pts.split(' ').pop()!.split(',');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ── placeholder image ─────────────────────────────────────── */
function PlaceholderImage({ label, aspect = '16/10', className = '' }: { label: string; aspect?: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[13px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{label}</span>
      </div>
      {/* Subtle scanline texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 3px)',
      }} />
    </div>
  );
}

/* ── inline lab table mockup (for hero) ────────────────────── */
function HeroMockup() {
  const rows = [
    { metric: 'LDL Cholesterol', val: '98', unit: 'mg/dL', range: '0–100', st: 'normal', trend: [142, 130, 125, 118, 112, 98] },
    { metric: 'HDL Cholesterol', val: '58', unit: 'mg/dL', range: '> 40', st: 'normal', trend: [52, 54, 55, 56, 57, 58] },
    { metric: 'Triglycerides', val: '162', unit: 'mg/dL', range: '< 150', st: 'warning', trend: [128, 135, 142, 148, 155, 162] },
    { metric: 'HbA1c', val: '5.9', unit: '%', range: '< 5.7', st: 'warning', trend: [5.2, 5.3, 5.4, 5.5, 5.6, 5.9] },
    { metric: 'Ferritin', val: '14', unit: 'ng/mL', range: '20–300', st: 'critical', trend: [45, 38, 32, 25, 18, 14] },
  ];
  const sc: Record<string, string> = { normal: '#16A34A', warning: '#D97706', critical: '#DC2626' };
  const sl: Record<string, string> = { normal: 'Normal', warning: 'Borderline', critical: 'Low' };
  const sb: Record<string, string> = { normal: '#F0FDF4', warning: '#FFFBEB', critical: '#FEF2F2' };
  const sbo: Record<string, string> = { normal: '#BBF7D0', warning: '#FDE68A', critical: '#FECACA' };

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 12px 48px rgba(0,0,0,0.04)' }}>
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-2.5">
        <div className="flex gap-1.5"><div className="size-[9px] rounded-full bg-[#FF5F57]" /><div className="size-[9px] rounded-full bg-[#FEBC2E]" /><div className="size-[9px] rounded-full bg-[#28C840]" /></div>
        <div className="ml-2 flex-1 rounded bg-neutral-100 px-3 py-[3px]">
          <span className="text-[10px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>openvitals.dev/labs</span>
        </div>
      </div>
      {/* Summary row */}
      <div className="grid grid-cols-4 gap-2.5 px-4 pt-4 pb-3">
        {[
          { label: 'LDL Cholesterol', val: '98', unit: 'mg/dL', delta: '↓ 14', color: '#16A34A', d: [142, 130, 118, 98] },
          { label: 'HbA1c', val: '5.9', unit: '%', delta: '↑ 0.3', color: '#D97706', d: [5.2, 5.4, 5.6, 5.9] },
          { label: 'Ferritin', val: '14', unit: 'ng/mL', delta: '↓ 8', color: '#DC2626', d: [45, 32, 18, 14] },
          { label: 'Vitamin D', val: '22', unit: 'ng/mL', delta: '↓ 6', color: '#DC2626', d: [42, 35, 28, 22] },
        ].map(c => (
          <div key={c.label} className="rounded-lg border border-neutral-200/80 p-2.5">
            <div className="text-[9px] text-neutral-400" style={{ fontFamily: 'var(--font-body)' }}>{c.label}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[18px] font-medium tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{c.val}</span>
              <span className="text-[8px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{c.unit}</span>
            </div>
            <div className="mt-1.5 flex items-end justify-between">
              <span className="text-[8px] font-medium" style={{ fontFamily: 'var(--font-mono)', color: c.color }}>{c.delta}</span>
              <Spark data={c.d} color={c.color} w={44} h={14} />
            </div>
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="grid grid-cols-[1.6fr_0.9fr_1fr_0.7fr_0.8fr] gap-2 border-t border-b border-neutral-100 bg-neutral-50/80 px-4 py-1.5">
        {['Metric', 'Value', 'Reference', 'Status', 'Trend'].map(h => (
          <div key={h} className="text-[8px] font-semibold uppercase tracking-[0.06em] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r.metric} className={`grid grid-cols-[1.6fr_0.9fr_1fr_0.7fr_0.8fr] items-center gap-2 px-4 py-2 ${i < rows.length - 1 ? 'border-b border-neutral-100/80' : ''}`}>
          <div className="text-[10px] font-medium text-neutral-800" style={{ fontFamily: 'var(--font-body)' }}>{r.metric}</div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[11px] font-semibold tabular-nums" style={{ fontFamily: 'var(--font-mono)', color: r.st === 'normal' ? '#141414' : sc[r.st] }}>{r.val}</span>
            <span className="text-[8px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{r.unit}</span>
          </div>
          <div className="text-[9px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{r.range}</div>
          <span className="inline-flex w-fit items-center gap-[3px] rounded-full px-1.5 py-[2px] text-[8px] font-medium" style={{ backgroundColor: sb[r.st], color: sc[r.st], border: `1px solid ${sbo[r.st]}` }}>
            <span className="size-[5px] rounded-full" style={{ backgroundColor: sc[r.st] }} />{sl[r.st]}
          </span>
          <div className="flex justify-end"><Spark data={r.trend} color={sc[r.st]!} w={52} h={16} /></div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F7' }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/50" style={{ backgroundColor: 'rgba(250,249,247,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 h-12">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md" style={{ background: 'linear-gradient(135deg, #3162FF, #1D3DB3)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.5 3 4 6 4 9.5c0 2.5 1.5 4.5 3.5 5.5L6 21l3-2 3 2 3-2 3 2-1.5-6c2-1 3.5-3 3.5-5.5C21 6 17.5 3 12 3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="text-[14px] font-semibold text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>OpenVitals</span>
            </Link>
            <nav className="hidden md:flex items-center gap-5">
              {['Features', 'Docs', 'Pricing', 'Open Source'].map(l => (
                <span key={l} className="text-[13px] text-neutral-500 hover:text-neutral-800 cursor-pointer transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{l}</span>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[13px] text-neutral-600 hover:text-neutral-900 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>Sign in</Link>
            <Link href="/register" className="rounded-md bg-neutral-900 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-neutral-800 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>Get started</Link>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1120px] px-6 pt-16 md:pt-20">
        <div className="max-w-2xl">
          <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15] tracking-[-0.025em] text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
            Built to make your health data{' '}<em className="text-accent-600" style={{ fontStyle: 'italic' }}>extraordinarily</em>{' '}clear, OpenVitals is the best way to understand your records.
          </h1>
        </div>
        <div className="mt-7 flex items-center gap-3">
          <Link href="/register" className="rounded-md bg-neutral-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-neutral-800 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
            Get started for free
          </Link>
          <a href="https://github.com/openvitals/openvitals" className="rounded-md px-4 py-2 text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
            View on GitHub →
          </a>
        </div>
      </section>

      {/* ── HERO PRODUCT UI (live components over placeholder image) */}
      <section className="mx-auto max-w-[1020px] px-6 pt-12 pb-16">
        <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 12px 48px rgba(0,0,0,0.04)' }}>
          {/* Background placeholder image */}
          <div className="absolute inset-0 bg-neutral-200" style={{
            backgroundImage: 'linear-gradient(135deg, #C9D6C3 0%, #D4C9A8 30%, #DDD5C0 60%, #C4CFC0 100%)',
          }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[13px] text-neutral-400/60" style={{ fontFamily: 'var(--font-mono)' }}>landscape placeholder</span>
            </div>
          </div>
          {/* Floating UI panels on top */}
          <div className="relative z-10 p-6 md:p-8 pt-10 md:pt-12">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────────── */}
      <section className="border-t border-neutral-200/50 py-7">
        <p className="text-center text-[12px] text-neutral-400 mb-4" style={{ fontFamily: 'var(--font-body)' }}>Parses lab reports from the most common providers</p>
        <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap px-6">
          {['Quest Diagnostics', 'LabCorp', 'Mayo Clinic', 'Cleveland Clinic', 'Kaiser', 'Any PDF'].map(name => (
            <span key={name} className="text-[13px] font-semibold text-neutral-800 opacity-30 whitespace-nowrap" style={{ fontFamily: 'var(--font-body)', letterSpacing: '-0.01em' }}>{name}</span>
          ))}
        </div>
      </section>

      {/* ── FEATURE 1: AI parsing (text left, image right) ── */}
      <section className="border-t border-neutral-200/50">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-16">
          <div>
            <h2 className="text-[24px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.25]" style={{ fontFamily: 'var(--font-display)' }}>
              Upload a PDF,<br />get structured data
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
              Accelerate understanding by handing off messy lab reports to OpenVitals. AI classifies, extracts, and normalizes — you focus on the results.
            </p>
            <Link href="/register" className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent-600 hover:text-accent-700 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
              Learn about ingestion →
            </Link>
          </div>
          {/* Live UI: import job status cards over placeholder bg */}
          <div className="relative rounded-xl overflow-hidden" style={{ boxShadow: '0 4px_24px rgba(0,0,0,0.06)' }}>
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(160deg, #E8E4DB 0%, #D8D4C8 100%)' }} />
            <div className="relative z-10 p-5 space-y-2.5">
              {[
                { file: 'quest_labs_mar2026.pdf', type: 'Lab report', status: 'Completed', conf: '0.96', records: '18', color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
                { file: 'physical_notes.pdf', type: 'Encounter note', status: 'Parsing...', conf: '0.84', records: '—', color: '#3162FF', bg: '#EEF1FF', border: '#D6DCFF' },
                { file: 'dental_xray_summary.pdf', type: 'Dental record', status: 'Needs review', conf: '0.62', records: '7', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
              ].map(r => (
                <div key={r.file} className="flex items-center justify-between rounded-lg border border-neutral-200/80 bg-white px-4 py-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div>
                    <div className="text-[12px] font-medium text-neutral-800" style={{ fontFamily: 'var(--font-body)' }}>{r.file}</div>
                    <div className="mt-0.5 text-[10px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{r.type}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] tabular-nums text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{r.conf}</span>
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-[9px] font-medium" style={{ backgroundColor: r.bg, color: r.color, border: `1px solid ${r.border}` }}>
                      <span className="size-[5px] rounded-full" style={{ backgroundColor: r.color }} />{r.status}
                    </span>
                    <span className="text-[11px] font-semibold text-accent-600 tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>{r.records}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 2: Provenance (image left, text right) ── */}
      <section className="border-t border-neutral-200/50" style={{ backgroundColor: '#F5F4F1' }}>
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-16">
          <PlaceholderImage label="Provenance chain screenshot" aspect="4/3" className="shadow-[0_4px_24px_rgba(0,0,0,0.06)]" />
          <div>
            <h2 className="text-[24px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.25]" style={{ fontFamily: 'var(--font-display)' }}>
              Every value traces back to its source
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
              Click any observation and see the full chain: source PDF, parser version, LOINC code, confidence score. No black boxes.
            </p>
            <Link href="/register" className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent-600 hover:text-accent-700 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
              Learn about provenance →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURE 3: AI Chat (centered large screenshot) ── */}
      <section className="border-t border-neutral-200/50">
        <div className="mx-auto max-w-[1120px] px-6 py-20">
          {/* Live AI chat UI over placeholder background */}
          <div className="relative mx-auto max-w-[750px] rounded-xl overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(145deg, #DDD8CE 0%, #E2DDD3 50%, #D8D5CB 100%)' }} />
            <div className="relative z-10 p-5 md:p-6">
              {/* Chat UI */}
              <div className="rounded-lg border border-neutral-200/80 bg-white overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex justify-end">
                    <div className="max-w-[70%] rounded-[12px_12px_4px_12px] bg-accent-500 px-3 py-2 text-[11px] leading-relaxed text-white" style={{ fontFamily: 'var(--font-body)' }}>
                      How have my lipid panel results changed over the last year?
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #3162FF, #1D3DB3)' }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.5 3 4 6 4 9.5c0 2.5 1.5 4.5 3.5 5.5L6 21l3-2 3 2 3-2 3 2-1.5-6c2-1 3.5-3 3.5-5.5C21 6 17.5 3 12 3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[7px] font-semibold uppercase tracking-[0.06em] text-accent-500" style={{ fontFamily: 'var(--font-mono)' }}>OpenVitals AI</span>
                      <div className="rounded-[4px_12px_12px_12px] border border-neutral-200 bg-white px-3 py-2 text-[11px] leading-[1.6] text-neutral-700" style={{ fontFamily: 'var(--font-body)' }}>
                        Your lipid panel shows meaningful improvement. LDL dropped from 142 to <strong>98 mg/dL</strong> — now within optimal range. However, triglycerides trended up to <strong>162 mg/dL</strong>.
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {['◎ 6 observations', '◷ Mar 2025–2026', '⟐ Quest + LabCorp'].map(p => (
                          <span key={p} className="rounded bg-secondary-50 border border-secondary-200 px-1.5 py-0.5 text-[7px] text-neutral-500" style={{ fontFamily: 'var(--font-mono)' }}>{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Input */}
                <div className="border-t border-neutral-100 px-3 py-2 flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-neutral-50 px-3 py-1.5">
                    <span className="text-[10px] text-neutral-400" style={{ fontFamily: 'var(--font-body)' }}>Ask about your health data...</span>
                  </div>
                  <div className="flex size-6 items-center justify-center rounded-md" style={{ background: 'linear-gradient(135deg, #3162FF, #2750D9)' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h2 className="text-[24px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.25]" style={{ fontFamily: 'var(--font-display)' }}>
                AI that only speaks from your records
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
                Ask questions about your health data and get answers grounded in your actual observations. Every response cites the data it used.
              </p>
              <Link href="/register" className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent-600 hover:text-accent-700 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                Learn about AI chat →
              </Link>
            </div>
            <div>
              <h2 className="text-[24px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.25]" style={{ fontFamily: 'var(--font-display)' }}>
                Works across all your sources
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
                AI context bundles pull observations from Quest, LabCorp, manual entries, and wearable exports. One unified view across all your health data.
              </p>
              <Link href="/register" className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent-600 hover:text-accent-700 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                Learn about context bundling →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 4: Sharing (text left, image right) ───── */}
      <section className="border-t border-neutral-200/50" style={{ backgroundColor: '#F5F4F1' }}>
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-16">
          <div>
            <h2 className="text-[24px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.25]" style={{ fontFamily: 'var(--font-display)' }}>
              Share exactly what your doctor needs
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
              Create scoped shares by category, time range, and access level. Your cardiologist sees lipids and vitals. Your nutritionist sees diet-related labs. Nobody sees what they shouldn&apos;t.
            </p>
            <Link href="/register" className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent-600 hover:text-accent-700 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
              Explore data sharing →
            </Link>
          </div>
          <PlaceholderImage label="Sharing UI screenshot" aspect="4/3" className="shadow-[0_4px_24px_rgba(0,0,0,0.06)]" />
        </div>
      </section>

      {/* ── FEATURE 5: Autocomplete-style (image left, text right) */}
      <section className="border-t border-neutral-200/50">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-16">
          <PlaceholderImage label="Medication tracking screenshot" aspect="4/3" className="shadow-[0_4px_24px_rgba(0,0,0,0.06)]" />
          <div>
            <h2 className="text-[24px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.25]" style={{ fontFamily: 'var(--font-display)' }}>
              Medication tracking with{' '}<em className="text-accent-600" style={{ fontStyle: 'italic' }}>full context</em>
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
              Active medications, supplements, dosage, frequency, and daily adherence — all linked to your health timeline and lab results.
            </p>
            <Link href="/register" className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent-600 hover:text-accent-700 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
              Learn about medications →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="border-t border-neutral-200/50" style={{ backgroundColor: '#F5F4F1' }}>
        <div className="mx-auto max-w-[1120px] px-6 py-20">
          <h2 className="text-center text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium tracking-[-0.025em] text-neutral-900 leading-[1.2]" style={{ fontFamily: 'var(--font-display)' }}>
            The new way to own your health data.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { quote: 'I finally understand my lab results without having to Google every acronym. The provenance chain is brilliant — I can show my doctor exactly what changed.', name: 'Sarah M.', role: 'Patient, annual lab tracking' },
              { quote: 'The scoped sharing is exactly what I needed. My endocrinologist only sees thyroid panels and nothing else. Privacy should always work this way.', name: 'James R.', role: 'Managing hypothyroidism' },
              { quote: "Open source health data infrastructure is long overdue. The plugin SDK means the community can add parsers for any lab format.", name: 'Dr. Priya K.', role: 'Health tech researcher' },
              { quote: 'Being able to trace every value back to the source PDF with one click is incredible. No more wondering where a number came from.', name: 'Michael C.', role: 'Tracking lipid trends' },
              { quote: 'The AI chat is grounded in my actual records — not generic medical knowledge. It cited specific observations from my Quest results.', name: 'Elena V.', role: 'Managing chronic conditions' },
              { quote: "I've used five different health apps. This is the first one where I feel like I actually own my data. The export and provenance features are unmatched.", name: 'David L.', role: 'Quantified self enthusiast' },
            ].map((t, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 bg-white p-5">
                <p className="text-[13px] leading-[1.65] text-neutral-600" style={{ fontFamily: 'var(--font-body)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-semibold text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-neutral-800" style={{ fontFamily: 'var(--font-body)' }}>{t.name}</div>
                    <div className="text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-body)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAY ON THE FRONTIER (feature cards) ────────────── */}
      <section className="border-t border-neutral-200/50">
        <div className="mx-auto max-w-[1120px] px-6 py-20">
          <h3 className="text-[13px] font-medium text-neutral-400 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Stay on the frontier</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
            {[
              { title: 'Use the right parser for every lab', desc: 'Quest, LabCorp, hospital systems, and CSVs. The pipeline classifies, extracts, normalizes, and maps to standard codes.', label: 'Ingestion' },
              { title: 'Complete medication understanding', desc: 'Track medications, supplements, dosage, adherence, and interactions — all linked to your health timeline.', label: 'Medications' },
              { title: 'Developer-first plugin ecosystem', desc: 'Build custom parsers, views, and analyzers with the SDK. Register new metrics, add data sources, publish to npm.', label: 'Plugins' },
            ].map(c => (
              <div key={c.title} className="rounded-xl border border-neutral-200 bg-white p-5">
                <div className="mb-1 text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{c.label}</div>
                <h4 className="text-[14px] font-medium text-neutral-900 tracking-[-0.01em] leading-snug" style={{ fontFamily: 'var(--font-body)' }}>{c.title}</h4>
                <p className="mt-2 text-[13px] leading-[1.6] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHANGELOG ───────────────────────────────────────── */}
      <section className="border-t border-neutral-200/50" style={{ backgroundColor: '#F5F4F1' }}>
        <div className="mx-auto max-w-[1120px] px-6 py-16">
          <h3 className="text-[22px] font-medium tracking-[-0.02em] text-neutral-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>Changelog</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { date: 'Mar 15, 2026', title: 'AI chat with provenance', ver: 'v0.1.4' },
              { date: 'Mar 10, 2026', title: 'Medication tracking', ver: 'v0.1.3' },
              { date: 'Mar 4, 2026', title: 'Scoped data sharing', ver: 'v0.1.2' },
              { date: 'Mar 1, 2026', title: 'Lab PDF ingestion pipeline', ver: 'v0.1.0' },
            ].map(e => (
              <div key={e.ver} className="rounded-lg border border-neutral-200 bg-white p-4">
                <div className="text-[10px] text-neutral-400 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{e.date}</div>
                <div className="text-[13px] font-medium text-neutral-800 leading-snug" style={{ fontFamily: 'var(--font-body)' }}>{e.title}</div>
              </div>
            ))}
          </div>
          <Link href="/register" className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-accent-600 hover:text-accent-700 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
            See what&apos;s new in OpenVitals →
          </Link>
        </div>
      </section>

      {/* ── MISSION / TEAM CTA ──────────────────────────────── */}
      <section className="border-t border-neutral-200/50">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 px-6 py-20 md:items-end md:gap-16">
          <div>
            <h2 className="text-[22px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.3]" style={{ fontFamily: 'var(--font-display)' }}>
              OpenVitals is an open-source project focused on giving people control over their health data.
            </h2>
            <Link href="https://github.com/openvitals/openvitals" className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent-600 hover:text-accent-700 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
              Contribute on GitHub →
            </Link>
          </div>
          <PlaceholderImage label="Team / community image" aspect="16/9" />
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="border-t border-neutral-200/50" style={{ backgroundColor: '#F5F4F1' }}>
        <div className="mx-auto max-w-[1120px] px-6 py-16">
          <h2 className="text-[clamp(1.6rem,3.5vw,2rem)] font-medium tracking-[-0.025em] text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
            Try OpenVitals now.
          </h2>
          <div className="mt-5 flex items-center gap-3">
            <Link href="/register" className="rounded-md bg-neutral-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-neutral-800 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
              Get started for free
            </Link>
            <a href="https://github.com/openvitals/openvitals" className="rounded-md px-4 py-2 text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
              View on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-neutral-200/50">
        <div className="mx-auto max-w-[1120px] px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex size-5 items-center justify-center rounded" style={{ background: 'linear-gradient(135deg, #3162FF, #1D3DB3)' }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.5 3 4 6 4 9.5c0 2.5 1.5 4.5 3.5 5.5L6 21l3-2 3 2 3-2 3 2-1.5-6c2-1 3.5-3 3.5-5.5C21 6 17.5 3 12 3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-[12px] font-medium text-neutral-700" style={{ fontFamily: 'var(--font-display)' }}>OpenVitals</span>
              </div>
              <p className="text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>Your data, your control.</p>
            </div>
            {[
              { title: 'Product', links: ['Labs', 'Medications', 'AI Chat', 'Sharing', 'Uploads'] },
              { title: 'Resources', links: ['Documentation', 'Plugin SDK', 'API Reference', 'Changelog'] },
              { title: 'Company', links: ['About', 'Open Source', 'GitHub', 'Blog'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
            ].map(col => (
              <div key={col.title}>
                <div className="text-[11px] font-medium text-neutral-800 mb-3" style={{ fontFamily: 'var(--font-body)' }}>{col.title}</div>
                <div className="space-y-2">
                  {col.links.map(l => (
                    <div key={l} className="text-[12px] text-neutral-500 hover:text-neutral-700 cursor-pointer transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-neutral-200/50 pt-6">
            <span className="text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>© 2026 OpenVitals</span>
            <span className="text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>v0.1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
