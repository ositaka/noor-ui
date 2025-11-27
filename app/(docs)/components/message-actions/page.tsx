'use client'

import * as React from 'react'
import Link from 'next/link'
import { MessageActions } from '@/components/ui/message-actions'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const messageActionsProps: PropDefinition[] = [
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
    description: 'Show regenerate button',
  },
  {
    name: 'showEdit',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show edit button',
  },
  {
    name: 'showShare',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show share button',
  },
  {
    name: 'showFlag',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show flag/report button',
  },
  {
    name: 'showFeedback',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show feedback buttons (thumbs up/down)',
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
    name: 'onEdit',
    type: '() => void',
    required: false,
    description: 'Callback when edit is clicked',
  },
  {
    name: 'onShare',
    type: '() => void',
    required: false,
    description: 'Callback when share is clicked',
  },
  {
    name: 'onFlag',
    type: '() => void',
    required: false,
    description: 'Callback when flag is clicked',
  },
  {
    name: 'onThumbsUp',
    type: '() => void',
    required: false,
    description: 'Callback when thumbs up is clicked',
  },
  {
    name: 'onThumbsDown',
    type: '() => void',
    required: false,
    description: 'Callback when thumbs down is clicked',
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether text direction is RTL',
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Compact mode (icon only)',
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { MessageActions } from 'noorui-rtl'

<MessageActions
  showCopy
  onCopy={() => console.log('Copied!')}
/>`

const fullFeaturedCode = `<MessageActions
  showCopy
  showRegenerate
  showEdit
  showShare
  showFeedback
  showFlag
  onCopy={() => console.log('Copied')}
  onRegenerate={() => console.log('Regenerating')}
  onEdit={() => console.log('Editing')}
  onShare={() => console.log('Sharing')}
  onThumbsUp={() => console.log('Thumbs up')}
  onThumbsDown={() => console.log('Thumbs down')}
  onFlag={() => console.log('Flagged')}
/>`

const compactCode = `<MessageActions
  showCopy
  showRegenerate
  showEdit
  compact
  onCopy={() => console.log('Copied')}
  onRegenerate={() => console.log('Regenerating')}
  onEdit={() => console.log('Editing')}
/>`

const assistantCode = `// For assistant messages
<MessageActions
  showCopy
  showRegenerate
  showFeedback
  onCopy={() => navigator.clipboard.writeText(message)}
  onRegenerate={() => regenerateResponse()}
  onThumbsUp={() => submitFeedback('positive')}
  onThumbsDown={() => submitFeedback('negative')}
/>`

const userCode = `// For user messages
<MessageActions
  showCopy
  showEdit
  onCopy={() => navigator.clipboard.writeText(message)}
  onEdit={() => editMessage()}
/>`

const rtlCode = `<MessageActions
  showCopy
  showRegenerate
  showEdit
  isRTL={true}
  onCopy={() => console.log('Copied')}
  onRegenerate={() => console.log('Regenerating')}
  onEdit={() => console.log('Editing')}
/>`

export default function MessageActionsPage() {
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
            <li className="text-foreground font-medium">Message Actions</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Message Actions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Action buttons for chat messages (copy, regenerate, edit, share, feedback).
            Provides a consistent interface for common message operations in chat applications.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="space-y-4">
                <MessageActions
                  showCopy
                  showRegenerate
                  showEdit
                  showShare
                  showFeedback
                  onCopy={() => console.log('Copied')}
                  onRegenerate={() => console.log('Regenerating')}
                  onEdit={() => console.log('Editing')}
                  onShare={() => console.log('Sharing')}
                  onThumbsUp={() => console.log('Thumbs up')}
                  onThumbsDown={() => console.log('Thumbs down')}
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
            {/* Full Featured */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Full Featured</h3>
              <Card>
                <CardContent className="p-6">
                  <MessageActions
                    showCopy
                    showRegenerate
                    showEdit
                    showShare
                    showFeedback
                    showFlag
                    onCopy={() => alert('Copied to clipboard')}
                    onRegenerate={() => alert('Regenerating response')}
                    onEdit={() => alert('Edit mode')}
                    onShare={() => alert('Share dialog')}
                    onThumbsUp={() => alert('Positive feedback')}
                    onThumbsDown={() => alert('Negative feedback')}
                    onFlag={() => alert('Report dialog')}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={fullFeaturedCode} language="tsx" collapsible />
              </div>
            </div>

            {/* For Assistant Messages */}
            <div>
              <h3 className="text-lg font-semibold mb-4">For Assistant Messages</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Typical actions for AI assistant responses:
                    </p>
                    <MessageActions
                      showCopy
                      showRegenerate
                      showFeedback
                      onCopy={() => alert('Copied AI response')}
                      onRegenerate={() => alert('Regenerating AI response')}
                      onThumbsUp={() => alert('Good response')}
                      onThumbsDown={() => alert('Bad response')}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={assistantCode} language="tsx" collapsible />
              </div>
            </div>

            {/* For User Messages */}
            <div>
              <h3 className="text-lg font-semibold mb-4">For User Messages</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Typical actions for user messages:
                    </p>
                    <MessageActions
                      showCopy
                      showEdit
                      onCopy={() => alert('Copied user message')}
                      onEdit={() => alert('Edit user message')}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={userCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Compact Mode */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Compact Mode (Icon Only)</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Use compact mode for space-constrained layouts:
                    </p>
                    <MessageActions
                      showCopy
                      showRegenerate
                      showEdit
                      compact
                      onCopy={() => alert('Copied')}
                      onRegenerate={() => alert('Regenerating')}
                      onEdit={() => alert('Editing')}
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
          <PropsTable props={messageActionsProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  All buttons include screen reader labels via <code className="bg-muted px-1 rounded">sr-only</code> spans,
                  ensuring icon-only buttons are accessible. Feedback state changes are announced appropriately.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: Navigate between action buttons</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: Activate button</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Visual Feedback</h3>
                <p className="text-muted-foreground">
                  Copy button shows a checkmark when clicked. Feedback buttons change color when selected,
                  providing clear visual feedback for user actions.
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
                The action buttons work seamlessly in RTL layouts. Button labels appear in the correct
                language and icon spacing adapts automatically.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <MessageActions
                      showCopy
                      showRegenerate
                      showEdit
                      onCopy={() => {}}
                      onRegenerate={() => {}}
                      onEdit={() => {}}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <MessageActions
                      showCopy
                      showRegenerate
                      showEdit
                      isRTL
                      onCopy={() => {}}
                      onRegenerate={() => {}}
                      onEdit={() => {}}
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
                  Display chat messages with actions
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
