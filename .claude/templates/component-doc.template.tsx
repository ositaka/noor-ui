'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentName } from '@/components/ui/component-name'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles } from 'lucide-react'

// Props definition for the main component
const componentNameProps: PropDefinition[] = [
  {
    name: 'variant',
    type: '"default" | "secondary" | "outline"',
    default: '"default"',
    required: false,
    description: 'Visual variant of the component',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    required: false,
    description: 'Size of the component',
  },
  {
    name: 'className',
    type: 'string',
    default: '-',
    required: false,
    description: 'Additional CSS classes',
  },
]

// Code examples as strings for syntax highlighting
const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import { ComponentName } from '@/components/ui/component-name'

export default function Example() {
  return (
    <ComponentName>
      Your content here
    </ComponentName>
  )
}`

const variantsCode = `<ComponentName variant="default">Default</ComponentName>
<ComponentName variant="secondary">Secondary</ComponentName>
<ComponentName variant="outline">Outline</ComponentName>`

const rtlCode = `// ComponentName automatically adapts to RTL layout
// Use logical properties (ms-, me-, ps-, pe-) for custom styling

<ComponentName className="ms-4">
  Content that works in both LTR and RTL
</ComponentName>`

export default function ComponentNamePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RTL Design</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DirectionToggle />
          </div>
        </div>
      </header>

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
            <li className="text-foreground font-medium">ComponentName</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">ComponentName</h1>
          <p className="text-xl text-muted-foreground">
            Brief description of what this component does and its primary use cases.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <ComponentName>
                Example component preview
              </ComponentName>
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
            {/* Example 1: Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Variants</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4">
                    <ComponentName variant="default">Default</ComponentName>
                    <ComponentName variant="secondary">Secondary</ComponentName>
                    <ComponentName variant="outline">Outline</ComponentName>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={variantsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Add more examples as needed */}
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={componentNameProps} />
          <p className="text-sm text-muted-foreground mt-4">
            The ComponentName component accepts all standard HTML element attributes.
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
                  <li>Use case 1</li>
                  <li>Use case 2</li>
                  <li>Use case 3</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Design Tips</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Design tip 1</li>
                  <li>Design tip 2</li>
                  <li>Design tip 3</li>
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
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li><kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Tab</kbd> - Focus next element</li>
                  <li><kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Enter</kbd> - Activate element</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Reader Support</h3>
                <p className="text-muted-foreground text-sm">
                  The component is fully accessible and announces state changes to screen readers.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Proper ARIA labels are automatically applied</li>
                  <li>State changes are announced via aria-live regions</li>
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
                The ComponentName component is fully RTL-compatible and automatically adjusts layout direction.
                All spacing and positioning use logical properties.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <ComponentName>Example content</ComponentName>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <ComponentName>محتوى تجريبي</ComponentName>
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
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Button</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Interactive button component
                  </p>
                </CardContent>
              </Card>
            </Link>
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
          </div>
        </section>
      </main>
    </div>
  )
}

/**
 * DOCUMENTATION CHECKLIST:
 *
 * ✅ Required page structure:
 *    - 'use client' directive at top
 *    - Full layout wrapper (header, breadcrumb, main)
 *    - DirectionToggle and ThemeToggle in header
 *
 * ✅ Required sections:
 *    - Page Header (title + description)
 *    - Preview (with ComponentShowcase)
 *    - Installation (with CodeBlock)
 *    - Usage (with CodeBlock)
 *    - Examples (minimum 2-3 with live demos + code)
 *    - Props (with PropsTable using PropDefinition[])
 *    - Best Practices (with Separator between sections)
 *    - Accessibility (with Separator between sections)
 *    - RTL Considerations (with LTR/RTL grid comparison)
 *    - Related Components
 *
 * ✅ Use proper components:
 *    - ComponentShowcase for interactive demos
 *    - CodeBlock for ALL code examples (syntax highlighting)
 *    - PropsTable for props documentation
 *    - Separator between subsections in cards
 *
 * ✅ Code examples:
 *    - Define as string constants at top of file
 *    - Pass to CodeBlock component
 *    - Include installation, basic usage, variants, RTL
 *
 * ✅ LTR/RTL showcase:
 *    - Grid with md:grid-cols-2
 *    - Explicit dir="ltr" and dir="rtl"
 *    - English text in LTR, Arabic text in RTL
 *
 * STEPS TO USE THIS TEMPLATE:
 * 1. Replace "ComponentName" with actual component name (PascalCase)
 * 2. Replace "component-name" with kebab-case version in imports and links
 * 3. Update componentNameProps with actual props
 * 4. Update all code example strings
 * 5. Add real examples with live demos
 * 6. Add component to /app/components/page.tsx
 * 7. Add component to /lib/search-data.ts
 * 8. Test in both LTR and RTL modes
 */
