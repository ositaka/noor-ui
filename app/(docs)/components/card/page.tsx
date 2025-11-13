'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Bell } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getCardProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.cardComponent.props.className,
  },
]

const getCardHeaderProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.cardComponent.props.className,
  },
]

const getCardTitleProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.cardComponent.props.classNameTitle,
  },
]

const getCardDescriptionProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.cardComponent.props.className,
  },
]

const getCardContentProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.cardComponent.props.className,
  },
]

const getCardFooterProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.cardComponent.props.className,
  },
]

const installCode = `npm install @noorui/components`

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
  const { locale } = useDirection()
  const t = content[locale]
  const cardProps = getCardProps(t)
  const cardHeaderProps = getCardHeaderProps(t)
  const cardTitleProps = getCardTitleProps(t)
  const cardDescriptionProps = getCardDescriptionProps(t)
  const cardContentProps = getCardContentProps(t)
  const cardFooterProps = getCardFooterProps(t)

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
            <li className="text-foreground font-medium">{t.cardComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.cardComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.cardComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>{t.cardComponent.demoContent.title}</CardTitle>
                  <CardDescription>{t.cardComponent.demoContent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{t.cardComponent.demoContent.content}</p>
                </CardContent>
                <CardFooter>
                  <Button>{t.cardComponent.demoContent.action}</Button>
                </CardFooter>
              </Card>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Composition Pattern */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.cardComponent.compositionTitle}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.cardComponent.compositionDesc}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">Card</code> - {t.cardComponent.composition.card}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardHeader</code> - {t.cardComponent.composition.header}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardTitle</code> - {t.cardComponent.composition.title}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardDescription</code> - {t.cardComponent.composition.description}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardContent</code> - {t.cardComponent.composition.content}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">CardFooter</code> - {t.cardComponent.composition.footer}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.examples}</h2>

          <div className="space-y-8">
            {/* Full Card */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.cardComponent.examples.fullCard}</h3>
              <Card>
                <CardContent className="p-6">
                  <Card className="max-w-md">
                    <CardHeader>
                      <CardTitle>{t.cardComponent.demoContent.title}</CardTitle>
                      <CardDescription>{t.cardComponent.demoContent.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{t.cardComponent.demoContent.fullContent}</p>
                    </CardContent>
                    <CardFooter>
                      <Button>{t.cardComponent.demoContent.action}</Button>
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
              <h3 className="text-lg font-semibold mb-4">{t.cardComponent.examples.formCard}</h3>
              <Card>
                <CardContent className="p-6">
                  <Card className="max-w-md">
                    <CardHeader>
                      <CardTitle>{t.cardComponent.examples.createAccount}</CardTitle>
                      <CardDescription>{t.cardComponent.examples.enterDetails}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.cardComponent.examples.name}</Label>
                        <Input id="name" placeholder={t.cardComponent.examples.namePlaceholder} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.cardComponent.examples.email}</Label>
                        <Input id="email" type="email" placeholder={t.cardComponent.examples.emailPlaceholder} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">{t.cardComponent.examples.createAccount}</Button>
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
              <h3 className="text-lg font-semibold mb-4">{t.cardComponent.examples.interactiveCard}</h3>
              <Card>
                <CardContent className="p-6">
                  <Card className="max-w-md cursor-pointer transition-all hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{t.cardComponent.examples.notifications}</CardTitle>
                          <CardDescription>{t.cardComponent.examples.unreadMessages}</CardDescription>
                        </div>
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {t.cardComponent.examples.clickToView}
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
              <h3 className="text-lg font-semibold mb-4">{t.cardComponent.examples.gridCard}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.cardComponent.examples.totalUsers}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">{t.cardComponent.examples.fromLastMonth}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>{t.cardComponent.examples.revenue}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">$45,231</div>
                        <p className="text-xs text-muted-foreground">{t.cardComponent.examples.fromLastMonth}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>{t.cardComponent.examples.active}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">{t.cardComponent.examples.fromLastMonth}</p>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>

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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.cardComponent.accessibility.semanticTitle}</h3>
                <p className="text-muted-foreground">
                  {t.cardComponent.accessibility.semanticDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.cardComponent.accessibility.interactiveTitle}</h3>
                <p className="text-muted-foreground">
                  {t.cardComponent.accessibility.interactiveDesc}
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
                <h3 className="font-semibold mb-2">{t.cardComponent.accessibility.contrastTitle}</h3>
                <p className="text-muted-foreground">
                  {t.cardComponent.accessibility.contrastDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.rtlConsiderations}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.cardComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentDocs.ltr}</h4>
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
                  <h4 className="font-semibold text-sm">{t.componentDocs.rtl}</h4>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.cardComponent.relatedTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.cardComponent.related.button}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.cardComponent.related.buttonDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.cardComponent.related.input}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.cardComponent.related.inputDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/badge">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.cardComponent.related.badge}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.cardComponent.related.badgeDesc}
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
