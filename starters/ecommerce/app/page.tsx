'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDirection } from '@/components/providers/direction-provider'
import { useCart } from '@/starters/ecommerce/hooks/use-cart'
import { getFeaturedProducts, products } from '@/starters/ecommerce/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Search, Star, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const { locale } = useDirection()
  const { itemCount } = useCart()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState('')

  const featuredProducts = getFeaturedProducts()

  const text = {
    en: {
      title: 'Noor Shop',
      subtitle: 'Discover amazing products',
      search: 'Search products...',
      featured: 'Featured Products',
      allProducts: 'View All Products',
      addToCart: 'Add to Cart',
      cart: 'Cart',
      sar: 'SAR',
      reviews: 'reviews',
    },
    ar: {
      title: 'متجر نور',
      subtitle: 'اكتشف منتجات رائعة',
      search: 'البحث عن منتجات...',
      featured: 'المنتجات المميزة',
      allProducts: 'عرض جميع المنتجات',
      addToCart: 'أضف للسلة',
      cart: 'السلة',
      sar: 'ريال',
      reviews: 'تقييم',
    },
  }
  const t = text[locale]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary"></div>
            <span className="text-xl font-bold">{t.title}</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/products">
              <Button variant="ghost">{t.allProducts}</Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -end-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t.subtitle}
            </h1>
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 h-12 text-lg"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">{t.featured}</h2>
            <Link href="/products">
              <Button variant="outline">
                {t.allProducts}
                <ArrowRight className="h-4 w-4 ms-2" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={locale === 'ar' ? product.nameAr : product.name}
                        className="object-cover w-full h-full"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-2 end-2">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">
                      {locale === 'ar' ? product.nameAr : product.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {locale === 'ar' ? product.descriptionAr : product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} {t.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{product.price} {t.sar}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
