'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeftRight } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'

export function DirectionToggle() {
  const { direction, setDirection } = useDirection()

  const handleToggle = () => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr'
    setDirection(newDirection)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      aria-label={`Switch to ${direction === 'ltr' ? 'Arabic (RTL)' : 'English (LTR)'}`}
    >
      <ArrowLeftRight className="h-4 w-4 me-2" />
      {direction === 'ltr' ? 'العربية' : 'English'}
    </Button>
  )
}
