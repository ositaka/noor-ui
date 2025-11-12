import * as React from 'react'
import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

export interface ParameterPreset {
  label: string
  labelAr?: string
  value: number
  description?: string
  descriptionAr?: string
}

export interface ParameterSliderProps {
  /**
   * Parameter label
   */
  label: string
  /**
   * Parameter label in Arabic
   */
  labelAr?: string
  /**
   * Parameter description/tooltip
   */
  description?: string
  /**
   * Parameter description in Arabic
   */
  descriptionAr?: string
  /**
   * Current value
   */
  value: number
  /**
   * Callback when value changes
   */
  onValueChange: (value: number) => void
  /**
   * Minimum value
   */
  min?: number
  /**
   * Maximum value
   */
  max?: number
  /**
   * Step size
   */
  step?: number
  /**
   * Number of decimal places to display
   */
  decimals?: number
  /**
   * Preset values
   */
  presets?: ParameterPreset[]
  /**
   * Show value display
   */
  showValue?: boolean
  /**
   * Whether text direction is RTL
   */
  isRTL?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

const ParameterSlider = React.forwardRef<HTMLDivElement, ParameterSliderProps>(
  (
    {
      label,
      labelAr,
      description,
      descriptionAr,
      value,
      onValueChange,
      min = 0,
      max = 1,
      step = 0.1,
      decimals = 1,
      presets,
      showValue = true,
      isRTL = false,
      className,
    },
    ref
  ) => {
    const displayLabel = isRTL ? (labelAr || label) : label
    const displayDescription = isRTL ? (descriptionAr || description) : description

    const handleSliderChange = (values: number[]) => {
      onValueChange(values[0])
    }

    const handlePresetClick = (presetValue: number) => {
      onValueChange(presetValue)
    }

    return (
      <div ref={ref} className={cn('space-y-3', className)}>
        {/* Label and Value */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">{displayLabel}</Label>
            {displayDescription && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      type="button"
                    >
                      <Info className="h-3 w-3 text-muted-foreground" />
                      <span className="sr-only">
                        {isRTL ? 'معلومات' : 'Information'}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">{displayDescription}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {showValue && (
            <Badge variant="secondary" className="font-mono text-xs">
              {value.toFixed(decimals)}
            </Badge>
          )}
        </div>

        {/* Slider */}
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />

        {/* Range Labels */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{min.toFixed(decimals)}</span>
          <span>{max.toFixed(decimals)}</span>
        </div>

        {/* Presets */}
        {presets && presets.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-muted-foreground shrink-0">
              {isRTL ? 'إعدادات مسبقة:' : 'Presets:'}
            </span>
            <div className="flex flex-wrap gap-1">
              {presets.map((preset, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={value === preset.value ? 'default' : 'outline'}
                        size="sm"
                        className="h-6 text-xs px-2"
                        onClick={() => handlePresetClick(preset.value)}
                        type="button"
                      >
                        {isRTL ? (preset.labelAr || preset.label) : preset.label}
                      </Button>
                    </TooltipTrigger>
                    {(preset.description || preset.descriptionAr) && (
                      <TooltipContent>
                        <p className="text-xs">
                          {isRTL
                            ? (preset.descriptionAr || preset.description)
                            : preset.description}
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

ParameterSlider.displayName = 'ParameterSlider'

// Common presets for temperature
export const temperaturePresets: ParameterPreset[] = [
  {
    label: 'Precise',
    labelAr: 'دقيق',
    value: 0.3,
    description: 'More focused and deterministic',
    descriptionAr: 'أكثر تركيزاً وحسماً',
  },
  {
    label: 'Balanced',
    labelAr: 'متوازن',
    value: 0.7,
    description: 'Good balance between creativity and consistency',
    descriptionAr: 'توازن جيد بين الإبداع والاتساق',
  },
  {
    label: 'Creative',
    labelAr: 'إبداعي',
    value: 1.0,
    description: 'More random and creative',
    descriptionAr: 'أكثر عشوائية وإبداعاً',
  },
]

export { ParameterSlider }
