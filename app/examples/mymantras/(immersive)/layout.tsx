'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useDirection } from '@/components/providers/direction-provider'
import { cn } from '@/lib/utils'
import {
  FlowerLotus,
  List,
  House,
  ChartPie,
  Sparkle,
  Books,
  Heart,
  GearSix,
  SignOut,
  X,
} from '@phosphor-icons/react'

const gt = {
  en: {
    brand: 'MyMantras',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'Home',
    dashboard: 'Dashboard',
    mantras: 'Mantra Generator',
    collections: 'Collections',
    favorites: 'Favorites',
    settings: 'Settings',
    signOut: 'Sign Out',
    badgeNew: 'New',
    userName: 'Layla Al Shamsi',
    userEmail: 'layla@mymantras.demo',
  },
  ar: {
    brand: 'تأملاتي',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    home: 'الرئيسية',
    dashboard: 'لوحة التحكم',
    mantras: 'مولّد التأملات',
    collections: 'المجموعات',
    favorites: 'المفضلة',
    settings: 'الإعدادات',
    signOut: 'تسجيل الخروج',
    badgeNew: 'جديد',
    userName: 'ليلى الشمسي',
    userEmail: 'layla@mymantras.demo',
  },
}

const navItems = [
  { key: 'home', href: '/examples/mymantras/home', icon: House },
  { key: 'dashboard', href: '/examples/mymantras/dashboard', icon: ChartPie },
  { key: 'mantras', href: '/examples/mymantras/mantras', icon: Sparkle, badge: true },
  { key: 'collections', href: '/examples/mymantras/collections', icon: Books },
  { key: 'favorites', href: '/examples/mymantras/favorites', icon: Heart },
  { key: 'settings', href: '/examples/mymantras/settings', icon: GearSix },
]

export default function ImmersiveLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useDirection()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const h = gt[locale]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <div className="min-h-screen bg-background bg-sanctuary">
      {/* Glassmorphism floating header */}
      <header className="fixed top-0 inset-x-0 z-40 h-12">
        <div className="flex items-center justify-between px-4 h-full">
          {/* Hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-background/60 backdrop-blur-xl border border-border/30"
                aria-label={h.openMenu}
              >
                <List className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="start" className="w-72 p-0">
              <SheetHeader className="p-6 pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <FlowerLotus className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-display font-bold">{h.brand}</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="px-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const label = h[item.key as keyof typeof h] as string
                  const active = isActive(item.href)
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        router.push(item.href)
                        setOpen(false)
                      }}
                      className={cn(
                        'flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm transition-colors',
                        active
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{label}</span>
                      {item.badge && (
                        <span className="ms-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                          {h.badgeNew}
                        </span>
                      )}
                    </button>
                  )
                })}
              </nav>

              <Separator className="my-4" />

              {/* User + logout */}
              <div className="px-6 space-y-4">
                <div>
                  <p className="text-sm font-medium">{h.userName}</p>
                  <p className="text-xs text-muted-foreground">{h.userEmail}</p>
                </div>
                <button
                  onClick={() => {
                    router.push('/examples/mymantras')
                    setOpen(false)
                  }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SignOut className="h-4 w-4" />
                  {h.signOut}
                </button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Direction toggle */}
          <div className="bg-background/60 backdrop-blur-xl rounded-full border border-border/30">
            <DirectionToggle />
          </div>
        </div>
      </header>

      {/* Main content — pages own their spacing */}
      <main id="main-content">
        {children}
      </main>
    </div>
  )
}
