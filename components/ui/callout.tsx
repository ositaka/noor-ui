import { cn } from '@/lib/utils'
import { Info, Warning, WarningCircle, CheckCircle } from '@phosphor-icons/react'
import type { IconComponent } from '@/lib/types'

export type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'note'

export interface CalloutProps {
  children: React.ReactNode
  /** Type of callout - determines color and icon */
  type?: CalloutType
  /** Optional title */
  title?: string
  /** Custom icon to override the default */
  icon?: IconComponent
  /** Additional CSS classes */
  className?: string
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: IconComponent
    borderColor: string
    bgColor: string
    iconColor: string
    titleColor: string
  }
> = {
  info: {
    icon: Info,
    borderColor: 'border-info/50',
    bgColor: 'bg-info/5',
    iconColor: 'text-info',
    titleColor: 'text-info-foreground',
  },
  warning: {
    icon: Warning,
    borderColor: 'border-warning/50',
    bgColor: 'bg-warning/5',
    iconColor: 'text-warning',
    titleColor: 'text-warning-foreground',
  },
  error: {
    icon: WarningCircle,
    borderColor: 'border-destructive/50',
    bgColor: 'bg-destructive/5',
    iconColor: 'text-destructive',
    titleColor: 'text-destructive-foreground',
  },
  success: {
    icon: CheckCircle,
    borderColor: 'border-success/50',
    bgColor: 'bg-success/5',
    iconColor: 'text-success',
    titleColor: 'text-success-foreground',
  },
  note: {
    icon: Info,
    borderColor: 'border-primary/50',
    bgColor: 'bg-primary/5',
    iconColor: 'text-primary',
    titleColor: 'text-primary',
  },
}

/**
 * Callout - Highlighted content box for tips, warnings, errors, etc.
 *
 * Usage in MDX:
 * <Callout type="info" title="Did you know?">
 *   This is an informational callout.
 * </Callout>
 *
 * <Callout type="warning">
 *   Be careful with this operation!
 * </Callout>
 */
export function Callout({
  children,
  type = 'info',
  title,
  icon: CustomIcon,
  className,
}: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = CustomIcon || config.icon

  return (
    <div
      className={cn(
        'my-6 rounded-lg border-s-4 p-4 not-prose',
        config.borderColor,
        config.bgColor,
        className,
      )}
      role="note"
    >
      <div className="flex gap-3">
        <Icon className={cn('h-5 w-5 mt-0.5 shrink-0', config.iconColor)} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn('font-semibold mb-1', config.titleColor)}>
              {title}
            </p>
          )}
          <div className="text-sm text-foreground/90 [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Convenience components for common callout types
export function InfoCallout({ children, title, ...props }: Omit<CalloutProps, 'type'>) {
  return <Callout type="info" title={title} {...props}>{children}</Callout>
}

export function WarningCallout({ children, title, ...props }: Omit<CalloutProps, 'type'>) {
  return <Callout type="warning" title={title} {...props}>{children}</Callout>
}

export function ErrorCallout({ children, title, ...props }: Omit<CalloutProps, 'type'>) {
  return <Callout type="error" title={title} {...props}>{children}</Callout>
}

export function SuccessCallout({ children, title, ...props }: Omit<CalloutProps, 'type'>) {
  return <Callout type="success" title={title} {...props}>{children}</Callout>
}
