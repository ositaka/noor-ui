'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { PrayerTimes, type Prayer } from '@/components/ui/prayer-times'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export default function PrayerTimesPage() {
  const { locale } = useDirection()
  const t = content[locale].prayerTimesComponent

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
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.breadcrumb.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.breadcrumb.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.breadcrumb.prayerTimes}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.preview}</h2>
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
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.installation}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              {t.installation.copyComponent}
            </p>
            <CodeBlock
              language="bash"
              code={`# Copy the component file
cp components/ui/prayer-times.tsx your-project/components/ui/`}
            />
            <p className="text-sm text-muted-foreground mt-4">
              {t.installation.dependencies}
            </p>
          </div>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.usage}</h2>
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
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.examples}</h2>

          {/* Default Variant */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.examples.default}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.defaultDesc}
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
            <h3 className="text-2xl font-semibold mb-4">{t.examples.compact}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.compactDesc}
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
            <h3 className="text-2xl font-semibold mb-4">{t.examples.detailed}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.detailedDesc}
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
            <h3 className="text-2xl font-semibold mb-4">{t.examples.withoutCountdown}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.withoutCountdownDesc}
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

          {/* Notification Variant */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.examples.notificationVariant}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.notificationVariantDesc}
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="max-w-md mx-auto">
                  <PrayerTimes
                    prayers={samplePrayers}
                    nextPrayer="Maghrib"
                    variant="notification"
                    location="Riyadh"
                    locationAr="الرياض"
                    showPlayAdhan={true}
                    onPlayAdhan={() => alert('Playing Adhan...')}
                    onDismiss={() => alert('Dismissed')}
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`const [showNotification, setShowNotification] = useState(true)

if (!showNotification) return null

return (
  <PrayerTimes
    prayers={prayers}
    nextPrayer="Maghrib"
    variant="notification"
    location="Riyadh"
    locationAr="الرياض"
    showPlayAdhan={true}
    onPlayAdhan={() => {
      // Play adhan audio
      const audio = new Audio('/adhan.mp3')
      audio.play()
    }}
    onDismiss={() => setShowNotification(false)}
  />
)`}
              />
            </div>
          </div>
        </section>

        {/* Integration with Calculation Libraries */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.integration.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.integration.description}{' '}
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
            {t.integration.installLibrary}{' '}
            <code className="bg-muted px-2 py-1 rounded">npm install adhan</code>
          </p>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.props}</h2>
          <PropsTable
            props={[
              {
                name: 'prayers',
                type: 'Prayer[]',
                required: true,
                description: t.props.prayers,
              },
              {
                name: 'nextPrayer',
                type: 'string',
                default: 'undefined',
                description: t.props.nextPrayer,
              },
              {
                name: 'countdown',
                type: 'string',
                default: 'undefined',
                description: t.props.countdown,
              },
              {
                name: 'location',
                type: 'string',
                default: 'undefined',
                description: t.props.location,
              },
              {
                name: 'locationAr',
                type: 'string',
                default: 'undefined',
                description: t.props.locationAr,
              },
              {
                name: 'date',
                type: 'string',
                default: 'undefined',
                description: t.props.date,
              },
              {
                name: 'dateAr',
                type: 'string',
                default: 'undefined',
                description: t.props.dateAr,
              },
              {
                name: 'variant',
                type: '"default" | "compact" | "detailed" | "notification"',
                default: '"default"',
                description: t.props.variant,
              },
              {
                name: 'onDismiss',
                type: '() => void',
                default: 'undefined',
                description: t.props.onDismiss,
              },
              {
                name: 'showPlayAdhan',
                type: 'boolean',
                default: 'false',
                description: t.props.showPlayAdhan,
              },
              {
                name: 'onPlayAdhan',
                type: '() => void',
                default: 'undefined',
                description: t.props.onPlayAdhan,
              },
              {
                name: 'className',
                type: 'string',
                default: 'undefined',
                description: t.props.className,
              },
            ]}
          />

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">{t.props.prayerType}</h3>
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
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.accessibility}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{t.accessibility.description}</p>
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
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.rtlConsiderations}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t.rtl.description}
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
          <h2 className="text-3xl font-bold mb-6">{t.relatedComponents.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/components/card"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">{t.relatedComponents.card}</h3>
              <p className="text-sm text-muted-foreground">
                {t.relatedComponents.cardDesc}
              </p>
            </Link>
            <Link
              href="/components/badge"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">{t.relatedComponents.badge}</h3>
              <p className="text-sm text-muted-foreground">
                {t.relatedComponents.badgeDesc}
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
