'use client'

import { useQuery } from '@tanstack/react-query'
import { ProductCard } from '@/components/product/product-card'
import { ProductCardSkeleton } from '@/components/product/product-card-skeleton'
import { apiClient } from '@/lib/api-client'

export function TrendingProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['trending-products'],
    queryFn: async () => {
      const response = await apiClient.get('/products?page=1&limit=8')
      return response.data.products
    },
  })

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <a href="/products" className="text-green-600 hover:underline">View All →</a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </>
          ) : (
            products?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
