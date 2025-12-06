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
  lastActivity: number | null;
  setUser: (user: User, token: string, profile?: UserProfile | null) => void;
  clearUser: () => void;
  updateActivity: () => void;
}

const INACTIVITY_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      profile: null,
      lastActivity: null,
      setUser: (user, token, profile) => {
        set({ 
          user, 
          token, 
          profile: profile ?? null,
          lastActivity: Date.now()
        });
      },
      clearUser: () => set({ user: null, token: null, profile: null, lastActivity: null }),
      updateActivity: () => set({ lastActivity: Date.now() }),
    }),
    {
      name: 'tz-user-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        profile: state.profile,
        lastActivity: state.lastActivity,
      }),
    },
  ),
);

// Session management hook
export function useSessionManager() {
  const token = useUserStore((state) => state.token);
  const lastActivity = useUserStore((state) => state.lastActivity);
  const clearUser = useUserStore((state) => state.clearUser);
  const updateActivity = useUserStore((state) => state.updateActivity);

  // Check for inactivity and auto-logout
  const checkInactivity = () => {
    if (!token || !lastActivity) return;

    const now = Date.now();
    const timeSinceLastActivity = now - lastActivity;

    if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
      clearUser();
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  };

  // Update activity on user interactions
  const handleUserActivity = () => {
    if (token) {
      updateActivity();
    }
  };

  // Set up activity listeners
  if (typeof window !== 'undefined') {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach((event) => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    // Check inactivity every minute
    const interval = setInterval(checkInactivity, 60000);
    
    // Initial check
    checkInactivity();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserActivity);
      });
      clearInterval(interval);
    };
  }
}
