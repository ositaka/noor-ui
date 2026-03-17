'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FeatureCard } from '@/components/ui/feature-card'
import { Badge } from '@/components/ui/badge'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { DatePicker } from '@/components/ui/date-picker'
import { StatsCard } from '@/components/ui/stats-card'
import { Callout } from '@/components/ui/callout'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDirection } from '@/components/providers/direction-provider'
import {
  MagnifyingGlass,
  Star,
  MapPin,
  ShieldCheck,
  CurrencyDollar,
  Headset,
  Buildings,
  Users,
  ChatCircle,
  MapTrifold,
  CalendarCheck,
  Trophy,
  TrendUp,
  Sparkle,
  Bed,
  ArrowRight,
  ArrowLeft,
} from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    heroTitle: 'Discover the Finest Hotels in the Gulf',
    heroSubtitle: 'Book luxury hotels across Dubai, Abu Dhabi, Doha, Riyadh, and more',
    destination: 'Destination',
    destinationPlaceholder: 'Where are you going?',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    searchBtn: 'Search Hotels',
    statsHotels: 'Hotels',
    statsReviews: 'Reviews',
    statsCities: 'Cities',
    statsSatisfaction: 'Satisfaction',
    featuredTitle: 'Featured Hotels',
    featuredSubtitle: 'Handpicked luxury stays across the Gulf',
    perNight: '/ night',
    viewAll: 'View All Hotels',
    popularTitle: 'Popular Destinations',
    popularSubtitle: 'Explore top destinations across the GCC',
    hotels: 'hotels',
    from: 'From',
    whyTitle: 'Why Book With Nuzul',
    whySubtitle: 'Your trusted partner for Gulf hospitality',
    bestPrice: 'Best Price Guarantee',
    bestPriceDesc: 'We match any lower price you find. Book with confidence knowing you\'re getting the best deal.',
    freeCancellation: 'Free Cancellation',
    freeCancellationDesc: 'Plans change. Cancel up to 48 hours before check-in at no cost. Full flexibility guaranteed.',
    support: '24/7 Arabic Support',
    supportDesc: 'Our bilingual team is available around the clock. Get help in Arabic or English, anytime.',
    guest: 'guest',
    guestsLabel: 'guests',
    aed: 'AED',
    // Dashboard section
    welcomeBack: 'Welcome back, Faysa',
    dashboardSubtitle: 'Here\'s your travel overview',
    totalBookings: 'Total Bookings',
    loyaltyPoints: 'Loyalty Points',
    upcomingStays: 'Upcoming Stays',
    savedThisYear: 'Saved This Year',
    fromLastMonth: 'from last month',
    bookingsByCity: 'Your Bookings by City',
    ramadanPromo: 'Ramadan Special Offer',
    ramadanPromoDesc: 'Enjoy 20% off all bookings during the holy month. Use code RAMADAN2026 at checkout. Valid until April 15, 2026.',
    continueSearch: 'Continue Your Search',
    continueSearchDesc: 'You were looking at hotels in Dubai. Pick up where you left off.',
    continueBtn: 'Continue',
    dubai: 'Dubai',
    abuDhabi: 'Abu Dhabi',
    doha: 'Doha',
    riyadh: 'Riyadh',
    muscat: 'Muscat',
    jeddah: 'Jeddah',
  },
  ar: {
    heroTitle: 'اكتشف أفضل الفنادق في الخليج',
    heroSubtitle: 'احجز فنادق فاخرة في دبي وأبوظبي والدوحة والرياض والمزيد',
    destination: 'الوجهة',
    destinationPlaceholder: 'إلى أين تريد الذهاب؟',
    checkIn: 'تسجيل الوصول',
    checkOut: 'تسجيل المغادرة',
    guests: 'الضيوف',
    searchBtn: 'بحث الفنادق',
    statsHotels: 'فندق',
    statsReviews: 'تقييم',
    statsCities: 'مدينة',
    statsSatisfaction: 'رضا العملاء',
    featuredTitle: 'فنادق مميزة',
    featuredSubtitle: 'إقامات فاخرة مختارة بعناية في الخليج',
    perNight: '/ ليلة',
    viewAll: 'عرض جميع الفنادق',
    popularTitle: 'وجهات شائعة',
    popularSubtitle: 'استكشف أفضل الوجهات في دول الخليج',
    hotels: 'فندق',
    from: 'من',
    whyTitle: 'لماذا تحجز مع نزل',
    whySubtitle: 'شريكك الموثوق للضيافة الخليجية',
    bestPrice: 'ضمان أفضل سعر',
    bestPriceDesc: 'نطابق أي سعر أقل تجده. احجز بثقة مع ضمان الحصول على أفضل صفقة.',
    freeCancellation: 'إلغاء مجاني',
    freeCancellationDesc: 'الخطط تتغير. ألغِ قبل ٤٨ ساعة من تسجيل الوصول بدون أي تكلفة. مرونة كاملة مضمونة.',
    support: 'دعم عربي ٢٤/٧',
    supportDesc: 'فريقنا ثنائي اللغة متاح على مدار الساعة. احصل على المساعدة بالعربية أو الإنجليزية في أي وقت.',
    guest: 'ضيف',
    guestsLabel: 'ضيوف',
    aed: 'د.إ',
    // Dashboard section
    welcomeBack: 'أهلاً بعودتكِ، فايزة',
    dashboardSubtitle: 'إليك نظرة عامة على رحلاتك',
    totalBookings: 'إجمالي الحجوزات',
    loyaltyPoints: 'نقاط الولاء',
    upcomingStays: 'الإقامات القادمة',
    savedThisYear: 'وفّرت هذا العام',
    fromLastMonth: 'من الشهر الماضي',
    bookingsByCity: 'حجوزاتك حسب المدينة',
    ramadanPromo: 'عرض رمضان الخاص',
    ramadanPromoDesc: 'استمتع بخصم ٢٠٪ على جميع الحجوزات خلال الشهر الكريم. استخدم الرمز RAMADAN2026 عند الدفع. صالح حتى ١٥ أبريل ٢٠٢٦.',
    continueSearch: 'أكمل بحثك',
    continueSearchDesc: 'كنت تبحث عن فنادق في دبي. أكمل من حيث توقفت.',
    continueBtn: 'متابعة',
    dubai: 'دبي',
    abuDhabi: 'أبوظبي',
    doha: 'الدوحة',
    riyadh: 'الرياض',
    muscat: 'مسقط',
    jeddah: 'جدة',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface FeaturedHotel {
  id: string
  name: string
  nameAr: string
  location: string
  locationAr: string
  stars: number
  price: number
  image: string
  rating: number
  reviewCount: number
}

const featuredHotels: FeaturedHotel[] = [
  {
    id: 'pearl-grand',
    name: 'Pearl Grand Hotel',
    nameAr: 'فندق اللؤلؤة الكبير',
    location: 'Dubai Marina, Dubai',
    locationAr: 'دبي مارينا، دبي',
    stars: 5,
    price: 850,
    image: '/examples/hotel/hotel-1.jpg',
    rating: 4.8,
    reviewCount: 2341,
  },
  {
    id: 'al-nakheel',
    name: 'Al Nakheel Resort',
    nameAr: 'منتجع النخيل',
    location: 'Corniche, Abu Dhabi',
    locationAr: 'الكورنيش، أبوظبي',
    stars: 5,
    price: 720,
    image: '/examples/hotel/hotel-2.jpg',
    rating: 4.7,
    reviewCount: 1856,
  },
  {
    id: 'al-deira',
    name: 'Al Deira Boutique Hotel',
    nameAr: 'فندق الديرة بوتيك',
    location: 'West Bay, Doha',
    locationAr: 'الخليج الغربي، الدوحة',
    stars: 4,
    price: 480,
    image: '/examples/hotel/hotel-3.jpg',
    rating: 4.6,
    reviewCount: 987,
  },
]

interface Destination {
  city: string
  cityAr: string
  country: string
  countryAr: string
  hotelCount: number
  startingPrice: number
  image: string
}

const destinations: Destination[] = [
  { city: 'Dubai', cityAr: 'دبي', country: 'UAE', countryAr: 'الإمارات', hotelCount: 85, startingPrice: 350, image: '/examples/hotel/hotel-1.jpg' },
  { city: 'Doha', cityAr: 'الدوحة', country: 'Qatar', countryAr: 'قطر', hotelCount: 42, startingPrice: 280, image: '/examples/hotel/hotel-3.jpg' },
  { city: 'Riyadh', cityAr: 'الرياض', country: 'Saudi Arabia', countryAr: 'السعودية', hotelCount: 67, startingPrice: 320, image: '/examples/hotel/hotel-4.jpg' },
  { city: 'Muscat', cityAr: 'مسقط', country: 'Oman', countryAr: 'عُمان', hotelCount: 38, startingPrice: 250, image: '/examples/hotel/hotel-5.jpg' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HotelLandingPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]
  const [checkIn, setCheckIn] = React.useState<Date>()
  const [checkOut, setCheckOut] = React.useState<Date>()
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden" aria-label={h.heroTitle}>
        <div className="absolute inset-0">
          <Image
            src="/examples/hotel/hero.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative container py-20 md:py-28 text-white">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-balance">
              {h.heroTitle}
            </h1>
            <p className="text-lg text-white/80">
              {h.heroSubtitle}
            </p>
          </div>

          {/* Search Bar */}
          <Card className="mt-10 max-w-4xl mx-auto">
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-1 space-y-2">
                  <Label htmlFor="hero-dest" className="text-sm font-medium">{h.destination}</Label>
                  <div className="relative">
                    <MagnifyingGlass className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="hero-dest"
                      placeholder={h.destinationPlaceholder}
                      className="ps-9"
                      defaultValue={isRTL ? 'دبي' : 'Dubai'}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{h.checkIn}</Label>
                  <DatePicker
                    date={checkIn}
                    onDateChange={setCheckIn}
                    placeholder={h.checkIn}
                    placeholderAr={h.checkIn}
                    minDate={new Date()}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{h.checkOut}</Label>
                  <DatePicker
                    date={checkOut}
                    onDateChange={setCheckOut}
                    placeholder={h.checkOut}
                    placeholderAr={h.checkOut}
                    minDate={checkIn || new Date()}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{h.guests}</Label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          <ArabicNumber value={n} /> {n === 1 ? h.guest : h.guestsLabel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Link href="/examples/hotel/search" className="block">
                  <Button className="w-full" size="lg">
                    <MagnifyingGlass className="h-5 w-5 shrink-0" weight="bold" aria-hidden="true" />
                    <span>{h.searchBtn}</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Stats Row */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16 text-white/90">
            {[
              { value: '200+', label: h.statsHotels, icon: Buildings },
              { value: '50K+', label: h.statsReviews, icon: ChatCircle },
              { value: '15', label: h.statsCities, icon: MapTrifold },
              { value: '99%', label: h.statsSatisfaction, icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-1 text-white/70" aria-hidden="true" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Dashboard — welcome back section */}
      <section className="container py-10" aria-label={h.welcomeBack}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl font-bold">{h.welcomeBack}</h2>
            <p className="text-muted-foreground text-sm">{h.dashboardSubtitle}</p>
          </div>
          <Badge variant="outline" className="border-warning/50 text-warning self-start md:self-auto">
            <Trophy className="h-3.5 w-3.5 me-1" weight="fill" aria-hidden="true" />
            Gold
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatsCard
            icon={<Bed className="h-4 w-4" />}
            label={h.totalBookings}
            value={12}
            trend={25}
            trendLabel={h.fromLastMonth}
          />
          <StatsCard
            icon={<Sparkle className="h-4 w-4" />}
            label={h.loyaltyPoints}
            value="4,850"
            trend={12}
            trendLabel={h.fromLastMonth}
          />
          <StatsCard
            icon={<CalendarCheck className="h-4 w-4" />}
            label={h.upcomingStays}
            value={2}
          />
          <StatsCard
            icon={<TrendUp className="h-4 w-4" />}
            label={h.savedThisYear}
            value={`1,200 ${h.aed}`}
          />
        </div>

        {/* Continue Search + Promo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Continue Your Search */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                <Image src="/examples/hotel/hotel-1.jpg" alt="" fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{h.continueSearch}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{isRTL ? 'دبي مارينا' : 'Dubai Marina'} · Mar 20–23 · 2 {h.guestsLabel}</p>
                <Link href="/examples/hotel/search">
                  <Button size="sm" className="mt-2">
                    {h.continueBtn}
                    <Arrow className="h-3.5 w-3.5 ms-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Promo */}
          <Callout type="info" title={h.ramadanPromo} className="h-full my-auto">
            <p className="text-sm">{h.ramadanPromoDesc}</p>
          </Callout>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="bg-muted/20 py-16" aria-label={h.featuredTitle}>
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">{h.featuredTitle}</h2>
            <p className="text-muted-foreground mt-2">{h.featuredSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <Link key={hotel.id} href={`/examples/hotel/${hotel.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={hotel.image}
                      alt={isRTL ? hotel.nameAr : hotel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 start-3 bg-background/90 text-foreground">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-warning fill-warning" weight="fill" aria-hidden="true" />
                      ))}
                    </Badge>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg">
                      {isRTL ? hotel.nameAr : hotel.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{isRTL ? hotel.locationAr : hotel.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="secondary" className="font-semibold">
                          <Star className="h-3 w-3 me-0.5 fill-warning text-warning" weight="fill" aria-hidden="true" />
                          {hotel.rating}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          (<ArabicNumber value={hotel.reviewCount} />)
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="font-bold text-lg">
                          <ArabicNumber value={hotel.price} />
                        </span>
                        <span className="text-xs text-muted-foreground ms-1">
                          {h.aed} {h.perNight}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/examples/hotel/search">
              <ButtonArrow variant="outline" size="lg">
                {h.viewAll}
              </ButtonArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container py-16" aria-label={h.popularTitle}>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">{h.popularTitle}</h2>
          <p className="text-muted-foreground mt-2">{h.popularSubtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <Link key={dest.city} href="/examples/hotel/search">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={isRTL ? dest.cityAr : dest.city}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 start-3 text-white">
                    <h3 className="font-bold text-lg">{isRTL ? dest.cityAr : dest.city}</h3>
                    <p className="text-xs text-white/80">{isRTL ? dest.countryAr : dest.country}</p>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      <ArabicNumber value={dest.hotelCount} /> {h.hotels}
                    </span>
                    <span className="font-medium">
                      {h.from} <ArabicNumber value={dest.startingPrice} /> {h.aed}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="bg-muted/20 py-16" aria-label={h.whyTitle}>
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">{h.whyTitle}</h2>
            <p className="text-muted-foreground mt-2">{h.whySubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={ShieldCheck}
              title={h.bestPrice}
              description={h.bestPriceDesc}
            />
            <FeatureCard
              icon={CurrencyDollar}
              title={h.freeCancellation}
              description={h.freeCancellationDesc}
            />
            <FeatureCard
              icon={Headset}
              title={h.support}
              description={h.supportDesc}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
