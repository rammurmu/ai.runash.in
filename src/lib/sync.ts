interface SyncOperation {
  id: string;
  type: 'project_update' | 'media_upload';
  data: any;
  timestamp: number;
  retryCount: number;
}

class SyncManager {
  private readonly SYNC_TAG = 'runash-sync';
  private isSync = false;

  async registerSync() {
    if ('serviceWorker' in navigator && 'sync' in registration) {
      try {
        await registration.sync.register(this.SYNC_TAG);
      } catch (err) {
        console.error('Background sync registration failed:', err);
      }
    }
  }

  async queueOperation(operation: Omit<SyncOperation, 'timestamp' | 'retryCount'>) {
    const syncOp: SyncOperation = {
      ...operation,
      timestamp: Date.now(),
      retryCount: 0,
    };

    // Store operation in IndexedDB
    const db = await storage.initDB();
    await db.put('sync-queue', syncOp);

    // Register for background sync
    await this.registerSync();
  }

  async processQueue() {
    if (this.isSync) return;
    this.isSync = true;

    try {
      const db = await storage.initDB();
      const operations = await db.getAll('sync-queue');
      
      for (const operation of operations) {
        try {
          await this.processSingleOperation(operation);
          await db.delete('sync-queue', operation.id);
        } catch (error) {
          console.error(`Failed to process operation ${operation.id}:`, error);
          
          // Update retry count and timestamp
          operation.retryCount += 1;
          operation.timestamp = Date.now();
          
          if (operation.retryCount < 5) { // Max retry attempts
            await db.put('sync-queue', operation);
          } else {
            // Move to failed operations store for manual resolution
            await db.put('failed-sync-queue', operation);
            await db.delete('sync-queue', operation.id);
          }
        }
      }
    } finally {
      this.isSync = false;
    }
  }

  private async processSingleOperation(operation: SyncOperation) {
    switch (operation.type) {
      case 'project_update':
        await this.syncProject(operation.data);
        break;
      case 'media_upload':
        await this.syncMedia(operation.data);
        break;
      default:
        throw new Error(`Unknown operation type: ${operation.type}`);
    }
  }

  private async syncProject(data: any) {
    const response = await fetch('/api/projects/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Project sync failed: ${response.statusText}`);
    }

    await storage.markProjectSynced(data.id);
  }

  private async syncMedia(data: any) {
    const response = await fetch('/api/media/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Media sync failed: ${response.statusText}`);
    }
  }
}

export const syncManager = new SyncManager();