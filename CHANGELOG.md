# Changelog

All notable changes to Noor UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### To Be Fixed
- **Popover Component**: RTL positioning issues in portal-rendered components
  - NotificationCenter popup appears on wrong side in RTL mode
  - TimePicker & TimeRangePicker popups appear on wrong side in RTL mode
  - Need to add automatic direction detection (similar to DropdownMenu pattern)

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

**Core Components (54)**
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
