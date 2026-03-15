'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Stepper } from '@/components/ui/stepper'
import { FileUpload } from '@/components/ui/file-upload'
import { Callout } from '@/components/ui/callout'
import { DatePicker } from '@/components/ui/date-picker'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'
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
  Briefcase,
  IdentificationCard,
  Car,
  HouseSimple,
  UsersThree,
  Clock,
  CurrencyDollar,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Info,
  CreditCard,
  Bank,
  Confetti,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormField {
  id: string
  label: string
  labelAr: string
  type: 'text' | 'select' | 'date'
  dir?: 'ltr' | 'rtl'
  defaultValue?: string
  options?: { value: string; label: string; labelAr: string }[]
}

interface UploadField {
  id: string
  label: string
  labelAr: string
  accept: string
}

interface ServiceDef {
  slug: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  icon: React.ElementType
  processingDays: string
  processingDaysAr: string
  feeBase: number
  feeVAT: number
  feeTotal: number
  feeBaseDisplay: string
  feeBaseDisplayAr: string
  feeVATDisplay: string
  feeVATDisplayAr: string
  feeTotalDisplay: string
  feeTotalDisplayAr: string
  feeAmountDisplay: string
  feeAmountDisplayAr: string
  feeBreakdown: string
  feeBreakdownAr: string
  requiredDocs: { label: string; labelAr: string }[]
  formFields: FormField[]
  uploadFields: UploadField[]
}

// ---------------------------------------------------------------------------
// Shared options
// ---------------------------------------------------------------------------

const NATIONALITY_OPTIONS = [
  { value: 'uae', label: 'UAE', labelAr: 'الإمارات' },
  { value: 'india', label: 'India', labelAr: 'الهند' },
  { value: 'pakistan', label: 'Pakistan', labelAr: 'باكستان' },
  { value: 'egypt', label: 'Egypt', labelAr: 'مصر' },
  { value: 'jordan', label: 'Jordan', labelAr: 'الأردن' },
  { value: 'philippines', label: 'Philippines', labelAr: 'الفلبين' },
  { value: 'bangladesh', label: 'Bangladesh', labelAr: 'بنغلاديش' },
  { value: 'other', label: 'Other', labelAr: 'أخرى' },
]

// ---------------------------------------------------------------------------
// Service Catalog — 6 services with unique form fields, docs, and fees
// ---------------------------------------------------------------------------

const SERVICE_CATALOG: Record<string, ServiceDef> = {
  'visa-residency': {
    slug: 'visa-residency',
    title: 'Visa & Residency Renewal',
    titleAr: 'تجديد تأشيرة الإقامة',
    description: 'Renew your residence visa for another year. Process includes document verification and fee payment.',
    descriptionAr: 'تجديد تأشيرة الإقامة لسنة إضافية. تشمل العملية التحقق من المستندات ودفع الرسوم.',
    icon: AirplaneTilt,
    processingDays: '3-5 business days',
    processingDaysAr: '٣-٥ أيام عمل',
    feeBase: 1000, feeVAT: 50, feeTotal: 1050,
    feeBaseDisplay: 'AED 1,000', feeBaseDisplayAr: '١٬٠٠٠ د.إ',
    feeVATDisplay: 'AED 50', feeVATDisplayAr: '٥٠ د.إ',
    feeTotalDisplay: 'AED 1,050', feeTotalDisplayAr: '١٬٠٥٠ د.إ',
    feeAmountDisplay: 'AED 1,100', feeAmountDisplayAr: '١٬١٠٠ د.إ',
    feeBreakdown: '(AED 1,000 + 5% VAT)', feeBreakdownAr: '(١٬٠٠٠ د.إ + ٥٪ ضريبة)',
    requiredDocs: [
      { label: 'Valid National ID (front & back)', labelAr: 'الهوية الوطنية (الأمام والخلف)' },
      { label: 'Passport copy (valid for 6+ months)', labelAr: 'صورة جواز السفر (صالح لـ ٦ أشهر على الأقل)' },
      { label: 'Personal photo (white background, 4x6 cm)', labelAr: 'صورة شخصية (خلفية بيضاء، ٤×٦ سم)' },
      { label: 'Tenancy contract (Ejari/Tawtheeq)', labelAr: 'عقد الإيجار (إيجاري/توثيق)' },
      { label: 'Salary certificate (recent, within 30 days)', labelAr: 'شهادة الراتب (حديثة، خلال ٣٠ يوم)' },
    ],
    formFields: [
      { id: 'name-en', label: 'Full Name (English)', labelAr: 'الاسم الكامل (إنجليزي)', type: 'text', dir: 'ltr', defaultValue: 'Ahmed Mohammed Al Falasi' },
      { id: 'name-ar', label: 'Full Name (Arabic)', labelAr: 'الاسم الكامل (عربي)', type: 'text', dir: 'rtl', defaultValue: 'أحمد محمد الفلاسي' },
      { id: 'national-id', label: 'National ID', labelAr: 'الهوية الوطنية', type: 'text', dir: 'ltr', defaultValue: '784-1990-1234567-1' },
      { id: 'dob', label: 'Date of Birth', labelAr: 'تاريخ الميلاد', type: 'date' },
      { id: 'nationality', label: 'Nationality', labelAr: 'الجنسية', type: 'select', options: NATIONALITY_OPTIONS, defaultValue: 'egypt' },
      { id: 'visa-expiry', label: 'Current Visa Expiry', labelAr: 'انتهاء التأشيرة الحالية', type: 'date' },
      { id: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'text', dir: 'ltr', defaultValue: '+971 50 123 4567' },
      { id: 'email', label: 'Email Address', labelAr: 'البريد الإلكتروني', type: 'text', dir: 'ltr', defaultValue: 'ahmed.falasi@email.com' },
    ],
    uploadFields: [
      { id: 'upload-id', label: 'Upload National ID', labelAr: 'رفع الهوية الوطنية', accept: '.pdf,.jpg,.png' },
      { id: 'upload-passport', label: 'Upload Passport Copy', labelAr: 'رفع صورة جواز السفر', accept: '.pdf,.jpg,.png' },
      { id: 'upload-photo', label: 'Upload Personal Photo', labelAr: 'رفع الصورة الشخصية', accept: '.jpg,.png' },
      { id: 'upload-tenancy', label: 'Upload Tenancy Contract', labelAr: 'رفع عقد الإيجار', accept: '.pdf' },
      { id: 'upload-salary', label: 'Upload Salary Certificate', labelAr: 'رفع شهادة الراتب', accept: '.pdf' },
    ],
  },
  'business-licensing': {
    slug: 'business-licensing',
    title: 'Business License Application',
    titleAr: 'طلب رخصة تجارية',
    description: 'Register a new business or renew your trade license. Includes activity registration and commercial permits.',
    descriptionAr: 'تسجيل أعمال جديدة أو تجديد الرخصة التجارية. يشمل تسجيل النشاط والتصاريح التجارية.',
    icon: Briefcase,
    processingDays: '5-7 business days',
    processingDaysAr: '٥-٧ أيام عمل',
    feeBase: 2380, feeVAT: 120, feeTotal: 2500,
    feeBaseDisplay: 'AED 2,380', feeBaseDisplayAr: '٢٬٣٨٠ د.إ',
    feeVATDisplay: 'AED 120', feeVATDisplayAr: '١٢٠ د.إ',
    feeTotalDisplay: 'AED 2,500', feeTotalDisplayAr: '٢٬٥٠٠ د.إ',
    feeAmountDisplay: 'AED 2,500', feeAmountDisplayAr: '٢٬٥٠٠ د.إ',
    feeBreakdown: '(AED 2,380 + 5% VAT)', feeBreakdownAr: '(٢٬٣٨٠ د.إ + ٥٪ ضريبة)',
    requiredDocs: [
      { label: 'Valid National ID (front & back)', labelAr: 'الهوية الوطنية (الأمام والخلف)' },
      { label: 'Trade name reservation certificate', labelAr: 'شهادة حجز الاسم التجاري' },
      { label: 'Office lease agreement', labelAr: 'عقد إيجار المكتب' },
      { label: 'Bank statement (last 3 months)', labelAr: 'كشف حساب بنكي (آخر ٣ أشهر)' },
    ],
    formFields: [
      { id: 'trade-name-en', label: 'Trade Name (English)', labelAr: 'الاسم التجاري (إنجليزي)', type: 'text', dir: 'ltr', defaultValue: 'Noor Digital Solutions LLC' },
      { id: 'trade-name-ar', label: 'Trade Name (Arabic)', labelAr: 'الاسم التجاري (عربي)', type: 'text', dir: 'rtl', defaultValue: 'نور للحلول الرقمية ذ.م.م' },
      { id: 'activity-type', label: 'Activity Type', labelAr: 'نوع النشاط', type: 'select', defaultValue: 'it-services', options: [
        { value: 'it-services', label: 'IT Services', labelAr: 'خدمات تقنية المعلومات' },
        { value: 'consulting', label: 'Consulting', labelAr: 'استشارات' },
        { value: 'trading', label: 'General Trading', labelAr: 'تجارة عامة' },
        { value: 'food', label: 'Food & Beverage', labelAr: 'أغذية ومشروبات' },
        { value: 'construction', label: 'Construction', labelAr: 'مقاولات' },
      ]},
      { id: 'license-duration', label: 'License Duration', labelAr: 'مدة الرخصة', type: 'select', defaultValue: '1-year', options: [
        { value: '1-year', label: '1 Year', labelAr: 'سنة واحدة' },
        { value: '2-years', label: '2 Years', labelAr: 'سنتان' },
        { value: '3-years', label: '3 Years', labelAr: '٣ سنوات' },
      ]},
      { id: 'address', label: 'Commercial Address', labelAr: 'العنوان التجاري', type: 'text', dir: 'ltr', defaultValue: 'Office 205, Business Bay Tower' },
      { id: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'text', dir: 'ltr', defaultValue: '+971 50 123 4567' },
      { id: 'email', label: 'Email Address', labelAr: 'البريد الإلكتروني', type: 'text', dir: 'ltr', defaultValue: 'ahmed.falasi@email.com' },
    ],
    uploadFields: [
      { id: 'upload-id', label: 'Upload National ID', labelAr: 'رفع الهوية الوطنية', accept: '.pdf,.jpg,.png' },
      { id: 'upload-trade', label: 'Upload Trade Name Certificate', labelAr: 'رفع شهادة الاسم التجاري', accept: '.pdf' },
      { id: 'upload-lease', label: 'Upload Office Lease', labelAr: 'رفع عقد إيجار المكتب', accept: '.pdf' },
      { id: 'upload-bank', label: 'Upload Bank Statement', labelAr: 'رفع كشف الحساب البنكي', accept: '.pdf' },
    ],
  },
  'civil-affairs': {
    slug: 'civil-affairs',
    title: 'Civil Affairs Certificate',
    titleAr: 'شهادة الأحوال المدنية',
    description: 'Request birth certificates, marriage registration, or other civil documents.',
    descriptionAr: 'طلب شهادات الميلاد أو تسجيل الزواج أو المستندات المدنية الأخرى.',
    icon: IdentificationCard,
    processingDays: '1-3 business days',
    processingDaysAr: '١-٣ أيام عمل',
    feeBase: 143, feeVAT: 7, feeTotal: 150,
    feeBaseDisplay: 'AED 143', feeBaseDisplayAr: '١٤٣ د.إ',
    feeVATDisplay: 'AED 7', feeVATDisplayAr: '٧ د.إ',
    feeTotalDisplay: 'AED 150', feeTotalDisplayAr: '١٥٠ د.إ',
    feeAmountDisplay: 'AED 150', feeAmountDisplayAr: '١٥٠ د.إ',
    feeBreakdown: '(AED 143 + 5% VAT)', feeBreakdownAr: '(١٤٣ د.إ + ٥٪ ضريبة)',
    requiredDocs: [
      { label: 'Valid National ID (front & back)', labelAr: 'الهوية الوطنية (الأمام والخلف)' },
      { label: 'Supporting document (hospital record, court order, etc.)', labelAr: 'مستند داعم (سجل المستشفى، أمر المحكمة، إلخ)' },
      { label: 'Personal photo', labelAr: 'صورة شخصية' },
    ],
    formFields: [
      { id: 'cert-type', label: 'Certificate Type', labelAr: 'نوع الشهادة', type: 'select', defaultValue: 'birth', options: [
        { value: 'birth', label: 'Birth Certificate', labelAr: 'شهادة ميلاد' },
        { value: 'marriage', label: 'Marriage Certificate', labelAr: 'عقد زواج' },
        { value: 'death', label: 'Death Certificate', labelAr: 'شهادة وفاة' },
      ]},
      { id: 'name-en', label: 'Applicant Name (English)', labelAr: 'اسم مقدم الطلب (إنجليزي)', type: 'text', dir: 'ltr', defaultValue: 'Ahmed Mohammed Al Falasi' },
      { id: 'name-ar', label: 'Applicant Name (Arabic)', labelAr: 'اسم مقدم الطلب (عربي)', type: 'text', dir: 'rtl', defaultValue: 'أحمد محمد الفلاسي' },
      { id: 'event-date', label: 'Date of Event', labelAr: 'تاريخ الحدث', type: 'date' },
      { id: 'relation', label: 'Relation to Subject', labelAr: 'صلة القرابة', type: 'select', defaultValue: 'self', options: [
        { value: 'self', label: 'Self', labelAr: 'شخصي' },
        { value: 'parent', label: 'Parent', labelAr: 'والد/والدة' },
        { value: 'spouse', label: 'Spouse', labelAr: 'زوج/زوجة' },
        { value: 'child', label: 'Child', labelAr: 'ابن/ابنة' },
      ]},
      { id: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'text', dir: 'ltr', defaultValue: '+971 50 123 4567' },
    ],
    uploadFields: [
      { id: 'upload-id', label: 'Upload National ID', labelAr: 'رفع الهوية الوطنية', accept: '.pdf,.jpg,.png' },
      { id: 'upload-support', label: 'Upload Supporting Document', labelAr: 'رفع المستند الداعم', accept: '.pdf,.jpg,.png' },
      { id: 'upload-photo', label: 'Upload Personal Photo', labelAr: 'رفع الصورة الشخصية', accept: '.jpg,.png' },
    ],
  },
  'traffic-vehicles': {
    slug: 'traffic-vehicles',
    title: 'Traffic & Vehicle Services',
    titleAr: 'خدمات المرور والمركبات',
    description: 'Vehicle registration, driving license services, and traffic-related permits.',
    descriptionAr: 'تسجيل المركبات وخدمات رخص القيادة والتصاريح المرورية.',
    icon: Car,
    processingDays: '2-3 business days',
    processingDaysAr: '٢-٣ أيام عمل',
    feeBase: 381, feeVAT: 19, feeTotal: 400,
    feeBaseDisplay: 'AED 381', feeBaseDisplayAr: '٣٨١ د.إ',
    feeVATDisplay: 'AED 19', feeVATDisplayAr: '١٩ د.إ',
    feeTotalDisplay: 'AED 400', feeTotalDisplayAr: '٤٠٠ د.إ',
    feeAmountDisplay: 'AED 400', feeAmountDisplayAr: '٤٠٠ د.إ',
    feeBreakdown: '(AED 381 + 5% VAT)', feeBreakdownAr: '(٣٨١ د.إ + ٥٪ ضريبة)',
    requiredDocs: [
      { label: 'Valid National ID (front & back)', labelAr: 'الهوية الوطنية (الأمام والخلف)' },
      { label: 'Current driving license or vehicle registration', labelAr: 'رخصة القيادة الحالية أو تسجيل المركبة' },
      { label: 'Vehicle insurance document', labelAr: 'وثيقة تأمين المركبة' },
    ],
    formFields: [
      { id: 'service-type', label: 'Service Type', labelAr: 'نوع الخدمة', type: 'select', defaultValue: 'license-renewal', options: [
        { value: 'license-renewal', label: 'Driving License Renewal', labelAr: 'تجديد رخصة القيادة' },
        { value: 'new-license', label: 'New Driving License', labelAr: 'رخصة قيادة جديدة' },
        { value: 'vehicle-reg', label: 'Vehicle Registration', labelAr: 'تسجيل مركبة' },
        { value: 'plate-transfer', label: 'Plate Number Transfer', labelAr: 'نقل لوحة أرقام' },
      ]},
      { id: 'plate-number', label: 'Plate / License Number', labelAr: 'رقم اللوحة / الرخصة', type: 'text', dir: 'ltr', defaultValue: 'A 12345' },
      { id: 'vehicle-make', label: 'Vehicle Make & Model', labelAr: 'نوع وطراز المركبة', type: 'text', dir: 'ltr', defaultValue: 'Toyota Camry 2024' },
      { id: 'name-en', label: 'Owner Name (English)', labelAr: 'اسم المالك (إنجليزي)', type: 'text', dir: 'ltr', defaultValue: 'Ahmed Mohammed Al Falasi' },
      { id: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'text', dir: 'ltr', defaultValue: '+971 50 123 4567' },
    ],
    uploadFields: [
      { id: 'upload-id', label: 'Upload National ID', labelAr: 'رفع الهوية الوطنية', accept: '.pdf,.jpg,.png' },
      { id: 'upload-license', label: 'Upload Driving License / Registration', labelAr: 'رفع رخصة القيادة / التسجيل', accept: '.pdf,.jpg,.png' },
      { id: 'upload-insurance', label: 'Upload Insurance Document', labelAr: 'رفع وثيقة التأمين', accept: '.pdf' },
    ],
  },
  'housing': {
    slug: 'housing',
    title: 'Housing Application',
    titleAr: 'طلب إسكان',
    description: 'Apply for government housing programs, tenant services, and property registration.',
    descriptionAr: 'التقديم لبرامج الإسكان الحكومية وخدمات المستأجرين وتسجيل العقارات.',
    icon: HouseSimple,
    processingDays: '10-15 business days',
    processingDaysAr: '١٠-١٥ يوم عمل',
    feeBase: 0, feeVAT: 0, feeTotal: 0,
    feeBaseDisplay: 'Free', feeBaseDisplayAr: 'مجاني',
    feeVATDisplay: 'AED 0', feeVATDisplayAr: '٠ د.إ',
    feeTotalDisplay: 'Free', feeTotalDisplayAr: 'مجاني',
    feeAmountDisplay: 'Free', feeAmountDisplayAr: 'مجاني',
    feeBreakdown: '(No fees)', feeBreakdownAr: '(بدون رسوم)',
    requiredDocs: [
      { label: 'Valid National ID (front & back)', labelAr: 'الهوية الوطنية (الأمام والخلف)' },
      { label: 'Income certificate', labelAr: 'شهادة الدخل' },
      { label: 'Family book', labelAr: 'خلاصة القيد' },
      { label: 'Passport copy', labelAr: 'صورة جواز السفر' },
    ],
    formFields: [
      { id: 'name-en', label: 'Applicant Name (English)', labelAr: 'اسم مقدم الطلب (إنجليزي)', type: 'text', dir: 'ltr', defaultValue: 'Ahmed Mohammed Al Falasi' },
      { id: 'name-ar', label: 'Applicant Name (Arabic)', labelAr: 'اسم مقدم الطلب (عربي)', type: 'text', dir: 'rtl', defaultValue: 'أحمد محمد الفلاسي' },
      { id: 'family-size', label: 'Family Size', labelAr: 'عدد أفراد الأسرة', type: 'select', defaultValue: '4', options: [
        { value: '1', label: '1 Person', labelAr: 'شخص واحد' },
        { value: '2-3', label: '2-3 People', labelAr: '٢-٣ أشخاص' },
        { value: '4', label: '4-5 People', labelAr: '٤-٥ أشخاص' },
        { value: '6+', label: '6+ People', labelAr: '٦+ أشخاص' },
      ]},
      { id: 'income-range', label: 'Monthly Income Range', labelAr: 'نطاق الدخل الشهري', type: 'select', defaultValue: 'mid', options: [
        { value: 'low', label: 'Below AED 10,000', labelAr: 'أقل من ١٠٬٠٠٠ د.إ' },
        { value: 'mid', label: 'AED 10,000 - 25,000', labelAr: '١٠٬٠٠٠ - ٢٥٬٠٠٠ د.إ' },
        { value: 'high', label: 'AED 25,000 - 50,000', labelAr: '٢٥٬٠٠٠ - ٥٠٬٠٠٠ د.إ' },
      ]},
      { id: 'housing-type', label: 'Preferred Housing Type', labelAr: 'نوع السكن المفضل', type: 'select', defaultValue: 'villa', options: [
        { value: 'apartment', label: 'Apartment', labelAr: 'شقة' },
        { value: 'villa', label: 'Villa', labelAr: 'فيلا' },
        { value: 'townhouse', label: 'Townhouse', labelAr: 'تاون هاوس' },
      ]},
      { id: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'text', dir: 'ltr', defaultValue: '+971 50 123 4567' },
      { id: 'email', label: 'Email Address', labelAr: 'البريد الإلكتروني', type: 'text', dir: 'ltr', defaultValue: 'ahmed.falasi@email.com' },
    ],
    uploadFields: [
      { id: 'upload-id', label: 'Upload National ID', labelAr: 'رفع الهوية الوطنية', accept: '.pdf,.jpg,.png' },
      { id: 'upload-income', label: 'Upload Income Certificate', labelAr: 'رفع شهادة الدخل', accept: '.pdf' },
      { id: 'upload-family', label: 'Upload Family Book', labelAr: 'رفع خلاصة القيد', accept: '.pdf' },
      { id: 'upload-passport', label: 'Upload Passport Copy', labelAr: 'رفع صورة جواز السفر', accept: '.pdf,.jpg,.png' },
    ],
  },
  'employment': {
    slug: 'employment',
    title: 'Employment Services',
    titleAr: 'خدمات التوظيف',
    description: 'Work permits, labor contracts, and employment-related government services.',
    descriptionAr: 'تصاريح العمل وعقود العمل والخدمات الحكومية المتعلقة بالتوظيف.',
    icon: UsersThree,
    processingDays: '3-5 business days',
    processingDaysAr: '٣-٥ أيام عمل',
    feeBase: 286, feeVAT: 14, feeTotal: 300,
    feeBaseDisplay: 'AED 286', feeBaseDisplayAr: '٢٨٦ د.إ',
    feeVATDisplay: 'AED 14', feeVATDisplayAr: '١٤ د.إ',
    feeTotalDisplay: 'AED 300', feeTotalDisplayAr: '٣٠٠ د.إ',
    feeAmountDisplay: 'AED 300', feeAmountDisplayAr: '٣٠٠ د.إ',
    feeBreakdown: '(AED 286 + 5% VAT)', feeBreakdownAr: '(٢٨٦ د.إ + ٥٪ ضريبة)',
    requiredDocs: [
      { label: 'Valid National ID (front & back)', labelAr: 'الهوية الوطنية (الأمام والخلف)' },
      { label: 'Passport copy', labelAr: 'صورة جواز السفر' },
      { label: 'Job offer letter', labelAr: 'خطاب عرض العمل' },
      { label: 'Medical fitness certificate', labelAr: 'شهادة اللياقة الطبية' },
    ],
    formFields: [
      { id: 'employer-name', label: 'Employer Name', labelAr: 'اسم صاحب العمل', type: 'text', dir: 'ltr', defaultValue: 'Noor Digital Solutions LLC' },
      { id: 'job-title', label: 'Job Title', labelAr: 'المسمى الوظيفي', type: 'text', dir: 'ltr', defaultValue: 'Senior Software Engineer' },
      { id: 'contract-type', label: 'Contract Type', labelAr: 'نوع العقد', type: 'select', defaultValue: 'full-time', options: [
        { value: 'full-time', label: 'Full-time', labelAr: 'دوام كامل' },
        { value: 'part-time', label: 'Part-time', labelAr: 'دوام جزئي' },
        { value: 'temporary', label: 'Temporary', labelAr: 'مؤقت' },
        { value: 'freelance', label: 'Freelance', labelAr: 'عمل حر' },
      ]},
      { id: 'worker-nationality', label: 'Worker Nationality', labelAr: 'جنسية العامل', type: 'select', defaultValue: 'egypt', options: NATIONALITY_OPTIONS },
      { id: 'name-en', label: 'Worker Name (English)', labelAr: 'اسم العامل (إنجليزي)', type: 'text', dir: 'ltr', defaultValue: 'Ahmed Mohammed Al Falasi' },
      { id: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'text', dir: 'ltr', defaultValue: '+971 50 123 4567' },
      { id: 'email', label: 'Email Address', labelAr: 'البريد الإلكتروني', type: 'text', dir: 'ltr', defaultValue: 'ahmed.falasi@email.com' },
    ],
    uploadFields: [
      { id: 'upload-id', label: 'Upload National ID', labelAr: 'رفع الهوية الوطنية', accept: '.pdf,.jpg,.png' },
      { id: 'upload-passport', label: 'Upload Passport Copy', labelAr: 'رفع صورة جواز السفر', accept: '.pdf,.jpg,.png' },
      { id: 'upload-offer', label: 'Upload Job Offer Letter', labelAr: 'رفع خطاب عرض العمل', accept: '.pdf' },
      { id: 'upload-medical', label: 'Upload Medical Fitness Certificate', labelAr: 'رفع شهادة اللياقة الطبية', accept: '.pdf' },
    ],
  },
}

// ---------------------------------------------------------------------------
// Translations (shared UI strings)
// ---------------------------------------------------------------------------

const t = {
  en: {
    dashboard: 'Dashboard',
    services: 'Services',
    processingTime: 'Processing Time',
    serviceFee: 'Service Fee',
    requiredDocs: 'Required Documents',
    docsChecklist: 'Before starting, ensure you have these documents ready:',
    startApplication: 'Start Application',
    step1Title: 'Personal Information',
    step1Desc: 'Your personal details',
    step2Title: 'Documents',
    step2Desc: 'Upload required documents',
    step3Title: 'Payment',
    step3Desc: 'Fee payment',
    step4Title: 'Review & Submit',
    step4Desc: 'Review and confirm',
    next: 'Next',
    previous: 'Previous',
    acceptedFormats: 'PDF, JPG or PNG up to 5MB',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit/Debit Card',
    bankTransfer: 'Bank Transfer',
    cardNumber: 'Card Number',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Expiry Date',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '***',
    cardholderName: 'Cardholder Name',
    cardholderPlaceholder: 'Name on card',
    feeSummary: 'Fee Summary',
    baseFee: 'Service Fee',
    vat: 'VAT (5%)',
    total: 'Total',
    reviewTitle: 'Review Your Application',
    personalInfo: 'Personal Information',
    documents: 'Documents',
    payment: 'Payment',
    termsAgree: 'I confirm that all information provided is accurate and I agree to the terms and conditions',
    submitApplication: 'Submit Application',
    filesUploaded: 'files uploaded',
    editSection: 'Edit',
    selectOption: 'Select...',
    selectPayment: 'Select payment method',
    paymentNote: 'Payment will be charged after application review and approval',
    freeServiceNote: 'This is a free government service. No fees apply.',
    // Success state
    applicationSubmitted: 'Application Submitted Successfully!',
    refNumber: 'Reference Number',
    estimatedCompletion: 'Estimated Completion',
    nextSteps: 'What happens next?',
    nextStepsDesc: 'You will receive an SMS and email notification when your application status changes. You can track your application anytime from the Applications page.',
    viewApplication: 'View Application',
    backToDashboard: 'Back to Dashboard',
    submittedSuccessfully: 'Application submitted',
    submittedSuccessfullyDesc: 'Your application has been submitted successfully.',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    services: 'الخدمات',
    processingTime: 'وقت المعالجة',
    serviceFee: 'رسوم الخدمة',
    requiredDocs: 'المستندات المطلوبة',
    docsChecklist: 'قبل البدء، تأكد من تجهيز هذه المستندات:',
    startApplication: 'بدء التقديم',
    step1Title: 'المعلومات الشخصية',
    step1Desc: 'بياناتك الشخصية',
    step2Title: 'المستندات',
    step2Desc: 'رفع المستندات المطلوبة',
    step3Title: 'الدفع',
    step3Desc: 'دفع الرسوم',
    step4Title: 'المراجعة والتقديم',
    step4Desc: 'مراجعة وتأكيد',
    next: 'التالي',
    previous: 'السابق',
    acceptedFormats: 'PDF أو JPG أو PNG بحد أقصى ٥ ميغابايت',
    paymentMethod: 'طريقة الدفع',
    creditCard: 'بطاقة ائتمان/خصم',
    bankTransfer: 'تحويل بنكي',
    cardNumber: 'رقم البطاقة',
    cardNumberPlaceholder: '١٢٣٤ ٥٦٧٨ ٩٠١٢ ٣٤٥٦',
    expiryDate: 'تاريخ الانتهاء',
    expiryPlaceholder: 'شهر/سنة',
    cvv: 'CVV',
    cvvPlaceholder: '***',
    cardholderName: 'اسم حامل البطاقة',
    cardholderPlaceholder: 'الاسم على البطاقة',
    feeSummary: 'ملخص الرسوم',
    baseFee: 'رسوم الخدمة',
    vat: 'الضريبة (٥٪)',
    total: 'الإجمالي',
    reviewTitle: 'مراجعة طلبك',
    personalInfo: 'المعلومات الشخصية',
    documents: 'المستندات',
    payment: 'الدفع',
    termsAgree: 'أؤكد أن جميع المعلومات المقدمة صحيحة وأوافق على الشروط والأحكام',
    submitApplication: 'تقديم الطلب',
    filesUploaded: 'ملفات تم رفعها',
    editSection: 'تعديل',
    selectOption: 'اختر...',
    selectPayment: 'اختر طريقة الدفع',
    paymentNote: 'سيتم الخصم بعد مراجعة الطلب والموافقة عليه',
    freeServiceNote: 'هذه خدمة حكومية مجانية. لا توجد رسوم.',
    // Success state
    applicationSubmitted: 'تم تقديم الطلب بنجاح!',
    refNumber: 'رقم المرجع',
    estimatedCompletion: 'الإكمال المتوقع',
    nextSteps: 'ماذا يحدث بعد ذلك؟',
    nextStepsDesc: 'ستتلقى إشعاراً عبر الرسائل النصية والبريد الإلكتروني عند تغيير حالة طلبك. يمكنك تتبع طلبك في أي وقت من صفحة الطلبات.',
    viewApplication: 'عرض الطلب',
    backToDashboard: 'العودة للوحة التحكم',
    submittedSuccessfully: 'تم تقديم الطلب',
    submittedSuccessfullyDesc: 'تم تقديم طلبك بنجاح.',
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ServiceApplicationPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]
  const params = useParams()
  const serviceId = params.id as string

  const service = SERVICE_CATALOG[serviceId] || SERVICE_CATALOG['visa-residency']
  const ServiceIcon = service.icon

  const [started, setStarted] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState('credit-card')
  const [refNumber] = React.useState(() => `GOV-2026-${String(Math.floor(10000 + Math.random() * 90000))}`)

  const Arrow = isRTL ? ArrowLeft : ArrowRight
  const BackArrow = isRTL ? ArrowRight : ArrowLeft

  const serviceTitle = isRTL ? service.titleAr : service.title
  const serviceDesc = isRTL ? service.descriptionAr : service.description
  const processingDays = isRTL ? service.processingDaysAr : service.processingDays
  const feeAmount = isRTL ? service.feeAmountDisplayAr : service.feeAmountDisplay
  const feeBreakdown = isRTL ? service.feeBreakdownAr : service.feeBreakdown
  const feeBase = isRTL ? service.feeBaseDisplayAr : service.feeBaseDisplay
  const feeVAT = isRTL ? service.feeVATDisplayAr : service.feeVATDisplay
  const feeTotal = isRTL ? service.feeTotalDisplayAr : service.feeTotalDisplay
  const isFreeService = service.feeTotal === 0

  const steps = [
    { id: 'personal', title: h.step1Title, description: h.step1Desc },
    { id: 'documents', title: h.step2Title, description: h.step2Desc },
    ...(isFreeService ? [] : [{ id: 'payment', title: h.step3Title, description: h.step3Desc }]),
    { id: 'review', title: h.step4Title, description: h.step4Desc },
  ]

  const reviewStepIndex = isFreeService ? 2 : 3
  const paymentStepIndex = 2

  const handleSubmit = () => {
    setSubmitted(true)
    toast({ title: h.submittedSuccessfully, description: h.submittedSuccessfullyDesc, variant: 'success' })
  }

  // ── Dynamic field renderer ──────────────────────────────────────────────
  function renderField(field: FormField) {
    const fieldLabel = isRTL ? field.labelAr : field.label
    if (field.type === 'select' && field.options) {
      return (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{fieldLabel}</Label>
          <Select defaultValue={field.defaultValue}>
            <SelectTrigger id={field.id}>
              <SelectValue placeholder={h.selectOption} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {isRTL ? opt.labelAr : opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }
    if (field.type === 'date') {
      return (
        <div key={field.id} className="space-y-2">
          <Label>{fieldLabel}</Label>
          <DatePicker placeholder={fieldLabel} className="w-full" />
        </div>
      )
    }
    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id}>{fieldLabel}</Label>
        <Input id={field.id} dir={field.dir} defaultValue={field.defaultValue} />
      </div>
    )
  }

  // ── Success / Confirmation State ────────────────────────────────────────
  if (submitted) {
    return (
      <div className="container py-8">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-6 bg-success/10 rounded-full">
            <Confetti className="h-16 w-16 text-success" weight="duotone" />
          </div>

          <h1 className="text-2xl font-bold ltr:tracking-tight">{h.applicationSubmitted}</h1>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.services}</span>
                <span className="font-medium">{serviceTitle}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.refNumber}</span>
                <span dir="ltr" className="font-mono font-medium">{refNumber}</span>
              </div>
              <Separator />
              {!isFreeService && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{h.total}</span>
                    <span className="font-medium">{feeTotal}</span>
                  </div>
                  <Separator />
                </>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.estimatedCompletion}</span>
                <span className="font-medium">{processingDays}</span>
              </div>
            </CardContent>
          </Card>

          <Callout type="info" title={h.nextSteps}>
            <p>{h.nextStepsDesc}</p>
          </Callout>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/examples/government/applications/1">
                {h.viewApplication}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/examples/government/dashboard">
                {h.backToDashboard}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ── Pre-application info screen ─────────────────────────────────────────
  if (!started) {
    return (
      <div className="container py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/examples/government/dashboard">{h.dashboard}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/examples/government/services">{h.services}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{serviceTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-4 bg-primary/10 rounded-xl">
                <ServiceIcon className="h-10 w-10 text-primary" weight="duotone" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{serviceTitle}</h1>
                <p className="text-muted-foreground text-sm">{serviceDesc}</p>
              </div>
            </div>

            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-muted-foreground">{h.processingTime}:</span>
                <span className="font-medium">{processingDays}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CurrencyDollar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-muted-foreground">{h.serviceFee}:</span>
                <span className="font-medium">{feeAmount}</span>
                {!isFreeService && <span className="text-xs text-muted-foreground">{feeBreakdown}</span>}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-semibold mb-3">{h.requiredDocs}</h2>
              <p className="text-sm text-muted-foreground mb-4">{h.docsChecklist}</p>
              <div className="space-y-2">
                {service.requiredDocs.map((doc) => (
                  <div key={doc.label} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
                    <span>{isRTL ? doc.labelAr : doc.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button size="lg" onClick={() => setStarted(true)}>
              {h.startApplication}
              <Arrow className="h-4 w-4 ms-2" aria-hidden="true" />
            </Button>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4" aria-hidden="true" />
                  {h.requiredDocs}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.requiredDocs.map((doc) => (
                    <li key={doc.label} className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{isRTL ? doc.labelAr : doc.label}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span>{processingDays}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CurrencyDollar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span>{feeAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ── Multi-step application form ─────────────────────────────────────────
  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/government/dashboard">{h.dashboard}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/examples/government/services">{h.services}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{serviceTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-6">{serviceTitle}</h1>

      <div className="mb-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(step) => { if (step < currentStep) setCurrentStep(step) }}
          orientation="horizontal"
          variant="default"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">

          {/* ── Step 1: Personal Information (dynamic fields) ── */}
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{h.step1Title}</CardTitle>
                <CardDescription>{h.step1Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {service.formFields.map((field) => renderField(field))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setCurrentStep(1)}>
                    {h.next}
                    <Arrow className="h-4 w-4 ms-2" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Step 2: Documents (dynamic upload fields) ── */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>{h.step2Title}</CardTitle>
                <CardDescription>{h.step2Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {service.uploadFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label>{isRTL ? field.labelAr : field.label}</Label>
                    <FileUpload accept={field.accept} maxSize={5 * 1024 * 1024} />
                    <p className="text-xs text-muted-foreground">{h.acceptedFormats}</p>
                  </div>
                ))}
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(0)}>
                    <BackArrow className="h-4 w-4 me-2" aria-hidden="true" />
                    {h.previous}
                  </Button>
                  <Button onClick={() => setCurrentStep(isFreeService ? 2 : 2)}>
                    {h.next}
                    <Arrow className="h-4 w-4 ms-2" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Step 3: Payment (skip for free services) ── */}
          {!isFreeService && currentStep === paymentStepIndex && (
            <Card>
              <CardHeader>
                <CardTitle>{h.step3Title}</CardTitle>
                <CardDescription>{h.step3Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="payment-method">{h.paymentMethod}</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder={h.selectPayment} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">
                        <span className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" aria-hidden="true" />
                          {h.creditCard}
                        </span>
                      </SelectItem>
                      <SelectItem value="bank-transfer">
                        <span className="flex items-center gap-2">
                          <Bank className="h-4 w-4" aria-hidden="true" />
                          {h.bankTransfer}
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Card input fields */}
                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">{h.cardNumber}</Label>
                      <Input id="card-number" dir="ltr" placeholder={h.cardNumberPlaceholder} maxLength={19} />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="card-expiry">{h.expiryDate}</Label>
                        <Input id="card-expiry" dir="ltr" placeholder={h.expiryPlaceholder} maxLength={5} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvv">{h.cvv}</Label>
                        <Input id="card-cvv" dir="ltr" placeholder={h.cvvPlaceholder} maxLength={4} type="password" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholder">{h.cardholderName}</Label>
                      <Input id="cardholder" dir="ltr" placeholder={h.cardholderPlaceholder} />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">{h.feeSummary}</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{h.baseFee}</span>
                    <span>{feeBase}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{h.vat}</span>
                    <span>{feeVAT}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>{h.total}</span>
                    <span>{feeTotal}</span>
                  </div>
                </div>

                <Callout type="info" title="">
                  <p className="text-sm">{h.paymentNote}</p>
                </Callout>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <BackArrow className="h-4 w-4 me-2" aria-hidden="true" />
                    {h.previous}
                  </Button>
                  <Button onClick={() => setCurrentStep(reviewStepIndex)}>
                    {h.next}
                    <Arrow className="h-4 w-4 ms-2" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Review Step ── */}
          {currentStep === reviewStepIndex && (
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
                    {service.formFields.slice(0, 4).map((field) => (
                      <div key={field.id} className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? field.labelAr : field.label}</span>
                        <span dir={field.dir} className={field.type === 'select' ? '' : ''}>
                          {field.defaultValue || '—'}
                        </span>
                      </div>
                    ))}
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
                    <p className="text-muted-foreground">{service.uploadFields.length} {h.filesUploaded}</p>
                  </div>
                </div>

                {/* Payment Summary */}
                {!isFreeService && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{h.payment}</h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(paymentStepIndex)} aria-label={`${h.editSection} ${h.payment}`}>
                        {h.editSection}
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{h.paymentMethod}</span>
                        <span>{paymentMethod === 'credit-card' ? h.creditCard : h.bankTransfer}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>{h.total}</span>
                        <span>{feeTotal}</span>
                      </div>
                    </div>
                  </div>
                )}

                {isFreeService && (
                  <Callout type="info" title="">
                    <p className="text-sm">{h.freeServiceNote}</p>
                  </Callout>
                )}

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
                  <Button variant="outline" onClick={() => setCurrentStep(isFreeService ? 1 : paymentStepIndex)}>
                    <BackArrow className="h-4 w-4 me-2" aria-hidden="true" />
                    {h.previous}
                  </Button>
                  <Button disabled={!termsAccepted} onClick={handleSubmit}>
                    {h.submitApplication}
                    <CheckCircle className="h-4 w-4 ms-2" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-4 w-4" aria-hidden="true" />
                {h.requiredDocs}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {service.requiredDocs.map((doc) => (
                  <li key={doc.label} className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{isRTL ? doc.labelAr : doc.label}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>{processingDays}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyDollar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>{feeAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
