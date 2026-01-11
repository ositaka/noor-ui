# Noor UI ✨

> نور - "Light" in Arabic

A comprehensive, modern design system built specifically for **bilingual applications** with full **Arabic/English support** and perfect RTL implementation.

Bringing light to multilingual interface design with accessibility, performance, and user experience as top priorities.

## 🌟 Features

- **RTL-First Architecture**: Designed for Arabic from the ground up, with English as an equally-supported alternative
- **74 Components**: Complete UI toolkit with comprehensive coverage of common patterns
- **GCC-Specific Components**: Prayer times, Hijri calendar, Arabic numbers, Zakat calculator, and dual-calendar date picker built for the region
- **Zero Directional Bugs**: 100% logical properties, no hardcoded LTR assumptions
- **Direction-Aware Components**: Tabs, navigation, and layouts automatically adapt to text direction
- **4 Distinct Themes**: Minimal, Futuristic, Cozy, and Artistic - all powered by the same design tokens
- **Full Accessibility**: WCAG AA compliant with comprehensive keyboard navigation and screen reader support
- **Token-Based Design**: All design decisions flow from design tokens, enabling easy customization
- **Modern Stack**: Built with Next.js 14, TypeScript, Tailwind CSS, and Radix UI
- **Real Arabic Content**: Authentic GCC-focused content, not lorem ipsum
- **Production-Ready Starters**: 2 complete applications (Blog Dashboard, E-commerce) you can copy and deploy immediately
- **17+ Real-World Examples**: Dashboard, forms, data tables, GCC-specific apps, and experimental AI chat interfaces
- **Light/Dark Mode**: Seamless theme switching with respect for user preferences
- **Command Palette**: Quick navigation (Cmd+K) across all components and pages
- **Clean Architecture**: Next.js route groups with shared layouts for maintainability
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
│   │
│   ├── (docs)/              # Route group for documentation pages
│   │   ├── layout.tsx       # Shared header/footer for all docs
│   │   ├── components/      # Component documentation (74 pages)
│   │   │   ├── page.tsx     # Components overview
│   │   │   └── button/      # Example component page
│   │   │       └── page.tsx
│   │   ├── documentation/   # Guides and documentation
│   │   ├── tokens/          # Design tokens reference
│   │   ├── themes/          # Theme customization
│   │   ├── getting-started/ # Getting started guide
│   │   ├── rtl-guide/       # RTL development guide
│   │   └── examples/        # Examples listing page
│   │
│   └── examples/            # Standalone example pages (no header/footer)
│       ├── dashboard/       # Analytics dashboard example
│       ├── ecommerce/       # Product page example
│       └── registration/    # Multi-step form example
│
├── starters/                # 🆕 Production-ready starter applications
│   ├── blog-dashboard/     # Full-featured blog with Supabase
│   │   ├── app/            # Auth, dashboard, and post management
│   │   ├── lib/supabase/   # Database schema and client
│   │   ├── hooks/          # Auth hooks
│   │   └── README.md       # Complete setup guide
│   └── README.md           # Starters overview
│
├── components/
│   ├── ui/                  # Design system components (50+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx        # Direction-aware with Radix UI
│   │   └── separator.tsx
│   │
│   ├── layout/              # Layout components
│   │   ├── site-header.tsx  # Global navigation header
│   │   └── site-footer.tsx  # Global footer
│   │
│   ├── docs/                # Documentation-specific components
│   │   ├── component-showcase.tsx  # Live demo with LTR/RTL toggle
│   │   ├── props-table.tsx         # API documentation table
│   │   ├── code-block.tsx          # Syntax-highlighted code blocks
│   │   ├── global-search.tsx       # Command palette (Cmd+K)
│   │   ├── theme-switcher.tsx      # 4-theme switcher
│   │   ├── theme-toggle.tsx        # Light/dark mode toggle
│   │   └── direction-toggle.tsx    # LTR/RTL toggle
│   │
│   └── providers/
│       ├── direction-provider.tsx  # RTL/LTR and locale context
│       ├── design-system-provider.tsx  # Theme management
│       └── client-providers.tsx    # Combined client providers
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

## 🏗️ Architecture

This design system uses **Next.js 14 App Router** with a **route group architecture** for clean separation of concerns:

### Route Groups
- **`(docs)`**: Contains all documentation pages with shared layout (header/footer)
  - Component documentation (74 pages covering 74+ components)
  - Guide pages (installation, configuration, RTL guide, etc.)
  - Token and theme reference pages
- **`examples/`**: Standalone demo pages without navigation chrome
  - Immersive full-screen experiences
  - Dashboard, E-commerce, Registration form

### Layout System
- **Root Layout** (`app/layout.tsx`): Provides theme and direction context
- **Docs Layout** (`app/(docs)/layout.tsx`): Adds header/footer to all doc pages
- **Benefits**:
  - DRY principle - header/footer defined once
  - Easy maintenance - changes propagate automatically
  - Clean page components - focus on content, not chrome

### Direction Context
All components access direction through `useDirection()` hook:
```tsx
const { direction, locale, setDirection } = useDirection()
// direction: 'ltr' | 'rtl'
// locale: 'en' | 'ar'
```

This enables:
- Automatic font switching (Inter for English, IBM Plex Sans Arabic for Arabic)
- Bidirectional component behavior (Tabs, navigation)
- Conditional rendering based on locale

## 🎨 Design System

### All Components (74+ Total)

**Current Status:** 74+ components fully documented. See the [public roadmap](/roadmap) for upcoming features.

**Form Components:**
- **Form**: State management with validation and bilingual error messages
- **Button**: 6 variants, 5 sizes, loading states, icon support
- **Input**: Text input with full RTL support
- **Label**: Form labels with accessibility
- **Textarea**: Multi-line text input
- **Checkbox**: Selection control with indeterminate state
- **Radio Group**: Single selection from options
- **Select**: Dropdown selection with search
- **Switch**: Toggle control
- **Slider**: Range input

**Layout Components:**
- **Card**: Header, content, footer composition
- **Separator**: Visual dividers with orientation
- **Tabs**: Direction-aware tabbed interface with keyboard navigation
- **Accordion**: Collapsible content sections
- **Collapsible**: Simple show/hide content

**Navigation Components:**
- **Breadcrumb**: Hierarchical navigation
- **Pagination**: Page navigation with RTL support
- **Command**: Command palette / search interface

**Feedback Components:**
- **Alert**: Contextual feedback messages
- **Toast**: Temporary notifications
- **Progress**: Progress indicators
- **Skeleton**: Loading placeholder with shimmer animation
- **Badge**: Status and count indicators
- **Avatar**: User profile images with fallbacks

**Overlay Components:**
- **Dialog**: Modal dialogs
- **Sheet**: Slide-in panels (drawer)
- **Popover**: Floating content
- **Tooltip**: Contextual hints
- **Dropdown Menu**: Action menus
- **Context Menu**: Right-click menus

**Data Display:**
- **Table**: Structured data display with RTL text alignment
- **DataTable**: Advanced data table with sorting, filtering, pagination, and loading states
- **StatsCard**: Statistics display with icon, label, value, and optional trend indicator
- **FeatureCard**: Feature showcase card with icon, title, description for marketing/landing pages
- **EmptyState**: Empty state placeholder with icon, title, description, and optional action button
- **ListingCard**: Flexible card component for displaying listings (real estate, products, jobs) with image, badges, stats, tags, and actions

**GCC-Specific Components:**
- **Prayer Times**: Display Islamic prayer times with countdown timer, next prayer highlighting, and Adhan notification UI variant
- **Hijri Date**: Show both Gregorian and Hijri (Islamic calendar) dates with multiple layout variants
- **Arabic Number**: Comprehensive utilities for Arabic-Indic numerals (٠-٩) and SAR currency formatting
- **Zakat Calculator**: Calculate Islamic Zakat obligations with Nisab checking, multi-asset support, and export/sharing features (copy, print, download)
- **Calendar**: Date picker with dual Gregorian/Hijri calendar, event markers, range selection, and full RTL support

**Advanced Forms & Inputs:**
- **File Upload**: Drag-and-drop file upload with preview, progress tracking, multiple file support, and file type validation
- **Rich Text Editor**: Full-featured WYSIWYG editor built with TipTap, supporting text formatting, lists, links, and bilingual content
- **Date Picker**: Single and range date selection with calendar popover, min/max dates, disabled dates, and Hijri calendar support
- **Time Picker**: 12/24-hour time selection with AM/PM toggle, hour/minute inputs, and quick actions (Now, Clear)
- **Number Input**: Formatted number input with increment/decrement controls, min/max validation, precision, and thousands separator

**Layout & Shell:**
- **Dashboard Shell**: Pre-built dashboard layout with sidebar navigation, header, and content area

**User Interface:**
- **User Menu**: User profile dropdown with avatar, account settings, and sign-out options
- **Notification Center**: Notification panel with unread indicators, categorization, and mark-as-read functionality
- **Stepper**: Multi-step progress indicator with 3 variants (default, simple, circles), horizontal/vertical orientations, and clickable steps

**AI/LLM Components:** 🧪 **Experimental**
- **ChatMessage**: User/assistant/system message bubbles with avatars, timestamps, markdown rendering, and action buttons
- **StreamingText**: Typewriter effect animation for simulating real-time AI text generation with configurable speed
- **PromptInput**: Enhanced textarea for AI prompts with auto-resize and attachment support
- **ThinkingIndicator**: Animated loading states showing AI is processing (dots, pulse, wave, typing variants)
- **MessageActions**: Action toolbar for messages with copy, regenerate, edit, share, and feedback buttons
- **ModelSelector**: Dropdown for choosing AI models with specs display and recommended badges
- **ParameterSlider**: Control AI parameters (temperature, max tokens, top-p) with visual presets
- **TokenCounter**: Real-time token usage display with progress bar and color coding
- **ConversationHistory**: Sidebar for managing past conversations with search and date grouping
- **WorkflowCanvas**: Visual workflow builder with drag-and-drop nodes and connections

> **Note:** AI/LLM components are functional but still in experimental phase. APIs may change as we gather feedback from real-world usage.

### Documentation Components

- **ComponentShowcase**: Live interactive demos with LTR/RTL comparison
- **PropsTable**: Searchable API documentation tables
- **CodeBlock**: Syntax-highlighted code with copy functionality and theme support
- **GlobalSearch**: Command palette (Cmd+K) for quick navigation across all pages
- **ThemeSwitcher**: Live theme switching between 4 themes
- **DirectionToggle**: Switch between LTR and RTL
- **ThemeToggle**: Light/dark mode switcher
- **SiteHeader**: Global navigation with bilingual content
- **SiteFooter**: Global footer with links and bilingual content

### Production-Ready Starters

Complete, deployable applications built with Noor UI components. **[View all starters →](./starters/)**

- **📝 Blog Dashboard**: Full-featured bilingual blog platform with Supabase
  - User authentication (signup/login)
  - Rich text editor for blog posts
  - Image uploads to Supabase Storage
  - Post management (create, edit, delete, publish/draft)
  - Search and filtering
  - Complete bilingual support (EN/AR)
  - **[Setup Guide →](./starters/blog-dashboard/)**

- **🛍️ E-commerce Starter**: Complete shop with cart and checkout
  - Product catalog with filtering
  - Shopping cart with localStorage persistence
  - Checkout flow
  - Order management
  - Bilingual product content
  - **[Setup Guide →](./starters/ecommerce/)**

Coming soon: SaaS Starter, Landing Page, Analytics Dashboard

### Real-World Examples

Production-ready examples showcasing component composition and real use cases:

**AI/LLM Examples:** 🧪 **Experimental**
- **Simple AI Chat**: Clean conversational interface with message history and streaming responses
- **Advanced AI Playground**: Full-featured AI interaction with parameter controls, model selector, and token counter
- **AI Code Assistant**: Coding helper with syntax highlighting, code explanation, and improvement suggestions
- **Document Q&A**: Upload documents and ask questions with citation references and bilingual document support
- **Multi-Agent Chat**: Multiple AI personas collaborating in conversations with comparison and debate modes
- **AI Workflow**: Visual workflow builder with LLM integration, token tracking, and cost estimation

> **Note:** AI examples use mock responses for demonstration. These showcase the UI/UX patterns - integrate with your preferred AI provider (OpenAI, Anthropic, etc.) for production use.

**Business & E-commerce:**
- **Marketplace**: Multi-vendor marketplace with product listings, vendor dashboards, shopping cart, checkout flow, and order management
- **B2B Marketplace**: Business marketplace with bulk ordering, volume pricing tiers, RFQ (Request for Quote) system, and credit terms
- **CMS/Blog Admin Dashboard**: Complete content management system with posts list (DataTable), rich text editor, file upload, analytics dashboard, and hash-based navigation
- **E-commerce Product Page**: Image gallery, color/size selection, reviews with ratings, and related products grid

**GCC-Specific:**
- **GCC Community Dashboard**: Complete showcase of all GCC-specific components including Prayer Times, Hijri Date, Zakat Calculator, and Arabic Number formatting
- **Islamic Finance Dashboard**: Comprehensive Islamic finance management featuring Zakat calculator with export, investment portfolio tracking, Hijri calendar with Islamic events, and prayer times integration

**General:**
- **DataTable Showcase**: Advanced data table demonstration with 50 sample users, live sorting/filtering, pagination, search, export to CSV, and mobile-responsive cards view
- **Multi-Step Registration Form**: 4-step registration with validation, progress indicators, and bilingual error messages
- **Analytics Dashboard**: Stats cards, revenue charts, transaction tables (with responsive mobile layout), and activity feeds

All examples feature:
- Full RTL support with real Arabic content
- Mobile-responsive layouts
- GCC market focus (SAR currency, regional data)
- Professional loading states
- Accessible keyboard navigation

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

### Development
- `eslint@^8.56.0`
- `eslint-plugin-jsx-a11y@^6.8.0`

## 📋 Planning & Strategy

This project follows a deliberate phased approach. See our planning documents for detailed development strategy:

- **[ROADMAP.md](./ROADMAP.md)** - 4-phase development plan with timeline and success metrics
- **[NPM_PACKAGE_STRATEGY.md](./NPM_PACKAGE_STRATEGY.md)** - Packaging strategy for Phase 3 (after validation)
- **[COMPONENT_CHECKLIST.md](./COMPONENT_CHECKLIST.md)** - Component tracking and status
- **[MULTILINGUAL_STRATEGY.md](./MULTILINGUAL_STRATEGY.md)** - i18n patterns and bilingual content management

**Current Phase:** Phase 1 (Foundation & Discovery) - Building real-world demos to validate component patterns before packaging.

## 🚧 Roadmap

### Phase 1: Complete the Foundation ✅
- [x] Add documentation for all 32 components
- [x] Add Form component with validation
- [x] Create real-world demo pages (Dashboard, Forms, E-commerce)
- [x] Implement proper layout architecture with route groups
- [x] Add syntax highlighting to all code examples
- [x] Create global navigation and footer
- [x] Add command palette for quick navigation

### Phase 2: Enhance Consistency ✅
- [x] Add comprehensive hook library (useDirection for RTL/LTR context)
- [x] Make components direction-aware (Tabs component with Radix UI)
- [x] Bilingual content throughout (Dashboard and E-commerce examples)
- [x] Create reusable layout components (SiteHeader, SiteFooter)

### Phase 3: GCC-Specific Features ✅ COMPLETE
- [x] Hijri date display component with 4 variants
- [x] Prayer times display component with countdown timer
- [x] Arabic number formatting utilities (7 utility functions)
- [x] Zakat calculator with Nisab checking and multi-asset support
- [x] GCC Community Dashboard showcasing all GCC components
- [x] RTL-aware data tables with sorting, filtering, and pagination
- [x] Calendar component with Hijri support, events, and range selection

### Phase 4: Developer Experience
- [ ] Add Storybook integration
- [ ] Create component generator CLI
- [ ] Add unit tests for core components
- [ ] Add E2E tests
- [ ] Create Figma design kit
- [ ] Performance optimizations
- [ ] SEO improvements

### Phase 5: AI/LLM Shell 🧪 EXPERIMENTAL (Testing Phase)
- [x] ChatMessage component with user/assistant/system variants
- [x] StreamingText component with typewriter animation
- [x] PromptInput with auto-resize and attachment support
- [x] ThinkingIndicator with 4 animation variants
- [x] MessageActions toolbar for messages
- [x] ModelSelector with model specs display
- [x] ParameterSlider for AI controls (temp, tokens, top-p)
- [x] TokenCounter with progress and cost tracking
- [x] ConversationHistory sidebar
- [x] WorkflowCanvas with drag-and-drop nodes
- [x] Simple AI Chat example
- [x] Advanced AI Playground example
- [x] Code Assistant example
- [x] Document Q&A example
- [x] Multi-Agent Chat example
- [x] AI Workflow example
- [ ] Real API integrations (OpenAI, Anthropic, etc.)
- [ ] AI Chat Starter with Supabase backend
- [ ] Production validation and API refinement

**Status:** Components built and functional with mock data. Currently gathering feedback before marking as production-ready.

### Recent Improvements (November 2025)

**Latest Updates:**
- ✅ **New Documentation Pages**: Added comprehensive documentation for 4 new components (Stepper, Number Input, Date Picker, Time Picker) with interactive examples, API references, and real-world use cases
- ✅ **Production-Ready Forms**: Date Picker (single/range with calendar), Time Picker (12h/24h formats), Number Input (formatting/validation), Stepper (multi-step progress) - all fully documented
- ✅ **CMS Dashboard Example**: Complete content management system showcase with posts list, rich text editor, file upload, and analytics views
- ✅ **Advanced Components**: File Upload (drag-and-drop), Rich Text Editor (TipTap), Dashboard Shell (sidebar layout), User Menu, Notification Center - all production-ready
- ✅ **Public Roadmap**: Created comprehensive [public roadmap page](/roadmap) with 4-phase development plan, success metrics, and timeline visualization
- ✅ **New Components**: Added StatsCard, FeatureCard, EmptyState, and ListingCard components with full documentation
- ✅ **Build Fixed (Again)**: Resolved all TypeScript errors including complex DataTable generic type inference issues - project compiles with zero errors
- ✅ **Hydration Fix**: Resolved React hydration error in DataTable Showcase by replacing Math.random() with deterministic index-based data generation
- ✅ **Component Fixes**: Fixed PrayerTimes, ArabicNumber, HijriDate, Calendar, ZakatCalculator, and DataTable prop types and usage
- ✅ **Pagination Controls**: Added interactive Pagination component to DataTable Showcase with Previous/Next buttons, page numbers, ellipsis, and bilingual support
- ✅ **Bug Fix**: Corrected import path in Islamic Finance Dashboard (useDirection from correct provider location)

**Major Features Completed:**
- ✅ **New Showcase Examples**: Added Islamic Finance Dashboard (comprehensive finance management) and DataTable Showcase (advanced table with 50 sample users, export to CSV)
- ✅ **Phase 3 Complete & Production Ready!** Calendar component with dual Gregorian/Hijri dates, event markers, range selection - all Phase 3 features now implemented with proper Hijri conversion algorithm
- ✅ **Bug Fixes**: Fixed hydration error in Hijri Date docs, implemented accurate Hijri conversion (Julian Day Number algorithm), added Hijri month display to Calendar header
- ✅ **Calendar Component**: Date picker with Hijri support, event indicators, single/range selection, navigation, and disabled dates
- ✅ **Component Enhancements**: Added export/sharing to Zakat Calculator (copy, print, download, JSON) and Adhan notification variant to Prayer Times
- ✅ **DataTable Component**: Advanced data table with sorting, filtering, pagination, loading states, and mobile-responsive cards view
- ✅ **Added 5 GCC-Specific Components**: Prayer Times, Hijri Date, Arabic Number utilities, Zakat Calculator, Calendar
- ✅ **GCC Community Dashboard**: Complete example showcasing all GCC components in a real-world platform
- ✅ **Zakat Calculator**: Calculate Islamic Zakat obligations with Nisab thresholds and 6 asset types
- ✅ **Arabic Number Utilities**: 7 formatting functions for Arabic-Indic numerals and SAR currency
- ✅ **Prayer Times Component**: Display Islamic prayer times with countdown timer
- ✅ **Hijri Date Component**: Dual calendar display with 4 layout variants
- ✅ Refactored to use Next.js route groups for cleaner architecture
- ✅ Added shared layout (header/footer) for all documentation pages
- ✅ Made Tabs component fully direction-aware with Radix UI integration
- ✅ Added bilingual support to Dashboard and E-commerce examples
- ✅ Implemented CodeBlock component with proper syntax highlighting
- ✅ Created global command palette (Cmd+K) for navigation
- ✅ Fixed all component cross-references and removed broken links
- ✅ Added comprehensive documentation structure with 11 guide pages

## 👨‍💻 Author

**Nuno Marques**

Design systems engineer and developer passionate about creating accessible, multilingual interfaces for the GCC market.

- 🌐 Website: [ositaka.com](https://ositaka.com/)
- 💼 LinkedIn: [linkedin.com/in/ositaka](https://www.linkedin.com/in/ositaka/)
- 📝 Blog: [design-code.tips](https://design-code.tips/)

Noor UI was born from real-world experience building bilingual applications for the Middle East market and a commitment to making RTL-first development accessible to all developers.

---

## 📛 Trademark

**"Noor UI" is a trademark of Nuno Marques.**

While the code is MIT licensed and free to use, the name "Noor UI" and associated branding are protected trademarks.

### You are welcome to:

- ✅ Use Noor UI components in your projects (personal or commercial)
- ✅ Modify the code to fit your specific needs
- ✅ Study and learn from the implementation
- ✅ Contribute improvements back to the project

### Please don't:

- ❌ Publish a competing library or fork using the name "Noor UI"
- ❌ Create confusion about the official source
- ❌ Remove copyright notices or attribution from the code
- ❌ Use the Noor UI name or branding in misleading ways

### Derivative Works

If you create a derivative work based on Noor UI, please:
- Give it a **distinct, different name**
- Clearly state it was **derived from Noor UI**
- Maintain the **original copyright notices** in the code
- Consider linking back to the original project (appreciated!)

Example attribution: `"Based on Noor UI by Nuno Marques (https://github.com/ositaka/noor-ui)"`

**Official Sources:**
- GitHub: [github.com/ositaka/noor-ui](https://github.com/ositaka/noor-ui)
- npm: `@noorui/components` (when published)
- Website: (coming soon)

For questions about trademark use: info@ositaka.com

See the [NOTICE](./NOTICE) file for complete trademark information.

---

## 📄 License

**MIT License**

Copyright (c) 2025 Nuno Marques

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**Note:** The MIT License covers the code only. The "Noor UI" trademark is protected separately. See the Trademark section above.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and code of conduct.

## 📧 Support

For questions and support, please open an issue on GitHub.

---

**Built with ❤️ for the GCC market**
