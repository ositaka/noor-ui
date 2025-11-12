'use client'

import * as React from 'react'
import Link from 'next/link'
import { PromptInput } from '@/components/ui/prompt-input'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'

const promptInputProps: PropDefinition[] = [
  {
    name: 'onSend',
    type: '(value: string) => void',
    required: false,
    description: 'Callback when send button is clicked or Enter is pressed',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether the input is in loading state',
  },
  {
    name: 'showAttachment',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show file attachment button',
  },
  {
    name: 'showVoice',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show voice input button',
  },
  {
    name: 'showCounter',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show character/token counter',
  },
  {
    name: 'maxLength',
    type: 'number',
    required: false,
    description: 'Maximum characters allowed',
  },
  {
    name: 'onAttachment',
    type: '() => void',
    required: false,
    description: 'Callback when attachment button is clicked',
  },
  {
    name: 'onVoice',
    type: '() => void',
    required: false,
    description: 'Callback when voice button is clicked',
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
    name: 'value',
    type: 'string',
    required: false,
    description: 'Controlled value',
  },
  {
    name: 'onChange',
    type: '(e: React.ChangeEvent<HTMLTextAreaElement>) => void',
    required: false,
    description: 'Change handler for controlled component',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { PromptInput } from '@/components/ui/prompt-input'

<PromptInput
  onSend={(value) => console.log('Sent:', value)}
  placeholder="Type your message..."
/>`

const withFeaturesCode = `<PromptInput
  onSend={(value) => console.log('Sent:', value)}
  showAttachment
  showVoice
  showCounter
  maxLength={500}
  onAttachment={() => console.log('Attach file')}
  onVoice={() => console.log('Start voice input')}
/>`

const loadingCode = `const [isLoading, setIsLoading] = React.useState(false)

<PromptInput
  isLoading={isLoading}
  onSend={async (value) => {
    setIsLoading(true)
    await sendMessage(value)
    setIsLoading(false)
  }}
/>`

const controlledCode = `const [value, setValue] = React.useState('')

<PromptInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onSend={(value) => {
    console.log('Sent:', value)
    setValue('') // Clear after sending
  }}
/>`

const rtlCode = `<PromptInput
  onSend={(value) => console.log('Sent:', value)}
  isRTL={true}
  placeholderAr="اكتب رسالتك هنا..."
/>`

export default function PromptInputPage() {
  const [value, setValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
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
            <li className="text-foreground font-medium">Prompt Input</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Prompt Input</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Input component for sending chat messages with support for attachments, voice input, and auto-resize.
            Features smart textarea that grows with content and keyboard shortcuts for better UX.
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
              <div className="max-w-2xl w-full" dir={direction}>
                <PromptInput
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onSend={(val) => {
                    console.log('Sent:', val)
                    setValue('')
                  }}
                  showAttachment
                  showVoice
                  showCounter
                  maxLength={500}
                  isRTL={isRTL}
                  placeholder={isRTL ? undefined : "Type your message... (Shift+Enter for new line)"}
                  placeholderAr="اكتب رسالتك هنا... (Shift+Enter لسطر جديد)"
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
            {/* With Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Attachments and Voice</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl">
                    <PromptInput
                      onSend={(value) => console.log('Sent:', value)}
                      showAttachment
                      showVoice
                      showCounter
                      maxLength={500}
                      onAttachment={() => alert('Open file picker')}
                      onVoice={() => alert('Start voice recording')}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withFeaturesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Loading State */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Loading State</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl space-y-4">
                    <PromptInput
                      isLoading={isLoading}
                      onSend={(value) => {
                        setIsLoading(true)
                        setTimeout(() => setIsLoading(false), 2000)
                      }}
                    />
                    <p className="text-sm text-muted-foreground">
                      Try sending a message to see the loading state for 2 seconds.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={loadingCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Controlled Component */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Controlled Component</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl space-y-4">
                    <PromptInput
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onSend={(val) => {
                        console.log('Sent:', val)
                        setValue('')
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      Current value: {value || '(empty)'}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={controlledCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={promptInputProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  All action buttons include screen reader labels. The textarea has proper
                  ARIA attributes and placeholder text that guides users.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: Send message</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Shift+Enter</kbd>: New line</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: Navigate to action buttons</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Auto-resize</h3>
                <p className="text-muted-foreground">
                  The textarea automatically expands as content grows, up to 200px maximum height,
                  ensuring content remains visible without manual resizing.
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
                The input automatically adapts to RTL layout. Action buttons move to the left side,
                and text direction changes. Set <code className="bg-muted px-1 rounded">isRTL</code> prop for RTL languages.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <PromptInput
                      onSend={(value) => console.log('Sent:', value)}
                      placeholder="Type your message..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <PromptInput
                      onSend={(value) => console.log('Sent:', value)}
                      isRTL
                      placeholderAr="اكتب رسالتك هنا..."
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
                <Link href="/components/thinking-indicator" className="font-medium hover:underline">
                  Thinking Indicator
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Loading state for AI responses
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
