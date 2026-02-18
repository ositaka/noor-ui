# 🗺️ Project Roadmap

## 🎯 Vision

Build the **go-to design system for bilingual (LTR/RTL) web applications**, starting with English and Arabic, with a focus on the MENA market and global multilingual products.

### Core Principles
- ✅ **RTL-first, not RTL-as-afterthought**
- ✅ **Real examples over theoretical components**
- ✅ **Quality over quantity** (1 great demo > 5 mediocre ones)
- ✅ **Open source and community-driven**
- ✅ **Production-ready, not just showcase**

---

## 🎬 Phased Approach

### **Phase 1: Foundation & Discovery** ✅ COMPLETE

**Goal:** Build real dashboard examples to discover what components are actually needed.

#### Week 1-2: Component Building
- ✅ Built 73+ production-ready components
- ✅ FileUpload, RichTextEditor, DashboardShell, UserMenu, NotificationCenter
- ✅ All components tested in both LTR and RTL modes
- ✅ Arabic UX validated by native speakers

#### Week 3-4: Dashboard Examples
- ✅ Built multiple demo projects (Blog, Marketplace, Portfolio, AI workflows)
- ✅ Complete examples with full source code
- ✅ Multilingual content patterns documented
- ✅ Accessibility and keyboard navigation

#### Week 5-6: Polish & Document
- ✅ Components refined through real usage
- ✅ Comprehensive documentation site (noorui.com)
- ✅ Code examples for every component
- ✅ Public feedback channels established

**Deliverables:**
- ✅ 74+ components (exceeded goal!)
- ✅ Multiple demo projects with source code
- ✅ Full documentation for all components
- ✅ Multilingual patterns documented

---

### **Phase 2: Second Example & Refinement** ✅ COMPLETE

**Goal:** Validate patterns with a different use case, refine components.

#### Week 1-3: Multiple Demo Projects
- ✅ Built Marketplace, Portfolio, Blog Dashboard examples
- ✅ AI workflow examples (chat, document QA, multi-agent)
- ✅ B2B marketplace with RFQ functionality
- ✅ Component reusability validated across projects

#### Week 4-6: Component Library Refinement
- ✅ Common patterns extracted into utilities
- ✅ Component APIs improved based on real usage
- ✅ Documentation site with interactive examples
- ✅ Component usage examples for every component

#### Week 7-8: Community Building
- ✅ GitHub repository with comprehensive README
- ✅ Documentation includes contribution guidelines
- ✅ Discord server created and configured (https://discord.gg/gvrqU2WG)
- ⏳ Write blog posts about RTL challenges/solutions (next priority)
- ⏳ Share on social media (ready to launch!)

**Deliverables:**
- ✅ 5+ complete demo projects
- ✅ **Kitab Blog Starter** - Production-ready multilingual blog ([kitab.noorui.com](https://kitab.noorui.com), [GitHub](https://github.com/ositaka/kitab--noorui-blog-starter))
- ✅ Refined component library (74+ components)
- ✅ Interactive documentation site
- ✅ Active community channels established (Discord server live!)

---

### **Phase 3: NPM Package & Distribution** ✅ COMPLETE

**Goal:** Package the design system for easy consumption by others.

**Package is live!** [noorui-rtl on npm](https://www.npmjs.com/package/noorui-rtl)

#### Tasks:
- ✅ Build pipeline configured (tsup + tailwindcss)
- ✅ Published to NPM as `noorui-rtl`
- ✅ Installation guide in README
- ✅ Quick Start documentation on website
- ✅ Version and release strategy established
- ✅ Automated pre-publish checks (translations, links, types)

**Current Version:** v0.8.2 (2026-02-09)

**Latest Updates:**
- ✅ Tailwind CSS v3 → v4.1 migration (CSS-first configuration)
- ✅ Custom themes system with extensible DesignSystemProvider
- ✅ `--color-*` variable refactoring for proper theme scoping
- ✅ ~50 hardcoded English strings replaced with i18n translations
- ✅ New useThemeTokens hook for real-time CSS variable display
- ✅ Added CSS Setup section showing exact theme code
- ✅ Icon library migration: lucide-react → @phosphor-icons/react (Duotone)
- ✅ Squircle corners via `--corner-shape` CSS variable (progressive enhancement)
- ✅ CSS `@layer base` fix for hover utility overrides in Tailwind v4
- ✅ Header nav progressive collapse with "More" dropdown
- ✅ Sitemap page, XML sitemap, and Cmd+K search fully updated
- ✅ 74+ components with complete RTL/LTR support

**Deliverables:**
- ✅ Published NPM package with proper exports
- ✅ Comprehensive installation docs
- ✅ Quick Start guide with code examples
- ✅ All 74+ components properly exported and typed

---

### **Phase 4: Scale & Expand** (Ongoing)

**Goal:** Build remaining demo projects, expand to more languages, grow community.

#### Months 1-2: Demo Projects 3-4
- [ ] Build Marketplace or Bank demo
- [ ] Add more complex features (payments, multi-vendor)
- [ ] Document advanced patterns

#### Months 3-4: Language Expansion
- [ ] Add support for more RTL languages (Urdu, Hebrew, Farsi)
- [ ] Add support for more LTR languages (Portuguese, French)
- [ ] Create language-switching best practices guide

#### Months 5-6: Advanced Features
- [ ] Figma component library
- [ ] Theme builder tool
- [ ] CLI for project scaffolding
- [ ] VS Code extension

**Deliverables:**
- ✅ 5 demo projects
- ✅ 6+ language support
- ✅ Figma library
- ✅ Developer tools

---

## 📊 Success Metrics

### Phase 1 Success:
- [ ] 1 complete demo deployed and publicly accessible
- [ ] 10+ dashboard components fully documented
- [ ] 5+ users testing and providing feedback
- [ ] Lebanese friend confirms Arabic UX is authentic

### Phase 2 Success:
- [ ] 2 demos with different use cases working
- [ ] Component reuse rate > 80% between projects
- [ ] 50+ GitHub stars
- [ ] 50+ Discord members

### Phase 3 Success:
- [ ] NPM package published
- [ ] 100+ weekly NPM downloads
- [ ] 3+ external projects using the package
- [ ] No major breaking changes for 3 months

### Phase 4 Success:
- [ ] 1000+ weekly NPM downloads
- [ ] 500+ GitHub stars
- [ ] Featured in newsletters/blogs
- [ ] Conference talk acceptance

---

## 🚧 Current Status: READY FOR PUBLIC LAUNCH! 🚀

**Package Published:** [noorui-rtl v0.8.2 on npm](https://www.npmjs.com/package/noorui-rtl)

**Technical Pre-Launch:** ✅ **COMPLETE** (2025-12-02)
- ✅ Repository public on GitHub
- ✅ GitHub Discussions enabled
- ✅ GitHub Issues enabled
- ✅ Repository topics added (react, rtl, arabic, nextjs, typescript, etc.)
- ✅ All code committed and pushed
- ✅ /starters page live with Kitab showcase
- ✅ Navigation updated (Starters link added)
- ✅ Sitemap updated

**Next Actions (Marketing Launch):**
1. 🎯 **LinkedIn announcement** - Main launch platform with Kitab demo (Tomorrow, Dec 3rd)
2. 🎯 **Twitter/X thread** - Showcase key features and RTL capabilities
3. 🎯 **Reddit posts** - Share on r/reactjs, r/webdev, r/nextjs
4. 🎯 **Blog post** - "Building RTL-first React components"
5. 🎯 Create "Quick Start" tutorial video
6. 🎯 Reach out to GCC-focused dev communities

**Blockers:**
- None! All technical AND marketing assets complete ✅

**Recent Wins (Feb 11, 2026):**
- ✅ **Storybook Documentation** - 5 lean MDX doc pages under single "Docs" sidebar category (Welcome, Getting Started, Colors, Theming, RTL Development). Colors has a live interactive palette with 4 themes; Theming and RTL Development link out to noorui.com with preview images. Consolidated from 27 pages -- noorui.com is the comprehensive resource, Storybook is the interactive playground.

**Recent Wins (Feb 9, 2026):**
- ✅ **Icon migration** - lucide-react → @phosphor-icons/react (Duotone) across ~140 files
- ✅ **Squircle corners** - `--corner-shape: squircle` CSS variable, progressive enhancement (Chrome 138+)
- ✅ **CSS layer fix** - Base styles moved to `@layer base` so hover utilities work in Tailwind v4
- ✅ **Header UX** - Removed redundant "Home" link, progressive collapse with "More" dropdown (lg→xl)
- ✅ **Sitemap & search** - Visual sitemap page, XML sitemap, and Cmd+K search fully synced with all 69 pages
- ✅ **Scroll offset** - `scroll-margin-top: 6rem` on anchor targets to clear fixed header
- ✅ **NPM package updated** (noorui-rtl v0.8.2)
- ✅ **74+ production-ready components**
- ✅ **Complete documentation site** (noorui.com)
- ✅ **Kitab Blog Starter** live at kitab.noorui.com - production example with 4 languages
- ✅ **/starters page** added to navigation and sitemap
- ✅ **OG images created** (3 versions: bilingual, Arabic, English at 1200×630px)
- ✅ **SEO optimized** - Full OpenGraph and Twitter Card metadata
- ✅ **README hero images** - GitHub and npm package READMEs now feature OG image
- ✅ **Social preview tested** - Verified on Google, Twitter, Facebook, LinkedIn
- ✅ **Multiple demo examples** (blog, marketplace, AI workflows)
- ✅ **Full RTL/LTR support** with logical properties - works with ALL RTL languages (Arabic, Hebrew, Urdu, Farsi)
- ✅ **TypeScript + Accessibility** (WCAG AA compliant)
- ✅ **GCC-specific components** (Prayer Times, Hijri Calendar, Zakat Calculator)
- ✅ **GitHub fully configured** (public, discussions, issues, topics)
- ✅ **RangeSlider component** with proper RTL label formatting
- ✅ **RTL fixes audited** across all components

---

## 💡 Key Decisions Made

### Architecture Decisions:
- ✅ Use Supabase for all demos (consistent backend)
- ✅ Multilingual via JSONB fields (see MULTILINGUAL_STRATEGY.md)
- ✅ RBAC via Supabase Row Level Security (not custom solution)
- ✅ Build examples BEFORE packaging (validate patterns first)

### Scope Decisions:
- ✅ Start with 2 languages (EN + AR), expand later
- ✅ Focus on web first, mobile later
- ✅ React only initially, other frameworks in Phase 4+
- ✅ Tailwind CSS as foundation (not custom CSS)

### Community Decisions:
- ✅ Fully open source (MIT license)
- ✅ Accept contributions after Phase 2
- ✅ Documentation in English (Arabic guides as separate resource)

---

## 🎯 North Star Metric

**"Number of production applications using [Name] in bilingual contexts"**

Not vanity metrics like stars/downloads, but **real products solving real problems**.

---

## 📅 Timeline Overview

```
Phase 1: Weeks 1-6   ████████░░░░░░░░░░░░░░ (Foundation)
Phase 2: Weeks 7-14  ░░░░░░░░████████░░░░░░ (Validation)
Phase 3: Weeks 15-17 ░░░░░░░░░░░░░░░░████░░ (Package)
Phase 4: Month 5+    ░░░░░░░░░░░░░░░░░░░░██ (Scale)
```

**Total to first NPM package: ~4 months**
**Total to 5 demo projects: ~6-8 months**

---

## 🔄 Review & Update Schedule

- **Weekly:** Update "Current Status" and "Next Actions"
- **Monthly:** Review metrics and adjust priorities
- **Quarterly:** Major roadmap revision based on learnings

---

*Last Updated: 2026-02-11*
*Next Review: 2026-02-18*

---

## 🎯 Immediate Next Steps (Public Launch)

1. **Marketing & Outreach**
   - Write launch announcement blog post
   - Create Twitter/X thread showcasing key features
   - Post on Reddit (r/reactjs, r/webdev, r/nextjs)
   - Share on LinkedIn with demo videos
   - Reach out to Arabic/RTL dev communities

2. **Content Creation**
   - Record "Quick Start in 5 minutes" video
   - Create component showcase GIFs/videos
   - 💡 **Nice to have:** Create animated GIF showcasing Storybook features (RTL switch, theme change, component interactions) for homepage showcase section
   - Write blog posts about RTL challenges solved
   - Document migration from shadcn/ui

3. **Community Building**
   - ✅ Set up Discord server (https://discord.gg/gvrqU2WG)
   - ✅ Enable GitHub Discussions (https://github.com/ositaka/noor-ui/discussions)
   - Create contribution guidelines
   - Plan first community call

4. **Package Improvements**
   - Monitor npm download stats
   - Gather user feedback
   - Fix any reported issues quickly
   - Plan v0.9.0 features based on feedback

---

## 🔧 Technical Debt & Quality Improvements

### ✅ COMPLETED: Keyboard Shortcut Consistency Audit

**Issue:** Multiple shortcut components across the codebase don't use the Kbd component and lack proper RTL protection.

**Impact:** Keyboard shortcuts in menus may display incorrectly in RTL mode (e.g., "K+⌘" instead of "⌘+K").

**Components Updated:**
1. ✅ **ContextMenuShortcut** (`components/ui/context-menu.tsx:188`)
   - Fixed with nested span structure: outer for positioning, inner with `dir="ltr"`

2. ✅ **DropdownMenuShortcut** (`components/ui/dropdown-menu.tsx:191`)
   - Fixed with nested span structure: outer for positioning, inner with `dir="ltr"`

3. ✅ **CommandShortcut** (`components/ui/command.tsx:129`)
   - Fixed with nested span structure: outer for positioning, inner with `dir="ltr"`

4. ✅ **Switch component** (`components/ui/switch.tsx:17-23`)
   - Added RTL transform variants for thumb sliding animation

**Completed Actions:**
- ✅ Audited all keyboard shortcut displays across the codebase
- ✅ Updated shortcut components with nested span pattern
- ✅ Ensured consistent visual styling across all shortcuts
- ✅ Tested in both LTR and RTL modes
- ✅ Added "Lessons Learned" section to RTL guide page
- ✅ Created book-content workspace with 3 fully documented lessons
- ✅ All TypeScript compilation successful

**Documentation Created:**
- ✅ Lesson 011: Keyboard Shortcuts Reverse in RTL
- ✅ Lesson 012: Positioning ≠ Text Direction
- ✅ Lesson 016: Transform Animations Need RTL Variants

**Completed:** 2025-11-29
**Version:** v0.4.1 (ready)

---

### ✅ COMPLETED: Hijri Calendar Islamic Holidays Enhancement

**Feature:** Automatic Islamic holiday highlighting in Calendar component.

**Components Updated:**
1. ✅ **hijri-date.tsx** - Exported ISLAMIC_HOLIDAYS array and getIslamicHoliday function
2. ✅ **calendar.tsx** - Added showIslamicHolidays prop and automatic holiday event generation
3. ✅ **calendar component page** - Added Islamic Holidays feature card and example
4. ✅ **calendar example page** - Added dedicated demo section with "New Feature" badge

**Islamic Holidays Included (10 total):**
- Muharram 1: Islamic New Year
- Muharram 10: Day of Ashura
- Rabi' al-Awwal 12: Prophet's Birthday
- Rajab 27: Isra and Mi'raj
- Sha'ban 15: Laylat al-Bara'ah
- Ramadan 1: Start of Ramadan
- Ramadan 27: Laylat al-Qadr
- Shawwal 1: Eid al-Fitr
- Dhu al-Hijjah 9: Day of Arafah
- Dhu al-Hijjah 10: Eid al-Adha

**How It Works:**
- Automatically converts Gregorian dates to Hijri
- Matches against Islamic holidays database
- Displays colored event dots on holiday dates
- Shows holiday names in legend (English/Arabic based on locale)

**Completed Actions:**
- ✅ Exported holiday data from hijri-date component
- ✅ Integrated into Calendar component with new prop
- ✅ Added documentation and examples
- ✅ Tested in both LTR and RTL modes
- ✅ Full i18n support (English/Arabic holiday names)
- ✅ Uses theme colors (no hard-coded values)

**Completed:** 2025-11-29
**Version:** v0.4.1 (ready)

---

### ✅ COMPLETED: RangeSlider Component & RTL Enhancements

**Goal:** Add dual-handle RangeSlider component and document RTL best practices

**What we built:**
- ✅ New **RangeSlider** component - Dual-handle slider for price ranges, age ranges, percentages
- ✅ RTL Guide Lesson 4: Direction Check, Not Locale Check
- ✅ Full Arabic i18n support for RangeSlider documentation
- ✅ Proper RTL label formatting (reverses both values AND labels in RTL)

**Key Features:**
- ✅ Built on top of Slider component with enhanced UX
- ✅ Custom formatters for currency, percentages, etc.
- ✅ showLabels and showMinMax props for better UX
- ✅ Full keyboard navigation and accessibility
- ✅ Works with ALL RTL languages (not just Arabic)

**Documentation Pattern:**
- ✅ Always use `direction === 'rtl'` not `locale === 'ar'`
- ✅ Format range values to match reading direction
- ✅ Reverse entire label structure in RTL: "$760 - $230 :Price Range"

**Completed:** 2025-11-29
**Version:** v0.4.2 (with DataTable enhancements)

---

### ✅ RESOLVED: RTL Range Label Formatting

**Issue:** Uncertainty about optimal way to display range values in RTL languages.

**Resolution:** Numbers and ranges are international conventions that don't need language-specific formatting.

**Final Implementation:** Simple min-max format ("100 - 500") for all languages.

**Why This Works:**
- Numbers are universal and understood the same way across languages
- The dash (-) is a neutral separator without directional meaning
- Matches international conventions for numerical ranges
- Keeps implementation simple and maintainable
- Visual testing in Arabic confirmed this feels natural

**Example in RTL:**
```
نطاق الأسعار: 100$ - 500$
(Price Range: $100 - $500)
```

**Key Insight:** Sometimes the simplest solution is the correct one. Overthinking bidirectional text algorithms led us in circles, when the straightforward approach was what users expected all along.

**Component:** `components/ui/range-slider.tsx` and `app/(docs)/components/range-slider/page.tsx`

**Status:** Resolved
**Completed:** 2025-11-29

---

### ✅ COMPLETED: Direction Check Audit (Prayer Times & Hijri Date)

**Issue:** Two components were checking `locale === 'ar'` instead of `direction === 'rtl'`, limiting RTL support to Arabic only.

**Impact:** Components wouldn't work properly for Hebrew, Urdu, Farsi, or other RTL languages.

**Components Fixed:**
1. ✅ **PrayerTimes** (`components/ui/prayer-times.tsx:88`)
   - Changed `locale === 'ar'` to `direction === 'rtl'`

2. ✅ **HijriDate** (`components/ui/hijri-date.tsx:110`)
   - Changed `locale === 'ar'` to `direction === 'rtl'`

**Pattern Applied:** Always use `direction === 'rtl'` for layout/directionality decisions, not `locale === 'ar'`

**Note:** Other `locale === 'ar'` checks in the codebase are legitimate (for Intl.DateTimeFormat, Arabic numerals, etc.)

**Completed:** 2025-11-29
**Version:** v0.4.4

---

### 🔄 PENDING: Toast System Enhancement

**Problem:** Currently, noorui-rtl only exports toast primitives (Toast, ToastProvider, ToastTitle, etc.) from Radix UI, requiring users to build their own state management, toaster component, and imperative toast API.

**Proposed Solution:** Add a complete toast notification system similar to shadcn/ui, Chakra UI, or Mantine.

**What to add:**
1. **`useToast()` hook** - Returns `toast()` function and `toasts` array with built-in state management
2. **`Toaster` component** - Drop-in component that renders toasts without manual wiring
3. **Imperative API** - Simple function call: `toast({ title, description, variant })`
4. **Auto-dismiss** - Configurable timeout with default 5s
5. **Toast variants** - Support for `default`, `destructive`, `success` variants
6. **Lifecycle management** - Handle open/close states, animations, and cleanup

**Expected API:**
```typescript
import { Toaster, useToast } from 'noorui-rtl'

// In layout
<Toaster />

// In any component
const { toast } = useToast()
toast({
  title: "Success!",
  description: "Changes saved",
  variant: "success"
})
```

**Benefits:**
- Eliminates boilerplate for 90% of use cases
- Maintains primitive exports for advanced customization
- Improves DX and reduces time-to-productivity
- Aligns with industry standard UI libraries

**Priority:** Medium-High (common pattern users expect from a UI library)

**Status:** Pending
**Target:** v0.9.0

---

### 🔄 PENDING: Button & ButtonArrow Size Variants

**Problem:** The size variants for Button and ButtonArrow components are defined but not fully functional or properly showcased in documentation.

**Current State:**
- Size variants exist in component definitions
- Not all sizes may be properly tested/working
- Documentation pages don't showcase all size options clearly

**What to fix:**
1. **Button component** - Ensure all size variants work correctly:
   - `sm` (small)
   - `default`
   - `lg` (large)
   - `icon` (square icon button)
   - Any other defined sizes

2. **ButtonArrow component** - Ensure size variants work correctly:
   - Should match Button sizes
   - Arrow icon should scale appropriately with button size

3. **Documentation updates:**
   - Add comprehensive "Sizes" section to Button component page
   - Add comprehensive "Sizes" section to ButtonArrow component page
   - Show visual examples of all size variants
   - Include code examples for each size
   - Demonstrate RTL behavior at different sizes

**Expected Result:**
```typescript
// All sizes should work
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

<ButtonArrow size="sm" direction="forward">Small</ButtonArrow>
<ButtonArrow size="lg" direction="forward">Large</ButtonArrow>
```

**Benefits:**
- Complete component API implementation
- Better documentation for users
- Consistent sizing across button components
- Improved visual hierarchy in UIs

**Priority:** Medium (improves component completeness)

**Status:** Pending
**Target:** v0.9.0
