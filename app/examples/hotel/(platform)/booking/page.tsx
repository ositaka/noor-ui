'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Stepper } from '@/components/ui/stepper'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Callout } from '@/components/ui/callout'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useDirection } from '@/components/providers/direction-provider'
import {
  User,
  CreditCard,
  CheckCircle,
  Star,
  MapPin,
  CalendarBlank,
  Moon,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Confetti,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    title: 'Complete Your Booking',
    home: 'Home',
    hotels: 'Hotels',
    booking: 'Booking',
    step1: 'Guest Details',
    step1Desc: 'Your information',
    step2: 'Payment',
    step2Desc: 'Secure payment',
    step3: 'Review & Confirm',
    step3Desc: 'Verify your booking',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    nationality: 'Nationality',
    specialRequests: 'Special Requests',
    specialRequestsPlaceholder: 'e.g., early check-in, high floor, Quran in room...',
    arrivalTime: 'Estimated Arrival Time',
    next: 'Continue',
    back: 'Back',
    cardNumber: 'Card Number',
    cardHolder: 'Cardholder Name',
    expiry: 'Expiry Date',
    cvv: 'CVV',
    payAtHotel: 'Pay at Hotel',
    payAtHotelDesc: 'You can pay upon arrival. A valid credit card is still required for guarantee.',
    payOnline: 'Pay Online',
    payOnlineDesc: 'Secure payment processed immediately.',
    bookingSummary: 'Booking Summary',
    hotel: 'Pearl Grand Hotel',
    hotelAr: 'فندق اللؤلؤة الكبير',
    roomType: 'Deluxe Room',
    roomTypeAr: 'غرفة ديلوكس',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    nights: 'nights',
    roomRate: 'Room rate',
    tourismFee: 'Tourism dirham fee',
    serviceCharge: 'Service charge (10%)',
    vat: 'VAT (5%)',
    total: 'Total',
    aed: 'AED',
    perNight: '/ night',
    agreeTerms: 'I agree to the booking terms and cancellation policy',
    freeCancellation: 'Free cancellation until 48 hours before check-in',
    confirmBooking: 'Confirm Booking',
    reviewDetails: 'Review your booking details before confirming.',
    guestDetails: 'Guest Details',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit card ending in',
    confirmed: 'Booking Confirmed!',
    confirmedDesc: 'Your reservation has been confirmed. A confirmation email has been sent.',
    bookingRef: 'Booking Reference',
    viewReservations: 'View My Reservations',
    bookAnother: 'Book Another Hotel',
    secure: 'Your payment is secured with SSL encryption',
    uae: 'UAE',
    saudiArabia: 'Saudi Arabia',
    qatar: 'Qatar',
    oman: 'Oman',
    bahrain: 'Bahrain',
    kuwait: 'Kuwait',
    egypt: 'Egypt',
    other: 'Other',
  },
  ar: {
    title: 'أكمل حجزك',
    home: 'الرئيسية',
    hotels: 'الفنادق',
    booking: 'الحجز',
    step1: 'بيانات الضيف',
    step1Desc: 'معلوماتك الشخصية',
    step2: 'الدفع',
    step2Desc: 'دفع آمن',
    step3: 'مراجعة وتأكيد',
    step3Desc: 'تحقق من حجزك',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    nationality: 'الجنسية',
    specialRequests: 'طلبات خاصة',
    specialRequestsPlaceholder: 'مثلاً: تسجيل وصول مبكر، طابق علوي، مصحف في الغرفة...',
    arrivalTime: 'وقت الوصول المتوقع',
    next: 'متابعة',
    back: 'رجوع',
    cardNumber: 'رقم البطاقة',
    cardHolder: 'اسم حامل البطاقة',
    expiry: 'تاريخ الانتهاء',
    cvv: 'CVV',
    payAtHotel: 'الدفع في الفندق',
    payAtHotelDesc: 'يمكنك الدفع عند الوصول. لا يزال يلزم تقديم بطاقة ائتمان صالحة كضمان.',
    payOnline: 'الدفع عبر الإنترنت',
    payOnlineDesc: 'دفع آمن يتم معالجته فوراً.',
    bookingSummary: 'ملخص الحجز',
    hotel: 'فندق اللؤلؤة الكبير',
    hotelAr: 'Pearl Grand Hotel',
    roomType: 'غرفة ديلوكس',
    roomTypeAr: 'Deluxe Room',
    checkIn: 'تسجيل الوصول',
    checkOut: 'تسجيل المغادرة',
    nights: 'ليالٍ',
    roomRate: 'سعر الغرفة',
    tourismFee: 'رسوم الدرهم السياحي',
    serviceCharge: 'رسوم الخدمة (١٠٪)',
    vat: 'ضريبة القيمة المضافة (٥٪)',
    total: 'الإجمالي',
    aed: 'د.إ',
    perNight: '/ ليلة',
    agreeTerms: 'أوافق على شروط الحجز وسياسة الإلغاء',
    freeCancellation: 'إلغاء مجاني حتى ٤٨ ساعة قبل تسجيل الوصول',
    confirmBooking: 'تأكيد الحجز',
    reviewDetails: 'راجع تفاصيل حجزك قبل التأكيد.',
    guestDetails: 'بيانات الضيف',
    paymentMethod: 'طريقة الدفع',
    creditCard: 'بطاقة ائتمان تنتهي بـ',
    confirmed: 'تم تأكيد الحجز!',
    confirmedDesc: 'تم تأكيد حجزك. تم إرسال رسالة تأكيد بالبريد الإلكتروني.',
    bookingRef: 'رقم الحجز',
    viewReservations: 'عرض حجوزاتي',
    bookAnother: 'حجز فندق آخر',
    secure: 'دفعك مؤمّن بتشفير SSL',
    uae: 'الإمارات',
    saudiArabia: 'السعودية',
    qatar: 'قطر',
    oman: 'عُمان',
    bahrain: 'البحرين',
    kuwait: 'الكويت',
    egypt: 'مصر',
    other: 'أخرى',
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BookingPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]
  const Arrow = isRTL ? ArrowLeft : ArrowRight
  const BackArrow = isRTL ? ArrowRight : ArrowLeft

  const [currentStep, setCurrentStep] = React.useState(0)
  const [paymentMethod, setPaymentMethod] = React.useState<'online' | 'hotel'>('online')
  const [agreed, setAgreed] = React.useState(false)
  const [confirmed, setConfirmed] = React.useState(false)

  const steps = [
    { id: 'guest', title: h.step1, titleAr: h.step1, description: h.step1Desc, descriptionAr: h.step1Desc },
    { id: 'payment', title: h.step2, titleAr: h.step2, description: h.step2Desc, descriptionAr: h.step2Desc },
    { id: 'review', title: h.step3, titleAr: h.step3, description: h.step3Desc, descriptionAr: h.step3Desc },
  ]

  // Price breakdown
  const nightlyRate = 1000
  const numNights = 3
  const roomTotal = nightlyRate * numNights
  const tourismFee = 20 * numNights
  const serviceCharge = Math.round(roomTotal * 0.1)
  const subtotalBeforeVat = roomTotal + tourismFee + serviceCharge
  const vat = Math.round(subtotalBeforeVat * 0.05)
  const total = subtotalBeforeVat + vat

  if (confirmed) {
    return (
      <div className="container py-12">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-success/10 rounded-full">
            <Confetti className="h-12 w-12 text-success" weight="duotone" />
          </div>
          <h1 className="text-2xl font-bold">{h.confirmed}</h1>
          <p className="text-muted-foreground">{h.confirmedDesc}</p>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.bookingRef}</span>
                <span className="font-mono font-bold" dir="ltr">NZL-2026-04782</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.hotels}</span>
                <span className="font-medium">{h.hotel}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{isRTL ? 'الغرفة' : 'Room'}</span>
                <span className="font-medium">{h.roomType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.checkIn}</span>
                <span className="font-medium" dir="ltr">Mar 20, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.checkOut}</span>
                <span className="font-medium" dir="ltr">Mar 23, 2026</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>{h.total}</span>
                <span><ArabicNumber value={total} /> {h.aed}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/examples/hotel/reservations">
              <Button size="lg">
                {h.viewReservations}
              </Button>
            </Link>
            <Link href="/examples/hotel/search">
              <Button variant="outline" size="lg">
                {h.bookAnother}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
            <BreadcrumbPage>{h.booking}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-6">{h.title}</h1>

      {/* Stepper */}
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={(step) => { if (step <= currentStep) setCurrentStep(step) }}
        className="mb-8"
      />

      <div className="flex flex-col-reverse lg:flex-row gap-6">
        {/* Form area */}
        <div className="flex-1">
          {/* Step 1: Guest Details */}
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {h.step1}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{h.firstName}</Label>
                    <Input id="firstName" defaultValue={isRTL ? 'فايزة' : 'Faysa'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{h.lastName}</Label>
                    <Input id="lastName" defaultValue={isRTL ? 'المنصوري' : 'Al Mansouri'} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{h.email}</Label>
                    <Input id="email" type="email" dir="ltr" defaultValue="faysa@nuzul.demo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{h.phone}</Label>
                    <Input id="phone" type="tel" dir="ltr" defaultValue="+971 50 123 4567" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nationality">{h.nationality}</Label>
                    <Select defaultValue="uae">
                      <SelectTrigger id="nationality">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uae">{h.uae}</SelectItem>
                        <SelectItem value="sa">{h.saudiArabia}</SelectItem>
                        <SelectItem value="qa">{h.qatar}</SelectItem>
                        <SelectItem value="om">{h.oman}</SelectItem>
                        <SelectItem value="bh">{h.bahrain}</SelectItem>
                        <SelectItem value="kw">{h.kuwait}</SelectItem>
                        <SelectItem value="eg">{h.egypt}</SelectItem>
                        <SelectItem value="other">{h.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrival">{h.arrivalTime}</Label>
                    <Select defaultValue="15-16">
                      <SelectTrigger id="arrival">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15-16">3:00 PM - 4:00 PM</SelectItem>
                        <SelectItem value="16-17">4:00 PM - 5:00 PM</SelectItem>
                        <SelectItem value="17-18">5:00 PM - 6:00 PM</SelectItem>
                        <SelectItem value="18-20">6:00 PM - 8:00 PM</SelectItem>
                        <SelectItem value="20-00">8:00 PM - 12:00 AM</SelectItem>
                        <SelectItem value="00-03">12:00 AM - 3:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requests">{h.specialRequests}</Label>
                  <textarea
                    id="requests"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={h.specialRequestsPlaceholder}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button onClick={() => setCurrentStep(1)}>
                    {h.next}
                    <Arrow className="h-4 w-4 ms-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {h.step2}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment method choice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label={h.paymentMethod}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={paymentMethod === 'online'}
                    onClick={() => setPaymentMethod('online')}
                    className={cn(
                      'p-4 rounded-lg border-2 text-start transition-colors cursor-pointer',
                      paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
                    )}
                  >
                    <div className="flex items-center gap-2 font-medium mb-1">
                      <CreditCard className="h-4 w-4" aria-hidden="true" />
                      {h.payOnline}
                    </div>
                    <p className="text-xs text-muted-foreground">{h.payOnlineDesc}</p>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={paymentMethod === 'hotel'}
                    onClick={() => setPaymentMethod('hotel')}
                    className={cn(
                      'p-4 rounded-lg border-2 text-start transition-colors cursor-pointer',
                      paymentMethod === 'hotel' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
                    )}
                  >
                    <div className="flex items-center gap-2 font-medium mb-1">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {h.payAtHotel}
                    </div>
                    <p className="text-xs text-muted-foreground">{h.payAtHotelDesc}</p>
                  </button>
                </div>

                {/* Card form */}
                {paymentMethod === 'online' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">{h.cardNumber}</Label>
                      <Input id="cardNumber" dir="ltr" placeholder="4532 •••• •••• ••••" defaultValue="4532 1234 5678 9012" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardHolder">{h.cardHolder}</Label>
                      <Input id="cardHolder" dir="ltr" defaultValue="FAYSA AL MANSOURI" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">{h.expiry}</Label>
                        <Input id="expiry" dir="ltr" placeholder="MM/YY" defaultValue="09/28" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">{h.cvv}</Label>
                        <Input id="cvv" dir="ltr" type="password" placeholder="•••" defaultValue="123" />
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  {h.secure}
                </p>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setCurrentStep(0)}>
                    <BackArrow className="h-4 w-4 me-1.5" />
                    {h.back}
                  </Button>
                  <Button onClick={() => setCurrentStep(2)}>
                    {h.next}
                    <Arrow className="h-4 w-4 ms-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Confirm */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {h.step3}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{h.reviewDetails}</p>

                {/* Guest summary */}
                <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm">{h.guestDetails}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">{h.firstName}</span>
                    <span>{isRTL ? 'فايزة' : 'Faysa'}</span>
                    <span className="text-muted-foreground">{h.lastName}</span>
                    <span>{isRTL ? 'المنصوري' : 'Al Mansouri'}</span>
                    <span className="text-muted-foreground">{h.email}</span>
                    <span dir="ltr">faysa@nuzul.demo</span>
                    <span className="text-muted-foreground">{h.phone}</span>
                    <span dir="ltr">+971 50 123 4567</span>
                  </div>
                </div>

                {/* Payment summary */}
                <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm">{h.paymentMethod}</h4>
                  <p className="text-sm">
                    {paymentMethod === 'online'
                      ? `${h.creditCard} 9012`
                      : h.payAtHotel}
                  </p>
                </div>

                {/* Cancellation */}
                <Callout type="success" title={h.freeCancellation}>
                  <p className="text-xs">
                    {isRTL
                      ? 'يمكنك الإلغاء مجاناً حتى ١٨ مارس ٢٠٢٦'
                      : 'You can cancel for free until March 18, 2026'}
                  </p>
                </Callout>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                    {h.agreeTerms}
                  </Label>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <BackArrow className="h-4 w-4 me-1.5" />
                    {h.back}
                  </Button>
                  <Button
                    disabled={!agreed}
                    onClick={() => setConfirmed(true)}
                    size="lg"
                  >
                    <Check className="h-4 w-4 me-1.5" />
                    {h.confirmBooking}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:w-80 shrink-0">
          <Card className="lg:sticky lg:top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{h.bookingSummary}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hotel preview */}
              <div className="flex gap-3">
                <div className="relative w-20 h-16 rounded-md overflow-hidden shrink-0">
                  <Image
                    src="/examples/hotel/hotel-1.jpg"
                    alt={h.hotel}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{h.hotel}</h4>
                  <p className="text-xs text-muted-foreground">{h.roomType}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-warning fill-warning" weight="fill" />
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Dates */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarBlank className="h-3.5 w-3.5" />
                    {h.checkIn}
                  </span>
                  <span className="font-medium" dir="ltr">Mar 20, 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarBlank className="h-3.5 w-3.5" />
                    {h.checkOut}
                  </span>
                  <span className="font-medium" dir="ltr">Mar 23, 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Moon className="h-3.5 w-3.5" />
                    <ArabicNumber value={numNights} /> {h.nights}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {h.roomRate} (<ArabicNumber value={numNights} /> {h.nights})
                  </span>
                  <span><ArabicNumber value={roomTotal} /> {h.aed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{h.tourismFee}</span>
                  <span><ArabicNumber value={tourismFee} /> {h.aed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{h.serviceCharge}</span>
                  <span><ArabicNumber value={serviceCharge} /> {h.aed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{h.vat}</span>
                  <span><ArabicNumber value={vat} /> {h.aed}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>{h.total}</span>
                  <span className="text-primary"><ArabicNumber value={total} /> {h.aed}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
