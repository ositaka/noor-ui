'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDirection } from '@/components/providers/direction-provider'
import { useCart } from '@/starters/ecommerce/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group'

export default function CheckoutPage() {
  const { locale } = useDirection()
  const { items, total, clearCart } = useCart()
  const router = useRouter()

  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card',
  })

  const text = {
    en: {
      title: 'Checkout',
      shipping: 'Shipping Information',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      address: 'Address',
      city: 'City',
      zip: 'ZIP Code',
      payment: 'Payment Method',
      card: 'Credit/Debit Card',
      cash: 'Cash on Delivery',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      shippingCost: 'Shipping',
      total: 'Total',
      placeOrder: 'Place Order',
      sar: 'SAR',
      free: 'Free',
      items: 'items',
    },
    ar: {
      title: 'إتمام الطلب',
      shipping: 'معلومات الشحن',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      address: 'العنوان',
      city: 'المدينة',
      zip: 'الرمز البريدي',
      payment: 'طريقة الدفع',
      card: 'بطاقة ائتمان/خصم',
      cash: 'الدفع عند الاستلام',
      orderSummary: 'ملخص الطلب',
      subtotal: 'المجموع الفرعي',
      shippingCost: 'الشحن',
      total: 'الإجمالي',
      placeOrder: 'تأكيد الطلب',
      sar: 'ريال',
      free: 'مجاني',
      items: 'منتج',
    },
  }
  const t = text[locale]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, process the order here
    clearCart()
    router.push('/success')
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <Link href="/cart">
            <ButtonArrow variant="ghost" size="icon" direction="back" icon="arrow" />
          </Link>
          <h1 className="text-xl font-bold ms-4">{t.title}</h1>
        </div>
      </header>

      {/* Checkout Form */}
      <section className="py-8">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.shipping}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{t.fullName}</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.email}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.phone}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">{t.address}</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">{t.city}</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">{t.zip}</Label>
                        <Input
                          id="zip"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.payment}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="h-4 w-4"
                        />
                        <span>{t.card}</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="h-4 w-4"
                        />
                        <span>{t.cash}</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>{t.orderSummary}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.quantity}x {locale === 'ar' ? item.nameAr : item.name}
                          </span>
                          <span>{item.price * item.quantity} {t.sar}</span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.subtotal}</span>
                        <span className="font-medium">{total} {t.sar}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.shippingCost}</span>
                        <span className="font-medium text-green-600">{t.free}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t.total}</span>
                      <span>{total} {t.sar}</span>
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      {t.placeOrder}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
