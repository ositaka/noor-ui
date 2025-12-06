'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Card, CardContent } from '@/components/ui/card'
import { Home, Search } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export default function NotFound() {
  const { locale } = useDirection()
  const t = content[locale]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-12 pb-12 text-center space-y-8">
          {/* Large 404 */}
          <div className="space-y-2">
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
            <h2 className="text-3xl font-bold tracking-tight">
              {t.notFound.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {t.notFound.description}
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
              <Link href="/">
                <Home className="h-4 w-4 me-2" />
                {t.notFound.goHome}
              </Link>
            </Button>
            <ButtonArrow asChild variant="outline" size="lg" direction="back" icon="arrow">
              <Link href="/components">
                {t.notFound.browseComponents}
              </Link>
            </ButtonArrow>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              {t.notFound.tryLinks}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/getting-started"
                className="text-sm text-primary hover:underline"
              >
                {t.nav.getStarted}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/examples" className="text-sm text-primary hover:underline">
                {t.nav.examples}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/documentation" className="text-sm text-primary hover:underline">
                {t.nav.documentation}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/starters" className="text-sm text-primary hover:underline">
                {t.notFound.starters}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/sitemap" className="text-sm text-primary hover:underline">
                Sitemap
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
