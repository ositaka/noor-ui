'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { formatSAR } from '@/lib/arabic-numbers'
import { cn } from '@/lib/utils'
import {
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  Package,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react'

interface OrderItem {
  id: string
  name: string
  nameAr: string
  price: number
  quantity: number
  image: string
}

function generateMockOrderItems(): OrderItem[] {
  return [
    {
      id: '1',
      name: 'Wireless Headphones',
      nameAr: 'سماعات لاسلكية',
      price: 299,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    },
    {
      id: '2',
      name: 'Smart Watch',
      nameAr: 'ساعة ذكية',
      price: 499,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    },
  ]
}

export default function CheckoutPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'
  const t = content[locale]

  const [items] = React.useState<OrderItem[]>(generateMockOrderItems())
  const [currentTab, setCurrentTab] = React.useState('shipping')
  const [orderPlaced, setOrderPlaced] = React.useState(false)

  // Form state
  const [shippingForm, setShippingForm] = React.useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    notes: '',
  })

  const [paymentMethod, setPaymentMethod] = React.useState('credit-card')

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.15
  const shipping = 25
  const total = subtotal + tax + shipping

  const handlePlaceOrder = () => {
    // In a real app, this would process the order
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen">
        <main id="main-content" className="container py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle2 className="h-16 w-16 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">
                    {t.marketplaceCheckout.orderConfirmed}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {t.marketplaceCheckout.thankYouMessage}
                  </p>
                </div>

                <Card className="w-full bg-muted">
                  <CardContent className="p-6">
                    <div className="grid gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t.marketplaceCheckout.orderNumber}
                        </span>
                        <span className="font-mono font-semibold">#ORD-2024-001234</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t.marketplaceCheckout.totalAmount}
                        </span>
                        <span className="font-bold text-lg">
                          {formatSAR(total, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t.marketplaceCheckout.estimatedDelivery}
                        </span>
                        <span className="font-medium">
                          {t.marketplaceCheckout.estimatedDeliveryDays}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/examples/marketplace">
                      {t.marketplaceCheckout.continueShopping}
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/examples/marketplace/orders">
                      {t.marketplaceCheckout.viewOrders}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.marketplaceCheckout.breadcrumb.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples" className="hover:text-foreground transition-colors">
                {t.marketplaceCheckout.breadcrumb.examples}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples/marketplace" className="hover:text-foreground transition-colors">
                {t.marketplaceCheckout.breadcrumb.marketplace}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples/marketplace/cart" className="hover:text-foreground transition-colors">
                {t.marketplaceCheckout.breadcrumb.cart}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {t.marketplaceCheckout.pageTitle}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {t.marketplaceCheckout.pageTitle}
          </h1>
          <p className="text-muted-foreground">
            {t.marketplaceCheckout.pageDescription}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shipping">
                  <MapPin className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {t.marketplaceCheckout.steps.shipping}
                </TabsTrigger>
                <TabsTrigger value="payment">
                  <CreditCard className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {t.marketplaceCheckout.steps.payment}
                </TabsTrigger>
                <TabsTrigger value="review">
                  <Package className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {t.marketplaceCheckout.steps.review}
                </TabsTrigger>
              </TabsList>

              {/* Shipping Tab */}
              <TabsContent value="shipping" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.marketplaceCheckout.shippingAddress}</CardTitle>
                    <CardDescription>
                      {t.marketplaceCheckout.shippingAddressDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">
                          {t.marketplaceCheckout.fullName}
                        </Label>
                        <Input
                          id="fullName"
                          value={shippingForm.fullName}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, fullName: e.target.value })
                          }
                          placeholder={t.marketplaceCheckout.fullNamePlaceholder}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {t.marketplaceCheckout.phoneNumber}
                        </Label>
                        <Input
                          id="phone"
                          value={shippingForm.phone}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, phone: e.target.value })
                          }
                          placeholder={t.marketplaceCheckout.phonePlaceholder}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t.marketplaceCheckout.email}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingForm.email}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, email: e.target.value })
                        }
                        placeholder={t.marketplaceCheckout.emailPlaceholder}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">
                        {t.marketplaceCheckout.address}
                      </Label>
                      <Textarea
                        id="address"
                        value={shippingForm.address}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, address: e.target.value })
                        }
                        placeholder={t.marketplaceCheckout.addressPlaceholder2}
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          {t.marketplaceCheckout.city}
                        </Label>
                        <Input
                          id="city"
                          value={shippingForm.city}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, city: e.target.value })
                          }
                          placeholder={t.marketplaceCheckout.cityExample}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="district">
                          {t.marketplaceCheckout.district}
                        </Label>
                        <Input
                          id="district"
                          value={shippingForm.district}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, district: e.target.value })
                          }
                          placeholder={t.marketplaceCheckout.districtExample}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">
                          {t.marketplaceCheckout.postalCode}
                        </Label>
                        <Input
                          id="postalCode"
                          value={shippingForm.postalCode}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, postalCode: e.target.value })
                          }
                          placeholder={t.marketplaceCheckout.postalCodeExample}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">
                        {t.marketplaceCheckout.deliveryNotes}
                      </Label>
                      <Textarea
                        id="notes"
                        value={shippingForm.notes}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, notes: e.target.value })
                        }
                        placeholder={t.marketplaceCheckout.deliveryNotesPlaceholder}
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button onClick={() => setCurrentTab('payment')}>
                        {isRTL ? (
                          <>
                            التالي
                            <ArrowLeft className="h-4 w-4 ms-2" />
                          </>
                        ) : (
                          <>
                            Next
                            <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Tab */}
              <TabsContent value="payment" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.marketplaceCheckout.paymentMethod}</CardTitle>
                    <CardDescription>
                      {t.marketplaceCheckout.paymentMethodDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {/* Credit Card */}
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label
                          htmlFor="credit-card"
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                        >
                          <div className="p-2 bg-primary/10 rounded">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {t.marketplaceCheckout.creditDebitCard}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t.marketplaceCheckout.paymentOptions.visaMastercard}
                            </div>
                          </div>
                        </Label>
                      </div>

                      {/* Cash on Delivery */}
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label
                          htmlFor="cash"
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                        >
                          <div className="p-2 bg-primary/10 rounded">
                            <Truck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {t.marketplaceCheckout.cashOnDelivery}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t.marketplaceCheckout.paymentOptions.payCash}
                            </div>
                          </div>
                        </Label>
                      </div>

                      {/* Bank Transfer */}
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label
                          htmlFor="bank"
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                        >
                          <div className="p-2 bg-primary/10 rounded">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {t.marketplaceCheckout.bankTransfer}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t.marketplaceCheckout.paymentOptions.transferBank}
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'credit-card' && (
                      <Card className="bg-muted">
                        <CardContent className="p-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">
                              {t.marketplaceCheckout.cardNumber}
                            </Label>
                            <Input
                              id="cardNumber"
                              placeholder={t.marketplaceCheckout.cardNumberExample}
                            />
                          </div>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="expiry">
                                {t.marketplaceCheckout.expiryDate}
                              </Label>
                              <Input id="expiry" placeholder={t.marketplaceCheckout.expiryDatePlaceholder} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex gap-3 justify-between pt-4">
                      <Button variant="outline" onClick={() => setCurrentTab('shipping')}>
                        {isRTL ? (
                          <>
                            <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                            السابق
                          </>
                        ) : (
                          <>
                            <ArrowLeft className="h-4 w-4 me-2" />
                            Previous
                          </>
                        )}
                      </Button>
                      <Button onClick={() => setCurrentTab('review')}>
                        {isRTL ? (
                          <>
                            التالي
                            <ArrowLeft className="h-4 w-4 ms-2" />
                          </>
                        ) : (
                          <>
                            Next
                            <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Review Tab */}
              <TabsContent value="review" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.marketplaceCheckout.reviewOrder2}</CardTitle>
                    <CardDescription>
                      {t.marketplaceCheckout.reviewOrderDescription2}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Shipping Details */}
                    <div>
                      <h3 className="font-semibold mb-3">
                        {t.marketplaceCheckout.shippingAddress}
                      </h3>
                      <Card className="bg-muted">
                        <CardContent className="p-4 space-y-1 text-sm">
                          <p className="font-medium">{shippingForm.fullName || '-'}</p>
                          <p className="text-muted-foreground">{shippingForm.phone || '-'}</p>
                          <p className="text-muted-foreground">{shippingForm.email || '-'}</p>
                          <p className="text-muted-foreground">{shippingForm.address || '-'}</p>
                          <p className="text-muted-foreground">
                            {[shippingForm.district, shippingForm.city, shippingForm.postalCode]
                              .filter(Boolean)
                              .join(', ') || '-'}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-semibold mb-3">
                        {t.marketplaceCheckout.paymentMethod}
                      </h3>
                      <Card className="bg-muted">
                        <CardContent className="p-4">
                          <p className="text-sm">
                            {paymentMethod === 'credit-card' &&
                              (t.marketplaceCheckout.creditDebitCard)}
                            {paymentMethod === 'cash' &&
                              (t.marketplaceCheckout.cashOnDelivery)}
                            {paymentMethod === 'bank' &&
                              (t.marketplaceCheckout.bankTransfer)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold mb-3">
                        {t.marketplaceCheckout.orderItems}
                      </h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div
                              className="h-16 w-16 rounded-lg bg-cover bg-center shrink-0"
                              style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium">
                                {isRTL ? item.nameAr : item.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {t.marketplaceCheckout.qty}
                                <ArabicNumber value={item.quantity} />
                              </p>
                            </div>
                            <div className="text-end shrink-0">
                              <p className="font-medium">
                                {formatSAR(item.price * item.quantity, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 justify-between pt-4">
                      <Button variant="outline" onClick={() => setCurrentTab('payment')}>
                        {isRTL ? (
                          <>
                            <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                            السابق
                          </>
                        ) : (
                          <>
                            <ArrowLeft className="h-4 w-4 me-2" />
                            Previous
                          </>
                        )}
                      </Button>
                      <Button onClick={handlePlaceOrder} size="lg">
                        <CheckCircle2 className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                        {t.marketplaceCheckout.placeOrder}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>{t.marketplaceCheckout.orderSummary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-2 text-sm">
                      <div
                        className="h-12 w-12 rounded bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs line-clamp-1">
                          {isRTL ? item.nameAr : item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <ArabicNumber value={item.quantity} /> × {formatSAR(item.price, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.marketplaceCheckout.subtotal}
                    </span>
                    <span>{formatSAR(subtotal, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.marketplaceCheckout.vat2}
                    </span>
                    <span>{formatSAR(tax, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.marketplaceCheckout.steps.shipping}
                    </span>
                    <span>{formatSAR(shipping, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>{t.marketplaceCheckout.total}</span>
                  <span>{formatSAR(total, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
