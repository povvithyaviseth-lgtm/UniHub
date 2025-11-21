
// src/store/student.js
import { create } from 'zustand';

export const useStudentStore = create((set) => ({
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
  Studentlogin: async () => {
    const { credentials, setError, setLoading } = useStudentStore.getState();

    setError('');
    setLoading(true);

    const { email, password } = credentials;

    if (!email || !password) {
      setLoading(false);
      return { success: false, message: 'Email and password are required' };
    }

    try {
      // Get student data (no localhost)
      const response = await fetch('/api/students/data');
      const data = await response.json();

      // Check match
      const match = data.find(
        (student) => student.email === email && student.password === password
      );

      if (match) {
        return { success: true, message: 'Login successful', student: match };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'Server error. Please try again.' };
    } finally {
      setLoading(false);
    }
  },
}));

/*import bcrypt from "bcryptjs";

export async function studentLogin(credentials) {
  try {
    const response = await fetch("http://localhost:5000/api/students/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Login successful:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Login failed:", err);
    return { success: false, message: "Invalid email or password" };
  }
}
const hashedPassword = await hashPassword("mySecret123");
console.log(hashedPassword);
const saltRounds = 10;
export async function hashPassword(password) {
  const saltRounds = 10; // define how strong the salt should be
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}

export const studentLoginFunctions = {
  // Handle student sign in
  handleSignIn: async (email, password) => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    const result = await studentLogin({ email, password });
    
    if (result.success) {
      console.log('Login successful:', result);
      // TODO: Navigate to student dashboard
      // window.location.href = '/student/dashboard';
      alert('Login successful!');
    window.location.href = '/dashboard';
    }
  },

  // Handle forgot password
  handleForgotPassword: async (email) => {
    const userEmail = email || prompt('Please enter your email address:');
    
    if (!userEmail) {
      return;
    }

    try {
      const result = await authService.requestPasswordReset(userEmail);
      
      if (result.success) {
        alert('Password reset instructions have been sent to your email.');
      } else {
        alert('Failed to send password reset email: ' + result.message);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('Forgot password error:', error);
    }
  },

  // Handle create account
  handleCreateAccount: () => {
    console.log('Navigating to create account page');
    window.location.href = '/admin-login';
    // TODO: Navigate to registration page
    // window.location.href = '/register';
    //alert('Redirecting to account creation page...');
  },

  // Handle admin login
  handleAdminLogin: () => {
    console.log('Navigating to admin login page');
    // TODO: Navigate to admin login page
    // window.location.href = '/admin/login';
    window.location.href = '/admin-login';
    //alert('Redirecting to admin login page...');
  },

  
};*/

/*// src/store/admin.js
import { create } from 'zustand';

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

      const match = data.find(
        (admin) => admin.email === email && admin.password === password
      );

      if (match) {
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
  },
}));*/