// src/store/announcements.js
import { create } from 'zustand';

export const useAnnouncementsStore = create((set) => ({
  announcements: [
    {
      id: 1,
      title: 'Join Our Discord Server!!',
      clubName: 'Esports Club',
      description: 'Please make sure to join our discord sever! This is the main way we communicate with our members! Also please remember to pay the club fee! Have a great rest of your day!',
    },
  ],
  loading: false,
  error: '',

  setLoading: (state) => set({ loading: state }),
  setError: (msg) => set({ error: msg }),

  // Fetch announcements from API
  fetchAnnouncements: async () => {
    const { setLoading, setError } = useAnnouncementsStore.getState();
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/announcements/data');
      const data = await response.json();
      set({ announcements: data });
      return { success: true };
    } catch (err) {
      console.error('Fetch announcements error:', err);
      setError('Failed to load announcements');
      return { success: false, message: 'Failed to load announcements' };
    } finally {
      setLoading(false);
    }
  },

  // Create new announcement
  createAnnouncement: async (announcement) => {
    const { setLoading, setError } = useAnnouncementsStore.getState();
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/announcements/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcement),
      });
      
      const data = await response.json();
      
      if (data.success) {
        set((state) => ({
          announcements: [...state.announcements, data.announcement],
        }));
        return { success: true, message: 'Announcement created successfully' };
      } else {
        setError(data.message || 'Failed to create announcement');
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Create announcement error:', err);
      setError('Failed to create announcement');
      return { success: false, message: 'Failed to create announcement' };
    } finally {
      setLoading(false);
    }
  },

  // Edit announcement
  editAnnouncement: async (id, updates) => {
    const { setLoading, setError } = useAnnouncementsStore.getState();
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/announcements/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      
      if (data.success) {
        set((state) => ({
          announcements: state.announcements.map((ann) =>
            ann.id === id ? { ...ann, ...updates } : ann
          ),
        }));
        return { success: true, message: 'Announcement updated successfully' };
      } else {
        setError(data.message || 'Failed to update announcement');
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Edit announcement error:', err);
      setError('Failed to update announcement');
      return { success: false, message: 'Failed to update announcement' };
    } finally {
      setLoading(false);
    }
  },

  // Delete announcement
  deleteAnnouncement: async (id) => {
    const { setLoading, setError } = useAnnouncementsStore.getState();
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/announcements/delete/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        set((state) => ({
          announcements: state.announcements.filter((ann) => ann.id !== id),
        }));
        return { success: true, message: 'Announcement deleted successfully' };
      } else {
        setError(data.message || 'Failed to delete announcement');
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Delete announcement error:', err);
      setError('Failed to delete announcement');
      return { success: false, message: 'Failed to delete announcement' };
    } finally {
      setLoading(false);
    }
  },
}));
