// src/store/admin.js
import { create } from 'zustand';
import bcrypt from 'bcryptjs';

export const useAdminStore = create((set) => ({
  credentials: {
    email: '',
    password: '',
  },
  error: '',
  loading: false,

  setCredentials: (updates) =>
    set((state) => ({
      credentials: { ...state.credentials, ...updates },
    })),
  setError: (msg) => set({ error: msg }),
  setLoading: (state) => set({ loading: state }),

    
  // Function will return JSON file
  login: async () => {
  const { credentials, setError, setLoading } = useAdminStore.getState();

  setError('');
  setLoading(true);

  const { email, password } = credentials;

  if (!email || !password) {
    setLoading(false);
    return { success: false, message: 'Email and password are required' };
  }

  try {
    const response = await fetch('/api/admins/data');
    const data = await response.json();

    const admin = data.find((admin) => admin.email === email);
    if (!admin) {
      return { success: false, message: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, message: 'Server error. Please try again.' };
  } finally {
    setLoading(false);
  }
}

}));