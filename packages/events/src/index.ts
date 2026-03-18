export { eventBus } from './bus';
export * from './types';
export { auditLogHandler } from './handlers/audit-logger';

import { eventBus } from './bus';
import type { AppEvent } from './types';

export function emitEvent(event: AppEvent): void {
  eventBus.emit(event);
}
