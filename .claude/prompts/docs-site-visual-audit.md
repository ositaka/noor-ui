# Visual QA Audit: noorui.com Documentation Site

## Goal
Systematically screenshot every page of noorui.com, analyze each for quality, and improve by removing unnecessary content and adding relevant information.

## Method
Use the visual QA loop: capture screenshots of each page group, analyze them, make improvements, re-capture to verify.

## Page Groups (in priority order)

### Group 1: Homepage & Getting Started
- `/` (homepage)
- `/getting-started`

### Group 2: Component Pages (Core)
- `/components` (index)
- `/components/button`
- `/components/input`
- `/components/card`
- `/components/badge`
- `/components/label`
- `/components/separator`
- `/components/avatar`

### Group 3: Component Pages (Forms)
- `/components/checkbox`
- `/components/radio-group`
- `/components/select`
- `/components/switch`
- `/components/slider`
- `/components/textarea`
- `/components/form`
- `/components/number-input`
- `/components/date-picker`
- `/components/time-picker`
- `/components/file-upload`
- `/components/range-slider`
- `/components/calendar`

### Group 4: Component Pages (Navigation & Overlays)
- `/components/tabs`
- `/components/accordion`
- `/components/dropdown-menu`
- `/components/dialog`
- `/components/sheet`
- `/components/popover`
- `/components/context-menu`
- `/components/breadcrumb`
- `/components/pagination`
- `/components/collapsible`
- `/components/command`
- `/components/scroll-area`

### Group 5: Component Pages (Data Display)
- `/components/table`
- `/components/data-table`
- `/components/stats-card`
- `/components/listing-card`
- `/components/feature-card`
- `/components/empty-state`
- `/components/blockquote`
- `/components/timeline`
- `/components/chart`

### Group 6: Component Pages (Feedback, GCC, AI)
- `/components/alert`
- `/components/callout`
- `/components/toast`
- `/components/tooltip`
- `/components/progress`
- `/components/skeleton`
- `/components/loading-spinner` (if exists)
- `/components/kbd`
- `/components/arabic-number`
- `/components/hijri-date`
- `/components/prayer-times`
- `/components/zakat-calculator`
- `/components/chat-message`
- `/components/prompt-input`
- `/components/streaming-text`
- `/components/thinking-indicator`

### Group 7: Component Pages (Composite)
- `/components/carousel`
- `/components/stepper`
- `/components/dashboard-shell`
- `/components/notification-center`
- `/components/user-menu`
- `/components/reaction-picker`
- `/components/user-badge`

### Group 8: Guides & Other Pages
- `/rtl-guide`
- `/themes`
- `/tokens`
- `/documentation`
- `/email-templates`
- `/examples`
- `/license`
- `/sitemap`
- `/roadmap`

## What to look for on each page

### Remove / simplify:
- Redundant text that restates the obvious (e.g., "This component renders a button" on the Button page)
- Overly verbose prop tables — keep only what developers need
- Placeholder content or "coming soon" sections
- Sections that repeat what's already in the live component preview
- Excessive code examples (1-2 key examples > 5 similar ones)

### Add / improve:
- RTL preview toggle on every component page (if missing)
- "When to use" guidance (brief, 1-2 lines)
- Accessibility notes (keyboard shortcuts, ARIA behavior)
- Links to related components (e.g., Button page links to ButtonArrow)
- Bilingual example showing Arabic text rendering
- Edge case examples (empty state, overflow, long text)

### Visual checks:
- Consistent spacing between sections
- Code blocks readable (not too wide, proper syntax highlighting)
- Component previews actually render (no broken states)
- RTL version looks correct (not just mirrored, but actually reads naturally in Arabic)
- Mobile responsiveness (capture at 375px width too)

## How to execute

For each group:
1. Start the dev server: `pnpm dev`
2. Capture screenshots of each page (both LTR and RTL if relevant)
3. Analyze the screenshots for the criteria above
4. Make improvements
5. Re-capture to verify

Take it one group at a time. Don't try to do all 8 groups in one session.
