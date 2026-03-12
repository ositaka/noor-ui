'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/ui/stats-card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
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
  ChartBar,
  Star,
  Trophy,
  Books,
  DownloadSimple,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { content } from '@/lib/i18n'
import { toArabicNumerals, formatOrdinal } from '@/lib/arabic-numbers'

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
    gradesTitle: 'Academic Grades',
    gradesDesc: 'View your semester results and grade details',
    overallAvg: 'Overall Average',
    sem1Avg: 'Semester 1 Average',
    totalSubjects: 'Total Subjects',
    classRank: 'Class Rank',
    semester1: 'Semester 1',
    semester1Ar: 'الفصل الأول',
    semester2: 'Semester 2',
    semester2Ar: 'الفصل الثاني',
    subject: 'Subject',
    teacher: 'Teacher',
    classwork: 'Classwork (30%)',
    midterm: 'Midterm (20%)',
    final: 'Final (50%)',
    total: 'Total %',
    grade: 'Grade',
    status: 'Status',
    downloadReport: 'Download Report Card',
    excellent: 'Excellent',
    veryGood: 'Very Good',
    good: 'Good',
    pass: 'Pass',
    fail: 'Fail',
    passed: 'Passed',
    outOf30: 'out of 30 students',
    next: 'Next',
    previous: 'Previous',
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
    gradesTitle: 'الدرجات الأكاديمية',
    gradesDesc: 'عرض نتائج الفصل الدراسي وتفاصيل الدرجات',
    overallAvg: 'المعدل العام',
    sem1Avg: 'معدل الفصل الأول',
    totalSubjects: 'إجمالي المواد',
    classRank: 'ترتيب الفصل',
    semester1: 'الفصل الأول',
    semester1Ar: 'Semester 1',
    semester2: 'الفصل الثاني',
    semester2Ar: 'Semester 2',
    subject: 'المادة',
    teacher: 'المعلم',
    classwork: 'أعمال الفصل (٣٠٪)',
    midterm: 'منتصف الفصل (٢٠٪)',
    final: 'النهائي (٥٠٪)',
    total: 'المجموع ٪',
    grade: 'التقدير',
    status: 'الحالة',
    downloadReport: 'تحميل كشف الدرجات',
    excellent: 'ممتاز',
    veryGood: 'جيد جداً',
    good: 'جيد',
    pass: 'مقبول',
    fail: 'راسب',
    passed: 'ناجح',
    outOf30: 'من ٣٠ طالب',
    next: 'التالي',
    previous: 'السابق',
  },
}

interface GradeRow {
  id: string
  subject: string
  subjectAr: string
  teacher: string
  teacherAr: string
  classwork: number
  midterm: number
  final: number
  total: number
  gradeLabel: string
  gradeLabelAr: string
  status: 'passed' | 'failed'
  category: string
}

const semester1Grades: GradeRow[] = [
  { id: '1', subject: 'Mathematics', subjectAr: 'الرياضيات', teacher: 'Mr. Mohammed Al Otaibi', teacherAr: 'أ. محمد العتيبي', classwork: 28, midterm: 19, final: 48, total: 95, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'stem' },
  { id: '2', subject: 'Physics', subjectAr: 'الفيزياء', teacher: 'Mr. Fahad Al Shammari', teacherAr: 'أ. فهد الشمري', classwork: 25, midterm: 18, final: 44, total: 87, gradeLabel: 'Very Good', gradeLabelAr: 'جيد جداً', status: 'passed', category: 'stem' },
  { id: '3', subject: 'Arabic Language', subjectAr: 'اللغة العربية', teacher: 'Ms. Noura Al Qahtani', teacherAr: 'أ. نورة القحطاني', classwork: 26, midterm: 17, final: 45, total: 88, gradeLabel: 'Very Good', gradeLabelAr: 'جيد جداً', status: 'passed', category: 'languages' },
  { id: '4', subject: 'English Language', subjectAr: 'اللغة الإنجليزية', teacher: 'Ms. Sarah Al Ghamdi', teacherAr: 'أ. سارة الغامدي', classwork: 27, midterm: 19, final: 45, total: 91, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'languages' },
  { id: '5', subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية', teacher: 'Mr. Abdullah Al Malki', teacherAr: 'أ. عبدالله المالكي', classwork: 29, midterm: 20, final: 47, total: 96, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'islamic' },
  { id: '6', subject: 'History', subjectAr: 'التاريخ', teacher: 'Ms. Reem Al Harbi', teacherAr: 'أ. ريم الحربي', classwork: 22, midterm: 15, final: 42, total: 79, gradeLabel: 'Good', gradeLabelAr: 'جيد', status: 'passed', category: 'humanities' },
  { id: '7', subject: 'Computer Science', subjectAr: 'علوم الحاسب', teacher: 'Mr. Khalid Al Zahrani', teacherAr: 'أ. خالد الزهراني', classwork: 28, midterm: 18, final: 46, total: 92, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'stem' },
  { id: '8', subject: 'Artificial Intelligence', subjectAr: 'الذكاء الاصطناعي', teacher: 'Ms. Mona Al Subaie', teacherAr: 'أ. منى السبيعي', classwork: 25, midterm: 17, final: 43, total: 85, gradeLabel: 'Very Good', gradeLabelAr: 'جيد جداً', status: 'passed', category: 'stem' },
  { id: '9', subject: 'Physical Education', subjectAr: 'التربية البدنية', teacher: 'Mr. Sultan Al Dosari', teacherAr: 'أ. سلطان الدوسري', classwork: 29, midterm: 19, final: 46, total: 94, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'other' },
  { id: '10', subject: 'Art', subjectAr: 'الفنون', teacher: 'Ms. Hind Al Enezi', teacherAr: 'أ. هند العنزي', classwork: 27, midterm: 18, final: 45, total: 90, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'other' },
]

const semester2Grades: GradeRow[] = [
  { id: '1', subject: 'Mathematics', subjectAr: 'الرياضيات', teacher: 'Mr. Mohammed Al Otaibi', teacherAr: 'أ. محمد العتيبي', classwork: 27, midterm: 18, final: 47, total: 92, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'stem' },
  { id: '2', subject: 'Physics', subjectAr: 'الفيزياء', teacher: 'Mr. Fahad Al Shammari', teacherAr: 'أ. فهد الشمري', classwork: 26, midterm: 19, final: 45, total: 90, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'stem' },
  { id: '3', subject: 'Arabic Language', subjectAr: 'اللغة العربية', teacher: 'Ms. Noura Al Qahtani', teacherAr: 'أ. نورة القحطاني', classwork: 25, midterm: 17, final: 44, total: 86, gradeLabel: 'Very Good', gradeLabelAr: 'جيد جداً', status: 'passed', category: 'languages' },
  { id: '4', subject: 'English Language', subjectAr: 'اللغة الإنجليزية', teacher: 'Ms. Sarah Al Ghamdi', teacherAr: 'أ. سارة الغامدي', classwork: 28, midterm: 18, final: 46, total: 92, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'languages' },
  { id: '5', subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية', teacher: 'Mr. Abdullah Al Malki', teacherAr: 'أ. عبدالله المالكي', classwork: 28, midterm: 19, final: 48, total: 95, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'islamic' },
  { id: '6', subject: 'History', subjectAr: 'التاريخ', teacher: 'Ms. Reem Al Harbi', teacherAr: 'أ. ريم الحربي', classwork: 23, midterm: 16, final: 40, total: 79, gradeLabel: 'Good', gradeLabelAr: 'جيد', status: 'passed', category: 'humanities' },
  { id: '7', subject: 'Computer Science', subjectAr: 'علوم الحاسب', teacher: 'Mr. Khalid Al Zahrani', teacherAr: 'أ. خالد الزهراني', classwork: 27, midterm: 19, final: 47, total: 93, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'stem' },
  { id: '8', subject: 'Artificial Intelligence', subjectAr: 'الذكاء الاصطناعي', teacher: 'Ms. Mona Al Subaie', teacherAr: 'أ. منى السبيعي', classwork: 26, midterm: 18, final: 44, total: 88, gradeLabel: 'Very Good', gradeLabelAr: 'جيد جداً', status: 'passed', category: 'stem' },
  { id: '9', subject: 'Physical Education', subjectAr: 'التربية البدنية', teacher: 'Mr. Sultan Al Dosari', teacherAr: 'أ. سلطان الدوسري', classwork: 28, midterm: 19, final: 47, total: 94, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'other' },
  { id: '10', subject: 'Art', subjectAr: 'الفنون', teacher: 'Ms. Hind Al Enezi', teacherAr: 'أ. هند العنزي', classwork: 28, midterm: 18, final: 44, total: 90, gradeLabel: 'Excellent', gradeLabelAr: 'ممتاز', status: 'passed', category: 'other' },
]

function getGradeBadgeVariant(total: number): 'default' | 'secondary' | 'outline' | 'destructive' {
  if (total >= 90) return 'default'
  if (total >= 80) return 'secondary'
  if (total >= 70) return 'outline'
  if (total >= 60) return 'outline'
  return 'destructive'
}

export default function GradesPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]
  const h = ed[locale]

  const [currentPage, setCurrentPage] = React.useState(1)

  const columns: ColumnDef<GradeRow>[] = [
    {
      id: 'subject',
      header: h.subject,
      accessorKey: 'subject',
      sortable: true,
      cell: (row: GradeRow) => (
        <div>
          <p className="font-medium text-sm">{isRTL ? row.subjectAr : row.subject}</p>
          <p className="text-xs text-muted-foreground" lang={isRTL ? 'en' : 'ar'}>{isRTL ? row.subject : row.subjectAr}</p>
        </div>
      ),
    },
    {
      id: 'teacher',
      header: h.teacher,
      accessorKey: 'teacher',
      sortable: false,
      cell: (row: GradeRow) => (
        <span className="text-sm">{isRTL ? row.teacherAr : row.teacher}</span>
      ),
    },
    {
      id: 'classwork',
      header: h.classwork,
      accessorKey: 'classwork',
      sortable: true,
      align: 'center',
      cell: (row: GradeRow) => (
        <span className="text-sm font-mono">{isRTL ? `${toArabicNumerals(row.classwork)}/${toArabicNumerals(30)}` : `${row.classwork}/30`}</span>
      ),
    },
    {
      id: 'midterm',
      header: h.midterm,
      accessorKey: 'midterm',
      sortable: true,
      align: 'center',
      cell: (row: GradeRow) => (
        <span className="text-sm font-mono">{isRTL ? `${toArabicNumerals(row.midterm)}/${toArabicNumerals(20)}` : `${row.midterm}/20`}</span>
      ),
    },
    {
      id: 'final',
      header: h.final,
      accessorKey: 'final',
      sortable: true,
      align: 'center',
      cell: (row: GradeRow) => (
        <span className="text-sm font-mono">{isRTL ? `${toArabicNumerals(row.final)}/${toArabicNumerals(50)}` : `${row.final}/50`}</span>
      ),
    },
    {
      id: 'total',
      header: h.total,
      accessorKey: 'total',
      sortable: true,
      align: 'center',
      cell: (row: GradeRow) => (
        <span className="text-sm font-bold">{isRTL ? `${toArabicNumerals(row.total)}٪` : `${row.total}%`}</span>
      ),
    },
    {
      id: 'grade',
      header: h.grade,
      accessorKey: 'gradeLabel',
      sortable: true,
      cell: (row: GradeRow) => (
        <Badge variant={getGradeBadgeVariant(row.total)}>
          {isRTL ? row.gradeLabelAr : row.gradeLabel}
        </Badge>
      ),
    },
  ]

  const sem1Avg = Math.round(semester1Grades.reduce((sum, g) => sum + g.total, 0) / semester1Grades.length * 10) / 10

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
            <Button variant="ghost" size="sm" className="font-medium" asChild>
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
            <Button variant="ghost" size="sm" asChild>
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
                  <BreadcrumbPage>{h.grades}</BreadcrumbPage>
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
            <ChartBar className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{h.gradesTitle}</h1>
            <p className="text-muted-foreground">{h.gradesDesc}</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            icon={<Star className="h-4 w-4" />}
            label={h.overallAvg}
            value={isRTL ? `${toArabicNumerals(92)}٪` : '92%'}
          />
          <StatsCard
            icon={<ChartBar className="h-4 w-4" />}
            label={h.sem1Avg}
            value={isRTL ? `${toArabicNumerals(sem1Avg)}٪` : `${sem1Avg}%`}
          />
          <StatsCard
            icon={<Books className="h-4 w-4" />}
            label={h.totalSubjects}
            value={isRTL ? toArabicNumerals(10) : 10}
          />
          <StatsCard
            icon={<Trophy className="h-4 w-4" />}
            label={h.classRank}
            value={formatOrdinal(5, locale)}
            trendLabel={h.outOf30}
          />
        </div>

        {/* Semester Tabs */}
        <Tabs defaultValue="semester1">
          <TabsList className="mb-6">
            <TabsTrigger value="semester1">
              {isRTL ? h.semester1 : h.semester1} / {isRTL ? h.semester1Ar : ed.ar.semester1}
            </TabsTrigger>
            <TabsTrigger value="semester2">
              {isRTL ? h.semester2 : h.semester2} / {isRTL ? h.semester2Ar : ed.ar.semester2}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="semester1">
            <DataTable
              data={semester1Grades}
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
              className="bg-card"
            />
          </TabsContent>

          <TabsContent value="semester2">
            <DataTable
              data={semester2Grades}
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
              className="bg-card"
            />
          </TabsContent>
        </Tabs>

        {/* Download button */}
        <div className="mt-6 flex justify-end">
          <Button variant="outline">
            <DownloadSimple className="h-4 w-4 me-2" />
            {h.downloadReport}
          </Button>
        </div>
      </main>
    </div>
  )
}
