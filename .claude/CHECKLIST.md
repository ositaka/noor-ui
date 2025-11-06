# Pre-Commit Verification Checklist

This checklist ensures completeness and prevents common oversights. Review the relevant section before committing.

---

## 🆕 Adding a New Component

### 1. Component Implementation
- [ ] Created component file in `/components/ui/[name].tsx`
- [ ] Used `React.forwardRef` pattern
- [ ] Added `displayName` export
- [ ] Used `cn()` utility for className merging
- [ ] Used logical properties (ms-, me-, ps-, pe-) - NO directional classes
- [ ] Added TypeScript types/interfaces
- [ ] Used CVA for variants (if applicable)
- [ ] Component supports ref forwarding

### 2. Documentation
- [ ] Created documentation page in `/app/(docs)/components/[name]/page.tsx`
- [ ] **DO NOT** manually add header/footer (provided by (docs) layout)
- [ ] Included all required sections:
  - [ ] Preview with interactive demo
  - [ ] Installation instructions
  - [ ] Usage examples (minimum 3 variants)
  - [ ] Props table
  - [ ] Accessibility notes
  - [ ] RTL Considerations
  - [ ] Related Components
- [ ] Used real Arabic content (not placeholder text)
- [ ] Code examples show proper import paths

### 3. Navigation & Discoverability
- [ ] Added to `/app/components/page.tsx` in appropriate category
- [ ] Added to `/lib/search-data.ts` with:
  - [ ] Accurate title and description
  - [ ] Correct category ('Component')
  - [ ] Relevant keywords (minimum 4)
- [ ] If new category: added icon to `/components/docs/global-search.tsx`
- [ ] Verified component appears in command palette (Cmd/Ctrl+K)

### 4. Testing
- [ ] Tested in LTR mode
- [ ] Tested in RTL mode (switched with toggle)
- [ ] Tested on mobile viewport (< 640px)
- [ ] Tested on tablet viewport (640px - 1024px)
- [ ] Tested keyboard navigation
- [ ] Verified responsive behavior
- [ ] No console errors or warnings

### 5. Radix UI Components (if applicable)
- [ ] Used `useDirection()` hook from direction provider
- [ ] Passed `direction` to Radix primitive's `dir` prop
- [ ] Allowed dir prop override if needed: `dir={dir || direction}`
- [ ] Tested menu/popover positioning in both directions
- [ ] **DO NOT** set up manual MutationObserver (use hook instead)

---

## 📝 Adding a New Example/Demo

### 1. Example Implementation
- [ ] Created example page in `/app/examples/[name]/page.tsx`
- [ ] Used existing components (no new components in examples)
- [ ] Demonstrated real-world usage patterns
- [ ] Used bilingual content (English + Arabic)
- [ ] Included meaningful interactions/validation
- [ ] Mobile-responsive layout

### 2. Documentation
- [ ] Clear title and description
- [ ] Explains the pattern/use case
- [ ] Shows relevant code snippets
- [ ] Highlights key features

### 3. Navigation & Discoverability
- [ ] Added to `/app/examples/page.tsx` index
- [ ] Added to `/lib/search-data.ts` with:
  - [ ] Accurate title and description
  - [ ] Category: 'Example'
  - [ ] Relevant keywords (include: 'example', feature tags)
- [ ] Verified example appears in command palette (Cmd/Ctrl+K)

### 4. Testing
- [ ] Tested all interactive features
- [ ] Tested in both LTR and RTL modes
- [ ] Tested on mobile, tablet, desktop
- [ ] Verified form validation (if applicable)
- [ ] No console errors or warnings

---

## 📄 Adding Documentation Pages

### 1. Documentation Content
- [ ] Created page in `/app/(docs)/documentation/[name]/page.tsx`
- [ ] **DO NOT** manually add header/footer (provided by (docs) layout)
- [ ] Clear, structured content
- [ ] Used CodeBlock component for syntax highlighting
- [ ] Practical examples (not just theory)
- [ ] Proper use of headings hierarchy

### 2. Navigation & Discoverability
- [ ] Added to documentation navigation (if applicable)
- [ ] Added to `/lib/search-data.ts` with:
  - [ ] Category: 'Documentation'
  - [ ] Relevant keywords
- [ ] Verified page appears in command palette

---

## 🎨 Modifying Existing Components

### 1. Changes
- [ ] Maintained backward compatibility (or documented breaking changes)
- [ ] Updated TypeScript types if props changed
- [ ] Preserved RTL support
- [ ] No new directional classes introduced

### 2. Documentation Updates
- [ ] Updated component documentation page if behavior changed
- [ ] Updated props table if interface changed
- [ ] Updated examples if usage changed
- [ ] Updated search keywords if functionality expanded

### 3. Testing
- [ ] Tested all existing variants still work
- [ ] Tested in LTR and RTL modes
- [ ] Tested existing examples using the component
- [ ] No regressions in other components

---

## 🔧 Bug Fixes

### 1. Fix Verification
- [ ] Bug is actually fixed (not just hidden)
- [ ] Fix doesn't break other functionality
- [ ] Fix works in both LTR and RTL modes
- [ ] Fix is responsive (mobile, tablet, desktop)

### 2. Testing
- [ ] Tested the specific bug scenario
- [ ] Tested edge cases
- [ ] Tested in different browsers (if UI bug)
- [ ] No new console errors introduced

---

## ⚡ Before Every Commit

### General Checks
- [ ] No TypeScript errors (`npm run type-check` or check editor)
- [ ] No ESLint errors (check editor)
- [ ] No console.log() statements left in code
- [ ] No commented-out code blocks (unless intentional documentation)
- [ ] All new files are actually needed
- [ ] Git status shows only intended files

### Code Quality
- [ ] Used existing patterns and conventions
- [ ] No hardcoded values that should be tokens
- [ ] No duplicate code (extracted to shared utils if needed)
- [ ] Proper error handling

### RTL Compliance
- [ ] No `ml-`, `mr-`, `pl-`, `pr-` classes
- [ ] No `left-`, `right-` classes
- [ ] No `text-left`, `text-right` (use `text-start`, `text-end`)
- [ ] No `float-left`, `float-right`
- [ ] Used logical properties exclusively

### Commit Message
- [ ] Clear, descriptive commit message
- [ ] Follows format: `type: description` (feat, fix, docs, refactor, etc.)
- [ ] Body explains "why" if needed (not just "what")

---

## 🚨 Critical Mistakes to Avoid

### ❌ Never Do This:
1. Add component without updating search data
2. Add component without updating components index
3. Use directional CSS classes
4. Forget to test in RTL mode
5. Skip mobile testing
6. Create new category without adding icon to global-search.tsx
7. Use placeholder Lorem Ipsum for Arabic content
8. Skip documentation for "temporary" components
9. Hardcode text that should be props
10. Forget forwardRef on components that wrap DOM elements

### ✅ Always Do This:
1. Update ALL navigation/search when adding features
2. Test in both directions (LTR + RTL)
3. Test on mobile first, then desktop
4. Use logical properties for spacing/positioning
5. Add comprehensive documentation
6. Use templates from `.claude/templates/`
7. Follow existing component patterns
8. Verify discoverability via command palette
9. Check git diff before committing
10. Commit often with clear messages

---

## 📋 Quick Command Reference

```bash
# Type checking
npm run build

# Check what will be committed
git status
git diff

# Search for directional classes (should return nothing)
grep -r "ml-\|mr-\|pl-\|pr-\|text-left\|text-right" components/

# Test search data is valid
npm run dev
# Then open command palette (Cmd/Ctrl+K) and search for your new component

# Before committing
git add <files>
git status  # Review what will be committed
git diff --staged  # Review exact changes
git commit -m "type: clear description"
```

---

## 💡 Tips

- **Use the templates** in `.claude/templates/` - they have all the patterns built in
- **Test incrementally** - don't wait until everything is done to test
- **Check the command palette** (Cmd/Ctrl+K) after every addition
- **Switch to RTL** early and often during development
- **Mobile first** - open mobile viewport before desktop
- **Reference PROJECT_RULES.md** for detailed guidelines on patterns

---

Remember: It takes 2 minutes to update search data and indexes, but hours to debug why something isn't discoverable. Always complete the full checklist!
