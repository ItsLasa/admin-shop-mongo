"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types/product"

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image?: string
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const cartItemId = `${product._id}-${size}-${color}`

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === cartItemId)

      if (existingItem) {
        return prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product._id!,
          name: product.name,
          price: product.price,
          size,
          color,
          quantity,
          image: product.images?.[0],
        }
        return [...prevCart, newItem]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemCount = (productId: string, size: string, color: string) => {
    const item = cart.find((item) => item.id === `${productId}-${size}-${color}`)
    return item ? item.quantity : 0
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemCount,
  }
}
