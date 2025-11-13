'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'

export default function NotFound() {
  const { direction } = useDirection()
  const isRTL = direction === 'rtl'

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-12 pb-12 text-center space-y-8">
          {/* Large 404 */}
          <div className="space-y-2">
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
            <h2 className="text-3xl font-bold tracking-tight">
              {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {isRTL
                ? 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون الصفحة قد تم نقلها أو حذفها.'
                : "Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted."}
            </p>
          </div>

          {/* Illustration/Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Search className="h-32 w-32 text-muted-foreground/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-4xl">🔍</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/" className="inline-flex items-center">
                <Home className="h-4 w-4 me-2" />
                {isRTL ? 'العودة للرئيسية' : 'Go to Homepage'}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/components" className="inline-flex items-center">
                {isRTL ? (
                  <>
                    استكشف المكونات
                    <ArrowLeft className="h-4 w-4 ms-2 rtl:rotate-180" />
                  </>
                ) : (
                  <>
                    <ArrowLeft className="h-4 w-4 me-2 rtl:rotate-180" />
                    Browse Components
                  </>
                )}
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              {isRTL ? 'أو جرّب هذه الروابط المفيدة:' : 'Or try these helpful links:'}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/getting-started"
                className="text-sm text-primary hover:underline"
              >
                {isRTL ? 'ابدأ الآن' : 'Getting Started'}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/examples" className="text-sm text-primary hover:underline">
                {isRTL ? 'الأمثلة' : 'Examples'}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/documentation" className="text-sm text-primary hover:underline">
                {isRTL ? 'التوثيق' : 'Documentation'}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/starters" className="text-sm text-primary hover:underline">
                {isRTL ? 'المشاريع الجاهزة' : 'Starters'}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
