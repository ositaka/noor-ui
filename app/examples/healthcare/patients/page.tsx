'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
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
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Users,
  UserPlus,
  MagnifyingGlass,
  Funnel,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'

const hc = {
  en: {
    title: 'Al Noor Medical Center',
    mainNavigation: 'Main navigation',
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    prescriptions: 'Prescriptions',
    patientDirectory: 'Patient Directory',
    patientDirectoryDesc: 'Manage and search all registered patients',
    addPatient: 'Add Patient',
    searchPatients: 'Search patients...',
    filterByStatus: 'Filter by status',
    all: 'All',
    active: 'Active',
    inactive: 'Inactive',
    critical: 'Critical',
    name: 'Name',
    emiratesId: 'Emirates ID',
    phone: 'Phone',
    lastVisit: 'Last Visit',
    status: 'Status',
    bloodType: 'Blood Type',
    actions: 'Actions',
    viewProfile: 'View Profile',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    save: 'Save',
    cancel: 'Cancel',
    newPatientRegistration: 'New Patient Registration',
    newPatientDesc: 'Fill in the patient details to register a new patient.',
    totalPatients: 'Total Patients',
    activePatients: 'Active Patients',
    criticalPatients: 'Critical Patients',
    newThisMonth: 'New This Month',
    next: 'Next',
    previous: 'Previous',
  },
  ar: {
    title: 'مركز النور الطبي',
    mainNavigation: 'التنقل الرئيسي',
    dashboard: 'لوحة التحكم',
    patients: 'المرضى',
    appointments: 'المواعيد',
    prescriptions: 'الوصفات الطبية',
    patientDirectory: 'دليل المرضى',
    patientDirectoryDesc: 'إدارة والبحث في جميع المرضى المسجلين',
    addPatient: 'إضافة مريض',
    searchPatients: 'البحث عن مرضى...',
    filterByStatus: 'تصفية حسب الحالة',
    all: 'الكل',
    active: 'نشط',
    inactive: 'غير نشط',
    critical: 'حرج',
    name: 'الاسم',
    emiratesId: 'الهوية الإماراتية',
    phone: 'الهاتف',
    lastVisit: 'آخر زيارة',
    status: 'الحالة',
    bloodType: 'فصيلة الدم',
    actions: 'الإجراءات',
    viewProfile: 'عرض الملف',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    dateOfBirth: 'تاريخ الميلاد',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    save: 'حفظ',
    cancel: 'إلغاء',
    newPatientRegistration: 'تسجيل مريض جديد',
    newPatientDesc: 'أدخل بيانات المريض لتسجيل مريض جديد.',
    totalPatients: 'إجمالي المرضى',
    activePatients: 'المرضى النشطون',
    criticalPatients: 'المرضى الحرجون',
    newThisMonth: 'الجدد هذا الشهر',
    next: 'التالي',
    previous: 'السابق',
  },
}

interface Patient {
  id: string
  name: string
  nameAr: string
  initials: string
  image: string
  emiratesId: string
  phone: string
  lastVisit: string
  lastVisitAr: string
  status: 'active' | 'inactive' | 'critical'
  bloodType: string
  gender: string
}

const patients: Patient[] = [
  {
    id: '1', name: 'Ahmed Al Mansouri', nameAr: 'أحمد المنصوري', initials: 'AM',
    image: '/examples/healthcare/avatars/ahmed.jpg',
    emiratesId: '784-1990-1234567-1', phone: '+971 50 123 4567',
    lastVisit: 'Mar 5, 2026', lastVisitAr: '٥ مارس ٢٠٢٦',
    status: 'active', bloodType: 'A+', gender: 'male',
  },
  {
    id: '2', name: 'Fatima Al Hashimi', nameAr: 'فاطمة الهاشمي', initials: 'FH',
    image: '/examples/healthcare/avatars/fatima.jpg',
    emiratesId: '784-1985-2345678-2', phone: '+971 55 234 5678',
    lastVisit: 'Mar 4, 2026', lastVisitAr: '٤ مارس ٢٠٢٦',
    status: 'critical', bloodType: 'O-', gender: 'female',
  },
  {
    id: '3', name: 'Omar Bin Saeed', nameAr: 'عمر بن سعيد', initials: 'OS',
    image: '/examples/healthcare/avatars/omar.jpg',
    emiratesId: '784-1978-3456789-3', phone: '+971 52 345 6789',
    lastVisit: 'Mar 3, 2026', lastVisitAr: '٣ مارس ٢٠٢٦',
    status: 'active', bloodType: 'B+', gender: 'male',
  },
  {
    id: '4', name: 'Sarah Johnson', nameAr: 'سارة جونسون', initials: 'SJ',
    image: '/examples/healthcare/avatars/sarah.jpg',
    emiratesId: '784-1995-4567890-4', phone: '+971 56 456 7890',
    lastVisit: 'Feb 28, 2026', lastVisitAr: '٢٨ فبراير ٢٠٢٦',
    status: 'active', bloodType: 'AB+', gender: 'female',
  },
  {
    id: '5', name: 'Khalid Al Ameri', nameAr: 'خالد العامري', initials: 'KA',
    image: '/examples/healthcare/avatars/khalid.jpg',
    emiratesId: '784-2010-5678901-5', phone: '+971 54 567 8901',
    lastVisit: 'Feb 25, 2026', lastVisitAr: '٢٥ فبراير ٢٠٢٦',
    status: 'active', bloodType: 'O+', gender: 'male',
  },
  {
    id: '6', name: 'Noura Al Maktoum', nameAr: 'نورة المكتوم', initials: 'NM',
    image: '/examples/healthcare/avatars/noura.jpg',
    emiratesId: '784-1992-6789012-6', phone: '+971 58 678 9012',
    lastVisit: 'Feb 20, 2026', lastVisitAr: '٢٠ فبراير ٢٠٢٦',
    status: 'inactive', bloodType: 'A-', gender: 'female',
  },
  {
    id: '7', name: 'Mohammad Al Kaabi', nameAr: 'محمد الكعبي', initials: 'MK',
    image: '/examples/healthcare/avatars/mohammad.jpg',
    emiratesId: '784-1988-7890123-7', phone: '+971 50 789 0123',
    lastVisit: 'Feb 15, 2026', lastVisitAr: '١٥ فبراير ٢٠٢٦',
    status: 'active', bloodType: 'B-', gender: 'male',
  },
  {
    id: '8', name: 'Aisha Al Nuaimi', nameAr: 'عائشة النعيمي', initials: 'AN',
    image: '/examples/healthcare/avatars/aisha.jpg',
    emiratesId: '784-2000-8901234-8', phone: '+971 55 890 1234',
    lastVisit: 'Feb 10, 2026', lastVisitAr: '١٠ فبراير ٢٠٢٦',
    status: 'active', bloodType: 'AB-', gender: 'female',
  },
]

export default function PatientsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = hc[locale]

  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const filteredPatients = React.useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch = searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameAr.includes(searchQuery) ||
        p.emiratesId.includes(searchQuery)
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  const getStatusBadge = (status: Patient['status']) => {
    const labels: Record<Patient['status'], string> = {
      active: h.active,
      inactive: h.inactive,
      critical: h.critical,
    }
    const variants: Record<Patient['status'], 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      inactive: 'secondary',
      critical: 'destructive',
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  const columns: ColumnDef<Patient>[] = [
    {
      id: 'name',
      header: h.name,
      accessorKey: 'name',
      sortable: true,
      cell: (row: Patient) => (
        <Link href={`/examples/healthcare/patients/${row.id}`} className="flex items-center gap-3 rounded-lg group">
          <div className="relative shrink-0 overflow-hidden rounded-lg h-11 w-9">
            <img src={row.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-medium text-sm group-hover:text-primary transition-colors">{isRTL ? row.nameAr : row.name}</p>
            <p className="text-xs text-muted-foreground"><span lang={isRTL ? 'en' : 'ar'}>{isRTL ? row.name : row.nameAr}</span></p>
          </div>
        </Link>
      ),
    },
    {
      id: 'emiratesId',
      header: h.emiratesId,
      accessorKey: 'emiratesId',
      sortable: false,
    },
    {
      id: 'phone',
      header: h.phone,
      accessorKey: 'phone',
      sortable: false,
    },
    {
      id: 'bloodType',
      header: h.bloodType,
      accessorKey: 'bloodType',
      sortable: true,
      cell: (row: Patient) => (
        <Badge variant="outline">{row.bloodType}</Badge>
      ),
    },
    {
      id: 'lastVisit',
      header: h.lastVisit,
      accessorKey: 'lastVisit',
      sortable: true,
      cell: (row: Patient) => (
        <span className="text-sm">{isRTL ? row.lastVisitAr : row.lastVisit}</span>
      ),
    },
    {
      id: 'status',
      header: h.status,
      accessorKey: 'status',
      sortable: true,
      cell: (row: Patient) => getStatusBadge(row.status),
    },
  ]

  return (
    <div className="container py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-primary/10 rounded-xl">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{h.patientDirectory}</h1>
              <p className="text-muted-foreground">{h.patientDirectoryDesc}</p>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 me-2" />
                {h.addPatient}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{h.newPatientRegistration}</DialogTitle>
                <DialogDescription>{h.newPatientDesc}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patient-first-name">{h.firstName}</Label>
                    <Input id="patient-first-name" placeholder={h.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-last-name">{h.lastName}</Label>
                    <Input id="patient-last-name" placeholder={h.lastName} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-emirates-id">{h.emiratesId}</Label>
                  <Input id="patient-emirates-id" placeholder="784-XXXX-XXXXXXX-X" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">{h.email}</Label>
                    <Input id="patient-email" type="email" placeholder={h.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-phone">{h.phone}</Label>
                    <Input id="patient-phone" placeholder="+971 5X XXX XXXX" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{h.dateOfBirth}</Label>
                    <DatePicker
                      placeholder={h.dateOfBirth}
                      placeholderAr="تاريخ الميلاد"
                      showHijri
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{h.gender}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={h.gender} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{h.male}</SelectItem>
                        <SelectItem value="female">{h.female}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{h.bloodType}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={h.bloodType} />
                    </SelectTrigger>
                    <SelectContent>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>{h.cancel}</Button>
                <Button onClick={() => setDialogOpen(false)}>{h.save}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <MagnifyingGlass className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={h.searchPatients}
                  aria-label={h.searchPatients}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Funnel className="h-4 w-4 me-2" />
                  <SelectValue placeholder={h.filterByStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{h.all}</SelectItem>
                  <SelectItem value="active">{h.active}</SelectItem>
                  <SelectItem value="inactive">{h.inactive}</SelectItem>
                  <SelectItem value="critical">{h.critical}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patient Table */}
        <DataTable
          data={filteredPatients}
          columns={columns}
          enableSorting
          hoverable
          striped
          pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPatients.length / 10)}
          pageSize={10}
          onPageChange={setCurrentPage}
          nextLabel={h.next}
          previousLabel={h.previous}
          pageLabel={isRTL ? `صفحة ${currentPage} من ${Math.ceil(filteredPatients.length / 10)}` : `Page ${currentPage} of ${Math.ceil(filteredPatients.length / 10)}`}
          className="bg-card"
        />
    </div>
  )
}
