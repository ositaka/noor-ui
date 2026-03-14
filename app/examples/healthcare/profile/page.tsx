'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { FileUpload } from '@/components/ui/file-upload'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { Stethoscope, Certificate, CalendarDots, Phone, Envelope, MapPin } from '@phosphor-icons/react'

const hp = {
  en: {
    profile: 'Profile',
    backToDashboard: 'Back to Dashboard',
    personalInfo: 'Personal Info',
    qualifications: 'Qualifications',
    availability: 'Availability',
    specialty: 'Specialty',
    generalPractitioner: 'General Practitioner',
    medicalLicense: 'Medical License',
    licenseNumber: 'DHA-GP-2024-08712',
    email: 'Email',
    emailValue: 'layla.hassan@alnoor.ae',
    phone: 'Phone',
    phoneValue: '+971 50 987 6543',
    fullName: 'Full Name',
    fullNameValue: 'Dr. Layla Hassan',
    address: 'Address',
    addressValue: 'Al Noor Medical Center, Dubai Healthcare City',
    saveChanges: 'Save Changes',
    profileUpdated: 'Profile Updated',
    profileUpdatedDesc: 'Your changes have been saved successfully.',
    certifications: 'Certifications',
    mbbsTitle: 'MBBS - UAE University',
    mbbsYear: '2010',
    boardTitle: 'Board Certified - DHA',
    boardYear: '2015',
    pediatricTitle: 'Pediatric Care Certificate',
    pediatricYear: '2020',
    uploadCertificate: 'Upload New Certificate',
    weeklySchedule: 'Weekly Schedule',
    timeSlot: '8:00 AM - 4:00 PM',
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
  },
  ar: {
    profile: 'الملف الشخصي',
    backToDashboard: 'العودة للوحة التحكم',
    personalInfo: 'المعلومات الشخصية',
    qualifications: 'المؤهلات',
    availability: 'أوقات الدوام',
    specialty: 'التخصص',
    generalPractitioner: 'طبيبة عامة',
    medicalLicense: 'رخصة طبية',
    licenseNumber: 'DHA-GP-2024-08712',
    email: 'البريد الإلكتروني',
    emailValue: 'layla.hassan@alnoor.ae',
    phone: 'الهاتف',
    phoneValue: '+971 50 987 6543',
    fullName: 'الاسم الكامل',
    fullNameValue: 'د. ليلى حسن',
    address: 'العنوان',
    addressValue: 'مركز النور الطبي، مدينة دبي الطبية',
    saveChanges: 'حفظ التغييرات',
    profileUpdated: 'تم تحديث الملف',
    profileUpdatedDesc: 'تم حفظ التغييرات بنجاح.',
    certifications: 'الشهادات',
    mbbsTitle: 'بكالوريوس الطب والجراحة - جامعة الإمارات',
    mbbsYear: '٢٠١٠',
    boardTitle: 'شهادة البورد - هيئة الصحة بدبي',
    boardYear: '٢٠١٥',
    pediatricTitle: 'شهادة رعاية الأطفال',
    pediatricYear: '٢٠٢٠',
    uploadCertificate: 'رفع شهادة جديدة',
    weeklySchedule: 'الجدول الأسبوعي',
    timeSlot: '٨:٠٠ ص - ٤:٠٠ م',
    sunday: 'الأحد',
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
  },
}

const defaultSchedule = {
  sunday: true,
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: false,
  saturday: false,
}

type DayKey = keyof typeof defaultSchedule

export default function ProfilePage() {
  const { locale } = useDirection()
  const t = hp[locale]
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [name, setName] = React.useState(t.fullNameValue)
  const [phone, setPhone] = React.useState(t.phoneValue)
  const [email, setEmail] = React.useState(t.emailValue)
  const [address, setAddress] = React.useState(t.addressValue)
  const [schedule, setSchedule] = React.useState(defaultSchedule)

  const handleSave = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    toast({ title: t.profileUpdated, description: t.profileUpdatedDesc, variant: 'success' })
  }

  const toggleDay = (day: DayKey) => {
    setSchedule((prev) => ({ ...prev, [day]: !prev[day] }))
  }

  const days: { key: DayKey; label: string }[] = [
    { key: 'sunday', label: t.sunday },
    { key: 'monday', label: t.monday },
    { key: 'tuesday', label: t.tuesday },
    { key: 'wednesday', label: t.wednesday },
    { key: 'thursday', label: t.thursday },
    { key: 'friday', label: t.friday },
    { key: 'saturday', label: t.saturday },
  ]

  const certifications = [
    { title: t.mbbsTitle, year: t.mbbsYear },
    { title: t.boardTitle, year: t.boardYear },
    { title: t.pediatricTitle, year: t.pediatricYear },
  ]

  return (
    <div className="container py-8">
      {/* Back button */}
      <div className="mb-6">
        <ButtonArrow direction="back" variant="ghost" asChild>
          <Link href="/examples/healthcare">
            {t.backToDashboard}
          </Link>
        </ButtonArrow>
      </div>

      {/* Profile header card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Initials avatar */}
            <div className="h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary">LH</span>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {locale === 'ar' ? 'د. ليلى حسن' : 'Dr. Layla Hassan'}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{t.generalPractitioner}</span>
                </div>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                  <Certificate className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{t.medicalLicense}:</span>
                  <Badge variant="outline" className="whitespace-nowrap"><span dir="ltr">{t.licenseNumber}</span></Badge>
                </div>
                <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                  <Envelope className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground" dir="ltr">{t.emailValue}</span>
                </div>
                <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground" dir="ltr">{t.phoneValue}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">{t.personalInfo}</TabsTrigger>
          <TabsTrigger value="qualifications">{t.qualifications}</TabsTrigger>
          <TabsTrigger value="availability">{t.availability}</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>{t.personalInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">{t.fullName}</Label>
                    <Input
                      id="profile-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-phone">{t.phone}</Label>
                    <Input
                      id="profile-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
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
                  <div className="space-y-2">
                    <Label htmlFor="profile-address">{t.address}</Label>
                    <Input
                      id="profile-address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} loading={isSubmitting}>
                    {t.saveChanges}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Qualifications Tab */}
        <TabsContent value="qualifications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.certifications}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <React.Fragment key={cert.title}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Certificate className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{cert.title}</p>
                            <p className="text-xs text-muted-foreground">{cert.year}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{cert.year}</Badge>
                      </div>
                      {index < certifications.length - 1 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.uploadCertificate}</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={10 * 1024 * 1024}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDots className="h-5 w-5" />
                {t.weeklySchedule}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {days.map((day, index) => (
                  <React.Fragment key={day.key}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Switch
                          id={`day-${day.key}`}
                          checked={schedule[day.key]}
                          onCheckedChange={() => toggleDay(day.key)}
                        />
                        <Label htmlFor={`day-${day.key}`} className="cursor-pointer font-medium">
                          {day.label}
                        </Label>
                      </div>
                      {schedule[day.key] && (
                        <span className="text-sm text-muted-foreground" dir="ltr">
                          {t.timeSlot}
                        </span>
                      )}
                    </div>
                    {index < days.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
