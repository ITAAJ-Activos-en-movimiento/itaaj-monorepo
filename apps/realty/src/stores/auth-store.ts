import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: string | null;
  isLoading: boolean;
  login: (user: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      login: (user) => set({ user, isLoading: false }),
      logout: () => set({ user: null }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage', // nombre para el almacenamiento persistente
    }
  )
)