'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Timeline } from '@/components/ui/timeline'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'

const t = {
  en: {
    dashboard: 'Dashboard',
    applications: 'My Applications',
    applicationDetail: 'Application Detail',
    ref: 'Reference Number',
    serviceType: 'Service Type',
    visaRenewal: 'Visa & Residency Renewal',
    submittedDate: 'Submitted Date',
    estimatedCompletion: 'Estimated Completion',
    status: 'Status',
    docsRequired: 'Additional Documents Required',
    applicationTimeline: 'Application Timeline',
    submitted: 'Application Submitted',
    submittedDesc: 'Your application has been received and registered in the system.',
    initialReview: 'Initial Review',
    initialReviewDesc: 'Application documents have been verified by the review team.',
    documentRequest: 'Additional Document Required',
    documentRequestDesc: 'Please upload an updated salary certificate (dated within the last 30 days). Your previous certificate has expired.',
    approval: 'Final Approval',
    approvalDesc: 'Pending review of additional documents',
    completion: 'Completed',
    completionDesc: 'Visa renewed and ready for collection',
    applicationSummary: 'Application Summary',
    applicantName: 'Applicant Name',
    nationalId: 'National ID',
    nationality: 'Nationality',
    egypt: 'Egypt',
    phone: 'Phone',
    email: 'Email',
    currentVisaExpiry: 'Current Visa Expiry',
    visaExpiryDate: 'Jun 15, 2026',
    attachedDocs: 'Attached Documents',
    nationalIdDoc: 'National ID Copy',
    passportDoc: 'Passport Copy',
    photoDoc: 'Personal Photo',
    tenancyDoc: 'Tenancy Contract',
    salaryDoc: 'Salary Certificate',
    officerNotes: 'Officer Notes',
    noteAuthor: 'Fatima Al Dhaheri, Senior Review Officer',
    noteContent: 'The salary certificate provided is dated more than 30 days ago. Please upload a recent salary certificate to proceed with the application. All other documents are in order.',
    actions: 'Actions',
    cancelApplication: 'Cancel Application',
    submitAppeal: 'Submit Appeal',
    uploadDocuments: 'Upload Documents',
    slaIndicator: 'Estimated completion: 2 business days after documents received',
    mar10: 'Mar 10, 2026',
    mar11: 'Mar 11, 2026',
    mar12: 'Mar 12, 2026',
    downloadDoc: 'Download',
    viewDoc: 'View',
    pdf: 'PDF',
    jpg: 'JPG',
    png: 'PNG',
    filed: 'Filed',
    expired: 'Expired',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    applications: 'طلباتي',
    applicationDetail: 'تفاصيل الطلب',
    ref: 'رقم المرجع',
    serviceType: 'نوع الخدمة',
    visaRenewal: 'تجديد تأشيرة الإقامة',
    submittedDate: 'تاريخ التقديم',
    estimatedCompletion: 'الإكمال المتوقع',
    status: 'الحالة',
    docsRequired: 'مستندات إضافية مطلوبة',
    applicationTimeline: 'الخط الزمني للطلب',
    submitted: 'تم تقديم الطلب',
    submittedDesc: 'تم استلام طلبك وتسجيله في النظام.',
    initialReview: 'المراجعة الأولية',
    initialReviewDesc: 'تم التحقق من مستندات الطلب من قبل فريق المراجعة.',
    documentRequest: 'مستند إضافي مطلوب',
    documentRequestDesc: 'يرجى تحميل شهادة راتب محدثة (بتاريخ خلال آخر ٣٠ يوم). شهادتك السابقة قد انتهت صلاحيتها.',
    approval: 'الموافقة النهائية',
    approvalDesc: 'في انتظار مراجعة المستندات الإضافية',
    completion: 'مكتمل',
    completionDesc: 'تم تجديد التأشيرة وهي جاهزة للاستلام',
    applicationSummary: 'ملخص الطلب',
    applicantName: 'اسم مقدم الطلب',
    nationalId: 'الهوية الوطنية',
    nationality: 'الجنسية',
    egypt: 'مصر',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    currentVisaExpiry: 'انتهاء التأشيرة الحالية',
    visaExpiryDate: '١٥ يونيو ٢٠٢٦',
    attachedDocs: 'المستندات المرفقة',
    nationalIdDoc: 'صورة الهوية الوطنية',
    passportDoc: 'صورة جواز السفر',
    photoDoc: 'الصورة الشخصية',
    tenancyDoc: 'عقد الإيجار',
    salaryDoc: 'شهادة الراتب',
    officerNotes: 'ملاحظات الموظف',
    noteAuthor: 'فاطمة الظاهري، مسؤولة مراجعة أولى',
    noteContent: 'شهادة الراتب المقدمة بتاريخ يتجاوز ٣٠ يوماً. يرجى تحميل شهادة راتب حديثة لمتابعة الطلب. جميع المستندات الأخرى مكتملة.',
    actions: 'الإجراءات',
    cancelApplication: 'إلغاء الطلب',
    submitAppeal: 'تقديم اعتراض',
    uploadDocuments: 'تحميل المستندات',
    slaIndicator: 'الإكمال المتوقع: يومي عمل بعد استلام المستندات',
    mar10: '١٠ مارس ٢٠٢٦',
    mar11: '١١ مارس ٢٠٢٦',
    mar12: '١٢ مارس ٢٠٢٦',
    downloadDoc: 'تنزيل',
    viewDoc: 'عرض',
    pdf: 'PDF',
    jpg: 'JPG',
    png: 'PNG',
    filed: 'مقدم',
    expired: 'منتهي الصلاحية',
  },
}

export default function ApplicationDetailPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]

  const timelineItems = [
    {
      icon: <PaperPlaneTilt className="h-4 w-4" />,
      title: h.submitted,
      description: h.submittedDesc,
      date: h.mar10,
      status: 'complete' as const,
    },
    {
      icon: <Eye className="h-4 w-4" />,
      title: h.initialReview,
      description: h.initialReviewDesc,
      date: h.mar11,
      status: 'complete' as const,
    },
    {
      icon: <Warning className="h-4 w-4" />,
      title: h.documentRequest,
      description: h.documentRequestDesc,
      date: h.mar12,
      status: 'current' as const,
    },
    {
      icon: <Seal className="h-4 w-4" />,
      title: h.approval,
      description: h.approvalDesc,
      status: 'upcoming' as const,
    },
    {
      icon: <CheckCircle className="h-4 w-4" />,
      title: h.completion,
      description: h.completionDesc,
      status: 'upcoming' as const,
    },
  ]

  const documents = [
    { name: h.nationalIdDoc, type: h.pdf, size: '1.2 MB', status: 'filed' },
    { name: h.passportDoc, type: h.pdf, size: '2.4 MB', status: 'filed' },
    { name: h.photoDoc, type: h.jpg, size: '450 KB', status: 'filed' },
    { name: h.tenancyDoc, type: h.pdf, size: '3.1 MB', status: 'filed' },
    { name: h.salaryDoc, type: h.pdf, size: '890 KB', status: 'expired' },
  ]

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
          <h1 className="text-2xl font-bold">{h.visaRenewal}</h1>
          <Badge variant="destructive">{h.docsRequired}</Badge>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>{h.ref}: <span dir="ltr" className="font-mono">GOV-2026-00198</span></span>
          <span>{h.submittedDate}: {h.mar10}</span>
        </div>
      </div>

      {/* SLA Indicator */}
      <Callout type="warning" title="" className="mb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" />
          <p className="text-sm">{h.slaIndicator}</p>
        </div>
      </Callout>

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

          {/* Officer Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning className="h-5 w-5 text-warning" />
                {h.officerNotes}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
                <p className="text-sm font-medium mb-1">{h.noteAuthor}</p>
                <p className="text-sm text-muted-foreground">{h.noteContent}</p>
              </div>
            </CardContent>
          </Card>

          {/* Attached Documents */}
          <Card>
            <CardHeader>
              <CardTitle>{h.attachedDocs}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} &middot; {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === 'expired' && (
                        <Badge variant="destructive" className="text-xs">{h.expired}</Badge>
                      )}
                      <Button variant="ghost" size="sm" aria-label={`${h.downloadDoc} ${doc.name}`}>
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
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.currentVisaExpiry}</span>
                <span>{h.visaExpiryDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{h.actions}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" asChild>
                <Link href="/examples/government/documents">
                  <FileText className="h-4 w-4 me-2" aria-hidden="true" />
                  {h.uploadDocuments}
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Gavel className="h-4 w-4 me-2" aria-hidden="true" />
                {h.submitAppeal}
              </Button>
              <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                <XCircle className="h-4 w-4 me-2" aria-hidden="true" />
                {h.cancelApplication}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
