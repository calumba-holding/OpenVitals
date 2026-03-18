import { put, del, head } from '@vercel/blob';
import type { BlobStorageProvider } from './interface';

export class VercelBlobAdapter implements BlobStorageProvider {
  async upload(params: {
    path: string;
    data: Buffer | ReadableStream;
    contentType: string;
    metadata?: Record<string, string>;
  }): Promise<{ url: string; path: string }> {
    const blob = await put(params.path, params.data, {
      access: 'public',
      contentType: params.contentType,
      addRandomSuffix: false,
    });

    return { url: blob.url, path: params.path };
  }

  async download(path: string): Promise<{
    data: ReadableStream;
    contentType: string;
    size: number;
  }> {
    const blobMeta = await head(path);

    const response = await fetch(blobMeta.url);
    if (!response.ok || !response.body) {
      throw new Error(`Failed to download blob at path: ${path}`);
    }

    return {
      data: response.body,
      contentType: blobMeta.contentType,
      size: blobMeta.size,
    };
  }

  async getSignedUrl(path: string, _expiresIn?: number): Promise<string> {
    // For Vercel Blob, the URL from put() is already accessible.
    // In production you'd use token-based access.
    // For now, fetch the blob metadata and return its url.
    const blobMeta = await head(path);
    return blobMeta.url;
  }

  async delete(path: string): Promise<void> {
    await del(path);
  }

  async exists(path: string): Promise<boolean> {
    try {
      await head(path);
      return true;
    } catch {
      return false;
    }
  }
}
