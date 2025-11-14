'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Check, AlertCircle, Star, Clock, Zap, CheckCircle2, XCircle } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getBadgeProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'variant',
    type: "'default' | 'secondary' | 'destructive' | 'outline'",
    default: "'default'",
    required: false,
    description: t.badgeComponent.props.variant,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.badgeComponent.props.className,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Badge } from '@/components/ui/badge'

<Badge>New</Badge>`

const variantsCode = `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`

const withIconCode = `import { Check, AlertCircle, Star } from 'lucide-react'

<Badge>
  <Check className="h-3 w-3 me-1" />
  Verified
</Badge>

<Badge variant="destructive">
  <AlertCircle className="h-3 w-3 me-1" />
  Error
</Badge>

<Badge variant="secondary">
  <Star className="h-3 w-3 me-1" />
  Featured
</Badge>`

const statusCode = `// Success
<Badge variant="default">
  <CheckCircle2 className="h-3 w-3 me-1" />
  Active
</Badge>

// Warning
<Badge variant="secondary">
  <Clock className="h-3 w-3 me-1" />
  Pending
</Badge>

// Error
<Badge variant="destructive">
  <XCircle className="h-3 w-3 me-1" />
  Failed
</Badge>

// Info
<Badge variant="outline">
  <AlertCircle className="h-3 w-3 me-1" />
  Info
</Badge>`

const cardUsageCode = `<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Premium Feature</CardTitle>
      <Badge>Pro</Badge>
    </div>
    <CardDescription>
      This feature is available on the Pro plan
    </CardDescription>
  </CardHeader>
</Card>`

const listUsageCode = `<ul className="space-y-2">
  <li className="flex items-center justify-between p-3 rounded-lg border">
    <span>Dark Mode Support</span>
    <Badge variant="default">Included</Badge>
  </li>
  <li className="flex items-center justify-between p-3 rounded-lg border">
    <span>Advanced Analytics</span>
    <Badge variant="secondary">Coming Soon</Badge>
  </li>
  <li className="flex items-center justify-between p-3 rounded-lg border">
    <span>Legacy API</span>
    <Badge variant="destructive">Deprecated</Badge>
  </li>
</ul>`

const notificationCode = `<Button variant="outline" className="relative">
  Notifications
  <Badge className="absolute -top-2 -end-2 px-2">3</Badge>
</Button>`

const customSizeCode = `// Small badge
<Badge className="text-[10px] px-1.5 py-0">Tiny</Badge>

// Default badge
<Badge>Normal</Badge>

// Large badge
<Badge className="text-sm px-3 py-1">Large</Badge>`

const customColorCode = `// Custom background colors
<Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
<Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
<Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
<Badge className="bg-purple-500 hover:bg-purple-600">Custom</Badge>`

const rtlCode = `// RTL support is automatic!
// Icons and text flow correctly in RTL

<Badge>
  <Check className="h-3 w-3 me-1" />
  جديد
</Badge>`

export default function BadgePage() {
  const { locale } = useDirection()
  const t = content[locale]
  const badgeProps = getBadgeProps(t)

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
            <li className="text-foreground font-medium">{t.badgeComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.badgeComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.badgeComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.badgeComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="flex flex-wrap gap-2">
                <Badge>New</Badge>
                <Badge variant="secondary">Beta</Badge>
                <Badge variant="outline">Soon</Badge>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.badgeComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.badgeComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.badgeComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.badgeComponent.examples.variants}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={variantsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Icons</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge>
                      <Check className="h-3 w-3 me-1" />
                      Verified
                    </Badge>
                    <Badge variant="secondary">
                      <Star className="h-3 w-3 me-1" />
                      Featured
                    </Badge>
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 me-1" />
                      Error
                    </Badge>
                    <Badge variant="outline">
                      <Zap className="h-3 w-3 me-1" />
                      Fast
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withIconCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Status Indicators */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Status Indicators</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">
                      <CheckCircle2 className="h-3 w-3 me-1" />
                      Active
                    </Badge>
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 me-1" />
                      Pending
                    </Badge>
                    <Badge variant="destructive">
                      <XCircle className="h-3 w-3 me-1" />
                      Failed
                    </Badge>
                    <Badge variant="outline">
                      <AlertCircle className="h-3 w-3 me-1" />
                      Info
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={statusCode} language="tsx" collapsible />
              </div>
            </div>

            {/* In Cards */}
            <div>
              <h3 className="text-lg font-semibold mb-4">In Card Headers</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Premium Feature</CardTitle>
                          <Badge>Pro</Badge>
                        </div>
                        <CardDescription>
                          This feature is available on the Pro plan
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Beta Testing</CardTitle>
                          <Badge variant="secondary">Beta</Badge>
                        </div>
                        <CardDescription>Currently in beta testing phase</CardDescription>
                      </CardHeader>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Deprecated API</CardTitle>
                          <Badge variant="destructive">Deprecated</Badge>
                        </div>
                        <CardDescription>This API will be removed soon</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={cardUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* In Lists */}
            <div>
              <h3 className="text-lg font-semibold mb-4">In Lists</h3>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between p-3 rounded-lg border">
                      <span>Dark Mode Support</span>
                      <Badge variant="default">Included</Badge>
                    </li>
                    <li className="flex items-center justify-between p-3 rounded-lg border">
                      <span>Advanced Analytics</span>
                      <Badge variant="secondary">Coming Soon</Badge>
                    </li>
                    <li className="flex items-center justify-between p-3 rounded-lg border">
                      <span>Legacy API</span>
                      <Badge variant="destructive">Deprecated</Badge>
                    </li>
                    <li className="flex items-center justify-between p-3 rounded-lg border">
                      <span>Documentation</span>
                      <Badge variant="outline">In Progress</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={listUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Notification Count */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Notification Count</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="relative">
                      Notifications
                      <Badge className="absolute -top-2 -end-2 px-2">3</Badge>
                    </Button>

                    <Button variant="outline" className="relative">
                      Messages
                      <Badge className="absolute -top-2 -end-2 px-2">12</Badge>
                    </Button>

                    <Button variant="outline" className="relative">
                      Cart
                      <Badge variant="secondary" className="absolute -top-2 -end-2 px-2">
                        5
                      </Badge>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={notificationCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Sizes</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="text-[10px] px-1.5 py-0">Tiny</Badge>
                    <Badge>Normal</Badge>
                    <Badge className="text-sm px-3 py-1">Large</Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customSizeCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Colors</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-500 hover:bg-green-600 border-transparent text-white">
                      Success
                    </Badge>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 border-transparent text-white">
                      Warning
                    </Badge>
                    <Badge className="bg-blue-500 hover:bg-blue-600 border-transparent text-white">
                      Info
                    </Badge>
                    <Badge className="bg-purple-500 hover:bg-purple-600 border-transparent text-white">
                      Custom
                    </Badge>
                    <Badge className="bg-pink-500 hover:bg-pink-600 border-transparent text-white">
                      Special
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customColorCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.badgeComponent.props.title}</h2>
          <PropsTable props={badgeProps} />
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                {t.badgeComponent.props.note}{' '}
                <code className="bg-muted px-1 rounded">onClick</code> {t.badgeComponent.props.andOtherHandlers}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.badgeComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.badgeComponent.accessibility.semanticHTML}</h3>
                <p className="text-muted-foreground">
                  {t.badgeComponent.accessibility.semanticDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.badgeComponent.accessibility.screenReaders}</h3>
                <p className="text-muted-foreground">
                  {t.badgeComponent.accessibility.screenReadersDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.badgeComponent.accessibility.colorAlone}</h3>
                <p className="text-muted-foreground mb-2">
                  {t.badgeComponent.accessibility.colorAloneDesc}
                </p>
                <div className="flex gap-2">
                  <Badge variant="destructive">❌ Red</Badge>
                  <Badge variant="destructive">
                    <XCircle className="h-3 w-3 me-1" />✓ {t.badgeComponent.labels.failed}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.badgeComponent.accessibility.interactiveBadges}</h3>
                <p className="text-muted-foreground">
                  {t.badgeComponent.accessibility.interactiveBadgesDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.badgeComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.badgeComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.badgeComponent.rtl.ltr}</h4>
                  <div dir="ltr">
                    <div className="flex flex-wrap gap-2">
                      <Badge>
                        <Check className="h-3 w-3 me-1" />
                        New
                      </Badge>
                      <Badge variant="secondary">Beta</Badge>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.badgeComponent.rtl.rtlLabel}</h4>
                  <div dir="rtl">
                    <div className="flex flex-wrap gap-2">
                      <Badge>
                        <Check className="h-3 w-3 me-1" />
                        جديد
                      </Badge>
                      <Badge variant="secondary">تجريبي</Badge>
                      <Badge variant="outline">قريباً</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.badgeComponent.useCases.title}</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>{t.badgeComponent.useCases.statusIndicators}:</strong> {t.badgeComponent.useCases.statusDesc}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>{t.badgeComponent.useCases.categories}:</strong> {t.badgeComponent.useCases.categoriesDesc}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>{t.badgeComponent.useCases.notificationCounts}:</strong> {t.badgeComponent.useCases.notificationCountsDesc}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>{t.badgeComponent.useCases.featureHighlights}:</strong> {t.badgeComponent.useCases.featureHighlightsDesc}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>{t.badgeComponent.useCases.versionLabels}:</strong> {t.badgeComponent.useCases.versionLabelsDesc}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>{t.badgeComponent.useCases.roleIndicators}:</strong> {t.badgeComponent.useCases.roleIndicatorsDesc}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.badgeComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.badgeComponent.related.button}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.badgeComponent.related.buttonDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/card">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.badgeComponent.related.card}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.badgeComponent.related.cardDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/alert">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.badgeComponent.related.alert}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.badgeComponent.related.alertDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
