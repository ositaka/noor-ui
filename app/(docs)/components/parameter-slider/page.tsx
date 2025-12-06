'use client'

import * as React from 'react'
import Link from 'next/link'
import { ParameterSlider, temperaturePresets } from '@/components/ui/parameter-slider'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getParameterSliderProps = (componentT: any): PropDefinition[] => [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: componentT.props.label,
  },
  {
    name: 'labelAr',
    type: 'string',
    required: false,
    description: componentT.props.labelAr,
  },
  {
    name: 'description',
    type: 'string',
    required: false,
    description: componentT.props.description,
  },
  {
    name: 'descriptionAr',
    type: 'string',
    required: false,
    description: componentT.props.descriptionAr,
  },
  {
    name: 'value',
    type: 'number',
    required: true,
    description: componentT.props.value,
  },
  {
    name: 'onValueChange',
    type: '(value: number) => void',
    required: true,
    description: componentT.props.onValueChange,
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    required: false,
    description: componentT.props.min,
  },
  {
    name: 'max',
    type: 'number',
    default: '1',
    required: false,
    description: componentT.props.max,
  },
  {
    name: 'step',
    type: 'number',
    default: '0.1',
    required: false,
    description: componentT.props.step,
  },
  {
    name: 'decimals',
    type: 'number',
    default: '1',
    required: false,
    description: componentT.props.decimals,
  },
  {
    name: 'presets',
    type: 'ParameterPreset[]',
    required: false,
    description: componentT.props.presets,
  },
  {
    name: 'showValue',
    type: 'boolean',
    default: 'true',
    required: false,
    description: componentT.props.showValue,
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.isRTL,
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: componentT.props.className,
  },
]

const presetInterface = `interface ParameterPreset {
  label: string
  labelAr?: string
  value: number
  description?: string
  descriptionAr?: string
}`

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { ParameterSlider } from 'noorui-rtl'

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

const withPresetsCode = `import { ParameterSlider, temperaturePresets } from 'noorui-rtl'

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
  const { direction, locale } = useDirection()
  const t = content[locale] || content.en
  const parameterSliderT = (content[locale]?.parameterSliderComponent || content.en.parameterSliderComponent) as any

  const [temperature, setTemperature] = React.useState(0.7)
  const [topP, setTopP] = React.useState(0.9)
  const [maxTokens, setMaxTokens] = React.useState(1024)

  const parameterSliderProps = getParameterSliderProps(parameterSliderT)

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
            <li className="text-foreground font-medium">{parameterSliderT.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{parameterSliderT.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {parameterSliderT.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{parameterSliderT.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-md">
                <ParameterSlider
                  label={content.en.parameterSliderComponent.parameters.temperature.label}
                  labelAr={content.ar.parameterSliderComponent.parameters.temperature.label}
                  description={content.en.parameterSliderComponent.parameters.temperature.description}
                  descriptionAr={content.ar.parameterSliderComponent.parameters.temperature.description}
                  value={temperature}
                  onValueChange={setTemperature}
                  min={0}
                  max={2}
                  step={0.1}
                  presets={temperaturePresets}
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{parameterSliderT.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{parameterSliderT.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{parameterSliderT.examples.title}</h2>

          <div className="space-y-8">
            {/* With Presets */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.withPresets || 'With Presets'}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <ParameterSlider
                      label={content.en.parameterSliderComponent.parameters.temperature.label}
                      labelAr={content.ar.parameterSliderComponent.parameters.temperature.label}
                      description={content.en.parameterSliderComponent.parameters.temperature.description}
                      descriptionAr={content.ar.parameterSliderComponent.parameters.temperature.description}
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
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.customPresets || 'Custom Presets'}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <ParameterSlider
                      label={content.en.parameterSliderComponent.parameters.maxTokens.label}
                      labelAr={content.ar.parameterSliderComponent.parameters.maxTokens.label}
                      description={content.en.parameterSliderComponent.parameters.maxTokens.description}
                      descriptionAr={content.ar.parameterSliderComponent.parameters.maxTokens.description}
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
              <h3 className="text-lg font-semibold mb-4">{parameterSliderT.examples.maxTokens || 'Multiple Parameters'}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-6">
                    <ParameterSlider
                      label={content.en.parameterSliderComponent.parameters.temperature.label}
                      labelAr={content.ar.parameterSliderComponent.parameters.temperature.label}
                      description={content.en.parameterSliderComponent.parameters.temperature.description}
                      descriptionAr={content.ar.parameterSliderComponent.parameters.temperature.description}
                      value={temperature}
                      onValueChange={setTemperature}
                      min={0}
                      max={2}
                      step={0.1}
                      presets={temperaturePresets}
                    />

                    <ParameterSlider
                      label={content.en.parameterSliderComponent.parameters.topP.label}
                      labelAr={content.ar.parameterSliderComponent.parameters.topP.label}
                      description={content.en.parameterSliderComponent.parameters.topP.description}
                      descriptionAr={content.ar.parameterSliderComponent.parameters.topP.description}
                      value={topP}
                      onValueChange={setTopP}
                      min={0}
                      max={1}
                      step={0.05}
                    />

                    <ParameterSlider
                      label={content.en.parameterSliderComponent.parameters.maxTokens.label}
                      labelAr={content.ar.parameterSliderComponent.parameters.maxTokens.label}
                      description={content.en.parameterSliderComponent.parameters.maxTokens.description}
                      descriptionAr={content.ar.parameterSliderComponent.parameters.maxTokens.description}
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
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.withoutPresets || 'Without Presets'}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <ParameterSlider
                      label={content.en.parameterSliderComponent.parameters.frequencyPenalty.label}
                      labelAr={content.ar.parameterSliderComponent.parameters.frequencyPenalty.label}
                      description={content.en.parameterSliderComponent.parameters.frequencyPenalty.description}
                      descriptionAr={content.ar.parameterSliderComponent.parameters.frequencyPenalty.description}
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.typeDefinitions}</h2>
          <CodeBlock code={presetInterface} language="typescript" title="TypeScript" />
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.props}</h2>
          <PropsTable props={parameterSliderProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{parameterSliderT.accessibility.sliderControl}</h3>
                <p className="text-muted-foreground">
                  {parameterSliderT.accessibility.sliderControlDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{parameterSliderT.accessibility.valueDisplay}</h3>
                <p className="text-muted-foreground">
                  {parameterSliderT.accessibility.valueDisplayDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{parameterSliderT.accessibility.descriptions}</h3>
                <p className="text-muted-foreground">
                  {parameterSliderT.accessibility.descriptionsDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{parameterSliderT.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/model-selector" className="font-medium hover:underline">
                  {content[locale]?.modelSelectorComponent?.title || content.en.modelSelectorComponent.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {parameterSliderT.related.modelSelector}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/token-counter" className="font-medium hover:underline">
                  {content[locale]?.tokenCounterComponent?.title || content.en.tokenCounterComponent.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {parameterSliderT.related.tokenCounter}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  {content[locale]?.chatMessageComponent?.title || content.en.chatMessageComponent.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {parameterSliderT.related.chatMessage}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
