'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/ui/stats-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, type CalendarEvent } from '@/components/ui/calendar'
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  CalendarBlank,
  Percent,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
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
    attendanceTitle: 'Attendance Record',
    attendanceDesc: 'Track your attendance history and details',
    totalDays: 'Total School Days',
    presentDays: 'Present',
    absentDays: 'Absent',
    lateDays: 'Late',
    attendanceRate: 'Attendance Rate',
    calendarView: 'Calendar View',
    listView: 'List View',
    legend: 'Legend',
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    weekend: 'Weekend / Holiday',
    absenceDetails: 'Absence & Late Details',
    date: 'Date',
    type: 'Type',
    reason: 'Reason',
    excusedStatus: 'Status',
    excused: 'Excused',
    unexcused: 'Unexcused',
    medicalLeave: 'Medical leave (doctor\'s note submitted)',
    familyEmergency: 'Family emergency',
    unexcusedAbsence: 'Unexcused absence',
    lateArrival: 'Late arrival — traffic delay',
    lateArrival2: 'Late arrival — 15 minutes',
    lateArrival3: 'Late arrival — overslept',
    ofDays: 'of school days',
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
    attendanceTitle: 'سجل الحضور',
    attendanceDesc: 'تتبع تاريخ الحضور والتفاصيل',
    totalDays: 'إجمالي أيام الدراسة',
    presentDays: 'حاضر',
    absentDays: 'غائب',
    lateDays: 'متأخر',
    attendanceRate: 'نسبة الحضور',
    calendarView: 'عرض التقويم',
    listView: 'عرض القائمة',
    legend: 'دليل الألوان',
    present: 'حاضر',
    absent: 'غائب',
    late: 'متأخر',
    weekend: 'عطلة نهاية الأسبوع / إجازة',
    absenceDetails: 'تفاصيل الغياب والتأخير',
    date: 'التاريخ',
    type: 'النوع',
    reason: 'السبب',
    excusedStatus: 'الحالة',
    excused: 'بعذر',
    unexcused: 'بدون عذر',
    medicalLeave: 'إجازة مرضية (تم تقديم تقرير طبي)',
    familyEmergency: 'حالة طوارئ عائلية',
    unexcusedAbsence: 'غياب بدون عذر',
    lateArrival: 'تأخر — ازدحام مروري',
    lateArrival2: 'تأخر — ١٥ دقيقة',
    lateArrival3: 'تأخر — استيقاظ متأخر',
    ofDays: 'من أيام الدراسة',
    next: 'التالي',
    previous: 'السابق',
  },
}

interface AttendanceRecord {
  id: string
  date: string
  dateAr: string
  type: 'absent' | 'late'
  reason: string
  reasonAr: string
  excused: boolean
}

const attendanceRecords: AttendanceRecord[] = [
  { id: '1', date: 'Feb 15, 2026', dateAr: '١٥ فبراير ٢٠٢٦', type: 'absent', reason: 'Medical leave (doctor\'s note submitted)', reasonAr: 'إجازة مرضية (تم تقديم تقرير طبي)', excused: true },
  { id: '2', date: 'Mar 2, 2026', dateAr: '٢ مارس ٢٠٢٦', type: 'absent', reason: 'Family emergency', reasonAr: 'حالة طوارئ عائلية', excused: true },
  { id: '3', date: 'Jan 20, 2026', dateAr: '٢٠ يناير ٢٠٢٦', type: 'absent', reason: 'Unexcused absence', reasonAr: 'غياب بدون عذر', excused: false },
  { id: '4', date: 'Jan 5, 2026', dateAr: '٥ يناير ٢٠٢٦', type: 'absent', reason: 'Medical leave', reasonAr: 'إجازة مرضية', excused: true },
  { id: '5', date: 'Feb 8, 2026', dateAr: '٨ فبراير ٢٠٢٦', type: 'late', reason: 'Late arrival — traffic delay', reasonAr: 'تأخر — ازدحام مروري', excused: true },
  { id: '6', date: 'Feb 22, 2026', dateAr: '٢٢ فبراير ٢٠٢٦', type: 'late', reason: 'Late arrival — 15 minutes', reasonAr: 'تأخر — ١٥ دقيقة', excused: false },
  { id: '7', date: 'Mar 8, 2026', dateAr: '٨ مارس ٢٠٢٦', type: 'late', reason: 'Late arrival — overslept', reasonAr: 'تأخر — استيقاظ متأخر', excused: false },
]

// Calendar events for attendance dots
function createAttendanceEvents(locale: 'en' | 'ar'): CalendarEvent[] {
  const events: CalendarEvent[] = []
  const labels = {
    present: locale === 'ar' ? 'حاضر' : 'Present',
    absent: locale === 'ar' ? 'غائب' : 'Absent',
    late: locale === 'ar' ? 'متأخر' : 'Late',
  }

  // Present days - add green dots for school days in March 2026 (Sun-Thu)
  for (let day = 1; day <= 31; day++) {
    const date = new Date(2026, 2, day)
    const dow = date.getDay()
    // Skip weekends (Fri=5, Sat=6)
    if (dow === 5 || dow === 6) continue
    // Skip absent/late days
    if (day === 2) {
      events.push({ date, title: labels.absent, variant: 'destructive' })
    } else if (day === 8) {
      events.push({ date, title: labels.late, variant: 'secondary' })
    } else if (day <= 12) {
      events.push({ date, title: labels.present, variant: 'primary' })
    }
  }

  // February events
  for (let day = 1; day <= 28; day++) {
    const date = new Date(2026, 1, day)
    const dow = date.getDay()
    if (dow === 5 || dow === 6) continue
    if (day === 15) {
      events.push({ date, title: labels.absent, variant: 'destructive' })
    } else if (day === 8) {
      events.push({ date, title: labels.late, variant: 'secondary' })
    } else if (day === 22) {
      events.push({ date, title: labels.late, variant: 'secondary' })
    } else {
      events.push({ date, title: labels.present, variant: 'primary' })
    }
  }

  return events
}

export default function AttendancePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = ed[locale]

  const [currentPage, setCurrentPage] = React.useState(1)
  const attendanceEvents = React.useMemo(() => createAttendanceEvents(locale), [locale])

  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      id: 'date',
      header: h.date,
      accessorKey: 'date',
      sortable: true,
      cell: (row: AttendanceRecord) => (
        <span className="text-sm">{isRTL ? row.dateAr : row.date}</span>
      ),
    },
    {
      id: 'type',
      header: h.type,
      accessorKey: 'type',
      sortable: true,
      cell: (row: AttendanceRecord) => (
        <Badge variant={row.type === 'absent' ? 'destructive' : 'outline'}>
          {row.type === 'absent' ? h.absent : h.late}
        </Badge>
      ),
    },
    {
      id: 'reason',
      header: h.reason,
      accessorKey: 'reason',
      sortable: false,
      cell: (row: AttendanceRecord) => (
        <span className="text-sm">{isRTL ? row.reasonAr : row.reason}</span>
      ),
    },
    {
      id: 'excused',
      header: h.excusedStatus,
      accessorKey: 'excused',
      sortable: true,
      cell: (row: AttendanceRecord) => (
        <Badge variant={row.excused ? 'default' : 'secondary'}>
          {row.excused
            ? (
                <>
                  <CheckCircle className="h-3 w-3 me-1" />
                  {h.excused}
                </>
              )
            : (
                <>
                  <XCircle className="h-3 w-3 me-1" />
                  {h.unexcused}
                </>
              )
          }
        </Badge>
      ),
    },
  ]

  return (
    <div className="container py-8">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-4 bg-primary/10 rounded-xl">
            <CalendarCheck className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{h.attendanceTitle}</h1>
            <p className="text-muted-foreground">{h.attendanceDesc}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          <StatsCard
            icon={<CalendarBlank className="h-4 w-4" />}
            label={h.totalDays}
            value={isRTL ? toArabicNumerals(120) : 120}
          />
          <StatsCard
            icon={<CheckCircle className="h-4 w-4" />}
            label={h.presentDays}
            value={isRTL ? toArabicNumerals(113) : 113}
          />
          <StatsCard
            icon={<XCircle className="h-4 w-4" />}
            label={h.absentDays}
            value={isRTL ? toArabicNumerals(4) : 4}
          />
          <StatsCard
            icon={<Clock className="h-4 w-4" />}
            label={h.lateDays}
            value={isRTL ? toArabicNumerals(3) : 3}
          />
          <StatsCard
            icon={<Percent className="h-4 w-4" />}
            label={h.attendanceRate}
            value={isRTL ? `${toArabicNumerals('94.2')}٪` : '94.2%'}
            trendLabel={h.ofDays}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="calendar">
          <TabsList className="mb-6">
            <TabsTrigger value="calendar">{h.calendarView}</TabsTrigger>
            <TabsTrigger value="list">{h.listView}</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-4">
                    <Calendar
                      showHijri
                      locale={locale}
                      events={attendanceEvents}
                    />
                  </CardContent>
                </Card>

                {/* Legend */}
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium mb-3">{h.legend}</p>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{h.present}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-destructive" />
                        <span className="text-sm text-muted-foreground">{h.absent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-secondary" />
                        <span className="text-sm text-muted-foreground">{h.late}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-muted" />
                        <span className="text-sm text-muted-foreground">{h.weekend}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Absence details sidebar */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{h.absenceDetails}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {attendanceRecords.map((record) => (
                      <div
                        key={record.id}
                        className="p-3 rounded-lg border space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {isRTL ? record.dateAr : record.date}
                          </span>
                          <Badge variant={record.type === 'absent' ? 'destructive' : 'outline'} className="text-xs">
                            {record.type === 'absent' ? h.absent : h.late}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? record.reasonAr : record.reason}
                        </p>
                        <Badge variant={record.excused ? 'default' : 'secondary'} className="text-xs">
                          {record.excused ? (
                            <>
                              <CheckCircle className="h-3 w-3 me-1" />
                              {h.excused}
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 me-1" />
                              {h.unexcused}
                            </>
                          )}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <DataTable
              data={attendanceRecords}
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
    </div>
  )
}
