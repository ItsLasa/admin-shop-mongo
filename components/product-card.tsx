"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Package } from "lucide-react"
import type { Product } from "@/types/product"
import Image from "next/image"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color")
      return
    }
    onAddToCart(product, selectedSize, selectedColor, quantity)
    // Reset selections
    setSelectedSize("")
    setSelectedColor("")
    setQuantity(1)
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock < 10

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
          {product.images && product.images.length > 0 ? (
          
            <Image width={0} height={0}
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            
            />

          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-16 w-16 text-gray-400" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.featured && (
              <Badge className="bg-yellow-500 hover:bg-yellow-600">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {isLowStock && !isOutOfStock && <Badge variant="destructive">Low Stock</Badge>}
            {isOutOfStock && <Badge variant="destructive">Out of Stock</Badge>}
          </div>

          {/* Price Badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-lg font-bold">
              ${product.price.toFixed(2)}
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-3">
              <label className="text-sm font-medium mb-1 block">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Stock Info */}
          <div className="text-sm text-gray-500 mb-4">
            {isOutOfStock ? (
              <span className="text-red-600 font-medium">Out of Stock</span>
            ) : (
              <span>
                {product.stock} in stock
                {isLowStock && <span className="text-orange-600 ml-1">(Low Stock)</span>}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} disabled={isOutOfStock} className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
