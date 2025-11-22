# Changelog

All notable changes to Noor UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- Complete barrel export with all 64 components
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
- 64 production-ready and experimental components
- Full TypeScript support with type definitions
- Radix UI primitives for accessibility
- Tailwind CSS with design tokens
- Light/dark mode support
- Bilingual content (English/Arabic)
- WCAG AA compliant

### Changed
- Updated package structure to include all 64 components
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
