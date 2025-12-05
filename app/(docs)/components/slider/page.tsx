'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Volume2, VolumeX } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getSliderProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'value',
    type: 'number[]',
    default: '[0]',
    required: false,
    description: t.sliderComponent.props.value,
  },
  {
    name: 'defaultValue',
    type: 'number[]',
    default: '[0]',
    required: false,
    description: t.sliderComponent.props.defaultValue,
  },
  {
    name: 'onValueChange',
    type: '(value: number[]) => void',
    default: 'undefined',
    required: false,
    description: t.sliderComponent.props.onValueChange,
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    required: false,
    description: t.sliderComponent.props.min,
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    required: false,
    description: t.sliderComponent.props.max,
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    required: false,
    description: t.sliderComponent.props.step,
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.sliderComponent.props.disabled,
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    required: false,
    description: t.sliderComponent.props.orientation,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Slider } from 'noorui-rtl'

<Slider defaultValue={[50]} max={100} step={1} />`

const withLabelCode = `<div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label htmlFor="volume">Volume</Label>
    <span className="text-sm text-muted-foreground">50%</span>
  </div>
  <Slider id="volume" defaultValue={[50]} max={100} step={1} />
</div>`

const rangeCode = `const [value, setValue] = React.useState([50])

return (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <Label>Temperature: {value[0]}°C</Label>
    </div>
    <Slider
      value={value}
      onValueChange={setValue}
      min={-10}
      max={40}
      step={1}
    />
  </div>
)`

const steppedCode = `<div className="space-y-6">
  <div className="space-y-2">
    <Label>Fine control (step: 1)</Label>
    <Slider defaultValue={[50]} max={100} step={1} />
  </div>

  <div className="space-y-2">
    <Label>Medium control (step: 5)</Label>
    <Slider defaultValue={[50]} max={100} step={5} />
  </div>

  <div className="space-y-2">
    <Label>Coarse control (step: 10)</Label>
    <Slider defaultValue={[50]} max={100} step={10} />
  </div>
</div>`

const disabledCode = `<div className="space-y-4">
  <div className="space-y-2">
    <Label>Enabled slider</Label>
    <Slider defaultValue={[50]} max={100} step={1} />
  </div>

  <div className="space-y-2">
    <Label>Disabled slider</Label>
    <Slider defaultValue={[75]} max={100} step={1} disabled />
  </div>
</div>`

const volumeControlCode = `const [volume, setVolume] = React.useState([80])
const isMuted = volume[0] === 0

return (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setVolume(isMuted ? [80] : [0])}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      <Slider
        value={volume}
        onValueChange={setVolume}
        max={100}
        step={1}
        className="flex-1"
      />
      <span className="text-sm text-muted-foreground w-12 text-end">
        {volume[0]}%
      </span>
    </div>
  </div>
)`

const priceRangeCode = `const [priceRange, setPriceRange] = React.useState([20, 80])

return (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Label>Price Range</Label>
      <span className="text-sm text-muted-foreground">
        \${priceRange[0]} - \${priceRange[1]}
      </span>
    </div>
    <Slider
      value={priceRange}
      onValueChange={setPriceRange}
      min={0}
      max={100}
      step={1}
      minStepsBetweenThumbs={10}
    />
  </div>
)`

const rtlCode = `// RTL support is automatic!
// Slider direction mirrors for RTL languages

<div className="space-y-2">
  <Label htmlFor="rtl-slider">مستوى الصوت</Label>
  <Slider id="rtl-slider" defaultValue={[50]} max={100} step={1} />
</div>`

export default function SliderPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const sliderProps = getSliderProps(t)

  const [value, setValue] = React.useState([50])
  const [volume, setVolume] = React.useState([80])
  const [priceRange, setPriceRange] = React.useState([20, 80])
  const isMuted = volume[0] === 0

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.sliderComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.sliderComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.sliderComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sliderComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-lg">
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sliderComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sliderComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sliderComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.sliderComponent.examples.withLabel}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="volume">{t.sliderComponent.labels.volume}</Label>
                      <span className="text-sm text-muted-foreground">50%</span>
                    </div>
                    <Slider id="volume" defaultValue={[50]} max={100} step={1} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Different Ranges */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.sliderComponent.examples.differentRanges}</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>{t.sliderComponent.labels.temperature}: {value[0]}°C</Label>
                    </div>
                    <Slider value={value} onValueChange={setValue} min={-10} max={40} step={1} />
                    <p className="text-xs text-muted-foreground">{t.sliderComponent.descriptions.rangeInfo}</p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={rangeCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Step Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.sliderComponent.examples.differentStepSizes}</h3>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label>{t.sliderComponent.labels.fineControl}</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.sliderComponent.labels.mediumControl}</Label>
                    <Slider defaultValue={[50]} max={100} step={5} />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.sliderComponent.labels.coarseControl}</Label>
                    <Slider defaultValue={[50]} max={100} step={10} />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.sliderComponent.labels.quarters}</Label>
                    <Slider defaultValue={[50]} max={100} step={25} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={steppedCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled State */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.sliderComponent.examples.disabledState}</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>{t.sliderComponent.labels.enabled}</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.sliderComponent.labels.disabled}</Label>
                    <Slider defaultValue={[75]} max={100} step={1} disabled />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Volume Control */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.sliderComponent.examples.volumeControl}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setVolume(isMuted ? [80] : [0])}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground w-12 text-end">
                        {volume[0]}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={volumeControlCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Range Slider */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.sliderComponent.examples.rangeTwoThumbs}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>{t.sliderComponent.labels.priceRange}</Label>
                      <span className="text-sm text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={1} />
                    <p className="text-xs text-muted-foreground">
                      {t.sliderComponent.descriptions.dragToAdjust}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={priceRangeCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sliderComponent.props.title}</h2>
          <PropsTable props={sliderProps} />
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                {t.sliderComponent.descriptions.noteValue} <code className="bg-muted px-1 rounded">{t.sliderComponent.descriptions.valueCode}</code> {t.sliderComponent.descriptions.propAlwaysArray}{' '}
                <code className="bg-muted px-1 rounded">{t.sliderComponent.descriptions.valueArray}</code> {t.sliderComponent.descriptions.forSingle}{' '}
                <code className="bg-muted px-1 rounded">{t.sliderComponent.descriptions.minMaxArray}</code> {t.sliderComponent.descriptions.forRange}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sliderComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.sliderComponent.accessibility.keyboardNavigation}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {t.sliderComponent.accessibility.keyboardTab}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Right/Up</kbd>: {t.sliderComponent.accessibility.keyboardArrowRightUp}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Left/Down</kbd>: {t.sliderComponent.accessibility.keyboardArrowLeftDown}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Home</kbd>: {t.sliderComponent.accessibility.keyboardHome}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">End</kbd>: {t.sliderComponent.accessibility.keyboardEnd}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Page Up/Down</kbd>: {t.sliderComponent.accessibility.keyboardPageUpDown}
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.sliderComponent.accessibility.labelsAndAria}</h3>
                <p className="text-muted-foreground">
                  {t.sliderComponent.accessibility.labelsAndAriaDesc}{' '}
                  <code className="bg-muted px-1 rounded">{t.sliderComponent.accessibility.htmlForAttr}</code> {t.sliderComponent.accessibility.andText}{' '}
                  <code className="bg-muted px-1 rounded">{t.sliderComponent.accessibility.idAttr}</code> {t.sliderComponent.accessibility.attributesOr}{' '}
                  <code className="bg-muted px-1 rounded">{t.sliderComponent.accessibility.ariaLabelAttr}</code> {t.sliderComponent.accessibility.forSlidersWithout}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.sliderComponent.accessibility.screenReaders}</h3>
                <p className="text-muted-foreground">
                  {t.sliderComponent.accessibility.screenReadersDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.sliderComponent.accessibility.valueDisplay}</h3>
                <p className="text-muted-foreground">
                  {t.sliderComponent.accessibility.valueDisplayDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sliderComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.sliderComponent.related.input}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.sliderComponent.related.inputDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/progress">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.sliderComponent.related.progress}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.sliderComponent.related.progressDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.sliderComponent.related.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.sliderComponent.related.labelDesc}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
