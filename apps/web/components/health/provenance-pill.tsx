import { cn } from '@/lib/utils';

interface ProvenancePillProps {
  label: string;
  icon: string;
  className?: string;
}

export function ProvenancePill({ label, icon, className }: ProvenancePillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[5px] whitespace-nowrap rounded-md border px-2.5 py-1 text-[11px] tracking-[0.01em] text-neutral-600',
        'bg-secondary-50 border-secondary-200',
        className
      )}
    >
      <span className="text-xs leading-none">{icon}</span>
      {label}
    </span>
  );
}
