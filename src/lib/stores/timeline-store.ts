import { create } from 'zustand';
import { storage } from '@/lib/storage';
import { type MediaItem } from '@/data/schema';

interface TimelineState {
  tracks: MediaItem[][];
  currentTime: number;
  duration: number;
  selectedTrackIndex: number | null;
  lastSaved: number;
}

interface TimelineStore extends TimelineState {
  setTracks: (tracks: MediaItem[][]) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setSelectedTrackIndex: (index: number | null) => void;
  saveState: () => Promise<void>;
  loadState: (projectId: string) => Promise<void>;
}

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  tracks: [],
  currentTime: 0,
  duration: 0,
  selectedTrackIndex: null,
  lastSaved: Date.now(),

  setTracks: (tracks) => set({ tracks }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setSelectedTrackIndex: (index) => set({ selectedTrackIndex: index }),

  saveState: async () => {
    const state = get();
    const timelineData = {
      tracks: state.tracks,
      duration: state.duration,
      lastSaved: Date.now()
    };

    await storage.saveProject({
      id: 'timeline-state',
      name: 'Timeline State',
      data: timelineData,
      lastModified: Date.now(),
      syncStatus: 'pending'
    });
  },

  loadState: async (projectId: string) => {
    try {
      const savedState = await storage.getProject(projectId);
      if (savedState && savedState.data) {
        set({
          tracks: savedState.data.tracks || [],
          duration: savedState.data.duration || 0,
          lastSaved: savedState.data.lastSaved || Date.now()
        });
      }
    } catch (error) {
      console.error('Failed to load timeline state:', error);
    }
  }
}));