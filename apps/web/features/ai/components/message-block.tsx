import { cn } from '@/lib/utils';
import { ProvenancePill } from '@/components/health/provenance-pill';

export interface ChatMessageData {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ label: string; icon: string }>;
  artifactId?: string;
}

interface MessageBlockProps {
  message: ChatMessageData;
  onArtifactClick?: (id: string) => void;
}

export function MessageBlock({ message, onArtifactClick }: MessageBlockProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-3 px-4 py-4', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
          isUser ? 'bg-neutral-200 text-neutral-600' : 'text-white'
        )}
        style={!isUser ? { background: 'linear-gradient(135deg, #3162FF, #1D3DB3)' } : undefined}
      >
        {isUser ? 'U' : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C7.5 3 4 6 4 9.5c0 2.5 1.5 4.5 3.5 5.5L6 21l3-2 3 2 3-2 3 2-1.5-6c2-1 3.5-3 3.5-5.5C21 6 17.5 3 12 3z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      <div className={cn('flex max-w-[85%] flex-col gap-2', isUser ? 'items-end' : 'items-start')}>
        {!isUser && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-accent-500" style={{ fontFamily: 'var(--font-mono)' }}>
            OpenVitals AI
          </span>
        )}

        {/* Artifact card */}
        {!isUser && message.artifactId && (
          <button
            onClick={() => onArtifactClick?.(message.artifactId!)}
            className="flex w-full items-center gap-3 rounded-xl border border-accent-200 bg-accent-50 p-3.5 text-left transition-all hover:border-accent-300 hover:shadow-sm"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent-600">
                <path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-medium text-accent-800" style={{ fontFamily: 'var(--font-body)' }}>Health Insight Generated</div>
              <div className="text-[11px] text-accent-500" style={{ fontFamily: 'var(--font-mono)' }}>Click to view in panel &rarr;</div>
            </div>
          </button>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            'px-4 py-3',
            isUser
              ? 'rounded-[16px_16px_4px_16px] bg-accent-500 text-white'
              : 'rounded-[4px_16px_16px_16px] border border-neutral-200 bg-white text-neutral-800'
          )}
          style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, letterSpacing: '0.005em' }}
        >
          {message.content}
        </div>

        {/* Provenance sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.sources.map((s, i) => (
              <ProvenancePill key={i} label={s.label} icon={s.icon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
