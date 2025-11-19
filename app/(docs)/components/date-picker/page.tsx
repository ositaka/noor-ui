'use client'

import * as React from 'react'
import Link from 'next/link'
import { DatePicker, DateRangePicker, type DateRange } from '@/components/ui/date-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Label } from '@/components/ui/label'

const datePickerProps: PropDefinition[] = [
  {
    name: 'date',
    type: 'Date',
    required: false,
    description: 'Controlled selected date',
  },
  {
    name: 'onDateChange',
    type: '(date: Date | undefined) => void',
    required: false,
    description: 'Callback when date changes',
  },
  {
    name: 'placeholder',
    type: 'string',
    required: false,
    description: 'Placeholder text in English',
  },
  {
    name: 'placeholderAr',
    type: 'string',
    required: false,
    description: 'Placeholder text in Arabic',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disable the picker',
  },
  {
    name: 'formatDate',
    type: '(date: Date | undefined, locale: "en" | "ar") => string',
    required: false,
    description: 'Custom date formatter',
  },
  {
    name: 'minDate',
    type: 'Date',
    required: false,
    description: 'Minimum selectable date',
  },
  {
    name: 'maxDate',
    type: 'Date',
    required: false,
    description: 'Maximum selectable date',
  },
  {
    name: 'disabledDates',
    type: 'Date[]',
    default: '[]',
    required: false,
    description: 'Array of dates to disable',
  },
  {
    name: 'showHijri',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show Hijri date alongside Gregorian',
  },
]

const dateRangePickerProps: PropDefinition[] = [
  {
    name: 'dateRange',
    type: 'DateRange',
    required: false,
    description: 'Controlled date range ({ from: Date, to: Date })',
  },
  {
    name: 'onDateRangeChange',
    type: '(range: DateRange | undefined) => void',
    required: false,
    description: 'Callback when range changes',
  },
  {
    name: 'placeholder',
    type: 'string',
    required: false,
    description: 'Placeholder text in English',
  },
  {
    name: 'placeholderAr',
    type: 'string',
    required: false,
    description: 'Placeholder text in Arabic',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disable the picker',
  },
  {
    name: 'formatDateRange',
    type: '(range: DateRange | undefined, locale: "en" | "ar") => string',
    required: false,
    description: 'Custom range formatter',
  },
  {
    name: 'minDate',
    type: 'Date',
    required: false,
    description: 'Minimum selectable date',
  },
  {
    name: 'maxDate',
    type: 'Date',
    required: false,
    description: 'Maximum selectable date',
  },
  {
    name: 'disabledDates',
    type: 'Date[]',
    default: '[]',
    required: false,
    description: 'Array of dates to disable',
  },
]

const basicCode = `import { DatePicker } from '@/components/ui/date-picker'

const [date, setDate] = useState<Date | undefined>(new Date())

<DatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Pick a date"
  placeholderAr="اختر تاريخ"
/>`

const rangeCode = `import { DateRangePicker, type DateRange } from '@/components/ui/date-picker'

const [dateRange, setDateRange] = useState<DateRange | undefined>({
  from: new Date(),
  to: addDays(new Date(), 7)
})

<DateRangePicker
  dateRange={dateRange}
  onDateRangeChange={setDateRange}
  placeholder="Pick a date range"
  placeholderAr="اختر نطاق التاريخ"
/>`

const constraintsCode = `const today = new Date()
const nextMonth = addMonths(today, 1)

<DatePicker
  date={date}
  onDateChange={setDate}
  minDate={today}
  maxDate={nextMonth}
/>`

const disabledCode = `const disabledDates = [
  new Date(2024, 0, 1), // New Year
  new Date(2024, 11, 25), // Christmas
]

<DatePicker
  date={date}
  onDateChange={setDate}
  disabledDates={disabledDates}
/>`

const typeDefinition = `interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  placeholderAr?: string
  disabled?: boolean
  formatDate?: (date: Date | undefined, locale: 'en' | 'ar') => string
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  showHijri?: boolean
}`

export default function DatePickerPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]

  const [date1, setDate1] = React.useState<Date | undefined>(new Date())
  const [date2, setDate2] = React.useState<Date | undefined>(undefined)
  const [date3, setDate3] = React.useState<Date | undefined>(new Date())
  const [dateRange1, setDateRange1] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })
  const [dateRange2, setDateRange2] = React.useState<DateRange | undefined>(undefined)

  const today = new Date()
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())

  // Disabled dates (weekends for demo)
  const disabledDates = React.useMemo(() => {
    const dates: Date[] = []
    const start = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      if (date.getDay() === 0 || date.getDay() === 6) {
        dates.push(date)
      }
    }
    return dates
  }, [])

  const formatDate = (date: Date | undefined): string => {
    if (!date) return t.datePickerComponent.descriptions.noDateSelected
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const formatDateRange = (range: DateRange | undefined): string => {
    if (!range?.from) return t.datePickerComponent.descriptions.noRangeSelected
    if (!range.to) return formatDate(range.from)
    return `${formatDate(range.from)} ${isRTL ? '–' : '-'} ${formatDate(range.to)}`
  }

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.datePickerComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t.datePickerComponent.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {t.datePickerComponent.description}
        </p>
      </div>

      {/* Basic Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.datePickerComponent.usage}
        </h2>
        <ComponentShowcase code={basicCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{t.datePickerComponent.labels.dateOfBirth}</Label>
              <DatePicker
                date={date1}
                onDateChange={setDate1}
                placeholder="Pick a date"
                placeholderAr="اختر تاريخ"
              />
              <p className="text-sm text-muted-foreground">{formatDate(date1)}</p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Date Range */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.datePickerComponent.examples.dateRange}
        </h2>
        <ComponentShowcase code={rangeCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-md mx-auto space-y-2">
              <Label>{t.datePickerComponent.labels.bookingPeriod}</Label>
              <DateRangePicker
                dateRange={dateRange1}
                onDateRangeChange={setDateRange1}
                placeholder="Pick a date range"
                placeholderAr="اختر نطاق التاريخ"
              />
              <p className="text-sm text-muted-foreground">{formatDateRange(dateRange1)}</p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* With Constraints */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.datePickerComponent.examples.withConstraints}
        </h2>
        <ComponentShowcase code={constraintsCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{t.datePickerComponent.labels.appointmentDate}</Label>
              <DatePicker
                date={date2}
                onDateChange={setDate2}
                minDate={today}
                maxDate={nextMonth}
                placeholder="Select within next month"
                placeholderAr="اختر خلال الشهر القادم"
              />
              <p className="text-xs text-muted-foreground">
                {t.datePickerComponentPage.availableFromTo
                  .replace('{from}', formatDate(today))
                  .replace('{to}', formatDate(nextMonth))}
              </p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Disabled Dates */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.datePickerComponent.examples.disabledDates}
        </h2>
        <ComponentShowcase code={disabledCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{t.datePickerComponent.labels.workingDay}</Label>
              <DatePicker
                date={date3}
                onDateChange={setDate3}
                disabledDates={disabledDates}
                placeholder="Select a weekday"
                placeholderAr="اختر يوم عمل"
              />
              <p className="text-xs text-muted-foreground">
                {t.datePickerComponent.descriptions.weekendsDisabled}
              </p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Real-World Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.datePickerComponent.examples.realWorld}
        </h2>
        <ComponentShowcase code={`const [dateRange, setDateRange] = useState<DateRange>()
const today = new Date()
const nights = dateRange?.from && dateRange?.to
  ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
  : 0

<Card>
  <CardHeader>
    <CardTitle>Hotel Room Booking</CardTitle>
    <CardDescription>Select check-in and check-out dates</CardDescription>
  </CardHeader>
  <CardContent className="space-y-6">
    <DateRangePicker
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      minDate={today}
      placeholder="Select dates"
    />
    {dateRange?.from && dateRange?.to && (
      <div className="space-y-2">
        <div>Nights: {nights}</div>
        <div>Total: \${nights * 150}</div>
      </div>
    )}
  </CardContent>
</Card>`}>
          <ComponentShowcase.Demo>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>{t.datePickerComponent.realWorldExample.hotelBooking}</CardTitle>
                <CardDescription>
                  {t.datePickerComponent.realWorldExample.selectDates}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{t.datePickerComponent.labels.stayPeriod}</Label>
                  <DateRangePicker
                    dateRange={dateRange2}
                    onDateRangeChange={setDateRange2}
                    minDate={today}
                    placeholder="Select dates"
                    placeholderAr="اختر التواريخ"
                  />
                </div>

                {dateRange2?.from && dateRange2?.to && (
                  <>
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        {t.datePickerComponent.realWorldExample.nights}:
                      </span>
                      <span className="font-semibold">
                        {Math.ceil((dateRange2.to.getTime() - dateRange2.from.getTime()) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {t.datePickerComponent.realWorldExample.pricePerNight}:
                      </span>
                      <span className="font-semibold">
                        {locale === 'ar' ? '٣٥٠ ر.س' : '$150'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        {t.datePickerComponent.realWorldExample.total}:
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {t.datePickerComponent.realWorldExample.totalAmount
                          .replace('{amount}', (Math.ceil((dateRange2.to.getTime() - dateRange2.from.getTime()) / (1000 * 60 * 60 * 24)) * (locale === 'ar' ? 350 : 150)).toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US'))}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.useCases}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: t.datePickerComponent.useCases.bookingForms, icon: '🏨' },
            { title: t.datePickerComponent.useCases.appointments, icon: '📅' },
            { title: t.datePickerComponent.useCases.dateFilters, icon: '🔍' },
            { title: t.datePickerComponent.useCases.dateOfBirth, icon: '🎂' },
          ].map((useCase, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{useCase.icon}</span>
                  {useCase.title}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Type Definition */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.typeDefinitions}</h2>
        <CodeBlock code={typeDefinition} language="typescript" />
      </div>

      {/* API Reference - DatePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.datePickerComponentPage.apiReferenceDatePicker}</h2>
        <PropsTable props={datePickerProps} />
      </div>

      {/* API Reference - DateRangePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.datePickerComponentPage.apiReferenceDateRangePicker}</h2>
        <PropsTable props={dateRangePickerProps} />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.features}</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>{t.datePickerComponent.features.singleAndRange}</li>
          <li>{t.datePickerComponent.features.calendarIntegration}</li>
          <li>{t.datePickerComponent.features.minMaxConstraints}</li>
          <li>{t.datePickerComponent.features.customDisabled}</li>
          <li>{t.datePickerComponent.features.customFormatting}</li>
          <li>{t.datePickerComponent.features.hijriSupport}</li>
          <li>{t.datePickerComponent.features.bilingualSupport}</li>
          <li>{t.datePickerComponent.features.rtlSupport}</li>
          <li>{t.datePickerComponent.features.fullAccessibility}</li>
          <li>{t.datePickerComponent.features.quickSelection}</li>
        </ul>
      </div>
      </main>
    </div>
  )
}
