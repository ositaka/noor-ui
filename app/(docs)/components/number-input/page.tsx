'use client'

import * as React from 'react'
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

  const [value1, setValue1] = React.useState(42)
  const [value2, setValue2] = React.useState<number | undefined>(undefined)
  const [value3, setValue3] = React.useState(5.5)
  const [value4, setValue4] = React.useState(1234.56)
  const [price, setPrice] = React.useState(99.99)
  const [quantity, setQuantity] = React.useState(1)

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: locale === 'ar' ? 'SAR' : 'USD',
    }).format(value)
  }

  return (
    <div className="min-h-screen" dir={direction}>
      <main id="main-content" className="container py-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{isRTL ? 'إدخال الأرقام' : 'Number Input'}</h1>
          <p className="text-xl text-muted-foreground">
            {isRTL
              ? 'إدخال أرقام منسق مع عناصر التحكم والتحقق'
              : 'Formatted number input with controls and validation'}
          </p>
        </div>

      {/* Basic Example */}
      <ComponentShowcase
        title={isRTL ? 'الاستخدام الأساسي' : 'Basic Usage'}
        description={
          isRTL
            ? 'إدخال أرقام مع أزرار الزيادة والنقصان'
            : 'Number input with increment/decrement buttons'
        }
      >
        <div className="w-full max-w-xs mx-auto space-y-2">
          <Label>{isRTL ? 'الكمية' : 'Quantity'}</Label>
          <NumberInput value={value1} onChange={setValue1} min={0} max={100} />
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'القيمة الحالية:' : 'Current value:'} {value1}
          </p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={basicCode} language="tsx" title={isRTL ? 'الكود' : 'Code'} />

      {/* Without Controls */}
      <ComponentShowcase
        title={isRTL ? 'بدون عناصر تحكم' : 'Without Controls'}
        description={isRTL ? 'إدخال نص بسيط للأرقام' : 'Simple text input for numbers'}
      >
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
      </ComponentShowcase>

      <CodeBlock code={withoutControlsCode} language="tsx" />

      {/* Decimal Precision */}
      <ComponentShowcase
        title={isRTL ? 'الأرقام العشرية' : 'Decimal Precision'}
        description={isRTL ? 'التحكم في عدد المنازل العشرية' : 'Control decimal places'}
      >
        <div className="w-full max-w-xs mx-auto space-y-2">
          <Label>{isRTL ? 'النسبة المئوية' : 'Percentage'}</Label>
          <NumberInput value={value3} onChange={setValue3} step={0.1} precision={2} min={0} max={100} />
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'القيمة:' : 'Value:'} {value3.toFixed(2)}%
          </p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={decimalCode} language="tsx" />

      {/* Formatted Display */}
      <ComponentShowcase
        title={isRTL ? 'العرض المنسق' : 'Formatted Display'}
        description={isRTL ? 'فواصل الآلاف والتنسيق المخصص' : 'Thousands separators and custom formatting'}
      >
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
            {isRTL ? 'القيمة:' : 'Value:'} {value4.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US')}
          </p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={formattedCode} language="tsx" />

      {/* Currency Example */}
      <ComponentShowcase
        title={isRTL ? 'إدخال العملة' : 'Currency Input'}
        description={isRTL ? 'تنسيق العملة باستخدام Intl' : 'Currency formatting using Intl'}
      >
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
      </ComponentShowcase>

      <CodeBlock code={currencyCode} language="tsx" />

      {/* Real-World Example */}
      <ComponentShowcase
        title={isRTL ? 'مثال عملي' : 'Real-World Example'}
        description={isRTL ? 'نموذج طلب منتج' : 'Product order form'}
      >
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
                {formatCurrency(quantity * 29.99)}
              </span>
            </div>
          </CardContent>
        </Card>
      </ComponentShowcase>

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
