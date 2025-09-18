'use client';

import { useEffect, useRef, useState } from 'react';
import { useOfflineStore } from '@/lib/stores/offline-store';
import { offlineMediaManager } from '@/lib/offline-media';

export function useOfflineVideoPlayback(videoId: string | null) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOffline } = useOfflineStore();
  const [offlineUrl, setOfflineUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadOfflineVideo = async () => {
      if (!videoId) return;
      
      setIsLoading(true);
      try {
        const offlineMedia = await offlineMediaManager.getMediaFromCache(videoId);
        if (offlineMedia?.output?.url) {
          setOfflineUrl(offlineMedia.output.url);
        }
      } catch (error) {
        console.error('Failed to load offline video:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOffline && videoId) {
      loadOfflineVideo();
    } else {
      setOfflineUrl(null);
    }
  }, [videoId, isOffline]);

  useEffect(() => {
    return () => {
      // Cleanup any object URLs when component unmounts
      if (offlineUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(offlineUrl);
      }
    };
  }, [offlineUrl]);

  return {
    videoRef,
    isLoading,
    offlineUrl
  };
}