import { getDb } from '@openvitals/database/client';
import { importJobs, observations } from '@openvitals/database';
import { eq } from 'drizzle-orm';
import { emitEvent } from '@openvitals/events';
import type { WorkflowContext } from '../workflow';
import type { NormalizationResult } from '@openvitals/ingestion';

export async function materialize(
  ctx: WorkflowContext,
  normalization: NormalizationResult
): Promise<void> {
  const db = getDb();

  const { normalized, flagged } = normalization;

  if (normalized.length > 0) {
    // Batch insert observations
    const rows = normalized.map((obs) => ({
      userId: ctx.userId,
      metricCode: obs.metricCode,
      category: obs.category,
      valueNumeric: obs.valueNumeric,
      valueText: obs.valueText,
      unit: obs.unit,
      referenceRangeLow: obs.referenceRangeLow,
      referenceRangeHigh: obs.referenceRangeHigh,
      referenceRangeText: obs.referenceRangeText,
      isAbnormal: obs.isAbnormal,
      status: 'extracted' as const,
      confidenceScore: obs.confidenceScore,
      observedAt: obs.observedAt,
      sourceArtifactId: ctx.artifactId,
      importJobId: ctx.importJobId,
    }));

    const inserted = await db.insert(observations).values(rows).returning({ id: observations.id });

    // Emit events for each observation
    for (const row of inserted) {
      emitEvent({
        type: 'observation.created',
        payload: {
          observationId: row.id,
          metricCode: '',
          category: '',
          importJobId: ctx.importJobId,
        },
        userId: ctx.userId,
        timestamp: new Date(),
      });
    }
  }

  // Determine final status
  const needsReview = flagged.length > 0;
  const finalStatus = needsReview ? 'review_needed' : 'completed';

  await db.update(importJobs)
    .set({
      status: finalStatus,
      extractionCount: normalized.length,
      needsReview,
      completedAt: new Date(),
    })
    .where(eq(importJobs.id, ctx.importJobId));

  emitEvent({
    type: 'import.completed',
    payload: {
      importJobId: ctx.importJobId,
      observationCount: normalized.length,
    },
    userId: ctx.userId,
    timestamp: new Date(),
  });

  console.log(
    `[materialize] Inserted ${normalized.length} observations, ` +
    `${flagged.length} flagged. Status: ${finalStatus}`
  );
}
