import { z } from 'zod';
import { createRouter, protectedProcedure } from '../init';

export const preferencesRouter = createRouter({
  get: protectedProcedure
    .query(async ({ ctx }) => {
      // TODO: Implement
      return {
        timezone: 'UTC',
        preferredUnits: 'metric',
        aiModel: 'claude-sonnet-4-20250514',
      };
    }),

  update: protectedProcedure
    .input(z.object({
      timezone: z.string().optional(),
      preferredUnits: z.enum(['metric', 'imperial']).optional(),
      aiModel: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Implement
      return { success: true };
    }),
});
