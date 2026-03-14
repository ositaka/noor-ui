'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUpload } from '@/components/ui/file-upload'
import { DatePicker } from '@/components/ui/date-picker'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { GraduationCap, Trophy, Star, Medal, Books, IdentificationCard } from '@phosphor-icons/react'
import { toArabicNumerals, formatOrdinal } from '@/lib/arabic-numbers'

const ep = {
  en: {
    profile: 'Student Profile',
    profileDesc: 'View and manage your academic profile',
    academic: 'Academic',
    personal: 'Personal',
    achievements: 'Achievements',
    gpa: 'GPA',
    attendanceRate: 'Attendance Rate',
    classRank: 'Class Rank',
    currentGrades: 'Current Semester Grades',
    subject: 'Subject',
    grade: 'Grade',
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    phone: 'Phone',
    email: 'Email',
    emergencyContact: 'Emergency Contact',
    emergencyContactPhone: 'Emergency Contact Phone',
    uploadPhoto: 'Upload Photo',
    saveChanges: 'Save Changes',
    profileUpdated: 'Profile Updated',
    profileUpdatedDesc: 'Your changes have been saved successfully.',
    honorRoll: 'Honor Roll 2025',
    scienceFair: 'Science Fair Winner',
    perfectAttendance: 'Perfect Attendance Q1',
    poetryCompetition: 'Arabic Poetry Competition',
    excellent: 'Excellent',
    outOf100: 'out of 100',
    outOf30: 'out of 30',
    ofDays: 'of school days',
    studentName: 'Yousef Al Dosari',
    gradeLevel: 'Grade 10, Section B',
    studentId: 'NS-1098-2024',
    math: 'Mathematics',
    physics: 'Physics',
    arabic: 'Arabic Language',
    islamic: 'Islamic Studies',
    english: 'English Language',
    cs: 'Computer Science',
    academicExcellence: 'Academic Excellence',
    scienceCategory: 'Science',
    disciplineCategory: 'Discipline',
    literatureCategory: 'Literature',
  },
  ar: {
    profile: 'الملف الشخصي',
    profileDesc: 'عرض وإدارة ملفك الأكاديمي',
    academic: 'الأكاديمي',
    personal: 'الشخصي',
    achievements: 'الإنجازات',
    gpa: 'المعدل التراكمي',
    attendanceRate: 'نسبة الحضور',
    classRank: 'الترتيب',
    currentGrades: 'درجات الفصل الحالي',
    subject: 'المادة',
    grade: 'الدرجة',
    fullName: 'الاسم الكامل',
    dateOfBirth: 'تاريخ الميلاد',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    emergencyContact: 'جهة اتصال الطوارئ',
    emergencyContactPhone: 'هاتف جهة اتصال الطوارئ',
    uploadPhoto: 'رفع صورة',
    saveChanges: 'حفظ التغييرات',
    profileUpdated: 'تم تحديث الملف',
    profileUpdatedDesc: 'تم حفظ التغييرات بنجاح.',
    honorRoll: 'لوحة الشرف ٢٠٢٥',
    scienceFair: 'معرض العلوم',
    perfectAttendance: 'حضور مثالي الربع الأول',
    poetryCompetition: 'مسابقة الشعر العربي',
    excellent: 'ممتاز',
    outOf100: 'من ١٠٠',
    outOf30: 'من ٣٠',
    ofDays: 'من أيام الدراسة',
    studentName: 'يوسف الدوسري',
    gradeLevel: 'الصف العاشر - شعبة ب',
    studentId: 'NS-1098-2024',
    math: 'الرياضيات',
    physics: 'الفيزياء',
    arabic: 'اللغة العربية',
    islamic: 'الدراسات الإسلامية',
    english: 'اللغة الإنجليزية',
    cs: 'علوم الحاسب',
    academicExcellence: 'تميز أكاديمي',
    scienceCategory: 'علوم',
    disciplineCategory: 'انضباط',
    literatureCategory: 'أدب',
  },
}

interface SubjectGrade {
  subject: string
  subjectAr: string
  grade: number
}

const currentGrades: SubjectGrade[] = [
  { subject: 'Mathematics', subjectAr: 'الرياضيات', grade: 92 },
  { subject: 'Physics', subjectAr: 'الفيزياء', grade: 85 },
  { subject: 'Arabic Language', subjectAr: 'اللغة العربية', grade: 95 },
  { subject: 'Islamic Studies', subjectAr: 'الدراسات الإسلامية', grade: 98 },
  { subject: 'English Language', subjectAr: 'اللغة الإنجليزية', grade: 88 },
  { subject: 'Computer Science', subjectAr: 'علوم الحاسب', grade: 91 },
]

interface Achievement {
  id: string
  title: string
  titleAr: string
  date: string
  dateAr: string
  category: string
  categoryAr: string
  icon: 'trophy' | 'star' | 'medal' | 'books'
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Honor Roll 2025',
    titleAr: 'لوحة الشرف ٢٠٢٥',
    date: 'June 2025',
    dateAr: 'يونيو ٢٠٢٥',
    category: 'Academic Excellence',
    categoryAr: 'تميز أكاديمي',
    icon: 'trophy',
  },
  {
    id: '2',
    title: 'Science Fair Winner',
    titleAr: 'الفائز بمعرض العلوم',
    date: 'March 2025',
    dateAr: 'مارس ٢٠٢٥',
    category: 'Science',
    categoryAr: 'علوم',
    icon: 'star',
  },
  {
    id: '3',
    title: 'Perfect Attendance Q1',
    titleAr: 'حضور مثالي الربع الأول',
    date: 'October 2025',
    dateAr: 'أكتوبر ٢٠٢٥',
    category: 'Discipline',
    categoryAr: 'انضباط',
    icon: 'medal',
  },
  {
    id: '4',
    title: 'Arabic Poetry Competition',
    titleAr: 'مسابقة الشعر العربي',
    date: 'December 2025',
    dateAr: 'ديسمبر ٢٠٢٥',
    category: 'Literature',
    categoryAr: 'أدب',
    icon: 'books',
  },
]

const achievementIcons = {
  trophy: Trophy,
  star: Star,
  medal: Medal,
  books: Books,
}

function getGradeColor(grade: number): string {
  if (grade >= 90) return 'text-success'
  if (grade >= 80) return 'text-info'
  if (grade >= 70) return 'text-warning'
  return 'text-destructive'
}

export default function ProfilePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = ep[locale]
  const { toast } = useToast()

  // Personal form state
  const [fullName, setFullName] = React.useState(isRTL ? 'يوسف الدوسري' : 'Yousef Al Dosari')
  const [dateOfBirth, setDateOfBirth] = React.useState('2010-05-14')
  const [phone, setPhone] = React.useState('+966 50 123 4567')
  const [email, setEmail] = React.useState('yousef.dosari@alnoor.edu.sa')
  const [emergencyContact, setEmergencyContact] = React.useState(
    isRTL ? 'محمد الدوسري' : 'Mohammed Al Dosari'
  )
  const [emergencyPhone, setEmergencyPhone] = React.useState('+966 50 987 6543')
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSaving(false)
    toast({
      title: t.profileUpdated,
      description: t.profileUpdatedDesc,
      variant: 'success',
    })
  }

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl overflow-hidden">
            <img src="/examples/education/avatars/yousef.jpg" alt="" className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t.studentName}</h1>
            <p className="text-muted-foreground">{t.gradeLevel}</p>
            <Badge variant="outline" className="mt-1 text-xs">
              <IdentificationCard className="h-3 w-3 me-1" />
              <span dir="ltr">{t.studentId}</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="academic">
        <TabsList className="mb-6">
          <TabsTrigger value="academic">{t.academic}</TabsTrigger>
          <TabsTrigger value="personal">{t.personal}</TabsTrigger>
          <TabsTrigger value="achievements">{t.achievements}</TabsTrigger>
        </TabsList>

        {/* Academic Tab */}
        <TabsContent value="academic">
          <div className="grid gap-6 lg:grid-cols-3 mb-6">
            {/* GPA Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t.gpa}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-bold">
                    {isRTL ? `${toArabicNumerals(92)}` : '92'}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    /{isRTL ? toArabicNumerals(100) : '100'}
                  </span>
                </div>
                <Progress value={92} className="h-2 mb-2" aria-label={t.gpa} />
                <Badge variant="default">{t.excellent}</Badge>
              </CardContent>
            </Card>

            {/* Attendance Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t.attendanceRate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-bold">
                    {isRTL ? `${toArabicNumerals(94)}٪` : '94%'}
                  </span>
                </div>
                <Progress value={94} className="h-2 mb-2" aria-label={t.attendanceRate} />
                <span className="text-sm text-muted-foreground">{t.ofDays}</span>
              </CardContent>
            </Card>

            {/* Class Rank Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t.classRank}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-bold">{formatOrdinal(5, locale)}</span>
                </div>
                <span className="text-sm text-muted-foreground">{t.outOf30}</span>
              </CardContent>
            </Card>
          </div>

          {/* Current Semester Grades */}
          <Card>
            <CardHeader>
              <CardTitle>{t.currentGrades}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Header row */}
                <div className="flex items-center justify-between py-2 px-3 text-sm font-medium text-muted-foreground">
                  <span>{t.subject}</span>
                  <span>{t.grade}</span>
                </div>
                <Separator />
                {/* Grade rows */}
                {currentGrades.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {isRTL ? item.subjectAr : item.subject}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold font-mono ${getGradeColor(item.grade)}`}>
                        {isRTL ? toArabicNumerals(item.grade) : item.grade}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        /{isRTL ? toArabicNumerals(100) : '100'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personal Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>{t.personal}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t.fullName}</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.dateOfBirth}</Label>
                  <DatePicker
                    placeholder={t.dateOfBirth}
                    placeholderAr="تاريخ الميلاد"
                    showHijri
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">{t.emergencyContact}</Label>
                  <Input
                    id="emergencyContact"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">{t.emergencyContactPhone}</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    dir="ltr"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <Label>{t.uploadPhoto}</Label>
                <FileUpload accept="image/*" maxSize={5 * 1024 * 1024} />
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={handleSave} loading={isSaving}>
                  {t.saveChanges}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement) => {
              const Icon = achievementIcons[achievement.icon]
              return (
                <Card key={achievement.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1">
                          {isRTL ? achievement.titleAr : achievement.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {isRTL ? achievement.dateAr : achievement.date}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {isRTL ? achievement.categoryAr : achievement.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
