'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type Theme, themeConfig, applyTheme } from '@/lib/tokens'
import { Check } from 'lucide-react'

interface ThemeSwitcherProps {
  className?: string
  locale?: 'en' | 'ar'
}

export function ThemeSwitcher({ className, locale = 'en' }: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = React.useState<Theme>('minimal')

  React.useEffect(() => {
    applyTheme(currentTheme)
  }, [currentTheme])

  const themes: Theme[] = ['minimal', 'futuristic', 'cozy', 'artistic']

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {themes.map((theme) => {
          const config = themeConfig[theme]
          const isActive = currentTheme === theme

          return (
            <Card
              key={theme}
              className={cn(
                'cursor-pointer transition-all hover:shadow-lg',
                isActive && 'ring-2 ring-primary ring-offset-2'
              )}
              onClick={() => setCurrentTheme(theme)}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setCurrentTheme(theme)
                }
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">
                    {locale === 'ar' ? config.nameAr : config.name}
                  </CardTitle>
                  {isActive && (
                    <Check className="h-5 w-5 text-primary" aria-label="Selected" />
                  )}
                </div>
                <CardDescription>
                  {locale === 'ar' ? config.descriptionAr : config.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {(locale === 'ar' ? config.featuresAr : config.features).map(
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
            {locale === 'ar' ? 'معاينة السمة النشطة' : 'Active Theme Preview'}
          </CardTitle>
          <CardDescription>
            {locale === 'ar'
              ? 'شاهد كيف تبدو المكونات بالسمة المحددة'
              : 'See how components look with the selected theme'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
