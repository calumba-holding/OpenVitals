import { StatusBadge, type HealthStatus } from './status-badge';

interface ImportJobRowProps {
  fileName: string;
  status: 'completed' | 'parsing' | 'review_needed' | 'failed';
  docType: string;
  confidence: string;
  extractions: string;
  time: string;
}

const statusMap: Record<string, { label: string; badge: HealthStatus }> = {
  completed: { label: 'Completed', badge: 'normal' },
  parsing: { label: 'Parsing...', badge: 'info' },
  review_needed: { label: 'Needs review', badge: 'warning' },
  failed: { label: 'Failed', badge: 'critical' },
};

export function ImportJobRow({ fileName, status, docType, confidence, extractions, time }: ImportJobRowProps) {
  const s = statusMap[status] ?? statusMap.completed!;
  return (
    <div className="grid grid-cols-[1.8fr_1fr_0.8fr_0.6fr_0.8fr] items-center gap-3 border-b border-neutral-100 px-5 py-3.5">
      <div>
        <div className="text-sm font-medium text-neutral-900" style={{ fontFamily: 'var(--font-body)' }}>
          {fileName}
        </div>
        <div className="mt-0.5 text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>
          {time}
        </div>
      </div>
      <div className="text-xs text-neutral-600" style={{ fontFamily: 'var(--font-mono)' }}>
        {docType}
      </div>
      <StatusBadge status={s.badge} label={s.label} />
      <div className="text-xs text-neutral-500" style={{ fontFamily: 'var(--font-mono)' }}>
        {confidence}
      </div>
      <div className="text-right text-[13px] font-semibold text-accent-600" style={{ fontFamily: 'var(--font-mono)' }}>
        {extractions} records
      </div>
    </div>
  );
}

export function ImportJobHeader() {
  return (
    <div className="grid grid-cols-[1.8fr_1fr_0.8fr_0.6fr_0.8fr] gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-2.5">
      {['File', 'Document type', 'Status', 'Confidence', 'Extracted'].map((h) => (
        <div
          key={h}
          className="text-[11px] font-semibold uppercase tracking-[0.04em] text-neutral-400"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {h}
        </div>
      ))}
    </div>
  );
}
