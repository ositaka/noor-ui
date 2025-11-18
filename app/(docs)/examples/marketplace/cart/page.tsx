'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { formatSAR } from '@/lib/arabic-numbers'
import { cn } from '@/lib/utils'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Tag,
  Truck,
} from 'lucide-react'

interface CartItem {
  id: string
  productId: string
  name: string
  nameAr: string
  price: number
  image: string
  vendorName: string
  vendorNameAr: string
  vendorId: string
  quantity: number
  maxStock: number
}

function generateMockCartItems(): CartItem[] {
  return [
    {
      id: '1',
      productId: 'wireless-headphones',
      name: 'Wireless Headphones',
      nameAr: 'سماعات لاسلكية',
      price: 299,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      vendorName: 'Tech Store',
      vendorNameAr: 'متجر التقنية',
      vendorId: 'tech-store',
      quantity: 2,
      maxStock: 45,
    },
    {
      id: '2',
      productId: 'smart-watch',
      name: 'Smart Watch',
      nameAr: 'ساعة ذكية',
      price: 499,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      vendorName: 'Tech Store',
      vendorNameAr: 'متجر التقنية',
      vendorId: 'tech-store',
      quantity: 1,
      maxStock: 8,
    },
    {
      id: '3',
      productId: 'mechanical-keyboard',
      name: 'Mechanical Keyboard',
      nameAr: 'لوحة مفاتيح ميكانيكية',
      price: 199,
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
      vendorName: 'Gaming Gear',
      vendorNameAr: 'معدات الألعاب',
      vendorId: 'gaming-gear',
      quantity: 1,
      maxStock: 32,
    },
  ]
}

export default function CartPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'
  const t = content[locale]

  const [cartItems, setCartItems] = React.useState<CartItem[]>(generateMockCartItems())

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, Math.min(item.maxStock, newQuantity)) }
          : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.15 // 15% VAT in Saudi Arabia
  const shipping = subtotal > 200 ? 0 : 25 // Free shipping over 200 SAR
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.nav.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples" className="hover:text-foreground transition-colors">
                {t.nav.examples}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples/marketplace" className="hover:text-foreground transition-colors">
                {t.marketplaceCart.breadcrumb.marketplace}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {t.marketplaceCart.breadcrumb.shoppingCart}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {t.marketplaceCart.title}
          </h1>
          <p className="text-muted-foreground">
            {t.marketplaceCart.itemsInCart.replace('{count}', cartItems.length.toString())}
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-muted rounded-full">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">
                  {t.marketplaceCart.emptyState.title}
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  {t.marketplaceCart.emptyState.description}
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/examples/marketplace">
                  <ShoppingBag className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {t.marketplaceCart.emptyState.browseProducts}
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div
                        className="h-24 w-24 rounded-lg bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">
                              {isRTL ? item.nameAr : item.name}
                            </h3>
                            <Link
                              href={`/examples/marketplace/vendor/${item.vendorId}`}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {isRTL ? item.vendorNameAr : item.vendorName}
                            </Link>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-end justify-between gap-4 mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="min-w-[2rem] text-center">
                              <span className="font-medium">
                                <ArabicNumber value={item.quantity} />
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxStock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-end">
                            <div className="text-xl font-bold">
                              {formatSAR(item.price * item.quantity, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-muted-foreground">
                                {formatSAR(item.price, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })} {t.marketplaceCart.product.each}
                              </div>
                            )}
                          </div>
                        </div>

                        {item.quantity >= item.maxStock && (
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {t.marketplaceCart.product.maxAvailable}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Continue Shopping */}
              <Button variant="outline" asChild>
                <Link href="/examples/marketplace">
                  {isRTL ? (
                    <>
                      <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                      {t.marketplaceCart.actions.continueShopping}
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="h-4 w-4 me-2" />
                      {t.marketplaceCart.actions.continueShopping}
                    </>
                  )}
                </Link>
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>
                    {t.marketplaceCart.summary.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {t.marketplaceCart.summary.subtotal}
                    </span>
                    <span className="font-medium">
                      {formatSAR(subtotal, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {t.marketplaceCart.summary.vat}
                    </span>
                    <span className="font-medium">
                      {formatSAR(tax, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {t.marketplaceCart.summary.shipping}
                      </span>
                    </div>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <Badge variant="secondary" className="text-xs">
                          {t.marketplaceCart.summary.free}
                        </Badge>
                      ) : (
                        formatSAR(shipping, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })
                      )}
                    </span>
                  </div>

                  {/* Free Shipping Notice */}
                  {shipping > 0 && subtotal < 200 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Tag className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                          {t.marketplaceCart.summary.freeShippingPrompt.replace('{amount}', formatSAR(200 - subtotal, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' }))}
                        </p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Total */}
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>{t.marketplaceCart.summary.total}</span>
                    <span>{formatSAR(total, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}</span>
                  </div>

                  {/* Checkout Button */}
                  <Button asChild className="w-full" size="lg">
                    <Link href="/examples/marketplace/checkout">
                      {isRTL ? (
                        <>
                          {t.marketplaceCart.summary.proceedToCheckout}
                          <ArrowLeft className="h-4 w-4 ms-2" />
                        </>
                      ) : (
                        <>
                          {t.marketplaceCart.summary.proceedToCheckout}
                          <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                        </>
                      )}
                    </Link>
                  </Button>

                  {/* Security Notice */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      {t.marketplaceCart.summary.secureTransaction}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
