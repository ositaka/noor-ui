'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DatePicker } from '@/components/ui/date-picker'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { Shield, IdentificationCard, CheckCircle } from '@phosphor-icons/react'

const gp = {
  en: {
    profile: 'My Profile',
    profileDesc: 'View and manage your personal information',
    personal: 'Personal Details',
    security: 'Security',
    history: 'Service History',
    fullName: 'Full Name',
    fullNameAr: 'Full Name (Arabic)',
    nationalId: 'National ID',
    dateOfBirth: 'Date of Birth',
    nationality: 'Nationality',
    phone: 'Phone Number',
    email: 'Email Address',
    address: 'Address',
    poBox: 'P.O. Box',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    twoFactor: 'Two-Factor Authentication',
    twoFactorDesc: 'Enabled via Digital ID',
    lastLogin: 'Last Login',
    lastLoginValue: 'Today at 9:15 AM',
    loginHistory: 'Recent Login History',
    saveChanges: 'Save Changes',
    profileUpdated: 'Profile Updated',
    profileUpdatedDesc: 'Your changes have been saved successfully.',
    egypt: 'Egypt',
  },
  ar: {
    profile: 'ملفي الشخصي',
    profileDesc: 'عرض وإدارة معلوماتك الشخصية',
    personal: 'البيانات الشخصية',
    security: 'الأمان',
    history: 'سجل الخدمات',
    fullName: 'الاسم الكامل',
    fullNameAr: 'الاسم الكامل (عربي)',
    nationalId: 'الهوية الوطنية',
    dateOfBirth: 'تاريخ الميلاد',
    nationality: 'الجنسية',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    poBox: 'صندوق بريد',
    changePassword: 'تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور الجديدة',
    twoFactor: 'المصادقة الثنائية',
    twoFactorDesc: 'مفعّلة عبر الهوية الرقمية',
    lastLogin: 'آخر تسجيل دخول',
    lastLoginValue: 'اليوم الساعة ٩:١٥ صباحاً',
    loginHistory: 'سجل الدخول الأخير',
    saveChanges: 'حفظ التغييرات',
    profileUpdated: 'تم تحديث الملف',
    profileUpdatedDesc: 'تم حفظ التغييرات بنجاح.',
    egypt: 'مصر',
  },
}

export default function GovernmentProfilePage() {
  const { locale } = useDirection()
  const t = gp[locale]
  const { toast } = useToast()
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSaving(false)
    toast({ title: t.profileUpdated, description: t.profileUpdatedDesc, variant: 'success' })
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Shield className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-bold ltr:tracking-tight">{t.profile}</h1>
          <p className="text-muted-foreground text-sm">{t.profileDesc}</p>
        </div>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">{t.personal}</TabsTrigger>
          <TabsTrigger value="security">{t.security}</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>{t.personal}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t.fullName}</Label>
                  <Input id="fullName" dir="ltr" defaultValue="Ahmed Mohammed Al Falasi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullNameAr">{t.fullNameAr}</Label>
                  <Input id="fullNameAr" dir="rtl" defaultValue="أحمد محمد الفلاسي" />
                </div>
                <div className="space-y-2">
                  <Label>{t.nationalId}</Label>
                  <div className="flex items-center gap-2">
                    <Input dir="ltr" defaultValue="784-1990-1234567-1" disabled />
                    <Badge variant="outline">
                      <IdentificationCard className="h-3 w-3 me-1" aria-hidden="true" />
                      {locale === 'ar' ? 'موثق' : 'Verified'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t.dateOfBirth}</Label>
                  <DatePicker
                    date={new Date(1990, 4, 15)}
                    placeholder={t.dateOfBirth}
                    disabled
                    className="w-full disabled:hover:bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.nationality}</Label>
                  <Input defaultValue={t.egypt} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input id="phone" dir="ltr" defaultValue="+971 50 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input id="email" dir="ltr" defaultValue="ahmed.falasi@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pobox">{t.poBox}</Label>
                  <Input id="pobox" dir="ltr" defaultValue="P.O. Box 12345" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleSave} loading={isSaving}>
                  {t.saveChanges}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>{t.changePassword}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <Button onClick={handleSave} loading={isSaving}>
                  {t.saveChanges}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.twoFactor}</CardTitle>
                <CardDescription>{t.twoFactorDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/30">
                  <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
                  <span className="text-sm font-medium">{t.twoFactorDesc}</span>
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground">
                  <p>{t.lastLogin}: {t.lastLoginValue}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
