'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { NumberInput } from '@/components/ui/number-input'
import { Button } from '@/components/ui/button'
import { StatsCard } from '@/components/ui/stats-card'
import { Separator } from '@/components/ui/separator'
import { TrendingUp, TrendingDown, DollarSign, Clock, Calculator, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDirection } from '@/components/providers/direction-provider'
import { cn } from '@/lib/utils'

export interface ROICalculation {
  // Inputs
  purchasePrice: number
  annualRent: number
  serviceCharges: number
  managementFees: number // percentage
  appreciationRate: number // percentage per year
  holdingPeriod: number // years
  downPayment: number
  mortgageRate: number // percentage

  // Calculated outputs
  annualExpenses: number
  netAnnualIncome: number
  rentalYield: number // percentage
  cashOnCashReturn: number // percentage
  totalROI: number // percentage after holding period
  breakEvenYears: number
  projectedValue: number // after holding period
  totalRentalIncome: number
  netProfit: number
  annualAppreciation: number
}

interface ROICalculatorProps {
  defaultPurchasePrice?: number
  defaultAnnualRent?: number
  defaultDownPayment?: number
  currency?: string
  currencySymbol?: string
  onCalculate?: (calculation: ROICalculation) => void
  showTitle?: boolean
  compact?: boolean
}

export function ROICalculator({
  defaultPurchasePrice = 2000000,
  defaultAnnualRent = 120000,
  defaultDownPayment = 600000,
  currency = 'AED',
  currencySymbol = 'د.إ',
  onCalculate,
  showTitle = true,
  compact = false,
}: ROICalculatorProps) {
  const { locale } = useDirection()
  const isArabic = locale === 'ar'

  // State
  const [purchasePrice, setPurchasePrice] = React.useState(defaultPurchasePrice)
  const [annualRent, setAnnualRent] = React.useState(defaultAnnualRent)
  const [serviceCharges, setServiceCharges] = React.useState(purchasePrice * 0.02) // 2% default
  const [managementFees, setManagementFees] = React.useState(5) // 5% default
  const [appreciationRate, setAppreciationRate] = React.useState(5) // 5% per year
  const [holdingPeriod, setHoldingPeriod] = React.useState(10) // 10 years
  const [downPayment, setDownPayment] = React.useState(defaultDownPayment)
  const [mortgageRate, setMortgageRate] = React.useState(4) // 4% interest

  // Calculations
  const loanAmount = purchasePrice - downPayment
  const managementFeesAmount = (annualRent * managementFees) / 100
  const annualExpenses = serviceCharges + managementFeesAmount
  const netAnnualIncome = annualRent - annualExpenses

  // Mortgage payments
  const monthlyInterestRate = mortgageRate / 100 / 12
  const numberOfPayments = holdingPeriod * 12
  const monthlyMortgagePayment =
    loanAmount > 0
      ? loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
      : 0
  const annualMortgagePayment = monthlyMortgagePayment * 12

  // Net income after mortgage
  const netIncomeAfterMortgage = netAnnualIncome - annualMortgagePayment

  // Rental Yield: (Annual Net Income / Purchase Price) × 100
  const rentalYield = (netAnnualIncome / purchasePrice) * 100

  // Cash-on-Cash Return: (Annual Cash Flow / Cash Invested) × 100
  const cashOnCashReturn = loanAmount > 0 ? (netIncomeAfterMortgage / downPayment) * 100 : rentalYield

  // Property appreciation
  const projectedValue = purchasePrice * Math.pow(1 + appreciationRate / 100, holdingPeriod)
  const annualAppreciation = projectedValue - purchasePrice

  // Total rental income over holding period
  const totalRentalIncome = netAnnualIncome * holdingPeriod

  // Total mortgage paid
  const totalMortgagePaid = annualMortgagePayment * holdingPeriod

  // Net profit: Appreciation + Total Rental Income - Total Mortgage Paid
  const netProfit = annualAppreciation + totalRentalIncome - totalMortgagePaid

  // Total ROI: (Net Profit / Cash Invested) × 100
  const totalROI = (netProfit / downPayment) * 100

  // Break-even: When cumulative rental income = down payment
  const breakEvenYears = downPayment / netAnnualIncome

  const calculation: ROICalculation = {
    purchasePrice,
    annualRent,
    serviceCharges,
    managementFees,
    appreciationRate,
    holdingPeriod,
    downPayment,
    mortgageRate,
    annualExpenses,
    netAnnualIncome,
    rentalYield,
    cashOnCashReturn,
    totalROI,
    breakEvenYears,
    projectedValue,
    totalRentalIncome,
    netProfit,
    annualAppreciation,
  }

  React.useEffect(() => {
    if (onCalculate) {
      onCalculate(calculation)
    }
  }, [
    purchasePrice,
    annualRent,
    serviceCharges,
    managementFees,
    appreciationRate,
    holdingPeriod,
    downPayment,
    mortgageRate,
  ])

  const formatCurrency = (value: number) => {
    const formatted = new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-AE').format(Math.round(value))
    return isArabic ? `${formatted} ${currencySymbol}` : `${formatted} ${currency}`
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  const formatYears = (value: number) => {
    const years = Math.floor(value)
    const months = Math.round((value - years) * 12)
    if (months === 0) {
      return isArabic ? `${years} سنة` : `${years} year${years !== 1 ? 's' : ''}`
    }
    return isArabic
      ? `${years} سنة و ${months} شهر`
      : `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`
  }

  return (
    <Card className="w-full">
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {isArabic ? 'حاسبة العائد على الاستثمار' : 'ROI Calculator'}
          </CardTitle>
          <CardDescription>
            {isArabic
              ? 'احسب العائد المتوقع من استثمارك العقاري'
              : 'Calculate the expected return on your real estate investment'}
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className="space-y-6">
        {/* Inputs Section */}
        <div className={cn('grid gap-4', compact ? 'md:grid-cols-2' : 'md:grid-cols-3')}>
          <div className="space-y-2">
            <Label htmlFor="purchasePrice">
              {isArabic ? 'سعر الشراء' : 'Purchase Price'}
            </Label>
            <NumberInput
              id="purchasePrice"
              value={purchasePrice}
              onValueChange={setPurchasePrice}
              min={100000}
              max={100000000}
              step={50000}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="annualRent">
              {isArabic ? 'الإيجار السنوي' : 'Annual Rent'}
            </Label>
            <NumberInput
              id="annualRent"
              value={annualRent}
              onValueChange={setAnnualRent}
              min={0}
              max={10000000}
              step={1000}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment">
              {isArabic ? 'الدفعة الأولى' : 'Down Payment'}
            </Label>
            <NumberInput
              id="downPayment"
              value={downPayment}
              onValueChange={setDownPayment}
              min={0}
              max={purchasePrice}
              step={10000}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceCharges">
              {isArabic ? 'رسوم الخدمة (سنوياً)' : 'Service Charges (Annual)'}
            </Label>
            <NumberInput
              id="serviceCharges"
              value={serviceCharges}
              onValueChange={setServiceCharges}
              min={0}
              max={500000}
              step={1000}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="managementFees">
                {isArabic ? 'رسوم الإدارة (%)' : 'Management Fees (%)'}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      {isArabic
                        ? 'النسبة المئوية من الإيجار السنوي للإدارة والصيانة'
                        : 'Percentage of annual rent for property management and maintenance'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <NumberInput
              id="managementFees"
              value={managementFees}
              onValueChange={setManagementFees}
              min={0}
              max={20}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="appreciationRate">
                {isArabic ? 'معدل الزيادة (%)' : 'Appreciation Rate (%)'}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      {isArabic
                        ? 'معدل الزيادة السنوية المتوقعة في قيمة العقار'
                        : 'Expected annual increase in property value'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <NumberInput
              id="appreciationRate"
              value={appreciationRate}
              onValueChange={setAppreciationRate}
              min={-10}
              max={20}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="holdingPeriod">
              {isArabic ? 'فترة الاحتفاظ (سنوات)' : 'Holding Period (Years)'}
            </Label>
            <NumberInput
              id="holdingPeriod"
              value={holdingPeriod}
              onValueChange={setHoldingPeriod}
              min={1}
              max={30}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mortgageRate">
              {isArabic ? 'سعر الفائدة (%)' : 'Mortgage Rate (%)'}
            </Label>
            <NumberInput
              id="mortgageRate"
              value={mortgageRate}
              onValueChange={setMortgageRate}
              min={0}
              max={15}
              step={0.1}
            />
          </div>
        </div>

        <Separator />

        {/* Results - Key Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {isArabic ? 'المقاييس الرئيسية' : 'Key Metrics'}
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title={isArabic ? 'عائد الإيجار' : 'Rental Yield'}
              value={formatPercent(rentalYield)}
              description={isArabic ? 'الدخل السنوي من الإيجار' : 'Annual rental income return'}
              icon={TrendingUp}
              trend={rentalYield >= 5 ? 'up' : undefined}
            />

            <StatsCard
              title={isArabic ? 'العائد النقدي' : 'Cash-on-Cash'}
              value={formatPercent(cashOnCashReturn)}
              description={isArabic ? 'العائد على المبلغ المدفوع' : 'Return on cash invested'}
              icon={DollarSign}
              trend={cashOnCashReturn >= 8 ? 'up' : undefined}
            />

            <StatsCard
              title={isArabic ? 'إجمالي العائد' : 'Total ROI'}
              value={formatPercent(totalROI)}
              description={`${isArabic ? 'بعد' : 'After'} ${holdingPeriod} ${isArabic ? 'سنوات' : 'years'}`}
              icon={TrendingUp}
              trend={totalROI >= 50 ? 'up' : totalROI <= 0 ? 'down' : undefined}
            />

            <StatsCard
              title={isArabic ? 'نقطة التعادل' : 'Break-Even'}
              value={formatYears(breakEvenYears)}
              description={isArabic ? 'استرداد رأس المال' : 'To recover initial investment'}
              icon={Clock}
              trend={breakEvenYears <= 10 ? 'up' : undefined}
            />
          </div>
        </div>

        <Separator />

        {/* Detailed Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {isArabic ? 'التفاصيل المالية' : 'Financial Breakdown'}
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {isArabic ? 'الدخل من الإيجار (سنوياً):' : 'Annual Rental Income:'}
              </span>
              <span className="font-medium">{formatCurrency(annualRent)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {isArabic ? 'المصروفات السنوية:' : 'Annual Expenses:'}
              </span>
              <span className="font-medium text-red-500">-{formatCurrency(annualExpenses)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {isArabic ? 'دفعات القرض (سنوياً):' : 'Mortgage Payments (Annual):'}
              </span>
              <span className="font-medium text-red-500">-{formatCurrency(annualMortgagePayment)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between font-semibold">
              <span>{isArabic ? 'صافي الدخل السنوي:' : 'Net Annual Income:'}</span>
              <span
                className={cn(
                  netIncomeAfterMortgage >= 0 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {formatCurrency(netIncomeAfterMortgage)}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {isArabic ? 'القيمة المتوقعة:' : 'Projected Value:'}
              </span>
              <span className="font-medium">{formatCurrency(projectedValue)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {isArabic ? 'الزيادة في القيمة:' : 'Appreciation Gain:'}
              </span>
              <span className="font-medium text-green-600">
                +{formatCurrency(annualAppreciation)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {isArabic ? 'إجمالي دخل الإيجار:' : 'Total Rental Income:'}
              </span>
              <span className="font-medium">{formatCurrency(totalRentalIncome)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-base font-bold pt-2">
              <span>{isArabic ? 'صافي الربح:' : 'Net Profit:'}</span>
              <span
                className={cn(
                  'text-lg',
                  netProfit >= 0 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {formatCurrency(netProfit)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
