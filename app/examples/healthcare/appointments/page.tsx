'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatsCard } from '@/components/ui/stats-card'
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
import { Input } from '@/components/ui/input'
import { TimePicker } from '@/components/ui/time-picker'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  CalendarCheck,
  CalendarDots,
  Plus,
  Clock,
  Users,
  CheckCircle,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'

const hc = {
  en: {
    title: 'Al Noor Medical Center',
    mainNavigation: 'Main navigation',
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    appointmentsCount: 'appointments',
    prescriptions: 'Prescriptions',
    appointmentCalendar: 'Appointment Calendar',
    appointmentCalendarDesc: 'View and schedule patient appointments',
    newAppointment: 'New Appointment',
    todayView: 'Today',
    weekView: 'Week',
    monthView: 'Month',
    totalToday: 'Total Today',
    completed: 'Completed',
    upcoming: 'Upcoming',
    cancelled: 'Cancelled',
    fromYesterday: 'from yesterday',
    appointmentList: 'Appointment List',
    time: 'Time',
    patient: 'Patient',
    doctor: 'Doctor',
    type: 'Type',
    status: 'Status',
    confirmed: 'Confirmed',
    checkedIn: 'Checked In',
    inProgress: 'In Progress',
    pending: 'Pending',
    noAppointments: 'No appointments for this date',
    selectPatient: 'Select Patient',
    selectDoctor: 'Select Doctor',
    selectType: 'Select Type',
    date: 'Date',
    notes: 'Notes',
    notesPlaceholder: 'Add appointment notes...',
    schedule: 'Schedule',
    cancel: 'Cancel',
    newAppointmentTitle: 'Schedule New Appointment',
    newAppointmentDesc: 'Fill in the details to schedule a new appointment.',
    generalCheckup: 'General Checkup',
    followUp: 'Follow-up',
    consultation: 'Consultation',
    dental: 'Dental',
    pediatrics: 'Pediatrics',
    labReview: 'Lab Review',
    appointmentScheduled: 'Appointment Scheduled',
    appointmentScheduledDesc: 'The appointment has been scheduled successfully.',
  },
  ar: {
    title: 'مركز النور الطبي',
    mainNavigation: 'التنقل الرئيسي',
    dashboard: 'لوحة التحكم',
    patients: 'المرضى',
    appointments: 'المواعيد',
    appointmentsCount: 'موعد',
    prescriptions: 'الوصفات الطبية',
    appointmentCalendar: 'تقويم المواعيد',
    appointmentCalendarDesc: 'عرض وجدولة مواعيد المرضى',
    newAppointment: 'موعد جديد',
    todayView: 'اليوم',
    weekView: 'الأسبوع',
    monthView: 'الشهر',
    totalToday: 'إجمالي اليوم',
    completed: 'مكتمل',
    upcoming: 'قادم',
    cancelled: 'ملغي',
    fromYesterday: 'من أمس',
    appointmentList: 'قائمة المواعيد',
    time: 'الوقت',
    patient: 'المريض',
    doctor: 'الطبيب',
    type: 'النوع',
    status: 'الحالة',
    confirmed: 'مؤكد',
    checkedIn: 'تم التسجيل',
    inProgress: 'قيد التنفيذ',
    pending: 'قيد الانتظار',
    noAppointments: 'لا توجد مواعيد لهذا التاريخ',
    selectPatient: 'اختر مريضاً',
    selectDoctor: 'اختر طبيباً',
    selectType: 'اختر النوع',
    date: 'التاريخ',
    notes: 'الملاحظات',
    notesPlaceholder: 'أضف ملاحظات الموعد...',
    schedule: 'جدولة',
    cancel: 'إلغاء',
    newAppointmentTitle: 'جدولة موعد جديد',
    newAppointmentDesc: 'أدخل التفاصيل لجدولة موعد جديد.',
    generalCheckup: 'فحص عام',
    followUp: 'متابعة',
    consultation: 'استشارة',
    dental: 'أسنان',
    pediatrics: 'أطفال',
    labReview: 'مراجعة مختبر',
    appointmentScheduled: 'تمت جدولة الموعد',
    appointmentScheduledDesc: 'تمت جدولة الموعد بنجاح.',
  },
}

interface AppointmentEntry {
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

const allAppointments: AppointmentEntry[] = [
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
  {
    id: '7', time: '14:00',
    patientName: 'Mohammad Al Kaabi', patientNameAr: 'محمد الكعبي', patientInitials: 'MK',
    patientImage: '/examples/healthcare/avatars/mohammad.jpg',
    doctor: 'Dr. Ahmad Khalil', doctorAr: 'د. أحمد خليل',
    type: 'Consultation', typeAr: 'استشارة', status: 'confirmed',
  },
  {
    id: '8', time: '14:30',
    patientName: 'Aisha Al Nuaimi', patientNameAr: 'عائشة النعيمي', patientInitials: 'AN',
    patientImage: '/examples/healthcare/avatars/aisha.jpg',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    type: 'Follow-up', typeAr: 'متابعة', status: 'confirmed',
  },
]

function getStatusBadge(status: AppointmentEntry['status'], labels: Record<string, string>) {
  const statusLabels: Record<AppointmentEntry['status'], string> = {
    confirmed: labels.confirmed,
    'checked-in': labels.checkedIn,
    'in-progress': labels.inProgress,
    completed: labels.completed,
    pending: labels.pending,
  }
  const variants: Record<AppointmentEntry['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
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

export default function AppointmentsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = hc[locale]

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleScheduleAppointment = async () => {
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 400))
    setIsSubmitting(false)
    setDialogOpen(false)
    toast({ title: h.appointmentScheduled, description: h.appointmentScheduledDesc, variant: 'success' })
  }

  const calendarEvents = React.useMemo(() => [
    { date: new Date(), title: isRTL ? '٨ مواعيد' : '8 appointments', variant: 'primary' as const },
    { date: new Date(Date.now() + 86400000), title: isRTL ? '٥ مواعيد' : '5 appointments', variant: 'default' as const },
    { date: new Date(Date.now() + 172800000), title: isRTL ? '٣ مواعيد' : '3 appointments', variant: 'secondary' as const },
  ], [isRTL])

  return (
    <div className="container py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-primary/10 rounded-xl">
              <CalendarDots className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{h.appointmentCalendar}</h1>
              <p className="text-muted-foreground">{h.appointmentCalendarDesc}</p>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 me-2" />
                {h.newAppointment}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{h.newAppointmentTitle}</DialogTitle>
                <DialogDescription>{h.newAppointmentDesc}</DialogDescription>
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
                    <Label>{h.type}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={h.selectType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checkup">{h.generalCheckup}</SelectItem>
                        <SelectItem value="followup">{h.followUp}</SelectItem>
                        <SelectItem value="consultation">{h.consultation}</SelectItem>
                        <SelectItem value="dental">{h.dental}</SelectItem>
                        <SelectItem value="pediatrics">{h.pediatrics}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{h.time}</Label>
                    <TimePicker placeholder={h.time} className="w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apt-notes">{h.notes}</Label>
                  <Textarea id="apt-notes" placeholder={h.notesPlaceholder} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>{h.cancel}</Button>
                <Button onClick={handleScheduleAppointment} loading={isSubmitting}>{h.schedule}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            icon={<CalendarCheck className="h-4 w-4" />}
            label={h.totalToday}
            value={8}
            trend={14}
            trendLabel={h.fromYesterday}
          />
          <StatsCard
            icon={<CheckCircle className="h-4 w-4" />}
            label={h.completed}
            value={2}
          />
          <StatsCard
            icon={<Clock className="h-4 w-4" />}
            label={h.upcoming}
            value={5}
          />
          <StatsCard
            icon={<Users className="h-4 w-4" />}
            label={h.cancelled}
            value={1}
            trend={-50}
            trendLabel={h.fromYesterday}
          />
        </div>

        {/* Calendar + Appointments */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDots className="h-5 w-5" />
                  {h.monthView}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  className="p-0"
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date as Date | undefined)}
                  showHijri
                  events={calendarEvents}
                  locale={locale}
                />
              </CardContent>
            </Card>
          </div>

          {/* Appointment List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{h.appointmentList}</CardTitle>
                    <CardDescription>
                      <ArabicNumber value={allAppointments.length} /> {h.appointmentsCount}
                    </CardDescription>
                  </div>
                  <Tabs defaultValue="today">
                    <TabsList>
                      <TabsTrigger value="today">{h.todayView}</TabsTrigger>
                      <TabsTrigger value="week">{h.weekView}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allAppointments.map((apt) => (
                    <Link
                      key={apt.id}
                      href={`/examples/healthcare/patients/${apt.id}`}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-16 p-2 bg-muted rounded-lg">
                          <p className="text-lg font-bold">{apt.time}</p>
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={apt.patientImage} alt={apt.patientName} />
                          <AvatarFallback>{apt.patientInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{isRTL ? apt.patientNameAr : apt.patientName}</p>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? apt.doctorAr : apt.doctor}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{isRTL ? apt.typeAr : apt.type}</Badge>
                        {getStatusBadge(apt.status, h)}
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  )
}
