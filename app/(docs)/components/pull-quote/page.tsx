'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PullQuote } from '@/components/ui/blockquote'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getPullQuoteProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'align',
    type: "'left' | 'center' | 'right'",
    default: "'center'",
    required: false,
    description: t.pullQuoteComponent.props.align,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.pullQuoteComponent.props.className,
  },
]

export default function PullQuotePage() {
  const { locale } = useDirection()
  const t = content[locale]
  const pullQuoteProps = getPullQuoteProps(t)

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{t.common.home}</Link></li>
            <li>/</li>
            <li><Link href="/components" className="hover:text-foreground transition-colors">Components</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">PullQuote</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.pullQuoteComponent.title}</h1>
            <Badge>v0.4.0</Badge>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {t.pullQuoteComponent.description}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.pullQuoteComponent.liveDemo}</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.pullQuoteComponent.centerAligned}</CardTitle>
              </CardHeader>
              <CardContent>
                <PullQuote align="center">
                  {t.pullQuoteComponent.penQuote}
                </PullQuote>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.pullQuoteComponent.leftAligned}</CardTitle>
              </CardHeader>
              <CardContent>
                <PullQuote align="left">
                  {t.pullQuoteComponent.knowledgeQuote}
                </PullQuote>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.pullQuoteComponent.rightAligned}</CardTitle>
              </CardHeader>
              <CardContent>
                <PullQuote align="right">
                  {t.pullQuoteComponent.actionsQuote}
                </PullQuote>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.pullQuoteComponent.installation}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>npm install noorui-rtl</code></pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.pullQuoteComponent.usage}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { PullQuote } from 'noorui-rtl'

<PullQuote align="center">
  Your highlighted quote text.
</PullQuote>

// Different alignments
<PullQuote align="left">Left aligned quote</PullQuote>
<PullQuote align="right">Right aligned quote</PullQuote>`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        <section>
          <h2 className="text-2xl font-bold mb-6">{t.pullQuoteComponent.props.title}</h2>
          <PropsTable props={pullQuoteProps} />
        </section>
      </main>
    </div>
  )
}
