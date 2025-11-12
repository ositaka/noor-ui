'use client'

import * as React from 'react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'

const skeletonProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: '-',
    required: false,
    description: 'Additional CSS classes for custom size and shape',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
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
  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
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
            <li className="text-foreground font-medium">Skeleton</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Skeleton</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Animated loading placeholder component to improve perceived performance while content loads.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* Card Skeleton */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Card Skeleton</h3>
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
              <h3 className="text-lg font-semibold mb-4">Profile Skeleton</h3>
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
              <h3 className="text-lg font-semibold mb-4">List Skeleton</h3>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={skeletonProps} />
          <p className="text-sm text-muted-foreground mt-4">
            The Skeleton component accepts all standard HTML div attributes.
          </p>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Best Practices</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">When to Use</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Loading initial page content</li>
                  <li>Fetching data from an API</li>
                  <li>Loading images or media</li>
                  <li>Processing user actions</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Design Tips</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Match skeleton shapes to actual content dimensions</li>
                  <li>Use multiple skeletons to represent complex layouts</li>
                  <li>Keep skeleton patterns simple and recognizable</li>
                  <li>Combine with cards to show content boundaries</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Common Dimensions</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li><code className="bg-muted px-1 rounded text-xs">h-4</code> - Text line (16px)</li>
                  <li><code className="bg-muted px-1 rounded text-xs">h-8</code> - Button/Input (32px)</li>
                  <li><code className="bg-muted px-1 rounded text-xs">h-12</code> - Avatar (48px)</li>
                  <li><code className="bg-muted px-1 rounded text-xs">h-48</code> - Image/Card (192px)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Loading States</h3>
                <p className="text-muted-foreground text-sm">
                  Add <code className="bg-muted px-1 rounded">aria-busy=&quot;true&quot;</code> to container during loading
                  to inform screen readers that content is being loaded.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Reader Announcements</h3>
                <p className="text-muted-foreground text-sm">
                  Use <code className="bg-muted px-1 rounded">aria-live=&quot;polite&quot;</code> to announce when content
                  finishes loading. Provide descriptive labels like <code className="bg-muted px-1 rounded">aria-label=&quot;Loading content&quot;</code>.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Best Practices</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Don&apos;t rely solely on visual loading indicators</li>
                  <li>Provide text alternatives for screen readers</li>
                  <li>Ensure skeleton shapes closely match final content</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Considerations</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Skeleton components automatically adapt to RTL layout. Use <code className="bg-muted px-1 rounded">space-x-reverse</code> for
                horizontal spacing in RTL mode.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
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
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/card">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Card</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Container for grouping content
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/progress">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Progress</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Progress bar for determinate loading
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/avatar">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Avatar</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    User avatar component
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
