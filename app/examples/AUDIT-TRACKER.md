# Examples A11y & i18n Audit Tracker

## Completed
- [x] healthcare (5 pages) - Full audit done

## Batch 1 — In Progress
- [x] real-estate (2 pages) — a11y: aria-labels, breadcrumbs, semantic tokens, fieldset, live regions; i18n: translation objects, locale-aware search; images: 4 property type photos
- [x] registration (1 page) — a11y: breadcrumb fixes, aria-hidden on icons, progress aria-label; i18n: replaced inline ternaries with existing i18n keys; removed bg-muted/30

## Batch 2 — Multi-page apps
- [x] marketplace (7 pages) — a11y: breadcrumb fixes, aria-hidden on decorative icons, aria-labels on search/icon-only buttons, aria-current on active breadcrumb, background-image→img with alt text; i18n: toLocaleLowerCase for search; semantic colors: green-600→success, yellow-600→warning, red-600→destructive, blue-100→info/10, purple-100→primary/10; images: 26 local images; removed bg-muted/30, removed local cn() in favor of import
- [x] portfolio (2 pages) — a11y: breadcrumb fixes, aria-hidden on decorative icons, aria-labels on search/select/social buttons, aria-current on active breadcrumb, background-image→img with alt text; i18n: toLocaleLowerCase for search, localized category badges; images: 11 local images; removed bg-muted/30, removed local cn() in favor of import

## Batch 3 — Business/Analytics
- [x] islamic-finance-dashboard (1 page) — a11y: breadcrumb fixes, aria-hidden on decorative icons, aria-current; i18n: toLocaleLowerCase for search; semantic colors: green-600→success, red-600→destructive, bg-green-600→bg-success

## Batch 4 — Content/Publishing
- [x] calendar (1 page) — a11y: breadcrumb fixes (localized aria-label, aria-hidden on separators, aria-current), aria-hidden on decorative icons (House, CalendarIcon, Clock, CheckCircle ×5, ArrowRight ×6); i18n: hardcoded English strings in Hijri calendar section; removed bg-muted/30

## Batch 5 — AI Examples
- [x] ai-playground (1 page) — a11y: aria-hidden on decorative icons (List, Sparkle ×2, Gear, X), aria-label on icon-only buttons (history toggle, close settings)

## Batch 6 — Education Portal
- [x] education (8 pages) — a11y: aria-labels on nav, breadcrumbs, search inputs, DataTable pagination aria-live; i18n: full bilingual translation objects per page, Eastern Arabic numerals via toArabicNumerals(), formatOrdinal() for ordinals, localized times/room names/dates; images: 11 local avatars (10 teachers + 1 student); DataTable: locale-resolved headers/pagination labels/empty messages/clearSearchLabel

## Notes
- 15 examples removed in cleanup (Phase 2): accessible-inputs, ai-chat-simple, ai-code-assistant, ai-multi-agent, ai-workflow, ai-document-qa, ai-agent-evals, blog-dashboard, cms, dashboard, datatable-showcase, ecommerce, gcc-dashboard, workflow-basic, b2b-marketplace
- 9 examples remain: education, healthcare, islamic-finance-dashboard, calendar, registration, real-estate, portfolio, marketplace, ai-playground
