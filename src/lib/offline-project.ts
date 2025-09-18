import { db } from '@/data/db';
import { storage } from './storage';
import { syncManager } from './sync';

export interface Project {
  id: string;
  name: string;
  data: any;
}

class OfflineProjectManager {
  private static instance: OfflineProjectManager;

  private constructor() {}

  static getInstance(): OfflineProjectManager {
    if (!this.instance) {
      this.instance = new OfflineProjectManager();
    }
    return this.instance;
  }

  async saveProject(project: Project) {
    // Save to IndexedDB
    await storage.saveProject({
      id: project.id,
      name: project.name,
      data: project.data,
      lastModified: Date.now(),
      syncStatus: 'pending'
    });

    // Queue for sync when online
    await syncManager.queueOperation({
      id: project.id,
      type: 'project_update',
      data: project
    });
  }

  async getProject(id: string): Promise<Project | null> {
    const project = await storage.getProject(id);
    if (!project) return null;

    return {
      id: project.id,
      name: project.name,
      data: project.data
    };
  }

  async syncProject(project: Project): Promise<void> {
    try {
      // Attempt to sync with server
      await db.projects.update(project.id, project);
      // Mark as synced in IndexedDB
      await storage.markProjectSynced(project.id);
    } catch (error) {
      console.error('Failed to sync project:', error);
      throw error;
    }
  }
}

export const offlineProjectManager = OfflineProjectManager.getInstance();