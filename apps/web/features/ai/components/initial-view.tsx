'use client';

import { ChatInput } from './chat-input';

interface InitialViewProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const suggestions = [
  'How have my lipid results changed this year?',
  'Summarize my most recent lab results',
  'Are any of my medications interacting?',
  'What trends should I discuss with my doctor?',
];

export function InitialView({ input, onInputChange, onSubmit, onSuggestionClick }: InitialViewProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <div
            className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #3162FF, #1D3DB3)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C7.5 3 4 6 4 9.5c0 2.5 1.5 4.5 3.5 5.5L6 21l3-2 3 2 3-2 3 2-1.5-6c2-1 3.5-3 3.5-5.5C21 6 17.5 3 12 3z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 10h.01M15 10h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9.5 13.5c.8.8 2.2 1 3 .5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-[28px] font-medium tracking-[-0.025em] text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
            {getGreeting()}
          </h1>
          <p className="mt-2 text-[15px] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
            Ask me anything about your health records.
          </p>
        </div>

        <ChatInput value={input} onChange={onInputChange} onSubmit={onSubmit} autoFocus className="px-0 pb-0" />

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSuggestionClick(s)}
              className="rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-[12px] text-neutral-600 transition-all hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700 active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
