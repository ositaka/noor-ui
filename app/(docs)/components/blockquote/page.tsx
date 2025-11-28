'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Blockquote, PullQuote } from '@/components/ui/blockquote'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { BestPractices } from '@/components/docs/best-practices'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getBlockquoteProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'author',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.blockquoteComponent.props.author,
  },
  {
    name: 'source',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.blockquoteComponent.props.source,
  },
  {
    name: 'cite',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.blockquoteComponent.props.cite,
  },
  {
    name: 'variant',
    type: "'default' | 'accent' | 'subtle'",
    default: "'default'",
    required: false,
    description: t.blockquoteComponent.props.variant,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.blockquoteComponent.props.className,
  },
]

export default function BlockquotePage() {
  const { locale } = useDirection()
  const t = content[locale]
  const blockquoteProps = getBlockquoteProps(t)

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{t.common.home}</Link></li>
            <li>/</li>
            <li><Link href="/components" className="hover:text-foreground transition-colors">Components</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Blockquote</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.blockquoteComponent.title}</h1>
            <Badge>v0.4.0</Badge>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {t.blockquoteComponent.description}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.blockquoteComponent.liveDemo}</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.blockquoteComponent.defaultVariant}</CardTitle>
              </CardHeader>
              <CardContent>
                <Blockquote author="Albert Einstein" source="On Science">
                  {t.blockquoteComponent.einsteinQuote}
                </Blockquote>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.blockquoteComponent.accentVariant}</CardTitle>
              </CardHeader>
              <CardContent>
                <Blockquote variant="accent" author="Steve Jobs">
                  {t.blockquoteComponent.jobsQuote}
                </Blockquote>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.blockquoteComponent.subtleVariant}</CardTitle>
              </CardHeader>
              <CardContent>
                <Blockquote variant="subtle" author="Maya Angelou">
                  {t.blockquoteComponent.angelouQuote}
                </Blockquote>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.blockquoteComponent.installation}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>npm install noorui-rtl</code></pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.blockquoteComponent.usage}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { Blockquote } from 'noorui-rtl'

<Blockquote author="Author Name" source="Book Title">
  Quote text goes here.
</Blockquote>

// With citation URL
<Blockquote
  author="Author Name"
  source="Article Title"
  cite="https://example.com"
  variant="accent"
>
  Quote with clickable source.
</Blockquote>`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.blockquoteComponent.props.title}</h2>
          <PropsTable props={blockquoteProps} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={t.blockquoteComponent.bestPractices.doList}
            donts={t.blockquoteComponent.bestPractices.dontList}
          />
        </section>
      </main>
    </div>
  )
}
