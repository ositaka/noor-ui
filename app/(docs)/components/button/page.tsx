'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, ArrowLeft, Download, Heart, Trash2 } from 'lucide-react'
const buttonProps: PropDefinition[] = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
    default: "'primary'",
    required: false,
    description: 'Visual style variant of the button',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl' | 'icon'",
    default: "'md'",
    required: false,
    description: 'Size of the button',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Shows loading spinner and disables the button',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disables the button',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Render as a child element (useful with Next.js Link)',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import { Button } from '@/components/ui/button'

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

const rtlCode = `// RTL support is automatic!
// Icons will flip direction automatically

<Button>
  <ArrowLeft className="me-2 h-4 w-4" />
  {/* In RTL: Arrow points right, positioned on the end */}
  Back
</Button>`

export default function ButtonPage() {
  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
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
            <li className="text-foreground font-medium">Button</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Button</h1>
          <p className="text-xl text-muted-foreground">
            Triggers an action or event when clicked. Fully accessible with keyboard navigation
            and perfect RTL support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Button>Click me</Button>
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
            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Variants</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={variantsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sizes</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sizesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Icons</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Download className="me-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Heart className="me-2 h-4 w-4" />
                      Like
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="me-2 h-4 w-4" />
                      Delete
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
              <h3 className="text-lg font-semibold mb-4">Loading State</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button loading>Processing...</Button>
                    <Button variant="secondary" loading>
                      Loading
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={buttonProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: Focus the button</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: Activate the button</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  The button role is automatically announced. Use <code className="bg-muted px-1 rounded">aria-label</code> for
                  icon-only buttons.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><code className="bg-muted px-1 rounded">role=&quot;button&quot;</code>: Automatically applied to button elements</li>
                  <li><code className="bg-muted px-1 rounded">aria-disabled</code>: Set when disabled or loading</li>
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
                Buttons automatically support RTL layout. Icons positioned with logical properties
                (me-* for margin-inline-end, ms-* for margin-inline-start) will flip correctly.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <Button>
                      <ArrowLeft className="me-2 h-4 w-4" />
                      Back
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <Button>
                      <ArrowLeft className="me-2 h-4 w-4" />
                      رجوع
                    </Button>
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
            <Link href="/components/link">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Link</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Navigate between pages
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/icon-button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Icon Button</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Button with only an icon
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
