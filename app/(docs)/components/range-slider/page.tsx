'use client'

import * as React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { RangeSlider } from '@/components/ui/range-slider'
import { Label } from '@/components/ui/label'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getRangeSliderProps = (): PropDefinition[] => [
  {
    name: 'min',
    type: 'number',
    default: '0',
    required: false,
    description: 'Minimum value of the range',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    required: false,
    description: 'Maximum value of the range',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    required: false,
    description: 'Step increment for the slider',
  },
  {
    name: 'value',
    type: '[number, number]',
    default: 'undefined',
    required: false,
    description: 'Controlled range value [min, max]',
  },
  {
    name: 'defaultValue',
    type: '[number, number]',
    default: '[min, max]',
    required: false,
    description: 'Default range value [min, max]',
  },
  {
    name: 'onValueChange',
    type: '(value: [number, number]) => void',
    default: 'undefined',
    required: false,
    description: 'Callback when range value changes',
  },
  {
    name: 'formatLabel',
    type: '(value: number) => string',
    default: '(val) => val.toString()',
    required: false,
    description: 'Function to format value labels (e.g., for currency)',
  },
  {
    name: 'showLabels',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show current values above the slider thumbs',
  },
  {
    name: 'showMinMax',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show min/max labels below the slider',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disable the slider',
  },
  {
    name: 'dir',
    type: "'ltr' | 'rtl'",
    default: 'auto-detect',
    required: false,
    description: 'Force text direction (auto-detects from context)',
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { RangeSlider } from 'noorui-rtl'

<RangeSlider defaultValue={[25, 75]} />`

const priceRangeCode = `const [priceRange, setPriceRange] = React.useState<[number, number]>([100, 500])

return (
  <RangeSlider
    min={0}
    max={1000}
    step={10}
    value={priceRange}
    onValueChange={setPriceRange}
    formatLabel={(val) => \`$\${val}\`}
    showLabels
    showMinMax
  />
)`

const ageRangeCode = `const [ageRange, setAgeRange] = React.useState<[number, number]>([25, 45])

return (
  <div className="space-y-2">
    <Label>Age Range: {ageRange[0]} - {ageRange[1]} years</Label>
    <RangeSlider
      min={18}
      max={100}
      step={1}
      value={ageRange}
      onValueChange={setAgeRange}
      showMinMax
    />
  </div>
)`

const percentageRangeCode = `const [range, setRange] = React.useState<[number, number]>([20, 80])

return (
  <RangeSlider
    min={0}
    max={100}
    step={5}
    value={range}
    onValueChange={setRange}
    formatLabel={(val) => \`\${val}%\`}
    showLabels
  />
)`

export default function RangeSliderPage() {
  const { locale, direction } = useDirection()
  const t = content[locale]
  const c = t.rangeSliderComponent

  // Examples state
  const [priceRange, setPriceRange] = React.useState<[number, number]>([100, 500])
  const [ageRange, setAgeRange] = React.useState<[number, number]>([25, 45])
  const [percentageRange, setPercentageRange] = React.useState<[number, number]>([20, 80])

  // Helper to format range values for display
  const formatDisplayRange = (min: number, max: number, formatter?: (v: number) => string) => {
    const formatValue = formatter || ((v) => v.toString())
    // Simple format: always show min - max for consistency across languages
    return `${formatValue(min)} - ${formatValue(max)}`
  }

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.nav.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{c.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              {t.componentDocs.new}
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {c.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>

          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-md space-y-4">
                <Label>{c.labels.priceRange}: {formatDisplayRange(priceRange[0], priceRange[1], (v) => `$${v}`)}</Label>
                <RangeSlider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  showMinMax
                  formatLabel={(val) => `$${val}`}
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.basicUsage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.examples}</h2>

          <div className="space-y-12">
            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{c.examples.priceRange}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="w-full max-w-md">
                    <RangeSlider
                      min={0}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      formatLabel={(val) => `$${val}`}
                      showLabels
                      showMinMax
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={priceRangeCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Age Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{c.examples.ageRange}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="w-full max-w-md space-y-2">
                    <Label>{c.labels.ageRange}: {formatDisplayRange(ageRange[0], ageRange[1])} {c.labels.years}</Label>
                    <RangeSlider
                      min={18}
                      max={100}
                      step={1}
                      value={ageRange}
                      onValueChange={setAgeRange}
                      showMinMax
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={ageRangeCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Percentage Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{c.examples.percentageRange}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="w-full max-w-md">
                    <RangeSlider
                      min={0}
                      max={100}
                      step={5}
                      value={percentageRange}
                      onValueChange={setPercentageRange}
                      formatLabel={(val) => `${val}%`}
                      showLabels
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={percentageRangeCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={getRangeSliderProps()} />
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{c.features.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{c.features.rtlSupport}</h3>
                <p className="text-sm text-muted-foreground">
                  {c.features.rtlSupportDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{c.features.customFormatting}</h3>
                <p className="text-sm text-muted-foreground">
                  {c.features.customFormattingDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{c.features.flexibleLabels}</h3>
                <p className="text-sm text-muted-foreground">
                  {c.features.flexibleLabelsDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{c.features.accessible}</h3>
                <p className="text-sm text-muted-foreground">
                  {c.features.accessibleDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
