'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HijriDate } from '@/components/ui/hijri-date'
import { Progress } from '@/components/ui/progress'
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ButtonArrow } from '@/components/ui/button-arrow'
import {
  FirstAid,
  Heart,
  Heartbeat,
  Drop,
  Syringe,
  FileText,
  FilePdf,
  Image,
  Calendar,
  Phone,
  Envelope,
  MapPin,
  DownloadSimple,
  Upload,
  Warning,
  CheckCircle,
  Clock,
  Pill,
  Stethoscope,
  Thermometer,
  Eye,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { content } from '@/lib/i18n'

const hc = {
  en: {
    title: 'Al Noor Medical Center',
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    prescriptions: 'Prescriptions',
    backToPatients: 'Back to Patients',
    patientProfile: 'Patient Profile',
    overview: 'Overview',
    medicalHistory: 'Medical History',
    prescriptionsTab: 'Prescriptions',
    documents: 'Documents',
    personalInfo: 'Personal Information',
    emiratesId: 'Emirates ID',
    dateOfBirth: 'Date of Birth',
    bloodType: 'Blood Type',
    gender: 'Gender',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    emergencyContact: 'Emergency Contact',
    allergies: 'Allergies',
    noKnownAllergies: 'No known allergies',
    vitalSigns: 'Vital Signs',
    bloodPressure: 'Blood Pressure',
    heartRate: 'Heart Rate',
    temperature: 'Temperature',
    weight: 'Weight',
    lastUpdated: 'Last updated',
    visitHistory: 'Visit History',
    date: 'Date',
    doctor: 'Doctor',
    diagnosis: 'Diagnosis',
    notes: 'Notes',
    status: 'Status',
    active: 'Active',
    resolved: 'Resolved',
    ongoing: 'Ongoing',
    medication: 'Medication',
    dosage: 'Dosage',
    frequency: 'Frequency',
    startDate: 'Start Date',
    endDate: 'End Date',
    prescribedBy: 'Prescribed By',
    noDocuments: 'No documents uploaded yet',
    uploadDocument: 'Upload Document',
    male: 'Male',
    female: 'Female',
    bpm: 'bpm',
    mmHg: 'mmHg',
    kg: 'kg',
    documentName: 'Document',
    documentType: 'Type',
    documentDate: 'Date',
    documentSize: 'Size',
    critical: 'Critical',
    inactive: 'Inactive',
    mainNavigation: 'Main navigation',
    download: 'Download',
    labReport: 'Lab Report',
    bloodTestResults: 'Blood Test Results - Complete Panel',
    bloodTestResultsAr: 'نتائج فحص الدم - الفحص الشامل',
    medicalReport: 'Medical Report',
    annualCheckupReport: 'Annual Health Checkup Report 2025',
    annualCheckupReportAr: 'تقرير الفحص الصحي السنوي ٢٠٢٥',
    prescription: 'Prescription',
    prescriptionDoc: 'Prescription - Amlodipine 5mg',
    prescriptionDocAr: 'وصفة طبية - أملوديبين ٥ ملغ',
    insurance: 'Insurance',
    insuranceCard: 'Insurance Card - ADNIC Gold',
    insuranceCardAr: 'بطاقة التأمين - أدنيك الذهبية',
    radiology: 'Radiology',
    chestXray: 'Chest X-Ray Report',
    chestXrayAr: 'تقرير أشعة الصدر',
    pdf: 'PDF',
    jpg: 'JPG',
    uploaded: 'Uploaded',
  },
  ar: {
    title: 'مركز النور الطبي',
    dashboard: 'لوحة التحكم',
    patients: 'المرضى',
    appointments: 'المواعيد',
    prescriptions: 'الوصفات الطبية',
    backToPatients: 'العودة للمرضى',
    patientProfile: 'ملف المريض',
    overview: 'نظرة عامة',
    medicalHistory: 'السجل الطبي',
    prescriptionsTab: 'الوصفات',
    documents: 'المستندات',
    personalInfo: 'المعلومات الشخصية',
    emiratesId: 'الهوية الإماراتية',
    dateOfBirth: 'تاريخ الميلاد',
    bloodType: 'فصيلة الدم',
    gender: 'الجنس',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    emergencyContact: 'جهة الاتصال للطوارئ',
    allergies: 'الحساسية',
    noKnownAllergies: 'لا توجد حساسية معروفة',
    vitalSigns: 'العلامات الحيوية',
    bloodPressure: 'ضغط الدم',
    heartRate: 'معدل ضربات القلب',
    temperature: 'الحرارة',
    weight: 'الوزن',
    lastUpdated: 'آخر تحديث',
    visitHistory: 'سجل الزيارات',
    date: 'التاريخ',
    doctor: 'الطبيب',
    diagnosis: 'التشخيص',
    notes: 'الملاحظات',
    status: 'الحالة',
    active: 'نشط',
    resolved: 'تم العلاج',
    ongoing: 'مستمر',
    medication: 'الدواء',
    dosage: 'الجرعة',
    frequency: 'التكرار',
    startDate: 'تاريخ البدء',
    endDate: 'تاريخ الانتهاء',
    prescribedBy: 'بواسطة الطبيب',
    noDocuments: 'لم يتم رفع مستندات بعد',
    uploadDocument: 'رفع مستند',
    male: 'ذكر',
    female: 'أنثى',
    bpm: 'نبضة/د',
    mmHg: 'ملم زئبق',
    kg: 'كغ',
    documentName: 'المستند',
    documentType: 'النوع',
    documentDate: 'التاريخ',
    documentSize: 'الحجم',
    critical: 'حرج',
    inactive: 'غير نشط',
    mainNavigation: 'التنقل الرئيسي',
    download: 'تحميل',
    labReport: 'تقرير مختبر',
    bloodTestResults: 'نتائج فحص الدم - الفحص الشامل',
    bloodTestResultsAr: 'نتائج فحص الدم - الفحص الشامل',
    medicalReport: 'تقرير طبي',
    annualCheckupReport: 'تقرير الفحص الصحي السنوي ٢٠٢٥',
    annualCheckupReportAr: 'تقرير الفحص الصحي السنوي ٢٠٢٥',
    prescription: 'وصفة طبية',
    prescriptionDoc: 'وصفة طبية - أملوديبين ٥ ملغ',
    prescriptionDocAr: 'وصفة طبية - أملوديبين ٥ ملغ',
    insurance: 'تأمين',
    insuranceCard: 'بطاقة التأمين - أدنيك الذهبية',
    insuranceCardAr: 'بطاقة التأمين - أدنيك الذهبية',
    radiology: 'أشعة',
    chestXray: 'تقرير أشعة الصدر',
    chestXrayAr: 'تقرير أشعة الصدر',
    pdf: 'PDF',
    jpg: 'JPG',
    uploaded: 'تم الرفع',
  },
}

const patientsData: Record<string, {
  name: string; nameAr: string; initials: string; image: string;
  emiratesId: string; dob: string; dobAr: string;
  hijriDob: string; hijriDobAr: string;
  bloodType: string; gender: 'male' | 'female';
  phone: string; email: string;
  address: string; addressAr: string;
  emergencyContact: string; emergencyContactAr: string;
  allergies: string[]; allergiesAr: string[];
  status: 'active' | 'critical' | 'inactive';
}> = {
  '1': {
    name: 'Ahmed Al Mansouri', nameAr: 'أحمد المنصوري', initials: 'AM',
    image: '/examples/healthcare/avatars/ahmed.jpg',
    emiratesId: '784-1990-1234567-1', dob: 'June 15, 1990', dobAr: '١٥ يونيو ١٩٩٠',
    hijriDob: '22 Dhul Qadah 1410', hijriDobAr: '٢٢ ذو القعدة ١٤١٠',
    bloodType: 'A+', gender: 'male',
    phone: '+971 50 123 4567', email: 'ahmed.mansouri@email.com',
    address: 'Villa 12, Al Barsha, Dubai', addressAr: 'فيلا ١٢، البرشاء، دبي',
    emergencyContact: 'Maryam Al Mansouri - +971 50 987 6543',
    emergencyContactAr: 'مريم المنصوري - +971 50 987 6543',
    allergies: ['Penicillin'], allergiesAr: ['البنسلين'],
    status: 'active',
  },
  '2': {
    name: 'Fatima Al Hashimi', nameAr: 'فاطمة الهاشمي', initials: 'FH',
    image: '/examples/healthcare/avatars/fatima.jpg',
    emiratesId: '784-1985-2345678-2', dob: 'March 22, 1985', dobAr: '٢٢ مارس ١٩٨٥',
    hijriDob: '1 Rajab 1405', hijriDobAr: '١ رجب ١٤٠٥',
    bloodType: 'O-', gender: 'female',
    phone: '+971 55 234 5678', email: 'fatima.hashimi@email.com',
    address: 'Apt 304, JBR Tower 2, Dubai', addressAr: 'شقة ٣٠٤، برج جي بي آر ٢، دبي',
    emergencyContact: 'Hassan Al Hashimi - +971 55 111 2222',
    emergencyContactAr: 'حسن الهاشمي - +971 55 111 2222',
    allergies: ['Aspirin', 'Sulfa drugs'], allergiesAr: ['الأسبرين', 'أدوية السلفا'],
    status: 'critical',
  },
}

const visitHistory = [
  {
    date: 'Mar 5, 2026', dateAr: '٥ مارس ٢٠٢٦',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    diagnosis: 'General Checkup', diagnosisAr: 'فحص عام',
    notes: 'All vitals normal. Follow-up in 6 months.',
    notesAr: 'جميع العلامات طبيعية. متابعة بعد ٦ أشهر.',
    status: 'resolved' as const,
  },
  {
    date: 'Jan 15, 2026', dateAr: '١٥ يناير ٢٠٢٦',
    doctor: 'Dr. Ahmad Khalil', doctorAr: 'د. أحمد خليل',
    diagnosis: 'Hypertension Follow-up', diagnosisAr: 'متابعة ارتفاع ضغط الدم',
    notes: 'Blood pressure slightly elevated. Adjusted medication dosage.',
    notesAr: 'ضغط الدم مرتفع قليلاً. تم تعديل جرعة الدواء.',
    status: 'ongoing' as const,
  },
  {
    date: 'Nov 3, 2025', dateAr: '٣ نوفمبر ٢٠٢٥',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    diagnosis: 'Respiratory Infection', diagnosisAr: 'عدوى تنفسية',
    notes: 'Prescribed antibiotics for 7 days. Symptoms resolved.',
    notesAr: 'وصف مضادات حيوية لمدة ٧ أيام. تم الشفاء.',
    status: 'resolved' as const,
  },
]

const prescriptionsData = [
  {
    medication: 'Amlodipine', medicationAr: 'أملوديبين',
    dosage: '5mg', frequency: 'Once daily', frequencyAr: 'مرة يومياً',
    startDate: 'Jan 15, 2026', startDateAr: '١٥ يناير ٢٠٢٦',
    endDate: 'Jul 15, 2026', endDateAr: '١٥ يوليو ٢٠٢٦',
    doctor: 'Dr. Ahmad Khalil', doctorAr: 'د. أحمد خليل',
    status: 'active' as const,
  },
  {
    medication: 'Metformin', medicationAr: 'ميتفورمين',
    dosage: '500mg', frequency: 'Twice daily', frequencyAr: 'مرتين يومياً',
    startDate: 'Dec 1, 2025', startDateAr: '١ ديسمبر ٢٠٢٥',
    endDate: 'Jun 1, 2026', endDateAr: '١ يونيو ٢٠٢٦',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    status: 'active' as const,
  },
  {
    medication: 'Amoxicillin', medicationAr: 'أموكسيسيلين',
    dosage: '500mg', frequency: 'Three times daily', frequencyAr: 'ثلاث مرات يومياً',
    startDate: 'Nov 3, 2025', startDateAr: '٣ نوفمبر ٢٠٢٥',
    endDate: 'Nov 10, 2025', endDateAr: '١٠ نوفمبر ٢٠٢٥',
    doctor: 'Dr. Layla Hassan', doctorAr: 'د. ليلى حسن',
    status: 'resolved' as const,
  },
]

export default function PatientDetailPage() {
  const params = useParams()
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]
  const h = hc[locale]

  const patientId = params.id as string
  const patient = patientsData[patientId] || patientsData['1']

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/examples/healthcare" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <FirstAid className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline">{h.title}</span>
            </Link>
          </div>
          <nav aria-label={h.mainNavigation} className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/healthcare">{h.dashboard}</Link>
            </Button>
            <Button variant="ghost" size="sm" className="font-medium" asChild>
              <Link href="/examples/healthcare/patients">{h.patients}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/healthcare/appointments">{h.appointments}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/examples/healthcare/prescriptions">{h.prescriptions}</Link>
            </Button>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Button variant="outline" size="sm" asChild>
              <Link href="/examples">{t.nav.examples}</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <div className="flex items-center justify-between gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">{t.nav.home}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/examples">{t.nav.examples}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/examples/healthcare">{h.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/examples/healthcare/patients">{h.patients}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{isRTL ? patient.nameAr : patient.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <DirectionToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        {/* Back Button */}
        <div className="mb-6">
          <ButtonArrow direction="back" variant="ghost" size="sm" asChild>
            <Link href="/examples/healthcare/patients">
              {h.backToPatients}
            </Link>
          </ButtonArrow>
        </div>

        {/* Patient Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative shrink-0 overflow-hidden rounded-lg h-32 w-24">
                <img src={patient.image} alt={isRTL ? patient.nameAr : patient.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold">{isRTL ? patient.nameAr : patient.name}</h1>
                  <Badge variant={patient.status === 'critical' ? 'destructive' : patient.status === 'active' ? 'default' : 'secondary'}>
                    {patient.status === 'active' ? h.active : patient.status === 'critical' ? h.critical : h.inactive}
                  </Badge>
                </div>
                <p className="text-muted-foreground"><span lang={isRTL ? 'en' : 'ar'}>{isRTL ? patient.name : patient.nameAr}</span></p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Drop className="h-4 w-4" /> {patient.bloodType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {isRTL ? patient.dobAr : patient.dob}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> {patient.phone}
                  </span>
                </div>
              </div>
              <HijriDate
                gregorianDate={patient.dob}
                gregorianDateAr={patient.dobAr}
                hijriDate={patient.hijriDob}
                hijriDateAr={patient.hijriDobAr}
                variant="badge"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">{h.overview}</TabsTrigger>
            <TabsTrigger value="history">{h.medicalHistory}</TabsTrigger>
            <TabsTrigger value="prescriptions">{h.prescriptionsTab}</TabsTrigger>
            <TabsTrigger value="documents">{h.documents}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Personal Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{h.personalInfo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{h.emiratesId}</span>
                      <span className="text-sm font-medium">{patient.emiratesId}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{h.gender}</span>
                      <span className="text-sm font-medium">{patient.gender === 'male' ? h.male : h.female}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{h.email}</span>
                      <span className="text-sm font-medium">{patient.email}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{h.address}</span>
                      <span className="text-sm font-medium">{isRTL ? patient.addressAr : patient.address}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{h.emergencyContact}</span>
                      <span className="text-sm font-medium">{isRTL ? patient.emergencyContactAr : patient.emergencyContact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vital Signs */}
              <Card>
                <CardHeader>
                  <CardTitle>{h.vitalSigns}</CardTitle>
                  <CardDescription>{h.lastUpdated}: {isRTL ? '٥ مارس ٢٠٢٦' : 'Mar 5, 2026'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm flex items-center gap-2">
                        <Heart className="h-4 w-4 text-destructive" />
                        {h.bloodPressure}
                      </span>
                      <span className="text-sm font-medium">120/80 {h.mmHg}</span>
                    </div>
                    <Progress value={60} className="h-2" aria-label={`${h.bloodPressure}: 120/80 ${h.mmHg}`} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm flex items-center gap-2">
                        <Heartbeat className="h-4 w-4 text-destructive" />
                        {h.heartRate}
                      </span>
                      <span className="text-sm font-medium"><ArabicNumber value={72} /> {h.bpm}</span>
                    </div>
                    <Progress value={72} className="h-2" aria-label={`${h.heartRate}: 72 ${h.bpm}`} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-warning" />
                        {h.temperature}
                      </span>
                      <span className="text-sm font-medium">36.8°C</span>
                    </div>
                    <Progress value={50} className="h-2" aria-label={`${h.temperature}: 36.8°C`} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm flex items-center gap-2">
                        <Eye className="h-4 w-4 text-info" />
                        {h.weight}
                      </span>
                      <span className="text-sm font-medium"><ArabicNumber value={75} /> {h.kg}</span>
                    </div>
                    <Progress value={65} className="h-2" aria-label={`${h.weight}: 75 ${h.kg}`} />
                  </div>
                </CardContent>
              </Card>

              {/* Allergies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Warning className="h-5 w-5 text-destructive" />
                    {h.allergies}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {(isRTL ? patient.allergiesAr : patient.allergies).map((allergy, i) => (
                        <Badge key={i} variant="destructive">{allergy}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{h.noKnownAllergies}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Medical History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>{h.visitHistory}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {visitHistory.map((visit, index) => (
                    <div key={index} className="relative ps-8 pb-6 last:pb-0">
                      {/* Timeline line */}
                      {index < visitHistory.length - 1 && (
                        <div className="absolute start-3 top-6 bottom-0 w-px bg-border" />
                      )}
                      {/* Timeline dot */}
                      <div className={`absolute start-0 top-1 h-6 w-6 rounded-full flex items-center justify-center ${
                        visit.status === 'resolved' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {visit.status === 'resolved' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{isRTL ? visit.diagnosisAr : visit.diagnosis}</span>
                          <Badge variant={visit.status === 'resolved' ? 'outline' : 'secondary'}>
                            {visit.status === 'resolved' ? h.resolved : h.ongoing}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {isRTL ? visit.dateAr : visit.date} · {isRTL ? visit.doctorAr : visit.doctor}
                        </p>
                        <p className="text-sm">{isRTL ? visit.notesAr : visit.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle>{h.prescriptionsTab}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptionsData.map((rx, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Pill className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{isRTL ? rx.medicationAr : rx.medication}</span>
                          <Badge variant={rx.status === 'active' ? 'default' : 'outline'}>
                            {rx.status === 'active' ? h.active : h.resolved}
                          </Badge>
                        </div>
                        <div className="grid gap-1 text-sm text-muted-foreground">
                          <span>{h.dosage}: {rx.dosage} · {h.frequency}: {isRTL ? rx.frequencyAr : rx.frequency}</span>
                          <span>{h.startDate}: {isRTL ? rx.startDateAr : rx.startDate} — {h.endDate}: {isRTL ? rx.endDateAr : rx.endDate}</span>
                          <span>{h.prescribedBy}: {isRTL ? rx.doctorAr : rx.doctor}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{h.documents}</CardTitle>
                  <Button size="sm">
                    <Upload className="h-4 w-4 me-2" />
                    {h.uploadDocument}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      icon: FileText,
                      name: isRTL ? h.bloodTestResultsAr : h.bloodTestResults,
                      type: h.labReport,
                      typeVariant: 'default' as const,
                      date: isRTL ? '٢ مارس ٢٠٢٦' : 'Mar 2, 2026',
                      size: '1.2 MB',
                      format: h.pdf,
                    },
                    {
                      icon: FileText,
                      name: isRTL ? h.annualCheckupReportAr : h.annualCheckupReport,
                      type: h.medicalReport,
                      typeVariant: 'secondary' as const,
                      date: isRTL ? '١٥ يناير ٢٠٢٦' : 'Jan 15, 2026',
                      size: '2.8 MB',
                      format: h.pdf,
                    },
                    {
                      icon: FilePdf,
                      name: isRTL ? h.prescriptionDocAr : h.prescriptionDoc,
                      type: h.prescription,
                      typeVariant: 'outline' as const,
                      date: isRTL ? '١٥ يناير ٢٠٢٦' : 'Jan 15, 2026',
                      size: '340 KB',
                      format: h.pdf,
                    },
                    {
                      icon: Image,
                      name: isRTL ? h.insuranceCardAr : h.insuranceCard,
                      type: h.insurance,
                      typeVariant: 'default' as const,
                      date: isRTL ? '١ ديسمبر ٢٠٢٥' : 'Dec 1, 2025',
                      size: '890 KB',
                      format: h.jpg,
                    },
                    {
                      icon: FileText,
                      name: isRTL ? h.chestXrayAr : h.chestXray,
                      type: h.radiology,
                      typeVariant: 'secondary' as const,
                      date: isRTL ? '٣ نوفمبر ٢٠٢٥' : 'Nov 3, 2025',
                      size: '5.1 MB',
                      format: h.pdf,
                    },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <doc.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={doc.typeVariant}>{doc.type}</Badge>
                            <span className="text-xs text-muted-foreground">{doc.format}</span>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="text-xs text-muted-foreground">{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground hidden sm:inline">{h.uploaded}: {doc.date}</span>
                        <Button variant="ghost" size="sm" aria-label={`${h.download}: ${doc.name}`}>
                          <DownloadSimple className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
