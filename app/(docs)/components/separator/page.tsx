'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { BestPractices } from '@/components/docs/best-practices'
import { Home, Settings, User, Bell } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getSeparatorProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    required: false,
    description: t.separatorComponent.props.orientation,
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'true',
    required: false,
    description: t.separatorComponent.props.decorative,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.separatorComponent.props.className,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Separator } from '@/components/ui/separator'

<div>
  <p>Content above</p>
  <Separator />
  <p>Content below</p>
</div>`

const horizontalCode = `<div className="space-y-4">
  <div>
    <h3 className="font-semibold">Section One</h3>
    <p className="text-sm text-muted-foreground">First section content</p>
  </div>
  <Separator />
  <div>
    <h3 className="font-semibold">Section Two</h3>
    <p className="text-sm text-muted-foreground">Second section content</p>
  </div>
</div>`

const verticalCode = `<div className="flex items-center gap-4">
  <Button>Home</Button>
  <Separator orientation="vertical" className="h-6" />
  <Button>About</Button>
  <Separator orientation="vertical" className="h-6" />
  <Button>Contact</Button>
</div>`

const inCardCode = `<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>Manage your profile settings</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div>
      <h4 className="font-semibold mb-2">Personal Information</h4>
      <p className="text-sm text-muted-foreground">Update your personal details</p>
    </div>
    <Separator />
    <div>
      <h4 className="font-semibold mb-2">Account Settings</h4>
      <p className="text-sm text-muted-foreground">Manage your account preferences</p>
    </div>
    <Separator />
    <div>
      <h4 className="font-semibold mb-2">Privacy & Security</h4>
      <p className="text-sm text-muted-foreground">Control your privacy settings</p>
    </div>
  </CardContent>
</Card>`

const navigationCode = `<nav className="flex items-center gap-2 p-4">
  <a href="/" className="font-medium hover:text-primary">Home</a>
  <Separator orientation="vertical" className="h-4" />
  <a href="/components" className="font-medium hover:text-primary">Components</a>
  <Separator orientation="vertical" className="h-4" />
  <a href="/examples" className="font-medium hover:text-primary">Examples</a>
  <Separator orientation="vertical" className="h-4" />
  <a href="/documentation" className="font-medium hover:text-primary">Documentation</a>
</nav>`

const listCode = `<ul className="space-y-3">
  <li className="flex items-center gap-3">
    <Home className="h-4 w-4" />
    <span>Dashboard</span>
  </li>
  <Separator />
  <li className="flex items-center gap-3">
    <Settings className="h-4 w-4" />
    <span>Settings</span>
  </li>
  <Separator />
  <li className="flex items-center gap-3">
    <User className="h-4 w-4" />
    <span>Profile</span>
  </li>
  <Separator />
  <li className="flex items-center gap-3">
    <Bell className="h-4 w-4" />
    <span>Notifications</span>
  </li>
</ul>`

const customStyleCode = `// Thicker separator
<Separator className="h-1" />

// Custom color
<Separator className="bg-primary" />

// Dashed separator
<Separator className="border-t border-dashed bg-transparent" />

// Gradient separator
<Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />`

const semanticCode = `// Decorative (default) - purely visual, no semantic meaning
<Separator decorative />

// Semantic - announces to screen readers as a separator
<Separator decorative={false} />`

const rtlCode = `// RTL support is automatic!
// Separators work identically in RTL layouts

<div className="space-y-4">
  <div>المحتوى الأول</div>
  <Separator />
  <div>المحتوى الثاني</div>
</div>`

export default function SeparatorPage() {
  const { locale, direction } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]
  const separatorProps = getSeparatorProps(t)

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
            <li className="text-foreground font-medium">{t.separatorComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.separatorComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.separatorComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.separatorComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-md space-y-4">
                <div>
                  <p className="text-sm">Content above separator</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm">Content below separator</p>
                </div>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.separatorComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.separatorComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.separatorComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* Horizontal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.separatorComponent.examples.horizontal}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Section One</h3>
                      <p className="text-sm text-muted-foreground">First section content</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold">Section Two</h3>
                      <p className="text-sm text-muted-foreground">Second section content</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold">Section Three</h3>
                      <p className="text-sm text-muted-foreground">Third section content</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={horizontalCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Vertical */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.separatorComponent.examples.vertical}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Button variant="outline">Home</Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline">About</Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline">Services</Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline">Contact</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={verticalCode} language="tsx" collapsible />
              </div>
            </div>

            {/* In Cards */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.separatorComponent.examples.inCards}</h3>
              <Card>
                <CardContent className="p-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Profile</CardTitle>
                      <CardDescription>Manage your profile settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Personal Information</h4>
                        <p className="text-sm text-muted-foreground">
                          Update your personal details
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Account Settings</h4>
                        <p className="text-sm text-muted-foreground">
                          Manage your account preferences
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Privacy & Security</h4>
                        <p className="text-sm text-muted-foreground">
                          Control your privacy settings
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={inCardCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.separatorComponent.examples.inNavigation}</h3>
              <Card>
                <CardContent className="p-6">
                  <nav className="flex items-center gap-2 p-4 border rounded-lg">
                    <a href="#home" className="font-medium hover:text-primary">
                      Home
                    </a>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="#about" className="font-medium hover:text-primary">
                      About
                    </a>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="#services" className="font-medium hover:text-primary">
                      Services
                    </a>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="#contact" className="font-medium hover:text-primary">
                      Contact
                    </a>
                  </nav>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={navigationCode} language="tsx" collapsible />
              </div>
            </div>

            {/* In Lists */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.separatorComponent.examples.inLists}</h3>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </li>
                    <Separator />
                    <li className="flex items-center gap-3">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </li>
                    <Separator />
                    <li className="flex items-center gap-3">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </li>
                    <Separator />
                    <li className="flex items-center gap-3">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={listCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Styling */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Styling</h3>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Thicker Separator</p>
                    <Separator className="h-1" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Primary Color</p>
                    <Separator className="bg-primary" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Dashed Style</p>
                    <Separator className="border-t border-dashed bg-transparent" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Gradient Style</p>
                    <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customStyleCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.separatorComponent.props.title}</h2>
          <PropsTable props={separatorProps} />
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                The Separator component extends Radix UI&apos;s Separator primitive and accepts all
                standard HTML attributes.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.separatorComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Decorative vs Semantic</h3>
                <p className="text-muted-foreground mb-2">
                  The <code className="bg-muted px-1 rounded">decorative</code> prop determines how
                  the separator is announced to screen readers:
                </p>
                <CodeBlock code={semanticCode} language="tsx" />
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>decorative={'{'}true{'}'} (default):</strong> Not announced by screen
                      readers, purely visual
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>decorative={'{'}false{'}'}:</strong> Announced as a separator with
                      semantic meaning
                    </span>
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">When to Use Semantic Separators</h3>
                <p className="text-muted-foreground">
                  Use <code className="bg-muted px-1 rounded">decorative={'{'}false{'}'}</code>{' '}
                  when the separator has semantic importance, such as dividing major sections of
                  content. Use the default decorative mode for purely visual spacing.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">ARIA Role</h3>
                <p className="text-muted-foreground">
                  When not decorative, the component automatically applies{' '}
                  <code className="bg-muted px-1 rounded">role=&quot;separator&quot;</code> and appropriate
                  ARIA attributes based on orientation.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.separatorComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Separators work identically in both LTR and RTL layouts. Horizontal separators span
                the full width, and vertical separators maintain their height regardless of text
                direction.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div>First section</div>
                      <Separator />
                      <div>Second section</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div>القسم الأول</div>
                      <Separator />
                      <div>القسم الثاني</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={t.separatorComponent.bestPractices.doList}
            donts={t.separatorComponent.bestPractices.dontList}
          />
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/card">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Card</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Common container with separators
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
