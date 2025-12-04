'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { HijriDate } from '@/components/ui/hijri-date'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export default function HijriDatePage() {
  const { locale } = useDirection()
  const t = content[locale].hijriDateComponent

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
            <li className="text-foreground font-medium">{t.breadcrumb.hijriDate}</li>
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
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.installation}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              {t.installation.copyComponent}
            </p>
            <CodeBlock
              language="bash"
              code={`# Copy the component file
cp components/ui/hijri-date.tsx your-project/components/ui/`}
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
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.examples}</h2>

          {/* Default Variant */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.examples.default}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.defaultDesc}
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
            <h3 className="text-2xl font-semibold mb-4">{t.examples.badge}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.badgeDesc}
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
            <h3 className="text-2xl font-semibold mb-4">{t.examples.compact}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.compactDesc}
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="flex justify-center">
                  <div className="text-muted-foreground">
                    {t.examples.publishedOn}{' '}
                    <HijriDate
                      gregorianDate="Nov 6, 2025"
                      hijriDate="5 Jumada I, 1447"
                      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
                      variant="compact"
                      className="text-foreground"
                    />
                  </div>
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<div className="text-muted-foreground">
  Published on{' '}
  <HijriDate
    gregorianDate="Nov 6, 2025"
    hijriDate="5 Jumada I, 1447"
    hijriDateAr="٥ جمادى الأولى ١٤٤٧"
    variant="compact"
    className="text-foreground"
  />
</div>`}
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
            <h3 className="text-2xl font-semibold mb-4">{t.examples.inContent}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.inContentDesc}
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="max-w-md mx-auto border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{t.examples.eventDetails}</h3>
                    <HijriDate
                      gregorianDate="Nov 6"
                      hijriDate="5 Jumada I"
                      hijriDateAr="٥ جمادى الأولى"
                      variant="badge"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.examples.eventText}{' '}
                    <HijriDate
                      gregorianDate="November 6, 2025"
                      gregorianDateAr="٦ نوفمبر ٢٠٢٥"
                      hijriDate="5 Jumada al-Awwal 1447"
                      hijriDateAr="٥ جمادى الأولى ١٤٤٧"
                      variant="compact"
                      className="font-medium text-foreground"
                    />
                    {t.examples.eventTextEnd}
                  </div>
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
          </div>
        </section>

        {/* Integration with Date Conversion Libraries */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.integration.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.integration.description}{' '}
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
            {t.integration.installLibrary}{' '}
            <code className="bg-muted px-2 py-1 rounded">npm install @formkit/hijri</code>
          </p>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.props}</h2>
          <PropsTable
            props={[
              {
                name: 'gregorianDate',
                type: 'string',
                required: true,
                description: t.props.gregorianDate,
              },
              {
                name: 'gregorianDateAr',
                type: 'string',
                default: 'undefined',
                description: t.props.gregorianDateAr,
              },
              {
                name: 'hijriDate',
                type: 'string',
                required: true,
                description: t.props.hijriDate,
              },
              {
                name: 'hijriDateAr',
                type: 'string',
                required: true,
                description: t.props.hijriDateAr,
              },
              {
                name: 'showIcon',
                type: 'boolean',
                default: 'false',
                description: t.props.showIcon,
              },
              {
                name: 'variant',
                type: '"default" | "badge" | "compact" | "detailed"',
                default: '"default"',
                description: t.props.variant,
              },
              {
                name: 'className',
                type: 'string',
                default: 'undefined',
                description: t.props.className,
              },
            ]}
          />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.accessibility}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{t.accessibility.description}</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>{t.accessibility.semanticHtml}</strong> {t.accessibility.semanticHtmlDesc}
              </li>
              <li>
                <strong>{t.accessibility.clearLabels}</strong> {t.accessibility.clearLabelsDesc}
              </li>
              <li>
                <strong>{t.accessibility.visualHierarchy}</strong> {t.accessibility.visualHierarchyDesc}
              </li>
              <li>
                <strong>{t.accessibility.separator}</strong> {t.accessibility.separatorDesc}
              </li>
              <li>
                <strong>{t.accessibility.readableTypography}</strong> {t.accessibility.readableTypographyDesc}
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
                <strong>{t.rtl.autoLanguage}</strong> {t.rtl.autoLanguageDesc}
              </li>
              <li>
                <strong>{t.rtl.logicalProperties}</strong> {t.rtl.logicalPropertiesDesc}
              </li>
              <li>
                <strong>{t.rtl.flexibleLayout}</strong> {t.rtl.flexibleLayoutDesc}
              </li>
              <li>
                <strong>{t.rtl.iconPositioning}</strong> {t.rtl.iconPositioningDesc}
              </li>
              <li>
                <strong>{t.rtl.textAlignment}</strong> {t.rtl.textAlignmentDesc}
              </li>
            </ul>
          </div>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.relatedComponents.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/components/prayer-times"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">{t.relatedComponents.prayerTimes}</h3>
              <p className="text-sm text-muted-foreground">
                {t.relatedComponents.prayerTimesDesc}
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
