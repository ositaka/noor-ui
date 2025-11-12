'use client'

import * as React from 'react'
import Link from 'next/link'
import { NumberInput } from '@/components/ui/number-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { Label } from '@/components/ui/label'

const numberInputProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number',
    required: false,
    description: 'Controlled value',
  },
  {
    name: 'defaultValue',
    type: 'number',
    required: false,
    description: 'Default uncontrolled value',
  },
  {
    name: 'onChange',
    type: '(value: number | undefined) => void',
    required: false,
    description: 'Callback when value changes',
  },
  {
    name: 'onValueChange',
    type: '(value: number | undefined) => void',
    required: false,
    description: 'Alternative callback for value changes',
  },
  {
    name: 'min',
    type: 'number',
    required: false,
    description: 'Minimum allowed value',
  },
  {
    name: 'max',
    type: 'number',
    required: false,
    description: 'Maximum allowed value',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    required: false,
    description: 'Increment/decrement step size',
  },
  {
    name: 'precision',
    type: 'number',
    default: '0',
    required: false,
    description: 'Number of decimal places',
  },
  {
    name: 'showControls',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Show increment/decrement buttons',
  },
  {
    name: 'formatDisplay',
    type: '(value: number) => string',
    required: false,
    description: 'Custom display formatter',
  },
  {
    name: 'parseValue',
    type: '(value: string) => number | undefined',
    required: false,
    description: 'Custom value parser',
  },
  {
    name: 'allowNegative',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Allow negative values',
  },
  {
    name: 'allowDecimal',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Allow decimal values',
  },
  {
    name: 'thousandsSeparator',
    type: 'string | boolean',
    default: 'false',
    required: false,
    description: 'Thousands separator character or enable default',
  },
  {
    name: 'decimalSeparator',
    type: 'string',
    default: '"."',
    required: false,
    description: 'Decimal separator character',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disable the input',
  },
]

const basicCode = `import { NumberInput } from '@/components/ui/number-input'

const [value, setValue] = useState(0)

<NumberInput
  value={value}
  onChange={setValue}
  min={0}
  max={100}
/>`

const withoutControlsCode = `<NumberInput
  value={value}
  onChange={setValue}
  showControls={false}
  placeholder="Enter amount"
/>`

const decimalCode = `<NumberInput
  value={value}
  onChange={setValue}
  step={0.1}
  precision={2}
  min={0}
  max={100}
/>`

const formattedCode = `<NumberInput
  value={value}
  onChange={setValue}
  thousandsSeparator=","
  precision={2}
  formatDisplay={(val) => \`$\${val.toLocaleString()}\`}
/>`

const currencyCode = `const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

<NumberInput
  value={price}
  onChange={setPrice}
  precision={2}
  formatDisplay={formatCurrency}
  min={0}
/>`

export default function NumberInputPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'

  const [value1, setValue1] = React.useState<number | undefined>(42)
  const [value2, setValue2] = React.useState<number | undefined>(undefined)
  const [value3, setValue3] = React.useState<number | undefined>(5.5)
  const [value4, setValue4] = React.useState<number | undefined>(1234.56)
  const [price, setPrice] = React.useState<number | undefined>(99.99)
  const [quantity, setQuantity] = React.useState<number | undefined>(1)

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: locale === 'ar' ? 'SAR' : 'USD',
    }).format(value)
  }

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {isRTL ? 'المكونات' : 'Components'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{isRTL ? 'إدخال الأرقام' : 'Number Input'}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{isRTL ? 'إدخال الأرقام' : 'Number Input'}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {isRTL
            ? 'إدخال أرقام منسق مع عناصر التحكم والتحقق'
            : 'Formatted number input with controls and validation'}
        </p>
      </div>

      {/* Basic Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'الاستخدام الأساسي' : 'Basic Usage'}
        </h2>
        <ComponentShowcase code={basicCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{isRTL ? 'الكمية' : 'Quantity'}</Label>
              <NumberInput value={value1} onChange={setValue1} min={0} max={100} />
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'القيمة الحالية:' : 'Current value:'} {value1}
              </p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'الكود' : 'Code'}
        </h2>
        <CodeBlock code={basicCode} language="tsx" />
      </section>

      {/* Without Controls */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'بدون عناصر تحكم' : 'Without Controls'}
        </h2>
        <ComponentShowcase code={withoutControlsCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{isRTL ? 'المبلغ' : 'Amount'}</Label>
              <NumberInput
                value={value2}
                onChange={setValue2}
                showControls={false}
                placeholder={isRTL ? 'أدخل المبلغ' : 'Enter amount'}
              />
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'القيمة:' : 'Value:'} {value2 ?? isRTL ? 'غير محدد' : 'undefined'}
              </p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Decimal Precision */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'الأرقام العشرية' : 'Decimal Precision'}
        </h2>
        <ComponentShowcase code={decimalCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{isRTL ? 'النسبة المئوية' : 'Percentage'}</Label>
              <NumberInput value={value3} onChange={setValue3} step={0.1} precision={2} min={0} max={100} />
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'القيمة:' : 'Value:'} {value3?.toFixed(2) ?? '0.00'}%
              </p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Formatted Display */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'العرض المنسق' : 'Formatted Display'}
        </h2>
        <ComponentShowcase code={formattedCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{isRTL ? 'المبلغ' : 'Amount'}</Label>
              <NumberInput
                value={value4}
                onChange={setValue4}
                thousandsSeparator=","
                precision={2}
                step={100}
              />
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'القيمة:' : 'Value:'} {value4?.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US') ?? '0'}
              </p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Currency Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'إدخال العملة' : 'Currency Input'}
        </h2>
        <ComponentShowcase code={currencyCode}>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{isRTL ? 'السعر' : 'Price'}</Label>
              <NumberInput
                value={price}
                onChange={setPrice}
                precision={2}
                formatDisplay={formatCurrency}
                min={0}
                step={0.01}
              />
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'القيمة الخام:' : 'Raw value:'} {price}
              </p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Real-World Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'مثال عملي' : 'Real-World Example'}
        </h2>
        <ComponentShowcase code={`const [quantity, setQuantity] = useState(1)
const formatCurrency = (value: number) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(value)

<Card>
  <CardHeader>
    <CardTitle>Product Order</CardTitle>
    <CardDescription>Select quantity to calculate total</CardDescription>
  </CardHeader>
  <CardContent className="space-y-6">
    <div className="space-y-2">
      <Label>Quantity</Label>
      <NumberInput value={quantity} onChange={setQuantity} min={1} max={99} />
    </div>
    <div className="flex justify-between items-center pt-4 border-t">
      <span className="text-sm text-muted-foreground">Unit Price:</span>
      <span className="font-semibold">{formatCurrency(29.99)}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-lg font-semibold">Total:</span>
      <span className="text-2xl font-bold text-primary">
        {formatCurrency(quantity * 29.99)}
      </span>
    </div>
  </CardContent>
</Card>`}>
          <ComponentShowcase.Demo>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>{isRTL ? 'طلب منتج' : 'Product Order'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'اختر الكمية لحساب السعر الإجمالي' : 'Select quantity to calculate total'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{isRTL ? 'الكمية' : 'Quantity'}</Label>
                  <NumberInput
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={99}
                    step={1}
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {isRTL ? 'سعر الوحدة:' : 'Unit Price:'}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(29.99)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    {isRTL ? 'الإجمالي:' : 'Total:'}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency((quantity ?? 0) * 29.99)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'حالات الاستخدام' : 'Use Cases'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: isRTL ? 'نماذج التسعير' : 'Pricing Forms', icon: '💰' },
            { title: isRTL ? 'حاسبات الكمية' : 'Quantity Calculators', icon: '🔢' },
            { title: isRTL ? 'عناصر التحكم في الإعدادات' : 'Settings Controls', icon: '⚙️' },
            { title: isRTL ? 'إدخال البيانات المالية' : 'Financial Data Entry', icon: '📊' },
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

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'مرجع API' : 'API Reference'}</h2>
        <PropsTable props={numberInputProps} />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'الميزات' : 'Features'}</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>{isRTL ? 'أزرار الزيادة والنقصان' : 'Increment/decrement buttons'}</li>
          <li>{isRTL ? 'دعم لوحة المفاتيح (أسهم لأعلى/لأسفل)' : 'Keyboard support (arrow up/down)'}</li>
          <li>{isRTL ? 'التحقق من الحد الأدنى/الأقصى' : 'Min/max validation'}</li>
          <li>{isRTL ? 'دقة الأرقام العشرية' : 'Decimal precision'}</li>
          <li>{isRTL ? 'فواصل الآلاف القابلة للتخصيص' : 'Customizable thousands separators'}</li>
          <li>{isRTL ? 'دالات التنسيق والتحليل المخصصة' : 'Custom format and parse functions'}</li>
          <li>{isRTL ? 'دعم العملات والنسب المئوية' : 'Currency and percentage support'}</li>
          <li>{isRTL ? 'وضع بدون عناصر تحكم' : 'Controls-free mode'}</li>
          <li>{isRTL ? 'دعم RTL/LTR' : 'RTL/LTR support'}</li>
          <li>{isRTL ? 'إمكانية الوصول الكاملة' : 'Full accessibility'}</li>
        </ul>
      </div>
      </main>
    </div>
  )
}
