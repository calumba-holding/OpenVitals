import { MedicationCard } from '@/components/health/medication-card';

export default function MedicationsPage() {
  return (
    <div>
      <div className="mb-7">
        <h1
          className="text-[26px] font-medium tracking-[-0.025em] text-neutral-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Medications
        </h1>
        <p className="mt-1 text-sm text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
          Track your medications, supplements, and adherence.
        </p>
      </div>

      <div className="mb-6">
        <h2
          className="mb-4 text-lg font-medium tracking-[-0.015em] text-neutral-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Active
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MedicationCard name="Atorvastatin" dose="20mg" frequency="Once daily" indication="Cholesterol management" status="active" startDate="Jan 2025" />
          <MedicationCard name="Vitamin D3" dose="5000 IU" frequency="Once daily" indication="Vitamin D deficiency" status="active" startDate="Mar 2026" />
        </div>
      </div>

      <div>
        <h2
          className="mb-4 text-lg font-medium tracking-[-0.015em] text-neutral-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Discontinued
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MedicationCard name="Metformin" dose="500mg" frequency="Twice daily" indication="Blood sugar management" status="discontinued" startDate="Jun 2024" />
        </div>
      </div>
    </div>
  );
}
