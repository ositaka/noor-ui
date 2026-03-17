'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { Receipt, Lightning, Drop, Phone, Car, Buildings, CurrencyDollar } from '@phosphor-icons/react'

const gt = {
  en: {
    title: 'Bills & Payments',
    subtitle: 'Manage your bills and payment history',
    activeBillers: 'Active Billers',
    paymentHistory: 'Payment History',
    payNow: 'Pay Now',
    paid: 'Paid',
    due: 'Due',
    overdue: 'Overdue',
    autoRecharge: 'Auto-recharge',
    amountDue: 'Amount Due',
    dueDate: 'Due Date',
    lastPaid: 'Last Paid',
    accountNo: 'Account',
    addBiller: 'Add New Biller',
    billerType: 'Biller Type',
    selectBillerType: 'Select biller type',
    accountNumber: 'Account Number',
    accountPlaceholder: 'Enter account number',
    save: 'Save Biller',
    cancel: 'Cancel',
    confirmPay: 'Confirm Payment',
    confirmPayDesc: 'Are you sure you want to pay this bill?',
    confirm: 'Pay',
    billPaid: 'Bill Paid',
    billPaidDesc: 'payment confirmed.',
    billerAdded: 'Biller Added',
    billerAddedDesc: 'New biller has been saved successfully.',
    aed: 'AED',
    date: 'Date',
    biller: 'Biller',
    amount: 'Amount',
    reference: 'Reference',
    status: 'Status',
    completed: 'Completed',
    next: 'Next',
    previous: 'Previous',
    page: 'Page',
    noResults: 'No payment history.',
    clearSearch: 'Clear',
    search: 'Search payments...',
    balance: 'Balance',
    noDue: 'No amount due',
    billerDewa: 'DEWA',
    billerEtisalat: 'Etisalat / du',
    billerSalik: 'Salik',
    billerAddc: 'ADDC',
    billerMunicipality: 'Municipality',
  },
  ar: {
    title: 'الفواتير والمدفوعات',
    subtitle: 'إدارة فواتيرك وسجل المدفوعات',
    activeBillers: 'مزودو الخدمات',
    paymentHistory: 'سجل المدفوعات',
    payNow: 'ادفع الآن',
    paid: 'مدفوعة',
    due: 'مستحقة',
    overdue: 'متأخرة',
    autoRecharge: 'شحن تلقائي',
    amountDue: 'المبلغ المستحق',
    dueDate: 'تاريخ الاستحقاق',
    lastPaid: 'آخر دفعة',
    accountNo: 'الحساب',
    addBiller: 'إضافة مزود خدمة',
    billerType: 'نوع الخدمة',
    selectBillerType: 'اختر نوع الخدمة',
    accountNumber: 'رقم الحساب',
    accountPlaceholder: 'أدخل رقم الحساب',
    save: 'حفظ',
    cancel: 'إلغاء',
    confirmPay: 'تأكيد الدفع',
    confirmPayDesc: 'هل أنت متأكد من دفع هذه الفاتورة؟',
    confirm: 'دفع',
    billPaid: 'تم الدفع',
    billPaidDesc: 'تم تأكيد الدفع.',
    billerAdded: 'تمت الإضافة',
    billerAddedDesc: 'تم حفظ مزود الخدمة الجديد بنجاح.',
    aed: 'د.إ',
    date: 'التاريخ',
    biller: 'مزود الخدمة',
    amount: 'المبلغ',
    reference: 'المرجع',
    status: 'الحالة',
    completed: 'مكتمل',
    next: 'التالي',
    previous: 'السابق',
    page: 'صفحة',
    noResults: 'لا توجد مدفوعات.',
    clearSearch: 'مسح',
    search: 'ابحث في المدفوعات...',
    balance: 'الرصيد',
    noDue: 'لا يوجد مبلغ مستحق',
    billerDewa: 'كهرباء ومياه دبي',
    billerEtisalat: 'اتصالات / دو',
    billerSalik: 'سالك',
    billerAddc: 'شركة أبوظبي للتوزيع',
    billerMunicipality: 'البلدية',
  },
}

interface Biller {
  id: string
  name: string
  nameAr: string
  account: string
  amount: number
  dueDate: string
  dueDateAr: string
  lastPaid: string
  lastPaidAr: string
  type: 'due' | 'auto' | 'paid'
  icon: React.ReactNode
}

const billers: Biller[] = [
  { id: 'dewa', name: 'DEWA', nameAr: 'كهرباء ومياه دبي', account: '12345678', amount: 450, dueDate: 'Mar 25', dueDateAr: '٢٥ مارس', lastPaid: 'Feb 25', lastPaidAr: '٢٥ فبراير', type: 'due', icon: <Drop className="h-6 w-6" /> },
  { id: 'etisalat', name: 'Etisalat', nameAr: 'اتصالات', account: '0501234567', amount: 320, dueDate: 'Mar 20', dueDateAr: '٢٠ مارس', lastPaid: 'Feb 20', lastPaidAr: '٢٠ فبراير', type: 'due', icon: <Phone className="h-6 w-6" /> },
  { id: 'du', name: 'du', nameAr: 'دو', account: '0551234567', amount: 199, dueDate: 'Mar 22', dueDateAr: '٢٢ مارس', lastPaid: 'Feb 22', lastPaidAr: '٢٢ فبراير', type: 'due', icon: <Phone className="h-6 w-6" /> },
  { id: 'salik', name: 'Salik', nameAr: 'سالك', account: '800123456', amount: 85, dueDate: '', dueDateAr: '', lastPaid: 'Mar 10', lastPaidAr: '١٠ مارس', type: 'auto', icon: <Car className="h-6 w-6" /> },
  { id: 'addc', name: 'ADDC', nameAr: 'شركة أبوظبي للتوزيع', account: '98765432', amount: 380, dueDate: 'Mar 28', dueDateAr: '٢٨ مارس', lastPaid: 'Feb 28', lastPaidAr: '٢٨ فبراير', type: 'due', icon: <Lightning className="h-6 w-6" /> },
  { id: 'municipality', name: 'Municipality', nameAr: 'البلدية', account: '11223344', amount: 0, dueDate: '', dueDateAr: '', lastPaid: 'Mar 1', lastPaidAr: '١ مارس', type: 'paid', icon: <Buildings className="h-6 w-6" /> },
]

interface PaymentRecord {
  id: string
  date: string
  dateAr: string
  biller: string
  billerAr: string
  amount: number
  reference: string
  status: string
}

const paymentHistory: PaymentRecord[] = [
  { id: '1', date: 'Mar 10, 2026', dateAr: '١٠ مارس ٢٠٢٦', biller: 'Salik', billerAr: 'سالك', amount: 100, reference: 'PAY-2026-00098', status: 'Completed' },
  { id: '2', date: 'Mar 1, 2026', dateAr: '١ مارس ٢٠٢٦', biller: 'Municipality', billerAr: 'البلدية', amount: 250, reference: 'PAY-2026-00097', status: 'Completed' },
  { id: '3', date: 'Feb 28, 2026', dateAr: '٢٨ فبراير ٢٠٢٦', biller: 'ADDC', billerAr: 'شركة أبوظبي للتوزيع', amount: 410, reference: 'PAY-2026-00096', status: 'Completed' },
  { id: '4', date: 'Feb 25, 2026', dateAr: '٢٥ فبراير ٢٠٢٦', biller: 'DEWA', billerAr: 'كهرباء ومياه دبي', amount: 480, reference: 'PAY-2026-00095', status: 'Completed' },
  { id: '5', date: 'Feb 22, 2026', dateAr: '٢٢ فبراير ٢٠٢٦', biller: 'du', billerAr: 'دو', amount: 199, reference: 'PAY-2026-00094', status: 'Completed' },
  { id: '6', date: 'Feb 20, 2026', dateAr: '٢٠ فبراير ٢٠٢٦', biller: 'Etisalat', billerAr: 'اتصالات', amount: 299, reference: 'PAY-2026-00093', status: 'Completed' },
  { id: '7', date: 'Feb 10, 2026', dateAr: '١٠ فبراير ٢٠٢٦', biller: 'Salik', billerAr: 'سالك', amount: 100, reference: 'PAY-2026-00092', status: 'Completed' },
  { id: '8', date: 'Jan 25, 2026', dateAr: '٢٥ يناير ٢٠٢٦', biller: 'DEWA', billerAr: 'كهرباء ومياه دبي', amount: 520, reference: 'PAY-2026-00091', status: 'Completed' },
]

export default function BillsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const { toast } = useToast()

  const [paidBillers, setPaidBillers] = React.useState<Record<string, boolean>>({})
  const [payingBillerId, setPayingBillerId] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showAddDialog, setShowAddDialog] = React.useState(false)

  const handlePay = async (billerId: string) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setPaidBillers((prev) => ({ ...prev, [billerId]: true }))
    setPayingBillerId(null)
    setIsSubmitting(false)
    const biller = billers.find((b) => b.id === billerId)
    toast({
      title: h.billPaid,
      description: `${isRTL ? biller?.nameAr : biller?.name} ${h.billPaidDesc}`,
      variant: 'success',
    })
  }

  const handleAddBiller = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    setShowAddDialog(false)
    toast({ title: h.billerAdded, description: h.billerAddedDesc, variant: 'success' })
  }

  const paymentColumns: ColumnDef<PaymentRecord>[] = [
    {
      id: 'date', header: h.date, accessorKey: 'date', sortable: true,
      cell: (row: PaymentRecord) => <span className="text-sm">{isRTL ? row.dateAr : row.date}</span>,
    },
    {
      id: 'biller', header: h.biller, accessorKey: 'biller',
      cell: (row: PaymentRecord) => <span className="font-medium">{isRTL ? row.billerAr : row.biller}</span>,
    },
    {
      id: 'amount', header: h.amount, accessorKey: 'amount', sortable: true, align: 'end' as const,
      cell: (row: PaymentRecord) => <span className="font-semibold"><ArabicNumber value={row.amount} decimals={2} /> {h.aed}</span>,
    },
    {
      id: 'reference', header: h.reference, accessorKey: 'reference',
      cell: (row: PaymentRecord) => <span dir="ltr" className="font-mono text-xs text-muted-foreground">{row.reference}</span>,
    },
    {
      id: 'status', header: h.status, accessorKey: 'status',
      cell: () => <Badge variant="outline" className="text-success border-success/30">{h.completed}</Badge>,
    },
  ]

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-4 bg-primary/10 rounded-xl">
            <Receipt className="h-10 w-10 text-primary" weight="duotone" />
          </div>
          <div>
            <h1 className="text-3xl font-bold ltr:tracking-tight">{h.title}</h1>
            <p className="text-muted-foreground text-sm">{h.subtitle}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setShowAddDialog(true)}>
          {h.addBiller}
        </Button>
      </div>

      <Tabs defaultValue="billers">
        <TabsList className="mb-6">
          <TabsTrigger value="billers">{h.activeBillers}</TabsTrigger>
          <TabsTrigger value="history">{h.paymentHistory}</TabsTrigger>
        </TabsList>

        {/* Biller Cards */}
        <TabsContent value="billers">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {billers.map((biller) => {
              const isPaid = paidBillers[biller.id] || biller.type === 'paid'
              return (
                <Card key={biller.id} className="hover:shadow-md transition-shadow flex flex-col">
                  <CardContent className="pt-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${isPaid ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                          {biller.icon}
                        </div>
                        <div>
                          <p className="font-semibold">{isRTL ? biller.nameAr : biller.name}</p>
                          <p className="text-xs text-muted-foreground" dir="ltr">{biller.account}</p>
                        </div>
                      </div>
                      {isPaid && <Badge variant="outline" className="text-success border-success/30">{h.paid}</Badge>}
                      {biller.type === 'auto' && !isPaid && <Badge variant="secondary">{h.autoRecharge}</Badge>}
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{biller.type === 'auto' ? h.balance : h.amountDue}</span>
                        <span className={`font-bold ${isPaid ? 'text-success' : ''}`}>
                          {isPaid && biller.amount > 0 ? h.paid : biller.amount === 0 ? h.noDue : <><ArabicNumber value={biller.amount} decimals={2} /> {h.aed}</>}
                        </span>
                      </div>
                      {biller.dueDate && !isPaid && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{h.dueDate}</span>
                          <span>{isRTL ? biller.dueDateAr : biller.dueDate}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{h.lastPaid}</span>
                        <span>{isRTL ? biller.lastPaidAr : biller.lastPaid}</span>
                      </div>
                    </div>

                    {!isPaid && biller.amount > 0 && (
                      <Button
                        className="w-full mt-auto"
                        size="sm"
                        onClick={() => setPayingBillerId(biller.id)}
                      >
                        {h.payNow}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Payment History */}
        <TabsContent value="history">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={paymentHistory}
                columns={paymentColumns}
                searchable
                searchPlaceholder={h.search}
                emptyMessage={h.noResults}
                clearSearchLabel={h.clearSearch}
                enableSorting
                pagination
                pageSize={5}
                nextLabel={h.next}
                previousLabel={h.previous}
                pageLabel={h.page}
                hoverable
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pay Confirmation Dialog */}
      <Dialog open={!!payingBillerId} onOpenChange={() => setPayingBillerId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{h.confirmPay}</DialogTitle>
            <DialogDescription>{h.confirmPayDesc}</DialogDescription>
          </DialogHeader>
          {payingBillerId && (() => {
            const biller = billers.find((b) => b.id === payingBillerId)
            if (!biller) return null
            return (
              <div className="py-4 text-center">
                <p className="font-semibold text-lg">{isRTL ? biller.nameAr : biller.name}</p>
                <p className="text-3xl font-bold mt-2">
                  <ArabicNumber value={biller.amount} decimals={2} /> {h.aed}
                </p>
              </div>
            )
          })()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPayingBillerId(null)}>{h.cancel}</Button>
            <Button onClick={() => payingBillerId && handlePay(payingBillerId)} loading={isSubmitting}>
              {h.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Biller Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{h.addBiller}</DialogTitle>
            <DialogDescription className="sr-only">{h.addBiller}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{h.billerType}</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder={h.selectBillerType} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="electricity">{h.billerDewa}</SelectItem>
                  <SelectItem value="telecom">{h.billerEtisalat}</SelectItem>
                  <SelectItem value="tolls">{h.billerSalik}</SelectItem>
                  <SelectItem value="water">{h.billerAddc}</SelectItem>
                  <SelectItem value="municipality">{h.billerMunicipality}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="acct-num">{h.accountNumber}</Label>
              <Input id="acct-num" dir="ltr" placeholder={h.accountPlaceholder} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>{h.cancel}</Button>
            <Button onClick={handleAddBiller} loading={isSubmitting}>{h.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
