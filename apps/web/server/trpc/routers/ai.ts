import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { createRouter, protectedProcedure } from '../init';
import { listObservations, users, insights } from '@openvitals/database';
import { healthChatPrompt, formatObservationForContext, buildContextSummary, estimateTokens } from '@openvitals/ai';
import type { ContextBundle } from '@openvitals/ai';
import { generateText } from 'ai';
import { gateway } from '@ai-sdk/gateway';

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
      // Build context from user's observations
      const obs = await listObservations(ctx.db, {
        userId: ctx.userId,
        category: input.categories?.[0],
        dateFrom: input.dateFrom,
        dateTo: input.dateTo,
        limit: 100,
      });

      const formattedObs = obs.map(formatObservationForContext);
      const contextText = formattedObs.join('\n');

      const bundle: ContextBundle = {
        sections: (input.categories ?? ['general']).map((cat) => ({
          category: cat as any,
          content: contextText,
          observationIds: obs.map((o) => o.id),
          tokenEstimate: estimateTokens(contextText),
        })),
        totalTokenEstimate: estimateTokens(contextText),
        observationCount: obs.length,
        sourceObservationIds: obs.map((o) => o.id),
        categories: (input.categories ?? []) as any[],
        assembledAt: new Date(),
        summary: '',
      };

      bundle.summary = buildContextSummary(bundle);

      // Get user's preferred AI model
      const [user] = await ctx.db
        .select({ aiModel: users.aiModel })
        .from(users)
        .where(eq(users.id, ctx.userId))
        .limit(1);

      const modelId = user?.aiModel ?? process.env.AI_DEFAULT_MODEL ?? 'claude-sonnet-4-20250514';

      const { text: answer } = await generateText({
        model: gateway(modelId),
        system: `${healthChatPrompt}\n\n--- USER HEALTH DATA ---\n${bundle.summary}\n${contextText}`,
        prompt: input.message,
      });

      // Store insight
      const [insight] = await ctx.db
        .insert(insights)
        .values({
          userId: ctx.userId,
          type: 'chat_response',
          content: answer,
          generatedBy: modelId,
          sourceObservationIds: bundle.sourceObservationIds,
          sourceCategories: bundle.categories,
          contextTokenCount: bundle.totalTokenEstimate,
        })
        .returning();

      return {
        answer,
        insightId: insight!.id,
        bundle: bundle.summary,
      };
    }),
});
