'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { Gear, Bell, PaintBrush, Globe, ShieldCheck } from '@phosphor-icons/react'

const hp = {
  en: {
    settings: 'Settings',
    settingsDesc: 'Manage your clinic preferences and account settings',
    notifications: 'Notifications',
    notificationsDesc: 'Configure how you receive alerts and updates',
    appearance: 'Appearance',
    appearanceDesc: 'Customize the look and feel of your dashboard',
    language: 'Language',
    languageDesc: 'Set your preferred language for the interface',
    privacy: 'Privacy',
    privacyDesc: 'Control your visibility and data sharing preferences',
    emailAlerts: 'Email Alerts',
    emailAlertsDesc: 'Receive notifications via email for important updates',
    smsNotifications: 'SMS Notifications',
    smsNotificationsDesc: 'Get text messages for urgent alerts',
    appointmentReminders: 'Appointment Reminders',
    appointmentRemindersDesc: 'Receive reminders before scheduled appointments',
    labResultAlerts: 'Lab Result Alerts',
    labResultAlertsDesc: 'Get notified when lab results are ready',
    lowStockWarnings: 'Low Stock Warnings',
    lowStockWarningsDesc: 'Alert when medication inventory is running low',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    textSize: 'Text Size',
    textSizePx: 'px',
    preferredLanguage: 'Preferred Language',
    english: 'English',
    arabic: 'العربية',
    showProfileToPatients: 'Show Profile to Patients',
    showProfileToPatientDesc: 'Allow patients to view your professional profile',
    shareAvailability: 'Share Availability Publicly',
    shareAvailabilityDesc: 'Let patients see your available time slots online',
    saveSettings: 'Save Settings',
    saved: 'Settings Saved',
    savedDesc: 'Your settings have been saved successfully.',
  },
  ar: {
    settings: 'الإعدادات',
    settingsDesc: 'إدارة تفضيلات العيادة وإعدادات الحساب',
    notifications: 'الإشعارات',
    notificationsDesc: 'إعداد طريقة تلقي التنبيهات والتحديثات',
    appearance: 'المظهر',
    appearanceDesc: 'تخصيص شكل ومظهر لوحة التحكم',
    language: 'اللغة',
    languageDesc: 'تعيين اللغة المفضلة للواجهة',
    privacy: 'الخصوصية',
    privacyDesc: 'التحكم في إعدادات الظهور ومشاركة البيانات',
    emailAlerts: 'تنبيهات البريد',
    emailAlertsDesc: 'تلقي الإشعارات عبر البريد الإلكتروني للتحديثات المهمة',
    smsNotifications: 'إشعارات الرسائل',
    smsNotificationsDesc: 'الحصول على رسائل نصية للتنبيهات العاجلة',
    appointmentReminders: 'تذكيرات المواعيد',
    appointmentRemindersDesc: 'تلقي تذكيرات قبل المواعيد المحددة',
    labResultAlerts: 'تنبيهات نتائج المختبر',
    labResultAlertsDesc: 'إشعار عند جاهزية نتائج المختبر',
    lowStockWarnings: 'تحذيرات المخزون المنخفض',
    lowStockWarningsDesc: 'تنبيه عند انخفاض مخزون الأدوية',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
    textSize: 'حجم الخط',
    textSizePx: 'بكسل',
    preferredLanguage: 'اللغة المفضلة',
    english: 'English',
    arabic: 'العربية',
    showProfileToPatients: 'عرض الملف الشخصي للمرضى',
    showProfileToPatientDesc: 'السماح للمرضى بعرض ملفك المهني',
    shareAvailability: 'مشاركة أوقات الدوام',
    shareAvailabilityDesc: 'السماح للمرضى برؤية أوقاتك المتاحة عبر الإنترنت',
    saveSettings: 'حفظ الإعدادات',
    saved: 'تم الحفظ',
    savedDesc: 'تم حفظ الإعدادات بنجاح.',
  },
}

export default function SettingsPage() {
  const { locale } = useDirection()
  const t = hp[locale]
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Notification switches
  const [emailAlerts, setEmailAlerts] = React.useState(true)
  const [smsNotifications, setSmsNotifications] = React.useState(true)
  const [appointmentReminders, setAppointmentReminders] = React.useState(true)
  const [labResultAlerts, setLabResultAlerts] = React.useState(false)
  const [lowStockWarnings, setLowStockWarnings] = React.useState(true)

  // Appearance
  const [theme, setTheme] = React.useState('system')
  const [textSize, setTextSize] = React.useState([16])

  // Language
  const [preferredLanguage, setPreferredLanguage] = React.useState('en')

  // Privacy
  const [showProfile, setShowProfile] = React.useState(true)
  const [shareAvailability, setShareAvailability] = React.useState(false)

  const handleSave = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    toast({ title: t.saved, description: t.savedDesc, variant: 'success' })
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

      <div className="space-y-6">
        {/* Notifications Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>{t.notifications}</CardTitle>
                <CardDescription>{t.notificationsDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-alerts" className="font-medium">{t.emailAlerts}</Label>
                  <p className="text-sm text-muted-foreground">{t.emailAlertsDesc}</p>
                </div>
                <Switch id="email-alerts" checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications" className="font-medium">{t.smsNotifications}</Label>
                  <p className="text-sm text-muted-foreground">{t.smsNotificationsDesc}</p>
                </div>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment-reminders" className="font-medium">{t.appointmentReminders}</Label>
                  <p className="text-sm text-muted-foreground">{t.appointmentRemindersDesc}</p>
                </div>
                <Switch id="appointment-reminders" checked={appointmentReminders} onCheckedChange={setAppointmentReminders} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="lab-result-alerts" className="font-medium">{t.labResultAlerts}</Label>
                  <p className="text-sm text-muted-foreground">{t.labResultAlertsDesc}</p>
                </div>
                <Switch id="lab-result-alerts" checked={labResultAlerts} onCheckedChange={setLabResultAlerts} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="low-stock-warnings" className="font-medium">{t.lowStockWarnings}</Label>
                  <p className="text-sm text-muted-foreground">{t.lowStockWarningsDesc}</p>
                </div>
                <Switch id="low-stock-warnings" checked={lowStockWarnings} onCheckedChange={setLowStockWarnings} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PaintBrush className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>{t.appearance}</CardTitle>
                <CardDescription>{t.appearanceDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="font-medium">{t.theme}</Label>
                <RadioGroup value={theme} onValueChange={setTheme} className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="cursor-pointer">{t.light}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="cursor-pointer">{t.dark}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system" className="cursor-pointer">{t.system}</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">{t.textSize}</Label>
                  <span className="text-sm text-muted-foreground">
                    {textSize[0]}{t.textSizePx}
                  </span>
                </div>
                <Slider
                  value={textSize}
                  onValueChange={setTextSize}
                  min={14}
                  max={20}
                  step={1}
                  aria-label={t.textSize}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>{t.language}</CardTitle>
                <CardDescription>{t.languageDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label className="font-medium">{t.preferredLanguage}</Label>
              <RadioGroup value={preferredLanguage} onValueChange={setPreferredLanguage}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="en" id="lang-en" />
                  <Label htmlFor="lang-en" className="cursor-pointer">{t.english}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="ar" id="lang-ar" />
                  <Label htmlFor="lang-ar" className="cursor-pointer">{t.arabic}</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>{t.privacy}</CardTitle>
                <CardDescription>{t.privacyDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-profile" className="font-medium">{t.showProfileToPatients}</Label>
                  <p className="text-sm text-muted-foreground">{t.showProfileToPatientDesc}</p>
                </div>
                <Switch id="show-profile" checked={showProfile} onCheckedChange={setShowProfile} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="share-availability" className="font-medium">{t.shareAvailability}</Label>
                  <p className="text-sm text-muted-foreground">{t.shareAvailabilityDesc}</p>
                </div>
                <Switch id="share-availability" checked={shareAvailability} onCheckedChange={setShareAvailability} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} loading={isSubmitting} size="lg">
            {t.saveSettings}
          </Button>
        </div>
      </div>
    </div>
  )
}
