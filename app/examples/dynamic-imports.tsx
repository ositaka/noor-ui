/**
 * Dynamic Imports for Heavy Example Pages
 *
 * This file provides lazy-loaded versions of heavy example pages
 * to improve initial bundle size and page load performance.
 *
 * Usage:
 * import { IslamicFinanceDashboardLazy } from './dynamic-imports'
 *
 * <Suspense fallback={<LoadingSpinner />}>
 *   <IslamicFinanceDashboardLazy />
 * </Suspense>
 */

import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Islamic Finance Dashboard - 872 lines
export const IslamicFinanceDashboardLazy = dynamic(
  () => import('./islamic-finance-dashboard/page').then(mod => ({ default: mod.default })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Islamic Finance Dashboard..." />
      </div>
    ),
    ssr: false,
  }
)

// Registration
export const RegistrationLazy = dynamic(
  () => import('./registration/page').then(mod => ({ default: mod.default })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Registration Form..." />
      </div>
    ),
    ssr: false,
  }
)
