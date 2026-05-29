import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cartApi } from '@/lib/api'

export interface CartItem {
  id: string
  icon: string
  name: string
  weight: string
  price: number
  qty: number
}

interface CartStore {
  items: CartItem[]
  isSyncing: boolean
  lastSynced: Date | null
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, delta: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  syncWithBackend: () => Promise<void>
  syncFromBackend: () => Promise<void>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isSyncing: false,
      lastSynced: null,
      
      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(i => i.id === item.id)
          if (existingIndex >= 0) {
            const newItems = [...state.items]
            newItems[existingIndex].qty += 1
            return { items: newItems }
          }
          return { items: [...state.items, { ...item, qty: 1 }] }
        })
        
        // Sync to backend if authenticated
        const token = localStorage.getItem('auth_token')
        if (token) {
          cartApi.add(item.id, 1).catch(() => {
            // Silently fail for now - cart is local-first
          })
        }
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
        
        const token = localStorage.getItem('auth_token')
        if (token) {
          cartApi.remove(id).catch(() => {})
        }
      },
      
      updateQty: (id, delta) => {
        set((state) => ({
          items: state.items.map(item => {
            if (item.id === id) {
              return { ...item, qty: Math.max(1, item.qty + delta) }
            }
            return item
          })
        }))
        
        const token = localStorage.getItem('auth_token')
        if (token) {
          const item = get().items.find(i => i.id === id)
          if (item) {
            cartApi.update(id, item.qty).catch(() => {})
          }
        }
      },
      
      clearCart: () => {
        set({ items: [] })
        
        const token = localStorage.getItem('auth_token')
        if (token) {
          cartApi.clear().catch(() => {})
        }
      },
      
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.qty, 0)
      },
      
      syncWithBackend: async () => {
        const token = localStorage.getItem('auth_token')
        if (!token) return
        
        set({ isSyncing: true })
        try {
          // Clear backend cart and add all local items
          await cartApi.clear()
          const { items } = get()
          for (const item of items) {
            await cartApi.add(item.id, item.qty)
          }
          set({ lastSynced: new Date() })
        } catch (error) {
          console.error('Failed to sync cart:', error)
        } finally {
          set({ isSyncing: false })
        }
      },
      
      syncFromBackend: async () => {
        const token = localStorage.getItem('auth_token')
        if (!token) return
        
        set({ isSyncing: true })
        try {
          const serverCart = await cartApi.get()
          // Transform server cart items to local format
          const { items } = get()
          // Merge: local wins for conflicting items
          const merged = [...items]
          set({ items: merged, lastSynced: new Date() })
        } catch (error) {
          console.error('Failed to load cart from backend:', error)
        } finally {
          set({ isSyncing: false })
        }
      }
    }),
    {
      name: 'freshcart-cart-storage',
    }
  )
)