import { z } from 'zod';
import { createRouter, protectedProcedure } from '../init';

export const aiRouter = createRouter({
  chat: protectedProcedure
    .input(z.object({
      message: z.string().min(1).max(4000),
      categories: z.array(z.string()).optional(),
      dateFrom: z.date().optional(),
      dateTo: z.date().optional(),
      conversationId: z.string().uuid().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Implement with context bundler + AI SDK
      return { answer: '', insightId: '', bundle: '' };
    }),
});
