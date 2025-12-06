'use client'

import * as React from 'react'
import Link from 'next/link'
import { PromptInput } from '@/components/ui/prompt-input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { AlertCircle } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getPromptInputProps = (componentT: any): PropDefinition[] => [
  {
    name: 'onSend',
    type: '(value: string) => void',
    required: false,
    description: componentT.props.onSend,
  },
  {
    name: 'isLoading',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.isLoading,
  },
  {
    name: 'showAttachment',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.showAttachment,
  },
  {
    name: 'showVoice',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.showVoice,
  },
  {
    name: 'showCounter',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.showCounter,
  },
  {
    name: 'maxLength',
    type: 'number',
    required: false,
    description: componentT.props.maxLength,
  },
  {
    name: 'onAttachment',
    type: '() => void',
    required: false,
    description: componentT.props.onAttachment,
  },
  {
    name: 'onVoice',
    type: '() => void',
    required: false,
    description: componentT.props.onVoice,
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: componentT.props.isRTL,
  },
  {
    name: 'placeholder',
    type: 'string',
    required: false,
    description: componentT.props.placeholder,
  },
  {
    name: 'placeholderAr',
    type: 'string',
    required: false,
    description: componentT.props.placeholderAr,
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    description: componentT.props.value,
  },
  {
    name: 'onChange',
    type: '(e: React.ChangeEvent<HTMLTextAreaElement>) => void',
    required: false,
    description: componentT.props.onChange,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { PromptInput } from 'noorui-rtl'

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
  const { direction, locale } = useDirection()
  const t = content[locale] || content.en
  const promptInputT = (content[locale]?.promptInputComponent || content.en.promptInputComponent) as any

  const promptInputProps = getPromptInputProps(promptInputT)

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
            <li className="text-foreground font-medium">{promptInputT.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{promptInputT.title}</h1>
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <AlertCircle className="h-3 w-3" />
              {t.componentPage.workInProgress}
            </Badge>
          </div>
          <div className="space-y-3">
            <p className="text-xl text-muted-foreground max-w-3xl">
              {promptInputT.description}
            </p>
            <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-3xl">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>{t.componentPage.wipNote}</strong> {t.componentPage.wipNoteText}
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{promptInputT.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-2xl w-full">
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
                  placeholder="Type your message... (Shift+Enter for new line)"
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{promptInputT.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{promptInputT.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{promptInputT.examples.title}</h2>

          <div className="space-y-8">
            {/* With Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{promptInputT.examples.withAttachmentsVoice}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{promptInputT.examples.loadingState}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{promptInputT.examples.controlledComponent}</h3>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.props}</h2>
          <PropsTable props={promptInputProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{promptInputT.accessibility.screenReader}</h3>
                <p className="text-muted-foreground">
                  {promptInputT.accessibility.screenReaderDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{promptInputT.accessibility.keyboardNav}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: {promptInputT.accessibility.enterKey}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Shift+Enter</kbd>: {promptInputT.accessibility.shiftEnterKey}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {promptInputT.accessibility.tabKey}</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{promptInputT.accessibility.autoResize}</h3>
                <p className="text-muted-foreground">
                  {promptInputT.accessibility.autoResizeDesc}
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
                {promptInputT.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{promptInputT.rtl.ltr}</h4>
                  <div dir="ltr">
                    <PromptInput
                      onSend={(value) => console.log('Sent:', value)}
                      placeholder="Type your message..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{promptInputT.rtl.rtl}</h4>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{promptInputT.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  {t.chatMessageComponent?.title || 'Chat Message'}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {promptInputT.related.chatMessage}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/thinking-indicator" className="font-medium hover:underline">
                  {t.thinkingIndicatorComponent?.title || 'Thinking Indicator'}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {promptInputT.related.thinkingIndicator}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/message-actions" className="font-medium hover:underline">
                  {t.messageActionsComponent?.title || 'Message Actions'}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {promptInputT.related.messageActions}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
