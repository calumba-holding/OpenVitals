import { createRouter } from './init';
import { observationsRouter } from './routers/observations';
import { medicationsRouter } from './routers/medications';
import { importJobsRouter } from './routers/importJobs';
import { sharingRouter } from './routers/sharing';
import { aiRouter } from './routers/ai';
import { preferencesRouter } from './routers/preferences';
import { metricsRouter } from './routers/metrics';

export const appRouter = createRouter({
  observations: observationsRouter,
  medications: medicationsRouter,
  importJobs: importJobsRouter,
  sharing: sharingRouter,
  ai: aiRouter,
  preferences: preferencesRouter,
  metrics: metricsRouter,
});

export type AppRouter = typeof appRouter;
