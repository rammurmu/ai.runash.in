'use client';

import { useState, useEffect } from 'react';
import { useOfflineStore } from '@/lib/stores/offline-store';
import { offlineExportManager } from '@/lib/offline-export';
import { useToast } from '@/components/ui/use-toast';

export function useOfflineExport(projectId: string) {
  const { isOffline } = useOfflineStore();
  const { toast } = useToast();
  const [exportId, setExportId] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportStatus, setExportStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');

  // Monitor export progress
  useEffect(() => {
    if (!exportId) return;

    const checkProgress = async () => {
      const status = await offlineExportManager.getExportStatus(exportId);
      if (status) {
        setExportProgress(status.progress);
        setExportStatus(status.status);

        if (status.status === 'completed') {
          toast({
            title: 'Export completed',
            description: 'Your video has been exported successfully',
          });
        } else if (status.status === 'failed') {
          toast({
            title: 'Export failed',
            description: status.error || 'Failed to export video',
            variant: 'destructive',
          });
        }
      }
    };

    const interval = setInterval(checkProgress, 1000);
    return () => clearInterval(interval);
  }, [exportId, toast]);

  const startExport = async (settings: { format: string; quality: string; resolution: string }) => {
    try {
      const id = await offlineExportManager.queueExport(projectId, settings);
      setExportId(id);
      
      if (isOffline) {
        toast({
          title: 'Export queued',
          description: 'Your export will begin when you\'re back online',
        });
      } else {
        toast({
          title: 'Export started',
          description: 'Your video is being processed',
        });
      }
    } catch (error) {
      console.error('Failed to start export:', error);
      toast({
        title: 'Export failed',
        description: 'Could not start the export process',
        variant: 'destructive',
      });
    }
  };

  const cancelExport = async () => {
    if (!exportId) return;

    try {
      await offlineExportManager.failExport(exportId, 'Export cancelled by user');
      setExportId(null);
      setExportProgress(0);
      setExportStatus('pending');
      
      toast({
        title: 'Export cancelled',
        description: 'The export has been cancelled',
      });
    } catch (error) {
      console.error('Failed to cancel export:', error);
    }
  };

  return {
    startExport,
    cancelExport,
    exportProgress,
    exportStatus,
    isExporting: !!exportId && exportStatus === 'processing',
  };
}