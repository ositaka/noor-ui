'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Stepper } from '@/components/ui/stepper'
import { FileUpload } from '@/components/ui/file-upload'
import { Callout } from '@/components/ui/callout'
import { DatePicker } from '@/components/ui/date-picker'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  AirplaneTilt,
  Clock,
  CurrencyDollar,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Info,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'

const t = {
  en: {
    dashboard: 'Dashboard',
    services: 'Services',
    visaResidency: 'Visa & Residency Renewal',
    visaDesc: 'Renew your residence visa for another year. Process includes document verification and fee payment.',
    processingTime: 'Processing Time',
    processingDays: '3-5 business days',
    serviceFee: 'Service Fee',
    feeAmount: 'AED 1,100',
    feeBreakdown: '(AED 1,000 + 5% VAT)',
    requiredDocs: 'Required Documents',
    docsChecklist: 'Before starting, ensure you have these documents ready:',
    nationalIdCopy: 'Valid National ID (front & back)',
    passportCopy: 'Passport copy (valid for 6+ months)',
    photo: 'Personal photo (white background, 4x6 cm)',
    tenancyContract: 'Tenancy contract (Ejari/Tawtheeq)',
    salaryCert: 'Salary certificate (recent, within 30 days)',
    medicalFitness: 'Medical fitness certificate',
    startApplication: 'Start Application',
    step1Title: 'Personal Information',
    step1Desc: 'Your personal details',
    step2Title: 'Documents',
    step2Desc: 'Upload required documents',
    step3Title: 'Payment',
    step3Desc: 'Fee payment',
    step4Title: 'Review & Submit',
    step4Desc: 'Review and confirm',
    fullNameEn: 'Full Name (English)',
    fullNameAr: 'Full Name (Arabic)',
    nationalId: 'National ID',
    dateOfBirth: 'Date of Birth',
    nationality: 'Nationality',
    phone: 'Phone Number',
    email: 'Email Address',
    currentVisaExpiry: 'Current Visa Expiry',
    next: 'Next',
    previous: 'Previous',
    uploadNationalId: 'Upload National ID',
    uploadPassport: 'Upload Passport Copy',
    uploadPhoto: 'Upload Personal Photo',
    uploadTenancy: 'Upload Tenancy Contract',
    uploadSalary: 'Upload Salary Certificate',
    acceptedFormats: 'PDF, JPG or PNG up to 5MB',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit/Debit Card',
    bankTransfer: 'Bank Transfer',
    feeSummary: 'Fee Summary',
    baseFee: 'Service Fee',
    baseFeeValue: 'AED 1,000',
    vat: 'VAT (5%)',
    vatValue: 'AED 50',
    total: 'Total',
    totalValue: 'AED 1,050',
    reviewTitle: 'Review Your Application',
    personalInfo: 'Personal Information',
    documents: 'Documents',
    payment: 'Payment',
    termsAgree: 'I confirm that all information provided is accurate and I agree to the terms and conditions',
    submitApplication: 'Submit Application',
    filesUploaded: 'files uploaded',
    editSection: 'Edit',
    selectNationality: 'Select nationality',
    uae: 'UAE',
    india: 'India',
    pakistan: 'Pakistan',
    egypt: 'Egypt',
    jordan: 'Jordan',
    philippines: 'Philippines',
    bangladesh: 'Bangladesh',
    other: 'Other',
    selectPayment: 'Select payment method',
    paymentNote: 'Payment will be charged after application review and approval',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    services: 'الخدمات',
    visaResidency: 'تجديد تأشيرة الإقامة',
    visaDesc: 'تجديد تأشيرة الإقامة في الإمارات لسنة إضافية. تشمل العملية التحقق من المستندات ودفع الرسوم.',
    processingTime: 'وقت المعالجة',
    processingDays: '٣-٥ أيام عمل',
    serviceFee: 'رسوم الخدمة',
    feeAmount: '١٬١٠٠ د.إ',
    feeBreakdown: '(١٬٠٠٠ د.إ + ٥٪ ضريبة)',
    requiredDocs: 'المستندات المطلوبة',
    docsChecklist: 'قبل البدء، تأكد من تجهيز هذه المستندات:',
    nationalIdCopy: 'الهوية الوطنية (الأمام والخلف)',
    passportCopy: 'صورة جواز السفر (صالح لـ ٦ أشهر على الأقل)',
    photo: 'صورة شخصية (خلفية بيضاء، ٤×٦ سم)',
    tenancyContract: 'عقد الإيجار (إيجاري/توثيق)',
    salaryCert: 'شهادة الراتب (حديثة، خلال ٣٠ يوم)',
    medicalFitness: 'شهادة اللياقة الطبية',
    startApplication: 'بدء التقديم',
    step1Title: 'المعلومات الشخصية',
    step1Desc: 'بياناتك الشخصية',
    step2Title: 'المستندات',
    step2Desc: 'تحميل المستندات المطلوبة',
    step3Title: 'الدفع',
    step3Desc: 'دفع الرسوم',
    step4Title: 'المراجعة والتقديم',
    step4Desc: 'مراجعة وتأكيد',
    fullNameEn: 'الاسم الكامل (إنجليزي)',
    fullNameAr: 'الاسم الكامل (عربي)',
    nationalId: 'الهوية الوطنية',
    dateOfBirth: 'تاريخ الميلاد',
    nationality: 'الجنسية',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    currentVisaExpiry: 'انتهاء التأشيرة الحالية',
    next: 'التالي',
    previous: 'السابق',
    uploadNationalId: 'رفع الهوية الوطنية',
    uploadPassport: 'رفع صورة جواز السفر',
    uploadPhoto: 'رفع الصورة الشخصية',
    uploadTenancy: 'رفع عقد الإيجار',
    uploadSalary: 'رفع شهادة الراتب',
    acceptedFormats: 'PDF أو JPG أو PNG بحد أقصى ٥ ميغابايت',
    paymentMethod: 'طريقة الدفع',
    creditCard: 'بطاقة ائتمان/خصم',
    bankTransfer: 'تحويل بنكي',
    feeSummary: 'ملخص الرسوم',
    baseFee: 'رسوم الخدمة',
    baseFeeValue: '١٬٠٠٠ د.إ',
    vat: 'الضريبة (٥٪)',
    vatValue: '٥٠ د.إ',
    total: 'الإجمالي',
    totalValue: '١٬٠٥٠ د.إ',
    reviewTitle: 'مراجعة طلبك',
    personalInfo: 'المعلومات الشخصية',
    documents: 'المستندات',
    payment: 'الدفع',
    termsAgree: 'أؤكد أن جميع المعلومات المقدمة صحيحة وأوافق على الشروط والأحكام',
    submitApplication: 'تقديم الطلب',
    filesUploaded: 'ملفات تم تحميلها',
    editSection: 'تعديل',
    selectNationality: 'اختر الجنسية',
    uae: 'الإمارات',
    india: 'الهند',
    pakistan: 'باكستان',
    egypt: 'مصر',
    jordan: 'الأردن',
    philippines: 'الفلبين',
    bangladesh: 'بنغلاديش',
    other: 'أخرى',
    selectPayment: 'اختر طريقة الدفع',
    paymentNote: 'سيتم الخصم بعد مراجعة الطلب والموافقة عليه',
  },
}

export default function ServiceApplicationPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]
  const router = useRouter()
  const [started, setStarted] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const Arrow = isRTL ? ArrowLeft : ArrowRight
  const BackArrow = isRTL ? ArrowRight : ArrowLeft

  const steps = [
    { id: 'personal', title: h.step1Title, titleAr: locale === 'ar' ? h.step1Title : undefined, description: h.step1Desc },
    { id: 'documents', title: h.step2Title, titleAr: locale === 'ar' ? h.step2Title : undefined, description: h.step2Desc },
    { id: 'payment', title: h.step3Title, titleAr: locale === 'ar' ? h.step3Title : undefined, description: h.step3Desc },
    { id: 'review', title: h.step4Title, titleAr: locale === 'ar' ? h.step4Title : undefined, description: h.step4Desc },
  ]

  if (!started) {
    return (
      <div className="container py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/examples/government/dashboard">{h.dashboard}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{h.services}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Service Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-4 bg-primary/10 rounded-xl">
                <AirplaneTilt className="h-10 w-10 text-primary" weight="duotone" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{h.visaResidency}</h1>
                <p className="text-muted-foreground text-sm">{h.visaDesc}</p>
              </div>
            </div>

            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{h.processingTime}:</span>
                <span className="font-medium">{h.processingDays}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CurrencyDollar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{h.serviceFee}:</span>
                <span className="font-medium">{h.feeAmount}</span>
                <span className="text-xs text-muted-foreground">{h.feeBreakdown}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-semibold mb-3">{h.requiredDocs}</h2>
              <p className="text-sm text-muted-foreground mb-4">{h.docsChecklist}</p>
              <div className="space-y-2">
                {[
                  h.nationalIdCopy,
                  h.passportCopy,
                  h.photo,
                  h.tenancyContract,
                  h.salaryCert,
                  h.medicalFitness,
                ].map((doc) => (
                  <div key={doc} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button size="lg" onClick={() => setStarted(true)}>
              {h.startApplication}
              <Arrow className="h-4 w-4 ms-2" />
            </Button>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  {h.requiredDocs}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    h.nationalIdCopy,
                    h.passportCopy,
                    h.photo,
                    h.tenancyContract,
                    h.salaryCert,
                  ].map((doc) => (
                    <li key={doc} className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/government/dashboard">{h.dashboard}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setStarted(false) }}>
              {h.services}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{h.visaResidency}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-6">{h.visaResidency}</h1>

      {/* Stepper */}
      <div className="mb-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(step) => {
            if (step < currentStep) setCurrentStep(step)
          }}
          orientation="horizontal"
          variant="default"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Step 1: Personal Information */}
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{h.step1Title}</CardTitle>
                <CardDescription>{h.step1Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name-en">{h.fullNameEn}</Label>
                    <Input id="name-en" dir="ltr" defaultValue="Ahmed Mohammed Al Falasi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-ar">{h.fullNameAr}</Label>
                    <Input id="name-ar" dir="rtl" defaultValue="أحمد محمد الفلاسي" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="eid">{h.nationalId}</Label>
                    <Input id="eid" dir="ltr" defaultValue="784-1990-1234567-1" />
                  </div>
                  <div className="space-y-2">
                    <Label>{h.dateOfBirth}</Label>
                    <DatePicker
                      date={new Date(1990, 4, 15)}
                      placeholder={h.dateOfBirth}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nationality">{h.nationality}</Label>
                    <Select defaultValue="egypt">
                      <SelectTrigger id="nationality">
                        <SelectValue placeholder={h.selectNationality} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uae">{h.uae}</SelectItem>
                        <SelectItem value="india">{h.india}</SelectItem>
                        <SelectItem value="pakistan">{h.pakistan}</SelectItem>
                        <SelectItem value="egypt">{h.egypt}</SelectItem>
                        <SelectItem value="jordan">{h.jordan}</SelectItem>
                        <SelectItem value="philippines">{h.philippines}</SelectItem>
                        <SelectItem value="bangladesh">{h.bangladesh}</SelectItem>
                        <SelectItem value="other">{h.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{h.currentVisaExpiry}</Label>
                    <DatePicker
                      date={new Date(2026, 5, 15)}
                      placeholder={h.currentVisaExpiry}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{h.phone}</Label>
                    <Input id="phone" dir="ltr" defaultValue="+971 50 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{h.email}</Label>
                    <Input id="email" dir="ltr" type="email" defaultValue="ahmed.falasi@email.com" />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setCurrentStep(1)}>
                    {h.next}
                    <Arrow className="h-4 w-4 ms-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Documents */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>{h.step2Title}</CardTitle>
                <CardDescription>{h.step2Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{h.uploadNationalId}</Label>
                  <FileUpload accept=".pdf,.jpg,.png" maxSize={5 * 1024 * 1024} />
                  <p className="text-xs text-muted-foreground">{h.acceptedFormats}</p>
                </div>
                <div className="space-y-2">
                  <Label>{h.uploadPassport}</Label>
                  <FileUpload accept=".pdf,.jpg,.png" maxSize={5 * 1024 * 1024} />
                  <p className="text-xs text-muted-foreground">{h.acceptedFormats}</p>
                </div>
                <div className="space-y-2">
                  <Label>{h.uploadPhoto}</Label>
                  <FileUpload accept=".jpg,.png" maxSize={5 * 1024 * 1024} />
                  <p className="text-xs text-muted-foreground">{h.acceptedFormats}</p>
                </div>
                <div className="space-y-2">
                  <Label>{h.uploadTenancy}</Label>
                  <FileUpload accept=".pdf" maxSize={5 * 1024 * 1024} />
                  <p className="text-xs text-muted-foreground">{h.acceptedFormats}</p>
                </div>
                <div className="space-y-2">
                  <Label>{h.uploadSalary}</Label>
                  <FileUpload accept=".pdf" maxSize={5 * 1024 * 1024} />
                  <p className="text-xs text-muted-foreground">{h.acceptedFormats}</p>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(0)}>
                    <BackArrow className="h-4 w-4 me-2" />
                    {h.previous}
                  </Button>
                  <Button onClick={() => setCurrentStep(2)}>
                    {h.next}
                    <Arrow className="h-4 w-4 ms-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>{h.step3Title}</CardTitle>
                <CardDescription>{h.step3Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="payment-method">{h.paymentMethod}</Label>
                  <Select defaultValue="credit-card">
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder={h.selectPayment} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">{h.creditCard}</SelectItem>
                      <SelectItem value="bank-transfer">{h.bankTransfer}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">{h.feeSummary}</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{h.baseFee}</span>
                    <span>{h.baseFeeValue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{h.vat}</span>
                    <span>{h.vatValue}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>{h.total}</span>
                    <span>{h.totalValue}</span>
                  </div>
                </div>

                <Callout type="info" title="">
                  <p className="text-sm">{h.paymentNote}</p>
                </Callout>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <BackArrow className="h-4 w-4 me-2" />
                    {h.previous}
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    {h.next}
                    <Arrow className="h-4 w-4 ms-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>{h.reviewTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Info Summary */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{h.personalInfo}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(0)} aria-label={`${h.editSection} ${h.personalInfo}`}>
                      {h.editSection}
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{h.fullNameEn}</span>
                      <span dir="ltr">Ahmed Mohammed Al Falasi</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{h.fullNameAr}</span>
                      <span dir="rtl">أحمد محمد الفلاسي</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{h.nationalId}</span>
                      <span dir="ltr">784-1990-1234567-1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{h.nationality}</span>
                      <span>{h.egypt}</span>
                    </div>
                  </div>
                </div>

                {/* Documents Summary */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{h.documents}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} aria-label={`${h.editSection} ${h.documents}`}>
                      {h.editSection}
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4 text-sm">
                    <p className="text-muted-foreground">5 {h.filesUploaded}</p>
                  </div>
                </div>

                {/* Payment Summary */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{h.payment}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} aria-label={`${h.editSection} ${h.payment}`}>
                      {h.editSection}
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{h.paymentMethod}</span>
                      <span>{h.creditCard}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>{h.total}</span>
                      <span>{h.totalValue}</span>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                    {h.termsAgree}
                  </Label>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <BackArrow className="h-4 w-4 me-2" />
                    {h.previous}
                  </Button>
                  <Button
                    disabled={!termsAccepted}
                    onClick={() => router.push('/examples/government/applications/1')}
                  >
                    {h.submitApplication}
                    <CheckCircle className="h-4 w-4 ms-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar: Requirements */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-4 w-4" />
                {h.requiredDocs}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  h.nationalIdCopy,
                  h.passportCopy,
                  h.photo,
                  h.tenancyContract,
                  h.salaryCert,
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{h.processingDays}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyDollar className="h-4 w-4 text-muted-foreground" />
                  <span>{h.feeAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
