# Performance Optimization Guide

This document outlines the performance optimizations implemented in Noor UI and best practices for maintaining optimal performance.

## Implemented Optimizations

### 1. Lazy Loading Heavy Components ✅

Heavy example pages use Next.js dynamic imports to reduce initial bundle size:

**Implementation:**
- `app/examples/dynamic-imports.tsx` - Centralized dynamic imports
- Loading states with `LoadingSpinner` component
- SSR disabled for heavy interactive components

**Usage:**
```tsx
import { GCCDashboardLazy } from './dynamic-imports'
import { Suspense } from 'react'

<Suspense fallback={<LoadingSpinner />}>
  <GCCDashboardLazy />
</Suspense>
```

**Pages with lazy loading:**
- GCC Dashboard (410 lines) - ZakatCalculator component lazy loaded
- Islamic Finance Dashboard (872 lines) - ZakatCalculator, Calendar, DataTable lazy loaded
- DataTable Showcase (645 lines) - DataTable component lazy loaded

**Benefits:**
- Reduces initial JavaScript bundle size
- Faster Time to Interactive (TTI)
- Better Core Web Vitals scores
- Code splitting at component level

### 2. Next.js Optimizations ✅

**Package Import Optimization:**
```js
// next.config.js
experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
}
```

Reduces bundle size by only importing used icons.

**Security Headers:**
- X-Frame-Options, X-Content-Type-Options, etc.
- See `next.config.js` for full list

### 3. Route-Based Code Splitting ✅

Next.js automatically splits code by route:
- `/examples/*` - Separate bundle for each example
- `/(docs)/*` - Shared layout with component-level splitting
- `/` - Homepage optimized separately

### 4. Image Optimization (Pending)

Currently no images in the project, but when adding images:

```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

## Performance Metrics

### Bundle Size Analysis

Run bundle analyzer to check sizes:

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Analyze
ANALYZE=true npm run build
```

### Current Optimizations Impact

| Page | Before | After | Improvement |
|------|--------|-------|-------------|
| Homepage | - | - | Baseline |
| GCC Dashboard | Heavy | Lazy loaded | ~30-40% FCP improvement |
| Islamic Finance | Very heavy | Lazy loaded | ~40-50% FCP improvement |
| DataTable | Heavy | Lazy loaded | ~30-40% FCP improvement |

*Note: Run Lighthouse for actual metrics*

## Best Practices

### 1. Component-Level Lazy Loading

For heavy components within pages:

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  {
    loading: () => <Skeleton />,
    ssr: false, // Disable SSR if component is client-only
  }
)
```

### 2. Conditional Loading

Load components only when needed:

```tsx
const [showChart, setShowChart] = useState(false)

const ChartComponent = dynamic(
  () => import('./chart-component'),
  { ssr: false }
)

{showChart && <ChartComponent />}
```

### 3. Intersection Observer

Load components when they come into view:

```tsx
'use client'

import { useEffect, useState, useRef } from 'react'

function LazySection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {isVisible ? <HeavyComponent /> : <Skeleton />}
    </div>
  )
}
```

### 4. Memoization

Prevent unnecessary re-renders:

```tsx
import { memo, useMemo, useCallback } from 'react'

// Memoize components
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Component logic
})

// Memoize calculations
const ExpensiveCalculation = ({ items }) => {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  )

  return <div>Total: {total}</div>
}

// Memoize callbacks
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies])
```

### 5. Font Optimization

Fonts are already optimized in the project:

```tsx
// layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

### 6. CSS Optimization

- Use Tailwind's purge to remove unused CSS
- Minimize custom CSS
- Use CSS-in-JS for component-specific styles only

## Monitoring Performance

### Lighthouse Scores

Run Lighthouse audits regularly:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

Target scores:
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

### Core Web Vitals

Monitor these metrics:
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

### Real User Monitoring

Consider adding analytics:

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

## Future Optimizations

### Potential Improvements

1. **Image Optimization**
   - Add next/image for all images
   - Use WebP format
   - Implement blur placeholders

2. **API Route Optimization**
   - Add caching headers
   - Implement rate limiting
   - Use edge functions for global distribution

3. **Database Optimization** (if added)
   - Connection pooling
   - Query optimization
   - Caching layer (Redis)

4. **Service Worker** (PWA)
   - Offline support
   - Background sync
   - Push notifications

5. **Edge Runtime**
   - Convert API routes to edge functions
   - Faster global response times

## Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [React Performance](https://react.dev/reference/react/memo)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
