import { create } from 'zustand'

interface UIState {
  isMobileMenuOpen: boolean
  isCartOpen: boolean
  setIsMobileMenuOpen: (isOpen: boolean) => void
  setIsCartOpen: (isOpen: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}))
