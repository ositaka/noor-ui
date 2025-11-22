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

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirectionState] = React.useState<Direction>('ltr')
  const [locale, setLocaleState] = React.useState<'en' | 'ar'>('en')

  React.useEffect(() => {
    // Initialize from localStorage first, then fall back to document
    const savedLocale = localStorage.getItem(STORAGE_KEY) as 'en' | 'ar' | null
    const htmlDir = document.documentElement.dir as Direction
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
  }, [])

  const setDirection = React.useCallback((newDirection: Direction) => {
    setDirectionState(newDirection)
    document.documentElement.dir = newDirection
    const newLocale = newDirection === 'rtl' ? 'ar' : 'en'
    setLocaleState(newLocale)
    document.documentElement.lang = newLocale
    localStorage.setItem(STORAGE_KEY, newLocale)
  }, [])

  const setLocale = React.useCallback((newLocale: 'en' | 'ar') => {
    setLocaleState(newLocale)
    const newDirection = newLocale === 'ar' ? 'rtl' : 'ltr'
    setDirectionState(newDirection)
    document.documentElement.dir = newDirection
    document.documentElement.lang = newLocale
    localStorage.setItem(STORAGE_KEY, newLocale)
  }, [])

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

