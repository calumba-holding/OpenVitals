import { z } from 'zod';
import { createRouter, protectedProcedure } from '../init';

export const importJobsRouter = createRouter({
  create: protectedProcedure
    .input(z.object({
      fileName: z.string(),
      mimeType: z.string(),
      blobPath: z.string(),
      contentHash: z.string(),
      fileSize: z.number(),
      dataSourceId: z.string().uuid().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Insert source_artifact + import_job, trigger Render workflow
      return { importJobId: '' };
    }),

  getStatus: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      // TODO: Implement - this is polled every 3 seconds during active imports
      return {
        status: 'pending' as const,
        classifiedType: null,
        classificationConfidence: null,
        extractionCount: 0,
        needsReview: false,
        errorMessage: null,
        createdAt: new Date(),
        parseCompletedAt: null,
      };
    }),

  list: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(50).default(20),
      status: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      // TODO: Implement
      return { items: [] };
    }),

  reviewQueue: protectedProcedure
    .query(async ({ ctx }) => {
      // TODO: Implement - items flagged during import
      return { items: [] };
    }),
});
