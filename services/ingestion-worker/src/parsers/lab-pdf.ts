import type { WorkflowContext } from '../workflow';
import type { ParseResult } from '@openvitals/ingestion';

export async function parseLabPdf(ctx: WorkflowContext): Promise<ParseResult> {
  // TODO: Download PDF from blob storage
  // TODO: Extract text with pdf-parse
  // TODO: Send to LLM with extract-labs prompt
  // TODO: Parse structured response into RawExtraction[]

  console.log(`[lab-pdf] Parsing lab PDF for artifact=${ctx.artifactId}`);

  // Placeholder: return empty result
  // Full implementation will use:
  // 1. @openvitals/blob-storage to download the PDF
  // 2. pdf-parse to extract text
  // 3. AI SDK + extractLabsPrompt to get structured results
  return {
    extractions: [],
    rawMetadata: { parser: 'lab-pdf', version: '0.1.0' },
  };
}
