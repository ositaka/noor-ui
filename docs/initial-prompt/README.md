# RTL-First Design System Documentation Site

Build a comprehensive, modern documentation website for a **bilingual (English/Arabic) design system** with full RTL support.

## Core Philosophy

**RTL-FIRST ARCHITECTURE**: This is not "LTR with RTL support" - it's designed for Arabic from the ground up, with English as an equally-supported alternative.

**Accessibility-First**: Semantic HTML, WCAG AA compliance, keyboard navigation, screen reader support.

**Token-Based Theming**: All design decisions flow from design tokens, enabling 4 distinct themes from one source.

## Visual Design Requirements

### Aesthetic
- **Clean, modern, sophisticated**
- **NOT colorful** - focused, professional
- **1-2 primary colors** (rest are neutrals/grays)
- Bridges **enterprise and personal** usage
- Polished, production-ready feel

### Color Strategy
````css
/* Use THIS pattern */
Primary: One main brand color (e.g., indigo-600)
Secondary: Optional accent (e.g., teal-500)
Neutrals: Gray scale (50-950)
Semantic: Success (green), Error (red), Warning (amber), Info (blue)

/* Generate 4 themes from these tokens */
````

### Four Themes (from same tokens)
1. **Minimal** - Clean, lots of white space, subtle borders
2. **Futuristic Enterprise** - Dark, gradients, glassmorphism
3. **Cozy Personal** - Warm tones, softer corners, gentle shadows
4. **Artistic/Poetry** - Typography-focused, elegant, serif accents

### Motion & Accessibility
- **Light/Dark mode** support
- **prefers-reduced-motion** respect (disable animations for motion sensitivity)
- Smooth, meaningful animations (not decorative fluff)

## Technical Stack
````json
{
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript (strict mode)",
  "styling": "Tailwind CSS with custom design tokens",
  "components": "Radix UI (for accessibility)",
  "utilities": ["class-variance-authority", "tailwind-merge", "clsx"],
  "syntax": "react-syntax-highlighter with rehype-pretty-code",
  "theme": "next-themes",
  "icons": "lucide-react"
}
````

**Minimal dependencies** - only what's necessary.

## Project Structure
````
/app
  /(marketing)
    /page.tsx                 # Homepage with engagement
  /(docs)
    /components
      /[component]/page.tsx   # Individual component pages
    /tokens/page.tsx          # Design tokens showcase
    /themes/page.tsx          # Theme switcher demo
/components
  /ui                         # All design system components
  /docs                       # Documentation-specific components
    /ComponentShowcase        # Live demo with LTR/RTL toggle
    /PropsTable              # Props documentation table
    /CodeBlock               # Syntax-highlighted code
    /ThemeSwitcher           # Switch between 4 themes
/lib
  /tokens.ts                 # Design token definitions
  /utils.ts                  # Utilities (cn, etc.)
/styles
  /globals.css              # Tailwind + custom CSS
  /themes                    # Theme-specific overrides
````

## Core Components to Build

### Documentation Components

#### 1. ComponentShowcase
````tsx
// Live interactive demo area
<ComponentShowcase>
  <ComponentShowcase.Demo>
    {/* Live component here */}
  </ComponentShowcase.Demo>
  
  <ComponentShowcase.Controls>
    <DirectionToggle />  {/* LTR ↔ RTL */}
    <ThemeToggle />      {/* Light ↔ Dark */}
    <PropControls />     {/* Interactive prop editing */}
  </ComponentShowcase.Controls>
  
  <ComponentShowcase.Comparison>
    {/* Side-by-side LTR/RTL view (like your screenshots) */}
  </ComponentShowcase.Comparison>
  
  <ComponentShowcase.Code>
    <CodeBlock language="tsx" />
  </ComponentShowcase.Code>
</ComponentShowcase>
````

Features:
- Live component rendering
- Toggle between LTR/RTL instantly
- Side-by-side comparison view
- Interactive prop controls
- Code viewer with copy button
- Responsive layout

#### 2. PropsTable
````tsx
<PropsTable>
  {[
    {
      name: "variant",
      type: "'primary' | 'secondary' | 'outline'",
      default: "'primary'",
      required: false,
      description: "Visual style variant"
    }
    // ... more props
  ]}
</PropsTable>
````

Features:
- Sortable columns
- Searchable
- Type highlighting
- Mobile-responsive
- Shows required/optional clearly

#### 3. CodeBlock
````tsx
<CodeBlock 
  language="tsx"
  code={`<Button variant="primary">Click me</Button>`}
  showLineNumbers
  highlightLines={[2, 3]}
/>
````

Features:
- Syntax highlighting (rehype-pretty-code)
- Copy to clipboard
- Line numbers
- Line highlighting
- Multiple language support (TSX, CSS, HTML, JSON)
- Theme-aware (light/dark syntax themes)

#### 4. TokensShowcase
````tsx
<TokensShowcase>
  <ColorTokens />
  <SpacingTokens />
  <TypographyTokens />
  <ShadowTokens />
  <RadiusTokens />
</TokensShowcase>
````

Shows all design tokens visually with copy-paste values.

#### 5. ThemeSwitcher
````tsx
<ThemeSwitcher themes={['minimal', 'futuristic', 'cozy', 'artistic']} />
````

Live theme switching to demonstrate token-based theming.

### Design System Components (from Radix)

Build these with full RTL support:

**Core**:
- Button
- Card (Header, Content, Footer)
- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Slider

**Navigation**:
- Tabs
- Breadcrumb
- Pagination
- Navigation Menu
- Sidebar

**Overlays**:
- Dialog
- Sheet
- Popover
- Tooltip
- Alert Dialog
- Dropdown Menu
- Context Menu

**Feedback**:
- Alert/Banner
- Toast
- Progress
- Skeleton
- EmptyState
- Spinner

**Display**:
- Badge
- Avatar
- Separator
- Accordion
- Collapsible
- Carousel

**Complex**:
- DataTable
- Calendar (with Hijri support)
- DatePicker
- Form
- Command Palette

## RTL Implementation Requirements

### Tailwind Config
````javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwindcss-logical'),  // CRITICAL for RTL
  ],
  theme: {
    extend: {
      // Design tokens here
    }
  }
}
````

### Component Patterns
````tsx
// ALWAYS use logical properties
// ❌ Wrong
<div className="ml-4 pr-2">

// ✅ Correct
<div className="ms-4 pe-2">

// Direction-aware icons
const ChevronIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;

// Direction-aware animations
<motion.div
  initial={{ x: direction === 'rtl' ? 100 : -100 }}
  animate={{ x: 0 }}
/>
````

### Arabic Content

Use **real, meaningful Arabic content** (not lorem ipsum):
````typescript
export const ARABIC_CONTENT = {
  buttons: {
    submit: 'إرسال',
    cancel: 'إلغاء',
    save: 'حفظ',
    // ...
  },
  forms: {
    firstName: 'الاسم الأول',
    email: 'البريد الإلكتروني',
    // ...
  },
  // GCC-specific
  gcc: {
    hijriDate: 'التاريخ الهجري',
    prayerTimes: 'مواقيت الصلاة',
    // ...
  }
};
````

## Accessibility Requirements

### ESLint Config

Create `.eslintrc.json`:
````json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["jsx-a11y"],
  "rules": {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/heading-has-content": "error",
    "jsx-a11y/html-has-lang": "error",
    "jsx-a11y/img-redundant-alt": "error",
    "jsx-a11y/interactive-supports-focus": "error",
    "jsx-a11y/label-has-associated-control": "error",
    "jsx-a11y/media-has-caption": "warn",
    "jsx-a11y/mouse-events-have-key-events": "error",
    "jsx-a11y/no-access-key": "error",
    "jsx-a11y/no-autofocus": "warn",
    "jsx-a11y/no-distracting-elements": "error",
    "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
    "jsx-a11y/no-noninteractive-element-interactions": "error",
    "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
    "jsx-a11y/no-noninteractive-tabindex": "error",
    "jsx-a11y/no-redundant-roles": "error",
    "jsx-a11y/no-static-element-interactions": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    "jsx-a11y/scope": "error",
    "jsx-a11y/tabindex-no-positive": "error"
  }
}
````

### Semantic HTML Rules
````tsx
// ✅ Correct - use button for interactive elements
<button onClick={handleClick}>Click me</button>

// ❌ Wrong - don't use div for buttons
<div onClick={handleClick}>Click me</div>

// ✅ Correct - labels for form fields
<label htmlFor="email">Email</label>
<input id="email" />

// ✅ Correct - keyboard + mouse events together
<div
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  role="button"
  tabIndex={0}
>
````

## Homepage Design

Create an **engaging, immediate showcase**:
````tsx
// Hero section
<Hero>
  <h1>RTL-First Design System</h1>
  <p>Built for the GCC market. Arabic and English, equal citizens.</p>
  
  <LiveDemo>
    {/* Interactive component right on homepage */}
    <Button>Try it live</Button>
    <Toggle />  {/* LTR ↔ RTL instantly */}
  </LiveDemo>
</Hero>

// Immediate value
<Features>
  <Feature icon={<Zap />}>
    <h3>91 Components</h3>
    <p>Complete UI toolkit</p>
  </Feature>
  
  <Feature icon={<Globe />}>
    <h3>True Bilingual</h3>
    <p>RTL-first architecture</p>
  </Feature>
  
  <Feature icon={<Accessibility />}>
    <h3>Accessible</h3>
    <p>WCAG AA compliant</p>
  </Feature>
</Features>

// Visual showcase (like your screenshots)
<ComponentGrid>
  {/* 6-9 hero components with mini demos */}
</ComponentGrid>
````

## Component Page Template

Each component page should have:
````markdown
# ComponentName

[One-line description]

## Preview

<ComponentShowcase>
  [Live demo with controls]
</ComponentShowcase>

## Installation
```bash
npm install @your-design-system/component-name
```

## Usage

### React
```tsx
import { ComponentName } from '@/components/ui/component-name';

<ComponentName variant="primary" />
```

### Vanilla HTML
```html
<div class="component-name component-name--primary">
  Content
</div>
<script>
  initComponentName(document.querySelector('.component-name'));
</script>
```

## Props

<PropsTable />

## Examples

### Basic
[Example 1]

### With Icons
[Example 2]

### RTL Support
[Example 3 - side by side]

## Accessibility

- Keyboard: Tab, Enter, Space, Escape
- Screen reader: [What's announced]
- ARIA: [Roles and attributes used]

## RTL Considerations

[Specific RTL behavior of this component]

## Related Components

- [Component 1]
- [Component 2]
````

## Design Token Structure
````typescript
// lib/tokens.ts
export const tokens = {
  colors: {
    primary: {
      50: '#...',
      // ... 100-900
    },
    // ... rest
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    // ...
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      // ...
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    // ...
  },
  radius: {
    none: '0',
    sm: '0.125rem',
    // ...
  }
};

// Export as CSS variables
export function applyTokens(theme: Theme) {
  // Convert to CSS custom properties
}
````

## Tailwind Integration
````javascript
// tailwind.config.js
const { tokens } = require('./lib/tokens');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      boxShadow: tokens.shadows,
      borderRadius: tokens.radius,
    },
  },
  plugins: [
    require('tailwindcss-logical'),  // CRITICAL
  ],
};
````

Show this config prominently in docs with explanation of how to modify for custom themes.

## Key Deliverables

1. **Fully functional Next.js app** with all pages
2. **ComponentShowcase** with live demos and LTR/RTL toggle
3. **Props documentation** for all 91 components
4. **Design tokens** showcase page
5. **Theme switcher** (4 themes working)
6. **Light/Dark mode** toggle
7. **Motion-reduced mode** respect
8. **ESLint config** with a11y rules
9. **Syntax highlighting** for all code blocks
10. **Engaging homepage** with immediate value

## Quality Standards

- **TypeScript**: Strict mode, no `any`
- **Accessibility**: Pass axe DevTools audit
- **Performance**: Lighthouse score > 90
- **RTL**: Perfect mirroring, no layout breaks
- **Responsive**: Mobile-first, works on all sizes
- **Semantic HTML**: Always use correct elements
- **Keyboard nav**: All interactions work with keyboard

## Reference Inspiration

**Visual style like:**
- Tailwind CSS docs (clean, professional)
- Shadcn/ui (component showcase)
- Radix UI docs (props tables)

**But with:**
- Side-by-side LTR/RTL comparison (like the screenshots provided)
- Arabic content throughout
- Token-based theming showcase
- 4 distinct theme variations

---

Build this as a **production-ready documentation site** that showcases the design system beautifully while being itself an example of excellent RTL-first, accessible, modern web development.

Focus on:
1. Clean, sophisticated aesthetics
2. Instant engagement (homepage hero)
3. Perfect RTL support
4. Comprehensive documentation
5. Live, interactive demos
6. Minimal dependencies
7. Accessibility excellence

Start with the homepage and core documentation components (ComponentShowcase, PropsTable, CodeBlock), then build out individual component pages.
