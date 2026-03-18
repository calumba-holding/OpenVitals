import { StatusBadge } from '@/components/health/status-badge';
import { ProvenancePill } from '@/components/health/provenance-pill';

export default function TimelinePage() {
  return (
    <div>
      <div className="mb-7">
        <h1
          className="text-[26px] font-medium tracking-[-0.025em] text-neutral-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Timeline
        </h1>
        <p className="mt-1 text-sm text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
          Your chronological health record feed.
        </p>
      </div>

      <div className="space-y-3">
        {[
          { date: 'Mar 10, 2026', title: 'Lab Results — Quest Diagnostics', desc: '18 observations extracted from lipid panel, metabolic panel, CBC', badge: { status: 'info' as const, label: '5 flagged' }, source: 'quest_labs_mar2026.pdf' },
          { date: 'Mar 8, 2026', title: 'Medication started — Vitamin D3', desc: '5000 IU once daily for vitamin D deficiency', badge: { status: 'normal' as const, label: 'Active' }, source: 'Manual entry' },
          { date: 'Feb 22, 2026', title: 'Lab Results — LabCorp', desc: '12 observations from comprehensive metabolic panel', badge: { status: 'normal' as const, label: 'All normal' }, source: 'labcorp_feb2026.pdf' },
        ].map((item, i) => (
          <div key={i} className="rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-accent-300 hover:shadow-[0_2px_12px_var(--color-accent-50)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[15px] font-semibold text-neutral-900" style={{ fontFamily: 'var(--font-body)' }}>
                  {item.title}
                </div>
                <div className="mt-1 text-[13px] leading-relaxed text-neutral-600" style={{ fontFamily: 'var(--font-body)' }}>
                  {item.desc}
                </div>
              </div>
              <StatusBadge status={item.badge.status} label={item.badge.label} />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{item.date}</span>
              <ProvenancePill label={item.source} icon="◎" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
