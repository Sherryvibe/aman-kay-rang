import { create } from "zustand";

interface UIState {
  isSearchOpen: boolean;
  isSizeGuideOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  isSizeGuideOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  openSizeGuide: () => set({ isSizeGuideOpen: true }),
  closeSizeGuide: () => set({ isSizeGuideOpen: false }),
}));
