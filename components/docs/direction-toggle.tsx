'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeftRight } from 'lucide-react'
import { setDirection, getDirection, type Direction } from '@/lib/tokens'
import { setLocale } from '@/lib/i18n'

export function DirectionToggle() {
  const [currentDirection, setCurrentDirection] = React.useState<Direction>('ltr')

  React.useEffect(() => {
    setCurrentDirection(getDirection())
  }, [])

  const handleToggle = () => {
    const newDirection: Direction = currentDirection === 'ltr' ? 'rtl' : 'ltr'
    setDirection(newDirection)
    setLocale(newDirection === 'rtl' ? 'ar' : 'en')
    setCurrentDirection(newDirection)

    // Force a re-render of the entire app
    window.location.reload()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      aria-label={`Switch to ${currentDirection === 'ltr' ? 'Arabic (RTL)' : 'English (LTR)'}`}
    >
      <ArrowLeftRight className="h-4 w-4 me-2" />
      {currentDirection === 'ltr' ? 'العربية' : 'English'}
    </Button>
  )
}
