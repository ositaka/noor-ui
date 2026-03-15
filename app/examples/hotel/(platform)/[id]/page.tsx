'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Carousel } from '@/components/ui/carousel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useDirection } from '@/components/providers/direction-provider'
import {
  Star,
  MapPin,
  SwimmingPool,
  Barbell,
  WifiHigh,
  Car,
  Mosque,
  Flower,
  Clock,
  Users,
  Bed,
  Bathtub,
  Television,
  Coffee,
  ForkKnife,
  Briefcase,
  FirstAid,
  Baby,
  Dog,
  CreditCard,
  CalendarCheck,
  ArrowRight,
  ArrowLeft,
  Check,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    back: 'Search Results',
    home: 'Home',
    hotels: 'Hotels',
    rooms: 'Rooms',
    amenities: 'Amenities',
    reviews: 'Reviews',
    policies: 'Policies',
    perNight: '/ night',
    aed: 'AED',
    bookRoom: 'Book This Room',
    maxGuests: 'Max guests',
    bedType: 'Bed type',
    roomSize: 'Room size',
    sqm: 'sqm',
    general: 'General',
    wellness: 'Wellness & Leisure',
    dining: 'Dining',
    business: 'Business',
    overallRating: 'Overall Rating',
    basedOn: 'Based on',
    reviewsLabel: 'reviews',
    excellent: 'Excellent',
    veryGood: 'Very Good',
    good: 'Good',
    average: 'Average',
    poor: 'Poor',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    cancellation: 'Cancellation Policy',
    cancellationDesc: 'Free cancellation up to 48 hours before check-in. After that, the first night will be charged.',
    children: 'Children Policy',
    childrenDesc: 'Children of all ages are welcome. Children under 6 stay free when using existing beds.',
    pets: 'Pet Policy',
    petsDesc: 'Pets are not allowed.',
    payment: 'Payment',
    paymentDesc: 'We accept all major credit cards. A valid credit card is required at check-in for incidentals.',
    fromPrice: 'From',
    taxes: 'Taxes & fees not included',
    gallery: 'Hotel gallery',
    amenityWifi: 'WiFi',
    amenityTv: 'TV',
    amenityCoffee: 'Coffee',
    amenityBath: 'Bath',
    amenityMinibar: 'Minibar',
    amenityLiving: 'Living Area',
    amenityButler: 'Butler',
    standard: 'Standard Room',
    standardAr: 'غرفة قياسية',
    deluxe: 'Deluxe Room',
    deluxeAr: 'غرفة ديلوكس',
    suite: 'Suite',
    suiteAr: 'جناح',
    royal: 'Royal Suite',
    royalAr: 'الجناح الملكي',
    kingBed: 'King bed',
    twinBeds: 'Twin beds',
    queenBed: 'Queen bed',
    kingSuite: 'King bed + living area',
  },
  ar: {
    back: 'نتائج البحث',
    home: 'الرئيسية',
    hotels: 'الفنادق',
    rooms: 'الغرف',
    amenities: 'المرافق',
    reviews: 'التقييمات',
    policies: 'السياسات',
    perNight: '/ ليلة',
    aed: 'د.إ',
    bookRoom: 'احجز هذه الغرفة',
    maxGuests: 'الضيوف',
    bedType: 'نوع السرير',
    roomSize: 'مساحة الغرفة',
    sqm: 'م²',
    general: 'عام',
    wellness: 'العافية والترفيه',
    dining: 'المطاعم',
    business: 'الأعمال',
    overallRating: 'التقييم العام',
    basedOn: 'بناءً على',
    reviewsLabel: 'تقييم',
    excellent: 'ممتاز',
    veryGood: 'جيد جداً',
    good: 'جيد',
    average: 'متوسط',
    poor: 'ضعيف',
    checkIn: 'تسجيل الوصول',
    checkOut: 'تسجيل المغادرة',
    cancellation: 'سياسة الإلغاء',
    cancellationDesc: 'إلغاء مجاني حتى ٤٨ ساعة قبل تسجيل الوصول. بعد ذلك، يتم تحصيل رسوم الليلة الأولى.',
    children: 'سياسة الأطفال',
    childrenDesc: 'يُرحب بالأطفال من جميع الأعمار. الأطفال دون ٦ سنوات يقيمون مجاناً عند استخدام الأسرّة الموجودة.',
    pets: 'سياسة الحيوانات الأليفة',
    petsDesc: 'غير مسموح بالحيوانات الأليفة.',
    payment: 'الدفع',
    paymentDesc: 'نقبل جميع بطاقات الائتمان الرئيسية. يلزم تقديم بطاقة ائتمان صالحة عند تسجيل الوصول.',
    fromPrice: 'من',
    taxes: 'الضرائب والرسوم غير مشمولة',
    gallery: 'معرض صور الفندق',
    amenityWifi: 'واي فاي',
    amenityTv: 'تلفزيون',
    amenityCoffee: 'قهوة',
    amenityBath: 'حمام',
    amenityMinibar: 'ميني بار',
    amenityLiving: 'غرفة معيشة',
    amenityButler: 'خدمة الخادم',
    standard: 'غرفة قياسية',
    standardAr: 'غرفة قياسية',
    deluxe: 'غرفة ديلوكس',
    deluxeAr: 'غرفة ديلوكس',
    suite: 'جناح',
    suiteAr: 'جناح',
    royal: 'الجناح الملكي',
    royalAr: 'الجناح الملكي',
    kingBed: 'سرير ملكي',
    twinBeds: 'سريران مفردان',
    queenBed: 'سرير كوين',
    kingSuite: 'سرير ملكي + غرفة معيشة',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const hotelData = {
  'pearl-grand': {
    name: 'Pearl Grand Hotel',
    nameAr: 'فندق اللؤلؤة الكبير',
    location: 'Dubai Marina, Dubai',
    locationAr: 'دبي مارينا، دبي',
    stars: 5,
    rating: 4.8,
    reviewCount: 2341,
    startingPrice: 850,
    images: [
      '/examples/hotel/hotel-1.jpg',
      '/examples/hotel/pool.jpg',
      '/examples/hotel/restaurant.jpg',
      '/examples/hotel/room-deluxe.jpg',
      '/examples/hotel/spa.jpg',
    ],
  },
  'al-nakheel': {
    name: 'Al Nakheel Resort',
    nameAr: 'منتجع النخيل',
    location: 'Corniche, Abu Dhabi',
    locationAr: 'الكورنيش، أبوظبي',
    stars: 5,
    rating: 4.7,
    reviewCount: 1856,
    startingPrice: 720,
    images: [
      '/examples/hotel/hotel-2.jpg',
      '/examples/hotel/pool.jpg',
      '/examples/hotel/room-suite.jpg',
      '/examples/hotel/restaurant.jpg',
      '/examples/hotel/spa.jpg',
    ],
  },
}

type HotelId = keyof typeof hotelData

const rooms = (locale: 'en' | 'ar') => {
  const h = t[locale]
  return [
    {
      id: 'standard',
      name: h.standard,
      image: '/examples/hotel/room-standard.jpg',
      price: 0,
      maxGuests: 2,
      bedType: h.twinBeds,
      size: 32,
      amenities: ['wifi', 'tv', 'coffee', 'bath'],
    },
    {
      id: 'deluxe',
      name: h.deluxe,
      image: '/examples/hotel/room-deluxe.jpg',
      price: 150,
      maxGuests: 2,
      bedType: h.kingBed,
      size: 45,
      amenities: ['wifi', 'tv', 'coffee', 'bath', 'minibar'],
    },
    {
      id: 'suite',
      name: h.suite,
      image: '/examples/hotel/room-suite.jpg',
      price: 400,
      maxGuests: 3,
      bedType: h.queenBed,
      size: 65,
      amenities: ['wifi', 'tv', 'coffee', 'bath', 'minibar', 'living'],
    },
    {
      id: 'royal',
      name: h.royal,
      image: '/examples/hotel/room-royal.jpg',
      price: 800,
      maxGuests: 4,
      bedType: h.kingSuite,
      size: 120,
      amenities: ['wifi', 'tv', 'coffee', 'bath', 'minibar', 'living', 'butler'],
    },
  ]
}

interface Review {
  name: string
  nameAr: string
  initials: string
  country: string
  countryAr: string
  rating: number
  date: string
  dateAr: string
  comment: string
  commentAr: string
}

const reviewsData: Review[] = [
  {
    name: 'Sarah Al Maktoum',
    nameAr: 'سارة المكتوم',
    initials: 'SA',
    country: 'UAE',
    countryAr: 'الإمارات',
    rating: 5,
    date: 'Feb 2026',
    dateAr: 'فبراير ٢٠٢٦',
    comment: 'Absolutely stunning hotel. The staff was incredibly attentive and the rooms are beautifully appointed. The prayer room was well-maintained and conveniently located.',
    commentAr: 'فندق رائع بكل المقاييس. الموظفون كانوا في غاية الاهتمام والغرف مفروشة بشكل جميل. المصلى كان نظيفاً وموقعه مناسب.',
  },
  {
    name: 'Mohammed Al Rashid',
    nameAr: 'محمد الراشد',
    initials: 'MR',
    country: 'Saudi Arabia',
    countryAr: 'السعودية',
    rating: 5,
    date: 'Jan 2026',
    dateAr: 'يناير ٢٠٢٦',
    comment: 'Perfect business stay. The conference facilities are world-class, and the executive lounge is excellent. Will definitely return.',
    commentAr: 'إقامة عمل مثالية. مرافق المؤتمرات عالمية المستوى، وصالة رجال الأعمال ممتازة. سأعود بالتأكيد.',
  },
  {
    name: 'Fatima Al Thani',
    nameAr: 'فاطمة آل ثاني',
    initials: 'FT',
    country: 'Qatar',
    countryAr: 'قطر',
    rating: 4,
    date: 'Dec 2025',
    dateAr: 'ديسمبر ٢٠٢٥',
    comment: 'Beautiful property with great views. The pool area is fantastic. Only minor issue was the wait time at the restaurant during peak hours.',
    commentAr: 'فندق جميل مع إطلالات رائعة. منطقة المسبح رائعة. المشكلة الوحيدة كانت وقت الانتظار في المطعم أثناء أوقات الذروة.',
  },
  {
    name: 'Ahmed Al Saud',
    nameAr: 'أحمد آل سعود',
    initials: 'AS',
    country: 'Saudi Arabia',
    countryAr: 'السعودية',
    rating: 5,
    date: 'Nov 2025',
    dateAr: 'نوفمبر ٢٠٢٥',
    comment: 'Outstanding family vacation. Kids loved the pool and activities program. The halal dining options were excellent with great variety.',
    commentAr: 'إجازة عائلية استثنائية. أحب الأطفال المسبح وبرنامج الأنشطة. خيارات الطعام الحلال كانت ممتازة ومتنوعة.',
  },
]

const ratingBreakdown = [
  { stars: 5, percentage: 68 },
  { stars: 4, percentage: 22 },
  { stars: 3, percentage: 7 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 1 },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]

  // Fallback to pearl-grand for unknown IDs
  const hotelId = (params.id in hotelData ? params.id : 'pearl-grand') as HotelId
  const hotel = hotelData[hotelId]
  const roomList = React.useMemo(() => rooms(locale), [locale])
  const basePrice = hotel.startingPrice
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/hotel/home">{h.home}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/hotel/search">{h.hotels}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{isRTL ? hotel.nameAr : hotel.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hotel Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-warning fill-warning" weight="fill" />
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {isRTL ? hotel.nameAr : hotel.name}
          </h1>
          <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{isRTL ? hotel.locationAr : hotel.location}</span>
          </div>
        </div>
        <div className="text-end">
          <div className="text-sm text-muted-foreground">{h.fromPrice}</div>
          <div className="text-3xl font-bold">
            <ArabicNumber value={basePrice} /> <span className="text-lg">{h.aed}</span>
          </div>
          <div className="text-xs text-muted-foreground">{h.perNight} · {h.taxes}</div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="mb-8">
        <Carousel
          items={hotel.images}
          renderItem={(src) => (
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
              <Image
                src={src}
                alt={isRTL ? hotel.nameAr : hotel.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          showDots
          showArrows
          dotSize="lg"
          aria-label={h.gallery}
        />
      </div>

      {/* Rating badge */}
      <div className="flex items-center gap-3 mb-6">
        <Badge className="text-lg px-3 py-1 font-bold">
          <Star className="h-4 w-4 me-1 fill-primary-foreground text-primary-foreground" weight="fill" />
          {hotel.rating}
        </Badge>
        <span className="text-muted-foreground">
          <ArabicNumber value={hotel.reviewCount} /> {h.reviewsLabel}
        </span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="rooms">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="rooms">{h.rooms}</TabsTrigger>
          <TabsTrigger value="amenities">{h.amenities}</TabsTrigger>
          <TabsTrigger value="reviews">{h.reviews}</TabsTrigger>
          <TabsTrigger value="policies">{h.policies}</TabsTrigger>
        </TabsList>

        {/* ROOMS TAB */}
        <TabsContent value="rooms" className="space-y-4">
          {roomList.map((room) => {
            const roomPrice = basePrice + room.price
            return (
              <Card key={room.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{room.name}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {h.maxGuests}: <ArabicNumber value={room.maxGuests} />
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bed className="h-3.5 w-3.5" />
                          {room.bedType}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          <ArabicNumber value={room.size} /> {h.sqm}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {room.amenities.map((a) => {
                          const amenityMap: Record<string, string> = {
                            wifi: h.amenityWifi, tv: h.amenityTv, coffee: h.amenityCoffee,
                            bath: h.amenityBath, minibar: h.amenityMinibar, living: h.amenityLiving, butler: h.amenityButler,
                          }
                          return (
                            <Badge key={a} variant="secondary" className="text-xs font-normal">
                              {a === 'wifi' && <WifiHigh className="h-3 w-3 me-1" aria-hidden="true" />}
                              {a === 'tv' && <Television className="h-3 w-3 me-1" aria-hidden="true" />}
                              {a === 'coffee' && <Coffee className="h-3 w-3 me-1" aria-hidden="true" />}
                              {amenityMap[a] || a}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mt-4 pt-3 border-t">
                      <div>
                        <span className="text-2xl font-bold">
                          <ArabicNumber value={roomPrice} />
                        </span>
                        <span className="text-sm text-muted-foreground ms-1">
                          {h.aed} {h.perNight}
                        </span>
                      </div>
                      <Link href="/examples/hotel/booking" className="shrink-0">
                        <Button className="w-full sm:w-auto">
                          {h.bookRoom}
                          <Arrow className="h-4 w-4 ms-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )
          })}
        </TabsContent>

        {/* AMENITIES TAB */}
        <TabsContent value="amenities">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: h.general,
                items: [
                  { icon: <WifiHigh className="h-5 w-5" />, label: isRTL ? 'واي فاي مجاني' : 'Free WiFi' },
                  { icon: <Car className="h-5 w-5" />, label: isRTL ? 'موقف سيارات' : 'Valet Parking' },
                  { icon: <Mosque className="h-5 w-5" />, label: isRTL ? 'مصلى' : 'Prayer Room' },
                  { icon: <Clock className="h-5 w-5" />, label: isRTL ? 'مكتب استقبال ٢٤/٧' : '24/7 Front Desk' },
                  { icon: <Briefcase className="h-5 w-5" />, label: isRTL ? 'خدمة الكونسيرج' : 'Concierge Service' },
                  { icon: <CreditCard className="h-5 w-5" />, label: isRTL ? 'صراف آلي' : 'ATM on site' },
                ],
              },
              {
                title: h.wellness,
                items: [
                  { icon: <SwimmingPool className="h-5 w-5" />, label: isRTL ? 'مسبح خارجي' : 'Outdoor Pool' },
                  { icon: <Flower className="h-5 w-5" />, label: isRTL ? 'سبا وحمام تركي' : 'Spa & Turkish Bath' },
                  { icon: <Barbell className="h-5 w-5" />, label: isRTL ? 'مركز لياقة' : 'Fitness Center' },
                  { icon: <SwimmingPool className="h-5 w-5" />, label: isRTL ? 'جاكوزي' : 'Jacuzzi' },
                ],
              },
              {
                title: h.dining,
                items: [
                  { icon: <ForkKnife className="h-5 w-5" />, label: isRTL ? 'مطعم حلال' : 'Halal Restaurant' },
                  { icon: <Coffee className="h-5 w-5" />, label: isRTL ? 'مقهى ولاونج' : 'Cafe & Lounge' },
                  { icon: <ForkKnife className="h-5 w-5" />, label: isRTL ? 'خدمة الغرف ٢٤/٧' : '24/7 Room Service' },
                  { icon: <Coffee className="h-5 w-5" />, label: isRTL ? 'إفطار بوفيه' : 'Buffet Breakfast' },
                ],
              },
              {
                title: h.business,
                items: [
                  { icon: <Briefcase className="h-5 w-5" />, label: isRTL ? 'مركز أعمال' : 'Business Center' },
                  { icon: <Users className="h-5 w-5" />, label: isRTL ? 'قاعات اجتماعات' : 'Meeting Rooms' },
                  { icon: <Briefcase className="h-5 w-5" />, label: isRTL ? 'صالة رجال الأعمال' : 'Executive Lounge' },
                ],
              },
            ].map((section) => (
              <Card key={section.title}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="text-primary">{item.icon}</div>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* REVIEWS TAB */}
        <TabsContent value="reviews">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating summary */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-primary mb-2">{hotel.rating}</div>
                <div className="flex justify-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < Math.round(hotel.rating) ? 'text-warning fill-warning' : 'text-muted',
                      )}
                      weight="fill"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {h.basedOn} <ArabicNumber value={hotel.reviewCount} /> {h.reviewsLabel}
                </p>

                <Separator className="my-4" />

                <div className="space-y-2">
                  {ratingBreakdown.map((r) => (
                    <div key={r.stars} className="flex items-center gap-2 text-sm">
                      <span className="w-8 text-end"><ArabicNumber value={r.stars} /></span>
                      <Star className="h-3 w-3 text-warning fill-warning" weight="fill" />
                      <Progress value={r.percentage} className="flex-1 h-2" />
                      <span className="w-10 text-muted-foreground text-xs"><ArabicNumber value={r.percentage} />%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews list */}
            <div className="md:col-span-2 space-y-4">
              {reviewsData.map((review, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{review.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{isRTL ? review.nameAr : review.name}</span>
                            <span className="text-xs text-muted-foreground ms-2">
                              {isRTL ? review.countryAr : review.country}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {isRTL ? review.dateAr : review.date}
                          </span>
                        </div>
                        <div className="flex gap-0.5 mt-1 mb-2">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={cn(
                                'h-3 w-3',
                                j < review.rating ? 'text-warning fill-warning' : 'text-muted',
                              )}
                              weight="fill"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? review.commentAr : review.comment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* POLICIES TAB */}
        <TabsContent value="policies">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Check-in/out */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{h.checkIn} / {h.checkOut}</h3>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{h.checkIn}</span>
                    <span className="font-medium">3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{h.checkOut}</span>
                    <span className="font-medium">12:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CalendarCheck className="h-5 w-5 text-success" />
                  </div>
                  <h3 className="font-medium">{h.cancellation}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{h.cancellationDesc}</p>
              </CardContent>
            </Card>

            {/* Children */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-info/10 rounded-lg">
                    <Baby className="h-5 w-5 text-info" />
                  </div>
                  <h3 className="font-medium">{h.children}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{h.childrenDesc}</p>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <CreditCard className="h-5 w-5 text-warning" />
                  </div>
                  <h3 className="font-medium">{h.payment}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{h.paymentDesc}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
