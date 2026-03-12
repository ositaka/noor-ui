'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  ClipboardText,
  MagnifyingGlass,
  Clock,
  CheckCircle,
  Warning,
  ArrowRight,
  ArrowLeft,
  Funnel,
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
    assignmentsTitle: 'Assignments',
    assignmentsDesc: 'Track your assignments, submissions, and grades',
    all: 'All',
    pending: 'Pending',
    submitted: 'Submitted',
    graded: 'Graded',
    searchAssignments: 'Search assignments...',
    filterBySubject: 'All Subjects',
    dueDate: 'Due',
    daysRemaining: 'days remaining',
    dayRemaining: 'day remaining',
    overdue: 'Overdue',
    submittedOn: 'Submitted',
    gradedScore: 'Score',
    progress: 'Progress',
    viewDetails: 'View Details',
    noResults: 'No assignments found',
    noResultsDesc: 'Try adjusting your search or filter criteria',
    difficulty: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    mathematics: 'Mathematics',
    physics: 'Physics',
    arabic: 'Arabic Language',
    english: 'English Language',
    islamic: 'Islamic Studies',
    history: 'History',
    cs: 'Computer Science',
    ai: 'Artificial Intelligence',
    pe: 'Physical Education',
    art: 'Art',
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
    assignmentsTitle: 'الواجبات',
    assignmentsDesc: 'تتبع واجباتك وتسليماتك ودرجاتك',
    all: 'الكل',
    pending: 'قيد الانتظار',
    submitted: 'تم التسليم',
    graded: 'تم التقييم',
    searchAssignments: 'البحث في الواجبات...',
    filterBySubject: 'جميع المواد',
    dueDate: 'التسليم',
    daysRemaining: 'أيام متبقية',
    dayRemaining: 'يوم متبقي',
    overdue: 'متأخر',
    submittedOn: 'تم التسليم',
    gradedScore: 'الدرجة',
    progress: 'التقدم',
    viewDetails: 'عرض التفاصيل',
    noResults: 'لم يتم العثور على واجبات',
    noResultsDesc: 'حاول تعديل معايير البحث أو التصفية',
    difficulty: 'الصعوبة',
    easy: 'سهل',
    medium: 'متوسط',
    hard: 'صعب',
    mathematics: 'الرياضيات',
    physics: 'الفيزياء',
    arabic: 'اللغة العربية',
    english: 'اللغة الإنجليزية',
    islamic: 'الدراسات الإسلامية',
    history: 'التاريخ',
    cs: 'علوم الحاسب',
    ai: 'الذكاء الاصطناعي',
    pe: 'التربية البدنية',
    art: 'الفنون',
  },
}

interface Assignment {
  id: string
  title: string
  titleAr: string
  subject: string
  subjectAr: string
  teacher: string
  teacherAr: string
  dueDate: string
  dueDateAr: string
  daysLeft: number
  progress: number
  status: 'pending' | 'submitted' | 'graded'
  difficulty: 'easy' | 'medium' | 'hard'
  category: 'stem' | 'languages' | 'islamic' | 'humanities' | 'other'
  score?: number
  maxScore?: number
  submittedDate?: string
  submittedDateAr?: string
}

const assignments: Assignment[] = [
  {
    id: '1', title: 'Chapter 5 Exercises', titleAr: 'تمارين الفصل الخامس',
    subject: 'Mathematics', subjectAr: 'الرياضيات',
    teacher: 'Mr. Mohammed Al Otaibi', teacherAr: 'أ. محمد العتيبي',
    dueDate: 'Mar 14, 2026', dueDateAr: '١٤ مارس ٢٠٢٦',
    daysLeft: 2, progress: 60, status: 'pending', difficulty: 'medium', category: 'stem',
  },
  {
    id: '2', title: 'Lab Report: Optics', titleAr: 'تقرير مختبر: البصريات',
    subject: 'Physics', subjectAr: 'الفيزياء',
    teacher: 'Mr. Fahad Al Shammari', teacherAr: 'أ. فهد الشمري',
    dueDate: 'Mar 16, 2026', dueDateAr: '١٦ مارس ٢٠٢٦',
    daysLeft: 4, progress: 30, status: 'pending', difficulty: 'hard', category: 'stem',
  },
  {
    id: '3', title: 'Essay: My Community', titleAr: 'مقال: مجتمعي',
    subject: 'Arabic Language', subjectAr: 'اللغة العربية',
    teacher: 'Ms. Noura Al Qahtani', teacherAr: 'أ. نورة القحطاني',
    dueDate: 'Mar 18, 2026', dueDateAr: '١٨ مارس ٢٠٢٦',
    daysLeft: 6, progress: 10, status: 'pending', difficulty: 'medium', category: 'languages',
  },
  {
    id: '4', title: 'Book Report: Great Expectations', titleAr: 'تقرير كتاب: التوقعات الكبرى',
    subject: 'English Language', subjectAr: 'اللغة الإنجليزية',
    teacher: 'Ms. Sarah Al Ghamdi', teacherAr: 'أ. سارة الغامدي',
    dueDate: 'Mar 10, 2026', dueDateAr: '١٠ مارس ٢٠٢٦',
    daysLeft: -2, progress: 100, status: 'submitted', difficulty: 'medium', category: 'languages',
    submittedDate: 'Mar 9, 2026', submittedDateAr: '٩ مارس ٢٠٢٦',
  },
  {
    id: '5', title: 'Python Project: Calculator', titleAr: 'مشروع بايثون: الآلة الحاسبة',
    subject: 'Computer Science', subjectAr: 'علوم الحاسب',
    teacher: 'Mr. Khalid Al Zahrani', teacherAr: 'أ. خالد الزهراني',
    dueDate: 'Mar 8, 2026', dueDateAr: '٨ مارس ٢٠٢٦',
    daysLeft: -4, progress: 100, status: 'submitted', difficulty: 'hard', category: 'stem',
    submittedDate: 'Mar 7, 2026', submittedDateAr: '٧ مارس ٢٠٢٦',
  },
  {
    id: '6', title: 'Surah Memorization: Al-Mulk', titleAr: 'حفظ سورة: الملك',
    subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية',
    teacher: 'Mr. Abdullah Al Malki', teacherAr: 'أ. عبدالله المالكي',
    dueDate: 'Mar 5, 2026', dueDateAr: '٥ مارس ٢٠٢٦',
    daysLeft: -7, progress: 100, status: 'graded', difficulty: 'medium', category: 'islamic',
    score: 95, maxScore: 100,
    submittedDate: 'Mar 4, 2026', submittedDateAr: '٤ مارس ٢٠٢٦',
  },
  {
    id: '7', title: 'AI Ethics Research Paper', titleAr: 'بحث أخلاقيات الذكاء الاصطناعي',
    subject: 'Artificial Intelligence', subjectAr: 'الذكاء الاصطناعي',
    teacher: 'Ms. Mona Al Subaie', teacherAr: 'أ. منى السبيعي',
    dueDate: 'Mar 3, 2026', dueDateAr: '٣ مارس ٢٠٢٦',
    daysLeft: -9, progress: 100, status: 'graded', difficulty: 'hard', category: 'stem',
    score: 88, maxScore: 100,
    submittedDate: 'Mar 2, 2026', submittedDateAr: '٢ مارس ٢٠٢٦',
  },
]

const categoryColors: Record<string, string> = {
  stem: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  languages: 'bg-green-500/10 text-green-700 dark:text-green-400',
  islamic: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  humanities: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  other: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-success/10 text-success',
  medium: 'bg-warning/10 text-warning',
  hard: 'bg-destructive/10 text-destructive',
}

export default function AssignmentsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]
  const h = ed[locale]
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const [searchQuery, setSearchQuery] = React.useState('')
  const [subjectFilter, setSubjectFilter] = React.useState('all')
  const [activeTab, setActiveTab] = React.useState('all')

  const filteredAssignments = React.useMemo(() => {
    return assignments.filter((a) => {
      const matchesSearch = searchQuery === '' ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.titleAr.includes(searchQuery) ||
        a.subject.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSubject = subjectFilter === 'all' || a.subject === subjectFilter
      const matchesTab = activeTab === 'all' || a.status === activeTab
      return matchesSearch && matchesSubject && matchesTab
    })
  }, [searchQuery, subjectFilter, activeTab])

  const counts = {
    all: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
  }

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
            <Button variant="ghost" size="sm" className="font-medium" asChild>
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
                  <BreadcrumbPage>{h.assignments}</BreadcrumbPage>
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
            <ClipboardText className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{h.assignmentsTitle}</h1>
            <p className="text-muted-foreground">{h.assignmentsDesc}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">{h.all} ({isRTL ? toArabicNumerals(counts.all) : counts.all})</TabsTrigger>
            <TabsTrigger value="pending">{h.pending} ({isRTL ? toArabicNumerals(counts.pending) : counts.pending})</TabsTrigger>
            <TabsTrigger value="submitted">{h.submitted} ({isRTL ? toArabicNumerals(counts.submitted) : counts.submitted})</TabsTrigger>
            <TabsTrigger value="graded">{h.graded} ({isRTL ? toArabicNumerals(counts.graded) : counts.graded})</TabsTrigger>
          </TabsList>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <MagnifyingGlass className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={h.searchAssignments}
                    aria-label={h.searchAssignments}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ps-9"
                  />
                </div>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-full sm:w-56">
                    <Funnel className="h-4 w-4 me-2" />
                    <SelectValue placeholder={h.filterBySubject} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{h.filterBySubject}</SelectItem>
                    <SelectItem value="Mathematics">{h.mathematics}</SelectItem>
                    <SelectItem value="Physics">{h.physics}</SelectItem>
                    <SelectItem value="Arabic Language">{h.arabic}</SelectItem>
                    <SelectItem value="English Language">{h.english}</SelectItem>
                    <SelectItem value="Islamic Studies">{h.islamic}</SelectItem>
                    <SelectItem value="Computer Science">{h.cs}</SelectItem>
                    <SelectItem value="Artificial Intelligence">{h.ai}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Assignment Cards */}
          <div className="space-y-4">
            {filteredAssignments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <ClipboardText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="font-medium">{h.noResults}</p>
                  <p className="text-sm text-muted-foreground mt-1">{h.noResultsDesc}</p>
                </CardContent>
              </Card>
            ) : (
              filteredAssignments.map((assignment) => (
                <Link
                  key={assignment.id}
                  href={`/examples/education/assignments/${assignment.id}`}
                  className="block"
                >
                  <Card className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          {/* Badges */}
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className={categoryColors[assignment.category]}>
                              {isRTL ? assignment.subjectAr : assignment.subject}
                            </Badge>
                            <Badge variant="secondary" className={difficultyColors[assignment.difficulty]}>
                              {h[assignment.difficulty]}
                            </Badge>
                            {assignment.status === 'pending' && (
                              <Badge variant={assignment.daysLeft <= 2 ? 'destructive' : 'outline'}>
                                <Clock className="h-3 w-3 me-1" />
                                {assignment.daysLeft <= 0
                                  ? h.overdue
                                  : `${isRTL ? toArabicNumerals(assignment.daysLeft) : assignment.daysLeft} ${assignment.daysLeft === 1 ? h.dayRemaining : h.daysRemaining}`
                                }
                              </Badge>
                            )}
                            {assignment.status === 'submitted' && (
                              <Badge variant="secondary">
                                <CheckCircle className="h-3 w-3 me-1" />
                                {h.submitted}
                              </Badge>
                            )}
                            {assignment.status === 'graded' && (
                              <Badge variant="default">
                                {h.gradedScore}: {isRTL ? `${toArabicNumerals(assignment.score!)}/${toArabicNumerals(assignment.maxScore!)}` : `${assignment.score}/${assignment.maxScore}`}
                              </Badge>
                            )}
                          </div>

                          {/* Title */}
                          <div>
                            <h3 className="font-medium">
                              {isRTL ? assignment.titleAr : assignment.title}
                            </h3>
                            <p className="text-sm text-muted-foreground" lang={isRTL ? 'en' : 'ar'}>
                              {isRTL ? assignment.title : assignment.titleAr}
                            </p>
                          </div>

                          {/* Teacher + Due date */}
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? assignment.teacherAr : assignment.teacher} · {h.dueDate}: {isRTL ? assignment.dueDateAr : assignment.dueDate}
                          </p>

                          {/* Progress bar for pending */}
                          {assignment.status === 'pending' && (
                            <div className="flex items-center gap-3">
                              <Progress value={assignment.progress} className="h-2 flex-1" aria-label={`${isRTL ? assignment.titleAr : assignment.title}: ${isRTL ? `${toArabicNumerals(assignment.progress)}٪` : `${assignment.progress}%`}`} />
                              <span className="text-xs text-muted-foreground">{isRTL ? `${toArabicNumerals(assignment.progress)}٪` : `${assignment.progress}%`}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center">
                          <Arrow className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </Tabs>
      </main>
    </div>
  )
}
