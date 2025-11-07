import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Islamic Finance Dashboard | RTL Design System',
  description: 'Islamic finance dashboard with Zakat calculator, Sukuk tracking, and Shariah-compliant features. Arabic and English support.',
  keywords: ['islamic finance', 'zakat', 'sukuk', 'dashboard', 'shariah', 'gcc', 'arabic', 'rtl', 'react', 'nextjs', 'demo'],
}

'use client'

import * as React from 'react'
import { useDirection } from '@/components/providers/direction-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ZakatCalculator } from '@/components/ui/zakat-calculator'
import { PrayerTimes } from '@/components/ui/prayer-times'
import { HijriDate } from '@/components/ui/hijri-date'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { DataTable, ColumnDef } from '@/components/ui/data-table'
import { Calendar } from '@/components/ui/calendar'
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calendar as CalendarIcon,
  Bell,
  DollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// Types
// ============================================================================

interface Transaction {
  id: string
  date: Date
  type: 'income' | 'expense' | 'investment' | 'zakat'
  category: string
  categoryAr: string
  description: string
  descriptionAr: string
  amount: number
  status: 'completed' | 'pending' | 'cancelled'
}

interface Investment {
  id: string
  name: string
  nameAr: string
  type: string
  typeAr: string
  amount: number
  returns: number
  shariahCompliant: boolean
}

// ============================================================================
// Sample Data
// ============================================================================

const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      date: new Date(2025, 10, 1),
      type: 'income',
      category: 'Salary',
      categoryAr: 'راتب',
      description: 'Monthly Salary',
      descriptionAr: 'الراتب الشهري',
      amount: 25000,
      status: 'completed',
    },
    {
      id: 'TXN002',
      date: new Date(2025, 10, 3),
      type: 'zakat',
      category: 'Zakat',
      categoryAr: 'زكاة',
      description: 'Zakat al-Mal Payment',
      descriptionAr: 'دفع زكاة المال',
      amount: -625,
      status: 'completed',
    },
    {
      id: 'TXN003',
      date: new Date(2025, 10, 5),
      type: 'investment',
      category: 'Sukuk',
      categoryAr: 'صكوك',
      description: 'Islamic Bond Purchase',
      descriptionAr: 'شراء سندات إسلامية',
      amount: -10000,
      status: 'completed',
    },
    {
      id: 'TXN004',
      date: new Date(2025, 10, 7),
      type: 'expense',
      category: 'Utilities',
      categoryAr: 'مرافق',
      description: 'Electricity Bill',
      descriptionAr: 'فاتورة الكهرباء',
      amount: -450,
      status: 'completed',
    },
    {
      id: 'TXN005',
      date: new Date(2025, 10, 10),
      type: 'income',
      category: 'Investment Returns',
      categoryAr: 'عوائد الاستثمار',
      description: 'Mudarabah Profit Share',
      descriptionAr: 'حصة أرباح المضاربة',
      amount: 1250,
      status: 'completed',
    },
    {
      id: 'TXN006',
      date: new Date(2025, 10, 12),
      type: 'expense',
      category: 'Charity',
      categoryAr: 'صدقة',
      description: 'Sadaqah Donation',
      descriptionAr: 'تبرع صدقة',
      amount: -500,
      status: 'completed',
    },
    {
      id: 'TXN007',
      date: new Date(2025, 10, 15),
      type: 'investment',
      category: 'Real Estate',
      categoryAr: 'عقارات',
      description: 'Property Investment Fund',
      descriptionAr: 'صندوق استثمار عقاري',
      amount: -50000,
      status: 'pending',
    },
    {
      id: 'TXN008',
      date: new Date(2025, 10, 18),
      type: 'expense',
      category: 'Education',
      categoryAr: 'تعليم',
      description: 'Children School Fees',
      descriptionAr: 'رسوم مدرسة الأطفال',
      amount: -3500,
      status: 'completed',
    },
    {
      id: 'TXN009',
      date: new Date(2025, 10, 20),
      type: 'income',
      category: 'Business',
      categoryAr: 'عمل',
      description: 'Consulting Services',
      descriptionAr: 'خدمات استشارية',
      amount: 8000,
      status: 'completed',
    },
    {
      id: 'TXN010',
      date: new Date(2025, 10, 25),
      type: 'expense',
      category: 'Healthcare',
      categoryAr: 'رعاية صحية',
      description: 'Medical Insurance',
      descriptionAr: 'تأمين طبي',
      amount: -1200,
      status: 'pending',
    },
  ]

  return transactions
}

const sampleInvestments: Investment[] = [
  {
    id: 'INV001',
    name: 'Al-Rajhi Sukuk Fund',
    nameAr: 'صندوق صكوك الراجحي',
    type: 'Sukuk',
    typeAr: 'صكوك',
    amount: 50000,
    returns: 6.5,
    shariahCompliant: true,
  },
  {
    id: 'INV002',
    name: 'GCC Real Estate Fund',
    nameAr: 'صندوق العقارات الخليجي',
    type: 'Real Estate',
    typeAr: 'عقارات',
    amount: 100000,
    returns: 8.2,
    shariahCompliant: true,
  },
  {
    id: 'INV003',
    name: 'Islamic Equity Portfolio',
    nameAr: 'محفظة الأسهم الإسلامية',
    type: 'Equity',
    typeAr: 'أسهم',
    amount: 75000,
    returns: 12.5,
    shariahCompliant: true,
  },
  {
    id: 'INV004',
    name: 'Mudarabah Trade Finance',
    nameAr: 'تمويل تجاري مضاربة',
    type: 'Mudarabah',
    typeAr: 'مضاربة',
    amount: 30000,
    returns: 9.0,
    shariahCompliant: true,
  },
]

const importantIslamicDates = [
  {
    date: new Date(2025, 10, 15),
    title: 'Eid al-Fitr (Expected)',
    variant: 'primary' as const,
  },
  {
    date: new Date(2025, 11, 1),
    title: 'Hajj Season Begins',
    variant: 'secondary' as const,
  },
  {
    date: new Date(2025, 11, 10),
    title: 'Eid al-Adha (Expected)',
    variant: 'primary' as const,
  },
]

// ============================================================================
// Component
// ============================================================================

export default function IslamicFinanceDashboardPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const [allTransactions] = React.useState<Transaction[]>(generateTransactions())
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [sortBy, setSortBy] = React.useState<string>()
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc' | null>(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [showPrayerNotification, setShowPrayerNotification] = React.useState(true)

  // Calculate totals
  const totalBalance = React.useMemo(() => {
    return allTransactions
      .filter((t) => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [allTransactions])

  const monthlyIncome = React.useMemo(() => {
    return allTransactions
      .filter((t) => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [allTransactions])

  const monthlyExpenses = React.useMemo(() => {
    return Math.abs(
      allTransactions
        .filter((t) => (t.type === 'expense' || t.type === 'zakat') && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0)
    )
  }, [allTransactions])

  const totalInvestments = React.useMemo(() => {
    return sampleInvestments.reduce((sum, inv) => sum + inv.amount, 0)
  }, [])

  const investmentReturns = React.useMemo(() => {
    return sampleInvestments.reduce((sum, inv) => sum + (inv.amount * inv.returns) / 100, 0)
  }, [])

  const zakatPaid = React.useMemo(() => {
    return Math.abs(
      allTransactions
        .filter((t) => t.type === 'zakat' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0)
    )
  }, [allTransactions])

  // Filtered and sorted transactions
  const filteredTransactions = React.useMemo(() => {
    let filtered = allTransactions

    if (searchValue) {
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          t.descriptionAr.includes(searchValue) ||
          t.category.toLowerCase().includes(searchValue.toLowerCase()) ||
          t.categoryAr.includes(searchValue) ||
          t.id.toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    if (sortBy && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        let aVal: any = a[sortBy as keyof Transaction]
        let bVal: any = b[sortBy as keyof Transaction]

        if (sortBy === 'date') {
          aVal = a.date.getTime()
          bVal = b.date.getTime()
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [allTransactions, searchValue, sortBy, sortDirection])

  // Handle sorting
  const handleSort = (columnId: string) => {
    if (sortBy === columnId) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortBy(undefined)
        setSortDirection(null)
      }
    } else {
      setSortBy(columnId)
      setSortDirection('asc')
    }
  }

  // DataTable columns
  const columns: ColumnDef<Transaction>[] = [
    {
      id: 'id',
      header: 'ID',
      headerAr: 'الرقم',
      accessorKey: 'id',
      sortable: true,
      width: '100px',
    },
    {
      id: 'date',
      header: 'Date',
      headerAr: 'التاريخ',
      accessorKey: 'date',
      cell: (row) => (
        <div className="text-sm">
          {row.date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      ),
      sortable: true,
      width: '120px',
    },
    {
      id: 'type',
      header: 'Type',
      headerAr: 'النوع',
      accessorKey: 'type',
      cell: (row) => (
        <Badge
          variant={
            row.type === 'income'
              ? 'default'
              : row.type === 'zakat'
                ? 'secondary'
                : row.type === 'investment'
                  ? 'outline'
                  : 'destructive'
          }
          className="capitalize"
        >
          {isRTL
            ? row.type === 'income'
              ? 'دخل'
              : row.type === 'expense'
                ? 'مصروف'
                : row.type === 'investment'
                  ? 'استثمار'
                  : 'زكاة'
            : row.type}
        </Badge>
      ),
      sortable: true,
      width: '100px',
    },
    {
      id: 'category',
      header: 'Category',
      headerAr: 'الفئة',
      accessorKey: 'category',
      cell: (row) => (
        <div className="text-sm">{isRTL ? row.categoryAr : row.category}</div>
      ),
      sortable: true,
    },
    {
      id: 'description',
      header: 'Description',
      headerAr: 'الوصف',
      accessorKey: 'description',
      cell: (row) => (
        <div className="text-sm text-muted-foreground">
          {isRTL ? row.descriptionAr : row.description}
        </div>
      ),
    },
    {
      id: 'amount',
      header: 'Amount',
      headerAr: 'المبلغ',
      accessorKey: 'amount',
      cell: (row) => (
        <div
          className={cn(
            'font-medium',
            row.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          )}
        >
          <ArabicNumber value={Math.abs(row.amount)} format="currency" />
        </div>
      ),
      sortable: true,
      align: 'end',
      width: '120px',
    },
    {
      id: 'status',
      header: 'Status',
      headerAr: 'الحالة',
      accessorKey: 'status',
      cell: (row) => (
        <Badge
          variant={
            row.status === 'completed'
              ? 'default'
              : row.status === 'pending'
                ? 'secondary'
                : 'outline'
          }
          className="capitalize"
        >
          {isRTL
            ? row.status === 'completed'
              ? 'مكتمل'
              : row.status === 'pending'
                ? 'قيد الانتظار'
                : 'ملغي'
            : row.status}
        </Badge>
      ),
      sortable: true,
      width: '100px',
    },
  ]

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            {isRTL ? 'لوحة التمويل الإسلامي' : 'Islamic Finance Dashboard'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isRTL
              ? 'إدارة شاملة للمالية الإسلامية مع دعم كامل لـ RTL'
              : 'Comprehensive Islamic finance management with full RTL support'}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <HijriDate
              variant="compact"
              gregorianDate="November 7, 2025"
              gregorianDateAr="٧ نوفمبر ٢٠٢٥"
              hijriDate="6 Jumada al-Awwal 1447"
              hijriDateAr="٦ جمادى الأولى ١٤٤٧"
            />
          </div>
        </div>

        {/* Prayer Notification */}
        {showPrayerNotification && (
          <PrayerTimes
            variant="notification"
            location="Riyadh, Saudi Arabia"
            locationAr="الرياض، المملكة العربية السعودية"
            nextPrayer="Dhuhr"
            prayers={[
              { name: 'Fajr', nameAr: 'الفجر', time: '05:15 AM' },
              { name: 'Sunrise', nameAr: 'الشروق', time: '06:35 AM' },
              { name: 'Dhuhr', nameAr: 'الظهر', time: '12:15 PM' },
              { name: 'Asr', nameAr: 'العصر', time: '03:30 PM' },
              { name: 'Maghrib', nameAr: 'المغرب', time: '06:05 PM' },
              { name: 'Isha', nameAr: 'العشاء', time: '07:35 PM' },
            ]}
            showPlayAdhan={true}
            onPlayAdhan={() => {
              // Handle Adhan playback
            }}
            onDismiss={() => setShowPrayerNotification(false)}
          />
        )}

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Balance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'الرصيد الإجمالي' : 'Total Balance'}
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <ArabicNumber value={totalBalance} format="currency" />
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <TrendingUp className="h-3 w-3" />
                <span>{isRTL ? '+12.5% هذا الشهر' : '+12.5% from last month'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Income */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'الدخل الشهري' : 'Monthly Income'}
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <ArabicNumber value={monthlyIncome} format="currency" />
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL
                  ? `المصروفات: ${new Intl.NumberFormat('ar-SA', {
                      style: 'currency',
                      currency: 'SAR',
                    }).format(monthlyExpenses)}`
                  : `Expenses: ${new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'SAR',
                    }).format(monthlyExpenses)}`}
              </p>
            </CardContent>
          </Card>

          {/* Total Investments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'الاستثمارات' : 'Investments'}
              </CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <ArabicNumber value={totalInvestments} format="currency" />
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <TrendingUp className="h-3 w-3" />
                <span>
                  {isRTL ? 'عوائد: ' : 'Returns: '}
                  <ArabicNumber value={investmentReturns} format="currency" />
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Zakat Paid */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isRTL ? 'الزكاة المدفوعة' : 'Zakat Paid'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <ArabicNumber value={zakatPaid} format="currency" />
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'هذا الشهر' : 'This month'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              {isRTL ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="transactions">
              {isRTL ? 'المعاملات' : 'Transactions'}
            </TabsTrigger>
            <TabsTrigger value="investments">
              {isRTL ? 'الاستثمارات' : 'Investments'}
            </TabsTrigger>
            <TabsTrigger value="zakat">
              {isRTL ? 'حاسبة الزكاة' : 'Zakat Calculator'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Calendar with Islamic Dates */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {isRTL ? 'التقويم الإسلامي' : 'Islamic Calendar'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date instanceof Date || date === undefined) {
                        setSelectedDate(date)
                      }
                    }}
                    showHijri={true}
                    events={importantIslamicDates}
                    locale={locale}
                  />
                </CardContent>
              </Card>

              {/* Prayer Times Sidebar */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      {isRTL ? 'مواقيت الصلاة' : 'Prayer Times'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PrayerTimes
                      variant="detailed"
                      location="Riyadh, Saudi Arabia"
                      locationAr="الرياض، المملكة العربية السعودية"
                      nextPrayer="Dhuhr"
                      prayers={[
                        { name: 'Fajr', nameAr: 'الفجر', time: '05:15 AM' },
                        { name: 'Sunrise', nameAr: 'الشروق', time: '06:35 AM' },
                        { name: 'Dhuhr', nameAr: 'الظهر', time: '12:15 PM' },
                        { name: 'Asr', nameAr: 'العصر', time: '03:30 PM' },
                        { name: 'Maghrib', nameAr: 'المغرب', time: '06:05 PM' },
                        { name: 'Isha', nameAr: 'العشاء', time: '07:35 PM' },
                      ]}
                    />
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline">
                      {isRTL ? 'إضافة معاملة' : 'Add Transaction'}
                    </Button>
                    <Button className="w-full" variant="outline">
                      {isRTL ? 'عرض التقارير' : 'View Reports'}
                    </Button>
                    <Button className="w-full" variant="outline">
                      {isRTL ? 'تصدير البيانات' : 'Export Data'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isRTL ? 'سجل المعاملات' : 'Transaction History'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={filteredTransactions}
                  columns={columns}
                  searchable={true}
                  searchPlaceholder="Search transactions..."
                  searchPlaceholderAr="بحث في المعاملات..."
                  searchValue={searchValue}
                  onSearchChange={setSearchValue}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  pagination={true}
                  currentPage={1}
                  totalPages={Math.ceil(filteredTransactions.length / 10)}
                  pageSize={10}
                  striped={true}
                  hoverable={true}
                  emptyMessage="No transactions found"
                  emptyMessageAr="لم يتم العثور على معاملات"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {sampleInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {isRTL ? investment.nameAr : investment.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {isRTL ? investment.typeAr : investment.type}
                        </p>
                      </div>
                      {investment.shariahCompliant && (
                        <Badge variant="default" className="bg-green-600">
                          {isRTL ? 'حلال' : 'Halal'}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {isRTL ? 'المبلغ المستثمر' : 'Invested Amount'}
                        </span>
                        <span className="font-medium">
                          <ArabicNumber value={investment.amount} format="currency" />
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {isRTL ? 'معدل العائد' : 'Return Rate'}
                        </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          <ArabicNumber value={investment.returns} />%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {isRTL ? 'العائد المتوقع' : 'Expected Returns'}
                        </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          <ArabicNumber
                            value={(investment.amount * investment.returns) / 100}
                            format="currency"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          {isRTL ? 'إدارة' : 'Manage'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Investment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {isRTL ? 'ملخص الاستثمارات' : 'Investment Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'إجمالي المستثمر' : 'Total Invested'}
                    </p>
                    <p className="text-2xl font-bold">
                      <ArabicNumber value={totalInvestments} format="currency" />
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'إجمالي العوائد' : 'Total Returns'}
                    </p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      <ArabicNumber value={investmentReturns} format="currency" />
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'متوسط العائد' : 'Average Return'}
                    </p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      <ArabicNumber
                        value={
                          sampleInvestments.reduce((sum, inv) => sum + inv.returns, 0) /
                          sampleInvestments.length
                        }
                      />
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Zakat Calculator Tab */}
          <TabsContent value="zakat" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isRTL ? 'حاسبة الزكاة' : 'Zakat Calculator'}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'احسب زكاتك السنوية بناءً على أصولك والتزاماتك'
                    : 'Calculate your annual Zakat based on your assets and liabilities'}
                </p>
              </CardHeader>
              <CardContent>
                <ZakatCalculator
                  defaultValues={{
                    cash: totalBalance,
                    gold: 0,
                    silver: 0,
                    investments: totalInvestments,
                    business: 0,
                    other: 0,
                  }}
                  locale={locale}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
