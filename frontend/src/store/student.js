import { create } from 'zustand';

export const useStudentStore = create((set, get) => ({
  // State
  credentials: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  student: null,
  token: null,
  isAuthenticated: false,

  isLoginHovered: false,
  error: '',
  success: '',
  loading: false,

  // State setters
  setCredentials: (updates) =>
    set((state) => ({
      credentials: { ...state.credentials, ...updates },
    })),
  setIsLoginHovered: (hovered) => set({ isLoginHovered: hovered }),
  setError: (msg) => set({ error: msg }),
  setSuccess: (msg) => set({ success: msg }),
  setLoading: (value) => set({ loading: value }),

  // hydrate auth from localStorage on app load, use in main app component
  hydrateAuth: () => {
    const storedToken = localStorage.getItem('token');
    const storedStudent = localStorage.getItem('student');

    if (storedToken && storedStudent) {
      set({
        token: storedToken,
        student: JSON.parse(storedStudent),
        isAuthenticated: true,
      });
    }
  },

  // Logic: handles sign-up
  handleSubmit: async (e, navigate) => {
    e.preventDefault();
    const {
      credentials,
      setError,
      setSuccess,
      setLoading,
    } = get();

    setError('');
    setSuccess('');
    setLoading(true);

    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/students/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {}

      if (response.ok) {
        setSuccess(data.message || 'Signed up! Please log in.');
        navigate('/login');
      } else {
        setError(data.message || `Signup failed (status ${response.status})`);
      }
    } catch (err) {
      console.error('Error signing up:', err);
      setError('Network/server error. Please try again.');
    } finally {
      setLoading(false);
    }
  },

  // Logic: handles login
  handleLogin: async (e, navigate) => {
    e.preventDefault();
    const {
      credentials,
      setError,
      setSuccess,
      setLoading,
    } = get();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message || `Login failed (status ${response.status})`);
        setLoading(false);
        return;
      }

      // Save token + user in store
      set({
        token: data.token,
        student: data.user,
        isAuthenticated: true,
      });

      // Persist to localStorage so refresh keeps logged in
      localStorage.setItem('token', data.token);
      localStorage.setItem('student', JSON.stringify(data.user));

      setSuccess(data.message || 'Logged in successfully!');
      navigate('/home'); 
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Network/server error. Please try again.');
    } finally {
      setLoading(false);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    set({
      token: null,
      student: null,
      isAuthenticated: false,
      success: '',
      error: '',
    });
  },
}));
