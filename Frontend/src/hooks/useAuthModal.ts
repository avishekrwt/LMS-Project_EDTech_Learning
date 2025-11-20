import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  mode: 'signin' | 'signup';
  openSignIn: () => void;
  openSignUp: () => void;
  close: () => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  mode: 'signin',
  openSignIn: () => set({ isOpen: true, mode: 'signin' }),
  openSignUp: () => set({ isOpen: true, mode: 'signup' }),
  close: () => set({ isOpen: false }),
}));
