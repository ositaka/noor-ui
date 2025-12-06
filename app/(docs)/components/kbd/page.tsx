'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Kbd } from '@/components/ui/kbd'
import { Button } from '@/components/ui/button'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { BestPractices } from '@/components/docs/best-practices'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getKbdProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'keys',
    type: 'string[]',
    default: 'undefined',
    required: false,
    description: t.kbdComponent.props.keys,
  },
  {
    name: 'variant',
    type: "'default' | 'outline' | 'ghost'",
    default: "'default'",
    required: false,
    description: t.kbdComponent.props.variant,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'sm'",
    required: false,
    description: t.kbdComponent.props.size,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.kbdComponent.props.className,
  },
]

export default function KbdPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const kbdProps = getKbdProps(t)

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{t.common.home}</Link></li>
            <li>/</li>
            <li><Link href="/components" className="hover:text-foreground transition-colors">Components</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Kbd</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.kbdComponent.title}</h1>
            <Badge>v0.4.0</Badge>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {t.kbdComponent.description}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.kbdComponent.liveDemo}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-64 mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.kbdComponent.keyboardShortcuts}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t.kbdComponent.search}</span>
                        <Kbd keys={['mod', 'k']} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t.kbdComponent.submit}</span>
                        <Kbd keys={['mod', 'enter']} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t.kbdComponent.close}</span>
                        <Kbd keys={['esc']} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t.kbdComponent.previous}</span>
                        <Kbd keys={['shift', 'k']} />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <p className="text-sm font-medium">{t.kbdComponent.inButtons}</p>
                      <Button variant="secondary">
                        {t.kbdComponent.search} <Kbd keys={['mod', 'k']} size="sm" className="ms-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.kbdComponent.installation}</h2>
          <CodeBlock code="npm install noorui-rtl" language="bash" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.kbdComponent.usage}</h2>
          <CodeBlock code={`import { Kbd } from 'noorui-rtl'

// Platform-aware (⌘ on Mac, Ctrl on Windows)
<Kbd keys={['mod', 'k']} />

// Specific keys
<Kbd keys={['esc']} />
<Kbd keys={['shift', 'enter']} />

// In buttons
<Button>
  Submit <Kbd keys={['mod', 'enter']} size="sm" />
</Button>`} language="tsx" />
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.kbdComponent.props.title}</h2>
          <PropsTable props={kbdProps} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={t.kbdComponent.bestPractices.doList}
            donts={t.kbdComponent.bestPractices.dontList}
          />
        </section>
      </main>
    </div>
  )
}
