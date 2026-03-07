'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/ui/stats-card'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FeatureCard } from '@/components/ui/feature-card'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  CalendarCheck,
  Users,
  CurrencyDollar,
  Clock,
  Plus,
  UserPlus,
  Stethoscope,
  Bell,
  FirstAid,
  Pill,
  Warning,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  CalendarDots,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { content } from '@/lib/i18n'

const hc = {
  en: {
    title: 'Al Noor Medical Center',
    subtitle: 'Clinic Management Dashboard',
    mainNavigation: 'Main navigation',
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    prescriptions: 'Prescriptions',
    todaysAppointments: "Today's Appointments",
    patientsSeen: 'Patients Seen',
    revenue: 'Revenue (AED)',
    pendingReview: 'Pending Review',
    todaysSchedule: "Today's Schedule",
    quickActions: 'Quick Actions',
    newAppointment: 'New Appointment',
    addPatient: 'Add Patient',
    writePrescription: 'Write Prescription',
    recentAlerts: 'Recent Alerts',
    viewPatients: 'View All Patients',
    viewAppointments: 'View Calendar',
    labResultReady: 'Lab Result Ready',
    labResultDesc: 'Blood test results for Fatima Al Hashimi are ready for review.',
    appointmentReminder: 'Upcoming Appointment',
    appointmentReminderDesc: 'Dr. Ahmad has 3 appointments in the next hour.',
    lowStock: 'Low Medication Stock',
    lowStockDesc: 'Amoxicillin 500mg is running low. Only 12 units remaining.',
    fromLastMonth: 'from last month',
    appointmentsToday: 'appointments scheduled',
    registeredPatients: 'registered patients',
    activePrescriptions: 'active prescriptions',
    patientDirectory: 'Patient Directory',
    patientDirectoryDesc: 'Browse and manage all registered patients',
    appointmentCalendar: 'Appointment Calendar',
    appointmentCalendarDesc: 'View and schedule patient appointments',
    prescriptionMgmt: 'Prescription Management',
    prescriptionMgmtDesc: 'Manage and create patient prescriptions',
    confirmed: 'Confirmed',
    checkedIn: 'Checked In',
    inProgress: 'In Progress',
    completed: 'Completed',
    pending: 'Pending',
  },
  ar: {
    title: 'مركز النور الطبي',
    subtitle: 'لوحة إدارة العيادة',
    mainNavigation: 'التنقل الرئيسي',
    dashboard: 'لوحة التحكم',
    patients: 'المرضى',
    appointments: 'المواعيد',
    prescriptions: 'الوصفات الطبية',
    todaysAppointments: 'مواعيد اليوم',
    patientsSeen: 'المرضى المُعاينون',
    revenue: 'الإيرادات (د.إ)',
    pendingReview: 'بانتظار المراجعة',
    todaysSchedule: 'جدول اليوم',
    quickActions: 'إجراءات سريعة',
    newAppointment: 'موعد جديد',
    addPatient: 'إضافة مريض',
    writePrescription: 'كتابة وصفة طبية',
    recentAlerts: 'التنبيهات الأخيرة',
    viewPatients: 'عرض جميع المرضى',
    viewAppointments: 'عرض التقويم',
    labResultReady: 'نتائج المختبر جاهزة',
    labResultDesc: 'نتائج فحص الدم لفاطمة الهاشمي جاهزة للمراجعة.',
    appointmentReminder: 'موعد قادم',
    appointmentReminderDesc: 'لدى د. أحمد ٣ مواعيد في الساعة القادمة.',
    lowStock: 'نقص في المخزون الدوائي',
    lowStockDesc: 'أموكسيسيلين ٥٠٠ ملغ ينفد. متبقي ١٢ وحدة فقط.',
    fromLastMonth: 'من الشهر الماضي',
    appointmentsToday: 'مواعيد مجدولة',
    registeredPatients: 'مريض مسجل',
    activePrescriptions: 'وصفة نشطة',
    patientDirectory: 'دليل المرضى',
    patientDirectoryDesc: 'تصفح وإدارة جميع المرضى المسجلين',
    appointmentCalendar: 'تقويم المواعيد',
    appointmentCalendarDesc: 'عرض وجدولة مواعيد المرضى',
    prescriptionMgmt: 'إدارة الوصفات الطبية',
    prescriptionMgmtDesc: 'إدارة وإنشاء الوصفات الطبية للمرضى',
    confirmed: 'مؤكد',
    checkedIn: 'تم التسجيل',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    pending: 'قيد الانتظار',
  },
}

interface Appointment {
  id: string
  time: string
  patientName: string
  patientNameAr: string
  patientInitials: string
  patientImage: string
  doctor: string
  doctorAr: string
  type: string
  typeAr: string
  status: 'confirmed' | 'checked-in' | 'in-progress' | 'completed' | 'pending'
}

const todaysAppointments: Appointment[] = [
  {
    id: '1', time: '09:00',
    patientName: 'Ahmed Al Mansouri', patientNameAr: 'أحمد المنصوري', patientInitials: 'AM',
    patientImage: '/examples/healthcare/avatars/ahmed.jpg',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    type: 'General Checkup', typeAr: 'فحص عام', status: 'completed',
  },
  {
    id: '2', time: '09:30',
    patientName: 'Fatima Al Hashimi', patientNameAr: 'فاطمة الهاشمي', patientInitials: 'FH',
    patientImage: '/examples/healthcare/avatars/fatima.jpg',
    doctor: 'Dr. Ahmad Khalil', doctorAr: 'د. أحمد خليل',
    type: 'Follow-up', typeAr: 'متابعة', status: 'in-progress',
  },
  {
    id: '3', time: '10:00',
    patientName: 'Omar Bin Saeed', patientNameAr: 'عمر بن سعيد', patientInitials: 'OS',
    patientImage: '/examples/healthcare/avatars/omar.jpg',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    type: 'Consultation', typeAr: 'استشارة', status: 'checked-in',
  },
  {
    id: '4', time: '10:30',
    patientName: 'Sarah Johnson', patientNameAr: 'سارة جونسون', patientInitials: 'SJ',
    patientImage: '/examples/healthcare/avatars/sarah.jpg',
    doctor: 'Dr. Mohammad Reza', doctorAr: 'د. محمد رضا',
    type: 'Dental', typeAr: 'أسنان', status: 'confirmed',
  },
  {
    id: '5', time: '11:00',
    patientName: 'Khalid Al Ameri', patientNameAr: 'خالد العامري', patientInitials: 'KA',
    patientImage: '/examples/healthcare/avatars/khalid.jpg',
    doctor: 'Dr. Ahmad Khalil', doctorAr: 'د. أحمد خليل',
    type: 'Pediatrics', typeAr: 'أطفال', status: 'confirmed',
  },
  {
    id: '6', time: '11:30',
    patientName: 'Noura Al Maktoum', patientNameAr: 'نورة المكتوم', patientInitials: 'NM',
    patientImage: '/examples/healthcare/avatars/noura.jpg',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    type: 'Lab Review', typeAr: 'مراجعة مختبر', status: 'pending',
  },
]

function getStatusBadge(status: Appointment['status'], labels: Record<string, string>) {
  const statusLabels: Record<Appointment['status'], string> = {
    confirmed: labels.confirmed,
    'checked-in': labels.checkedIn,
    'in-progress': labels.inProgress,
    completed: labels.completed,
    pending: labels.pending,
  }
  const variants: Record<Appointment['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    confirmed: 'default',
    'checked-in': 'secondary',
    'in-progress': 'destructive',
    completed: 'outline',
    pending: 'secondary',
  }
  return (
    <Badge variant={variants[status]}>
      {statusLabels[status]}
    </Badge>
  )
}

export default function HealthcareDashboard() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]
  const h = hc[locale]
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/examples/healthcare" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <FirstAid className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline">{h.title}</span>
            </Link>
          </div>
          <nav aria-label={h.mainNavigation} className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="font-medium" asChild>
              <Link href="/examples/healthcare">{h.dashboard}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/healthcare/patients">{h.patients}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/healthcare/appointments">{h.appointments}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/healthcare/prescriptions">{h.prescriptions}</Link>
            </Button>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Button variant="outline" size="sm" asChild>
              <Link href="/examples">{t.nav.examples}</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <div className="flex items-center justify-between gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">{t.nav.home}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/examples">{t.nav.examples}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{h.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <DirectionToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <Stethoscope className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{h.title}</h1>
              <p className="text-muted-foreground">{h.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Stats - using StatsCard component */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            icon={<CalendarCheck className="h-4 w-4" />}
            label={h.todaysAppointments}
            value={12}
            trend={8}
            trendLabel={h.fromLastMonth}
          />
          <StatsCard
            icon={<Users className="h-4 w-4" />}
            label={h.patientsSeen}
            value={8}
            trend={12}
            trendLabel={h.fromLastMonth}
          />
          <StatsCard
            icon={<CurrencyDollar className="h-4 w-4" />}
            label={h.revenue}
            value="4,200"
            trend={5}
            trendLabel={h.fromLastMonth}
          />
          <StatsCard
            icon={<Clock className="h-4 w-4" />}
            label={h.pendingReview}
            value={3}
            trend={-15}
            trendLabel={h.fromLastMonth}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Schedule - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{h.todaysSchedule}</CardTitle>
                    <CardDescription>
                      <ArabicNumber value={6} /> {h.appointmentsToday}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/examples/healthcare/appointments">
                      {h.viewAppointments}
                      <Arrow className="h-4 w-4 ms-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysAppointments.map((apt) => (
                    <Link
                      key={apt.id}
                      href={`/examples/healthcare/patients/${apt.id}`}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-mono text-muted-foreground w-12">
                          {apt.time}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={apt.patientImage} alt={apt.patientName} />
                          <AvatarFallback className="text-xs">{apt.patientInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {isRTL ? apt.patientNameAr : apt.patientName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {isRTL ? apt.doctorAr : apt.doctor} · {isRTL ? apt.typeAr : apt.type}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(apt.status, h)}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions using FeatureCard */}
            <div className="grid gap-4 sm:grid-cols-3">
              <FeatureCard
                title={h.patientDirectory}
                description={h.patientDirectoryDesc}
                icon={Users}
                href="/examples/healthcare/patients"
              />
              <FeatureCard
                title={h.appointmentCalendar}
                description={h.appointmentCalendarDesc}
                icon={CalendarDots}
                href="/examples/healthcare/appointments"
              />
              <FeatureCard
                title={h.prescriptionMgmt}
                description={h.prescriptionMgmtDesc}
                icon={Pill}
                href="/examples/healthcare/prescriptions"
              />
            </div>
          </div>

          {/* Right sidebar - Alerts & Quick Nav */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {h.recentAlerts}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>{h.labResultReady}</AlertTitle>
                  <AlertDescription>{h.labResultDesc}</AlertDescription>
                </Alert>
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle>{h.appointmentReminder}</AlertTitle>
                  <AlertDescription>{h.appointmentReminderDesc}</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <Warning className="h-4 w-4" />
                  <AlertTitle>{h.lowStock}</AlertTitle>
                  <AlertDescription>{h.lowStockDesc}</AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{h.quickActions}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start gap-2" asChild>
                  <Link href="/examples/healthcare/appointments">
                    <Plus className="h-4 w-4" />
                    {h.newAppointment}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link href="/examples/healthcare/patients">
                    <UserPlus className="h-4 w-4" />
                    {h.addPatient}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link href="/examples/healthcare/prescriptions">
                    <Pill className="h-4 w-4" />
                    {h.writePrescription}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
