'use client';

import { trpc } from '@/lib/trpc/client';
import { TitleActionHeader } from '@/components/title-action-header';
import { MetricCard } from '@/components/health/metric-card';
import { LabResultRow, LabResultHeader } from '@/components/health/lab-result-row';
import { ProvenancePill } from '@/components/health/provenance-pill';
import { AnimatedEmptyState } from '@/components/animated-empty-state';
import { deriveStatus, formatRange, formatRelativeTime } from '@/lib/health-utils';
import { formatDate } from '@/lib/utils';
import { TestTubes, Droplets, Activity, Microscope, FlaskConical, Dna } from 'lucide-react';

const emptyIcons = [TestTubes, Droplets, Activity, Microscope, FlaskConical, Dna];

export default function LabsPage() {
  const { data, isLoading } = trpc.observations.list.useQuery({ limit: 200 });
  const items = data?.items ?? [];

  if (isLoading) {
    return (
      <div>
        <TitleActionHeader title="Lab Results" subtitle="Loading..." />
        <div className="mt-7 mb-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl border border-neutral-200 bg-neutral-50" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-xl border border-neutral-200 bg-neutral-50" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <TitleActionHeader title="Lab Results" subtitle="View and track your lab values over time." />
        <div className="mt-7">
          <AnimatedEmptyState
            title="No lab results yet"
            description="Upload your first lab report to see your results here."
            cardIcon={({ index }) => emptyIcons[index % emptyIcons.length]!}
            learnMoreHref="/uploads"
            learnMoreClassName="border-accent-200 text-accent-600 hover:bg-accent-50"
          />
        </div>
      </div>
    );
  }

  // Group observations by metricCode for MetricCards
  const byMetric = new Map<string, typeof items>();
  for (const item of items) {
    const existing = byMetric.get(item.metricCode) ?? [];
    existing.push(item);
    byMetric.set(item.metricCode, existing);
  }

  // Build metric cards from unique metrics (top 4)
  const metricCards = Array.from(byMetric.entries()).slice(0, 4).map(([code, obs]) => {
    const sorted = [...obs].sort((a, b) => new Date(b.observedAt).getTime() - new Date(a.observedAt).getTime());
    const latest = sorted[0]!;
    const previous = sorted[1];
    const sparkData = sorted.slice(0, 6).reverse().map((o) => o.valueNumeric ?? 0);
    const deltaVal = previous?.valueNumeric != null && latest.valueNumeric != null
      ? Math.abs(latest.valueNumeric - previous.valueNumeric)
      : 0;
    const deltaDir = previous?.valueNumeric != null && latest.valueNumeric != null
      ? latest.valueNumeric > previous.valueNumeric ? 'up' as const
        : latest.valueNumeric < previous.valueNumeric ? 'down' as const
        : 'stable' as const
      : 'stable' as const;

    return {
      title: code.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      value: latest.valueNumeric != null ? String(latest.valueNumeric) : latest.valueText ?? '—',
      unit: latest.unit ?? '',
      delta: deltaVal ? `${deltaVal % 1 === 0 ? deltaVal : deltaVal.toFixed(1)} from last` : 'No prior',
      deltaDirection: deltaDir,
      sparkData: sparkData.length >= 2 ? sparkData : [0, ...sparkData],
      status: deriveStatus(latest),
    };
  });

  // Subtitle
  const latestDate = items[0] ? formatDate(items[0].observedAt) : '';
  const subtitle = `${items.length} results${latestDate ? ` · Latest from ${latestDate}` : ''}`;

  return (
    <div>
      <TitleActionHeader title="Lab Results" subtitle={subtitle} />

      {metricCards.length > 0 && (
        <div className="mt-7 mb-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((mc) => (
            <MetricCard key={mc.title} {...mc} />
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <LabResultHeader />
        {items.map((item) => {
          const status = deriveStatus(item);
          const sparkObs = byMetric.get(item.metricCode) ?? [];
          const trend = [...sparkObs]
            .sort((a, b) => new Date(a.observedAt).getTime() - new Date(b.observedAt).getTime())
            .slice(-6)
            .map((o) => o.valueNumeric ?? 0);

          return (
            <LabResultRow
              key={item.id}
              metric={item.metricCode.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              value={item.valueNumeric != null ? String(item.valueNumeric) : item.valueText ?? '—'}
              unit={item.unit ?? ''}
              range={formatRange(item.referenceRangeLow, item.referenceRangeHigh, item.unit)}
              trend={trend.length >= 2 ? trend : [0, ...trend]}
              status={status}
              date={formatDate(item.observedAt)}
            />
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <ProvenancePill label={`${items.length} results shown`} icon="⊟" />
      </div>
    </div>
  );
}
