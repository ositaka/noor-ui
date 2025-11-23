'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDirection } from '@/components/providers/direction-provider'
import { useCart } from '@/starters/ecommerce/hooks/use-cart'
import { getProductById } from '@/starters/ecommerce/lib/products'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Minus, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { locale } = useDirection()
  const { addItem, itemCount } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [quantity, setQuantity] = React.useState(1)

  const product = getProductById(params.id)

  const text = {
    en: {
      addToCart: 'Add to Cart',
      quantity: 'Quantity',
      description: 'Description',
      reviews: 'reviews',
      sar: 'SAR',
      cart: 'Cart',
      back: 'Back',
      added: 'Added to cart',
      notFound: 'Product not found',
      inStock: 'In Stock',
    },
    ar: {
      addToCart: 'أضف للسلة',
      quantity: 'الكمية',
      description: 'الوصف',
      reviews: 'تقييم',
      sar: 'ريال',
      cart: 'السلة',
      back: 'رجوع',
      added: 'تمت الإضافة إلى السلة',
      notFound: 'المنتج غير موجود',
      inStock: 'متوفر',
    },
  }
  const t = text[locale]

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
          <Link href="/products">
            <Button>{t.back}</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast({
      title: t.added,
      description: `${quantity}x ${locale === 'ar' ? product.nameAr : product.name}`,
    })
    router.push('/cart')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/products">
            <ButtonArrow variant="ghost" size="icon" direction="back" icon="arrow" />
          </Link>

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

      {/* Product Details */}
      <section className="py-8">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={locale === 'ar' ? product.nameAr : product.name}
                className="object-cover w-full h-full"
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 end-4 text-lg px-3 py-1">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">
                  {locale === 'ar' ? product.categoryAr : product.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-2">
                  {locale === 'ar' ? product.nameAr : product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({product.reviews} {t.reviews})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold">{product.price} {t.sar}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice} {t.sar}
                  </span>
                )}
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{t.description}</h3>
                    <p className="text-muted-foreground">
                      {locale === 'ar' ? product.descriptionAr : product.description}
                    </p>
                  </div>

                  {product.inStock && (
                    <Badge variant="secondary">{t.inStock}</Badge>
                  )}

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t.quantity}</label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-5 w-5 me-2" />
                    {t.addToCart}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
