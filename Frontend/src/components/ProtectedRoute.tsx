import { ReactNode, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/hooks/useUserStore';
import { useAuthModal } from '@/hooks/useAuthModal';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useUserStore((state) => state.token);
  const { openSignIn } = useAuthModal();
  const location = useLocation();
  const hasPromptedRef = useRef(false);

  useEffect(() => {
    if (!token && !hasPromptedRef.current) {
      openSignIn();
      hasPromptedRef.current = true;
    }

    if (token && hasPromptedRef.current) {
      hasPromptedRef.current = false;
    }
  }, [token, openSignIn]);

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

