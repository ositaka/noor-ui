'use client'

import * as React from 'react'
import { DirectionProvider } from './direction-provider'
import { DesignSystemProvider } from './design-system-provider'
import { GlobalThemeSwitcher } from '@/components/docs/global-theme-switcher'
import { Toaster } from '../ui/toaster'
import { TooltipProvider } from '../ui/tooltip'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider>
      <DesignSystemProvider>
        <TooltipProvider>
          {children}
          <GlobalThemeSwitcher />
          <Toaster />
        </TooltipProvider>
      </DesignSystemProvider>
    </DirectionProvider>
  )
}
