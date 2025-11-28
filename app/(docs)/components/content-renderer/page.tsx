'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ContentRenderer } from '@/components/ui/content-renderer'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getContentRendererProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'content',
    type: 'string',
    default: 'undefined',
    required: true,
    description: t.contentRendererComponent.props.content,
  },
  {
    name: 'format',
    type: "'markdown' | 'html' | 'text'",
    default: "'markdown'",
    required: false,
    description: t.contentRendererComponent.props.format,
  },
  {
    name: 'dir',
    type: "'auto' | 'ltr' | 'rtl'",
    default: "'auto'",
    required: false,
    description: t.contentRendererComponent.props.dir,
  },
  {
    name: 'enableCodeHighlight',
    type: 'boolean',
    default: 'true',
    required: false,
    description: t.contentRendererComponent.props.enableCodeHighlight,
  },
  {
    name: 'enableGFM',
    type: 'boolean',
    default: 'true',
    required: false,
    description: t.contentRendererComponent.props.enableGFM,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.contentRendererComponent.props.className,
  },
]

export default function ContentRendererPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const contentRendererProps = getContentRendererProps(t)

  const sampleMarkdown = `<h3>Sample Content</h3>
<p>This is <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<pre><code>const example = "code block";</code></pre>`

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{t.common.home}</Link></li>
            <li>/</li>
            <li><Link href="/components" className="hover:text-foreground transition-colors">Components</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">ContentRenderer</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.contentRendererComponent.title}</h1>
            <Badge>v0.4.0</Badge>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {t.contentRendererComponent.description}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.contentRendererComponent.liveDemo}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.contentRendererComponent.renderedContent}</CardTitle>
              <CardDescription>{t.contentRendererComponent.renderedContentDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentRenderer content={sampleMarkdown} format="html" dir="auto" />
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.contentRendererComponent.installation}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>npm install noorui-rtl</code></pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">{t.contentRendererComponent.usage}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { ContentRenderer } from 'noorui-rtl'

// Render HTML content
<ContentRenderer
  content={htmlContent}
  format="html"
  dir="auto"
/>

// Render plain text
<ContentRenderer
  content={textContent}
  format="text"
  dir="rtl"
/>`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        <section>
          <h2 className="text-2xl font-bold mb-6">{t.contentRendererComponent.props.title}</h2>
          <PropsTable props={contentRendererProps} />
        </section>
      </main>
    </div>
  )
}
