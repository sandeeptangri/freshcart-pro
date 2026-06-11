'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCartStore } from '@/store/cart-store'

interface ProductDetailProps {
  product: {
    id: string
    name: string
    description: string
    sellingPrice: number
    mrp: number
    images: { url: string; isPrimary: boolean }[]
    variants: { id: string; attributes: any; sellingPrice: number; stockQuantity: number }[]
    isOrganic?: boolean
    isGlutenFree?: boolean
    averageRating?: number
    totalReviews?: number
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0])
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()
  
  const price = selectedVariant?.sellingPrice || product.sellingPrice
  const mrp = product.mrp
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0
  
  const handleAddToCart = () => {
    addItem({ id: product.id, icon: "", name: product.name, weight: "", price: price })
  }

  return (
    <div className="container px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Info */}
        <div className="space-y-4">
          <div className="flex gap-2">
            {product.isOrganic && <Badge>Organic</Badge>}
            {product.isGlutenFree && <Badge variant="secondary">Gluten Free</Badge>}
          </div>
          
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-bold">{product.averageRating || 4.5} â˜…</span>
            <span className="text-muted-foreground">({product.totalReviews || 0} reviews)</span>
          </div>
          
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">â‚¹{price}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">â‚¹{mrp}</span>
                <Badge variant="destructive">{discount}% off</Badge>
              </>
            )}
          </div>
          
          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded">
              <button 
                className="px-3 py-1 border-r hover:bg-muted"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >-</button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                className="px-3 py-1 border-l hover:bg-muted"
                onClick={() => setQuantity(quantity + 1)}
              >+</button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              Save for Later
            </Button>
          </div>
          
          {/* Description */}
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-muted-foreground">
              {product.description}
            </TabsContent>
            <TabsContent value="reviews">
              <p className="text-muted-foreground">Reviews coming soon...</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
