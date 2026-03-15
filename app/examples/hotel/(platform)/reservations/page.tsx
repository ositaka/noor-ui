'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EmptyState } from '@/components/ui/empty-state'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useDirection } from '@/components/providers/direction-provider'
import {
  CalendarBlank,
  Moon,
  MapPin,
  Star,
  Eye,
  X as XIcon,
  ArrowClockwise,
  CalendarX,
  Bed,
} from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    title: 'My Reservations',
    home: 'Home',
    upcoming: 'Upcoming',
    past: 'Past',
    cancelled: 'Cancelled',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    nights: 'nights',
    night: 'night',
    confirmation: 'Confirmation',
    aed: 'AED',
    viewDetails: 'View Details',
    cancelBooking: 'Cancel',
    rebook: 'Rebook',
    status: 'Status',
    confirmed: 'Confirmed',
    checkedOut: 'Checked Out',
    cancelledStatus: 'Cancelled',
    noUpcoming: 'No upcoming reservations',
    noUpcomingDesc: 'When you book a hotel, your upcoming stays will appear here.',
    noCancelled: 'No cancelled reservations',
    noCancelledDesc: 'You haven\'t cancelled any bookings.',
    browseHotels: 'Browse Hotels',
    total: 'Total',
  },
  ar: {
    title: 'حجوزاتي',
    home: 'الرئيسية',
    upcoming: 'القادمة',
    past: 'السابقة',
    cancelled: 'الملغاة',
    checkIn: 'تسجيل الوصول',
    checkOut: 'تسجيل المغادرة',
    nights: 'ليالٍ',
    night: 'ليلة',
    confirmation: 'رقم التأكيد',
    aed: 'د.إ',
    viewDetails: 'عرض التفاصيل',
    cancelBooking: 'إلغاء',
    rebook: 'إعادة الحجز',
    status: 'الحالة',
    confirmed: 'مؤكد',
    checkedOut: 'تم تسجيل المغادرة',
    cancelledStatus: 'ملغي',
    noUpcoming: 'لا توجد حجوزات قادمة',
    noUpcomingDesc: 'عندما تحجز فندقاً، ستظهر إقاماتك القادمة هنا.',
    noCancelled: 'لا توجد حجوزات ملغاة',
    noCancelledDesc: 'لم تقم بإلغاء أي حجوزات.',
    browseHotels: 'تصفح الفنادق',
    total: 'الإجمالي',
  },
}

// ---------------------------------------------------------------------------
// Reservation data
// ---------------------------------------------------------------------------

interface Reservation {
  id: string
  ref: string
  hotelName: string
  hotelNameAr: string
  hotelImage: string
  roomType: string
  roomTypeAr: string
  location: string
  locationAr: string
  stars: number
  checkIn: string
  checkOut: string
  nights: number
  total: number
  status: 'confirmed' | 'checked-out' | 'cancelled'
}

const upcomingReservations: Reservation[] = [
  {
    id: '1',
    ref: 'NZL-2026-04782',
    hotelName: 'Pearl Grand Hotel',
    hotelNameAr: 'فندق اللؤلؤة الكبير',
    hotelImage: '/examples/hotel/hotel-1.jpg',
    roomType: 'Deluxe Room',
    roomTypeAr: 'غرفة ديلوكس',
    location: 'Dubai Marina, Dubai',
    locationAr: 'دبي مارينا، دبي',
    stars: 5,
    checkIn: 'Mar 20, 2026',
    checkOut: 'Mar 23, 2026',
    nights: 3,
    total: 3528,
    status: 'confirmed',
  },
  {
    id: '2',
    ref: 'NZL-2026-04856',
    hotelName: 'Riyadh Towers Hotel',
    hotelNameAr: 'أبراج الرياض',
    hotelImage: '/examples/hotel/hotel-5.jpg',
    roomType: 'Suite',
    roomTypeAr: 'جناح',
    location: 'Olaya District, Riyadh',
    locationAr: 'حي العليا، الرياض',
    stars: 5,
    checkIn: 'Apr 10, 2026',
    checkOut: 'Apr 12, 2026',
    nights: 2,
    total: 2450,
    status: 'confirmed',
  },
]

const pastReservations: Reservation[] = [
  {
    id: '3',
    ref: 'NZL-2025-03421',
    hotelName: 'Al Nakheel Resort',
    hotelNameAr: 'منتجع النخيل',
    hotelImage: '/examples/hotel/hotel-2.jpg',
    roomType: 'Royal Suite',
    roomTypeAr: 'الجناح الملكي',
    location: 'Corniche, Abu Dhabi',
    locationAr: 'الكورنيش، أبوظبي',
    stars: 5,
    checkIn: 'Dec 24, 2025',
    checkOut: 'Dec 28, 2025',
    nights: 4,
    total: 7200,
    status: 'checked-out',
  },
  {
    id: '4',
    ref: 'NZL-2025-02987',
    hotelName: 'Al Deira Boutique Hotel',
    hotelNameAr: 'فندق الديرة بوتيك',
    hotelImage: '/examples/hotel/hotel-3.jpg',
    roomType: 'Standard Room',
    roomTypeAr: 'غرفة قياسية',
    location: 'West Bay, Doha',
    locationAr: 'الخليج الغربي، الدوحة',
    stars: 4,
    checkIn: 'Nov 15, 2025',
    checkOut: 'Nov 17, 2025',
    nights: 2,
    total: 1120,
    status: 'checked-out',
  },
  {
    id: '5',
    ref: 'NZL-2025-02654',
    hotelName: 'Al Waha Hotel',
    hotelNameAr: 'فندق الواحة',
    hotelImage: '/examples/hotel/hotel-4.jpg',
    roomType: 'Deluxe Room',
    roomTypeAr: 'غرفة ديلوكس',
    location: 'Al Qurum, Muscat',
    locationAr: 'القرم، مسقط',
    stars: 4,
    checkIn: 'Oct 5, 2025',
    checkOut: 'Oct 8, 2025',
    nights: 3,
    total: 1680,
    status: 'checked-out',
  },
  {
    id: '6',
    ref: 'NZL-2025-02102',
    hotelName: 'Red Sea Hotel',
    hotelNameAr: 'فندق البحر الأحمر',
    hotelImage: '/examples/hotel/hotel-6.jpg',
    roomType: 'Standard Room',
    roomTypeAr: 'غرفة قياسية',
    location: 'Corniche, Jeddah',
    locationAr: 'الكورنيش، جدة',
    stars: 4,
    checkIn: 'Aug 20, 2025',
    checkOut: 'Aug 22, 2025',
    nights: 2,
    total: 980,
    status: 'checked-out',
  },
  {
    id: '7',
    ref: 'NZL-2025-01876',
    hotelName: 'Pearl Grand Hotel',
    hotelNameAr: 'فندق اللؤلؤة الكبير',
    hotelImage: '/examples/hotel/hotel-1.jpg',
    roomType: 'Suite',
    roomTypeAr: 'جناح',
    location: 'Dubai Marina, Dubai',
    locationAr: 'دبي مارينا، دبي',
    stars: 5,
    checkIn: 'Jun 10, 2025',
    checkOut: 'Jun 14, 2025',
    nights: 4,
    total: 5600,
    status: 'checked-out',
  },
]

const cancelledReservations: Reservation[] = [
  {
    id: '8',
    ref: 'NZL-2025-03100',
    hotelName: 'Riyadh Towers Hotel',
    hotelNameAr: 'أبراج الرياض',
    hotelImage: '/examples/hotel/hotel-5.jpg',
    roomType: 'Deluxe Room',
    roomTypeAr: 'غرفة ديلوكس',
    location: 'Olaya District, Riyadh',
    locationAr: 'حي العليا، الرياض',
    stars: 5,
    checkIn: 'Jan 5, 2026',
    checkOut: 'Jan 7, 2026',
    nights: 2,
    total: 1560,
    status: 'cancelled',
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ReservationsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]

  const statusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-success text-success-foreground">{h.confirmed}</Badge>
      case 'checked-out':
        return <Badge variant="secondary">{h.checkedOut}</Badge>
      case 'cancelled':
        return <Badge variant="destructive">{h.cancelledStatus}</Badge>
    }
  }

  const renderReservation = (res: Reservation) => (
    <Card key={res.id} className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden">
          <Image
            src={res.hotelImage}
            alt={isRTL ? res.hotelNameAr : res.hotelName}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-lg">
                {isRTL ? res.hotelNameAr : res.hotelName}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{isRTL ? res.locationAr : res.location}</span>
              </div>
              <div className="flex items-center gap-0.5 mt-1">
                {Array.from({ length: res.stars }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-warning fill-warning" weight="fill" />
                ))}
              </div>
            </div>
            {statusBadge(res.status)}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mt-3">
            <div>
              <span className="text-xs text-muted-foreground block">{isRTL ? 'الغرفة' : 'Room'}</span>
              <span className="font-medium">{isRTL ? res.roomTypeAr : res.roomType}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">{h.checkIn}</span>
              <span className="font-medium" dir="ltr">{res.checkIn}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">{h.checkOut}</span>
              <span className="font-medium" dir="ltr">{res.checkOut}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">{h.total}</span>
              <span className="font-bold"><ArabicNumber value={res.total} /> {h.aed}</span>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {h.confirmation}: <span className="font-mono" dir="ltr">{res.ref}</span>
            </span>
            <div className="flex gap-2">
              {res.status === 'confirmed' && (
                <>
                  <Link href={`/examples/hotel/${res.hotelName.toLowerCase().replace(/\s+/g, '-').replace('hotel', '').replace('resort', '').trim()}`}>
                    <Button variant="outline" size="sm" aria-label={`${h.viewDetails} — ${isRTL ? res.hotelNameAr : res.hotelName}`}>
                      <Eye className="h-3.5 w-3.5 me-1" aria-hidden="true" />
                      {h.viewDetails}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" aria-label={`${h.cancelBooking} — ${isRTL ? res.hotelNameAr : res.hotelName}`}>
                    <XIcon className="h-3.5 w-3.5 me-1" aria-hidden="true" />
                    {h.cancelBooking}
                  </Button>
                </>
              )}
              {(res.status === 'checked-out' || res.status === 'cancelled') && (
                <Link href="/examples/hotel/search">
                  <Button variant="outline" size="sm" aria-label={`${h.rebook} — ${isRTL ? res.hotelNameAr : res.hotelName}`}>
                    <ArrowClockwise className="h-3.5 w-3.5 me-1" aria-hidden="true" />
                    {h.rebook}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )

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
            <BreadcrumbPage>{h.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-6">{h.title}</h1>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">
            {h.upcoming} (<ArabicNumber value={upcomingReservations.length} />)
          </TabsTrigger>
          <TabsTrigger value="past">
            {h.past} (<ArabicNumber value={pastReservations.length} />)
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            {h.cancelled} (<ArabicNumber value={cancelledReservations.length} />)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingReservations.length > 0
            ? upcomingReservations.map(renderReservation)
            : (
                <EmptyState
                  icon={<CalendarX className="h-12 w-12" />}
                  title={h.noUpcoming}
                  description={h.noUpcomingDesc}
                  action={
                    <Link href="/examples/hotel/search">
                      <Button>{h.browseHotels}</Button>
                    </Link>
                  }
                />
              )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastReservations.map(renderReservation)}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledReservations.length > 0
            ? cancelledReservations.map(renderReservation)
            : (
                <EmptyState
                  icon={<CalendarX className="h-12 w-12" />}
                  title={h.noCancelled}
                  description={h.noCancelledDesc}
                />
              )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
