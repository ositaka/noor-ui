'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { UserBadge } from '@/components/ui/user-badge'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const installCode = `npm install noorui-rtl`

const usageCode = `import { UserBadge } from 'noorui-rtl'

// Built-in variants
<UserBadge variant="author" />
<UserBadge variant="moderator" />
<UserBadge variant="verified" />
<UserBadge variant="admin" />

// Custom badge
<UserBadge variant="custom" label="VIP" icon={<Crown />} />`

const getUserBadgeProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'variant',
    type: "'author' | 'moderator' | 'verified' | 'admin' | 'custom'",
    default: 'undefined',
    required: true,
    description: t.userBadgeComponent.props.variant,
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.userBadgeComponent.props.label,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    default: 'undefined',
    required: false,
    description: t.userBadgeComponent.props.icon,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.userBadgeComponent.props.className,
  },
]

export default function UserBadgePage() {
  const { locale } = useDirection()
  const t = content[locale]
  const userBadgeProps = getUserBadgeProps(t)

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{t.common.home}</Link></li>
            <li>/</li>
            <li><Link href="/components" className="hover:text-foreground transition-colors">Components</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">UserBadge</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.userBadgeComponent.title}</h1>
            <Badge>v0.4.0</Badge>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {t.userBadgeComponent.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Status</Badge>
            <Badge variant="secondary">Role Display</Badge>
            <Badge variant="secondary">RTL-ready</Badge>
          </div>
        </div>

        {/* Live Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.userBadgeComponent.liveDemo}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.userBadgeComponent.allVariants}</CardTitle>
              <CardDescription>{t.userBadgeComponent.allVariantsDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <UserBadge variant="author" />
                <UserBadge variant="moderator" />
                <UserBadge variant="verified" />
                <UserBadge variant="admin" />
                <UserBadge variant="custom" label="VIP" />
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.userBadgeComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.userBadgeComponent.usage}</h2>
          <CodeBlock code={usageCode} language="tsx" title="React" />
        </section>

        <Separator className="my-12" />

        {/* Props API */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.userBadgeComponent.props.title}</h2>
          <PropsTable props={userBadgeProps} />
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t.userBadgeComponent.useCases.title}</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {t.userBadgeComponent.useCases.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
