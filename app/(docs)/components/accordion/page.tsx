'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Calendar, CreditCard, User } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const accordionProps: PropDefinition[] = [
  {
    name: 'type',
    type: '"single" | "multiple"',
    default: '"single"',
    required: false,
    description: 'Whether a single or multiple items can be opened at the same time',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'When type is "single", allows closing content when clicking trigger for an open item',
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    default: 'undefined',
    required: false,
    description: 'The value(s) of the item(s) to expand by default',
  },
  {
    name: 'value',
    type: 'string | string[]',
    default: 'undefined',
    required: false,
    description: 'The controlled value of the item(s) to expand',
  },
  {
    name: 'onValueChange',
    type: '(value: string | string[]) => void',
    default: 'undefined',
    required: false,
    description: 'Callback when the expanded item(s) change',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that you can customize.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It uses CSS animations for smooth transitions.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const multipleCode = `<Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Account</AccordionTrigger>
    <AccordionContent>
      Manage your account settings and preferences.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Security</AccordionTrigger>
    <AccordionContent>
      Update your password and security settings.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Notifications</AccordionTrigger>
    <AccordionContent>
      Configure your notification preferences.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const withIconsCode = `import { User, CreditCard, Calendar } from 'lucide-react'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="gap-2">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span>Profile</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      Update your profile information and photo.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger className="gap-2">
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4" />
        <span>Billing</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      Manage your billing information and subscriptions.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger className="gap-2">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span>Schedule</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      View and manage your scheduled events.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

export default function AccordionPage() {
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
            <li className="text-foreground font-medium">Accordion</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Accordion</h1>
          <p className="text-lg text-muted-foreground">
            A vertically stacked set of interactive headings that each reveal an associated section of content.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Preview</h2>
          <ComponentShowcase>
            <Accordion type="single" collapsible className="w-full max-w-md">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that you can customize.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It uses CSS animations for smooth transitions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
              <h3 className="text-lg font-semibold mb-4">Multiple Items Open</h3>
              <ComponentShowcase>
                <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full max-w-md">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Account</AccordionTrigger>
                    <AccordionContent>
                      Manage your account settings and preferences.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Security</AccordionTrigger>
                    <AccordionContent>
                      Update your password and security settings.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Notifications</AccordionTrigger>
                    <AccordionContent>
                      Configure your notification preferences.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentShowcase>
              <CodeBlock code={multipleCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Icons</h3>
              <ComponentShowcase>
                <Accordion type="single" collapsible className="w-full max-w-md">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      Update your profile information and photo.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Billing</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      Manage your billing information and subscriptions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Schedule</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      View and manage your scheduled events.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentShowcase>
              <CodeBlock code={withIconsCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support Example</h2>
          <p className="text-muted-foreground mb-6">
            The Accordion component automatically adapts to RTL layouts. Chevron icons position correctly and content flows naturally.
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Accordion type="single" collapsible className="w-full max-w-md">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Personal Information</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Update your name, email, and profile photo.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment Methods</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Manage your credit cards and payment options.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Subscription Plan</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  View and manage your subscription details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Props</h2>
          <PropsTable props={accordionProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - Move focus to the next accordion trigger</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd> - Toggle the focused accordion item</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> - Toggle the focused accordion item</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Home</kbd> - Move focus to the first trigger</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">End</kbd> - Move focus to the last trigger</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>role=&quot;button&quot; on the accordion trigger</li>
                  <li>aria-expanded indicates whether the item is expanded</li>
                  <li>aria-controls links trigger to its content panel</li>
                  <li>role=&quot;region&quot; on the content panel</li>
                  <li>aria-labelledby links panel to its trigger</li>
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
                The Accordion component is fully RTL-compatible with automatic layout adaptation.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Chevron icon positions correctly on the end side</li>
                <li>Content layout respects text direction</li>
                <li>Expand/collapse animations work naturally</li>
                <li>Focus indicators position correctly</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/tabs">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Tabs</h3>
                  <p className="text-sm text-muted-foreground">
                    Switch between different views
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/collapsible">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Collapsible</h3>
                  <p className="text-sm text-muted-foreground">
                    Expand and collapse content
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
