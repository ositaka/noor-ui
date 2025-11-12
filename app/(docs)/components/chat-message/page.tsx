'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChatMessage } from '@/components/ui/chat-message'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'

const chatMessageProps: PropDefinition[] = [
  {
    name: 'role',
    type: "'user' | 'assistant' | 'system'",
    required: true,
    description: 'The role/sender of the message',
  },
  {
    name: 'content',
    type: 'string',
    required: true,
    description: 'The message content (supports markdown)',
  },
  {
    name: 'variant',
    type: "'default' | 'compact'",
    default: "'default'",
    required: false,
    description: 'Visual style variant',
  },
  {
    name: 'state',
    type: "'complete' | 'streaming' | 'error'",
    default: "'complete'",
    required: false,
    description: 'Message state for animations and styling',
  },
  {
    name: 'timestamp',
    type: 'string',
    required: false,
    description: 'Optional timestamp to display',
  },
  {
    name: 'avatar',
    type: 'string',
    required: false,
    description: 'Optional avatar URL',
  },
  {
    name: 'name',
    type: 'string',
    required: false,
    description: 'Optional name/label for the sender',
  },
  {
    name: 'showCopy',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Show copy button',
  },
  {
    name: 'showRegenerate',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show regenerate button (assistant only)',
  },
  {
    name: 'onCopy',
    type: '() => void',
    required: false,
    description: 'Callback when copy is clicked',
  },
  {
    name: 'onRegenerate',
    type: '() => void',
    required: false,
    description: 'Callback when regenerate is clicked',
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether text direction is RTL',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { ChatMessage } from '@/components/ui/chat-message'

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
            <li className="text-foreground font-medium">Chat Message</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Chat Message</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Display chat messages from users, AI assistants, or system notifications.
            Perfect for building chat interfaces with full RTL support and customizable actions.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="space-y-4 max-w-2xl">
                <ChatMessage
                  role="user"
                  content="What's the capital of France?"
                  timestamp="2:29 PM"
                />
                <ChatMessage
                  role="assistant"
                  content="The capital of France is Paris. It's known as the City of Light and is famous for its art, culture, cuisine, and iconic landmarks like the Eiffel Tower."
                  timestamp="2:30 PM"
                  showCopy
                  showRegenerate
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
            {/* Message Roles */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Message Roles</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 max-w-2xl">
                    <ChatMessage
                      role="user"
                      content="What's the weather like today?"
                      timestamp="2:29 PM"
                    />
                    <ChatMessage
                      role="assistant"
                      content="I don't have access to real-time weather data, but I can help you find weather information!"
                      timestamp="2:30 PM"
                    />
                    <ChatMessage
                      role="system"
                      content="Chat session started. Messages are end-to-end encrypted."
                      timestamp="2:25 PM"
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
              <h3 className="text-lg font-semibold mb-4">With Actions</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 max-w-2xl">
                    <ChatMessage
                      role="assistant"
                      content="Here's the code you requested. Feel free to copy it or ask me to regenerate a different version."
                      timestamp="2:31 PM"
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
              <h3 className="text-lg font-semibold mb-4">Compact Variant</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3 max-w-2xl">
                    <ChatMessage
                      role="user"
                      content="Quick question"
                      variant="compact"
                    />
                    <ChatMessage
                      role="assistant"
                      content="Quick response"
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={chatMessageProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  The component uses semantic HTML with proper ARIA attributes. The role, timestamp,
                  and content are all announced correctly.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: Navigate through action buttons</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: Activate buttons (Copy, Regenerate)</li>
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
                Chat messages automatically adapt to RTL layout. User messages align to the end (right in RTL),
                and assistant messages to the start (left in RTL). Set <code className="bg-muted px-1 rounded">isRTL</code> prop for RTL-specific text.
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
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
