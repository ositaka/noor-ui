'use client'

import * as React from 'react'
import { Badge } from './badge'
import { Check, Shield, User, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type UserBadgeVariant = 'author' | 'moderator' | 'verified' | 'admin' | 'custom'

export interface UserBadgeProps {
  /**
   * Badge variant
   * - author: Post/content author
   * - moderator: Site moderator
   * - verified: Verified user
   * - admin: Administrator
   * - custom: Custom label
   */
  variant: UserBadgeVariant

  /**
   * Custom label (required for 'custom' variant)
   */
  label?: string

  /**
   * Optional icon override
   */
  icon?: React.ReactNode

  /**
   * Additional class name
   */
  className?: string
}

/**
 * User role/status badge component
 *
 * Displays badges for different user roles and statuses.
 * Useful for comments, profiles, leaderboards, and chat.
 *
 * @example
 * <UserBadge variant="author" />
 * <UserBadge variant="moderator" />
 * <UserBadge variant="verified" />
 * <UserBadge variant="custom" label="VIP" icon={<Crown />} />
 */
export function UserBadge({ variant, label, icon, className }: UserBadgeProps) {
  // Get variant configuration
  const getVariantConfig = () => {
    switch (variant) {
      case 'author':
        return {
          label: 'Author',
          icon: <User className="h-3 w-3" />,
          badgeVariant: 'secondary' as const,
        }
      case 'moderator':
        return {
          label: 'Moderator',
          icon: <Shield className="h-3 w-3" />,
          badgeVariant: 'outline' as const,
        }
      case 'verified':
        return {
          label: 'Verified',
          icon: <Check className="h-3 w-3" />,
          badgeVariant: 'default' as const,
        }
      case 'admin':
        return {
          label: 'Admin',
          icon: <Crown className="h-3 w-3" />,
          badgeVariant: 'destructive' as const,
        }
      case 'custom':
        return {
          label: label || 'Custom',
          icon: icon || null,
          badgeVariant: 'outline' as const,
        }
      default:
        return {
          label: 'Unknown',
          icon: null,
          badgeVariant: 'outline' as const,
        }
    }
  }

  const config = getVariantConfig()

  return (
    <Badge
      variant={config.badgeVariant}
      className={cn('inline-flex items-center gap-1 text-xs', className)}
    >
      {config.icon}
      <span>{config.label}</span>
    </Badge>
  )
}
