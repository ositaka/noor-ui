'use client'

import * as React from 'react'
import Link from 'next/link'
import { Sunrise, Menu } from 'lucide-react'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { GlobalSearch } from '@/components/docs/global-search'
import { useDirection } from '@/components/providers/direction-provider'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { content } from '@/lib/i18n'

export function SiteHeader() {
  const { locale } = useDirection()
  const [open, setOpen] = React.useState(false)
  const t = content[locale]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Sunrise className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Noor UI</span>
          </Link>
          <a
            href="https://www.npmjs.com/package/noorui-rtl"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block"
          >
            <Badge variant="secondary" className="text-xs">
              npm
            </Badge>
          </a>
        </div>
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/getting-started"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t.nav.getStarted}
          </Link>
          <Link
            href="/components"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t.nav.components}
          </Link>
          <Link
            href="/examples"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t.nav.examples}
          </Link>
          <Link
            href="/starters"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t.nav.starters}
          </Link>
          <Link
            href="/rtl-guide"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t.nav.rtlGuide}
          </Link>
          <Link
            href="/themes"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t.nav.themes}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <GlobalSearch />
          <ThemeToggle />
          <DirectionToggle />

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="end">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Sunrise className="h-5 w-5 text-primary" />
                  <span>Noor UI</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.home}
                </Link>
                <Separator />
                <Link
                  href="/getting-started"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.getStarted}
                </Link>
                <Link
                  href="/components"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.components}
                </Link>
                <Link
                  href="/examples"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.examples}
                </Link>
                <Link
                  href="/starters"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.starters}
                </Link>
                <Link
                  href="/rtl-guide"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.rtlGuide}
                </Link>
                <Link
                  href="/themes"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.themes}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
