'use client'

import { useEffect, useState } from 'react'

/**
 * Convert HSL string (e.g., "239 84% 67%") to HEX color
 */
function hslToHex(hsl: string): string {
  // Strip hsl()/hsla() wrappers if present
  const cleaned = hsl.replace(/^hsla?\(/, '').replace(/\)$/, '').replace(/,/g, ' ')
  const parts = cleaned.split(/\s+/).filter(Boolean).map((v) => parseFloat(v))

  if (parts.length < 3 || parts.some(isNaN)) return `hsl(${hsl})`

  const [h, s, l] = parts

  const sDecimal = s / 100
  const lDecimal = l / 100

  const c = (1 - Math.abs(2 * lDecimal - 1)) * sDecimal
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lDecimal - c / 2

  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  const rHex = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, '0')
  const gHex = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, '0')
  const bHex = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, '0')

  return `#${rHex}${gHex}${bHex}`
}

/**
 * Get a CSS custom property value and convert it to HEX
 */
function getCSSVariable(name: string): string {
  if (typeof window === 'undefined') return '#000000'

  const style = getComputedStyle(document.documentElement)
  const value = style.getPropertyValue(name).trim()

  if (!value) return '#000000'

  // If it's already a hex color, return it
  if (value.startsWith('#')) return value

  // If it's HSL format (e.g., "239 84% 67%" or "hsl(239 84% 67%)"), convert to hex
  if (value.includes('%')) {
    const hex = hslToHex(value)
    // Validate hex output — fall back to hsl() if conversion failed
    if (/^#[0-9a-f]{6}$/i.test(hex)) return hex
    return `hsl(${value.replace(/^hsla?\(/, '').replace(/\)$/, '')})`
  }

  return value
}

/**
 * Custom hook to get live theme tokens from CSS custom properties
 */
export function useThemeTokens() {
  const [tokens, setTokens] = useState({
    colors: {
      background: '#ffffff',
      foreground: '#000000',
      primary: '#6366f1',
      primaryForeground: '#ffffff',
      secondary: '#14b8a6',
      secondaryForeground: '#000000',
      muted: '#f5f5f5',
      mutedForeground: '#737373',
      accent: '#f5f5f5',
      accentForeground: '#000000',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      border: '#e5e5e5',
      input: '#e5e5e5',
      ring: '#6366f1',
      card: '#ffffff',
      cardForeground: '#000000',
      popover: '#ffffff',
      popoverForeground: '#000000',
      success: '#22c55e',
      successForeground: '#15803d',
      warning: '#f59e0b',
      warningForeground: '#92400e',
      info: '#3b82f6',
      infoForeground: '#1d4ed8',
    },
    radius: '0.5rem',
  })

  useEffect(() => {
    function updateTokens() {
      setTokens({
        colors: {
          background: getCSSVariable('--color-background'),
          foreground: getCSSVariable('--color-foreground'),
          primary: getCSSVariable('--color-primary'),
          primaryForeground: getCSSVariable('--color-primary-foreground'),
          secondary: getCSSVariable('--color-secondary'),
          secondaryForeground: getCSSVariable('--color-secondary-foreground'),
          muted: getCSSVariable('--color-muted'),
          mutedForeground: getCSSVariable('--color-muted-foreground'),
          accent: getCSSVariable('--color-accent'),
          accentForeground: getCSSVariable('--color-accent-foreground'),
          destructive: getCSSVariable('--color-destructive'),
          destructiveForeground: getCSSVariable('--color-destructive-foreground'),
          border: getCSSVariable('--color-border'),
          input: getCSSVariable('--color-input'),
          ring: getCSSVariable('--color-ring'),
          card: getCSSVariable('--color-card'),
          cardForeground: getCSSVariable('--color-card-foreground'),
          popover: getCSSVariable('--color-popover'),
          popoverForeground: getCSSVariable('--color-popover-foreground'),
          success: getCSSVariable('--color-success'),
          successForeground: getCSSVariable('--color-success-foreground'),
          warning: getCSSVariable('--color-warning'),
          warningForeground: getCSSVariable('--color-warning-foreground'),
          info: getCSSVariable('--color-info'),
          infoForeground: getCSSVariable('--color-info-foreground'),
        },
        radius: getComputedStyle(document.documentElement)
          .getPropertyValue('--radius')
          .trim() || '0.5rem',
      })
    }

    // Update tokens on mount
    updateTokens()

    // Watch for class changes on documentElement (theme/mode changes)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'class' || mutation.attributeName === 'dir')
        ) {
          updateTokens()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'dir'],
    })

    return () => observer.disconnect()
  }, [])

  return tokens
}
