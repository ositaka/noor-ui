'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Bell, Check, Trash2, X } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'

export interface Notification {
  id: string
  title: string
  description?: string
  time: string
  read?: boolean
  icon?: React.ReactNode
  avatar?: string
}

export interface NotificationCenterProps {
  notifications?: Notification[]
  onNotificationClick?: (notification: Notification) => void
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onClearAll?: () => void
  onRemove?: (id: string) => void
  className?: string
  maxHeight?: string
}

const getRelativeTime = (time: string, locale: 'en' | 'ar'): string => {
  const now = new Date()
  const notifTime = new Date(time)
  const diffInMinutes = Math.floor((now.getTime() - notifTime.getTime()) / (1000 * 60))

  if (locale === 'ar') {
    if (diffInMinutes < 1) return 'الآن'
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`
    const hours = Math.floor(diffInMinutes / 60)
    if (hours < 24) return `منذ ${hours} ساعة`
    const days = Math.floor(hours / 24)
    return `منذ ${days} يوم`
  } else {
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const hours = Math.floor(diffInMinutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }
}

export const NotificationCenter = React.forwardRef<HTMLButtonElement, NotificationCenterProps>(
  (
    {
      notifications = [],
      onNotificationClick,
      onMarkAsRead,
      onMarkAllAsRead,
      onClearAll,
      onRemove,
      className,
      maxHeight = '400px',
    },
    ref
  ) => {
    const { locale } = useDirection()
    const [open, setOpen] = React.useState(false)

    // Bilingual text content
    const text = {
      en: {
        notifications: 'Notifications',
        noNotifications: 'No notifications',
        noNotificationsDesc: 'You\'re all caught up!',
        markAllAsRead: 'Mark all as read',
        clearAll: 'Clear all',
        markAsRead: 'Mark as read',
        remove: 'Remove',
      },
      ar: {
        notifications: 'الإشعارات',
        noNotifications: 'لا توجد إشعارات',
        noNotificationsDesc: 'لقد قرأت كل شيء!',
        markAllAsRead: 'وضع علامة مقروء على الكل',
        clearAll: 'مسح الكل',
        markAsRead: 'وضع علامة كمقروء',
        remove: 'إزالة',
      },
    }
    const t = text[locale]

    const unreadCount = notifications.filter((n) => !n.read).length

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size="sm"
            className={cn('relative', className)}
            aria-label={t.notifications}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -end-1 h-5 min-w-5 rounded-full px-1 text-xs"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-0" align="end">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="font-semibold text-sm">{t.notifications}</h3>
            {notifications.length > 0 && (
              <div className="flex items-center gap-1">
                {unreadCount > 0 && onMarkAllAsRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={onMarkAllAsRead}
                  >
                    <Check className="h-3 w-3 me-1" />
                    {t.markAllAsRead}
                  </Button>
                )}
                {onClearAll && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                    onClick={onClearAll}
                  >
                    <Trash2 className="h-3 w-3 me-1" />
                    {t.clearAll}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
              <p className="font-medium text-sm">{t.noNotifications}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.noNotificationsDesc}</p>
            </div>
          ) : (
            <ScrollArea style={{ maxHeight }}>
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    role="button"
                    tabIndex={0}
                    className={cn(
                      'group relative flex gap-3 p-4 transition-colors',
                      'hover:bg-accent cursor-pointer',
                      !notification.read && 'bg-accent/50'
                    )}
                    onClick={() => {
                      onNotificationClick?.(notification)
                      if (!notification.read) {
                        onMarkAsRead?.(notification.id)
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onNotificationClick?.(notification)
                        if (!notification.read) {
                          onMarkAsRead?.(notification.id)
                        }
                      }
                    }}
                  >
                    {/* Icon/Avatar */}
                    <div className="shrink-0">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : notification.icon ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {notification.icon}
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Bell className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                        )}
                      </div>
                      {notification.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {getRelativeTime(notification.time, locale)}
                      </p>
                    </div>

                    {/* Actions */}
                    {onRemove && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 end-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove(notification.id)
                        }}
                        aria-label={t.remove}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </PopoverContent>
      </Popover>
    )
  }
)

NotificationCenter.displayName = 'NotificationCenter'
