'use client'

import * as React from 'react'
import { type Direction } from '../../lib/tokens'

interface DirectionContextType {
  direction: Direction
  setDirection: (direction: Direction) => void
  locale: 'en' | 'ar'
  setLocale: (locale: 'en' | 'ar') => void
}

const DirectionContext = React.createContext<DirectionContextType | undefined>(undefined)

const STORAGE_KEY = 'noor-ui-locale'

interface DirectionProviderProps {
  children: React.ReactNode
  /** When provided, direction is controlled externally (e.g. Storybook toolbar) */
  controlledDirection?: Direction
  /** When provided, locale is controlled externally (e.g. Storybook toolbar) */
  controlledLocale?: 'en' | 'ar'
}

export function DirectionProvider({ children, controlledDirection, controlledLocale }: DirectionProviderProps) {
  const isControlled = controlledDirection !== undefined
  const [direction, setDirectionState] = React.useState<Direction>(controlledDirection ?? 'ltr')
  const [locale, setLocaleState] = React.useState<'en' | 'ar'>(controlledLocale ?? 'en')

  // Sync controlled props when they change (Storybook toolbar)
  React.useEffect(() => {
    if (controlledDirection !== undefined) {
      setDirectionState(controlledDirection)
    }
  }, [controlledDirection])

  React.useEffect(() => {
    if (controlledLocale !== undefined) {
      setLocaleState(controlledLocale)
    }
  }, [controlledLocale])

  React.useEffect(() => {
    // Skip document manipulation when controlled externally
    if (isControlled) return

    // Initialize from localStorage first, then fall back to document
    const savedLocale = localStorage.getItem(STORAGE_KEY) as 'en' | 'ar' | null
    const htmlLang = document.documentElement.lang as 'en' | 'ar'

    const initialLocale = savedLocale || (htmlLang === 'ar' ? 'ar' : 'en')
    const initialDirection = initialLocale === 'ar' ? 'rtl' : 'ltr'

    setDirectionState(initialDirection)
    setLocaleState(initialLocale)

    // Apply to document if different
    if (document.documentElement.dir !== initialDirection) {
      document.documentElement.dir = initialDirection
    }
    if (document.documentElement.lang !== initialLocale) {
      document.documentElement.lang = initialLocale
    }
  }, [isControlled])

  const setDirection = React.useCallback((newDirection: Direction) => {
    setDirectionState(newDirection)
    if (!isControlled) {
      document.documentElement.dir = newDirection
      document.documentElement.lang = newDirection === 'rtl' ? 'ar' : 'en'
    }
    const newLocale = newDirection === 'rtl' ? 'ar' : 'en'
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }, [isControlled])

  const setLocale = React.useCallback((newLocale: 'en' | 'ar') => {
    setLocaleState(newLocale)
    const newDirection = newLocale === 'ar' ? 'rtl' : 'ltr'
    setDirectionState(newDirection)
    if (!isControlled) {
      document.documentElement.dir = newDirection
      document.documentElement.lang = newLocale
    }
    localStorage.setItem(STORAGE_KEY, newLocale)
  }, [isControlled])

  return (
    <DirectionContext.Provider value={{ direction, setDirection, locale, setLocale }}>
      {children}
    </DirectionContext.Provider>
  )
}

export function useDirection() {
  const context = React.useContext(DirectionContext)
  if (context === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider')
  }
  return context
}

