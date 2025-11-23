'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useDirection } from '@/components/providers/direction-provider'
import { useCart } from '@/starters/ecommerce/hooks/use-cart'
import { products, categories, searchProducts, getProductsByCategory } from '@/starters/ecommerce/lib/products'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ShoppingCart, Search, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ProductsPage() {
  const { locale } = useDirection()
  const { addItem, itemCount } = useCart()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = React.useState(searchParams?.get('search') || '')
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [filteredProducts, setFilteredProducts] = React.useState(products)

  const text = {
    en: {
      title: 'All Products',
      search: 'Search products...',
      category: 'Category',
      allCategories: 'All Categories',
      addToCart: 'Add to Cart',
      added: 'Added to cart',
      cart: 'Cart',
      back: 'Back',
      sar: 'SAR',
      reviews: 'reviews',
      showing: 'Showing',
      products: 'products',
    },
    ar: {
      title: 'جميع المنتجات',
      search: 'البحث عن منتجات...',
      category: 'الفئة',
      allCategories: 'جميع الفئات',
      addToCart: 'أضف للسلة',
      added: 'تمت الإضافة إلى السلة',
      cart: 'السلة',
      back: 'رجوع',
      sar: 'ريال',
      reviews: 'تقييم',
      showing: 'عرض',
      products: 'منتج',
    },
  }
  const t = text[locale]

  React.useEffect(() => {
    let result = products

    if (searchQuery) {
      result = searchProducts(searchQuery)
    } else if (selectedCategory !== 'all') {
      result = getProductsByCategory(selectedCategory)
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategory])

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast({
      title: t.added,
      description: locale === 'ar' ? product.nameAr : product.name,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <ButtonArrow variant="ghost" size="icon" direction="back" icon="arrow" />
            </Link>
            <h1 className="text-xl font-bold">{t.title}</h1>
          </div>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -end-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </header>

      {/* Filters */}
      <section className="py-6 border-b bg-muted/50">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder={t.category} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {locale === 'ar' ? cat.nameAr : cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {t.showing} {filteredProducts.length} {t.products}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
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
                    <CardTitle className="text-base mb-2 line-clamp-1">
                      {locale === 'ar' ? product.nameAr : product.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold">{product.price} {t.sar}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      {t.addToCart}
                    </Button>
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
