'use client'

import * as React from 'react'
import { Stepper } from '@/components/ui/stepper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'

const stepperProps: PropDefinition[] = [
  {
    name: 'steps',
    type: 'Step[]',
    required: true,
    description: 'Array of step objects with id, title, titleAr, description, optional fields',
  },
  {
    name: 'currentStep',
    type: 'number',
    required: true,
    description: 'Index of the current step (0-based)',
  },
  {
    name: 'onStepClick',
    type: '(step: number) => void',
    required: false,
    description: 'Callback when a step is clicked',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    required: false,
    description: 'Layout orientation of the stepper',
  },
  {
    name: 'variant',
    type: "'default' | 'simple' | 'circles'",
    default: "'default'",
    required: false,
    description: 'Visual style variant',
  },
  {
    name: 'allowSkip',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Allow clicking on future steps',
  },
]

const basicCode = `import { Stepper } from '@/components/ui/stepper'

const steps = [
  { id: '1', title: 'Account', titleAr: 'الحساب' },
  { id: '2', title: 'Profile', titleAr: 'الملف الشخصي' },
  { id: '3', title: 'Complete', titleAr: 'إكمال' },
]

<Stepper steps={steps} currentStep={0} />`

const variantsCode = `// Default variant
<Stepper steps={steps} currentStep={1} variant="default" />

// Simple variant
<Stepper steps={steps} currentStep={1} variant="simple" />

// Circles variant
<Stepper steps={steps} currentStep={1} variant="circles" />`

const verticalCode = `<Stepper
  steps={steps}
  currentStep={1}
  orientation="vertical"
/>`

const interactiveCode = `const [currentStep, setCurrentStep] = useState(0)

<Stepper
  steps={steps}
  currentStep={currentStep}
  onStepClick={(step) => setCurrentStep(step)}
/>`

const typeDefinition = `interface Step {
  id: string
  title: string
  titleAr?: string
  description?: string
  descriptionAr?: string
  optional?: boolean
}`

export default function StepperPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'

  const [currentStep1, setCurrentStep1] = React.useState(0)
  const [currentStep2, setCurrentStep2] = React.useState(1)
  const [currentStep3, setCurrentStep3] = React.useState(1)
  const [currentStep4, setCurrentStep4] = React.useState(1)

  const steps = [
    {
      id: '1',
      title: 'Account Information',
      titleAr: 'معلومات الحساب',
      description: 'Enter your basic details',
      descriptionAr: 'أدخل التفاصيل الأساسية',
    },
    {
      id: '2',
      title: 'Profile Setup',
      titleAr: 'إعداد الملف الشخصي',
      description: 'Customize your profile',
      descriptionAr: 'قم بتخصيص ملفك الشخصي',
    },
    {
      id: '3',
      title: 'Preferences',
      titleAr: 'التفضيلات',
      description: 'Set your preferences',
      descriptionAr: 'حدد تفضيلاتك',
      optional: true,
    },
    {
      id: '4',
      title: 'Complete',
      titleAr: 'إكمال',
      description: 'Review and finish',
      descriptionAr: 'راجع وأنهي',
    },
  ]

  const simpleSteps = [
    { id: '1', title: 'Cart', titleAr: 'السلة' },
    { id: '2', title: 'Shipping', titleAr: 'الشحن' },
    { id: '3', title: 'Payment', titleAr: 'الدفع' },
    { id: '4', title: 'Review', titleAr: 'مراجعة' },
  ]

  return (
    <div className="container mx-auto py-8 space-y-12" dir={direction}>
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">{isRTL ? 'مؤشر الخطوات' : 'Stepper'}</h1>
        <p className="text-lg text-muted-foreground">
          {isRTL
            ? 'مؤشر تقدم متعدد الخطوات للنماذج والأسوات'
            : 'Multi-step progress indicator for forms and wizards'}
        </p>
      </div>

      {/* Basic Example */}
      <ComponentShowcase
        title={isRTL ? 'الاستخدام الأساسي' : 'Basic Usage'}
        description={
          isRTL
            ? 'مؤشر خطوات أساسي مع 4 خطوات'
            : 'Basic stepper with 4 steps'
        }
      >
        <div className="w-full max-w-2xl mx-auto">
          <Stepper steps={steps} currentStep={currentStep1} onStepClick={setCurrentStep1} />
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep1(Math.max(0, currentStep1 - 1))}
              disabled={currentStep1 === 0}
            >
              {isRTL ? 'السابق' : 'Previous'}
            </Button>
            <Button
              onClick={() => setCurrentStep1(Math.min(steps.length - 1, currentStep1 + 1))}
              disabled={currentStep1 === steps.length - 1}
            >
              {isRTL ? 'التالي' : 'Next'}
            </Button>
          </div>
        </div>
      </ComponentShowcase>

      <CodeBlock code={basicCode} language="tsx" title={isRTL ? 'الكود' : 'Code'} />

      {/* Variants */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{isRTL ? 'الأشكال' : 'Variants'}</h2>
          <p className="text-muted-foreground">
            {isRTL
              ? 'ثلاثة أشكال مرئية: افتراضي، بسيط، ودوائر'
              : 'Three visual styles: default, simple, and circles'}
          </p>
        </div>

        {/* Simple Variant */}
        <ComponentShowcase
          title={isRTL ? 'الشكل البسيط' : 'Simple Variant'}
          description={isRTL ? 'شكل مضغوط مثالي للتنقل في الأعلى' : 'Compact style ideal for top navigation'}
        >
          <div className="w-full max-w-2xl mx-auto">
            <Stepper steps={simpleSteps} currentStep={currentStep2} variant="simple" onStepClick={setCurrentStep2} />
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep2(Math.max(0, currentStep2 - 1))}
                disabled={currentStep2 === 0}
              >
                {isRTL ? 'السابق' : 'Previous'}
              </Button>
              <Button
                onClick={() => setCurrentStep2(Math.min(simpleSteps.length - 1, currentStep2 + 1))}
                disabled={currentStep2 === simpleSteps.length - 1}
              >
                {isRTL ? 'التالي' : 'Next'}
              </Button>
            </div>
          </div>
        </ComponentShowcase>

        {/* Circles Variant */}
        <ComponentShowcase
          title={isRTL ? 'شكل الدوائر' : 'Circles Variant'}
          description={isRTL ? 'دوائر كبيرة مع تأثير تكبير' : 'Large circles with scale effect'}
        >
          <div className="w-full max-w-2xl mx-auto">
            <Stepper steps={simpleSteps} currentStep={currentStep3} variant="circles" onStepClick={setCurrentStep3} />
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep3(Math.max(0, currentStep3 - 1))}
                disabled={currentStep3 === 0}
              >
                {isRTL ? 'السابق' : 'Previous'}
              </Button>
              <Button
                onClick={() => setCurrentStep3(Math.min(simpleSteps.length - 1, currentStep3 + 1))}
                disabled={currentStep3 === simpleSteps.length - 1}
              >
                {isRTL ? 'التالي' : 'Next'}
              </Button>
            </div>
          </div>
        </ComponentShowcase>
      </div>

      <CodeBlock code={variantsCode} language="tsx" />

      {/* Vertical Orientation */}
      <ComponentShowcase
        title={isRTL ? 'الاتجاه الرأسي' : 'Vertical Orientation'}
        description={isRTL ? 'مؤشر خطوات رأسي للتخطيطات الجانبية' : 'Vertical stepper for sidebar layouts'}
      >
        <div className="max-w-md mx-auto">
          <Stepper steps={steps} currentStep={currentStep4} orientation="vertical" onStepClick={setCurrentStep4} />
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep4(Math.max(0, currentStep4 - 1))}
              disabled={currentStep4 === 0}
            >
              {isRTL ? 'السابق' : 'Previous'}
            </Button>
            <Button
              onClick={() => setCurrentStep4(Math.min(steps.length - 1, currentStep4 + 1))}
              disabled={currentStep4 === steps.length - 1}
            >
              {isRTL ? 'التالي' : 'Next'}
            </Button>
          </div>
        </div>
      </ComponentShowcase>

      <CodeBlock code={verticalCode} language="tsx" />

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'حالات الاستخدام' : 'Use Cases'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: isRTL ? 'نماذج التسجيل' : 'Registration Forms', icon: '📝' },
            { title: isRTL ? 'عمليات الدفع' : 'Checkout Process', icon: '🛒' },
            { title: isRTL ? 'معالجات الإعداد' : 'Setup Wizards', icon: '⚙️' },
            { title: isRTL ? 'سير العمل متعدد الخطوات' : 'Multi-step Workflows', icon: '🔄' },
          ].map((useCase, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{useCase.icon}</span>
                  {useCase.title}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Type Definition */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'تعريف النوع' : 'Type Definition'}</h2>
        <CodeBlock code={typeDefinition} language="typescript" />
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'مرجع API' : 'API Reference'}</h2>
        <PropsTable props={stepperProps} />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'الميزات' : 'Features'}</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>{isRTL ? 'ثلاثة أشكال مرئية (افتراضي، بسيط، دوائر)' : 'Three visual variants (default, simple, circles)'}</li>
          <li>{isRTL ? 'اتجاه أفقي ورأسي' : 'Horizontal and vertical orientations'}</li>
          <li>{isRTL ? 'خطوات قابلة للنقر مع التحقق' : 'Clickable steps with validation'}</li>
          <li>{isRTL ? 'دعم الخطوات الاختيارية' : 'Optional steps support'}</li>
          <li>{isRTL ? 'حالات مرئية (مكتمل، حالي، قادم)' : 'Visual states (complete, current, upcoming)'}</li>
          <li>{isRTL ? 'دعم ثنائي اللغة كامل' : 'Full bilingual support'}</li>
          <li>{isRTL ? 'دعم RTL/LTR' : 'RTL/LTR support'}</li>
          <li>{isRTL ? 'ميزات إمكانية الوصول (ARIA)' : 'Accessibility features (ARIA)'}</li>
        </ul>
      </div>
    </div>
  )
}
