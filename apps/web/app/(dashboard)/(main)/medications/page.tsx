'use client';

import { trpc } from '@/lib/trpc/client';
import { TitleActionHeader } from '@/components/title-action-header';
import { MedicationCard } from '@/components/health/medication-card';
import { AnimatedEmptyState } from '@/components/animated-empty-state';
import { formatDate } from '@/lib/utils';
import { Pill, Syringe, Tablets, Heart, ShieldCheck, Stethoscope } from 'lucide-react';

const emptyIcons = [Pill, Syringe, Tablets, Heart, ShieldCheck, Stethoscope];

export default function MedicationsPage() {
  const { data, isLoading } = trpc.medications.list.useQuery({});
  const items = data?.items ?? [];

  if (isLoading) {
    return (
      <div>
        <TitleActionHeader title="Medications" subtitle="Loading..." />
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl border border-neutral-200 bg-neutral-50" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <TitleActionHeader title="Medications" subtitle="Track your medications, supplements, and adherence." />
        <div className="mt-7">
          <AnimatedEmptyState
            title="No medications tracked yet"
            description="Add a medication to start tracking your prescriptions, supplements, and adherence."
            cardIcon={({ index }) => emptyIcons[index % emptyIcons.length]!}
          />
        </div>
      </div>
    );
  }

  const active = items.filter((m) => m.isActive);
  const discontinued = items.filter((m) => !m.isActive);

  return (
    <div>
      <TitleActionHeader title="Medications" subtitle="Track your medications, supplements, and adherence." />

      {active.length > 0 && (
        <div className="mt-7 mb-6">
          <h2 className="mb-4 text-lg font-medium tracking-[-0.015em] text-neutral-900 font-display">
            Active
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {active.map((med) => (
              <MedicationCard
                key={med.id}
                name={med.name}
                dose={med.dosage ?? '—'}
                frequency={med.frequency ?? '—'}
                indication={med.indication ?? '—'}
                status="active"
                startDate={med.startDate ? formatDate(med.startDate) : '—'}
              />
            ))}
          </div>
        </div>
      )}

      {discontinued.length > 0 && (
        <div className={active.length === 0 ? 'mt-7' : ''}>
          <h2 className="mb-4 text-lg font-medium tracking-[-0.015em] text-neutral-900 font-display">
            Discontinued
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {discontinued.map((med) => (
              <MedicationCard
                key={med.id}
                name={med.name}
                dose={med.dosage ?? '—'}
                frequency={med.frequency ?? '—'}
                indication={med.indication ?? '—'}
                status="discontinued"
                startDate={med.startDate ? formatDate(med.startDate) : '—'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
