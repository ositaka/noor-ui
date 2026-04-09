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
import { Clock, CheckCircle, Seal, Package, Truck, MapPin, HourglassHigh, UserCircle, GearSix, ShieldCheck, ChatCircle, Envelope, Star, Rocket, Flag, Bug, Code, GitBranch, Tag, Sparkle, Wrench } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { StorybookLink } from '@/components/docs/storybook-link'

// ---------------------------------------------------------------------------
// Sample data — each example shows a different real-world use case
// ---------------------------------------------------------------------------

// Preview & Basic: Application process tracking
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
    titleAr: 'تمت الموافقة',
    description: 'Final approval pending',
    descriptionAr: 'في انتظار الموافقة النهائية',
    status: 'upcoming',
  },
]

// Activity log: uses photo avatars + initials mix
function PhotoAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <img src={src} alt={alt} className="h-full w-full rounded-full object-cover" />
  )
}

function InitialsAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span className={`flex h-full w-full items-center justify-center rounded-full text-xs font-bold text-white ${color}`}>
      {initials}
    </span>
  )
}

const activityLog: TimelineItem[] = [
  {
    icon: <PhotoAvatar src="/examples/healthcare/avatars/sarah.jpg" alt="Sara" />,
    title: 'Sara commented on your pull request',
    titleAr: 'سارة علّقت على طلب الدمج الخاص بك',
    description: '"Looks good! Just one question about the error handling..."',
    descriptionAr: '"يبدو جيداً! لدي سؤال واحد فقط حول معالجة الأخطاء..."',
    date: '2 min ago',
    dateAr: 'منذ دقيقتين',
    status: 'current',
  },
  {
    icon: <PhotoAvatar src="/examples/healthcare/avatars/ahmed.jpg" alt="Ahmed" />,
    title: 'Ahmed merged branch feature/auth',
    titleAr: 'أحمد دمج فرع feature/auth',
    description: 'Pull request #47 was merged into main',
    descriptionAr: 'تم دمج طلب الدمج رقم #٤٧ في الفرع الرئيسي',
    date: '1 hour ago',
    dateAr: 'منذ ساعة',
    status: 'complete',
  },
  {
    icon: <InitialsAvatar initials="LM" color="bg-emerald-800" />,
    title: 'Layla assigned you to issue #52',
    titleAr: 'ليلى أسندت إليك المشكلة رقم #٥٢',
    description: 'Fix pagination on the dashboard table',
    descriptionAr: 'إصلاح ترقيم الصفحات في جدول لوحة التحكم',
    date: '3 hours ago',
    dateAr: 'منذ ٣ ساعات',
    status: 'complete',
  },
  {
    icon: <PhotoAvatar src="/examples/healthcare/avatars/omar.jpg" alt="Omar" />,
    title: 'Omar deployed v2.4.1 to production',
    titleAr: 'عمر نشر الإصدار v2.4.1 إلى الإنتاج',
    date: 'Yesterday',
    dateAr: 'أمس',
    status: 'complete',
  },
]

// Detailed: Support ticket history with rich content
const supportTicket: TimelineItem[] = [
  {
    icon: <PhotoAvatar src="/examples/healthcare/avatars/fatima.jpg" alt="Fatima" />,
    title: 'Ticket opened by Fatima Al-Hassan',
    titleAr: 'تم فتح التذكرة بواسطة فاطمة الحسن',
    description: 'Unable to export reports in PDF format. The download starts but fails at 90% with a timeout error. Affects all report types on the dashboard. Browser: Chrome 120, OS: macOS Sonoma.',
    descriptionAr: 'غير قادرة على تصدير التقارير بصيغة PDF. يبدأ التنزيل لكنه يفشل عند ٩٠٪ بخطأ انتهاء المهلة. يؤثر على جميع أنواع التقارير في لوحة التحكم. المتصفح: Chrome 120، النظام: macOS Sonoma.',
    date: 'Mar 10, 09:15 AM',
    dateAr: '١٠ مارس، ٠٩:١٥ ص',
    status: 'complete',
  },
  {
    icon: <PhotoAvatar src="/examples/healthcare/avatars/khalid.jpg" alt="Khalid" />,
    title: 'Assigned to Khalid — Priority: High',
    titleAr: 'تم التعيين لخالد — الأولوية: عالية',
    description: 'Investigating the PDF export service. Initial analysis shows the report generation exceeds the 30s timeout limit for large datasets. Checking server logs for the specific failure point.',
    descriptionAr: 'جاري التحقيق في خدمة تصدير PDF. التحليل الأولي يُظهر أن إنشاء التقرير يتجاوز حد المهلة ٣٠ ثانية للبيانات الكبيرة. فحص سجلات الخادم لتحديد نقطة الفشل.',
    date: 'Mar 10, 11:30 AM',
    dateAr: '١٠ مارس، ١١:٣٠ ص',
    status: 'complete',
  },
  {
    icon: <InitialsAvatar initials="KR" color="bg-violet-800" />,
    title: 'Fix deployed — PR #389 merged',
    titleAr: 'تم نشر الإصلاح — طلب الدمج #٣٨٩',
    description: 'Increased timeout to 120s and added chunked processing for reports with 10k+ rows. Also added a progress indicator so users can see export status in real-time.',
    descriptionAr: 'تم زيادة المهلة إلى ١٢٠ ثانية وإضافة معالجة مجزأة للتقارير التي تتجاوز ١٠ آلاف صف. كذلك تمت إضافة مؤشر تقدم ليتمكن المستخدمون من متابعة حالة التصدير.',
    date: 'Mar 11, 03:45 PM',
    dateAr: '١١ مارس، ٠٣:٤٥ م',
    status: 'complete',
  },
  {
    icon: <PhotoAvatar src="/examples/healthcare/avatars/fatima.jpg" alt="Fatima" />,
    title: 'Confirmed fixed by Fatima',
    titleAr: 'تم تأكيد الإصلاح بواسطة فاطمة',
    description: 'Tested with our largest report (15k rows) — exports in ~8 seconds now. The progress bar is a nice touch. Closing this ticket. Thank you!',
    descriptionAr: 'تم الاختبار مع أكبر تقرير لدينا (١٥ ألف صف) — يتم التصدير في حوالي ٨ ثوانٍ الآن. شريط التقدم إضافة رائعة. إغلاق التذكرة. شكراً!',
    date: 'Mar 12, 10:00 AM',
    dateAr: '١٢ مارس، ١٠:٠٠ ص',
    status: 'current',
  },
]

// Project milestones: alternating layout with dates
const projectMilestones: TimelineItem[] = [
  {
    icon: <Flag className="h-5 w-5" weight="fill" />,
    title: 'Project Kickoff',
    titleAr: 'انطلاق المشروع',
    description: 'Requirements gathered, team assembled, and sprint planning completed',
    descriptionAr: 'تم جمع المتطلبات وتشكيل الفريق واستكمال تخطيط السبرنت',
    date: 'Jan 15, 2026',
    dateAr: '١٥ يناير ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Code className="h-5 w-5" weight="bold" />,
    title: 'Alpha Release',
    titleAr: 'إصدار ألفا',
    description: 'Core features implemented and internal testing started',
    descriptionAr: 'تم تنفيذ الميزات الأساسية وبدأ الاختبار الداخلي',
    date: 'Feb 28, 2026',
    dateAr: '٢٨ فبراير ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Bug className="h-5 w-5" weight="fill" />,
    title: 'Beta Testing',
    titleAr: 'اختبار بيتا',
    description: 'Public beta with 500 users, collecting feedback and fixing issues',
    descriptionAr: 'بيتا عامة مع ٥٠٠ مستخدم، جمع الملاحظات وإصلاح المشكلات',
    date: 'Mar 13, 2026',
    dateAr: '١٣ مارس ٢٠٢٦',
    status: 'current',
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: 'Public Launch',
    titleAr: 'الإطلاق العام',
    description: 'Production release with marketing campaign',
    descriptionAr: 'إصدار الإنتاج مع حملة تسويقية',
    date: 'Apr 15, 2026',
    dateAr: '١٥ أبريل ٢٠٢٦',
    status: 'upcoming',
  },
]

// Compact: Order tracking in sidebar
const orderTracking: TimelineItem[] = [
  {
    icon: <Package className="h-3.5 w-3.5" weight="fill" />,
    title: 'Order Placed',
    titleAr: 'تم تأكيد الطلب',
    description: 'Order #1234 confirmed',
    descriptionAr: 'تم تأكيد الطلب رقم #١٢٣٤',
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

// Changelog: cards variant for release notes
const changelog: TimelineItem[] = [
  {
    icon: <Sparkle className="h-5 w-5" weight="fill" />,
    title: 'v2.5.0 — Dashboard Redesign',
    titleAr: 'v2.5.0 — إعادة تصميم لوحة التحكم',
    description: 'New analytics dashboard with real-time charts, customizable widgets, and dark mode support. Performance improved by 40% with virtualized lists.',
    descriptionAr: 'لوحة تحليلات جديدة مع رسوم بيانية فورية وعناصر قابلة للتخصيص ودعم الوضع الداكن. تحسين الأداء بنسبة ٤٠٪ مع القوائم الافتراضية.',
    date: 'Mar 12, 2026',
    dateAr: '١٢ مارس ٢٠٢٦',
    status: 'current',
  },
  {
    icon: <Wrench className="h-5 w-5" weight="fill" />,
    title: 'v2.4.2 — Bug Fixes',
    titleAr: 'v2.4.2 — إصلاح الأخطاء',
    description: 'Fixed PDF export timeout for large datasets. Resolved calendar date picker not respecting RTL layout in Safari.',
    descriptionAr: 'إصلاح انتهاء مهلة تصدير PDF للبيانات الكبيرة. حل مشكلة منتقي التاريخ في التقويم الذي لا يحترم تخطيط RTL في Safari.',
    date: 'Mar 5, 2026',
    dateAr: '٥ مارس ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Tag className="h-5 w-5" weight="fill" />,
    title: 'v2.4.0 — Timeline Component',
    titleAr: 'v2.4.0 — مكوّن الجدول الزمني',
    description: 'Introduced the Timeline component with default and alternating layouts, compact mode, card wrapping, and full RTL support.',
    descriptionAr: 'إضافة مكوّن الجدول الزمني مع تخطيط افتراضي ومتناوب ووضع مضغوط ودعم البطاقات ودعم كامل لـ RTL.',
    date: 'Feb 20, 2026',
    dateAr: '٢٠ فبراير ٢٠٢٦',
    status: 'complete',
  },
  {
    icon: <Rocket className="h-5 w-5" weight="fill" />,
    title: 'v2.3.0 — Initial Release',
    titleAr: 'v2.3.0 — الإصدار الأول',
    description: 'First public release with 25 components, 5 themes, and bilingual support for English and Arabic.',
    descriptionAr: 'أول إصدار عام مع ٢٥ مكوّناً و٥ سمات ودعم ثنائي اللغة للإنجليزية والعربية.',
    date: 'Jan 10, 2026',
    dateAr: '١٠ يناير ٢٠٢٦',
    status: 'complete',
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
    title: 'تمت الموافقة',
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
    name: 'cards',
    type: 'boolean',
    default: 'false',
    description: t.timelineComponent.props.cards,
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

const activityLogCode = `// The icon slot accepts any React node — photos or initials!
const items = [
  {
    icon: <img src="/avatar.jpg" alt="Sara"
      className="h-full w-full rounded-full object-cover" />,
    title: "Sara commented on your pull request",
    description: '"Looks good! Just one question about..."',
    date: "2 min ago",
    status: "current",
  },
  {
    icon: (
      <span className="flex h-full w-full items-center justify-center
        rounded-full text-xs font-bold text-white bg-emerald-600">
        LM
      </span>
    ),
    title: "Layla assigned you to issue #52",
    date: "3 hours ago",
    status: "complete",
  },
]

<Timeline items={items} />`

const detailedCode = `// Rich content in description — great for ticket histories
const ticket = [
  {
    icon: <img src="/avatar.jpg" alt="Fatima"
      className="h-full w-full rounded-full object-cover" />,
    title: "Ticket opened by Fatima Al-Hassan",
    description: "Unable to export reports in PDF format. The download "
      + "starts but fails at 90% with a timeout error.",
    date: "Mar 10, 09:15 AM",
    status: "complete",
  },
  // ... more entries
]

<Timeline items={ticket} />`

const milestonesCode = `import { Flag, Code, Bug, Rocket } from '@phosphor-icons/react'

const milestones = [
  {
    icon: <Flag className="h-5 w-5" weight="fill" />,
    title: "Project Kickoff",
    description: "Requirements gathered, team assembled",
    date: "Jan 15, 2026",
    status: "complete",
  },
  {
    icon: <Bug className="h-5 w-5" weight="fill" />,
    title: "Beta Testing",
    description: "Public beta with 500 users",
    date: "Mar 13, 2026",
    status: "current",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Public Launch",
    date: "Apr 15, 2026",
    status: "upcoming",
  },
]

<Timeline items={milestones} variant="alternating" />`

const cardsCode = `// Wrap content in card containers for a polished look
<Timeline
  items={changelog}
  cards
/>`

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
  const { locale } = useDirection()
  const t = content[locale]
  const timelineProps = getTimelineProps(t)
  const itemProps = getItemProps(t)

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
        
        <div className="mt-4">
          <StorybookLink />
        </div>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.timelineComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo className="block">
              <div className="w-full max-w-lg mx-auto">
                <Timeline items={applicationSteps} aria-label={t.timelineComponent.ariaLabels.preview} />
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
            {/* Basic Timeline — application process */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.basic}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.basicDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-lg">
                    <Timeline items={applicationSteps} aria-label={t.timelineComponent.ariaLabels.basic} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Activity Log — avatars + relative timestamps */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.activityLogTitle}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.activityLogDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-lg">
                    <Timeline items={activityLog} aria-label={t.timelineComponent.ariaLabels.activityLog} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={activityLogCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Project Milestones — alternating layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.alternating}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.alternatingDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <Timeline items={projectMilestones} variant="alternating" aria-label={t.timelineComponent.ariaLabels.alternating} />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={milestonesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Compact Mode — order tracking */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.compact}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.compactDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm">
                    <Timeline items={orderTracking} compact aria-label={t.timelineComponent.ariaLabels.compact} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={compactCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Detailed — support ticket history */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.supportTicket}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.supportTicketDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl">
                    <Timeline items={supportTicket} aria-label={t.timelineComponent.ariaLabels.supportTicket} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={detailedCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Cards — changelog / release notes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.timelineComponent.examples.cardsTitle}</h3>
              <p className="text-muted-foreground mb-4">{t.timelineComponent.examples.cardsDesc}</p>
              <ComponentShowcase>
                <ComponentShowcase.Demo className="block">
                  <div className="max-w-xl mx-auto">
                    <Timeline items={changelog} cards aria-label={t.timelineComponent.ariaLabels.changelog} />
                  </div>
                </ComponentShowcase.Demo>
              </ComponentShowcase>
              <div className="mt-4">
                <CodeBlock code={cardsCode} language="tsx" collapsible />
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
                      aria-label={t.timelineComponent.ariaLabels.rtlLtr}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">{t.timelineComponent.rtl.rtlLabel}</h3>
                  <div dir="rtl" lang="ar" className="border rounded-lg p-4">
                    <Timeline items={rtlApplicationSteps} aria-label={t.timelineComponent.ariaLabels.rtlAr} />
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
