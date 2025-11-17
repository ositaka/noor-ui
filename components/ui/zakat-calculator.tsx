'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatSAR, formatNumber } from '@/lib/arabic-numbers'
import { AlertCircle, Info, Download, Share2, Printer, Copy, Check } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'

// ============================================================================
// Types
// ============================================================================

export interface ZakatAssets {
  cash: number
  gold: number // in grams
  silver: number // in grams
  business: number
  investments: number
  other: number
}

export interface ZakatCalculatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current gold price per gram in SAR */
  goldPricePerGram?: number
  /** Current silver price per gram in SAR */
  silverPricePerGram?: number
  /** Use Arabic-Indic numerals */
  useArabicNumerals?: boolean
  /** Locale for formatting */
  locale?: 'en' | 'ar'
  /** Callback when calculation updates */
  onCalculate?: (result: ZakatCalculationResult) => void
  /** Initial asset values */
  defaultValues?: Partial<ZakatAssets>
}

export interface ZakatCalculationResult {
  totalWealth: number
  nisabThreshold: number
  zakatDue: number
  isZakatApplicable: boolean
  breakdown: ZakatAssets
}

// ============================================================================
// Constants
// ============================================================================

// Standard Nisab thresholds in grams
const NISAB_GOLD_GRAMS = 85 // 85 grams of gold
const NISAB_SILVER_GRAMS = 595 // 595 grams of silver
const ZAKAT_RATE = 0.025 // 2.5%

// Default prices (can be overridden)
const DEFAULT_GOLD_PRICE = 250 // SAR per gram
const DEFAULT_SILVER_PRICE = 3 // SAR per gram

// ============================================================================
// Component
// ============================================================================

export const ZakatCalculator = React.forwardRef<HTMLDivElement, ZakatCalculatorProps>(
  (
    {
      goldPricePerGram = DEFAULT_GOLD_PRICE,
      silverPricePerGram = DEFAULT_SILVER_PRICE,
      useArabicNumerals = false,
      locale = 'en',
      onCalculate,
      defaultValues,
      className,
      ...props
    },
    ref
  ) => {
    const { direction } = useDirection()
    const isRTL = direction === 'rtl'

    // Asset state
    const [assets, setAssets] = React.useState<ZakatAssets>({
      cash: defaultValues?.cash || 0,
      gold: defaultValues?.gold || 0,
      silver: defaultValues?.silver || 0,
      business: defaultValues?.business || 0,
      investments: defaultValues?.investments || 0,
      other: defaultValues?.other || 0,
    })

    // Copy state
    const [copied, setCopied] = React.useState(false)

    // Calculate Zakat
    const calculation = React.useMemo(() => {
      // Convert precious metals to SAR
      const goldValue = assets.gold * goldPricePerGram
      const silverValue = assets.silver * silverPricePerGram

      // Total wealth in SAR
      const totalWealth =
        assets.cash + goldValue + silverValue + assets.business + assets.investments + assets.other

      // Nisab threshold (using gold standard, which is typically higher)
      const nisabThreshold = NISAB_GOLD_GRAMS * goldPricePerGram

      // Check if Zakat is applicable
      const isZakatApplicable = totalWealth >= nisabThreshold

      // Calculate Zakat due (2.5% of total wealth)
      const zakatDue = isZakatApplicable ? totalWealth * ZAKAT_RATE : 0

      const result: ZakatCalculationResult = {
        totalWealth,
        nisabThreshold,
        zakatDue,
        isZakatApplicable,
        breakdown: assets,
      }

      return result
    }, [assets, goldPricePerGram, silverPricePerGram])

    // Notify parent of calculation updates
    React.useEffect(() => {
      if (onCalculate) {
        onCalculate(calculation)
      }
    }, [calculation, onCalculate])

    const handleInputChange = (field: keyof ZakatAssets, value: string) => {
      const numValue = parseFloat(value) || 0
      setAssets((prev) => ({ ...prev, [field]: numValue }))
    }

    const formatCurrency = (amount: number) => {
      return formatSAR(amount, { locale, useArabicNumerals, decimals: 2 })
    }

    const formatNum = (amount: number) => {
      return formatNumber(amount, { locale, useArabicNumerals, decimals: 2 })
    }

    // Generate text summary for export/sharing
    const generateSummary = () => {
      const date = new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      if (isRTL) {
        return `حساب الزكاة
التاريخ: ${date}

أصولك:
━━━━━━━━━━━━━━━━
• النقد: ${formatCurrency(assets.cash)}
• الذهب: ${formatNum(assets.gold)} جرام (${formatCurrency(assets.gold * goldPricePerGram)})
• الفضة: ${formatNum(assets.silver)} جرام (${formatCurrency(assets.silver * silverPricePerGram)})
• الأصول التجارية: ${formatCurrency(assets.business)}
• الاستثمارات: ${formatCurrency(assets.investments)}
• أصول أخرى: ${formatCurrency(assets.other)}

نتيجة الحساب:
━━━━━━━━━━━━━━━━
• إجمالي الثروة: ${formatCurrency(calculation.totalWealth)}
• عتبة النصاب: ${formatCurrency(calculation.nisabThreshold)}
• الحالة: ${calculation.isZakatApplicable ? 'الزكاة واجبة ✓' : 'أقل من النصاب'}

${calculation.isZakatApplicable ? `• الزكاة المستحقة (٢٫٥٪): ${formatCurrency(calculation.zakatDue)}` : ''}`
      } else {
        return `Zakat Calculation
Date: ${date}

Your Assets:
━━━━━━━━━━━━━━━━
• Cash: ${formatCurrency(assets.cash)}
• Gold: ${formatNum(assets.gold)} grams (${formatCurrency(assets.gold * goldPricePerGram)})
• Silver: ${formatNum(assets.silver)} grams (${formatCurrency(assets.silver * silverPricePerGram)})
• Business Assets: ${formatCurrency(assets.business)}
• Investments: ${formatCurrency(assets.investments)}
• Other Assets: ${formatCurrency(assets.other)}

Calculation Result:
━━━━━━━━━━━━━━━━
• Total Wealth: ${formatCurrency(calculation.totalWealth)}
• Nisab Threshold: ${formatCurrency(calculation.nisabThreshold)}
• Status: ${calculation.isZakatApplicable ? 'Zakat Due ✓' : 'Below Nisab'}

${calculation.isZakatApplicable ? `• Zakat Due (2.5%): ${formatCurrency(calculation.zakatDue)}` : ''}`
      }
    }

    // Copy to clipboard
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(generateSummary())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        // Silently fail if clipboard access is denied
      }
    }

    // Download as text file
    const handleDownload = () => {
      const summary = generateSummary()
      const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `zakat-calculation-${new Date().toISOString().split('T')[0]}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    // Download as JSON
    const handleDownloadJSON = () => {
      const data = {
        date: new Date().toISOString(),
        assets,
        goldPricePerGram,
        silverPricePerGram,
        calculation: {
          totalWealth: calculation.totalWealth,
          nisabThreshold: calculation.nisabThreshold,
          zakatDue: calculation.zakatDue,
          isZakatApplicable: calculation.isZakatApplicable,
        },
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `zakat-calculation-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    // Print
    const handlePrint = () => {
      const printWindow = window.open('', '', 'width=800,height=600')
      if (!printWindow) return

      const summary = generateSummary()
      printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="${isRTL ? 'rtl' : 'ltr'}">
        <head>
          <title>${isRTL ? 'حساب الزكاة' : 'Zakat Calculation'}</title>
          <style>
            body {
              font-family: ${isRTL ? 'Arial, sans-serif' : 'Arial, sans-serif'};
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              line-height: 1.6;
            }
            pre {
              white-space: pre-wrap;
              font-family: inherit;
              font-size: 14px;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <pre>${summary}</pre>
        </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)
    }

    return (
      <div ref={ref} className={cn('w-full space-y-6', className)} {...props}>
        {/* Nisab Information */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">
                {isRTL ? 'معلومات النصاب' : 'Nisab Information'}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {isRTL ? 'نصاب الذهب:' : 'Gold Nisab:'}
              </span>
              <span className="font-semibold">
                {formatNum(NISAB_GOLD_GRAMS)} {isRTL ? 'جرام' : 'grams'} (
                {formatCurrency(NISAB_GOLD_GRAMS * goldPricePerGram)})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {isRTL ? 'نصاب الفضة:' : 'Silver Nisab:'}
              </span>
              <span className="font-semibold">
                {formatNum(NISAB_SILVER_GRAMS)} {isRTL ? 'جرام' : 'grams'} (
                {formatCurrency(NISAB_SILVER_GRAMS * silverPricePerGram)})
              </span>
            </div>
            <Separator className="my-2" />
            <p className="text-xs text-muted-foreground">
              {isRTL
                ? 'الزكاة واجبة إذا بلغت الثروة النصاب وحال عليها الحول (سنة قمرية واحدة)'
                : 'Zakat is due if wealth reaches Nisab and one lunar year has passed'}
            </p>
          </CardContent>
        </Card>

        {/* Asset Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'أصولك' : 'Your Assets'}</CardTitle>
            <CardDescription>
              {isRTL
                ? 'أدخل قيمة أصولك لحساب الزكاة المستحقة'
                : 'Enter your asset values to calculate Zakat due'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cash */}
            <div className="space-y-2">
              <Label htmlFor="cash">
                {isRTL ? 'النقد (نقدًا وفي البنوك)' : 'Cash (In hand & bank accounts)'}
              </Label>
              <div className="relative">
                <Input
                  id="cash"
                  type="number"
                  min="0"
                  step="0.01"
                  value={assets.cash || ''}
                  onChange={(e) => handleInputChange('cash', e.target.value)}
                  className="pe-12"
                  placeholder={isRTL ? '٠' : '0'}
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {isRTL ? 'ر.س' : 'SAR'}
                </span>
              </div>
            </div>

            {/* Gold */}
            <div className="space-y-2">
              <Label htmlFor="gold">{isRTL ? 'الذهب' : 'Gold'}</Label>
              <div className="relative">
                <Input
                  id="gold"
                  type="number"
                  min="0"
                  step="0.01"
                  value={assets.gold || ''}
                  onChange={(e) => handleInputChange('gold', e.target.value)}
                  className="pe-16"
                  placeholder={isRTL ? '٠' : '0'}
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {isRTL ? 'جرام' : 'grams'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'السعر الحالي:' : 'Current price:'} {formatCurrency(goldPricePerGram)}/
                {isRTL ? 'جرام' : 'g'}
              </p>
            </div>

            {/* Silver */}
            <div className="space-y-2">
              <Label htmlFor="silver">{isRTL ? 'الفضة' : 'Silver'}</Label>
              <div className="relative">
                <Input
                  id="silver"
                  type="number"
                  min="0"
                  step="0.01"
                  value={assets.silver || ''}
                  onChange={(e) => handleInputChange('silver', e.target.value)}
                  className="pe-16"
                  placeholder={isRTL ? '٠' : '0'}
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {isRTL ? 'جرام' : 'grams'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'السعر الحالي:' : 'Current price:'} {formatCurrency(silverPricePerGram)}
                /{isRTL ? 'جرام' : 'g'}
              </p>
            </div>

            {/* Business Assets */}
            <div className="space-y-2">
              <Label htmlFor="business">
                {isRTL ? 'الأصول التجارية والمخزون' : 'Business assets & inventory'}
              </Label>
              <div className="relative">
                <Input
                  id="business"
                  type="number"
                  min="0"
                  step="0.01"
                  value={assets.business || ''}
                  onChange={(e) => handleInputChange('business', e.target.value)}
                  className="pe-12"
                  placeholder={isRTL ? '٠' : '0'}
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {isRTL ? 'ر.س' : 'SAR'}
                </span>
              </div>
            </div>

            {/* Investments */}
            <div className="space-y-2">
              <Label htmlFor="investments">
                {isRTL ? 'الاستثمارات (أسهم، سندات، إلخ)' : 'Investments (stocks, bonds, etc.)'}
              </Label>
              <div className="relative">
                <Input
                  id="investments"
                  type="number"
                  min="0"
                  step="0.01"
                  value={assets.investments || ''}
                  onChange={(e) => handleInputChange('investments', e.target.value)}
                  className="pe-12"
                  placeholder={isRTL ? '٠' : '0'}
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {isRTL ? 'ر.س' : 'SAR'}
                </span>
              </div>
            </div>

            {/* Other Assets */}
            <div className="space-y-2">
              <Label htmlFor="other">{isRTL ? 'أصول أخرى' : 'Other assets'}</Label>
              <div className="relative">
                <Input
                  id="other"
                  type="number"
                  min="0"
                  step="0.01"
                  value={assets.other || ''}
                  onChange={(e) => handleInputChange('other', e.target.value)}
                  className="pe-12"
                  placeholder={isRTL ? '٠' : '0'}
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {isRTL ? 'ر.س' : 'SAR'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calculation Result */}
        <Card
          className={cn(
            'border-2',
            calculation.isZakatApplicable
              ? 'border-primary bg-primary/5'
              : 'border-muted bg-muted/30'
          )}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                {isRTL ? 'نتيجة الحساب' : 'Calculation Result'}
              </CardTitle>
              <Badge
                variant={calculation.isZakatApplicable ? 'default' : 'secondary'}
                className="text-xs"
              >
                {calculation.isZakatApplicable
                  ? isRTL
                    ? 'الزكاة واجبة'
                    : 'Zakat Due'
                  : isRTL
                    ? 'أقل من النصاب'
                    : 'Below Nisab'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Total Wealth */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                {isRTL ? 'إجمالي الثروة:' : 'Total Wealth:'}
              </span>
              <span className="text-2xl font-bold">{formatCurrency(calculation.totalWealth)}</span>
            </div>

            <Separator />

            {/* Nisab Status */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                {isRTL ? 'عتبة النصاب:' : 'Nisab Threshold:'}
              </span>
              <span className="font-semibold">{formatCurrency(calculation.nisabThreshold)}</span>
            </div>

            {!calculation.isZakatApplicable && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'ثروتك أقل من النصاب. الزكاة غير واجبة في هذا الوقت.'
                    : 'Your wealth is below the Nisab threshold. Zakat is not due at this time.'}
                </p>
              </div>
            )}

            {calculation.isZakatApplicable && (
              <>
                <Separator />

                {/* Zakat Due */}
                <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {isRTL ? 'الزكاة المستحقة (٢٫٥٪)' : 'Zakat Due (2.5%)'}
                    </p>
                    <p className="text-4xl font-bold text-primary">
                      {formatCurrency(calculation.zakatDue)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRTL
                        ? 'تأكد من دفع الزكاة خلال السنة القمرية'
                        : 'Ensure payment within the lunar year'}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Export/Share Actions */}
            <Separator />
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                {isRTL ? 'تصدير ومشاركة' : 'Export & Share'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="w-full"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 me-2" />
                      {isRTL ? 'تم النسخ!' : 'Copied!'}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 me-2" />
                      {isRTL ? 'نسخ' : 'Copy'}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="w-full"
                >
                  <Download className="h-4 w-4 me-2" />
                  {isRTL ? 'تحميل نص' : 'Download'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="w-full"
                >
                  <Printer className="h-4 w-4 me-2" />
                  {isRTL ? 'طباعة' : 'Print'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadJSON}
                  className="w-full"
                >
                  <Share2 className="h-4 w-4 me-2" />
                  {isRTL ? 'JSON' : 'JSON'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
)

ZakatCalculator.displayName = 'ZakatCalculator'
