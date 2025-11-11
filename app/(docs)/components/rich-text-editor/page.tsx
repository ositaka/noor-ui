'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">Rich Text Editor</h1>
            <Badge variant="default">New</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A powerful WYSIWYG editor built with Tiptap. Includes text formatting, headings, lists,
            and full RTL support for Arabic content.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase
            code={`'use client'

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
}`}
          >
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

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Text Formatting</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Bold, italic, underline with keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Headings</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Three heading levels (H1, H2, H3) for content structure
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lists</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Bullet lists and numbered lists with RTL support
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Text Alignment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Direction-aware alignment (left, center, right)
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blockquotes & Code</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Quote blocks and syntax-highlighted code blocks
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">History</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Undo/Redo with keyboard shortcuts (Ctrl+Z, Ctrl+Y)
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <Tabs defaultValue="with-content" className="space-y-6">
            <TabsList>
              <TabsTrigger value="with-content">With Initial Content</TabsTrigger>
              <TabsTrigger value="arabic">Arabic Content</TabsTrigger>
              <TabsTrigger value="read-only">Read Only</TabsTrigger>
              <TabsTrigger value="custom-height">Custom Height</TabsTrigger>
            </TabsList>

            <TabsContent value="with-content" className="space-y-4">
              <p className="text-muted-foreground">Editor with pre-populated content.</p>
              <ComponentShowcase
                code={`'use client'

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
}`}
              >
                <ComponentShowcase.Demo>
                  <RichTextEditor
                    content={content2}
                    onChange={setContent2}
                    className="w-full max-w-3xl"
                  />
                </ComponentShowcase.Demo>
              </ComponentShowcase>
            </TabsContent>

            <TabsContent value="arabic" className="space-y-4">
              <p className="text-muted-foreground">Editor with Arabic content and RTL text direction.</p>
              <ComponentShowcase
                code={`'use client'

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
}`}
              >
                <ComponentShowcase.Demo>
                  <RichTextEditor
                    content={content3}
                    onChange={setContent3}
                    placeholder="ابدأ الكتابة..."
                    className="w-full max-w-3xl"
                  />
                </ComponentShowcase.Demo>
              </ComponentShowcase>
            </TabsContent>

            <TabsContent value="read-only" className="space-y-4">
              <p className="text-muted-foreground">Display content in read-only mode without toolbar.</p>
              <ComponentShowcase
                code={`'use client'

import { RichTextEditor } from '@/components/ui/rich-text-editor'

export default function Example() {
  return (
    <RichTextEditor
      content="<h2>Read-Only Editor</h2><p>This editor is <strong>not editable</strong>.</p>"
      editable={false}
    />
  )
}`}
              >
                <ComponentShowcase.Demo>
                  <RichTextEditor
                    content="<h2>Read-Only Editor</h2><p>This editor is <strong>not editable</strong>. Perfect for displaying formatted content.</p>"
                    editable={false}
                    className="w-full max-w-3xl"
                  />
                </ComponentShowcase.Demo>
              </ComponentShowcase>
            </TabsContent>

            <TabsContent value="custom-height" className="space-y-4">
              <p className="text-muted-foreground">Editor with custom minimum height.</p>
              <ComponentShowcase
                code={`'use client'

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
}`}
              >
                <ComponentShowcase.Demo>
                  <RichTextEditor
                    content=""
                    onChange={() => {}}
                    minHeight="150px"
                    placeholder="Compact editor..."
                    className="w-full max-w-3xl"
                  />
                </ComponentShowcase.Demo>
              </ComponentShowcase>
            </TabsContent>
          </Tabs>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <Card>
            <CardHeader>
              <CardTitle>Keyboard Shortcuts</CardTitle>
              <CardDescription>Productivity shortcuts for faster editing</CardDescription>
            </CardHeader>
            <CardContent>
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
            <CardHeader>
              <CardTitle>Automatic Direction Detection</CardTitle>
              <CardDescription>
                The editor automatically adapts to the current text direction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Features:</h4>
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
