'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OfflineState {
  isOffline: boolean;
  lastOnline: number | null;
  setOffline: (offline: boolean) => void;
  pendingOperations: number;
  setPendingOperations: (count: number) => void;
}

export const useOfflineStore = create<OfflineState>()(
  persist(
    (set) => ({
      isOffline: false,
      lastOnline: null,
      pendingOperations: 0,
      setOffline: (offline) =>
        set((state) => ({
          isOffline: offline,
          lastOnline: offline ? state.lastOnline : Date.now(),
        })),
      setPendingOperations: (count) =>
        set(() => ({
          pendingOperations: count,
        })),
    }),
    {
      name: 'offline-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);