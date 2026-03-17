'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useDirection } from '@/components/providers/direction-provider'
import {
  GameController,
  House,
  Trophy,
  ChartBar,
  UserCircle,
  Palette,
  List,
  X,
  SignOut,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const t = {
  en: {
    brand: 'Gulf Stars',
    home: 'Home',
    tournament: 'Tournament',
    leaderboard: 'Leaderboard',
    profile: 'Profile',
    themePreview: 'Theme Preview',
    signOut: 'Sign Out',
    skipToContent: 'Skip to main content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  ar: {
    brand: 'نجوم الخليج',
    home: 'الرئيسية',
    tournament: 'البطولة',
    leaderboard: 'المتصدرين',
    profile: 'الملف الشخصي',
    themePreview: 'معاينة السمة',
    signOut: 'تسجيل الخروج',
    skipToContent: 'انتقل إلى المحتوى الرئيسي',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
  },
}

const navLinks = [
  { href: '/examples/esports/home', labelKey: 'home' as const, icon: House },
  { href: '/examples/esports/tournament/gulf-cup', labelKey: 'tournament' as const, icon: Trophy },
  { href: '/examples/esports/leaderboard', labelKey: 'leaderboard' as const, icon: ChartBar },
  { href: '/examples/esports/profile', labelKey: 'profile' as const, icon: UserCircle },
  { href: '/examples/esports/theme-preview', labelKey: 'themePreview' as const, icon: Palette },
]

export default function EsportsPlatformLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useDirection()
  const pathname = usePathname()
  const router = useRouter()
  const h = t[locale]
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const isActive = (href: string) => {
    if (href === '/examples/esports/home') return pathname === '/examples/esports/home'
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ scrollPaddingTop: '5rem' }}>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        {h.skipToContent}
      </a>

      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        style={{
          borderImage: 'linear-gradient(to right, hsl(270 100% 60%), hsl(180 100% 50%), hsl(300 100% 55%)) 1',
          borderBottomWidth: '2px',
        }}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/examples/esports/home"
            className="flex items-center gap-2 font-bold text-lg"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <GameController className="h-5 w-5 text-primary-foreground" weight="duotone" />
            </div>
            <span>{h.brand}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={isActive(link.href) ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => router.push(link.href)}
              >
                <link.icon className="h-4 w-4 me-1.5" />
                {h[link.labelKey]}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/examples/esports')}
              className="text-muted-foreground"
            >
              <SignOut className="h-4 w-4 me-1.5" />
              {h.signOut}
            </Button>
            <div className="ms-2 border-s ps-2">
              <DirectionToggle />
            </div>
          </nav>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <DirectionToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? h.closeMenu : h.openMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                  isActive(link.href) ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
                )}
              >
                <link.icon className="h-4 w-4" />
                {h[link.labelKey]}
              </Link>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); router.push('/examples/esports') }}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent w-full"
            >
              <SignOut className="h-4 w-4" />
              {h.signOut}
            </button>
          </div>
        )}
      </header>

      {/* Main content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold">
            <GameController className="h-4 w-4" weight="duotone" />
            <span>{h.brand}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {locale === 'ar'
              ? 'نجوم الخليج — عرض توضيحي لمنصة بطولات الرياضات الإلكترونية · ٢٠٢٦ م / ١٤٤٧ هـ'
              : 'Gulf Stars — Esports Tournament Platform Demo · 2026 AD / 1447 AH'}
          </p>
          <p className="text-xs text-muted-foreground">
            {locale === 'ar'
              ? 'هذا عرض توضيحي وليس منصة بطولات حقيقية'
              : 'This is a UI demo, not a real tournament platform'}
          </p>
        </div>
      </footer>
    </div>
  )
}
