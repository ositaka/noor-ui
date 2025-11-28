import { cn } from '@/lib/utils'
import { Info, AlertTriangle, AlertCircle, CheckCircle, LucideIcon } from 'lucide-react'

export type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'note'

export interface CalloutProps {
  children: React.ReactNode
  /** Type of callout - determines color and icon */
  type?: CalloutType
  /** Optional title */
  title?: string
  /** Custom icon to override the default */
  icon?: LucideIcon
  /** Additional CSS classes */
  className?: string
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: LucideIcon
    borderColor: string
    bgColor: string
    iconColor: string
    titleColor: string
  }
> = {
  info: {
    icon: Info,
    borderColor: 'border-blue-500/50',
    bgColor: 'bg-blue-500/5',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-700 dark:text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-yellow-500/50',
    bgColor: 'bg-yellow-500/5',
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-700 dark:text-yellow-400',
  },
  error: {
    icon: AlertCircle,
    borderColor: 'border-red-500/50',
    bgColor: 'bg-red-500/5',
    iconColor: 'text-red-500',
    titleColor: 'text-red-700 dark:text-red-400',
  },
  success: {
    icon: CheckCircle,
    borderColor: 'border-green-500/50',
    bgColor: 'bg-green-500/5',
    iconColor: 'text-green-500',
    titleColor: 'text-green-700 dark:text-green-400',
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
