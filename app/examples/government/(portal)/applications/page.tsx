'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  ClipboardText,
  Export,
  ArrowRight,
  ArrowLeft,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'

type ApplicationStatus = 'submitted' | 'under-review' | 'approved' | 'rejected' | 'completed' | 'docs-required'

interface Application {
  id: string
  ref: string
  service: string
  serviceAr: string
  submittedDate: string
  submittedDateAr: string
  hijriDate: string
  hijriDateAr: string
  status: ApplicationStatus
  sla: string
  slaAr: string
}

const t = {
  en: {
    dashboard: 'Dashboard',
    myApplications: 'My Applications',
    subtitle: 'Track and manage all your service requests',
    all: 'All',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    completed: 'Completed',
    exportBtn: 'Export',
    refNumber: 'Reference #',
    serviceType: 'Service Type',
    submittedDate: 'Submitted',
    status: 'Status',
    slaRemaining: 'SLA',
    actions: 'Actions',
    viewDetails: 'View',
    searchPlaceholder: 'Search by reference number...',
    emptyMessage: 'No applications found',
    clearSearch: 'Clear search',
    next: 'Next',
    previous: 'Previous',
    page: 'Page',
    submitted: 'Submitted',
    underReview: 'Under Review',
    docsRequired: 'Docs Required',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    myApplications: 'طلباتي',
    subtitle: 'تتبع وإدارة جميع طلبات الخدمة',
    all: 'الكل',
    pending: 'قيد الانتظار',
    approved: 'معتمدة',
    rejected: 'مرفوضة',
    completed: 'مكتملة',
    exportBtn: 'تصدير',
    refNumber: 'رقم المرجع',
    serviceType: 'نوع الخدمة',
    submittedDate: 'تاريخ التقديم',
    status: 'الحالة',
    slaRemaining: 'المهلة',
    actions: 'الإجراءات',
    viewDetails: 'عرض',
    searchPlaceholder: 'ابحث برقم المرجع...',
    emptyMessage: 'لا توجد طلبات',
    clearSearch: 'مسح البحث',
    next: 'التالي',
    previous: 'السابق',
    page: 'صفحة',
    submitted: 'تم التقديم',
    underReview: 'قيد المراجعة',
    docsRequired: 'مستندات مطلوبة',
  },
}

const applications: Application[] = [
  {
    id: '1',
    ref: 'GOV-2026-00198',
    service: 'Visa Renewal',
    serviceAr: 'تجديد التأشيرة',
    submittedDate: 'Mar 10, 2026',
    submittedDateAr: '١٠ مارس ٢٠٢٦',
    hijriDate: '10 Ramadan 1447',
    hijriDateAr: '١٠ رمضان ١٤٤٧',
    status: 'docs-required',
    sla: '2 days remaining',
    slaAr: 'يومان متبقيان',
  },
  {
    id: '2',
    ref: 'GOV-2026-00185',
    service: 'Trade License Amendment',
    serviceAr: 'تعديل الرخصة التجارية',
    submittedDate: 'Mar 8, 2026',
    submittedDateAr: '٨ مارس ٢٠٢٦',
    hijriDate: '8 Ramadan 1447',
    hijriDateAr: '٨ رمضان ١٤٤٧',
    status: 'under-review',
    sla: '4 days remaining',
    slaAr: '٤ أيام متبقية',
  },
  {
    id: '3',
    ref: 'GOV-2026-00142',
    service: 'Trade License Renewal',
    serviceAr: 'تجديد الرخصة التجارية',
    submittedDate: 'Mar 1, 2026',
    submittedDateAr: '١ مارس ٢٠٢٦',
    hijriDate: '1 Ramadan 1447',
    hijriDateAr: '١ رمضان ١٤٤٧',
    status: 'approved',
    sla: 'Completed',
    slaAr: 'مكتمل',
  },
  {
    id: '4',
    ref: 'GOV-2026-00120',
    service: 'Birth Certificate',
    serviceAr: 'شهادة ميلاد',
    submittedDate: 'Feb 25, 2026',
    submittedDateAr: '٢٥ فبراير ٢٠٢٦',
    hijriDate: '25 Sha\'ban 1447',
    hijriDateAr: '٢٥ شعبان ١٤٤٧',
    status: 'completed',
    sla: 'Completed',
    slaAr: 'مكتمل',
  },
  {
    id: '5',
    ref: 'GOV-2026-00098',
    service: 'Driving License Renewal',
    serviceAr: 'تجديد رخصة القيادة',
    submittedDate: 'Feb 18, 2026',
    submittedDateAr: '١٨ فبراير ٢٠٢٦',
    hijriDate: '18 Sha\'ban 1447',
    hijriDateAr: '١٨ شعبان ١٤٤٧',
    status: 'completed',
    sla: 'Completed',
    slaAr: 'مكتمل',
  },
  {
    id: '6',
    ref: 'GOV-2026-00075',
    service: 'Housing Application',
    serviceAr: 'طلب إسكان',
    submittedDate: 'Feb 10, 2026',
    submittedDateAr: '١٠ فبراير ٢٠٢٦',
    hijriDate: '10 Sha\'ban 1447',
    hijriDateAr: '١٠ شعبان ١٤٤٧',
    status: 'rejected',
    sla: 'Closed',
    slaAr: 'مغلق',
  },
  {
    id: '7',
    ref: 'GOV-2026-00052',
    service: 'Vehicle Registration',
    serviceAr: 'تسجيل مركبة',
    submittedDate: 'Feb 5, 2026',
    submittedDateAr: '٥ فبراير ٢٠٢٦',
    hijriDate: '5 Sha\'ban 1447',
    hijriDateAr: '٥ شعبان ١٤٤٧',
    status: 'completed',
    sla: 'Completed',
    slaAr: 'مكتمل',
  },
  {
    id: '8',
    ref: 'GOV-2025-00890',
    service: 'Visa Renewal',
    serviceAr: 'تجديد التأشيرة',
    submittedDate: 'Dec 15, 2025',
    submittedDateAr: '١٥ ديسمبر ٢٠٢٥',
    hijriDate: '15 Jumada II 1447',
    hijriDateAr: '١٥ جمادى الآخرة ١٤٤٧',
    status: 'completed',
    sla: 'Completed',
    slaAr: 'مكتمل',
  },
  {
    id: '9',
    ref: 'GOV-2025-00820',
    service: 'NOC Letter',
    serviceAr: 'شهادة عدم ممانعة',
    submittedDate: 'Nov 28, 2025',
    submittedDateAr: '٢٨ نوفمبر ٢٠٢٥',
    hijriDate: '28 Jumada I 1447',
    hijriDateAr: '٢٨ جمادى الأولى ١٤٤٧',
    status: 'completed',
    sla: 'Completed',
    slaAr: 'مكتمل',
  },
  {
    id: '10',
    ref: 'GOV-2025-00750',
    service: 'Trade License Renewal',
    serviceAr: 'تجديد الرخصة التجارية',
    submittedDate: 'Oct 10, 2025',
    submittedDateAr: '١٠ أكتوبر ٢٠٢٥',
    hijriDate: '10 Rabi\' II 1447',
    hijriDateAr: '١٠ ربيع الآخر ١٤٤٧',
    status: 'completed',
    sla: 'Completed',
    slaAr: 'مكتمل',
  },
]

function getStatusBadge(status: ApplicationStatus, labels: Record<string, string>) {
  const config: Record<ApplicationStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    submitted: { label: labels.submitted, variant: 'secondary' },
    'under-review': { label: labels.underReview, variant: 'default' },
    approved: { label: labels.approved, variant: 'outline' },
    rejected: { label: labels.rejected, variant: 'destructive' },
    completed: { label: labels.completed, variant: 'outline' },
    'docs-required': { label: labels.docsRequired, variant: 'destructive' },
  }
  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}

export default function ApplicationsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]
  const [activeTab, setActiveTab] = React.useState('all')
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const filteredApps = activeTab === 'all'
    ? applications
    : activeTab === 'pending'
    ? applications.filter((a) => ['submitted', 'under-review', 'docs-required'].includes(a.status))
    : applications.filter((a) => a.status === activeTab)

  const columns = [
    {
      id: 'ref',
      header: h.refNumber,
      accessorKey: 'ref' as const,
      sortable: true,
      cell: (row: Application) => (
        <span dir="ltr" className="font-mono text-xs">{row.ref}</span>
      ),
    },
    {
      id: 'service',
      header: h.serviceType,
      accessorKey: 'service' as const,
      sortable: true,
      cell: (row: Application) => (
        <span>{isRTL ? row.serviceAr : row.service}</span>
      ),
    },
    {
      id: 'date',
      header: h.submittedDate,
      accessorKey: 'submittedDate' as const,
      sortable: true,
      cell: (row: Application) => (
        <div className="text-sm">
          <p>{isRTL ? row.submittedDateAr : row.submittedDate}</p>
          <p className="text-xs text-muted-foreground">{isRTL ? row.hijriDateAr : row.hijriDate}</p>
        </div>
      ),
    },
    {
      id: 'status',
      header: h.status,
      accessorKey: 'status' as const,
      cell: (row: Application) => getStatusBadge(row.status, h),
    },
    {
      id: 'sla',
      header: h.slaRemaining,
      accessorKey: 'sla' as const,
      cell: (row: Application) => (
        <span className="text-sm text-muted-foreground">
          {isRTL ? row.slaAr : row.sla}
        </span>
      ),
    },
    {
      id: 'actions',
      header: h.actions,
      accessorKey: 'id' as const,
      cell: (row: Application) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/examples/government/applications/${row.id}`}>
            {h.viewDetails}
            <Arrow className="h-3 w-3 ms-1" />
          </Link>
        </Button>
      ),
    },
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
            <BreadcrumbPage>{h.myApplications}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-4 bg-primary/10 rounded-xl">
            <ClipboardText className="h-10 w-10 text-primary" weight="duotone" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{h.myApplications}</h1>
            <p className="text-muted-foreground text-sm">{h.subtitle}</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Export className="h-4 w-4 me-2" aria-hidden="true" />
          {h.exportBtn}
        </Button>
      </div>

      {/* Tabs & Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            {h.all} ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            {h.pending} ({applications.filter((a) => ['submitted', 'under-review', 'docs-required'].includes(a.status)).length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            {h.approved} ({applications.filter((a) => a.status === 'approved').length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            {h.rejected} ({applications.filter((a) => a.status === 'rejected').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            {h.completed} ({applications.filter((a) => a.status === 'completed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={filteredApps}
                columns={columns}
                searchable
                searchPlaceholder={h.searchPlaceholder}
                emptyMessage={h.emptyMessage}
                clearSearchLabel={h.clearSearch}
                enableSorting
                pagination
                pageSize={5}
                nextLabel={h.next}
                previousLabel={h.previous}
                pageLabel={h.page}
                hoverable
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
