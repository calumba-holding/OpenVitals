import type { WorkflowContext } from '../workflow';
import type { ClassificationResult } from '@openvitals/ingestion';

export async function classify(ctx: WorkflowContext): Promise<ClassificationResult> {
  // TODO: Update import_jobs status = 'classifying'
  // TODO: Download artifact from blob storage
  // TODO: Extract text (pdf-parse for PDFs)
  // TODO: Send to LLM via AI SDK for classification

  // Placeholder: return lab_report classification
  console.log(`[classify] Processing artifact=${ctx.artifactId}`);

  return {
    documentType: 'lab_report',
    confidence: 0.9,
    reasoning: 'Placeholder classification - AI not yet wired',
  };
}
