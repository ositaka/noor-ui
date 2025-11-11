'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/hooks/use-direction'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { formatSAR } from '@/lib/arabic-numbers'
import { cn } from '@/lib/utils'
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Eye,
  Download,
  MapPin,
  Calendar,
  CreditCard,
  XCircle,
  RotateCcw,
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  date: string
  dateAr: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: {
    id: string
    name: string
    nameAr: string
    image: string
    quantity: number
    price: number
  }[]
  shippingAddress: {
    name: string
    phone: string
    address: string
    city: string
  }
  trackingNumber?: string
}

function generateMockOrders(): Order[] {
  return [
    {
      id: '1',
      orderNumber: 'ORD-2024-001234',
      date: 'Nov 10, 2024',
      dateAr: '١٠ نوفمبر ٢٠٢٤',
      status: 'delivered',
      total: 1297,
      trackingNumber: 'TRK-987654321',
      items: [
        {
          id: '1',
          name: 'Wireless Headphones',
          nameAr: 'سماعات لاسلكية',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          quantity: 2,
          price: 299,
        },
        {
          id: '2',
          name: 'Smart Watch',
          nameAr: 'ساعة ذكية',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          quantity: 1,
          price: 499,
        },
      ],
      shippingAddress: {
        name: 'Ahmed Al-Saud',
        phone: '+966 50 123 4567',
        address: 'Building 123, King Fahd Road',
        city: 'Riyadh',
      },
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-001233',
      date: 'Nov 8, 2024',
      dateAr: '٨ نوفمبر ٢٠٢٤',
      status: 'shipped',
      total: 628,
      trackingNumber: 'TRK-987654322',
      items: [
        {
          id: '3',
          name: 'Mechanical Keyboard',
          nameAr: 'لوحة مفاتيح ميكانيكية',
          image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
          quantity: 1,
          price: 199,
        },
        {
          id: '4',
          name: 'Wireless Mouse',
          nameAr: 'ماوس لاسلكي',
          image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
          quantity: 2,
          price: 99,
        },
      ],
      shippingAddress: {
        name: 'Ahmed Al-Saud',
        phone: '+966 50 123 4567',
        address: 'Building 123, King Fahd Road',
        city: 'Riyadh',
      },
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-001232',
      date: 'Nov 5, 2024',
      dateAr: '٥ نوفمبر ٢٠٢٤',
      status: 'processing',
      total: 523,
      items: [
        {
          id: '5',
          name: 'USB-C Hub',
          nameAr: 'موزع USB-C',
          image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
          quantity: 1,
          price: 149,
        },
      ],
      shippingAddress: {
        name: 'Ahmed Al-Saud',
        phone: '+966 50 123 4567',
        address: 'Building 123, King Fahd Road',
        city: 'Riyadh',
      },
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-001231',
      date: 'Nov 1, 2024',
      dateAr: '١ نوفمبر ٢٠٢٤',
      status: 'cancelled',
      total: 399,
      items: [
        {
          id: '6',
          name: 'Laptop Stand',
          nameAr: 'حامل لابتوب',
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
          quantity: 1,
          price: 89,
        },
      ],
      shippingAddress: {
        name: 'Ahmed Al-Saud',
        phone: '+966 50 123 4567',
        address: 'Building 123, King Fahd Road',
        city: 'Riyadh',
      },
    },
  ]
}

export default function OrdersPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'

  const [orders] = React.useState<Order[]>(generateMockOrders())
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null)

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return Clock
      case 'processing':
        return Package
      case 'shipped':
        return Truck
      case 'delivered':
        return CheckCircle2
      case 'cancelled':
        return XCircle
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  const getStatusText = (status: Order['status']) => {
    if (isRTL) {
      switch (status) {
        case 'pending':
          return 'قيد الانتظار'
        case 'processing':
          return 'قيد المعالجة'
        case 'shipped':
          return 'تم الشحن'
        case 'delivered':
          return 'تم التسليم'
        case 'cancelled':
          return 'ملغي'
      }
    } else {
      switch (status) {
        case 'pending':
          return 'Pending'
        case 'processing':
          return 'Processing'
        case 'shipped':
          return 'Shipped'
        case 'delivered':
          return 'Delivered'
        case 'cancelled':
          return 'Cancelled'
      }
    }
  }

  const filterOrders = (status?: Order['status']) => {
    let filtered = orders

    if (status) {
      filtered = filtered.filter((order) => order.status === status)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some(
            (item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.nameAr.includes(searchQuery)
          )
      )
    }

    return filtered
  }

  if (selectedOrder) {
    const StatusIcon = getStatusIcon(selectedOrder.status)

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
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="hover:text-foreground transition-colors"
                >
                  {isRTL ? 'الطلبات' : 'Orders'}
                </button>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">{selectedOrder.orderNumber}</li>
            </ol>
          </nav>

          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
              {isRTL ? 'العودة إلى الطلبات' : 'Back to Orders'}
            </Button>
          </div>

          {/* Order Details */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {selectedOrder.orderNumber}
                      </CardTitle>
                      <CardDescription>
                        <Calendar className="inline h-4 w-4 me-1" />
                        {isRTL ? selectedOrder.dateAr : selectedOrder.date}
                      </CardDescription>
                    </div>
                    <Badge className={cn('border', getStatusColor(selectedOrder.status))}>
                      <StatusIcon className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                      {getStatusText(selectedOrder.status)}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? 'المنتجات' : 'Order Items'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div
                        className="h-20 w-20 rounded-lg bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">
                          {isRTL ? item.nameAr : item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'الكمية: ' : 'Qty: '}
                          <ArabicNumber value={item.quantity} />
                        </p>
                      </div>
                      <div className="text-end">
                        <p className="font-semibold">
                          {formatSAR(item.price * item.quantity, isRTL)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatSAR(item.price, isRTL)} {isRTL ? 'للقطعة' : 'each'}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tracking Info */}
              {selectedOrder.trackingNumber && (
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? 'معلومات الشحن' : 'Tracking Information'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {isRTL ? 'رقم التتبع' : 'Tracking Number'}
                      </span>
                      <code className="font-mono text-sm">{selectedOrder.trackingNumber}</code>
                    </div>

                    {/* Tracking Timeline */}
                    <div className="space-y-4 pt-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="p-2 bg-green-100 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="w-0.5 h-12 bg-green-200" />
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium">
                            {isRTL ? 'تم التسليم' : 'Delivered'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? '٩ نوفمبر ٢٠٢٤، ٢:٣٠ م' : 'Nov 9, 2024, 2:30 PM'}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="p-2 bg-purple-100 rounded-full">
                            <Truck className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="w-0.5 h-12 bg-muted" />
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium">
                            {isRTL ? 'في طريق التوصيل' : 'Out for Delivery'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? '٩ نوفمبر ٢٠٢٤، ٩:٠٠ ص' : 'Nov 9, 2024, 9:00 AM'}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Package className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="w-0.5 h-12 bg-muted" />
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium">
                            {isRTL ? 'تم الشحن' : 'Shipped'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? '٨ نوفمبر ٢٠٢٤، ٣:٤٥ م' : 'Nov 8, 2024, 3:45 PM'}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="p-2 bg-yellow-100 rounded-full">
                            <Clock className="h-4 w-4 text-yellow-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {isRTL ? 'تم تأكيد الطلب' : 'Order Confirmed'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? selectedOrder.dateAr : selectedOrder.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Total */}
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? 'ملخص الطلب' : 'Order Summary'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {isRTL ? 'المجموع الفرعي' : 'Subtotal'}
                    </span>
                    <span>{formatSAR(selectedOrder.total * 0.8, isRTL)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {isRTL ? 'ضريبة القيمة المضافة' : 'VAT'}
                    </span>
                    <span>{formatSAR(selectedOrder.total * 0.15, isRTL)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {isRTL ? 'الشحن' : 'Shipping'}
                    </span>
                    <span>{formatSAR(selectedOrder.total * 0.05, isRTL)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>{isRTL ? 'الإجمالي' : 'Total'}</span>
                    <span>{formatSAR(selectedOrder.total, isRTL)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {isRTL ? 'عنوان الشحن' : 'Shipping Address'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                  <p className="text-muted-foreground">{selectedOrder.shippingAddress.phone}</p>
                  <p className="text-muted-foreground">{selectedOrder.shippingAddress.address}</p>
                  <p className="text-muted-foreground">{selectedOrder.shippingAddress.city}</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    <Download className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                    {isRTL ? 'تحميل الفاتورة' : 'Download Invoice'}
                  </Button>
                  {selectedOrder.status === 'delivered' && (
                    <Button variant="outline" className="w-full">
                      <RotateCcw className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'طلب إرجاع' : 'Request Return'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
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
            <li className="text-foreground font-medium">
              {isRTL ? 'طلباتي' : 'My Orders'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {isRTL ? 'طلباتي' : 'My Orders'}
          </h1>
          <p className="text-muted-foreground">
            {isRTL
              ? 'تتبع وإدارة طلباتك'
              : 'Track and manage your orders'}
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className={cn(
              'absolute top-3 h-4 w-4 text-muted-foreground',
              isRTL ? 'right-3' : 'left-3'
            )} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRTL ? 'ابحث في الطلبات...' : 'Search orders...'}
              className={isRTL ? 'pe-10' : 'ps-10'}
            />
          </div>
        </div>

        {/* Orders Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl">
            <TabsTrigger value="all">
              {isRTL ? 'الكل' : 'All'}
            </TabsTrigger>
            <TabsTrigger value="processing">
              {isRTL ? 'قيد المعالجة' : 'Processing'}
            </TabsTrigger>
            <TabsTrigger value="shipped">
              {isRTL ? 'تم الشحن' : 'Shipped'}
            </TabsTrigger>
            <TabsTrigger value="delivered">
              {isRTL ? 'تم التسليم' : 'Delivered'}
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              {isRTL ? 'ملغي' : 'Cancelled'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filterOrders().map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{order.orderNumber}</h3>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? order.dateAr : order.date}
                          </p>
                        </div>
                        <Badge className={cn('border', getStatusColor(order.status))}>
                          <StatusIcon className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                          {getStatusText(order.status)}
                        </Badge>
                      </div>

                      <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="h-16 w-16 rounded-lg bg-cover bg-center shrink-0"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            {isRTL ? 'الإجمالي: ' : 'Total: '}
                          </span>
                          <span className="font-bold text-lg">
                            {formatSAR(order.total, isRTL)}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            <div className="space-y-4">
              {filterOrders('processing').map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{order.orderNumber}</h3>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? order.dateAr : order.date}
                          </p>
                        </div>
                        <Badge className={cn('border', getStatusColor(order.status))}>
                          <StatusIcon className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            {isRTL ? 'الإجمالي: ' : 'Total: '}
                          </span>
                          <span className="font-bold text-lg">
                            {formatSAR(order.total, isRTL)}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="shipped" className="mt-6">
            <div className="space-y-4">
              {filterOrders('shipped').map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{order.orderNumber}</h3>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? order.dateAr : order.date}
                          </p>
                        </div>
                        <Badge className={cn('border', getStatusColor(order.status))}>
                          <StatusIcon className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            {isRTL ? 'الإجمالي: ' : 'Total: '}
                          </span>
                          <span className="font-bold text-lg">
                            {formatSAR(order.total, isRTL)}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="mt-6">
            <div className="space-y-4">
              {filterOrders('delivered').map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{order.orderNumber}</h3>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? order.dateAr : order.date}
                          </p>
                        </div>
                        <Badge className={cn('border', getStatusColor(order.status))}>
                          <StatusIcon className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            {isRTL ? 'الإجمالي: ' : 'Total: '}
                          </span>
                          <span className="font-bold text-lg">
                            {formatSAR(order.total, isRTL)}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <div className="space-y-4">
              {filterOrders('cancelled').map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{order.orderNumber}</h3>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? order.dateAr : order.date}
                          </p>
                        </div>
                        <Badge className={cn('border', getStatusColor(order.status))}>
                          <StatusIcon className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            {isRTL ? 'الإجمالي: ' : 'Total: '}
                          </span>
                          <span className="font-bold text-lg">
                            {formatSAR(order.total, isRTL)}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
