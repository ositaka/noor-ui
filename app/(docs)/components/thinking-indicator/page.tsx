'use client'

import * as React from 'react'
import Link from 'next/link'
import { ThinkingIndicator } from '@/components/ui/thinking-indicator'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const thinkingIndicatorProps: PropDefinition[] = [
  {
    name: 'variant',
    type: "'dots' | 'pulse' | 'wave' | 'typing'",
    default: "'dots'",
    required: false,
    description: 'Visual style variant of the animation',
  },
  {
    name: 'size',
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    required: false,
    description: 'Size of the indicator',
  },
  {
    name: 'message',
    type: 'string',
    required: false,
    description: 'Custom message to display (overrides default from i18n)',
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { ThinkingIndicator } from '@/components/ui/thinking-indicator'

<ThinkingIndicator variant="dots" />`

const withMessageCode = `<ThinkingIndicator
  variant="typing"
  message="AI is thinking..."
/>`

const variantsCode = `<div className="space-y-4">
  <ThinkingIndicator variant="dots" message="Dots animation" />
  <ThinkingIndicator variant="pulse" message="Pulse animation" />
  <ThinkingIndicator variant="wave" message="Wave animation" />
  <ThinkingIndicator variant="typing" message="Typing animation" />
</div>`

const sizesCode = `<div className="space-y-4">
  <ThinkingIndicator size="sm" message="Small" />
  <ThinkingIndicator size="default" message="Default" />
  <ThinkingIndicator size="lg" message="Large" />
</div>`

const rtlCode = `// RTL is automatically handled by the DirectionProvider
// The message is translated based on the current locale

<ThinkingIndicator variant="typing" />`

export default function ThinkingIndicatorPage() {
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
            <li className="text-foreground font-medium">Thinking Indicator</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Thinking Indicator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Loading indicator for AI responses with multiple variants (typing, pulse, dots).
            Perfect for showing loading states in chat interfaces with smooth animations.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="space-y-6 p-6">
                <ThinkingIndicator
                  variant="dots"
                  message="Thinking"
                />
                <ThinkingIndicator
                  variant="pulse"
                  message="Processing"
                />
                <ThinkingIndicator
                  variant="wave"
                  message="Analyzing"
                />
                <ThinkingIndicator
                  variant="typing"
                  message="AI is responding"
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
            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Animation Variants</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <ThinkingIndicator variant="dots" />
                      <span className="text-sm text-muted-foreground">Dots (bouncing)</span>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <ThinkingIndicator variant="pulse" />
                      <span className="text-sm text-muted-foreground">Pulse (fading)</span>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <ThinkingIndicator variant="wave" />
                      <span className="text-sm text-muted-foreground">Wave (flowing)</span>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <ThinkingIndicator variant="typing" />
                      <span className="text-sm text-muted-foreground">Typing (bubble)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={variantsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Message */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Custom Message</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <ThinkingIndicator variant="typing" message="AI is thinking..." />
                    <Separator />
                    <ThinkingIndicator variant="dots" message="Processing your request" />
                    <Separator />
                    <ThinkingIndicator variant="wave" message="Analyzing data" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withMessageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sizes</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <ThinkingIndicator size="sm" message="Small size" />
                    <Separator />
                    <ThinkingIndicator size="default" message="Default size" />
                    <Separator />
                    <ThinkingIndicator size="lg" message="Large size" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sizesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* In Chat Context */}
            <div>
              <h3 className="text-lg font-semibold mb-4">In Chat Context</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        AI
                      </div>
                      <div className="flex-1">
                        <ThinkingIndicator variant="typing" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={thinkingIndicatorProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  The component includes proper ARIA attributes with <code className="bg-muted px-1 rounded">role=&quot;status&quot;</code> and{' '}
                  <code className="bg-muted px-1 rounded">aria-live=&quot;polite&quot;</code> to announce loading states
                  to screen readers without interrupting other content.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Animation Safety</h3>
                <p className="text-muted-foreground">
                  All animations respect the user&apos;s motion preferences. Animations are subtle and don&apos;t
                  flash rapidly, making them safe for users with motion sensitivity.
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
                The indicator works seamlessly in RTL layouts. The message is automatically translated
                based on the current locale from the DirectionProvider and i18n system.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <ThinkingIndicator
                      variant="typing"
                      message="AI is thinking..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <ThinkingIndicator
                      variant="typing"
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
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  Chat Message
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Display chat messages from users and AI
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/prompt-input" className="font-medium hover:underline">
                  Prompt Input
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Input component for sending messages
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/message-actions" className="font-medium hover:underline">
                  Message Actions
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Action buttons for chat messages
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
