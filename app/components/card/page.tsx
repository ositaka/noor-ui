'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Bell, Settings, User } from 'lucide-react'

const cardProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply',
  },
]

const cardHeaderProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply',
  },
]

const cardTitleProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply (renders as h3)',
  },
]

const cardDescriptionProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply',
  },
]

const cardContentProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply',
  },
]

const cardFooterProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import { Card, CardContent } from '@/components/ui/card'

<Card>
  <CardContent className="p-6">
    This is a basic card
  </CardContent>
</Card>`

const fullCardCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`

const formCardCode = `<Card>
  <CardHeader>
    <CardTitle>Create Account</CardTitle>
    <CardDescription>Enter your details below</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Create Account</Button>
  </CardFooter>
</Card>`

const interactiveCardCode = `<Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50">
  <CardHeader>
    <div className="flex items-start justify-between">
      <div>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages</CardDescription>
      </div>
      <Bell className="h-5 w-5 text-primary" />
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Click to view all notifications
    </p>
  </CardContent>
</Card>`

const gridCardCode = `<div className="grid gap-4 md:grid-cols-3">
  <Card>
    <CardHeader>
      <CardTitle>Total Users</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">1,234</div>
      <p className="text-xs text-muted-foreground">+20% from last month</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Revenue</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">$45,231</div>
      <p className="text-xs text-muted-foreground">+15% from last month</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Active</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">573</div>
      <p className="text-xs text-muted-foreground">+10% from last month</p>
    </CardContent>
  </Card>
</div>`

const rtlCode = `// RTL support is automatic!
// Cards maintain proper spacing and alignment in RTL

<Card>
  <CardHeader>
    <CardTitle>العنوان</CardTitle>
    <CardDescription>الوصف هنا</CardDescription>
  </CardHeader>
  <CardContent>
    المحتوى يتدفق بشكل صحيح من اليمين إلى اليسار
  </CardContent>
</Card>`

export default function CardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main id="main-content" className="flex-1 container py-12">
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
            <li className="text-foreground font-medium">Card</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Card</h1>
          <p className="text-xl text-muted-foreground">
            A flexible container for grouping related content. Composed of multiple sub-components
            for headers, content, and footers with full RTL support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the card content area where you can place any components.</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>
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
                The Card component follows a composition pattern with six sub-components:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">Card</code> - Main container with border,
                    shadow, and rounded corners
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardHeader</code> - Container for title
                    and description with padding
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardTitle</code> - Renders as h3, styled
                    for headings
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardDescription</code> - Muted text for
                    descriptions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardContent</code> - Main content area with
                    padding
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardFooter</code> - Bottom section,
                    typically for actions
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
            {/* Full Card */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Full Card with All Components</h3>
              <Card>
                <CardContent className="p-6">
                  <Card className="max-w-md">
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card description goes here</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card content goes here. You can add any components or content.</p>
                    </CardContent>
                    <CardFooter>
                      <Button>Action</Button>
                    </CardFooter>
                  </Card>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={fullCardCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Form Card */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Card with Form</h3>
              <Card>
                <CardContent className="p-6">
                  <Card className="max-w-md">
                    <CardHeader>
                      <CardTitle>Create Account</CardTitle>
                      <CardDescription>Enter your details below</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Create Account</Button>
                    </CardFooter>
                  </Card>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={formCardCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Interactive Card */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Interactive Card</h3>
              <Card>
                <CardContent className="p-6">
                  <Card className="max-w-md cursor-pointer transition-all hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>Notifications</CardTitle>
                          <CardDescription>You have 3 unread messages</CardDescription>
                        </div>
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Click to view all notifications
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={interactiveCardCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Grid Cards */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Card Grid (Dashboard Stats)</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">$45,231</div>
                        <p className="text-xs text-muted-foreground">+15% from last month</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Active</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={gridCardCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Card</h3>
              <PropsTable props={cardProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">CardHeader</h3>
              <PropsTable props={cardHeaderProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">CardTitle</h3>
              <PropsTable props={cardTitleProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">CardDescription</h3>
              <PropsTable props={cardDescriptionProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">CardContent</h3>
              <PropsTable props={cardContentProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">CardFooter</h3>
              <PropsTable props={cardFooterProps} />
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Semantic Structure</h3>
                <p className="text-muted-foreground">
                  CardTitle renders as an <code className="bg-muted px-1 rounded">h3</code> element
                  for proper heading hierarchy. Adjust with className if different heading level needed.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Interactive Cards</h3>
                <p className="text-muted-foreground">
                  For clickable cards, wrap in a button or add proper role, tabIndex, and keyboard handlers:
                </p>
                <CodeBlock
                  code={`<Card
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  {/* Card content */}
</Card>`}
                  language="tsx"
                  collapsible
                />
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Color Contrast</h3>
                <p className="text-muted-foreground">
                  All card text colors meet WCAG AA contrast requirements. CardDescription uses muted
                  colors while maintaining readability.
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
                Cards automatically support RTL layout. All spacing and alignment adjust correctly
                for right-to-left languages.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <Card>
                      <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>Manage your preferences</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Content flows left to right</p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm">Save</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <Card>
                      <CardHeader>
                        <CardTitle>الإعدادات</CardTitle>
                        <CardDescription>إدارة تفضيلاتك</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">المحتوى يتدفق من اليمين إلى اليسار</p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm">حفظ</Button>
                      </CardFooter>
                    </Card>
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
                    Common action in card footers
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Input</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Form inputs in card content
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/badge">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Badge</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Status indicators in cards
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
