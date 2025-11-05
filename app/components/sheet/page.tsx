'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const sheetContentProps: PropDefinition[] = [
  {
    name: 'side',
    type: '"top" | "bottom" | "start" | "end"',
    default: '"end"',
    required: false,
    description: 'The side from which the sheet slides in',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>
        Sheet description or additional context goes here.
      </SheetDescription>
    </SheetHeader>
    <div className="py-4">
      Sheet content goes here
    </div>
  </SheetContent>
</Sheet>`

const sidesCode = `// Sheet from start (left in LTR, right in RTL)
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Start</Button>
  </SheetTrigger>
  <SheetContent side="start">
    <SheetHeader>
      <SheetTitle>Start Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

// Sheet from end (right in LTR, left in RTL)
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open End</Button>
  </SheetTrigger>
  <SheetContent side="end">
    <SheetHeader>
      <SheetTitle>End Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

// Sheet from top
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Top</Button>
  </SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Top Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

// Sheet from bottom
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Bottom</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Bottom Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`

const withFormCode = `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`

export default function SheetPage() {
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
            <li className="text-foreground font-medium">Sheet</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Sheet</h1>
          <p className="text-lg text-muted-foreground">
            Extends the Dialog component to display content that slides in from the edge of the screen.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Preview</h2>
          <ComponentShowcase>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet Title</SheetTitle>
                  <SheetDescription>
                    This is a sheet component that slides in from the side.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Sheet content goes here. You can add forms, lists, or any other content.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
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
              <h3 className="text-lg font-semibold mb-4">Different Sides</h3>
              <ComponentShowcase>
                <div className="flex flex-wrap gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Start</Button>
                    </SheetTrigger>
                    <SheetContent side="start">
                      <SheetHeader>
                        <SheetTitle>Start Sheet</SheetTitle>
                        <SheetDescription>
                          This sheet slides in from the start (left in LTR, right in RTL).
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open End</Button>
                    </SheetTrigger>
                    <SheetContent side="end">
                      <SheetHeader>
                        <SheetTitle>End Sheet</SheetTitle>
                        <SheetDescription>
                          This sheet slides in from the end (right in LTR, left in RTL).
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Top</Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                      <SheetHeader>
                        <SheetTitle>Top Sheet</SheetTitle>
                        <SheetDescription>
                          This sheet slides in from the top.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Bottom</Button>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                      <SheetHeader>
                        <SheetTitle>Bottom Sheet</SheetTitle>
                        <SheetDescription>
                          This sheet slides in from the bottom.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
              </ComponentShowcase>
              <CodeBlock code={sidesCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Form</h3>
              <ComponentShowcase>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" defaultValue="John Doe" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          defaultValue="john@example.com"
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </ComponentShowcase>
              <CodeBlock code={withFormCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support Example</h2>
          <p className="text-muted-foreground mb-6">
            The Sheet component automatically adapts to RTL layouts. The side properties (start/end) mirror correctly and slide animations flow naturally.
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <div className="flex gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open from Start</Button>
                </SheetTrigger>
                <SheetContent side="start">
                  <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>
                      Browse through the menu options.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      This sheet slides from the start side.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open from End</Button>
                </SheetTrigger>
                <SheetContent side="end">
                  <SheetHeader>
                    <SheetTitle>Settings Panel</SheetTitle>
                    <SheetDescription>
                      Configure your preferences.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      This sheet slides from the end side.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Props</h2>
          <PropsTable props={sheetContentProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Esc</kbd> - Close the sheet</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - Navigate between focusable elements within the sheet</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>role=&quot;dialog&quot; on the sheet content</li>
                  <li>aria-describedby links to the description</li>
                  <li>aria-labelledby links to the title</li>
                  <li>Focus is trapped within the sheet when open</li>
                  <li>Focus returns to trigger element when closed</li>
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
                The Sheet component is fully RTL-compatible with automatic side adaptation.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>side=&quot;start&quot; automatically positions on the right in RTL mode</li>
                <li>side=&quot;end&quot; automatically positions on the left in RTL mode</li>
                <li>Slide animations follow the correct direction</li>
                <li>Close button positions correctly</li>
                <li>Content layout respects text direction</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <Link href="/components/popover">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Popover</h3>
                  <p className="text-sm text-muted-foreground">
                    Floating content next to trigger
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
