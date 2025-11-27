'use client'

import * as React from 'react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const skeletonProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: '-',
    required: false,
    description: content['en'].skeletonComponent.props.className,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Skeleton } from 'noorui-rtl'

export default function Loading() {
  const { locale } = useDirection()
  const t = content[locale]
  return <Skeleton className="h-4 w-full" />
}`

const cardSkeletonCode = `<Card>
  <CardContent className="pt-6">
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  </CardContent>
</Card>`

const profileSkeletonCode = `<div className="flex items-center space-x-4 space-x-reverse">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`

const listSkeletonCode = `<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center space-x-4 space-x-reverse">
      <Skeleton className="h-10 w-10 rounded" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  ))}
</div>`

const rtlCode = `// Skeleton components work seamlessly in RTL
// Use space-x-reverse for horizontal spacing in RTL

<div className="flex items-center space-x-4 space-x-reverse">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`

export default function SkeletonPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const sk = content[locale].skeletonComponent
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
            <li className="text-foreground font-medium">{sk.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{sk.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {sk.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full max-w-sm" />
                  <Skeleton className="h-4 w-3/4 max-w-xs" />
                </div>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{sk.examples.title}</h2>

          <div className="space-y-8">
            {/* Card Skeleton */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{sk.examples.cardSkeleton}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={cardSkeletonCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Profile Skeleton */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{sk.examples.profileSkeleton}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={profileSkeletonCode} language="tsx" collapsible />
              </div>
            </div>

            {/* List Skeleton */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{sk.examples.listSkeleton}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4 space-x-reverse">
                        <Skeleton className="h-10 w-10 rounded" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={listSkeletonCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={skeletonProps} />
          <p className="text-sm text-muted-foreground mt-4">
            {sk.props.note}
          </p>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{sk.bestPractices.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{sk.bestPractices.whenToUse}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>{sk.bestPractices.whenToUseItems.initialContent}</li>
                  <li>{sk.bestPractices.whenToUseItems.fetchingData}</li>
                  <li>{sk.bestPractices.whenToUseItems.loadingMedia}</li>
                  <li>{sk.bestPractices.whenToUseItems.processingActions}</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{sk.bestPractices.designTips}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>{sk.bestPractices.designTipsItems.matchShapes}</li>
                  <li>{sk.bestPractices.designTipsItems.multipleSkeletons}</li>
                  <li>{sk.bestPractices.designTipsItems.simplePatterns}</li>
                  <li>{sk.bestPractices.designTipsItems.combineWithCards}</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{sk.bestPractices.commonDimensions}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li><code className="bg-muted px-1 rounded text-xs">h-4</code> - {sk.bestPractices.commonDimensionsItems.textLine}</li>
                  <li><code className="bg-muted px-1 rounded text-xs">h-8</code> - {sk.bestPractices.commonDimensionsItems.buttonInput}</li>
                  <li><code className="bg-muted px-1 rounded text-xs">h-12</code> - {sk.bestPractices.commonDimensionsItems.avatar}</li>
                  <li><code className="bg-muted px-1 rounded text-xs">h-48</code> - {sk.bestPractices.commonDimensionsItems.imageCard}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{sk.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{sk.accessibility.loadingStates}</h3>
                <p className="text-muted-foreground text-sm">
                  {sk.accessibility.loadingStatesDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{sk.accessibility.screenReaderAnnouncements}</h3>
                <p className="text-muted-foreground text-sm">
                  {sk.accessibility.screenReaderAnnouncementsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{sk.accessibility.bestPractices}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>{sk.accessibility.bestPracticesItems.notOnlyVisual}</li>
                  <li>{sk.accessibility.bestPracticesItems.textAlternatives}</li>
                  <li>{sk.accessibility.bestPracticesItems.matchContent}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{sk.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {sk.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{sk.rtl.ltr}</h4>
                  <div dir="ltr">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{sk.rtl.rtlLabel}</h4>
                  <div dir="rtl">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{sk.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/card">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{sk.related.card}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {sk.related.cardDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/progress">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{sk.related.progress}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {sk.related.progressDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/avatar">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{sk.related.avatar}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {sk.related.avatarDesc}
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
