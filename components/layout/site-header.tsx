'use client'

import * as React from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { useDirection } from '@/components/providers/direction-provider'

export function SiteHeader() {
  const { locale } = useDirection()

  const navItems = {
    en: {
      home: 'Home',
      getStarted: 'Getting Started',
      components: 'Components',
      tokens: 'Tokens',
      themes: 'Themes',
    },
    ar: {
      home: 'الرئيسية',
      getStarted: 'البداية',
      components: 'المكونات',
      tokens: 'الرموز',
      themes: 'السمات',
    },
  }

  const nav = navItems[locale]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RTL Design</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {nav.home}
          </Link>
          <Link
            href="/getting-started"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {nav.getStarted}
          </Link>
          <Link
            href="/components"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {nav.components}
          </Link>
          <Link
            href="/tokens"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {nav.tokens}
          </Link>
          <Link
            href="/themes"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {nav.themes}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DirectionToggle />
        </div>
      </div>
    </header>
  )
}
