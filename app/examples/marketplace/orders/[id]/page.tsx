'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Timeline } from '@/components/ui/timeline'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { formatSAR } from '@/lib/arabic-numbers'
import { Package, Truck, CheckCircle, Clock, MapPin, Phone as PhoneIcon, ChatCircle } from '@phosphor-icons/react'

const mo = {
  en: {
    orderDetail: 'Order Detail',
    backToOrders: 'Back to Orders',
    orderNumber: 'Order Number',
    orderDate: 'Order Date',
    orderStatus: 'Order Status',
    shipped: 'Shipped',
    total: 'Total',
    trackingTimeline: 'Order Tracking',
    placed: 'Order Placed',
    confirmed: 'Order Confirmed',
    shippedStatus: 'Shipped',
    outForDelivery: 'Out for Delivery',
    delivered: 'Delivered',
    products: 'Products',
    qty: 'Qty',
    shippingInfo: 'Shipping Information',
    recipient: 'Recipient',
    address: 'Address',
    phone: 'Phone',
    estimatedDelivery: 'Estimated Delivery',
    contactSeller: 'Contact Seller',
    returnRefund: 'Return / Refund',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'This feature is coming soon.',
  },
  ar: {
    orderDetail: 'تفاصيل الطلب',
    backToOrders: 'العودة إلى الطلبات',
    orderNumber: 'رقم الطلب',
    orderDate: 'تاريخ الطلب',
    orderStatus: 'حالة الطلب',
    shipped: 'تم الشحن',
    total: 'الإجمالي',
    trackingTimeline: 'تتبع الطلب',
    placed: 'تم الطلب',
    confirmed: 'تم التأكيد',
    shippedStatus: 'تم الشحن',
    outForDelivery: 'في الطريق للتسليم',
    delivered: 'تم التسليم',
    products: 'المنتجات',
    qty: 'الكمية',
    shippingInfo: 'معلومات الشحن',
    recipient: 'المستلم',
    address: 'العنوان',
    phone: 'الهاتف',
    estimatedDelivery: 'التسليم المتوقع',
    contactSeller: 'تواصل مع البائع',
    returnRefund: 'إرجاع / استرداد',
    comingSoon: 'قريباً',
    comingSoonDesc: 'هذه الميزة قريباً.',
  },
}

interface OrderProduct {
  id: string
  name: string
  nameAr: string
  quantity: number
  price: number
}

export default function OrderDetailPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'
  const t = mo[locale]
  const { toast } = useToast()

  const [isContactLoading, setIsContactLoading] = React.useState(false)
  const [isReturnLoading, setIsReturnLoading] = React.useState(false)

  const products: OrderProduct[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      nameAr: 'سماعات لاسلكية',
      quantity: 1,
      price: 299,
    },
    {
      id: '2',
      name: 'Mechanical Keyboard',
      nameAr: 'لوحة مفاتيح ميكانيكية',
      quantity: 1,
      price: 499,
    },
  ]

  const orderTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0)

  const timelineItems = [
    {
      icon: <CheckCircle weight="fill" className="h-5 w-5" />,
      title: 'Order Placed',
      titleAr: 'تم الطلب',
      date: 'Mar 10, 2026',
      dateAr: '١٠ مارس ٢٠٢٦',
      status: 'complete' as const,
    },
    {
      icon: <Package weight="fill" className="h-5 w-5" />,
      title: 'Order Confirmed',
      titleAr: 'تم التأكيد',
      date: 'Mar 10, 2026',
      dateAr: '١٠ مارس ٢٠٢٦',
      status: 'complete' as const,
    },
    {
      icon: <Truck weight="fill" className="h-5 w-5" />,
      title: 'Shipped',
      titleAr: 'تم الشحن',
      date: 'Mar 12, 2026',
      dateAr: '١٢ مارس ٢٠٢٦',
      status: 'current' as const,
    },
    {
      icon: <Truck className="h-5 w-5" />,
      title: 'Out for Delivery',
      titleAr: 'في الطريق للتسليم',
      status: 'upcoming' as const,
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Delivered',
      titleAr: 'تم التسليم',
      status: 'upcoming' as const,
    },
  ]

  const handleContactSeller = async () => {
    setIsContactLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsContactLoading(false)
    toast({ title: t.comingSoon, description: t.comingSoonDesc })
  }

  const handleReturnRefund = async () => {
    setIsReturnLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsReturnLoading(false)
    toast({ title: t.comingSoon, description: t.comingSoonDesc })
  }

  return (
    <div className="container py-8">
      {/* Back button */}
      <div className="mb-6">
        <ButtonArrow direction="back" variant="ghost" asChild>
          <Link href="/examples/marketplace/orders">
            {t.backToOrders}
          </Link>
        </ButtonArrow>
      </div>

      {/* Order Header Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {t.orderDetail}
              </h1>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  {t.orderNumber}: <span className="font-mono font-medium text-foreground">ORD-2024-1847</span>
                </p>
                <p>
                  {t.orderDate}: <span className="text-foreground">{isRTL ? '١٠ مارس ٢٠٢٦' : 'Mar 10, 2026'}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-primary/10 text-primary border border-primary/20">
                <Truck className="h-3 w-3 me-1" />
                {t.shipped}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {t.total}: <span className="text-lg font-bold text-foreground">
                  {formatSAR(orderTotal, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {t.trackingTimeline}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline
                items={timelineItems}
                cards
                aria-label={t.trackingTimeline}
              />
            </CardContent>
          </Card>

          {/* Products Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {t.products}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {products.map((product, index) => (
                <React.Fragment key={product.id}>
                  <div className="flex gap-4">
                    {/* Image Placeholder */}
                    <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">
                        {isRTL ? product.nameAr : product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t.qty}: <ArabicNumber value={product.quantity} />
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="font-semibold">
                        {formatSAR(product.price, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                      </p>
                    </div>
                  </div>
                  {index < products.length - 1 && <Separator />}
                </React.Fragment>
              ))}

              <Separator />

              <div className="flex justify-between font-bold pt-2">
                <span>{t.total}</span>
                <span>
                  {formatSAR(orderTotal, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Shipping Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-5 w-5" />
                {t.shippingInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">{t.recipient}:</span>
                <p className="font-medium">{isRTL ? 'أحمد المنصوري' : 'Ahmed Al Mansouri'}</p>
              </div>
              <Separator />
              <div>
                <span className="text-muted-foreground">{t.address}:</span>
                <p className="font-medium">
                  {isRTL
                    ? 'مبنى ١٢٣، طريق الملك فهد، الرياض'
                    : 'Building 123, King Fahd Road, Riyadh'}
                </p>
              </div>
              <Separator />
              <div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <PhoneIcon className="h-3 w-3" />
                  <span>{t.phone}:</span>
                </div>
                <p className="font-medium" dir="ltr">+966 50 123 4567</p>
              </div>
              <Separator />
              <div>
                <span className="text-muted-foreground">{t.estimatedDelivery}:</span>
                <p className="font-medium text-primary">
                  {isRTL ? '١٥ مارس ٢٠٢٦' : 'Mar 15, 2026'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleContactSeller}
                loading={isContactLoading}
              >
                <ChatCircle className="h-4 w-4 me-2" aria-hidden="true" />
                {t.contactSeller}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleReturnRefund}
                loading={isReturnLoading}
              >
                <Package className="h-4 w-4 me-2" aria-hidden="true" />
                {t.returnRefund}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
