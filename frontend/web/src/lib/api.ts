// Base API URL - configurable for different environments
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

interface ApiConfig {
  method: string
  headers?: Record<string, string>
  body?: string
}

// Generic API client
export async function apiClient(endpoint: string, config: ApiConfig) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...config.headers,
  }

  const token = localStorage.getItem('auth_token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      ...config,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP Error ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Product API
export const productApi = {
  getAll: () => apiClient('/products', { method: 'GET' }),
  getById: (id: string) => apiClient(`/products/${id}`, { method: 'GET' }),
  getByCategory: (category: string) => apiClient(`/products/category/${category}`, { method: 'GET' }),
  search: (query: string) => apiClient(`/products/search?q=${encodeURIComponent(query)}`, { method: 'GET' }),
}

// Cart API (Redis-backed)
export const cartApi = {
  get: () => apiClient('/cart', { method: 'GET' }),
  add: (productId: string, qty: number = 1) => 
    apiClient('/cart/items', { method: 'POST', body: JSON.stringify({ productId, qty }) }),
  update: (itemId: string, qty: number) => 
    apiClient(`/cart/items/${itemId}`, { method: 'PUT', body: JSON.stringify({ qty }) }),
  remove: (itemId: string) => 
    apiClient(`/cart/items/${itemId}`, { method: 'DELETE' }),
  clear: () => apiClient('/cart', { method: 'DELETE' }),
}

// Auth API
export const authApi = {
  login: (phone: string) => apiClient('/auth/login', { method: 'POST', body: JSON.stringify({ phone }) }),
  verifyOtp: (phone: string, otp: string) => 
    apiClient('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) }),
  register: (data: { phone: string; name: string; email?: string }) => 
    apiClient('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  refreshToken: () => apiClient('/auth/refresh', { method: 'POST' }),
  logout: () => apiClient('/auth/logout', { method: 'POST' }),
}

// Order API
export const orderApi = {
  create: (orderData: any) => apiClient('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getAll: () => apiClient('/orders', { method: 'GET' }),
  getById: (id: string) => apiClient(`/orders/${id}`, { method: 'GET' }),
  track: (id: string) => apiClient(`/orders/${id}/track`, { method: 'GET' }),
}

// User API
export const userApi = {
  getProfile: () => apiClient('/users/me', { method: 'GET' }),
  updateProfile: (data: { name?: string; email?: string; address?: any }) => 
    apiClient('/users/me', { method: 'PATCH', body: JSON.stringify(data) }),
  getAddresses: () => apiClient('/users/addresses', { method: 'GET' }),
  addAddress: (address: any) => apiClient('/users/addresses', { method: 'POST', body: JSON.stringify(address) }),
}

// Payment API
export const paymentApi = {
  createOrder: (orderId: string) => apiClient('/payments', { method: 'POST', body: JSON.stringify({ orderId }) }),
  verify: (razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string) =>
    apiClient('/payments/verify', { 
      method: 'POST', 
      body: JSON.stringify({ razorpayOrderId, razorpayPaymentId, razorpaySignature })
    }),
  getMethods: () => apiClient('/payments/methods', { method: 'GET' }),
}
