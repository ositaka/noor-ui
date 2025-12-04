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

const basicUsageCode = `import { Separator } from 'noorui-rtl'

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
                  <p className="text-sm">{t.separatorComponent.examples.contentAbove || 'Content above separator'}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm">{t.separatorComponent.examples.contentBelow || 'Content below separator'}</p>
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
                      <h3 className="font-semibold">{t.separatorComponent.examples.sectionOne}</h3>
                      <p className="text-sm text-muted-foreground">{t.separatorComponent.examples.firstContent}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold">{t.separatorComponent.examples.sectionTwo}</h3>
                      <p className="text-sm text-muted-foreground">{t.separatorComponent.examples.secondContent}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold">{t.separatorComponent.examples.sectionThree}</h3>
                      <p className="text-sm text-muted-foreground">{t.separatorComponent.examples.thirdContent}</p>
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
                    <Button variant="outline">{t.separatorComponent.examples.home}</Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline">{t.separatorComponent.examples.about}</Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline">{t.separatorComponent.examples.services}</Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline">{t.separatorComponent.examples.contact}</Button>
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
                      <CardTitle>{t.separatorComponent.examples.userProfile}</CardTitle>
                      <CardDescription>{t.separatorComponent.examples.manageProfile}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">{t.separatorComponent.examples.personalInfo}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t.separatorComponent.examples.personalInfoDesc}
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">{t.separatorComponent.examples.accountSettings}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t.separatorComponent.examples.accountSettingsDesc}
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">{t.separatorComponent.examples.privacySecurity}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t.separatorComponent.examples.privacySecurityDesc}
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
                      {t.separatorComponent.examples.home}
                    </a>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="#about" className="font-medium hover:text-primary">
                      {t.separatorComponent.examples.about}
                    </a>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="#services" className="font-medium hover:text-primary">
                      {t.separatorComponent.examples.services}
                    </a>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="#contact" className="font-medium hover:text-primary">
                      {t.separatorComponent.examples.contact}
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
                      <span>{t.separatorComponent.examples.dashboard}</span>
                    </li>
                    <Separator />
                    <li className="flex items-center gap-3">
                      <Settings className="h-4 w-4" />
                      <span>{t.separatorComponent.examples.settings}</span>
                    </li>
                    <Separator />
                    <li className="flex items-center gap-3">
                      <User className="h-4 w-4" />
                      <span>{t.separatorComponent.examples.profile}</span>
                    </li>
                    <Separator />
                    <li className="flex items-center gap-3">
                      <Bell className="h-4 w-4" />
                      <span>{t.separatorComponent.examples.notifications}</span>
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
              <h3 className="text-lg font-semibold mb-4">{t.separatorComponent.examples.customStyling}</h3>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.separatorComponent.examples.thickerSeparator}</p>
                    <Separator className="h-1" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.separatorComponent.examples.primaryColor}</p>
                    <Separator className="bg-primary" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.separatorComponent.examples.dashedStyle}</p>
                    <Separator className="border-t border-dashed bg-transparent" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.separatorComponent.examples.gradientStyle}</p>
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
                {t.separatorComponent.props.extendsRadix}
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
                <h3 className="font-semibold mb-2">{t.separatorComponent.accessibility.decorativeVsSemantic}</h3>
                <p className="text-muted-foreground mb-2">
                  {t.separatorComponent.accessibility.decorativeVsSemanticDesc}
                </p>
                <CodeBlock code={semanticCode} language="tsx" />
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>{t.separatorComponent.accessibility.decorativeTrue}</strong> {t.separatorComponent.accessibility.decorativeTrueDesc}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>{t.separatorComponent.accessibility.decorativeFalse}</strong> {t.separatorComponent.accessibility.decorativeFalseDesc}
                    </span>
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.separatorComponent.accessibility.whenToUseSemantic}</h3>
                <p className="text-muted-foreground">
                  {t.separatorComponent.accessibility.whenToUseSemanticDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.separatorComponent.accessibility.ariaRole}</h3>
                <p className="text-muted-foreground">
                  {t.separatorComponent.accessibility.ariaRoleDesc}
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
                {t.separatorComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.separatorComponent.rtl.ltr}</h4>
                  <div dir="ltr" lang="en">
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div>{content.en.separatorComponent.rtl.firstSection}</div>
                      <Separator />
                      <div>{content.en.separatorComponent.rtl.secondSection}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.separatorComponent.rtl.rtlLabel}</h4>
                  <div dir="rtl" lang="ar">
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div>{content.ar.separatorComponent.rtl.firstSection}</div>
                      <Separator />
                      <div>{content.ar.separatorComponent.rtl.secondSection}</div>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.separatorComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/card">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.separatorComponent.related.card}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.separatorComponent.related.cardDesc}
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
