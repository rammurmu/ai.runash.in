import { storage } from './storage';
import { syncManager } from './sync';

interface ExportJob {
  id: string;
  projectId: string;
  settings: {
    format: string;
    quality: string;
    resolution: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: {
    url: string;
    size: number;
  };
  error?: string;
  createdAt: number;
}

class OfflineExportManager {
  private static instance: OfflineExportManager;

  private constructor() {}

  static getInstance(): OfflineExportManager {
    if (!this.instance) {
      this.instance = new OfflineExportManager();
    }
    return this.instance;
  }

  async queueExport(projectId: string, settings: ExportJob['settings']): Promise<string> {
    const exportJob: ExportJob = {
      id: `export-${Date.now()}`,
      projectId,
      settings,
      status: 'pending',
      progress: 0,
      createdAt: Date.now()
    };

    // Store in IndexedDB
    await storage.put('export-queue', exportJob);

    // Queue for processing when online
    await syncManager.queueOperation({
      id: exportJob.id,
      type: 'project_export',
      data: {
        projectId,
        settings
      }
    });

    return exportJob.id;
  }

  async getExportStatus(exportId: string): Promise<ExportJob | null> {
    const db = await storage.initDB();
    return db.get('export-queue', exportId);
  }

  async updateExportProgress(exportId: string, progress: number) {
    const db = await storage.initDB();
    const exportJob = await db.get('export-queue', exportId);
    if (exportJob) {
      exportJob.progress = progress;
      await db.put('export-queue', exportJob);
    }
  }

  async completeExport(exportId: string, result: ExportJob['result']) {
    const db = await storage.initDB();
    const exportJob = await db.get('export-queue', exportId);
    if (exportJob) {
      exportJob.status = 'completed';
      exportJob.result = result;
      await db.put('export-queue', exportJob);
    }
  }

  async failExport(exportId: string, error: string) {
    const db = await storage.initDB();
    const exportJob = await db.get('export-queue', exportId);
    if (exportJob) {
      exportJob.status = 'failed';
      exportJob.error = error;
      await db.put('export-queue', exportJob);
    }
  }

  async getPendingExports(): Promise<ExportJob[]> {
    const db = await storage.initDB();
    return db.getAllFromIndex('export-queue', 'by-status', 'pending');
  }
}

export const offlineExportManager = OfflineExportManager.getInstance();