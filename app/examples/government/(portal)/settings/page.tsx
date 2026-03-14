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
import { Gear, Bell, Globe } from '@phosphor-icons/react'

const gs = {
  en: {
    settings: 'Settings',
    settingsDesc: 'Manage your portal preferences',
    notifications: 'Notifications',
    notificationsDesc: 'Choose which notifications you want to receive',
    language: 'Language',
    languageDesc: 'Choose your preferred language',
    applicationUpdates: 'Application Status Updates',
    applicationUpdatesDesc: 'Get notified when your application status changes',
    documentReminders: 'Document Expiry Reminders',
    documentRemindersDesc: 'Get notified when documents are about to expire',
    serviceAlerts: 'New Service Alerts',
    serviceAlertsDesc: 'Receive notifications about new government services',
    paymentNotifications: 'Payment Notifications',
    paymentNotificationsDesc: 'Get notified about pending and completed payments',
    smsNotifications: 'SMS Notifications',
    smsNotificationsDesc: 'Receive important updates via SMS',
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
    language: 'اللغة',
    languageDesc: 'اختر لغتك المفضلة',
    applicationUpdates: 'تحديثات حالة الطلبات',
    applicationUpdatesDesc: 'إشعار عند تغيير حالة طلبك',
    documentReminders: 'تذكيرات انتهاء المستندات',
    documentRemindersDesc: 'إشعار عند اقتراب انتهاء صلاحية المستندات',
    serviceAlerts: 'تنبيهات الخدمات الجديدة',
    serviceAlertsDesc: 'استقبال إشعارات حول الخدمات الحكومية الجديدة',
    paymentNotifications: 'إشعارات الدفع',
    paymentNotificationsDesc: 'إشعار حول المدفوعات المعلقة والمكتملة',
    smsNotifications: 'إشعارات الرسائل النصية',
    smsNotificationsDesc: 'استقبال التحديثات المهمة عبر الرسائل النصية',
    english: 'English',
    arabic: 'العربية',
    saveChanges: 'حفظ التغييرات',
    saved: 'تم الحفظ',
    savedDesc: 'تم حفظ الإعدادات بنجاح.',
  },
}

export default function GovernmentSettingsPage() {
  const { locale } = useDirection()
  const t = gs[locale]
  const { toast } = useToast()

  const [applicationUpdates, setApplicationUpdates] = React.useState(true)
  const [documentReminders, setDocumentReminders] = React.useState(true)
  const [serviceAlerts, setServiceAlerts] = React.useState(true)
  const [paymentNotifications, setPaymentNotifications] = React.useState(true)
  const [smsNotifications, setSmsNotifications] = React.useState(false)
  const [language, setLanguage] = React.useState(locale === 'ar' ? 'ar' : 'en')
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSaving(false)
    toast({ title: t.saved, description: t.savedDesc, variant: 'success' })
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Gear className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-bold ltr:tracking-tight">{t.settings}</h1>
          <p className="text-muted-foreground text-sm">{t.settingsDesc}</p>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" aria-hidden="true" />
              {t.notifications}
            </CardTitle>
            <CardDescription>{t.notificationsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="applicationUpdates">{t.applicationUpdates}</Label>
                <p className="text-xs text-muted-foreground">{t.applicationUpdatesDesc}</p>
              </div>
              <Switch id="applicationUpdates" checked={applicationUpdates} onCheckedChange={setApplicationUpdates} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="documentReminders">{t.documentReminders}</Label>
                <p className="text-xs text-muted-foreground">{t.documentRemindersDesc}</p>
              </div>
              <Switch id="documentReminders" checked={documentReminders} onCheckedChange={setDocumentReminders} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="serviceAlerts">{t.serviceAlerts}</Label>
                <p className="text-xs text-muted-foreground">{t.serviceAlertsDesc}</p>
              </div>
              <Switch id="serviceAlerts" checked={serviceAlerts} onCheckedChange={setServiceAlerts} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="paymentNotifications">{t.paymentNotifications}</Label>
                <p className="text-xs text-muted-foreground">{t.paymentNotificationsDesc}</p>
              </div>
              <Switch id="paymentNotifications" checked={paymentNotifications} onCheckedChange={setPaymentNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smsNotifications">{t.smsNotifications}</Label>
                <p className="text-xs text-muted-foreground">{t.smsNotificationsDesc}</p>
              </div>
              <Switch id="smsNotifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" aria-hidden="true" />
              {t.language}
            </CardTitle>
            <CardDescription>{t.languageDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={language} onValueChange={setLanguage}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="en" id="lang-en" />
                <Label htmlFor="lang-en" className="font-normal cursor-pointer">{t.english}</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="ar" id="lang-ar" />
                <Label htmlFor="lang-ar" className="font-normal cursor-pointer">{t.arabic}</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex justify-end">
          <Button onClick={handleSave} loading={isSaving}>
            {t.saveChanges}
          </Button>
        </div>
      </div>
    </div>
  )
}
