import { classify } from './steps/classify';
import { parse } from './steps/parse';
import { normalize } from './steps/normalize';
import { materialize } from './steps/materialize';

export interface WorkflowContext {
  importJobId: string;
  artifactId: string;
  userId: string;
}

export async function processWorkflow(ctx: WorkflowContext): Promise<void> {
  console.log(`[workflow] Starting ingestion for job=${ctx.importJobId}`);

  try {
    // Step 1: Classify the document
    const classification = await classify(ctx);
    console.log(`[workflow] Classified as ${classification.documentType} (${classification.confidence})`);

    // If confidence too low, mark for review and stop
    if (classification.confidence < 0.7) {
      console.log(`[workflow] Low confidence, marking for review`);
      // TODO: Update import_jobs status = 'review_needed'
      return;
    }

    // Step 2: Parse the document
    const parseResult = await parse(ctx, classification.documentType);
    console.log(`[workflow] Extracted ${parseResult.extractions.length} results`);

    // Step 3: Normalize extractions
    const normalization = await normalize(ctx, parseResult.extractions);
    console.log(`[workflow] Normalized ${normalization.normalized.length}, flagged ${normalization.flagged.length}`);

    // Step 4: Materialize to database
    await materialize(ctx, normalization);
    console.log(`[workflow] Materialized. Job complete.`);
  } catch (error) {
    console.error(`[workflow] Failed for job=${ctx.importJobId}:`, error);
    // TODO: Update import_jobs status = 'failed', error_message
    throw error;
  }
}
