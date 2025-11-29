'use client'

import * as React from 'react'
import { Slider } from './slider'
import { cn } from '../../lib/utils'

export interface RangeSliderProps {
  /** Minimum value of the range */
  min?: number
  /** Maximum value of the range */
  max?: number
  /** Step increment */
  step?: number
  /** Current range value [min, max] */
  value?: [number, number]
  /** Default range value [min, max] */
  defaultValue?: [number, number]
  /** Callback when range changes */
  onValueChange?: (value: [number, number]) => void
  /** Format function for labels (e.g., price formatting) */
  formatLabel?: (value: number) => string
  /** Show labels above thumbs */
  showLabels?: boolean
  /** Show min/max labels */
  showMinMax?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Additional className */
  className?: string
  /** Direction override */
  dir?: 'ltr' | 'rtl'
}

export const RangeSlider = React.forwardRef<
  HTMLDivElement,
  RangeSliderProps
>(({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = [min, max],
  onValueChange,
  formatLabel = (val) => val.toString(),
  showLabels = false,
  showMinMax = false,
  disabled = false,
  className,
  dir,
}, ref) => {
  const [internalValue, setInternalValue] = React.useState<number[]>(
    value || defaultValue
  )

  React.useEffect(() => {
    if (value) {
      setInternalValue(value)
    }
  }, [value])

  const handleValueChange = (newValue: number[]) => {
    if (!value) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue as [number, number])
  }

  const currentValue = value || internalValue
  const [minVal, maxVal] = currentValue

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {/* Labels above thumbs */}
      {showLabels && (
        <div className="relative mb-2 flex justify-between text-sm font-medium">
          <span className="text-muted-foreground">
            {formatLabel(minVal)}
          </span>
          <span className="text-muted-foreground">
            {formatLabel(maxVal)}
          </span>
        </div>
      )}

      {/* Slider */}
      <Slider
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        dir={dir}
      />

      {/* Min/Max labels */}
      {showMinMax && (
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{formatLabel(min)}</span>
          <span>{formatLabel(max)}</span>
        </div>
      )}
    </div>
  )
})

RangeSlider.displayName = 'RangeSlider'
