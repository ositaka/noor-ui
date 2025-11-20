'use client'

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { useDirection } from '../providers/direction-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { cn } from '../../lib/utils'
import { User, Settings, LogOut, CreditCard, Users, HelpCircle } from 'lucide-react'

export interface UserMenuProps {
  user?: {
    name?: string
    email?: string
    image?: string
    initials?: string
  }
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onBillingClick?: () => void
  onTeamClick?: () => void
  onSupportClick?: () => void
  onLogout?: () => void
  className?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const UserMenu = React.forwardRef<HTMLButtonElement, UserMenuProps>(
  (
    {
      user = {
        name: 'User',
        email: 'user@example.com',
      },
      onProfileClick,
      onSettingsClick,
      onBillingClick,
      onTeamClick,
      onSupportClick,
      onLogout,
      className,
      align = 'end',
      side = 'bottom',
    },
    ref
  ) => {
    const { locale } = useDirection()
    const initials = user.initials || (user.name ? getInitials(user.name) : 'U')

    // Bilingual text content
    const text = {
      en: {
        profile: 'Profile',
        settings: 'Settings',
        billing: 'Billing',
        team: 'Team',
        support: 'Support',
        logout: 'Log out',
      },
      ar: {
        profile: 'الملف الشخصي',
        settings: 'الإعدادات',
        billing: 'الفوترة',
        team: 'الفريق',
        support: 'الدعم',
        logout: 'تسجيل الخروج',
      },
    }
    const t = text[locale]

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          ref={ref}
          className={cn(
            'rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            className
          )}
          aria-label="User menu"
        >
          <Avatar>
            <AvatarImage src={user.image} alt={user.name || 'User'} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align={align} side={side} className="w-56">
          {/* User Info */}
          {(user.name || user.email) && (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  {user.name && (
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                  )}
                  {user.email && (
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}

          {/* Menu Items */}
          <DropdownMenuGroup>
            {onProfileClick && (
              <DropdownMenuItem onClick={onProfileClick}>
                <User className="h-4 w-4 me-2" />
                <span>{t.profile}</span>
              </DropdownMenuItem>
            )}

            {onSettingsClick && (
              <DropdownMenuItem onClick={onSettingsClick}>
                <Settings className="h-4 w-4 me-2" />
                <span>{t.settings}</span>
              </DropdownMenuItem>
            )}

            {onBillingClick && (
              <DropdownMenuItem onClick={onBillingClick}>
                <CreditCard className="h-4 w-4 me-2" />
                <span>{t.billing}</span>
              </DropdownMenuItem>
            )}

            {onTeamClick && (
              <DropdownMenuItem onClick={onTeamClick}>
                <Users className="h-4 w-4 me-2" />
                <span>{t.team}</span>
              </DropdownMenuItem>
            )}

            {onSupportClick && (
              <DropdownMenuItem onClick={onSupportClick}>
                <HelpCircle className="h-4 w-4 me-2" />
                <span>{t.support}</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>

          {/* Logout */}
          {onLogout && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 me-2" />
                <span>{t.logout}</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

UserMenu.displayName = 'UserMenu'
