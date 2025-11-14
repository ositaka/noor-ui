'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DatePicker, DateRangePicker, type DateRange } from '@/components/ui/date-picker'
import { HijriDate } from '@/components/ui/hijri-date'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  CheckCircle2,
  Home,
} from 'lucide-react'

export default function CalendarExamplePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'

  // State for various date selections
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [appointmentDate, setAppointmentDate] = React.useState<Date | undefined>()
  const [eventDateRange, setEventDateRange] = React.useState<DateRange | undefined>()
  const [vacationRange, setVacationRange] = React.useState<DateRange | undefined>()

  // Format dates for display
  const formatDate = (date: Date | undefined): string => {
    if (!date) return isRTL ? 'لم يتم التحديد' : 'Not selected'
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      dateStyle: 'long',
    }).format(date)
  }

  const formatDateRange = (range: DateRange | undefined): string => {
    if (!range?.from) return isRTL ? 'لم يتم التحديد' : 'Not selected'
    if (!range.to) return formatDate(range.from)
    return `${formatDate(range.from)} ${isRTL ? 'إلى' : 'to'} ${formatDate(range.to)}`
  }

  // Sample events
  const upcomingEvents = [
    {
      title: isRTL ? 'اجتماع الفريق' : 'Team Meeting',
      date: new Date(2025, 10, 15),
      type: 'work',
    },
    {
      title: isRTL ? 'موعد طبي' : 'Doctor Appointment',
      date: new Date(2025, 10, 18),
      type: 'personal',
    },
    {
      title: isRTL ? 'عرض تقديمي' : 'Presentation',
      date: new Date(2025, 10, 22),
      type: 'work',
    },
  ]

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
                {isRTL ? 'نور UI' : 'Noor UI'}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <HijriDate
              gregorianDate="Nov 11, 2025"
              gregorianDateAr="١١ نوفمبر ٢٠٢٥"
              hijriDate="10 Jumada I, 1447"
              hijriDateAr="١٠ جمادى الأولى ١٤٤٧"
              variant="badge"
              showIcon
            />

            <Button variant="outline" size="sm" asChild>
              <Link href="/examples">{isRTL ? 'الأمثلة' : 'Examples'}</Link>
            </Button>
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
                {isRTL ? 'التقويم ومنتقي التاريخ' : 'Calendar & Date Picker'}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {isRTL ? 'التقويم ومنتقي التاريخ' : 'Calendar & Date Picker'}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="default">{isRTL ? 'جاهز' : 'Ready'}</Badge>
                <Badge variant="outline">GCC</Badge>
                <Badge variant="outline">Hijri</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {isRTL
              ? 'واجهة تقويم شاملة مع دعم التقويم الهجري لأسواق مجلس التعاون الخليجي. تتضمن اختيار التاريخ الواحد، نطاقات التاريخ، والتكامل مع التواريخ الهجرية.'
              : 'Comprehensive calendar interface with Hijri calendar support for GCC markets. Includes single date selection, date ranges, and integration with Hijri dates.'}
          </p>
        </div>

        {/* Main Calendar Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* Calendar Selection */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{isRTL ? 'تحديد التاريخ' : 'Date Selection'}</CardTitle>
              <CardDescription>
                {isRTL
                  ? 'حدد تاريخاً باستخدام التقويم التفاعلي'
                  : 'Select a date using the interactive calendar'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    // For single mode, only accept Date type
                    if (date && !(date instanceof Date)) return
                    setSelectedDate(date)
                  }}
                  className="rounded-md border"
                />
              </div>

              {selectedDate && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {isRTL ? 'التاريخ المحدد (ميلادي)' : 'Selected Date (Gregorian)'}
                      </p>
                      <p className="font-medium">{formatDate(selectedDate)}</p>
                    </div>
                  </div>

                  <HijriDate
                    gregorianDate={formatDate(selectedDate)}
                    gregorianDateAr={formatDate(selectedDate)}
                    hijriDate="10 Jumada I, 1447"
                    hijriDateAr="١٠ جمادى الأولى ١٤٤٧"
                    variant="default"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'الأحداث القادمة' : 'Upcoming Events'}</CardTitle>
              <CardDescription>
                {isRTL ? 'المواعيد والأحداث المجدولة' : 'Scheduled appointments and events'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50"
                  >
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(event.date)}
                      </p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {event.type === 'work'
                          ? isRTL
                            ? 'عمل'
                            : 'Work'
                          : isRTL
                          ? 'شخصي'
                          : 'Personal'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Date Pickers Section */}
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          {/* Single Date Picker */}
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'منتقي التاريخ الواحد' : 'Single Date Picker'}</CardTitle>
              <CardDescription>
                {isRTL ? 'حدد موعداً أو تاريخاً واحداً' : 'Select an appointment or single date'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{isRTL ? 'موعد طبي' : 'Medical Appointment'}</Label>
                <DatePicker
                  date={appointmentDate}
                  onDateChange={setAppointmentDate}
                  placeholder="Select date"
                  placeholderAr="اختر التاريخ"
                />
              </div>

              {appointmentDate && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">
                        {isRTL ? 'تم تحديد الموعد' : 'Appointment Scheduled'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(appointmentDate)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Date Range Picker */}
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'منتقي نطاق التاريخ' : 'Date Range Picker'}</CardTitle>
              <CardDescription>
                {isRTL ? 'حدد نطاق تاريخ للأحداث أو الإجازات' : 'Select a date range for events or vacations'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{isRTL ? 'فترة الإجازة' : 'Vacation Period'}</Label>
                <DateRangePicker
                  dateRange={vacationRange}
                  onDateRangeChange={setVacationRange}
                  placeholder="Select date range"
                  placeholderAr="اختر نطاق التاريخ"
                />
              </div>

              {vacationRange?.from && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {isRTL ? 'الإجازة المجدولة' : 'Vacation Scheduled'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDateRange(vacationRange)}
                      </p>
                      {vacationRange?.to && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {Math.ceil(
                            (vacationRange.to.getTime() - vacationRange.from.getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          {isRTL ? 'أيام' : 'days'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Use Cases */}
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'حالات الاستخدام' : 'Use Cases'}</CardTitle>
            <CardDescription>
              {isRTL
                ? 'أمثلة على كيفية استخدام التقويم ومنتقيات التاريخ في التطبيقات الواقعية'
                : 'Examples of how to use calendar and date pickers in real-world applications'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appointments">
                  {isRTL ? 'المواعيد' : 'Appointments'}
                </TabsTrigger>
                <TabsTrigger value="events">
                  {isRTL ? 'الأحداث' : 'Events'}
                </TabsTrigger>
                <TabsTrigger value="bookings">
                  {isRTL ? 'الحجوزات' : 'Bookings'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appointments" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold">{isRTL ? 'حجز موعد' : 'Book Appointment'}</h4>
                    <p className="text-sm text-muted-foreground">
                      {isRTL
                        ? 'السماح للمستخدمين بتحديد مواعيد للخدمات الطبية أو الاستشارات'
                        : 'Allow users to select appointments for medical services or consultations'}
                    </p>
                    <DatePicker
                      date={appointmentDate}
                      onDateChange={setAppointmentDate}
                      placeholder="Select appointment date"
                      placeholderAr="اختر تاريخ الموعد"
                    />
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-medium text-sm mb-3">
                      {isRTL ? 'الميزات' : 'Features'}
                    </h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{isRTL ? 'تحديد تواريخ معطلة' : 'Disabled date selection'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{isRTL ? 'الحد الأدنى/الأقصى للتاريخ' : 'Min/max date constraints'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{isRTL ? 'تكامل التقويم الهجري' : 'Hijri calendar integration'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold">{isRTL ? 'نطاق الحدث' : 'Event Range'}</h4>
                    <p className="text-sm text-muted-foreground">
                      {isRTL
                        ? 'حدد فترة للمؤتمرات أو الأحداث أو الدورات'
                        : 'Select a period for conferences, events, or courses'}
                    </p>
                    <DateRangePicker
                      dateRange={eventDateRange}
                      onDateRangeChange={setEventDateRange}
                      placeholder="Select event period"
                      placeholderAr="اختر فترة الحدث"
                    />
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-medium text-sm mb-3">
                      {isRTL ? 'حالات الاستخدام' : 'Use Cases'}
                    </h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{isRTL ? 'حجوزات المؤتمرات' : 'Conference bookings'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{isRTL ? 'تسجيل الدورات' : 'Course enrollment'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{isRTL ? 'تذاكر الأحداث' : 'Event ticketing'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold">{isRTL ? 'حجز الإقامة' : 'Accommodation Booking'}</h4>
                    <p className="text-sm text-muted-foreground">
                      {isRTL
                        ? 'حدد تواريخ تسجيل الوصول والمغادرة للفنادق والمنتجعات'
                        : 'Select check-in and check-out dates for hotels and resorts'}
                    </p>
                    <DateRangePicker
                      dateRange={vacationRange}
                      onDateRangeChange={setVacationRange}
                      placeholder="Select booking dates"
                      placeholderAr="اختر تواريخ الحجز"
                    />
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-medium text-sm mb-3">
                      {isRTL ? 'الصناعات' : 'Industries'}
                    </h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{isRTL ? 'الضيافة والسياحة' : 'Hospitality & Tourism'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{isRTL ? 'تأجير السيارات' : 'Car rentals'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{isRTL ? 'حجوزات العقارات' : 'Property bookings'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Components Used */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{isRTL ? 'المكونات المستخدمة' : 'Components Used'}</CardTitle>
            <CardDescription>
              {isRTL
                ? 'هذا المثال يستخدم المكونات التالية من مكتبة نور UI'
                : 'This example uses the following components from the Noor UI library'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/components/calendar">
                <Card className="hover:border-primary/50 cursor-pointer transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-xs">
                      {isRTL ? 'عرض' : 'View'}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/components/date-picker">
                <Card className="hover:border-primary/50 cursor-pointer transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Date Picker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-xs">
                      {isRTL ? 'عرض' : 'View'}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/components/hijri-date">
                <Card className="hover:border-primary/50 cursor-pointer transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Hijri Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-xs">
                      {isRTL ? 'عرض' : 'View'}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/components">
                <Card className="hover:border-primary/50 cursor-pointer transition-colors bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      {isRTL ? 'جميع المكونات' : 'All Components'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className="text-xs">{isRTL ? 'عرض الكل' : 'View All'}</Badge>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
