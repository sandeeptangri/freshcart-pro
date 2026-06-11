import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '@/lib/api'

interface User {
  id: string
  phone: string
  name: string
  email?: string
}

interface AuthStore {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (phone: string) => Promise<void>
  verifyOtp: (phone: string, otp: string) => Promise<boolean>
  register: (data: { phone: string; name: string; email?: string }) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (phone) => {
        set({ isLoading: true })
        try {
          await authApi.login(phone)
        } finally {
          set({ isLoading: false })
        }
      },
      
      verifyOtp: async (phone, otp) => {
        set({ isLoading: true })
        try {
          const response = await authApi.verifyOtp(phone, otp)
          if (response.token) {
            localStorage.setItem('auth_token', response.token)
            set({
              user: response.user,
              token: response.token,
              refreshToken: response.refreshToken,
              isAuthenticated: true,
            })
            return true
          }
          return false
        } finally {
          set({ isLoading: false })
        }
      },
      
      register: async (data) => {
        set({ isLoading: true })
        try {
          const response = await authApi.register(data)
          if (response.token) {
            localStorage.setItem('auth_token', response.token)
            set({
              user: response.user,
              token: response.token,
              refreshToken: response.refreshToken,
              isAuthenticated: true,
            })
          }
        } finally {
          set({ isLoading: false })
        }
      },
      
      logout: () => {
        localStorage.removeItem('auth_token')
        authApi.logout().catch(() => {})
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
      
      updateUser: (data) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...data } })
        }
      },
    }),
    {
      name: 'freshcart-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
