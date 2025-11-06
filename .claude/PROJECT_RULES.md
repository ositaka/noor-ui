# RTL-First Design System - Project Rules

**Last Updated:** 2025-11-06
**Project Type:** React/Next.js Design System with RTL-First Architecture

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
```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-styles',
        // other variants
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // additional props
}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant, className }))}
        {...props}
      />
    )
  }
)

Component.displayName = 'Component'
```

### 3. Radix UI Direction Handling

For Radix UI components (DropdownMenu, ContextMenu, Select, etc.), **ALWAYS** pass the `dir` prop:

```tsx
const Component = (props) => {
  const [dir, setDir] = React.useState<'ltr' | 'rtl'>('ltr')

  React.useEffect(() => {
    setDir(document.documentElement.dir as 'ltr' | 'rtl' || 'ltr')

    const observer = new MutationObserver(() => {
      setDir(document.documentElement.dir as 'ltr' | 'rtl' || 'ltr')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    })

    return () => observer.disconnect()
  }, [])

  return <RadixPrimitive.Root dir={dir} {...props} />
}
```

---

## 📝 Documentation Requirements

### When Adding a New Component:

**CRITICAL:** Every new component or page **MUST** be made discoverable. Follow this checklist:

#### 1. Create the Component
- [ ] Add component file in `/components/ui/[name].tsx`
- [ ] Use the component template above
- [ ] Ensure full RTL support with logical properties
- [ ] Add TypeScript types

#### 2. Create Documentation Page
- [ ] Create `/app/components/[name]/page.tsx`
- [ ] Include: Preview, Installation, Usage, Examples, Props, Accessibility, RTL Considerations
- [ ] Add interactive ComponentShowcase with LTR/RTL toggle
- [ ] Show at least 2-3 real-world examples
- [ ] Include mobile and desktop examples where relevant

#### 3. Update Navigation & Search
- [ ] **Add to `/app/components/page.tsx`** - Add to appropriate category
- [ ] **Add to `/lib/search-data.ts`** - Add searchable entry with keywords
- [ ] **Test search** - Verify it appears in command palette

#### 4. Update README (if major feature)
- [ ] Update component count if adding new components
- [ ] Add to feature list if adding significant capability

### Documentation Page Template:

Every component documentation page MUST include:

1. **Header** with sticky navigation (ThemeToggle + DirectionToggle)
2. **Breadcrumb** navigation
3. **Page title and description**
4. **Live Preview** with ComponentShowcase
5. **Installation** instructions
6. **Usage** examples with CodeBlock
7. **Multiple Examples** (at least 2-3 variants)
8. **Props Documentation** with PropsTable
9. **Accessibility** section with keyboard navigation
10. **RTL Considerations** with side-by-side LTR/RTL comparison
11. **Related Components** section with links

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

### Bilingual Content
- All user-facing text should support English and Arabic
- Use direction detection: `document.documentElement.dir`
- Provide bilingual examples in documentation
- Test every component in both LTR and RTL modes

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
  /components         # Component documentation pages
    /[name]/page.tsx  # Individual component docs
    page.tsx          # Components index (UPDATE THIS!)
  /documentation      # General documentation
  /examples           # Real-world examples
    page.tsx          # Examples index (UPDATE THIS!)
/components
  /ui                 # UI components library
  /docs               # Documentation components (ShowCase, PropsTable, etc.)
  /providers          # Context providers
/lib
  tokens.ts           # Design tokens
  i18n.ts            # Internationalization
  utils.ts           # Utilities
  search-data.ts     # Search data (UPDATE THIS!)
```

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T:
- Use directional classes (`ml-`, `mr-`, `pl-`, `pr-`)
- Use text alignment classes (`text-left`, `text-right`)
- Forget to update search-data.ts when adding components
- Forget to update components index page
- Create components without documentation
- Skip mobile testing
- Hardcode colors or spacing
- Use `position: left` or `position: right` (use `start`/`end`)

### ✅ DO:
- Use logical properties (`ms-`, `me-`, `ps-`, `pe-`)
- Use `text-start` and `text-end`
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

**Component Count:** 30 production-ready components
**Documentation Pages:** 30/30 components documented
**Examples:** 1 (Registration Form) + 3 planned
**Themes:** 4 (Minimal, Futuristic, Cozy, Artistic)

### Component Categories:
1. **Core** (7): Button, Card, Input, Label, Badge, Separator, Avatar
2. **Forms** (6): Checkbox, Radio Group, Select, Switch, Slider, Textarea
3. **Data Display** (2): Table, Command
4. **Feedback** (5): Alert, Toast, Dialog, Tooltip, Progress
5. **Navigation** (5): Tabs, Breadcrumb, Pagination, Dropdown Menu, Context Menu
6. **Overlays & Layout** (4): Sheet, Accordion, Collapsible, Popover

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
