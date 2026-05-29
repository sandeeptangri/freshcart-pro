export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  sellingPrice: number
  mrp: number
  images: { url: string; isPrimary?: boolean }[]
  category: { id: string; name: string; slug: string }
  isOrganic?: boolean
  averageRating?: number
}

export interface CartItem {
  productId: string
  quantity: number
  unitPrice: number
  name: string
  image?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}
