'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { formatSAR } from '@/lib/arabic-numbers'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Home,
  Store,
  ShoppingCart,
  Star,
  Search,
  Filter,
  TrendingUp,
  Package,
  Users,
  Heart,
  MapPin,
  Clock,
  Shield,
  Truck,
  CheckCircle2,
  Award,
  Tag,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'

interface Vendor {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  logo: string
  rating: number
  reviewCount: number
  productsCount: number
  verified: boolean
  location: string
  locationAr: string
  joinedYear: number
}

interface Product {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  originalPrice?: number
  currency: 'SAR'
  category: string
  categoryAr: string
  vendor: Vendor
  imageUrl: string
  rating: number
  reviewCount: number
  inStock: boolean
  fastShipping: boolean
  featured: boolean
  badge?: {
    text: string
    textAr: string
    variant: 'default' | 'secondary' | 'destructive'
  }
}

// Mock vendors data
const generateVendors = (): Vendor[] => {
  return [
    {
      id: 'vendor-1',
      name: 'Tech Hub Arabia',
      nameAr: 'مركز التقنية العربي',
      description: 'Premium electronics and gadgets',
      descriptionAr: 'إلكترونيات وأجهزة متميزة',
      logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop',
      rating: 4.8,
      reviewCount: 1250,
      productsCount: 156,
      verified: true,
      location: 'Dubai, UAE',
      locationAr: 'دبي، الإمارات',
      joinedYear: 2020,
    },
    {
      id: 'vendor-2',
      name: 'Fashion Souk',
      nameAr: 'سوق الموضة',
      description: 'Modern & traditional fashion',
      descriptionAr: 'أزياء عصرية وتقليدية',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
      rating: 4.6,
      reviewCount: 890,
      productsCount: 234,
      verified: true,
      location: 'Riyadh, KSA',
      locationAr: 'الرياض، السعودية',
      joinedYear: 2019,
    },
    {
      id: 'vendor-3',
      name: 'Home & Living',
      nameAr: 'المنزل والمعيشة',
      description: 'Furniture and home decor',
      descriptionAr: 'أثاث وديكور منزلي',
      logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
      rating: 4.7,
      reviewCount: 675,
      productsCount: 189,
      verified: true,
      location: 'Abu Dhabi, UAE',
      locationAr: 'أبوظبي، الإمارات',
      joinedYear: 2021,
    },
    {
      id: 'vendor-4',
      name: 'Beauty Corner',
      nameAr: 'ركن الجمال',
      description: 'Cosmetics and skincare',
      descriptionAr: 'مستحضرات التجميل والعناية بالبشرة',
      logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop',
      rating: 4.9,
      reviewCount: 1420,
      productsCount: 312,
      verified: true,
      location: 'Jeddah, KSA',
      locationAr: 'جدة، السعودية',
      joinedYear: 2018,
    },
  ]
}

// Mock products data
const generateProducts = (vendors: Vendor[]): Product[] => {
  const products: Product[] = [
    {
      id: 'prod-1',
      name: 'Wireless Noise-Canceling Headphones',
      nameAr: 'سماعات لاسلكية بخاصية إلغاء الضوضاء',
      description: 'Premium audio quality with active noise cancellation',
      descriptionAr: 'جودة صوت متميزة مع خاصية إلغاء الضوضاء النشطة',
      price: 899,
      originalPrice: 1299,
      currency: 'SAR',
      category: 'Electronics',
      categoryAr: 'إلكترونيات',
      vendor: vendors[0],
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      rating: 4.7,
      reviewCount: 234,
      inStock: true,
      fastShipping: true,
      featured: true,
      badge: { text: '30% OFF', textAr: 'خصم 30%', variant: 'destructive' },
    },
    {
      id: 'prod-2',
      name: 'Smart Watch Series 5',
      nameAr: 'ساعة ذكية السلسلة 5',
      description: 'Track your fitness and stay connected',
      descriptionAr: 'تتبع لياقتك وابق على اتصال',
      price: 1499,
      currency: 'SAR',
      category: 'Electronics',
      categoryAr: 'إلكترونيات',
      vendor: vendors[0],
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
      rating: 4.8,
      reviewCount: 456,
      inStock: true,
      fastShipping: true,
      featured: true,
      badge: { text: 'Best Seller', textAr: 'الأكثر مبيعاً', variant: 'default' },
    },
    {
      id: 'prod-3',
      name: 'Designer Abaya Collection',
      nameAr: 'مجموعة العباءات المصممة',
      description: 'Elegant and modern abaya designs',
      descriptionAr: 'تصاميم عباءات أنيقة وعصرية',
      price: 450,
      currency: 'SAR',
      category: 'Fashion',
      categoryAr: 'أزياء',
      vendor: vendors[1],
      imageUrl: 'https://images.unsplash.com/photo-1585487000143-3203763acfd1?w=800&h=600&fit=crop',
      rating: 4.9,
      reviewCount: 189,
      inStock: true,
      fastShipping: false,
      featured: true,
    },
    {
      id: 'prod-4',
      name: 'Luxury Thobe - White',
      nameAr: 'ثوب فاخر - أبيض',
      description: 'Premium quality traditional thobe',
      descriptionAr: 'ثوب تقليدي بجودة فاخرة',
      price: 350,
      currency: 'SAR',
      category: 'Fashion',
      categoryAr: 'أزياء',
      vendor: vendors[1],
      imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=600&fit=crop',
      rating: 4.6,
      reviewCount: 123,
      inStock: true,
      fastShipping: true,
      featured: false,
    },
    {
      id: 'prod-5',
      name: 'Modern L-Shaped Sofa',
      nameAr: 'كنبة على شكل L عصرية',
      description: 'Comfortable seating for your living room',
      descriptionAr: 'جلوس مريح لغرفة المعيشة',
      price: 3200,
      currency: 'SAR',
      category: 'Furniture',
      categoryAr: 'أثاث',
      vendor: vendors[2],
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      rating: 4.5,
      reviewCount: 87,
      inStock: true,
      fastShipping: false,
      featured: true,
    },
    {
      id: 'prod-6',
      name: 'Arabian Coffee Table Set',
      nameAr: 'طقم طاولة قهوة عربية',
      description: 'Traditional design with modern finish',
      descriptionAr: 'تصميم تقليدي بلمسة عصرية',
      price: 850,
      currency: 'SAR',
      category: 'Furniture',
      categoryAr: 'أثاث',
      vendor: vendors[2],
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop',
      rating: 4.7,
      reviewCount: 65,
      inStock: true,
      fastShipping: true,
      featured: false,
    },
    {
      id: 'prod-7',
      name: 'Luxury Perfume Set',
      nameAr: 'طقم عطور فاخر',
      description: 'Oud-based fragrances collection',
      descriptionAr: 'مجموعة عطور بأساس العود',
      price: 650,
      currency: 'SAR',
      category: 'Beauty',
      categoryAr: 'جمال',
      vendor: vendors[3],
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop',
      rating: 4.8,
      reviewCount: 312,
      inStock: true,
      fastShipping: true,
      featured: true,
      badge: { text: 'New Arrival', textAr: 'وصل حديثاً', variant: 'secondary' },
    },
    {
      id: 'prod-8',
      name: 'Organic Skincare Bundle',
      nameAr: 'حزمة العناية بالبشرة العضوية',
      description: 'Natural ingredients for radiant skin',
      descriptionAr: 'مكونات طبيعية لبشرة مشرقة',
      price: 380,
      currency: 'SAR',
      category: 'Beauty',
      categoryAr: 'جمال',
      vendor: vendors[3],
      imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop',
      rating: 4.9,
      reviewCount: 278,
      inStock: true,
      fastShipping: true,
      featured: false,
    },
  ]

  return products
}

export default function MarketplacePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'

  const vendors = React.useMemo(() => generateVendors(), [])
  const products = React.useMemo(() => generateProducts(vendors), [vendors])

  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedVendor, setSelectedVendor] = React.useState<string>('all')

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameAr.includes(searchQuery)
      const matchesVendor = selectedVendor === 'all' || product.vendor.id === selectedVendor
      return matchesCategory && matchesSearch && matchesVendor
    })
  }, [products, selectedCategory, searchQuery, selectedVendor])

  const featuredProducts = products.filter((p) => p.featured)

  const categories = [
    { value: 'all', label: isRTL ? 'الكل' : 'All Categories' },
    { value: 'electronics', label: isRTL ? 'إلكترونيات' : 'Electronics' },
    { value: 'fashion', label: isRTL ? 'أزياء' : 'Fashion' },
    { value: 'furniture', label: isRTL ? 'أثاث' : 'Furniture' },
    { value: 'beauty', label: isRTL ? 'جمال' : 'Beauty' },
  ]

  const stats = [
    { label: isRTL ? 'البائعون النشطون' : 'Active Vendors', value: '200+', icon: Store },
    { label: isRTL ? 'المنتجات المتاحة' : 'Products Available', value: '50K+', icon: Package },
    { label: isRTL ? 'العملاء السعداء' : 'Happy Customers', value: '100K+', icon: Users },
    { label: isRTL ? 'الطلبات الشهرية' : 'Monthly Orders', value: '25K+', icon: TrendingUp },
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
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/examples/marketplace/cart">
                <ShoppingCart className="h-5 w-5" />
                <Badge variant="destructive" className="ms-2 -me-2">3</Badge>
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/examples">{isRTL ? 'الأمثلة' : 'Examples'}</Link>
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
              <li className="text-foreground font-medium">
                {isRTL ? 'السوق الإلكتروني' : 'Marketplace'}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {isRTL ? 'سوق الخليج متعدد البائعين' : 'GCC Multi-Vendor Marketplace'}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="default">{isRTL ? 'جاهز' : 'Ready'}</Badge>
                <Badge variant="outline">GCC</Badge>
                <Badge variant="outline">{isRTL ? 'متعدد البائعين' : 'Multi-Vendor'}</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {isRTL
              ? 'منصة سوق إلكتروني شاملة متعددة البائعين مصممة لأسواق دول مجلس التعاون الخليجي. تتميز بدعم ثنائي اللغة، تنسيق العملات، وتكامل مع وسائل الدفع المحلية.'
              : 'Comprehensive multi-vendor marketplace platform designed for GCC markets. Features bilingual support, currency formatting, and integration with local payment methods.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'لماذا تختار منصتنا؟' : 'Why Choose Our Platform?'}</CardTitle>
              <CardDescription>
                {isRTL
                  ? 'مصممة خصيصاً لاحتياجات السوق الخليجية'
                  : 'Built specifically for GCC market needs'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isRTL ? 'بائعون موثوقون' : 'Verified Vendors'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRTL
                        ? 'جميع البائعين تم التحقق منهم ومراجعتهم'
                        : 'All vendors are verified and reviewed'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isRTL ? 'شحن سريع' : 'Fast Shipping'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRTL
                        ? 'توصيل سريع في جميع أنحاء دول مجلس التعاون'
                        : 'Quick delivery across GCC countries'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isRTL ? 'ضمان الجودة' : 'Quality Guarantee'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRTL
                        ? 'منتجات عالية الجودة مع ضمان استرداد الأموال'
                        : 'High-quality products with money-back guarantee'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Featured Vendors */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              {isRTL ? 'البائعون المميزون' : 'Featured Vendors'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'تسوق من أفضل البائعين' : 'Shop from top-rated sellers'}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vendors.map((vendor) => (
              <Link key={vendor.id} href={`/examples/marketplace/vendor/${vendor.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="h-20 w-20 rounded-full bg-cover bg-center mb-4"
                        style={{ backgroundImage: `url(${vendor.logo})` }}
                      />
                      <div className="flex items-center gap-1 mb-2">
                        <h3 className="font-semibold">{isRTL ? vendor.nameAr : vendor.name}</h3>
                        {vendor.verified && (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {isRTL ? vendor.descriptionAr : vendor.description}
                      </p>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          <ArabicNumber value={vendor.rating} />
                        </span>
                        <span className="text-sm text-muted-foreground">
                          (<ArabicNumber value={vendor.reviewCount} />)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Package className="h-3 w-3" />
                        <span>
                          <ArabicNumber value={vendor.productsCount} />{' '}
                          {isRTL ? 'منتج' : 'products'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              {isRTL ? 'المنتجات المميزة' : 'Featured Products'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'أفضل العروض والمنتجات الجديدة' : 'Best deals and new arrivals'}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/examples/marketplace/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.imageUrl})` }}
                    />
                    {product.badge && (
                      <Badge
                        variant={product.badge.variant}
                        className="absolute top-2 start-2"
                      >
                        {isRTL ? product.badge.textAr : product.badge.text}
                      </Badge>
                    )}
                    {product.fastShipping && (
                      <Badge
                        variant="secondary"
                        className="absolute top-2 end-2 flex items-center gap-1"
                      >
                        <Truck className="h-3 w-3" />
                        {isRTL ? 'شحن سريع' : 'Fast'}
                      </Badge>
                    )}
                  </div>

                  <CardHeader>
                    <div className="text-xs text-muted-foreground mb-1">
                      {isRTL ? product.vendor.nameAr : product.vendor.name}
                    </div>
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
                      <span className="text-xl font-bold">
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
        </section>

        {/* All Products */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              {isRTL ? 'جميع المنتجات' : 'All Products'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'تصفح كامل الكتالوج' : 'Browse our complete catalog'}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                type="search"
                placeholder={isRTL ? 'ابحث عن المنتجات...' : 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder={isRTL ? 'جميع البائعين' : 'All Vendors'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isRTL ? 'جميع البائعين' : 'All Vendors'}</SelectItem>
                {vendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    {isRTL ? vendor.nameAr : vendor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/examples/marketplace/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.imageUrl})` }}
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">
                          {isRTL ? 'نفذت الكمية' : 'Out of Stock'}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      {isRTL ? product.vendor.nameAr : product.vendor.name}
                      {product.vendor.verified && (
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      )}
                    </div>
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

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-lg font-bold">
                        {formatSAR(product.price, { useArabicNumerals: locale === 'ar', locale: locale === 'ar' ? 'ar' : 'en' })}
                      </span>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {isRTL ? product.categoryAr : product.category}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {isRTL ? 'لم يتم العثور على منتجات' : 'No products found'}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
