'use client'

import * as React from 'react'
import './mantras-theme.css'

/**
 * Root layout for the MyMantras example.
 * Applies the scoped .theme-mantras class on mount and restores
 * the previous theme on unmount (same pattern as esports gaming theme).
 */
export default function MyMantrasRootLayout({ children }: { children: React.ReactNode }) {
  const prevClasses = React.useRef<string[]>([])

  React.useEffect(() => {
    const html = document.documentElement
    // Capture existing theme classes
    prevClasses.current = Array.from(html.classList).filter((c) => c.startsWith('theme-'))
    // Remove existing theme classes
    html.classList.forEach((c) => {
      if (c.startsWith('theme-')) html.classList.remove(c)
    })
    // Apply mantras theme
    html.classList.add('theme-mantras')

    return () => {
      html.classList.remove('theme-mantras')
      prevClasses.current.forEach((c) => html.classList.add(c))
    }
  }, [])

  return <>{children}</>
}
