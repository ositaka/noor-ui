'use client'

import * as React from 'react'
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

export default function EcommercePage() {
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
    features: [
      'شاشة AMOLED مقاس 1.4 بوصة',
      'مقاومة للماء حتى 50 متر',
      'مستشعر معدل ضربات القلب',
      'GPS مدمج',
      'بطارية تدوم 7 أيام',
      'أكثر من 100 وضع رياضي',
    ],
    specs: {
      'حجم الشاشة': '1.4 بوصة',
      'الدقة': '454 × 454 بكسل',
      'البطارية': '420 مللي أمبير',
      'الوزن': '45 جرام',
      'الاتصال': 'Bluetooth 5.2',
      'التوافق': 'iOS & Android',
    },
  }

  const colors = [
    { id: 'black', name: 'أسود', hex: '#000000' },
    { id: 'silver', name: 'فضي', hex: '#C0C0C0' },
    { id: 'gold', name: 'ذهبي', hex: '#FFD700' },
  ]

  const sizes = ['S', 'M', 'L']

  const reviews = [
    {
      name: 'أحمد محمد',
      rating: 5,
      date: '2025-10-28',
      comment: 'ساعة رائعة جداً، البطارية تدوم فعلاً 7 أيام كما هو معلن. التصميم أنيق والميزات ممتازة.',
      helpful: 24,
    },
    {
      name: 'فاطمة علي',
      rating: 4,
      date: '2025-10-25',
      comment: 'منتج جيد ولكن كنت أتمنى أن تكون الشاشة أكبر قليلاً. بخلاف ذلك، كل شيء ممتاز.',
      helpful: 18,
    },
    {
      name: 'محمد الشمري',
      rating: 5,
      date: '2025-10-20',
      comment: 'أفضل ساعة ذكية استخدمتها! الدقة في قياس معدل ضربات القلب عالية جداً.',
      helpful: 31,
    },
  ]

  const relatedProducts = [
    {
      name: 'سماعات لاسلكية',
      price: 599,
      originalPrice: 799,
      rating: 4.5,
      image: '🎧',
    },
    {
      name: 'شاحن لاسلكي سريع',
      price: 149,
      rating: 4.8,
      image: '⚡',
    },
    {
      name: 'حزام ساعة رياضي',
      price: 89,
      rating: 4.3,
      image: '⌚',
    },
    {
      name: 'واقي شاشة زجاجي',
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
    alert(`تمت إضافة ${quantity} من المنتج إلى السلة!`)
  }

  return (
    <div className="min-h-screen bg-background">
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
                <Badge>جديد</Badge>
                <Badge variant="secondary">{product.discount}% خصم</Badge>
                {product.inStock && (
                  <Badge variant="outline" className="text-green-600">
                    متوفر
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
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
                  ({product.reviewCount} تقييم)
                </span>
                <span className="text-muted-foreground">SKU: {product.sku}</span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">{product.price} ر.س</span>
                <span className="text-2xl text-muted-foreground line-through">
                  {product.originalPrice} ر.س
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">
                وفر {product.originalPrice - product.price} ر.س
              </p>
            </div>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                اللون: <span className="text-muted-foreground">{colors.find(c => c.id === selectedColor)?.name}</span>
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
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                المقاس: <span className="text-muted-foreground">{selectedSize}</span>
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
                <label className="text-sm font-medium">الكمية:</label>
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
                  أضف إلى السلة
                </Button>
                <Button
                  variant={isFavorite ? "default" : "outline"}
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
                      <p className="font-medium">شحن مجاني</p>
                      <p className="text-muted-foreground text-xs">للطلبات فوق 200 ر.س</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <p className="font-medium">ضمان سنتين</p>
                      <p className="text-muted-foreground text-xs">ضمان الشركة</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <p className="font-medium">استرجاع مجاني</p>
                      <p className="text-muted-foreground text-xs">خلال 30 يوم</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" dir="ltr">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">الوصف</TabsTrigger>
              <TabsTrigger value="specs">المواصفات</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات ({product.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">وصف المنتج</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">المميزات الرئيسية</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">المواصفات التقنية</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specs).map(([key, value], index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b last:border-0"
                      >
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
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
                        بناءً على {product.reviewCount} تقييم
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
                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold">{review.name}</p>
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
                            <p className="text-muted-foreground">{review.comment}</p>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              مفيد ({review.helpful})
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
          <h2 className="text-2xl font-bold mb-6">منتجات ذات صلة</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-square flex items-center justify-center text-6xl bg-muted rounded-lg mb-4">
                    {related.image}
                  </div>
                  <h3 className="font-semibold mb-2">{related.name}</h3>
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
                    <span className="text-xs text-muted-foreground ms-1">
                      ({related.rating})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{related.price} ر.س</span>
                    {related.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {related.originalPrice} ر.س
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
