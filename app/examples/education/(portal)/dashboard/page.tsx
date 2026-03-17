'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/ui/stats-card'
import { FeatureCard } from '@/components/ui/feature-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Chart } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  GraduationCap,
  ChartBar,
  CalendarCheck,
  ClipboardText,
  UsersFour,
  Bell,
  Clock,
  Trophy,
  CurrencyDollar,
  Books,
  CalendarDots,
  Exam,
  IdentificationCard,
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Warning,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { toArabicNumerals, formatOrdinal } from '@/lib/arabic-numbers'

const ed = {
  en: {
    schoolName: 'Al Noor International School',
    portalTitle: 'Noor Education Portal',
    mainNavigation: 'Main navigation',
    dashboard: 'Dashboard',
    grades: 'Grades',
    schedule: 'Schedule',
    assignments: 'Assignments',
    attendance: 'Attendance',
    teachers: 'Teachers',
    welcomeMsg: 'Good morning, Yousef',
    todayDate: 'Thursday, March 12, 2026 / 17 Ramadan 1448',
    studentName: 'Yousef Al Dosari',
    studentNameAr: 'يوسف الدوسري',
    grade: 'Grade 10, Section B',
    studentId: 'NS-1098-2024',
    nationalId: 'National ID',
    gpa: 'GPA',
    attendanceRate: 'Attendance',
    assignmentsDue: 'Assignments Due',
    classRank: 'Class Rank',
    excellent: 'Excellent',
    outOf: 'out of 100',
    ofDays: 'of school days',
    thisWeek: 'this week',
    outOf30: 'out of 30',
    todaysClasses: "Today's Classes",
    upcomingDeadlines: 'Upcoming Deadlines',
    announcements: 'Announcements',
    feeStatus: 'Fee Status',
    quickNav: 'Quick Navigation',
    semester2Paid: 'Semester 2: Paid',
    nextPayment: 'Next: SAR 12,500 due Sep 2026',
    viewAll: 'View All',
    classHours: '7:00 AM - 1:30 PM',
    paid: 'Paid',
    daysRemaining: 'days remaining',
    period: 'Period',
    break: 'Break',
    current: 'Current',
    assembly: 'Morning Assembly',
    midtermExam: 'Mid-term exams start Shawwal 15',
    parentMeeting: 'Parent-teacher meeting March 20',
    midtermExamDesc: 'Prepare revision schedule for all subjects. Exam schedule will be shared this week.',
    parentMeetingDesc: 'All parents are invited to attend the parent-teacher meeting in the school auditorium.',
    viewGrades: 'View Grades',
    viewGradesDesc: 'Check your semester results and GPA',
    viewSchedule: 'View Schedule',
    viewScheduleDesc: 'See your weekly class timetable',
    viewAssignments: 'View Assignments',
    viewAssignmentsDesc: 'Track assignments and submissions',
    viewAttendance: 'View Attendance',
    viewAttendanceDesc: 'Check attendance records and calendar',
    gradesDistribution: 'Grades Distribution',
    gpaTrend: 'GPA Trend',
    semester: 'Semester',
    semester1: 'Semester 1',
    semester2: 'Semester 2',
  },
  ar: {
    schoolName: 'مدرسة النور الدولية',
    portalTitle: 'بوابة نور التعليمية',
    mainNavigation: 'التنقل الرئيسي',
    dashboard: 'لوحة التحكم',
    grades: 'الدرجات',
    schedule: 'الجدول',
    assignments: 'الواجبات',
    attendance: 'الحضور',
    teachers: 'المعلمون',
    welcomeMsg: 'صباح الخير، يوسف',
    todayDate: 'الخميس، ١٢ مارس ٢٠٢٦ / ١٧ رمضان ١٤٤٨',
    studentName: 'يوسف الدوسري',
    studentNameAr: 'Yousef Al Dosari',
    grade: 'الصف العاشر - شعبة ب',
    studentId: 'NS-1098-2024',
    nationalId: 'الهوية الوطنية',
    gpa: 'المعدل التراكمي',
    attendanceRate: 'نسبة الحضور',
    assignmentsDue: 'واجبات مستحقة',
    classRank: 'الترتيب',
    excellent: 'ممتاز',
    outOf: 'من ١٠٠',
    ofDays: 'من أيام الدراسة',
    thisWeek: 'هذا الأسبوع',
    outOf30: 'من ٣٠',
    todaysClasses: 'حصص اليوم',
    upcomingDeadlines: 'مواعيد التسليم القادمة',
    announcements: 'الإعلانات',
    feeStatus: 'حالة الرسوم',
    quickNav: 'التنقل السريع',
    semester2Paid: 'الفصل الثاني: مدفوع',
    nextPayment: 'القادم: ١٢,٥٠٠ ريال - سبتمبر ٢٠٢٦',
    viewAll: 'عرض الكل',
    classHours: '٧:٠٠ ص - ١:٣٠ م',
    paid: 'مدفوع',
    daysRemaining: 'أيام متبقية',
    period: 'الحصة',
    break: 'استراحة',
    current: 'الحالية',
    assembly: 'طابور الصباح',
    midtermExam: 'تبدأ اختبارات منتصف الفصل في ١٥ شوال',
    parentMeeting: 'اجتماع أولياء الأمور ٢٠ مارس',
    midtermExamDesc: 'أعد جدول المراجعة لجميع المواد. سيتم مشاركة جدول الاختبارات هذا الأسبوع.',
    parentMeetingDesc: 'جميع أولياء الأمور مدعوون لحضور الاجتماع في قاعة المدرسة.',
    viewGrades: 'عرض الدرجات',
    viewGradesDesc: 'تحقق من نتائج الفصل والمعدل التراكمي',
    viewSchedule: 'عرض الجدول',
    viewScheduleDesc: 'شاهد جدول الحصص الأسبوعي',
    viewAssignments: 'عرض الواجبات',
    viewAssignmentsDesc: 'تتبع الواجبات والتسليمات',
    viewAttendance: 'عرض الحضور',
    viewAttendanceDesc: 'تحقق من سجلات الحضور والتقويم',
    gradesDistribution: 'توزيع الدرجات',
    gpaTrend: 'اتجاه المعدل التراكمي',
    semester: 'الفصل الدراسي',
    semester1: 'الفصل الأول',
    semester2: 'الفصل الثاني',
  },
}

interface ClassPeriod {
  period: number
  time: string
  timeAr: string
  subject: string
  subjectAr: string
  teacher: string
  teacherAr: string
  room: string
  roomAr: string
  isBreak?: boolean
  isCurrent?: boolean
}

const todaysClasses: ClassPeriod[] = [
  { period: 0, time: '6:45', timeAr: '٦:٤٥', subject: 'Morning Assembly', subjectAr: 'طابور الصباح', teacher: '', teacherAr: '', room: 'Courtyard', roomAr: 'الفناء' },
  { period: 1, time: '7:00', timeAr: '٧:٠٠', subject: 'Mathematics', subjectAr: 'الرياضيات', teacher: 'Mr. Mohammed', teacherAr: 'أ. محمد', room: '201', roomAr: '٢٠١' },
  { period: 2, time: '7:45', timeAr: '٧:٤٥', subject: 'Physics', subjectAr: 'الفيزياء', teacher: 'Mr. Fahad', teacherAr: 'أ. فهد', room: '305', roomAr: '٣٠٥' },
  { period: 3, time: '8:30', timeAr: '٨:٣٠', subject: 'Arabic Language', subjectAr: 'اللغة العربية', teacher: 'Ms. Noura', teacherAr: 'أ. نورة', room: '102', roomAr: '١٠٢' },
  { period: 4, time: '9:15', timeAr: '٩:١٥', subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية', teacher: 'Mr. Abdullah', teacherAr: 'أ. عبدالله', room: '104', roomAr: '١٠٤' },
  { period: 0, time: '10:00', timeAr: '١٠:٠٠', subject: 'Break', subjectAr: 'استراحة', teacher: '', teacherAr: '', room: '', roomAr: '', isBreak: true },
  { period: 5, time: '10:30', timeAr: '١٠:٣٠', subject: 'English Language', subjectAr: 'اللغة الإنجليزية', teacher: 'Ms. Sarah', teacherAr: 'أ. سارة', room: '203', roomAr: '٢٠٣', isCurrent: true },
  { period: 6, time: '11:15', timeAr: '١١:١٥', subject: 'Computer Science', subjectAr: 'علوم الحاسب', teacher: 'Mr. Khalid', teacherAr: 'أ. خالد', room: 'Lab 1', roomAr: 'معمل ١' },
  { period: 7, time: '12:00', timeAr: '١٢:٠٠', subject: 'Physical Education', subjectAr: 'التربية البدنية', teacher: 'Mr. Sultan', teacherAr: 'أ. سلطان', room: 'Gym', roomAr: 'الصالة الرياضية' },
]

interface Deadline {
  id: string
  title: string
  titleAr: string
  subject: string
  subjectAr: string
  dueDate: string
  dueDateAr: string
  daysLeft: number
  progress: number
  category: 'stem' | 'languages' | 'islamic' | 'humanities' | 'other'
}

const upcomingDeadlines: Deadline[] = [
  {
    id: '1', title: 'Chapter 5 Exercises', titleAr: 'تمارين الفصل الخامس',
    subject: 'Mathematics', subjectAr: 'الرياضيات', dueDate: 'Mar 14', dueDateAr: '١٤ مارس',
    daysLeft: 2, progress: 60, category: 'stem',
  },
  {
    id: '2', title: 'Lab Report: Optics', titleAr: 'تقرير مختبر: البصريات',
    subject: 'Physics', subjectAr: 'الفيزياء', dueDate: 'Mar 16', dueDateAr: '١٦ مارس',
    daysLeft: 4, progress: 30, category: 'stem',
  },
  {
    id: '3', title: 'Essay: My Community', titleAr: 'مقال: مجتمعي',
    subject: 'Arabic Language', subjectAr: 'اللغة العربية', dueDate: 'Mar 18', dueDateAr: '١٨ مارس',
    daysLeft: 6, progress: 10, category: 'languages',
  },
]

const categoryColors: Record<string, string> = {
  stem: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  languages: 'bg-green-500/10 text-green-700 dark:text-green-400',
  islamic: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  humanities: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  other: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
}

export default function EducationDashboard() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = ed[locale]
  const Arrow = isRTL ? ArrowLeft : ArrowRight
  const [gradeSemester, setGradeSemester] = React.useState<'s1' | 's2'>('s1')

  return (
    <div className="container py-8">
        {/* Welcome + Student Card */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-4 bg-primary/10 rounded-xl">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{h.welcomeMsg}</h1>
                <p className="text-muted-foreground">{h.todayDate}</p>
              </div>
            </div>
            <Card className="sm:w-auto">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl overflow-hidden">
                  <img src="/examples/education/avatars/yousef.jpg" alt="Yousef Al Dosari" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">{h.studentName}</p>
                  <p className="text-sm text-muted-foreground">{h.grade}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      <IdentificationCard className="h-3 w-3 me-1" />
                      <span dir="ltr">{h.studentId}</span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            icon={<Star className="h-4 w-4" />}
            label={h.gpa}
            value={isRTL ? `${toArabicNumerals(92)}/${toArabicNumerals(100)}` : '92/100'}
            trend={3}
            trendLabel={h.excellent}
          />
          <StatsCard
            icon={<CalendarCheck className="h-4 w-4" />}
            label={h.attendanceRate}
            value={isRTL ? `${toArabicNumerals(94)}٪` : '94%'}
            trend={2}
            trendLabel={h.ofDays}
          />
          <StatsCard
            icon={<ClipboardText className="h-4 w-4" />}
            label={h.assignmentsDue}
            value={isRTL ? toArabicNumerals(3) : 3}
            trendLabel={h.thisWeek}
          />
          <StatsCard
            icon={<Trophy className="h-4 w-4" />}
            label={h.classRank}
            value={formatOrdinal(5, locale)}
            trendLabel={h.outOf30}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{h.gradesDistribution}</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant={gradeSemester === 's1' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setGradeSemester('s1')}
                  >
                    {h.semester1}
                  </Button>
                  <Button
                    variant={gradeSemester === 's2' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setGradeSemester('s2')}
                  >
                    {h.semester2}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Chart
                type="bar"
                data={gradeSemester === 's1' ? [
                  { subject: isRTL ? 'الرياضيات' : 'Math', grade: 92 },
                  { subject: isRTL ? 'الفيزياء' : 'Physics', grade: 85 },
                  { subject: isRTL ? 'العربية' : 'Arabic', grade: 95 },
                  { subject: isRTL ? 'الإسلامية' : 'Islamic', grade: 98 },
                  { subject: isRTL ? 'الإنجليزية' : 'English', grade: 88 },
                  { subject: isRTL ? 'الحاسب' : 'CS', grade: 91 },
                ] : [
                  { subject: isRTL ? 'الرياضيات' : 'Math', grade: 88 },
                  { subject: isRTL ? 'الفيزياء' : 'Physics', grade: 82 },
                  { subject: isRTL ? 'العربية' : 'Arabic', grade: 90 },
                  { subject: isRTL ? 'الإسلامية' : 'Islamic', grade: 95 },
                  { subject: isRTL ? 'الإنجليزية' : 'English', grade: 84 },
                  { subject: isRTL ? 'الحاسب' : 'CS', grade: 87 },
                ]}
                categoryKey="subject"
                valueKey="grade"
                size="sm"
                colors={['var(--color-primary)']}
                aria-label={h.gradesDistribution}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{h.gpaTrend}</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                type="line"
                data={[
                  { semester: isRTL ? 'ف١ ٢٠٢٤' : 'S1 2024', gpa: 85 },
                  { semester: isRTL ? 'ف٢ ٢٠٢٤' : 'S2 2024', gpa: 87 },
                  { semester: isRTL ? 'ف١ ٢٠٢٥' : 'S1 2025', gpa: 89 },
                  { semester: isRTL ? 'ف٢ ٢٠٢٥' : 'S2 2025', gpa: 92 },
                ]}
                categoryKey="semester"
                valueKey="gpa"
                size="sm"
                colors={['var(--color-success)']}
                aria-label={h.gpaTrend}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Classes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{h.todaysClasses}</CardTitle>
                    <CardDescription>{h.classHours}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/examples/education/schedule">
                      {h.viewAll}
                      <Arrow className="h-4 w-4 ms-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {todaysClasses.map((cls, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                        cls.isCurrent
                          ? 'border-primary bg-primary/5'
                          : cls.isBreak
                            ? 'border-dashed bg-muted/50'
                            : 'bg-card hover:bg-accent/50'
                      }`}
                    >
                      <div className="text-sm font-mono text-muted-foreground w-12 shrink-0">
                        {isRTL ? cls.timeAr : cls.time}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">
                            {isRTL ? cls.subjectAr : cls.subject}
                          </p>
                          {cls.isCurrent && (
                            <Badge variant="default" className="text-xs">{h.current}</Badge>
                          )}
                          {cls.isBreak && (
                            <Badge variant="secondary" className="text-xs">{h.break}</Badge>
                          )}
                        </div>
                        {cls.teacher && (
                          <p className="text-xs text-muted-foreground">
                            {isRTL ? cls.teacherAr : cls.teacher} · {isRTL ? cls.roomAr : cls.room}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{h.upcomingDeadlines}</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/examples/education/assignments">
                      {h.viewAll}
                      <Arrow className="h-4 w-4 ms-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <Link
                      key={deadline.id}
                      href={`/examples/education/assignments/${deadline.id}`}
                      className="block p-4 rounded-lg border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className={`text-xs ${categoryColors[deadline.category]}`}>
                              {isRTL ? deadline.subjectAr : deadline.subject}
                            </Badge>
                          </div>
                          <p className="font-medium text-sm">
                            {isRTL ? deadline.titleAr : deadline.title}
                          </p>
                        </div>
                        <span className={`text-xs font-medium ${
                          deadline.daysLeft <= 2 ? 'text-warning' : 'text-muted-foreground'
                        }`}>
                          {isRTL ? toArabicNumerals(deadline.daysLeft) : deadline.daysLeft} {h.daysRemaining}
                        </span>
                      </div>
                      <Progress value={deadline.progress} className="h-2" aria-label={`${isRTL ? deadline.titleAr : deadline.title}: ${isRTL ? `${toArabicNumerals(deadline.progress)}٪` : `${deadline.progress}%`}`} />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Navigation */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                title={h.viewGrades}
                description={h.viewGradesDesc}
                icon={ChartBar}
                href="/examples/education/grades"
              />
              <FeatureCard
                title={h.viewSchedule}
                description={h.viewScheduleDesc}
                icon={CalendarDots}
                href="/examples/education/schedule"
              />
              <FeatureCard
                title={h.viewAssignments}
                description={h.viewAssignmentsDesc}
                icon={ClipboardText}
                href="/examples/education/assignments"
              />
              <FeatureCard
                title={h.viewAttendance}
                description={h.viewAttendanceDesc}
                icon={CalendarCheck}
                href="/examples/education/attendance"
              />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {h.announcements}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Exam className="h-4 w-4" />
                  <AlertTitle>{h.midtermExam}</AlertTitle>
                  <AlertDescription>{h.midtermExamDesc}</AlertDescription>
                </Alert>
                <Alert>
                  <UsersFour className="h-4 w-4" />
                  <AlertTitle>{h.parentMeeting}</AlertTitle>
                  <AlertDescription>{h.parentMeetingDesc}</AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Fee Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CurrencyDollar className="h-5 w-5" />
                  {h.feeStatus}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{h.semester2Paid}</span>
                  <Badge variant="default">
                    <CheckCircle className="h-3 w-3 me-1" />
                    {h.paid}
                  </Badge>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">{h.nextPayment}</p>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  )
}
