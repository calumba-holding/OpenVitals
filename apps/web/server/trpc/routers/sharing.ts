import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { eq, and } from 'drizzle-orm';
import { createRouter, protectedProcedure } from '../init';
import { getActiveGrants, sharePolicies, accessGrants, shareTemplates } from '@openvitals/database';
import crypto from 'crypto';

export const sharingRouter = createRouter({
  createPolicy: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(255),
      templateId: z.string().optional(),
      categories: z.array(z.string()).min(1),
      accessLevel: z.enum(['view', 'view_download', 'full']).default('view'),
      dateFrom: z.date().optional(),
      dateTo: z.date().optional(),
      expiresAt: z.date().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const [policy] = await ctx.db
        .insert(sharePolicies)
        .values({
          userId: ctx.userId,
          name: input.name,
          templateId: input.templateId,
          categories: input.categories,
          accessLevel: input.accessLevel,
          dateFrom: input.dateFrom,
          dateTo: input.dateTo,
          expiresAt: input.expiresAt,
        })
        .returning();

      return { policyId: policy!.id };
    }),

  createGrant: protectedProcedure
    .input(z.object({
      policyId: z.string().uuid(),
      recipientEmail: z.string().email().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verify policy belongs to user
      const [policy] = await ctx.db
        .select()
        .from(sharePolicies)
        .where(and(eq(sharePolicies.id, input.policyId), eq(sharePolicies.userId, ctx.userId)))
        .limit(1);

      if (!policy) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Policy not found' });
      }

      const token = crypto.randomUUID();

      const [grant] = await ctx.db
        .insert(accessGrants)
        .values({
          sharePolicyId: input.policyId,
          recipientEmail: input.recipientEmail,
          token,
        })
        .returning();

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
      const shareUrl = `${baseUrl}/shared/${token}`;

      return { grantId: grant!.id, token, shareUrl };
    }),

  listGrants: protectedProcedure
    .query(async ({ ctx }) => {
      const items = await getActiveGrants(ctx.db, { userId: ctx.userId });
      return { items };
    }),

  revokeGrant: protectedProcedure
    .input(z.object({ grantId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Validate ownership via sharePolicies join
      const grant = await ctx.db
        .select({ id: accessGrants.id, policyUserId: sharePolicies.userId })
        .from(accessGrants)
        .innerJoin(sharePolicies, eq(accessGrants.sharePolicyId, sharePolicies.id))
        .where(eq(accessGrants.id, input.grantId))
        .limit(1);

      if (!grant.length || grant[0]!.policyUserId !== ctx.userId) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Grant not found' });
      }

      await ctx.db
        .update(accessGrants)
        .set({ isActive: false, revokedAt: new Date(), updatedAt: new Date() })
        .where(eq(accessGrants.id, input.grantId));

      return { success: true };
    }),

  getTemplates: protectedProcedure
    .query(async ({ ctx }) => {
      const templates = await ctx.db
        .select()
        .from(shareTemplates)
        .orderBy(shareTemplates.sortOrder);
      return { templates };
    }),
});
