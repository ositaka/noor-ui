'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { Gear, Bell, CalendarDots, Globe } from '@phosphor-icons/react'

const es = {
  en: {
    settings: 'Settings',
    settingsDesc: 'Manage your portal preferences',
    notifications: 'Notifications',
    notificationsDesc: 'Choose which notifications you want to receive',
    display: 'Display',
    displayDesc: 'Customize calendar and theme preferences',
    language: 'Language',
    languageDesc: 'Choose your preferred language',
    assignmentReminders: 'Assignment Due Reminders',
    assignmentRemindersDesc: 'Get notified when assignments are due soon',
    gradeAlerts: 'Grade Posted Alerts',
    gradeAlertsDesc: 'Get notified when new grades are posted',
    attendanceNotifications: 'Attendance Notifications',
    attendanceNotificationsDesc: 'Receive daily attendance confirmations',
    announcements: 'School Announcements',
    announcementsDesc: 'Receive important school announcements',
    examSchedule: 'Exam Schedule Updates',
    examScheduleDesc: 'Get notified about exam schedule changes',
    calendarFormat: 'Calendar Format',
    gregorianOnly: 'Gregorian only',
    hijriOnly: 'Hijri only',
    both: 'Both',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    english: 'English',
    arabic: 'العربية',
    saveChanges: 'Save Changes',
    saved: 'Settings Saved',
    savedDesc: 'Your settings have been saved successfully.',
  },
  ar: {
    settings: 'الإعدادات',
    settingsDesc: 'إدارة تفضيلات البوابة',
    notifications: 'الإشعارات',
    notificationsDesc: 'اختر الإشعارات التي تريد استقبالها',
    display: 'العرض',
    displayDesc: 'تخصيص تفضيلات التقويم والمظهر',
    language: 'اللغة',
    languageDesc: 'اختر لغتك المفضلة',
    assignmentReminders: 'تذكيرات الواجبات',
    assignmentRemindersDesc: 'إشعار عند اقتراب موعد تسليم الواجبات',
    gradeAlerts: 'تنبيهات الدرجات',
    gradeAlertsDesc: 'إشعار عند نشر درجات جديدة',
    attendanceNotifications: 'إشعارات الحضور',
    attendanceNotificationsDesc: 'استقبال تأكيدات الحضور اليومية',
    announcements: 'الإعلانات المدرسية',
    announcementsDesc: 'استقبال الإعلانات المدرسية المهمة',
    examSchedule: 'جدول الاختبارات',
    examScheduleDesc: 'إشعار عند تغيير جدول الاختبارات',
    calendarFormat: 'تنسيق التقويم',
    gregorianOnly: 'ميلادي فقط',
    hijriOnly: 'هجري فقط',
    both: 'كلاهما',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
    english: 'English',
    arabic: 'العربية',
    saveChanges: 'حفظ التغييرات',
    saved: 'تم الحفظ',
    savedDesc: 'تم حفظ الإعدادات بنجاح.',
  },
}

export default function SettingsPage() {
  const { locale } = useDirection()
  const t = es[locale]
  const { toast } = useToast()

  // Notification switches
  const [assignmentReminders, setAssignmentReminders] = React.useState(true)
  const [gradeAlerts, setGradeAlerts] = React.useState(true)
  const [attendanceNotifications, setAttendanceNotifications] = React.useState(true)
  const [announcements, setAnnouncements] = React.useState(true)
  const [examSchedule, setExamSchedule] = React.useState(false)

  // Display settings
  const [calendarFormat, setCalendarFormat] = React.useState('both')
  const [theme, setTheme] = React.useState('system')

  // Language setting
  const [language, setLanguage] = React.useState(locale === 'ar' ? 'ar' : 'en')

  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSaving(false)
    toast({
      title: t.saved,
      description: t.savedDesc,
      variant: 'success',
    })
  }

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Gear className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.settings}</h1>
          <p className="text-muted-foreground">{t.settingsDesc}</p>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Notifications Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {t.notifications}
            </CardTitle>
            <CardDescription>{t.notificationsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="assignmentReminders">{t.assignmentReminders}</Label>
                <p className="text-xs text-muted-foreground">{t.assignmentRemindersDesc}</p>
              </div>
              <Switch
                id="assignmentReminders"
                checked={assignmentReminders}
                onCheckedChange={setAssignmentReminders}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="gradeAlerts">{t.gradeAlerts}</Label>
                <p className="text-xs text-muted-foreground">{t.gradeAlertsDesc}</p>
              </div>
              <Switch
                id="gradeAlerts"
                checked={gradeAlerts}
                onCheckedChange={setGradeAlerts}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="attendanceNotifications">{t.attendanceNotifications}</Label>
                <p className="text-xs text-muted-foreground">{t.attendanceNotificationsDesc}</p>
              </div>
              <Switch
                id="attendanceNotifications"
                checked={attendanceNotifications}
                onCheckedChange={setAttendanceNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="announcements">{t.announcements}</Label>
                <p className="text-xs text-muted-foreground">{t.announcementsDesc}</p>
              </div>
              <Switch
                id="announcements"
                checked={announcements}
                onCheckedChange={setAnnouncements}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="examSchedule">{t.examSchedule}</Label>
                <p className="text-xs text-muted-foreground">{t.examScheduleDesc}</p>
              </div>
              <Switch
                id="examSchedule"
                checked={examSchedule}
                onCheckedChange={setExamSchedule}
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDots className="h-5 w-5" />
              {t.display}
            </CardTitle>
            <CardDescription>{t.displayDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>{t.calendarFormat}</Label>
              <RadioGroup value={calendarFormat} onValueChange={setCalendarFormat}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="gregorian" id="gregorian" />
                  <Label htmlFor="gregorian" className="font-normal cursor-pointer">
                    {t.gregorianOnly}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="hijri" id="hijri" />
                  <Label htmlFor="hijri" className="font-normal cursor-pointer">
                    {t.hijriOnly}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both" className="font-normal cursor-pointer">
                    {t.both}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>{t.theme}</Label>
              <RadioGroup value={theme} onValueChange={setTheme}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="font-normal cursor-pointer">
                    {t.light}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="font-normal cursor-pointer">
                    {t.dark}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="font-normal cursor-pointer">
                    {t.system}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Language Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t.language}
            </CardTitle>
            <CardDescription>{t.languageDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={language} onValueChange={setLanguage}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="en" id="lang-en" />
                <Label htmlFor="lang-en" className="font-normal cursor-pointer">
                  {t.english}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="ar" id="lang-ar" />
                <Label htmlFor="lang-ar" className="font-normal cursor-pointer">
                  {t.arabic}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} loading={isSaving}>
            {t.saveChanges}
          </Button>
        </div>
      </div>
    </div>
  )
}
