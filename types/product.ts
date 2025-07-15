export interface Product {
  _id?: string
  name: string
  description: string
  price: number
  category: string
  sizes: string[]
  colors: string[]
  images: string[]
  stock: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  _id?: string
  name: string
  slug: string
  description?: string
}

export interface Order {
  _id?: string
  orderNumber: string
  customerEmail: string
  customerName: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  size: string
  color: string
  quantity: number
  price: number
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}
