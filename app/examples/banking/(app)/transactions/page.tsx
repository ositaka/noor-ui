'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/ui/stats-card'
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDirection } from '@/components/providers/direction-provider'
import { ArrowsLeftRight, TrendUp, TrendDown, Equals } from '@phosphor-icons/react'

const gt = {
  en: {
    title: 'Transactions',
    subtitle: 'View and manage your transaction history',
    totalIn: 'Total Income',
    totalOut: 'Total Expenses',
    net: 'Net',
    all: 'All',
    income: 'Income',
    expenses: 'Expenses',
    date: 'Date',
    description: 'Description',
    category: 'Category',
    reference: 'Reference',
    amount: 'Amount',
    search: 'Search transactions...',
    noResults: 'No transactions found.',
    clearSearch: 'Clear search',
    next: 'Next',
    previous: 'Previous',
    page: 'Page',
    aed: 'AED',
    fromLastMonth: 'this period',
    groceries: 'Groceries',
    dining: 'Dining',
    transport: 'Transport',
    shopping: 'Shopping',
    bills: 'Bills',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare',
    incomeCat: 'Income',
    transfer: 'Transfer',
  },
  ar: {
    title: 'المعاملات',
    subtitle: 'عرض وإدارة سجل المعاملات',
    totalIn: 'إجمالي الدخل',
    totalOut: 'إجمالي المصروفات',
    net: 'الصافي',
    all: 'الكل',
    income: 'الدخل',
    expenses: 'المصروفات',
    date: 'التاريخ',
    description: 'الوصف',
    category: 'الفئة',
    reference: 'المرجع',
    amount: 'المبلغ',
    search: 'ابحث في المعاملات...',
    noResults: 'لا توجد معاملات.',
    clearSearch: 'مسح البحث',
    next: 'التالي',
    previous: 'السابق',
    page: 'صفحة',
    aed: 'د.إ',
    fromLastMonth: 'هذه الفترة',
    groceries: 'بقالة',
    dining: 'مطاعم',
    transport: 'مواصلات',
    shopping: 'تسوق',
    bills: 'فواتير',
    entertainment: 'ترفيه',
    healthcare: 'صحة',
    incomeCat: 'دخل',
    transfer: 'تحويل',
  },
}

interface Transaction {
  id: string
  date: string
  dateAr: string
  merchant: string
  merchantAr: string
  category: string
  categoryAr: string
  reference: string
  amount: number
  type: 'income' | 'expense'
}

const allTransactions: Transaction[] = [
  { id: '1', date: 'Mar 16, 2026', dateAr: '١٦ مارس ٢٠٢٦', merchant: 'Carrefour', merchantAr: 'كارفور', category: 'Groceries', categoryAr: 'بقالة', reference: 'TXN-2026-00142', amount: -342.50, type: 'expense' },
  { id: '2', date: 'Mar 15, 2026', dateAr: '١٥ مارس ٢٠٢٦', merchant: 'Salary — Gulf Digital Bank', merchantAr: 'راتب — بنك الخليج الرقمي', category: 'Income', categoryAr: 'دخل', reference: 'TXN-2026-00141', amount: 25000, type: 'income' },
  { id: '3', date: 'Mar 14, 2026', dateAr: '١٤ مارس ٢٠٢٦', merchant: 'ADNOC Station', merchantAr: 'محطة أدنوك', category: 'Transport', categoryAr: 'مواصلات', reference: 'TXN-2026-00140', amount: -180, type: 'expense' },
  { id: '4', date: 'Mar 13, 2026', dateAr: '١٣ مارس ٢٠٢٦', merchant: 'Deliveroo', merchantAr: 'ديليفرو', category: 'Dining', categoryAr: 'مطاعم', reference: 'TXN-2026-00139', amount: -89.50, type: 'expense' },
  { id: '5', date: 'Mar 12, 2026', dateAr: '١٢ مارس ٢٠٢٦', merchant: 'DEWA', merchantAr: 'كهرباء ومياه دبي', category: 'Bills', categoryAr: 'فواتير', reference: 'TXN-2026-00138', amount: -450, type: 'expense' },
  { id: '6', date: 'Mar 11, 2026', dateAr: '١١ مارس ٢٠٢٦', merchant: 'Noon.com', merchantAr: 'نون.كوم', category: 'Shopping', categoryAr: 'تسوق', reference: 'TXN-2026-00137', amount: -675, type: 'expense' },
  { id: '7', date: 'Mar 10, 2026', dateAr: '١٠ مارس ٢٠٢٦', merchant: 'Etisalat', merchantAr: 'اتصالات', category: 'Bills', categoryAr: 'فواتير', reference: 'TXN-2026-00136', amount: -320, type: 'expense' },
  { id: '8', date: 'Mar 9, 2026', dateAr: '٩ مارس ٢٠٢٦', merchant: 'Talabat', merchantAr: 'طلبات', category: 'Dining', categoryAr: 'مطاعم', reference: 'TXN-2026-00135', amount: -125, type: 'expense' },
  { id: '9', date: 'Mar 8, 2026', dateAr: '٨ مارس ٢٠٢٦', merchant: 'Transfer from Mohammed', merchantAr: 'تحويل من محمد', category: 'Transfer', categoryAr: 'تحويل', reference: 'TXN-2026-00134', amount: 5000, type: 'income' },
  { id: '10', date: 'Mar 7, 2026', dateAr: '٧ مارس ٢٠٢٦', merchant: 'Lulu Hypermarket', merchantAr: 'لولو هايبرماركت', category: 'Groceries', categoryAr: 'بقالة', reference: 'TXN-2026-00133', amount: -289, type: 'expense' },
  { id: '11', date: 'Mar 6, 2026', dateAr: '٦ مارس ٢٠٢٦', merchant: 'Salik', merchantAr: 'سالك', category: 'Transport', categoryAr: 'مواصلات', reference: 'TXN-2026-00132', amount: -50, type: 'expense' },
  { id: '12', date: 'Mar 5, 2026', dateAr: '٥ مارس ٢٠٢٦', merchant: 'du', merchantAr: 'دو', category: 'Bills', categoryAr: 'فواتير', reference: 'TXN-2026-00131', amount: -199, type: 'expense' },
  { id: '13', date: 'Mar 4, 2026', dateAr: '٤ مارس ٢٠٢٦', merchant: 'VOX Cinemas', merchantAr: 'ڤوكس سينما', category: 'Entertainment', categoryAr: 'ترفيه', reference: 'TXN-2026-00130', amount: -85, type: 'expense' },
  { id: '14', date: 'Mar 3, 2026', dateAr: '٣ مارس ٢٠٢٦', merchant: 'Namshi', merchantAr: 'نمشي', category: 'Shopping', categoryAr: 'تسوق', reference: 'TXN-2026-00129', amount: -445, type: 'expense' },
  { id: '15', date: 'Mar 2, 2026', dateAr: '٢ مارس ٢٠٢٦', merchant: 'Emirates Airlines', merchantAr: 'طيران الإمارات', category: 'Transport', categoryAr: 'مواصلات', reference: 'TXN-2026-00128', amount: -1850, type: 'expense' },
  { id: '16', date: 'Mar 1, 2026', dateAr: '١ مارس ٢٠٢٦', merchant: 'Salary — Gulf Digital Bank', merchantAr: 'راتب — بنك الخليج الرقمي', category: 'Income', categoryAr: 'دخل', reference: 'TXN-2026-00127', amount: 25000, type: 'income' },
  { id: '17', date: 'Feb 28, 2026', dateAr: '٢٨ فبراير ٢٠٢٦', merchant: 'Carrefour', merchantAr: 'كارفور', category: 'Groceries', categoryAr: 'بقالة', reference: 'TXN-2026-00126', amount: -410, type: 'expense' },
  { id: '18', date: 'Feb 27, 2026', dateAr: '٢٧ فبراير ٢٠٢٦', merchant: 'Medcare Hospital', merchantAr: 'مستشفى ميدكير', category: 'Healthcare', categoryAr: 'صحة', reference: 'TXN-2026-00125', amount: -350, type: 'expense' },
  { id: '19', date: 'Feb 26, 2026', dateAr: '٢٦ فبراير ٢٠٢٦', merchant: 'ADNOC Station', merchantAr: 'محطة أدنوك', category: 'Transport', categoryAr: 'مواصلات', reference: 'TXN-2026-00124', amount: -200, type: 'expense' },
  { id: '20', date: 'Feb 25, 2026', dateAr: '٢٥ فبراير ٢٠٢٦', merchant: 'Transfer to Fatima', merchantAr: 'تحويل إلى فاطمة', category: 'Transfer', categoryAr: 'تحويل', reference: 'TXN-2026-00123', amount: -2500, type: 'expense' },
]

export default function TransactionsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const [activeTab, setActiveTab] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 10

  const filteredData = React.useMemo(() => {
    if (activeTab === 'all') return allTransactions
    if (activeTab === 'income') return allTransactions.filter((t) => t.type === 'income')
    return allTransactions.filter((t) => t.type === 'expense')
  }, [activeTab])

  const totalIn = allTransactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const totalOut = Math.abs(allTransactions.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0))
  const net = totalIn - totalOut

  const fmt = React.useMemo(() => new Intl.NumberFormat(
    locale === 'ar' ? 'ar-SA' : 'en-US',
    locale === 'ar' ? { numberingSystem: 'arab' } : undefined,
  ), [locale])

  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage])

  React.useEffect(() => { setCurrentPage(1) }, [activeTab])

  const columns: ColumnDef<Transaction>[] = [
    {
      id: 'date',
      header: h.date,
      accessorKey: 'date',
      sortable: true,
      cell: (row: Transaction) => (
        <span className="text-sm whitespace-nowrap">{isRTL ? row.dateAr : row.date}</span>
      ),
    },
    {
      id: 'description',
      header: h.description,
      accessorKey: 'merchant',
      cell: (row: Transaction) => (
        <span className="font-medium">{isRTL ? row.merchantAr : row.merchant}</span>
      ),
    },
    {
      id: 'category',
      header: h.category,
      accessorKey: 'category',
      cell: (row: Transaction) => (
        <Badge variant="secondary">{isRTL ? row.categoryAr : row.category}</Badge>
      ),
    },
    {
      id: 'reference',
      header: h.reference,
      accessorKey: 'reference',
      cell: (row: Transaction) => (
        <span dir="ltr" className="font-mono text-xs text-muted-foreground">{row.reference}</span>
      ),
    },
    {
      id: 'amount',
      header: h.amount,
      accessorKey: 'amount',
      sortable: true,
      align: 'end' as const,
      cell: (row: Transaction) => (
        <span className={`font-semibold whitespace-nowrap ${row.amount > 0 ? 'text-success' : ''}`}>
          {row.amount > 0 ? '+' : ''}<ArabicNumber value={Math.abs(row.amount)} decimals={2} /> {h.aed}
        </span>
      ),
    },
  ]

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <ArrowsLeftRight className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-3xl font-bold ltr:tracking-tight">{h.title}</h1>
          <p className="text-muted-foreground text-sm">{h.subtitle}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatsCard
          icon={<TrendUp className="h-4 w-4" />}
          label={h.totalIn}
          value={`${fmt.format(Math.round(totalIn))} ${h.aed}`}
          className="border-success/20"
        />
        <StatsCard
          icon={<TrendDown className="h-4 w-4" />}
          label={h.totalOut}
          value={`${fmt.format(Math.round(totalOut))} ${h.aed}`}
          className="border-destructive/20"
        />
        <StatsCard
          icon={<Equals className="h-4 w-4" />}
          label={h.net}
          value={`${net > 0 ? '+' : ''}${fmt.format(Math.round(net))} ${h.aed}`}
          className={net > 0 ? 'border-success/20' : 'border-destructive/20'}
        />
      </div>

      {/* Filter Tabs */}
      <div className="mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">{h.all} ({allTransactions.length})</TabsTrigger>
            <TabsTrigger value="income">{h.income} ({allTransactions.filter((t) => t.type === 'income').length})</TabsTrigger>
            <TabsTrigger value="expenses">{h.expenses} ({allTransactions.filter((t) => t.type === 'expense').length})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* DataTable */}
      <Card>
        <CardContent className="pt-6">
          <DataTable
            data={paginatedData}
            columns={columns}
            searchable
            searchPlaceholder={h.search}
            emptyMessage={h.noResults}
            clearSearchLabel={h.clearSearch}
            enableSorting
            pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            nextLabel={h.next}
            previousLabel={h.previous}
            pageLabel={h.page}
            hoverable
          />
        </CardContent>
      </Card>
    </div>
  )
}
