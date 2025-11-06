'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { HijriDate } from '@/components/ui/hijri-date'

export default function HijriDatePage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Hijri Date</h1>
          <p className="text-xl text-muted-foreground">
            A beautiful component to display both Gregorian and Hijri (Islamic calendar) dates
            together. Perfect for GCC applications with full bilingual support and multiple layout
            variants.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="flex flex-col gap-6 items-center">
                <HijriDate
                  gregorianDate="November 6, 2025"
                  gregorianDateAr="٦ نوفمبر ٢٠٢٥"
                  hijriDate="5 Jumada al-Awwal 1447"
                  hijriDateAr="٥ جمادى الأولى ١٤٤٧"
                  showIcon
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
cp components/ui/hijri-date.tsx your-project/components/ui/`}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Dependencies: This component uses Lucide icons which should already be installed in
              your project.
            </p>
          </div>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Usage</h2>
          <CodeBlock
            language="tsx"
            code={`import { HijriDate } from '@/components/ui/hijri-date'

export default function MyApp() {
  return (
    <HijriDate
      gregorianDate="November 6, 2025"
      gregorianDateAr="٦ نوفمبر ٢٠٢٥"
      hijriDate="5 Jumada al-Awwal 1447"
      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
      showIcon
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
              Card-style layout with labels, perfect for prominent date displays.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="flex justify-center">
                  <HijriDate
                    gregorianDate="November 6, 2025"
                    gregorianDateAr="٦ نوفمبر ٢٠٢٥"
                    hijriDate="5 Jumada al-Awwal 1447"
                    hijriDateAr="٥ جمادى الأولى ١٤٤٧"
                    showIcon
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<HijriDate
  gregorianDate="November 6, 2025"
  gregorianDateAr="٦ نوفمبر ٢٠٢٥"
  hijriDate="5 Jumada al-Awwal 1447"
  hijriDateAr="٥ جمادى الأولى ١٤٤٧"
  showIcon
/>`}
              />
            </div>
          </div>

          {/* Badge Variant */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Badge</h3>
            <p className="text-muted-foreground mb-4">
              Compact inline badge, great for headers or metadata sections.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="flex justify-center">
                  <HijriDate
                    gregorianDate="Nov 6, 2025"
                    hijriDate="5 Jumada I, 1447"
                    hijriDateAr="٥ جمادى الأولى ١٤٤٧"
                    variant="badge"
                    showIcon
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<HijriDate
  gregorianDate="Nov 6, 2025"
  hijriDate="5 Jumada I, 1447"
  hijriDateAr="٥ جمادى الأولى ١٤٤٧"
  variant="badge"
  showIcon
/>`}
              />
            </div>
          </div>

          {/* Compact Variant */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Compact</h3>
            <p className="text-muted-foreground mb-4">
              Minimal inline text, perfect for content flows and timestamps.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="flex justify-center">
                  <p className="text-muted-foreground">
                    Published on{' '}
                    <HijriDate
                      gregorianDate="Nov 6, 2025"
                      hijriDate="5 Jumada I, 1447"
                      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
                      variant="compact"
                      className="text-foreground"
                    />
                  </p>
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<p className="text-muted-foreground">
  Published on{' '}
  <HijriDate
    gregorianDate="Nov 6, 2025"
    hijriDate="5 Jumada I, 1447"
    hijriDateAr="٥ جمادى الأولى ١٤٤٧"
    variant="compact"
    className="text-foreground"
  />
</p>`}
              />
            </div>
          </div>

          {/* Detailed Variant */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Detailed</h3>
            <p className="text-muted-foreground mb-4">
              Large, spacious layout with enhanced typography for feature sections.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="flex justify-center">
                  <HijriDate
                    gregorianDate="November 6, 2025"
                    gregorianDateAr="٦ نوفمبر ٢٠٢٥"
                    hijriDate="5 Jumada al-Awwal 1447"
                    hijriDateAr="٥ جمادى الأولى ١٤٤٧"
                    variant="detailed"
                    showIcon
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<HijriDate
  gregorianDate="November 6, 2025"
  gregorianDateAr="٦ نوفمبر ٢٠٢٥"
  hijriDate="5 Jumada al-Awwal 1447"
  hijriDateAr="٥ جمادى الأولى ١٤٤٧"
  variant="detailed"
  showIcon
/>`}
              />
            </div>
          </div>

          {/* In a Card */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">In Content</h3>
            <p className="text-muted-foreground mb-4">
              Multiple variants used together in a card layout.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="max-w-md mx-auto border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Event Details</h3>
                    <HijriDate
                      gregorianDate="Nov 6"
                      hijriDate="5 Jumada I"
                      hijriDateAr="٥ جمادى الأولى"
                      variant="badge"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join us for a special gathering on{' '}
                    <HijriDate
                      gregorianDate="November 6, 2025"
                      gregorianDateAr="٦ نوفمبر ٢٠٢٥"
                      hijriDate="5 Jumada al-Awwal 1447"
                      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
                      variant="compact"
                      className="font-medium text-foreground"
                    />
                    . We look forward to seeing you there!
                  </p>
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
          </div>
        </section>

        {/* Integration with Date Conversion Libraries */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Integration with Date Conversion Libraries</h2>
          <p className="text-muted-foreground mb-6">
            This component is UI-only and accepts pre-formatted date strings. You can integrate it
            with Hijri calendar conversion libraries. Here&apos;s an example using{' '}
            <code className="text-sm bg-muted px-2 py-1 rounded">@formkit/hijri</code>:
          </p>
          <CodeBlock
            language="tsx"
            code={`import { HijriDate as HijriDateUI } from '@/components/ui/hijri-date'
import { toHijri } from '@formkit/hijri'

export function SmartHijriDate({ date }: { date: Date }) {
  // Convert to Hijri
  const hijri = toHijri(date)

  // Format Gregorian date
  const gregorianFormatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const gregorianFormattedAr = date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Format Hijri date
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'
  ]

  const hijriFormatted = \`\${hijri.hd} \${hijriMonths[hijri.hm - 1]} \${hijri.hy}\`

  // Arabic Hijri formatting
  const hijriFormattedAr = \`\${hijri.hd} \${getArabicMonth(hijri.hm)} \${hijri.hy}\`

  return (
    <HijriDateUI
      gregorianDate={gregorianFormatted}
      gregorianDateAr={gregorianFormattedAr}
      hijriDate={hijriFormatted}
      hijriDateAr={hijriFormattedAr}
      showIcon
    />
  )
}

// Helper function to get Arabic month names
function getArabicMonth(month: number): string {
  const months = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
    'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان',
    'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ]
  return months[month - 1]
}`}
          />
          <p className="text-sm text-muted-foreground mt-4">
            Install the library:{' '}
            <code className="bg-muted px-2 py-1 rounded">npm install @formkit/hijri</code>
          </p>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Props</h2>
          <PropsTable
            props={[
              {
                name: 'gregorianDate',
                type: 'string',
                required: true,
                description: 'Gregorian date in English (e.g., "November 6, 2025").',
              },
              {
                name: 'gregorianDateAr',
                type: 'string',
                default: 'undefined',
                description:
                  'Gregorian date in Arabic (optional, displayed in RTL mode if provided).',
              },
              {
                name: 'hijriDate',
                type: 'string',
                required: true,
                description: 'Hijri date in English (e.g., "5 Jumada al-Awwal 1447").',
              },
              {
                name: 'hijriDateAr',
                type: 'string',
                required: true,
                description: 'Hijri date in Arabic (e.g., "٥ جمادى الأولى ١٤٤٧").',
              },
              {
                name: 'showIcon',
                type: 'boolean',
                default: 'false',
                description: 'Display a calendar icon with the dates.',
              },
              {
                name: 'variant',
                type: '"default" | "badge" | "compact" | "detailed"',
                default: '"default"',
                description: 'Visual variant controlling layout and styling.',
              },
              {
                name: 'className',
                type: 'string',
                default: 'undefined',
                description: 'Additional CSS classes for the wrapper element.',
              },
            ]}
          />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Accessibility</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>The Hijri Date component follows accessibility best practices:</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>Semantic HTML:</strong> Uses proper semantic elements for date display.
              </li>
              <li>
                <strong>Clear Labels:</strong> Date type labels (&quot;Gregorian&quot;, &quot;Hijri&quot;) provide context.
              </li>
              <li>
                <strong>Visual Hierarchy:</strong> Consistent styling helps distinguish between date
                types.
              </li>
              <li>
                <strong>Separator:</strong> Visual bullet separator in inline variants is marked
                with aria-hidden.
              </li>
              <li>
                <strong>Readable Typography:</strong> Font sizes and weights optimized for
                readability.
              </li>
            </ul>
          </div>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">RTL Considerations</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              This component is built with RTL-first principles and automatically adapts to text
              direction:
            </p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>Automatic Language Detection:</strong> Displays Arabic dates (gregorianDateAr,
                hijriDateAr) in RTL mode.
              </li>
              <li>
                <strong>Logical Properties:</strong> Uses margin-inline-start (ms-*) and gap for
                proper spacing.
              </li>
              <li>
                <strong>Flexible Layout:</strong> All variants adapt seamlessly to both LTR and RTL
                directions.
              </li>
              <li>
                <strong>Icon Positioning:</strong> Calendar icon positions correctly in both
                directions.
              </li>
              <li>
                <strong>Text Alignment:</strong> Date labels and values align naturally based on
                direction.
              </li>
            </ul>
          </div>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Related Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/components/prayer-times"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Prayer Times</h3>
              <p className="text-sm text-muted-foreground">
                Display Islamic prayer times with countdown timer.
              </p>
            </Link>
            <Link
              href="/components/badge"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Badge</h3>
              <p className="text-sm text-muted-foreground">
                Similar styling to the badge variant of this component.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
