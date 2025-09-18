'use client';

import { useEffect } from 'react';
import { useOfflineStore } from '@/lib/stores/offline-store';
import { offlineProjectManager } from '@/lib/offline-project';
import type { Project } from '@/lib/offline-project';

export function useOfflineProject() {
  const { isOffline } = useOfflineStore();

  const saveProject = async (project: Project) => {
    if (isOffline) {
      await offlineProjectManager.saveProject(project);
    } else {
      await offlineProjectManager.syncProject(project);
    }
  };

  const getProject = async (id: string) => {
    if (isOffline) {
      return await offlineProjectManager.getProject(id);
    }
    // Handle online case through normal API
    return null;
  };

  return {
    saveProject,
    getProject
  };
}