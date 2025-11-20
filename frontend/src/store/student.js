import { create } from 'zustand';

export const useStudentStore = create((set, get) => ({
  // State
  credentials: {
    email: '',
    password: '',
    confirmPassword: '',
  },
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
  setLoading: (state) => set({ loading: state }),

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
        setSuccess(data.message || 'Signed up!');
        navigate('/home');
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
}));