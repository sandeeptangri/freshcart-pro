import Link from 'next/link'
import Header from '@/components/Header'
import { ArrowLeft, Plus, Minus, Star, Truck, Clock, Shield, ChevronRight } from 'lucide-react'

export default function ProductDetail() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-orange-500">Dairy & Bread</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Amul Fresh Milk</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12">
              <span className="text-9xl">🥛</span>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">8 min delivery</span>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">Bestseller</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Amul Fresh Milk</h1>
              <p className="text-gray-500 mb-4">500 ml • Full Cream</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                  <span className="text-green-600 font-bold">4.5</span>
                  <Star className="w-4 h-4 text-green-600 fill-current" />
                </div>
                <span className="text-sm text-gray-500">(2,847 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">₹34</span>
                <span className="text-lg text-gray-400 line-through">₹38</span>
                <span className="text-green-600 font-semibold">11% off</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                  <button className="px-4 py-2 hover:bg-gray-200 transition">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-semibold">1</span>
                  <button className="px-4 py-2 hover:bg-gray-200 transition">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-lg transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl mb-4">
                Add to Cart
              </button>

              {/* Why Choose Us */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <p className="text-xs text-gray-600">8 Min Delivery</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <p className="text-xs text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <p className="text-xs text-gray-600">Fresh Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              Amul Fresh Milk is sourced from the finest dairy farms and processed under strict quality standards 
              to ensure you get the freshest, most nutritious milk every time. Rich in calcium, protein, and essential vitamins.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Key Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Rich in Calcium</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> High Protein Content</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Farm Fresh Daily</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> No Preservatives</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Nutritional Info (per 100ml)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Energy</span>
                    <span className="font-medium">65 kcal</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Protein</span>
                    <span className="font-medium">3.2g</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Calcium</span>
                    <span className="font-medium">120mg</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Fat</span>
                    <span className="font-medium">3.5g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Similar Products</h2>
            <Link href="/products" className="text-orange-500 font-semibold text-sm hover:text-orange-600">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: '🥛', name: 'Amul Toned Milk', weight: '500 ml', price: 32 },
              { icon: '🧃', name: 'Amul Buttermilk', weight: '200 ml', price: 15 },
              { icon: '🧈', name: 'Amul Butter', weight: '100 g', price: 58 },
              { icon: '🧀', name: 'Amul Cheese', weight: '200 g', price: 125 },
              { icon: '🥣', name: 'Amul Curd', weight: '400 g', price: 45 },
              { icon: '🍦', name: 'Amul Ice Cream', weight: '500 ml', price: 85 },
            ].map((product) => (
              <Link key={product.name} href="/product/1">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                  <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-4xl">
                    {product.icon}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">₹{product.price}</span>
                      <button className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">ADD</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
