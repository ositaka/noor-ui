'use client'

import * as React from 'react'
import { DirectionProvider } from './direction-provider'
import { DesignSystemProvider } from './design-system-provider'
import { AuthProvider } from '@/hooks/use-auth'
import { GlobalThemeSwitcher } from '@/components/docs/global-theme-switcher'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider>
      <DesignSystemProvider>
        <AuthProvider>
          <TooltipProvider>
            {children}
            <GlobalThemeSwitcher />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </DesignSystemProvider>
    </DirectionProvider>
  )
}
