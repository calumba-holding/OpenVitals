import type { AppEvent } from '../types';

export function auditLogHandler(event: AppEvent): void {
  // TODO: Write to audit_events table via @openvitals/database
  // For now, log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[audit] ${event.type}`, {
      userId: event.userId,
      timestamp: event.timestamp,
      payload: event.payload,
    });
  }
}
