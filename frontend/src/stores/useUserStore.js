import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async (name, email, password, role) => {
    set({ loading: true });

    try {
      const res = await axios.post('/auth/signup', {
        name,
        email,
        password,
        role,
      });
      set({ user: res.data, loading: false });
      toast.success('Signup successful!');
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post('/auth/login', { email, password });
      set({ user: res.data, loading: false });
      toast.success('Login successful!');
      // Navigate to the appropriate page after login
      const navigate = useNavigate();
      navigate('/dashboard'); // Change this to your desired route
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: async () => {
    try {
      await axios.post('/auth/logout');
      set({ user: null });
      toast.success('Logged out successfully');
      // Redirect to login page after logout
      const navigate = useNavigate();
      navigate('/login'); // Change this to your login route
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      const response = await axios.get('/auth/check-auth');
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.error('Auth check failed:', error.message);
      set({ checkingAuth: false, user: null });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    try {
      const response = await axios.post('/auth/refresh-token');
      set({ checkingAuth: false });

      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

// Axios Interceptor for Token Refresh
let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = useUserStore.getState().refreshToken();
        }

        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
