# Visual Validation Checklist

This checklist defines what agents should validate visually when analyzing screenshots.

## Quick Reference

| Category | Priority | Auto-fixable |
|----------|----------|--------------|
| RTL Layout | CRITICAL | Yes |
| Icon Direction | CRITICAL | Yes |
| Text Overflow | HIGH | Yes |
| Spacing | MEDIUM | Yes |
| Dark Mode | MEDIUM | Yes |
| Alignment | MEDIUM | Partial |
| Animations | LOW | No |

---

## RTL Layout (CRITICAL)

### Overall Layout
- [ ] Content flows right-to-left
- [ ] Navigation items reversed
- [ ] Sidebar on correct side
- [ ] Scroll direction correct

### Component Positions
- [ ] Form labels on correct side of inputs
- [ ] Button groups order reversed
- [ ] Close buttons on correct corner (top-left in RTL)
- [ ] Action buttons order mirrored

### Auto-Fix Pattern
```tsx
// Position
className="left-0"  →  className="start-0"
className="right-4" →  className="end-4"

// Flexbox order
className="flex-row-reverse" →  className="flex-row-reverse rtl:flex-row"
```

---

## Icon Direction (CRITICAL)

### Directional Icons
- [ ] Chevrons point correct way (left in RTL, right in LTR)
- [ ] Arrow icons mirror appropriately
- [ ] Back/forward navigation correct
- [ ] Expand/collapse indicators correct

### Non-Directional Icons
- [ ] Checkmarks stay same (not directional)
- [ ] Plus/minus stay same
- [ ] Close (X) stays same
- [ ] Search icon stays same

### Common Directional Icons
| Icon | LTR | RTL | Fix |
|------|-----|-----|-----|
| ChevronRight | → | ← | `rtl:rotate-180` |
| ChevronLeft | ← | → | `rtl:rotate-180` |
| ArrowRight | → | ← | `rtl:scale-x-[-1]` |
| ArrowLeft | ← | → | `rtl:scale-x-[-1]` |
| ExternalLink | ↗ | ↖ | `rtl:scale-x-[-1]` |

### Auto-Fix Pattern
```tsx
// Rotation (for symmetrical icons)
<ChevronRight className="h-4 w-4 rtl:rotate-180" />

// Scale (for asymmetrical icons)
<ArrowRight className="h-4 w-4 rtl:scale-x-[-1]" />
```

---

## Text & Content (HIGH)

### Alignment
- [ ] Text aligns to start (right in RTL)
- [ ] Numbers align correctly
- [ ] Punctuation on correct side

### Overflow
- [ ] No text bleeding outside container
- [ ] Ellipsis on correct end (left in RTL)
- [ ] Long words wrap properly
- [ ] No horizontal scrollbar

### Arabic Text Specific
- [ ] Arabic text renders correctly
- [ ] Mixed Arabic/English displays properly
- [ ] Numbers in correct format
- [ ] Dates in correct format

### Auto-Fix Pattern
```tsx
// Alignment
className="text-left"  →  className="text-start"
className="text-right" →  className="text-end"

// Overflow
className=""          →  className="truncate"
className=""          →  className="break-words"
className=""          →  className="line-clamp-2"
```

---

## Spacing (MEDIUM)

### Margins
- [ ] Margins mirror correctly
- [ ] No collapsed margins breaking layout
- [ ] Consistent margin between elements

### Padding
- [ ] Padding mirrors correctly
- [ ] Content not touching edges
- [ ] Comfortable touch targets (mobile)

### Gaps
- [ ] Flex gaps consistent
- [ ] Grid gaps consistent
- [ ] No unexpected gaps

### Auto-Fix Pattern
```tsx
// Margins
className="ml-2 mr-4" →  className="ms-2 me-4"
className="pl-3 pr-5" →  className="ps-3 pe-5"

// Borders
className="border-l-2" →  className="border-s-2"
className="border-r-2" →  className="border-e-2"

// Rounded corners
className="rounded-l-md" →  className="rounded-s-md"
className="rounded-r-md" →  className="rounded-e-md"
```

---

## Dark Mode (MEDIUM)

### Contrast
- [ ] Body text readable (4.5:1 ratio)
- [ ] Headings readable
- [ ] Links distinguishable
- [ ] Placeholder text visible

### Elements
- [ ] Borders visible when needed
- [ ] Icons visible (not lost in dark)
- [ ] Shadows appropriate
- [ ] Dividers visible

### States
- [ ] Hover states visible
- [ ] Focus states visible
- [ ] Disabled states distinguishable
- [ ] Selected states clear

### Auto-Fix Pattern
```tsx
// Text colors
className="text-gray-600"   →  className="text-muted-foreground"
className="text-gray-900"   →  className="text-foreground"

// Background colors
className="bg-gray-100"     →  className="bg-muted"
className="bg-white"        →  className="bg-background"

// Border colors
className="border-gray-200" →  className="border-border"
```

---

## Alignment (MEDIUM)

### Vertical
- [ ] Icons vertically centered with text
- [ ] Form elements aligned
- [ ] Table cells aligned
- [ ] List bullets aligned

### Horizontal
- [ ] Columns align properly
- [ ] Grid items align
- [ ] Flex items align
- [ ] Text baselines align

### Partial Auto-Fix
```tsx
// Vertical centering
className="inline"       →  className="inline-flex items-center"

// Text/icon alignment
className="flex"         →  className="flex items-center"
```

---

## Interactive States (MEDIUM)

### Hover
- [ ] Hover effect visible
- [ ] Cursor changes appropriately
- [ ] No layout shift on hover

### Focus
- [ ] Focus ring visible
- [ ] Focus ring has contrast
- [ ] Tab order logical

### Active
- [ ] Press effect visible
- [ ] Not confused with hover

### Disabled
- [ ] Clearly looks disabled
- [ ] Cursor shows not-allowed
- [ ] Cannot be interacted with

---

## Animations (LOW)

### Direction
- [ ] Slide animations correct direction
- [ ] Progress fills correct direction
- [ ] Carousel moves correct direction

### Behavior
- [ ] No layout shift
- [ ] Smooth transitions
- [ ] Respects reduced motion

### Usually NOT Auto-fixable
Animations often require human decision on correct behavior.

---

## Component-Specific Checks

### Buttons
| Check | LTR | RTL |
|-------|-----|-----|
| Icon before text | Icon on left | Icon on right |
| Icon after text | Icon on right | Icon on left |
| Loading spinner | Centered | Centered |
| Arrow icon | Points right | Points left |

### Inputs
| Check | LTR | RTL |
|-------|-----|-----|
| Label position | Above or left | Above or right |
| Placeholder | Aligns left | Aligns right |
| Prefix | On left | On right |
| Suffix | On right | On left |
| Clear button | On right | On left |
| Error message | Below, left-aligned | Below, right-aligned |

### Dropdowns/Selects
| Check | LTR | RTL |
|-------|-----|-----|
| Chevron position | On right | On left |
| Chevron direction | Points down | Points down |
| Menu opens | Below | Below |
| Selected indicator | On left | On right |
| Scroll direction | Normal | Reversed |

### Dialogs/Modals
| Check | LTR | RTL |
|-------|-----|-----|
| Close button | Top-right | Top-left |
| Title alignment | Left | Right |
| Content alignment | Left | Right |
| Button order | Secondary, Primary | Primary, Secondary |

### Tables
| Check | LTR | RTL |
|-------|-----|-----|
| Column order | Left to right | Right to left |
| Sort indicator | Points up/down | Points up/down |
| Action column | On right | On left |
| Checkbox column | On left | On right |
| Row hover | Full width | Full width |

### Navigation
| Check | LTR | RTL |
|-------|-----|-----|
| Menu items | Left-aligned | Right-aligned |
| Submenu arrow | Points right | Points left |
| Breadcrumb separator | / or > | / or < |
| Back button | Points left | Points right |
| Active indicator | Usually left | Usually right |

### Progress/Sliders
| Check | LTR | RTL |
|-------|-----|-----|
| Fill direction | Left to right | Right to left |
| Track direction | Left to right | Right to left |
| Thumb position | Matches value | Matches value |
| Labels | Start on left | Start on right |

---

## Severity Guidelines

### CRITICAL - Must Fix
- Layout completely broken
- Text unreadable
- Functionality affected
- Accessibility blocked

### WARNING - Should Fix
- Minor visual inconsistency
- Slight misalignment
- Non-blocking issues
- Polish items

### INFO - Optional
- Enhancement suggestions
- Edge cases
- Nice-to-have improvements

---

## Quick Decision Tree

```
Is something visually wrong?
│
├─► No → PASS
│
└─► Yes → Is it functional or just cosmetic?
    │
    ├─► Functional → CRITICAL
    │
    └─► Cosmetic → Does it affect usability?
        │
        ├─► Yes → WARNING
        │
        └─► No → INFO
```
