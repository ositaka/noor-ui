'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { PrayerTimes, type Prayer } from '@/components/ui/prayer-times'

export default function PrayerTimesPage() {
  // Sample data for demonstrations
  const samplePrayers: Prayer[] = [
    { name: 'Fajr', nameAr: 'الفجر', time: '04:45' },
    { name: 'Dhuhr', nameAr: 'الظهر', time: '12:15' },
    { name: 'Asr', nameAr: 'العصر', time: '15:30' },
    { name: 'Maghrib', nameAr: 'المغرب', time: '18:05' },
    { name: 'Isha', nameAr: 'العشاء', time: '19:35' },
  ]

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Prayer Times</h1>
          <p className="text-xl text-muted-foreground">
            A beautiful, RTL-aware component to display Islamic prayer times. Perfect for GCC
            applications with full bilingual support and multiple layout variants.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-2xl mx-auto">
                <PrayerTimes
                  prayers={samplePrayers}
                  nextPrayer="Dhuhr"
                  countdown="2:30:15"
                  location="Riyadh"
                  locationAr="الرياض"
                  date="November 6, 2025"
                  dateAr="٥ جمادى الأولى ١٤٤٧"
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Installation</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Copy and paste the component code into your project:
            </p>
            <CodeBlock
              language="bash"
              code={`# Copy the component file
cp components/ui/prayer-times.tsx your-project/components/ui/`}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Dependencies: This component uses Card, Badge, and Lucide icons which should already
              be installed in your project.
            </p>
          </div>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Usage</h2>
          <CodeBlock
            language="tsx"
            code={`import { PrayerTimes, type Prayer } from '@/components/ui/prayer-times'

const prayers: Prayer[] = [
  { name: 'Fajr', nameAr: 'الفجر', time: '04:45' },
  { name: 'Dhuhr', nameAr: 'الظهر', time: '12:15' },
  { name: 'Asr', nameAr: 'العصر', time: '15:30' },
  { name: 'Maghrib', nameAr: 'المغرب', time: '18:05' },
  { name: 'Isha', nameAr: 'العشاء', time: '19:35' },
]

export default function MyApp() {
  return (
    <PrayerTimes
      prayers={prayers}
      nextPrayer="Dhuhr"
      countdown="2:30:15"
      location="Riyadh"
      locationAr="الرياض"
      date="November 6, 2025"
      dateAr="٥ جمادى الأولى ١٤٤٧"
    />
  )
}`}
          />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Examples</h2>

          {/* Default Variant */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Default</h3>
            <p className="text-muted-foreground mb-4">
              The default variant with location, date, and next prayer countdown.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="max-w-2xl mx-auto">
                  <PrayerTimes
                    prayers={samplePrayers}
                    nextPrayer="Asr"
                    countdown="1:45:30"
                    location="Dubai"
                    locationAr="دبي"
                    date="November 6, 2025"
                    dateAr="٥ جمادى الأولى ١٤٤٧"
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<PrayerTimes
  prayers={prayers}
  nextPrayer="Asr"
  countdown="1:45:30"
  location="Dubai"
  locationAr="دبي"
  date="November 6, 2025"
  dateAr="٥ جمادى الأولى ١٤٤٧"
/>`}
              />
            </div>
          </div>

          {/* Compact Variant */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Compact</h3>
            <p className="text-muted-foreground mb-4">
              A more condensed layout perfect for sidebars or widgets.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="max-w-2xl mx-auto">
                  <PrayerTimes
                    prayers={samplePrayers}
                    nextPrayer="Maghrib"
                    variant="compact"
                    location="Mecca"
                    locationAr="مكة المكرمة"
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<PrayerTimes
  prayers={prayers}
  nextPrayer="Maghrib"
  variant="compact"
  location="Mecca"
  locationAr="مكة المكرمة"
/>`}
              />
            </div>
          </div>

          {/* Detailed Variant */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Detailed</h3>
            <p className="text-muted-foreground mb-4">
              A more spacious layout with larger text, ideal for prominent displays.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="max-w-2xl mx-auto">
                  <PrayerTimes
                    prayers={samplePrayers}
                    nextPrayer="Isha"
                    countdown="0:45:12"
                    variant="detailed"
                    location="Jeddah"
                    locationAr="جدة"
                    date="November 6, 2025"
                    dateAr="٥ جمادى الأولى ١٤٤٧"
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<PrayerTimes
  prayers={prayers}
  nextPrayer="Isha"
  countdown="0:45:12"
  variant="detailed"
  location="Jeddah"
  locationAr="جدة"
  date="November 6, 2025"
  dateAr="٥ جمادى الأولى ١٤٤٧"
/>`}
              />
            </div>
          </div>

          {/* Without Countdown */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Without Countdown</h3>
            <p className="text-muted-foreground mb-4">
              Simple display of prayer times without next prayer countdown.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="max-w-2xl mx-auto">
                  <PrayerTimes
                    prayers={samplePrayers}
                    location="Doha"
                    locationAr="الدوحة"
                    date="November 6, 2025"
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<PrayerTimes
  prayers={prayers}
  location="Doha"
  locationAr="الدوحة"
  date="November 6, 2025"
/>`}
              />
            </div>
          </div>
        </section>

        {/* Integration with Calculation Libraries */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Integration with Calculation Libraries</h2>
          <p className="text-muted-foreground mb-6">
            This component is UI-only and accepts prayer times as props. You can integrate it with
            any prayer time calculation library. Here&apos;s an example using the popular{' '}
            <code className="text-sm bg-muted px-2 py-1 rounded">adhan</code> library:
          </p>
          <CodeBlock
            language="tsx"
            code={`import { PrayerTimes as PrayerTimesUI } from '@/components/ui/prayer-times'
import { CalculationMethod, Coordinates, PrayerTimes as AdhanTimes } from 'adhan'

export function SmartPrayerTimes({ latitude, longitude }: { latitude: number; longitude: number }) {
  const coordinates = new Coordinates(latitude, longitude)
  const params = CalculationMethod.UmmAlQura()
  const date = new Date()
  const prayerTimes = new AdhanTimes(coordinates, date, params)

  const prayers = [
    { name: 'Fajr', nameAr: 'الفجر', time: prayerTimes.fajr.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
    { name: 'Dhuhr', nameAr: 'الظهر', time: prayerTimes.dhuhr.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
    { name: 'Asr', nameAr: 'العصر', time: prayerTimes.asr.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
    { name: 'Maghrib', nameAr: 'المغرب', time: prayerTimes.maghrib.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
    { name: 'Isha', nameAr: 'العشاء', time: prayerTimes.isha.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
  ]

  // Calculate next prayer
  const nextPrayerName = prayerTimes.nextPrayer()

  return (
    <PrayerTimesUI
      prayers={prayers}
      nextPrayer={nextPrayerName}
      location="Riyadh"
      locationAr="الرياض"
    />
  )
}`}
          />
          <p className="text-sm text-muted-foreground mt-4">
            Install the adhan library:{' '}
            <code className="bg-muted px-2 py-1 rounded">npm install adhan</code>
          </p>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Props</h2>
          <PropsTable
            props={[
              {
                name: 'prayers',
                type: 'Prayer[]',
                required: true,
                description:
                  'Array of prayer objects with name, nameAr, and time properties.',
              },
              {
                name: 'nextPrayer',
                type: 'string',
                default: 'undefined',
                description:
                  'Name of the next prayer to highlight. Should match a prayer name in the prayers array.',
              },
              {
                name: 'countdown',
                type: 'string',
                default: 'undefined',
                description:
                  'Countdown timer to next prayer in format "HH:MM:SS" or "MM:SS".',
              },
              {
                name: 'location',
                type: 'string',
                default: 'undefined',
                description: 'Location name in English (e.g., "Riyadh").',
              },
              {
                name: 'locationAr',
                type: 'string',
                default: 'undefined',
                description: 'Location name in Arabic (e.g., "الرياض").',
              },
              {
                name: 'date',
                type: 'string',
                default: 'undefined',
                description: 'Date in English (e.g., "November 6, 2025").',
              },
              {
                name: 'dateAr',
                type: 'string',
                default: 'undefined',
                description: 'Date in Arabic (e.g., "٥ جمادى الأولى ١٤٤٧").',
              },
              {
                name: 'variant',
                type: '"default" | "compact" | "detailed"',
                default: '"default"',
                description: 'Visual variant affecting spacing and text size.',
              },
              {
                name: 'className',
                type: 'string',
                default: 'undefined',
                description: 'Additional CSS classes for the wrapper card.',
              },
            ]}
          />

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Prayer Type</h3>
            <CodeBlock
              language="typescript"
              code={`interface Prayer {
  /** Prayer name in English */
  name: string
  /** Prayer name in Arabic */
  nameAr: string
  /** Prayer time (e.g., "04:45 AM" or "04:45") */
  time: string
}`}
            />
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Accessibility</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>The Prayer Times component follows accessibility best practices:</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>Semantic HTML:</strong> Uses proper heading hierarchy and semantic
                elements.
              </li>
              <li>
                <strong>Visual Indicators:</strong> Color dots and borders provide visual cues for
                the next prayer.
              </li>
              <li>
                <strong>High Contrast:</strong> Text and icons maintain proper contrast ratios for
                readability.
              </li>
              <li>
                <strong>Tabular Numbers:</strong> Uses tabular-nums for consistent time alignment.
              </li>
              <li>
                <strong>Responsive Design:</strong> Adapts to different screen sizes while
                maintaining readability.
              </li>
            </ul>
          </div>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">RTL Considerations</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              This component is built with RTL-first principles and automatically adapts to the
              current text direction:
            </p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>Automatic Language Detection:</strong> Displays Arabic names (nameAr) in
                RTL mode and English names in LTR mode.
              </li>
              <li>
                <strong>Logical Properties:</strong> Uses margin-inline-start (ms-*) and
                margin-inline-end (me-*) for proper spacing in both directions.
              </li>
              <li>
                <strong>Text Alignment:</strong> Uses text-start and text-end instead of left/right
                alignment.
              </li>
              <li>
                <strong>Icon Positioning:</strong> Icons automatically position correctly in both
                LTR and RTL layouts.
              </li>
              <li>
                <strong>Badge Labels:</strong> &quot;Next&quot; badge shows &quot;الآن&quot; (Now) in Arabic mode.
              </li>
            </ul>
          </div>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Related Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/components/card"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Card</h3>
              <p className="text-sm text-muted-foreground">
                Base component used for the prayer times container.
              </p>
            </Link>
            <Link
              href="/components/badge"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Badge</h3>
              <p className="text-sm text-muted-foreground">
                Used to highlight the next prayer indicator.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
