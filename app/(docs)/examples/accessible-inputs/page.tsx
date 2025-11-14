'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Mail,
  Phone,
  Globe,
  CreditCard,
  User,
  Lock,
  Calendar,
  Search,
  Hash,
  DollarSign,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

interface InputFieldProps {
  id: string
  label: string
  labelAr: string
  type: string
  placeholder: string
  placeholderAr: string
  pattern?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'url' | 'search' | 'decimal'
  maxLength?: number
  minLength?: number
  icon?: React.ReactNode
  helperText?: string
  helperTextAr?: string
  example?: string
  exampleAr?: string
}

const inputFields: InputFieldProps[] = [
  {
    id: 'email',
    label: 'Email Address',
    labelAr: 'البريد الإلكتروني',
    type: 'email',
    placeholder: 'your.email@example.com',
    placeholderAr: 'your.email@example.com',
    inputMode: 'email',
    icon: <Mail className="h-4 w-4" />,
    helperText: 'We\'ll never share your email with anyone else',
    helperTextAr: 'لن نشارك بريدك الإلكتروني مع أي شخص آخر',
    example: 'ahmed@company.sa',
  },
  {
    id: 'phone',
    label: 'Phone Number',
    labelAr: 'رقم الهاتف',
    type: 'tel',
    placeholder: '+966 50 123 4567',
    placeholderAr: '٠٥٠ ١٢٣ ٤٥٦٧',
    inputMode: 'tel',
    pattern: '[0-9+\\s()-]+',
    maxLength: 20,
    icon: <Phone className="h-4 w-4" />,
    helperText: 'Include country code (e.g., +966 for Saudi Arabia)',
    helperTextAr: 'أضف رمز الدولة (مثال: +966 للسعودية)',
    example: '+966501234567',
  },
  {
    id: 'website',
    label: 'Website URL',
    labelAr: 'رابط الموقع',
    type: 'url',
    placeholder: 'https://example.com',
    placeholderAr: 'https://example.com',
    inputMode: 'url',
    icon: <Globe className="h-4 w-4" />,
    helperText: 'Must start with http:// or https://',
    helperTextAr: 'يجب أن يبدأ بـ http:// أو https://',
    example: 'https://company.sa',
  },
  {
    id: 'card',
    label: 'Card Number',
    labelAr: 'رقم البطاقة',
    type: 'text',
    placeholder: '1234 5678 9012 3456',
    placeholderAr: '١٢٣٤ ٥٦٧٨ ٩٠١٢ ٣٤٥٦',
    inputMode: 'numeric',
    pattern: '[0-9\\s]+',
    maxLength: 19,
    icon: <CreditCard className="h-4 w-4" />,
    helperText: '16-digit card number',
    helperTextAr: 'رقم البطاقة المكون من 16 رقماً',
    example: '4532015112830366',
  },
  {
    id: 'password',
    label: 'Password',
    labelAr: 'كلمة المرور',
    type: 'password',
    placeholder: '••••••••',
    placeholderAr: '••••••••',
    icon: <Lock className="h-4 w-4" />,
    helperText: 'At least 8 characters with uppercase, lowercase, and numbers',
    helperTextAr: 'على الأقل 8 أحرف تحتوي على حروف كبيرة وصغيرة وأرقام',
    minLength: 8,
  },
  {
    id: 'search',
    label: 'Search',
    labelAr: 'بحث',
    type: 'search',
    placeholder: 'Search products...',
    placeholderAr: 'ابحث عن المنتجات...',
    inputMode: 'search',
    icon: <Search className="h-4 w-4" />,
    helperText: 'Press Enter to search',
    helperTextAr: 'اضغط Enter للبحث',
  },
  {
    id: 'postal-code',
    label: 'Postal Code',
    labelAr: 'الرمز البريدي',
    type: 'text',
    placeholder: '12345',
    placeholderAr: '١٢٣٤٥',
    inputMode: 'numeric',
    pattern: '[0-9]{5}',
    maxLength: 5,
    icon: <Hash className="h-4 w-4" />,
    helperText: '5-digit postal code',
    helperTextAr: 'الرمز البريدي المكون من 5 أرقام',
    example: '11564',
  },
  {
    id: 'amount',
    label: 'Amount (SAR)',
    labelAr: 'المبلغ (ريال)',
    type: 'text',
    placeholder: '1,000.00',
    placeholderAr: '١٬٠٠٠٫٠٠',
    inputMode: 'decimal',
    pattern: '[0-9,.]+',
    icon: <DollarSign className="h-4 w-4" />,
    helperText: 'Enter amount in Saudi Riyals',
    helperTextAr: 'أدخل المبلغ بالريال السعودي',
    example: '2500.50',
  },
]

export default function AccessibleInputsPage() {
  const { direction } = useDirection()
  const isRTL = direction === 'rtl'

  const [formData, setFormData] = React.useState<Record<string, string>>({})
  const [validationStatus, setValidationStatus] = React.useState<
    Record<string, 'valid' | 'invalid' | null>
  >({})

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))

    // Simple validation
    const field = inputFields.find(f => f.id === id)
    if (!field) return

    let isValid = true
    if (field.type === 'email') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    } else if (field.type === 'url') {
      isValid = /^https?:\/\/.+/.test(value)
    } else if (field.type === 'tel') {
      isValid = /^[+\d\s()-]+$/.test(value) && value.length >= 10
    } else if (field.pattern) {
      isValid = new RegExp(field.pattern).test(value)
    }

    setValidationStatus(prev => ({
      ...prev,
      [id]: value ? (isValid ? 'valid' : 'invalid') : null,
    }))
  }

  return (
    <div className="container max-w-6xl py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/examples"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          ← {isRTL ? 'العودة إلى الأمثلة' : 'Back to Examples'}
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {isRTL ? 'حقول الإدخال القابلة للوصول' : 'Accessible Input Fields'}
          </h1>
          <Badge variant="secondary" className="text-xs">
            {isRTL ? '٨ أنواع' : '8 Types'}
          </Badge>
        </div>

        <p className="text-xl text-muted-foreground max-w-3xl">
          {isRTL
            ? 'مجموعة شاملة من حقول الإدخال مع دعم كامل لإمكانية الوصول، والتحقق من الصحة، ودعم RTL. جميع الحقول تتبع أفضل ممارسات WCAG 2.1 AA.'
            : 'A comprehensive collection of input fields with full accessibility support, validation, and RTL support. All fields follow WCAG 2.1 AA best practices.'}
        </p>
      </div>

      {/* Accessibility Features */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            {isRTL ? 'ميزات إمكانية الوصول' : 'Accessibility Features'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>{isRTL ? 'علامات ARIA مناسبة' : 'Proper ARIA labels'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>{isRTL ? 'تنقل كامل بلوحة المفاتيح' : 'Full keyboard navigation'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>{isRTL ? 'رسائل خطأ وصفية' : 'Descriptive error messages'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>{isRTL ? 'إدارة التركيز البصري' : 'Focus management'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>{isRTL ? 'دعم قارئ الشاشة' : 'Screen reader support'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>{isRTL ? 'أوضاع إدخال مناسبة للجوال' : 'Appropriate input modes for mobile'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>{isRTL ? 'التحقق من الصحة في الوقت الفعلي' : 'Real-time validation'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>{isRTL ? 'دعم RTL كامل' : 'Full RTL support'}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* Input Fields Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {inputFields.map((field) => {
          const status = validationStatus[field.id]
          const value = formData[field.id] || ''
          const showValidation = status !== null

          return (
            <Card key={field.id} className="relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {field.icon}
                  {isRTL ? field.labelAr : field.label}
                </CardTitle>
                {field.helperText && (
                  <CardDescription>
                    {isRTL ? field.helperTextAr : field.helperText}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Input Field */}
                <div className="space-y-2">
                  <Label htmlFor={field.id}>{isRTL ? field.labelAr : field.label}</Label>
                  <div className="relative">
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={isRTL ? field.placeholderAr : field.placeholder}
                      inputMode={field.inputMode}
                      pattern={field.pattern}
                      maxLength={field.maxLength}
                      value={value}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      aria-describedby={`${field.id}-helper`}
                      aria-invalid={status === 'invalid'}
                      className={cn(
                        showValidation &&
                          (status === 'valid'
                            ? 'border-green-500 focus-visible:ring-green-500'
                            : 'border-red-500 focus-visible:ring-red-500')
                      )}
                    />
                    {showValidation && (
                      <div className="absolute inset-y-0 end-3 flex items-center pointer-events-none">
                        {status === 'valid' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Helper Text / Error */}
                  <p
                    id={`${field.id}-helper`}
                    className={cn(
                      'text-xs',
                      status === 'invalid' ? 'text-red-500' : 'text-muted-foreground'
                    )}
                  >
                    {status === 'invalid'
                      ? isRTL
                        ? 'يرجى إدخال قيمة صحيحة'
                        : 'Please enter a valid value'
                      : isRTL
                      ? field.helperTextAr
                      : field.helperText}
                  </p>
                </div>

                {/* Example Value */}
                {field.example && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      {isRTL ? 'مثال:' : 'Example:'}{' '}
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                        {field.example}
                      </code>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Code Example */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'مثال على الكود' : 'Code Example'}</CardTitle>
            <CardDescription>
              {isRTL
                ? 'مثال على كيفية استخدام حقول الإدخال مع التحقق من الصحة'
                : 'Example of how to use input fields with validation'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input
    id="email"
    type="email"
    placeholder="your.email@example.com"
    inputMode="email"
    aria-describedby="email-helper"
  />
  <p id="email-helper" className="text-xs text-muted-foreground">
    We'll never share your email
  </p>
</div>`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Related Links */}
      <div className="mt-8 flex gap-4">
        <Button asChild variant="outline">
          <Link href="/components/input">{isRTL ? 'وثائق Input' : 'Input Docs'}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/components/label">{isRTL ? 'وثائق Label' : 'Label Docs'}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/components/form">{isRTL ? 'وثائق Form' : 'Form Docs'}</Link>
        </Button>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
