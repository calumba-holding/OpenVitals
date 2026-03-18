import {
  pgTable,
  varchar,
  text,
  real,
  integer,
  jsonb,
  serial,
  unique,
} from 'drizzle-orm/pg-core';

// ── Metric Definitions ─────────────────────────────────────────────────────────

export const metricDefinitions = pgTable('metric_definitions', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  unit: varchar('unit', { length: 50 }),
  loincCode: varchar('loinc_code', { length: 20 }),
  snomedCode: varchar('snomed_code', { length: 20 }),
  aliases: jsonb('aliases'),
  referenceRangeLow: real('reference_range_low'),
  referenceRangeHigh: real('reference_range_high'),
  referenceRangeText: text('reference_range_text'),
  description: text('description'),
  sortOrder: integer('sort_order').default(0),
});

// ── Unit Conversions ───────────────────────────────────────────────────────────

export const unitConversions = pgTable(
  'unit_conversions',
  {
    id: serial('id').primaryKey(),
    fromUnit: varchar('from_unit', { length: 50 }).notNull(),
    toUnit: varchar('to_unit', { length: 50 }).notNull(),
    metricCode: varchar('metric_code', { length: 50 }).references(
      () => metricDefinitions.id,
    ),
    multiplier: real('multiplier').notNull(),
    offset: real('offset').notNull().default(0),
  },
  (table) => [
    unique('unit_conversions_from_to_metric_uniq').on(
      table.fromUnit,
      table.toUnit,
      table.metricCode,
    ),
  ],
);
