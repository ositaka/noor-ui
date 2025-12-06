'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Home, RefreshCcw, Sparkles } from 'lucide-react'
import { content } from '@/lib/i18n'

export default function ExamplesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Get locale from localStorage or document dir attribute since error boundaries
  // might not have access to context providers
  const [locale, setLocale] = React.useState<'en' | 'ar'>('en')

  React.useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as 'en' | 'ar' | null
    const docDir = document.documentElement.getAttribute('dir')
    const detectedLocale = storedLocale || (docDir === 'rtl' ? 'ar' : 'en')
    setLocale(detectedLocale)
  }, [])

  const t = content[locale]

  React.useEffect(() => {
    // Log error to error reporting service
    if (process.env.NODE_ENV === 'development') {
      console.error('Example page error:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-full bg-destructive/10 p-2">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-2xl">{t.examplesErrorPage.title}</CardTitle>
          </div>
          <CardDescription>
            {t.examplesErrorPage.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm font-mono text-muted-foreground break-all">
                {error.message}
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Button onClick={reset} className="flex-1">
              <RefreshCcw className="me-2 h-4 w-4" />
              {t.examplesErrorPage.tryAgain}
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/examples">
                <Sparkles className="me-2 h-4 w-4" />
                {t.examplesErrorPage.allExamples}
              </Link>
            </Button>
          </div>
          <Button variant="ghost" asChild className="w-full">
            <Link href="/">
              <Home className="me-2 h-4 w-4" />
              {t.examplesErrorPage.goHome}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
