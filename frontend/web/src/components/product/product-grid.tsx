'use client'

import { useQuery } from '@tanstack/react-query'
import { ProductCard } from './product-card'
import { ProductCardSkeleton } from './product-card-skeleton'
import { apiClient } from '@/lib/api-client'

export function ProductGrid() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await apiClient.get('/products?page=1&limit=20')
      return response.data.products
    },
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products?.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
