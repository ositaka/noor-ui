'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  GridFour,
  AirplaneTilt,
  Briefcase,
  IdentificationCard,
  Car,
  HouseSimple,
  UsersThree,
  Clock,
  MagnifyingGlass,
  ArrowRight,
  ArrowLeft,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'

interface ServiceItem {
  slug: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  icon: React.ElementType
  processingDays: string
  processingDaysAr: string
  fee: string
  feeAr: string
  category: string
  categoryAr: string
}

const services: ServiceItem[] = [
  {
    slug: 'visa-residency',
    title: 'Visa & Residency Renewal',
    titleAr: 'تجديد تأشيرة الإقامة',
    description: 'Renew your residence visa, apply for new visas, or check visa status.',
    descriptionAr: 'تجديد تأشيرة الإقامة أو التقدم بطلب تأشيرات جديدة أو التحقق من حالة التأشيرة.',
    icon: AirplaneTilt,
    processingDays: '3-5 days',
    processingDaysAr: '٣-٥ أيام',
    fee: 'AED 1,050',
    feeAr: '١٬٠٥٠ د.إ',
    category: 'Immigration',
    categoryAr: 'الهجرة',
  },
  {
    slug: 'business-licensing',
    title: 'Business License Application',
    titleAr: 'طلب رخصة تجارية',
    description: 'Register new business, renew trade license, or amend activities.',
    descriptionAr: 'تسجيل أعمال جديدة أو تجديد الرخصة التجارية أو تعديل الأنشطة.',
    icon: Briefcase,
    processingDays: '5-7 days',
    processingDaysAr: '٥-٧ أيام',
    fee: 'AED 2,500',
    feeAr: '٢٬٥٠٠ د.إ',
    category: 'Business',
    categoryAr: 'الأعمال',
  },
  {
    slug: 'civil-affairs',
    title: 'Civil Affairs Certificate',
    titleAr: 'شهادة الأحوال المدنية',
    description: 'Birth certificates, marriage registration, and civil documents.',
    descriptionAr: 'شهادات الميلاد وتسجيل الزواج والمستندات المدنية.',
    icon: IdentificationCard,
    processingDays: '1-3 days',
    processingDaysAr: '١-٣ أيام',
    fee: 'AED 150',
    feeAr: '١٥٠ د.إ',
    category: 'Civil',
    categoryAr: 'مدني',
  },
  {
    slug: 'traffic-vehicles',
    title: 'Traffic & Vehicle Services',
    titleAr: 'خدمات المرور والمركبات',
    description: 'Vehicle registration, driving license services, and traffic permits.',
    descriptionAr: 'تسجيل المركبات وخدمات رخص القيادة والتصاريح المرورية.',
    icon: Car,
    processingDays: '2-3 days',
    processingDaysAr: '٢-٣ أيام',
    fee: 'AED 400',
    feeAr: '٤٠٠ د.إ',
    category: 'Transport',
    categoryAr: 'النقل',
  },
  {
    slug: 'housing',
    title: 'Housing Application',
    titleAr: 'طلب إسكان',
    description: 'Government housing programs, tenant services, and property registration.',
    descriptionAr: 'برامج الإسكان الحكومية وخدمات المستأجرين وتسجيل العقارات.',
    icon: HouseSimple,
    processingDays: '10-15 days',
    processingDaysAr: '١٠-١٥ يوم',
    fee: 'Free',
    feeAr: 'مجاني',
    category: 'Housing',
    categoryAr: 'الإسكان',
  },
  {
    slug: 'employment',
    title: 'Employment Services',
    titleAr: 'خدمات التوظيف',
    description: 'Work permits, labor contracts, and employment services.',
    descriptionAr: 'تصاريح العمل وعقود العمل وخدمات التوظيف.',
    icon: UsersThree,
    processingDays: '3-5 days',
    processingDaysAr: '٣-٥ أيام',
    fee: 'AED 300',
    feeAr: '٣٠٠ د.إ',
    category: 'Employment',
    categoryAr: 'التوظيف',
  },
]

const t = {
  en: {
    dashboard: 'Dashboard',
    servicesCatalog: 'Services Catalog',
    subtitle: 'Browse and apply for government services',
    searchPlaceholder: 'Search services...',
    processingTime: 'Processing',
    fee: 'Fee',
    applyNow: 'Apply',
    servicesAvailable: 'services available',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    servicesCatalog: 'كتالوج الخدمات',
    subtitle: 'تصفح وتقدم للخدمات الحكومية',
    searchPlaceholder: 'ابحث عن الخدمات...',
    processingTime: 'المعالجة',
    fee: 'الرسوم',
    applyNow: 'تقديم',
    servicesAvailable: 'خدمات متاحة',
  },
}

export default function ServicesCatalogPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]
  const [search, setSearch] = React.useState('')
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const filtered = services.filter((s) => {
    if (!search) return true
    const q = search.toLowerCase()
    return s.title.toLowerCase().includes(q)
      || s.titleAr.includes(q)
      || s.description.toLowerCase().includes(q)
      || s.descriptionAr.includes(q)
  })

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/government/dashboard">{h.dashboard}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{h.servicesCatalog}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-4 bg-primary/10 rounded-xl">
            <GridFour className="h-10 w-10 text-primary" weight="duotone" />
          </div>
          <div>
            <h1 className="text-2xl font-bold ltr:tracking-tight">{h.servicesCatalog}</h1>
            <p className="text-muted-foreground text-sm">{filtered.length} {h.servicesAvailable}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <MagnifyingGlass className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          placeholder={h.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ps-9"
        />
      </div>

      {/* Services Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => {
          const Icon = service.icon
          return (
            <Card key={service.slug} className="hover:shadow-md transition-shadow flex flex-col">
              <CardContent className="pt-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Icon className="h-7 w-7 text-primary" weight="duotone" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {isRTL ? service.categoryAr : service.category}
                  </Badge>
                </div>

                <h3 className="font-semibold mb-1">
                  {isRTL ? service.titleAr : service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {isRTL ? service.descriptionAr : service.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {isRTL ? service.processingDaysAr : service.processingDays}
                  </span>
                  <span className="font-medium text-foreground">
                    {isRTL ? service.feeAr : service.fee}
                  </span>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/examples/government/services/${service.slug}`}>
                    {h.applyNow}
                    <Arrow className="h-4 w-4 ms-2" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
