'use client'

import * as React from 'react'
import { DirectionProvider } from './direction-provider'
import { DesignSystemProvider } from './design-system-provider'
import { GlobalThemeSwitcher } from '@/components/docs/global-theme-switcher'
import { GlobalSearch } from '@/components/docs/global-search'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider>
      <DesignSystemProvider>
        <TooltipProvider>
          {children}
          <GlobalThemeSwitcher />
          <GlobalSearch />
          <Toaster />
        </TooltipProvider>
      </DesignSystemProvider>
    </DirectionProvider>
  )
}
