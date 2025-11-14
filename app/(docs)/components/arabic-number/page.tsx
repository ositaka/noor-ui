'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ArabicNumber } from '@/components/ui/arabic-number'
import {
  toArabicNumerals,
  toWesternNumerals,
  formatSAR,
  formatNumber,
  formatPercentage,
  formatCompactNumber,
} from '@/lib/arabic-numbers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export default function ArabicNumberPage() {
  const { locale } = useDirection()
  const t = content[locale].arabicNumberComponent

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
            <li className="text-foreground font-medium">{t.breadcrumb.arabicNumber}</li>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.examples.westernNumerals}</CardTitle>
                    <CardDescription>{t.examples.standardFormat}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t.examples.number}</p>
                      <ArabicNumber value={1234567.89} decimals={2} className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t.examples.currency}</p>
                      <ArabicNumber value={9999.99} format="currency" className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t.examples.percentage}</p>
                      <ArabicNumber value={0.7545} format="percentage" className="text-2xl" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.examples.arabicIndicNumerals}</CardTitle>
                    <CardDescription>٠١٢٣٤٥٦٧٨٩</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t.examples.number}</p>
                      <ArabicNumber
                        value={1234567.89}
                        decimals={2}
                        useArabicNumerals
                        className="text-2xl"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t.examples.currency}</p>
                      <ArabicNumber
                        value={9999.99}
                        format="currency"
                        locale="ar"
                        useArabicNumerals
                        className="text-2xl"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t.examples.percentage}</p>
                      <ArabicNumber
                        value={0.7545}
                        format="percentage"
                        locale="ar"
                        useArabicNumerals
                        className="text-2xl"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.installation}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              {t.installation.copyFiles}
            </p>
            <CodeBlock
              language="bash"
              code={`# Copy the utility file
cp lib/arabic-numbers.ts your-project/lib/

# Copy the display component (optional)
cp components/ui/arabic-number.tsx your-project/components/ui/`}
            />
            <p className="text-sm text-muted-foreground mt-4">
              {t.installation.dependencies}
            </p>
          </div>
        </section>

        {/* Utility Functions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.sections.utilityFunctions}</h2>

          {/* Numeral Conversion */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.sections.numeralConversion}</h3>
            <p className="text-muted-foreground mb-6">
              {t.sections.numeralConversionDesc}
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">toArabicNumerals()</h4>
                <ComponentShowcase>
                  <ComponentShowcase.Demo>
                    <div className="space-y-3 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Input: 2025</p>
                        <p className="text-3xl font-bold">{toArabicNumerals(2025)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Input: 123.45</p>
                        <p className="text-3xl font-bold">{toArabicNumerals('123.45')}</p>
                      </div>
                    </div>
                  </ComponentShowcase.Demo>
                </ComponentShowcase>
                <CodeBlock
                  language="tsx"
                  code={`import { toArabicNumerals } from '@/lib/arabic-numbers'

toArabicNumerals(2025)      // "٢٠٢٥"
toArabicNumerals("123.45")  // "١٢٣.٤٥"
toArabicNumerals("Year: 2025") // "Year: ٢٠٢٥"`}
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">toWesternNumerals()</h4>
                <ComponentShowcase>
                  <ComponentShowcase.Demo>
                    <div className="space-y-3 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Input: ٢٠٢٥</p>
                        <p className="text-3xl font-bold">{toWesternNumerals('٢٠٢٥')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Input: ١٢٣٫٤٥</p>
                        <p className="text-3xl font-bold">{toWesternNumerals('١٢٣٫٤٥')}</p>
                      </div>
                    </div>
                  </ComponentShowcase.Demo>
                </ComponentShowcase>
                <CodeBlock
                  language="tsx"
                  code={`import { toWesternNumerals } from '@/lib/arabic-numbers'

toWesternNumerals("٢٠٢٥")     // "2025"
toWesternNumerals("١٢٣٫٤٥")   // "123.45"`}
                />
              </div>
            </div>
          </div>

          {/* Currency Formatting */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.sections.currencyFormatting}</h3>
            <p className="text-muted-foreground mb-6">
              {t.sections.currencyFormattingDesc}
            </p>

            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">{t.examples.englishFormat}</h4>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">1,234.50 SAR</p>
                      <p className="text-2xl font-bold">{formatSAR(1234.5)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">999,999.00 SAR</p>
                      <p className="text-2xl font-bold">{formatSAR(999999)}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">{t.examples.arabicFormat}</h4>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">١٬٢٣٤٫٥٠ ر.س</p>
                      <p className="text-2xl font-bold">
                        {formatSAR(1234.5, { locale: 'ar', useArabicNumerals: true })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">٩٩٩٬٩٩٩٫٠٠ ر.س</p>
                      <p className="text-2xl font-bold">
                        {formatSAR(999999, { locale: 'ar', useArabicNumerals: true })}
                      </p>
                    </div>
                  </div>
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>

            <CodeBlock
              language="tsx"
              code={`import { formatSAR } from '@/lib/arabic-numbers'

// English format
formatSAR(1234.5)                    // "1,234.50 SAR"
formatSAR(999999)                    // "999,999.00 SAR"
formatSAR(1234.5, { showSymbol: false }) // "1,234.50"

// Arabic format with Arabic-Indic numerals
formatSAR(1234.5, {
  locale: 'ar',
  useArabicNumerals: true
})  // "١٬٢٣٤٫٥٠ ر.س"

// Custom decimals
formatSAR(1234.567, { decimals: 3 })  // "1,234.567 SAR"`}
            />
          </div>

          {/* Number Formatting */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.sections.numberFormatting}</h3>
            <p className="text-muted-foreground mb-6">
              {t.sections.numberFormattingDesc}
            </p>

            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t.examples.standard}</p>
                    <p className="text-3xl font-bold">{formatNumber(1234567.89)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t.examples.arabicLocale}</p>
                    <p className="text-3xl font-bold">{formatNumber(1234567.89, { locale: 'ar' })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t.examples.arabicNumerals}</p>
                    <p className="text-3xl font-bold">
                      {formatNumber(1234567.89, { locale: 'ar', useArabicNumerals: true })}
                    </p>
                  </div>
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>

            <CodeBlock
              language="tsx"
              code={`import { formatNumber } from '@/lib/arabic-numbers'

formatNumber(1234567.89)              // "1,234,567.89"
formatNumber(1234567.89, { decimals: 0 })  // "1,234,568"
formatNumber(1234567.89, {
  locale: 'ar',
  useArabicNumerals: true
})  // "١٬٢٣٤٬٥٦٧٫٨٩"

formatNumber(1000000, { useGrouping: false })  // "1000000"`}
            />
          </div>

          {/* Percentage Formatting */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.sections.percentageFormatting}</h3>
            <p className="text-muted-foreground mb-6">
              {t.sections.percentageFormattingDesc}
            </p>

            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">75.5%</p>
                    <p className="text-4xl font-bold">{formatPercentage(0.755)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">23.67%</p>
                    <p className="text-4xl font-bold">{formatPercentage(0.23667, { decimals: 2 })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Arabic: ٪٩٩٫٩</p>
                    <p className="text-4xl font-bold">
                      {formatPercentage(0.999, { locale: 'ar', useArabicNumerals: true })}
                    </p>
                  </div>
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>

            <CodeBlock
              language="tsx"
              code={`import { formatPercentage } from '@/lib/arabic-numbers'

formatPercentage(0.755)               // "75.5%"
formatPercentage(0.23667, { decimals: 2 })  // "23.67%"
formatPercentage(0.999, {
  locale: 'ar',
  useArabicNumerals: true
})  // "٪٩٩٫٩"`}
            />
          </div>

          {/* Compact Formatting */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.sections.compactFormatting}</h3>
            <p className="text-muted-foreground mb-6">
              {t.sections.compactFormattingDesc}
            </p>

            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">1.2K</p>
                    <p className="text-3xl font-bold">{formatCompactNumber(1234)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">1.2M</p>
                    <p className="text-3xl font-bold">{formatCompactNumber(1234567)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">1.2B</p>
                    <p className="text-3xl font-bold">{formatCompactNumber(1234567890)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t.examples.arabic}</p>
                    <p className="text-3xl font-bold">
                      {formatCompactNumber(1234567, { locale: 'ar', useArabicNumerals: true })}
                    </p>
                  </div>
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>

            <CodeBlock
              language="tsx"
              code={`import { formatCompactNumber } from '@/lib/arabic-numbers'

formatCompactNumber(1234)              // "1.2K"
formatCompactNumber(1234567)           // "1.2M"
formatCompactNumber(1234567890)        // "1.2B"
formatCompactNumber(1234567, {
  locale: 'ar',
  useArabicNumerals: true
})  // "١٫٢ مليون"`}
            />
          </div>
        </section>

        {/* Display Component */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.sections.displayComponent}</h2>
          <p className="text-muted-foreground mb-6">
            {t.sections.displayComponentDesc}
          </p>

          <div className="space-y-8">
            {/* Inline Usage */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t.examples.inlineUsage}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="max-w-2xl mx-auto space-y-4">
                    <p className="text-lg">
                      The product costs{' '}
                      <ArabicNumber value={499.99} format="currency" variant="inline" /> and is
                      currently on sale with a{' '}
                      <ArabicNumber value={0.25} format="percentage" variant="inline" className="text-green-600" />{' '}
                      discount!
                    </p>
                    <p className="text-lg" dir="rtl">
                      سعر المنتج{' '}
                      <ArabicNumber
                        value={499.99}
                        format="currency"
                        locale="ar"
                        useArabicNumerals
                        variant="inline"
                      />{' '}
                      ويوجد خصم{' '}
                      <ArabicNumber
                        value={0.25}
                        format="percentage"
                        locale="ar"
                        useArabicNumerals
                        variant="inline"
                        className="text-green-600"
                      />
                    </p>
                  </div>
                </ComponentShowcase.Demo>
              </ComponentShowcase>
              <CodeBlock
                language="tsx"
                code={`<p>
  The product costs{' '}
  <ArabicNumber value={499.99} format="currency" variant="inline" />
  {' '}and is currently on sale with a{' '}
  <ArabicNumber value={0.25} format="percentage" variant="inline" />
  {' '}discount!
</p>`}
              />
            </div>

            {/* Badge Variant */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t.examples.badgeVariant}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <ArabicNumber value={1234} variant="badge" />
                    <ArabicNumber value={99.99} format="currency" variant="badge" />
                    <ArabicNumber value={0.35} format="percentage" variant="badge" />
                    <ArabicNumber
                      value={1234}
                      useArabicNumerals
                      variant="badge"
                      className="bg-primary text-primary-foreground"
                    />
                  </div>
                </ComponentShowcase.Demo>
              </ComponentShowcase>
              <CodeBlock
                language="tsx"
                code={`<ArabicNumber value={1234} variant="badge" />
<ArabicNumber value={99.99} format="currency" variant="badge" />
<ArabicNumber value={0.35} format="percentage" variant="badge" />`}
              />
            </div>
          </div>
        </section>

        {/* Component Props */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.sections.componentProps}</h2>
          <PropsTable
            props={[
              {
                name: 'value',
                type: 'number',
                required: true,
                description: t.props.value,
              },
              {
                name: 'format',
                type: '"number" | "currency" | "percentage"',
                default: '"number"',
                description: t.props.format,
              },
              {
                name: 'useArabicNumerals',
                type: 'boolean',
                default: 'false',
                description: t.props.useArabicNumerals,
              },
              {
                name: 'locale',
                type: '"en" | "ar"',
                default: '"en"',
                description: t.props.locale,
              },
              {
                name: 'decimals',
                type: 'number',
                default: 'undefined',
                description: t.props.decimals,
              },
              {
                name: 'variant',
                type: '"default" | "inline" | "badge"',
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

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.sections.commonUseCases}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.useCases.ecommercePrices}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="tsx"
                  code={`<ArabicNumber
  value={299.99}
  format="currency"
  locale={locale}
  useArabicNumerals={locale === 'ar'}
/>`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.useCases.statisticsAnalytics}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="tsx"
                  code={`<ArabicNumber
  value={1234567}
  decimals={0}
  useArabicNumerals={isRTL}
/>`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.useCases.discountPercentages}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="tsx"
                  code={`<ArabicNumber
  value={0.25}
  format="percentage"
  decimals={0}
  className="text-green-600"
/>`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.useCases.compactNumbers}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="tsx"
                  code={`formatCompactNumber(1500000)
// Output: "1.5M"`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.accessibility}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{t.accessibility.description}</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>{t.accessibility.tabularNumerals}</strong> {t.accessibility.tabularNumeralsDesc}
              </li>
              <li>
                <strong>{t.accessibility.semanticHtml}</strong> {t.accessibility.semanticHtmlDesc}
              </li>
              <li>
                <strong>{t.accessibility.highContrast}</strong> {t.accessibility.highContrastDesc}
              </li>
              <li>
                <strong>{t.accessibility.screenReaders}</strong> {t.accessibility.screenReadersDesc}
              </li>
            </ul>
          </div>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.rtlConsiderations}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{t.rtl.description}</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>{t.rtl.autoLocale}</strong> {t.rtl.autoLocaleDesc}
              </li>
              <li>
                <strong>{t.rtl.arabicIndicNumerals}</strong> {t.rtl.arabicIndicNumeralsDesc}
              </li>
              <li>
                <strong>{t.rtl.properSeparators}</strong> {t.rtl.properSeparatorsDesc}
              </li>
              <li>
                <strong>{t.rtl.currencySymbols}</strong> {t.rtl.currencySymbolsDesc}
              </li>
              <li>
                <strong>{t.rtl.percentageFormat}</strong> {t.rtl.percentageFormatDesc}
              </li>
            </ul>
          </div>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.relatedComponents.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/components/hijri-date"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">{t.relatedComponents.hijriDate}</h3>
              <p className="text-sm text-muted-foreground">
                {t.relatedComponents.hijriDateDesc}
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
