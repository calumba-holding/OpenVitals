'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [timezone, setTimezone] = useState('UTC');
  const [units, setUnits] = useState('metric');

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[26px] font-medium tracking-[-0.025em] text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
          Settings
        </h1>
        <p className="mt-1 text-sm text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
          Manage your preferences.
        </p>
      </div>

      <div className="max-w-lg rounded-xl border border-neutral-200 bg-white p-6 space-y-6">
        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-neutral-700" style={{ fontFamily: 'var(--font-body)' }}>
            Timezone
          </label>
          <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-accent-300 focus:outline-none focus:ring-1 focus:ring-accent-300">
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern</option>
            <option value="America/Chicago">Central</option>
            <option value="America/Denver">Mountain</option>
            <option value="America/Los_Angeles">Pacific</option>
          </select>
        </div>
        <div>
          <label htmlFor="units" className="block text-sm font-medium text-neutral-700" style={{ fontFamily: 'var(--font-body)' }}>
            Preferred Units
          </label>
          <select id="units" value={units} onChange={(e) => setUnits(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-accent-300 focus:outline-none focus:ring-1 focus:ring-accent-300">
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </div>
        <button className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700 transition-colors">
          Save preferences
        </button>
      </div>
    </div>
  );
}
