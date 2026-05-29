'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plus, Minus, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart-store'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    sellingPrice: number
    mrp: number
    images: { url: string }[]
    isOrganic?: boolean
    averageRating?: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items, updateQuantity } = useCartStore()
  
  const cartItem = items.find(item => item.productId === product.id)
  const quantity = cartItem?.quantity || 0
  
  const discount = product.mrp > product.sellingPrice 
    ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
    : 0

  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0">
        {/* Image */}
        <Link href={`/product/${product.slug}`} className="relative block aspect-square bg-muted">
          {product.images[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-4xl">🥗</div>
          )}
          
          {product.isOrganic && (
            <Badge className="absolute top-2 left-2 bg-green-600">Organic</Badge>
          )}
          
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500">-{discount}%</Badge>
          )}
        </Link>
        
        {/* Content */}
        <div className="p-4">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-medium line-clamp-2 hover:text-green-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-muted-foreground">{product.averageRating || 4.5}</span>
          </div>
          
          <div className="flex items-end gap-2 mt-2">
            <span className="text-lg font-bold">₹{product.sellingPrice}</span>
            {product.mrp > product.sellingPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{product.mrp}</span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <div className="mt-3">
            {quantity === 0 ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => addItem(product.id, 1)}
              >
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
