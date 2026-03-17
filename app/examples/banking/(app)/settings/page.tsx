'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { GearSix, Bell, ShieldCheck, PaintBrush, Globe, Lock } from '@phosphor-icons/react'

const gt = {
  en: {
    title: 'Settings',
    subtitle: 'Manage your account preferences and security',
    notifications: 'Notifications',
    notificationsDesc: 'Configure how you receive alerts and updates',
    security: 'Security',
    securityDesc: 'Protect your account with additional security measures',
    appearance: 'Appearance',
    appearanceDesc: 'Customize the look and feel of your banking dashboard',
    language: 'Language & Region',
    languageDesc: 'Set your preferred language and regional settings',
    emailNotifs: 'Email Notifications',
    emailNotifsDesc: 'Receive transaction alerts and statements via email',
    smsNotifs: 'SMS Notifications',
    smsNotifsDesc: 'Get text messages for important account activities',
    pushNotifs: 'Push Notifications',
    pushNotifsDesc: 'Receive real-time alerts on your mobile device',
    transferAlerts: 'Transfer Alerts',
    transferAlertsDesc: 'Get notified for all incoming and outgoing transfers',
    loginAlerts: 'Login Alerts',
    loginAlertsDesc: 'Receive alerts when your account is accessed from a new device',
    twoFactor: 'Two-Factor Authentication',
    twoFactorDesc: 'Add an extra layer of security to your account',
    biometric: 'Biometric Login',
    biometricDesc: 'Use Face ID or fingerprint to sign in',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    updatePassword: 'Update Password',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    textSize: 'Text Size',
    px: 'px',
    preferredLanguage: 'Preferred Language',
    english: 'English',
    arabic: 'العربية',
    currency: 'Currency Display',
    aedCurrency: 'AED (د.إ)',
    sarCurrency: 'SAR (ر.س)',
    saveSettings: 'Save Settings',
    saved: 'Settings Saved',
    savedDesc: 'Your settings have been saved successfully.',
    passwordUpdated: 'Password Updated',
    passwordUpdatedDesc: 'Your password has been changed successfully.',
    cancel: 'Cancel',
  },
  ar: {
    title: 'الإعدادات',
    subtitle: 'إدارة تفضيلات حسابك والأمان',
    notifications: 'الإشعارات',
    notificationsDesc: 'إعداد طريقة تلقي التنبيهات والتحديثات',
    security: 'الأمان',
    securityDesc: 'حماية حسابك بإجراءات أمان إضافية',
    appearance: 'المظهر',
    appearanceDesc: 'تخصيص شكل ومظهر لوحة التحكم المصرفية',
    language: 'اللغة والمنطقة',
    languageDesc: 'تعيين اللغة المفضلة والإعدادات الإقليمية',
    emailNotifs: 'إشعارات البريد',
    emailNotifsDesc: 'تلقي تنبيهات المعاملات وكشوف الحساب عبر البريد',
    smsNotifs: 'إشعارات الرسائل',
    smsNotifsDesc: 'الحصول على رسائل نصية للأنشطة المهمة',
    pushNotifs: 'الإشعارات الفورية',
    pushNotifsDesc: 'تلقي تنبيهات فورية على جهازك',
    transferAlerts: 'تنبيهات التحويلات',
    transferAlertsDesc: 'إشعار لجميع التحويلات الواردة والصادرة',
    loginAlerts: 'تنبيهات الدخول',
    loginAlertsDesc: 'تلقي تنبيه عند الوصول لحسابك من جهاز جديد',
    twoFactor: 'المصادقة الثنائية',
    twoFactorDesc: 'إضافة طبقة أمان إضافية لحسابك',
    biometric: 'تسجيل الدخول بالبصمة',
    biometricDesc: 'استخدام بصمة الوجه أو الإصبع لتسجيل الدخول',
    changePassword: 'تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور الجديدة',
    updatePassword: 'تحديث كلمة المرور',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
    textSize: 'حجم الخط',
    px: 'بكسل',
    preferredLanguage: 'اللغة المفضلة',
    english: 'English',
    arabic: 'العربية',
    currency: 'عرض العملة',
    aedCurrency: 'د.إ (AED)',
    sarCurrency: 'ر.س (SAR)',
    saveSettings: 'حفظ الإعدادات',
    saved: 'تم الحفظ',
    savedDesc: 'تم حفظ الإعدادات بنجاح.',
    passwordUpdated: 'تم تحديث كلمة المرور',
    passwordUpdatedDesc: 'تم تغيير كلمة المرور بنجاح.',
    cancel: 'إلغاء',
  },
}

export default function SettingsPage() {
  const { locale } = useDirection()
  const t = gt[locale]
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [emailNotifs, setEmailNotifs] = React.useState(true)
  const [smsNotifs, setSmsNotifs] = React.useState(true)
  const [pushNotifs, setPushNotifs] = React.useState(true)
  const [transferAlerts, setTransferAlerts] = React.useState(true)
  const [loginAlerts, setLoginAlerts] = React.useState(false)
  const [twoFactor, setTwoFactor] = React.useState(true)
  const [biometric, setBiometric] = React.useState(true)
  const [theme, setTheme] = React.useState('system')
  const [textSize, setTextSize] = React.useState([16])
  const [preferredLanguage, setPreferredLanguage] = React.useState('en')
  const [showPasswordDialog, setShowPasswordDialog] = React.useState(false)

  const handleSave = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    toast({ title: t.saved, description: t.savedDesc, variant: 'success' })
  }

  const handlePasswordChange = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    setShowPasswordDialog(false)
    toast({ title: t.passwordUpdated, description: t.passwordUpdatedDesc, variant: 'success' })
  }

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <GearSix className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-3xl font-bold ltr:tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
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
              {[
                { id: 'email', label: t.emailNotifs, desc: t.emailNotifsDesc, checked: emailNotifs, onChange: setEmailNotifs },
                { id: 'sms', label: t.smsNotifs, desc: t.smsNotifsDesc, checked: smsNotifs, onChange: setSmsNotifs },
                { id: 'push', label: t.pushNotifs, desc: t.pushNotifsDesc, checked: pushNotifs, onChange: setPushNotifs },
                { id: 'transfer', label: t.transferAlerts, desc: t.transferAlertsDesc, checked: transferAlerts, onChange: setTransferAlerts },
                { id: 'login', label: t.loginAlerts, desc: t.loginAlertsDesc, checked: loginAlerts, onChange: setLoginAlerts },
              ].map((item, i, arr) => (
                <React.Fragment key={item.id}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.id} className="font-medium">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch id={item.id} checked={item.checked} onCheckedChange={item.onChange} />
                  </div>
                  {i < arr.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>{t.security}</CardTitle>
                <CardDescription>{t.securityDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="2fa" className="font-medium">{t.twoFactor}</Label>
                  <p className="text-sm text-muted-foreground">{t.twoFactorDesc}</p>
                </div>
                <Switch id="2fa" checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="biometric" className="font-medium">{t.biometric}</Label>
                  <p className="text-sm text-muted-foreground">{t.biometricDesc}</p>
                </div>
                <Switch id="biometric" checked={biometric} onCheckedChange={setBiometric} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    {t.changePassword}
                  </Label>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowPasswordDialog(true)}>
                  {t.changePassword}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
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
                  {[
                    { value: 'light', label: t.light },
                    { value: 'dark', label: t.dark },
                    { value: 'system', label: t.system },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center gap-2">
                      <RadioGroupItem value={opt.value} id={`theme-${opt.value}`} />
                      <Label htmlFor={`theme-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">{t.textSize}</Label>
                  <span className="text-sm text-muted-foreground">{textSize[0]}{t.px}</span>
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

        {/* Language */}
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

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} loading={isSubmitting} size="lg">
            {t.saveSettings}
          </Button>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.changePassword}</DialogTitle>
            <DialogDescription className="sr-only">{t.changePassword}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-pw">{t.currentPassword}</Label>
              <Input id="current-pw" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-pw">{t.newPassword}</Label>
              <Input id="new-pw" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pw">{t.confirmPassword}</Label>
              <Input id="confirm-pw" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>{t.cancel}</Button>
            <Button onClick={handlePasswordChange} loading={isSubmitting}>{t.updatePassword}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
