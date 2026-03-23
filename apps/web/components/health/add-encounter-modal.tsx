'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Template } from '@/components/modal/template';
import { Button } from '@/components/button';
import { useModal } from '@/components/modal/provider';
import { trpc } from '@/lib/trpc/client';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full border border-neutral-200 bg-white px-3 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-100 transition-all';

const labelClass = 'block text-[13px] font-medium text-neutral-700 mb-1.5 font-display';

const encounterTypes = [
  { value: 'checkup', label: 'Checkup' },
  { value: 'specialist', label: 'Specialist' },
  { value: 'urgent_care', label: 'Urgent Care' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'telehealth', label: 'Telehealth' },
  { value: 'lab_visit', label: 'Lab Visit' },
  { value: 'imaging', label: 'Imaging' },
  { value: 'dental', label: 'Dental' },
  { value: 'therapy', label: 'Therapy' },
  { value: 'other', label: 'Other' },
] as const;

type EncounterType = (typeof encounterTypes)[number]['value'];

export function AddEncounterModal() {
  const modal = useModal();
  const utils = trpc.useUtils();

  const [type, setType] = useState<EncounterType>('checkup');
  const [provider, setProvider] = useState('');
  const [facility, setFacility] = useState('');
  const [encounterDate, setEncounterDate] = useState('');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [summary, setSummary] = useState('');

  const createMutation = trpc.encounters.create.useMutation({
    onSuccess: () => {
      utils.encounters.list.invalidate();
      modal.hide();
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!encounterDate) return;

    createMutation.mutate({
      type,
      provider: provider.trim() || undefined,
      facility: facility.trim() || undefined,
      encounterDate,
      chiefComplaint: chiefComplaint.trim() || undefined,
      summary: summary.trim() || undefined,
    });
  }

  const fieldDelay = 0.03;

  return (
    <Template
      title="Log encounter"
      description="Record a visit to a healthcare provider."
      footer={
        <div className="flex flex-1 items-center justify-between gap-x-3">
          <Button onClick={() => modal.hide()} variant="ghost" text="Cancel" />
          <Button
            onClick={handleSubmit}
            text="Log encounter"
            loading={createMutation.isPending}
            disabled={!encounterDate}
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: fieldDelay * 0 }}
        >
          <label className={labelClass}>Type</label>
          <div className="grid grid-cols-3 gap-1 border border-neutral-200 bg-neutral-50 p-1">
            {encounterTypes.slice(0, 6).map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className={cn(
                  'px-2 py-1.5 text-[12px] font-medium transition-all',
                  type === t.value
                    ? 'bg-white text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-700',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: fieldDelay * 1 }}
        >
          <label className={labelClass}>
            Date <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            className={inputClass}
            value={encounterDate}
            onChange={(e) => setEncounterDate(e.target.value)}
            autoFocus
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: fieldDelay * 2 }}
          className="grid grid-cols-2 gap-3"
        >
          <div>
            <label className={labelClass}>Provider</label>
            <input
              type="text"
              className={inputClass}
              placeholder="e.g. Dr. Smith"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Facility</label>
            <input
              type="text"
              className={inputClass}
              placeholder="e.g. City Medical Center"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: fieldDelay * 3 }}
        >
          <label className={labelClass}>Reason for visit</label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Annual physical"
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: fieldDelay * 4 }}
        >
          <label className={labelClass}>Summary / Notes</label>
          <textarea
            className={cn(inputClass, 'resize-none')}
            rows={3}
            placeholder="Key findings, recommendations, next steps..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </motion.div>
      </form>
    </Template>
  );
}
