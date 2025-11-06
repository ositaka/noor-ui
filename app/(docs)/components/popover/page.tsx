'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const popoverContentProps: PropDefinition[] = [
  {
    name: 'align',
    type: '"start" | "center" | "end"',
    default: '"center"',
    required: false,
    description: 'The preferred alignment against the trigger',
  },
  {
    name: 'side',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    required: false,
    description: 'The preferred side of the trigger to render against',
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: '4',
    required: false,
    description: 'The distance in pixels from the trigger',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-medium leading-none">Popover Title</h4>
      <p className="text-sm text-muted-foreground">
        Popover content goes here.
      </p>
    </div>
  </PopoverContent>
</Popover>`

const positioningCode = `// Top
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Top</Button>
  </PopoverTrigger>
  <PopoverContent side="top">
    Content positioned on top
  </PopoverContent>
</Popover>

// Right
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Right</Button>
  </PopoverTrigger>
  <PopoverContent side="right">
    Content positioned on right
  </PopoverContent>
</Popover>

// Bottom
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Bottom</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom">
    Content positioned on bottom
  </PopoverContent>
</Popover>

// Left
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Left</Button>
  </PopoverTrigger>
  <PopoverContent side="left">
    Content positioned on left
  </PopoverContent>
</Popover>`

const withFormCode = `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <Settings className="me-2 h-4 w-4" />
      Settings
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Settings</h4>
        <p className="text-sm text-muted-foreground">
          Configure your preferences
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="width">Width</Label>
        <Input id="width" defaultValue="100%" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="height">Height</Label>
        <Input id="height" defaultValue="25px" />
      </div>
      <Button className="w-full">Save</Button>
    </div>
  </PopoverContent>
</Popover>`

export default function PopoverPage() {
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
            <li className="text-foreground font-medium">Popover</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Popover</h1>
          <p className="text-lg text-muted-foreground">
            Displays rich content in a portal, triggered by a button with flexible positioning.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Preview</h2>
          <ComponentShowcase>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Popover Title</h4>
                  <p className="text-sm text-muted-foreground">
                    This is a popover with some example content.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Installation</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Positioning</h3>
              <ComponentShowcase>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Top</Button>
                    </PopoverTrigger>
                    <PopoverContent side="top">
                      <p className="text-sm">Content positioned on top</p>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Right</Button>
                    </PopoverTrigger>
                    <PopoverContent side="right">
                      <p className="text-sm">Content positioned on right</p>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Bottom</Button>
                    </PopoverTrigger>
                    <PopoverContent side="bottom">
                      <p className="text-sm">Content positioned on bottom</p>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Left</Button>
                    </PopoverTrigger>
                    <PopoverContent side="left">
                      <p className="text-sm">Content positioned on left</p>
                    </PopoverContent>
                  </Popover>
                </div>
              </ComponentShowcase>
              <CodeBlock code={positioningCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Form</h3>
              <ComponentShowcase>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Settings className="me-2 h-4 w-4" />
                      Settings
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                          Set the dimensions for the layer.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="width">Width</Label>
                        <Input id="width" defaultValue="100%" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input id="height" defaultValue="25px" />
                      </div>
                      <Button className="w-full">Save changes</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </ComponentShowcase>
              <CodeBlock code={withFormCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support Example</h2>
          <p className="text-muted-foreground mb-6">
            The Popover component automatically adapts to RTL layouts. Positioning mirrors correctly and content flows naturally.
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Settings className="me-2 h-4 w-4" />
                  Quick Settings
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Display Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Adjust your display preferences.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brightness">Brightness</Label>
                    <Input id="brightness" defaultValue="75%" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contrast">Contrast</Label>
                    <Input id="contrast" defaultValue="100%" />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Props</h2>
          <PropsTable props={popoverContentProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd> - Open/close the popover</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> - Open/close the popover</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Esc</kbd> - Close the popover</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - Navigate through focusable elements in the popover</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Trigger has aria-expanded indicating open state</li>
                  <li>Trigger has aria-controls linking to the popover content</li>
                  <li>Popover content is rendered in a portal for proper stacking</li>
                  <li>Focus management when opening and closing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">RTL Support</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                The Popover component is fully RTL-compatible with automatic positioning adaptation.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Positioning automatically adapts to text direction</li>
                <li>Left/right sides mirror in RTL mode</li>
                <li>Content layout respects text direction</li>
                <li>Animations flow naturally in both directions</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/tooltip">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Tooltip</h3>
                  <p className="text-sm text-muted-foreground">
                    Display brief helper text
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/dialog">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Dialog</h3>
                  <p className="text-sm text-muted-foreground">
                    Modal dialog for focused content
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/sheet">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Sheet</h3>
                  <p className="text-sm text-muted-foreground">
                    Slide-in panel from edge
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
