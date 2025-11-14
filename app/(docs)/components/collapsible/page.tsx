'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronDown, ChevronRight, ChevronsUpDown } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const collapsibleProps: PropDefinition[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    required: false,
    description: 'Controlled open state',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Default open state (uncontrolled)',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    required: false,
    description: 'Callback when open state changes',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether the collapsible is disabled',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

<Collapsible>
  <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
  <CollapsibleContent>
    This content can be collapsed
  </CollapsibleContent>
</Collapsible>`

const controlledCode = `const [isOpen, setIsOpen] = useState(false)

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      {isOpen ? 'Hide' : 'Show'} Details
      <ChevronDown className={cn(
        "h-4 w-4 transition-transform",
        isOpen && "rotate-180"
      )} />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2 p-4 border rounded">
    <p>Here are the hidden details that can be toggled.</p>
  </CollapsibleContent>
</Collapsible>`

const sidebarCode = `const [isOpen, setIsOpen] = useState(true)

<div className="w-72 border rounded-lg p-4">
  <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-semibold">Starred Repositories</h4>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm">
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
    </div>
    <CollapsibleContent className="mt-2 space-y-2">
      <div className="rounded-md border px-4 py-2 text-sm">
        rtl-design-system
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">
        react-components
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">
        typescript-utils
      </div>
    </CollapsibleContent>
  </Collapsible>
</div>`

const rtlCode = `// RTL support is automatic!
// Chevron icons automatically flip in RTL mode

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      <span>التفاصيل</span>
      <ChevronDown className="h-4 w-4 ms-2" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2 p-4 border rounded">
    <p>هذا المحتوى يمكن طيه وعرضه</p>
  </CollapsibleContent>
</Collapsible>`

export default function CollapsiblePage() {
  const { locale } = useDirection()
  const t = content[locale]
  const [isOpen1, setIsOpen1] = React.useState(false)
  const [isOpen2, setIsOpen2] = React.useState(true)
  const [isOpen3, setIsOpen3] = React.useState(false)

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
            <li className="text-foreground font-medium">{t.collapsibleComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.collapsibleComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.collapsibleComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.collapsibleComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-md space-y-4">
                <Collapsible open={isOpen1} onOpenChange={setIsOpen1}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Can I use this in my project?</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isOpen1 ? 'rotate-180' : ''
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 p-4 border rounded">
                    <p className="text-sm text-muted-foreground">
                      Yes! This component is free and open source. You can use it in any project,
                      commercial or personal.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
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

        {/* Composition Pattern */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Composition Pattern</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                The Collapsible component follows a composition pattern with three sub-components:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">Collapsible</code> - Root component
                    managing state
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CollapsibleTrigger</code> - Button to
                    toggle open/closed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CollapsibleContent</code> - Content that
                    collapses/expands
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* Controlled with Icon */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Controlled with Animated Icon</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <Collapsible open={isOpen2} onOpenChange={setIsOpen2}>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span>{isOpen2 ? 'Hide' : 'Show'} Details</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isOpen2 ? 'rotate-180' : ''
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 p-4 border rounded">
                        <p className="text-sm text-muted-foreground">
                          This collapsible is controlled, meaning you manage the open state. The
                          chevron rotates smoothly when toggled.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={controlledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Sidebar Style */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sidebar Style</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <div className="border rounded-lg p-4">
                      <Collapsible open={isOpen3} onOpenChange={setIsOpen3}>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold">Starred Repositories</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronsUpDown className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="mt-2 space-y-2">
                          <div className="rounded-md border px-4 py-2 text-sm">
                            rtl-design-system
                          </div>
                          <div className="rounded-md border px-4 py-2 text-sm">
                            react-components
                          </div>
                          <div className="rounded-md border px-4 py-2 text-sm">
                            typescript-utils
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sidebarCode} language="tsx" collapsible />
              </div>
            </div>

            {/* FAQ Style */}
            <div>
              <h3 className="text-lg font-semibold mb-4">FAQ Style</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl space-y-2">
                    {[
                      {
                        q: 'What is this design system?',
                        a: 'An RTL-first design system built for the GCC market with full bilingual support.',
                      },
                      {
                        q: 'How do I install it?',
                        a: 'Simply run npm install @noorui/components and import the components you need.',
                      },
                      {
                        q: 'Is it accessible?',
                        a: 'Yes! All components are WCAG AA compliant with full keyboard navigation.',
                      },
                    ].map((item, index) => (
                      <Collapsible key={index}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between p-4 h-auto font-normal"
                          >
                            <span className="text-start font-medium">{item.q}</span>
                            <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-90" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground">{item.a}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Collapsible</h3>
              <PropsTable props={collapsibleProps} />
            </div>
          </div>
          <Card className="mt-6">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                This component is built on top of Radix UI&apos;s Collapsible primitive. For additional
                props, refer to the{' '}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/collapsible"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Radix UI documentation
                </a>
                .
              </p>
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
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Space</code>
                    <span>Toggles the collapsible when trigger is focused</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Enter</code>
                    <span>Toggles the collapsible when trigger is focused</span>
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <p className="text-muted-foreground text-sm">
                  The component automatically manages aria-expanded and aria-controls for screen
                  reader users. The trigger button communicates whether the content is currently
                  expanded or collapsed.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Visual Indicators</h3>
                <p className="text-muted-foreground text-sm">
                  Always include a visual indicator (like a chevron icon) that shows the current
                  state. Animate the indicator to provide feedback when the state changes.
                </p>
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
                Collapsible components automatically support RTL layout. Icons position correctly
                using logical properties and rotate appropriately.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span>Show Details</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 p-4 border rounded text-sm">
                        This content can be collapsed
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span>إظهار التفاصيل</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 p-4 border rounded text-sm">
                        يمكن طي هذا المحتوى
                      </CollapsibleContent>
                    </Collapsible>
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
            <Link href="/components/accordion">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Accordion</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Multiple collapsibles with single-open behavior
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/tabs">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Tabs</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Organize content in tabbed sections
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/dialog">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Dialog</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modal dialogs for focused content
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
