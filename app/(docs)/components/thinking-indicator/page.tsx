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

const getThinkingIndicatorProps = (componentT: any): PropDefinition[] => [
  {
    name: 'variant',
    type: "'dots' | 'pulse' | 'wave' | 'typing'",
    default: "'dots'",
    required: false,
    description: componentT.props.variant,
  },
  {
    name: 'size',
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    required: false,
    description: componentT.props.size,
  },
  {
    name: 'message',
    type: 'string',
    required: false,
    description: componentT.props.message,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { ThinkingIndicator } from 'noorui-rtl'

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
  const { direction, locale } = useDirection()
  const t = content[locale] || content.en
  const thinkingIndicatorT = (content[locale]?.thinkingIndicatorComponent || content.en.thinkingIndicatorComponent) as any

  const thinkingIndicatorProps = getThinkingIndicatorProps(thinkingIndicatorT)

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
            <li className="text-foreground font-medium">{thinkingIndicatorT.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{thinkingIndicatorT.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {thinkingIndicatorT.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{thinkingIndicatorT.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="space-y-6 p-6">
                <ThinkingIndicator
                  variant="dots"
                  message={thinkingIndicatorT.labels.thinking}
                />
                <ThinkingIndicator
                  variant="pulse"
                  message={thinkingIndicatorT.labels.processing}
                />
                <ThinkingIndicator
                  variant="wave"
                  message={thinkingIndicatorT.labels.analyzing}
                />
                <ThinkingIndicator
                  variant="typing"
                  message={thinkingIndicatorT.labels.thinking}
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{thinkingIndicatorT.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{thinkingIndicatorT.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{thinkingIndicatorT.examples.title}</h2>

          <div className="space-y-8">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{thinkingIndicatorT.examples.dotsVariant}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{thinkingIndicatorT.examples.withCustomText}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <ThinkingIndicator variant="typing" message={thinkingIndicatorT.labels.thinking} />
                    <Separator />
                    <ThinkingIndicator variant="dots" message={thinkingIndicatorT.labels.processing} />
                    <Separator />
                    <ThinkingIndicator variant="wave" message={thinkingIndicatorT.labels.analyzing} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withMessageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.sizes}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.inContext}</h3>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.props}</h2>
          <PropsTable props={thinkingIndicatorProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{thinkingIndicatorT.accessibility.ariaLive}</h3>
                <p className="text-muted-foreground">
                  {thinkingIndicatorT.accessibility.ariaLiveDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{thinkingIndicatorT.accessibility.visualAnimation}</h3>
                <p className="text-muted-foreground">
                  {thinkingIndicatorT.accessibility.visualAnimationDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.rtlSupport}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {thinkingIndicatorT.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentPage.rtlDemo.ltr}</h4>
                  <div dir="ltr">
                    <ThinkingIndicator
                      variant="typing"
                      message={thinkingIndicatorT.labels.thinking}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentPage.rtlDemo.rtl}</h4>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{thinkingIndicatorT.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  {content[locale]?.chatMessageComponent?.title || content.en.chatMessageComponent.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {thinkingIndicatorT.related.chatMessage}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/prompt-input" className="font-medium hover:underline">
                  {content[locale]?.promptInputComponent?.title || content.en.promptInputComponent.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {thinkingIndicatorT.related.promptInput}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
