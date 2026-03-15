'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/ui/stats-card'
import { FeatureCard } from '@/components/ui/feature-card'
import { Callout } from '@/components/ui/callout'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Progress } from '@/components/ui/progress'
import { Chart } from '@/components/ui/chart'
import {
  Shield,
  ClipboardText,
  CheckCircle,
  Clock,
  FileText,
  AirplaneTilt,
  Briefcase,
  IdentificationCard,
  Car,
  HouseSimple,
  UsersThree,
  Plus,
  MagnifyingGlass,
  Upload,
  ArrowRight,
  ArrowLeft,
  Megaphone,
  Warning,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'

interface ActiveRequest {
  id: string
  ref: string
  service: string
  serviceAr: string
  date: string
  dateAr: string
  status: 'submitted' | 'under-review' | 'approved' | 'docs-required'
}

const t = {
  en: {
    welcome: 'Welcome back, Ahmed',
    nationalId: 'National ID: 784-1990-*******-1',
    lastLogin: 'Last login: Today at 9:15 AM',
    activeRequests: 'Active Requests',
    approved: 'Approved',
    pendingDocs: 'Pending Documents',
    completed: 'Completed',
    fromLastMonth: 'from last month',
    featuredServices: 'Featured Services',
    visaResidency: 'Visa & Residency',
    visaResidencyDesc: 'Apply for new visa, renew residency, or check visa status',
    businessLicensing: 'Business Licensing',
    businessLicensingDesc: 'Register new business, renew trade license, or amend activities',
    civilAffairs: 'Civil Affairs',
    civilAffairsDesc: 'Birth certificates, marriage registration, and civil documents',
    trafficVehicles: 'Traffic & Vehicles',
    trafficVehiclesDesc: 'Vehicle registration, driving license, and traffic services',
    housing: 'Housing',
    housingDesc: 'Housing applications, tenant services, and property registration',
    employment: 'Employment',
    employmentDesc: 'Work permits, labor contracts, and employment services',
    recentApplications: 'Recent Applications',
    viewAll: 'View All',
    quickActions: 'Quick Actions',
    newApplication: 'New Application',
    trackRequest: 'Track Request',
    uploadDocument: 'Upload Document',
    announcement: 'Important Announcement',
    ramadanNotice: 'Ramadan working hours: All service centers operate from 9:00 AM to 2:00 PM. Online services available 24/7.',
    submitted: 'Submitted',
    underReview: 'Under Review',
    docsRequired: 'Docs Required',
    ref: 'Ref',
    viewDetails: 'View Details',
    continueApplication: 'Continue Application',
    continueDesc: 'You have an in-progress application',
    step2of4: 'Step 2 of 4 — Documents Upload',
    continueBtn: 'Continue',
    applicationsByCategory: 'Applications by Category',
    catVisa: 'Visa',
    catLicensing: 'Licensing',
    catCivil: 'Civil',
    catTraffic: 'Traffic',
    catHousing: 'Housing',
    catEmployment: 'Employment',
    upcomingDeadlines: 'Upcoming Deadlines',
    salaryCertExpiry: 'Salary Certificate expires',
    tradeLicenseExpiry: 'Trade License expires',
    visaExpiry: 'Visa expires',
    daysLeft: 'days left',
    mar30: 'Mar 30, 2026',
    apr15: 'Apr 15, 2026',
    jun15: 'Jun 15, 2026',
  },
  ar: {
    welcome: 'مرحباً بعودتك، أحمد',
    nationalId: 'الهوية: 784-1990-*******-1',
    lastLogin: 'آخر تسجيل دخول: اليوم الساعة ٩:١٥ صباحاً',
    activeRequests: 'الطلبات النشطة',
    approved: 'المعتمدة',
    pendingDocs: 'مستندات معلقة',
    completed: 'المكتملة',
    fromLastMonth: 'من الشهر الماضي',
    featuredServices: 'الخدمات الرئيسية',
    visaResidency: 'تأشيرات وإقامة',
    visaResidencyDesc: 'تقديم طلب تأشيرة جديدة، تجديد الإقامة، أو التحقق من حالة التأشيرة',
    businessLicensing: 'تراخيص تجارية',
    businessLicensingDesc: 'تسجيل أعمال جديدة، تجديد الرخصة التجارية، أو تعديل الأنشطة',
    civilAffairs: 'الأحوال المدنية',
    civilAffairsDesc: 'شهادات الميلاد، تسجيل الزواج، والمستندات المدنية',
    trafficVehicles: 'المرور والمركبات',
    trafficVehiclesDesc: 'تسجيل المركبات، رخص القيادة، وخدمات المرور',
    housing: 'الإسكان',
    housingDesc: 'طلبات الإسكان، خدمات المستأجرين، وتسجيل العقارات',
    employment: 'العمل والتوظيف',
    employmentDesc: 'تصاريح العمل، عقود العمل، وخدمات التوظيف',
    recentApplications: 'الطلبات الأخيرة',
    viewAll: 'عرض الكل',
    quickActions: 'إجراءات سريعة',
    newApplication: 'طلب جديد',
    trackRequest: 'تتبع الطلب',
    uploadDocument: 'رفع مستند',
    announcement: 'إعلان مهم',
    ramadanNotice: 'ساعات العمل في رمضان: جميع مراكز الخدمة تعمل من ٩:٠٠ صباحاً حتى ٢:٠٠ ظهراً. الخدمات الإلكترونية متاحة على مدار الساعة.',
    submitted: 'تم التقديم',
    underReview: 'قيد المراجعة',
    docsRequired: 'مستندات مطلوبة',
    ref: 'المرجع',
    viewDetails: 'عرض التفاصيل',
    continueApplication: 'متابعة الطلب',
    continueDesc: 'لديك طلب قيد التنفيذ',
    step2of4: 'الخطوة ٢ من ٤ — رفع المستندات',
    continueBtn: 'متابعة',
    applicationsByCategory: 'الطلبات حسب الفئة',
    catVisa: 'تأشيرات',
    catLicensing: 'تراخيص',
    catCivil: 'مدني',
    catTraffic: 'مرور',
    catHousing: 'إسكان',
    catEmployment: 'توظيف',
    upcomingDeadlines: 'مواعيد قادمة',
    salaryCertExpiry: 'تنتهي صلاحية شهادة الراتب',
    tradeLicenseExpiry: 'تنتهي صلاحية الرخصة التجارية',
    visaExpiry: 'تنتهي صلاحية التأشيرة',
    daysLeft: 'يوم متبقي',
    mar30: '٣٠ مارس ٢٠٢٦',
    apr15: '١٥ أبريل ٢٠٢٦',
    jun15: '١٥ يونيو ٢٠٢٦',
  },
}

const activeRequests: ActiveRequest[] = [
  {
    id: '1',
    ref: 'GOV-2026-00198',
    service: 'Visa Renewal',
    serviceAr: 'تجديد التأشيرة',
    date: 'Mar 10, 2026',
    dateAr: '١٠ مارس ٢٠٢٦',
    status: 'docs-required',
  },
  {
    id: '2',
    ref: 'GOV-2026-00185',
    service: 'Trade License Amendment',
    serviceAr: 'تعديل الرخصة التجارية',
    date: 'Mar 8, 2026',
    dateAr: '٨ مارس ٢٠٢٦',
    status: 'under-review',
  },
  {
    id: '3',
    ref: 'GOV-2026-00142',
    service: 'Trade License Renewal',
    serviceAr: 'تجديد الرخصة التجارية',
    date: 'Mar 1, 2026',
    dateAr: '١ مارس ٢٠٢٦',
    status: 'approved',
  },
]

function getStatusBadge(status: ActiveRequest['status'], labels: Record<string, string>) {
  const map: Record<ActiveRequest['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    submitted: { label: labels.submitted, variant: 'secondary' },
    'under-review': { label: labels.underReview, variant: 'default' },
    approved: { label: labels.approved, variant: 'outline' },
    'docs-required': { label: labels.docsRequired, variant: 'destructive' },
  }
  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}

export default function GovernmentDashboard() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="container py-8">
      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-4 bg-primary/10 rounded-xl">
            <Shield className="h-10 w-10 text-primary" weight="duotone" />
          </div>
          <div>
            <h1 className="text-3xl font-bold ltr:tracking-tight">{h.welcome}</h1>
            <p className="text-muted-foreground text-sm">{h.nationalId}</p>
            <p className="text-muted-foreground text-xs">{h.lastLogin}</p>
          </div>
        </div>
      </div>

      {/* Announcement */}
      <div className="mb-6">
        <Callout type="warning" title={h.announcement}>
          <div className="flex items-start gap-2">
            <Megaphone className="h-4 w-4 mt-0.5 shrink-0" />
            <p>{h.ramadanNotice}</p>
          </div>
        </Callout>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          icon={<ClipboardText className="h-4 w-4" />}
          label={h.activeRequests}
          value={3}
          trend={10}
          trendLabel={h.fromLastMonth}
        />
        <StatsCard
          icon={<CheckCircle className="h-4 w-4" />}
          label={h.approved}
          value={12}
          trend={25}
          trendLabel={h.fromLastMonth}
        />
        <StatsCard
          icon={<FileText className="h-4 w-4" />}
          label={h.pendingDocs}
          value={1}
          trend={-50}
          trendLabel={h.fromLastMonth}
        />
        <StatsCard
          icon={<Clock className="h-4 w-4" />}
          label={h.completed}
          value={28}
          trend={15}
          trendLabel={h.fromLastMonth}
        />
      </div>

      {/* Continue Application */}
      <Card className="mb-6 border-info/30 bg-info/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <AirplaneTilt className="h-5 w-5 text-info" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-sm">{h.continueApplication}</p>
                <p className="text-xs text-muted-foreground">
                  {isRTL ? 'تجديد التأشيرة' : 'Visa Renewal'} &middot; <span dir="ltr">GOV-2026-00198</span>
                </p>
              </div>
            </div>
            <ButtonArrow size="sm" asChild>
              <Link href="/examples/government/services/visa-residency">
                {h.continueBtn}
              </Link>
            </ButtonArrow>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{h.step2of4}</span>
              <span>50%</span>
            </div>
            <Progress value={50} className="h-2" aria-label={h.step2of4} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Services */}
          <div>
            <h2 className="text-xl font-semibold mb-4">{h.featuredServices}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title={h.visaResidency}
                description={h.visaResidencyDesc}
                icon={AirplaneTilt}
                href="/examples/government/services/visa-residency"
              />
              <FeatureCard
                title={h.businessLicensing}
                description={h.businessLicensingDesc}
                icon={Briefcase}
                href="/examples/government/services/business-licensing"
              />
              <FeatureCard
                title={h.civilAffairs}
                description={h.civilAffairsDesc}
                icon={IdentificationCard}
                href="/examples/government/services/civil-affairs"
              />
              <FeatureCard
                title={h.trafficVehicles}
                description={h.trafficVehiclesDesc}
                icon={Car}
                href="/examples/government/services/traffic-vehicles"
              />
              <FeatureCard
                title={h.housing}
                description={h.housingDesc}
                icon={HouseSimple}
                href="/examples/government/services/housing"
              />
              <FeatureCard
                title={h.employment}
                description={h.employmentDesc}
                icon={UsersThree}
                href="/examples/government/services/employment"
              />
            </div>
          </div>

          {/* Applications by Category Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{h.applicationsByCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                type="bar"
                data={[
                  { name: h.catVisa, value: 8 },
                  { name: h.catLicensing, value: 5 },
                  { name: h.catCivil, value: 3 },
                  { name: h.catTraffic, value: 4 },
                  { name: h.catHousing, value: 2 },
                  { name: h.catEmployment, value: 6 },
                ]}
                size="sm"
                showXAxis
                showYAxis
                aria-label={h.applicationsByCategory}
              />
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{h.recentApplications}</CardTitle>
                  <CardDescription>
                    <ArabicNumber value={3} /> {h.activeRequests.toLowerCase()}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/examples/government/applications">
                    {h.viewAll}
                    <Arrow className="h-4 w-4 ms-2" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeRequests.map((req) => (
                  <Link
                    key={req.id}
                    href={`/examples/government/applications/${req.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">
                        {isRTL ? req.serviceAr : req.service}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {h.ref}: <span dir="ltr">{req.ref}</span> &middot; {isRTL ? req.dateAr : req.date}
                      </p>
                    </div>
                    {getStatusBadge(req.status, h)}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{h.quickActions}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start gap-2" asChild>
                <Link href="/examples/government/services/visa-residency">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  {h.newApplication}
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <Link href="/examples/government/applications">
                  <MagnifyingGlass className="h-4 w-4" aria-hidden="true" />
                  {h.trackRequest}
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <Link href="/examples/government/documents">
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  {h.uploadDocument}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" aria-hidden="true" />
                {h.upcomingDeadlines}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/examples/government/documents"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{h.salaryCertExpiry}</p>
                  <p className="text-xs text-muted-foreground">{h.mar30}</p>
                </div>
                <Badge variant="destructive" className="text-xs">15 {h.daysLeft}</Badge>
              </Link>
              <Link
                href="/examples/government/documents"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{h.tradeLicenseExpiry}</p>
                  <p className="text-xs text-muted-foreground">{h.apr15}</p>
                </div>
                <Badge variant="secondary" className="text-xs">31 {h.daysLeft}</Badge>
              </Link>
              <Link
                href="/examples/government/documents"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{h.visaExpiry}</p>
                  <p className="text-xs text-muted-foreground">{h.jun15}</p>
                </div>
                <Badge variant="outline" className="text-xs">92 {h.daysLeft}</Badge>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
