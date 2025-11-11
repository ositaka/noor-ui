'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const propDefinitions = [
  {
    name: 'content',
    type: 'string',
    defaultValue: '""',
    description: 'The HTML content of the editor',
  },
  {
    name: 'onChange',
    type: '(content: string) => void',
    description: 'Callback fired when the content changes',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '"Start writing..."',
    description: 'Placeholder text shown when editor is empty',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes',
  },
  {
    name: 'editable',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Whether the editor is editable',
  },
  {
    name: 'minHeight',
    type: 'string',
    defaultValue: '"300px"',
    description: 'Minimum height of the editor',
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
  const [content1, setContent1] = React.useState('')
  const [content2, setContent2] = React.useState('<h2>Welcome to Noor UI</h2><p>This is a <strong>rich text editor</strong> with full <em>RTL support</em>.</p>')
  const [content3, setContent3] = React.useState('<h2>مرحباً بك في نور</h2><p>هذا <strong>محرر نصوص غني</strong> مع دعم كامل للغة العربية.</p>')

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
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
            <li className="text-foreground font-medium">Rich Text Editor</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">Rich Text Editor</h1>
            <Badge variant="default">New</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            A powerful WYSIWYG editor built with Tiptap. Includes text formatting, headings, lists,
            and full RTL support for Arabic content.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <RichTextEditor
                content={content1}
                onChange={setContent1}
                placeholder="Start writing your content..."
                className="w-full max-w-3xl"
              />
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Text Formatting</h3>
                <p className="text-sm text-muted-foreground">
                  Bold, italic, underline with keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Headings</h3>
                <p className="text-sm text-muted-foreground">
                  Three heading levels (H1, H2, H3) for content structure
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Lists</h3>
                <p className="text-sm text-muted-foreground">
                  Bullet lists and numbered lists with RTL support
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Text Alignment</h3>
                <p className="text-sm text-muted-foreground">
                  Direction-aware alignment (left, center, right)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Blockquotes & Code</h3>
                <p className="text-sm text-muted-foreground">
                  Quote blocks and syntax-highlighted code blocks
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">History</h3>
                <p className="text-sm text-muted-foreground">
                  Undo/Redo with keyboard shortcuts (Ctrl+Z, Ctrl+Y)
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* With Initial Content */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Initial Content</h3>
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
              <h3 className="text-lg font-semibold mb-4">Arabic Content with RTL</h3>
              <Card>
                <CardContent className="p-6">
                  <RichTextEditor
                    content={content3}
                    onChange={setContent3}
                    placeholder="ابدأ الكتابة..."
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
              <h3 className="text-lg font-semibold mb-4">Read Only Mode</h3>
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
              <h3 className="text-lg font-semibold mb-4">Custom Height</h3>
              <Card>
                <CardContent className="p-6">
                  <RichTextEditor
                    content=""
                    onChange={() => {}}
                    minHeight="150px"
                    placeholder="Compact editor..."
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Keyboard Shortcuts</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Bold</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+B</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Italic</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+I</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Underline</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+U</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Undo</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+Z</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Redo</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+Y</kbd>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Code Block</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Ctrl+Alt+C</kbd>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Automatic Direction Detection</h4>
                <p className="text-sm text-muted-foreground">
                  The editor automatically adapts to the current text direction
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Text direction automatically follows the global direction setting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Alignment buttons adapt to RTL (left becomes right, right becomes left)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Lists and blockquotes are properly indented in RTL mode</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Default text alignment matches the current direction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Placeholder text is positioned correctly for RTL</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={propDefinitions} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Full keyboard navigation support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Toolbar buttons have proper focus management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>All buttons include descriptive titles for screen readers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Keyboard shortcuts follow standard conventions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Active states are clearly indicated</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
