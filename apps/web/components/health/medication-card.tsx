import { StatusBadge } from './status-badge';

interface MedicationCardProps {
  name: string;
  dose: string;
  frequency: string;
  indication: string;
  status: 'active' | 'discontinued';
  startDate: string;
}

export function MedicationCard({ name, dose, frequency, indication, status, startDate }: MedicationCardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-accent-300 hover:shadow-[0_2px_12px_var(--color-accent-50)]">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="text-[15px] font-semibold text-neutral-900" style={{ fontFamily: 'var(--font-body)' }}>
            {name}
          </div>
          <div className="mt-0.5 text-xs text-neutral-500" style={{ fontFamily: 'var(--font-mono)' }}>
            {dose} &middot; {frequency}
          </div>
        </div>
        <StatusBadge
          status={status === 'active' ? 'normal' : 'neutral'}
          label={status === 'active' ? 'Active' : 'Discontinued'}
        />
      </div>
      <div className="mb-2.5 text-[13px] leading-relaxed text-neutral-600" style={{ fontFamily: 'var(--font-body)' }}>
        {indication}
      </div>
      <div className="text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>
        Started {startDate}
      </div>
    </div>
  );
}
