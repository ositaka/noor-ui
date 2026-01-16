'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDirection } from '@/components/providers/direction-provider'

export interface MortgageCalculation {
  propertyPrice: number
  downPayment: number
  downPaymentPercent: number
  loanAmount: number
  interestRate: number
  rateType: 'fixed' | 'variable'
  termYears: number
  propertyType: 'primary' | 'investment'
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  taxesAndFees: number
}

interface MortgageCalculatorProps {
  defaultPrice?: number
  defaultDownPaymentPercent?: number
  defaultTerm?: number
  defaultInterestRate?: number
  currency?: string
  currencySymbol?: string
  onCalculate?: (calculation: MortgageCalculation) => void
  showTitle?: boolean
}

export function MortgageCalculator({
  defaultPrice = 2000000,
  defaultDownPaymentPercent = 30,
  defaultTerm = 25,
  defaultInterestRate = 3.5,
  currency = 'AED',
  currencySymbol = 'د.إ',
  onCalculate,
  showTitle = true,
}: MortgageCalculatorProps) {
  const { locale } = useDirection()
  const isArabic = locale === 'ar'

  // State
  const [propertyPrice, setPropertyPrice] = React.useState(defaultPrice)
  const [downPaymentPercent, setDownPaymentPercent] = React.useState(defaultDownPaymentPercent)
  const [termYears, setTermYears] = React.useState(defaultTerm)
  const [propertyType, setPropertyType] = React.useState<'primary' | 'investment'>('primary')
  const [rateType, setRateType] = React.useState<'fixed' | 'variable'>('fixed')
  const [interestRate, setInterestRate] = React.useState(defaultInterestRate)

  // Calculations
  const downPayment = (propertyPrice * downPaymentPercent) / 100
  const loanAmount = propertyPrice - downPayment

  // Monthly mortgage payment calculation using standard formula
  // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const monthlyInterestRate = interestRate / 100 / 12
  const numberOfPayments = termYears * 12
  const monthlyPayment =
    loanAmount *
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

  const totalPayment = monthlyPayment * numberOfPayments
  const totalInterest = totalPayment - loanAmount

  // Taxes and fees (estimated at 5% of property price in UAE)
  const taxesAndFees = propertyPrice * 0.05

  // Update parent when calculations change
  React.useEffect(() => {
    if (onCalculate) {
      onCalculate({
        propertyPrice,
        downPayment,
        downPaymentPercent,
        loanAmount,
        interestRate,
        rateType,
        termYears,
        propertyType,
        monthlyPayment,
        totalInterest,
        totalPayment,
        taxesAndFees,
      })
    }
  }, [
    propertyPrice,
    downPayment,
    downPaymentPercent,
    loanAmount,
    interestRate,
    rateType,
    termYears,
    propertyType,
    monthlyPayment,
    totalInterest,
    totalPayment,
    taxesAndFees,
    onCalculate,
  ])

  const formatCurrency = (value: number) => {
    const formatted = new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-AE').format(Math.round(value))
    return isArabic ? `${formatted} ${currencySymbol}` : `${formatted} ${currency}`
  }

  const adjustInterestRate = (delta: number) => {
    const newRate = Math.max(1, Math.min(15, interestRate + delta))
    setInterestRate(Math.round(newRate * 10) / 10)
  }

  return (
    <Card className="w-full">
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isArabic ? 'حاسبة القرض العقاري' : 'Mortgage Calculator'}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-8">
        {/* Property Price */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {isArabic ? 'سعر العقار' : 'Property Price'}
            </Label>
            <div className="text-lg font-semibold px-4 py-2 border rounded-md bg-muted/50 min-w-[180px] text-center">
              {formatCurrency(propertyPrice)}
            </div>
          </div>
          <Slider
            value={[propertyPrice]}
            onValueChange={(value) => setPropertyPrice(value[0])}
            min={100000}
            max={50000000}
            step={50000}
            className="w-full"
          />
        </div>

        {/* Down Payment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-base font-medium">
                {isArabic ? 'الدفعة الأولى' : 'Down Payment'}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      {isArabic
                        ? 'الحد الأدنى للدفعة الأولى في الإمارات هو 20% للسكن الأساسي و 25% للعقار الاستثماري'
                        : 'Minimum down payment in UAE is 20% for primary residence and 25% for investment property'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-lg font-semibold px-4 py-2 border rounded-md bg-muted/50 min-w-[180px] text-center">
              {formatCurrency(downPayment)}
              <span className="text-sm text-muted-foreground ms-2">{downPaymentPercent}%</span>
            </div>
          </div>
          <Slider
            value={[downPaymentPercent]}
            onValueChange={(value) => setDownPaymentPercent(value[0])}
            min={10}
            max={80}
            step={5}
            className="w-full"
          />
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {isArabic ? 'مدة القرض (سنة)' : 'Loan Term (Years)'}
            </Label>
            <div className="text-lg font-semibold px-4 py-2 border rounded-md bg-muted/50 min-w-[180px] text-center">
              {termYears}
            </div>
          </div>
          <Slider
            value={[termYears]}
            onValueChange={(value) => setTermYears(value[0])}
            min={1}
            max={40}
            step={1}
            className="w-full"
          />
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            {isArabic ? 'نوع العقار' : 'Property Type'}
          </Label>
          <RadioGroup value={propertyType} onValueChange={(v) => setPropertyType(v as 'primary' | 'investment')}>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="primary" id="primary" />
              <Label htmlFor="primary" className="font-normal cursor-pointer">
                {isArabic ? 'سكن أساسي' : 'Primary Residence'}
              </Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="investment" id="investment" />
              <Label htmlFor="investment" className="font-normal cursor-pointer">
                {isArabic ? 'عقار استثماري' : 'Investment Property'}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-base font-medium">
                {isArabic ? 'سعر الفائدة' : 'Interest Rate'}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      {isArabic
                        ? 'تختلف أسعار الفائدة بناءً على البنك ونوع القرض. الأسعار الثابتة عادة أعلى من المتغيرة'
                        : 'Interest rates vary by bank and loan type. Fixed rates are typically higher than variable rates'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <RadioGroup value={rateType} onValueChange={(v) => setRateType(v as 'fixed' | 'variable')}>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed" className="font-normal cursor-pointer">
                {isArabic ? 'سعر ثابت' : 'Fixed Rate'}
              </Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="variable" id="variable" />
              <Label htmlFor="variable" className="font-normal cursor-pointer">
                {isArabic ? 'سعر متغير' : 'Variable Rate'}
              </Label>
            </div>
          </RadioGroup>

          <div className="flex items-center justify-center gap-4 pt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => adjustInterestRate(-0.1)}
              aria-label="Decrease interest rate"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="text-2xl font-bold text-primary min-w-[100px] text-center">
              {interestRate.toFixed(1)}%
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => adjustInterestRate(0.1)}
              aria-label="Increase interest rate"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t pt-6" />

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {isArabic ? 'الضرائب والرسوم:' : 'Taxes and Fees:'}
            </span>
            <span className="font-medium">{formatCurrency(taxesAndFees)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {isArabic ? 'مبلغ القرض:' : 'Loan Amount:'}
            </span>
            <span className="font-semibold">{formatCurrency(loanAmount)}</span>
          </div>

          <div className="flex items-center justify-between text-base pt-2 border-t">
            <span className="font-bold text-lg">
              {isArabic ? 'القسط الشهري:' : 'Monthly Payment:'}
            </span>
            <span className="font-bold text-2xl text-primary">{formatCurrency(monthlyPayment)}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button className="w-full" size="lg">
          {isArabic ? 'البحث عن خيارات التمويل' : 'Find Mortgage Options'}
        </Button>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center">
          {isArabic
            ? 'هذه النتائج تقديرية وتعتمد على الأرقام المدخلة. للحصول على عرض دقيق، يرجى التواصل مع البنك.'
            : 'These results are estimates based on the numbers you provided. For accurate quotes, please contact your bank.'}
        </p>
      </CardContent>
    </Card>
  )
}
