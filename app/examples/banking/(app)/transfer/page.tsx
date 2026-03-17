'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Callout } from '@/components/ui/callout'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { PaperPlaneTilt, CheckCircle, ArrowRight, ArrowLeft, User } from '@phosphor-icons/react'

const gt = {
  en: {
    title: 'Transfer Money',
    subtitle: 'Send money to anyone, anywhere',
    savedBeneficiaries: 'Saved Beneficiaries',
    newTransfer: 'New Transfer',
    send: 'Send',
    lastTransfer: 'Last transfer',
    beneficiaryName: 'Beneficiary Name',
    beneficiaryNamePlaceholder: 'Full name as registered with bank',
    iban: 'IBAN',
    ibanPlaceholder: 'AE07 0331 2345 6789 0123 456',
    bank: 'Bank',
    selectBank: 'Select bank',
    amount: 'Amount (AED)',
    amountPlaceholder: '0.00',
    purpose: 'Purpose of Transfer',
    selectPurpose: 'Select purpose',
    notes: 'Notes (Optional)',
    notesPlaceholder: 'Add a note for the beneficiary',
    reviewTransfer: 'Review Transfer',
    transferSummary: 'Transfer Summary',
    transferSummaryDesc: 'Please review your transfer details before confirming.',
    from: 'From',
    to: 'To',
    confirmSend: 'Confirm & Send',
    cancel: 'Cancel',
    otpTitle: 'OTP Verification',
    otpDesc: 'Enter the 6-digit code sent to +971 ****8842',
    resendOtp: 'Resend OTP',
    secondsRemaining: 's remaining',
    transferSuccess: 'Transfer Successful',
    transferSuccessDesc: 'Your transfer has been processed successfully.',
    transferRef: 'Reference',
    viewTransactions: 'View in Transactions',
    newTransferBtn: 'New Transfer',
    aed: 'AED',
    currentAccount: 'Current Account ****4532',
    required: 'This field is required',
    invalidIban: 'IBAN must start with country code (e.g., AE)',
    minAmount: 'Minimum amount is 1 AED',
    maxAmount: 'Maximum amount is 50,000 AED',
    minName: 'Name must be at least 3 characters',
    familySupport: 'Family Support',
    rent: 'Rent',
    salary: 'Salary',
    personal: 'Personal',
    business: 'Business',
    education: 'Education',
    emiratesNbd: 'Emirates NBD',
    adcb: 'ADCB',
    fab: 'First Abu Dhabi Bank',
    dib: 'Dubai Islamic Bank',
    mashreq: 'Mashreq Bank',
    rakBank: 'RAK Bank',
  },
  ar: {
    title: 'تحويل أموال',
    subtitle: 'أرسل أموالاً لأي شخص في أي مكان',
    savedBeneficiaries: 'المستفيدون المحفوظون',
    newTransfer: 'تحويل جديد',
    send: 'إرسال',
    lastTransfer: 'آخر تحويل',
    beneficiaryName: 'اسم المستفيد',
    beneficiaryNamePlaceholder: 'الاسم الكامل كما هو مسجل في البنك',
    iban: 'آيبان',
    ibanPlaceholder: 'AE07 0331 2345 6789 0123 456',
    bank: 'البنك',
    selectBank: 'اختر البنك',
    amount: 'المبلغ (د.إ)',
    amountPlaceholder: '0.00',
    purpose: 'غرض التحويل',
    selectPurpose: 'اختر الغرض',
    notes: 'ملاحظات (اختياري)',
    notesPlaceholder: 'أضف ملاحظة للمستفيد',
    reviewTransfer: 'مراجعة التحويل',
    transferSummary: 'ملخص التحويل',
    transferSummaryDesc: 'يرجى مراجعة تفاصيل التحويل قبل التأكيد.',
    from: 'من',
    to: 'إلى',
    confirmSend: 'تأكيد وإرسال',
    cancel: 'إلغاء',
    otpTitle: 'التحقق برمز OTP',
    otpDesc: 'أدخل الرمز المكون من ٦ أرقام المرسل إلى 8842**** 971+',
    resendOtp: 'إعادة إرسال الرمز',
    secondsRemaining: 'ث متبقية',
    transferSuccess: 'تم التحويل بنجاح',
    transferSuccessDesc: 'تمت معالجة تحويلك بنجاح.',
    transferRef: 'المرجع',
    viewTransactions: 'عرض في المعاملات',
    newTransferBtn: 'تحويل جديد',
    aed: 'د.إ',
    currentAccount: 'الحساب الجاري ****٤٥٣٢',
    required: 'هذا الحقل مطلوب',
    invalidIban: 'يجب أن يبدأ الآيبان برمز الدولة (مثل AE)',
    minAmount: 'الحد الأدنى ١ د.إ',
    maxAmount: 'الحد الأقصى ٥٠٬٠٠٠ د.إ',
    minName: 'يجب أن يكون الاسم ٣ أحرف على الأقل',
    familySupport: 'دعم عائلي',
    rent: 'إيجار',
    salary: 'راتب',
    personal: 'شخصي',
    business: 'أعمال',
    education: 'تعليم',
    emiratesNbd: 'بنك الإمارات دبي الوطني',
    adcb: 'بنك أبوظبي التجاري',
    fab: 'بنك أبوظبي الأول',
    dib: 'بنك دبي الإسلامي',
    mashreq: 'بنك المشرق',
    rakBank: 'بنك رأس الخيمة',
  },
}

const beneficiaries = [
  { id: '1', name: 'Fatima Al Rashidi', nameAr: 'فاطمة الراشدي', bank: 'Emirates NBD', bankAr: 'الإمارات دبي الوطني', ibanLast4: '1234', initials: 'FR', lastDate: 'Mar 5', lastDateAr: '٥ مارس' },
  { id: '2', name: 'Mohammed Hassan', nameAr: 'محمد حسن', bank: 'FAB', bankAr: 'أبوظبي الأول', ibanLast4: '5678', initials: 'MH', lastDate: 'Feb 28', lastDateAr: '٢٨ فبراير' },
  { id: '3', name: 'Sara Al Ketbi', nameAr: 'سارة الكتبي', bank: 'ADCB', bankAr: 'أبوظبي التجاري', ibanLast4: '9012', initials: 'SK', lastDate: 'Feb 15', lastDateAr: '١٥ فبراير' },
]

export default function TransferPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]
  const { toast } = useToast()
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [amount, setAmount] = React.useState('')
  const [beneficiaryName, setBeneficiaryName] = React.useState('')
  const [iban, setIban] = React.useState('')
  const [bank, setBank] = React.useState('')
  const [purpose, setPurpose] = React.useState('')
  const [notes, setNotes] = React.useState('')

  const [showReview, setShowReview] = React.useState(false)
  const [showOTP, setShowOTP] = React.useState(false)
  const [otpValues, setOtpValues] = React.useState(['', '', '', '', '', ''])
  const [otpTimer, setOtpTimer] = React.useState(60)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [transferSuccess, setTransferSuccess] = React.useState(false)
  const otpRefs = React.useRef<(HTMLInputElement | null)[]>([])

  // OTP countdown
  React.useEffect(() => {
    if (!showOTP || otpTimer <= 0) return
    const interval = setInterval(() => setOtpTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [showOTP, otpTimer])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!beneficiaryName.trim()) e.name = h.required
    else if (beneficiaryName.trim().length < 3) e.name = h.minName
    if (!iban.trim()) e.iban = h.required
    else if (!iban.trim().toUpperCase().startsWith('AE')) e.iban = h.invalidIban
    if (!bank) e.bank = h.required
    if (!amount) e.amount = h.required
    else if (Number(amount) < 1) e.amount = h.minAmount
    else if (Number(amount) > 50000) e.amount = h.maxAmount
    if (!purpose) e.purpose = h.required
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleReview = () => {
    if (!validate()) return
    setShowReview(true)
  }

  const handleConfirm = () => {
    setShowReview(false)
    setOtpTimer(60)
    setOtpValues(['', '', '', '', '', ''])
    setShowOTP(true)
    setTimeout(() => otpRefs.current[0]?.focus(), 100)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newValues = [...otpValues]
    newValues[index] = value.slice(-1)
    setOtpValues(newValues)
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpSubmit = async () => {
    if (otpValues.some((v) => !v)) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsSubmitting(false)
    setShowOTP(false)
    setTransferSuccess(true)
    toast({ title: h.transferSuccess, description: h.transferSuccessDesc, variant: 'success' })
  }

  const handleSendToSaved = (beneficiary: typeof beneficiaries[0]) => {
    setBeneficiaryName(isRTL ? beneficiary.nameAr : beneficiary.name)
    setIban(`AE** **** **** ****${beneficiary.ibanLast4}`)
    setBank(beneficiary.bank)
  }

  const resetForm = () => {
    setBeneficiaryName('')
    setIban('')
    setBank('')
    setAmount('')
    setPurpose('')
    setNotes('')
    setErrors({})
    setTransferSuccess(false)
  }

  const refNumber = 'TRF-2026-04891'

  if (transferSuccess) {
    return (
      <div className="container py-8">
        <div className="max-w-md mx-auto text-center space-y-6 py-12">
          <div className="inline-flex items-center justify-center p-4 bg-success/10 rounded-full">
            <CheckCircle className="h-16 w-16 text-success" weight="duotone" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{h.transferSuccess}</h1>
            <p className="text-muted-foreground">{h.transferSuccessDesc}</p>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.to}</span>
                <span className="font-medium">{beneficiaryName}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.amount}</span>
                <span className="font-bold text-lg"><ArabicNumber value={Number(amount)} decimals={2} /> {h.aed}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{h.transferRef}</span>
                <span dir="ltr" className="font-mono text-sm">{refNumber}</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" asChild>
              <a href="/examples/banking/transactions">
                {h.viewTransactions}
              </a>
            </Button>
            <Button onClick={resetForm}>
              {h.newTransferBtn}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <PaperPlaneTilt className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-3xl font-bold ltr:tracking-tight">{h.title}</h1>
          <p className="text-muted-foreground text-sm">{h.subtitle}</p>
        </div>
      </div>

      <Tabs defaultValue="saved">
        <TabsList className="mb-6">
          <TabsTrigger value="saved">{h.savedBeneficiaries}</TabsTrigger>
          <TabsTrigger value="new">{h.newTransfer}</TabsTrigger>
        </TabsList>

        {/* Saved Beneficiaries */}
        <TabsContent value="saved">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beneficiaries.map((b) => (
              <Card key={b.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarFallback>{b.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{isRTL ? b.nameAr : b.name}</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? b.bankAr : b.bank}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      <span dir="ltr" className="font-mono">AE** ****{b.ibanLast4}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{h.lastTransfer}: {isRTL ? b.lastDateAr : b.lastDate}</span>
                  </div>
                  <Button className="w-full mt-4" size="sm" onClick={() => handleSendToSaved(b)}>
                    {h.send}
                    <Arrow className="h-3.5 w-3.5 ms-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* New Transfer Form */}
        <TabsContent value="new">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>{h.newTransfer}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Beneficiary Name */}
              <div className="space-y-2">
                <Label htmlFor="ben-name">{h.beneficiaryName}</Label>
                <Input
                  id="ben-name"
                  value={beneficiaryName}
                  onChange={(e) => { setBeneficiaryName(e.target.value); setErrors((prev) => ({ ...prev, name: '' })) }}
                  placeholder={h.beneficiaryNamePlaceholder}
                  className={errors.name ? 'border-destructive' : ''}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'ben-name-error' : undefined}
                />
                {errors.name && <p id="ben-name-error" className="text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* IBAN */}
              <div className="space-y-2">
                <Label htmlFor="iban">{h.iban}</Label>
                <Input
                  id="iban"
                  dir="ltr"
                  value={iban}
                  onChange={(e) => { setIban(e.target.value); setErrors((prev) => ({ ...prev, iban: '' })) }}
                  placeholder={h.ibanPlaceholder}
                  className={errors.iban ? 'border-destructive' : ''}
                  aria-invalid={!!errors.iban}
                  aria-describedby={errors.iban ? 'iban-error' : undefined}
                />
                {errors.iban && <p id="iban-error" className="text-sm text-destructive">{errors.iban}</p>}
              </div>

              {/* Bank */}
              <div className="space-y-2">
                <Label htmlFor="bank-select">{h.bank}</Label>
                <Select value={bank} onValueChange={(v) => { setBank(v); setErrors((prev) => ({ ...prev, bank: '' })) }}>
                  <SelectTrigger id="bank-select" className={errors.bank ? 'border-destructive' : ''} aria-describedby={errors.bank ? 'bank-error' : undefined}>
                    <SelectValue placeholder={h.selectBank} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Emirates NBD">{h.emiratesNbd}</SelectItem>
                    <SelectItem value="ADCB">{h.adcb}</SelectItem>
                    <SelectItem value="FAB">{h.fab}</SelectItem>
                    <SelectItem value="DIB">{h.dib}</SelectItem>
                    <SelectItem value="Mashreq">{h.mashreq}</SelectItem>
                    <SelectItem value="RAK Bank">{h.rakBank}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bank && <p id="bank-error" className="text-sm text-destructive">{errors.bank}</p>}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">{h.amount}</Label>
                <Input
                  id="amount"
                  dir="ltr"
                  type="number"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setErrors((prev) => ({ ...prev, amount: '' })) }}
                  placeholder={h.amountPlaceholder}
                  className={errors.amount ? 'border-destructive' : ''}
                  aria-invalid={!!errors.amount}
                  aria-describedby={errors.amount ? 'amount-error' : undefined}
                  min={1}
                  max={50000}
                />
                {errors.amount && <p id="amount-error" className="text-sm text-destructive">{errors.amount}</p>}
                {amount && Number(amount) > 0 && (
                  <p className="text-lg font-bold text-primary">
                    <ArabicNumber value={Number(amount)} decimals={2} /> {h.aed}
                  </p>
                )}
              </div>

              {/* Purpose */}
              <div className="space-y-2">
                <Label htmlFor="purpose-select">{h.purpose}</Label>
                <Select value={purpose} onValueChange={(v) => { setPurpose(v); setErrors((prev) => ({ ...prev, purpose: '' })) }}>
                  <SelectTrigger id="purpose-select" className={errors.purpose ? 'border-destructive' : ''} aria-describedby={errors.purpose ? 'purpose-error' : undefined}>
                    <SelectValue placeholder={h.selectPurpose} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family">{h.familySupport}</SelectItem>
                    <SelectItem value="rent">{h.rent}</SelectItem>
                    <SelectItem value="salary">{h.salary}</SelectItem>
                    <SelectItem value="personal">{h.personal}</SelectItem>
                    <SelectItem value="business">{h.business}</SelectItem>
                    <SelectItem value="education">{h.education}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.purpose && <p id="purpose-error" className="text-sm text-destructive">{errors.purpose}</p>}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">{h.notes}</Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={h.notesPlaceholder}
                />
              </div>

              <Button className="w-full" size="lg" onClick={handleReview}>
                {h.reviewTransfer}
                <Arrow className="h-4 w-4 ms-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={showReview} onOpenChange={setShowReview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{h.transferSummary}</DialogTitle>
            <DialogDescription>{h.transferSummaryDesc}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{h.from}</span>
              <span>{h.currentAccount}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{h.to}</span>
              <span className="font-medium">{beneficiaryName}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{h.iban}</span>
              <span dir="ltr" className="font-mono text-xs">{iban}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">{h.amount}</span>
              <span className="text-xl font-bold"><ArabicNumber value={Number(amount)} decimals={2} /> {h.aed}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReview(false)}>{h.cancel}</Button>
            <Button onClick={handleConfirm}>{h.confirmSend}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OTP Dialog */}
      <Dialog open={showOTP} onOpenChange={setShowOTP}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{h.otpTitle}</DialogTitle>
            <DialogDescription>{h.otpDesc}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2 py-6" dir="ltr" role="group" aria-label={h.otpTitle}>
            {otpValues.map((val, i) => (
              <Input
                key={i}
                ref={(el) => { otpRefs.current[i] = el }}
                value={val}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className="w-12 h-12 text-center text-xl font-mono"
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-label={`${locale === 'ar' ? `الرقم ${i + 1} من ٦` : `Digit ${i + 1} of 6`}`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {otpTimer > 0 ? (
              <span>{otpTimer}{h.secondsRemaining}</span>
            ) : (
              <Button variant="link" size="sm" onClick={() => setOtpTimer(60)}>{h.resendOtp}</Button>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOTP(false)}>{h.cancel}</Button>
            <Button
              onClick={handleOtpSubmit}
              loading={isSubmitting}
              disabled={otpValues.some((v) => !v)}
            >
              {h.confirmSend}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
