import { z } from 'zod';
import { createRouter, protectedProcedure } from '../init';

export const medicationsRouter = createRouter({
  list: protectedProcedure
    .input(z.object({
      isActive: z.boolean().optional(),
      category: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      // TODO: Implement
      return { items: [] };
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(255),
      genericName: z.string().optional(),
      category: z.enum(['prescription', 'supplement', 'otc']).default('prescription'),
      dosage: z.string().optional(),
      frequency: z.string().optional(),
      route: z.string().optional(),
      prescriber: z.string().optional(),
      indication: z.string().optional(),
      startDate: z.date().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Implement
      return { id: '' };
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      name: z.string().optional(),
      dosage: z.string().optional(),
      frequency: z.string().optional(),
      isActive: z.boolean().optional(),
      endDate: z.date().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Implement
      return { success: true };
    }),

  logAdherence: protectedProcedure
    .input(z.object({
      medicationId: z.string().uuid(),
      logDate: z.date(),
      taken: z.boolean(),
      timeOfDay: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Implement
      return { success: true };
    }),
});
