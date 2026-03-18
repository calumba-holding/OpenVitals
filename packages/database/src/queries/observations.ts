import type { Database } from '../client';

// TODO: Implement observation list query with filtering by category, metric code,
// date range, status, and pagination support.
export async function listObservations(
  db: Database,
  params: {
    userId: string;
    category?: string;
    metricCode?: string;
    dateFrom?: Date;
    dateTo?: Date;
    status?: string;
    limit?: number;
    offset?: number;
  },
) {
  // TODO: Build query with dynamic where clauses and ordering by observedAt desc
  return [];
}

// TODO: Implement trend query that returns observations for a specific metric
// over a date range, suitable for charting.
export async function getObservationTrend(
  db: Database,
  params: {
    userId: string;
    metricCode: string;
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
  },
) {
  // TODO: Query observations filtered by userId + metricCode, ordered by observedAt asc
  return [];
}

// TODO: Implement provenance query that returns a single observation along with
// its linked source artifact, import job, and data source for full traceability.
export async function getObservationWithProvenance(
  db: Database,
  params: {
    observationId: string;
    userId: string;
  },
) {
  // TODO: Use Drizzle relational query with `with` to eagerly load
  // dataSource, sourceArtifact, and importJob relations
  return null;
}
