import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  loadToken: () => void;
  updateUser: (partial: Partial<User>) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: null,
  user: null,

  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },

  setUser: (user) => {
    set({ user });
  },

  loadToken: () => {
    const stored = localStorage.getItem('token');
    if (stored) {
      set({ token: stored });
    }
  },

  updateUser: (partial) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : null,
    }));
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },

  
}));



