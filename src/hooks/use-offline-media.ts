'use client';

import { useEffect } from 'react';
import { useOfflineStore } from '@/lib/stores/offline-store';
import { offlineMediaManager } from '@/lib/offline-media';
import type { MediaItem } from '@/data/schema';

export function useOfflineMedia(mediaItems: MediaItem[]) {
  const { isOffline } = useOfflineStore();

  useEffect(() => {
    // Cache media items when online
    if (!isOffline) {
      mediaItems.forEach((media) => {
        if (media.status === 'completed' && media.output?.url) {
          offlineMediaManager.cacheMedia(media);
        }
      });
    }
  }, [mediaItems, isOffline]);

  // Clean up old media periodically
  useEffect(() => {
    const cleanup = async () => {
      await offlineMediaManager.cleanupOldMedia();
    };
    
    const interval = setInterval(cleanup, 24 * 60 * 60 * 1000); // Once a day
    return () => clearInterval(interval);
  }, []);

  return {
    getOfflineMedia: offlineMediaManager.getMediaFromCache,
    uploadWhenOnline: offlineMediaManager.uploadMediaWhenOnline
  };
}