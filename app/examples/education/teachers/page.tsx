'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { StatsCard } from '@/components/ui/stats-card'
import { Separator } from '@/components/ui/separator'
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  GraduationCap,
  Users,
  MagnifyingGlass,
  Funnel,
  EnvelopeSimple,
  Phone,
  PaperPlaneTilt,
  Clock,
  Chalkboard,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { content } from '@/lib/i18n'
import { toArabicNumerals } from '@/lib/arabic-numbers'

const ed = {
  en: {
    schoolName: 'Al Noor International School',
    mainNavigation: 'Main navigation',
    dashboard: 'Dashboard',
    grades: 'Grades',
    schedule: 'Schedule',
    assignments: 'Assignments',
    attendance: 'Attendance',
    teachers: 'Teachers',
    teachersTitle: 'Teachers Directory',
    teachersDesc: 'Contact and connect with your teachers',
    myTeachers: 'My Teachers',
    departments: 'Departments',
    officeHoursToday: 'Office Hours Today',
    searchTeachers: 'Search teachers...',
    filterByDept: 'All Departments',
    name: 'Name',
    subject: 'Subject',
    email: 'Email',
    phone: 'Phone',
    availability: 'Availability',
    available: 'Available',
    inClass: 'In Class',
    unavailable: 'Unavailable',
    sendMessage: 'Send Message',
    messageSubject: 'Subject',
    message: 'Message',
    priority: 'Priority',
    normal: 'Normal',
    urgent: 'Urgent',
    send: 'Send',
    cancel: 'Cancel',
    sendMessageTo: 'Send message to',
    messageDesc: 'Your message will be delivered to the teacher\'s portal inbox.',
    stem: 'STEM',
    languages: 'Languages',
    islamic: 'Islamic Studies',
    humanities: 'Humanities',
    other: 'Other',
    department: 'Department',
    next: 'Next',
    previous: 'Previous',
    clearSearch: 'Clear search',
    noTeachersFound: 'No teachers found',
  },
  ar: {
    schoolName: 'مدرسة النور الدولية',
    mainNavigation: 'التنقل الرئيسي',
    dashboard: 'لوحة التحكم',
    grades: 'الدرجات',
    schedule: 'الجدول',
    assignments: 'الواجبات',
    attendance: 'الحضور',
    teachers: 'المعلمون',
    teachersTitle: 'دليل المعلمين',
    teachersDesc: 'تواصل مع معلميك',
    myTeachers: 'معلمي',
    departments: 'الأقسام',
    officeHoursToday: 'ساعات المكتب اليوم',
    searchTeachers: 'البحث عن معلمين...',
    filterByDept: 'جميع الأقسام',
    name: 'الاسم',
    subject: 'المادة',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    availability: 'التوفر',
    available: 'متاح',
    inClass: 'في الحصة',
    unavailable: 'غير متاح',
    sendMessage: 'إرسال رسالة',
    messageSubject: 'الموضوع',
    message: 'الرسالة',
    priority: 'الأولوية',
    normal: 'عادي',
    urgent: 'عاجل',
    send: 'إرسال',
    cancel: 'إلغاء',
    sendMessageTo: 'إرسال رسالة إلى',
    messageDesc: 'ستُسلم رسالتك إلى صندوق بريد المعلم في البوابة.',
    stem: 'العلوم والتقنية',
    languages: 'اللغات',
    islamic: 'الدراسات الإسلامية',
    humanities: 'العلوم الإنسانية',
    other: 'أخرى',
    department: 'القسم',
    next: 'التالي',
    previous: 'السابق',
    clearSearch: 'مسح البحث',
    noTeachersFound: 'لم يتم العثور على معلمين',
  },
}

interface Teacher {
  id: string
  name: string
  nameAr: string
  initials: string
  image: string
  subject: string
  subjectAr: string
  email: string
  phone: string
  department: string
  departmentAr: string
  availability: 'available' | 'in-class' | 'unavailable'
  category: string
}

const teachers: Teacher[] = [
  {
    id: '1', name: 'Mr. Mohammed Al Otaibi', nameAr: 'أ. محمد العتيبي', initials: 'MO',
    image: '/examples/education/avatars/mohammed.jpg',
    subject: 'Mathematics', subjectAr: 'الرياضيات',
    email: 'm.otaibi@alnoor.edu.sa', phone: '+966 50 111 2233',
    department: 'STEM', departmentAr: 'العلوم والتقنية',
    availability: 'available', category: 'stem',
  },
  {
    id: '2', name: 'Ms. Noura Al Qahtani', nameAr: 'أ. نورة القحطاني', initials: 'NQ',
    image: '/examples/education/avatars/noura.jpg',
    subject: 'Arabic Language', subjectAr: 'اللغة العربية',
    email: 'n.qahtani@alnoor.edu.sa', phone: '+966 50 222 3344',
    department: 'Languages', departmentAr: 'اللغات',
    availability: 'in-class', category: 'languages',
  },
  {
    id: '3', name: 'Mr. Fahad Al Shammari', nameAr: 'أ. فهد الشمري', initials: 'FS',
    image: '/examples/education/avatars/fahad.jpg',
    subject: 'Physics', subjectAr: 'الفيزياء',
    email: 'f.shammari@alnoor.edu.sa', phone: '+966 50 333 4455',
    department: 'STEM', departmentAr: 'العلوم والتقنية',
    availability: 'available', category: 'stem',
  },
  {
    id: '4', name: 'Ms. Sarah Al Ghamdi', nameAr: 'أ. سارة الغامدي', initials: 'SG',
    image: '/examples/education/avatars/sarah.jpg',
    subject: 'English Language', subjectAr: 'اللغة الإنجليزية',
    email: 's.ghamdi@alnoor.edu.sa', phone: '+966 50 444 5566',
    department: 'Languages', departmentAr: 'اللغات',
    availability: 'in-class', category: 'languages',
  },
  {
    id: '5', name: 'Mr. Abdullah Al Malki', nameAr: 'أ. عبدالله المالكي', initials: 'AM',
    image: '/examples/education/avatars/abdullah.jpg',
    subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية',
    email: 'a.malki@alnoor.edu.sa', phone: '+966 50 555 6677',
    department: 'Islamic Studies', departmentAr: 'الدراسات الإسلامية',
    availability: 'available', category: 'islamic',
  },
  {
    id: '6', name: 'Ms. Reem Al Harbi', nameAr: 'أ. ريم الحربي', initials: 'RH',
    image: '/examples/education/avatars/reem.jpg',
    subject: 'History', subjectAr: 'التاريخ',
    email: 'r.harbi@alnoor.edu.sa', phone: '+966 50 666 7788',
    department: 'Humanities', departmentAr: 'العلوم الإنسانية',
    availability: 'unavailable', category: 'humanities',
  },
  {
    id: '7', name: 'Mr. Khalid Al Zahrani', nameAr: 'أ. خالد الزهراني', initials: 'KZ',
    image: '/examples/education/avatars/khalid.jpg',
    subject: 'Computer Science', subjectAr: 'علوم الحاسب',
    email: 'k.zahrani@alnoor.edu.sa', phone: '+966 50 777 8899',
    department: 'STEM', departmentAr: 'العلوم والتقنية',
    availability: 'available', category: 'stem',
  },
  {
    id: '8', name: 'Ms. Mona Al Subaie', nameAr: 'أ. منى السبيعي', initials: 'MS',
    image: '/examples/education/avatars/mona.jpg',
    subject: 'Artificial Intelligence', subjectAr: 'الذكاء الاصطناعي',
    email: 'm.subaie@alnoor.edu.sa', phone: '+966 50 888 9900',
    department: 'STEM', departmentAr: 'العلوم والتقنية',
    availability: 'in-class', category: 'stem',
  },
  {
    id: '9', name: 'Mr. Sultan Al Dosari', nameAr: 'أ. سلطان الدوسري', initials: 'SD',
    image: '/examples/education/avatars/sultan.jpg',
    subject: 'Physical Education', subjectAr: 'التربية البدنية',
    email: 's.dosari@alnoor.edu.sa', phone: '+966 50 999 0011',
    department: 'Other', departmentAr: 'أخرى',
    availability: 'unavailable', category: 'other',
  },
  {
    id: '10', name: 'Ms. Hind Al Enezi', nameAr: 'أ. هند العنزي', initials: 'HE',
    image: '/examples/education/avatars/hind.jpg',
    subject: 'Art', subjectAr: 'الفنون',
    email: 'h.enezi@alnoor.edu.sa', phone: '+966 50 000 1122',
    department: 'Other', departmentAr: 'أخرى',
    availability: 'available', category: 'other',
  },
]

export default function TeachersPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]
  const h = ed[locale]

  const [searchQuery, setSearchQuery] = React.useState('')
  const [deptFilter, setDeptFilter] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [messageDialogOpen, setMessageDialogOpen] = React.useState(false)
  const [selectedTeacher, setSelectedTeacher] = React.useState<Teacher | null>(null)

  const filteredTeachers = React.useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch = searchQuery === '' ||
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.nameAr.includes(searchQuery) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjectAr.includes(searchQuery)
      const matchesDept = deptFilter === 'all' || teacher.department === deptFilter
      return matchesSearch && matchesDept
    })
  }, [searchQuery, deptFilter])

  const getAvailabilityBadge = (availability: Teacher['availability']) => {
    const labels: Record<Teacher['availability'], string> = {
      available: h.available,
      'in-class': h.inClass,
      unavailable: h.unavailable,
    }
    const variants: Record<Teacher['availability'], 'default' | 'secondary' | 'outline'> = {
      available: 'default',
      'in-class': 'secondary',
      unavailable: 'outline',
    }
    return <Badge variant={variants[availability]}>{labels[availability]}</Badge>
  }

  const columns: ColumnDef<Teacher>[] = [
    {
      id: 'name',
      header: h.name,
      accessorKey: 'name',
      sortable: true,
      cell: (row: Teacher) => (
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 overflow-hidden rounded-lg h-11 w-9">
            <img src={row.image} alt={isRTL ? row.nameAr : row.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-medium text-sm">{isRTL ? row.nameAr : row.name}</p>
            <p className="text-xs text-muted-foreground">
              <span lang={isRTL ? 'en' : 'ar'}>{isRTL ? row.name : row.nameAr}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'subject',
      header: h.subject,
      accessorKey: 'subject',
      sortable: true,
      cell: (row: Teacher) => (
        <span className="text-sm">{isRTL ? row.subjectAr : row.subject}</span>
      ),
    },
    {
      id: 'email',
      header: h.email,
      accessorKey: 'email',
      sortable: false,
      cell: (row: Teacher) => (
        <span className="text-sm font-mono" dir="ltr">{row.email}</span>
      ),
    },
    {
      id: 'phone',
      header: h.phone,
      accessorKey: 'phone',
      sortable: false,
      cell: (row: Teacher) => (
        <span className="text-sm" dir="ltr">{row.phone}</span>
      ),
    },
    {
      id: 'availability',
      header: h.availability,
      accessorKey: 'availability',
      sortable: true,
      cell: (row: Teacher) => getAvailabilityBadge(row.availability),
    },
    {
      id: 'actions',
      header: '',
      accessorKey: 'id',
      sortable: false,
      cell: (row: Teacher) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setSelectedTeacher(row)
            setMessageDialogOpen(true)
          }}
        >
          <EnvelopeSimple className="h-4 w-4 me-1" />
          {h.sendMessage}
        </Button>
      ),
    },
  ]

  const availableToday = teachers.filter(t => t.availability === 'available').length
  const uniqueDepts = [...new Set(teachers.map(t => t.department))].length

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/examples/education" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline">{h.schoolName}</span>
            </Link>
          </div>
          <nav aria-label={h.mainNavigation} className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/dashboard">{h.dashboard}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/grades">{h.grades}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/schedule">{h.schedule}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/assignments">{h.assignments}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/education/attendance">{h.attendance}</Link>
            </Button>
            <Button variant="ghost" size="sm" className="font-medium" asChild>
              <Link href="/examples/education/teachers">{h.teachers}</Link>
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
                  <BreadcrumbLink href="/examples/education">{h.schoolName}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{h.teachers}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <DirectionToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="container py-8 scroll-mt-16">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-4 bg-primary/10 rounded-xl">
            <Chalkboard className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{h.teachersTitle}</h1>
            <p className="text-muted-foreground">{h.teachersDesc}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <StatsCard
            icon={<Users className="h-4 w-4" />}
            label={h.myTeachers}
            value={isRTL ? toArabicNumerals(10) : 10}
          />
          <StatsCard
            icon={<Chalkboard className="h-4 w-4" />}
            label={h.departments}
            value={isRTL ? toArabicNumerals(uniqueDepts) : uniqueDepts}
          />
          <StatsCard
            icon={<Clock className="h-4 w-4" />}
            label={h.officeHoursToday}
            value={isRTL ? toArabicNumerals(availableToday) : availableToday}
          />
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <MagnifyingGlass className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={h.searchTeachers}
                  aria-label={h.searchTeachers}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9"
                />
              </div>
              <Select value={deptFilter} onValueChange={setDeptFilter}>
                <SelectTrigger className="w-full sm:w-56">
                  <Funnel className="h-4 w-4 me-2" />
                  <SelectValue placeholder={h.filterByDept} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{h.filterByDept}</SelectItem>
                  <SelectItem value="STEM">{h.stem}</SelectItem>
                  <SelectItem value="Languages">{h.languages}</SelectItem>
                  <SelectItem value="Islamic Studies">{h.islamic}</SelectItem>
                  <SelectItem value="Humanities">{h.humanities}</SelectItem>
                  <SelectItem value="Other">{h.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Table */}
        <DataTable
          data={filteredTeachers}
          columns={columns}
          enableSorting
          hoverable
          striped
          pagination
          currentPage={currentPage}
          totalPages={1}
          pageSize={10}
          onPageChange={setCurrentPage}
          nextLabel={h.next}
          previousLabel={h.previous}
          pageLabel={isRTL ? `صفحة ${toArabicNumerals(currentPage)} من ${toArabicNumerals(1)}` : `Page ${currentPage} of 1`}
          emptyMessage={h.noTeachersFound}
          className="bg-card"
        />

        {/* Message Dialog */}
        <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {h.sendMessageTo} {selectedTeacher ? (isRTL ? selectedTeacher.nameAr : selectedTeacher.name) : ''}
              </DialogTitle>
              <DialogDescription>{h.messageDesc}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="msg-subject">{h.messageSubject}</Label>
                <Input id="msg-subject" placeholder={h.messageSubject} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msg-body">{h.message}</Label>
                <Textarea id="msg-body" placeholder={h.message} rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msg-priority">{h.priority}</Label>
                <Select defaultValue="normal">
                  <SelectTrigger id="msg-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">{h.normal}</SelectItem>
                    <SelectItem value="urgent">{h.urgent}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                {h.cancel}
              </Button>
              <Button onClick={() => setMessageDialogOpen(false)}>
                <PaperPlaneTilt className="h-4 w-4 me-2" />
                {h.send}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
