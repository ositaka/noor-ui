/**
 * Dynamic Imports for Heavy Example Pages
 *
 * This file provides lazy-loaded versions of heavy example pages
 * to improve initial bundle size and page load performance.
 *
 * Usage:
 * import { GCCDashboardLazy } from './dynamic-imports'
 *
 * <Suspense fallback={<LoadingSpinner />}>
 *   <GCCDashboardLazy />
 * </Suspense>
 */

import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// GCC Dashboard - 410 lines
export const GCCDashboardLazy = dynamic(
  () => import('./gcc-dashboard/page').then(mod => ({ default: mod.default })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading GCC Dashboard..." />
      </div>
    ),
    ssr: false, // Disable SSR for heavy interactive components
  }
)

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

// DataTable Showcase - 645 lines
export const DataTableShowcaseLazy = dynamic(
  () => import('./datatable-showcase/page').then(mod => ({ default: mod.default })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading DataTable Showcase..." />
      </div>
    ),
    ssr: false,
  }
)

// Dashboard - can also be lazy loaded
export const DashboardLazy = dynamic(
  () => import('./dashboard/page').then(mod => ({ default: mod.default })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Dashboard..." />
      </div>
    ),
    ssr: false,
  }
)

// E-commerce
export const EcommerceLazy = dynamic(
  () => import('@/app/(docs)/examples/ecommerce/page').then(mod => ({ default: mod.default })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading E-commerce Example..." />
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
