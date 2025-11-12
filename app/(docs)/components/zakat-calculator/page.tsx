'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ZakatCalculator } from '@/components/ui/zakat-calculator'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Copy, Download, Printer, Share2 } from 'lucide-react'

export default function ZakatCalculatorPage() {
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
            <li className="text-foreground font-medium">Zakat Calculator</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Zakat Calculator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A comprehensive calculator for determining Zakat obligations. Supports multiple asset
            types, real-time calculations, Nisab threshold checking, and full bilingual support.
            Perfect for Islamic finance applications and GCC market needs.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-2xl mx-auto">
                <ZakatCalculator
                  goldPricePerGram={250}
                  silverPricePerGram={3}
                  defaultValues={{
                    cash: 50000,
                    gold: 100,
                    silver: 0,
                    business: 20000,
                    investments: 30000,
                    other: 0,
                  }}
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
cp components/ui/zakat-calculator.tsx your-project/components/ui/`}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Dependencies: This component uses Card, Input, Label, Separator, Badge components and
              Arabic Number utilities.
            </p>
          </div>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Usage</h2>
          <CodeBlock
            language="tsx"
            code={`import { ZakatCalculator } from '@/components/ui/zakat-calculator'

export default function MyApp() {
  return (
    <ZakatCalculator
      goldPricePerGram={250}
      silverPricePerGram={3}
      onCalculate={(result) => {
        console.log('Zakat due:', result.zakatDue)
        console.log('Nisab reached:', result.isZakatApplicable)
      }}
    />
  )
}`}
          />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Examples</h2>

          {/* With Default Values */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">With Default Values</h3>
            <p className="text-muted-foreground mb-4">
              Pre-populate the calculator with initial asset values for user convenience.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="max-w-2xl mx-auto">
                  <ZakatCalculator
                    goldPricePerGram={250}
                    silverPricePerGram={3}
                    defaultValues={{
                      cash: 75000,
                      gold: 150,
                    }}
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<ZakatCalculator
  goldPricePerGram={250}
  silverPricePerGram={3}
  defaultValues={{
    cash: 75000,
    gold: 150,
  }}
/>`}
              />
            </div>
          </div>

          {/* Arabic Locale */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Arabic Locale with Arabic-Indic Numerals</h3>
            <p className="text-muted-foreground mb-4">
              Display the calculator in Arabic with Arabic-Indic numerals for full localization.
            </p>
            <ComponentShowcase>
              <ComponentShowcase.Demo>
                <div className="max-w-2xl mx-auto">
                  <ZakatCalculator
                    goldPricePerGram={250}
                    silverPricePerGram={3}
                    locale="ar"
                    useArabicNumerals
                    defaultValues={{
                      cash: 50000,
                      gold: 85,
                    }}
                  />
                </div>
              </ComponentShowcase.Demo>
            </ComponentShowcase>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`<ZakatCalculator
  goldPricePerGram={250}
  silverPricePerGram={3}
  locale="ar"
  useArabicNumerals
  defaultValues={{
    cash: 50000,
    gold: 85,
  }}
/>`}
              />
            </div>
          </div>

          {/* With Calculation Callback */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">With Calculation Callback</h3>
            <p className="text-muted-foreground mb-4">
              Receive calculation updates to integrate with your application logic.
            </p>
            <CodeBlock
              language="tsx"
              code={`const [zakatInfo, setZakatInfo] = useState(null)

<ZakatCalculator
  goldPricePerGram={250}
  silverPricePerGram={3}
  onCalculate={(result) => {
    setZakatInfo(result)

    // Send to analytics
    if (result.isZakatApplicable) {
      analytics.track('zakat_calculated', {
        amount: result.zakatDue,
        totalWealth: result.totalWealth
      })
    }

    // Save to database
    saveZakatCalculation({
      userId: currentUser.id,
      calculation: result,
      timestamp: new Date()
    })
  }}
/>

{zakatInfo?.isZakatApplicable && (
  <Button onClick={() => processPayment(zakatInfo.zakatDue)}>
    Pay Zakat Now
  </Button>
)}`}
            />
          </div>
        </section>

        {/* Understanding Zakat */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Understanding Zakat</h2>
          <div className="space-y-6 text-muted-foreground">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">What is Zakat?</h3>
              <p>
                Zakat is one of the Five Pillars of Islam and is an obligatory form of charity.
                It&apos;s a form of wealth purification where Muslims with sufficient means must donate
                2.5% of their qualifying wealth annually to those in need.
              </p>

              <h3 className="text-lg font-semibold text-foreground">Nisab Threshold</h3>
              <p>
                The Nisab is the minimum amount of wealth a Muslim must possess before Zakat becomes
                obligatory. It&apos;s calculated based on the value of:
              </p>
              <ul className="list-disc list-inside space-y-1 ms-4">
                <li>
                  <strong>Gold:</strong> 85 grams (approximately 3 ounces)
                </li>
                <li>
                  <strong>Silver:</strong> 595 grams (approximately 21 ounces)
                </li>
              </ul>
              <p className="text-sm">
                Most scholars recommend using the gold standard as it typically results in a higher
                Nisab threshold, benefiting those in need.
              </p>

              <h3 className="text-lg font-semibold text-foreground">Zakatable Assets</h3>
              <p>Zakat is due on the following types of wealth:</p>
              <ul className="list-disc list-inside space-y-1 ms-4">
                <li>Cash in hand and bank accounts</li>
                <li>Gold and silver (jewelry, coins, bars)</li>
                <li>Business assets and inventory</li>
                <li>Stocks, shares, and investments</li>
                <li>Money owed to you that you expect to receive</li>
                <li>Other liquid assets</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground">Lunar Year Requirement</h3>
              <p>
                For Zakat to be due, your wealth must remain above the Nisab threshold for one
                complete lunar year (Hawl). This calculator helps you determine your Zakat
                obligation at the current moment.
              </p>
            </Card>
          </div>
        </section>

        {/* Integration with Price APIs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Integration with Price APIs</h2>
          <p className="text-muted-foreground mb-6">
            For real-time gold and silver prices, integrate with commodity price APIs:
          </p>
          <CodeBlock
            language="tsx"
            code={`import { ZakatCalculator } from '@/components/ui/zakat-calculator'
import { useEffect, useState } from 'react'

export function SmartZakatCalculator() {
  const [prices, setPrices] = useState({
    gold: 250, // Default fallback
    silver: 3,
  })

  useEffect(() => {
    // Fetch current gold/silver prices
    async function fetchPrices() {
      try {
        const response = await fetch('/api/precious-metals/prices')
        const data = await response.json()

        // Convert to SAR per gram if needed
        setPrices({
          gold: data.gold.sar_per_gram,
          silver: data.silver.sar_per_gram,
        })
      } catch (error) {
        // Keep using defaults - API may not be available
      }
    }

    fetchPrices()
    // Update prices daily
    const interval = setInterval(fetchPrices, 24 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Current prices: Gold {prices.gold} SAR/g, Silver {prices.silver} SAR/g
        <br />
        <span className="text-xs">Last updated: {new Date().toLocaleDateString()}</span>
      </p>

      <ZakatCalculator
        goldPricePerGram={prices.gold}
        silverPricePerGram={prices.silver}
      />
    </div>
  )
}`}
          />
          <p className="text-sm text-muted-foreground mt-4">
            Popular APIs: GoldAPI, Metals-API, or your local financial data provider.
          </p>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Props</h2>
          <PropsTable
            props={[
              {
                name: 'goldPricePerGram',
                type: 'number',
                default: '250',
                description: 'Current gold price per gram in SAR.',
              },
              {
                name: 'silverPricePerGram',
                type: 'number',
                default: '3',
                description: 'Current silver price per gram in SAR.',
              },
              {
                name: 'useArabicNumerals',
                type: 'boolean',
                default: 'false',
                description: 'Display numbers using Arabic-Indic numerals (٠-٩).',
              },
              {
                name: 'locale',
                type: '"en" | "ar"',
                default: '"en"',
                description: 'Language locale for labels and formatting.',
              },
              {
                name: 'onCalculate',
                type: '(result: ZakatCalculationResult) => void',
                default: 'undefined',
                description: 'Callback fired when calculation updates.',
              },
              {
                name: 'defaultValues',
                type: 'Partial<ZakatAssets>',
                default: 'undefined',
                description: 'Initial values for asset fields.',
              },
              {
                name: 'className',
                type: 'string',
                default: 'undefined',
                description: 'Additional CSS classes for the wrapper.',
              },
            ]}
          />

          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-semibold">ZakatCalculationResult Type</h3>
            <CodeBlock
              language="typescript"
              code={`interface ZakatCalculationResult {
  /** Total wealth in SAR */
  totalWealth: number

  /** Nisab threshold in SAR */
  nisabThreshold: number

  /** Zakat amount due (2.5% of total wealth if applicable) */
  zakatDue: number

  /** Whether total wealth exceeds Nisab */
  isZakatApplicable: boolean

  /** Breakdown of all assets */
  breakdown: ZakatAssets
}`}
            />

            <h3 className="text-xl font-semibold mt-6">ZakatAssets Type</h3>
            <CodeBlock
              language="typescript"
              code={`interface ZakatAssets {
  /** Cash in hand and bank accounts (SAR) */
  cash: number

  /** Gold holdings (in grams) */
  gold: number

  /** Silver holdings (in grams) */
  silver: number

  /** Business assets and inventory (SAR) */
  business: number

  /** Investments like stocks and bonds (SAR) */
  investments: number

  /** Other zakatable assets (SAR) */
  other: number
}`}
            />
          </div>
        </section>

        {/* Export & Share Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Export & Share Features</h2>
          <div className="space-y-4 text-muted-foreground mb-6">
            <p>
              The Zakat Calculator includes built-in export and sharing features to help users
              save and share their calculations. All export options are available in the calculation
              result card.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Copy className="h-5 w-5" />
                  Copy to Clipboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Quickly copy the calculation summary as formatted text. Perfect for pasting
                  into messages, emails, or documents. Shows &quot;Copied!&quot; confirmation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download as Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Download the calculation as a .txt file with all asset details, total wealth,
                  and Zakat due amount. File is named with the current date.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Printer className="h-5 w-5" />
                  Print Calculation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Open a print-friendly view of the calculation. Includes all details in a
                  clean, formatted layout suitable for paper records.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Export as JSON
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Download structured data as JSON for developers or data import. Includes
                  assets, prices, calculation results, and timestamp.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Example Export Format</h3>
            <CodeBlock
              language="text"
              code={`Zakat Calculation
Date: November 7, 2025

Your Assets:
━━━━━━━━━━━━━━━━
• Cash: 50,000.00 SAR
• Gold: 100.00 grams (25,000.00 SAR)
• Silver: 0.00 grams (0.00 SAR)
• Business Assets: 75,000.00 SAR
• Investments: 30,000.00 SAR
• Other Assets: 0.00 SAR

Calculation Result:
━━━━━━━━━━━━━━━━
• Total Wealth: 180,000.00 SAR
• Nisab Threshold: 21,250.00 SAR
• Status: Zakat Due ✓

• Zakat Due (2.5%): 4,500.00 SAR`}
            />
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Accessibility</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>The Zakat Calculator follows accessibility best practices:</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>Semantic HTML:</strong> Proper form labels and input associations.
              </li>
              <li>
                <strong>Keyboard Navigation:</strong> Full keyboard support for all form fields.
              </li>
              <li>
                <strong>Screen Reader Support:</strong> Clear labels and ARIA attributes.
              </li>
              <li>
                <strong>Visual Feedback:</strong> Status badges and color coding for calculation
                results.
              </li>
              <li>
                <strong>Clear Instructions:</strong> Nisab information and guidance provided
                upfront.
              </li>
              <li>
                <strong>Input Validation:</strong> Number inputs with appropriate min/max/step
                values.
              </li>
            </ul>
          </div>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">RTL Considerations</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>This component is built with RTL-first principles:</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>Automatic Layout Adaptation:</strong> All spacing and alignment adapts to
                RTL direction.
              </li>
              <li>
                <strong>Bilingual Labels:</strong> Complete Arabic translations for all UI text.
              </li>
              <li>
                <strong>Arabic-Indic Numerals:</strong> Optional display of ٠١٢٣٤٥٦٧٨٩ numerals.
              </li>
              <li>
                <strong>Currency Symbol Position:</strong> &quot;ر.س&quot; displays correctly in RTL mode.
              </li>
              <li>
                <strong>Input Alignment:</strong> Currency and unit labels position correctly in
                both directions.
              </li>
              <li>
                <strong>Logical Properties:</strong> Uses ms-*, me-*, ps-*, pe-* for all spacing.
              </li>
            </ul>
          </div>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Related Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/components/arabic-number"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Arabic Number</h3>
              <p className="text-sm text-muted-foreground">
                Number formatting utilities used by this calculator.
              </p>
            </Link>
            <Link
              href="/components/form"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Form</h3>
              <p className="text-sm text-muted-foreground">
                Form validation and state management patterns.
              </p>
            </Link>
            <Link
              href="/components/input"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Input</h3>
              <p className="text-sm text-muted-foreground">
                Base input component used for asset fields.
              </p>
            </Link>
            <Link
              href="/components/card"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Card</h3>
              <p className="text-sm text-muted-foreground">
                Card components used for layout and grouping.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
