# Introducing Noor UI — An RTL-First React Component Library for Bilingual Apps

> **TL;DR**: I built an open-source React component library with 77+ components that works perfectly in both English (LTR) and Arabic (RTL). It's called Noor UI, it's on npm as `noorui-rtl`, and it comes with 5 real application examples. Here's why and how.

---

If you've ever tried to build a bilingual web app that supports both English and Arabic, you know the pain. Most component libraries treat RTL as an afterthought — a CSS hack bolted on after the fact. The result? Broken layouts, misaligned icons, reversed animations, and text that doesn't feel natural.

I spent months building Noor UI specifically to solve this. Not "LTR with RTL support" — but RTL-first, where both directions are equal citizens.

## What is Noor UI?

**Noor** (نور) means "Light" in Arabic. It's a React component library built on Radix UI and Tailwind CSS with:

- **77+ components** — from basic buttons to full dashboard layouts
- **True bilingual support** — every component works in LTR and RTL without conditional logic
- **4 themes** — Minimal, Futuristic, Cozy, Artistic
- **Regional & Islamic components** — Prayer Times, Hijri Calendar, Arabic Numbers, Zakat Calculator
- **AI/LLM components** — Chat, Streaming Text, Model Selector, Token Counter
- **690+ unit tests** — props, variants, RTL behavior, accessibility, keyboard navigation
- **5 real application examples** — Education, Healthcare, Banking, Hotel Booking, and more

## The Key Insight: Logical Properties

The foundation of RTL-first development is deceptively simple: **never use `left` or `right`**.

Instead of `margin-left`, use `margin-inline-start`. Instead of `padding-right`, use `padding-inline-end`. In Tailwind:

```
❌  ml-4 mr-2 pl-3 pr-6 text-left
✅  ms-4 me-2 ps-3 pe-6 text-start
```

When you do this consistently, your entire UI flips automatically. No conditional logic, no direction checks, no separate RTL stylesheets.

## Real Examples, Not Just Components

I believe the best way to validate a component library is to build real apps with it. Noor UI comes with 5 complete, multi-page examples:

**Education Portal** — Student dashboard with Saudi grading system, weekly Sun-Thu timetable, assignment tracking with bilingual titles, attendance calendar with Hijri dates.

**Healthcare Clinic** — Appointment management, patient directory with Emirates ID, prescription tracking, dual Gregorian/Hijri calendar.

**Digital Banking** — Transaction history, money transfers with OTP verification, bill payments, card management with freeze toggle.

**Hotel Booking** — Search with filters, property galleries, multi-step booking flow, reservation management.

Every example works in both English and Arabic. Switch the direction and the entire UI mirrors — navigation, icons, text alignment, data tables, charts — everything.

## Installation

```bash
npm install noorui-rtl
```

```tsx
import 'noorui-rtl/dist/styles.css'
import { Button, Card, DirectionProvider } from 'noorui-rtl'

function App() {
  return (
    <DirectionProvider>
      <Card>
        <Button>Get Started</Button>
      </Card>
    </DirectionProvider>
  )
}
```

## What I Learned Building This

1. **Not all icons should mirror** — Arrows flip in RTL, but gear icons, checkmarks, and media controls stay the same.

2. **CSS transforms don't flip automatically** — A switch thumb sliding right in LTR needs explicit RTL variants to slide left.

3. **Check `direction`, not `locale`** — Using `locale === 'ar'` breaks Hebrew, Urdu, and Farsi. Always check `direction === 'rtl'`.

4. **Arabic numerals are not automatic** — `Intl.NumberFormat('ar')` returns Western numerals (1,2,3) by default. You need `numberingSystem: 'arab'` for Eastern Arabic (١,٢,٣).

5. **Keyboard shortcuts are direction-neutral** — `⌘K` should stay `⌘K` in RTL, not reverse to `K⌘`.

## Links

- **Documentation**: [noorui.com](https://noorui.com)
- **npm**: [noorui-rtl](https://www.npmjs.com/package/noorui-rtl)
- **GitHub**: [github.com/ositaka/noor-ui](https://github.com/ositaka/noor-ui)
- **Storybook**: [storybook.noorui.com](https://storybook.noorui.com)
- **Discord**: [discord.gg/gvrqU2WG](https://discord.gg/gvrqU2WG)

---

Noor UI is MIT licensed and open source. If you're building bilingual apps, I'd love your feedback.

Built with love by [Nuno Marques](https://ositaka.com).

---

*Tags: react, opensource, webdev, typescript*
