import * as React from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

export function LoadingSpinnerComponent({
  size = 'md',
  text,
  className,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-2', className)}
      role="status"
      aria-live="polite"
      aria-label={text || 'Loading...'}
      {...props}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary',
          sizeMap[size]
        )}
      />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
      <span className="sr-only">{text || 'Loading...'}</span>
    </div>
  )
}

export const LoadingSpinner = React.memo(LoadingSpinnerComponent)
LoadingSpinner.displayName = 'LoadingSpinner'
