'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { Gear, Bell, CurrencyDollar, Eye, ShieldCheck, Calculator } from '@phosphor-icons/react'

const fs = {
  en: {
    settings: 'Settings',
    financialPreferences: 'Financial Preferences',
    zakatMethod: 'Zakat Calculation Method',
    hanafi: 'Hanafi',
    shafii: "Shafi'i",
    hanafiDesc: 'Gold nisab threshold',
    shafiiDesc: 'Silver nisab threshold',
    currencyDisplay: 'Currency Display',
    notifications: 'Notifications',
    prayerReminders: 'Prayer Time Reminders',
    zakatAlerts: 'Zakat Due Date Alerts',
    investmentUpdates: 'Investment Performance Updates',
    marketNews: 'Market News',
    monthlyReports: 'Monthly Reports',
    display: 'Display',
    numberFormat: 'Number Format',
    easternArabic: 'Eastern Arabic numerals (123)',
    westernNumerals: 'Western numerals (123)',
    calendarDisplay: 'Calendar Display',
    hijriPrimary: 'Hijri Primary',
    gregorianPrimary: 'Gregorian Primary',
    both: 'Both',
    dashboardDensity: 'Dashboard Density',
    compact: 'Compact',
    default: 'Default',
    spacious: 'Spacious',
    privacy: 'Privacy',
    sharePortfolio: 'Share portfolio summary',
    allowRecommendations: 'Allow investment recommendations',
    save: 'Save',
    saved: 'Saved',
    savedDesc: 'Settings saved successfully.',
  },
  ar: {
    settings: 'الإعدادات',
    financialPreferences: 'التفضيلات المالية',
    zakatMethod: 'طريقة حساب الزكاة',
    hanafi: 'حنفي',
    shafii: 'شافعي',
    hanafiDesc: 'نصاب الذهب',
    shafiiDesc: 'نصاب الفضة',
    currencyDisplay: 'عرض العملة',
    notifications: 'الإشعارات',
    prayerReminders: 'تذكيرات الصلاة',
    zakatAlerts: 'تنبيهات الزكاة',
    investmentUpdates: 'تحديثات الاستثمار',
    marketNews: 'أخبار السوق',
    monthlyReports: 'التقارير الشهرية',
    display: 'العرض',
    numberFormat: 'تنسيق الأرقام',
    easternArabic: 'أرقام عربية شرقية (١٢٣)',
    westernNumerals: 'أرقام غربية (123)',
    calendarDisplay: 'عرض التقويم',
    hijriPrimary: 'هجري أساسي',
    gregorianPrimary: 'ميلادي أساسي',
    both: 'كلاهما',
    dashboardDensity: 'كثافة لوحة التحكم',
    compact: 'مضغوط',
    default: 'افتراضي',
    spacious: 'واسع',
    privacy: 'الخصوصية',
    sharePortfolio: 'مشاركة ملخص المحفظة',
    allowRecommendations: 'السماح بتوصيات الاستثمار',
    save: 'حفظ',
    saved: 'تم الحفظ',
    savedDesc: 'تم حفظ الإعدادات بنجاح.',
  },
}

const densityLabels = {
  0: 'compact',
  1: 'default',
  2: 'spacious',
} as const

export default function SettingsPage() {
  const { locale } = useDirection()
  const t = fs[locale]
  const { toast } = useToast()

  // Financial Preferences
  const [zakatMethod, setZakatMethod] = React.useState('hanafi')
  const [currency, setCurrency] = React.useState('SAR')

  // Notifications
  const [prayerReminders, setPrayerReminders] = React.useState(true)
  const [zakatAlerts, setZakatAlerts] = React.useState(true)
  const [investmentUpdates, setInvestmentUpdates] = React.useState(true)
  const [marketNews, setMarketNews] = React.useState(false)
  const [monthlyReports, setMonthlyReports] = React.useState(true)

  // Display
  const [numberFormat, setNumberFormat] = React.useState('eastern')
  const [calendarDisplay, setCalendarDisplay] = React.useState('hijri')
  const [density, setDensity] = React.useState([1])

  // Privacy
  const [sharePortfolio, setSharePortfolio] = React.useState(false)
  const [allowRecommendations, setAllowRecommendations] = React.useState(true)

  // Save
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSave = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    toast({ title: t.saved, description: t.savedDesc, variant: 'success' })
  }

  const densityKey = densityLabels[density[0] as keyof typeof densityLabels]

  return (
    <div className="container py-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Gear className="h-10 w-10 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.settings}</h1>
        </div>
      </div>

      {/* Financial Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <CardTitle>{t.financialPreferences}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Zakat Calculation Method */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t.zakatMethod}</Label>
            <RadioGroup value={zakatMethod} onValueChange={setZakatMethod}>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="hanafi" id="zakat-hanafi" />
                <div className="grid gap-0.5">
                  <Label htmlFor="zakat-hanafi" className="cursor-pointer font-medium">
                    {t.hanafi}
                  </Label>
                  <p className="text-sm text-muted-foreground">{t.hanafiDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="shafii" id="zakat-shafii" />
                <div className="grid gap-0.5">
                  <Label htmlFor="zakat-shafii" className="cursor-pointer font-medium">
                    {t.shafii}
                  </Label>
                  <p className="text-sm text-muted-foreground">{t.shafiiDesc}</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Currency Display */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t.currencyDisplay}</Label>
            <RadioGroup value={currency} onValueChange={setCurrency} className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="SAR" id="currency-sar" />
                <Label htmlFor="currency-sar" className="cursor-pointer">SAR</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="AED" id="currency-aed" />
                <Label htmlFor="currency-aed" className="cursor-pointer">AED</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="KWD" id="currency-kwd" />
                <Label htmlFor="currency-kwd" className="cursor-pointer">KWD</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <CardTitle>{t.notifications}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="prayer-reminders" className="cursor-pointer">{t.prayerReminders}</Label>
            <Switch id="prayer-reminders" checked={prayerReminders} onCheckedChange={setPrayerReminders} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="zakat-alerts" className="cursor-pointer">{t.zakatAlerts}</Label>
            <Switch id="zakat-alerts" checked={zakatAlerts} onCheckedChange={setZakatAlerts} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="investment-updates" className="cursor-pointer">{t.investmentUpdates}</Label>
            <Switch id="investment-updates" checked={investmentUpdates} onCheckedChange={setInvestmentUpdates} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="market-news" className="cursor-pointer">{t.marketNews}</Label>
            <Switch id="market-news" checked={marketNews} onCheckedChange={setMarketNews} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="monthly-reports" className="cursor-pointer">{t.monthlyReports}</Label>
            <Switch id="monthly-reports" checked={monthlyReports} onCheckedChange={setMonthlyReports} />
          </div>
        </CardContent>
      </Card>

      {/* Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <CardTitle>{t.display}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Number Format */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t.numberFormat}</Label>
            <RadioGroup value={numberFormat} onValueChange={setNumberFormat}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="eastern" id="num-eastern" />
                <Label htmlFor="num-eastern" className="cursor-pointer">{t.easternArabic}</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="western" id="num-western" />
                <Label htmlFor="num-western" className="cursor-pointer">{t.westernNumerals}</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Calendar Display */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t.calendarDisplay}</Label>
            <RadioGroup value={calendarDisplay} onValueChange={setCalendarDisplay}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="hijri" id="cal-hijri" />
                <Label htmlFor="cal-hijri" className="cursor-pointer">{t.hijriPrimary}</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="gregorian" id="cal-gregorian" />
                <Label htmlFor="cal-gregorian" className="cursor-pointer">{t.gregorianPrimary}</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="both" id="cal-both" />
                <Label htmlFor="cal-both" className="cursor-pointer">{t.both}</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Dashboard Density */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t.dashboardDensity}</Label>
            <div className="space-y-2">
              <Slider
                value={density}
                onValueChange={setDensity}
                min={0}
                max={2}
                step={1}
                aria-label={t.dashboardDensity}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t.compact}</span>
                <span>{t.default}</span>
                <span>{t.spacious}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t[densityKey]}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <CardTitle>{t.privacy}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="share-portfolio" className="cursor-pointer">{t.sharePortfolio}</Label>
            <Switch id="share-portfolio" checked={sharePortfolio} onCheckedChange={setSharePortfolio} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="allow-recommendations" className="cursor-pointer">{t.allowRecommendations}</Label>
            <Switch id="allow-recommendations" checked={allowRecommendations} onCheckedChange={setAllowRecommendations} />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} loading={isSubmitting}>
          {t.save}
        </Button>
      </div>
    </div>
  )
}
