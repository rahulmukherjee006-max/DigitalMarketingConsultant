import { create } from 'zustand';

interface UIStore {
  isSearchOpen: boolean;
  setSearchOpen: (value: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSearchOpen: false,
  setSearchOpen: (value) => set({ isSearchOpen: value }),
}));
