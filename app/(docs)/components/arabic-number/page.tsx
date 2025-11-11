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

export default function ArabicNumberPage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Arabic Number Utilities</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive utilities for formatting numbers in Arabic contexts. Includes
            Arabic-Indic numeral conversion (٠-٩), SAR currency formatting, and locale-aware number
            display. Perfect for GCC applications.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Western Numerals</CardTitle>
                    <CardDescription>Standard format</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Number</p>
                      <ArabicNumber value={1234567.89} decimals={2} className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Currency</p>
                      <ArabicNumber value={9999.99} format="currency" className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Percentage</p>
                      <ArabicNumber value={0.7545} format="percentage" className="text-2xl" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Arabic-Indic Numerals</CardTitle>
                    <CardDescription>٠١٢٣٤٥٦٧٨٩</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Number</p>
                      <ArabicNumber
                        value={1234567.89}
                        decimals={2}
                        useArabicNumerals
                        className="text-2xl"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Currency</p>
                      <ArabicNumber
                        value={9999.99}
                        format="currency"
                        locale="ar"
                        useArabicNumerals
                        className="text-2xl"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Percentage</p>
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
          <h2 className="text-3xl font-bold mb-6">Installation</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Copy the utility functions and component into your project:
            </p>
            <CodeBlock
              language="bash"
              code={`# Copy the utility file
cp lib/arabic-numbers.ts your-project/lib/

# Copy the display component (optional)
cp components/ui/arabic-number.tsx your-project/components/ui/`}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Dependencies: No external dependencies required. Uses built-in Intl.NumberFormat API.
            </p>
          </div>
        </section>

        {/* Utility Functions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Utility Functions</h2>

          {/* Numeral Conversion */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Numeral Conversion</h3>
            <p className="text-muted-foreground mb-6">
              Convert between Western (0-9) and Arabic-Indic (٠-٩) numerals.
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
            <h3 className="text-2xl font-semibold mb-4">Currency Formatting (SAR)</h3>
            <p className="text-muted-foreground mb-6">
              Format numbers as Saudi Riyal currency with full locale support.
            </p>

            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">English Format</h4>
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
                    <h4 className="font-semibold">Arabic Format</h4>
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
            <h3 className="text-2xl font-semibold mb-4">Number Formatting</h3>
            <p className="text-muted-foreground mb-6">
              Format numbers with locale-specific separators and decimal points.
            </p>

            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Standard</p>
                    <p className="text-3xl font-bold">{formatNumber(1234567.89)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Arabic Locale</p>
                    <p className="text-3xl font-bold">{formatNumber(1234567.89, { locale: 'ar' })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Arabic Numerals</p>
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
            <h3 className="text-2xl font-semibold mb-4">Percentage Formatting</h3>
            <p className="text-muted-foreground mb-6">
              Format decimal numbers as percentages (0.15 = 15%).
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
            <h3 className="text-2xl font-semibold mb-4">Compact Number Formatting</h3>
            <p className="text-muted-foreground mb-6">
              Format large numbers in compact form (1K, 1M, 1B).
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
                    <p className="text-sm text-muted-foreground mb-2">Arabic</p>
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
          <h2 className="text-3xl font-bold mb-6">Display Component</h2>
          <p className="text-muted-foreground mb-6">
            Use the ArabicNumber component for consistent number display in your UI.
          </p>

          <div className="space-y-8">
            {/* Inline Usage */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Inline Usage</h3>
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
              <h3 className="text-xl font-semibold mb-4">Badge Variant</h3>
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
          <h2 className="text-3xl font-bold mb-6">Component Props</h2>
          <PropsTable
            props={[
              {
                name: 'value',
                type: 'number',
                required: true,
                description: 'The number to display.',
              },
              {
                name: 'format',
                type: '"number" | "currency" | "percentage"',
                default: '"number"',
                description: 'Format type for the number.',
              },
              {
                name: 'useArabicNumerals',
                type: 'boolean',
                default: 'false',
                description: 'Use Arabic-Indic numerals (٠-٩) instead of Western (0-9).',
              },
              {
                name: 'locale',
                type: '"en" | "ar"',
                default: '"en"',
                description: 'Locale for formatting (affects separators and symbols).',
              },
              {
                name: 'decimals',
                type: 'number',
                default: 'undefined',
                description: 'Number of decimal places to display.',
              },
              {
                name: 'variant',
                type: '"default" | "inline" | "badge"',
                default: '"default"',
                description: 'Visual style variant.',
              },
              {
                name: 'className',
                type: 'string',
                default: 'undefined',
                description: 'Additional CSS classes.',
              },
            ]}
          />
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>E-commerce Prices</CardTitle>
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
                <CardTitle>Statistics & Analytics</CardTitle>
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
                <CardTitle>Discount Percentages</CardTitle>
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
                <CardTitle>Compact Numbers</CardTitle>
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
          <h2 className="text-3xl font-bold mb-6">Accessibility</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>Arabic Number utilities follow accessibility best practices:</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>Tabular Numerals:</strong> Uses tabular-nums for consistent width and
                alignment.
              </li>
              <li>
                <strong>Semantic HTML:</strong> Numbers are displayed in appropriate semantic
                elements.
              </li>
              <li>
                <strong>High Contrast:</strong> Default styling maintains proper contrast ratios.
              </li>
              <li>
                <strong>Screen Readers:</strong> Numbers are read correctly by screen readers in
                both formats.
              </li>
            </ul>
          </div>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">RTL Considerations</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>These utilities are built with RTL support in mind:</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>Automatic Locale Detection:</strong> Component auto-detects Arabic locale
                for proper formatting.
              </li>
              <li>
                <strong>Arabic-Indic Numerals:</strong> Full support for ٠١٢٣٤٥٦٧٨٩ numerals.
              </li>
              <li>
                <strong>Proper Separators:</strong> Uses locale-appropriate thousands separators
                and decimal points.
              </li>
              <li>
                <strong>Currency Symbols:</strong> Shows &quot;ر.س&quot; (Riyal symbol) in Arabic mode.
              </li>
              <li>
                <strong>Percentage Format:</strong> Percentage symbol position adapts to locale
                (٪٧٥ vs 75%).
              </li>
            </ul>
          </div>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Related Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/components/hijri-date"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Hijri Date</h3>
              <p className="text-sm text-muted-foreground">
                Display dual calendar dates with Arabic numerals.
              </p>
            </Link>
            <Link
              href="/components/badge"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Badge</h3>
              <p className="text-sm text-muted-foreground">
                Similar badge styling for numbers and labels.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
