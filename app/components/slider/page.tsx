'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Volume2, VolumeX } from 'lucide-react'

const sliderProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number[]',
    default: '[0]',
    required: false,
    description: 'The controlled value of the slider (array of numbers)',
  },
  {
    name: 'defaultValue',
    type: 'number[]',
    default: '[0]',
    required: false,
    description: 'The default value (uncontrolled)',
  },
  {
    name: 'onValueChange',
    type: '(value: number[]) => void',
    default: 'undefined',
    required: false,
    description: 'Event handler called when the value changes',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    required: false,
    description: 'The minimum value',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    required: false,
    description: 'The maximum value',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    required: false,
    description: 'The step increment',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disables the slider',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    required: false,
    description: 'The orientation of the slider',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import { Slider } from '@/components/ui/slider'

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
  const [value, setValue] = React.useState([50])
  const [volume, setVolume] = React.useState([80])
  const [priceRange, setPriceRange] = React.useState([20, 80])
  const isMuted = volume[0] === 0

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RTL Design</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DirectionToggle />
          </div>
        </div>
      </header>

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
            <li className="text-foreground font-medium">Slider</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Slider</h1>
          <p className="text-xl text-muted-foreground">
            Select a value or range from a continuous or discrete scale. Perfect for volume
            controls, price ranges, and filters with full RTL support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-md">
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Label and Value Display</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="volume">Volume</Label>
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
              <h3 className="text-lg font-semibold mb-4">Different Ranges</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Temperature: {value[0]}°C</Label>
                    </div>
                    <Slider value={value} onValueChange={setValue} min={-10} max={40} step={1} />
                    <p className="text-xs text-muted-foreground">Range: -10°C to 40°C</p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={rangeCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Step Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Different Step Sizes</h3>
              <Card>
                <CardContent className="p-6 space-y-6">
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

                  <div className="space-y-2">
                    <Label>Quarters (step: 25)</Label>
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
              <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Enabled slider</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <Label>Disabled slider</Label>
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
              <h3 className="text-lg font-semibold mb-4">Volume Control</h3>
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
              <h3 className="text-lg font-semibold mb-4">Range Slider (Two Thumbs)</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Price Range</Label>
                      <span className="text-sm text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={1} />
                    <p className="text-xs text-muted-foreground">
                      Drag either handle to adjust the range
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={sliderProps} />
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Note: The <code className="bg-muted px-1 rounded">value</code> prop is always an
                array. Use <code className="bg-muted px-1 rounded">[value]</code> for single thumb
                sliders and <code className="bg-muted px-1 rounded">[min, max]</code> for range
                sliders.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: Move focus to/from
                    slider
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Right/Up</kbd>: Increase
                    value
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Left/Down</kbd>: Decrease
                    value
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Home</kbd>: Jump to minimum
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">End</kbd>: Jump to maximum
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Page Up/Down</kbd>: Increase/decrease by larger step
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Labels and ARIA</h3>
                <p className="text-muted-foreground">
                  Always provide a label using the{' '}
                  <code className="bg-muted px-1 rounded">htmlFor</code> and{' '}
                  <code className="bg-muted px-1 rounded">id</code> attributes, or use{' '}
                  <code className="bg-muted px-1 rounded">aria-label</code> for sliders without
                  visible labels.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Readers</h3>
                <p className="text-muted-foreground">
                  Screen readers announce the slider role, current value, min, max, and
                  orientation. For example: &quot;Volume, slider, 50, minimum 0, maximum
                  100&quot;.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Value Display</h3>
                <p className="text-muted-foreground">
                  Always display the current value visually, as it&apos;s announced by screen
                  readers but may not be obvious to sighted users.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Considerations</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Sliders automatically support RTL layout. In RTL mode, the slider direction is
                mirrored - minimum starts on the right and maximum on the left.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <div className="space-y-2 p-4 border rounded-lg">
                      <Label>Volume</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                      <p className="text-xs text-muted-foreground">Min (left) → Max (right)</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <div className="space-y-2 p-4 border rounded-lg">
                      <Label>مستوى الصوت</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                      <p className="text-xs text-muted-foreground">
                        الحد الأدنى (يمين) ← الحد الأقصى (يسار)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Input</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    For numeric input with text
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/progress">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Progress</h3>
                  <p className="text-sm text-muted-foreground mt-1">Display progress value</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Label</h3>
                  <p className="text-sm text-muted-foreground mt-1">Labels for form inputs</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
