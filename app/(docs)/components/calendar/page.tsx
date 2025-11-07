'use client'

import * as React from 'react'
import Link from 'next/link'
import { Calendar, type DateRange } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles } from 'lucide-react'

const calendarProps: PropDefinition[] = [
  {
    name: 'mode',
    type: "'single' | 'range'",
    default: "'single'",
    required: false,
    description: 'Selection mode: single date or date range',
  },
  {
    name: 'selected',
    type: 'Date',
    default: 'undefined',
    required: false,
    description: 'Selected date (single mode)',
  },
  {
    name: 'selectedRange',
    type: 'DateRange',
    default: 'undefined',
    required: false,
    description: 'Selected date range (range mode): { from: Date | undefined, to: Date | undefined }',
  },
  {
    name: 'onSelect',
    type: '(date: Date | DateRange | undefined) => void',
    default: 'undefined',
    required: false,
    description: 'Callback when date is selected',
  },
  {
    name: 'showHijri',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show Hijri dates below Gregorian dates',
  },
  {
    name: 'events',
    type: 'CalendarEvent[]',
    default: '[]',
    required: false,
    description: 'Array of events to display with color indicators',
  },
  {
    name: 'disabled',
    type: 'Date[] | ((date: Date) => boolean)',
    default: 'undefined',
    required: false,
    description: 'Disabled dates (array or function)',
  },
  {
    name: 'minDate',
    type: 'Date',
    default: 'undefined',
    required: false,
    description: 'Minimum selectable date',
  },
  {
    name: 'maxDate',
    type: 'Date',
    default: 'undefined',
    required: false,
    description: 'Maximum selectable date',
  },
  {
    name: 'locale',
    type: "'en' | 'ar'",
    default: "'en'",
    required: false,
    description: 'Display locale for month names and weekdays',
  },
  {
    name: 'getHijriDate',
    type: '(date: Date) => { hijri: string; hijriDay: string }',
    default: 'undefined',
    required: false,
    description: 'Custom Hijri date provider function',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

export function DatePicker() {
  const [date, setDate] = useState<Date>()

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
}`

const rangeCode = `import { Calendar, type DateRange } from '@/components/ui/calendar'
import { useState } from 'react'

export function DateRangePicker() {
  const [range, setRange] = useState<DateRange>()

  return (
    <Calendar
      mode="range"
      selectedRange={range}
      onSelect={setRange}
    />
  )
}`

const hijriCode = `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  showHijri={true}
  locale="ar"
/>`

const eventsCode = `const events = [
  {
    date: new Date(2025, 10, 15),
    title: 'Team Meeting',
    variant: 'primary' as const,
  },
  {
    date: new Date(2025, 10, 20),
    title: 'Project Deadline',
    variant: 'destructive' as const,
  },
  {
    date: new Date(2025, 10, 25),
    title: 'Holiday',
    variant: 'secondary' as const,
  },
]

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  events={events}
/>`

const disabledCode = `// Disable weekends
const isWeekend = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={isWeekend}
/>

// Or disable specific dates
const disabledDates = [
  new Date(2025, 10, 15),
  new Date(2025, 10, 20),
]

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={disabledDates}
/>`

export default function CalendarPage() {
  const [singleDate, setSingleDate] = React.useState<Date>()
  const [rangeDate, setRangeDate] = React.useState<DateRange>()
  const [hijriDate, setHijriDate] = React.useState<Date>()
  const [eventDate, setEventDate] = React.useState<Date>()

  const sampleEvents = [
    {
      date: new Date(2025, 10, 15),
      title: 'Team Meeting',
      variant: 'primary' as const,
    },
    {
      date: new Date(2025, 10, 20),
      title: 'Project Deadline',
      variant: 'destructive' as const,
    },
    {
      date: new Date(2025, 10, 25),
      title: 'Eid Celebration',
      variant: 'secondary' as const,
    },
  ]

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Calendar</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">Calendar</h1>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              GCC
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            A date picker calendar with Hijri calendar support, event markers, and range selection.
            Perfect for GCC applications requiring dual calendar display.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-md mx-auto">
                <Calendar mode="single" selected={singleDate} onSelect={setSingleDate} />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Basic Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Features</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Dual Calendar</h3>
                <p className="text-sm text-muted-foreground">
                  Show both Gregorian and Hijri dates simultaneously
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Range Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Select single dates or date ranges with visual feedback
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Event Markers</h3>
                <p className="text-sm text-muted-foreground">
                  Display events with color-coded indicators
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Disabled Dates</h3>
                <p className="text-sm text-muted-foreground">
                  Disable specific dates or date ranges
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Navigation</h3>
                <p className="text-sm text-muted-foreground">
                  Previous/next month and quick "Today" button
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Bilingual</h3>
                <p className="text-sm text-muted-foreground">
                  Full English/Arabic support with RTL layout
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-12">
            {/* Range Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Date Range Selection</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Select a start and end date. Click once to set the start, click again to complete the range.
                  </p>
                  <div className="max-w-md mx-auto">
                    <Calendar mode="range" selectedRange={rangeDate} onSelect={setRangeDate} />
                  </div>
                  {rangeDate?.from && (
                    <div className="mt-4 text-sm text-center">
                      <span className="font-medium">Selected: </span>
                      {rangeDate.from.toLocaleDateString()}
                      {rangeDate.to && ` - ${rangeDate.to.toLocaleDateString()}`}
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={rangeCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Hijri Dates */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Hijri Dates</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Display Hijri dates alongside Gregorian dates. Perfect for Islamic calendar awareness.
                  </p>
                  <div className="max-w-md mx-auto">
                    <Calendar
                      mode="single"
                      selected={hijriDate}
                      onSelect={setHijriDate}
                      showHijri={true}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={hijriCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Events */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Event Markers</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Display events with colored indicators. Up to 3 dots shown per day, with a legend below.
                  </p>
                  <div className="max-w-md mx-auto">
                    <Calendar
                      mode="single"
                      selected={eventDate}
                      onSelect={setEventDate}
                      events={sampleEvents}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={eventsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled Dates */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Disabled Dates</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Disable specific dates or use a function to disable date patterns (e.g., weekends).
                  </p>
                  <div className="max-w-md mx-auto">
                    <Calendar
                      mode="single"
                      disabled={(date) => {
                        const day = date.getDay()
                        return day === 0 || day === 6 // Disable weekends
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={calendarProps} />

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">CalendarEvent Type</h3>
              <CodeBlock
                code={`interface CalendarEvent {
  /** Event date */
  date: Date
  /** Event title */
  title: string
  /** Event color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'destructive'
}`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">DateRange Type</h3>
              <CodeBlock
                code={`interface DateRange {
  from: Date | undefined
  to: Date | undefined
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Hijri Integration */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Hijri Calendar Integration</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                The Calendar component includes a simple Hijri date approximation for demonstration.
                For production use with accurate Hijri dates, integrate a dedicated library:
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Using @formkit/hijri</h4>
                  <CodeBlock
                    code={`import { toHijri } from '@formkit/hijri'
import { Calendar } from '@/components/ui/calendar'

const getAccurateHijri = (date: Date) => {
  const hijri = toHijri(date)
  return {
    hijri: \`\${hijri.hy}-\${hijri.hm}-\${hijri.hd}\`,
    hijriDay: String(hijri.hd)
  }
}

<Calendar
  showHijri={true}
  getHijriDate={getAccurateHijri}
/>`}
                    language="tsx"
                  />
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Install the library: <code className="bg-muted px-2 py-1 rounded">npm install @formkit/hijri</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <p className="text-muted-foreground">
                  Calendar dates are keyboard accessible with Tab navigation. Each date button
                  can be activated with Enter or Space.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Focus Management</h3>
                <p className="text-muted-foreground">
                  Clear focus indicators with ring utilities. Today&apos;s date is visually distinguished
                  with a bold ring.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Readers</h3>
                <p className="text-muted-foreground">
                  Date values are properly formatted and announced. Disabled dates are marked
                  as disabled in the accessibility tree.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Visual Feedback</h3>
                <p className="text-muted-foreground">
                  Selected dates, ranges, and current day are clearly indicated with color and
                  typography changes.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Considerations</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Automatic Layout Adaptation</h3>
                <p className="text-muted-foreground">
                  Navigation buttons automatically flip in RTL mode. Left chevron goes to next month
                  in RTL, previous month in LTR.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Localized Month Names</h3>
                <p className="text-muted-foreground">
                  Month and weekday names use the specified locale (ar-SA or en-US) with proper
                  formatting via toLocaleDateString.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Hijri Date Display</h3>
                <p className="text-muted-foreground">
                  Hijri dates display correctly in both Arabic and English, with proper numeral
                  formatting based on locale.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Event Legend</h3>
                <p className="text-muted-foreground">
                  Event listings adapt to text direction with proper spacing and alignment.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/hijri-date">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Hijri Date</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dual calendar date display
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Button</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Used for navigation
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/badge">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Badge</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Event indicators
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
