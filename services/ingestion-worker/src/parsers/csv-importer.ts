import type { WorkflowContext } from '../workflow';
import type { ParseResult } from '@openvitals/ingestion';

export async function parseCsvImport(ctx: WorkflowContext): Promise<ParseResult> {
  // TODO: Download CSV from blob storage
  // TODO: Auto-detect columns (date, metric, value, unit)
  // TODO: Map columns to RawExtraction fields
  // TODO: Handle various date formats

  console.log(`[csv-importer] Parsing CSV for artifact=${ctx.artifactId}`);

  // Placeholder: return empty result
  return {
    extractions: [],
    rawMetadata: { parser: 'csv-importer', version: '0.1.0' },
  };
}
