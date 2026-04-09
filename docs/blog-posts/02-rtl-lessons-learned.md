# 5 Things About Arabic UI That Surprised Me as a Western Developer

> Building an RTL-first component library taught me that Arabic interface design is full of non-obvious gotchas. Here are the ones that cost me the most time.

---

I'm a Portuguese developer who spent months building [Noor UI](https://noorui.com), an RTL-first React component library for bilingual (English/Arabic) apps. I went in thinking "just mirror everything" and came out with a much deeper understanding of bidirectional interfaces.

Here are five things that genuinely surprised me.

## 1. Arabic Letter-Spacing Breaks Text

In English, `letter-spacing: 0.05em` is a common design tool for headings and labels. In Arabic, it's destructive.

Arabic letters connect to each other — they have initial, medial, and final forms depending on position in a word. Adding letter-spacing breaks these connections, making words illegible. It's like adding spaces between every letter in English: `H e l l o` — readable but wrong.

**The fix**: Only apply letter-spacing inside `[dir='ltr']` selectors. Never apply it globally.

```css
[dir='ltr'] .tracking-wide { letter-spacing: 0.05em; }
```

## 2. "Arabic Numerals" Aren't What You Think

The digits 0-9 that we call "Arabic numerals" in the West are actually **Western Arabic** (or Hindu-Arabic) numerals. The digits used in Arabic text are **Eastern Arabic**: ٠١٢٣٤٥٦٧٨٩.

And here's the trap: `Intl.NumberFormat('ar')` in JavaScript returns **Western** numerals (1,2,3) by default. You need to explicitly request Eastern Arabic:

```javascript
// ❌ Returns: "1,234" (Western)
new Intl.NumberFormat('ar').format(1234)

// ✅ Returns: "١٬٢٣٤" (Eastern Arabic)
new Intl.NumberFormat('ar', { numberingSystem: 'arab' }).format(1234)
```

Same issue with `Intl.DateTimeFormat` — pass `numberingSystem: 'arab'` or your Hijri dates will show Western digits.

## 3. Not Everything Mirrors

When you flip a UI from LTR to RTL, the natural instinct is to mirror everything. But some things should NOT flip:

**Should mirror:**
- Navigation arrows (← →)
- Breadcrumb separators (> becomes <)
- Progress bar fill direction
- Slider track direction
- Switch thumb animation

**Should NOT mirror:**
- Checkmarks (✓)
- Close buttons (×)
- Settings/gear icons
- Play/pause media controls
- Clock hands
- Logos and brand marks

Getting this wrong makes the UI feel uncanny — technically correct but emotionally wrong to native Arabic users.

## 4. CSS Transforms Don't Respect Direction

Logical properties like `margin-inline-start` automatically flip based on direction. CSS transforms like `translateX(16px)` do not.

I discovered this when building a Switch component. The thumb slides right when toggled on in LTR. In RTL, it should slide left — but `translateX(16px)` pushes right regardless of direction.

```css
/* LTR: slide right */
[data-state=checked] { transform: translateX(16px); }

/* RTL: slide left */
[dir="rtl"] [data-state=checked] { transform: translateX(-16px); }
```

Every component with directional animations needs explicit RTL variants. There's no shortcut.

## 5. Keyboard Shortcuts Are Direction-Neutral

This one bit me hard. In an RTL context, inline-flex containers reverse their children. So a keyboard shortcut like `⌘K` displayed inside a flex container becomes `K⌘` — confusing and wrong.

Keyboard shortcuts are technical notation. They don't participate in text direction flow. The solution is a two-layer approach:

```html
<!-- Outer: positioned with logical properties (respects RTL) -->
<span class="ms-auto">
  <!-- Inner: forced LTR (shortcuts always read left-to-right) -->
  <span dir="ltr">⌘K</span>
</span>
```

The outer span uses `margin-inline-start: auto` to push the shortcut to the correct edge. The inner span forces LTR to keep the shortcut readable.

---

## The Takeaway

Building for Arabic isn't just about flipping your layout. It's about understanding a different typographic tradition with its own rules about connected letterforms, numeral systems, and reading patterns.

The biggest lesson: **involve native speakers early**. I had assumptions that felt logical to me but were immediately flagged as unnatural by Arabic-speaking users.

If you're building bilingual apps, [Noor UI](https://noorui.com) handles all of this out of the box — 77+ components, tested in both directions, with real Arabic content.

- **npm**: `npm install noorui-rtl`
- **GitHub**: [github.com/ositaka/noor-ui](https://github.com/ositaka/noor-ui)
- **Live examples**: [noorui.com/examples](https://noorui.com/examples)

---

*Tags: webdev, react, css, ux*
