'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useDirection } from '@/components/providers/direction-provider'
import {
  Bed,
  MagnifyingGlass,
  CalendarCheck,
  House,
  UserCircle,
  List,
  X,
  SignOut,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const t = {
  en: {
    brand: 'Nuzul',
    search: 'Search Hotels',
    reservations: 'My Reservations',
    home: 'Home',
    profile: 'Profile',
    signOut: 'Sign Out',
    skipToContent: 'Skip to main content',
    welcomeUser: 'Ahmed',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  ar: {
    brand: 'نزل',
    search: 'بحث الفنادق',
    reservations: 'حجوزاتي',
    home: 'الرئيسية',
    profile: 'الملف الشخصي',
    signOut: 'تسجيل الخروج',
    skipToContent: 'انتقل إلى المحتوى الرئيسي',
    welcomeUser: 'أحمد',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
  },
}

const navLinks = [
  { href: '/examples/hotel/home', labelKey: 'home' as const, icon: House },
  { href: '/examples/hotel/search', labelKey: 'search' as const, icon: MagnifyingGlass },
  { href: '/examples/hotel/reservations', labelKey: 'reservations' as const, icon: CalendarCheck },
  { href: '/examples/hotel/profile', labelKey: 'profile' as const, icon: UserCircle },
]

export default function HotelPlatformLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useDirection()
  const pathname = usePathname()
  const router = useRouter()
  const h = t[locale]
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const isActive = (href: string) => {
    if (href === '/examples/hotel/home') return pathname === '/examples/hotel/home'
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
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/examples/hotel/home"
            className="flex items-center gap-2 font-bold text-lg"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Bed className="h-5 w-5 text-primary-foreground" weight="bold" />
            </div>
            <span>{h.brand}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={isActive(link.href) ? 'primary' : 'ghost'}
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
              onClick={() => router.push('/examples/hotel')}
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
              onClick={() => { setMobileMenuOpen(false); router.push('/examples/hotel') }}
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
            <Bed className="h-4 w-4" weight="bold" />
            <span>{h.brand}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {locale === 'ar'
              ? 'نزل — عرض توضيحي لمنصة حجز فنادق · ٢٠٢٦ م / ١٤٤٧ هـ'
              : 'Nuzul — Hotel Booking Platform Demo · 2026 AD / 1447 AH'}
          </p>
          <p className="text-xs text-muted-foreground">
            {locale === 'ar'
              ? 'هذا عرض توضيحي وليس منصة حجز حقيقية'
              : 'This is a UI demo, not a real booking platform'}
          </p>
        </div>
      </footer>
    </div>
  )
}
