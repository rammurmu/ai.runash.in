import { storage } from './storage';
import { syncManager } from './sync';
import type { MediaItem } from '@/data/schema';

export class OfflineMediaManager {
  private static instance: OfflineMediaManager;

  private constructor() {}

  static getInstance(): OfflineMediaManager {
    if (!this.instance) {
      this.instance = new OfflineMediaManager();
    }
    return this.instance;
  }

  async cacheMedia(media: MediaItem) {
    // Cache media data in IndexedDB
    await storage.saveMedia({
      id: media.id,
      type: media.mediaType as 'video' | 'image',
      url: media.output?.url || '',
      lastAccessed: Date.now()
    });

    // Cache media file in Service Worker cache
    if (media.output?.url && 'caches' in window) {
      const cache = await caches.open('media-cache');
      try {
        const response = await fetch(media.output.url);
        await cache.put(media.output.url, response);
      } catch (error) {
        console.error('Failed to cache media:', error);
      }
    }
  }

  async getMediaFromCache(mediaId: string): Promise<MediaItem | null> {
    const cachedMedia = await storage.getMedia(mediaId);
    if (!cachedMedia) return null;

    // Try to get the media file from the Service Worker cache
    if ('caches' in window) {
      const cache = await caches.open('media-cache');
      const response = await cache.match(cachedMedia.url);
      if (response) {
        const blob = await response.blob();
        cachedMedia.localUrl = URL.createObjectURL(blob);
      }
    }

    return {
      id: cachedMedia.id,
      mediaType: cachedMedia.type,
      output: { url: cachedMedia.localUrl || cachedMedia.url },
      status: 'completed',
      kind: 'uploaded',
      projectId: '', // Will be set by the component
      createdAt: new Date(),
      metadata: {}
    };
  }

  async uploadMediaWhenOnline(media: MediaItem) {
    await syncManager.queueOperation({
      id: media.id,
      type: 'media_upload',
      data: media
    });
  }

  async cleanupOldMedia() {
    await storage.cleanupOldMedia();
  }
}

export const offlineMediaManager = OfflineMediaManager.getInstance();