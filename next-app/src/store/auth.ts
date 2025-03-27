import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  loadToken: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
  loadToken: () => {
    const saved = localStorage.getItem('token');
    if (saved) {
      set({ token: saved });
    }
  },
}));
