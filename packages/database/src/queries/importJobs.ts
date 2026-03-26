import { and, desc, eq, inArray, type SQL } from "drizzle-orm";
import { sourceArtifacts, importJobs } from "../schema/sources";
import { observations } from "../schema/observations";
import type { Database } from "../client";

export async function createImportJob(
  db: Database,
  params: {
    userId: string;
    fileName: string;
    mimeType: string;
    blobPath: string;
    contentHash: string;
    fileSize: number;
    dataSourceId?: string;
  },
) {
  return db.transaction(async (tx) => {
    const [artifact] = await tx
      .insert(sourceArtifacts)
      .values({
        userId: params.userId,
        fileName: params.fileName,
        mimeType: params.mimeType,
        blobPath: params.blobPath,
        contentHash: params.contentHash,
        fileSize: params.fileSize,
        dataSourceId: params.dataSourceId,
      })
      .returning();

    const [job] = await tx
      .insert(importJobs)
      .values({
        userId: params.userId,
        sourceArtifactId: artifact!.id,
        status: "pending",
      })
      .returning();

    return { importJobId: job!.id, sourceArtifactId: artifact!.id };
  });
}

export async function getImportJobStatus(
  db: Database,
  params: {
    id: string;
    userId: string;
  },
) {
  const rows = await db
    .select()
    .from(importJobs)
    .where(
      and(eq(importJobs.id, params.id), eq(importJobs.userId, params.userId)),
    )
    .limit(1);

  return rows[0] ?? null;
}

export async function listImportJobs(
  db: Database,
  params: {
    userId: string;
    limit?: number;
    status?: string;
  },
) {
  const conditions: SQL[] = [eq(importJobs.userId, params.userId)];
  if (params.status) conditions.push(eq(importJobs.status, params.status));

  return db
    .select({
      id: importJobs.id,
      status: importJobs.status,
      classifiedType: importJobs.classifiedType,
      classificationConfidence: importJobs.classificationConfidence,
      extractionCount: importJobs.extractionCount,
      needsReview: importJobs.needsReview,
      errorMessage: importJobs.errorMessage,
      createdAt: importJobs.createdAt,
      parseCompletedAt: importJobs.parseCompletedAt,
      completedAt: importJobs.completedAt,
      fileName: sourceArtifacts.fileName,
      mimeType: sourceArtifacts.mimeType,
      fileSize: sourceArtifacts.fileSize,
    })
    .from(importJobs)
    .innerJoin(
      sourceArtifacts,
      eq(importJobs.sourceArtifactId, sourceArtifacts.id),
    )
    .where(and(...conditions))
    .orderBy(desc(importJobs.createdAt))
    .limit(params.limit ?? 20);
}

export async function deleteImportJob(
  db: Database,
  params: {
    id: string;
    userId: string;
  },
) {
  const rows = await db
    .delete(importJobs)
    .where(
      and(eq(importJobs.id, params.id), eq(importJobs.userId, params.userId)),
    )
    .returning({
      id: importJobs.id,
      sourceArtifactId: importJobs.sourceArtifactId,
    });

  if (rows[0]) {
    await db
      .delete(sourceArtifacts)
      .where(eq(sourceArtifacts.id, rows[0].sourceArtifactId));
  }

  return rows[0] ?? null;
}

export async function getReviewQueue(
  db: Database,
  params: {
    userId: string;
  },
) {
  return db
    .select({
      id: importJobs.id,
      status: importJobs.status,
      classifiedType: importJobs.classifiedType,
      classificationConfidence: importJobs.classificationConfidence,
      extractionCount: importJobs.extractionCount,
      errorMessage: importJobs.errorMessage,
      createdAt: importJobs.createdAt,
      fileName: sourceArtifacts.fileName,
      mimeType: sourceArtifacts.mimeType,
    })
    .from(importJobs)
    .innerJoin(
      sourceArtifacts,
      eq(importJobs.sourceArtifactId, sourceArtifacts.id),
    )
    .where(
      and(
        eq(importJobs.userId, params.userId),
        eq(importJobs.needsReview, true),
      ),
    )
    .orderBy(desc(importJobs.createdAt));
}

export async function resetImportJobsForReprocessing(
  db: Database,
  params: {
    userId: string;
  },
) {
  return db.transaction(async (tx) => {
    // Find all import jobs for this user that have been processed
    const jobs = await tx
      .select({
        id: importJobs.id,
        sourceArtifactId: importJobs.sourceArtifactId,
      })
      .from(importJobs)
      .where(eq(importJobs.userId, params.userId));

    if (jobs.length === 0) return { count: 0 };

    const jobIds = jobs.map((j) => j.id);

    // Delete all observations linked to these import jobs
    await tx
      .delete(observations)
      .where(inArray(observations.importJobId, jobIds));

    // Reset all import jobs to pending
    await tx
      .update(importJobs)
      .set({
        status: "pending",
        classifiedType: null,
        classificationConfidence: null,
        parserId: null,
        parserVersion: null,
        extractionCount: 0,
        needsReview: false,
        errorMessage: null,
        errorDetailJson: null,
        startedAt: null,
        classifyCompletedAt: null,
        parseCompletedAt: null,
        normalizeCompletedAt: null,
        completedAt: null,
        updatedAt: new Date(),
      })
      .where(eq(importJobs.userId, params.userId));

    return { count: jobs.length, jobs };
  });
}
