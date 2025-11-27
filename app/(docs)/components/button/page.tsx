'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Download, Heart, Trash2 } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
const getButtonProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
    default: "'primary'",
    required: false,
    description: t.buttonComponent.props.variant,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl' | 'icon'",
    default: "'md'",
    required: false,
    description: t.buttonComponent.props.size,
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.buttonComponent.props.loading,
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.buttonComponent.props.disabled,
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.buttonComponent.props.asChild,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Button } from 'noorui-rtl'

<Button variant="primary">
  Click me
</Button>`

const variantsCode = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`

const sizesCode = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`

const withIconsCode = `import { Download, Heart } from 'lucide-react'

<Button>
  <Download className="me-2 h-4 w-4" />
  Download
</Button>

<Button variant="outline">
  <Heart className="me-2 h-4 w-4" />
  Like
</Button>`

const loadingCode = `<Button loading>
  Processing...
</Button>`

const rtlCode = `// RTL support is automatic with ButtonArrow!
// Use semantic directions: 'forward' or 'back'

import { ButtonArrow } from 'noorui-rtl'

// Back button - arrow automatically flips in RTL
<ButtonArrow direction="back">
  Back
</ButtonArrow>

// Forward button with arrow style
<ButtonArrow direction="forward" icon="arrow">
  Continue
</ButtonArrow>`

export default function ButtonPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const buttonProps = getButtonProps(t)

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
            <li className="text-foreground font-medium">{t.buttonComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.buttonComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.buttonComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Button>{t.buttonComponent.clickMe}</Button>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.examples}</h2>

          <div className="space-y-8">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentDocs.variants}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">{t.buttonComponent.primary}</Button>
                    <Button variant="secondary">{t.buttonComponent.secondary}</Button>
                    <Button variant="destructive">{t.buttonComponent.destructive}</Button>
                    <Button variant="outline">{t.buttonComponent.outline}</Button>
                    <Button variant="ghost">{t.buttonComponent.ghost}</Button>
                    <Button variant="link">{t.buttonComponent.link}</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={variantsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentDocs.sizes}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">{t.buttonComponent.small}</Button>
                    <Button size="md">{t.buttonComponent.medium}</Button>
                    <Button size="lg">{t.buttonComponent.large}</Button>
                    <Button size="xl">{t.buttonComponent.extraLarge}</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sizesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentDocs.withIcons}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Download className="me-2 h-4 w-4" />
                      {t.buttonComponent.download}
                    </Button>
                    <Button variant="outline">
                      <Heart className="me-2 h-4 w-4" />
                      {t.buttonComponent.like}
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="me-2 h-4 w-4" />
                      {t.buttonComponent.delete}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withIconsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Loading State */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentDocs.loadingState}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button loading>{t.buttonComponent.processing}</Button>
                    <Button variant="secondary" loading>
                      {t.buttonComponent.loading}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={loadingCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={buttonProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.componentDocs.keyboardNavigation}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {t.buttonComponent.keyboardTabDesc}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: {t.buttonComponent.keyboardEnterDesc}</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.componentDocs.screenReader}</h3>
                <p className="text-muted-foreground">
                  {t.buttonComponent.screenReaderDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.componentDocs.ariaAttributes}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><code className="bg-muted px-1 rounded">role=&quot;button&quot;</code>: {t.buttonComponent.ariaRoleDesc}</li>
                  <li><code className="bg-muted px-1 rounded">aria-disabled</code>: {t.buttonComponent.ariaDisabledDesc}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.rtlConsiderations}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.componentDocs.rtlSupport}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentDocs.ltr}</h4>
                  <div dir="ltr" className="flex gap-2">
                    <ButtonArrow direction="back">
                      Back
                    </ButtonArrow>
                    <ButtonArrow direction="forward" icon="arrow">
                      Continue
                    </ButtonArrow>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentDocs.rtl}</h4>
                  <div dir="rtl" className="flex gap-2">
                    <ButtonArrow direction="back">
                      {t.buttonComponent.back}
                    </ButtonArrow>
                    <ButtonArrow direction="forward" icon="arrow">
                      {t.buttonComponent.continue || 'Continue'}
                    </ButtonArrow>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  )
}
