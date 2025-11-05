'use client'

import * as React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { type Theme } from '@/lib/tokens'

interface DesignSystemContextType {
  designTheme: Theme
  setDesignTheme: (theme: Theme) => void
}

const DesignSystemContext = React.createContext<DesignSystemContextType | undefined>(undefined)

function DesignSystemProviderInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [designTheme, setDesignThemeState] = React.useState<Theme>('minimal')

  // Initialize from URL param or localStorage
  React.useEffect(() => {
    const themeParam = searchParams.get('theme') as Theme
    if (themeParam && ['minimal', 'futuristic', 'cozy', 'artistic'].includes(themeParam)) {
      setDesignThemeState(themeParam)
      applyThemeToDocument(themeParam)
    } else {
      // Try to load from localStorage
      try {
        const stored = localStorage.getItem('design-theme') as Theme
        if (stored && ['minimal', 'futuristic', 'cozy', 'artistic'].includes(stored)) {
          setDesignThemeState(stored)
          applyThemeToDocument(stored)
        }
      } catch (e) {
        // Ignore
      }
    }
  }, [searchParams])

  // Apply theme to document
  React.useEffect(() => {
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
      {children}
    </DesignSystemContext.Provider>
  )
}

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={children}>
      <DesignSystemProviderInner>{children}</DesignSystemProviderInner>
    </React.Suspense>
  )
}

function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.classList.remove('theme-minimal', 'theme-futuristic', 'theme-cozy', 'theme-artistic')
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
