# Reddit Posts

## r/reactjs

**Title:** I built an RTL-first React component library with 77+ components for bilingual (English/Arabic) apps

**Body:**

After months of work, I'm releasing Noor UI — a component library where RTL isn't an afterthought.

**What it is:**
- 77+ components built on Radix UI + Tailwind CSS v4
- Logical CSS properties throughout (ms-, me-, ps-, pe-, start, end — never left/right)
- 4 built-in themes (Minimal, Futuristic, Cozy, Artistic)
- 690+ unit tests covering props, RTL behavior, a11y, and keyboard nav
- Regional & Islamic: Prayer Times, Hijri Calendar, Arabic Numbers, Zakat Calculator
- AI/LLM components: Chat, Streaming Text, Model Selector

**What makes it different from shadcn/ui:**
This started as a shadcn fork but diverged significantly. Every component uses logical properties, bilingual props (title + titleAr), and is tested in both directions. There are also domain-specific components you won't find in shadcn (Prayer Times, Hijri dates, Arabic numerals).

**5 real examples:**
- Education Portal (Saudi grading system, Sun-Thu timetable)
- Healthcare Clinic (patient management, Hijri dates)
- Digital Banking (OTP transfers, card management)
- Hotel Booking (search, gallery, multi-step booking)
- ...and more at noorui.com/examples

**Links:**
- npm: `npm install noorui-rtl`
- Docs: https://noorui.com
- GitHub: https://github.com/ositaka/noor-ui
- Storybook: https://storybook.noorui.com

MIT licensed. Would love feedback, especially from developers building for Arabic/Hebrew/Urdu markets.

---

## r/webdev

**Title:** Building a bilingual (English/Arabic) design system — the RTL challenges nobody talks about

**Body:**

I just shipped v1 of Noor UI, an RTL-first React component library, and I want to share some hard-won lessons about building for right-to-left languages.

**Things that surprised me:**

1. **Letter-spacing breaks Arabic** — Arabic letters connect. Adding letter-spacing tears words apart. You need to scope it to `[dir='ltr']` only.

2. **"Arabic numerals" aren't Arabic** — `Intl.NumberFormat('ar')` returns Western digits (1,2,3) by default. You need `numberingSystem: 'arab'` for ١٢٣.

3. **CSS transforms ignore direction** — `translateX(16px)` pushes right in both LTR and RTL. Every animated component needs explicit RTL variants.

4. **Not all icons should flip** — Arrows mirror, but checkmarks, gear icons, and media controls stay the same.

5. **Check `direction`, not `locale`** — `locale === 'ar'` breaks Hebrew, Urdu, and Farsi. Always use `direction === 'rtl'`.

The library: https://noorui.com (77+ components, 5 real app examples, MIT licensed)

Interested in a deeper write-up on any of these?

---

## r/nextjs

**Title:** Open source RTL-first component library built with Next.js 14 + Tailwind CSS v4 + Radix UI

**Body:**

Sharing a project I've been working on: Noor UI — a component library purpose-built for bilingual (English/Arabic) Next.js apps.

**Stack:**
- Next.js 14+ (App Router)
- Tailwind CSS v4.1 (CSS-first config)
- Radix UI primitives
- TypeScript strict mode
- Vitest + React Testing Library (690+ tests)

**Key Next.js patterns:**
- DirectionProvider with `controlledDirection` and `controlledLocale` props
- CSS-first theming via `@theme` blocks (no tailwind.config.ts)
- Logical properties throughout (no left/right)
- 4 themes switchable via DesignSystemProvider

**5 example apps included** — fully routed Next.js apps showing Education, Healthcare, Banking, Hotel, and more. Each with multiple pages, all bilingual.

Install: `npm install noorui-rtl`

- Docs: https://noorui.com
- GitHub: https://github.com/ositaka/noor-ui
- Storybook: https://storybook.noorui.com

MIT licensed. Feedback welcome!
