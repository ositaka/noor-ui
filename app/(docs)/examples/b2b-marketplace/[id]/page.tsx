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
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { formatSAR } from '@/lib/arabic-numbers'
import { cn } from '@/lib/utils'
import {
  ShoppingCart,
  MessageSquare,
  Star,
  CheckCircle2,
  Package,
  Truck,
  Shield,
  FileText,
  TrendingDown,
  Calculator,
  Plus,
  Minus,
} from 'lucide-react'

interface ProductDetail {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  longDescription: string
  longDescriptionAr: string
  category: string
  categoryAr: string
  images: string[]
  basePrice: number
  moq: number
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
    reviewCount: number
    responseTime: string
    responseTimeAr: string
  }
  leadTime: string
  leadTimeAr: string
  inStock: boolean
  stockQuantity: number
  specifications: {
    label: string
    labelAr: string
    value: string
    valueAr: string
  }[]
  paymentTerms: string[]
  paymentTermsAr: string[]
  shippingOptions: {
    method: string
    methodAr: string
    cost: number
    duration: string
    durationAr: string
  }[]
}

function generateMockProduct(id: string): ProductDetail {
  return {
    id,
    name: 'Industrial Label Printer',
    nameAr: 'طابعة الملصقات الصناعية',
    description: 'High-speed industrial thermal label printer for warehouse operations',
    descriptionAr: 'طابعة ملصقات حرارية صناعية عالية السرعة لعمليات المستودعات',
    longDescription:
      'Professional-grade thermal label printer designed for high-volume warehouse and logistics operations. Features include automatic label detection, high-speed printing up to 12 inches per second, and support for various label sizes. Built-in memory for storing label templates and USB/Ethernet connectivity for easy integration with your existing systems.',
    longDescriptionAr:
      'طابعة ملصقات حرارية احترافية مصممة لعمليات المستودعات والخدمات اللوجستية ذات الحجم الكبير. تتضمن الميزات الكشف التلقائي للملصقات والطباعة عالية السرعة تصل إلى ١٢ بوصة في الثانية ودعم أحجام ملصقات مختلفة. ذاكرة مدمجة لتخزين قوالب الملصقات واتصال USB/Ethernet للتكامل السهل مع أنظمتك الحالية.',
    category: 'Office Equipment',
    categoryAr: 'معدات مكتبية',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800',
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&sat=-50',
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&blur=5',
    ],
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
      reviewCount: 342,
      responseTime: 'Within 2 hours',
      responseTimeAr: 'خلال ساعتين',
    },
    leadTime: '5-7 business days',
    leadTimeAr: '٥-٧ أيام عمل',
    inStock: true,
    stockQuantity: 250,
    specifications: [
      { label: 'Print Speed', labelAr: 'سرعة الطباعة', value: '12 ips', valueAr: '١٢ بوصة/ثانية' },
      { label: 'Resolution', labelAr: 'الدقة', value: '300 DPI', valueAr: '٣٠٠ نقطة/بوصة' },
      { label: 'Max Label Width', labelAr: 'أقصى عرض للملصق', value: '4 inches', valueAr: '٤ بوصات' },
      { label: 'Connectivity', labelAr: 'الاتصال', value: 'USB, Ethernet', valueAr: 'USB، إيثرنت' },
      { label: 'Memory', labelAr: 'الذاكرة', value: '16 MB Flash, 8 MB SDRAM', valueAr: '١٦ ميجابايت فلاش، ٨ ميجابايت SDRAM' },
      { label: 'Warranty', labelAr: 'الضمان', value: '2 years', valueAr: 'سنتان' },
    ],
    paymentTerms: ['Net 30 days', 'Net 60 days', 'Net 90 days', 'Immediate payment (2% discount)'],
    paymentTermsAr: ['صافي ٣٠ يوم', 'صافي ٦٠ يوم', 'صافي ٩٠ يوم', 'دفع فوري (خصم ٢٪)'],
    shippingOptions: [
      {
        method: 'Standard Shipping',
        methodAr: 'الشحن القياسي',
        cost: 150,
        duration: '5-7 business days',
        durationAr: '٥-٧ أيام عمل',
      },
      {
        method: 'Express Shipping',
        methodAr: 'الشحن السريع',
        cost: 350,
        duration: '2-3 business days',
        durationAr: '٢-٣ أيام عمل',
      },
      {
        method: 'Next Day Delivery',
        methodAr: 'التوصيل في اليوم التالي',
        cost: 550,
        duration: '1 business day',
        durationAr: 'يوم عمل واحد',
      },
    ],
  }
}

export default function B2BProductDetailPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'
  const t = content[locale]

  const product = generateMockProduct('industrial-printer')
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [quantity, setQuantity] = React.useState(product.moq)

  const getCurrentTier = (qty: number) => {
    return product.priceTiers.find((tier) => {
      if (tier.max === null) {
        return qty >= tier.min
      }
      return qty >= tier.min && qty <= tier.max
    }) || product.priceTiers[0]
  }

  const currentTier = getCurrentTier(quantity)
  const unitPrice = currentTier.price
  const subtotal = unitPrice * quantity
  const savings = (product.basePrice - unitPrice) * quantity

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
              <Link href="/examples/b2b-marketplace" className="hover:text-foreground transition-colors">
                {t.b2bMarketplaceListing.breadcrumb.b2bMarketplace}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {isRTL ? product.nameAr : product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Product Details - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images */}
            <Card>
              <CardContent className="p-6">
                <div
                  className="aspect-video bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: `url(${product.images[selectedImage]})` }}
                />
                <div className="grid grid-cols-3 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'aspect-video bg-cover bg-center rounded-lg border-2 transition-all',
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-transparent hover:border-muted-foreground/20'
                      )}
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Info Tabs */}
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">
                  {t.b2bMarketplaceDetail.tabs.description}
                </TabsTrigger>
                <TabsTrigger value="specifications">
                  {t.b2bMarketplaceDetail.tabs.specifications}
                </TabsTrigger>
                <TabsTrigger value="shipping">
                  {t.b2bMarketplaceDetail.tabs.shipping}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.b2bMarketplaceDetail.productDescription.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {isRTL ? product.longDescriptionAr : product.longDescription}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.b2bMarketplaceDetail.technicalSpecifications.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {product.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 border-b last:border-0"
                        >
                          <span className="text-muted-foreground">
                            {isRTL ? spec.labelAr : spec.label}
                          </span>
                          <span className="font-medium">{isRTL ? spec.valueAr : spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.b2bMarketplaceDetail.shippingOptions.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {product.shippingOptions.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {isRTL ? option.methodAr : option.method}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {isRTL ? option.durationAr : option.duration}
                            </p>
                          </div>
                        </div>
                        <span className="font-medium">{formatSAR(option.cost, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Volume Pricing Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  {t.b2bMarketplaceDetail.volumePricing.title}
                </CardTitle>
                <CardDescription>
                  {t.b2bMarketplaceDetail.volumePricing.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {product.priceTiers.map((tier, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-lg border-2 transition-all',
                        quantity >= tier.min && (tier.max === null || quantity <= tier.max)
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-muted'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[100px]">
                          <p className="text-sm text-muted-foreground">
                            {t.b2bMarketplaceDetail.volumePricing.quantity}
                          </p>
                          <p className="font-bold">
                            <ArabicNumber value={tier.min} />
                            {tier.max ? ` - ${tier.max}` : '+'}
                          </p>
                        </div>
                        <div className="text-center min-w-[120px]">
                          <p className="text-sm text-muted-foreground">
                            {t.b2bMarketplaceDetail.volumePricing.pricePerUnit}
                          </p>
                          <p className="font-bold text-lg">{formatSAR(tier.price, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}</p>
                        </div>
                      </div>
                      {tier.discount > 0 && (
                        <Badge className="bg-green-600">
                          {t.b2bMarketplaceDetail.volumePricing.save}
                          <ArabicNumber value={tier.discount} />%
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Supplier Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t.b2bMarketplaceDetail.supplierInfo.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">
                        {isRTL ? product.supplier.nameAr : product.supplier.name}
                      </h3>
                      {product.supplier.verified && (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <ArabicNumber value={product.supplier.rating} />
                        <span>
                          (<ArabicNumber value={product.supplier.reviewCount} />{' '}
                          {t.b2bMarketplaceDetail.supplierInfo.reviews})
                        </span>
                      </div>
                      <div>
                        {t.b2bMarketplaceDetail.supplierInfo.responseTime}
                        {isRTL ? product.supplier.responseTimeAr : product.supplier.responseTime}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">
                      {t.b2bMarketplaceDetail.supplierInfo.verifiedSupplier}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">
                      {t.b2bMarketplaceDetail.supplierInfo.unitsAvailable.replace('{count}', product.stockQuantity.toString())}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">
                      {isRTL ? product.leadTimeAr : product.leadTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isRTL ? product.nameAr : product.name}
                </CardTitle>
                <CardDescription>
                  {isRTL ? product.descriptionAr : product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Calculator */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">
                      {t.b2bMarketplaceDetail.orderCalculator.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">
                      {t.b2bMarketplaceDetail.orderCalculator.quantity} ({isRTL ? product.unitAr : product.unit})
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(product.moq, quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))
                        }
                        min={product.moq}
                        className="text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t.b2bMarketplaceDetail.orderCalculator.minimum}
                      <ArabicNumber value={product.moq} /> {isRTL ? product.unitAr : product.unit}
                    </p>
                  </div>

                  <div className="bg-muted rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.b2bMarketplaceDetail.orderCalculator.unitPrice}
                      </span>
                      <span className="font-medium">{formatSAR(unitPrice, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}</span>
                    </div>
                    {currentTier.discount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t.b2bMarketplaceDetail.orderCalculator.volumeDiscount}
                        </span>
                        <Badge variant="secondary">
                          <ArabicNumber value={currentTier.discount} />%
                        </Badge>
                      </div>
                    )}
                    <div className="border-t pt-3 flex items-center justify-between">
                      <span className="font-semibold">
                        {t.b2bMarketplaceDetail.orderCalculator.subtotal}
                      </span>
                      <span className="font-bold text-xl">{formatSAR(subtotal, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}</span>
                    </div>
                    {savings > 0 && (
                      <div className="text-center">
                        <Badge className="bg-green-600">
                          {t.b2bMarketplaceDetail.orderCalculator.youSave}
                          {formatSAR(savings, { useArabicNumerals: isRTL, locale: isRTL ? 'ar' : 'en' })}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Terms */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{t.b2bMarketplaceDetail.paymentTerms.title}</h3>
                  </div>
                  <div className="space-y-1">
                    {(isRTL ? product.paymentTermsAr : product.paymentTerms).map((term, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span>{term}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <ShoppingCart className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                    {t.b2bMarketplaceDetail.actions.addToCart}
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/examples/b2b-marketplace/rfq">
                      <MessageSquare className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {t.b2bMarketplaceDetail.actions.requestQuote}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
