import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    phone?: string;
    address?: string;
    city?: string;
    pincode?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    updateUser: (user: User) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,

            login: (user, token) => set({ user, token }),

            updateUser: (user) => set({ user }),

            logout: () => set({ user: null, token: null }),

            isAuthenticated: () => !!get().token,

            isAdmin: () => get().user?.role === 'ADMIN',
        }),
        {
            name: 'paradise-auth-storage',
        }
    )
);
