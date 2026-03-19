import { cn } from '@/lib/utils';

export type HealthStatus = 'normal' | 'warning' | 'critical' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: HealthStatus;
  label: string;
  className?: string;
}

const statusStyles: Record<HealthStatus, { bg: string; text: string; border: string; dot: string }> = {
  normal: {
    bg: 'bg-[var(--color-health-normal-bg)]',
    text: 'text-[var(--color-health-normal)]',
    border: 'border-[var(--color-health-normal-border)]',
    dot: 'bg-[var(--color-health-normal)]',
  },
  warning: {
    bg: 'bg-[var(--color-health-warning-bg)]',
    text: 'text-[var(--color-health-warning)]',
    border: 'border-[var(--color-health-warning-border)]',
    dot: 'bg-[var(--color-health-warning)]',
  },
  critical: {
    bg: 'bg-[var(--color-health-critical-bg)]',
    text: 'text-[var(--color-health-critical)]',
    border: 'border-[var(--color-health-critical-border)]',
    dot: 'bg-[var(--color-health-critical)]',
  },
  info: {
    bg: 'bg-[var(--color-health-info-bg)]',
    text: 'text-[var(--color-health-info)]',
    border: 'border-[var(--color-health-info-border)]',
    dot: 'bg-[var(--color-health-info)]',
  },
  neutral: {
    bg: 'bg-neutral-100',
    text: 'text-neutral-600',
    border: 'border-neutral-200',
    dot: 'bg-neutral-400',
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const s = statusStyles[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[5px] rounded-full border px-2.5 py-[3px] text-xs font-medium tracking-[0.01em]',
        s.bg, s.text, s.border,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
      {label}
    </span>
  );
}
