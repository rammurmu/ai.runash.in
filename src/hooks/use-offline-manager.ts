'use client';

import { useEffect } from 'react';
import { useOfflineStore } from '@/lib/stores/offline-store';
import { storage } from '@/lib/storage';
import { syncManager } from '@/lib/sync';
import { useToast } from '@/components/ui/use-toast';

export function useOfflineManager() {
  const { setOffline, setPendingOperations } = useOfflineStore();
  const { toast } = useToast();

  useEffect(() => {
    // Initial online status
    setOffline(!navigator.onLine);

    // Update pending operations count
    const updatePendingCount = async () => {
      const pendingProjects = await storage.getPendingProjects();
      setPendingOperations(pendingProjects.length);
    };

    // Event listeners for online/offline status
    const handleOnline = () => {
      setOffline(false);
      toast({
        title: 'Back online',
        description: 'Syncing pending changes...',
        duration: 3000,
      });
      syncManager.processQueue().then(updatePendingCount);
    };

    const handleOffline = () => {
      setOffline(true);
      toast({
        title: 'You are offline',
        description: 'Changes will be synced when you reconnect',
        duration: 5000,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial pending count
    updatePendingCount();

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOffline, setPendingOperations, toast]);
}