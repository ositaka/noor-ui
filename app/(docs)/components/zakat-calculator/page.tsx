'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ZakatCalculator } from '@/components/ui/zakat-calculator'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Copy, Download, Printer, Share2 } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export default function ZakatCalculatorPage() {
  const { locale } = useDirection()
  const t = content[locale].zakatCalculatorComponent

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
            <li className="text-foreground font-medium">{t.breadcrumb.zakatCalculator}</li>
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
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.installation}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              {t.installation.copyComponent}
            </p>
            <CodeBlock
              language="bash"
              code={`# Copy the component file
cp components/ui/zakat-calculator.tsx your-project/components/ui/`}
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
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.examples}</h2>

          {/* With Default Values */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.examples.withDefaultValues}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.withDefaultValuesDesc}
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
            <h3 className="text-2xl font-semibold mb-4">{t.examples.arabicLocale}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.arabicLocaleDesc}
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
            <h3 className="text-2xl font-semibold mb-4">{t.examples.withCallback}</h3>
            <p className="text-muted-foreground mb-4">
              {t.examples.withCallbackDesc}
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
          <h2 className="text-3xl font-bold mb-6">{t.understanding.title}</h2>
          <div className="space-y-6 text-muted-foreground">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{t.understanding.whatIsZakat}</h3>
              <p>
                {t.understanding.whatIsZakatDesc}
              </p>

              <h3 className="text-lg font-semibold text-foreground">{t.understanding.nisabThreshold}</h3>
              <p>
                {t.understanding.nisabThresholdDesc}
              </p>
              <ul className="list-disc list-inside space-y-1 ms-4">
                <li>
                  <strong>{t.understanding.gold}</strong> {t.understanding.goldDesc}
                </li>
                <li>
                  <strong>{t.understanding.silver}</strong> {t.understanding.silverDesc}
                </li>
              </ul>
              <p className="text-sm">
                {t.understanding.nisabNote}
              </p>

              <h3 className="text-lg font-semibold text-foreground">{t.understanding.zakatableAssets}</h3>
              <p>{t.understanding.zakatableAssetsDesc}</p>
              <ul className="list-disc list-inside space-y-1 ms-4">
                <li>{t.understanding.cashAsset}</li>
                <li>{t.understanding.goldSilverAsset}</li>
                <li>{t.understanding.businessAsset}</li>
                <li>{t.understanding.investmentsAsset}</li>
                <li>{t.understanding.moneyOwedAsset}</li>
                <li>{t.understanding.otherAsset}</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground">{t.understanding.lunarYear}</h3>
              <p>
                {t.understanding.lunarYearDesc}
              </p>
            </Card>
          </div>
        </section>

        {/* Integration with Price APIs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.integration.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.integration.description}
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
            {t.integration.popularApis}
          </p>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.props}</h2>
          <PropsTable
            props={[
              {
                name: 'goldPricePerGram',
                type: 'number',
                default: '250',
                description: t.props.goldPricePerGram,
              },
              {
                name: 'silverPricePerGram',
                type: 'number',
                default: '3',
                description: t.props.silverPricePerGram,
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
                name: 'onCalculate',
                type: '(result: ZakatCalculationResult) => void',
                default: 'undefined',
                description: t.props.onCalculate,
              },
              {
                name: 'defaultValues',
                type: 'Partial<ZakatAssets>',
                default: 'undefined',
                description: t.props.defaultValues,
              },
              {
                name: 'className',
                type: 'string',
                default: 'undefined',
                description: t.props.className,
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
          <h2 className="text-3xl font-bold mb-6">{t.exportShare.title}</h2>
          <div className="space-y-4 text-muted-foreground mb-6">
            <p>
              {t.exportShare.description}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Copy className="h-5 w-5" />
                  {t.exportShare.copyToClipboard}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t.exportShare.copyToClipboardDesc}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  {t.exportShare.downloadAsText}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t.exportShare.downloadAsTextDesc}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Printer className="h-5 w-5" />
                  {t.exportShare.printCalculation}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t.exportShare.printCalculationDesc}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  {t.exportShare.exportAsJson}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t.exportShare.exportAsJsonDesc}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">{t.exportShare.exampleExport}</h3>
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
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.accessibility}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{t.accessibility.description}</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>{t.accessibility.semanticHtml}</strong> {t.accessibility.semanticHtmlDesc}
              </li>
              <li>
                <strong>{t.accessibility.keyboardNavigation}</strong> {t.accessibility.keyboardNavigationDesc}
              </li>
              <li>
                <strong>{t.accessibility.screenReaderSupport}</strong> {t.accessibility.screenReaderSupportDesc}
              </li>
              <li>
                <strong>{t.accessibility.visualFeedback}</strong> {t.accessibility.visualFeedbackDesc}
              </li>
              <li>
                <strong>{t.accessibility.clearInstructions}</strong> {t.accessibility.clearInstructionsDesc}
              </li>
              <li>
                <strong>{t.accessibility.inputValidation}</strong> {t.accessibility.inputValidationDesc}
              </li>
            </ul>
          </div>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{content[locale].componentDocs.rtl}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{t.rtl.description}</p>
            <ul className="list-disc list-inside space-y-2 ms-4">
              <li>
                <strong>{t.rtl.autoLayout}</strong> {t.rtl.autoLayoutDesc}
              </li>
              <li>
                <strong>{t.rtl.bilingualLabels}</strong> {t.rtl.bilingualLabelsDesc}
              </li>
              <li>
                <strong>{t.rtl.arabicIndicNumerals}</strong> {t.rtl.arabicIndicNumeralsDesc}
              </li>
              <li>
                <strong>{t.rtl.currencySymbol}</strong> {t.rtl.currencySymbolDesc}
              </li>
              <li>
                <strong>{t.rtl.inputAlignment}</strong> {t.rtl.inputAlignmentDesc}
              </li>
              <li>
                <strong>{t.rtl.logicalProperties}</strong> {t.rtl.logicalPropertiesDesc}
              </li>
            </ul>
          </div>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.relatedComponents.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/components/arabic-number"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">{t.relatedComponents.arabicNumber}</h3>
              <p className="text-sm text-muted-foreground">
                {t.relatedComponents.arabicNumberDesc}
              </p>
            </Link>
            <Link
              href="/components/form"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">{t.relatedComponents.form}</h3>
              <p className="text-sm text-muted-foreground">
                {t.relatedComponents.formDesc}
              </p>
            </Link>
            <Link
              href="/components/input"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">{t.relatedComponents.input}</h3>
              <p className="text-sm text-muted-foreground">
                {t.relatedComponents.inputDesc}
              </p>
            </Link>
            <Link
              href="/components/card"
              className="block p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">{t.relatedComponents.card}</h3>
              <p className="text-sm text-muted-foreground">
                {t.relatedComponents.cardDesc}
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
