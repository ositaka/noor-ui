'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'

export default function EcommercePage() {
  const { locale } = useDirection()
  const [quantity, setQuantity] = React.useState(1)
  const [selectedColor, setSelectedColor] = React.useState('black')
  const [selectedSize, setSelectedSize] = React.useState('M')
  const [isFavorite, setIsFavorite] = React.useState(false)
  const [mainImage, setMainImage] = React.useState(0)

  // Product data
  const product = {
    name: 'ساعة ذكية - الإصدار الخامس',
    nameEn: 'Smart Watch - Series 5',
    price: 1899,
    originalPrice: 2399,
    discount: 21,
    rating: 4.7,
    reviewCount: 342,
    inStock: true,
    sku: 'SW-S5-BLK-M',
    description: 'ساعة ذكية متطورة مع شاشة AMOLED فائقة الوضوح، مقاومة للماء حتى 50 متر، ومستشعرات صحية متقدمة لمراقبة معدل ضربات القلب والأكسجين في الدم. بطارية تدوم حتى 7 أيام مع الاستخدام العادي.',
    descriptionEn: 'Advanced smart watch with ultra-clear AMOLED display, water resistant up to 50 meters, and advanced health sensors to monitor heart rate and blood oxygen. Battery lasts up to 7 days with normal usage.',
    features: [
      'شاشة AMOLED مقاس 1.4 بوصة',
      'مقاومة للماء حتى 50 متر',
      'مستشعر معدل ضربات القلب',
      'GPS مدمج',
      'بطارية تدوم 7 أيام',
      'أكثر من 100 وضع رياضي',
    ],
    featuresEn: [
      '1.4 inch AMOLED display',
      'Water resistant up to 50 meters',
      'Heart rate sensor',
      'Built-in GPS',
      '7-day battery life',
      'Over 100 sports modes',
    ],
    specs: {
      'حجم الشاشة': '1.4 بوصة',
      'الدقة': '454 × 454 بكسل',
      'البطارية': '420 مللي أمبير',
      'الوزن': '45 جرام',
      'الاتصال': 'Bluetooth 5.2',
      'التوافق': 'iOS & Android',
    },
    specsEn: {
      'Display Size': '1.4 inch',
      'Resolution': '454 × 454 pixels',
      'Battery': '420 mAh',
      'Weight': '45 grams',
      'Connectivity': 'Bluetooth 5.2',
      'Compatibility': 'iOS & Android',
    },
  }

  const colors = [
    { id: 'black', name: 'أسود', nameEn: 'Black', hex: '#000000' },
    { id: 'silver', name: 'فضي', nameEn: 'Silver', hex: '#C0C0C0' },
    { id: 'gold', name: 'ذهبي', nameEn: 'Gold', hex: '#FFD700' },
  ]

  const sizes = ['S', 'M', 'L']

  const reviews = [
    {
      name: 'أحمد محمد',
      nameEn: 'Ahmed Mohammed',
      rating: 5,
      date: '2025-10-28',
      comment: 'ساعة رائعة جداً، البطارية تدوم فعلاً 7 أيام كما هو معلن. التصميم أنيق والميزات ممتازة.',
      commentEn: 'Excellent watch, the battery really lasts 7 days as advertised. Elegant design and excellent features.',
      helpful: 24,
    },
    {
      name: 'فاطمة علي',
      nameEn: 'Fatima Ali',
      rating: 4,
      date: '2025-10-25',
      comment: 'منتج جيد ولكن كنت أتمنى أن تكون الشاشة أكبر قليلاً. بخلاف ذلك، كل شيء ممتاز.',
      commentEn: 'Good product but I wish the screen was a bit larger. Otherwise, everything is excellent.',
      helpful: 18,
    },
    {
      name: 'محمد الشمري',
      nameEn: 'Mohammed Al-Shammari',
      rating: 5,
      date: '2025-10-20',
      comment: 'أفضل ساعة ذكية استخدمتها! الدقة في قياس معدل ضربات القلب عالية جداً.',
      commentEn: 'Best smart watch I\'ve ever used! The accuracy in measuring heart rate is very high.',
      helpful: 31,
    },
  ]

  const relatedProducts = [
    {
      name: 'سماعات لاسلكية',
      nameEn: 'Wireless Earbuds',
      price: 599,
      originalPrice: 799,
      rating: 4.5,
      image: '🎧',
    },
    {
      name: 'شاحن لاسلكي سريع',
      nameEn: 'Fast Wireless Charger',
      price: 149,
      rating: 4.8,
      image: '⚡',
    },
    {
      name: 'حزام ساعة رياضي',
      nameEn: 'Sports Watch Band',
      price: 89,
      rating: 4.3,
      image: '⌚',
    },
    {
      name: 'واقي شاشة زجاجي',
      nameEn: 'Glass Screen Protector',
      price: 49,
      rating: 4.6,
      image: '🛡️',
    },
  ]

  // Simulated product images
  const productImages = ['⌚', '📱', '💪', '🏃']

  const ratingBreakdown = [
    { stars: 5, percentage: 68 },
    { stars: 4, percentage: 22 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
  ]

  const handleAddToCart = () => {
    const message =
      locale === 'ar'
        ? `تمت إضافة ${quantity} من المنتج إلى السلة!`
        : `Added ${quantity} item(s) to cart!`
    alert(message)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  {locale === 'ar' ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  {locale === 'ar' ? 'الأمثلة' : 'Examples'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">
                {locale === 'ar' ? 'صفحة المنتج' : 'E-commerce'}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card>
              <CardContent className="p-8">
                <div className="aspect-square flex items-center justify-center text-9xl bg-muted rounded-lg">
                  {productImages[mainImage]}
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`aspect-square flex items-center justify-center text-4xl bg-muted rounded-lg hover:bg-accent transition-colors ${
                    mainImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {image}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge>{locale === 'ar' ? 'جديد' : 'New'}</Badge>
                <Badge variant="secondary">
                  {product.discount}% {locale === 'ar' ? 'خصم' : 'OFF'}
                </Badge>
                {product.inStock && (
                  <Badge variant="outline" className="text-green-600">
                    {locale === 'ar' ? 'متوفر' : 'In Stock'}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {locale === 'ar' ? product.name : product.nameEn}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount} {locale === 'ar' ? 'تقييم' : 'reviews'})
                </span>
                <span className="text-muted-foreground">SKU: {product.sku}</span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">
                  {product.price} {locale === 'ar' ? 'ر.س' : 'SAR'}
                </span>
                <span className="text-2xl text-muted-foreground line-through">
                  {product.originalPrice} {locale === 'ar' ? 'ر.س' : 'SAR'}
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">
                {locale === 'ar' ? 'وفر' : 'Save'} {product.originalPrice - product.price}{' '}
                {locale === 'ar' ? 'ر.س' : 'SAR'}
              </p>
            </div>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                {locale === 'ar' ? 'اللون' : 'Color'}:{' '}
                <span className="text-muted-foreground">
                  {locale === 'ar'
                    ? colors.find((c) => c.id === selectedColor)?.name
                    : colors.find((c) => c.id === selectedColor)?.nameEn}
                </span>
              </label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.id
                        ? 'border-primary scale-110'
                        : 'border-muted hover:border-muted-foreground'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={locale === 'ar' ? color.name : color.nameEn}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                {locale === 'ar' ? 'المقاس' : 'Size'}:{' '}
                <span className="text-muted-foreground">{selectedSize}</span>
              </label>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-md border-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted hover:border-muted-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">
                  {locale === 'ar' ? 'الكمية' : 'Quantity'}:
                </label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 me-2" />
                  {locale === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}
                </Button>
                <Button
                  variant={isFavorite ? 'primary' : 'outline'}
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <Card>
              <CardContent className="p-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <p className="font-medium">
                        {locale === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {locale === 'ar' ? 'للطلبات فوق 200 ر.س' : 'Orders over 200 SAR'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <p className="font-medium">
                        {locale === 'ar' ? 'ضمان سنتين' : '2 Year Warranty'}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {locale === 'ar' ? 'ضمان الشركة' : 'Manufacturer warranty'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <p className="font-medium">
                        {locale === 'ar' ? 'استرجاع مجاني' : 'Free Returns'}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {locale === 'ar' ? 'خلال 30 يوم' : 'Within 30 days'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">
                {locale === 'ar' ? 'الوصف' : 'Description'}
              </TabsTrigger>
              <TabsTrigger value="specs">
                {locale === 'ar' ? 'المواصفات' : 'Specifications'}
              </TabsTrigger>
              <TabsTrigger value="reviews">
                {locale === 'ar' ? 'التقييمات' : 'Reviews'} ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      {locale === 'ar' ? 'وصف المنتج' : 'Product Description'}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {locale === 'ar' ? product.description : product.descriptionEn}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      {locale === 'ar' ? 'المميزات الرئيسية' : 'Key Features'}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(locale === 'ar' ? product.features : product.featuresEn).map(
                        (feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {locale === 'ar' ? 'المواصفات التقنية' : 'Technical Specifications'}
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(locale === 'ar' ? product.specs : product.specsEn).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-3 border-b last:border-0"
                        >
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Rating Summary */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{product.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'ar'
                          ? `بناءً على ${product.reviewCount} تقييم`
                          : `Based on ${product.reviewCount} reviews`}
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      {ratingBreakdown.map((rating) => (
                        <div key={rating.stars} className="flex items-center gap-2 text-sm">
                          <span className="w-8">{rating.stars} ★</span>
                          <Progress value={rating.percentage} className="h-2 flex-1" />
                          <span className="w-10 text-muted-foreground text-end">
                            {rating.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-4">
                  {reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {locale === 'ar' ? review.name[0] : review.nameEn[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold">
                                  {locale === 'ar' ? review.name : review.nameEn}
                                </p>
                                <p className="text-sm text-muted-foreground">{review.date}</p>
                              </div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">
                              {locale === 'ar' ? review.comment : review.commentEn}
                            </p>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              {locale === 'ar' ? `مفيد (${review.helpful})` : `Helpful (${review.helpful})`}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            {locale === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-square flex items-center justify-center text-6xl bg-muted rounded-lg mb-4">
                    {related.image}
                  </div>
                  <h3 className="font-semibold mb-2">
                    {locale === 'ar' ? related.name : related.nameEn}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.floor(related.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ms-1">({related.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {related.price} {locale === 'ar' ? 'ر.س' : 'SAR'}
                    </span>
                    {related.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {related.originalPrice} {locale === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
