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

const getMessageActionsProps = (componentT: any): PropDefinition[] => [
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
    name: 'showEdit',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.showEdit,
  },
  {
    name: 'showShare',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.showShare,
  },
  {
    name: 'showFlag',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.showFlag,
  },
  {
    name: 'showFeedback',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.showFeedback,
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
    name: 'onEdit',
    type: '() => void',
    required: false,
    description: componentT.props.onEdit,
  },
  {
    name: 'onShare',
    type: '() => void',
    required: false,
    description: componentT.props.onShare,
  },
  {
    name: 'onFlag',
    type: '() => void',
    required: false,
    description: componentT.props.onFlag,
  },
  {
    name: 'onThumbsUp',
    type: '() => void',
    required: false,
    description: componentT.props.onThumbsUp,
  },
  {
    name: 'onThumbsDown',
    type: '() => void',
    required: false,
    description: componentT.props.onThumbsDown,
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.isRTL,
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.compact,
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
  const { direction, locale } = useDirection()
  const t = content[locale] || content.en
  const messageActionsT = (content[locale]?.messageActionsComponent || content.en.messageActionsComponent) as any

  const messageActionsProps = getMessageActionsProps(messageActionsT)

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
            <li className="text-foreground font-medium">{messageActionsT.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{messageActionsT.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {messageActionsT.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{messageActionsT.preview}</h2>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{messageActionsT.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{messageActionsT.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{messageActionsT.examples.title}</h2>

          <div className="space-y-8">
            {/* Full Featured */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.fullFeatured || 'Full Featured'}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{messageActionsT.examples.assistantMessageActions}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{messageActionsT.examples.userMessageActions}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.compactMode || 'Compact Mode'}</h3>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.props}</h2>
          <PropsTable props={messageActionsProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{messageActionsT.accessibility.tooltips}</h3>
                <p className="text-muted-foreground">
                  {messageActionsT.accessibility.tooltipsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{messageActionsT.accessibility.keyboardNav}</h3>
                <p className="text-muted-foreground">
                  {messageActionsT.accessibility.keyboardNavDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{messageActionsT.accessibility.ariaLabels}</h3>
                <p className="text-muted-foreground">
                  {messageActionsT.accessibility.ariaLabelsDesc}
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
                {messageActionsT.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentPage.rtlDemo.ltr}</h4>
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
                  <h4 className="font-semibold text-sm">{t.componentPage.rtlDemo.rtl}</h4>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{messageActionsT.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  {content[locale]?.chatMessageComponent?.title || content.en.chatMessageComponent.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {messageActionsT.related.chatMessage}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/prompt-input" className="font-medium hover:underline">
                  {content[locale]?.promptInputComponent?.title || content.en.promptInputComponent.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {messageActionsT.related.promptInput}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
