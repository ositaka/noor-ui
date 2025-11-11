'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/hooks/use-direction'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle2,
  Upload,
  FileText,
  Clock,
  TrendingDown,
} from 'lucide-react'

interface RFQItem {
  id: string
  productName: string
  quantity: string
  targetPrice: string
  notes: string
}

export default function RFQPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'

  const [submitted, setSubmitted] = React.useState(false)
  const [formData, setFormData] = React.useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    paymentTerms: '',
    deliveryDate: '',
    additionalNotes: '',
  })

  const [rfqItems, setRFQItems] = React.useState<RFQItem[]>([
    { id: '1', productName: '', quantity: '', targetPrice: '', notes: '' },
  ])

  const addItem = () => {
    setRFQItems([
      ...rfqItems,
      {
        id: Date.now().toString(),
        productName: '',
        quantity: '',
        targetPrice: '',
        notes: '',
      },
    ])
  }

  const removeItem = (id: string) => {
    if (rfqItems.length > 1) {
      setRFQItems(rfqItems.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof RFQItem, value: string) => {
    setRFQItems(
      rfqItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <main id="main-content" className="container py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle2 className="h-16 w-16 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">
                    {isRTL ? 'تم إرسال طلب العرض!' : 'Quote Request Submitted!'}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {isRTL
                      ? 'شكراً لك على طلبك. سيتم التواصل معك خلال 24 ساعة.'
                      : 'Thank you for your request. We will contact you within 24 hours.'}
                  </p>
                </div>

                <Card className="w-full bg-muted">
                  <CardContent className="p-6">
                    <div className="grid gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {isRTL ? 'رقم الطلب' : 'Request Number'}
                        </span>
                        <span className="font-mono font-semibold">#RFQ-2024-001234</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {isRTL ? 'وقت الاستجابة المتوقع' : 'Expected Response'}
                        </span>
                        <span className="font-medium">
                          {isRTL ? 'خلال ٢٤ ساعة' : 'Within 24 hours'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {isRTL ? 'الحالة' : 'Status'}
                        </span>
                        <Badge>{isRTL ? 'قيد المراجعة' : 'Under Review'}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    {isRTL ? 'طلب آخر' : 'New Request'}
                  </Button>
                  <Button asChild>
                    <Link href="/examples/b2b-marketplace/dashboard">
                      {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples" className="hover:text-foreground transition-colors">
                {isRTL ? 'الأمثلة' : 'Examples'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples/b2b-marketplace" className="hover:text-foreground transition-colors">
                {isRTL ? 'السوق B2B' : 'B2B Marketplace'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {isRTL ? 'طلب عرض سعر' : 'Request for Quote'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {isRTL ? 'طلب عرض سعر (RFQ)' : 'Request for Quote (RFQ)'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isRTL
              ? 'احصل على أسعار تنافسية لطلبات الجملة الكبيرة'
              : 'Get competitive pricing for large bulk orders'}
          </p>
        </div>

        {/* Benefits */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {isRTL ? 'أسعار مخصصة' : 'Custom Pricing'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL
                      ? 'احصل على أسعار مخصصة للطلبات الكبيرة'
                      : 'Get tailored pricing for large orders'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {isRTL ? 'استجابة سريعة' : 'Fast Response'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL
                      ? 'رد خلال 24 ساعة على جميع الطلبات'
                      : 'Response within 24 hours on all requests'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {isRTL ? 'شروط مرنة' : 'Flexible Terms'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL
                      ? 'شروط دفع وتسليم مرنة'
                      : 'Flexible payment and delivery terms'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* RFQ Form - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? 'معلومات الشركة' : 'Company Information'}</CardTitle>
                  <CardDescription>
                    {isRTL
                      ? 'أدخل معلومات شركتك وبيانات الاتصال'
                      : 'Enter your company details and contact information'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        {isRTL ? 'اسم الشركة' : 'Company Name'}
                      </Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">
                        {isRTL ? 'اسم جهة الاتصال' : 'Contact Person'}
                      </Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) =>
                          setFormData({ ...formData, contactPerson: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {isRTL ? 'البريد الإلكتروني' : 'Email'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">
                      {isRTL ? 'عنوان التسليم' : 'Delivery Address'}
                    </Label>
                    <Textarea
                      id="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, deliveryAddress: e.target.value })
                      }
                      rows={3}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Products */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{isRTL ? 'المنتجات المطلوبة' : 'Products Required'}</CardTitle>
                      <CardDescription>
                        {isRTL
                          ? 'أضف المنتجات التي ترغب في الحصول على عرض سعر لها'
                          : 'Add products you want to get a quote for'}
                      </CardDescription>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                      <Plus className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'إضافة' : 'Add Item'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rfqItems.map((item, index) => (
                    <Card key={item.id} className="bg-muted">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="font-semibold">
                            {isRTL ? 'منتج ' : 'Item '}
                            {index + 1}
                          </h4>
                          {rfqItems.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor={`product-${item.id}`}>
                              {isRTL ? 'اسم المنتج / الوصف' : 'Product Name / Description'}
                            </Label>
                            <Input
                              id={`product-${item.id}`}
                              value={item.productName}
                              onChange={(e) =>
                                updateItem(item.id, 'productName', e.target.value)
                              }
                              required
                            />
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor={`quantity-${item.id}`}>
                                {isRTL ? 'الكمية المطلوبة' : 'Quantity Required'}
                              </Label>
                              <Input
                                id={`quantity-${item.id}`}
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`price-${item.id}`}>
                                {isRTL ? 'السعر المستهدف (SAR)' : 'Target Price (SAR)'}
                              </Label>
                              <Input
                                id={`price-${item.id}`}
                                type="number"
                                value={item.targetPrice}
                                onChange={(e) =>
                                  updateItem(item.id, 'targetPrice', e.target.value)
                                }
                                placeholder={isRTL ? 'اختياري' : 'Optional'}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`notes-${item.id}`}>
                              {isRTL ? 'ملاحظات إضافية' : 'Additional Notes'}
                            </Label>
                            <Textarea
                              id={`notes-${item.id}`}
                              value={item.notes}
                              onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                              rows={2}
                              placeholder={isRTL ? 'المواصفات، المتطلبات الخاصة...' : 'Specifications, special requirements...'}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Additional Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? 'متطلبات إضافية' : 'Additional Requirements'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">
                        {isRTL ? 'شروط الدفع المفضلة' : 'Preferred Payment Terms'}
                      </Label>
                      <Select
                        value={formData.paymentTerms}
                        onValueChange={(value) =>
                          setFormData({ ...formData, paymentTerms: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isRTL ? 'اختر شروط الدفع' : 'Select payment terms'
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">
                            {isRTL ? 'دفع فوري' : 'Immediate Payment'}
                          </SelectItem>
                          <SelectItem value="net30">
                            {isRTL ? 'صافي ٣٠ يوم' : 'Net 30 Days'}
                          </SelectItem>
                          <SelectItem value="net60">
                            {isRTL ? 'صافي ٦٠ يوم' : 'Net 60 Days'}
                          </SelectItem>
                          <SelectItem value="net90">
                            {isRTL ? 'صافي ٩٠ يوم' : 'Net 90 Days'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">
                        {isRTL ? 'تاريخ التسليم المطلوب' : 'Required Delivery Date'}
                      </Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) =>
                          setFormData({ ...formData, deliveryDate: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">
                      {isRTL ? 'ملاحظات إضافية' : 'Additional Notes'}
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) =>
                        setFormData({ ...formData, additionalNotes: e.target.value })
                      }
                      rows={4}
                      placeholder={
                        isRTL
                          ? 'أي متطلبات أو معلومات إضافية...'
                          : 'Any additional requirements or information...'
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{isRTL ? 'إرفاق ملفات (اختياري)' : 'Attach Files (Optional)'}</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {isRTL
                          ? 'اسحب وأفلت الملفات هنا أو انقر للتصفح'
                          : 'Drag and drop files here or click to browse'}
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        {isRTL ? 'اختر ملفات' : 'Choose Files'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>{isRTL ? 'ملخص الطلب' : 'Request Summary'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isRTL ? 'عدد المنتجات' : 'Number of Items'}
                      </span>
                      <span className="font-medium">{rfqItems.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isRTL ? 'وقت الاستجابة' : 'Response Time'}
                      </span>
                      <span className="font-medium">
                        {isRTL ? '٢٤ ساعة' : '24 hours'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-sm">
                      {isRTL ? 'ما يجب توقعه:' : "What to expect:"}
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        {isRTL
                          ? 'رد خلال 24 ساعة'
                          : 'Response within 24 hours'}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        {isRTL
                          ? 'أسعار تنافسية مخصصة'
                          : 'Competitive custom pricing'}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        {isRTL
                          ? 'شروط دفع مرنة'
                          : 'Flexible payment terms'}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        {isRTL
                          ? 'دعم مخصص'
                          : 'Dedicated support'}
                      </li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <MessageSquare className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                    {isRTL ? 'إرسال الطلب' : 'Submit Request'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {isRTL
                      ? 'بإرسال هذا الطلب، فإنك توافق على شروط وأحكام الخدمة'
                      : 'By submitting this request, you agree to our terms of service'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
