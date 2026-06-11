'use client'

import Header from '@/components/Header'
import Link from 'next/link'
import { ArrowRight, Clock, Leaf, BadgePercent } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { useToast, ToastContainer } from '@/components/Toast'

const categories = [
  { icon: 'ðŸƒ', name: 'Paan Corner' },
  { icon: 'ðŸ¥›', name: 'Dairy & Bread' },
  { icon: 'ðŸ¥¬', name: 'Vegetables' },
  { icon: 'ðŸŠ', name: 'Fruits' },
  { icon: 'ðŸ¥¤', name: 'Cold Drinks' },
  { icon: 'ðŸ¿', name: 'Snacks' },
  { icon: 'ðŸœ', name: 'Instant Food' },
  { icon: 'ðŸ°', name: 'Sweet Tooth' },
  { icon: 'ðŸª', name: 'Bakery' },
  { icon: 'â˜•', name: 'Tea & Coffee' },
  { icon: 'ðŸš', name: 'Rice & Atta' },
  { icon: 'ðŸŒ¶ï¸', name: 'Masala & Oil' },
]


interface ProductItem {
  id: string
  icon: string
  name: string
  weight: string
  price: number
  deliveryTime: string
}

const products: any = [
  { id: '1', icon: 'ðŸ¥›', name: 'Amul Full Cream Milk', weight: '500 ml', deliveryTime: '8 min', price: 34 },
  { id: '2', icon: 'ðŸž', name: 'Britannia Bread', weight: '400 g', deliveryTime: '8 min', price: 45 },
  { id: '3', icon: 'ðŸ§ˆ', name: 'Amul Butter', weight: '100 g', deliveryTime: '8 min', price: 58 },
  { id: '4', icon: 'ðŸ¥š', name: 'Farm Fresh Eggs', weight: '6 pcs', deliveryTime: '8 min', price: 72 },
  { id: '5', icon: 'ðŸš', name: 'Daawat Basmati Rice', weight: '1 kg', deliveryTime: '10 min', price: 185 },
  { id: '6', icon: 'ðŸ«', name: 'Dairy Milk Silk', weight: '60 g', deliveryTime: '8 min', price: 80 },
]

const serviceBanners = [
  { title: 'Print Services', color: 'from-purple-500 to-indigo-600' },
  { title: 'Pharma & Wellness', color: 'from-pink-400 to-rose-500' },
  { title: 'Pet Care', color: 'from-cyan-400 to-blue-500' },
  { title: 'Baby Care', color: 'from-sky-400 to-blue-600' },
]

export default function Home() {
  const { toasts, showToast, removeToast } = useToast()
  const { items, addItem, removeItem, updateQty } = useCartStore()

  const handleAddToCart = (product: typeof products[0]) => {
    const existingItem = items.find(item => item.id === product.id)
    if (existingItem) {
      updateQty(product.id, 1)
      showToast(`Updated ${product.name} in cart`, 'ðŸ›’')
    } else {
      addItem({
        id: product.id,
        icon: product.icon,
        name: product.name,
        weight: product.weight,
        price: product.price
      })
      showToast(`Added ${product.name} to cart`, 'ðŸ›’')
    }
  }

  const handleAddFruitToCart = (product: any, id: string) => {
    const existingItem = items.find(item => item.id === id)
    if (existingItem) {
      updateQty(id, 1)
      showToast(`Updated ${product.name} in cart`, 'ðŸ›’')
    } else {
      addItem({
        id,
        icon: product.icon,
        name: product.name,
        weight: product.weight,
        price: product.price
      })
      showToast(`Added ${product.name} to cart`, 'ðŸ›’')
    }
  }

  const QuantitySelector = ({ product }: { product: { id: string; icon: string; name: string; weight: string; price: number } }) => {
    const cartItem = items.find(item => item.id === product.id)
    
    if (!cartItem) {
      return (
        <button 
          onClick={() => handleAddToCart(product)}
          className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 sm:px-4 py-2 rounded-lg transition-colors"
        >
          ADD
        </button>
      )
    }

    return (
      <div className="flex items-center gap-1 bg-green-500 rounded-lg px-1 py-1">
        <button 
          onClick={() => updateQty(product.id, -1)}
          className="text-white font-bold px-2 hover:bg-red-500 rounded transition"
        >
          âˆ’
        </button>
        <span className="text-white font-bold w-4 text-center text-sm">{cartItem.qty}</span>
        <button 
          onClick={() => updateQty(product.id, 1)}
          className="text-white font-bold px-2 hover:bg-green-700 rounded transition"
        >
          +
        </button>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-300 via-orange-300 to-orange-400 overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent animate-spin-slow" 
               style={{ animation: 'spin 8s linear infinite' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          {/* Delivery Badge */}
          <div className="inline-flex items-center gap-2 bg-white/95 px-5 py-2.5 rounded-full shadow-lg mb-6">
            <span className="text-2xl">âš¡</span>
            <span className="text-green-600 font-bold text-lg">Delivery in 8 minutes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight" style={{ textShadow: '2px 2px 0 rgba(255,255,255,0.3)' }}>
            30,000+ products delivered<br className="hidden sm:block" /> to your doorstep
          </h1>
          
          <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto mb-8 font-medium opacity-90">
            Get fresh groceries, dairy, bakery items, and more delivered in minutes
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for milk, bread, eggs, sugar..."
                className="w-full px-6 pl-12 py-4 rounded-2xl text-base border-0 shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Search Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['milk', 'bread', 'eggs', 'sugar', 'butter', 'chocolate'].map((tag) => (
              <span
                key={tag}
                className="bg-black/10 hover:bg-black/20 px-4 py-1.5 rounded-full text-sm font-medium text-gray-800 cursor-pointer transition-all"
              >
                ðŸ” {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Service Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceBanners.map((banner) => (
            <div
              key={banner.title}
              className={`bg-gradient-to-r ${banner.color} rounded-2xl h-32 sm:h-36 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl`}
            >
              {banner.title}
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/products"
              className="group"
            >
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Daily Essentials</h2>
          <Link href="/products" className="text-orange-500 font-semibold text-sm flex items-center gap-1 hover:text-orange-600">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative h-32 sm:h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-4xl sm:text-5xl">
                {product.icon}
                <span className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full">
                  {product.deliveryTime}
                </span>
              </div>
              <div className="p-3 sm:p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm text-gray-900 truncate cursor-pointer hover:text-orange-500 transition">{product.name}</h3>
                </Link>
                <p className="text-xs text-gray-500 mb-3">{product.weight}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base sm:text-lg text-gray-900">â‚¹{product.price}</span>
                  <QuantitySelector product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fresh Fruits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Fresh Fruits & Vegetables</h2>
          <Link href="/products" className="text-orange-500 font-semibold text-sm flex items-center gap-1 hover:text-orange-600">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: 'f1', icon: 'ðŸŽ', name: 'Fresh Apples', weight: '500 g', deliveryTime: '12 min', price: 149 },
            { id: 'f2', icon: 'ðŸŒ', name: 'Bananas', weight: '1 dozen', deliveryTime: '12 min', price: 60 },
            { id: 'f3', icon: 'ðŸ…', name: 'Fresh Tomatoes', weight: '500 g', deliveryTime: '12 min', price: 35 },
            { id: 'f4', icon: 'ðŸ¥”', name: 'Fresh Potatoes', weight: '1 kg', deliveryTime: '12 min', price: 45 },
            { id: 'f5', icon: 'ðŸ§…', name: 'Fresh Onions', weight: '1 kg', deliveryTime: '12 min', price: 55 },
            { id: 'f6', icon: 'ðŸ¥•', name: 'Fresh Carrots', weight: '500 g', deliveryTime: '12 min', price: 28 },
          ].map((product: ProductItem) => {
            const FQuantitySelector = () => {
              const cartItem = items.find(item => item.id === product.id)
              
              if (!cartItem) {
                return (
                  <button 
                    onClick={() => handleAddFruitToCart(product, product.id)}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 sm:px-4 py-2 rounded-lg transition-colors"
                  >
                    ADD
                  </button>
                )
              }

              return (
                <div className="flex items-center gap-1 bg-green-500 rounded-lg px-1 py-1">
                  <button 
                    onClick={() => updateQty(product.id, -1)}
                    className="text-white font-bold px-2 hover:bg-red-500 rounded transition"
                  >
                    âˆ’
                  </button>
                  <span className="text-white font-bold w-4 text-center text-sm">{cartItem.qty}</span>
                  <button 
                    onClick={() => updateQty(product.id, 1)}
                    className="text-white font-bold px-2 hover:bg-green-700 rounded transition"
                  >
                    +
                  </button>
                </div>
              )
            }

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative h-32 sm:h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-4xl sm:text-5xl">
                  {product.icon}
                  <span className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full">
                    {product.deliveryTime}
                  </span>
                </div>
                <div className="p-3 sm:p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-sm text-gray-900 truncate cursor-pointer hover:text-orange-500 transition">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-3">{product.weight}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base sm:text-lg text-gray-900">â‚¹{product.price}</span>
                    <FQuantitySelector />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">8 Minutes Delivery</h3>
            <p className="text-sm text-gray-600">Lightning fast delivery for all your daily needs</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">100% Fresh</h3>
            <p className="text-sm text-gray-600">Sourced directly from local farms and markets</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <BadgePercent className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-sm text-gray-600">Competitive prices with daily deals and discounts</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                freshcart
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Shop on the go and get anything delivered in minutes. The fastest way to get your daily essentials.
              </p>
              <div className="flex gap-3">
                <div className="bg-gray-800 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-700 transition">
                  <span className="text-xs text-gray-400">Download on</span>
                  <div className="font-semibold text-sm">App Store</div>
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-700 transition">
                  <span className="text-xs text-gray-400">Get it on</span>
                  <div className="font-semibold text-sm">Google Play</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/products" className="hover:text-white transition">Vegetables & Fruits</Link></li>
                <li><Link href="/products" className="hover:text-white transition">Dairy & Breakfast</Link></li>
                <li><Link href="/products" className="hover:text-white transition">Snacks & Munchies</Link></li>
                <li><Link href="/products" className="hover:text-white transition">Beverages</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition">Partner With Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            Â© FreshCart Commerce Private Limited, 2024-2025
          </div>
        </div>
      </footer>
    </main>
  )
}


