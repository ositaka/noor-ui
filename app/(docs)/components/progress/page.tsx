'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
const getProgressProps = (locale: 'en' | 'ar'): PropDefinition[] => [
  {
    name: 'value',
    type: 'number',
    default: '0',
    required: false,
    description: content[locale].progressComponent.props.value,
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    required: false,
    description: content[locale].progressComponent.props.max,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Progress } from '@/components/ui/progress'

<Progress value={33} />`

const withLabelCode = `<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Progress</span>
    <span>60%</span>
  </div>
  <Progress value={60} />
</div>`

const sizesCode = `<div className="space-y-4">
  <Progress value={50} className="h-1" />
  <Progress value={50} className="h-2" />
  <Progress value={50} className="h-3" />
  <Progress value={50} className="h-4" />
</div>`

const colorsCode = `<div className="space-y-4">
  <Progress value={50} className="[&>div]:bg-blue-500" />
  <Progress value={50} className="[&>div]:bg-green-500" />
  <Progress value={50} className="[&>div]:bg-red-500" />
</div>`

export default function ProgressPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const pc = content[locale].progressComponent
  const [uploadProgress, setUploadProgress] = React.useState(0)

  // Simulated upload
  const startUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

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
            <li className="text-foreground font-medium">{pc.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{pc.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {pc.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Progress value={66} className="w-full max-w-md" />
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.examples}</h2>

          <div className="space-y-8">
            {/* Basic */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{pc.examples.basic}</h3>
              <Card>
                <CardContent className="p-6">
                  <Progress value={33} className="w-[60%]" />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{pc.examples.withLabel}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2 w-[60%]">
                    <div className="flex justify-between text-sm">
                      <span>{pc.labels.progress}</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Shimmer */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{pc.examples.withShimmer}</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {pc.examples.shimmerDesc}
                  </p>
                  <Progress value={66} className="w-[60%]" />
                </CardContent>
              </Card>
            </div>

            {/* Different Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{pc.examples.differentSizes}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 w-[60%]">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{pc.sizes.extraSmall}</p>
                      <Progress value={50} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{pc.sizes.small}</p>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{pc.sizes.medium}</p>
                      <Progress value={50} className="h-3" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{pc.sizes.large}</p>
                      <Progress value={50} className="h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sizesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Different Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{pc.examples.differentColors}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 w-[60%]">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{pc.colors.blue}</p>
                      <Progress value={50} className="[&>div]:bg-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{pc.colors.green}</p>
                      <Progress value={50} className="[&>div]:bg-green-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{pc.colors.red}</p>
                      <Progress value={50} className="[&>div]:bg-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={colorsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Upload Example */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{pc.examples.uploadProgress}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 w-[60%]">
                    <Button onClick={startUpload}>{pc.buttons.startUpload}</Button>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{pc.labels.uploading}</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                      {uploadProgress === 100 && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {pc.labels.complete}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={getProgressProps(locale)} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{pc.accessibility.ariaRoles}</h3>
                <p className="text-muted-foreground">
                  {pc.accessibility.ariaRolesDesc}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{pc.accessibility.screenReaders}</h3>
                <p className="text-muted-foreground">
                  {pc.accessibility.screenReadersDesc}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{pc.accessibility.labels}</h3>
                <p className="text-muted-foreground">
                  {pc.accessibility.labelsDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.rtlConsiderations}</h2>
          <p className="text-muted-foreground mb-6">
            {pc.rtl.description}
          </p>
          <ComponentShowcase.Comparison ltrLabel={pc.rtl.ltr} rtlLabel={pc.rtl.rtlLabel}>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{pc.labels.loading}</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
          </ComponentShowcase.Comparison>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{pc.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/button">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{pc.related.button}</h3>
                  <p className="text-sm text-muted-foreground">
                    {pc.related.buttonDesc}
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
