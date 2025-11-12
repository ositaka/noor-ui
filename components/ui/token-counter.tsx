import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info, AlertTriangle } from 'lucide-react'

const tokenCounterVariants = cva(
  'rounded-lg border p-4 space-y-3',
  {
    variants: {
      variant: {
        default: 'bg-background',
        compact: 'p-3',
      },
      status: {
        safe: 'border-border',
        warning: 'border-yellow-500/50 bg-yellow-500/5',
        danger: 'border-destructive/50 bg-destructive/5',
      },
    },
    defaultVariants: {
      variant: 'default',
      status: 'safe',
    },
  }
)

export interface TokenCounterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tokenCounterVariants> {
  /**
   * Number of input tokens used
   */
  inputTokens: number
  /**
   * Number of output tokens used
   */
  outputTokens: number
  /**
   * Maximum token limit for the model
   */
  maxTokens?: number
  /**
   * Cost per 1K input tokens (USD)
   */
  inputCostPer1K?: number
  /**
   * Cost per 1K output tokens (USD)
   */
  outputCostPer1K?: number
  /**
   * Show cost estimation
   */
  showCost?: boolean
  /**
   * Show token breakdown
   */
  showBreakdown?: boolean
  /**
   * Warning threshold (percentage)
   */
  warningThreshold?: number
  /**
   * Danger threshold (percentage)
   */
  dangerThreshold?: number
  /**
   * Whether text direction is RTL
   */
  isRTL?: boolean
  /**
   * Label for the counter
   */
  label?: string
  /**
   * Label in Arabic
   */
  labelAr?: string
}

const TokenCounter = React.forwardRef<HTMLDivElement, TokenCounterProps>(
  (
    {
      className,
      variant,
      inputTokens = 0,
      outputTokens = 0,
      maxTokens = 4096,
      inputCostPer1K = 0.03,
      outputCostPer1K = 0.06,
      showCost = true,
      showBreakdown = true,
      warningThreshold = 70,
      dangerThreshold = 90,
      isRTL = false,
      label,
      labelAr,
      ...props
    },
    ref
  ) => {
    const totalTokens = inputTokens + outputTokens
    const percentage = maxTokens ? (totalTokens / maxTokens) * 100 : 0

    // Determine status based on thresholds
    const status = percentage >= dangerThreshold ? 'danger' : percentage >= warningThreshold ? 'warning' : 'safe'

    // Calculate costs
    const inputCost = (inputTokens / 1000) * inputCostPer1K
    const outputCost = (outputTokens / 1000) * outputCostPer1K
    const totalCost = inputCost + outputCost

    // Format numbers with commas
    const formatNumber = (num: number) => {
      return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US').format(num)
    }

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }).format(amount)
    }

    // Get progress color
    const getProgressColor = () => {
      if (status === 'danger') return 'bg-destructive'
      if (status === 'warning') return 'bg-yellow-500'
      return 'bg-primary'
    }

    const displayLabel = isRTL ? (labelAr || label || 'استخدام الرموز') : (label || 'Token Usage')

    return (
      <div
        ref={ref}
        className={cn(tokenCounterVariants({ variant, status }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{displayLabel}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center"
                  >
                    <Info className="h-3 w-3 text-muted-foreground" />
                    <span className="sr-only">{isRTL ? 'معلومات' : 'Information'}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    {isRTL
                      ? 'الرموز هي وحدات النص التي يعالجها النموذج. كلمة واحدة عادة ما تساوي 1-2 رمز.'
                      : 'Tokens are units of text processed by the model. One word typically equals 1-2 tokens.'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {status !== 'safe' && (
            <Badge variant={status === 'danger' ? 'destructive' : 'secondary'} className="text-xs">
              <AlertTriangle className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
              {isRTL
                ? status === 'danger'
                  ? 'قريب من الحد'
                  : 'تحذير'
                : status === 'danger'
                ? 'Near Limit'
                : 'Warning'}
            </Badge>
          )}
        </div>

        {/* Token Count */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{formatNumber(totalTokens)}</span>
            {maxTokens && (
              <span className="text-sm text-muted-foreground">
                {isRTL ? `من ${formatNumber(maxTokens)}` : `of ${formatNumber(maxTokens)}`}
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {percentage.toFixed(1)}%
          </span>
        </div>

        {/* Progress Bar */}
        {maxTokens && (
          <div className="space-y-1">
            <Progress value={percentage} className="h-2" indicatorClassName={getProgressColor()} />
          </div>
        )}

        {/* Token Breakdown */}
        {showBreakdown && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <div className="text-muted-foreground">
                {isRTL ? 'رموز الإدخال' : 'Input Tokens'}
              </div>
              <div className="font-medium">{formatNumber(inputTokens)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">
                {isRTL ? 'رموز الإخراج' : 'Output Tokens'}
              </div>
              <div className="font-medium">{formatNumber(outputTokens)}</div>
            </div>
          </div>
        )}

        {/* Cost Estimation */}
        {showCost && (inputCostPer1K || outputCostPer1K) && (
          <div className="border-t pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {isRTL ? 'التكلفة المقدرة' : 'Estimated Cost'}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="font-medium cursor-help">
                      {formatCurrency(totalCost)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between gap-4">
                        <span>{isRTL ? 'الإدخال:' : 'Input:'}</span>
                        <span>{formatCurrency(inputCost)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>{isRTL ? 'الإخراج:' : 'Output:'}</span>
                        <span>{formatCurrency(outputCost)}</span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-[10px] text-muted-foreground">
              {isRTL
                ? `${formatCurrency(inputCostPer1K)}/1K إدخال • ${formatCurrency(outputCostPer1K)}/1K إخراج`
                : `${formatCurrency(inputCostPer1K)}/1K input • ${formatCurrency(outputCostPer1K)}/1K output`}
            </div>
          </div>
        )}
      </div>
    )
  }
)

TokenCounter.displayName = 'TokenCounter'

export { TokenCounter, tokenCounterVariants }
