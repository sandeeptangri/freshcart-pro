'use client'

import Link from 'next/link'
import { MapPin, ShoppingCart, ChevronDown, User } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'

export default function Header() {
  const { getTotalItems } = useCartStore()
  const { user, isAuthenticated, logout } = useAuthStore()

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight" style={{ textShadow: '2px 2px 0 rgba(255,255,255,0.3)' }}>
                freshcart
              </span>
              <span className="text-[10px] font-semibold text-gray-700 tracking-[0.2em] uppercase -mt-1">
                instant delivery
              </span>
            </Link>

            {/* Location Selector */}
            <div className="hidden md:flex items-center bg-white/95 hover:bg-white rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 hover:shadow-lg min-w-[240px]">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">
                  Delivery Location
                </div>
                <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
                  Select Location
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <Link href="/profile">
                  <button className="hidden sm:flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all">
                    <User className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">{user.name || user.phone}</span>
                  </button>
                </Link>
              ) : (
                <Link 
                  href="/login"
                  className="hidden sm:block bg-gray-900 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all hover:-translate-y-0.5"
                >
                  Login
                </Link>
              )}
              
              <Link href="/cart">
                <button className="bg-white text-gray-900 px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">My Cart</span>
                  {getTotalItems() > 0 && (
                    <span className="w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Location Bar */}
      <div className="md:hidden bg-white border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">
              Delivery Location
            </div>
            <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
              Select Location
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
