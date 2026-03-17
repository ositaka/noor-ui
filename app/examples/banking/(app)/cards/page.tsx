'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ArabicNumber } from '@/components/ui/arabic-number'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import {
  CreditCard, Snowflake, Globe, WifiHigh, ShoppingCart, TrendDown, TrendUp, Wallet,
} from '@phosphor-icons/react'

const gt = {
  en: {
    title: 'Card Management',
    subtitle: 'Control your card settings and limits',
    cardNumber: '•••• •••• •••• 4532',
    cardHolder: 'KHALED AL MUHAIRI',
    expiry: '09/28',
    visa: 'VISA',
    cardFrozen: 'Card Frozen',
    cardControls: 'Card Controls',
    freezeCard: 'Freeze Card',
    freezeCardDesc: 'Temporarily disable all transactions on this card',
    onlinePurchases: 'Online Purchases',
    onlinePurchasesDesc: 'Allow online and e-commerce transactions',
    intlTransactions: 'International Transactions',
    intlTransactionsDesc: 'Allow transactions outside the UAE',
    contactless: 'Contactless Payments',
    contactlessDesc: 'Allow tap-to-pay transactions',
    spendingLimits: 'Spending Limits',
    dailySpendingLimit: 'Daily Spending Limit',
    atmLimit: 'ATM Withdrawal Limit',
    aed: 'AED',
    cardDetails: 'Card Details',
    creditLimit: 'Credit Limit',
    availableBalance: 'Available Balance',
    statementDate: 'Statement Date',
    minPayment: 'Minimum Payment',
    recentCardTxns: 'Recent Card Transactions',
    requestNewCard: 'Request New Card',
    cardType: 'Card Type',
    selectCardType: 'Select card type',
    visaSignature: 'Visa Signature',
    mastercardWorld: 'Mastercard World',
    visaPlatinum: 'Visa Platinum',
    reason: 'Reason',
    selectReason: 'Select reason',
    lost: 'Lost Card',
    stolen: 'Stolen Card',
    damaged: 'Damaged Card',
    upgrade: 'Card Upgrade',
    deliveryAddress: 'Delivery Address',
    addressPlaceholder: 'Your delivery address',
    submit: 'Submit Request',
    cancel: 'Cancel',
    confirmFreeze: 'Confirm Freeze',
    confirmFreezeDesc: 'Are you sure you want to freeze your card? All transactions will be temporarily disabled.',
    freeze: 'Freeze',
    unfreeze: 'Unfreeze',
    requestSent: 'Request Sent',
    requestSentDesc: 'Your new card request has been submitted. Delivery within 5-7 business days.',
    cardHolderLabel: 'Card Holder',
    expiresLabel: 'Expires',
  },
  ar: {
    title: 'إدارة البطاقات',
    subtitle: 'تحكم في إعدادات البطاقة والحدود',
    cardNumber: '•••• •••• •••• ٤٥٣٢',
    cardHolder: 'خالد المهيري',
    expiry: '٠٩/٢٨',
    visa: 'VISA',
    cardFrozen: 'البطاقة مجمدة',
    cardControls: 'تحكم بالبطاقة',
    freezeCard: 'تجميد البطاقة',
    freezeCardDesc: 'إيقاف جميع المعاملات مؤقتاً على هذه البطاقة',
    onlinePurchases: 'المشتريات الإلكترونية',
    onlinePurchasesDesc: 'السماح بالمعاملات عبر الإنترنت والتجارة الإلكترونية',
    intlTransactions: 'المعاملات الدولية',
    intlTransactionsDesc: 'السماح بالمعاملات خارج الإمارات',
    contactless: 'الدفع بدون تلامس',
    contactlessDesc: 'السماح بمعاملات النقر للدفع',
    spendingLimits: 'حدود الإنفاق',
    dailySpendingLimit: 'حد الإنفاق اليومي',
    atmLimit: 'حد السحب من الصراف',
    aed: 'د.إ',
    cardDetails: 'تفاصيل البطاقة',
    creditLimit: 'الحد الائتماني',
    availableBalance: 'الرصيد المتاح',
    statementDate: 'تاريخ كشف الحساب',
    minPayment: 'الحد الأدنى للسداد',
    recentCardTxns: 'معاملات البطاقة الأخيرة',
    requestNewCard: 'طلب بطاقة جديدة',
    cardType: 'نوع البطاقة',
    selectCardType: 'اختر نوع البطاقة',
    visaSignature: 'فيزا سيجنتشر',
    mastercardWorld: 'ماستركارد وورلد',
    visaPlatinum: 'فيزا بلاتينوم',
    reason: 'السبب',
    selectReason: 'اختر السبب',
    lost: 'بطاقة مفقودة',
    stolen: 'بطاقة مسروقة',
    damaged: 'بطاقة تالفة',
    upgrade: 'ترقية البطاقة',
    deliveryAddress: 'عنوان التوصيل',
    addressPlaceholder: 'عنوان التوصيل',
    submit: 'تقديم الطلب',
    cancel: 'إلغاء',
    confirmFreeze: 'تأكيد التجميد',
    confirmFreezeDesc: 'هل أنت متأكد من تجميد البطاقة؟ سيتم إيقاف جميع المعاملات مؤقتاً.',
    freeze: 'تجميد',
    unfreeze: 'إلغاء التجميد',
    requestSent: 'تم إرسال الطلب',
    requestSentDesc: 'تم تقديم طلب بطاقتك الجديدة. التوصيل خلال ٥-٧ أيام عمل.',
    cardHolderLabel: 'حامل البطاقة',
    expiresLabel: 'الانتهاء',
  },
}

const recentCardTxns = [
  { merchant: 'Carrefour', merchantAr: 'كارفور', amount: -342.50, date: 'Mar 16', dateAr: '١٦ مارس' },
  { merchant: 'Noon.com', merchantAr: 'نون.كوم', amount: -675, date: 'Mar 11', dateAr: '١١ مارس' },
  { merchant: 'Deliveroo', merchantAr: 'ديليفرو', amount: -89.50, date: 'Mar 13', dateAr: '١٣ مارس' },
  { merchant: 'VOX Cinemas', merchantAr: 'ڤوكس سينما', amount: -85, date: 'Mar 4', dateAr: '٤ مارس' },
  { merchant: 'Namshi', merchantAr: 'نمشي', amount: -445, date: 'Mar 3', dateAr: '٣ مارس' },
]

export default function CardsPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const { toast } = useToast()

  const [frozen, setFrozen] = React.useState(false)
  const [onlinePurchases, setOnlinePurchases] = React.useState(true)
  const [intlTransactions, setIntlTransactions] = React.useState(true)
  const [contactless, setContactless] = React.useState(true)
  const [spendingLimit, setSpendingLimit] = React.useState([10000])
  const [atmLimit, setAtmLimit] = React.useState([5000])
  const [showFreezeDialog, setShowFreezeDialog] = React.useState(false)
  const [showRequestDialog, setShowRequestDialog] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleFreeze = () => {
    setFrozen(true)
    setShowFreezeDialog(false)
  }

  const handleRequestCard = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    setShowRequestDialog(false)
    toast({ title: h.requestSent, description: h.requestSentDesc, variant: 'success' })
  }

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-4 bg-primary/10 rounded-xl">
            <CreditCard className="h-10 w-10 text-primary" weight="duotone" />
          </div>
          <div>
            <h1 className="text-3xl font-bold ltr:tracking-tight">{h.title}</h1>
            <p className="text-muted-foreground text-sm">{h.subtitle}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setShowRequestDialog(true)}>
          {h.requestNewCard}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column — Card + Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bank Card */}
          <div className={`rounded-2xl p-6 text-white bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl relative overflow-hidden transition-all ${frozen ? 'opacity-50 grayscale' : ''}`}>
            <div className="absolute top-0 end-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2" />
            {frozen && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Badge className="bg-destructive/90 text-white text-lg px-4 py-1.5 border-0">
                  <Snowflake className="h-5 w-5 me-2" />
                  {h.cardFrozen}
                </Badge>
              </div>
            )}
            <div className="flex items-center justify-between mb-8">
              <WifiHigh className="h-8 w-8 text-white/50 rotate-90" />
              <span className="text-lg font-bold tracking-wider">{h.visa}</span>
            </div>
            <p dir="ltr" className="font-mono text-xl tracking-[0.2em] mb-6">{h.cardNumber}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">{h.cardHolderLabel}</p>
                <p className="font-mono text-sm tracking-wider">{h.cardHolder}</p>
              </div>
              <div className="text-end">
                <p className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">{h.expiresLabel}</p>
                <p dir="ltr" className="font-mono text-sm">{h.expiry}</p>
              </div>
            </div>
          </div>

          {/* Card Controls */}
          <Card>
            <CardHeader>
              <CardTitle>{h.cardControls}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Freeze */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="freeze" className="font-medium flex items-center gap-2">
                    <Snowflake className="h-4 w-4 text-info" />
                    {h.freezeCard}
                  </Label>
                  <p className="text-sm text-muted-foreground">{h.freezeCardDesc}</p>
                </div>
                <Switch
                  id="freeze"
                  checked={frozen}
                  onCheckedChange={(checked) => {
                    if (checked) setShowFreezeDialog(true)
                    else setFrozen(false)
                  }}
                />
              </div>
              <Separator />
              {/* Online */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="online" className="font-medium flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                    {h.onlinePurchases}
                  </Label>
                  <p className="text-sm text-muted-foreground">{h.onlinePurchasesDesc}</p>
                </div>
                <Switch id="online" checked={onlinePurchases} onCheckedChange={setOnlinePurchases} />
              </div>
              <Separator />
              {/* International */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="intl" className="font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4 text-warning" />
                    {h.intlTransactions}
                  </Label>
                  <p className="text-sm text-muted-foreground">{h.intlTransactionsDesc}</p>
                </div>
                <Switch id="intl" checked={intlTransactions} onCheckedChange={setIntlTransactions} />
              </div>
              <Separator />
              {/* Contactless */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="contactless" className="font-medium flex items-center gap-2">
                    <WifiHigh className="h-4 w-4 text-success" />
                    {h.contactless}
                  </Label>
                  <p className="text-sm text-muted-foreground">{h.contactlessDesc}</p>
                </div>
                <Switch id="contactless" checked={contactless} onCheckedChange={setContactless} />
              </div>
            </CardContent>
          </Card>

          {/* Spending Limits */}
          <Card>
            <CardHeader>
              <CardTitle>{h.spendingLimits}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">{h.dailySpendingLimit}</Label>
                  <span className="text-sm font-bold text-primary">
                    <ArabicNumber value={spendingLimit[0]} /> {h.aed}
                  </span>
                </div>
                <Slider
                  value={spendingLimit}
                  onValueChange={setSpendingLimit}
                  min={500}
                  max={50000}
                  step={500}
                  aria-label={h.dailySpendingLimit}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span><ArabicNumber value={500} /> {h.aed}</span>
                  <span><ArabicNumber value={50000} /> {h.aed}</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">{h.atmLimit}</Label>
                  <span className="text-sm font-bold text-primary">
                    <ArabicNumber value={atmLimit[0]} /> {h.aed}
                  </span>
                </div>
                <Slider
                  value={atmLimit}
                  onValueChange={setAtmLimit}
                  min={1000}
                  max={10000}
                  step={500}
                  aria-label={h.atmLimit}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span><ArabicNumber value={1000} /> {h.aed}</span>
                  <span><ArabicNumber value={10000} /> {h.aed}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Card Details */}
          <Card>
            <CardHeader>
              <CardTitle>{h.cardDetails}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.creditLimit}</span>
                <span className="font-medium"><ArabicNumber value={50000} /> {h.aed}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.availableBalance}</span>
                <span className="font-medium text-success"><ArabicNumber value={47850} /> {h.aed}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.statementDate}</span>
                <span className="font-medium">{isRTL ? '٢٥ مارس ٢٠٢٦' : 'Mar 25, 2026'}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{h.minPayment}</span>
                <span className="font-medium"><ArabicNumber value={2150} /> {h.aed}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Card Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>{h.recentCardTxns}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentCardTxns.map((txn, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{isRTL ? txn.merchantAr : txn.merchant}</p>
                    <p className="text-xs text-muted-foreground">{isRTL ? txn.dateAr : txn.date}</p>
                  </div>
                  <span className="text-sm font-semibold">
                    -<ArabicNumber value={Math.abs(txn.amount)} decimals={2} /> {h.aed}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Freeze Confirmation Dialog */}
      <Dialog open={showFreezeDialog} onOpenChange={setShowFreezeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{h.confirmFreeze}</DialogTitle>
            <DialogDescription>{h.confirmFreezeDesc}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFreezeDialog(false)}>{h.cancel}</Button>
            <Button variant="destructive" onClick={handleFreeze}>
              <Snowflake className="h-4 w-4 me-2" />
              {h.freeze}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request New Card Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{h.requestNewCard}</DialogTitle>
            <DialogDescription className="sr-only">{h.requestNewCard}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{h.cardType}</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder={h.selectCardType} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa-sig">{h.visaSignature}</SelectItem>
                  <SelectItem value="mc-world">{h.mastercardWorld}</SelectItem>
                  <SelectItem value="visa-plat">{h.visaPlatinum}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{h.reason}</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder={h.selectReason} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lost">{h.lost}</SelectItem>
                  <SelectItem value="stolen">{h.stolen}</SelectItem>
                  <SelectItem value="damaged">{h.damaged}</SelectItem>
                  <SelectItem value="upgrade">{h.upgrade}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{h.deliveryAddress}</Label>
              <Input id="address" placeholder={h.addressPlaceholder} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestDialog(false)}>{h.cancel}</Button>
            <Button onClick={handleRequestCard} loading={isSubmitting}>{h.submit}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
