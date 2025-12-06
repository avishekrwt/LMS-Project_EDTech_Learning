import { useEffect } from 'react';
import { useUserStore } from '@/hooks/useUserStore';

const INACTIVITY_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export default function SessionManager() {
  const token = useUserStore((state) => state.token);
  const lastActivity = useUserStore((state) => state.lastActivity);
  const clearUser = useUserStore((state) => state.clearUser);
  const updateActivity = useUserStore((state) => state.updateActivity);

  useEffect(() => {
    if (!token) return;

    // Update activity on user interactions
    const handleUserActivity = () => {
      updateActivity();
    };

    // Check for inactivity
    const checkInactivity = () => {
      if (!lastActivity) return;

      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
        clearUser();
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }
    };

    // Set up activity listeners
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
  }, [token, lastActivity, clearUser, updateActivity]);

  return null;
}

