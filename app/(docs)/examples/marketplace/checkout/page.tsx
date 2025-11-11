'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/hooks/use-direction'
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
                    {isRTL ? 'تم تأكيد طلبك!' : 'Order Confirmed!'}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {isRTL
                      ? 'شكراً لك على طلبك. سنرسل لك تفاصيل الشحن قريباً.'
                      : 'Thank you for your order. We will send you shipping details soon.'}
                  </p>
                </div>

                <Card className="w-full bg-muted">
                  <CardContent className="p-6">
                    <div className="grid gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {isRTL ? 'رقم الطلب' : 'Order Number'}
                        </span>
                        <span className="font-mono font-semibold">#ORD-2024-001234</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {isRTL ? 'المبلغ الإجمالي' : 'Total Amount'}
                        </span>
                        <span className="font-bold text-lg">
                          {formatSAR(total, isRTL)}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {isRTL ? 'الوقت المتوقع للتوصيل' : 'Estimated Delivery'}
                        </span>
                        <span className="font-medium">
                          {isRTL ? '٣-٥ أيام عمل' : '3-5 business days'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/examples/marketplace">
                      {isRTL ? 'متابعة التسوق' : 'Continue Shopping'}
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/examples/marketplace/orders">
                      {isRTL ? 'عرض الطلبات' : 'View Orders'}
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
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples" className="hover:text-foreground transition-colors">
                {isRTL ? 'الأمثلة' : 'Examples'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples/marketplace" className="hover:text-foreground transition-colors">
                {isRTL ? 'السوق' : 'Marketplace'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples/marketplace/cart" className="hover:text-foreground transition-colors">
                {isRTL ? 'سلة التسوق' : 'Cart'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {isRTL ? 'إتمام الطلب' : 'Checkout'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {isRTL ? 'إتمام الطلب' : 'Checkout'}
          </h1>
          <p className="text-muted-foreground">
            {isRTL
              ? 'أكمل معلومات الشحن والدفع لإتمام طلبك'
              : 'Complete your shipping and payment information to place your order'}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shipping">
                  <MapPin className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'الشحن' : 'Shipping'}
                </TabsTrigger>
                <TabsTrigger value="payment">
                  <CreditCard className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'الدفع' : 'Payment'}
                </TabsTrigger>
                <TabsTrigger value="review">
                  <Package className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'المراجعة' : 'Review'}
                </TabsTrigger>
              </TabsList>

              {/* Shipping Tab */}
              <TabsContent value="shipping" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? 'عنوان الشحن' : 'Shipping Address'}</CardTitle>
                    <CardDescription>
                      {isRTL
                        ? 'أدخل عنوانك الكامل لتوصيل الطلب'
                        : 'Enter your full address for order delivery'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">
                          {isRTL ? 'الاسم الكامل' : 'Full Name'}
                        </Label>
                        <Input
                          id="fullName"
                          value={shippingForm.fullName}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, fullName: e.target.value })
                          }
                          placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                        </Label>
                        <Input
                          id="phone"
                          value={shippingForm.phone}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, phone: e.target.value })
                          }
                          placeholder={isRTL ? '+٩٦٦ ٥٠ ١٢٣ ٤٥٦٧' : '+966 50 123 4567'}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {isRTL ? 'البريد الإلكتروني' : 'Email'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingForm.email}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, email: e.target.value })
                        }
                        placeholder={isRTL ? 'email@example.com' : 'email@example.com'}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">
                        {isRTL ? 'العنوان' : 'Address'}
                      </Label>
                      <Textarea
                        id="address"
                        value={shippingForm.address}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, address: e.target.value })
                        }
                        placeholder={
                          isRTL
                            ? 'رقم المبنى، اسم الشارع'
                            : 'Building number, street name'
                        }
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          {isRTL ? 'المدينة' : 'City'}
                        </Label>
                        <Input
                          id="city"
                          value={shippingForm.city}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, city: e.target.value })
                          }
                          placeholder={isRTL ? 'الرياض' : 'Riyadh'}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="district">
                          {isRTL ? 'الحي' : 'District'}
                        </Label>
                        <Input
                          id="district"
                          value={shippingForm.district}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, district: e.target.value })
                          }
                          placeholder={isRTL ? 'العليا' : 'Al Olaya'}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">
                          {isRTL ? 'الرمز البريدي' : 'Postal Code'}
                        </Label>
                        <Input
                          id="postalCode"
                          value={shippingForm.postalCode}
                          onChange={(e) =>
                            setShippingForm({ ...shippingForm, postalCode: e.target.value })
                          }
                          placeholder={isRTL ? '١٢٣٤٥' : '12345'}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">
                        {isRTL ? 'ملاحظات التوصيل (اختياري)' : 'Delivery Notes (Optional)'}
                      </Label>
                      <Textarea
                        id="notes"
                        value={shippingForm.notes}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, notes: e.target.value })
                        }
                        placeholder={
                          isRTL
                            ? 'أي تعليمات خاصة للتوصيل...'
                            : 'Any special delivery instructions...'
                        }
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
                            <ArrowRight className="h-4 w-4 ms-2" />
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
                    <CardTitle>{isRTL ? 'طريقة الدفع' : 'Payment Method'}</CardTitle>
                    <CardDescription>
                      {isRTL
                        ? 'اختر طريقة الدفع المفضلة لديك'
                        : 'Choose your preferred payment method'}
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
                              {isRTL ? 'بطاقة ائتمان/خصم' : 'Credit/Debit Card'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {isRTL
                                ? 'فيزا، ماستركارد، مدى'
                                : 'Visa, Mastercard, Mada'}
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
                              {isRTL ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {isRTL
                                ? 'ادفع نقداً عند استلام طلبك'
                                : 'Pay cash when you receive your order'}
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
                              {isRTL ? 'تحويل بنكي' : 'Bank Transfer'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {isRTL
                                ? 'حوّل المبلغ مباشرة إلى حسابنا البنكي'
                                : 'Transfer directly to our bank account'}
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
                              {isRTL ? 'رقم البطاقة' : 'Card Number'}
                            </Label>
                            <Input
                              id="cardNumber"
                              placeholder={isRTL ? '١٢٣٤ ٥٦٧٨ ٩٠١٢ ٣٤٥٦' : '1234 5678 9012 3456'}
                            />
                          </div>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="expiry">
                                {isRTL ? 'تاريخ الانتهاء' : 'Expiry Date'}
                              </Label>
                              <Input id="expiry" placeholder={isRTL ? 'MM/YY' : 'MM/YY'} />
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
                            <ArrowRight className="h-4 w-4 ms-2" />
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
                            <ArrowRight className="h-4 w-4 ms-2" />
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
                    <CardTitle>{isRTL ? 'مراجعة الطلب' : 'Review Order'}</CardTitle>
                    <CardDescription>
                      {isRTL
                        ? 'تحقق من تفاصيل طلبك قبل التأكيد'
                        : 'Review your order details before confirming'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Shipping Details */}
                    <div>
                      <h3 className="font-semibold mb-3">
                        {isRTL ? 'عنوان الشحن' : 'Shipping Address'}
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
                        {isRTL ? 'طريقة الدفع' : 'Payment Method'}
                      </h3>
                      <Card className="bg-muted">
                        <CardContent className="p-4">
                          <p className="text-sm">
                            {paymentMethod === 'credit-card' &&
                              (isRTL ? 'بطاقة ائتمان/خصم' : 'Credit/Debit Card')}
                            {paymentMethod === 'cash' &&
                              (isRTL ? 'الدفع عند الاستلام' : 'Cash on Delivery')}
                            {paymentMethod === 'bank' &&
                              (isRTL ? 'تحويل بنكي' : 'Bank Transfer')}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold mb-3">
                        {isRTL ? 'المنتجات' : 'Order Items'}
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
                                {isRTL ? 'الكمية: ' : 'Qty: '}
                                <ArabicNumber value={item.quantity} />
                              </p>
                            </div>
                            <div className="text-end shrink-0">
                              <p className="font-medium">
                                {formatSAR(item.price * item.quantity, isRTL)}
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
                            <ArrowRight className="h-4 w-4 ms-2" />
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
                        {isRTL ? 'تأكيد الطلب' : 'Place Order'}
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
                <CardTitle>{isRTL ? 'ملخص الطلب' : 'Order Summary'}</CardTitle>
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
                          <ArabicNumber value={item.quantity} /> × {formatSAR(item.price, isRTL)}
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
                      {isRTL ? 'المجموع الفرعي' : 'Subtotal'}
                    </span>
                    <span>{formatSAR(subtotal, isRTL)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isRTL ? 'ضريبة القيمة المضافة' : 'VAT'}
                    </span>
                    <span>{formatSAR(tax, isRTL)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isRTL ? 'الشحن' : 'Shipping'}
                    </span>
                    <span>{formatSAR(shipping, isRTL)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>{isRTL ? 'الإجمالي' : 'Total'}</span>
                  <span>{formatSAR(total, isRTL)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
