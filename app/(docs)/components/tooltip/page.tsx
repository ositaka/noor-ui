import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tooltip | RTL Design System',
  description: 'Contextual popup displaying additional information on hover or focus. Automatic positioning in RTL layouts.',
  keywords: ['tooltip', 'popover', 'hint', 'help text', 'hover', 'rtl', 'react', 'nextjs', 'accessibility'],
}

'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Info, Plus, Settings, Trash2 } from 'lucide-react'
const tooltipProps: PropDefinition[] = [
  {
    name: 'side',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"top"',
    required: false,
    description: 'Which side to display the tooltip',
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: '4',
    required: false,
    description: 'Distance from the trigger in pixels',
  },
  {
    name: 'align',
    type: '"start" | "center" | "end"',
    default: '"center"',
    required: false,
    description: 'Alignment relative to the trigger',
  },
  {
    name: 'delayDuration',
    type: 'number',
    default: '700',
    required: false,
    description: 'Delay in ms before tooltip appears (set on TooltipProvider)',
  },
]

const installCode = `npm install @rtl-design-system/core`

const setupCode = `// app/layout.tsx
import { TooltipProvider } from '@/components/ui/tooltip'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}`

const basicUsageCode = `import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

// TooltipProvider is already set up globally in your layout
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>`

const sidesCode = `<div className="flex gap-4">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Top</Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <p>Tooltip on top</p>
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Bottom</Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">
      <p>Tooltip on bottom</p>
    </TooltipContent>
  </Tooltip>
</div>`

const iconCode = `<div className="flex gap-2">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Info className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>More information</p>
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add item</p>
    </TooltipContent>
  </Tooltip>
</div>`

export default function TooltipPage() {
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
            <li className="text-foreground font-medium">Tooltip</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Tooltip</h1>
          <p className="text-xl text-muted-foreground">
            A popup that displays information related to an element when it receives keyboard focus or the mouse hovers over it.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Setup */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Setup</h2>
          <p className="text-muted-foreground mb-4">
            Wrap your app with TooltipProvider in your root layout:
          </p>
          <CodeBlock code={setupCode} language="tsx" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* Basic */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Tooltip</h3>
              <Card>
                <CardContent className="p-6">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to library</p>
                      </TooltipContent>
                    </Tooltip>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Different Sides */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Different Sides</h3>
              <Card>
                <CardContent className="p-6">
                    <div className="flex gap-4 flex-wrap">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Top</Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Tooltip on top</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Bottom</Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Tooltip on bottom</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Left</Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Tooltip on left</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Right</Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Tooltip on right</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sidesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Icon Buttons</h3>
              <Card>
                <CardContent className="p-6">
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>More information</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add item</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Settings</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={iconCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support Example</h2>
          <p className="text-muted-foreground mb-6">
            The Tooltip component automatically adapts to RTL layouts. Positioning mirrors correctly and content flows naturally.
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Info className="me-2 h-4 w-4" />
                    Help
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click here for more information</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Settings className="me-2 h-4 w-4" />
                    Settings
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configure your preferences</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={tooltipProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <p className="text-muted-foreground">
                  Tooltip appears on focus and hover. Use <kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> to navigate.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Screen Readers</h3>
                <p className="text-muted-foreground">
                  Tooltip content is announced when the trigger receives focus using <code className="px-1.5 py-0.5 rounded bg-muted">aria-describedby</code>.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Best Practice</h3>
                <p className="text-muted-foreground">
                  Always use tooltips for supplementary information, not critical content.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support</h2>
          <p className="text-muted-foreground mb-6">
            The Tooltip component automatically adapts to RTL layouts.
          </p>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-semibold mb-2">Key RTL Features:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Tooltip positioning mirrors automatically (left ↔ right)</li>
                <li>Text alignment follows the direction</li>
                <li>Animations work correctly in both directions</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/button">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Button</h3>
                  <p className="text-sm text-muted-foreground">
                    Interactive buttons
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
