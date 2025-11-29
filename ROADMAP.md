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
- ✅ 73+ components (exceeded goal!)
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
- ⏳ Create Discord server (next priority)
- ⏳ Write blog posts about RTL challenges/solutions (next priority)
- ⏳ Share on social media (ready to launch!)

**Deliverables:**
- ✅ 5+ complete demo projects
- ✅ Refined component library (73+ components)
- ✅ Interactive documentation site
- ⏳ Active community (launching soon)

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

**Current Version:** v0.4.0 (2025-11-28)

**Latest Updates:**
- ✅ Added 8 new components from blog-starter (ReactionPicker, UserBadge, ContentRenderer, Kbd, Callout, Blockquote, PullQuote, StatsCard)
- ✅ Added useRelativeTime hook for multilingual relative timestamps
- ✅ Expanded component count from 65 to 73+ components
- ✅ Enhanced social and content-focused capabilities

**Deliverables:**
- ✅ Published NPM package with proper exports
- ✅ Comprehensive installation docs
- ✅ Quick Start guide with code examples
- ✅ All 73+ components properly exported and typed

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

## 🚧 Current Status: Phase 3+ COMPLETE! 🎉

**Package Published:** [noorui-rtl v0.3.14 on npm](https://www.npmjs.com/package/noorui-rtl)

**Next Actions:**
1. 🎯 Public launch and marketing campaign
2. 🎯 Create "Quick Start" tutorial video
3. 🎯 Write blog posts showcasing RTL solutions
4. 🎯 Share on social media (Twitter, Reddit, LinkedIn)
5. 🎯 Reach out to GCC-focused dev communities

**Blockers:**
- None currently - ready for public launch! 🚀

**Recent Wins:**
- ✅ **NPM package published** (noorui-rtl v0.3.14)
- ✅ **65+ production-ready components**
- ✅ **Complete documentation site** (noorui.com)
- ✅ **Multiple demo examples** (blog, marketplace, AI workflows)
- ✅ **Full RTL/LTR support** with logical properties
- ✅ **TypeScript + Accessibility** (WCAG AA compliant)
- ✅ **GCC-specific components** (Prayer Times, Hijri Calendar, Zakat Calculator)
- ✅ **Import patterns updated** across all documentation

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

*Last Updated: 2025-11-28*
*Next Review: 2025-12-05*

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
   - Write blog posts about RTL challenges solved
   - Document migration from shadcn/ui

3. **Community Building**
   - Set up Discord server
   - Enable GitHub Discussions
   - Create contribution guidelines
   - Plan first community call

4. **Package Improvements**
   - Monitor npm download stats
   - Gather user feedback
   - Fix any reported issues quickly
   - Plan v0.4.0 features based on feedback

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
