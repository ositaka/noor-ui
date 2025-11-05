'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Palette, X } from 'lucide-react'
import { useDesignSystem } from '@/components/providers/design-system-provider'
import { type Theme, themeConfig } from '@/lib/tokens'
import { cn } from '@/lib/utils'

export function GlobalThemeSwitcher() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Only render on client
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <GlobalThemeSwitcherContent isOpen={isOpen} setIsOpen={setIsOpen} />
}

function GlobalThemeSwitcherContent({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const { designTheme, setDesignTheme } = useDesignSystem()
  const themes: Theme[] = ['minimal', 'futuristic', 'cozy', 'artistic']

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 end-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Theme Switcher"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Palette className="h-6 w-6" />}
        </Button>
      </div>

      {/* Theme Picker Panel */}
      {isOpen && (
        <div className="fixed bottom-24 end-6 z-50 animate-in slide-in-from-bottom-2">
          <Card className="w-72 shadow-xl">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-sm">Design Theme</h3>
              <div className="grid gap-2">
                {themes.map((theme) => {
                  const config = themeConfig[theme]
                  const isActive = designTheme === theme

                  return (
                    <button
                      key={theme}
                      onClick={() => {
                        setDesignTheme(theme)
                        setIsOpen(false)
                      }}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-start',
                        isActive
                          ? 'border-primary bg-primary/10'
                          : 'border-transparent hover:border-muted-foreground/20 hover:bg-accent'
                      )}
                    >
                      <div
                        className={cn(
                          'h-4 w-4 rounded-full flex-shrink-0',
                          theme === 'minimal' && 'bg-neutral-400',
                          theme === 'futuristic' && 'bg-gradient-to-r from-purple-500 to-cyan-500',
                          theme === 'cozy' && 'bg-gradient-to-r from-amber-400 to-orange-500',
                          theme === 'artistic' && 'bg-gradient-to-r from-violet-500 to-amber-400'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{config.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {config.description}
                        </div>
                      </div>
                      {isActive && (
                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Theme persists across pages via URL parameter
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
