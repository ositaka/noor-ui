'use client'

import * as React from 'react'
import { IconContext } from '@phosphor-icons/react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { type Theme } from '../../lib/tokens'

interface DesignSystemContextType {
  designTheme: Theme
  setDesignTheme: (theme: Theme) => void
}

const DesignSystemContext = React.createContext<DesignSystemContextType | undefined>(undefined)

interface DesignSystemProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

function DesignSystemProviderInner({ children, defaultTheme = 'cozy' }: DesignSystemProviderProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Resolve initial theme: URL param > localStorage > default
  // This avoids a flash caused by useState(default) triggering useEffect before localStorage is read
  const [designTheme, setDesignThemeState] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    const themeParam = new URLSearchParams(window.location.search).get('theme') as Theme
    if (themeParam) return themeParam
    try {
      const stored = localStorage.getItem('design-theme') as Theme
      if (stored) return stored
    } catch (e) { /* ignore */ }
    return defaultTheme
  })

  // Sync when URL search params change (e.g. navigating to ?theme=minimal)
  React.useEffect(() => {
    const themeParam = searchParams.get('theme') as Theme
    if (themeParam && themeParam !== designTheme) {
      setDesignThemeState(themeParam)
      applyThemeToDocument(themeParam)
    }
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  // Apply theme to document only when it actually changes (not on mount — theme-init.js handles that)
  const mounted = React.useRef(false)
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    applyThemeToDocument(designTheme)
  }, [designTheme])

  const setDesignTheme = React.useCallback((theme: Theme) => {
    setDesignThemeState(theme)
    applyThemeToDocument(theme)

    // Update URL
    const params = new URLSearchParams(searchParams.toString())
    params.set('theme', theme)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [pathname, router, searchParams])

  return (
    <DesignSystemContext.Provider value={{ designTheme, setDesignTheme }}>
      <IconContext.Provider value={{ weight: 'duotone', color: 'currentColor' }}>
        {children}
      </IconContext.Provider>
    </DesignSystemContext.Provider>
  )
}

export function DesignSystemProvider({ children, defaultTheme }: DesignSystemProviderProps) {
  return (
    <React.Suspense fallback={children}>
      <DesignSystemProviderInner defaultTheme={defaultTheme}>{children}</DesignSystemProviderInner>
    </React.Suspense>
  )
}

function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.classList.forEach(cls => {
    if (cls.startsWith('theme-')) root.classList.remove(cls)
  })
  root.classList.add(`theme-${theme}`)

  // Store in localStorage for persistence
  try {
    localStorage.setItem('design-theme', theme)
  } catch (e) {
    // Ignore localStorage errors
  }
}

export function useDesignSystem() {
  const context = React.useContext(DesignSystemContext)
  if (context === undefined) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider')
  }
  return context
}
