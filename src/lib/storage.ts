import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface RunAshDB extends DBSchema {
  projects: {
    key: string;
    value: {
      id: string;
      name: string;
      data: any;
      lastModified: number;
      syncStatus: 'synced' | 'pending';
    };
    indexes: { 'by-sync-status': string };
  };
  media: {
    key: string;
    value: {
      id: string;
      type: 'video' | 'image';
      url: string;
      localUrl?: string;
      lastAccessed: number;
    };
  };
}

class StorageManager {
  private db: IDBPDatabase<RunAshDB> | null = null;
  private dbName = 'runash-store';
  private version = 1;

  async initDB() {
    if (!this.db) {
      this.db = await openDB<RunAshDB>(this.dbName, this.version, {
        upgrade(db) {
          // Projects store
          const projectStore = db.createObjectStore('projects', { keyPath: 'id' });
          projectStore.createIndex('by-sync-status', 'syncStatus');

          // Media store
          db.createObjectStore('media', { keyPath: 'id' });
        },
      });
    }
    return this.db;
  }

  // Project methods
  async saveProject(project: RunAshDB['projects']['value']) {
    const db = await this.initDB();
    await db.put('projects', {
      ...project,
      lastModified: Date.now(),
      syncStatus: 'pending',
    });
  }

  async getProject(id: string) {
    const db = await this.initDB();
    return db.get('projects', id);
  }

  async getPendingProjects() {
    const db = await this.initDB();
    return db.getAllFromIndex('projects', 'by-sync-status', 'pending');
  }

  async markProjectSynced(id: string) {
    const db = await this.initDB();
    const project = await db.get('projects', id);
    if (project) {
      await db.put('projects', { ...project, syncStatus: 'synced' });
    }
  }

  // Media methods
  async saveMedia(media: RunAshDB['media']['value']) {
    const db = await this.initDB();
    await db.put('media', {
      ...media,
      lastAccessed: Date.now(),
    });
  }

  async getMedia(id: string) {
    const db = await this.initDB();
    return db.get('media', id);
  }

  async removeMedia(id: string) {
    const db = await this.initDB();
    await db.delete('media', id);
  }

  // Cache management
  async cleanupOldMedia(maxAge: number = 7 * 24 * 60 * 60 * 1000) { // 7 days
    const db = await this.initDB();
    const now = Date.now();
    const tx = db.transaction('media', 'readwrite');
    const store = tx.objectStore('media');
    const items = await store.getAll();
    
    for (const item of items) {
      if (now - item.lastAccessed > maxAge) {
        await store.delete(item.id);
        // Also remove from cache if it exists
        if ('caches' in window) {
          const cache = await caches.open('media-cache');
          await cache.delete(item.url);
          if (item.localUrl) {
            await cache.delete(item.localUrl);
          }
        }
      }
    }
  }
}

export const storage = new StorageManager();