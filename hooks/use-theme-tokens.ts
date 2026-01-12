'use client'

import { useEffect, useState } from 'react'

/**
 * Convert HSL string (e.g., "239 84% 67%") to HEX color
 */
function hslToHex(hsl: string): string {
  const [h, s, l] = hsl.split(' ').map((v) => parseFloat(v))

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

  // If it's HSL format (e.g., "239 84% 67%"), convert to hex
  if (value.includes('%')) {
    return hslToHex(value)
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
    },
    radius: '0.5rem',
  })

  useEffect(() => {
    function updateTokens() {
      setTokens({
        colors: {
          background: getCSSVariable('--background'),
          foreground: getCSSVariable('--foreground'),
          primary: getCSSVariable('--primary'),
          primaryForeground: getCSSVariable('--primary-foreground'),
          secondary: getCSSVariable('--secondary'),
          secondaryForeground: getCSSVariable('--secondary-foreground'),
          muted: getCSSVariable('--muted'),
          mutedForeground: getCSSVariable('--muted-foreground'),
          accent: getCSSVariable('--accent'),
          accentForeground: getCSSVariable('--accent-foreground'),
          destructive: getCSSVariable('--destructive'),
          destructiveForeground: getCSSVariable('--destructive-foreground'),
          border: getCSSVariable('--border'),
          input: getCSSVariable('--input'),
          ring: getCSSVariable('--ring'),
          card: getCSSVariable('--card'),
          cardForeground: getCSSVariable('--card-foreground'),
          popover: getCSSVariable('--popover'),
          popoverForeground: getCSSVariable('--popover-foreground'),
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
