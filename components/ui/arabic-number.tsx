import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { formatSAR, formatNumber, formatPercentage } from '../../lib/arabic-numbers'

// ============================================================================
// Types
// ============================================================================

export interface ArabicNumberProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof arabicNumberVariants> {
  /** The number to display */
  value: number
  /** Format type */
  format?: 'number' | 'currency' | 'percentage'
  /** Use Arabic-Indic numerals */
  useArabicNumerals?: boolean
  /** Locale for formatting */
  locale?: 'en' | 'ar'
  /** Number of decimal places */
  decimals?: number
  /** Visual style variant */
  variant?: 'default' | 'inline' | 'badge'
}

// ============================================================================
// Variants
// ============================================================================

const arabicNumberVariants = cva('tabular-nums', {
  variants: {
    variant: {
      default: 'font-semibold',
      inline: 'font-medium',
      badge: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

// ============================================================================
// Component
// ============================================================================

export const ArabicNumber = React.forwardRef<HTMLSpanElement, ArabicNumberProps>(
  (
    {
      value,
      format = 'number',
      useArabicNumerals = false,
      locale = 'en',
      decimals,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    // Auto-detect Arabic numerals based on locale if not explicitly set
    const shouldUseArabicNumerals = useArabicNumerals || locale === 'ar'

    // Format the number based on the format type
    const formatted = React.useMemo(() => {
      switch (format) {
        case 'currency':
          return formatSAR(value, {
            useArabicNumerals: shouldUseArabicNumerals,
            locale,
            decimals: decimals ?? 2,
          })
        case 'percentage':
          return formatPercentage(value, {
            useArabicNumerals: shouldUseArabicNumerals,
            locale,
            decimals: decimals ?? 1,
          })
        case 'number':
        default:
          return formatNumber(value, {
            useArabicNumerals: shouldUseArabicNumerals,
            locale,
            decimals,
          })
      }
    }, [value, format, shouldUseArabicNumerals, locale, decimals])

    return (
      <span ref={ref} className={cn(arabicNumberVariants({ variant }), className)} {...props}>
        {formatted}
      </span>
    )
  }
)

ArabicNumber.displayName = 'ArabicNumber'
