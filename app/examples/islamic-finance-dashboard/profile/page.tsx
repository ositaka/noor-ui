'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { User, Wallet, PiggyBank, CurrencyDollar, CheckCircle, ShieldCheck } from '@phosphor-icons/react'

const fp = {
  en: {
    profile: 'Profile',
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    nationalId: 'National ID',
    address: 'Address',
    saveChanges: 'Save Changes',
    profileUpdated: 'Profile Updated',
    profileUpdatedDesc: 'Your changes have been saved successfully.',
    accountSummary: 'Account Summary',
    totalBalance: 'Total Balance',
    investments: 'Investments',
    zakatPaid: 'Zakat Paid',
    shariahCompliance: 'Shariah Compliance',
    fullyCompliant: 'Fully Compliant',
    complianceDesc: 'All your investments are compliant with Islamic Shariah principles.',
    memberSince: 'Member since',
  },
  ar: {
    profile: 'الملف الشخصي',
    personalInfo: 'المعلومات الشخصية',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    nationalId: 'الهوية الوطنية',
    address: 'العنوان',
    saveChanges: 'حفظ التغييرات',
    profileUpdated: 'تم تحديث الملف',
    profileUpdatedDesc: 'تم حفظ التغييرات بنجاح.',
    accountSummary: 'ملخص الحساب',
    totalBalance: 'الرصيد الإجمالي',
    investments: 'الاستثمارات',
    zakatPaid: 'الزكاة المدفوعة',
    shariahCompliance: 'التوافق الشرعي',
    fullyCompliant: 'متوافق بالكامل',
    complianceDesc: 'جميع استثماراتك متوافقة مع أحكام الشريعة الإسلامية.',
    memberSince: 'عضو منذ',
  },
}

export default function ProfilePage() {
  const { locale } = useDirection()
  const t = fp[locale]
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [fullName, setFullName] = React.useState(
    locale === 'ar' ? 'عبدالرحمن الشمري' : 'Abdulrahman Al Shammari'
  )
  const [email, setEmail] = React.useState('abdulrahman@email.com')
  const [phone, setPhone] = React.useState('+966 50 123 4567')
  const [nationalId, setNationalId] = React.useState('1098765432')
  const [address, setAddress] = React.useState(
    locale === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'
  )

  const handleSave = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    toast({ title: t.profileUpdated, description: t.profileUpdatedDesc, variant: 'success' })
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Initials Avatar */}
            <div className="h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary">AS</span>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {locale === 'ar' ? 'عبدالرحمن الشمري' : 'Abdulrahman Al Shammari'}
                </h1>
                <p className="text-sm text-muted-foreground" dir="ltr">abdulrahman@email.com</p>
              </div>

              <Badge variant="secondary">
                {t.memberSince} {locale === 'ar' ? '٢٠٢٣' : '2023'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-column layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <CardTitle>{t.personalInfo}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">{t.fullName}</Label>
                    <Input
                      id="profile-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-email">{t.email}</Label>
                    <Input
                      id="profile-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profile-phone">{t.phone}</Label>
                    <Input
                      id="profile-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-national-id">{t.nationalId}</Label>
                    <Input
                      id="profile-national-id"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-address">{t.address}</Label>
                  <Input
                    id="profile-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} loading={isSubmitting}>
                    {t.saveChanges}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - 1/3 */}
        <div className="space-y-6">
          {/* Account Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <CardTitle>{t.accountSummary}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.totalBalance}</span>
                <span className="font-semibold">
                  <ArabicNumber value={68175} format="currency" />
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.investments}</span>
                <span className="font-semibold">
                  <ArabicNumber value={255000} format="currency" />
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.zakatPaid}</span>
                <span className="font-semibold text-success">
                  <ArabicNumber value={625} format="currency" />
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Shariah Compliance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <CardTitle>{t.shariahCompliance}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
                <Badge variant="outline" className="border-success text-success">
                  {t.fullyCompliant}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{t.complianceDesc}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
