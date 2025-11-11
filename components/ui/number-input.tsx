'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value?: number
  defaultValue?: number
  onChange?: (value: number | undefined) => void
  onValueChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  precision?: number
  showControls?: boolean
  formatDisplay?: (value: number) => string
  parseValue?: (value: string) => number | undefined
  allowNegative?: boolean
  allowDecimal?: boolean
  thousandsSeparator?: string | boolean
  decimalSeparator?: string
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      min,
      max,
      step = 1,
      precision = 0,
      showControls = true,
      formatDisplay,
      parseValue,
      allowNegative = true,
      allowDecimal = true,
      thousandsSeparator = false,
      decimalSeparator = '.',
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number | undefined>(
      controlledValue ?? defaultValue
    )
    const [displayValue, setDisplayValue] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const value = controlledValue !== undefined ? controlledValue : internalValue

    const formatNumber = (num: number | undefined): string => {
      if (num === undefined || isNaN(num)) return ''

      if (formatDisplay) {
        return formatDisplay(num)
      }

      let formatted = num.toFixed(precision)

      if (thousandsSeparator) {
        const separator = typeof thousandsSeparator === 'string' ? thousandsSeparator : ','
        const [integer, decimal] = formatted.split('.')
        const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
        formatted = decimal ? `${formattedInteger}${decimalSeparator}${decimal}` : formattedInteger
      }

      return formatted
    }

    const parseNumber = (str: string): number | undefined => {
      if (!str) return undefined

      if (parseValue) {
        return parseValue(str)
      }

      // Remove thousands separators
      let cleaned = str
      if (thousandsSeparator) {
        const separator = typeof thousandsSeparator === 'string' ? thousandsSeparator : ','
        cleaned = cleaned.replace(new RegExp(`\\${separator}`, 'g'), '')
      }

      // Replace custom decimal separator with standard dot
      if (decimalSeparator !== '.') {
        cleaned = cleaned.replace(decimalSeparator, '.')
      }

      const parsed = parseFloat(cleaned)
      return isNaN(parsed) ? undefined : parsed
    }

    const clampValue = (val: number | undefined): number | undefined => {
      if (val === undefined) return undefined

      let clamped = val

      if (min !== undefined && clamped < min) clamped = min
      if (max !== undefined && clamped > max) clamped = max

      // Apply precision
      if (precision > 0) {
        clamped = Math.round(clamped * Math.pow(10, precision)) / Math.pow(10, precision)
      } else {
        clamped = Math.round(clamped)
      }

      return clamped
    }

    const updateValue = (newValue: number | undefined) => {
      const clamped = clampValue(newValue)

      if (controlledValue === undefined) {
        setInternalValue(clamped)
      }

      onChange?.(clamped)
      onValueChange?.(clamped)
    }

    const increment = () => {
      if (disabled) return
      const current = value ?? 0
      updateValue(current + step)
    }

    const decrement = () => {
      if (disabled) return
      const current = value ?? 0
      updateValue(current - step)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value

      // Allow empty string
      if (inputValue === '' || inputValue === '-') {
        setDisplayValue(inputValue)
        updateValue(undefined)
        return
      }

      // Validate input characters
      const validChars = allowDecimal
        ? `0-9${allowNegative ? '\\-' : ''}${decimalSeparator !== '.' ? `\\${decimalSeparator}` : '\\.'}`
        : `0-9${allowNegative ? '\\-' : ''}`

      if (thousandsSeparator) {
        const separator = typeof thousandsSeparator === 'string' ? thousandsSeparator : ','
        validChars += `\\${separator}`
      }

      const regex = new RegExp(`^[${validChars}]+$`)
      if (!regex.test(inputValue)) return

      setDisplayValue(inputValue)

      const parsed = parseNumber(inputValue)
      if (parsed !== undefined) {
        updateValue(parsed)
      }
    }

    const handleBlur = () => {
      // Format the display value on blur
      setDisplayValue(formatNumber(value))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        increment()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        decrement()
      }
    }

    // Update display value when controlled value changes
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setDisplayValue(formatNumber(controlledValue))
      }
    }, [controlledValue])

    // Initialize display value
    React.useEffect(() => {
      setDisplayValue(formatNumber(value))
    }, [])

    const canIncrement = disabled || (max !== undefined && value !== undefined && value >= max)
    const canDecrement = disabled || (min !== undefined && value !== undefined && value <= min)

    if (!showControls) {
      return (
        <Input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={className}
          {...props}
        />
      )
    }

    return (
      <div className={cn('relative flex items-center', className)}>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-full rounded-e-none border-e-0"
          onClick={decrement}
          disabled={canDecrement}
          tabIndex={-1}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <Input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...props}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-full rounded-s-none border-s-0"
          onClick={increment}
          disabled={canIncrement}
          tabIndex={-1}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    )
  }
)

NumberInput.displayName = 'NumberInput'
