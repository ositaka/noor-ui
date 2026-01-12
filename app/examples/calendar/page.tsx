'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
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
  const t = content[locale]
  const isRTL = direction === 'rtl'

  // State for various date selections
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [appointmentDate, setAppointmentDate] = React.useState<Date | undefined>()
  const [eventDateRange, setEventDateRange] = React.useState<DateRange | undefined>()
  const [vacationRange, setVacationRange] = React.useState<DateRange | undefined>()

  // Format dates for display
  const formatDate = (date: Date | undefined): string => {
    if (!date) return t.calendarPage.labels.notSelected
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      dateStyle: 'long',
    }).format(date)
  }

  const formatDateRange = (range: DateRange | undefined): string => {
    if (!range?.from) return t.calendarPage.labels.notSelected
    if (!range.to) return formatDate(range.from)
    return `${formatDate(range.from)} ${t.calendarPage.labels.to} ${formatDate(range.to)}`
  }

  // Sample events
  const upcomingEvents = [
    {
      title: t.calendarPage.events.teamMeeting,
      date: new Date(2025, 10, 15),
      type: 'work',
    },
    {
      title: t.calendarPage.events.doctorAppointment,
      date: new Date(2025, 10, 18),
      type: 'personal',
    },
    {
      title: t.calendarPage.events.presentation,
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
                {t.ui.components.noorUI}
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
              <Link href="/examples">{t.nav.examples}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <nav aria-label="Breadcrumb">
            <div className="flex items-center justify-between gap-4">
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
                <li className="text-foreground font-medium">
                  {t.calendarPage.title}
                </li>
              </ol>
              <DirectionToggle />
            </div>
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
                {t.calendarPage.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="default">{t.calendarPage.badges.ready}</Badge>
                <Badge variant="outline">{t.calendarPage.badges.gcc}</Badge>
                <Badge variant="outline">{t.calendarPage.badges.hijri}</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.calendarPage.description}
          </p>
        </div>

        {/* Hijri Calendar with Islamic Holidays */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Hijri Calendar with Islamic Holidays</CardTitle>
                <CardDescription>
                  Calendar displaying both Gregorian and Hijri dates with automatic Islamic holiday highlighting
                </CardDescription>
              </div>
              <Badge variant="default">
                New Feature
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date && !(date instanceof Date)) return
                  setSelectedDate(date)
                }}
                showHijri={true}
                showIslamicHolidays={true}
                className="rounded-md border"
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Calendar Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* Calendar Selection */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t.calendarPage.sections.dateSelection}</CardTitle>
              <CardDescription>
                {t.calendarPage.sections.dateSelectionDesc}
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
                        {t.calendarPage.sections.selectedDateGregorian}
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
              <CardTitle>{t.calendarPage.sections.upcomingEvents}</CardTitle>
              <CardDescription>
                {t.calendarPage.sections.scheduledEvents}
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
                        {event.type === 'work' ? t.calendarPage.events.work : t.calendarPage.events.personal}
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
              <CardTitle>{t.calendarPage.sections.singleDatePicker}</CardTitle>
              <CardDescription>
                {t.calendarPage.sections.singleDatePickerDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.calendarPage.labels.medicalAppointment}</Label>
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
                        {t.calendarPage.labels.appointmentScheduled}
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
              <CardTitle>{t.calendarPage.sections.dateRangePicker}</CardTitle>
              <CardDescription>
                {t.calendarPage.sections.dateRangePickerDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.calendarPage.labels.vacationPeriod}</Label>
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
                        {t.calendarPage.labels.vacationScheduled}
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
                          {t.calendarPage.labels.days}
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
            <CardTitle>{t.calendarPage.sections.useCases}</CardTitle>
            <CardDescription>
              {t.calendarPage.sections.useCasesDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appointments">
                  {t.calendarPage.tabs.appointments}
                </TabsTrigger>
                <TabsTrigger value="events">
                  {t.calendarPage.tabs.events}
                </TabsTrigger>
                <TabsTrigger value="bookings">
                  {t.calendarPage.tabs.bookings}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appointments" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold">{t.calendarPage.appointments.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t.calendarPage.appointments.description}
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
                      {t.calendarPage.appointments.features}
                    </h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{t.calendarPage.appointments.disabledDates}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{t.calendarPage.appointments.minMaxDates}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{t.calendarPage.appointments.hijriIntegration}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold">{t.calendarPage.eventsTab.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t.calendarPage.eventsTab.description}
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
                      {t.calendarPage.eventsTab.useCases}
                    </h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                        <span>{t.calendarPage.eventsTab.conferenceBookings}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                        <span>{t.calendarPage.eventsTab.courseEnrollment}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                        <span>{t.calendarPage.eventsTab.eventTicketing}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold">{t.calendarPage.bookings.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t.calendarPage.bookings.description}
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
                      {t.calendarPage.bookings.industries}
                    </h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                        <span>{t.calendarPage.bookings.hospitality}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                        <span>{t.calendarPage.bookings.carRentals}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                        <span>{t.calendarPage.bookings.propertyBookings}</span>
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
            <CardTitle>{t.calendarPage.sections.componentsUsed}</CardTitle>
            <CardDescription>
              {t.calendarPage.sections.componentsUsedDesc}
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
                      {t.calendarPage.components.view}
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
                      {t.calendarPage.components.view}
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
                      {t.calendarPage.components.view}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/components">
                <Card className="hover:border-primary/50 cursor-pointer transition-colors bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      {t.calendarPage.components.allComponents}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className="text-xs">{t.calendarPage.components.viewAll}</Badge>
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
