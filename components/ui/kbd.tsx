'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Array of keys to display
   * Use 'mod' for Cmd/Ctrl (platform-aware)
   * @example ['mod', 'enter'] -> ⌘↵ on Mac, Ctrl↵ on Windows
   */
  keys?: string[]
  /**
   * Variant style
   */
  variant?: 'default' | 'outline' | 'ghost'
  /**
   * Size
   */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Kbd component for displaying keyboard shortcuts
 *
 * Features:
 * - Platform-aware (⌘ on Mac, Ctrl on Windows/Linux)
 * - RTL/LTR support
 * - Multiple variants
 * - Key combination support
 *
 * @example
 * <Kbd keys={['mod', 'enter']} />
 * <Kbd keys={['esc']} />
 * <Kbd keys={['shift', 'k']} />
 */
export function Kbd({
  keys = [],
  variant = 'default',
  size = 'sm',
  className,
  children,
  ...props
}: KbdProps) {
  const [isMac, setIsMac] = React.useState(false)

  // Detect platform
  React.useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes('mac'))
  }, [])

  // Convert key name to display symbol/text
  const getKeyDisplay = (key: string): string => {
    const keyMap: Record<string, { mac: string; other: string }> = {
      mod: { mac: '⌘', other: 'Ctrl' },
      cmd: { mac: '⌘', other: 'Cmd' },
      ctrl: { mac: 'Ctrl', other: 'Ctrl' },
      shift: { mac: '⇧', other: 'Shift' },
      alt: { mac: '⌥', other: 'Alt' },
      option: { mac: '⌥', other: 'Option' },
      enter: { mac: '↵', other: '↵' },
      return: { mac: '↵', other: 'Return' },
      backspace: { mac: '⌫', other: 'Backspace' },
      delete: { mac: '⌦', other: 'Del' },
      esc: { mac: 'Esc', other: 'Esc' },
      escape: { mac: 'Esc', other: 'Esc' },
      tab: { mac: '⇥', other: 'Tab' },
      space: { mac: 'Space', other: 'Space' },
      up: { mac: '↑', other: '↑' },
      down: { mac: '↓', other: '↓' },
      left: { mac: '←', other: '←' },
      right: { mac: '→', other: '→' },
    }

    const normalized = key.toLowerCase()
    const mapping = keyMap[normalized]

    if (mapping) {
      return isMac ? mapping.mac : mapping.other
    }

    // For single letters/numbers, just capitalize
    return key.length === 1 ? key.toUpperCase() : key
  }

  // Variant styles
  const variantStyles = {
    default: 'bg-background/10 dark:bg-foreground/10 border-border text-foreground/70 shadow-sm',
    outline: 'bg-background border-border text-foreground',
    ghost: 'bg-foreground/90 dark:bg-foreground/20 border-foreground/10 text-background dark:text-foreground',
  }

  // Size styles
  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 min-w-[1.25rem] h-5',
    md: 'text-[11px] px-2 py-1 min-w-[1.75rem] h-6',
    lg: 'text-xs px-2.5 py-1.5 min-w-[2.25rem] h-7',
  }

  const displayKeys = keys.length > 0 ? keys : [children?.toString() || '']

  return (
    <kbd
      dir="ltr"
      className={cn(
        'inline-flex items-center justify-center gap-1',
        'font-medium font-mono',
        'border rounded-md',
        'transition-colors',
        'leading-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {displayKeys.map((key, index) => {
        const displayValue = getKeyDisplay(key)
        const isEnterIcon = displayValue === '↵'

        return (
          <span
            key={index}
            className={cn(
              'inline-flex items-center',
              isEnterIcon && 'mb-0.5'
            )}
          >
            {displayValue}
          </span>
        )
      })}
    </kbd>
  )
}
