'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Timeline } from '@/components/ui/timeline'
import { Callout } from '@/components/ui/callout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  CheckCircle,
  Clock,
  FileText,
  Download,
  XCircle,
  Warning,
  Gavel,
  Seal,
  PaperPlaneTilt,
  Eye,
  Prohibit,
  Trophy,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AppStatus = 'submitted' | 'under-review' | 'approved' | 'rejected' | 'completed' | 'docs-required'

interface TimelineStep {
  icon: React.ReactNode
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  date?: string
  dateAr?: string
  status: 'complete' | 'current' | 'upcoming'
}

interface AppDocument {
  name: string
  nameAr: string
  type: string
  size: string
  status: 'filed' | 'expired'
}

interface OfficerNote {
  author: string
  authorAr: string
  content: string
  contentAr: string
  type: 'warning' | 'destructive' | 'info'
}

interface ApplicationRecord {
  id: string
  ref: string
  service: string
  serviceAr: string
  status: AppStatus
  submittedDate: string
  submittedDateAr: string
  sla: string
  slaAr: string
  timeline: TimelineStep[]
  documents: AppDocument[]
  officerNote?: OfficerNote
}

// ---------------------------------------------------------------------------
// Application Data — 10 records with unique timelines and statuses
// ---------------------------------------------------------------------------

const APP_DATA: Record<string, ApplicationRecord> = {
  '1': {
    id: '1', ref: 'GOV-2026-00198',
    service: 'Visa & Residency Renewal', serviceAr: 'تجديد تأشيرة الإقامة',
    status: 'docs-required',
    submittedDate: 'Mar 10, 2026', submittedDateAr: '١٠ مارس ٢٠٢٦',
    sla: 'Estimated completion: 2 business days after documents received',
    slaAr: 'الإكمال المتوقع: يومي عمل بعد استلام المستندات',
    timeline: [
      { icon: <PaperPlaneTilt className="h-4 w-4" />, title: 'Application Submitted', titleAr: 'تم تقديم الطلب', description: 'Application received and registered.', descriptionAr: 'تم استلام طلبك وتسجيله في النظام.', date: 'Mar 10', dateAr: '١٠ مارس', status: 'complete' },
      { icon: <Eye className="h-4 w-4" />, title: 'Initial Review', titleAr: 'المراجعة الأولية', description: 'Documents verified by the review team.', descriptionAr: 'تم التحقق من المستندات.', date: 'Mar 11', dateAr: '١١ مارس', status: 'complete' },
      { icon: <Warning className="h-4 w-4" />, title: 'Additional Document Required', titleAr: 'مستند إضافي مطلوب', description: 'Updated salary certificate needed.', descriptionAr: 'شهادة راتب محدثة مطلوبة.', date: 'Mar 12', dateAr: '١٢ مارس', status: 'current' },
      { icon: <Seal className="h-4 w-4" />, title: 'Final Approval', titleAr: 'الموافقة النهائية', description: 'Pending document review', descriptionAr: 'في انتظار مراجعة المستندات', status: 'upcoming' },
      { icon: <CheckCircle className="h-4 w-4" />, title: 'Completed', titleAr: 'مكتمل', description: 'Ready for collection', descriptionAr: 'جاهز للاستلام', status: 'upcoming' },
    ],
    documents: [
      { name: 'National ID Copy', nameAr: 'صورة الهوية الوطنية', type: 'PDF', size: '1.2 MB', status: 'filed' },
      { name: 'Passport Copy', nameAr: 'صورة جواز السفر', type: 'PDF', size: '2.4 MB', status: 'filed' },
      { name: 'Personal Photo', nameAr: 'الصورة الشخصية', type: 'JPG', size: '450 KB', status: 'filed' },
      { name: 'Tenancy Contract', nameAr: 'عقد الإيجار', type: 'PDF', size: '3.1 MB', status: 'filed' },
      { name: 'Salary Certificate', nameAr: 'شهادة الراتب', type: 'PDF', size: '890 KB', status: 'expired' },
    ],
    officerNote: {
      author: 'Fatima Al Dhaheri, Senior Review Officer',
      authorAr: 'فاطمة الظاهري، مسؤولة مراجعة أولى',
      content: 'The salary certificate provided is dated more than 30 days ago. Please upload a recent salary certificate. All other documents are in order.',
      contentAr: 'شهادة الراتب المقدمة بتاريخ يتجاوز ٣٠ يوماً. يرجى رفع شهادة راتب حديثة. جميع المستندات الأخرى مكتملة.',
      type: 'warning',
    },
  },
  '2': {
    id: '2', ref: 'GOV-2026-00185',
    service: 'Trade License Amendment', serviceAr: 'تعديل الرخصة التجارية',
    status: 'under-review',
    submittedDate: 'Mar 8, 2026', submittedDateAr: '٨ مارس ٢٠٢٦',
    sla: 'Estimated completion: 4 business days', slaAr: 'الإكمال المتوقع: ٤ أيام عمل',
    timeline: [
      { icon: <PaperPlaneTilt className="h-4 w-4" />, title: 'Application Submitted', titleAr: 'تم تقديم الطلب', description: 'Application received.', descriptionAr: 'تم استلام الطلب.', date: 'Mar 8', dateAr: '٨ مارس', status: 'complete' },
      { icon: <Eye className="h-4 w-4" />, title: 'Under Review', titleAr: 'قيد المراجعة', description: 'Being reviewed by the licensing department.', descriptionAr: 'قيد المراجعة من قسم التراخيص.', date: 'Mar 9', dateAr: '٩ مارس', status: 'current' },
      { icon: <Seal className="h-4 w-4" />, title: 'Final Approval', titleAr: 'الموافقة النهائية', description: 'Pending approval', descriptionAr: 'في انتظار الموافقة', status: 'upcoming' },
      { icon: <CheckCircle className="h-4 w-4" />, title: 'Completed', titleAr: 'مكتمل', description: 'License amended', descriptionAr: 'تم تعديل الرخصة', status: 'upcoming' },
    ],
    documents: [
      { name: 'National ID Copy', nameAr: 'صورة الهوية الوطنية', type: 'PDF', size: '1.2 MB', status: 'filed' },
      { name: 'Current Trade License', nameAr: 'الرخصة التجارية الحالية', type: 'PDF', size: '1.8 MB', status: 'filed' },
      { name: 'Amendment Request Form', nameAr: 'نموذج طلب التعديل', type: 'PDF', size: '520 KB', status: 'filed' },
    ],
  },
  '3': {
    id: '3', ref: 'GOV-2026-00142',
    service: 'Trade License Renewal', serviceAr: 'تجديد الرخصة التجارية',
    status: 'approved',
    submittedDate: 'Mar 1, 2026', submittedDateAr: '١ مارس ٢٠٢٦',
    sla: 'Ready for collection', slaAr: 'جاهز للاستلام',
    timeline: [
      { icon: <PaperPlaneTilt className="h-4 w-4" />, title: 'Application Submitted', titleAr: 'تم تقديم الطلب', description: 'Application received.', descriptionAr: 'تم استلام الطلب.', date: 'Mar 1', dateAr: '١ مارس', status: 'complete' },
      { icon: <Eye className="h-4 w-4" />, title: 'Initial Review', titleAr: 'المراجعة الأولية', description: 'Documents verified.', descriptionAr: 'تم التحقق من المستندات.', date: 'Mar 3', dateAr: '٣ مارس', status: 'complete' },
      { icon: <Seal className="h-4 w-4" />, title: 'Approved', titleAr: 'تمت الموافقة', description: 'Application approved. License renewed until Mar 2027.', descriptionAr: 'تمت الموافقة. الرخصة مجددة حتى مارس ٢٠٢٧.', date: 'Mar 5', dateAr: '٥ مارس', status: 'complete' },
      { icon: <CheckCircle className="h-4 w-4" />, title: 'Ready for Collection', titleAr: 'جاهز للاستلام', description: 'Visit any service center to collect your license.', descriptionAr: 'قم بزيارة أي مركز خدمة لاستلام رخصتك.', date: 'Mar 5', dateAr: '٥ مارس', status: 'current' },
    ],
    documents: [
      { name: 'National ID Copy', nameAr: 'صورة الهوية الوطنية', type: 'PDF', size: '1.2 MB', status: 'filed' },
      { name: 'Trade Name Certificate', nameAr: 'شهادة الاسم التجاري', type: 'PDF', size: '1.5 MB', status: 'filed' },
      { name: 'Office Lease', nameAr: 'عقد إيجار المكتب', type: 'PDF', size: '2.8 MB', status: 'filed' },
    ],
  },
  '6': {
    id: '6', ref: 'GOV-2026-00075',
    service: 'Housing Application', serviceAr: 'طلب إسكان',
    status: 'rejected',
    submittedDate: 'Feb 10, 2026', submittedDateAr: '١٠ فبراير ٢٠٢٦',
    sla: 'Closed', slaAr: 'مغلق',
    timeline: [
      { icon: <PaperPlaneTilt className="h-4 w-4" />, title: 'Application Submitted', titleAr: 'تم تقديم الطلب', description: 'Application received.', descriptionAr: 'تم استلام الطلب.', date: 'Feb 10', dateAr: '١٠ فبراير', status: 'complete' },
      { icon: <Eye className="h-4 w-4" />, title: 'Initial Review', titleAr: 'المراجعة الأولية', description: 'Documents reviewed.', descriptionAr: 'تمت مراجعة المستندات.', date: 'Feb 15', dateAr: '١٥ فبراير', status: 'complete' },
      { icon: <Prohibit className="h-4 w-4" />, title: 'Application Rejected', titleAr: 'تم رفض الطلب', description: 'Does not meet income eligibility criteria for the selected housing program.', descriptionAr: 'لا يستوفي معايير الأهلية للدخل لبرنامج الإسكان المختار.', date: 'Feb 20', dateAr: '٢٠ فبراير', status: 'current' },
    ],
    documents: [
      { name: 'National ID Copy', nameAr: 'صورة الهوية الوطنية', type: 'PDF', size: '1.2 MB', status: 'filed' },
      { name: 'Income Certificate', nameAr: 'شهادة الدخل', type: 'PDF', size: '780 KB', status: 'filed' },
      { name: 'Family Book', nameAr: 'خلاصة القيد', type: 'PDF', size: '2.1 MB', status: 'filed' },
    ],
    officerNote: {
      author: 'Khalid Al Mansouri, Housing Review Officer',
      authorAr: 'خالد المنصوري، مسؤول مراجعة الإسكان',
      content: 'The monthly income exceeds the maximum threshold (AED 25,000) for the selected housing program. You may apply for a different tier or submit an appeal with supporting documentation.',
      contentAr: 'الدخل الشهري يتجاوز الحد الأقصى (٢٥٬٠٠٠ د.إ) لبرنامج الإسكان المختار. يمكنك التقديم لمستوى مختلف أو تقديم اعتراض مع مستندات داعمة.',
      type: 'destructive',
    },
  },
}

// Generate simple completed records for IDs 4,5,7,8,9,10
const COMPLETED_SERVICES: Record<string, { service: string; serviceAr: string; ref: string; date: string; dateAr: string }> = {
  '4': { service: 'Birth Certificate', serviceAr: 'شهادة ميلاد', ref: 'GOV-2026-00120', date: 'Feb 25, 2026', dateAr: '٢٥ فبراير ٢٠٢٦' },
  '5': { service: 'Driving License Renewal', serviceAr: 'تجديد رخصة القيادة', ref: 'GOV-2026-00098', date: 'Feb 18, 2026', dateAr: '١٨ فبراير ٢٠٢٦' },
  '7': { service: 'Vehicle Registration', serviceAr: 'تسجيل مركبة', ref: 'GOV-2026-00052', date: 'Feb 5, 2026', dateAr: '٥ فبراير ٢٠٢٦' },
  '8': { service: 'Visa Renewal', serviceAr: 'تجديد التأشيرة', ref: 'GOV-2025-00890', date: 'Dec 15, 2025', dateAr: '١٥ ديسمبر ٢٠٢٥' },
  '9': { service: 'NOC Letter', serviceAr: 'شهادة عدم ممانعة', ref: 'GOV-2025-00820', date: 'Nov 28, 2025', dateAr: '٢٨ نوفمبر ٢٠٢٥' },
  '10': { service: 'Trade License Renewal', serviceAr: 'تجديد الرخصة التجارية', ref: 'GOV-2025-00750', date: 'Oct 10, 2025', dateAr: '١٠ أكتوبر ٢٠٢٥' },
}

// Build completed app records
for (const [id, info] of Object.entries(COMPLETED_SERVICES)) {
  APP_DATA[id] = {
    id, ref: info.ref,
    service: info.service, serviceAr: info.serviceAr,
    status: 'completed',
    submittedDate: info.date, submittedDateAr: info.dateAr,
    sla: 'Completed', slaAr: 'مكتمل',
    timeline: [
      { icon: <PaperPlaneTilt className="h-4 w-4" />, title: 'Application Submitted', titleAr: 'تم تقديم الطلب', description: 'Application received.', descriptionAr: 'تم استلام الطلب.', date: info.date.split(',')[0], dateAr: info.dateAr.split(' ')[0] + ' ' + info.dateAr.split(' ')[1], status: 'complete' },
      { icon: <Eye className="h-4 w-4" />, title: 'Reviewed', titleAr: 'تمت المراجعة', description: 'Documents verified.', descriptionAr: 'تم التحقق من المستندات.', status: 'complete' },
      { icon: <CheckCircle className="h-4 w-4" />, title: 'Completed', titleAr: 'مكتمل', description: 'Service completed successfully.', descriptionAr: 'تم إكمال الخدمة بنجاح.', status: 'complete' },
    ],
    documents: [
      { name: 'National ID Copy', nameAr: 'صورة الهوية الوطنية', type: 'PDF', size: '1.2 MB', status: 'filed' },
    ],
  }
}

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    dashboard: 'Dashboard',
    applications: 'My Applications',
    applicationDetail: 'Application Detail',
    ref: 'Reference Number',
    submittedDate: 'Submitted Date',
    applicationTimeline: 'Application Timeline',
    applicationSummary: 'Application Summary',
    applicantName: 'Applicant Name',
    nationalId: 'National ID',
    nationality: 'Nationality',
    egypt: 'Egypt',
    phone: 'Phone',
    email: 'Email',
    attachedDocs: 'Attached Documents',
    officerNotes: 'Officer Notes',
    actions: 'Actions',
    cancelApplication: 'Cancel Application',
    submitAppeal: 'Submit Appeal',
    uploadDocuments: 'Upload Documents',
    downloadCertificate: 'Download Certificate',
    downloadDoc: 'Download',
    expired: 'Expired',
    // Status labels
    statusSubmitted: 'Submitted',
    statusUnderReview: 'Under Review',
    statusApproved: 'Approved',
    statusRejected: 'Rejected',
    statusCompleted: 'Completed',
    statusDocsRequired: 'Documents Required',
    // Status-specific messages
    rejectionNotice: 'Application Rejected',
    rejectionDesc: 'Your application has been rejected. You may submit an appeal within 30 days.',
    approvedNotice: 'Application Approved',
    approvedDesc: 'Your application has been approved. You can download your certificate or collect it from any service center.',
    completedNotice: 'Service Completed',
    completedDesc: 'This service has been completed successfully.',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    applications: 'طلباتي',
    applicationDetail: 'تفاصيل الطلب',
    ref: 'رقم المرجع',
    submittedDate: 'تاريخ التقديم',
    applicationTimeline: 'الخط الزمني للطلب',
    applicationSummary: 'ملخص الطلب',
    applicantName: 'اسم مقدم الطلب',
    nationalId: 'الهوية الوطنية',
    nationality: 'الجنسية',
    egypt: 'مصر',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    attachedDocs: 'المستندات المرفقة',
    officerNotes: 'ملاحظات الموظف',
    actions: 'الإجراءات',
    cancelApplication: 'إلغاء الطلب',
    submitAppeal: 'تقديم اعتراض',
    uploadDocuments: 'رفع المستندات',
    downloadCertificate: 'تنزيل الشهادة',
    downloadDoc: 'تنزيل',
    expired: 'منتهي الصلاحية',
    statusSubmitted: 'تم التقديم',
    statusUnderReview: 'قيد المراجعة',
    statusApproved: 'معتمد',
    statusRejected: 'مرفوض',
    statusCompleted: 'مكتمل',
    statusDocsRequired: 'مستندات مطلوبة',
    rejectionNotice: 'تم رفض الطلب',
    rejectionDesc: 'تم رفض طلبك. يمكنك تقديم اعتراض خلال ٣٠ يوم.',
    approvedNotice: 'تمت الموافقة على الطلب',
    approvedDesc: 'تمت الموافقة على طلبك. يمكنك تنزيل الشهادة أو استلامها من أي مركز خدمة.',
    completedNotice: 'اكتملت الخدمة',
    completedDesc: 'تم إكمال هذه الخدمة بنجاح.',
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getStatusBadge(status: AppStatus, h: Record<string, string>) {
  const config: Record<AppStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    submitted: { label: h.statusSubmitted, variant: 'secondary' },
    'under-review': { label: h.statusUnderReview, variant: 'default' },
    approved: { label: h.statusApproved, variant: 'outline' },
    rejected: { label: h.statusRejected, variant: 'destructive' },
    completed: { label: h.statusCompleted, variant: 'outline' },
    'docs-required': { label: h.statusDocsRequired, variant: 'destructive' },
  }
  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ApplicationDetailPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]
  const params = useParams()
  const id = params.id as string

  const app = APP_DATA[id] || APP_DATA['1']
  const serviceName = isRTL ? app.serviceAr : app.service

  const timelineItems = app.timeline.map((step) => ({
    icon: step.icon,
    title: isRTL ? step.titleAr : step.title,
    description: isRTL ? step.descriptionAr : step.description,
    date: step.date ? (isRTL ? step.dateAr : step.date) : undefined,
    status: step.status,
  }))

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/government/dashboard">{h.dashboard}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/government/applications">{h.applications}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{h.applicationDetail}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">{serviceName}</h1>
          {getStatusBadge(app.status, h)}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>{h.ref}: <span dir="ltr" className="font-mono">{app.ref}</span></span>
          <span>{h.submittedDate}: {isRTL ? app.submittedDateAr : app.submittedDate}</span>
        </div>
      </div>

      {/* Status-specific callout */}
      {app.status === 'docs-required' && (
        <Callout type="warning" title="" className="mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
            <p className="text-sm">{isRTL ? app.slaAr : app.sla}</p>
          </div>
        </Callout>
      )}
      {app.status === 'rejected' && (
        <Callout type="error" title={h.rejectionNotice} className="mb-6">
          <p>{h.rejectionDesc}</p>
        </Callout>
      )}
      {app.status === 'approved' && (
        <Callout type="success" title={h.approvedNotice} className="mb-6">
          <p>{h.approvedDesc}</p>
        </Callout>
      )}
      {app.status === 'completed' && (
        <Callout type="info" title={h.completedNotice} className="mb-6">
          <p>{h.completedDesc}</p>
        </Callout>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>{h.applicationTimeline}</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline
                items={timelineItems}
                cards
                aria-label={h.applicationTimeline}
              />
            </CardContent>
          </Card>

          {/* Officer Notes (if present) */}
          {app.officerNote && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {app.officerNote.type === 'destructive'
                    ? <Prohibit className="h-5 w-5 text-destructive" aria-hidden="true" />
                    : <Warning className="h-5 w-5 text-warning" aria-hidden="true" />
                  }
                  {h.officerNotes}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`rounded-lg border p-4 ${
                  app.officerNote.type === 'destructive'
                    ? 'border-destructive/30 bg-destructive/5'
                    : 'border-warning/30 bg-warning/5'
                }`}>
                  <p className="text-sm font-medium mb-1">
                    {isRTL ? app.officerNote.authorAr : app.officerNote.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? app.officerNote.contentAr : app.officerNote.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Attached Documents */}
          <Card>
            <CardHeader>
              <CardTitle>{h.attachedDocs}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {app.documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <FileText className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{isRTL ? doc.nameAr : doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} &middot; {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === 'expired' && (
                        <Badge variant="destructive" className="text-xs">{h.expired}</Badge>
                      )}
                      <Button variant="ghost" size="sm" aria-label={`${h.downloadDoc} ${isRTL ? doc.nameAr : doc.name}`}>
                        <Download className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{h.applicationSummary}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.applicantName}</span>
                <span className="font-medium">
                  {isRTL ? 'أحمد محمد الفلاسي' : 'Ahmed M. Al Falasi'}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.nationalId}</span>
                <span dir="ltr" className="font-mono text-xs">784-1990-1234567-1</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.nationality}</span>
                <span>{h.egypt}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.phone}</span>
                <span dir="ltr">+971 50 123 4567</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.email}</span>
                <span dir="ltr" className="text-xs">ahmed.falasi@email.com</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions — vary by status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{h.actions}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Approved: Download Certificate */}
              {app.status === 'approved' && (
                <Button className="w-full">
                  <Trophy className="h-4 w-4 me-2" aria-hidden="true" />
                  {h.downloadCertificate}
                </Button>
              )}

              {/* Docs Required: Upload Documents */}
              {app.status === 'docs-required' && (
                <Button className="w-full" asChild>
                  <Link href="/examples/government/documents">
                    <FileText className="h-4 w-4 me-2" aria-hidden="true" />
                    {h.uploadDocuments}
                  </Link>
                </Button>
              )}

              {/* Rejected: Appeal (primary) */}
              {app.status === 'rejected' && (
                <Button className="w-full">
                  <Gavel className="h-4 w-4 me-2" aria-hidden="true" />
                  {h.submitAppeal}
                </Button>
              )}

              {/* Non-completed: Appeal (secondary) */}
              {app.status !== 'rejected' && app.status !== 'completed' && (
                <Button variant="outline" className="w-full">
                  <Gavel className="h-4 w-4 me-2" aria-hidden="true" />
                  {h.submitAppeal}
                </Button>
              )}

              {/* Non-completed, non-rejected: Cancel */}
              {app.status !== 'completed' && app.status !== 'rejected' && (
                <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                  <XCircle className="h-4 w-4 me-2" aria-hidden="true" />
                  {h.cancelApplication}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
