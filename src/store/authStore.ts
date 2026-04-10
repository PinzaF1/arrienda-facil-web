import { create } from 'zustand';
// import { authService, AuthResponse } from '../services/authService';
// import { LoginFormData, RegisterFormData } from '../schemas/authSchema';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      // const response: AuthResponse = await authService.login(data);
      // localStorage.setItem('token', response.access_token);
      // set({
      //   user: response.user,
      //   token: response.access_token,
      //   isAuthenticated: true,
      //   isLoading: false,
      // });
      console.log('Login called with:', data);
      set({
        isLoading: false,
        error: 'Backend not connected yet'
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Error al iniciar sesión';
      set((state) => ({
        ...state,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  },

  register: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      // const { passwordConfirm, ...registerData } = data;
      // const response: AuthResponse = await authService.register(registerData);
      // localStorage.setItem('token', response.access_token);
      // set({
      //   user: response.user,
      //   token: response.access_token,
      //   isAuthenticated: true,
      //   isLoading: false,
      // });
      console.log('Register called with:', data);
      set({
        isLoading: false,
        error: 'Backend not connected yet'
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Error al registrarse';
      set((state) => ({
        ...state,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      // await authService.logout();
      localStorage.removeItem('token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Error al cerrar sesión';
      set((state) => ({
        ...state,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  setToken: (token: string | null) => {
    set({ token, isAuthenticated: !!token });
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },

  clearError: () => {
    set({ error: null });
  },

  initializeAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // const user = await authService.getCurrentUser();
        set({
          // user,
          token,
          isAuthenticated: true,
        });
      } else {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      localStorage.removeItem('token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },
}));
