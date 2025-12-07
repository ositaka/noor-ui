# Noor UI - Project Rules

**Last Updated:** 2025-11-10
**Project Type:** React/Next.js Design System with RTL-First Architecture
**Project Name:** Noor UI (نور - "Light" in Arabic)

---

## 📋 Quick Links

Before starting any work, review these essential files:

- **[CHECKLIST.md](.claude/CHECKLIST.md)** - Pre-commit verification checklist (USE THIS BEFORE EVERY COMMIT!)
- **[Component Template](.claude/templates/component.template.tsx)** - Copy-paste ready component structure
- **[Documentation Template](.claude/templates/component-doc.template.tsx)** - Complete doc page template

These files are your primary references. The checklist will catch 99% of common mistakes.

---

## 🎯 Core Principles

### 1. RTL-First Development
- **ALWAYS** use logical properties (never use `ml-`, `mr-`, `pl-`, `pr-`, `text-left`, `text-right`)
- **USE:** `ms-*` (margin-inline-start), `me-*` (margin-inline-end), `ps-*` (padding-inline-start), `pe-*` (padding-inline-end)
- **USE:** `text-start` and `text-end` instead of `text-left` and `text-right`
- **Icons:** Position icons using `ms-*` or `me-*` so they flip naturally in RTL

### 2. Component Patterns
All components **MUST** follow these patterns:

#### Required Patterns:
- ✅ Use `React.forwardRef` for all components
- ✅ Use `cn()` utility for className merging
- ✅ Export `displayName` for debugging
- ✅ Include TypeScript types for all props
- ✅ Use CVA (class-variance-authority) for components with variants
- ✅ Support RTL out of the box (no special RTL prop needed)

#### Component Template:

**Use the complete template:** [`.claude/templates/component.template.tsx`](.claude/templates/component.template.tsx)

The template includes:
- ✅ Full forwardRef pattern with TypeScript types
- ✅ CVA variants setup
- ✅ Composition pattern with sub-components
- ✅ RTL-compliant classes
- ✅ Usage notes and examples

### 3. Direction Context & Radix UI

For direction-aware components, use the `useDirection()` hook from our direction provider:

```tsx
import { useDirection } from '@/components/providers/direction-provider'

const Component = (props) => {
  const { direction, locale } = useDirection()
  // direction: 'ltr' | 'rtl'
  // locale: 'en' | 'ar'

  return <RadixPrimitive.Root dir={direction} {...props} />
}
```

**Benefits:**
- ✅ Centralized direction management
- ✅ No MutationObserver setup in each component
- ✅ Access to both direction and locale
- ✅ Automatic font switching (Inter for English, IBM Plex Sans Arabic for Arabic)

**Example: Direction-aware Tabs component**
```tsx
const TabsRoot = React.forwardRef<...>(({ dir, ...props }, ref) => {
  const { direction } = useDirection()

  return (
    <TabsPrimitive.Root
      ref={ref}
      dir={dir || direction}  // Allow override, fallback to context
      {...props}
    />
  )
})
```

---

## 📝 Documentation Requirements

### When Adding a New Component:

**CRITICAL:** Every new component or page **MUST** be made discoverable and include proper SEO metadata.

**👉 USE THE CHECKLIST:** See [CHECKLIST.md](.claude/CHECKLIST.md) for the complete pre-commit verification list.

Quick overview:

#### 1. Create the Component
- [ ] Add component file in `/components/ui/[name].tsx`
- [ ] Use the component template above
- [ ] Ensure full RTL support with logical properties
- [ ] Add TypeScript types

#### 2. Create Documentation Page
- [ ] Create `/app/(docs)/components/[name]/page.tsx` in the (docs) route group
- [ ] **CRITICAL: Add 'use client' directive at the top**
- [ ] **DO NOT export metadata** - Client components cannot have metadata exports (Next.js limitation)
- [ ] **DO NOT** add manual header/footer - the (docs) layout provides these
- [ ] Include: Preview, Installation, Usage, Examples, Props, Accessibility, RTL Considerations
- [ ] Add interactive ComponentShowcase with LTR/RTL toggle
- [ ] Show at least 2-3 real-world examples
- [ ] Include mobile and desktop examples where relevant
- [ ] **Add Loading State section** if component has `isLoading` or `loading` prop

**Required Page Structure (Route Groups Pattern):**
```tsx
'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { YourComponent } from '@/components/ui/your-component'

export default function ComponentPage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Component Name</h1>
          <p className="text-xl text-muted-foreground">
            Brief description of the component and its purpose.
          </p>
        </div>

        {/* Component sections */}
        <ComponentShowcase>
          <ComponentShowcase.Demo>
            <YourComponent />
          </ComponentShowcase.Demo>
        </ComponentShowcase>

        <PropsTable props={[...]} />
        <CodeBlock code="..." language="tsx" />
      </main>
    </div>
  )
}
```

**Why this structure?**
- ✅ Client component for interactivity
- ✅ Header/footer provided by `app/(docs)/layout.tsx`
- ✅ Cleaner code - no navigation boilerplate
- ✅ DRY principle - layout changes propagate automatically
- ✅ Consistent navigation across all doc pages

#### 3. Update Navigation & Search
- [ ] **Add to `/app/components/page.tsx`** - Add to appropriate category
- [ ] **Add to `/lib/search-data.ts`** - Add searchable entry with keywords
- [ ] **Test search** - Verify it appears in command palette

#### 4. Update README (if major feature)
- [ ] Update component count if adding new components
- [ ] Add to feature list if adding significant capability

### Documentation Page Template:

**Use the complete template:** [`.claude/templates/component-doc.template.tsx`](.claude/templates/component-doc.template.tsx)

Every component documentation page MUST include:

1. **'use client' directive** at the very top (required for interactive components)
   ```tsx
   'use client'
   ```
   **NOTE:** Client components cannot export metadata in Next.js 14+. For SEO, use layout files or create server component wrappers.
2. **Page title and description**
3. **Live Preview** with interactive demo
4. **Installation** instructions (CLI + Manual)
5. **Usage** examples with code
6. **Multiple Examples** (minimum 3 variants)
7. **Loading State** section (if component supports `isLoading` or `loading` prop)
   - Show skeleton/loading state example
   - Include code example
   - Demonstrate loading state in ComponentShowcase
8. **Props Documentation** with complete table
9. **Accessibility** section with keyboard navigation
10. **RTL Considerations** with best practices
11. **Related Components** section with links

The template includes all sections with proper structure and real Arabic content examples.

---

## 🔍 Search & Discoverability

### Command Palette Search Data

Location: `/lib/search-data.ts`

When adding any new page or component, **ALWAYS** add an entry:

```typescript
{
  title: 'Component Name',
  description: 'Clear, concise description',
  href: '/components/component-name',
  category: 'Component' | 'Documentation' | 'Example' | 'Token' | 'Theme',
  keywords: ['keyword1', 'keyword2', 'synonym1', 'use-case'],
}
```

**Categories:**
- `Component` - UI components
- `Documentation` - Guides and docs
- `Example` - Real-world examples
- `Token` - Design tokens
- `Theme` - Theme pages

**Good Keywords:**
- Component name variations
- Use cases (e.g., 'form', 'navigation', 'data')
- Related terms (e.g., 'modal' for Dialog)
- RTL-specific terms where relevant

---

## 📱 Mobile Responsiveness

### Tables
- Use `ResponsiveTable` component for data tables
- Shows 2-column layout (label | value) on mobile
- Prevents horizontal scrolling

### General Guidelines
- Test all components at mobile breakpoints
- Use responsive grid classes: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Consider stacked layouts for mobile
- Ensure touch targets are at least 44x44px

---

## 🌍 Internationalization

### Centralized Translation System

**Location:** `/lib/i18n/` directory with separate EN and AR files

All user-facing text MUST use the centralized i18n system. **NO hardcoded bilingual ternaries allowed.**

#### ✅ REQUIRED Pattern:

```tsx
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export default function Component() {
  const { locale } = useDirection()
  const t = content[locale]

  return (
    <div>
      <h1>{t.section.title}</h1>
      <p>{t.section.description}</p>
    </div>
  )
}
```

#### ❌ FORBIDDEN Pattern:

```tsx
// ❌ NEVER use hardcoded ternaries for text content
{isRTL ? 'النص العربي' : 'English text'}
{locale === 'ar' ? 'مرحبا' : 'Hello'}
```

### Acceptable isRTL Usage

The `isRTL` variable should ONLY be used for:

1. **CSS Classes:**
   ```tsx
   className={isRTL ? 'font-arabic' : 'font-latin'}
   ```

2. **Layout/Alignment Props:**
   ```tsx
   <DropdownMenu align={isRTL ? 'start' : 'end'} />
   <Component dir={isRTL ? 'rtl' : 'ltr'} />
   ```

3. **Locale Parameters:**
   ```tsx
   formatDate(date, isRTL ? 'ar' : 'en')
   ```

**NEVER** use `isRTL` ternaries for user-facing strings.

### TypeScript Union Type Workaround

When accessing nested translation objects, TypeScript may create overly strict union types. Use explicit type assertion:

```tsx
const { locale } = useDirection()
const t = content[locale]

// For deeply nested component translations:
const componentT = content[locale].componentName as any

// Then use componentT for component-specific strings:
{componentT.examples.title}
{componentT.features.description}
```

### Nested Function Scopes

Each function scope needs its own translation constant:

```tsx
function ParentComponent() {
  const { locale } = useDirection()
  const t = content[locale]

  return <div>{t.parent.title}</div>
}

function ChildComponent() {
  // ✅ Define t in this scope too
  const { locale } = useDirection()
  const t = content[locale]

  return <div>{t.child.title}</div>
}
```

### Adding New Translations

When adding new UI strings:

1. Add the key to **both** `/lib/i18n/en/common.ts` AND `/lib/i18n/ar/common.ts`
2. Ensure the object structure matches exactly in both files
3. Use descriptive, hierarchical keys: `section.subsection.key`
4. Test in both languages to verify translations appear

### Bilingual Content Rules

- All user-facing text should support English and Arabic
- Provide bilingual examples in documentation
- Test every component in both LTR and RTL modes
- Real Arabic content preferred over lorem ipsum

### Font Switching
- LTR: Inter (sans-serif)
- RTL: IBM Plex Sans Arabic
- Monospace: JetBrains Mono (both directions)

---

## 🎨 Design Tokens

Location: `/lib/tokens.ts`

- Use design tokens for all styling
- Never hardcode colors, spacing, or typography
- Reference tokens via Tailwind classes
- All 4 themes (Minimal, Futuristic, Cozy, Artistic) share the same tokens

---

## 🧪 Testing Checklist

Before committing component work, verify:

- [ ] Component works in LTR mode
- [ ] Component works in RTL mode
- [ ] Icons flip correctly in RTL
- [ ] No `ml-`, `mr-`, `text-left`, `text-right` classes used
- [ ] Component appears in search data
- [ ] Component appears in components index
- [ ] Documentation page is complete
- [ ] Mobile view works (no horizontal scroll)
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible

---

## 📦 File Organization

```
/app
  layout.tsx                        # Root layout with providers
  page.tsx                          # Homepage

  /(docs)/                          # Route group for documentation
    layout.tsx                      # Shared header/footer layout
    /components/                    # Component documentation (32 pages)
      page.tsx                      # Components index (UPDATE THIS!)
      /[name]/page.tsx              # Individual component docs
    /documentation/                 # Guides (installation, RTL, etc.)
    /tokens/                        # Design tokens reference
    /themes/                        # Theme customization
    /getting-started/               # Getting started guide
    /rtl-guide/                     # RTL development guide
    /examples/                      # Examples listing page

  /examples/                        # Standalone examples (no layout)
    /dashboard/page.tsx             # Dashboard example
    /ecommerce/page.tsx             # E-commerce example
    /registration/page.tsx          # Registration form example

/components
  /ui/                              # UI components library (32 components)
  /layout/                          # Layout components
    site-header.tsx                 # Global navigation
    site-footer.tsx                 # Global footer
  /docs/                            # Documentation components
    component-showcase.tsx          # Live demo with LTR/RTL toggle
    props-table.tsx                 # API documentation
    code-block.tsx                  # Syntax highlighting
    global-search.tsx               # Command palette (Cmd+K)
  /providers/                       # Context providers
    direction-provider.tsx          # RTL/LTR and locale context
    design-system-provider.tsx      # Theme management
    client-providers.tsx            # Combined providers

/lib
  tokens.ts                         # Design tokens
  i18n.ts                          # Internationalization
  utils.ts                         # Utilities
  search-data.ts                   # Search data (UPDATE THIS!)
```

**Key Points:**
- `(docs)` is a route group - invisible in URLs, provides shared layout
- Standalone examples live outside (docs) for full-screen experience
- All doc pages automatically get header/footer from layout
- SiteHeader includes command palette for quick navigation

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T:
- Use directional classes (`ml-`, `mr-`, `pl-`, `pr-`)
- Use text alignment classes (`text-left`, `text-right`)
- **Use hardcoded bilingual ternaries** (`isRTL ? 'Arabic' : 'English'`)
- Add manual header/footer to doc pages (use route group layout)
- Set up MutationObserver for direction (use `useDirection()` hook)
- Forget to update search-data.ts when adding components
- Forget to update components index page
- Create components without documentation
- **Export metadata from 'use client' components** (Next.js 14+ doesn't allow this)
- Skip mobile testing
- Hardcode colors or spacing
- Use `position: left` or `position: right` (use `start`/`end`)
- Create new pages outside the (docs) route group for documentation

### ✅ DO:
- Use logical properties (`ms-`, `me-`, `ps-`, `pe-`)
- Use `text-start` and `text-end`
- **Use centralized i18n system** (`const t = content[locale]`)
- Place documentation pages in the (docs) route group
- **Start client components with 'use client' only** (no metadata exports)
- Use `useDirection()` hook for direction-aware components
- Use CodeBlock component for syntax highlighting
- Update ALL navigation/search when adding features
- Test in both LTR and RTL modes
- Use design tokens via Tailwind
- Add comprehensive documentation
- Think mobile-first
- Use `position: inline-start` or `position: inline-end`

---

## 🔄 Git Workflow

### Commit Message Format:
```
type: Brief description

Detailed explanation:
- What was changed
- Why it was changed
- Any breaking changes
- Links to related issues

Examples:
feat: Add Table component with mobile-responsive layout
fix: Correct RTL orientation for dropdown menus
docs: Add documentation for 4 remaining components
chore: Update search data with new components
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Before Pushing:
- [ ] All new components in search-data.ts
- [ ] All new pages in navigation
- [ ] Documentation is complete
- [ ] Tested in LTR and RTL
- [ ] Mobile view verified

---

## 🎯 Current Project State

**Component Count:** 74+ components (64 production-ready + 10 experimental AI/LLM) ✅
**Documentation Pages:** 74+ component pages documented ✅
**Examples:** 17+ complete examples ✅
**Starters:** 2 production-ready (Blog Dashboard, E-commerce) ✅
**Themes:** 4 (Minimal, Futuristic, Cozy, Artistic) ✅
**Architecture:** Route groups with shared layouts ✅

### Component Categories:
1. **Core** (8): Button, Card, FeatureCard, Input, Label, Badge, Separator, Avatar
2. **Forms** (10): Form, Checkbox, Radio Group, Select, Switch, Slider, Textarea, DatePicker, TimePicker, NumberInput
3. **Data Display** (6): Table, DataTable, Command, StatsCard, EmptyState, ListingCard
4. **Feedback** (6): Alert, Toast, Dialog, Tooltip, Progress, Skeleton
5. **Navigation** (5): Tabs (direction-aware), Breadcrumb, Pagination, Dropdown Menu, Context Menu
6. **Overlays & Layout** (6): Sheet, Accordion, Collapsible, Popover, DashboardShell, Stepper
7. **GCC-Specific** (5): PrayerTimes, HijriDate, ArabicNumber, ZakatCalculator, Calendar
8. **Advanced Forms** (3): FileUpload, RichTextEditor, Scroll Area
9. **User Interface** (2): UserMenu, NotificationCenter
10. **AI/LLM (Experimental)** (10): ChatMessage, StreamingText, PromptInput, ThinkingIndicator, MessageActions, ModelSelector, ParameterSlider, TokenCounter, ConversationHistory, WorkflowCanvas

### Recent Improvements (November 2025):
- ✅ Refactored to use Next.js route groups with shared layouts
- ✅ Direction-aware Tabs component with Radix UI integration
- ✅ Bilingual Dashboard and E-commerce examples
- ✅ CodeBlock component with syntax highlighting
- ✅ Command palette (Cmd+K) for global navigation
- ✅ All documentation pages use shared layout (DRY principle)

---

## 📚 Resources

- **Radix UI Docs:** https://www.radix-ui.com/docs/primitives
- **Tailwind CSS:** https://tailwindcss.com/docs
- **RTL Styling:** https://rtlstyling.com/posts/rtl-styling
- **Logical Properties:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties

---

## 💡 Quick Reference

### Common Logical Property Mappings:
| Physical | Logical | Usage |
|----------|---------|-------|
| `ml-4` | `ms-4` | Margin start |
| `mr-4` | `me-4` | Margin end |
| `pl-4` | `ps-4` | Padding start |
| `pr-4` | `pe-4` | Padding end |
| `text-left` | `text-start` | Text alignment start |
| `text-right` | `text-end` | Text alignment end |
| `left-0` | `start-0` | Position start |
| `right-0` | `end-0` | Position end |

### Icon Positioning:
```tsx
// ✅ Correct - will flip in RTL
<Icon className="me-2 h-4 w-4" />
<span>Text</span>

// ❌ Wrong - will not flip
<Icon className="mr-2 h-4 w-4" />
<span>Text</span>
```

---

**Remember:** When in doubt, check existing components for patterns. Consistency is key!
