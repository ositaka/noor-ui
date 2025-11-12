'use client'

import * as React from 'react'
import Link from 'next/link'
import { ParameterSlider, temperaturePresets } from '@/components/ui/parameter-slider'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'

const parameterSliderProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Parameter label',
  },
  {
    name: 'labelAr',
    type: 'string',
    required: false,
    description: 'Parameter label in Arabic',
  },
  {
    name: 'description',
    type: 'string',
    required: false,
    description: 'Parameter description/tooltip',
  },
  {
    name: 'descriptionAr',
    type: 'string',
    required: false,
    description: 'Parameter description in Arabic',
  },
  {
    name: 'value',
    type: 'number',
    required: true,
    description: 'Current value',
  },
  {
    name: 'onValueChange',
    type: '(value: number) => void',
    required: true,
    description: 'Callback when value changes',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    required: false,
    description: 'Minimum value',
  },
  {
    name: 'max',
    type: 'number',
    default: '1',
    required: false,
    description: 'Maximum value',
  },
  {
    name: 'step',
    type: 'number',
    default: '0.1',
    required: false,
    description: 'Step size',
  },
  {
    name: 'decimals',
    type: 'number',
    default: '1',
    required: false,
    description: 'Number of decimal places to display',
  },
  {
    name: 'presets',
    type: 'ParameterPreset[]',
    required: false,
    description: 'Preset values',
  },
  {
    name: 'showValue',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Show value display',
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether text direction is RTL',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes',
  },
]

const presetInterface = `interface ParameterPreset {
  label: string
  labelAr?: string
  value: number
  description?: string
  descriptionAr?: string
}`

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { ParameterSlider } from '@/components/ui/parameter-slider'

const [temperature, setTemperature] = React.useState(0.7)

<ParameterSlider
  label="Temperature"
  description="Controls randomness in responses"
  value={temperature}
  onValueChange={setTemperature}
  min={0}
  max={2}
  step={0.1}
/>`

const withPresetsCode = `import { ParameterSlider, temperaturePresets } from '@/components/ui/parameter-slider'

const [temperature, setTemperature] = React.useState(0.7)

<ParameterSlider
  label="Temperature"
  description="Controls randomness in responses"
  value={temperature}
  onValueChange={setTemperature}
  min={0}
  max={2}
  step={0.1}
  presets={temperaturePresets}
/>`

const customPresetsCode = `const maxTokensPresets = [
  { label: 'Short', value: 256, description: 'Brief responses' },
  { label: 'Medium', value: 1024, description: 'Standard responses' },
  { label: 'Long', value: 4096, description: 'Detailed responses' },
]

<ParameterSlider
  label="Max Tokens"
  description="Maximum length of response"
  value={maxTokens}
  onValueChange={setMaxTokens}
  min={1}
  max={4096}
  step={1}
  decimals={0}
  presets={maxTokensPresets}
/>`

const multipleParametersCode = `const [temperature, setTemperature] = React.useState(0.7)
const [topP, setTopP] = React.useState(0.9)
const [maxTokens, setMaxTokens] = React.useState(1024)

<div className="space-y-6">
  <ParameterSlider
    label="Temperature"
    description="Controls randomness"
    value={temperature}
    onValueChange={setTemperature}
    min={0}
    max={2}
    step={0.1}
    presets={temperaturePresets}
  />

  <ParameterSlider
    label="Top P"
    description="Controls diversity via nucleus sampling"
    value={topP}
    onValueChange={setTopP}
    min={0}
    max={1}
    step={0.05}
  />

  <ParameterSlider
    label="Max Tokens"
    description="Maximum length of response"
    value={maxTokens}
    onValueChange={setMaxTokens}
    min={1}
    max={4096}
    step={1}
    decimals={0}
  />
</div>`

const rtlCode = `<ParameterSlider
  label="Temperature"
  labelAr="درجة الحرارة"
  description="Controls randomness in responses"
  descriptionAr="يتحكم في العشوائية في الردود"
  value={temperature}
  onValueChange={setTemperature}
  min={0}
  max={2}
  step={0.1}
  isRTL={true}
/>`

export default function ParameterSliderPage() {
  const [temperature, setTemperature] = React.useState(0.7)
  const [topP, setTopP] = React.useState(0.9)
  const [maxTokens, setMaxTokens] = React.useState(1024)
  const [direction, setDirection] = React.useState<'ltr' | 'rtl'>('ltr')
  const isRTL = direction === 'rtl'

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
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
            <li className="text-foreground font-medium">Parameter Slider</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Parameter Slider</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Slider for adjusting AI model parameters (temperature, max tokens, top-p) with presets.
            Features tooltips, value display, and quick preset buttons for common configurations.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Controls
              showDirectionToggle
              showThemeToggle={false}
              onDirectionChange={setDirection}
            />
            <ComponentShowcase.Demo>
              <div className="max-w-md" dir={direction}>
                <ParameterSlider
                  label="Temperature"
                  labelAr="درجة الحرارة"
                  description="Controls randomness in the model's responses. Higher values make output more random."
                  descriptionAr="يتحكم في العشوائية في ردود النموذج. القيم الأعلى تجعل الناتج أكثر عشوائية."
                  value={temperature}
                  onValueChange={setTemperature}
                  min={0}
                  max={2}
                  step={0.1}
                  presets={temperaturePresets}
                  isRTL={isRTL}
                />
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
            {/* With Presets */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Presets</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <ParameterSlider
                      label="Temperature"
                      description="Controls randomness in the model's responses. Higher values make output more random."
                      value={temperature}
                      onValueChange={setTemperature}
                      min={0}
                      max={2}
                      step={0.1}
                      presets={temperaturePresets}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withPresetsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Presets */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Presets</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <ParameterSlider
                      label="Max Tokens"
                      description="Maximum length of response in tokens"
                      value={maxTokens}
                      onValueChange={setMaxTokens}
                      min={1}
                      max={4096}
                      step={1}
                      decimals={0}
                      presets={[
                        { label: 'Short', value: 256, description: 'Brief responses' },
                        { label: 'Medium', value: 1024, description: 'Standard responses' },
                        { label: 'Long', value: 4096, description: 'Detailed responses' },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customPresetsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Multiple Parameters */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Multiple Parameters</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-6">
                    <ParameterSlider
                      label="Temperature"
                      description="Controls randomness. Higher = more creative, lower = more focused."
                      value={temperature}
                      onValueChange={setTemperature}
                      min={0}
                      max={2}
                      step={0.1}
                      presets={temperaturePresets}
                    />

                    <ParameterSlider
                      label="Top P"
                      description="Controls diversity via nucleus sampling. Lower = more focused."
                      value={topP}
                      onValueChange={setTopP}
                      min={0}
                      max={1}
                      step={0.05}
                    />

                    <ParameterSlider
                      label="Max Tokens"
                      description="Maximum length of response in tokens."
                      value={maxTokens}
                      onValueChange={setMaxTokens}
                      min={1}
                      max={4096}
                      step={1}
                      decimals={0}
                    />

                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      <p>Current settings:</p>
                      <p>Temperature: {temperature}, Top P: {topP}, Max Tokens: {maxTokens}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={multipleParametersCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Without Presets */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Without Presets</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <ParameterSlider
                      label="Frequency Penalty"
                      description="Penalizes repeated tokens"
                      value={0}
                      onValueChange={() => {}}
                      min={-2}
                      max={2}
                      step={0.1}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ParameterPreset Interface */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">ParameterPreset Interface</h2>
          <CodeBlock code={presetInterface} language="typescript" title="TypeScript" />
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={parameterSliderProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  The slider includes proper labels and ARIA attributes. Tooltips provide additional
                  context for parameters and presets. Current value is announced when changed.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: Navigate to slider or preset buttons</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">←</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted">→</kbd>: Adjust value (on slider)</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: Select preset (on button)</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Home</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted">End</kbd>: Jump to min/max</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Visual Feedback</h3>
                <p className="text-muted-foreground">
                  Current value is displayed in a badge. Active preset is highlighted. Range labels
                  show min/max values for context.
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
                The slider works seamlessly in RTL layouts. Labels, tooltips, and presets all support
                Arabic translations via the <code className="bg-muted px-1 rounded">*Ar</code> props.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <ParameterSlider
                      label="Temperature"
                      description="Controls randomness"
                      value={0.7}
                      onValueChange={() => {}}
                      min={0}
                      max={2}
                      step={0.1}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <ParameterSlider
                      label="Temperature"
                      labelAr="درجة الحرارة"
                      description="Controls randomness"
                      descriptionAr="يتحكم في العشوائية"
                      value={0.7}
                      onValueChange={() => {}}
                      min={0}
                      max={2}
                      step={0.1}
                      isRTL
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/model-selector" className="font-medium hover:underline">
                  Model Selector
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose AI models
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/token-counter" className="font-medium hover:underline">
                  Token Counter
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Track token usage
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  Chat Message
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Display chat messages
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
