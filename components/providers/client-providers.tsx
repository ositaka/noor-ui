'use client'

import * as React from 'react'
import { DirectionProvider } from './direction-provider'
import { DesignSystemProvider } from './design-system-provider'
import { GlobalThemeSwitcher } from '@/components/docs/global-theme-switcher'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider>
      <DesignSystemProvider>
        {children}
        <GlobalThemeSwitcher />
      </DesignSystemProvider>
    </DirectionProvider>
  )
}
