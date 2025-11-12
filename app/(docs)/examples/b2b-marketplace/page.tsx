'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { formatSAR } from '@/lib/arabic-numbers'
import { cn } from '@/lib/utils'
import {
  Search,
  ShoppingCart,
  FileText,
  Package,
  TrendingDown,
  Building2,
  MessageSquare,
  Star,
  CheckCircle2,
} from 'lucide-react'

interface Product {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  category: string
  categoryAr: string
  image: string
  basePrice: number
  moq: number // Minimum Order Quantity
  priceTiers: {
    min: number
    max: number | null
    price: number
    discount: number
  }[]
  unit: string
  unitAr: string
  supplier: {
    name: string
    nameAr: string
    verified: boolean
    rating: number
  }
  leadTime: string
  leadTimeAr: string
  inStock: boolean
}

function generateMockProducts(): Product[] {
  return [
    {
      id: 'industrial-printer',
      name: 'Industrial Label Printer',
      nameAr: 'طابعة الملصقات الصناعية',
      description: 'High-speed industrial thermal label printer for warehouse operations',
      descriptionAr: 'طابعة ملصقات حرارية صناعية عالية السرعة لعمليات المستودعات',
      category: 'Office Equipment',
      categoryAr: 'معدات مكتبية',
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400',
      basePrice: 2499,
      moq: 5,
      priceTiers: [
        { min: 5, max: 9, price: 2499, discount: 0 },
        { min: 10, max: 24, price: 2299, discount: 8 },
        { min: 25, max: 49, price: 2099, discount: 16 },
        { min: 50, max: null, price: 1899, discount: 24 },
      ],
      unit: 'unit',
      unitAr: 'وحدة',
      supplier: {
        name: 'TechSupply Co.',
        nameAr: 'شركة التوريدات التقنية',
        verified: true,
        rating: 4.8,
      },
      leadTime: '5-7 business days',
      leadTimeAr: '٥-٧ أيام عمل',
      inStock: true,
    },
    {
      id: 'office-chairs',
      name: 'Ergonomic Office Chair',
      nameAr: 'كرسي مكتب مريح',
      description: 'Premium ergonomic office chair with lumbar support and adjustable armrests',
      descriptionAr: 'كرسي مكتب مريح فاخر مع دعم قطني ومساند ذراع قابلة للتعديل',
      category: 'Office Furniture',
      categoryAr: 'أثاث مكتبي',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
      basePrice: 899,
      moq: 10,
      priceTiers: [
        { min: 10, max: 24, price: 899, discount: 0 },
        { min: 25, max: 49, price: 799, discount: 11 },
        { min: 50, max: 99, price: 699, discount: 22 },
        { min: 100, max: null, price: 599, discount: 33 },
      ],
      unit: 'unit',
      unitAr: 'وحدة',
      supplier: {
        name: 'Office Plus',
        nameAr: 'أوفيس بلس',
        verified: true,
        rating: 4.6,
      },
      leadTime: '7-10 business days',
      leadTimeAr: '٧-١٠ أيام عمل',
      inStock: true,
    },
    {
      id: 'network-cables',
      name: 'Cat6 Ethernet Cable Box',
      nameAr: 'صندوق كابل إيثرنت Cat6',
      description: '305m Cat6 ethernet cable box for network installations',
      descriptionAr: 'صندوق كابل إيثرنت Cat6 بطول ٣٠٥ متر لتركيبات الشبكات',
      category: 'Networking',
      categoryAr: 'شبكات',
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
      basePrice: 349,
      moq: 20,
      priceTiers: [
        { min: 20, max: 49, price: 349, discount: 0 },
        { min: 50, max: 99, price: 319, discount: 9 },
        { min: 100, max: 199, price: 289, discount: 17 },
        { min: 200, max: null, price: 259, discount: 26 },
      ],
      unit: 'box',
      unitAr: 'صندوق',
      supplier: {
        name: 'NetSupply Saudi',
        nameAr: 'نت سبلاي السعودية',
        verified: true,
        rating: 4.9,
      },
      leadTime: '3-5 business days',
      leadTimeAr: '٣-٥ أيام عمل',
      inStock: true,
    },
    {
      id: 'led-panels',
      name: 'LED Panel Light 60x60cm',
      nameAr: 'لوحة إضاءة LED ٦٠×٦٠ سم',
      description: 'Energy-efficient LED panel lights for commercial spaces',
      descriptionAr: 'لوحات إضاءة LED موفرة للطاقة للمساحات التجارية',
      category: 'Lighting',
      categoryAr: 'إضاءة',
      image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400',
      basePrice: 149,
      moq: 50,
      priceTiers: [
        { min: 50, max: 99, price: 149, discount: 0 },
        { min: 100, max: 249, price: 129, discount: 13 },
        { min: 250, max: 499, price: 109, discount: 27 },
        { min: 500, max: null, price: 89, discount: 40 },
      ],
      unit: 'unit',
      unitAr: 'وحدة',
      supplier: {
        name: 'LightTech Arabia',
        nameAr: 'لايت تيك العربية',
        verified: true,
        rating: 4.7,
      },
      leadTime: '10-14 business days',
      leadTimeAr: '١٠-١٤ يوم عمل',
      inStock: true,
    },
    {
      id: 'copy-paper',
      name: 'A4 Copy Paper (2500 sheets)',
      nameAr: 'ورق طباعة A4 (٢٥٠٠ ورقة)',
      description: 'Premium white copy paper, 80gsm, 5 reams per box',
      descriptionAr: 'ورق طباعة أبيض فاخر، ٨٠ جرام، ٥ رزم في الصندوق',
      category: 'Office Supplies',
      categoryAr: 'مستلزمات مكتبية',
      image: 'https://images.unsplash.com/photo-1586281380614-0c3bc60e3414?w=400',
      basePrice: 89,
      moq: 30,
      priceTiers: [
        { min: 30, max: 99, price: 89, discount: 0 },
        { min: 100, max: 249, price: 79, discount: 11 },
        { min: 250, max: 499, price: 69, discount: 22 },
        { min: 500, max: null, price: 59, discount: 34 },
      ],
      unit: 'box',
      unitAr: 'صندوق',
      supplier: {
        name: 'Paper World',
        nameAr: 'عالم الورق',
        verified: false,
        rating: 4.4,
      },
      leadTime: '2-3 business days',
      leadTimeAr: '٢-٣ أيام عمل',
      inStock: true,
    },
    {
      id: 'security-camera',
      name: '4K Security Camera System',
      nameAr: 'نظام كاميرا مراقبة 4K',
      description: '8-channel 4K security camera system with NVR',
      descriptionAr: 'نظام كاميرا مراقبة 4K بـ ٨ قنوات مع مسجل شبكي',
      category: 'Security',
      categoryAr: 'أمن وحماية',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400',
      basePrice: 3499,
      moq: 3,
      priceTiers: [
        { min: 3, max: 9, price: 3499, discount: 0 },
        { min: 10, max: 19, price: 3199, discount: 9 },
        { min: 20, max: 49, price: 2899, discount: 17 },
        { min: 50, max: null, price: 2599, discount: 26 },
      ],
      unit: 'system',
      unitAr: 'نظام',
      supplier: {
        name: 'SecureTech KSA',
        nameAr: 'سيكيور تيك السعودية',
        verified: true,
        rating: 4.9,
      },
      leadTime: '7-10 business days',
      leadTimeAr: '٧-١٠ أيام عمل',
      inStock: true,
    },
  ]
}

export default function B2BMarketplacePage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'

  const [products] = React.useState<Product[]>(generateMockProducts())
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')

  const categories = React.useMemo(() => {
    const cats = new Set(products.map((p) => p.category))
    return Array.from(cats)
  }, [products])

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameAr.includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.descriptionAr.includes(searchQuery)
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchQuery])

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
            <li className="text-foreground font-medium">
              {isRTL ? 'السوق B2B' : 'B2B Marketplace'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {isRTL ? 'السوق B2B' : 'B2B Marketplace'}
              </h1>
              <p className="text-xl text-muted-foreground">
                {isRTL
                  ? 'حلول الشراء بالجملة للأعمال التجارية'
                  : 'Bulk purchasing solutions for businesses'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/examples/b2b-marketplace/rfq">
                  <MessageSquare className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'طلب عرض سعر' : 'Request Quote'}
                </Link>
              </Button>
              <Button asChild>
                <Link href="/examples/b2b-marketplace/dashboard">
                  <Building2 className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      <ArabicNumber value={500} />+
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? 'المنتجات' : 'Products'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      <ArabicNumber value={150} />+
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? 'الموردين' : 'Suppliers'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      <ArabicNumber value={40} />%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? 'خصم الكمية' : 'Bulk Discount'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      <ArabicNumber value={30} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? 'يوم للدفع' : 'Days Credit'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className={cn(
                'absolute top-3 h-4 w-4 text-muted-foreground',
                isRTL ? 'right-3' : 'left-3'
              )}
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRTL ? 'ابحث عن المنتجات...' : 'Search products...'}
              className={isRTL ? 'pe-10' : 'ps-10'}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder={isRTL ? 'جميع الفئات' : 'All Categories'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? 'جميع الفئات' : 'All Categories'}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${product.image})` }}
              >
                <div className="absolute top-3 start-3">
                  <Badge className="bg-red-600">
                    {isRTL ? 'خصم حتى ' : 'Up to '}
                    <ArabicNumber value={product.priceTiers[product.priceTiers.length - 1].discount} />%
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">
                      {isRTL ? product.nameAr : product.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {isRTL ? product.descriptionAr : product.description}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {product.supplier.verified && (
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    )}
                    <span>{isRTL ? product.supplier.nameAr : product.supplier.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <ArabicNumber value={product.supplier.rating} />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Base Price */}
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? 'يبدأ من:' : 'Starting at:'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {formatSAR(product.priceTiers[0].price, isRTL)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {isRTL ? product.unitAr : product.unit}
                    </span>
                  </div>
                </div>

                {/* MOQ */}
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {isRTL ? 'الحد الأدنى للطلب' : 'Minimum Order'}
                    </span>
                    <span className="font-medium">
                      <ArabicNumber value={product.moq} /> {isRTL ? product.unitAr : product.unit}
                    </span>
                  </div>
                </div>

                {/* Volume Pricing Preview */}
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    {isRTL ? 'التسعير حسب الكمية:' : 'Volume Pricing:'}
                  </p>
                  <div className="space-y-1">
                    {product.priceTiers.slice(0, 3).map((tier, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          <ArabicNumber value={tier.min} />
                          {tier.max ? `- ${tier.max}` : '+'}{' '}
                          {isRTL ? product.unitAr : product.unit}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formatSAR(tier.price, isRTL)}</span>
                          {tier.discount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              -<ArabicNumber value={tier.discount} />%
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead Time */}
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="text-muted-foreground">
                    {isRTL ? 'مدة التسليم' : 'Lead Time'}
                  </span>
                  <span className="font-medium">
                    {isRTL ? product.leadTimeAr : product.leadTime}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/examples/b2b-marketplace/${product.id}`}>
                      {isRTL ? 'التفاصيل' : 'Details'}
                    </Link>
                  </Button>
                  <Button className="flex-1">
                    <ShoppingCart className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                    {isRTL ? 'طلب' : 'Order'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {isRTL ? 'هل تحتاج إلى عرض سعر مخصص؟' : 'Need a Custom Quote?'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isRTL
                      ? 'احصل على أسعار تنافسية لطلبات الجملة الكبيرة وشروط دفع مرنة'
                      : 'Get competitive pricing for large bulk orders and flexible payment terms'}
                  </p>
                  <Button asChild size="lg">
                    <Link href="/examples/b2b-marketplace/rfq">
                      <MessageSquare className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'طلب عرض سعر' : 'Request Quote'}
                    </Link>
                  </Button>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {isRTL ? 'حساب تجاري؟' : 'Business Account?'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isRTL
                      ? 'سجل الآن للحصول على مزايا حصرية وشروط دفع آجلة'
                      : 'Register now for exclusive benefits and credit terms'}
                  </p>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/examples/b2b-marketplace/dashboard">
                      <Building2 className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
