import type { Database } from '../client';

// TODO: Implement alias matching that looks up a metric definition by its id,
// name, or any entry in its aliases JSON array.
export async function matchAlias(
  db: Database,
  params: {
    input: string;
  },
) {
  // TODO: Query metricDefinitions where id matches, name ilike matches,
  // or the aliases jsonb array contains the input string.
  // Return the matched MetricDefinition or null.
  return null;
}

// TODO: Implement unit conversion that looks up the conversion factor between
// two units, optionally scoped to a specific metric code.
export async function convertUnit(
  db: Database,
  params: {
    fromUnit: string;
    toUnit: string;
    value: number;
    metricCode?: string;
  },
) {
  // TODO: Look up unitConversions for the from/to pair, preferring a
  // metric-specific conversion over a global one (metricCode IS NULL).
  // Apply: result = value * multiplier + offset
  // Return { convertedValue: number; conversionFound: boolean }.
  return { convertedValue: params.value, conversionFound: false };
}
