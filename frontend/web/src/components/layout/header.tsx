'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Search, Menu, User, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth-store'
import { useCartStore } from '@/store/cart-store'

export function Header() {
  const { isAuthenticated, user } = useAuthStore()
  const { items } = useCartStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
            <span className="text-white font-bold text-sm">FC</span>
          </div>
          <span className="font-bold text-xl tracking-tight">FreshCart</span>
        </Link>

        {/* Delivery Location */}
        <button className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <MapPin className="h-4 w-4" />
          <span>Deliver to... </span>
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:flex flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search for groceries..."
            className="w-full rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button size="icon" className="absolute right-1 top-1 h-7 w-7 rounded-full">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="md:hidden">
            <Search className="h-5 w-5" />
          </button>

          {isAuthenticated ? (
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            </Link>
          )}

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
