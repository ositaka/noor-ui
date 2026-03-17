'use client'

import * as React from 'react'
import './gaming-theme.css'

export default function EsportsLayout({ children }: { children: React.ReactNode }) {
  const prevClasses = React.useRef<string[]>([])

  React.useEffect(() => {
    // Store current theme classes before overriding
    const html = document.documentElement
    prevClasses.current = Array.from(html.classList).filter((c) => c.startsWith('theme-'))

    // Remove any existing theme and apply gaming
    html.classList.forEach((c) => {
      if (c.startsWith('theme-')) html.classList.remove(c)
    })
    html.classList.add('theme-gaming')

    return () => {
      // Restore previous theme on unmount
      html.classList.remove('theme-gaming')
      prevClasses.current.forEach((c) => html.classList.add(c))
    }
  }, [])

  return <>{children}</>
}
