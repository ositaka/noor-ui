'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/ui/stats-card'
import { Callout } from '@/components/ui/callout'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Chart } from '@/components/ui/chart'
import { useDirection } from '@/components/providers/direction-provider'
import {
  Bank,
  Wallet,
  TrendUp,
  TrendDown,
  ChartPie,
  ArrowRight,
  ArrowLeft,
  PaperPlaneTilt,
  Receipt,
  CreditCard,
  FileText,
  Eye,
  EyeSlash,
  Warning,
  WifiHigh,
} from '@phosphor-icons/react'

const gt = {
  en: {
    welcome: 'Good morning, Khaled',
    lastLogin: 'Last login: Today at 8:42 AM',
    totalBalance: 'Total Balance',
    monthlyIncome: 'Monthly Income',
    monthlyExpenses: 'Monthly Expenses',
    savingsGrowth: 'Savings Growth',
    fromLastMonth: 'from last month',
    currentAccount: 'Current Account',
    savingsAccount: 'Savings Account',
    iban: 'IBAN',
    cardNumber: 'Card',
    profitRate: 'Profit Rate',
    quickActions: 'Quick Actions',
    transfer: 'Transfer',
    payBills: 'Pay Bills',
    cardControls: 'Card Controls',
    statements: 'Statements',
    spendingBreakdown: 'Spending Breakdown',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    incomeVsExpenses: 'Income vs Expenses',
    income: 'Income',
    expenses: 'Expenses',
    balanceTrend: 'Balance Trend',
    recentTransactions: 'Recent Transactions',
    viewAll: 'View All',
    aed: 'AED',
    creditCardDue: 'Payment Due Soon',
    creditCardDueDesc: 'Your Visa ****4532 payment of AED 2,150 is due on March 20.',
    showBalance: 'Show balances',
    hideBalance: 'Hide balances',
    groceries: 'Groceries',
    dining: 'Dining',
    transport: 'Transport',
    shopping: 'Shopping',
    billsCat: 'Bills',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dec',
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    totalSpent: 'Total Spent',
    visa: 'Visa',
  },
  ar: {
    welcome: 'صباح الخير، خالد',
    lastLogin: 'آخر تسجيل دخول: اليوم الساعة ٨:٤٢ صباحاً',
    totalBalance: 'الرصيد الإجمالي',
    monthlyIncome: 'الدخل الشهري',
    monthlyExpenses: 'المصروفات الشهرية',
    savingsGrowth: 'نمو المدخرات',
    fromLastMonth: 'عن الشهر الماضي',
    currentAccount: 'الحساب الجاري',
    savingsAccount: 'حساب التوفير',
    iban: 'آيبان',
    cardNumber: 'البطاقة',
    profitRate: 'معدل الربح',
    quickActions: 'إجراءات سريعة',
    transfer: 'تحويل',
    payBills: 'دفع فواتير',
    cardControls: 'البطاقات',
    statements: 'كشف حساب',
    spendingBreakdown: 'توزيع الإنفاق',
    thisMonth: 'هذا الشهر',
    lastMonth: 'الشهر الماضي',
    incomeVsExpenses: 'الدخل مقابل المصروفات',
    income: 'الدخل',
    expenses: 'المصروفات',
    balanceTrend: 'اتجاه الرصيد',
    recentTransactions: 'المعاملات الأخيرة',
    viewAll: 'عرض الكل',
    aed: 'د.إ',
    creditCardDue: 'دفعة مستحقة قريباً',
    creditCardDueDesc: 'دفعة بطاقة فيزا ****٤٥٣٢ بقيمة ٢٬١٥٠ د.إ مستحقة في ٢٠ مارس.',
    showBalance: 'إظهار الأرصدة',
    hideBalance: 'إخفاء الأرصدة',
    groceries: 'بقالة',
    dining: 'مطاعم',
    transport: 'مواصلات',
    shopping: 'تسوق',
    billsCat: 'فواتير',
    entertainment: 'ترفيه',
    healthcare: 'صحة',
    oct: 'أكتوبر',
    nov: 'نوفمبر',
    dec: 'ديسمبر',
    jan: 'يناير',
    feb: 'فبراير',
    mar: 'مارس',
    totalSpent: 'إجمالي الإنفاق',
    visa: 'فيزا',
  },
}

interface Transaction {
  id: string
  merchant: string
  merchantAr: string
  category: string
  categoryAr: string
  amount: number
  date: string
  dateAr: string
}

const recentTransactions: Transaction[] = [
  { id: '1', merchant: 'Carrefour', merchantAr: 'كارفور', category: 'Groceries', categoryAr: 'بقالة', amount: -342.50, date: 'Mar 16', dateAr: '١٦ مارس' },
  { id: '2', merchant: 'Salary — Gulf Digital Bank', merchantAr: 'راتب — بنك الخليج الرقمي', category: 'Income', categoryAr: 'دخل', amount: 25000, date: 'Mar 15', dateAr: '١٥ مارس' },
  { id: '3', merchant: 'ADNOC Station', merchantAr: 'محطة أدنوك', category: 'Transport', categoryAr: 'مواصلات', amount: -180, date: 'Mar 14', dateAr: '١٤ مارس' },
  { id: '4', merchant: 'Deliveroo', merchantAr: 'ديليفرو', category: 'Dining', categoryAr: 'مطاعم', amount: -89.50, date: 'Mar 13', dateAr: '١٣ مارس' },
  { id: '5', merchant: 'DEWA', merchantAr: 'كهرباء ومياه دبي', category: 'Bills', categoryAr: 'فواتير', amount: -450, date: 'Mar 12', dateAr: '١٢ مارس' },
]

export default function BankingDashboardPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const [balanceVisible, setBalanceVisible] = React.useState(true)
  const [spendingPeriod, setSpendingPeriod] = React.useState<'this' | 'last'>('this')

  const spendingThisMonth = [
    { category: h.groceries, amount: 2912 },
    { category: h.dining, amount: 1664 },
    { category: h.transport, amount: 1248 },
    { category: h.shopping, amount: 998 },
    { category: h.billsCat, amount: 665 },
    { category: h.entertainment, amount: 499 },
    { category: h.healthcare, amount: 334 },
  ]

  const spendingLastMonth = [
    { category: h.groceries, amount: 2650 },
    { category: h.dining, amount: 1820 },
    { category: h.transport, amount: 1100 },
    { category: h.shopping, amount: 1350 },
    { category: h.billsCat, amount: 720 },
    { category: h.entertainment, amount: 380 },
    { category: h.healthcare, amount: 200 },
  ]

  const spendingData = spendingPeriod === 'this' ? spendingThisMonth : spendingLastMonth
  const totalSpent = spendingData.reduce((sum, d) => sum + d.amount, 0)

  const incomeExpensesData = [
    { month: h.oct, income: 25000, expenses: 18200 },
    { month: h.nov, income: 25000, expenses: 19500 },
    { month: h.dec, income: 27500, expenses: 22100 },
    { month: h.jan, income: 25000, expenses: 17800 },
    { month: h.feb, income: 25000, expenses: 19100 },
    { month: h.mar, income: 25000, expenses: 8320 },
  ]

  const balanceTrendData = [
    { month: h.oct, balance: 145000 },
    { month: h.nov, balance: 151200 },
    { month: h.dec, balance: 148900 },
    { month: h.jan, balance: 158300 },
    { month: h.feb, balance: 168500 },
    { month: h.mar, balance: 180798 },
  ]

  const maskedValue = '••••••'
  const fmt = React.useMemo(() => new Intl.NumberFormat(
    locale === 'ar' ? 'ar-SA' : 'en-US',
    locale === 'ar' ? { numberingSystem: 'arab' } : undefined,
  ), [locale])

  return (
    <div className="container py-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-4 bg-primary/10 rounded-xl">
            <Bank className="h-10 w-10 text-primary" weight="duotone" />
          </div>
          <div>
            <h1 className="text-3xl font-bold ltr:tracking-tight">{h.welcome}</h1>
            <p className="text-muted-foreground text-sm">{h.lastLogin}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setBalanceVisible((v) => !v)}
          aria-label={balanceVisible ? h.hideBalance : h.showBalance}
        >
          {balanceVisible ? <Eye className="h-5 w-5" /> : <EyeSlash className="h-5 w-5" />}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          icon={<Wallet className="h-4 w-4" />}
          label={h.totalBalance}
          value={balanceVisible ? `${fmt.format(180797.89)} ${h.aed}` : maskedValue}
          trend={8.5}
          trendLabel={h.fromLastMonth}
        />
        <StatsCard
          icon={<TrendUp className="h-4 w-4" />}
          label={h.monthlyIncome}
          value={balanceVisible ? `${fmt.format(25000)} ${h.aed}` : maskedValue}
          trend={0}
          trendLabel={h.fromLastMonth}
        />
        <StatsCard
          icon={<TrendDown className="h-4 w-4" />}
          label={h.monthlyExpenses}
          value={balanceVisible ? `${fmt.format(8320)} ${h.aed}` : maskedValue}
          trend={-12}
          trendLabel={h.fromLastMonth}
        />
        <StatsCard
          icon={<ChartPie className="h-4 w-4" />}
          label={h.savingsGrowth}
          value={balanceVisible ? `${fmt.format(156230)} ${h.aed}` : maskedValue}
          trend={4.2}
          trendLabel={h.fromLastMonth}
        />
      </div>

      {/* Account Cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {/* Current Account */}
        <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 end-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/70">{h.currentAccount}</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">{h.visa}</Badge>
          </div>
          <div className="text-2xl font-bold mb-4">
            {balanceVisible ? <><ArabicNumber value={24567.89} decimals={2} /> <span className="text-sm font-normal text-white/70">{h.aed}</span></> : maskedValue}
          </div>
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>{h.iban}: <span dir="ltr" className="font-mono">AE07 0331 ****</span></span>
            <span>{h.cardNumber}: <span dir="ltr" className="font-mono">****4532</span></span>
          </div>
        </div>

        {/* Savings Account */}
        <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 end-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/70">{h.savingsAccount}</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">{h.profitRate}: 3.5%</Badge>
          </div>
          <div className="text-2xl font-bold mb-4">
            {balanceVisible ? <><ArabicNumber value={156230} decimals={2} /> <span className="text-sm font-normal text-white/70">{h.aed}</span></> : maskedValue}
          </div>
          <div className="text-sm text-white/60">
            <span>{h.iban}: <span dir="ltr" className="font-mono">AE12 0331 ****</span></span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/examples/banking/transfer">
            <PaperPlaneTilt className="h-5 w-5" />
            <span className="text-xs">{h.transfer}</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/examples/banking/bills">
            <Receipt className="h-5 w-5" />
            <span className="text-xs">{h.payBills}</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/examples/banking/cards">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs">{h.cardControls}</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/examples/banking/transactions">
            <FileText className="h-5 w-5" />
            <span className="text-xs">{h.statements}</span>
          </Link>
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spending Breakdown — Donut Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{h.spendingBreakdown}</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant={spendingPeriod === 'this' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSpendingPeriod('this')}
                  >
                    {h.thisMonth}
                  </Button>
                  <Button
                    variant={spendingPeriod === 'last' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSpendingPeriod('last')}
                  >
                    {h.lastMonth}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Chart
                  type="donut"
                  data={spendingData}
                  categoryKey="category"
                  valueKey="amount"
                  innerLabel={balanceVisible ? fmt.format(Math.round(totalSpent)) : maskedValue}
                  innerSubLabel={balanceVisible ? h.aed : ''}
                  colors={[
                    'var(--color-primary)',
                    'var(--color-warning)',
                    'var(--color-info)',
                    'var(--color-secondary)',
                    'var(--color-destructive)',
                    'var(--color-success)',
                    'hsl(280 60% 55%)',
                  ]}
                  thickness="thick"
                  size="md"
                  aria-label={h.spendingBreakdown}
                />
                {/* Legend */}
                <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {spendingData.map((item, i) => {
                    const colorClasses = [
                      'bg-primary', 'bg-warning', 'bg-info', 'bg-secondary',
                      'bg-destructive', 'bg-success', 'bg-[hsl(280_60%_55%)]',
                    ]
                    return (
                      <div key={item.category} className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full shrink-0 ${colorClasses[i]}`} />
                        <span className="truncate text-muted-foreground">{item.category}</span>
                        <span className="ms-auto font-medium">
                          {balanceVisible ? <ArabicNumber value={item.amount} /> : '••••'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Income vs Expenses — Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{h.incomeVsExpenses}</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                type="bar"
                data={incomeExpensesData}
                categoryKey="month"
                valueKey={['income', 'expenses']}
                colors={['var(--color-success)', 'var(--color-destructive)']}
                size="md"
                showXAxis
                showYAxis
                aria-label={h.incomeVsExpenses}
              />
              <div className="flex items-center justify-center gap-6 mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span className="text-muted-foreground">{h.income}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">{h.expenses}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{h.recentTransactions}</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/examples/banking/transactions">
                    {h.viewAll}
                    <Arrow className="h-3.5 w-3.5 ms-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${txn.amount > 0 ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                      {txn.amount > 0 ? <TrendUp className="h-5 w-5" /> : <TrendDown className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{isRTL ? txn.merchantAr : txn.merchant}</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? txn.dateAr : txn.date}</p>
                    </div>
                  </div>
                  <div className={`text-end font-semibold whitespace-nowrap ${txn.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                    {txn.amount > 0 ? '+' : ''}{balanceVisible ? <><ArabicNumber value={Math.abs(txn.amount)} decimals={2} /> <span className="text-xs font-normal text-muted-foreground">{h.aed}</span></> : maskedValue}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar (1/3) */}
        <div className="space-y-6">
          {/* Balance Trend — Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{h.balanceTrend}</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                type="line"
                data={balanceTrendData}
                categoryKey="month"
                valueKey="balance"
                colors={['var(--color-primary)']}
                size="sm"
                showXAxis
                showYAxis={false}
                aria-label={h.balanceTrend}
              />
            </CardContent>
          </Card>

          {/* Alert */}
          <Callout type="warning" title={h.creditCardDue}>
            <p className="text-sm">{h.creditCardDueDesc}</p>
          </Callout>
        </div>
      </div>
    </div>
  )
}
