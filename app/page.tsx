import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Shield, Truck, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fashion Store</h1>
              <p className="text-gray-600">Premium clothing collection</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/shop">
                <Button>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shop Now
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Discover Your Style</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of premium clothing designed for the modern lifestyle. Quality, comfort, and
            style in every piece.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/shop">
              <Button size="lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Browse Collection
              </Button>
            </Link>
            <Link href="/shop?featured=true">
              <Button variant="outline" size="lg">
                <Star className="h-5 w-5 mr-2" />
                Featured Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Premium materials and craftsmanship in every product. 30-day return policy for your peace of mind.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Truck className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <CardTitle>Free Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Enjoy free shipping on all orders. Fast and reliable delivery straight to your doorstep.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Star className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
                <CardTitle>Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Thousands of happy customers. Read reviews and join our community of fashion enthusiasts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Upgrade Your Wardrobe?</h3>
          <p className="text-lg text-gray-600 mb-8">Browse our latest collection and find your perfect style today.</p>
          <Link href="/shop">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Fashion Store</h4>
              <p className="text-gray-400">Your destination for premium clothing and accessories.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/shop" className="hover:text-white">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=shirts" className="hover:text-white">
                    Shirts
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=pants" className="hover:text-white">
                    Pants
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=dresses" className="hover:text-white">
                    Dresses
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fashion Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
