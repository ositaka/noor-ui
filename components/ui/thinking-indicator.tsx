import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { useDirection } from '../providers/direction-provider'
import { content } from '../../lib/i18n'

const thinkingIndicatorVariants = cva(
  'inline-flex items-center gap-1',
  {
    variants: {
      variant: {
        dots: '',
        pulse: '',
        wave: '',
        typing: '',
      },
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'dots',
      size: 'default',
    },
  }
)

export interface ThinkingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thinkingIndicatorVariants> {
  /**
   * Custom message to display (overrides default)
   */
  message?: string
}

const ThinkingIndicator = React.forwardRef<HTMLDivElement, ThinkingIndicatorProps>(
  (
    {
      className,
      variant = 'dots',
      size,
      message,
      ...props
    },
    ref
  ) => {
    const { locale } = useDirection()
    const t = content[locale]
    const displayMessage = message || t.ui.components.thinking

    const renderAnimation = () => {
      switch (variant) {
        case 'dots':
          return (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
              <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
              <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
            </div>
          )

        case 'pulse':
          return (
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
              <div className="h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:0.2s]" />
              <div className="h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:0.4s]" />
            </div>
          )

        case 'wave':
          return (
            <div className="flex items-center gap-0.5">
              <div className="h-1 w-1 rounded-full bg-current animate-[wave_1s_ease-in-out_infinite]" />
              <div className="h-2 w-1 rounded-full bg-current animate-[wave_1s_ease-in-out_infinite_0.1s]" />
              <div className="h-3 w-1 rounded-full bg-current animate-[wave_1s_ease-in-out_infinite_0.2s]" />
              <div className="h-2 w-1 rounded-full bg-current animate-[wave_1s_ease-in-out_infinite_0.3s]" />
              <div className="h-1 w-1 rounded-full bg-current animate-[wave_1s_ease-in-out_infinite_0.4s]" />
            </div>
          )

        case 'typing':
          return (
            <div className="flex items-center gap-1 px-3 py-2 bg-muted rounded-lg">
              <div className="h-1.5 w-1.5 rounded-full bg-current animate-[typing_1.4s_ease-in-out_infinite]" />
              <div className="h-1.5 w-1.5 rounded-full bg-current animate-[typing_1.4s_ease-in-out_infinite_0.2s]" />
              <div className="h-1.5 w-1.5 rounded-full bg-current animate-[typing_1.4s_ease-in-out_infinite_0.4s]" />
            </div>
          )
      }
    }

    return (
      <div
        ref={ref}
        className={cn(thinkingIndicatorVariants({ variant, size }), 'text-muted-foreground', className)}
        role="status"
        aria-live="polite"
        aria-label={displayMessage}
        {...props}
      >
        {message ? (
          <>
            <span className='me-1'>{displayMessage}</span>
            {renderAnimation()}
          </>
        ) : (
          renderAnimation()
        )}
      </div>
    )
  }
)

ThinkingIndicator.displayName = 'ThinkingIndicator'

// Add keyframes to global CSS
const keyframes = `
@keyframes wave {
  0%, 100% { height: 0.25rem; }
  50% { height: 0.75rem; }
}

@keyframes typing {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}
`

export { ThinkingIndicator, thinkingIndicatorVariants, keyframes }
