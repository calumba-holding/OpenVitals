import type { WorkflowContext } from '../workflow';
import type { ParseResult } from '@openvitals/ingestion';
import { parseLabPdf } from '../parsers/lab-pdf';
import { parseCsvImport } from '../parsers/csv-importer';

const parserMap: Record<string, (ctx: WorkflowContext) => Promise<ParseResult>> = {
  lab_report: parseLabPdf,
  csv_export: parseCsvImport,
};

export async function parse(ctx: WorkflowContext, documentType: string): Promise<ParseResult> {
  // TODO: Update import_jobs status = 'parsing'
  console.log(`[parse] Parsing as ${documentType} for artifact=${ctx.artifactId}`);

  const parser = parserMap[documentType];
  if (!parser) {
    console.warn(`[parse] No parser for type ${documentType}, returning empty result`);
    return { extractions: [] };
  }

  return parser(ctx);
}
