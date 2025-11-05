# RTL-First Design System

A comprehensive, modern documentation website for a **bilingual (English/Arabic) design system** with full RTL support.

Built for the GCC market with accessibility, performance, and user experience as top priorities.

## 🌟 Features

- **RTL-First Architecture**: Designed for Arabic from the ground up, with English as an equally-supported alternative
- **91 Components** (in progress): Complete UI toolkit from basic elements to complex patterns
- **4 Distinct Themes**: Minimal, Futuristic, Cozy, and Artistic - all powered by the same design tokens
- **Full Accessibility**: WCAG AA compliant with comprehensive keyboard navigation and screen reader support
- **Token-Based Design**: All design decisions flow from design tokens, enabling easy customization
- **Modern Stack**: Built with Next.js 14, TypeScript, Tailwind CSS, and Radix UI
- **Perfect RTL Support**: Logical properties throughout, direction-aware animations and icons
- **Light/Dark Mode**: Seamless theme switching with respect for user preferences
- **Motion Sensitivity**: Respects `prefers-reduced-motion` for accessibility

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Homepage
│   └── components/          # Component documentation pages
│       ├── page.tsx         # Components overview
│       └── button/          # Example component page
│           └── page.tsx
│
├── components/
│   ├── ui/                  # Design system components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   │
│   ├── docs/                # Documentation-specific components
│   │   ├── component-showcase.tsx  # Live demo with LTR/RTL toggle
│   │   ├── props-table.tsx         # API documentation table
│   │   ├── code-block.tsx          # Syntax-highlighted code blocks
│   │   ├── theme-switcher.tsx      # 4-theme switcher
│   │   ├── theme-toggle.tsx        # Light/dark mode toggle
│   │   └── direction-toggle.tsx    # LTR/RTL toggle
│   │
│   └── providers/
│       └── theme-provider.tsx      # Next-themes wrapper
│
├── lib/
│   ├── tokens.ts            # Design token definitions
│   ├── utils.ts             # Utility functions (cn, RTL helpers)
│   └── i18n.ts              # Internationalization content
│
├── styles/
│   └── globals.css          # Global styles with theme CSS variables
│
└── public/                   # Static assets
```

## 🎨 Design System

### Core Components (Implemented)

- **Button**: 6 variants, 5 sizes, loading states, icon support
- **Card**: Header, content, footer composition
- **Input**: Text input with RTL support
- **Label**: Form labels with accessibility
- **Badge**: Status indicators
- **Separator**: Visual dividers

### Documentation Components

- **ComponentShowcase**: Live interactive demos with LTR/RTL comparison
- **PropsTable**: Searchable API documentation tables
- **CodeBlock**: Syntax-highlighted code with copy functionality
- **ThemeSwitcher**: Live theme switching between 4 themes
- **DirectionToggle**: Switch between LTR and RTL
- **ThemeToggle**: Light/dark mode switcher

## 🌍 Internationalization

Real Arabic content throughout the application, not lorem ipsum. Content is organized by context in `lib/i18n.ts`:

- Navigation
- Homepage (hero, features, showcase)
- UI elements (buttons, forms, status messages)
- Documentation
- GCC-specific content (Hijri dates, prayer times)

## 🎭 Themes

All four themes are built from the same design tokens, demonstrating the power of a token-based system:

1. **Minimal**: Clean, lots of white space, subtle borders
2. **Futuristic**: Dark mode optimized with gradients and glassmorphism
3. **Cozy**: Warm tones, softer corners, gentle shadows
4. **Artistic**: Typography-focused with elegant accents

Switch themes live on the homepage to see the transformation!

## ♿ Accessibility

- **WCAG AA Compliance**: Semantic HTML, proper contrast ratios, focus management
- **ESLint jsx-a11y Rules**: Enforced accessibility rules during development
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and roles
- **Motion Sensitivity**: Respects `prefers-reduced-motion`
- **Focus Management**: Clear focus indicators with ring utilities

### Keyboard Shortcuts

- `Tab`: Navigate between interactive elements
- `Enter`/`Space`: Activate buttons and controls
- `Escape`: Close modals and overlays (when implemented)

## 🔄 RTL Support

RTL support is built-in from the ground up:

### Logical Properties

All spacing uses logical properties:
- `ms-*` instead of `ml-*` (margin-inline-start)
- `me-*` instead of `mr-*` (margin-inline-end)
- `ps-*` instead of `pl-*` (padding-inline-start)
- `pe-*` instead of `pr-*` (padding-inline-end)

### Direction-Aware Icons

Icons automatically flip in RTL mode using the `me-*` and `ms-*` utilities:

```tsx
<Button>
  <ArrowLeft className="me-2 h-4 w-4" />
  Back
</Button>
```

In RTL, the icon appears on the right side and points right.

### Font Switching

Fonts automatically switch based on direction:
- LTR: Inter (sans-serif)
- RTL: IBM Plex Sans Arabic

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: Radix UI for accessibility
- **Utilities**:
  - `class-variance-authority` for component variants
  - `tailwind-merge` and `clsx` for class merging
  - `next-themes` for theme management
  - `react-syntax-highlighter` for code blocks
- **Icons**: Lucide React
- **Fonts**: Inter, IBM Plex Sans Arabic, JetBrains Mono

## 📝 Adding Components

### 1. Create the Component

```tsx
// components/ui/new-component.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface NewComponentProps {
  variant?: 'default' | 'special'
  // ... other props
}

export const NewComponent = React.forwardRef<
  HTMLDivElement,
  NewComponentProps
>(({ variant = 'default', className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('base-styles', className)}
      {...props}
    />
  )
})

NewComponent.displayName = 'NewComponent'
```

### 2. Create Documentation Page

```tsx
// app/components/new-component/page.tsx
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { NewComponent } from '@/components/ui/new-component'

export default function NewComponentPage() {
  return (
    <div>
      <h1>New Component</h1>

      <ComponentShowcase>
        <ComponentShowcase.Demo>
          <NewComponent />
        </ComponentShowcase.Demo>
      </ComponentShowcase>

      <PropsTable props={[...]} />
      <CodeBlock code="..." />
    </div>
  )
}
```

## 🎯 Design Tokens

Design tokens are defined in `lib/tokens.ts`:

```typescript
export const tokens = {
  colors: { /* primary, secondary, semantic colors */ },
  spacing: { /* xs to 5xl */ },
  typography: { /* font families, sizes, weights */ },
  shadows: { /* sm to 2xl */ },
  radius: { /* none to full */ },
  transitions: { /* fast to slower */ },
  breakpoints: { /* sm to 2xl */ },
}
```

Tokens are converted to CSS custom properties in `styles/globals.css` and consumed via Tailwind's theme configuration.

## 🔧 Configuration Files

- **tailwind.config.ts**: Tailwind configuration with design tokens
- **tsconfig.json**: TypeScript configuration (strict mode)
- **.eslintrc.json**: ESLint with jsx-a11y rules
- **next.config.js**: Next.js configuration
- **postcss.config.js**: PostCSS with Tailwind and Autoprefixer

## 📦 Dependencies

### Core
- `next@^14.2.0`
- `react@^18.3.0`
- `typescript@^5.3.0`

### Styling
- `tailwindcss@^3.4.0`
- `tailwindcss-logical@^3.0.0` (Critical for RTL)
- `class-variance-authority@^0.7.0`
- `clsx@^2.1.0`
- `tailwind-merge@^2.2.0`

### UI Components
- `@radix-ui/react-*` (Multiple Radix UI primitives)
- `lucide-react@^0.344.0`

### Features
- `next-themes@^0.2.1`
- `react-syntax-highlighter@^15.5.0`
- `framer-motion@^11.0.0`

### Development
- `eslint@^8.56.0`
- `eslint-plugin-jsx-a11y@^6.8.0`

## 🚧 Roadmap

- [ ] Complete remaining 85+ components
- [ ] Add Storybook integration
- [ ] Create component generator CLI
- [ ] Add more complex examples
- [ ] Implement search functionality
- [ ] Add component playground
- [ ] Create Figma design kit
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Performance optimizations
- [ ] SEO improvements

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and code of conduct.

## 📧 Support

For questions and support, please open an issue on GitHub.

---

**Built with ❤️ for the GCC market**
