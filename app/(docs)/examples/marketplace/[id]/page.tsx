'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { formatSAR } from '@/lib/arabic-numbers'
import {
  Home,
  Store,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  MapPin,
  Truck,
  ShieldCheck,
  Package,
  CheckCircle2,
  Clock,
  CreditCard,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

interface Vendor {
  id: string
  name: string
  nameAr: string
  logo: string
  rating: number
  reviewCount: number
  verified: boolean
  location: string
  locationAr: string
  responseTime: string
  responseTimeAr: string
}

interface Review {
  id: string
  author: string
  authorAr: string
  rating: number
  date: string
  dateAr: string
  comment: string
  commentAr: string
  verified: boolean
}

interface Product {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  fullDescription: string
  fullDescriptionAr: string
  price: number
  originalPrice?: number
  currency: 'SAR'
  category: string
  categoryAr: string
  vendor: Vendor
  imageUrl: string
  images: string[]
  rating: number
  reviewCount: number
  reviews: Review[]
  inStock: boolean
  stockCount: number
  fastShipping: boolean
  specifications: {
    key: string
    keyAr: string
    value: string
    valueAr: string
  }[]
  features: string[]
  featuresAr: string[]
}

// Mock data
const getAllProducts = (): Product[] => {
  return [
    {
      id: 'prod-1',
      name: 'Wireless Noise-Canceling Headphones',
      nameAr: 'سماعات لاسلكية بخاصية إلغاء الضوضاء',
      description: 'Premium audio quality with active noise cancellation',
      descriptionAr: 'جودة صوت متميزة مع خاصية إلغاء الضوضاء النشطة',
      fullDescription:
        'Experience superior sound quality with our premium wireless headphones. Featuring advanced active noise cancellation technology, these headphones deliver crystal-clear audio while blocking out ambient noise. The comfortable over-ear design with memory foam cushions ensures all-day comfort, while the 30-hour battery life keeps you connected throughout your day. Compatible with all Bluetooth devices and featuring quick-charge capability.',
      fullDescriptionAr:
        'استمتع بجودة صوت فائقة مع سماعاتنا اللاسلكية المتميزة. تتميز بتقنية إلغاء الضوضاء النشطة المتقدمة، توفر هذه السماعات صوتاً نقياً كالكريستال بينما تحجب الضوضاء المحيطة. يضمن التصميم المريح فوق الأذن مع وسائد من رغوة الذاكرة راحة طوال اليوم، بينما تبقيك عمر البطارية الذي يصل إلى 30 ساعة متصلاً طوال يومك. متوافقة مع جميع أجهزة البلوتوث وتتميز بقدرة الشحن السريع.',
      price: 899,
      originalPrice: 1299,
      currency: 'SAR',
      category: 'Electronics',
      categoryAr: 'إلكترونيات',
      vendor: {
        id: 'vendor-1',
        name: 'Tech Hub Arabia',
        nameAr: 'مركز التقنية العربي',
        logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop',
        rating: 4.8,
        reviewCount: 1250,
        verified: true,
        location: 'Dubai, UAE',
        locationAr: 'دبي، الإمارات',
        responseTime: 'Within 2 hours',
        responseTimeAr: 'خلال ساعتين',
      },
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=600&fit=crop',
      ],
      rating: 4.7,
      reviewCount: 234,
      reviews: [
        {
          id: 'rev-1',
          author: 'Mohammed Al-Said',
          authorAr: 'محمد السعيد',
          rating: 5,
          date: 'Nov 10, 2025',
          dateAr: '١٠ نوفمبر ٢٠٢٥',
          comment:
            'Excellent sound quality! The noise cancellation works perfectly. Highly recommend for anyone looking for premium headphones.',
          commentAr:
            'جودة صوت ممتازة! تعمل خاصية إلغاء الضوضاء بشكل مثالي. أوصي بشدة لأي شخص يبحث عن سماعات متميزة.',
          verified: true,
        },
        {
          id: 'rev-2',
          author: 'Fatima Ahmed',
          authorAr: 'فاطمة أحمد',
          rating: 4,
          date: 'Nov 8, 2025',
          dateAr: '٨ نوفمبر ٢٠٢٥',
          comment:
            'Very comfortable and great battery life. Only minor issue is the case is a bit bulky.',
          commentAr:
            'مريحة جداً وعمر بطارية رائع. المشكلة الوحيدة البسيطة هي أن الحافظة كبيرة بعض الشيء.',
          verified: true,
        },
        {
          id: 'rev-3',
          author: 'Ahmed Hassan',
          authorAr: 'أحمد حسن',
          rating: 5,
          date: 'Nov 5, 2025',
          dateAr: '٥ نوفمبر ٢٠٢٥',
          comment: 'Best purchase this year! Fast shipping and excellent customer service from the vendor.',
          commentAr: 'أفضل شراء هذا العام! شحن سريع وخدمة عملاء ممتازة من البائع.',
          verified: true,
        },
      ],
      inStock: true,
      stockCount: 15,
      fastShipping: true,
      specifications: [
        { key: 'Brand', keyAr: 'العلامة التجارية', value: 'AudioTech', valueAr: 'أوديو تك' },
        { key: 'Model', keyAr: 'الموديل', value: 'AT-NC1000', valueAr: 'AT-NC1000' },
        { key: 'Color', keyAr: 'اللون', value: 'Midnight Black', valueAr: 'أسود منتصف الليل' },
        { key: 'Battery Life', keyAr: 'عمر البطارية', value: '30 hours', valueAr: '30 ساعة' },
        { key: 'Connectivity', keyAr: 'الاتصال', value: 'Bluetooth 5.2', valueAr: 'بلوتوث 5.2' },
        { key: 'Weight', keyAr: 'الوزن', value: '250g', valueAr: '250 جرام' },
        { key: 'Warranty', keyAr: 'الضمان', value: '2 years', valueAr: 'سنتان' },
      ],
      features: [
        'Active Noise Cancellation (ANC)',
        'Transparency Mode',
        '30-hour battery life',
        'Quick charge (10 min = 5 hours)',
        'Premium memory foam cushions',
        'Foldable design with carrying case',
        'Multi-device connectivity',
        'Voice assistant compatible',
      ],
      featuresAr: [
        'إلغاء الضوضاء النشط (ANC)',
        'وضع الشفافية',
        'عمر بطارية 30 ساعة',
        'شحن سريع (10 دقائق = 5 ساعات)',
        'وسائد رغوة ذاكرة متميزة',
        'تصميم قابل للطي مع حافظة',
        'اتصال متعدد الأجهزة',
        'متوافق مع المساعد الصوتي',
      ],
    },
  ]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]

  const products = getAllProducts()
  const product = products.find((p) => p.id === params.id) || products[0]

  const [selectedImage, setSelectedImage] = React.useState(0)
  const [quantity, setQuantity] = React.useState(1)

  const averageRating = product.rating
  const ratingDistribution = {
    5: 156,
    4: 48,
    3: 18,
    2: 8,
    1: 4,
  }

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
                {t.marketplace.header.title}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ButtonArrow direction="back" icon="arrow" variant="outline" size="sm" asChild>
              <Link href="/examples/marketplace">
                {t.marketplaceProduct.backToMarketplace}
              </Link>
            </ButtonArrow>
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
                <Link href="/examples/marketplace" className="hover:text-foreground transition-colors">
                  {t.marketplaceProduct.breadcrumb.marketplace}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium line-clamp-1">
                {isRTL ? product.nameAr : product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Product Images */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className="w-full aspect-square rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${product.images[selectedImage]})` }}
            />

            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'aspect-square rounded-lg bg-cover bg-center border-2 transition-all',
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground/20'
                  )}
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{isRTL ? product.categoryAr : product.category}</Badge>
                {product.fastShipping && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    {t.marketplaceProduct.category.fastShipping}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight mb-3">
                {isRTL ? product.nameAr : product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">
                    <ArabicNumber value={product.rating} />
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-muted-foreground">
                  <ArabicNumber value={product.reviewCount} />{' '}
                  {t.marketplaceProduct.reviews}
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-muted-foreground">
                  <ArabicNumber value={product.stockCount} />{' '}
                  {t.marketplaceProduct.inStock}
                </span>
              </div>

              <p className="text-muted-foreground">
                {isRTL ? product.descriptionAr : product.description}
              </p>
            </div>

            <Separator />

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold">
                  {formatSAR(product.price, { useArabicNumerals: locale === 'ar', locale: locale === 'ar' ? 'ar' : 'en' })}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatSAR(product.originalPrice, { useArabicNumerals: locale === 'ar', locale: locale === 'ar' ? 'ar' : 'en' })}
                    </span>
                    <Badge variant="destructive">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% {t.marketplaceProduct.discount}
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {t.marketplaceProduct.vat}
              </p>
            </div>

            <Separator />

            {/* Vendor Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div
                    className="h-12 w-12 rounded-full bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url(${product.vendor.logo})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <Link
                        href={`/examples/marketplace/vendor/${product.vendor.id}`}
                        className="font-semibold hover:underline"
                      >
                        {isRTL ? product.vendor.nameAr : product.vendor.name}
                      </Link>
                      {product.vendor.verified && (
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">
                        <ArabicNumber value={product.vendor.rating} />
                      </span>
                      <span className="text-xs text-muted-foreground">
                        (<ArabicNumber value={product.vendor.reviewCount} />)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{isRTL ? product.vendor.locationAr : product.vendor.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-lg font-medium">
                    <ArabicNumber value={quantity} />
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                >
                  +
                </Button>
              </div>

              <Button size="lg" className="w-full">
                <ShoppingCart className={cn('h-5 w-5', isRTL ? 'ms-2' : 'me-2')} />
                {t.marketplaceProduct.actions.addToCart}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg">
                  <Heart className={cn('h-5 w-5', isRTL ? 'ms-2' : 'me-2')} />
                  {t.marketplaceProduct.actions.wishlist}
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className={cn('h-5 w-5', isRTL ? 'ms-2' : 'me-2')} />
                  {t.marketplaceProduct.actions.share}
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>{t.marketplaceProduct.badges.authenticity}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-5 w-5 text-primary" />
                <span>{t.marketplaceProduct.badges.freeReturns}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>{t.marketplaceProduct.badges.freeShipping}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>{t.marketplaceProduct.badges.securePayment}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">
                {t.marketplaceProduct.tabs.description}
              </TabsTrigger>
              <TabsTrigger value="specifications">
                {t.marketplaceProduct.tabs.specifications}
              </TabsTrigger>
              <TabsTrigger value="reviews">
                {t.marketplaceProduct.tabs.reviews} (<ArabicNumber value={product.reviewCount} />)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.marketplaceProduct.productDetails}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {isRTL ? product.fullDescriptionAr : product.fullDescription}
                  </p>

                  <div>
                    <h3 className="font-semibold mb-3">
                      {t.marketplaceProduct.keyFeatures}
                    </h3>
                    <ul className="space-y-2">
                      {(isRTL ? product.featuresAr : product.features).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.marketplaceProduct.technicalSpecifications}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {product.specifications.map((spec, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between py-3">
                          <span className="font-medium">
                            {isRTL ? spec.keyAr : spec.key}
                          </span>
                          <span className="text-muted-foreground">
                            {isRTL ? spec.valueAr : spec.value}
                          </span>
                        </div>
                        {index < product.specifications.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 space-y-6">
              {/* Rating Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.marketplaceProduct.ratingSummary}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">
                        <ArabicNumber value={averageRating} />
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-5 w-5',
                              i < Math.round(averageRating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t.marketplaceProduct.basedOn}{' '}
                        <ArabicNumber value={product.reviewCount} />{' '}
                        {t.marketplaceProduct.reviews}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm w-8">
                            <ArabicNumber value={stars} /> <Star className="h-3 w-3 inline" />
                          </span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{
                                width: `${(ratingDistribution[stars as keyof typeof ratingDistribution] / product.reviewCount) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-end">
                            <ArabicNumber value={ratingDistribution[stars as keyof typeof ratingDistribution]} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="font-medium">
                            {(isRTL ? review.authorAr : review.author).charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">
                              {isRTL ? review.authorAr : review.author}
                            </span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                {t.marketplaceProduct.verifiedPurchase}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    'h-4 w-4',
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-muted-foreground'
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {isRTL ? review.dateAr : review.date}
                            </span>
                          </div>
                          <p className="text-muted-foreground">
                            {isRTL ? review.commentAr : review.comment}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}
