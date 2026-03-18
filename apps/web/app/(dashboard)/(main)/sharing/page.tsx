import { ShareCard } from '@/components/health/share-card';

export default function SharingPage() {
  return (
    <div>
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-[26px] font-medium tracking-[-0.025em] text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
            Sharing
          </h1>
          <p className="mt-1 text-sm text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
            Share scoped slices of your health data with providers, family, or care team.
          </p>
        </div>
        <button className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700 transition-colors">
          Share my data
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ShareCard name="Dr. Martinez — Annual review" recipient="dr.martinez@clinic.com" categories={['Labs', 'Vitals', 'Medications', 'Conditions']} accessLevel="Full values" expiresIn="30 days" lastAccessed="2 hours ago" />
        <ShareCard name="Nutrition consult" recipient="Share link (copied)" categories={['Labs · Lipids', 'Body comp', 'Nutrition']} accessLevel="Trends only" expiresIn="7 days" lastAccessed="Not yet accessed" />
      </div>
    </div>
  );
}
