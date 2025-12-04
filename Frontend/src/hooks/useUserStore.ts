import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
  role?: string;
  organization?: string;
}

interface User {
  id: string;
  email?: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  profile: UserProfile | null;
  setUser: (user: User, token: string, profile?: UserProfile | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      profile: null,
      setUser: (user, token, profile) => set({ user, token, profile: profile ?? null }),
      clearUser: () => set({ user: null, token: null, profile: null }),
    }),
    {
      name: 'tz-user-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        profile: state.profile,
      }),
    },
  ),
);
