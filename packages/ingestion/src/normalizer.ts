import type { RawExtraction, NormalizedObservation, FlaggedExtraction, NormalizationResult } from './types';
import { CONFIDENCE_THRESHOLD } from '@openvitals/common';

export interface MetricDefinition {
  id: string;
  name: string;
  category: string;
  unit: string | null;
  aliases: string[];
  referenceRangeLow: number | null;
  referenceRangeHigh: number | null;
}

export interface UnitConversion {
  fromUnit: string;
  toUnit: string;
  metricCode: string | null;
  multiplier: number;
  offset: number;
}

export function matchMetric(
  analyte: string,
  metricDefinitions: MetricDefinition[]
): MetricDefinition | null {
  const lower = analyte.toLowerCase().trim();

  // Exact match on id
  const exactId = metricDefinitions.find(m => m.id === lower);
  if (exactId) return exactId;

  // Exact match on name
  const exactName = metricDefinitions.find(m => m.name.toLowerCase() === lower);
  if (exactName) return exactName;

  // Alias match
  const aliasMatch = metricDefinitions.find(m =>
    m.aliases.some(a => a.toLowerCase() === lower)
  );
  if (aliasMatch) return aliasMatch;

  // Partial match (analyte contains metric name or vice versa)
  const partialMatch = metricDefinitions.find(m =>
    lower.includes(m.name.toLowerCase()) || m.name.toLowerCase().includes(lower)
  );
  if (partialMatch) return partialMatch;

  return null;
}

export function convertUnit(
  value: number,
  fromUnit: string,
  toUnit: string,
  conversions: UnitConversion[],
  metricCode?: string
): number | null {
  if (fromUnit.toLowerCase() === toUnit.toLowerCase()) return value;

  // Try metric-specific conversion first
  const specific = conversions.find(c =>
    c.fromUnit.toLowerCase() === fromUnit.toLowerCase() &&
    c.toUnit.toLowerCase() === toUnit.toLowerCase() &&
    c.metricCode === metricCode
  );
  if (specific) return value * specific.multiplier + specific.offset;

  // Try global conversion
  const global = conversions.find(c =>
    c.fromUnit.toLowerCase() === fromUnit.toLowerCase() &&
    c.toUnit.toLowerCase() === toUnit.toLowerCase() &&
    c.metricCode === null
  );
  if (global) return value * global.multiplier + global.offset;

  return null;
}

export function normalizeExtractions(
  extractions: RawExtraction[],
  metricDefinitions: MetricDefinition[],
  unitConversions: UnitConversion[],
  baseConfidence: number = 0.85
): NormalizationResult {
  const normalized: NormalizedObservation[] = [];
  const flagged: FlaggedExtraction[] = [];

  for (const extraction of extractions) {
    const metric = matchMetric(extraction.analyte, metricDefinitions);

    if (!metric) {
      flagged.push({
        extraction,
        reason: 'unmatched_metric',
        details: `No metric definition found for analyte: ${extraction.analyte}`,
      });
      continue;
    }

    let finalValue = extraction.value;
    let finalUnit = extraction.unit ?? metric.unit ?? '';

    // Unit conversion if needed
    if (extraction.unit && metric.unit && extraction.unit.toLowerCase() !== metric.unit.toLowerCase()) {
      const converted = convertUnit(
        extraction.value ?? 0,
        extraction.unit,
        metric.unit,
        unitConversions,
        metric.id
      );
      if (converted !== null) {
        finalValue = converted;
        finalUnit = metric.unit;
      } else {
        flagged.push({
          extraction,
          reason: 'ambiguous_unit',
          details: `Cannot convert ${extraction.unit} to ${metric.unit} for ${metric.id}`,
        });
        continue;
      }
    }

    // Determine abnormality
    const refLow = extraction.referenceRangeLow ?? metric.referenceRangeLow;
    const refHigh = extraction.referenceRangeHigh ?? metric.referenceRangeHigh;
    const isAbnormal = extraction.isAbnormal ??
      (finalValue !== null && refLow !== null && refHigh !== null
        ? finalValue < refLow || finalValue > refHigh
        : null);

    const obs: NormalizedObservation = {
      metricCode: metric.id,
      category: metric.category as any,
      valueNumeric: finalValue,
      valueText: extraction.valueText,
      unit: finalUnit,
      referenceRangeLow: refLow,
      referenceRangeHigh: refHigh,
      referenceRangeText: extraction.referenceRangeText,
      isAbnormal,
      observedAt: new Date(extraction.observedAt),
      confidenceScore: baseConfidence,
    };

    if (baseConfidence < CONFIDENCE_THRESHOLD) {
      flagged.push({
        extraction,
        reason: 'low_confidence',
        details: `Confidence ${baseConfidence} below threshold ${CONFIDENCE_THRESHOLD}`,
      });
    }

    normalized.push(obs);
  }

  return { normalized, flagged };
}
