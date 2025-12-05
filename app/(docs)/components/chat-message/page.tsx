/* eslint-disable jsx-a11y/aria-role */
'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChatMessage } from '@/components/ui/chat-message'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getChatMessageProps = (componentT: any): PropDefinition[] => [
  {
    name: 'role',
    type: "'user' | 'assistant' | 'system'",
    required: true,
    description: componentT.props.role,
  },
  {
    name: 'content',
    type: 'string',
    required: true,
    description: componentT.props.content,
  },
  {
    name: 'variant',
    type: "'default' | 'compact'",
    default: "'default'",
    required: false,
    description: componentT.props.variant,
  },
  {
    name: 'state',
    type: "'complete' | 'streaming' | 'error'",
    default: "'complete'",
    required: false,
    description: componentT.props.state,
  },
  {
    name: 'timestamp',
    type: 'string',
    required: false,
    description: componentT.props.timestamp,
  },
  {
    name: 'avatar',
    type: 'string',
    required: false,
    description: componentT.props.avatar,
  },
  {
    name: 'name',
    type: 'string',
    required: false,
    description: componentT.props.name,
  },
  {
    name: 'showCopy',
    type: 'boolean',
    default: 'true',
    required: false,
    description: componentT.props.showCopy,
  },
  {
    name: 'showRegenerate',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.showRegenerate,
  },
  {
    name: 'onCopy',
    type: '() => void',
    required: false,
    description: componentT.props.onCopy,
  },
  {
    name: 'onRegenerate',
    type: '() => void',
    required: false,
    description: componentT.props.onRegenerate,
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.isRTL,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { ChatMessage } from 'noorui-rtl'

<ChatMessage
  role="assistant"
  content="Hello! How can I help you today?"
  timestamp="2:30 PM"
/>`

const userMessageCode = `<ChatMessage
  role="user"
  content="What's the weather like today?"
  timestamp="2:29 PM"
/>`

const systemMessageCode = `<ChatMessage
  role="system"
  content="Chat session started. Messages are end-to-end encrypted."
  timestamp="2:25 PM"
/>`

const withActionsCode = `<ChatMessage
  role="assistant"
  content="Here's the code you requested..."
  timestamp="2:31 PM"
  showCopy={true}
  showRegenerate={true}
  onCopy={() => console.log('Copied!')}
  onRegenerate={() => console.log('Regenerating...')}
/>`

const compactCode = `<ChatMessage
  role="assistant"
  content="Quick response"
  variant="compact"
/>`

const rtlCode = `<ChatMessage
  role="assistant"
  content="مرحباً! كيف يمكنني مساعدتك اليوم؟"
  timestamp="٢:٣٠ م"
  isRTL={true}
/>`

export default function ChatMessagePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale] || content.en
  const chatMessageT = (content[locale]?.chatMessageComponent || content.en.chatMessageComponent) as any

  const chatMessageProps = getChatMessageProps(chatMessageT)

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
            <li className="text-foreground font-medium">{chatMessageT.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{chatMessageT.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {chatMessageT.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{chatMessageT.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="space-y-4 max-w-2xl">
                <ChatMessage
                  role="user"
                  content={t.chatMessageComponentPage.examples.capitalQuestion}
                  timestamp={t.chatMessageComponentPage.timestamps.time229pm}
                />
                <ChatMessage
                  role="assistant"
                  content={t.chatMessageComponentPage.examples.capitalAnswer}
                  timestamp={t.chatMessageComponentPage.timestamps.time230pm}
                  showCopy
                  showRegenerate
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{chatMessageT.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{chatMessageT.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{chatMessageT.examples.title}</h2>

          <div className="space-y-8">
            {/* Message Roles */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{chatMessageT.examples.messageRoles}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 max-w-2xl">
                    <ChatMessage
                      role="user"
                      content={t.chatMessageComponentPage.examples.weatherQuestion}
                      timestamp={t.chatMessageComponentPage.timestamps.time229pm}
                    />
                    <ChatMessage
                      role="assistant"
                      content={t.chatMessageComponentPage.examples.weatherAnswer}
                      timestamp={t.chatMessageComponentPage.timestamps.time230pm}
                    />
                    <ChatMessage
                      role="system"
                      content={t.chatMessageComponentPage.examples.sessionStarted}
                      timestamp={t.chatMessageComponentPage.timestamps.time225pm}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={userMessageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{chatMessageT.examples.withActions}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 max-w-2xl">
                    <ChatMessage
                      role="assistant"
                      content={t.chatMessageComponentPage.examples.codeResponse}
                      timestamp={t.chatMessageComponentPage.timestamps.time231pm}
                      showCopy
                      showRegenerate
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withActionsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Compact Variant */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{chatMessageT.examples.compactVariant}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3 max-w-2xl">
                    <ChatMessage
                      role="user"
                      content={t.chatMessageComponentPage.examples.quickQuestion}
                      variant="compact"
                    />
                    <ChatMessage
                      role="assistant"
                      content={t.chatMessageComponentPage.examples.quickResponse}
                      variant="compact"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={compactCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.props}</h2>
          <PropsTable props={chatMessageProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.componentPage.accessibility.screenReader}</h3>
                <p className="text-muted-foreground">
                  {chatMessageT.accessibility.screenReaderDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.componentPage.accessibility.keyboardNavigation}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {chatMessageT.accessibility.tabKey}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: {chatMessageT.accessibility.enterKey}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.rtl}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {chatMessageT.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <ChatMessage
                      role="assistant"
                      content="Hello! How can I help you today?"
                      timestamp="2:30 PM"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <ChatMessage
                      role="assistant"
                      content="مرحباً! كيف يمكنني مساعدتك اليوم؟"
                      timestamp="٢:٣٠ م"
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.relatedComponents}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/prompt-input" className="font-medium hover:underline">
                  Prompt Input
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Input component for sending chat messages
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
            <Card>
              <CardContent className="p-4">
                <Link href="/components/thinking-indicator" className="font-medium hover:underline">
                  Thinking Indicator
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Loading state for AI responses
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
