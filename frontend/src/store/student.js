import { create } from 'zustand';

export const useStudentStore = create((set, get) => {
  // Try to hydrate from localStorage on store creation
  let storedToken = null;
  let storedStudent = null;

  if (typeof window !== 'undefined') {
    try {
      storedToken = localStorage.getItem('token');
      const rawStudent = localStorage.getItem('student');
      storedStudent = rawStudent ? JSON.parse(rawStudent) : null;
    } catch (e) {
      console.warn('Failed to read auth from localStorage', e);
    }
  }

  const isAuthed = !!(storedToken && storedStudent);

  return {
    // -------- State --------
    credentials: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    student: storedStudent,          // <-- hydrated
    token: storedToken,              // <-- hydrated
    isAuthenticated: isAuthed,       // <-- hydrated

    isLoginHovered: false,
    error: '',
    success: '',
    loading: false,

    // -------- State setters --------
    setCredentials: (updates) =>
      set((state) => ({
        credentials: { ...state.credentials, ...updates },
      })),
    setIsLoginHovered: (hovered) => set({ isLoginHovered: hovered }),
    setError: (msg) => set({ error: msg }),
    setSuccess: (msg) => set({ success: msg }),
    setLoading: (value) => set({ loading: value }),

    // (Optional now) hydrateAuth – kept for compatibility, but not required anymore
    hydrateAuth: () => {
      if (typeof window === 'undefined') return;

      try {
        const storedToken2 = localStorage.getItem('token');
        const storedStudentRaw = localStorage.getItem('student');
        const storedStudent2 = storedStudentRaw ? JSON.parse(storedStudentRaw) : null;

        if (storedToken2 && storedStudent2) {
          set({
            token: storedToken2,
            student: storedStudent2,
            isAuthenticated: true,
          });
        }
      } catch (e) {
        console.warn('Failed to hydrate auth from localStorage', e);
      }
    },

    // -------- Signup --------
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

    // -------- Login --------
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
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('student', JSON.stringify(data.user));
        }

        setSuccess(data.message || 'Logged in successfully!');
        navigate('/home');
      } catch (err) {
        console.error('Error logging in:', err);
        setError('Network/server error. Please try again.');
      } finally {
        setLoading(false);
      }
    },

    // -------- Logout --------
    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('student');
      }
      set({
        token: null,
        student: null,
        isAuthenticated: false,
        success: '',
        error: '',
      });
    },
  };
});
