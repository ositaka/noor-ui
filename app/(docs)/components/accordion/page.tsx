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
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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

const installCode = `npm install noorui-rtl`

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
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="container py-12">Loading...</div>
  }

  const t = content[locale] || content.en
  const accordionT = (content[locale]?.accordionComponent || content.en.accordionComponent) as any

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
            <li className="text-foreground font-medium">{accordionT.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{accordionT.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {accordionT.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{accordionT.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Accordion type="single" collapsible className="w-full max-w-md">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{accordionT.faq.isAccessibleQ}</AccordionTrigger>
                  <AccordionContent>
                    {accordionT.faq.isAccessibleA}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>{accordionT.faq.isStyledQ}</AccordionTrigger>
                  <AccordionContent>
                    {accordionT.faq.isStyledA}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>{accordionT.faq.isAnimatedQ}</AccordionTrigger>
                  <AccordionContent>
                    {accordionT.faq.isAnimatedA}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{accordionT.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{accordionT.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{accordionT.examples.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.multipleItemsOpen}</h3>
              <ComponentShowcase>
                <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full max-w-md">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{t.componentPage.demoLabels.account}</AccordionTrigger>
                    <AccordionContent>
                      {accordionT.examples.accountSettings}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>{t.componentPage.demoLabels.security}</AccordionTrigger>
                    <AccordionContent>
                      {accordionT.examples.updatePasswordSecurity}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>{t.componentPage.demoLabels.notifications}</AccordionTrigger>
                    <AccordionContent>
                      {accordionT.examples.configureNotifications}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentShowcase>
              <CodeBlock code={multipleCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.withIcons}</h3>
              <ComponentShowcase>
                <Accordion type="single" collapsible className="w-full max-w-md">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{t.componentPage.demoLabels.profile}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {accordionT.examples.updateProfileInfo}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>{t.componentPage.demoLabels.billing}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {accordionT.examples.manageBillingSubscriptions}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{t.componentPage.demoLabels.schedule}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {accordionT.examples.viewManageScheduled}
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
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.componentPage.sections.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.componentPage.accessibility.keyboardNavigation}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - {accordionT.accessibility.moveFocusNextTrigger}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd> - {accordionT.accessibility.toggleFocusedItem}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> - {accordionT.accessibility.toggleFocusedItem}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Home</kbd> - {accordionT.accessibility.moveFocusFirstTrigger}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">End</kbd> - {accordionT.accessibility.moveFocusLastTrigger}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.componentPage.accessibility.ariaAttributes}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>role=&quot;button&quot; {accordionT.accessibility.onAccordionTrigger}</li>
                  <li>aria-expanded {accordionT.accessibility.indicatesItemExpanded}</li>
                  <li>aria-controls {accordionT.accessibility.linksTriggerToContent}</li>
                  <li>role=&quot;region&quot; {accordionT.accessibility.onContentPanel}</li>
                  <li>aria-labelledby {accordionT.accessibility.linksPanelToTrigger}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.componentPage.sections.rtlSupport}</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {accordionT.rtlSupport.fullyCompatible}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{accordionT.rtlSupport.chevronPosition}</li>
                <li>{accordionT.rtlSupport.contentRespects}</li>
                <li>{accordionT.rtlSupport.animationsWork}</li>
                <li>{accordionT.rtlSupport.focusIndicators}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.componentPage.sections.relatedComponents}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/tabs">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.componentNames['tabs']}</h3>
                  <p className="text-sm text-muted-foreground">
                    {accordionT.relatedComponents.tabsDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/collapsible">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.componentNames['collapsible']}</h3>
                  <p className="text-sm text-muted-foreground">
                    {accordionT.relatedComponents.collapsibleDesc}
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
