'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type Theme, themeConfig } from '@/lib/tokens'
import { Check } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { direction, locale } = useDirection()
  const t = content[locale]
  const isRTL = direction === 'rtl'
  const [mounted, setMounted] = React.useState(false)
  const [designTheme, setDesignThemeState] = React.useState<Theme>('minimal')

  const themes: Theme[] = ['minimal', 'futuristic', 'cozy', 'artistic']

  React.useEffect(() => {
    setMounted(true)
    // Get theme from DOM after mounting
    const theme = document.documentElement.className.match(/theme-(\w+)/)?.[1] as Theme || 'minimal'
    setDesignThemeState(theme)

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.className.match(/theme-(\w+)/)?.[1] as Theme || 'minimal'
      setDesignThemeState(newTheme)
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const setDesignTheme = React.useCallback((theme: Theme) => {
    if (!mounted) return

    // Manually update the DOM
    const root = document.documentElement
    root.classList.remove('theme-minimal', 'theme-futuristic', 'theme-cozy', 'theme-artistic')
    root.classList.add(`theme-${theme}`)

    // Update URL
    const params = new URLSearchParams(window.location.search)
    params.set('theme', theme)
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)

    // Store in localStorage
    try {
      localStorage.setItem('design-theme', theme)
    } catch (e) {
      // Ignore
    }

    setDesignThemeState(theme)
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {themes.map((theme) => {
          const config = themeConfig[theme]
          const isActive = designTheme === theme

          return (
            <Card
              key={theme}
              className={cn(
                'cursor-pointer transition-all hover:shadow-lg',
                isActive && 'ring-2 ring-primary ring-offset-2'
              )}
              onClick={() => setDesignTheme(theme)}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setDesignTheme(theme)
                }
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">
                    {isRTL ? config.nameAr : config.name}
                  </CardTitle>
                  {isActive && (
                    <Check className="h-5 w-5 text-primary" aria-label="Selected" />
                  )}
                </div>
                <CardDescription>
                  {isRTL ? config.descriptionAr : config.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {(isRTL ? config.featuresAr : config.features).map(
                    (feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Active Theme Preview */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t.ui.components.activeThemePreview}
          </CardTitle>
          <CardDescription>
            {t.ui.components.seeHowComponentsLook}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">
              {t.ui.components.primary}
            </Button>
            <Button variant="secondary">
              {t.ui.components.secondary}
            </Button>
            <Button variant="outline">
              {t.ui.components.outline}
            </Button>
            <Button variant="ghost">
              {t.ui.components.ghost}
            </Button>
            <Button variant="destructive">
              {t.ui.components.destructive}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
