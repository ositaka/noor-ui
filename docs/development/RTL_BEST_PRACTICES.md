# 🌍 RTL-First Development: Best Practices & Lessons Learned

> A practical guide to building truly bidirectional components, based on real-world experience building Noor UI.

## 🎯 Philosophy: RTL-First, Not RTL-as-Afterthought

The key to great RTL support isn't fixing LTR components to "also work" in RTL. It's building components that **naturally adapt** to text direction from the ground up.

---

## 📚 Lessons Learned

### Lesson 1: Keyboard Shortcuts Don't Stay the Same in RTL/LTR

**The Problem:**
When displaying keyboard shortcuts like `⌘K`, they can reverse to `K⌘` in RTL mode, which is confusing for users.

**Why It Happens:**
The browser's text direction algorithm treats the command symbol and letter as separate entities that get reordered in RTL.

**The Solution:**
Always wrap keyboard shortcuts in `dir="ltr"` to preserve their left-to-right reading order:

```tsx
// ❌ Wrong - Will reverse in RTL
<span>⌘K</span>

// ✅ Correct - Stays as ⌘K in both directions
<span dir="ltr">⌘K</span>
```

**Real Example from Noor UI:**
```tsx
// components/ui/kbd.tsx
export function Kbd({ keys, ...props }: KbdProps) {
  return (
    <kbd dir="ltr" {...props}>
      {keys.map(key => getKeyDisplay(key))}
    </kbd>
  )
}
```

**When to Apply:**
- Keyboard shortcuts in menus (⌘C, Ctrl+V)
- Hotkey displays
- Key combination indicators
- Command palettes

---

### Lesson 2: Positioning vs Text Direction Are Two Different Problems

**The Problem:**
Keyboard shortcuts in menus need to:
1. Stay in LTR order (`⌘K` not `K⌘`)
2. Be positioned at the **end** of the menu item (right in LTR, left in RTL)

**Why `dir="ltr"` on the whole element doesn't work:**
When you put `dir="ltr"` on an element, it creates an LTR context that breaks logical properties like `margin-inline-start`.

**The Solution:**
Use a **nested span structure**:
- Outer span handles **positioning** (uses logical properties)
- Inner span handles **text direction** (uses `dir="ltr"`)

```tsx
// ❌ Wrong - Shortcuts don't position correctly in RTL
<span dir="ltr" className="ms-auto">⌘K</span>

// ✅ Correct - Separates positioning from text direction
<span className="ms-auto">
  <span dir="ltr">⌘K</span>
</span>
```

**Real Example from Noor UI:**
```tsx
// components/ui/context-menu.tsx
const ContextMenuShortcut = ({ children, className, ...props }) => {
  return (
    <span className={cn("ms-auto text-xs", className)} {...props}>
      <span dir="ltr">{children}</span>
    </span>
  )
}
```

**Result:**
- LTR: Shortcut appears on the **right edge** ✓
- RTL: Shortcut appears on the **left edge** ✓
- Text stays LTR in both modes ✓

---

### Lesson 3: CSS Logical Properties Aren't Always Enough

**The Problem:**
Using `margin-inline-start: auto` should push content to the end, but it fails when combined with `dir="ltr"` on the same element.

**Why It Happens:**
The `dir` attribute creates a new directional context that overrides the parent's directionality, breaking logical properties.

**The Solution:**
When you need both text direction control AND logical positioning:
1. Use physical properties with RTL variants: `ltr:ml-auto rtl:mr-auto`
2. OR use the nested span technique (preferred)

```css
/* Option 1: Physical properties with RTL variants */
.shortcut {
  @apply ltr:ml-auto rtl:mr-auto;
}

/* Option 2: Nested structure (preferred) */
/* Outer: Uses logical properties naturally */
.shortcut-container {
  @apply ms-auto;
}
/* Inner: Controls text direction only */
.shortcut-text[dir="ltr"] {
  /* No positioning needed */
}
```

---

### Lesson 4: Transform Animations Need RTL Awareness

**The Problem:**
UI elements that slide or move (like switch toggles) use CSS transforms that don't automatically flip in RTL.

**Example:**
A switch toggle that slides `translateX(16px)` to the right when ON will still slide right in RTL, which feels backward.

**The Solution:**
Apply RTL-specific transforms using Tailwind's `rtl:` variant:

```tsx
// ❌ Wrong - Always slides right
<div className="translate-x-4" />

// ✅ Correct - Slides right in LTR, left in RTL
<div className="translate-x-4 rtl:-translate-x-4" />
```

**Real Example from Noor UI:**
```tsx
// components/ui/switch.tsx
<SwitchPrimitives.Thumb
  className={cn(
    'transition-transform',
    'data-[state=checked]:translate-x-4',
    'rtl:data-[state=checked]:-translate-x-4'
  )}
/>
```

**When to Apply:**
- Switch/toggle components
- Slide-out panels
- Carousel animations
- Drawer menus
- Any translateX animations

---

### Lesson 5: Icons Often Need Rotation in RTL

**The Problem:**
Directional icons (arrows, chevrons) point the wrong way in RTL mode.

**The Solution:**
For buttons with directional icons, use the `ButtonArrow` component which handles RTL automatically:

```tsx
import { ButtonArrow } from 'noorui-rtl'

// Uses semantic directions - RTL mirroring is automatic!
<ButtonArrow direction="forward">Continue</ButtonArrow>
<ButtonArrow direction="back">Go Back</ButtonArrow>
<ButtonArrow direction="external">Open Link</ButtonArrow>
```

For standalone icons, use `rtl:rotate-180` to flip horizontal directional icons:

```tsx
// Chevrons in breadcrumbs
<ChevronRight className="rtl:rotate-180" />

// Arrow icons in pagination
<ChevronLeft className="h-4 w-4 rtl:rotate-180" />
<ChevronRight className="h-4 w-4 rtl:rotate-180" />
```

**Icon Mirroring Quick Reference:**

| Should Mirror (Directional) | Should NOT Mirror (Symmetric) |
|-----------------------------|-------------------------------|
| Arrows (←, →, ↗)            | Plus (+), Minus (-)           |
| Chevrons (‹, ›)             | Check (✓), X (✗)              |
| Progress indicators         | Heart, Star, Settings         |
| Reply/Forward icons         | Search, Home, User            |

**How to Apply Mirroring:**
- **Directional buttons**: Use `ButtonArrow` component (handles RTL automatically)
- **Non-directional icons**: No special handling needed
- **Edge cases**: Apply `rtl:rotate-180` (rotation) or `rtl:scale-x-[-1]` (flip) classes directly

**When to Apply:**
- Breadcrumb separators (›, /, →)
- Pagination arrows (‹, ›)
- Back/Forward buttons
- Dropdown indicators (sometimes)
- Progress indicators

**When NOT to Apply:**
- Up/down arrows (vertical direction is universal)
- Icons with no directional meaning (settings, close, etc.)
- Icons representing physical objects (not metaphorical direction)

---

## 🛠️ RTL-First Component Checklist

Use this checklist when building or auditing components:

### Text & Content
- [ ] Use logical properties (`ps-4` not `pl-4`)
- [ ] Test with Arabic/Hebrew text (not just English in RTL)
- [ ] Check text truncation works correctly
- [ ] Verify placeholder text aligns properly

### Layout & Spacing
- [ ] Use `start`/`end` instead of `left`/`right`
- [ ] Use `ms-`/`me-` instead of `ml-`/`mr-`
- [ ] Check flex/grid layouts flip correctly
- [ ] Verify absolute positioned elements

### Icons & Graphics
- [ ] Rotate directional icons with `rtl:rotate-180`
- [ ] Check icon alignment in buttons
- [ ] Verify badge/indicator positioning
- [ ] Test avatar/image positioning

### Interactions
- [ ] Check hover states align correctly
- [ ] Test focus rings on correct side
- [ ] Verify tooltip/popover positioning
- [ ] Check dropdown menu alignment

### Animations
- [ ] Add RTL variants for `translateX`
- [ ] Check slide animations direction
- [ ] Verify transition origins
- [ ] Test entrance/exit animations

### Special Cases
- [ ] Keyboard shortcuts use `dir="ltr"`
- [ ] Numbers stay in LTR (123 not 321)
- [ ] Code blocks stay in LTR
- [ ] URLs stay in LTR

---

## 📋 Common Patterns & Solutions

### Pattern 1: Menu Items with Shortcuts

```tsx
// Context Menu, Dropdown Menu, Command Palette
<MenuItem>
  <Icon className="me-2" />
  <span>{label}</span>
  <span className="ms-auto">
    <span dir="ltr">{shortcut}</span>
  </span>
</MenuItem>
```

### Pattern 2: Navigation with Icons

```tsx
// Breadcrumbs, Pagination
<nav>
  <ChevronLeft className="me-2 rtl:rotate-180" />
  <span>{label}</span>
  <ChevronRight className="ms-2 rtl:rotate-180" />
</nav>
```

### Pattern 3: Toggle/Switch Components

```tsx
<Switch>
  <Thumb className={cn(
    "translate-x-0 data-[state=checked]:translate-x-4",
    "rtl:translate-x-0 rtl:data-[state=checked]:-translate-x-4"
  )} />
</Switch>
```

### Pattern 4: Slide-out Panels

```tsx
// Drawer from right in LTR, from left in RTL
<Drawer className={cn(
  "ltr:right-0 ltr:translate-x-full ltr:data-[state=open]:translate-x-0",
  "rtl:left-0 rtl:-translate-x-full rtl:data-[state=open]:translate-x-0"
)} />
```

### Pattern 5: Mixed Content (LTR within RTL)

```tsx
// Keep code/URLs in LTR within RTL text
<p>
  {arabicText}
  <code dir="ltr" className="mx-2">
    console.log()
  </code>
  {moreArabicText}
</p>
```

---

## 🧪 Testing Strategies

### Visual Testing
1. **Switch between LTR and RTL while testing**
   - Use the direction toggle in your app
   - Don't just screenshot - interact with components

2. **Test with real content**
   - ❌ Don't just test with "RTL Test" in English
   - ✅ Use actual Arabic/Hebrew text of varying lengths

3. **Check edge cases**
   - Very long text
   - Very short text
   - Numbers mixed with text
   - Links and inline code

### Automated Testing
```tsx
// Test component in both directions
describe('Component RTL', () => {
  it('renders correctly in LTR', () => {
    render(<Component />, { direction: 'ltr' })
    // assertions
  })

  it('renders correctly in RTL', () => {
    render(<Component />, { direction: 'rtl' })
    // assertions
  })
})
```

### Manual Checklist
- [ ] Test in Chrome (best RTL support)
- [ ] Test in Safari (different text rendering)
- [ ] Test in Firefox (different logical property support)
- [ ] Test on mobile (touch targets, swipe gestures)
- [ ] Get native speaker feedback

---

## 🎓 Key Principles

### 1. Think in "Start" and "End", Not "Left" and "Right"
```tsx
// ❌ Think: "Icon on the left, text on the right"
// ✅ Think: "Icon at the start, text after it"

<Button>
  <Icon className="me-2" /> {/* Icon at START */}
  <span>{text}</span>       {/* Text at END */}
</Button>
```

### 2. Separate Concerns: Position vs Direction
```tsx
// Position = Where in the layout (uses logical properties)
// Direction = How text flows (uses dir attribute)

<span className="ms-auto">  {/* Position */}
  <span dir="ltr">⌘K</span> {/* Direction */}
</span>
```

### 3. Default to Logical, Override When Needed
```tsx
// Start with logical properties
className="ps-4"

// Only use physical when you have a specific reason
className="ltr:pl-4 rtl:pr-4"
```

### 4. Test Early, Test Often
Don't wait until the end to test RTL. Build each component with RTL in mind from the start.

---

## 🔗 Resources

### Official Specs
- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [HTML `dir` Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
- [Unicode Bidirectional Algorithm](https://unicode.org/reports/tr9/)

### Noor UI Docs
- [I18n Architecture](../architecture/I18N-SOLUTION.md)
- [Multilingual Strategy](../architecture/MULTILINGUAL_STRATEGY.md)
- [Component Documentation Standards](./COMPONENT_DOCUMENTATION_STANDARDS.md)

### Testing Tools
- [Chrome DevTools RTL](https://developer.chrome.com/docs/devtools/rendering/apply-effects/#emulate-rtl)
- [i18n-tasks](https://github.com/glebm/i18n-tasks)

---

## 💡 Future Lessons

This document will grow as we discover more RTL patterns and edge cases. Recent additions:

- **2025-11-29**: Added keyboard shortcut lessons, positioning vs direction, transform animations
- (Future updates will be added here)

---

## 🤝 Contributing

Found an RTL issue or pattern we haven't covered? Please contribute!

1. Document the problem clearly
2. Explain why it happens
3. Provide a working solution
4. Include code examples
5. Submit a PR

---

**Last Updated:** 2025-11-29
**Version:** 1.0
**Maintainer:** Noor UI Team
