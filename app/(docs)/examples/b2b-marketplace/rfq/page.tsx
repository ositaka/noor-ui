'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
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
  const t = content[locale]

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
                    {t.b2bMarketplaceRfq.success.title}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {t.b2bMarketplaceRfq.success.message}
                  </p>
                </div>

                <Card className="w-full bg-muted">
                  <CardContent className="p-6">
                    <div className="grid gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t.b2bMarketplaceRfq.success.requestNumber}
                        </span>
                        <span className="font-mono font-semibold">#RFQ-2024-001234</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t.b2bMarketplaceRfq.success.expectedResponse}
                        </span>
                        <span className="font-medium">
                          {t.b2bMarketplaceRfq.success.within24Hours}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t.b2bMarketplaceRfq.success.status}
                        </span>
                        <Badge>{t.b2bMarketplaceRfq.success.underReview}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    {t.b2bMarketplaceRfq.success.newRequest}
                  </Button>
                  <Button asChild>
                    <Link href="/examples/b2b-marketplace/dashboard">
                      {t.b2bMarketplaceRfq.success.dashboard}
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
                {t.nav.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples" className="hover:text-foreground transition-colors">
                {t.nav.examples}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/examples/b2b-marketplace" className="hover:text-foreground transition-colors">
                {t.b2bMarketplaceRfq.breadcrumb.b2bMarketplace}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {t.b2bMarketplaceRfq.breadcrumb.requestForQuote}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {t.b2bMarketplaceRfq.pageTitle}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t.b2bMarketplaceRfq.pageDescription}
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
                    {t.b2bMarketplaceRfq.benefits.customPricing}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.b2bMarketplaceRfq.benefits.customPricingDesc}
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
                    {t.b2bMarketplaceRfq.benefits.fastResponse}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.b2bMarketplaceRfq.benefits.fastResponseDesc}
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
                    {t.b2bMarketplaceRfq.benefits.flexibleTerms}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.b2bMarketplaceRfq.benefits.flexibleTermsDesc}
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
                  <CardTitle>{t.b2bMarketplaceRfq.companyInfo.title}</CardTitle>
                  <CardDescription>
                    {t.b2bMarketplaceRfq.companyInfo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        {t.b2bMarketplaceRfq.companyInfo.companyName}
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
                        {t.b2bMarketplaceRfq.companyInfo.contactPerson}
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
                        {t.ui.form.email}
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
                        {t.b2bMarketplaceRfq.companyInfo.phoneNumber}
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
                      {t.b2bMarketplaceRfq.companyInfo.deliveryAddress}
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
                      <CardTitle>{t.b2bMarketplaceRfq.products.title}</CardTitle>
                      <CardDescription>
                        {t.b2bMarketplaceRfq.products.description}
                      </CardDescription>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                      <Plus className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {t.b2bMarketplaceRfq.products.addItem}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rfqItems.map((item, index) => (
                    <Card key={item.id} className="bg-muted">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="font-semibold">
                            {t.b2bMarketplaceRfq.products.item} {index + 1}
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
                              {t.b2bMarketplaceRfq.products.productName}
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
                                {t.b2bMarketplaceRfq.products.quantityRequired}
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
                                {t.b2bMarketplaceRfq.products.targetPrice}
                              </Label>
                              <Input
                                id={`price-${item.id}`}
                                type="number"
                                value={item.targetPrice}
                                onChange={(e) =>
                                  updateItem(item.id, 'targetPrice', e.target.value)
                                }
                                placeholder={t.b2bMarketplaceRfq.products.optional}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`notes-${item.id}`}>
                              {t.b2bMarketplaceRfq.products.additionalNotes}
                            </Label>
                            <Textarea
                              id={`notes-${item.id}`}
                              value={item.notes}
                              onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                              rows={2}
                              placeholder={t.b2bMarketplaceRfq.products.specificationsPlaceholder}
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
                  <CardTitle>{t.b2bMarketplaceRfq.additionalRequirements.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">
                        {t.b2bMarketplaceRfq.additionalRequirements.preferredPaymentTerms}
                      </Label>
                      <Select
                        value={formData.paymentTerms}
                        onValueChange={(value) =>
                          setFormData({ ...formData, paymentTerms: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t.b2bMarketplaceRfq.additionalRequirements.selectPaymentTerms}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">
                            {t.b2bMarketplaceRfq.additionalRequirements.immediatePayment}
                          </SelectItem>
                          <SelectItem value="net30">
                            {t.b2bMarketplaceRfq.additionalRequirements.net30Days}
                          </SelectItem>
                          <SelectItem value="net60">
                            {t.b2bMarketplaceRfq.additionalRequirements.net60Days}
                          </SelectItem>
                          <SelectItem value="net90">
                            {t.b2bMarketplaceRfq.additionalRequirements.net90Days}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">
                        {t.b2bMarketplaceRfq.additionalRequirements.requiredDeliveryDate}
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
                      {t.b2bMarketplaceRfq.additionalRequirements.additionalNotes}
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) =>
                        setFormData({ ...formData, additionalNotes: e.target.value })
                      }
                      rows={4}
                      placeholder={t.b2bMarketplaceRfq.additionalRequirements.additionalNotesPlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.b2bMarketplaceRfq.additionalRequirements.attachFiles}</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {t.b2bMarketplaceRfq.additionalRequirements.dragDropFiles}
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        {t.b2bMarketplaceRfq.additionalRequirements.chooseFiles}
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
                  <CardTitle>{t.b2bMarketplaceRfq.summary.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.b2bMarketplaceRfq.summary.numberOfItems}
                      </span>
                      <span className="font-medium">{rfqItems.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.b2bMarketplaceRfq.summary.responseTime}
                      </span>
                      <span className="font-medium">
                        {t.b2bMarketplaceRfq.summary.hours24}
                      </span>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-sm">
                      {t.b2bMarketplaceRfq.summary.whatToExpect}
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        {t.b2bMarketplaceRfq.summary.responseWithin24}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        {t.b2bMarketplaceRfq.summary.competitivePricing}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        {t.b2bMarketplaceRfq.summary.flexiblePayment}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        {t.b2bMarketplaceRfq.summary.dedicatedSupport}
                      </li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <MessageSquare className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                    {t.b2bMarketplaceRfq.summary.submitRequest}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {t.b2bMarketplaceRfq.summary.termsAgreement}
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
