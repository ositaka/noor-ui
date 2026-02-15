# Case Study: Storybook Documentation System

**Created:** 2026-02-11
**Status:** Planning document used to build 27 MDX documentation pages for Storybook
**Related Components:** All 74 NoorUI components (documentation covers the entire system)

> This is the actual planning document used to add comprehensive documentation to NoorUI's Storybook instance. We're sharing it to help others facing the challenge of documenting a design system beyond just component showcases.

---

## Context

NoorUI currently has 74 components with 749 stories in Storybook, but **zero documentation pages**. The Storybook is a component showcase only -- it lacks the educational, foundational, and architectural documentation that defines world-class design systems like Carbon, Material, Chakra, and Polaris.

The goal is to add MDX documentation pages that:
- Make NoorUI accessible to non-technical people (designers, PMs, stakeholders)
- Showcase the architect's expertise in design system thinking
- Document the unique RTL-first, primitive-agnostic, multi-theme architecture
- Follow the structure and principles of Carbon Design System and other industry leaders

MDX support is already configured (`main.ts` line 10: `'../stories/**/*.mdx'`) and `@storybook/addon-docs` is installed.

---

## Sidebar Structure

Documentation categories appear **above** component categories. Each entry below is one MDX page in the Storybook sidebar.

```
WELCOME
  ├── Introduction                    ← Hero landing page
  ├── Why Design Systems              ← Business case (for non-technical audiences)
  └── Design Principles               ← NoorUI's 6 core principles

GETTING STARTED
  ├── Installation                    ← Copy-paste setup in 60 seconds
  ├── Usage Guide                     ← Provider hierarchy, imports, cn()
  └── For Designers                   ← How to use Storybook as design reference

FOUNDATION
  ├── Colors                          ← Interactive palette with all themes
  ├── Typography                      ← Bilingual type system, direction-aware
  ├── Spacing & Layout                ← Logical properties, spacing scale
  ├── Shadows & Elevation             ← Shadow scale across themes
  ├── Border Radius                   ← Per-theme radius comparison
  ├── Motion & Animation              ← Animation tokens, reduced motion
  └── Icons                           ← Phosphor integration, RTL mirroring rules

THEMING
  ├── Overview                        ← 4 themes, how CSS class switching works
  ├── Token Architecture              ← 3-layer system (CSS vars → @theme → overrides)
  ├── Dark Mode                       ← Class-based dark mode across all themes
  └── Creating Custom Themes          ← Step-by-step guide to build a new theme

PATTERNS
  ├── RTL Development                 ← The 5 lessons, checklist, patterns
  ├── Bidirectional Typography         ← Arabic/English text interaction, BiDi algorithm
  ├── Accessibility                   ← WCAG AA, Radix primitives, keyboard nav
  ├── Form Patterns                   ← Composing form components, validation
  └── Composition                     ← asChild, CVA, cn(), building on NoorUI

ARCHITECTURE
  ├── Technical Overview              ← Stack, provider hierarchy, build pipeline
  ├── Primitive-Agnostic Design       ← Why the API stays stable if Radix changes
  ├── Internationalization            ← The i18n system, adding languages
  ├── GCC-Specific Components         ← Hijri, prayer times, Arabic numerals, Zakat
  └── AI Components                   ← Chat UI, streaming, workflow canvas

─── Components (existing) ───
  Basic (21 components)
  Forms (12 components)
  Navigation & Layout (7 components)
  Data Display (8 components)
  Overlay (6 components)
  Feedback (4 components)
  GCC-Specific (4 components)
  AI (12 components)
```

**Total: 27 MDX documentation pages** (23 originally planned + 4 additional)

---

## Shared Doc Components

These React components render inside MDX pages to make documentation interactive:

| Component | Purpose |
|-----------|---------|
| `ColorPalette` | Reads CSS vars, renders swatch grid, updates live with theme changes |
| `TokenTable` | Generic table for any token set with copy-to-clipboard |
| `ThemeComparison` | Renders same component in all 4 themes side by side |
| `DirectionComparison` | Side-by-side LTR/RTL rendering |
| `DesignDecision` | Styled callout block for architecture decisions |
| `CodeBlock` | Syntax-highlighted code with copy button |

---

## Page Details

### Tier 1: Welcome (audience: everyone)

**Introduction** -- The "hero" page. What NoorUI is, the meaning of "Noor" (light in Arabic), a live interactive demo of a component in both LTR/RTL, key stats (74 components, 4 themes, 2 languages, WCAG AA). Links to all sections.

**Why Design Systems** -- The business case. Why design systems save time and money, ensure consistency, and scale. Industry references (Brad Frost's Atomic Design, Sparkbox surveys). Why NoorUI exists: the gap in RTL-first tooling. Written for PMs and stakeholders, not just developers.

**Design Principles** -- NoorUI's 6 guiding principles with concrete code examples:
1. RTL-First, Never Retrofitted
2. Semantic over Visual (tokens, not hex codes)
3. Composition over Configuration (small composable pieces)
4. Accessible by Default (Radix primitives)
5. Primitive-Agnostic (API stability regardless of internals)
6. Culturally Aware (GCC-specific components, Arabic typography)

### Tier 2: Getting Started (audience: developers)

**Installation** -- npm/pnpm install, CSS setup, provider setup code, first component rendering.

**Usage Guide** -- Import patterns, the `cn()` utility, provider hierarchy, `useDirection()` hook, theme switching, a complete page layout example.

**For Designers** -- Non-code guide to navigating Storybook: toolbar controls, how to find a component, how to read the Controls panel, how token names map to design decisions.

### Tier 3: Foundation (audience: designers + developers)

**Colors**, **Typography**, **Spacing & Layout**, **Shadows & Elevation**, **Border Radius**, **Motion & Animation**, **Icons** -- Each with interactive components, live rendering, and design token reference tables.

### Tier 4: Theming

**Overview**, **Token Architecture**, **Dark Mode**, **Creating Custom Themes** -- Documenting NoorUI's 4-theme system, the 3-layer token architecture, and extensibility.

### Tier 5: Patterns

**RTL Development**, **Bidirectional Typography**, **Accessibility**, **Form Patterns**, **Composition** -- Developer-focused guides with interactive demos and code examples.

### Tier 6: Architecture

**Technical Overview**, **Primitive-Agnostic Design**, **Internationalization**, **GCC-Specific Components**, **AI Components** -- Deep architecture documentation for senior developers.

---

## Configuration Changes

1. **`preview.tsx`** -- Added doc categories to `storySort` ordering (above component categories)
2. **`manager.ts`** -- Made direction/theme/mode/locale toolbar controls visible for doc readers
3. **`main.ts`** -- Added `@/docs` Vite alias and `@storybook/blocks` alias (resolved to `@storybook/addon-docs/blocks` for Storybook v10 compatibility)

---

## Implementation Notes

### MDX2 Parsing Pitfalls
- `*` characters inside `<code>` tags within JSX `<p>` blocks are interpreted as markdown emphasis by MDX2
- Fix: Use JSX string expressions `{"text with * chars"}` instead of mixing `<code>` with `*`

### Storybook v10 Module Resolution
- `@storybook/blocks` is not a standalone package in v10 -- it's exported from `@storybook/addon-docs/blocks`
- Fix: Added a Vite alias in `main.ts` using `createRequire` for ESM compatibility

### Consumer-Facing Imports
- All code examples use `import { Component } from 'noorui-rtl'` (flat package export)
- Internal utilities not exported from the package (like `content` from `@/lib/i18n`) are marked with comments

---

## Existing Content Reused

| Source File | Feeds Into |
|-------------|-----------|
| `docs/development/RTL_BEST_PRACTICES.md` | Patterns/RTL Development |
| `docs/case-studies/ai-llm-components-design-process.md` | Architecture/AI Components |
| `docs/case-studies/i18n-architecture-decisions.md` | Architecture/Internationalization |
| `docs/architecture/MULTILINGUAL_STRATEGY.md` | Architecture/Internationalization |
| `docs/case-studies/npm-package-architecture.md` | Architecture/Technical Overview |
| `lib/tokens.ts` | Foundation pages (Colors, Spacing, Shadows, Radius, Typography) |
| `styles/globals.css` | Foundation + Theming pages (all CSS custom properties) |

---

## Results

- **27 MDX documentation pages** initially created across 6 categories
- **6 shared interactive React components** for documentation
- Build compiles cleanly, TypeScript passes
- All code examples use consumer-facing `from 'noorui-rtl'` imports

### Consolidation (2026-02-11)

Consolidated 27 pages down to **5 lean pages** under a single "Docs" sidebar category:
- **Welcome** — Why this Storybook exists, key stats, one interactive demo
- **Getting Started** — Install, CSS, providers, first component
- **Colors** — Live interactive palette (uniquely valuable in Storybook)
- **Theming** — Brief intro + preview image + link to noorui.com/themes
- **RTL Development** — Brief intro + preview image + link to noorui.com/rtl-guide

**Rationale:** noorui.com is the comprehensive documentation resource. Storybook should be lean -- just enough to orient someone, then let the 749 component stories do the talking. The 22 removed pages largely duplicated website content. Total entries: **764** (5 doc pages + 749 stories + 10 auto-generated).
