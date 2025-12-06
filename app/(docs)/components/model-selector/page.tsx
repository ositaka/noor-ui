'use client'

import * as React from 'react'
import Link from 'next/link'
import { ModelSelector, defaultModels, type AIModel } from '@/components/ui/model-selector'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'


const aiModelInterface = `interface AIModel {
  id: string
  name: string
  nameAr?: string
  provider: string
  providerAr?: string
  description: string
  descriptionAr?: string
  specs: {
    speed: 'fast' | 'medium' | 'slow'
    speedLabel?: string
    speedLabelAr?: string
    contextLength: number
    pricing?: string
    pricingAr?: string
  }
  recommended?: boolean
  icon?: 'zap' | 'brain' | 'sparkles' | 'bot'
}`

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { ModelSelector, defaultModels } from 'noorui-rtl'

<ModelSelector
  models={defaultModels}
  value={selectedModel}
  onValueChange={setSelectedModel}
/>`

const customModelsCode = `const customModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Most capable model',
    specs: {
      speed: 'medium',
      contextLength: 8000,
      pricing: '$0.03/1K tokens',
    },
    recommended: true,
    icon: 'brain',
  },
  // Add more models...
]

<ModelSelector
  models={customModels}
  value={selectedModel}
  onValueChange={setSelectedModel}
/>`

const controlledCode = `const [model, setModel] = React.useState('gpt-4')

<ModelSelector
  models={defaultModels}
  value={model}
  onValueChange={(value) => {
    setModel(value)
    console.log('Selected model:', value)
  }}
/>`

const rtlCode = `<ModelSelector
  models={defaultModels}
  value={selectedModel}
  onValueChange={setSelectedModel}
  isRTL={true}
  placeholderAr="اختر نموذج الذكاء الاصطناعي"
/>`

export default function ModelSelectorPage() {
  const [selectedModel, setSelectedModel] = React.useState('gpt-4')
  const { locale } = useDirection()
  const t = content[locale] || content.en
  const modelSelectorT = t.modelSelectorComponent as any

  const modelSelectorProps: PropDefinition[] = [
    {
      name: 'models',
      type: 'AIModel[]',
      required: true,
      description: modelSelectorT.props.models,
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: modelSelectorT.props.value,
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: modelSelectorT.props.onValueChange,
    },
    {
      name: 'isRTL',
      type: 'boolean',
      default: 'false',
      required: false,
      description: modelSelectorT.props.isRTL,
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: modelSelectorT.props.placeholder,
    },
    {
      name: 'placeholderAr',
      type: 'string',
      required: false,
      description: modelSelectorT.props.placeholderAr,
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: modelSelectorT.props.className,
    },
  ]

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {modelSelectorT.breadcrumb.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {modelSelectorT.breadcrumb.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{modelSelectorT.breadcrumb.modelSelector}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{modelSelectorT.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {modelSelectorT.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{modelSelectorT.sections.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-md w-full">
                <ModelSelector
                  models={defaultModels}
                  value={selectedModel}
                  onValueChange={setSelectedModel}
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  {modelSelectorT.preview.selected}: {selectedModel}
                </p>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{modelSelectorT.sections.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{modelSelectorT.sections.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{modelSelectorT.examples.title}</h2>

          <div className="space-y-8">
            {/* Default Models */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{modelSelectorT.examples.withDefaultModels}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {modelSelectorT.examples.defaultModelsDesc}
                    </p>
                    <ModelSelector
                      models={defaultModels}
                      value={selectedModel}
                      onValueChange={setSelectedModel}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Model Specs Display */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{modelSelectorT.examples.modelSpecs}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {modelSelectorT.examples.specsDesc}
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>{modelSelectorT.examples.specsList.nameProvider}</li>
                      <li>{modelSelectorT.examples.specsList.speed}</li>
                      <li>{modelSelectorT.examples.specsList.contextLength}</li>
                      <li>{modelSelectorT.examples.specsList.pricing}</li>
                      <li>{modelSelectorT.examples.specsList.recommended}</li>
                      <li>{modelSelectorT.examples.specsList.customIcon}</li>
                    </ul>
                    <div className="pt-2">
                      <ModelSelector
                        models={defaultModels}
                        value="claude-3-sonnet"
                        onValueChange={() => {}}
                        placeholder={modelSelectorT.examples.tryClicking}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Custom Models */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{modelSelectorT.examples.customModels}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {modelSelectorT.examples.customModelsDesc}
                    </p>
                    <ModelSelector
                      models={[
                        {
                          id: 'custom-model-1',
                          name: 'Custom Fast Model',
                          provider: 'Custom Provider',
                          description: 'A custom model',
                          specs: {
                            speed: 'fast' as const,
                            contextLength: 16000,
                            pricing: '$0.001/1K tokens',
                          },
                          recommended: true,
                          icon: 'zap' as const,
                        },
                        {
                          id: 'custom-model-2',
                          name: 'Custom Smart Model',
                          provider: 'Custom Provider',
                          description: 'Another custom model',
                          specs: {
                            speed: 'medium' as const,
                            contextLength: 100000,
                            pricing: '$0.01/1K tokens',
                          },
                          icon: 'brain' as const,
                        },
                      ]}
                      value="custom-model-1"
                      onValueChange={() => {}}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customModelsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Controlled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{modelSelectorT.examples.controlledComponent}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-4">
                    <ModelSelector
                      models={defaultModels}
                      value={selectedModel}
                      onValueChange={(value) => {
                        setSelectedModel(value)
                        console.log('Model changed to:', value)
                      }}
                    />
                    <div className="text-xs text-muted-foreground">
                      <p>{modelSelectorT.examples.currentSelection}: <code className="bg-muted px-1 rounded">{selectedModel}</code></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={controlledCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* AIModel Interface */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{modelSelectorT.sections.interface}</h2>
          <CodeBlock code={aiModelInterface} language="typescript" title="TypeScript" />
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{modelSelectorT.sections.props}</h2>
          <PropsTable props={modelSelectorProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{modelSelectorT.sections.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{modelSelectorT.accessibility.screenReader}</h3>
                <p className="text-muted-foreground">
                  {modelSelectorT.accessibility.screenReaderDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{modelSelectorT.accessibility.keyboardNav}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: {modelSelectorT.accessibility.keyEnterSpace}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">↑</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted">↓</kbd>: {modelSelectorT.accessibility.keyArrows}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: {modelSelectorT.accessibility.keyEnter}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Esc</kbd>: {modelSelectorT.accessibility.keyEsc}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{modelSelectorT.sections.related}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/parameter-slider" className="font-medium hover:underline">
                  {modelSelectorT.related.parameterSlider}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {modelSelectorT.related.parameterSliderDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/token-counter" className="font-medium hover:underline">
                  {modelSelectorT.related.tokenCounter}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {modelSelectorT.related.tokenCounterDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  {modelSelectorT.related.chatMessage}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {modelSelectorT.related.chatMessageDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
