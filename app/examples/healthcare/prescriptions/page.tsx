'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatsCard } from '@/components/ui/stats-card'
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  FirstAid,
  Pill,
  Plus,
  MagnifyingGlass,
  CheckCircle,
  Clock,
  Warning,
  FileText,
  Stethoscope,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { content } from '@/lib/i18n'

const hc = {
  en: {
    title: 'Al Noor Medical Center',
    mainNavigation: 'Main navigation',
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    prescriptions: 'Prescriptions',
    prescriptionManagement: 'Prescription Management',
    prescriptionManagementDesc: 'Manage and create patient prescriptions',
    newPrescription: 'New Prescription',
    searchPrescriptions: 'Search prescriptions...',
    all: 'All',
    active: 'Active',
    expired: 'Expired',
    cancelled: 'Cancelled',
    totalPrescriptions: 'Total Prescriptions',
    activePrescriptions: 'Active',
    expiringSoon: 'Expiring Soon',
    issuedToday: 'Issued Today',
    fromLastWeek: 'from last week',
    patient: 'Patient',
    medication: 'Medication',
    dosage: 'Dosage',
    frequency: 'Frequency',
    doctor: 'Doctor',
    startDate: 'Start Date',
    endDate: 'End Date',
    status: 'Status',
    actions: 'Actions',
    viewDetails: 'View',
    renewPrescription: 'Renew',
    selectPatient: 'Select Patient',
    selectDoctor: 'Select Doctor',
    medicationName: 'Medication Name',
    medicationPlaceholder: 'e.g., Amlodipine',
    dosagePlaceholder: 'e.g., 5mg',
    frequencyPlaceholder: 'e.g., Once daily',
    duration: 'Duration',
    durationPlaceholder: 'e.g., 30 days',
    notes: 'Notes',
    notesPlaceholder: 'Additional notes...',
    save: 'Create Prescription',
    cancel: 'Cancel',
    newPrescriptionTitle: 'Create New Prescription',
    newPrescriptionDesc: 'Fill in the details to create a new prescription.',
    onceDaily: 'Once daily',
    twiceDaily: 'Twice daily',
    threeTimesDaily: 'Three times daily',
    asNeeded: 'As needed',
    prescriptionDetails: 'Prescription Details',
    refills: 'Refills',
    refillsRemaining: 'refills remaining',
  },
  ar: {
    title: 'مركز النور الطبي',
    mainNavigation: 'التنقل الرئيسي',
    dashboard: 'لوحة التحكم',
    patients: 'المرضى',
    appointments: 'المواعيد',
    prescriptions: 'الوصفات الطبية',
    prescriptionManagement: 'إدارة الوصفات الطبية',
    prescriptionManagementDesc: 'إدارة وإنشاء الوصفات الطبية للمرضى',
    newPrescription: 'وصفة جديدة',
    searchPrescriptions: 'البحث في الوصفات...',
    all: 'الكل',
    active: 'نشط',
    expired: 'منتهي',
    cancelled: 'ملغي',
    totalPrescriptions: 'إجمالي الوصفات',
    activePrescriptions: 'نشطة',
    expiringSoon: 'تنتهي قريباً',
    issuedToday: 'صدرت اليوم',
    fromLastWeek: 'من الأسبوع الماضي',
    patient: 'المريض',
    medication: 'الدواء',
    dosage: 'الجرعة',
    frequency: 'التكرار',
    doctor: 'الطبيب',
    startDate: 'تاريخ البدء',
    endDate: 'تاريخ الانتهاء',
    status: 'الحالة',
    actions: 'الإجراءات',
    viewDetails: 'عرض',
    renewPrescription: 'تجديد',
    selectPatient: 'اختر مريضاً',
    selectDoctor: 'اختر طبيباً',
    medicationName: 'اسم الدواء',
    medicationPlaceholder: 'مثال: أملوديبين',
    dosagePlaceholder: 'مثال: ٥ ملغ',
    frequencyPlaceholder: 'مثال: مرة يومياً',
    duration: 'المدة',
    durationPlaceholder: 'مثال: ٣٠ يوم',
    notes: 'ملاحظات',
    notesPlaceholder: 'ملاحظات إضافية...',
    save: 'إنشاء الوصفة',
    cancel: 'إلغاء',
    newPrescriptionTitle: 'إنشاء وصفة جديدة',
    newPrescriptionDesc: 'أدخل التفاصيل لإنشاء وصفة طبية جديدة.',
    onceDaily: 'مرة يومياً',
    twiceDaily: 'مرتين يومياً',
    threeTimesDaily: 'ثلاث مرات يومياً',
    asNeeded: 'عند الحاجة',
    prescriptionDetails: 'تفاصيل الوصفة',
    refills: 'إعادة تعبئة',
    refillsRemaining: 'إعادة تعبئة متبقية',
  },
}

interface Prescription {
  id: string
  patientName: string
  patientNameAr: string
  patientInitials: string
  patientImage: string
  medication: string
  medicationAr: string
  dosage: string
  frequency: string
  frequencyAr: string
  doctor: string
  doctorAr: string
  startDate: string
  startDateAr: string
  endDate: string
  endDateAr: string
  status: 'active' | 'expired' | 'cancelled'
  refills: number
}

const prescriptions: Prescription[] = [
  {
    id: 'rx-001', patientName: 'Ahmed Al Mansouri', patientNameAr: 'أحمد المنصوري', patientInitials: 'AM',
    patientImage: '/examples/healthcare/avatars/ahmed.jpg',
    medication: 'Amlodipine', medicationAr: 'أملوديبين', dosage: '5mg',
    frequency: 'Once daily', frequencyAr: 'مرة يومياً',
    doctor: 'Dr. Ahmad Khalil', doctorAr: 'د. أحمد خليل',
    startDate: 'Jan 15, 2026', startDateAr: '١٥ يناير ٢٠٢٦',
    endDate: 'Jul 15, 2026', endDateAr: '١٥ يوليو ٢٠٢٦',
    status: 'active', refills: 2,
  },
  {
    id: 'rx-002', patientName: 'Ahmed Al Mansouri', patientNameAr: 'أحمد المنصوري', patientInitials: 'AM',
    patientImage: '/examples/healthcare/avatars/ahmed.jpg',
    medication: 'Metformin', medicationAr: 'ميتفورمين', dosage: '500mg',
    frequency: 'Twice daily', frequencyAr: 'مرتين يومياً',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    startDate: 'Dec 1, 2025', startDateAr: '١ ديسمبر ٢٠٢٥',
    endDate: 'Jun 1, 2026', endDateAr: '١ يونيو ٢٠٢٦',
    status: 'active', refills: 1,
  },
  {
    id: 'rx-003', patientName: 'Fatima Al Hashimi', patientNameAr: 'فاطمة الهاشمي', patientInitials: 'FH',
    patientImage: '/examples/healthcare/avatars/fatima.jpg',
    medication: 'Lisinopril', medicationAr: 'ليسينوبريل', dosage: '10mg',
    frequency: 'Once daily', frequencyAr: 'مرة يومياً',
    doctor: 'Dr. Ahmad Khalil', doctorAr: 'د. أحمد خليل',
    startDate: 'Feb 1, 2026', startDateAr: '١ فبراير ٢٠٢٦',
    endDate: 'Aug 1, 2026', endDateAr: '١ أغسطس ٢٠٢٦',
    status: 'active', refills: 3,
  },
  {
    id: 'rx-004', patientName: 'Omar Bin Saeed', patientNameAr: 'عمر بن سعيد', patientInitials: 'OS',
    patientImage: '/examples/healthcare/avatars/omar.jpg',
    medication: 'Omeprazole', medicationAr: 'أوميبرازول', dosage: '20mg',
    frequency: 'Once daily', frequencyAr: 'مرة يومياً',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    startDate: 'Mar 1, 2026', startDateAr: '١ مارس ٢٠٢٦',
    endDate: 'Mar 31, 2026', endDateAr: '٣١ مارس ٢٠٢٦',
    status: 'active', refills: 0,
  },
  {
    id: 'rx-005', patientName: 'Sarah Johnson', patientNameAr: 'سارة جونسون', patientInitials: 'SJ',
    patientImage: '/examples/healthcare/avatars/sarah.jpg',
    medication: 'Amoxicillin', medicationAr: 'أموكسيسيلين', dosage: '500mg',
    frequency: 'Three times daily', frequencyAr: 'ثلاث مرات يومياً',
    doctor: 'Dr. Mohammad Reza', doctorAr: 'د. محمد رضا',
    startDate: 'Feb 20, 2026', startDateAr: '٢٠ فبراير ٢٠٢٦',
    endDate: 'Feb 27, 2026', endDateAr: '٢٧ فبراير ٢٠٢٦',
    status: 'expired', refills: 0,
  },
  {
    id: 'rx-006', patientName: 'Khalid Al Ameri', patientNameAr: 'خالد العامري', patientInitials: 'KA',
    patientImage: '/examples/healthcare/avatars/khalid.jpg',
    medication: 'Ibuprofen', medicationAr: 'إيبوبروفين', dosage: '400mg',
    frequency: 'As needed', frequencyAr: 'عند الحاجة',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    startDate: 'Jan 10, 2026', startDateAr: '١٠ يناير ٢٠٢٦',
    endDate: 'Feb 10, 2026', endDateAr: '١٠ فبراير ٢٠٢٦',
    status: 'expired', refills: 0,
  },
  {
    id: 'rx-007', patientName: 'Noura Al Maktoum', patientNameAr: 'نورة المكتوم', patientInitials: 'NM',
    patientImage: '/examples/healthcare/avatars/noura.jpg',
    medication: 'Cetirizine', medicationAr: 'سيتيريزين', dosage: '10mg',
    frequency: 'Once daily', frequencyAr: 'مرة يومياً',
    doctor: 'Dr. Ahmad Khalil', doctorAr: 'د. أحمد خليل',
    startDate: 'Feb 15, 2026', startDateAr: '١٥ فبراير ٢٠٢٦',
    endDate: 'Mar 15, 2026', endDateAr: '١٥ مارس ٢٠٢٦',
    status: 'active', refills: 1,
  },
]

export default function PrescriptionsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]
  const h = hc[locale]

  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const filteredPrescriptions = React.useMemo(() => {
    return prescriptions.filter((rx) => {
      const matchesSearch = searchQuery === '' ||
        rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.patientNameAr.includes(searchQuery) ||
        rx.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.medicationAr.includes(searchQuery)
      const matchesStatus = statusFilter === 'all' || rx.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  const columns: ColumnDef<Prescription>[] = [
    {
      id: 'patient',
      header: h.patient,
      accessorKey: 'patientName',
      sortable: true,
      cell: (row: Prescription) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.patientImage} alt={row.patientName} />
            <AvatarFallback className="text-xs">{row.patientInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{isRTL ? row.patientNameAr : row.patientName}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'medication',
      header: h.medication,
      accessorKey: 'medication',
      sortable: true,
      cell: (row: Prescription) => (
        <div>
          <p className="font-medium text-sm">{isRTL ? row.medicationAr : row.medication}</p>
          <p className="text-xs text-muted-foreground">{row.dosage}</p>
        </div>
      ),
    },
    {
      id: 'frequency',
      header: h.frequency,
      accessorKey: 'frequency',
      cell: (row: Prescription) => (
        <span className="text-sm">{isRTL ? row.frequencyAr : row.frequency}</span>
      ),
    },
    {
      id: 'doctor',
      header: h.doctor,
      accessorKey: 'doctor',
      sortable: true,
      cell: (row: Prescription) => (
        <span className="text-sm">{isRTL ? row.doctorAr : row.doctor}</span>
      ),
    },
    {
      id: 'dates',
      header: h.startDate,
      accessorKey: 'startDate',
      sortable: true,
      cell: (row: Prescription) => (
        <div className="text-sm">
          <p>{isRTL ? row.startDateAr : row.startDate}</p>
          <p className="text-xs text-muted-foreground">— {isRTL ? row.endDateAr : row.endDate}</p>
        </div>
      ),
    },
    {
      id: 'refills',
      header: h.refills,
      accessorKey: 'refills',
      cell: (row: Prescription) => (
        <Badge variant={row.refills > 0 ? 'default' : 'secondary'}>
          <ArabicNumber value={row.refills} />
        </Badge>
      ),
    },
    {
      id: 'status',
      header: h.status,
      accessorKey: 'status',
      sortable: true,
      cell: (row: Prescription) => {
        const labels: Record<string, string> = { active: h.active, expired: h.expired, cancelled: h.cancelled }
        const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
          active: 'default', expired: 'secondary', cancelled: 'destructive',
        }
        return <Badge variant={variants[row.status]}>{labels[row.status]}</Badge>
      },
    },
    {
      id: 'actions',
      header: h.actions,
      accessorKey: 'id',
      cell: (row: Prescription) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" aria-label={`${h.viewDetails}: ${isRTL ? row.medicationAr : row.medication}`}>
            {h.viewDetails}
          </Button>
          {row.status === 'active' && (
            <Button variant="outline" size="sm" aria-label={`${h.renewPrescription}: ${isRTL ? row.medicationAr : row.medication}`}>
              {h.renewPrescription}
            </Button>
          )}
        </div>
      ),
    },
  ]

  const activePrescriptions = prescriptions.filter((rx) => rx.status === 'active')
  const expiringSoon = prescriptions.filter((rx) => rx.status === 'active' && rx.refills === 0)

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
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/healthcare">{h.dashboard}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/healthcare/patients">{h.patients}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/healthcare/appointments">{h.appointments}</Link>
            </Button>
            <Button variant="ghost" size="sm" className="font-medium" asChild>
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
                  <BreadcrumbLink href="/examples/healthcare">{h.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{h.prescriptions}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <DirectionToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-primary/10 rounded-xl">
              <Pill className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{h.prescriptionManagement}</h1>
              <p className="text-muted-foreground">{h.prescriptionManagementDesc}</p>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 me-2" />
                {h.newPrescription}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{h.newPrescriptionTitle}</DialogTitle>
                <DialogDescription>{h.newPrescriptionDesc}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>{h.patient}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={h.selectPatient} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{isRTL ? 'أحمد المنصوري' : 'Ahmed Al Mansouri'}</SelectItem>
                      <SelectItem value="2">{isRTL ? 'فاطمة الهاشمي' : 'Fatima Al Hashimi'}</SelectItem>
                      <SelectItem value="3">{isRTL ? 'عمر بن سعيد' : 'Omar Bin Saeed'}</SelectItem>
                      <SelectItem value="4">{isRTL ? 'سارة جونسون' : 'Sarah Johnson'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{h.doctor}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={h.selectDoctor} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="layla">{isRTL ? 'د. ليلى حسن' : 'Dr. Layla Hassan'}</SelectItem>
                      <SelectItem value="ahmad">{isRTL ? 'د. أحمد خليل' : 'Dr. Ahmad Khalil'}</SelectItem>
                      <SelectItem value="mohammad">{isRTL ? 'د. محمد رضا' : 'Dr. Mohammad Reza'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rx-medication">{h.medicationName}</Label>
                    <Input id="rx-medication" placeholder={h.medicationPlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rx-dosage">{h.dosage}</Label>
                    <Input id="rx-dosage" placeholder={h.dosagePlaceholder} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{h.frequency}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={h.frequency} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">{h.onceDaily}</SelectItem>
                        <SelectItem value="twice">{h.twiceDaily}</SelectItem>
                        <SelectItem value="three">{h.threeTimesDaily}</SelectItem>
                        <SelectItem value="asneeded">{h.asNeeded}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rx-duration">{h.duration}</Label>
                    <Input id="rx-duration" placeholder={h.durationPlaceholder} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rx-notes">{h.notes}</Label>
                  <Textarea id="rx-notes" placeholder={h.notesPlaceholder} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>{h.cancel}</Button>
                <Button onClick={() => setDialogOpen(false)}>{h.save}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            icon={<FileText className="h-4 w-4" />}
            label={h.totalPrescriptions}
            value={prescriptions.length}
            trend={10}
            trendLabel={h.fromLastWeek}
          />
          <StatsCard
            icon={<CheckCircle className="h-4 w-4" />}
            label={h.activePrescriptions}
            value={activePrescriptions.length}
          />
          <StatsCard
            icon={<Warning className="h-4 w-4" />}
            label={h.expiringSoon}
            value={expiringSoon.length}
          />
          <StatsCard
            icon={<Pill className="h-4 w-4" />}
            label={h.issuedToday}
            value={2}
          />
        </div>

        {/* Tabs + Table */}
        <Tabs defaultValue="all" onValueChange={(v) => setStatusFilter(v === 'all' ? 'all' : v)}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">{h.all}</TabsTrigger>
              <TabsTrigger value="active">{h.active}</TabsTrigger>
              <TabsTrigger value="expired">{h.expired}</TabsTrigger>
              <TabsTrigger value="cancelled">{h.cancelled}</TabsTrigger>
            </TabsList>
            <div className="relative w-full sm:w-72">
              <MagnifyingGlass className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={h.searchPrescriptions}
                aria-label={h.searchPrescriptions}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9"
              />
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <DataTable
              data={filteredPrescriptions}
              columns={columns}
              enableSorting
              hoverable
              striped
              pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPrescriptions.length / 10)}
              pageSize={10}
              onPageChange={setCurrentPage}
            />
          </TabsContent>
          <TabsContent value="active" className="mt-0">
            <DataTable
              data={filteredPrescriptions}
              columns={columns}
              enableSorting
              hoverable
              striped
            />
          </TabsContent>
          <TabsContent value="expired" className="mt-0">
            <DataTable
              data={filteredPrescriptions}
              columns={columns}
              enableSorting
              hoverable
              striped
            />
          </TabsContent>
          <TabsContent value="cancelled" className="mt-0">
            <DataTable
              data={filteredPrescriptions}
              columns={columns}
              enableSorting
              hoverable
              striped
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
