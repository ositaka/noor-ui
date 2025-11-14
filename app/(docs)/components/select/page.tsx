'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getSelectProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.selectComponent.props.value,
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.selectComponent.props.defaultValue,
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    default: 'undefined',
    required: false,
    description: t.selectComponent.props.onValueChange,
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.selectComponent.props.disabled,
  },
  {
    name: 'name',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.selectComponent.props.name,
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.selectComponent.props.required,
  },
]

const getSelectItemProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    required: true,
    description: t.selectComponent.props.itemValue,
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.selectComponent.props.itemDisabled,
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>`

const withLabelCode = `<div className="space-y-2">
  <Label htmlFor="country">Country</Label>
  <Select>
    <SelectTrigger id="country">
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
      <SelectItem value="au">Australia</SelectItem>
    </SelectContent>
  </Select>
</div>`

const groupedCode = `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
      <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
      <SelectItem value="cet">Central European Time (CET)</SelectItem>
      <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`

const disabledCode = `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="available">Available option</SelectItem>
    <SelectItem value="disabled" disabled>
      Disabled option
    </SelectItem>
    <SelectItem value="another">Another option</SelectItem>
  </SelectContent>
</Select>

// Disabled select
<Select disabled>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Disabled select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>`

const controlledCode = `const [value, setValue] = React.useState('')

return (
  <div className="space-y-4">
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
    <p className="text-sm text-muted-foreground">
      Selected: {value || 'None'}
    </p>
    <Button size="sm" onClick={() => setValue('banana')}>
      Select Banana
    </Button>
  </div>
)`

const formCode = `<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="plan">Select Plan</Label>
    <Select name="plan" required>
      <SelectTrigger id="plan">
        <SelectValue placeholder="Choose a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free - $0/month</SelectItem>
        <SelectItem value="starter">Starter - $9/month</SelectItem>
        <SelectItem value="pro">Pro - $29/month</SelectItem>
        <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <Button type="submit">Continue</Button>
</form>`

const rtlCode = `// RTL support is automatic!
// Dropdown positioning and text flow correctly in RTL

<div className="space-y-2">
  <Label htmlFor="rtl-select">اختر اللغة</Label>
  <Select>
    <SelectTrigger id="rtl-select">
      <SelectValue placeholder="اختر خيار" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="ar">العربية</SelectItem>
      <SelectItem value="en">English</SelectItem>
      <SelectItem value="fr">Français</SelectItem>
    </SelectContent>
  </Select>
</div>`

export default function SelectPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const selectProps = getSelectProps(t)
  const selectItemProps = getSelectItemProps(t)

  const [value, setValue] = React.useState('')

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
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
            <li className="text-foreground font-medium">{t.selectComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.selectComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.selectComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t.selectComponent.placeholders.selectOption} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">{t.selectComponent.options.option1}</SelectItem>
                  <SelectItem value="option2">{t.selectComponent.options.option2}</SelectItem>
                  <SelectItem value="option3">{t.selectComponent.options.option3}</SelectItem>
                </SelectContent>
              </Select>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.examples}</h2>

          <div className="space-y-8">
            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.selectComponent.examples.withLabel}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-xs space-y-2">
                    <Label htmlFor="country">{t.selectComponent.labels.country}</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder={t.selectComponent.placeholders.selectCountry} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">{t.selectComponent.options.us}</SelectItem>
                        <SelectItem value="uk">{t.selectComponent.options.uk}</SelectItem>
                        <SelectItem value="ca">{t.selectComponent.options.ca}</SelectItem>
                        <SelectItem value="au">{t.selectComponent.options.au}</SelectItem>
                        <SelectItem value="de">{t.selectComponent.options.de}</SelectItem>
                        <SelectItem value="fr">{t.selectComponent.options.fr}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Grouped Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.selectComponent.examples.groupedOptions}</h3>
              <Card>
                <CardContent className="p-6">
                  <Select>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder={t.selectComponent.placeholders.selectTimezone} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t.selectComponent.timezones.northAmerica}</SelectLabel>
                        <SelectItem value="est">{t.selectComponent.timezones.est}</SelectItem>
                        <SelectItem value="cst">{t.selectComponent.timezones.cst}</SelectItem>
                        <SelectItem value="mst">{t.selectComponent.timezones.mst}</SelectItem>
                        <SelectItem value="pst">{t.selectComponent.timezones.pst}</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>{t.selectComponent.timezones.europe}</SelectLabel>
                        <SelectItem value="gmt">{t.selectComponent.timezones.gmt}</SelectItem>
                        <SelectItem value="cet">{t.selectComponent.timezones.cet}</SelectItem>
                        <SelectItem value="eet">{t.selectComponent.timezones.eet}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={groupedCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.selectComponent.examples.disabledState}</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>{t.selectComponent.labels.selectWithDisabled}</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t.selectComponent.placeholders.selectOption} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">{t.selectComponent.options.available}</SelectItem>
                        <SelectItem value="disabled" disabled>
                          {t.selectComponent.options.disabled}
                        </SelectItem>
                        <SelectItem value="another">{t.selectComponent.options.another}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.selectComponent.labels.disabledSelect}</Label>
                    <Select disabled>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t.selectComponent.placeholders.disabledSelect} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">{t.selectComponent.options.option1}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Controlled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.selectComponent.examples.controlled}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Select value={value} onValueChange={setValue}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder={t.selectComponent.placeholders.selectFruit} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">{t.selectComponent.options.apple}</SelectItem>
                        <SelectItem value="banana">{t.selectComponent.options.banana}</SelectItem>
                        <SelectItem value="orange">{t.selectComponent.options.orange}</SelectItem>
                        <SelectItem value="grape">{t.selectComponent.options.grape}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      {t.selectComponent.controlled.selected}: {value || t.selectComponent.controlled.none}
                    </p>
                    <Button size="sm" onClick={() => setValue('banana')}>
                      {t.selectComponent.controlled.selectBanana}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={controlledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* In Forms */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.selectComponent.examples.inForms}</h3>
              <Card>
                <CardContent className="p-6">
                  <form
                    className="max-w-xs space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert(t.selectComponent.form.formSubmitted)
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="plan">{t.selectComponent.labels.selectPlan}</Label>
                      <Select name="plan" required>
                        <SelectTrigger id="plan">
                          <SelectValue placeholder={t.selectComponent.placeholders.choosePlan} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">{t.selectComponent.plans.free}</SelectItem>
                          <SelectItem value="starter">{t.selectComponent.plans.starter}</SelectItem>
                          <SelectItem value="pro">{t.selectComponent.plans.pro}</SelectItem>
                          <SelectItem value="enterprise">{t.selectComponent.plans.enterprise}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit">{t.selectComponent.form.continue}</Button>
                  </form>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={formCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select</h3>
              <PropsTable props={selectProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">SelectItem</h3>
              <PropsTable props={selectItemProps} />
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.selectComponent.accessibility.keyboardTitle}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {t.selectComponent.accessibility.keyboardTab}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> or{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: {t.selectComponent.accessibility.keyboardEnter}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Keys</kbd>: {t.selectComponent.accessibility.keyboardArrows}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: {t.selectComponent.accessibility.keyboardEnterSelect}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Esc</kbd>: {t.selectComponent.accessibility.keyboardEsc}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Type</kbd>: {t.selectComponent.accessibility.keyboardType}
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.selectComponent.accessibility.alwaysUseLabelsTitle}</h3>
                <p className="text-muted-foreground">
                  {t.selectComponent.accessibility.alwaysUseLabelsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.selectComponent.accessibility.screenReadersTitle}</h3>
                <p className="text-muted-foreground">
                  {t.selectComponent.accessibility.screenReadersDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.selectComponent.accessibility.groupedOptionsTitle}</h3>
                <p className="text-muted-foreground">
                  {t.selectComponent.accessibility.groupedOptionsDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.rtlConsiderations}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.selectComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentDocs.ltr}</h4>
                  <div dir="ltr">
                    <div className="space-y-2 p-4 border rounded-lg">
                      <Label htmlFor="ltr-select">Language</Label>
                      <Select>
                        <SelectTrigger id="ltr-select">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentDocs.rtl}</h4>
                  <div dir="rtl">
                    <div className="space-y-2 p-4 border rounded-lg">
                      <Label htmlFor="rtl-select">اللغة</Label>
                      <Select>
                        <SelectTrigger id="rtl-select">
                          <SelectValue placeholder="اختر اللغة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.selectComponent.relatedTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/radio-group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.selectComponent.related.radioGroup}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.selectComponent.related.radioGroupDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.selectComponent.related.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.selectComponent.related.labelDesc}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
