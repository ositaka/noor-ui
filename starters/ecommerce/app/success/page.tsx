'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessPage() {
  const { locale } = useDirection()

  const text = {
    en: {
      title: 'Order Placed Successfully!',
      message: 'Thank you for your purchase. Your order has been received and is being processed.',
      orderNumber: 'Order Number',
      continueShopping: 'Continue Shopping',
    },
    ar: {
      title: 'تم تقديم الطلب بنجاح!',
      message: 'شكراً لشرائك. تم استلام طلبك وهو قيد المعالجة.',
      orderNumber: 'رقم الطلب',
      continueShopping: 'متابعة التسوق',
    },
  }
  const t = text[locale]

  const orderNumber = `NO${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <p className="text-muted-foreground">{t.message}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">{t.orderNumber}</p>
            <p className="text-xl font-mono font-bold">{orderNumber}</p>
          </div>
          <Link href="/products">
            <Button className="w-full">{t.continueShopping}</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
