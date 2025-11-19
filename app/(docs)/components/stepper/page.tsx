'use client'

import * as React from 'react'
import Link from 'next/link'
import { Stepper } from '@/components/ui/stepper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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
  const t = content[locale]

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
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.stepperComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t.stepperComponent.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {t.stepperComponent.description}
        </p>
      </div>

      {/* Preview */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.preview}</h2>
        <ComponentShowcase code={basicCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-2xl mx-auto">
              <Stepper steps={steps} currentStep={currentStep1} onStepClick={setCurrentStep1} />
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep1(Math.max(0, currentStep1 - 1))}
                  disabled={currentStep1 === 0}
                >
                  {t.stepperComponent.actions.previous}
                </Button>
                <Button
                  onClick={() => setCurrentStep1(Math.min(steps.length - 1, currentStep1 + 1))}
                  disabled={currentStep1 === steps.length - 1}
                >
                  {t.stepperComponent.actions.next}
                </Button>
              </div>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Variants */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{t.componentPage.sections.variants}</h2>
          <p className="text-muted-foreground">
            {isRTL
              ? 'ثلاثة أشكال مرئية: افتراضي، بسيط، ودوائر'
              : 'Three visual styles: default, simple, and circles'}
          </p>
        </div>

        {/* Simple Variant */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t.stepperComponent.variants.simpleVariant}</h3>
            <p className="text-sm text-muted-foreground">{t.stepperComponent.variants.simpleDesc}</p>
          </div>
          <ComponentShowcase code={variantsCode.split('\n\n')[1]}>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-2xl mx-auto">
                <Stepper steps={simpleSteps} currentStep={currentStep2} variant="simple" onStepClick={setCurrentStep2} />
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep2(Math.max(0, currentStep2 - 1))}
                    disabled={currentStep2 === 0}
                  >
                    {t.stepperComponent.actions.previous}
                  </Button>
                  <Button
                    onClick={() => setCurrentStep2(Math.min(simpleSteps.length - 1, currentStep2 + 1))}
                    disabled={currentStep2 === simpleSteps.length - 1}
                  >
                    {t.stepperComponent.actions.next}
                  </Button>
                </div>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </div>

        {/* Circles Variant */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t.stepperComponent.variants.circlesVariant}</h3>
            <p className="text-sm text-muted-foreground">{t.stepperComponent.variants.circlesDesc}</p>
          </div>
          <ComponentShowcase code={variantsCode.split('\n\n')[2]}>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-2xl mx-auto">
                <Stepper steps={simpleSteps} currentStep={currentStep3} variant="circles" onStepClick={setCurrentStep3} />
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep3(Math.max(0, currentStep3 - 1))}
                    disabled={currentStep3 === 0}
                  >
                    {t.stepperComponent.actions.previous}
                  </Button>
                  <Button
                    onClick={() => setCurrentStep3(Math.min(simpleSteps.length - 1, currentStep3 + 1))}
                    disabled={currentStep3 === simpleSteps.length - 1}
                  >
                    {t.stepperComponent.actions.next}
                  </Button>
                </div>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </div>
      </div>

      <CodeBlock code={variantsCode} language="tsx" />

      {/* Vertical Orientation */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">{t.stepperComponent.variants.verticalOrientation}</h2>
        <ComponentShowcase code={verticalCode}>
          <ComponentShowcase.Demo>
            <div className="max-w-md mx-auto">
              <Stepper steps={steps} currentStep={currentStep4} orientation="vertical" onStepClick={setCurrentStep4} />
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep4(Math.max(0, currentStep4 - 1))}
                  disabled={currentStep4 === 0}
                >
                  {t.stepperComponent.actions.previous}
                </Button>
                <Button
                  onClick={() => setCurrentStep4(Math.min(steps.length - 1, currentStep4 + 1))}
                  disabled={currentStep4 === steps.length - 1}
                >
                  {t.stepperComponent.actions.next}
                </Button>
              </div>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.useCases}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: t.stepperComponent.useCases.registrationForms, icon: '📝' },
            { title: t.stepperComponent.useCases.checkoutProcess, icon: '🛒' },
            { title: t.stepperComponent.useCases.setupWizards, icon: '⚙️' },
            { title: t.stepperComponent.useCases.multiStepWorkflows, icon: '🔄' },
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
        <h2 className="text-2xl font-bold">{t.componentPage.sections.typeDefinitions}</h2>
        <CodeBlock code={typeDefinition} language="typescript" />
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.propsApiReference}</h2>
        <PropsTable props={stepperProps} />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.features}</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>{t.stepperComponent.features.threeVariants}</li>
          <li>{t.stepperComponent.features.orientations}</li>
          <li>{t.stepperComponent.features.clickableSteps}</li>
          <li>{t.stepperComponent.features.optionalSteps}</li>
          <li>{t.stepperComponent.features.visualStates}</li>
          <li>{t.stepperComponent.features.bilingualSupport}</li>
          <li>{t.stepperComponent.features.rtlSupport}</li>
          <li>{t.stepperComponent.features.accessibility}</li>
        </ul>
      </div>
      </main>
    </div>
  )
}
