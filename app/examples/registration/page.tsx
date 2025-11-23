'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  validators,
  composeValidators,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import {
  Sunrise,
  User,
  MapPin,
  FileText,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

type Step = 'personal' | 'address' | 'preferences' | 'review' | 'success'

const STEPS: Step[] = ['personal', 'address', 'preferences', 'review']

const STEP_LABELS = {
  personal: { en: 'Personal Info', ar: 'المعلومات الشخصية' },
  address: { en: 'Address', ar: 'العنوان' },
  preferences: { en: 'Preferences', ar: 'التفضيلات' },
  review: { en: 'Review', ar: 'المراجعة' },
  success: { en: 'Success', ar: 'نجح' },
}

export default function RegistrationPage() {
  const { locale } = useDirection()
  const t = content[locale].registrationPage
  const tCommon = content[locale]
  const [currentStep, setCurrentStep] = React.useState<Step>('personal')
  const [isRTL, setIsRTL] = React.useState(false)
  const [formData, setFormData] = React.useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',

    // Preferences
    language: '',
    notifications: false,
    newsletter: false,
    bio: '',
  })

  React.useEffect(() => {
    setIsRTL(document.documentElement.dir === 'rtl')

    const observer = new MutationObserver(() => {
      setIsRTL(document.documentElement.dir === 'rtl')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    })

    return () => observer.disconnect()
  }, [])

  const currentStepIndex = STEPS.indexOf(currentStep)
  const progress = currentStep === 'success' ? 100 : ((currentStepIndex + 1) / STEPS.length) * 100

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex])
    }
  }

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex])
    }
  }

  const handleStepSubmit = (values: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...values }))

    if (currentStep === 'review') {
      // Simulate API call
      setTimeout(() => {
        setCurrentStep('success')
      }, 1500)
    } else {
      goToNextStep()
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sunrise className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Noor UI</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DirectionToggle />
          </div>
        </div>
      </header>

      <main className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {tCommon.nav.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples" className="hover:text-foreground transition-colors">
                {tCommon.nav.examples}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {t.breadcrumb.registration}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isRTL
              ? 'مثال شامل على نموذج بخطوات متعددة مع التحقق من الصحة والدعم الكامل للغة العربية'
              : 'A comprehensive example of a multi-step form with validation and full RTL support'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {t.progress}
              </span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Steps Indicator */}
        {currentStep !== 'success' && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="grid grid-cols-4 gap-2">
              {STEPS.map((step, index) => (
                <div
                  key={step}
                  className={`text-center ${
                    index <= currentStepIndex ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        index < currentStepIndex
                          ? 'bg-primary text-primary-foreground'
                          : index === currentStepIndex
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index < currentStepIndex ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="text-xs font-medium">
                      {isRTL ? STEP_LABELS[step].ar : STEP_LABELS[step].en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="max-w-3xl mx-auto">
          {currentStep === 'success' ? (
            <Card>
              <CardContent className="p-12 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    {t.success.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {isRTL
                      ? 'تم إنشاء حسابك بنجاح. ستتلقى بريدًا إلكترونيًا للتأكيد قريبًا.'
                      : 'Your account has been created successfully. You will receive a confirmation email shortly.'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => setCurrentStep('personal')}>
                    {t.success.createAnother}
                  </Button>
                  <Link href="/">
                    <Button variant="outline">
                      {t.success.backToHome}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {currentStep === 'personal' && <User className="h-6 w-6 text-primary" />}
                  {currentStep === 'address' && <MapPin className="h-6 w-6 text-primary" />}
                  {currentStep === 'preferences' && <FileText className="h-6 w-6 text-primary" />}
                  {currentStep === 'review' && <CheckCircle2 className="h-6 w-6 text-primary" />}
                  <div>
                    <CardTitle>
                      {isRTL ? STEP_LABELS[currentStep].ar : STEP_LABELS[currentStep].en}
                    </CardTitle>
                    <CardDescription>
                      {currentStep === 'personal' &&
                        (isRTL
                          ? 'أدخل معلوماتك الشخصية الأساسية'
                          : 'Enter your basic personal information')}
                      {currentStep === 'address' &&
                        (t.stepDescriptions.address)}
                      {currentStep === 'preferences' &&
                        (t.stepDescriptions.preferences)}
                      {currentStep === 'review' &&
                        (t.stepDescriptions.review)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentStep === 'personal' && (
                  <PersonalInfoStep
                    initialValues={formData}
                    onSubmit={handleStepSubmit}
                    onBack={null}
                    isRTL={isRTL}
                  />
                )}
                {currentStep === 'address' && (
                  <AddressStep
                    initialValues={formData}
                    onSubmit={handleStepSubmit}
                    onBack={goToPreviousStep}
                    isRTL={isRTL}
                  />
                )}
                {currentStep === 'preferences' && (
                  <PreferencesStep
                    initialValues={formData}
                    onSubmit={handleStepSubmit}
                    onBack={goToPreviousStep}
                    isRTL={isRTL}
                  />
                )}
                {currentStep === 'review' && (
                  <ReviewStep
                    initialValues={formData}
                    data={formData}
                    onSubmit={handleStepSubmit}
                    onBack={goToPreviousStep}
                    isRTL={isRTL}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

// Step Components
interface StepProps {
  initialValues: Record<string, any>
  onSubmit: (values: Record<string, any>) => void
  onBack: (() => void) | null
  isRTL: boolean
}

function PersonalInfoStep({ initialValues, onSubmit, onBack, isRTL }: StepProps) {
  const { locale } = useDirection()
  const t = content[locale].registrationPage

  return (
    <Form
      initialValues={initialValues}
      validators={{
        firstName: validators.required(t.validationErrors.firstNameRequired),
        lastName: validators.required(t.validationErrors.lastNameRequired),
        email: composeValidators(
          validators.required(t.validationErrors.emailRequired),
          validators.email(t.validationErrors.emailInvalid)
        ),
        phone: validators.required(t.validationErrors.phoneRequired),
      }}
      onSubmit={onSubmit}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField name="firstName">
            {({ field, error, touched }) => (
              <FormItem>
                <FormLabel required>{t.fields.firstName}</FormLabel>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={t.placeholders.firstName}
                />
                {touched && <FormMessage error={error} />}
              </FormItem>
            )}
          </FormField>

          <FormField name="lastName">
            {({ field, error, touched }) => (
              <FormItem>
                <FormLabel required>{t.fields.lastName}</FormLabel>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={t.placeholders.lastName}
                />
                {touched && <FormMessage error={error} />}
              </FormItem>
            )}
          </FormField>
        </div>

        <FormField name="email">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>{t.fields.email}</FormLabel>
              <Input
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
                type="email"
                placeholder="ahmed@example.com"
              />
              <FormDescription>
                {t.formDescriptions.emailPrivacy}
              </FormDescription>
              {touched && <FormMessage error={error} />}
            </FormItem>
          )}
        </FormField>

        <FormField name="phone">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>{t.fields.phone}</FormLabel>
              <Input
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
                type="tel"
                placeholder="+966 50 123 4567"
              />
              {touched && <FormMessage error={error} />}
            </FormItem>
          )}
        </FormField>

        <div className="flex justify-end gap-3 pt-4">
          <ButtonArrow type="submit" direction="forward" icon="arrow">
            {t.buttons.next}
          </ButtonArrow>
        </div>
      </div>
    </Form>
  )
}

function AddressStep({ initialValues, onSubmit, onBack, isRTL }: StepProps) {
  const { locale } = useDirection()
  const t = content[locale].registrationPage

  return (
    <Form
      initialValues={initialValues}
      validators={{
        street: validators.required(t.validationErrors.streetRequired),
        city: validators.required(t.validationErrors.cityRequired),
        country: validators.required(t.validationErrors.countryRequired),
      }}
      onSubmit={onSubmit}
    >
      <div className="space-y-4">
        <FormField name="street">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>{t.fields.streetAddress}</FormLabel>
              <Input
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={t.placeholders.streetAddress}
              />
              {touched && <FormMessage error={error} />}
            </FormItem>
          )}
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField name="city">
            {({ field, error, touched }) => (
              <FormItem>
                <FormLabel required>{t.fields.city}</FormLabel>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={t.placeholders.city}
                />
                {touched && <FormMessage error={error} />}
              </FormItem>
            )}
          </FormField>

          <FormField name="state">
            {({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.stateProvince}</FormLabel>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={t.placeholders.stateProvince}
                />
              </FormItem>
            )}
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField name="zipCode">
            {({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.postalCode}</FormLabel>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="12345"
                />
              </FormItem>
            )}
          </FormField>

          <FormField name="country">
            {({ field, error, touched }) => (
              <FormItem>
                <FormLabel required>{t.fields.country}</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.placeholders.selectCountry} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sa">{t.countries.sa}</SelectItem>
                    <SelectItem value="ae">{t.countries.ae}</SelectItem>
                    <SelectItem value="kw">{t.countries.kw}</SelectItem>
                    <SelectItem value="qa">{t.countries.qa}</SelectItem>
                    <SelectItem value="bh">{t.countries.bh}</SelectItem>
                    <SelectItem value="om">{t.countries.om}</SelectItem>
                  </SelectContent>
                </Select>
                {touched && <FormMessage error={error} />}
              </FormItem>
            )}
          </FormField>
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <ButtonArrow type="button" variant="outline" direction="back" icon="arrow" onClick={onBack!}>
            {t.buttons.previous}
          </ButtonArrow>
          <ButtonArrow type="submit" direction="forward" icon="arrow">
            {t.buttons.next}
          </ButtonArrow>
        </div>
      </div>
    </Form>
  )
}

function PreferencesStep({ initialValues, onSubmit, onBack, isRTL }: StepProps) {
  const { locale } = useDirection()
  const t = content[locale].registrationPage

  return (
    <Form
      initialValues={initialValues}
      validators={{
        language: validators.required(t.validationErrors.languageRequired),
      }}
      onSubmit={onSubmit}
    >
      <div className="space-y-4">
        <FormField name="language">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>{t.fields.language}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t.placeholders.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">{t.languages.ar}</SelectItem>
                  <SelectItem value="en">{t.languages.en}</SelectItem>
                  <SelectItem value="both">{t.languages.both}</SelectItem>
                </SelectContent>
              </Select>
              {touched && <FormMessage error={error} />}
            </FormItem>
          )}
        </FormField>

        <FormField name="bio">
          {({ field }) => (
            <FormItem>
              <FormLabel>{t.fields.bio}</FormLabel>
              <Textarea
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={t.placeholders.bioPlaceholder}
                rows={4}
              />
              <FormDescription>
                {t.formDescriptions.bioOptional}
              </FormDescription>
            </FormItem>
          )}
        </FormField>

        <Separator />

        <div className="space-y-4">
          <FormField name="notifications">
            {({ field }) => (
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="notifications"
                />
                <div className="space-y-1">
                  <label
                    htmlFor="notifications"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {t.checkboxes.notifications}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {isRTL
                      ? 'احصل على إشعارات حول التحديثات والأخبار المهمة'
                      : 'Get notified about updates and important news'}
                  </p>
                </div>
              </div>
            )}
          </FormField>

          <FormField name="newsletter">
            {({ field }) => (
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="newsletter"
                />
                <div className="space-y-1">
                  <label
                    htmlFor="newsletter"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {t.checkboxes.newsletter}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {isRTL
                      ? 'تلقى رسائل بريدية أسبوعية مع التحديثات'
                      : 'Receive weekly emails with updates'}
                  </p>
                </div>
              </div>
            )}
          </FormField>
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <ButtonArrow type="button" variant="outline" direction="back" icon="arrow" onClick={onBack!}>
            {t.buttons.previous}
          </ButtonArrow>
          <ButtonArrow type="submit" direction="forward" icon="arrow">
            {t.steps.review}
          </ButtonArrow>
        </div>
      </div>
    </Form>
  )
}

function ReviewStep({ data, onSubmit, onBack, isRTL }: StepProps & { data: Record<string, any> }) {
  const { locale } = useDirection()
  const t = content[locale].registrationPage
  const tCommon = content[locale]
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onSubmit(data)
    setIsSubmitting(false)
  }

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value || '—'}</span>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <User className="h-4 w-4" />
            {t.steps.personalInfo}
          </h3>
          <div className="divide-y">
            <InfoRow label={t.review.name} value={`${data.firstName} ${data.lastName}`} />
            <InfoRow label={t.fields.email} value={data.email} />
            <InfoRow label={t.review.phone} value={data.phone} />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {t.steps.address}
          </h3>
          <div className="divide-y">
            <InfoRow label={t.review.street} value={data.street} />
            <InfoRow label={t.fields.city} value={data.city} />
            {data.state && <InfoRow label={t.review.state} value={data.state} />}
            {data.zipCode && <InfoRow label={t.fields.postalCode} value={data.zipCode} />}
            <InfoRow label={t.fields.country} value={data.country} />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t.steps.preferences}
          </h3>
          <div className="divide-y">
            <InfoRow label={t.review.language} value={data.language} />
            {data.bio && <InfoRow label={t.review.bio} value={data.bio} />}
            <div className="py-2">
              <div className="flex gap-2">
                {data.notifications && (
                  <Badge variant="secondary">{t.review.notificationsOn}</Badge>
                )}
                {data.newsletter && (
                  <Badge variant="secondary">{t.review.newsletterOn}</Badge>
                )}
                {!data.notifications && !data.newsletter && (
                  <span className="text-muted-foreground text-sm">
                    {t.review.noAdditional}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <ButtonArrow type="button" variant="outline" direction="back" icon="arrow" onClick={onBack!} disabled={isSubmitting}>
            {t.buttons.previous}
          </ButtonArrow>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="me-2 h-4 w-4 animate-spin" />
                {t.buttons.submitting}
              </>
            ) : (
              <>
                {t.buttons.submit}
                <CheckCircle2 className="ms-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
