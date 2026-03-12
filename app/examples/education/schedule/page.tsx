'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
  GraduationCap,
  CalendarDots,
  Clock,
  MapPin,
  Sun,
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
    scheduleTitle: 'Weekly Schedule',
    scheduleDesc: 'Your class timetable for the current week',
    thisWeek: 'This Week',
    nextWeek: 'Next Week',
    nextWeekPlaceholder: 'Next week\'s schedule will be published soon',
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    sundayShort: 'Sun',
    mondayShort: 'Mon',
    tuesdayShort: 'Tue',
    wednesdayShort: 'Wed',
    thursdayShort: 'Thu',
    assembly: 'Morning Assembly',
    break: 'Break',
    period: 'Period',
    room: 'Room',
    todayIs: 'Today is Thursday — classes end at 1:30 PM',
    classesRemaining: '2 classes remaining',
    colorLegend: 'Color Legend',
    stem: 'STEM',
    languages: 'Languages',
    islamic: 'Islamic Studies',
    humanities: 'Humanities',
    other: 'Other',
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
    scheduleTitle: 'الجدول الأسبوعي',
    scheduleDesc: 'جدول حصصك للأسبوع الحالي',
    thisWeek: 'هذا الأسبوع',
    nextWeek: 'الأسبوع القادم',
    nextWeekPlaceholder: 'سيتم نشر جدول الأسبوع القادم قريباً',
    sunday: 'الأحد',
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    sundayShort: 'أحد',
    mondayShort: 'اثنين',
    tuesdayShort: 'ثلاثاء',
    wednesdayShort: 'أربعاء',
    thursdayShort: 'خميس',
    assembly: 'طابور الصباح',
    break: 'استراحة',
    period: 'الحصة',
    room: 'القاعة',
    todayIs: 'اليوم الخميس — تنتهي الحصص الساعة ١:٣٠ مساءً',
    classesRemaining: 'حصتان متبقيتان',
    colorLegend: 'دليل الألوان',
    stem: 'العلوم والتقنية',
    languages: 'اللغات',
    islamic: 'الدراسات الإسلامية',
    humanities: 'العلوم الإنسانية',
    other: 'أخرى',
  },
}

interface ScheduleCell {
  subject: string
  subjectAr: string
  teacher: string
  teacherAr: string
  room: string
  roomAr: string
  category: 'stem' | 'languages' | 'islamic' | 'humanities' | 'other'
}

interface TimeSlot {
  time: string
  timeAr: string
  label: string
  labelAr: string
  isBreak?: boolean
  isAssembly?: boolean
}

const timeSlots: TimeSlot[] = [
  { time: '6:45', timeAr: '٦:٤٥', label: 'Assembly', labelAr: 'طابور', isAssembly: true },
  { time: '7:00', timeAr: '٧:٠٠', label: 'Period 1', labelAr: 'الحصة ١' },
  { time: '7:45', timeAr: '٧:٤٥', label: 'Period 2', labelAr: 'الحصة ٢' },
  { time: '8:30', timeAr: '٨:٣٠', label: 'Period 3', labelAr: 'الحصة ٣' },
  { time: '9:15', timeAr: '٩:١٥', label: 'Period 4', labelAr: 'الحصة ٤' },
  { time: '10:00', timeAr: '١٠:٠٠', label: 'Break', labelAr: 'استراحة', isBreak: true },
  { time: '10:30', timeAr: '١٠:٣٠', label: 'Period 5', labelAr: 'الحصة ٥' },
  { time: '11:15', timeAr: '١١:١٥', label: 'Period 6', labelAr: 'الحصة ٦' },
  { time: '12:00', timeAr: '١٢:٠٠', label: 'Period 7', labelAr: 'الحصة ٧' },
]

// Schedule grid: [timeSlotIndex][dayIndex] (Sun-Thu = 0-4)
const scheduleData: (ScheduleCell | null)[][] = [
  // Assembly row - null for all (handled separately)
  [null, null, null, null, null],
  // Period 1
  [
    { subject: 'Mathematics', subjectAr: 'الرياضيات', teacher: 'Mr. Mohammed', teacherAr: 'أ. محمد', room: '201', roomAr: '٢٠١', category: 'stem' },
    { subject: 'Arabic Language', subjectAr: 'اللغة العربية', teacher: 'Ms. Noura', teacherAr: 'أ. نورة', room: '102', roomAr: '١٠٢', category: 'languages' },
    { subject: 'Physics', subjectAr: 'الفيزياء', teacher: 'Mr. Fahad', teacherAr: 'أ. فهد', room: '305', roomAr: '٣٠٥', category: 'stem' },
    { subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية', teacher: 'Mr. Abdullah', teacherAr: 'أ. عبدالله', room: '104', roomAr: '١٠٤', category: 'islamic' },
    { subject: 'English Language', subjectAr: 'اللغة الإنجليزية', teacher: 'Ms. Sarah', teacherAr: 'أ. سارة', room: '203', roomAr: '٢٠٣', category: 'languages' },
  ],
  // Period 2
  [
    { subject: 'Physics', subjectAr: 'الفيزياء', teacher: 'Mr. Fahad', teacherAr: 'أ. فهد', room: '305', roomAr: '٣٠٥', category: 'stem' },
    { subject: 'Mathematics', subjectAr: 'الرياضيات', teacher: 'Mr. Mohammed', teacherAr: 'أ. محمد', room: '201', roomAr: '٢٠١', category: 'stem' },
    { subject: 'English Language', subjectAr: 'اللغة الإنجليزية', teacher: 'Ms. Sarah', teacherAr: 'أ. سارة', room: '203', roomAr: '٢٠٣', category: 'languages' },
    { subject: 'History', subjectAr: 'التاريخ', teacher: 'Ms. Reem', teacherAr: 'أ. ريم', room: '106', roomAr: '١٠٦', category: 'humanities' },
    { subject: 'Computer Science', subjectAr: 'علوم الحاسب', teacher: 'Mr. Khalid', teacherAr: 'أ. خالد', room: 'Lab 1', roomAr: 'معمل ١', category: 'stem' },
  ],
  // Period 3
  [
    { subject: 'Arabic Language', subjectAr: 'اللغة العربية', teacher: 'Ms. Noura', teacherAr: 'أ. نورة', room: '102', roomAr: '١٠٢', category: 'languages' },
    { subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية', teacher: 'Mr. Abdullah', teacherAr: 'أ. عبدالله', room: '104', roomAr: '١٠٤', category: 'islamic' },
    { subject: 'Mathematics', subjectAr: 'الرياضيات', teacher: 'Mr. Mohammed', teacherAr: 'أ. محمد', room: '201', roomAr: '٢٠١', category: 'stem' },
    { subject: 'Computer Science', subjectAr: 'علوم الحاسب', teacher: 'Mr. Khalid', teacherAr: 'أ. خالد', room: 'Lab 1', roomAr: 'معمل ١', category: 'stem' },
    { subject: 'Art', subjectAr: 'الفنون', teacher: 'Ms. Hind', teacherAr: 'أ. هند', room: 'Art Room', roomAr: 'قاعة الفنون', category: 'other' },
  ],
  // Period 4
  [
    { subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية', teacher: 'Mr. Abdullah', teacherAr: 'أ. عبدالله', room: '104', roomAr: '١٠٤', category: 'islamic' },
    { subject: 'Physics', subjectAr: 'الفيزياء', teacher: 'Mr. Fahad', teacherAr: 'أ. فهد', room: '305', roomAr: '٣٠٥', category: 'stem' },
    { subject: 'History', subjectAr: 'التاريخ', teacher: 'Ms. Reem', teacherAr: 'أ. ريم', room: '106', roomAr: '١٠٦', category: 'humanities' },
    { subject: 'Arabic Language', subjectAr: 'اللغة العربية', teacher: 'Ms. Noura', teacherAr: 'أ. نورة', room: '102', roomAr: '١٠٢', category: 'languages' },
    { subject: 'Mathematics', subjectAr: 'الرياضيات', teacher: 'Mr. Mohammed', teacherAr: 'أ. محمد', room: '201', roomAr: '٢٠١', category: 'stem' },
  ],
  // Break row - null for all (handled separately)
  [null, null, null, null, null],
  // Period 5
  [
    { subject: 'English Language', subjectAr: 'اللغة الإنجليزية', teacher: 'Ms. Sarah', teacherAr: 'أ. سارة', room: '203', roomAr: '٢٠٣', category: 'languages' },
    { subject: 'Computer Science', subjectAr: 'علوم الحاسب', teacher: 'Mr. Khalid', teacherAr: 'أ. خالد', room: 'Lab 1', roomAr: 'معمل ١', category: 'stem' },
    { subject: 'Arabic Language', subjectAr: 'اللغة العربية', teacher: 'Ms. Noura', teacherAr: 'أ. نورة', room: '102', roomAr: '١٠٢', category: 'languages' },
    { subject: 'Artificial Intelligence', subjectAr: 'الذكاء الاصطناعي', teacher: 'Ms. Mona', teacherAr: 'أ. منى', room: 'Lab 2', roomAr: 'معمل ٢', category: 'stem' },
    { subject: 'Physical Education', subjectAr: 'التربية البدنية', teacher: 'Mr. Sultan', teacherAr: 'أ. سلطان', room: 'Gym', roomAr: 'الصالة الرياضية', category: 'other' },
  ],
  // Period 6
  [
    { subject: 'Computer Science', subjectAr: 'علوم الحاسب', teacher: 'Mr. Khalid', teacherAr: 'أ. خالد', room: 'Lab 1', roomAr: 'معمل ١', category: 'stem' },
    { subject: 'Art', subjectAr: 'الفنون', teacher: 'Ms. Hind', teacherAr: 'أ. هند', room: 'Art Room', roomAr: 'قاعة الفنون', category: 'other' },
    { subject: 'Artificial Intelligence', subjectAr: 'الذكاء الاصطناعي', teacher: 'Ms. Mona', teacherAr: 'أ. منى', room: 'Lab 2', roomAr: 'معمل ٢', category: 'stem' },
    { subject: 'Physical Education', subjectAr: 'التربية البدنية', teacher: 'Mr. Sultan', teacherAr: 'أ. سلطان', room: 'Gym', roomAr: 'الصالة الرياضية', category: 'other' },
    { subject: 'History', subjectAr: 'التاريخ', teacher: 'Ms. Reem', teacherAr: 'أ. ريم', room: '106', roomAr: '١٠٦', category: 'humanities' },
  ],
  // Period 7
  [
    { subject: 'Physical Education', subjectAr: 'التربية البدنية', teacher: 'Mr. Sultan', teacherAr: 'أ. سلطان', room: 'Gym', roomAr: 'الصالة الرياضية', category: 'other' },
    { subject: 'English Language', subjectAr: 'اللغة الإنجليزية', teacher: 'Ms. Sarah', teacherAr: 'أ. سارة', room: '203', roomAr: '٢٠٣', category: 'languages' },
    { subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية', teacher: 'Mr. Abdullah', teacherAr: 'أ. عبدالله', room: '104', roomAr: '١٠٤', category: 'islamic' },
    { subject: 'English Language', subjectAr: 'اللغة الإنجليزية', teacher: 'Ms. Sarah', teacherAr: 'أ. سارة', room: '203', roomAr: '٢٠٣', category: 'languages' },
    { subject: 'Artificial Intelligence', subjectAr: 'الذكاء الاصطناعي', teacher: 'Ms. Mona', teacherAr: 'أ. منى', room: 'Lab 2', roomAr: 'معمل ٢', category: 'stem' },
  ],
]

const categoryStyles: Record<string, { bg: string; border: string }> = {
  stem: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800' },
  languages: { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-800' },
  islamic: { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-200 dark:border-purple-800' },
  humanities: { bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800' },
  other: { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-800' },
}

const categoryDotColors: Record<string, string> = {
  stem: 'bg-blue-500',
  languages: 'bg-green-500',
  islamic: 'bg-purple-500',
  humanities: 'bg-amber-500',
  other: 'bg-orange-500',
}

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'] as const

export default function SchedulePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]
  const h = ed[locale]

  const dayLabels = days.map(d => ({
    full: h[d],
    short: h[`${d}Short` as keyof typeof h] as string,
  }))

  // Thursday is index 4 (today)
  const todayIndex = 4

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
            <Button variant="ghost" size="sm" className="font-medium" asChild>
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
                  <BreadcrumbPage>{h.schedule}</BreadcrumbPage>
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-primary/10 rounded-xl">
              <CalendarDots className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{h.scheduleTitle}</h1>
              <p className="text-muted-foreground">{h.scheduleDesc}</p>
            </div>
          </div>
        </div>

        {/* Today indicator */}
        <Card className="mb-6">
          <CardContent className="p-4 flex items-center gap-3">
            <Sun className="h-5 w-5 text-warning" />
            <p className="text-sm font-medium">{h.todayIs}</p>
            <Badge variant="secondary">{h.classesRemaining}</Badge>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="thisWeek">
          <TabsList className="mb-6">
            <TabsTrigger value="thisWeek">{h.thisWeek}</TabsTrigger>
            <TabsTrigger value="nextWeek">{h.nextWeek}</TabsTrigger>
          </TabsList>

          <TabsContent value="thisWeek">
            {/* Schedule Grid */}
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <caption className="sr-only">{h.scheduleTitle} — {h.thisWeek}</caption>
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="p-3 text-start text-sm font-medium text-muted-foreground w-24">
                        <Clock className="h-4 w-4 inline-block me-1" />
                        {h.period}
                      </th>
                      {dayLabels.map((day, idx) => (
                        <th
                          scope="col"
                          key={idx}
                          className={`p-3 text-center text-sm font-medium ${
                            idx === todayIndex
                              ? 'bg-primary/5 text-primary font-bold'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {day.full}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot, slotIdx) => (
                      <tr
                        key={slotIdx}
                        className={`border-b last:border-0 ${
                          slot.isBreak ? 'bg-muted/50' : slot.isAssembly ? 'bg-muted/30' : ''
                        }`}
                      >
                        <th scope="row" className="p-3 text-sm font-normal">
                          <div className="font-mono text-muted-foreground">{isRTL ? slot.timeAr : slot.time}</div>
                          <div className="text-xs text-muted-foreground">
                            {isRTL ? slot.labelAr : slot.label}
                          </div>
                        </th>
                        {slot.isBreak ? (
                          <td colSpan={5} className="p-3 text-center">
                            <Badge variant="secondary">{h.break} ({isRTL ? '١٠:٠٠ - ١٠:٣٠' : '10:00 - 10:30'})</Badge>
                          </td>
                        ) : slot.isAssembly ? (
                          <td colSpan={5} className="p-3 text-center">
                            <Badge variant="outline">{h.assembly} ({isRTL ? '٦:٤٥ - ٧:٠٠' : '6:45 - 7:00'})</Badge>
                          </td>
                        ) : (
                          days.map((_, dayIdx) => {
                            const cell = scheduleData[slotIdx]?.[dayIdx]
                            if (!cell) return <td key={dayIdx} className="p-2" />
                            const style = categoryStyles[cell.category]
                            return (
                              <td
                                key={dayIdx}
                                className={`p-2 ${dayIdx === todayIndex ? 'bg-primary/5' : ''}`}
                              >
                                <div
                                  className={`p-2 rounded-lg border text-xs ${style.bg} ${style.border} ${
                                    dayIdx === todayIndex ? 'ring-1 ring-primary/30' : ''
                                  }`}
                                >
                                  <p className="font-medium truncate">
                                    {isRTL ? cell.subjectAr : cell.subject}
                                    <span className="sr-only"> ({h[cell.category as keyof typeof h]})</span>
                                  </p>
                                  <p className="text-muted-foreground mt-0.5">
                                    {isRTL ? cell.teacherAr : cell.teacher}
                                  </p>
                                  <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                                    <MapPin className="h-3 w-3" />
                                    {isRTL ? cell.roomAr : cell.room}
                                  </p>
                                </div>
                              </td>
                            )
                          })
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nextWeek">
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <CalendarDots className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{h.nextWeekPlaceholder}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Color Legend */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-3">{h.colorLegend}</p>
            <div className="flex flex-wrap gap-4">
              {[
                { key: 'stem', label: h.stem },
                { key: 'languages', label: h.languages },
                { key: 'islamic', label: h.islamic },
                { key: 'humanities', label: h.humanities },
                { key: 'other', label: h.other },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${categoryDotColors[key]}`} />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
