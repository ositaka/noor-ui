'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Callout } from '@/components/ui/callout'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { BestPractices } from '@/components/docs/best-practices'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getCalloutProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'type',
    type: "'info' | 'warning' | 'error' | 'success' | 'note'",
    default: "'info'",
    required: false,
    description: t.calloutComponent.props.type,
  },
  {
    name: 'title',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.calloutComponent.props.titleProp,
  },
  {
    name: 'icon',
    type: 'LucideIcon',
    default: 'undefined',
    required: false,
    description: t.calloutComponent.props.icon,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.calloutComponent.props.className,
  },
]

export default function CalloutPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const calloutProps = getCalloutProps(t)

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{t.common.home}</Link></li>
            <li>/</li>
            <li><Link href="/components" className="hover:text-foreground transition-colors">Components</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Callout</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.calloutComponent.title}</h1>
            <Badge>v0.4.0</Badge>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {t.calloutComponent.description}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.calloutComponent.liveDemo}</h2>
          <div className="space-y-4">
            <Callout type="info" title={t.calloutComponent.information}>
              {t.calloutComponent.infoText}
            </Callout>

            <Callout type="warning" title={t.calloutComponent.warningTitle}>
              {t.calloutComponent.warningText}
            </Callout>

            <Callout type="error" title={t.calloutComponent.errorTitle}>
              {t.calloutComponent.errorText}
            </Callout>

            <Callout type="success" title={t.calloutComponent.successTitle}>
              {t.calloutComponent.successText}
            </Callout>

            <Callout type="note">
              {t.calloutComponent.noteText}
            </Callout>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.calloutComponent.installation}</h2>
          <CodeBlock code="npm install noorui-rtl" language="bash" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.calloutComponent.usage}</h2>
          <CodeBlock
            code={`import { Callout } from 'noorui-rtl'

// With title
<Callout type="info" title="Did you know?">
  This is helpful information for users.
</Callout>

// Without title
<Callout type="warning">
  Be careful with this operation!
</Callout>

// Custom icon
<Callout type="success" icon={CustomIcon} title="Custom">
  Using a custom icon.
</Callout>`}
            language="tsx"
          />
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.calloutComponent.props.title}</h2>
          <PropsTable props={calloutProps} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={t.calloutComponent.bestPractices.doList}
            donts={t.calloutComponent.bestPractices.dontList}
          />
        </section>
      </main>
    </div>
  )
}
