'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { Gear, Bell, Storefront, Globe } from '@phosphor-icons/react'

const ms = {
  en: {
    settings: 'Settings',
    notifications: 'Notifications',
    newOrderAlerts: 'New Order Alerts',
    lowStockWarnings: 'Low Stock Warnings',
    customerMessages: 'Customer Messages',
    reviewNotifications: 'Review Notifications',
    paymentReceived: 'Payment Received',
    storePreferences: 'Store Preferences',
    currency: 'Currency',
    showOutOfStock: 'Show out-of-stock products',
    enableReviews: 'Enable customer reviews',
    language: 'Language',
    save: 'Save',
    english: 'English',
    arabic: 'العربية',
    saved: 'Saved',
    savedDesc: 'Settings saved successfully.',
  },
  ar: {
    settings: 'الإعدادات',
    notifications: 'الإشعارات',
    newOrderAlerts: 'تنبيهات الطلبات الجديدة',
    lowStockWarnings: 'تحذيرات المخزون المنخفض',
    customerMessages: 'رسائل العملاء',
    reviewNotifications: 'إشعارات التقييمات',
    paymentReceived: 'إشعارات الدفع',
    storePreferences: 'تفضيلات المتجر',
    currency: 'العملة',
    showOutOfStock: 'عرض المنتجات غير المتوفرة',
    enableReviews: 'تفعيل تقييمات العملاء',
    language: 'اللغة',
    save: 'حفظ',
    english: 'English',
    arabic: 'العربية',
    saved: 'تم الحفظ',
    savedDesc: 'تم حفظ الإعدادات بنجاح.',
  },
}

export default function MarketplaceSettingsPage() {
  const { locale } = useDirection()
  const t = ms[locale]
  const { toast } = useToast()

  // Notifications
  const [newOrderAlerts, setNewOrderAlerts] = React.useState(true)
  const [lowStockWarnings, setLowStockWarnings] = React.useState(true)
  const [customerMessages, setCustomerMessages] = React.useState(true)
  const [reviewNotifications, setReviewNotifications] = React.useState(false)
  const [paymentReceived, setPaymentReceived] = React.useState(true)

  // Store Preferences
  const [currency, setCurrency] = React.useState('SAR')
  const [showOutOfStock, setShowOutOfStock] = React.useState(false)
  const [enableReviews, setEnableReviews] = React.useState(true)

  // Language
  const [language, setLanguage] = React.useState(locale === 'ar' ? 'ar' : 'en')

  // Save
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSave = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    toast({ title: t.saved, description: t.savedDesc, variant: 'success' })
  }

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
            <Label htmlFor="new-order-alerts" className="cursor-pointer">{t.newOrderAlerts}</Label>
            <Switch id="new-order-alerts" checked={newOrderAlerts} onCheckedChange={setNewOrderAlerts} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="low-stock-warnings" className="cursor-pointer">{t.lowStockWarnings}</Label>
            <Switch id="low-stock-warnings" checked={lowStockWarnings} onCheckedChange={setLowStockWarnings} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="customer-messages" className="cursor-pointer">{t.customerMessages}</Label>
            <Switch id="customer-messages" checked={customerMessages} onCheckedChange={setCustomerMessages} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="review-notifications" className="cursor-pointer">{t.reviewNotifications}</Label>
            <Switch id="review-notifications" checked={reviewNotifications} onCheckedChange={setReviewNotifications} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="payment-received" className="cursor-pointer">{t.paymentReceived}</Label>
            <Switch id="payment-received" checked={paymentReceived} onCheckedChange={setPaymentReceived} />
          </div>
        </CardContent>
      </Card>

      {/* Store Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Storefront className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <CardTitle>{t.storePreferences}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Currency */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t.currency}</Label>
            <RadioGroup value={currency} onValueChange={setCurrency} className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="SAR" id="mp-currency-sar" />
                <Label htmlFor="mp-currency-sar" className="cursor-pointer">SAR</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="AED" id="mp-currency-aed" />
                <Label htmlFor="mp-currency-aed" className="cursor-pointer">AED</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="KWD" id="mp-currency-kwd" />
                <Label htmlFor="mp-currency-kwd" className="cursor-pointer">KWD</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Toggles */}
          <div className="flex items-center justify-between">
            <Label htmlFor="show-out-of-stock" className="cursor-pointer">{t.showOutOfStock}</Label>
            <Switch id="show-out-of-stock" checked={showOutOfStock} onCheckedChange={setShowOutOfStock} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-reviews" className="cursor-pointer">{t.enableReviews}</Label>
            <Switch id="enable-reviews" checked={enableReviews} onCheckedChange={setEnableReviews} />
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <CardTitle>{t.language}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup value={language} onValueChange={setLanguage}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="en" id="lang-en" />
              <Label htmlFor="lang-en" className="cursor-pointer">{t.english}</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="ar" id="lang-ar" />
              <Label htmlFor="lang-ar" className="cursor-pointer">{t.arabic}</Label>
            </div>
          </RadioGroup>
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
