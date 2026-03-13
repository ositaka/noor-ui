'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Timeline, type TimelineItem } from '@/components/ui/timeline'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Clock, CheckCircle, Seal, Package, Truck, MapPin, HourglassHigh, UserCircle, GearSix, ShieldCheck } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const applicationSteps: TimelineItem[] = [
  {
    icon: <CheckCircle className="h-5 w-5" weight="fill" />,
    title: 'Submitted',
    titleAr: 'تم التقديم',
    description: 'Application received and logged into the system',
    descriptionAr: 'تم استلام الطلب وتسجيله في النظام',
    date: 'Mar 10, 2026',
    dateAr: '١٠ مارس ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" weight="fill" />,
    title: 'Document Verified',
    titleAr: 'تم التحقق من المستندات',
    description: 'All required documents have been verified',
    descriptionAr: 'تم التحقق من جميع المستندات المطلوبة',
    date: 'Mar 11, 2026',
    dateAr: '١١ مارس ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Clock className="h-5 w-5" weight="fill" />,
    title: 'Under Review',
    titleAr: 'قيد المراجعة',
    description: 'Your application is being reviewed by the team',
    descriptionAr: 'يتم مراجعة طلبك من قبل الفريق',
    date: 'Mar 12, 2026',
    dateAr: '١٢ مارس ٢٠٢٦',
    status: 'current',
  },
  {
    icon: <Seal className="h-5 w-5" />,
    title: 'Approved',
    titleAr: 'الموافقة',
    description: 'Final approval pending',
    descriptionAr: 'في انتظار الموافقة النهائية',
    status: 'upcoming',
  },
]

const orderTracking: TimelineItem[] = [
  {
    icon: <Package className="h-3.5 w-3.5" weight="fill" />,
    title: 'Order Placed',
    titleAr: 'تم تأكيد الطلب',
    description: 'Your order #1234 has been confirmed',
    descriptionAr: 'تم تأكيد طلبك رقم #١٢٣٤',
    status: 'complete',
  },
  {
    icon: <Truck className="h-3.5 w-3.5" weight="fill" />,
    title: 'Shipped',
    titleAr: 'تم الشحن',
    description: 'Package is on its way',
    descriptionAr: 'الطرد في الطريق',
    status: 'complete',
  },
  {
    icon: <MapPin className="h-3.5 w-3.5" weight="fill" />,
    title: 'Out for Delivery',
    titleAr: 'في طريقه للتسليم',
    description: 'Expected by end of day',
    descriptionAr: 'متوقع الوصول بنهاية اليوم',
    status: 'current',
  },
  {
    title: 'Delivered',
    titleAr: 'تم التسليم',
    status: 'upcoming',
  },
]

const accountSetup: TimelineItem[] = [
  {
    icon: <UserCircle className="h-5 w-5" weight="fill" />,
    title: 'Account Created',
    titleAr: 'تم إنشاء الحساب',
    description: 'Your account was successfully created',
    descriptionAr: 'تم إنشاء حسابك بنجاح',
    date: 'Mar 8, 2026',
    dateAr: '٨ مارس ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <GearSix className="h-5 w-5" weight="fill" />,
    title: 'Profile Setup',
    titleAr: 'إعداد الملف الشخصي',
    description: 'Complete your profile information',
    descriptionAr: 'أكمل معلومات ملفك الشخصي',
    status: 'current',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Verification',
    titleAr: 'التحقق',
    description: 'Verify your identity',
    descriptionAr: 'تحقق من هويتك',
    status: 'upcoming',
  },
]

// RTL-specific data for comparison
const rtlApplicationSteps: TimelineItem[] = [
  {
    icon: <CheckCircle className="h-5 w-5" weight="fill" />,
    title: 'تم التقديم',
    description: 'تم استلام الطلب وتسجيله في النظام',
    date: '١٠ مارس ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" weight="fill" />,
    title: 'تم التحقق من المستندات',
    description: 'تم التحقق من جميع المستندات المطلوبة',
    date: '١١ مارس ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Clock className="h-5 w-5" weight="fill" />,
    title: 'قيد المراجعة',
    description: 'يتم مراجعة طلبك من قبل الفريق',
    date: '١٢ مارس ٢٠٢٦',
    status: 'current',
  },
  {
    icon: <Seal className="h-5 w-5" />,
    title: 'الموافقة',
    description: 'في انتظار الموافقة النهائية',
    status: 'upcoming',
  },
]

// ---------------------------------------------------------------------------
// Props definitions
// ---------------------------------------------------------------------------

const getTimelineProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'items',
    type: 'TimelineItem[]',
    required: true,
    description: t.timelineComponent.props.items,
  },
  {
    name: 'variant',
    type: "'default' | 'alternating'",
    default: "'default'",
    description: t.timelineComponent.props.variant,
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    description: t.timelineComponent.props.compact,
  },
  {
    name: 'className',
    type: 'string',
    description: t.timelineComponent.props.className,
  },
]

const getItemProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: t.timelineComponent.itemProps.icon,
  },
  {
    name: 'title',
    type: 'string',
    required: true,
    description: t.timelineComponent.itemProps.title,
  },
  {
    name: 'titleAr',
    type: 'string',
    description: t.timelineComponent.itemProps.titleAr,
  },
  {
    name: 'description',
    type: 'string',
    description: t.timelineComponent.itemProps.description,
  },
  {
    name: 'descriptionAr',
    type: 'string',
    description: t.timelineComponent.itemProps.descriptionAr,
  },
  {
    name: 'date',
    type: 'string',
    description: t.timelineComponent.itemProps.date,
  },
  {
    name: 'dateAr',
    type: 'string',
    description: t.timelineComponent.itemProps.dateAr,
  },
  {
    name: 'status',
    type: "'complete' | 'current' | 'upcoming'",
    required: true,
    description: t.timelineComponent.itemProps.status,
  },
]

// ---------------------------------------------------------------------------
// Code snippets
// ---------------------------------------------------------------------------

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Timeline } from 'noorui-rtl'
import { CheckCircle, Clock, Seal } from '@phosphor-icons/react'

const items = [
  {
    icon: <CheckCircle className="h-5 w-5" weight="fill" />,
    title: "Submitted",
    description: "Application received",
    date: "Mar 10, 2026",
    status: "complete",
  },
  {
    icon: <Clock className="h-5 w-5" weight="fill" />,
    title: "Under Review",
    description: "Being processed",
    date: "Mar 12, 2026",
    status: "current",
  },
  {
    icon: <Seal className="h-5 w-5" />,
    title: "Approved",
    status: "upcoming",
  },
]

<Timeline items={items} />`

const alternatingCode = `<Timeline
  items={applicationSteps}
  variant="alternating"
/>`

const compactCode = `<Timeline
  items={orderTracking}
  compact
/>`

const customIconsCode = `import { UserCircle, GearSix, ShieldCheck } from '@phosphor-icons/react'

const items = [
  {
    icon: <UserCircle className="h-5 w-5" weight="fill" />,
    title: "Account Created",
    description: "Your account was successfully created",
    status: "complete",
  },
  {
    icon: <GearSix className="h-5 w-5" weight="fill" />,
    title: "Profile Setup",
    description: "Complete your profile information",
    status: "current",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Verification",
    description: "Verify your identity",
    status: "upcoming",
  },
]

<Timeline items={items} />`

const rtlCode = `// RTL support is automatic via logical properties!
// Just provide titleAr, descriptionAr, dateAr for bilingual content.

const items = [
  {
    title: "Submitted",
    titleAr: "تم التقديم",
    description: "Application received",
    descriptionAr: "تم استلام الطلب",
    date: "Mar 10",
    dateAr: "١٠ مارس",
    status: "complete",
  },
]

<Timeline items={items} />`

const typeCode = `interface TimelineItem {
  icon?: React.ReactNode
  title: string
  titleAr?: string
  description?: string
  descriptionAr?: string
  date?: string
  dateAr?: string
  status: 'complete' | 'current' | 'upcoming'
}`

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function TimelinePage() {
  const { locale, direction } = useDirection()
  const t = content[locale]
  const timelineProps = getTimelineProps(t)
  const itemProps = getItemProps(t)
  const isRTL = direction === 'rtl'

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li><span aria-hidden="true">/</span></li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li><span aria-hidden="true">/</span></li>
            <li className="text-foreground font-medium" aria-current="page">{t.timelineComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <HourglassHigh className="h-10 w-10 text-primary" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold tracking-tight">{t.timelineComponent.title}</h1>
                <Badge variant="secondary">{t.timelineComponent.badge}</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.timelineComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo className="block">
              <div className="w-full max-w-lg mx-auto">
                <Timeline items={applicationSteps} />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">TypeScript</h3>
            <CodeBlock code={typeCode} language="typescript" collapsible />
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.examples.title}</h2>

          <div className="space-y-12">
            {/* Basic Timeline */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.basic}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.basicDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-lg">
                    <Timeline items={applicationSteps} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Alternating Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.alternating}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.alternatingDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <Timeline items={applicationSteps} variant="alternating" />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={alternatingCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Compact Mode */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.compact}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.compactDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm">
                    <Timeline items={orderTracking} compact />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={compactCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.customIcons}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.customIconsDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-lg">
                    <Timeline items={accountSetup} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customIconsCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.propsSection.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.propsSection.timelineProps}</h3>
              <PropsTable props={timelineProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.propsSection.itemProps}</h3>
              <PropsTable props={itemProps} />
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.timelineComponent.accessibility.semanticList}</h3>
                <p className="text-muted-foreground">{t.timelineComponent.accessibility.semanticListDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.timelineComponent.accessibility.ariaLabel}</h3>
                <p className="text-muted-foreground">{t.timelineComponent.accessibility.ariaLabelDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.timelineComponent.accessibility.iconHidden}</h3>
                <p className="text-muted-foreground">{t.timelineComponent.accessibility.iconHiddenDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.timelineComponent.accessibility.statusInText}</h3>
                <p className="text-muted-foreground">{t.timelineComponent.accessibility.statusInTextDesc}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-6">
              <p className="text-muted-foreground">{t.timelineComponent.rtl.description}</p>
              <CodeBlock code={rtlCode} language="tsx" />

              <div className="grid gap-8 md:grid-cols-2 mt-8">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">{t.timelineComponent.rtl.ltr}</h3>
                  <div dir="ltr" lang="en" className="border rounded-lg p-4">
                    <Timeline
                      items={applicationSteps.map(s => ({
                        ...s,
                        titleAr: undefined,
                        descriptionAr: undefined,
                        dateAr: undefined,
                      }))}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">{t.timelineComponent.rtl.rtlLabel}</h3>
                  <div dir="rtl" lang="ar" className="border rounded-lg p-4">
                    <Timeline items={rtlApplicationSteps} />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <h3 className="font-semibold">{t.timelineComponent.rtl.features}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.timelineComponent.rtl.lineFlips}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.timelineComponent.rtl.contentFlips}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.timelineComponent.rtl.alternatingFlips}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.timelineComponent.rtl.datesLocalized}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.useCases.title}</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>{t.timelineComponent.useCases.processTracking}:</strong> {t.timelineComponent.useCases.processTrackingDesc}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>{t.timelineComponent.useCases.activityLog}:</strong> {t.timelineComponent.useCases.activityLogDesc}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>{t.timelineComponent.useCases.projectMilestones}:</strong> {t.timelineComponent.useCases.projectMilestonesDesc}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>{t.timelineComponent.useCases.patientHistory}:</strong> {t.timelineComponent.useCases.patientHistoryDesc}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/stepper">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.timelineComponent.related.stepper}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.timelineComponent.related.stepperDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/progress">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.timelineComponent.related.progress}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.timelineComponent.related.progressDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/card">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.timelineComponent.related.card}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.timelineComponent.related.cardDesc}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
