'use client';

import { useEffect, useCallback } from 'react';
import { useTimelineStore } from '@/lib/stores/timeline-store';
import { useOfflineStore } from '@/lib/stores/offline-store';
import { useToast } from '@/components/ui/use-toast';
import { storage } from '@/lib/storage';
import { syncManager } from '@/lib/sync';

const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export function useOfflineVideoEditor(projectId: string) {
  const { toast } = useToast();
  const { isOffline } = useOfflineStore();
  const { tracks, duration, saveState, loadState } = useTimelineStore();

  // Auto-save timeline state
  useEffect(() => {
    const autoSave = async () => {
      try {
        await saveState();
        if (isOffline) {
          toast({
            title: 'Changes saved locally',
            description: 'Your changes will sync when you\'re back online',
            duration: 3000,
          });
        }
      } catch (error) {
        console.error('Auto-save failed:', error);
        toast({
          title: 'Auto-save failed',
          description: 'Failed to save your changes locally',
          variant: 'destructive',
        });
      }
    };

    const interval = setInterval(autoSave, AUTO_SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [tracks, duration, isOffline, saveState, toast]);

  // Load saved state when component mounts
  useEffect(() => {
    loadState(projectId);
  }, [projectId, loadState]);

  // Handle manual save
  const handleSave = useCallback(async () => {
    try {
      await saveState();
      if (isOffline) {
        // Queue sync operation
        await syncManager.queueOperation({
          id: projectId,
          type: 'project_update',
          data: {
            tracks,
            duration,
          },
        });

        toast({
          title: 'Project saved offline',
          description: 'Changes will sync when you\'re back online',
        });
      } else {
        toast({
          title: 'Project saved',
          description: 'All changes saved successfully',
        });
      }
    } catch (error) {
      console.error('Save failed:', error);
      toast({
        title: 'Save failed',
        description: 'Could not save your changes',
        variant: 'destructive',
      });
    }
  }, [projectId, tracks, duration, isOffline, saveState, toast]);

  // Check for unsaved changes
  const checkUnsavedChanges = useCallback(async () => {
    const savedState = await storage.getProject('timeline-state');
    if (!savedState) return false;
    
    return savedState.lastModified > useTimelineStore.getState().lastSaved;
  }, []);

  return {
    handleSave,
    checkUnsavedChanges,
  };
}