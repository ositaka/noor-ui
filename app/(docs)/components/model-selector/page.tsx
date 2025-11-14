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

const modelSelectorProps: PropDefinition[] = [
  {
    name: 'models',
    type: 'AIModel[]',
    required: true,
    description: 'Array of available AI models',
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    description: 'Selected model ID',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    required: false,
    description: 'Callback when model changes',
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether text direction is RTL',
  },
  {
    name: 'placeholder',
    type: 'string',
    required: false,
    description: 'Placeholder text',
  },
  {
    name: 'placeholderAr',
    type: 'string',
    required: false,
    description: 'Placeholder text in Arabic',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes',
  },
]

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

const basicUsageCode = `import { ModelSelector, defaultModels } from '@/components/ui/model-selector'

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
            <li className="text-foreground font-medium">Model Selector</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Model Selector</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Dropdown selector for choosing AI models with specs display.
            Shows model capabilities including speed, context length, pricing, and recommendations.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-md w-full">
                <ModelSelector
                  models={defaultModels}
                  value={selectedModel}
                  onValueChange={setSelectedModel}
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  Selected: {selectedModel}
                </p>
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
            {/* Default Models */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Default Models</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Includes pre-configured models from OpenAI, Anthropic, and Google:
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
              <h3 className="text-lg font-semibold mb-4">Model Specifications</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Each model displays:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Model name and provider (grouped)</li>
                      <li>Speed indicator (fast/medium/slow) with color coding</li>
                      <li>Context length (in tokens)</li>
                      <li>Pricing (optional)</li>
                      <li>Recommended badge (optional)</li>
                      <li>Custom icon</li>
                    </ul>
                    <div className="pt-2">
                      <ModelSelector
                        models={defaultModels}
                        value="claude-3-sonnet"
                        onValueChange={() => {}}
                        placeholder="Try clicking to see specs"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Custom Models */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Models</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Define your own models with custom properties:
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
              <h3 className="text-lg font-semibold mb-4">Controlled Component</h3>
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
                      <p>Current selection: <code className="bg-muted px-1 rounded">{selectedModel}</code></p>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">AIModel Interface</h2>
          <CodeBlock code={aiModelInterface} language="typescript" title="TypeScript" />
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={modelSelectorProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  Built on Radix UI Select primitive with full ARIA support. Model names, specs,
                  and badges are all properly announced.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: Open dropdown</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">↑</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted">↓</kbd>: Navigate options</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: Select model</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Esc</kbd>: Close dropdown</li>
                </ul>
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
                The selector automatically uses RTL-specific labels when <code className="bg-muted px-1 rounded">isRTL</code> is true.
                All model properties support Arabic translations via <code className="bg-muted px-1 rounded">nameAr</code>,{' '}
                <code className="bg-muted px-1 rounded">providerAr</code>, etc.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <ModelSelector
                      models={defaultModels}
                      value="gpt-4"
                      onValueChange={() => {}}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <ModelSelector
                      models={defaultModels}
                      value="gpt-4"
                      onValueChange={() => {}}
                      isRTL
                      placeholderAr="اختر نموذج"
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
                <Link href="/components/parameter-slider" className="font-medium hover:underline">
                  Parameter Slider
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Adjust AI model parameters
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/token-counter" className="font-medium hover:underline">
                  Token Counter
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Track token usage and costs
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  Chat Message
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Display chat messages from AI
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
