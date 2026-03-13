# Changelog

All notable changes to Noor UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Timeline component**: Vertical event timeline with connecting lines, status-based styling (complete/current/upcoming), custom icons, date labels, and alternating layout. Supports compact mode for sidebar use, card wrapping for changelogs, and full RTL support via CSS logical properties. Accessible with `role="list"`, unique `aria-label`, and sr-only status text.
- **Chart component**: Unified charting component with line, bar, area, and donut variants. Built on Chart.js for proper canvas rendering. Fully RTL-aware with automatic axis flipping, Arabic-Indic numeral formatting, and theme-aware colors. Includes configurable `strokeWidth`, `fontSize`, `thickness` (donut), and `direction` override prop. Accessible with visually hidden data tables, `role="img"` figure wrappers, locale-aware sr-only summaries, multi-series dash patterns (WCAG 1.4.1), and `prefers-reduced-motion` support.

### Changed
- **DataTable i18n overhaul (BREAKING)**: Removed language-specific props (`headerAr`, `searchPlaceholderAr`, `emptyMessageAr`) in favor of a language-agnostic API. Consumers now pass a single localized string per prop (e.g., `header`, `searchPlaceholder`, `emptyMessage`) resolved from their own i18n system. This makes the component usable with any language, not just English and Arabic.
- **DataTable removed English defaults**: `searchPlaceholder`, `emptyMessage`, `nextLabel`, `previousLabel`, `pageLabel` no longer fall back to hardcoded English strings. Pass explicit values for all UI text.

### Added
- **DataTable `clearSearchLabel` prop**: Accessible label for the clear search button (`<span className="sr-only">`). Required for screen reader accessibility when search is enabled.
- **DataTable pagination a11y**: Added `aria-live="polite" aria-atomic="true"` to the pagination label so page changes are announced to screen readers.

## [0.9.0] - 2026-03-07

### Added
- **Form auto-id pairing**: `FormField` generates a unique id via `React.useId()` and provides it through shared context. `FormLabel` auto-reads `htmlFor` and `Input`, `Textarea`, `SelectTrigger`, `Checkbox`, `Switch` auto-read `id` — no manual id/htmlFor needed inside FormField
- **New file `lib/form-field-context.ts`**: Shared `FormFieldIdContext` consumed by form and input components
- **Calendar Arabic numerals**: Eastern Arabic numerals (٧، ٨، ٩) for day numbers, Hijri dates, event legend, and header year when `locale="ar"`
- **Calendar Hijri-primary mode**: When `locale="ar"` + `showHijri`, Hijri month/year becomes the primary heading with Arabic month names (رمضان، شعبان، etc.) and Gregorian as subtitle
- **Calendar Arabic Hijri month names**: Full Arabic names for all 12 Hijri months
- **Calendar weekday abbreviations**: Single-character weekday headers with `<abbr>` + `aria-label` for accessibility
- **Calendar container query header**: Responsive layout using `@container` — stacks at narrow widths, inline at ≥20rem
- **Calendar a11y**: `aria-labelledby` on root, `aria-label` on prev/next buttons, `role="columnheader"` on weekday headers

### Changed
- **Calendar today indicator**: Dims to subtle gray ring when another date is selected, preventing visual competition with the selection
- **Calendar selected hover**: Uses `bg-primary/90` instead of `hover:bg-muted` for a cohesive hover state on selected dates
- **Calendar Hijri selected color**: Hijri sub-number uses `text-primary-foreground/70` when the day is selected
- **Calendar UI text**: Now follows the `locale` prop for button labels (Today, aria-labels) instead of the global direction provider locale
- **Calendar day cell height**: `h-9` (non-Hijri) / `h-14` (Hijri) for better balance across widths
- **Cursor UX overhaul**: Added `cursor-pointer` to all interactive elements (Button, Label, Accordion trigger, Tabs trigger, Calendar days, Command items, Context/Dropdown menu items, Dialog/Sheet close, Collapsible trigger, Toast actions, Radio group, Rich text editor toolbar, Slider thumb). Changed `disabled:pointer-events-none` to `disabled:cursor-not-allowed` so disabled elements show the correct cursor instead of swallowing clicks silently
- **RadioGroup touch target**: Expanded hit area with `after:absolute after:-inset-[4px]` pseudo-element
- **Slider thumb spacing**: Added `py-2` to Slider root for thumb breathing room
- **Slider label a11y**: Changed from invalid `<label htmlFor>` to `aria-labelledby` pattern (Radix Slider renders `<span>`, not `<input>`)
- **Collapsible trigger**: Wrapped in forwardRef with `cursor-pointer` and `disabled:cursor-not-allowed` support

### Removed
- **FormControl component**: No longer needed — input components are now form-aware via context

## [0.8.2] - 2026-02-09

### Added
- **Squircle corners**: Added `--corner-shape: squircle` CSS variable as a global design token, applied to all elements via `corner-shape: var(--corner-shape)`. Progressive enhancement (Chrome 138+), graceful fallback to standard `border-radius` in other browsers. Overridable per theme.

## [0.8.1] - 2026-02-09

### Fixed
- **CSS layers**: Moved base styles (`border-border`, `bg-background`) into `@layer base` so utility hover classes like `hover:border-primary` work correctly in Tailwind v4
- **Header button heights**: Aligned search trigger height (`h-8`) with theme and direction toggle buttons
- **Anchor scroll offset**: Added `scroll-margin-top: 6rem` on `[id]` elements to clear the fixed header

### Changed
- **Header navigation**: Removed redundant "Home" link; added progressive collapse with "More" dropdown between `lg` and `xl` breakpoints
- **Visual sitemap page**: Added 8 missing components, 11 missing examples, 2 missing resource links; replaced hardcoded English with i18n keys
- **XML sitemap & search data**: Already updated in 0.8.0 but included here for completeness

## [0.8.0] - 2026-02-08

### Changed
- **Icon library migration**: Replaced `lucide-react` with `@phosphor-icons/react` (Duotone weight)
  - All ~130 icon imports across ~140 files migrated to Phosphor equivalents
  - Global `IconContext.Provider` with `weight: 'duotone'` and `color: 'currentColor'` set in `DesignSystemProvider`
  - New shared `IconComponent` type (`React.ComponentType<{ className?: string }>`) exported from `lib/types.ts`, replacing `LucideIcon`
  - Storybook preview updated with its own `IconContext.Provider` (can't share `DesignSystemProvider` due to Next.js router dependency)
  - RTL directional icon handling (`rtl:rotate-180`, `rtl:scale-x-[-1]`) works identically with Phosphor SVGs
  - `tsup.config.ts` externals updated: `lucide-react` → `@phosphor-icons/react`
  - `next.config.js` `optimizePackageImports` updated

### To Be Fixed
- **Popover Component**: RTL positioning issues in portal-rendered components
  - NotificationCenter popup appears on wrong side in RTL mode
  - TimePicker & TimeRangePicker popups appear on wrong side in RTL mode
  - Need to add automatic direction detection (similar to DropdownMenu pattern)

## [0.7.0] - 2026-02-07

### Breaking Changes
- **Tailwind CSS v4.1+ required**: Migrated from Tailwind v3 to v4.1 CSS-first configuration
  - Removed `tailwind.config.ts` — all design tokens now live in `@theme` blocks in CSS
  - Consumers using Option B (custom Tailwind setup) must update to Tailwind v4.1+ and use `@tailwindcss/postcss`
  - PostCSS config must use `@tailwindcss/postcss` instead of the old `tailwindcss` plugin
  - Option A (pre-compiled CSS via `import 'noorui-rtl/dist/styles.css'`) continues to work without changes
- **Theme classes now use `--color-*` variables**: Custom themes must use `--color-primary: hsl(...)` format

### Added
- **Custom Themes**: Theme system is now extensible — consumers can create custom themes by defining CSS classes that override design token variables
  - New `BuiltInTheme` type exported for referencing the 4 built-in themes
  - `Theme` type widened to accept any string while preserving autocomplete for built-in names
  - `DesignSystemProvider` now accepts any theme name (no longer restricted to hardcoded list)
  - Dynamic `theme-*` class removal replaces hardcoded class list for forward compatibility
- **Semantic status tokens**: `success`, `warning`, `info` (+ foreground variants) for consistent feedback colors across Alert, Callout, Toast, and Stats components
- **`tailwindcss` peer dependency**: Declared `tailwindcss: ">=4.1.0"` (optional) so package managers can warn about incompatible versions
- **Font family tokens**: `--font-sans`, `--font-arabic`, `--font-mono` registered in `@theme` for Tailwind utility generation
- **Shadow and animation tokens**: Full shadow scale (`sm` through `2xl`) and component animations registered in `@theme`
- **Documentation**: New "Custom Themes" section in README with step-by-step guide, CSS example, and variables reference
- **Documentation**: New "Creating Custom Themes" section on website Themes page with i18n support (EN + AR)

### Changed
- **CSS architecture**: Replaced `@layer base` with `@theme` blocks for design token registration
- **Dark mode**: Now uses `@custom-variant dark (&:where(.dark, .dark *))` instead of Tailwind v3 `darkMode: 'class'`
- **PostCSS**: Switched from `tailwindcss` + `autoprefixer` to `@tailwindcss/postcss` only
- **Theme classes**: Use `--color-*` and `--radius-lg/md/sm` for proper scoping
- **`useThemeTokens` hook**: Now reads `--color-*` variables
- **Types**: `themeConfig` now typed as `Record<BuiltInTheme, ...>` instead of `Record<Theme, ...>` for type safety with custom themes
- **Theme Switcher Components**: Updated to use `BuiltInTheme` type and dynamic class removal

### Fixed
- **Theme card previews**: Show correct per-theme colors and radius
- **i18n**: ~50 hardcoded English strings replaced with EN/AR translations
- **README**: Updated `@theme` block to include semantic status tokens, font families, and correct `:root` color values
- **README**: Fixed version claim from "Next.js 15, React 19" to "React 18+, Next.js 14+, Tailwind CSS 4.1+" to match actual peer dependencies
- **MIGRATION_GUIDE**: Removed stale reference to copying `tailwind.config.ts` (deleted in v0.6.0)

### Removed
- **`tailwind.config.ts`**: Deleted — all configuration is now CSS-first via `@theme` and `@custom-variant`

### Notes
This is a significant release covering the Tailwind v3 → v4 migration, `--color-*` variable refactoring, custom themes system, and i18n improvements. Consumers using Option A (pre-compiled CSS) are unaffected by the breaking changes. See the updated README for the new CSS-first setup instructions.

---

## [0.5.1] - 2026-01-12

### Improved
- **Theme System**: Enhanced CSS custom properties for all themes
  - Improved color consistency across light and dark modes
  - Refined semantic color tokens (background, foreground, card, muted, accent)
  - Better border and input colors for improved visual hierarchy
  - More accurate HSL values for smoother theme transitions

- **Design Tokens Page**: Added live theme visualization
  - New hook (`useThemeTokens`) to read and display live CSS custom properties
  - Real-time color swatches that update when switching themes or toggling dark mode
  - Added "CSS Setup" section showing the exact CSS code for the current theme
  - Removed static base color scales to reduce noise and focus on semantic tokens
  - Users can now copy the exact CSS needed to implement any theme

### Notes
This release improves the theme system's visual consistency and makes it easier for developers to understand and implement themes. The Design Tokens page now serves as a live reference for the current theme's CSS variables.

---

## [0.5.0] - 2026-01-12

### Added
- **ButtonArrow Component**: Added 'external' direction variant for external links
  - New diagonal arrow icon (↗) using ArrowUpRight from @phosphor-icons/react
  - Automatic horizontal mirroring in RTL mode (↗ becomes ↖)
  - Proper RTL support using `scale-x-[-1]` transform
  - Works seamlessly with all button variants (primary, secondary, outline, ghost, link)
  - Updated documentation and Storybook with external link examples

### Notes
This release enhances the ButtonArrow component to support external links with semantic directional arrows that automatically mirror in RTL layouts. The 'external' direction complements the existing 'forward' and 'back' directions.

---

## [0.4.6] - 2025-12-08

### Fixed
- **Calendar Component**: Fixed form submission issue when used inside forms
  - Added `type="button"` to all navigation buttons (previous month, next month, today)
  - Added `type="button"` to all date selection buttons
  - Prevents unintended form submissions when selecting dates or navigating months
  - Resolves issue where clicking calendar buttons would trigger parent form submit handlers

### Notes
This is a critical bugfix for forms containing Calendar components in range or single selection mode. Previously, clicking any button within the Calendar would trigger form submission, causing premature validation and unexpected behavior.

---

## [0.4.5] - 2025-12-07

### Changed
- **Cozy Theme**: Removed opinionated spacing and padding rules for more flexibility
  - Removed forced `margin-bottom: 1.5rem` from headings (h1, h2, h3, h4)
  - Removed forced `padding: 2rem !important` from all card components
  - Removed forced button padding (`padding: .75rem 1.5rem`)
  - Theme now respects component-level spacing defaults
  - Updated both `globals.css` and `package.css` for consistency

### Notes
This release makes the Cozy theme less opinionated and more flexible, allowing developers to use standard component spacing without theme overrides.

---

## [0.4.4] - 2025-12-06

### Fixed
- **Documentation Pages**: Fixed inconsistent section title spacing across component pages
  - **number-input**: Fixed Use Cases, API Reference, and Features sections
  - **date-picker**: Fixed Use Cases, Type Definition, API Reference (2x), and Features sections
  - **time-picker**: Fixed Use Cases, Type Definition, API Reference (2x), and Features sections
  - All sections now use standard pattern: `<section className="mb-16">` with `<h2 className="text-2xl font-bold tracking-tight mb-6">`

### Changed
- **Component Documentation**: Standardized section spacing for consistent visual hierarchy

### Notes
This release focuses on improving documentation consistency and visual hierarchy across all component pages.

## [0.4.3] - 2025-12-05

### Fixed
- **Code Quality**: Resolved all React Hooks exhaustive-deps warnings (zero warnings achieved)
  - **DataTable**: Wrapped `sampleUsers` in `useMemo` and added to dependency arrays in sorting, filtering, and pagination hooks
  - **useRelativeTime Hook**: Wrapped `targetDate` in `useMemo` and `getRelativeTime` in `useCallback` with proper dependencies
  - **Calendar**: Wrapped calendar days generation in `useMemo` with complete dependencies including `getHijriDate`
- **Translations**: Fixed missing i18n keys across 11+ experimental component pages
  - Added `rtlDemo` object with `ltr` and `rtl` keys to common.ts (EN/AR)
  - Added missing example keys: `fullFeatured`, `compactMode`, `withPresets`, `customPresets`, `withoutPresets`, `inContext`
  - Fixed incorrect key references: `rtl` → `rtlSupport`, `interface` → `typeDefinitions`, `sizes` → `examples.sizes`, `inContext` → `examples.inContext`
- **NotificationCenter**: Fixed PropDefinition type error by changing `defaultValue` to `default` property
- **WorkflowCanvas & WorkflowNode**: Fixed missing imports for `useDirection` and `content` from i18n
- **ThinkingIndicator**: Fixed incorrect translation key references in examples section
- **ParameterSlider**: Fixed non-existent translation key reference

### Added
- **Website**: Added "Starters" link to main navigation (both desktop and mobile)
- **Website**: Added i18n translations for "Starters" menu item (English: "Starters", Arabic: "نماذج البداية")
- **Website**: Added /starters page to sitemap.ts for SEO (priority: 0.8, weekly updates)
- **SEO**: Added 3 OG images (bilingual, Arabic, English) at 1200×630px for social sharing
- **SEO**: Updated root layout metadata with comprehensive OpenGraph and Twitter Card metadata
- **Documentation**: Added OG image to main README.md for visual impact on GitHub
- **Documentation**: Added OG image to npm package README (packages/noorui/README.md)
- **Documentation**: Updated /starters page with Kitab Blog Starter information
- **Documentation**: Added Kitab live demo link (kitab.noorui.com) and GitHub repository
- **Documentation**: Updated README.md to include Starters page in documentation links
- **Documentation**: Updated ROADMAP.md to highlight Kitab as completed deliverable
- **Documentation**: Updated starters/README.md with full Kitab feature list
- **Code Standards**: Added ESLint disable comments for intentional img usage (component library design decision)
  - NotificationCenter: Avatar display using dynamic user-provided URLs
  - ListingCard: Product image display
  - FileUpload: Image preview using blob URLs from FileReader

### Changed
- **Website**: Improved visibility of /starters page through navigation integration
- **Starters Page**: Replaced placeholder "Blog Dashboard" with production-ready "Kitab - Blog Starter"
- **Starters Page**: Updated GitHub button to link to https://github.com/topics/noor-ui for broader project discovery
- **Roadmap**: Updated current status to "READY FOR PUBLIC LAUNCH" with technical pre-launch checklist completed
- **Roadmap**: Added Kitab to recent wins and next actions focused on marketing launch
- **Website**: Updated all version references from v0.4.2 to v0.4.3
  - Homepage (app/page.tsx)
  - English home translations (lib/i18n/en/home.ts)
  - Arabic home translations (lib/i18n/ar/home.ts)
  - Launch plan documentation (LAUNCH_PLAN.md - 7 references)
  - Roadmap documentation (ROADMAP.md - 4 references)
- **Build Process**: Achieved zero build warnings and zero compilation errors
- **Code Quality**: Improved React performance patterns with proper memoization and callback usage

### Notes
This release focuses on code quality improvements and documentation completeness. All 74+ components maintain full RTL/LTR support with zero build warnings. The codebase is now optimized for production use with proper React performance patterns.

## [0.4.2] - 2025-11-29

### Added
- **DataTable**: New `enableSorting` prop for automatic internal sort state management. No need to manage `sortBy` and `sortDirection` state yourself - perfect for simple tables
- **DataTable**: New `defaultSortBy` and `defaultSortDirection` props to set initial sort state when using `enableSorting`
- **DataTable**: New `mobileSorting` prop (default: true) to show/hide sort buttons on mobile card view
- **DataTable**: Full sorting support for mobile card view with dedicated sort buttons above cards
- **DataTable**: Pagination controls with Previous/Next buttons. Previously only showed "Page X of Y" text without navigation buttons
- **DataTable**: Automatic sorting logic handles strings (with `localeCompare`), numbers, dates, and null values
- **Documentation**: Added "Simple Sorting" example showing the new `enableSorting` feature with code samples

### Fixed
- **DataTable**: Fixed search clear button (X icon) positioning in RTL mode. Changed from `me-1` to `end-1` for proper logical positioning
- **DataTable**: Fixed pagination chevron icons in RTL mode with `rtl:rotate-180` class so arrows point in correct reading direction
- **DataTable**: Fixed pagination not working correctly. Component now follows controlled pattern - parent slices data, DataTable displays it. Removed internal data slicing that was preventing page changes from updating content
- **DataTable Documentation**: Fixed "Complete Example" not paginating correctly by adding separate pagination state and properly slicing filtered data
- **PrayerTimes**: Fixed incorrect locale check (`locale === 'ar'`) to use direction check (`direction === 'rtl'`). Component now works with ALL RTL languages (Hebrew, Urdu, Farsi, etc.), not just Arabic
- **HijriDate**: Fixed incorrect locale check (`locale === 'ar'`) to use direction check (`direction === 'rtl'`). Component now works with ALL RTL languages (Hebrew, Urdu, Farsi, etc.), not just Arabic
- **RangeSlider**: Resolved RTL label formatting - simplified to use universal min-max format ("100 - 500") that works naturally across all languages. Numbers and ranges are international conventions that don't need language-specific formatting

### Changed
- **DataTable**: Sorting state now cycles through: asc → desc → null (clears sort) instead of just toggling between asc/desc
- **DataTable**: Mobile table view now includes sort buttons in headers (previously desktop-only)
- **DataTable**: Documentation restructured to show simple internal sorting example before advanced external state management

---

## [0.4.1] - 2025-11-29

### Added
- **Calendar**: New `showIslamicHolidays` prop for automatic Islamic holiday highlighting. When enabled with `showHijri={true}`, displays event dots on 10 major Islamic holidays including:
  - Islamic New Year (Muharram 1)
  - Day of Ashura (Muharram 10)
  - Prophet's Birthday (Rabi' al-Awwal 12)
  - Isra and Mi'raj (Rajab 27)
  - Laylat al-Bara'ah (Sha'ban 15)
  - Start of Ramadan (Ramadan 1)
  - Laylat al-Qadr (Ramadan 27)
  - Eid al-Fitr (Shawwal 1)
  - Day of Arafah (Dhu al-Hijjah 9)
  - Eid al-Adha (Dhu al-Hijjah 10)
- **HijriDate**: Exported `ISLAMIC_HOLIDAYS` array and `getIslamicHoliday()` function for external use
- **Documentation**: Added "Islamic Holidays" feature card and interactive example to Calendar component page
- **Documentation**: Created book-content workspace with 3 complete RTL lessons (Keyboard Shortcuts, Positioning vs Direction, Transform Animations)

### Fixed
- **ContextMenuShortcut**: Fixed keyboard shortcuts reversing in RTL mode (e.g., "K⌘" instead of "⌘K"). Implemented nested span structure where outer span handles positioning with logical properties and inner span uses `dir="ltr"` for text direction
- **DropdownMenuShortcut**: Fixed keyboard shortcuts reversing in RTL mode with same nested span pattern
- **CommandShortcut**: Fixed keyboard shortcuts reversing in RTL mode with same nested span pattern
- **Switch**: Fixed toggle thumb sliding in wrong direction in RTL mode. Added RTL transform variants (`rtl:-translate-x-4`) for proper animation direction

### Changed
- Updated Calendar component documentation with new Islamic holidays feature
- Updated roadmap page with completed RTL fixes and Islamic holidays enhancement
- Enhanced RTL guide page with "Lessons Learned" section featuring 3 documented patterns

---

## [0.4.0] - 2025-11-28

### Added

#### New Components (8 Components)
- **ReactionPicker**: LinkedIn/Discord-style emoji reaction picker for social features. Supports compact mode (merged display) and expanded mode (separate reactions). Includes tooltip breakdowns, active state tracking, and full RTL support. Perfect for comments, posts, messages, and reviews.
- **UserBadge**: Role and status badge component with 5 variants (author, moderator, verified, admin, custom). Includes icon support and clean noorui styling. Useful for profiles, comments, leaderboards, and chat systems.
- **ContentRenderer**: Markdown/HTML content renderer with automatic RTL/LTR detection via `dir="auto"`. Features code highlighting, XSS protection, proper prose styling, and logical CSS properties for bidirectional content. Essential for user-generated content, comments, and documentation.
- **Kbd**: Keyboard shortcut display component with platform-aware symbols (⌘ on Mac, Ctrl on Windows). Supports key combinations, 3 variants (default, outline, ghost), 3 sizes, and RTL support. Perfect for search modals, toolbars, menus, and documentation.
- **Callout**: Enhanced alert/notification component with 5 types (info, warning, error, success, note). Features custom icons, title support, and RTL-aware layout. Ideal for documentation, tips, warnings, and important messages.
- **Blockquote**: Styled quote component with 3 variants (default, accent, subtle). Supports author attribution, source citations, and clickable cite URLs. Clean typography with proper spacing.
- **PullQuote**: Large emphasized quote for highlighting key text. Supports 3 alignments (left, center, right). Uses elegant serif typography with decorative quotation marks.
- **StatsCard**: Dashboard statistics display card with icon, label, value, and optional trend indicator. Clean card-based design for analytics dashboards.

#### New Hooks
- **useRelativeTime**: Hook for formatting dates as relative time strings ("2 hours ago", "منذ ساعتين"). Features auto-updates, customizable intervals, and full localization for 4 locales (en, ar, fr, ur). Handles all time ranges from seconds to years.

### Changed
- Updated component count from 65 to 73+ components
- Expanded package exports with new UI components and hooks
- Enhanced social and content-focused capabilities

---

## [0.3.14] - 2025-11-23

### Added
- **ButtonArrow**: New component for buttons with directional arrows. Uses semantic directions (`forward`/`back`) instead of physical (`left`/`right`) for automatic RTL/LTR handling. The arrow icons rotate automatically in RTL contexts using Tailwind's `rtl:rotate-180` class.
- **MarkdownEditor**: New WYSIWYG markdown editor component powered by MDXEditor. Outputs clean markdown (not HTML), making it ideal for blogs, documentation, and MDX content. Features include syntax highlighting for code blocks, tables, lists, links, blockquotes, and full RTL support.

---

## [0.3.13] - 2025-11-22

### Fixed
- **RichTextEditor**: Fixed `jsx` attribute console error in Next.js 16 with Turbopack. Replaced styled-jsx with standard `dangerouslySetInnerHTML` for inline styles.

---

## [0.3.12] - 2025-11-22

### Added
- **RichTextEditor**: New `dir` prop to override direction from context. Useful when editing content in a different language than the page locale (e.g., editing Arabic content on an English admin page).

---

## [0.3.11] - 2025-11-22

### Added
- **DashboardShell**: New `headerActions` prop to add custom actions (like theme/language switchers) to the header.

### Fixed
- **DashboardShell**: Accessibility warning (DialogTitle) in mobile sidebar.
- **DashboardShell**: Mobile sidebar uses `side="start"` for proper RTL support via CSS logical properties.

---

## [0.3.8] - 2025-11-22

### Fixed
- **DashboardShell**: Fixed accessibility warning by adding visually hidden `SheetTitle` to mobile sidebar. This resolves the console warning about `DialogContent requires a DialogTitle`.
- **DashboardShell**: Fixed mobile sidebar RTL positioning. Changed from `side={direction === 'rtl' ? 'end' : 'start'}` to `side="start"` since CSS logical properties handle RTL automatically. The sidebar now correctly appears on the right side for RTL locales.

---

## [0.3.7] - 2025-11-21

### Added
- Proper build process for npm package with tsup
- CSS output with Tailwind compilation

### Changed
- Updated exports for proper module resolution
- Added .js extensions for ESM compatibility

---

## [0.3.0] - 2025-11-21

### Added
- Complete restructuring of package build process
- Better TypeScript support and type exports

---

## [0.2.1] - 2025-11-20

### Changed
- Updated package structure with complete barrel exports
- Fixed TypeScript exports in components/index.ts
- Updated homepage URL to noorui.com

### Added
- Complete barrel export with all 74+ components
- CHANGELOG.md, CONTRIBUTING.md documentation
- Improved package files configuration

---

## [0.2.0] - 2025-11-20

### Added

Major update to Noor UI with significant component additions and improvements.

**Core Components (69)**
- Form components: Form, Button, Input, Label, Textarea, Checkbox, Radio Group, Select, Switch, Slider
- Layout components: Card, Separator, Tabs, Accordion, Collapsible
- Navigation: Breadcrumb, Pagination, Command
- Feedback: Alert, Toast, Progress, Skeleton, Badge, Avatar
- Overlays: Dialog, Sheet, Popover, Tooltip, Dropdown Menu, Context Menu
- Data display: Table, DataTable, StatsCard, FeatureCard, EmptyState, ListingCard
- Advanced forms: File Upload, Rich Text Editor, Date Picker, Time Picker, Number Input
- Layout shells: Dashboard Shell
- User interface: User Menu, Notification Center, Stepper

**GCC-Specific Components (5)**
- Prayer Times with countdown and Adhan notifications
- Hijri Date with dual calendar display
- Arabic Number utilities for Arabic-Indic numerals
- Zakat Calculator with export/sharing
- Calendar with Gregorian/Hijri support

**AI/LLM Components (10)** 🧪 Experimental
- ChatMessage, StreamingText, PromptInput, ThinkingIndicator
- MessageActions, ModelSelector, ParameterSlider, TokenCounter
- ConversationHistory, WorkflowCanvas

**Features**
- Complete RTL support with logical properties
- 74+ production-ready and experimental components
- Full TypeScript support with type definitions
- Radix UI primitives for accessibility
- Tailwind CSS with design tokens
- Light/dark mode support
- Bilingual content (English/Arabic)
- WCAG AA compliant

### Changed
- Updated package structure to include all 74+ components
- Improved TypeScript types and exports
- Enhanced documentation

### Notes
This release includes 10 new experimental AI/LLM components. These are functional but APIs may evolve based on feedback.

---

## [0.1.2] - 2025-11-14

### Added

Initial release of Noor UI - RTL-first React component library with core components.

---

## Format

### [Version] - YYYY-MM-DD

#### Added
- New features or components

#### Changed
- Changes in existing functionality

#### Deprecated
- Features that will be removed in upcoming releases

#### Removed
- Features that were removed

#### Fixed
- Bug fixes

#### Security
- Security fixes or improvements
