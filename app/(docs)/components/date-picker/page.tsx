'use client'

import * as React from 'react'
import { DatePicker, DateRangePicker, type DateRange } from '@/components/ui/date-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
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
    if (!date) return isRTL ? 'لم يتم اختيار تاريخ' : 'No date selected'
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const formatDateRange = (range: DateRange | undefined): string => {
    if (!range?.from) return isRTL ? 'لم يتم اختيار نطاق' : 'No range selected'
    if (!range.to) return formatDate(range.from)
    return `${formatDate(range.from)} ${isRTL ? '–' : '-'} ${formatDate(range.to)}`
  }

  return (
    <div className="min-h-screen" dir={direction}>
      <main id="main-content" className="container py-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{isRTL ? 'منتقي التاريخ' : 'Date Picker'}</h1>
          <p className="text-xl text-muted-foreground">
            {isRTL
              ? 'اختيار التاريخ والنطاق مع تكامل التقويم'
              : 'Single date and range selection with calendar integration'}
          </p>
        </div>

      {/* Basic Example */}
      <ComponentShowcase
        title={isRTL ? 'الاستخدام الأساسي' : 'Basic Usage'}
        description={isRTL ? 'منتقي تاريخ بسيط مع التقويم' : 'Simple date picker with calendar'}
      >
        <div className="w-full max-w-xs mx-auto space-y-2">
          <Label>{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</Label>
          <DatePicker
            date={date1}
            onDateChange={setDate1}
            placeholder="Pick a date"
            placeholderAr="اختر تاريخ"
          />
          <p className="text-sm text-muted-foreground">{formatDate(date1)}</p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={basicCode} language="tsx" title={isRTL ? 'الكود' : 'Code'} />

      {/* Date Range */}
      <ComponentShowcase
        title={isRTL ? 'نطاق التاريخ' : 'Date Range'}
        description={isRTL ? 'اختيار نطاق من التواريخ' : 'Select a range of dates'}
      >
        <div className="w-full max-w-md mx-auto space-y-2">
          <Label>{isRTL ? 'فترة الحجز' : 'Booking Period'}</Label>
          <DateRangePicker
            dateRange={dateRange1}
            onDateRangeChange={setDateRange1}
            placeholder="Pick a date range"
            placeholderAr="اختر نطاق التاريخ"
          />
          <p className="text-sm text-muted-foreground">{formatDateRange(dateRange1)}</p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={rangeCode} language="tsx" />

      {/* With Constraints */}
      <ComponentShowcase
        title={isRTL ? 'مع القيود' : 'With Constraints'}
        description={isRTL ? 'تحديد الحد الأدنى والأقصى للتاريخ' : 'Minimum and maximum date limits'}
      >
        <div className="w-full max-w-xs mx-auto space-y-2">
          <Label>{isRTL ? 'موعد الاجتماع' : 'Appointment Date'}</Label>
          <DatePicker
            date={date2}
            onDateChange={setDate2}
            minDate={today}
            maxDate={nextMonth}
            placeholder="Select within next month"
            placeholderAr="اختر خلال الشهر القادم"
          />
          <p className="text-xs text-muted-foreground">
            {isRTL
              ? `متاح من ${formatDate(today)} إلى ${formatDate(nextMonth)}`
              : `Available from ${formatDate(today)} to ${formatDate(nextMonth)}`}
          </p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={constraintsCode} language="tsx" />

      {/* Disabled Dates */}
      <ComponentShowcase
        title={isRTL ? 'تواريخ معطلة' : 'Disabled Dates'}
        description={isRTL ? 'منع تحديد تواريخ محددة (عطلات نهاية الأسبوع)' : 'Prevent selecting specific dates (weekends)'}
      >
        <div className="w-full max-w-xs mx-auto space-y-2">
          <Label>{isRTL ? 'يوم العمل' : 'Working Day'}</Label>
          <DatePicker
            date={date3}
            onDateChange={setDate3}
            disabledDates={disabledDates}
            placeholder="Select a weekday"
            placeholderAr="اختر يوم عمل"
          />
          <p className="text-xs text-muted-foreground">
            {isRTL ? 'عطلات نهاية الأسبوع معطلة' : 'Weekends are disabled'}
          </p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={disabledCode} language="tsx" />

      {/* Real-World Example */}
      <ComponentShowcase
        title={isRTL ? 'مثال عملي' : 'Real-World Example'}
        description={isRTL ? 'نموذج حجز فندق' : 'Hotel booking form'}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{isRTL ? 'حجز غرفة فندق' : 'Hotel Room Booking'}</CardTitle>
            <CardDescription>
              {isRTL ? 'اختر تواريخ تسجيل الوصول والمغادرة' : 'Select check-in and check-out dates'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>{isRTL ? 'فترة الإقامة' : 'Stay Period'}</Label>
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
                    {isRTL ? 'عدد الليالي:' : 'Number of nights:'}
                  </span>
                  <span className="font-semibold">
                    {Math.ceil((dateRange2.to.getTime() - dateRange2.from.getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {isRTL ? 'سعر الليلة:' : 'Price per night:'}
                  </span>
                  <span className="font-semibold">
                    {locale === 'ar' ? '٣٥٠ ر.س' : '$150'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    {isRTL ? 'الإجمالي:' : 'Total:'}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {locale === 'ar'
                      ? `${(Math.ceil((dateRange2.to.getTime() - dateRange2.from.getTime()) / (1000 * 60 * 60 * 24)) * 350).toLocaleString('ar-SA')} ر.س`
                      : `$${(Math.ceil((dateRange2.to.getTime() - dateRange2.from.getTime()) / (1000 * 60 * 60 * 24)) * 150).toLocaleString('en-US')}`}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </ComponentShowcase>

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'حالات الاستخدام' : 'Use Cases'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: isRTL ? 'نماذج الحجز' : 'Booking Forms', icon: '🏨' },
            { title: isRTL ? 'المواعيد' : 'Appointments', icon: '📅' },
            { title: isRTL ? 'مرشحات التاريخ' : 'Date Filters', icon: '🔍' },
            { title: isRTL ? 'إدخال تاريخ الميلاد' : 'Date of Birth Input', icon: '🎂' },
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
        <h2 className="text-2xl font-bold">{isRTL ? 'تعريف النوع' : 'Type Definition'}</h2>
        <CodeBlock code={typeDefinition} language="typescript" />
      </div>

      {/* API Reference - DatePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'مرجع API - DatePicker' : 'API Reference - DatePicker'}</h2>
        <PropsTable props={datePickerProps} />
      </div>

      {/* API Reference - DateRangePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'مرجع API - DateRangePicker' : 'API Reference - DateRangePicker'}</h2>
        <PropsTable props={dateRangePickerProps} />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'الميزات' : 'Features'}</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>{isRTL ? 'تحديد تاريخ واحد ونطاق' : 'Single date and range selection'}</li>
          <li>{isRTL ? 'تكامل التقويم مع popover' : 'Calendar integration with popover'}</li>
          <li>{isRTL ? 'قيود الحد الأدنى/الأقصى' : 'Min/max date constraints'}</li>
          <li>{isRTL ? 'تواريخ معطلة مخصصة' : 'Custom disabled dates'}</li>
          <li>{isRTL ? 'تنسيق قابل للتخصيص' : 'Customizable formatting'}</li>
          <li>{isRTL ? 'دعم التقويم الهجري (قريباً)' : 'Hijri calendar support (coming soon)'}</li>
          <li>{isRTL ? 'دعم ثنائي اللغة' : 'Bilingual support'}</li>
          <li>{isRTL ? 'دعم RTL/LTR' : 'RTL/LTR support'}</li>
          <li>{isRTL ? 'إمكانية الوصول الكاملة' : 'Full accessibility'}</li>
          <li>{isRTL ? 'تحديد سريع للتواريخ' : 'Quick date selection'}</li>
        </ul>
      </div>
      </main>
    </div>
  )
}
