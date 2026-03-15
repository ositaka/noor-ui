'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Switch } from '@/components/ui/switch'
import { useDirection } from '@/components/providers/direction-provider'
import {
  User,
  EnvelopeSimple,
  Phone,
  MapPin,
  Star,
  CalendarCheck,
  Bed,
  Bell,
  Lock,
  Globe,
  Check,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    title: 'My Profile',
    home: 'Home',
    personalInfo: 'Personal Information',
    personalInfoDesc: 'Manage your personal details',
    preferences: 'Preferences',
    preferencesDesc: 'Customize your experience',
    security: 'Security',
    securityDesc: 'Manage your account security',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    nationality: 'Nationality',
    language: 'Language',
    currency: 'Preferred Currency',
    saveChanges: 'Save Changes',
    memberSince: 'Member since',
    totalBookings: 'Total Bookings',
    loyaltyPoints: 'Loyalty Points',
    memberTier: 'Tier',
    gold: 'Gold',
    notifications: 'Notifications',
    emailNotif: 'Email notifications',
    emailNotifDesc: 'Receive booking confirmations and updates',
    smsNotif: 'SMS notifications',
    smsNotifDesc: 'Receive text messages for important updates',
    promoNotif: 'Promotional offers',
    promoNotifDesc: 'Receive special deals and promotions',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    updatePassword: 'Update Password',
    twoFactor: 'Two-Factor Authentication',
    twoFactorDesc: 'Add an extra layer of security to your account',
    enable: 'Enable',
    saved: 'Changes saved successfully',
    arabic: 'Arabic',
    english: 'English',
    aed: 'AED - UAE Dirham',
    sar: 'SAR - Saudi Riyal',
    qar: 'QAR - Qatari Riyal',
    uae: 'UAE',
  },
  ar: {
    title: 'ملفي الشخصي',
    home: 'الرئيسية',
    personalInfo: 'المعلومات الشخصية',
    personalInfoDesc: 'إدارة بياناتك الشخصية',
    preferences: 'التفضيلات',
    preferencesDesc: 'تخصيص تجربتك',
    security: 'الأمان',
    securityDesc: 'إدارة أمان حسابك',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    nationality: 'الجنسية',
    language: 'اللغة',
    currency: 'العملة المفضلة',
    saveChanges: 'حفظ التغييرات',
    memberSince: 'عضو منذ',
    totalBookings: 'إجمالي الحجوزات',
    loyaltyPoints: 'نقاط الولاء',
    memberTier: 'المستوى',
    gold: 'ذهبي',
    notifications: 'الإشعارات',
    emailNotif: 'إشعارات البريد الإلكتروني',
    emailNotifDesc: 'استلام تأكيدات الحجز والتحديثات',
    smsNotif: 'إشعارات الرسائل النصية',
    smsNotifDesc: 'استلام رسائل نصية للتحديثات المهمة',
    promoNotif: 'العروض الترويجية',
    promoNotifDesc: 'استلام صفقات وعروض خاصة',
    changePassword: 'تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور الجديدة',
    updatePassword: 'تحديث كلمة المرور',
    twoFactor: 'المصادقة الثنائية',
    twoFactorDesc: 'أضف طبقة حماية إضافية لحسابك',
    enable: 'تفعيل',
    saved: 'تم حفظ التغييرات بنجاح',
    arabic: 'العربية',
    english: 'English',
    aed: 'د.إ - درهم إماراتي',
    sar: 'ر.س - ريال سعودي',
    qar: 'ر.ق - ريال قطري',
    uae: 'الإمارات',
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProfilePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/hotel/home">{h.home}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{h.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-6">{h.title}</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile sidebar */}
        <div className="lg:w-72 shrink-0">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl">AF</AvatarFallback>
              </Avatar>
              <h2 className="font-bold text-lg">
                {isRTL ? 'أحمد الفلاسي' : 'Ahmed Al Falasi'}
              </h2>
              <p className="text-sm text-muted-foreground" dir="ltr">ahmed@nuzul.demo</p>
              <Badge className="mt-2 bg-warning text-warning-foreground">
                <Star className="h-3 w-3 me-1" weight="fill" />
                {h.gold}
              </Badge>

              <Separator className="my-4" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{h.memberSince}</span>
                  <span className="font-medium">2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{h.totalBookings}</span>
                  <span className="font-medium"><ArabicNumber value={12} /></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{h.loyaltyPoints}</span>
                  <span className="font-bold text-primary"><ArabicNumber value={4850} /></span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Tabs defaultValue="personal">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">
                <User className="h-4 w-4 me-1.5" />
                {h.personalInfo}
              </TabsTrigger>
              <TabsTrigger value="preferences">
                <Globe className="h-4 w-4 me-1.5" />
                {h.preferences}
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="h-4 w-4 me-1.5" />
                {h.security}
              </TabsTrigger>
            </TabsList>

            {/* Personal Info */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>{h.personalInfo}</CardTitle>
                  <CardDescription>{h.personalInfoDesc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prof-firstName">{h.firstName}</Label>
                      <Input id="prof-firstName" defaultValue={isRTL ? 'أحمد' : 'Ahmed'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prof-lastName">{h.lastName}</Label>
                      <Input id="prof-lastName" defaultValue={isRTL ? 'الفلاسي' : 'Al Falasi'} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prof-email">{h.email}</Label>
                      <Input id="prof-email" type="email" dir="ltr" defaultValue="ahmed@nuzul.demo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prof-phone">{h.phone}</Label>
                      <Input id="prof-phone" type="tel" dir="ltr" defaultValue="+971 50 123 4567" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prof-nationality">{h.nationality}</Label>
                    <Select defaultValue="uae">
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uae">{h.uae}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button>
                      <Check className="h-4 w-4 me-1.5" />
                      {h.saveChanges}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{h.preferences}</CardTitle>
                    <CardDescription>{h.preferencesDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{h.language}</Label>
                        <Select defaultValue={locale}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ar">{h.arabic}</SelectItem>
                            <SelectItem value="en">{h.english}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{h.currency}</Label>
                        <Select defaultValue="aed">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aed">{h.aed}</SelectItem>
                            <SelectItem value="sar">{h.sar}</SelectItem>
                            <SelectItem value="qar">{h.qar}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      {h.notifications}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { id: 'notif-email', label: h.emailNotif, desc: h.emailNotifDesc, defaultOn: true },
                      { id: 'notif-sms', label: h.smsNotif, desc: h.smsNotifDesc, defaultOn: true },
                      { id: 'notif-promo', label: h.promoNotif, desc: h.promoNotifDesc, defaultOn: false },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <Label htmlFor={item.id} className="cursor-pointer">
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground font-normal">{item.desc}</p>
                        </Label>
                        <Switch id={item.id} defaultChecked={item.defaultOn} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{h.changePassword}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-pw">{h.currentPassword}</Label>
                      <Input id="current-pw" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-pw">{h.newPassword}</Label>
                      <Input id="new-pw" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-pw">{h.confirmPassword}</Label>
                      <Input id="confirm-pw" type="password" />
                    </div>
                    <div className="flex justify-end">
                      <Button>{h.updatePassword}</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{h.twoFactor}</h3>
                        <p className="text-sm text-muted-foreground">{h.twoFactorDesc}</p>
                      </div>
                      <Button variant="outline">{h.enable}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
