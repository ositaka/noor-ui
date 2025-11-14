# Translation Priority Plan

## Current Status
- ✅ **41 pages translated** (37%)
- ❌ **71 pages untranslated** (63%)
- ⚠️ **12 doc sections missing Arabic**

## Suggested Priority Order

### 🔥 **Critical - Do First** (Must-have for GCC market)

#### GCC-Specific Components (High Value)
1. `components/arabic-number` - Arabic number formatting
2. `components/hijri-date` - Islamic calendar
3. `components/prayer-times` - Prayer time display
4. `components/zakat-calculator` - Zakat calculation

#### Core Documentation (User Onboarding)
5. `documentation/installation` - How to install
6. `documentation/quick-start` - Get started quickly
7. `documentation/configuration` - Setup guide
8. `documentation/arabic` - Arabic typography guide
9. `documentation/rtl` - RTL development guide
10. `documentation/bidi` - Bidirectional text handling

**Estimated Time**: 3-4 hours

---

### 📊 **High Priority** (Important for usability)

#### Advanced Input Components
11. `components/date-picker` - Date selection
12. `components/time-picker` - Time selection
13. `components/number-input` - Number input

#### Dashboard Components
14. `components/dashboard-shell` - Dashboard layout
15. `components/stats-card` - Statistics display
16. `components/empty-state` - Empty state messaging

#### Accessibility Documentation
17. `documentation/wcag` - Accessibility compliance
18. `documentation/keyboard` - Keyboard navigation
19. `documentation/screen-readers` - Screen reader support

**Estimated Time**: 3-4 hours

---

### 📋 **Medium Priority** (Nice to have)

#### AI/LLM Components (Growing segment)
20. `components/chat-message` - Chat message display
21. `components/conversation-history` - Chat history
22. `components/prompt-input` - AI prompt input
23. `components/model-selector` - Model selection

#### Supporting Components
24. `components/feature-card` - Feature cards
25. `components/user-menu` - User menu
26. `components/notification-center` - Notifications

**Estimated Time**: 3-4 hours

---

### 📦 **Low Priority** (Can wait)

#### Example Pages (Demo content)
27-60. All `/examples/*` pages (34 pages)
- ai-playground, marketplace, portfolio, real-estate, etc.

**Estimated Time**: 8-10 hours

---

## Quick Wins 🎯

### Phase 1: Complete Arabic Documentation (2 hours)
Add these 12 missing sections to `ar/documentation.ts`:
- ✅ Already have English versions
- ❌ Just need Arabic translations
- 📝 High impact, relatively quick

Missing sections:
1. `documentationPages` (main navigation)
2. `installation`
3. `quickStart`
4. `configuration`
5. `bidi`
6. `arabic`
7. `keyboard`
8. `screenReaders`
9. `wcag`
10. `designTokens`
11. `accessibilitySection`
12. `main`

---

## Your Input Needed

**Which category matters most to YOUR users?**

- Option A: GCC components (arabic-number, prayer-times, etc.)
- Option B: Core documentation (installation, quick-start)
- Option C: AI/LLM components (chat, conversation)
- Option D: Start with Arabic doc sections (quickest win)

**Let me know and I'll start immediately!**
