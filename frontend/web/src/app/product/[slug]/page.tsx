import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product/product-detail'
import { apiClient } from '@/lib/api-client'

async function getProduct(slug: string) {
  try {
    const response = await apiClient.get(`/products/${slug}`)
    return response.data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  if (!product) return { title: 'Product Not Found' }
  
  return {
    title: `${product.name} | FreshCart`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    notFound()
  }
  
  return <ProductDetail product={product} />
}
