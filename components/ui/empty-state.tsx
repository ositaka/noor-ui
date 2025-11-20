'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
      role="status"
      aria-live="polite"
    >
      {icon && (
        <div className="mb-4 text-muted-foreground opacity-50">
          {React.cloneElement(icon as React.ReactElement, {
            className: cn(
              'h-16 w-16',
              (icon as React.ReactElement).props.className
            ),
          })}
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          {description}
        </p>
      )}

      {action && <div className="flex gap-2">{action}</div>}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'
