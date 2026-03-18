import { MetricCard } from '@/components/health/metric-card';
import { LabResultRow, LabResultHeader } from '@/components/health/lab-result-row';
import { ProvenancePill } from '@/components/health/provenance-pill';

export default function LabsPage() {
  return (
    <div>
      <div className="mb-7">
        <h1
          className="text-[26px] font-medium tracking-[-0.025em] text-neutral-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Lab Results
        </h1>
        <p className="mt-1 text-sm text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
          5 new results from Quest Diagnostics &middot; March 10, 2026
        </p>
      </div>

      {/* Metric summary cards */}
      <div className="mb-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="LDL Cholesterol" value="98" unit="mg/dL" delta="14 from last" deltaDirection="down" sparkData={[142, 130, 125, 118, 112, 98]} status="normal" />
        <MetricCard title="Resting HR" value="62" unit="bpm" delta="3 from last" deltaDirection="down" sparkData={[68, 67, 65, 64, 63, 62]} status="normal" />
        <MetricCard title="HbA1c" value="5.9" unit="%" delta="0.3 from last" deltaDirection="up" sparkData={[5.2, 5.3, 5.4, 5.5, 5.6, 5.9]} status="warning" />
        <MetricCard title="Vitamin D" value="22" unit="ng/mL" delta="8 from last" deltaDirection="down" sparkData={[42, 38, 35, 30, 28, 22]} status="critical" />
      </div>

      {/* Lab results table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <LabResultHeader />
        <LabResultRow metric="LDL Cholesterol" value="98" unit="mg/dL" range="0 – 100 mg/dL" trend={[142, 130, 125, 118, 112, 98]} status="normal" date="Mar 10, 2026" />
        <LabResultRow metric="HDL Cholesterol" value="58" unit="mg/dL" range="> 40 mg/dL" trend={[52, 54, 55, 56, 57, 58]} status="normal" date="Mar 10, 2026" />
        <LabResultRow metric="Triglycerides" value="162" unit="mg/dL" range="< 150 mg/dL" trend={[128, 135, 142, 148, 155, 162]} status="warning" date="Mar 10, 2026" />
        <LabResultRow metric="HbA1c" value="5.9" unit="%" range="< 5.7 %" trend={[5.2, 5.3, 5.4, 5.5, 5.6, 5.9]} status="warning" date="Mar 10, 2026" />
        <LabResultRow metric="Ferritin" value="14" unit="ng/mL" range="20 – 300 ng/mL" trend={[45, 38, 32, 25, 18, 14]} status="critical" date="Mar 10, 2026" />
      </div>

      {/* Provenance footer */}
      <div className="mt-4 flex flex-wrap gap-2">
        <ProvenancePill label="Quest Diagnostics" icon="◎" />
        <ProvenancePill label="lab-pdf-parser v2.1" icon="⚙" />
        <ProvenancePill label="Imported 2 min ago" icon="◷" />
        <ProvenancePill label="5 of 18 shown" icon="⊟" />
      </div>
    </div>
  );
}
