'use client'

import * as React from 'react'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InterestRatingProps {
  value: number
  onValueChange?: (value: number) => void
  label?: string
  showPercentage?: boolean
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export function InterestRating({
  value,
  onValueChange,
  label,
  showPercentage = true,
  showLabel = true,
  size = 'md',
  className,
  disabled = false,
}: InterestRatingProps) {
  // Color based on interest level
  const getColor = (val: number) => {
    if (val >= 67) return 'text-green-500'
    if (val >= 34) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getBgColor = (val: number) => {
    if (val >= 67) return 'bg-green-50 dark:bg-green-950'
    if (val >= 34) return 'bg-yellow-50 dark:bg-yellow-950'
    return 'bg-red-50 dark:bg-red-950'
  }

  const getBorderColor = (val: number) => {
    if (val >= 67) return 'border-green-200 dark:border-green-800'
    if (val >= 34) return 'border-yellow-200 dark:border-yellow-800'
    return 'border-red-200 dark:border-red-800'
  }

  const sizeClasses = {
    sm: {
      heart: 'h-4 w-4',
      text: 'text-sm',
      padding: 'p-2',
    },
    md: {
      heart: 'h-5 w-5',
      text: 'text-base',
      padding: 'p-3',
    },
    lg: {
      heart: 'h-6 w-6',
      text: 'text-lg',
      padding: 'p-4',
    },
  }

  return (
    <div className={cn('space-y-3', className)}>
      {showLabel && label && (
        <Label className="text-sm font-medium">{label}</Label>
      )}

      <div
        className={cn(
          'flex items-center gap-4 rounded-lg border transition-colors',
          sizeClasses[size].padding,
          getBgColor(value),
          getBorderColor(value),
          disabled && 'opacity-50'
        )}
      >
        {/* Heart Icon with fill based on percentage */}
        <div className="relative flex-shrink-0">
          <Heart className={cn(sizeClasses[size].heart, 'text-muted-foreground/20')} />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(${100 - value}% 0 0 0)` }}
          >
            <Heart
              className={cn(sizeClasses[size].heart, getColor(value))}
              fill="currentColor"
            />
          </div>
        </div>

        {/* Slider */}
        <div className="flex-1">
          <Slider
            value={[value]}
            onValueChange={(val) => onValueChange?.(val[0])}
            min={0}
            max={100}
            step={1}
            disabled={disabled}
            className="w-full"
          />
        </div>

        {/* Percentage */}
        {showPercentage && (
          <div
            className={cn(
              'font-bold flex-shrink-0 min-w-[3ch] text-end',
              sizeClasses[size].text,
              getColor(value)
            )}
          >
            {value}%
          </div>
        )}
      </div>
    </div>
  )
}

// Compact version for cards
export function InterestRatingCompact({
  value,
  size = 'sm',
  className,
}: {
  value: number
  size?: 'sm' | 'md'
  className?: string
}) {
  const getColor = (val: number) => {
    if (val >= 67) return 'text-green-500'
    if (val >= 34) return 'text-yellow-500'
    return 'text-red-500'
  }

  const sizeClasses = {
    sm: { heart: 'h-4 w-4', text: 'text-xs' },
    md: { heart: 'h-5 w-5', text: 'text-sm' },
  }

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="relative flex-shrink-0">
        <Heart className={cn(sizeClasses[size].heart, 'text-muted-foreground/20')} />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(${100 - value}% 0 0 0)` }}
        >
          <Heart
            className={cn(sizeClasses[size].heart, getColor(value))}
            fill="currentColor"
          />
        </div>
      </div>
      <span className={cn('font-semibold', sizeClasses[size].text, getColor(value))}>
        {value}%
      </span>
    </div>
  )
}
