import type { WorkflowContext } from '../workflow';
import type { NormalizationResult } from '@openvitals/ingestion';

export async function materialize(
  ctx: WorkflowContext,
  normalization: NormalizationResult
): Promise<void> {
  // TODO: Update import_jobs status = 'materializing'
  // TODO: Insert observations in batch
  // TODO: Insert medications/conditions if extracted
  // TODO: Update import_jobs: status = 'completed' or 'review_needed'
  // TODO: Emit domain events: observation.created, import.completed
  // TODO: Write audit_events

  console.log(
    `[materialize] Would insert ${normalization.normalized.length} observations, ` +
    `${normalization.flagged.length} flagged items for job=${ctx.importJobId}`
  );

  // TODO: Implement actual database writes
}
