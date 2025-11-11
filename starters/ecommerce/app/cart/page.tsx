'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDirection } from '@/components/providers/direction-provider'
import { useCart } from '@/starters/ecommerce/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { locale } = useDirection()
  const { items, updateQuantity, removeItem, total, itemCount } = useCart()
  const router = useRouter()

  const text = {
    en: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      shopNow: 'Start Shopping',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      continueShopping: 'Continue Shopping',
      sar: 'SAR',
      free: 'Free',
      items: 'items',
    },
    ar: {
      title: 'سلة التسوق',
      empty: 'سلتك فارغة',
      shopNow: 'ابدأ التسوق',
      subtotal: 'المجموع الفرعي',
      shipping: 'الشحن',
      total: 'الإجمالي',
      checkout: 'إتمام الطلب',
      continueShopping: 'متابعة التسوق',
      sar: 'ريال',
      free: 'مجاني',
      items: 'منتج',
    },
  }
  const t = text[locale]

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">{t.empty}</h1>
          <Link href="/products">
            <Button>{t.shopNow}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">
            {t.title} ({itemCount} {t.items})
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Cart Content */}
      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={locale === 'ar' ? item.nameAr : item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">
                          {locale === 'ar' ? item.nameAr : item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.price} {t.sar}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <span className="font-bold">
                          {item.price * item.quantity} {t.sar}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold">{t.total}</h2>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.subtotal}</span>
                      <span className="font-medium">{total} {t.sar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.shipping}</span>
                      <span className="font-medium text-green-600">{t.free}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t.total}</span>
                    <span>{total} {t.sar}</span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => router.push('/checkout')}
                  >
                    {t.checkout}
                  </Button>
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      {t.continueShopping}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
