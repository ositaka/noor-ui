# Architecture Decision Record (ADR)

**Project:** Luxury Reseller Platform
**Created:** November 20, 2025
**Purpose:** Document all significant technical and design decisions with rationale

---

## ADR Format

Each decision follows this structure:
- **Date**: When the decision was made
- **Status**: Proposed → Accepted → Implemented → Deprecated
- **Context**: What prompted this decision
- **Decision**: What we decided to do
- **Rationale**: Why we made this choice
- **Consequences**: Impact and trade-offs
- **Alternatives Considered**: What we didn't choose and why

---

## ADR-001: Next.js Version Selection

**Date:** November 19, 2025
**Status:** ✅ Implemented
**Category:** Framework

### Context

Need to choose between Next.js 14 (most stable), Next.js 15 (latest stable), or Next.js 16 (canary).

### Decision

Use **Next.js 15.5.6** (latest stable release)

### Rationale

1. **Stability**: Next.js 15 is production-ready, unlike v16 (canary)
2. **React 19 Support**: Full compatibility with React 19
3. **Modern Features**: App Router maturity, Server Components improvements
4. **Lenis Compatibility**: Verified to work with Lenis smooth scroll
5. **Community Support**: Extensive documentation and ecosystem support
6. **Future-Proof**: Recent enough to receive updates for 1-2 years

### Consequences

**Positive:**
- Stable foundation for production deployment
- Access to latest Next.js features
- Strong TypeScript integration
- Excellent performance out of the box

**Negative:**
- Some edge cases in App Router vs. v14
- Slightly larger bundle than v14
- Cannot use experimental v16 features

### Alternatives Considered

**Next.js 14:**
- ❌ Lacks React 19 support
- ❌ Missing latest App Router improvements
- ✅ More battle-tested

**Next.js 16 (Canary):**
- ✅ Bleeding-edge features
- ❌ Unstable, breaking changes possible
- ❌ Limited community support
- ❌ Risky for production

### Validation

- ✅ Dev server running smoothly
- ✅ All dependencies compatible
- ✅ Build process working
- ✅ Hot reload functional

---

## ADR-002: React Version Selection

**Date:** November 19, 2025
**Status:** ✅ Implemented
**Category:** Framework

### Context

React 18 is stable and widely used, but React 19 offers new features and improvements.

### Decision

Use **React 19.0.0** (latest stable release)

### Rationale

1. **Next.js 15 Compatibility**: Optimized for React 19
2. **Performance**: Improved rendering and reconciliation
3. **Server Components**: Better integration with Next.js App Router
4. **Forward Compatibility**: Better positioned for future updates
5. **Concurrent Features**: Enhanced useTransition, useDeferredValue

### Consequences

**Positive:**
- Latest features and performance improvements
- Excellent Next.js integration
- Future-proof architecture

**Negative:**
- Some third-party libraries may not be fully tested
- Smaller community knowledge base vs. React 18

### Alternatives Considered

**React 18:**
- ✅ More stable ecosystem
- ✅ Wider library support
- ❌ Missing React 19 optimizations
- ❌ Not ideal with Next.js 15

### Validation

- ✅ All core features working
- ✅ Framer Motion compatible
- ✅ next-intl compatible
- ✅ No runtime errors

---

## ADR-003: Internationalization Library

**Date:** November 19, 2025
**Status:** ✅ Implemented
**Category:** Internationalization

### Context

Need robust i18n solution supporting English, Persian, and Arabic with RTL.

### Decision

Use **next-intl v3.24.1**

### Rationale

1. **Next.js Native**: Built specifically for Next.js App Router
2. **Type Safety**: Full TypeScript support with type-safe translations
3. **Performance**: Automatic code splitting per locale
4. **RTL Support**: First-class support for bidirectional text
5. **Developer Experience**: Intuitive API, minimal boilerplate
6. **Server Components**: Works seamlessly with RSC

### Consequences

**Positive:**
- Type-safe translations prevent typos
- Automatic locale detection
- Clean middleware integration
- Zero runtime overhead for unused translations

**Negative:**
- Requires app restructuring to `[locale]` pattern
- Learning curve for team members unfamiliar with next-intl

### Alternatives Considered

**react-i18next:**
- ❌ Not optimized for Next.js App Router
- ❌ More configuration required
- ✅ More widely known

**next-translate:**
- ❌ Less active maintenance
- ❌ Weaker TypeScript support

**Lingui:**
- ✅ Excellent developer tools
- ❌ Complex setup for Next.js
- ❌ Larger bundle size

### Implementation Details

```typescript
// Middleware approach
export default createMiddleware({
  locales: ['en', 'fa', 'ar'],
  defaultLocale: 'en',
  localeDetection: true,
})

// Usage
const t = useTranslations('home')
<h1>{t('hero.title')}</h1>
```

### Validation

- ✅ 3 locales working
- ✅ RTL direction switching
- ✅ Type-safe translations
- ✅ Automatic locale detection

---

## ADR-004: Smooth Scroll Library

**Date:** November 19, 2025
**Status:** ✅ Implemented
**Category:** User Experience

### Context

Luxury e-commerce requires smooth, polished scrolling experience.

### Decision

Use **Lenis v1.1.17**

### Rationale

1. **Performance**: Lightweight (~3KB), excellent performance
2. **Mobile Support**: Great touch gestures and momentum
3. **Framework Agnostic**: No dependency on jQuery, GSAP, etc.
4. **Customizable**: Fine control over easing, duration, multipliers
5. **Active Development**: Regular updates, modern codebase
6. **Framer Motion Compatible**: Works well with our animation library

### Consequences

**Positive:**
- Silky-smooth scrolling enhances luxury feel
- Small bundle impact
- Works well on mobile devices
- Easy to customize

**Negative:**
- Requires careful integration with scroll-based animations
- Potential conflicts with native scroll behavior
- Needs proper cleanup in React

### Alternatives Considered

**Locomotive Scroll:**
- ✅ Feature-rich
- ❌ Larger bundle size (~20KB)
- ❌ More complex setup
- ❌ jQuery-like API

**smooth-scrollbar:**
- ❌ Older, less maintained
- ❌ Performance issues on mobile

**Native CSS scroll-behavior:**
- ❌ Limited customization
- ❌ No momentum control
- ❌ Poor cross-browser support

### Implementation

```typescript
new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
})
```

### Validation

- ✅ Smooth desktop scrolling
- ✅ Excellent mobile experience
- ✅ No jank or stuttering
- ✅ Compatible with Next.js

---

## ADR-005: Animation Library

**Date:** November 19, 2025
**Status:** ✅ Implemented
**Category:** User Experience

### Context

Need powerful animation library for luxury e-commerce interactions.

### Decision

Use **Framer Motion v11.18.0**

### Rationale

1. **React Native**: Built for React, excellent hooks API
2. **Performance**: GPU-accelerated, optimized renders
3. **Features**: Layout animations, gestures, scroll animations
4. **Developer Experience**: Intuitive API, great documentation
5. **TypeScript**: Full type safety
6. **Bundle Size**: Tree-shakeable, only import what you use

### Consequences

**Positive:**
- Powerful animation capabilities
- Smooth, performant animations
- Easy to create complex sequences
- Great for micro-interactions

**Negative:**
- Adds ~60KB to bundle (gzipped)
- Can be overkill for simple animations
- Steeper learning curve than CSS

### Alternatives Considered

**GSAP:**
- ✅ Most powerful animation library
- ❌ Licensing costs for commercial use
- ❌ Not React-first

**React Spring:**
- ✅ Physics-based animations
- ❌ More complex API
- ❌ Less suitable for our use case

**CSS Animations:**
- ✅ Zero runtime cost
- ❌ Limited control
- ❌ Hard to orchestrate complex sequences

### Planned Use Cases

- Page transitions
- Product card hover effects
- Menu animations
- Loading states
- Scroll-triggered reveals
- Cart interactions

### Validation

- ✅ Compatible with Next.js 15
- ✅ Works with TypeScript
- ✅ No SSR issues

---

## ADR-006: Persian Font Selection

**Date:** November 20, 2025
**Status:** ✅ Implemented
**Category:** Typography

### Context

Need professional, readable Persian font for target demographic (35-45+ women).

### Decision

Use **Vazirmatn** (all weights from CDN)

### Rationale

1. **Modern Design**: Contemporary, professional aesthetic
2. **Readability**: Excellent legibility at all sizes
3. **Weight Range**: 9 weights (100-900) for design flexibility
4. **Open Source**: Free, actively maintained
5. **Performance**: Well-optimized WOFF2 files
6. **Cultural Fit**: Modern enough for luxury brand, traditional enough for Persian

### Consequences

**Positive:**
- Professional appearance
- Great readability
- Wide weight range for hierarchy
- Free and open source

**Negative:**
- CDN dependency (could self-host if needed)
- ~300KB total for all weights (acceptable)

### Alternatives Considered

**Shabnam:**
- ✅ Popular Persian font
- ❌ Less modern aesthetic
- ❌ Fewer weights available

**Sahel:**
- ❌ Too informal for luxury brand

**IRANSans:**
- ❌ Licensing concerns for commercial use

**Custom Font:**
- ❌ Expensive (~$5,000+)
- ❌ Long development time

### Loading Strategy

```css
@font-face {
  font-family: 'Vazirmatn';
  font-weight: 400;
  font-display: swap;
  src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Regular.woff2');
}
```

**Why CDN:**
- Fast global delivery
- Browser caching across sites
- Automatic version management
- Fallback to self-hosting possible

### Validation

- ✅ All weights loading correctly
- ✅ Excellent rendering on all devices
- ✅ Proper RTL support
- ✅ Fast load times with font-display: swap

---

## ADR-007: Color Palette Design

**Date:** November 19, 2025
**Status:** ✅ Implemented
**Category:** Design System

### Context

Need distinctive color palette that conveys luxury, elegance, and femininity.

### Decision

**Elegant Theme:**
- Primary: Burgundy `hsl(345, 60%, 45%)`
- Secondary: Gold `hsl(48, 65%, 48%)`
- Accent: Rose Gold `hsl(355, 30%, 60%)`

### Rationale

1. **Burgundy**: Sophisticated, luxurious, not aggressive
2. **Gold**: Wealth, prestige, timeless elegance
3. **Rose Gold**: Modern, feminine, on-trend
4. **Color Psychology**: Appeals to target demographic (35-45+ women)
5. **Brand Differentiation**: Distinctive from competitors
6. **Accessibility**: Sufficient contrast for WCAG AA

### Consequences

**Positive:**
- Distinctive brand identity
- Appeals to target demographic
- Works in light and dark modes
- Professional, luxurious feel

**Negative:**
- More niche than neutral colors
- Requires careful use to avoid overwhelming

### Alternatives Considered

**Black & Gold:**
- ✅ Classic luxury combination
- ❌ Too common, less distinctive

**Navy & Silver:**
- ❌ Too corporate, lacks warmth

**Purple & Gold:**
- ❌ Too royal, less modern

### Color System

9 shades per color (50-900) following Material Design approach:
- 50-200: Light tints
- 300-500: Main colors
- 600-900: Dark shades

### Validation

- ✅ WCAG AA contrast ratios met
- ✅ Works in light mode
- ✅ Works in dark mode
- ✅ Suitable for all UI elements

---

## ADR-008: Type System

**Date:** November 20, 2025
**Status:** ✅ Implemented
**Category:** Data Architecture

### Context

Need type-safe data models for products, categories, and localization.

### Decision

Comprehensive TypeScript types with strict mode enabled

### Key Types

```typescript
type Locale = 'en' | 'fa' | 'ar'
type LocalizedString = { en: string; fa: string; ar: string }
type Currency = 'AED' | 'USD' | 'IRR'
type ProductStatus = 'active' | 'draft' | 'archived'
type StockStatus = 'in_stock' | 'out_of_stock' | 'pre_order'
```

### Rationale

1. **Type Safety**: Prevent runtime errors
2. **Developer Experience**: IntelliSense autocomplete
3. **Maintainability**: Easy to refactor
4. **Documentation**: Types serve as documentation
5. **Scalability**: Easy to extend

### Consequences

**Positive:**
- Catch errors at compile time
- Better IDE support
- Self-documenting code
- Easier refactoring

**Negative:**
- More upfront work
- Learning curve for team
- Verbose in some cases

### Validation

- ✅ tsconfig.json with strict mode
- ✅ No TypeScript errors
- ✅ Full IntelliSense support

---

## ADR-009: Mock Data Strategy

**Date:** November 20, 2025
**Status:** ✅ Implemented
**Category:** Development Strategy

### Context

Need realistic data for development before Supabase integration.

### Decision

Create comprehensive mock data files with realistic luxury products

### Rationale

1. **Parallel Development**: Frontend work doesn't wait for backend
2. **Testing**: Realistic data for UI testing
3. **Demos**: Impressive demos for stakeholders
4. **Type Safety**: Mock data validates type system
5. **Migration**: Easy to swap for real data later

### Implementation

- 4 categories (Bags, Watches, Jewelry, Accessories)
- 4 featured products (Chanel, Rolex, Cartier, Hermès)
- Full localization for all text
- Realistic pricing in AED
- Detailed specifications

### Consequences

**Positive:**
- Unblocked frontend development
- Validates data models early
- Great for demos and testing
- Easy to understand data structure

**Negative:**
- Duplication when moving to real backend
- Need to maintain mock data
- May miss edge cases

### Migration Path

```typescript
// Current: Mock data
import { mockProducts } from '@/lib/data/mock-products'

// Future: Supabase
import { supabase } from '@/lib/supabase'
const { data } = await supabase.from('products').select('*')
```

### Validation

- ✅ 4 realistic products created
- ✅ All text localized
- ✅ Types match schema
- ✅ Helper functions working

---

## ADR-010: Utility Class Strategy

**Date:** November 20, 2025
**Status:** ✅ Implemented
**Category:** Styling

### Context

Need utility function for conditional class names with Tailwind.

### Decision

Use **clsx + tailwind-merge** via `cn()` utility

### Implementation

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Rationale

1. **clsx**: Conditional class names made easy
2. **tailwind-merge**: Prevents conflicting Tailwind classes
3. **Developer Experience**: Clean, readable code
4. **Industry Standard**: Widely used pattern

### Usage

```typescript
<div className={cn(
  'base-class',
  isActive && 'active-class',
  'conditional-class'
)} />
```

### Consequences

**Positive:**
- Clean conditional styling
- Prevents class conflicts
- Type-safe with ClassValue
- Small bundle impact (~2KB)

**Negative:**
- Small runtime cost
- Another dependency

### Alternatives Considered

**classnames only:**
- ❌ No Tailwind conflict resolution

**Manual string concatenation:**
- ❌ Error-prone, verbose

### Validation

- ✅ Working in all components
- ✅ No class conflicts
- ✅ Type-safe

---

## Decision Summary

| ADR | Decision | Status | Impact |
|-----|----------|--------|--------|
| 001 | Next.js 15 | ✅ | High |
| 002 | React 19 | ✅ | High |
| 003 | next-intl | ✅ | High |
| 004 | Lenis | ✅ | Medium |
| 005 | Framer Motion | ✅ | Medium |
| 006 | Vazirmatn Font | ✅ | Medium |
| 007 | Elegant Theme | ✅ | High |
| 008 | TypeScript Types | ✅ | High |
| 009 | Mock Data | ✅ | Low |
| 010 | cn() Utility | ✅ | Low |

---

## Future Decisions

### Pending Research

- **State Management**: Context API vs. Zustand vs. Jotai
- **Forms**: React Hook Form vs. Formik vs. native
- **Image Hosting**: Cloudinary vs. Vercel Image vs. S3
- **Analytics**: Vercel Analytics vs. Google Analytics vs. Plausible
- **Error Tracking**: Sentry vs. LogRocket vs. Bugsnag
- **Testing**: Vitest vs. Jest, Playwright vs. Cypress

### To Be Decided

- Database schema finalization
- Payment gateway integration
- Authentication provider
- Deployment platform
- CDN strategy
- Monitoring solution

---

**Maintained By:** Project Team
**Review Cycle:** Weekly
**Last Updated:** November 20, 2025
