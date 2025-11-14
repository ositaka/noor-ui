'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getRichTextEditorProps = (t: typeof content.en | typeof content.ar) => [
  {
    name: 'content',
    type: 'string',
    defaultValue: '""',
    description: t.richTextEditorComponent.props.content,
  },
  {
    name: 'onChange',
    type: '(content: string) => void',
    description: t.richTextEditorComponent.props.onChange,
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '"Start writing..."',
    description: t.richTextEditorComponent.props.placeholder,
  },
  {
    name: 'className',
    type: 'string',
    description: t.richTextEditorComponent.props.className,
  },
  {
    name: 'editable',
    type: 'boolean',
    defaultValue: 'true',
    description: t.richTextEditorComponent.props.editable,
  },
  {
    name: 'minHeight',
    type: 'string',
    defaultValue: '"300px"',
    description: t.richTextEditorComponent.props.minHeight,
  },
]

const basicUsageCode = `'use client'

import * as React from 'react'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

export default function Example() {
  const [content, setContent] = React.useState('')

  return (
    <RichTextEditor
      content={content}
      onChange={setContent}
      placeholder="Start writing your content..."
    />
  )
}`

const withContentCode = `'use client'

import * as React from 'react'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

export default function Example() {
  const [content, setContent] = React.useState(
    '<h2>Welcome to Noor UI</h2>' +
    '<p>This is a <strong>rich text editor</strong> with full <em>RTL support</em>.</p>'
  )

  return (
    <RichTextEditor
      content={content}
      onChange={setContent}
    />
  )
}`

const arabicCode = `'use client'

import * as React from 'react'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

export default function Example() {
  const [content, setContent] = React.useState(
    '<h2>مرحباً بك في نور</h2>' +
    '<p>هذا <strong>محرر نصوص غني</strong> مع دعم كامل للغة العربية.</p>'
  )

  return (
    <RichTextEditor
      content={content}
      onChange={setContent}
      placeholder="ابدأ الكتابة..."
    />
  )
}`

const readOnlyCode = `'use client'

import { RichTextEditor } from '@/components/ui/rich-text-editor'

export default function Example() {
  return (
    <RichTextEditor
      content="<h2>Read-Only Editor</h2><p>This editor is <strong>not editable</strong>.</p>"
      editable={false}
    />
  )
}`

const customHeightCode = `'use client'

import * as React from 'react'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

export default function Example() {
  const [content, setContent] = React.useState('')

  return (
    <RichTextEditor
      content={content}
      onChange={setContent}
      minHeight="150px"
      placeholder="Compact editor..."
    />
  )
}`

export default function RichTextEditorPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const propDefinitions = getRichTextEditorProps(t)

  const [content1, setContent1] = React.useState('')
  const [content2, setContent2] = React.useState('<h2>Welcome to Noor UI</h2><p>This is a <strong>rich text editor</strong> with full <em>RTL support</em>.</p>')
  const [content3, setContent3] = React.useState('<h2>مرحباً بك في نور</h2><p>هذا <strong>محرر نصوص غني</strong> مع دعم كامل للغة العربية.</p>')

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
            <li className="text-foreground font-medium">{t.richTextEditorComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.richTextEditorComponent.title}</h1>
            <Badge variant="default">New</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.richTextEditorComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.richTextEditorComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <RichTextEditor
                content={content1}
                onChange={setContent1}
                placeholder={t.richTextEditorComponent.placeholders.startWriting}
                className="w-full max-w-3xl"
              />
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.richTextEditorComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.richTextEditorComponent.features.title}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.richTextEditorComponent.features.textFormatting}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.richTextEditorComponent.features.textFormattingDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.richTextEditorComponent.features.headings}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.richTextEditorComponent.features.headingsDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.richTextEditorComponent.features.lists}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.richTextEditorComponent.features.listsDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.richTextEditorComponent.features.textAlignment}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.richTextEditorComponent.features.textAlignmentDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.richTextEditorComponent.features.blockquotesCode}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.richTextEditorComponent.features.blockquotesCodeDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.richTextEditorComponent.features.history}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.richTextEditorComponent.features.historyDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.richTextEditorComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* With Initial Content */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.richTextEditorComponent.examples.withContent}</h3>
              <Card>
                <CardContent className="p-6">
                  <RichTextEditor
                    content={content2}
                    onChange={setContent2}
                    className="w-full max-w-3xl"
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withContentCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Arabic Content */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.richTextEditorComponent.examples.arabicContent}</h3>
              <Card>
                <CardContent className="p-6">
                  <RichTextEditor
                    content={content3}
                    onChange={setContent3}
                    placeholder={t.richTextEditorComponent.placeholders.startWritingArabic}
                    className="w-full max-w-3xl"
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={arabicCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Read Only */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.richTextEditorComponent.examples.readOnly}</h3>
              <Card>
                <CardContent className="p-6">
                  <RichTextEditor
                    content="<h2>Read-Only Editor</h2><p>This editor is <strong>not editable</strong>. Perfect for displaying formatted content.</p>"
                    editable={false}
                    className="w-full max-w-3xl"
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={readOnlyCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Height */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.richTextEditorComponent.examples.customHeight}</h3>
              <Card>
                <CardContent className="p-6">
                  <RichTextEditor
                    content=""
                    onChange={() => {}}
                    minHeight="150px"
                    placeholder={t.richTextEditorComponent.placeholders.compact}
                    className="w-full max-w-3xl"
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customHeightCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.richTextEditorComponent.keyboardShortcuts.title}</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{t.richTextEditorComponent.keyboardShortcuts.bold}</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+B</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{t.richTextEditorComponent.keyboardShortcuts.italic}</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+I</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{t.richTextEditorComponent.keyboardShortcuts.underline}</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+U</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{t.richTextEditorComponent.keyboardShortcuts.undo}</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+Z</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{t.richTextEditorComponent.keyboardShortcuts.redo}</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+Y</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{t.richTextEditorComponent.keyboardShortcuts.codeBlock}</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+Alt+C</kbd>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.richTextEditorComponent.rtlSupport.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">{t.richTextEditorComponent.rtlSupport.automaticDetection}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.richTextEditorComponent.rtlSupport.description}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.richTextEditorComponent.rtlSupport.autoFollows}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.richTextEditorComponent.rtlSupport.alignmentAdapts}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.richTextEditorComponent.rtlSupport.listsIndented}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.richTextEditorComponent.rtlSupport.defaultAlignment}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.richTextEditorComponent.rtlSupport.placeholderPositioned}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={propDefinitions} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.richTextEditorComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.richTextEditorComponent.accessibility.keyboardNavigation}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.richTextEditorComponent.accessibility.toolbarFocus}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.richTextEditorComponent.accessibility.screenReaderTitles}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.richTextEditorComponent.accessibility.keyboardShortcuts}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.richTextEditorComponent.accessibility.activeStates}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
