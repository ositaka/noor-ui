'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { formatSAR } from '@/lib/arabic-numbers'
import {
  Home,
  ArrowLeft,
  Store,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  Package,
  Clock,
  Award,
  TrendingUp,
  MessageCircle,
  Mail,
  Phone,
  Truck,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

interface Vendor {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  fullDescription: string
  fullDescriptionAr: string
  logo: string
  banner: string
  rating: number
  reviewCount: number
  verified: boolean
  location: string
  locationAr: string
  joinedYear: number
  responseTime: string
  responseTimeAr: string
  productsCount: number
  completedOrders: number
  returnRate: number
  categories: string[]
  categoriesAr: string[]
}

interface Product {
  id: string
  name: string
  nameAr: string
  price: number
  originalPrice?: number
  imageUrl: string
  rating: number
  reviewCount: number
  inStock: boolean
}

const getAllVendors = (): Vendor[] => {
  return [
    {
      id: 'vendor-1',
      name: 'Tech Hub Arabia',
      nameAr: 'مركز التقنية العربي',
      description: 'Premium electronics and gadgets for modern lifestyle',
      descriptionAr: 'إلكترونيات وأجهزة متميزة لأسلوب حياة عصري',
      fullDescription:
        'Tech Hub Arabia has been serving the GCC region since 2020, specializing in premium electronics and cutting-edge technology products. We are committed to providing authentic, high-quality products with excellent customer service. Our team of experts carefully curates each product to ensure it meets the highest standards. We offer competitive prices, fast shipping, and comprehensive after-sales support.',
      fullDescriptionAr:
        'يخدم مركز التقنية العربي منطقة دول مجلس التعاون الخليجي منذ عام 2020، متخصصاً في الإلكترونيات الفاخرة ومنتجات التكنولوجيا المتطورة. نحن ملتزمون بتقديم منتجات أصلية عالية الجودة مع خدمة عملاء ممتازة. يقوم فريق الخبراء لدينا بانتقاء كل منتج بعناية لضمان أنه يلبي أعلى المعايير. نقدم أسعاراً تنافسية وشحناً سريعاً ودعماً شاملاً لما بعد البيع.',
      logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop',
      banner: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 1250,
      verified: true,
      location: 'Dubai, UAE',
      locationAr: 'دبي، الإمارات',
      joinedYear: 2020,
      responseTime: 'Within 2 hours',
      responseTimeAr: 'خلال ساعتين',
      productsCount: 156,
      completedOrders: 3420,
      returnRate: 2.1,
      categories: ['Electronics', 'Audio', 'Wearables', 'Accessories'],
      categoriesAr: ['إلكترونيات', 'صوتيات', 'أجهزة قابلة للارتداء', 'إكسسوارات'],
    },
  ]
}

const getVendorProducts = (): Product[] => {
  return [
    {
      id: 'prod-1',
      name: 'Wireless Noise-Canceling Headphones',
      nameAr: 'سماعات لاسلكية بخاصية إلغاء الضوضاء',
      price: 899,
      originalPrice: 1299,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 234,
      inStock: true,
    },
    {
      id: 'prod-2',
      name: 'Smart Watch Series 5',
      nameAr: 'ساعة ذكية السلسلة 5',
      price: 1499,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 456,
      inStock: true,
    },
    {
      id: 'prod-3',
      name: 'Wireless Earbuds Pro',
      nameAr: 'سماعات أذن لاسلكية برو',
      price: 599,
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 189,
      inStock: true,
    },
    {
      id: 'prod-4',
      name: 'Portable Bluetooth Speaker',
      nameAr: 'مكبر صوت بلوتوث محمول',
      price: 350,
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
      rating: 4.5,
      reviewCount: 123,
      inStock: true,
    },
    {
      id: 'prod-5',
      name: 'Gaming Mouse RGB',
      nameAr: 'ماوس ألعاب RGB',
      price: 199,
      imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 98,
      inStock: true,
    },
    {
      id: 'prod-6',
      name: 'Mechanical Keyboard',
      nameAr: 'لوحة مفاتيح ميكانيكية',
      price: 450,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 276,
      inStock: true,
    },
    {
      id: 'prod-7',
      name: 'USB-C Hub Adapter',
      nameAr: 'محول USB-C',
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
      rating: 4.4,
      reviewCount: 67,
      inStock: true,
    },
    {
      id: 'prod-8',
      name: 'Wireless Charger Stand',
      nameAr: 'حامل شاحن لاسلكي',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1591290619762-8b12ea7eb645?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 145,
      inStock: true,
    },
  ]
}

export default function VendorDetailPage({ params }: { params: { id: string } }) {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'

  const vendors = getAllVendors()
  const vendor = vendors.find((v) => v.id === params.id) || vendors[0]
  const products = getVendorProducts()

  const stats = [
    {
      label: isRTL ? 'المنتجات' : 'Products',
      value: vendor.productsCount,
      icon: Package,
    },
    {
      label: isRTL ? 'الطلبات المكتملة' : 'Completed Orders',
      value: vendor.completedOrders,
      icon: CheckCircle2,
    },
    {
      label: isRTL ? 'معدل الإرجاع' : 'Return Rate',
      value: `${vendor.returnRate}%`,
      icon: TrendingUp,
    },
    {
      label: isRTL ? 'وقت الاستجابة' : 'Response Time',
      value: isRTL ? vendor.responseTimeAr : vendor.responseTime,
      icon: Clock,
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline">
                {isRTL ? 'سوق الخليج' : 'GCC Marketplace'}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/examples/marketplace">
                <ArrowLeft className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                {isRTL ? 'العودة للسوق' : 'Back to Marketplace'}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <nav aria-label="Breadcrumb">
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
                {isRTL ? vendor.nameAr : vendor.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        {/* Vendor Banner */}
        <div
          className="w-full h-48 md:h-64 rounded-2xl bg-cover bg-center mb-8"
          style={{ backgroundImage: `url(${vendor.banner})` }}
        >
          <div className="h-full bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Vendor Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vendor Header */}
            <div className="flex items-start gap-6">
              <div
                className="h-24 w-24 rounded-full bg-cover bg-center shrink-0 border-4 border-background"
                style={{ backgroundImage: `url(${vendor.logo})` }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    {isRTL ? vendor.nameAr : vendor.name}
                  </h1>
                  {vendor.verified && (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  )}
                </div>

                <p className="text-muted-foreground mb-4">
                  {isRTL ? vendor.descriptionAr : vendor.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      <ArabicNumber value={vendor.rating} />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      (<ArabicNumber value={vendor.reviewCount} /> {isRTL ? 'تقييم' : 'reviews'})
                    </span>
                  </div>

                  <Separator orientation="vertical" className="h-4" />

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{isRTL ? vendor.locationAr : vendor.location}</span>
                  </div>

                  <Separator orientation="vertical" className="h-4" />

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {isRTL ? 'منذ' : 'Since'} <ArabicNumber value={vendor.joinedYear} />
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {(isRTL ? vendor.categoriesAr : vendor.categories).map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {typeof stat.value === 'number' ? (
                            <ArabicNumber value={stat.value} />
                          ) : (
                            stat.value
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'عن المتجر' : 'About Store'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {isRTL ? vendor.fullDescriptionAr : vendor.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* Products */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                {isRTL ? 'منتجات المتجر' : 'Store Products'}
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Link key={product.id} href={`/examples/marketplace/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.imageUrl})` }}
                      />
                      <CardHeader>
                        <CardTitle className="text-base line-clamp-2">
                          {isRTL ? product.nameAr : product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-1 mb-3">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            <ArabicNumber value={product.rating} />
                          </span>
                          <span className="text-xs text-muted-foreground">
                            (<ArabicNumber value={product.reviewCount} />)
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold">
                            {formatSAR(product.price, { useArabicNumerals: locale === 'ar', locale: locale === 'ar' ? 'ar' : 'en' })}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatSAR(product.originalPrice, { useArabicNumerals: locale === 'ar', locale: locale === 'ar' ? 'ar' : 'en' })}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'تواصل مع البائع' : 'Contact Vendor'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <MessageCircle className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'إرسال رسالة' : 'Send Message'}
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'بريد إلكتروني' : 'Email'}
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'اتصل' : 'Call'}
                </Button>
              </CardContent>
            </Card>

            {/* Policies */}
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'سياسات المتجر' : 'Store Policies'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">
                      {isRTL ? 'الشحن' : 'Shipping'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL
                        ? 'شحن مجاني للطلبات فوق 300 ريال'
                        : 'Free shipping on orders over SAR 300'}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">
                      {isRTL ? 'الإرجاع' : 'Returns'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL
                        ? 'إرجاع مجاني خلال 14 يوم'
                        : 'Free returns within 14 days'}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">
                      {isRTL ? 'الضمان' : 'Warranty'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL
                        ? 'ضمان أصالة على جميع المنتجات'
                        : 'Authenticity guarantee on all products'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>{isRTL ? 'الإنجازات' : 'Achievements'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm">{isRTL ? 'بائع موثوق' : 'Verified Seller'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">{isRTL ? 'أفضل تقييم' : 'Top Rated'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-sm">{isRTL ? 'مبيعات ممتازة' : 'Excellent Sales'}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}
