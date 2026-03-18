import type { WorkflowContext } from '../workflow';
import type { RawExtraction, NormalizationResult } from '@openvitals/ingestion';
import { normalizeExtractions } from '@openvitals/ingestion';

export async function normalize(
  ctx: WorkflowContext,
  extractions: RawExtraction[]
): Promise<NormalizationResult> {
  // TODO: Update import_jobs status = 'normalizing'
  // TODO: Fetch metric_definitions and unit_conversions from database
  console.log(`[normalize] Normalizing ${extractions.length} extractions for job=${ctx.importJobId}`);

  // Placeholder: use normalizeExtractions with empty definitions
  // In production, fetch these from the database
  const metricDefinitions: Parameters<typeof normalizeExtractions>[1] = [];
  const unitConversions: Parameters<typeof normalizeExtractions>[2] = [];

  return normalizeExtractions(extractions, metricDefinitions, unitConversions);
}
