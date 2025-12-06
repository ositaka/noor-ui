'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './sheet'
import { ScrollArea } from './scroll-area'
import { Separator } from './separator'
import { UserMenu } from './user-menu'
import { NotificationCenter, type Notification } from './notification-center'
import { useDirection } from '../providers/direction-provider'
import { content } from '../../lib/i18n'
import { Menu, X } from 'lucide-react'

export interface NavItem {
  title: string
  titleAr: string
  href: string
  icon?: React.ReactNode
  badge?: string | number
  disabled?: boolean
}

export interface DashboardShellProps {
  children: React.ReactNode
  navItems?: NavItem[]
  user?: {
    name?: string
    email?: string
    image?: string
    initials?: string
  }
  notifications?: Notification[]
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onBillingClick?: () => void
  onTeamClick?: () => void
  onSupportClick?: () => void
  onLogout?: () => void
  onNotificationClick?: (notification: Notification) => void
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onClearAll?: () => void
  onRemove?: (id: string) => void
  logo?: React.ReactNode
  logoHref?: string
  sidebarWidth?: string
  className?: string
  /**
   * Custom actions to display in the header (before notifications and user menu)
   */
  headerActions?: React.ReactNode
  /**
   * Use relative positioning instead of fixed (useful for embedded examples)
   * @default false
   */
  relative?: boolean
}

function SidebarNav({ items, onNavClick }: { items: NavItem[]; onNavClick?: () => void }) {
  const pathname = usePathname()
  const { locale } = useDirection()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="space-y-1">
      {items.map((item, index) => {
        const isActive = pathname === item.href
        const title = locale === 'ar' ? item.titleAr : item.title

        return (
          <Link
            key={index}
            href={item.disabled ? '#' : item.href}
            onClick={() => {
              if (!item.disabled) {
                onNavClick?.()
              }
            }}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              isActive && 'bg-accent text-accent-foreground',
              item.disabled && 'pointer-events-none opacity-50'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon && (
              <span className="shrink-0" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="flex-1">{title}</span>
            {item.badge && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export function DashboardShell({
  children,
  navItems = [],
  user,
  notifications = [],
  onProfileClick,
  onSettingsClick,
  onBillingClick,
  onTeamClick,
  onSupportClick,
  onLogout,
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onRemove,
  logo,
  logoHref = '/',
  sidebarWidth = '16rem',
  className,
  headerActions,
  relative = false,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const { locale, direction } = useDirection()
  const t = content[locale]

  return (
    <div className={cn('min-h-screen bg-background', relative ? 'flex' : '', className)}>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'inset-y-0 start-0 z-30 hidden border-e bg-card lg:block',
          relative ? 'relative shrink-0' : 'fixed'
        )}
        style={{ width: sidebarWidth }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href={logoHref} className="flex items-center gap-2">
              {logo || (
                <span className="text-xl font-bold">
                  {t.ui.components.noorUI}
                </span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4" dir={direction}>
            <SidebarNav items={navItems} />
          </ScrollArea>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'z-40 lg:hidden',
              relative ? 'absolute top-4 start-4' : 'fixed top-4 start-4'
            )}
            aria-label={t.ui.components.menu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="start" className="w-80 p-0">
          {/* Visually hidden title for accessibility */}
          <SheetTitle className="sr-only">{t.ui.components.menu}</SheetTitle>
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
              <Link
                href={logoHref}
                className="flex items-center gap-2"
                onClick={() => setSidebarOpen(false)}
              >
                {logo || (
                  <span className="text-xl font-bold">
                    {t.ui.components.noorUI}
                  </span>
                )}
              </Link>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-3 py-4" dir={direction}>
              <SidebarNav items={navItems} onNavClick={() => setSidebarOpen(false)} />
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div
        className={cn('flex-1', !relative && 'lg:ps-[var(--sidebar-width)]')}
        style={{ '--sidebar-width': relative ? '0' : sidebarWidth } as React.CSSProperties}
      >
        {/* Header */}
        <header className={cn(
          'z-20 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6',
          relative ? 'relative' : 'sticky top-0'
        )}>
          <div className="flex flex-1 items-center gap-4 lg:gap-6">
            {/* Spacer for mobile menu button */}
            <div className="w-10 lg:hidden" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {headerActions}
            {notifications && notifications.length >= 0 && (
              <NotificationCenter
                notifications={notifications}
                onNotificationClick={onNotificationClick}
                onMarkAsRead={onMarkAsRead}
                onMarkAllAsRead={onMarkAllAsRead}
                onClearAll={onClearAll}
                onRemove={onRemove}
              />
            )}

            {user && (
              <UserMenu
                user={user}
                onProfileClick={onProfileClick}
                onSettingsClick={onSettingsClick}
                onBillingClick={onBillingClick}
                onTeamClick={onTeamClick}
                onSupportClick={onSupportClick}
                onLogout={onLogout}
              />
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
