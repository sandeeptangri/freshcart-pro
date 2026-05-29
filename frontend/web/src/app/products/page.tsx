import { ProductGrid } from '@/components/product/product-grid'

export default function ProductsPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">All Products</h1>
      <ProductGrid />
    </div>
  )
}
