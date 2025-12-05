'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Home, Folder, File } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getBreadcrumbProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'separator',
    type: 'React.ReactNode',
    default: '<ChevronRight />',
    required: false,
    description: t.breadcrumbComponent.props.separator,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`

const customSeparatorCode = `import { Slash } from 'lucide-react'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <Slash />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/documentation">Documentation</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <Slash />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`

const withIconsCode = `import { Home, Folder, File } from 'lucide-react'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" className="flex items-center gap-2">
        <Home className="h-4 w-4" />
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/examples" className="flex items-center gap-2">
        <Folder className="h-4 w-4" />
        Examples
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage className="flex items-center gap-2">
        <File className="h-4 w-4" />
        Document
      </BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`

export default function BreadcrumbComponentPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const breadcrumbProps = getBreadcrumbProps(t)

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
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
            <li className="text-foreground font-medium">{t.breadcrumbComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.breadcrumbComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.breadcrumbComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.breadcrumbComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">{t.breadcrumbComponent.demo.home}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">{t.breadcrumbComponent.demo.components}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{t.breadcrumbComponent.demo.breadcrumb}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.breadcrumbComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.breadcrumbComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.breadcrumbComponent.examples.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Separator</h3>
              <ComponentShowcase>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">{t.breadcrumbComponent.demo.home}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/documentation">{t.breadcrumbComponent.demo.documentation}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage>{t.breadcrumbComponent.demo.breadcrumb}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </ComponentShowcase>
              <CodeBlock code={customSeparatorCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Icons</h3>
              <ComponentShowcase>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        {t.breadcrumbComponent.demo.home}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/examples" className="flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        {t.breadcrumbComponent.demo.examples}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="flex items-center gap-2">
                        <File className="h-4 w-4" />
                        {t.breadcrumbComponent.demo.document}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </ComponentShowcase>
              <CodeBlock code={withIconsCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support Example</h2>
          <p className="text-muted-foreground mb-6">
            {t.breadcrumbComponent.rtlExampleDesc}
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    {t.breadcrumbComponent.demo.home}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components" className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    {t.breadcrumbComponent.demo.components}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-2">
                    <File className="h-4 w-4" />
                    {t.breadcrumbComponent.demo.details}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.breadcrumbComponent.props.title}</h2>
          <PropsTable props={breadcrumbProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.breadcrumbComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.breadcrumbComponent.accessibilityDetails.keyboard}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - {t.breadcrumbComponent.accessibilityDetails.tab}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> - {t.breadcrumbComponent.accessibilityDetails.enter}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.breadcrumbComponent.accessibilityDetails.ariaAttributes}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>{t.breadcrumbComponent.accessibilityDetails.ariaLabel}</li>
                  <li>{t.breadcrumbComponent.accessibilityDetails.ariaCurrent}</li>
                  <li>{t.breadcrumbComponent.accessibilityDetails.ariaHidden}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.breadcrumbComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {t.breadcrumbComponent.rtl.description}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{t.breadcrumbComponent.rtlDetails.layoutDirection}</li>
                <li>{t.breadcrumbComponent.rtlDetails.separatorMirror}</li>
                <li>{t.breadcrumbComponent.rtlDetails.linkOrder}</li>
                <li>{t.breadcrumbComponent.rtlDetails.focusIndicators}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.breadcrumbComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/pagination">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.breadcrumbComponent.related.pagination}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.breadcrumbComponent.related.paginationDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/tabs">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.breadcrumbComponent.related.tabs}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.breadcrumbComponent.related.tabsDesc}
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
