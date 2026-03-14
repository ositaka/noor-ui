'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FileUpload } from '@/components/ui/file-upload'
import { useDirection } from '@/components/providers/direction-provider'
import { useToast } from '@/hooks/use-toast'
import { Storefront, CreditCard, Truck, MapPin, Star } from '@phosphor-icons/react'

const mp = {
  en: {
    profile: 'Profile',
    storeInfo: 'Store Info',
    paymentMethods: 'Payment Methods',
    shipping: 'Shipping',
    storeNameEn: 'Store Name (English)',
    storeNameAr: 'Store Name (Arabic)',
    descriptionEn: 'Description (English)',
    descriptionAr: 'Description (Arabic)',
    uploadLogo: 'Upload Logo',
    savedPayments: 'Saved Payment Methods',
    defaultPayment: 'Default Payment',
    addPayment: 'Add Payment Method',
    visaEnding: 'Visa ending in',
    madaEnding: 'Mada ending in',
    shippingAddress: 'Shipping Address',
    street: 'Street',
    city: 'City',
    postalCode: 'Postal Code',
    country: 'Country',
    expressShipping: 'Express Shipping',
    standardShipping: 'Standard Shipping',
    pickupAvailable: 'Pickup Available',
    save: 'Save',
    saved: 'Saved',
    savedDesc: 'Changes saved successfully.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'This feature is coming soon.',
    memberSince: 'Member since',
    rating: 'Rating',
    email: 'Email',
  },
  ar: {
    profile: 'الملف الشخصي',
    storeInfo: 'معلومات المتجر',
    paymentMethods: 'طرق الدفع',
    shipping: 'الشحن',
    storeNameEn: 'اسم المتجر (إنجليزي)',
    storeNameAr: 'اسم المتجر (عربي)',
    descriptionEn: 'الوصف (إنجليزي)',
    descriptionAr: 'الوصف (عربي)',
    uploadLogo: 'رفع الشعار',
    savedPayments: 'طرق الدفع المحفوظة',
    defaultPayment: 'الطريقة الافتراضية',
    addPayment: 'إضافة طريقة دفع',
    visaEnding: 'فيزا تنتهي بـ',
    madaEnding: 'مدى تنتهي بـ',
    shippingAddress: 'عنوان الشحن',
    street: 'الشارع',
    city: 'المدينة',
    postalCode: 'الرمز البريدي',
    country: 'البلد',
    expressShipping: 'شحن سريع',
    standardShipping: 'شحن عادي',
    pickupAvailable: 'الاستلام متاح',
    save: 'حفظ',
    saved: 'تم الحفظ',
    savedDesc: 'تم حفظ التغييرات بنجاح.',
    comingSoon: 'قريباً',
    comingSoonDesc: 'هذه الميزة قريباً.',
    memberSince: 'عضو منذ',
    rating: 'التقييم',
    email: 'البريد الإلكتروني',
  },
}

export default function ProfilePage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'
  const t = mp[locale]
  const { toast } = useToast()

  // Store Info form state
  const [storeNameEn, setStoreNameEn] = React.useState('Tech Store')
  const [storeNameAr, setStoreNameAr] = React.useState('متجر التقنية')
  const [descriptionEn, setDescriptionEn] = React.useState(
    'Your trusted source for premium electronics and tech accessories.'
  )
  const [descriptionAr, setDescriptionAr] = React.useState(
    'مصدرك الموثوق للإلكترونيات والإكسسوارات التقنية الممتازة.'
  )
  const [isStoreInfoSaving, setIsStoreInfoSaving] = React.useState(false)

  // Payment state
  const [defaultPayment, setDefaultPayment] = React.useState('visa-4242')

  // Shipping form state
  const [street, setStreet] = React.useState('Building 123, King Fahd Road')
  const [city, setCity] = React.useState('Riyadh')
  const [postalCode, setPostalCode] = React.useState('12271')
  const [country, setCountry] = React.useState('Saudi Arabia')
  const [expressShipping, setExpressShipping] = React.useState(true)
  const [standardShipping, setStandardShipping] = React.useState(true)
  const [pickupAvailable, setPickupAvailable] = React.useState(false)
  const [isShippingSaving, setIsShippingSaving] = React.useState(false)

  const handleStoreInfoSave = async () => {
    setIsStoreInfoSaving(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsStoreInfoSaving(false)
    toast({ title: t.saved, description: t.savedDesc, variant: 'success' })
  }

  const handleShippingSave = async () => {
    setIsShippingSaving(true)
    await new Promise((r) => setTimeout(r, 400))
    setIsShippingSaving(false)
    toast({ title: t.saved, description: t.savedDesc, variant: 'success' })
  }

  const handleAddPayment = () => {
    toast({ title: t.comingSoon, description: t.comingSoonDesc })
  }

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-4 bg-primary/10 rounded-xl">
            <Storefront className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {t.profile}
            </h1>
          </div>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Store Logo Placeholder */}
            <div className="h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary">AM</span>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {isRTL ? 'متجر التقنية' : 'Tech Store'}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="text-muted-foreground">4.8</span>
                </div>
              </div>

              <Separator />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{t.memberSince}:</span>
                  <Badge variant="outline">{isRTL ? 'يناير ٢٠٢٣' : 'Jan 2023'}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{t.email}:</span>
                  <span className="text-muted-foreground" dir="ltr">ahmed@techstore.sa</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{t.rating}: 4.8</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="store-info">
        <TabsList className="mb-6">
          <TabsTrigger value="store-info">
            <Storefront className="h-4 w-4 me-2" aria-hidden="true" />
            {t.storeInfo}
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 me-2" aria-hidden="true" />
            {t.paymentMethods}
          </TabsTrigger>
          <TabsTrigger value="shipping">
            <Truck className="h-4 w-4 me-2" aria-hidden="true" />
            {t.shipping}
          </TabsTrigger>
        </TabsList>

        {/* Store Info Tab */}
        <TabsContent value="store-info">
          <Card>
            <CardHeader>
              <CardTitle>{t.storeInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-name-en">{t.storeNameEn}</Label>
                    <Input
                      id="store-name-en"
                      value={storeNameEn}
                      onChange={(e) => setStoreNameEn(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-name-ar">{t.storeNameAr}</Label>
                    <Input
                      id="store-name-ar"
                      value={storeNameAr}
                      onChange={(e) => setStoreNameAr(e.target.value)}
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="desc-en">{t.descriptionEn}</Label>
                    <Textarea
                      id="desc-en"
                      value={descriptionEn}
                      onChange={(e) => setDescriptionEn(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desc-ar">{t.descriptionAr}</Label>
                    <Textarea
                      id="desc-ar"
                      value={descriptionAr}
                      onChange={(e) => setDescriptionAr(e.target.value)}
                      rows={4}
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.uploadLogo}</Label>
                  <FileUpload
                    accept=".jpg,.jpeg,.png,.svg"
                    maxSize={5 * 1024 * 1024}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleStoreInfoSave} loading={isStoreInfoSaving}>
                    {t.save}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>{t.savedPayments}</CardTitle>
              <CardDescription>{t.defaultPayment}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <RadioGroup value={defaultPayment} onValueChange={setDefaultPayment}>
                  {/* Visa ending 4242 */}
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="visa-4242" id="visa-4242" />
                      <Label
                        htmlFor="visa-4242"
                        className="flex items-center gap-3 flex-1 cursor-pointer"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CreditCard className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-medium">{t.visaEnding} 4242</p>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'تنتهي ١٢/٢٦' : 'Expires 12/26'}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </Card>

                  {/* Mada ending 8901 */}
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="mada-8901" id="mada-8901" />
                      <Label
                        htmlFor="mada-8901"
                        className="flex items-center gap-3 flex-1 cursor-pointer"
                      >
                        <div className="p-2 bg-success/10 rounded-lg">
                          <CreditCard className="h-5 w-5 text-success" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-medium">{t.madaEnding} 8901</p>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'تنتهي ٠٣/٢٧' : 'Expires 03/27'}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </Card>
                </RadioGroup>

                <Button variant="outline" className="w-full" onClick={handleAddPayment}>
                  <CreditCard className="h-4 w-4 me-2" aria-hidden="true" />
                  {t.addPayment}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Tab */}
        <TabsContent value="shipping">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t.shippingAddress}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="street">{t.street}</Label>
                    <Input
                      id="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t.city}</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">{t.postalCode}</Label>
                      <Input
                        id="postal-code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">{t.country}</Label>
                      <Input
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  {t.shipping}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Switch
                        id="express-shipping"
                        checked={expressShipping}
                        onCheckedChange={setExpressShipping}
                      />
                      <Label htmlFor="express-shipping" className="cursor-pointer font-medium">
                        {t.expressShipping}
                      </Label>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Switch
                        id="standard-shipping"
                        checked={standardShipping}
                        onCheckedChange={setStandardShipping}
                      />
                      <Label htmlFor="standard-shipping" className="cursor-pointer font-medium">
                        {t.standardShipping}
                      </Label>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Switch
                        id="pickup-available"
                        checked={pickupAvailable}
                        onCheckedChange={setPickupAvailable}
                      />
                      <Label htmlFor="pickup-available" className="cursor-pointer font-medium">
                        {t.pickupAvailable}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleShippingSave} loading={isShippingSaving}>
                {t.save}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
