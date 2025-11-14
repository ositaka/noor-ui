'use client'

import * as React from 'react'
import Link from 'next/link'
import { TokenCounter } from '@/components/ui/token-counter'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const tokenCounterProps: PropDefinition[] = [
  {
    name: 'inputTokens',
    type: 'number',
    required: true,
    description: 'Number of input tokens used',
  },
  {
    name: 'outputTokens',
    type: 'number',
    required: true,
    description: 'Number of output tokens used',
  },
  {
    name: 'maxTokens',
    type: 'number',
    default: '4096',
    required: false,
    description: 'Maximum token limit for the model',
  },
  {
    name: 'inputCostPer1K',
    type: 'number',
    default: '0.03',
    required: false,
    description: 'Cost per 1K input tokens (USD)',
  },
  {
    name: 'outputCostPer1K',
    type: 'number',
    default: '0.06',
    required: false,
    description: 'Cost per 1K output tokens (USD)',
  },
  {
    name: 'showCost',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Show cost estimation',
  },
  {
    name: 'showBreakdown',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Show token breakdown',
  },
  {
    name: 'variant',
    type: "'default' | 'compact'",
    default: "'default'",
    required: false,
    description: 'Visual style variant',
  },
  {
    name: 'warningThreshold',
    type: 'number',
    default: '70',
    required: false,
    description: 'Warning threshold (percentage)',
  },
  {
    name: 'dangerThreshold',
    type: 'number',
    default: '90',
    required: false,
    description: 'Danger threshold (percentage)',
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether text direction is RTL',
  },
  {
    name: 'label',
    type: 'string',
    required: false,
    description: 'Label for the counter',
  },
  {
    name: 'labelAr',
    type: 'string',
    required: false,
    description: 'Label in Arabic',
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { TokenCounter } from '@/components/ui/token-counter'

<TokenCounter
  inputTokens={1250}
  outputTokens={850}
  maxTokens={4096}
/>`

const withCostCode = `<TokenCounter
  inputTokens={1250}
  outputTokens={850}
  maxTokens={4096}
  inputCostPer1K={0.03}
  outputCostPer1K={0.06}
  showCost={true}
/>`

const warningStatesCode = `// Safe state (< 70%)
<TokenCounter
  inputTokens={1000}
  outputTokens={500}
  maxTokens={4096}
/>

// Warning state (70-90%)
<TokenCounter
  inputTokens={2000}
  outputTokens={1200}
  maxTokens={4096}
/>

// Danger state (> 90%)
<TokenCounter
  inputTokens={3000}
  outputTokens={800}
  maxTokens={4096}
/>`

const compactCode = `<TokenCounter
  inputTokens={1250}
  outputTokens={850}
  maxTokens={4096}
  variant="compact"
/>`

const customThresholdsCode = `<TokenCounter
  inputTokens={2500}
  outputTokens={1000}
  maxTokens={4096}
  warningThreshold={50}
  dangerThreshold={75}
/>`

const rtlCode = `<TokenCounter
  inputTokens={1250}
  outputTokens={850}
  maxTokens={4096}
  isRTL={true}
  labelAr="استخدام الرموز"
/>`

export default function TokenCounterPage() {
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
            <li className="text-foreground font-medium">Token Counter</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Token Counter</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Display and track token usage with cost estimation for AI model interactions.
            Features progress bar, breakdown by input/output, and visual warnings when approaching limits.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-md">
                <TokenCounter
                  inputTokens={1250}
                  outputTokens={850}
                  maxTokens={4096}
                  inputCostPer1K={0.03}
                  outputCostPer1K={0.06}
                  label="Token Usage"
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
            {/* With Cost Estimation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Cost Estimation</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <TokenCounter
                      inputTokens={1250}
                      outputTokens={850}
                      maxTokens={4096}
                      inputCostPer1K={0.03}
                      outputCostPer1K={0.06}
                      showCost={true}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withCostCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Warning States */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Warning States</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Safe (&lt; 70%)</p>
                      <TokenCounter
                        inputTokens={1000}
                        outputTokens={500}
                        maxTokens={4096}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Warning (70-90%)</p>
                      <TokenCounter
                        inputTokens={2000}
                        outputTokens={1200}
                        maxTokens={4096}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Danger (&gt; 90%)</p>
                      <TokenCounter
                        inputTokens={3000}
                        outputTokens={800}
                        maxTokens={4096}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={warningStatesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Different Models */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Different Models with Pricing</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">GPT-4 (expensive)</p>
                      <TokenCounter
                        inputTokens={1500}
                        outputTokens={1000}
                        maxTokens={8000}
                        inputCostPer1K={0.03}
                        outputCostPer1K={0.06}
                        label="GPT-4 Token Usage"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">GPT-3.5 Turbo (affordable)</p>
                      <TokenCounter
                        inputTokens={1500}
                        outputTokens={1000}
                        maxTokens={4096}
                        inputCostPer1K={0.0015}
                        outputCostPer1K={0.002}
                        label="GPT-3.5 Token Usage"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compact Variant */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Compact Variant</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <TokenCounter
                      inputTokens={1250}
                      outputTokens={850}
                      maxTokens={4096}
                      variant="compact"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={compactCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Thresholds */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Thresholds</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Customize when warnings appear (50% warning, 75% danger):
                    </p>
                    <TokenCounter
                      inputTokens={2500}
                      outputTokens={1000}
                      maxTokens={4096}
                      warningThreshold={50}
                      dangerThreshold={75}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customThresholdsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Without Cost */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Without Cost Display</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <TokenCounter
                      inputTokens={1250}
                      outputTokens={850}
                      maxTokens={4096}
                      showCost={false}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={tokenCounterProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  The component includes descriptive labels and tooltips. Token counts and costs
                  are formatted with proper number formatting for screen readers.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Visual Indicators</h3>
                <p className="text-muted-foreground">
                  Multiple visual cues indicate status: progress bar color, warning badge, and
                  border color changes. This ensures warnings are visible even without relying
                  solely on color.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Tooltips</h3>
                <p className="text-muted-foreground">
                  Info icon provides context about tokens. Cost tooltip breaks down input/output
                  costs separately for transparency.
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
                The counter works seamlessly in RTL layouts. All text, numbers, and badges
                adapt to RTL direction. Use Arabic number formatting automatically.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <TokenCounter
                      inputTokens={1250}
                      outputTokens={850}
                      maxTokens={4096}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <TokenCounter
                      inputTokens={1250}
                      outputTokens={850}
                      maxTokens={4096}
                      isRTL
                      labelAr="استخدام الرموز"
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
                  Choose AI models with different token limits
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/parameter-slider" className="font-medium hover:underline">
                  Parameter Slider
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Adjust max tokens parameter
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  Chat Message
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Display messages that consume tokens
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
