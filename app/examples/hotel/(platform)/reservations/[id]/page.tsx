'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Timeline } from '@/components/ui/timeline'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useDirection } from '@/components/providers/direction-provider'
import {
  Star,
  MapPin,
  CalendarBlank,
  Moon,
  CheckCircle,
  Clock,
  HourglassHigh,
  FileText,
  DownloadSimple,
  Phone,
  PencilSimple,
  X as XIcon,
  Warning,
  Printer,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    home: 'Home',
    reservations: 'My Reservations',
    reservationDetail: 'Reservation Details',
    bookingTimeline: 'Booking Timeline',
    bookingSummary: 'Booking Summary',
    hotel: 'Hotel',
    room: 'Room',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    nights: 'nights',
    guests: 'Guests',
    confirmation: 'Confirmation #',
    priceBreakdown: 'Price Breakdown',
    roomRate: 'Room rate',
    tourismFee: 'Tourism fee',
    serviceCharge: 'Service charge',
    vat: 'VAT (5%)',
    total: 'Total',
    aed: 'AED',
    documents: 'Documents',
    bookingConfirmation: 'Booking Confirmation',
    paymentReceipt: 'Payment Receipt',
    download: 'تنزيل',
    downloadEn: 'Download',
    actions: 'Actions',
    modifyDates: 'Modify Dates',
    contactHotel: 'Contact Hotel',
    cancelBooking: 'Cancel Booking',
    printBooking: 'Print',
    cancelTitle: 'Cancel Reservation',
    cancelDesc: 'Are you sure you want to cancel this reservation? Free cancellation is available until 48 hours before check-in.',
    cancelConfirm: 'Yes, Cancel',
    cancelBack: 'Keep Reservation',
    status: 'Status',
    confirmed: 'Confirmed',
    guestName: 'Guest',
    phone: 'Phone',
    email: 'Email',
    guestDetails: 'Guest Details',
    // Timeline
    booked: 'Booking Created',
    bookedDesc: 'Reservation confirmed via online payment',
    paymentReceived: 'Payment Received',
    paymentReceivedDesc: 'Full payment of 3,528 AED processed',
    confirmationSent: 'Confirmation Sent',
    confirmationSentDesc: 'Email and SMS confirmation sent to guest',
    awaitingCheckIn: 'Awaiting Check-in',
    awaitingCheckInDesc: 'Check-in available from 3:00 PM on arrival date',
    checkedIn: 'Checked In',
    checkedOut: 'Checked Out',
  },
  ar: {
    home: 'الرئيسية',
    reservations: 'حجوزاتي',
    reservationDetail: 'تفاصيل الحجز',
    bookingTimeline: 'مراحل الحجز',
    bookingSummary: 'ملخص الحجز',
    hotel: 'الفندق',
    room: 'الغرفة',
    checkIn: 'تسجيل الوصول',
    checkOut: 'تسجيل المغادرة',
    nights: 'ليالٍ',
    guests: 'الضيوف',
    confirmation: 'رقم التأكيد',
    priceBreakdown: 'تفاصيل السعر',
    roomRate: 'سعر الغرفة',
    tourismFee: 'رسوم السياحة',
    serviceCharge: 'رسوم الخدمة',
    vat: 'ضريبة القيمة المضافة (٥٪)',
    total: 'الإجمالي',
    aed: 'د.إ',
    documents: 'المستندات',
    bookingConfirmation: 'تأكيد الحجز',
    paymentReceipt: 'إيصال الدفع',
    download: 'تنزيل',
    downloadEn: 'Download',
    actions: 'الإجراءات',
    modifyDates: 'تعديل التواريخ',
    contactHotel: 'التواصل مع الفندق',
    cancelBooking: 'إلغاء الحجز',
    printBooking: 'طباعة',
    cancelTitle: 'إلغاء الحجز',
    cancelDesc: 'هل أنت متأكد من إلغاء هذا الحجز؟ الإلغاء المجاني متاح حتى ٤٨ ساعة قبل تسجيل الوصول.',
    cancelConfirm: 'نعم، إلغاء',
    cancelBack: 'الاحتفاظ بالحجز',
    status: 'الحالة',
    confirmed: 'مؤكد',
    guestName: 'الضيف',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    guestDetails: 'بيانات الضيف',
    // Timeline
    booked: 'إنشاء الحجز',
    bookedDesc: 'تم تأكيد الحجز عبر الدفع الإلكتروني',
    paymentReceived: 'استلام الدفع',
    paymentReceivedDesc: 'تم تحصيل المبلغ الكامل ٣٬٥٢٨ د.إ',
    confirmationSent: 'إرسال التأكيد',
    confirmationSentDesc: 'تم إرسال تأكيد بالبريد الإلكتروني والرسائل النصية',
    awaitingCheckIn: 'في انتظار تسجيل الوصول',
    awaitingCheckInDesc: 'تسجيل الوصول متاح من الساعة ٣:٠٠ مساءً في يوم الوصول',
    checkedIn: 'تسجيل الوصول',
    checkedOut: 'تسجيل المغادرة',
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ReservationDetailPage({ params }: { params: { id: string } }) {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]

  // Static data for the demo — in a real app this would come from an API
  const reservation = {
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
    guests: 2,
    roomRate: 3000,
    tourismFee: 60,
    serviceCharge: 300,
    vat: 168,
    total: 3528,
    status: 'confirmed' as const,
  }

  const timelineItems = [
    {
      icon: <CheckCircle className="h-5 w-5" weight="fill" />,
      title: h.booked,
      description: h.bookedDesc,
      date: 'Mar 10, 2026',
      dateAr: '١٠ مارس ٢٠٢٦',
      status: 'complete' as const,
    },
    {
      icon: <CheckCircle className="h-5 w-5" weight="fill" />,
      title: h.paymentReceived,
      description: h.paymentReceivedDesc,
      date: 'Mar 10, 2026',
      dateAr: '١٠ مارس ٢٠٢٦',
      status: 'complete' as const,
    },
    {
      icon: <CheckCircle className="h-5 w-5" weight="fill" />,
      title: h.confirmationSent,
      description: h.confirmationSentDesc,
      date: 'Mar 10, 2026',
      dateAr: '١٠ مارس ٢٠٢٦',
      status: 'complete' as const,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: h.awaitingCheckIn,
      description: h.awaitingCheckInDesc,
      date: 'Mar 20, 2026',
      dateAr: '٢٠ مارس ٢٠٢٦',
      status: 'current' as const,
    },
    {
      title: h.checkedOut,
      date: 'Mar 23, 2026',
      dateAr: '٢٣ مارس ٢٠٢٦',
      status: 'upcoming' as const,
    },
  ]

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
            <BreadcrumbLink href="/examples/hotel/reservations">{h.reservations}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{reservation.ref}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{h.reservationDetail}</h1>
          <p className="text-sm text-muted-foreground font-mono" dir="ltr">{reservation.ref}</p>
        </div>
        <Badge className="bg-success text-success-foreground self-start sm:self-auto">
          <CheckCircle className="h-3.5 w-3.5 me-1" weight="fill" aria-hidden="true" />
          {h.confirmed}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel Card */}
          <Card className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-56 h-40 sm:h-auto shrink-0 overflow-hidden">
                <Image
                  src={reservation.hotelImage}
                  alt={isRTL ? reservation.hotelNameAr : reservation.hotelName}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="flex-1 p-4">
                <h2 className="font-semibold text-xl mb-1">
                  {isRTL ? reservation.hotelNameAr : reservation.hotelName}
                </h2>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{isRTL ? reservation.locationAr : reservation.location}</span>
                </div>
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: reservation.stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-warning fill-warning" weight="fill" aria-hidden="true" />
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground block">{h.room}</span>
                    <span className="font-medium">{isRTL ? reservation.roomTypeAr : reservation.roomType}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">{h.checkIn}</span>
                    <span className="font-medium" dir="ltr">{reservation.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">{h.checkOut}</span>
                    <span className="font-medium" dir="ltr">{reservation.checkOut}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">{h.guests}</span>
                    <span className="font-medium"><ArabicNumber value={reservation.guests} /></span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{h.bookingTimeline}</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline
                items={timelineItems}
                cards
                aria-label={h.bookingTimeline}
              />
            </CardContent>
          </Card>

          {/* Guest Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{h.guestDetails}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block">{h.guestName}</span>
                  <span className="font-medium">{isRTL ? 'أحمد الفلاسي' : 'Ahmed Al Falasi'}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">{h.email}</span>
                  <span className="font-medium" dir="ltr">ahmed@nuzul.demo</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">{h.phone}</span>
                  <span className="font-medium" dir="ltr">+971 50 123 4567</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{h.priceBreakdown}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {h.roomRate} (<ArabicNumber value={reservation.nights} /> {h.nights})
                </span>
                <span><ArabicNumber value={reservation.roomRate} /> {h.aed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.tourismFee}</span>
                <span><ArabicNumber value={reservation.tourismFee} /> {h.aed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.serviceCharge}</span>
                <span><ArabicNumber value={reservation.serviceCharge} /> {h.aed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.vat}</span>
                <span><ArabicNumber value={reservation.vat} /> {h.aed}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>{h.total}</span>
                <span className="text-primary"><ArabicNumber value={reservation.total} /> {h.aed}</span>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{h.documents}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: h.bookingConfirmation, icon: <FileText className="h-4 w-4" />, size: '245 KB' },
                { name: h.paymentReceipt, icon: <FileText className="h-4 w-4" />, size: '180 KB' },
              ].map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{doc.icon}</div>
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">PDF · {doc.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <DownloadSimple className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{h.download}</span>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{h.actions}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <PencilSimple className="h-4 w-4 me-2" aria-hidden="true" />
                {h.modifyDates}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 me-2" aria-hidden="true" />
                {h.contactHotel}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Printer className="h-4 w-4 me-2" aria-hidden="true" />
                {h.printBooking}
              </Button>
              <Separator />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    <XIcon className="h-4 w-4 me-2" aria-hidden="true" />
                    {h.cancelBooking}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Warning className="h-5 w-5 text-destructive" aria-hidden="true" />
                      {h.cancelTitle}
                    </DialogTitle>
                    <DialogDescription>
                      {h.cancelDesc}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-4 bg-muted/30 rounded-lg text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">{h.hotel}</span>
                      <span className="font-medium">{isRTL ? reservation.hotelNameAr : reservation.hotelName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{h.confirmation}</span>
                      <span className="font-mono" dir="ltr">{reservation.ref}</span>
                    </div>
                  </div>
                  <DialogFooter className="gap-2">
                    <Button variant="outline">{h.cancelBack}</Button>
                    <Button variant="destructive">{h.cancelConfirm}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
