# Examples A11y & i18n Audit Tracker

## Completed
- [x] healthcare (5 pages) - Full audit done

## Batch 1 — In Progress
- [x] real-estate (2 pages) — a11y: aria-labels, breadcrumbs, semantic tokens, fieldset, live regions; i18n: translation objects, locale-aware search; images: 4 property type photos
- [x] registration (1 page) — a11y: breadcrumb fixes, aria-hidden on icons, progress aria-label; i18n: replaced inline ternaries with existing i18n keys; removed bg-muted/30
- [x] dashboard (1 page) — a11y: breadcrumb fixes, aria-hidden on icons, Progress aria-labels, semantic colors; i18n: consolidated translation object replacing 40+ inline ternaries

## Batch 2 — Multi-page apps
- [x] marketplace (7 pages) — a11y: breadcrumb fixes, aria-hidden on decorative icons, aria-labels on search/icon-only buttons, aria-current on active breadcrumb, background-image→img with alt text; i18n: toLocaleLowerCase for search; semantic colors: green-600→success, yellow-600→warning, red-600→destructive, blue-100→info/10, purple-100→primary/10; images: 26 local images; removed bg-muted/30, removed local cn() in favor of import
- [x] b2b-marketplace (3 pages) — a11y: breadcrumb fixes, aria-hidden on decorative icons, aria-labels on search/select/quantity buttons/image thumbnails/remove item, aria-current on active breadcrumb, background-image→img with alt text; i18n: toLocaleLowerCase for search, localized category items; semantic colors: green-600→success, blue-100→info/10, red-600→destructive; images: 6 local images
- [x] portfolio (2 pages) — a11y: breadcrumb fixes, aria-hidden on decorative icons, aria-labels on search/select/social buttons, aria-current on active breadcrumb, background-image→img with alt text; i18n: toLocaleLowerCase for search, localized category badges; images: 11 local images; removed bg-muted/30, removed local cn() in favor of import

## Batch 3 — Business/Analytics
- [x] islamic-finance-dashboard (1 page) — a11y: breadcrumb fixes, aria-hidden on decorative icons, aria-current; i18n: toLocaleLowerCase for search; semantic colors: green-600→success, red-600→destructive, bg-green-600→bg-success
- [x] gcc-dashboard (1 page) — a11y: breadcrumb fixes, aria-hidden on decorative icons, aria-current; semantic colors: green-600→success, red-600→destructive; removed bg-muted/30
- [x] datatable-showcase (1 page) — a11y: breadcrumb fixes, aria-hidden on decorative icons, aria-current; i18n: toLocaleLowerCase for search

## Batch 4 — Content/Publishing
- [x] blog-dashboard (1 page) — a11y: aria-hidden on all decorative icons (feature.icon, CheckCircle, Database, FileText, ArrowRight ×9, ArrowSquareOut ×2)
- [x] cms (1 page) — a11y: aria-hidden on decorative icons (Globe, User, Tag, Eye ×3, ChatCentered ×2, PencilSimple, Trash, MagnifyingGlass, Plus, nav icons ×4); semantic colors: green-500→success, yellow-500→warning, blue-500→info (badge bg/text/border + status dots)
- [x] calendar (1 page) — a11y: breadcrumb fixes (localized aria-label, aria-hidden on separators, aria-current), aria-hidden on decorative icons (House, CalendarIcon, Clock, CheckCircle ×5, ArrowRight ×6); i18n: hardcoded English strings in Hijri calendar section; removed bg-muted/30

## Batch 5 — AI Examples
- [x] ai-agent-evals (1 page) — a11y: breadcrumb fixes (localized aria-label, aria-hidden on separators, aria-current), aria-hidden on decorative icons (Play, Shield, MagnifyingGlass, SpinnerGap, CheckCircle, XCircle ×2, Check), aria-label on search input; i18n: toLocaleLowerCase for search; semantic colors: green-600→success, red-600→destructive, blue-600→info, green-50/green-200→success/5+success/20, red-50/red-200→destructive/5+destructive/20, blue-50/blue-200→info/5+info/20; RTL: left-3→start-3, pl-9→ps-9, mr-2→me-2
- [x] ai-playground (1 page) — a11y: aria-hidden on decorative icons (List, Sparkle ×2, Gear, X), aria-label on icon-only buttons (history toggle, close settings)
- [x] ai-code-assistant (1 page) — a11y: breadcrumb fixes (localized aria-label, aria-hidden on separators, aria-current), aria-hidden on decorative icons (CodeBlockIcon ×3, Trash, Sparkle ×4, Lightbulb ×3, Bug ×3)
- [x] ai-document-qa (1 page) — a11y: breadcrumb fixes (localized aria-label, aria-hidden on separators, aria-current), aria-hidden on decorative icons (Upload, FileText ×3, CheckCircle, BookOpen ×2, Trash, MagnifyingGlass)

## Batch 6 — Education Portal
- [x] education (8 pages) — a11y: aria-labels on nav, breadcrumbs, search inputs, DataTable pagination aria-live; i18n: full bilingual translation objects per page, Eastern Arabic numerals via toArabicNumerals(), formatOrdinal() for ordinals, localized times/room names/dates; images: 11 local avatars (10 teachers + 1 student); DataTable: locale-resolved headers/pagination labels/empty messages/clearSearchLabel

## Batch 7 — Remaining
- [x] ai-chat-simple (1 page) — a11y: breadcrumb fixes (localized aria-label, aria-hidden on separators, aria-current), aria-hidden on decorative icons (Sparkle ×2, Trash)
- [x] ai-multi-agent (1 page) — a11y: breadcrumb fixes (localized aria-label, aria-hidden on separators, aria-current), aria-hidden on decorative icons (Users, Trash, ChatCentered)
- [x] ai-workflow (1 page) — a11y: breadcrumb fixes (localized aria-label, aria-hidden on separators, aria-current), aria-hidden on decorative icons (WarningCircle ×2, Play, ArrowCounterClockwise, Sparkle, Gear); semantic colors: yellow-50/yellow-200/yellow-600/yellow-800→warning/10+warning/20+warning+warning-foreground
- [x] workflow-basic (1 page) — a11y: breadcrumb fixes (localized aria-label, aria-hidden on separators, aria-current), aria-hidden on decorative icons (WarningCircle ×2, Play, ArrowCounterClockwise); semantic colors: yellow-50/yellow-200/yellow-600/yellow-800→warning/10+warning/20+warning+warning-foreground
- [x] ecommerce (1 page) — a11y: aria-hidden on decorative icons (feature Icon, CheckCircle, Package ×2, ArrowSquareOut ×2, ShoppingCart, ArrowRight ×2)
- [x] accessible-inputs (1 page) — a11y: aria-hidden on decorative icons (CheckCircle ×2, XCircle); semantic colors: green-500→success, red-500→destructive (validation borders, rings, icons, text); removed local cn() in favor of import
