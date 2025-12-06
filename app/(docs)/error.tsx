'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Home, RefreshCcw, BookOpen } from 'lucide-react'
import { content } from '@/lib/i18n'

export default function DocsError({
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
      console.error('Documentation error:', error)
    }
  }, [error])

  return (
    <div className="container py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-full bg-destructive/10 p-2">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-2xl">{t.docsErrorPage.title}</CardTitle>
          </div>
          <CardDescription>
            {t.docsErrorPage.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm font-mono text-muted-foreground break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Button onClick={reset}>
              <RefreshCcw className="me-2 h-4 w-4" />
              {t.docsErrorPage.tryAgain}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/documentation">
                <BookOpen className="me-2 h-4 w-4" />
                {t.docsErrorPage.documentationHome}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="me-2 h-4 w-4" />
                {t.docsErrorPage.home}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
