# Noor UI — Example Generation Guide

Generate real-world, multi-page example apps that showcase the noorui-rtl
component library. Uses Claude Code's visual QA loop to iteratively build
and refine each example until it looks polished.

---

## Quick Start

```bash
claude "Follow EXAMPLE_GENERATION_GUIDE.md to build the [Healthcare Clinic] example.
Use the visual QA loop. Build all pages listed in the page map."
```

---

## How It Works

You already have the infrastructure:

| Tool | Purpose |
|---|---|
| `visual-qa-loop` prompt | Orchestrates: build → screenshot → analyze → fix → repeat |
| `visual-analyzer` agent | Evaluates screenshots for RTL, spacing, contrast issues |
| `component-creator` agent | Creates new components if an example needs one |
| Playwright + screenshot scripts | Captures pages in LTR/RTL, light/dark, multiple viewports |

The missing piece is an **example-specific workflow** — this guide fills that gap.

---

## The Example Generation Workflow

### Phase 1: Scaffold all pages

Build the full page structure first with placeholder content.
This ensures navigation between pages works before polishing visuals.

```
app/examples/[name]/
├── page.tsx              ← Main listing/dashboard
├── [id]/page.tsx         ← Detail view (dynamic route)
├── admin/page.tsx        ← Admin/management view (if applicable)
└── layout.tsx            ← Shared layout (optional, for nav/sidebar)
```

### Phase 2: Fill each page with real components and data

- Use components from `components/ui/`
- Write realistic bilingual data (Arabic + English)
- Wire up navigation between pages with Next.js `<Link>`

### Phase 3: Visual QA loop (per page)

For each page:
1. Start dev server (`pnpm dev`)
2. Screenshot the page at 1280x900
3. Read the screenshot, evaluate layout
4. Fix issues (spacing, alignment, component usage)
5. Re-screenshot and re-evaluate
6. Repeat until clean (max 3 iterations)

### Phase 4: RTL validation

Screenshot every page in RTL mode and verify mirroring.

---

## Example Ideas

### Tier 1 — Multi-page, GCC-focused (high showcase value)

---

#### 1. Healthcare / Clinic Dashboard

**Why:** Combines data tables, calendars, forms, and real-time status — hits most components.

**Page map:**
```
app/examples/healthcare/
├── page.tsx                 ← Dashboard: stats, today's appointments, alerts
├── patients/page.tsx        ← Patient list (DataTable with search/filter)
├── patients/[id]/page.tsx   ← Patient profile: history, prescriptions, notes
├── appointments/page.tsx    ← Calendar view of all appointments
└── prescriptions/page.tsx   ← Prescription management with forms
```

**Components used:** Card, StatsCard, DataTable, Calendar, HijriDate, Tabs, Badge,
Avatar, Button, Dialog, Input, Select, Alert, Breadcrumb, Pagination, EmptyState

**Sample data context:**
- Clinic in Dubai, bilingual patient records
- Hijri dates for appointments
- Patient names: mix of Arabic and international
- Prices in AED

**Prompt:**
```
Build a Healthcare/Clinic Dashboard example for noorui-rtl.

Page structure:
1. /healthcare — Main dashboard with:
   - Stats row: Today's Appointments (12), Patients Seen (8), Revenue (AED 4,200), Pending (3)
   - Today's appointment list with time, patient name, doctor, status badges
   - Quick actions: New Appointment, Add Patient
   - Recent alerts panel

2. /healthcare/patients — Patient directory:
   - DataTable with columns: Photo (Avatar), Name (AR+EN), Emirates ID, Last Visit, Status
   - Search and filter controls
   - "Add Patient" button opens Dialog

3. /healthcare/patients/[id] — Patient detail:
   - Profile header with avatar, name, DOB (Hijri), blood type, allergies
   - Tabs: Overview, Medical History, Prescriptions, Documents
   - Visit history timeline

4. /healthcare/appointments — Full calendar view:
   - Calendar component with Hijri dates
   - Day/Week/Month view tabs
   - Appointment cards with doctor assignment

5. /healthcare/prescriptions — Prescription management:
   - DataTable of active prescriptions
   - New prescription form with medication search

Navigation between all pages via breadcrumbs and clickable rows.
Use realistic Arabic and English data throughout.
Follow the exact same patterns as the marketplace example.
```

---

#### 2. School / Education Portal

**Why:** Parent-facing portal — great for showcasing progress bars, grades tables, schedules.

**Page map:**
```
app/examples/education/
├── page.tsx                 ← Student dashboard: GPA, attendance, upcoming
├── grades/page.tsx          ← Full grades table by semester
├── schedule/page.tsx        ← Weekly class schedule grid
├── assignments/page.tsx     ← Assignments list with status/progress
└── assignments/[id]/page.tsx ← Assignment detail with submission
```

**Components used:** Card, StatsCard, DataTable, Progress, Badge, Tabs, Calendar,
Avatar, Breadcrumb, FileUpload, EmptyState, Alert

**Sample data context:**
- School in Riyadh, bilingual subject names (Mathematics/الرياضيات)
- Hijri + Gregorian academic calendar
- Grading scale: A+ to F with GPA calculation
- Currency in SAR for fee-related items

**Prompt:**
```
Build a School/Education Portal example for noorui-rtl.

This is a parent/student portal for a school in Riyadh.

Page structure:
1. /education — Student dashboard:
   - Student profile card: avatar, name, Grade 10, Section B
   - Stats: GPA (3.7/4.0), Attendance (94%), Assignments Due (3), Class Rank (5th)
   - Upcoming assignments with due dates and progress bars
   - Recent grades summary
   - Announcements alert panel

2. /education/grades — Full gradebook:
   - Semester selector tabs (Semester 1 / Semester 2)
   - DataTable: Subject (bilingual), Teacher, Midterm, Final, Grade, Status badge
   - GPA summary card at top

3. /education/schedule — Weekly timetable:
   - Grid layout: days as columns, time slots as rows
   - Color-coded by subject
   - Current day highlighted
   - Teacher name and room number in each cell

4. /education/assignments — All assignments:
   - Filter tabs: All, Pending, Submitted, Graded
   - Cards with: subject badge, title, due date, progress bar, status
   - Click through to detail page

5. /education/assignments/[id] — Assignment detail:
   - Assignment description with rich text
   - Attached resources (PDF icons)
   - FileUpload for submission
   - Submission status and teacher feedback section

Bilingual subject names throughout. Hijri dates alongside Gregorian.
```

---

#### 3. Government Services Portal

**Why:** Multi-step forms, document tracking, status timelines — very relevant to GCC.

**Page map:**
```
app/examples/government/
├── page.tsx                 ← Services catalog + active requests
├── services/[id]/page.tsx   ← Service detail + application form
├── applications/page.tsx    ← My applications tracker
├── applications/[id]/page.tsx ← Application status with timeline
└── documents/page.tsx       ← Document vault / uploads
```

**Components used:** Card, Stepper/Progress, DataTable, Badge, Input, Select,
FileUpload, Alert, Breadcrumb, Tabs, Dialog, EmptyState, Callout

**Prompt:**
```
Build a Government Services Portal example for noorui-rtl.

Citizens portal for an Abu Dhabi government entity.

Page structure:
1. /government — Home:
   - Featured services grid: Visa & Residency, Business Licensing, Civil Affairs, Traffic
   - Each service as a FeatureCard with icon, title, description
   - Active requests summary: 2 pending, 1 approved
   - Important announcements in Callout components
   - Quick search input

2. /government/services/[id] — Service application:
   - Service description header
   - Multi-step form (4 steps): Personal Info → Documents → Payment → Review
   - Progress stepper at top
   - Form fields: Input, Select, DatePicker, FileUpload
   - Required documents checklist

3. /government/applications — My applications:
   - DataTable: Request #, Service Type, Submitted Date, Status badge, Actions
   - Filter by status: All, Pending, Approved, Rejected
   - Each row clickable to detail

4. /government/applications/[id] — Application detail:
   - Status timeline/stepper: Submitted → Under Review → Approved → Completed
   - Application summary card with all submitted data
   - Attached documents list
   - Officer notes section
   - Actions: Cancel, Appeal, Download Certificate

5. /government/documents — Document vault:
   - Uploaded documents grid with file type icons
   - Upload new document dialog with FileUpload
   - Document categories: ID, Certificates, Photos, Financial

Formal tone. Arabic as primary language with English labels.
Use official-looking styling (minimal, clean, trustworthy).
```

---

#### 4. Hotel Booking Platform

**Page map:**
```
app/examples/hotel/
├── page.tsx                 ← Search + hotel listings
├── [id]/page.tsx            ← Hotel detail + room selection
├── booking/page.tsx         ← Booking form + payment
└── reservations/page.tsx    ← My reservations
```

**Prompt:**
```
Build a Hotel Booking Platform example for noorui-rtl.

Page structure:
1. /hotel — Search + results:
   - Search bar: Destination input, DatePicker check-in/out, Guests select
   - Filter sidebar: Price RangeSlider, Star rating checkboxes, Amenities
   - Hotel listing cards: image placeholder, name, location, star rating, price/night, "View" button
   - Sort dropdown: Price, Rating, Distance

2. /hotel/[id] — Hotel detail:
   - Image gallery placeholder (grid of colored rectangles)
   - Hotel info: name, rating, location badge, description
   - Tabs: Rooms, Amenities, Reviews, Location
   - Room type cards: name, bed type, capacity, price, "Book" button
   - Guest reviews with Avatar, rating stars, comment

3. /hotel/booking — Booking flow:
   - Booking summary sidebar (selected room, dates, price breakdown)
   - Guest details form: name, email, phone, special requests
   - Payment section (card inputs)
   - Terms checkbox and "Confirm Booking" button

4. /hotel/reservations — My bookings:
   - Reservation cards: hotel name, dates, room type, status badge, confirmation #
   - Tabs: Upcoming, Past, Cancelled

Prices in AED. GCC hotel names (Pearl Grand Hotel, Al Nakheel Resort).
Use cities: Dubai, Abu Dhabi, Doha, Muscat, Riyadh.
```

---

#### 5. Banking / Personal Finance

**Page map:**
```
app/examples/banking/
├── page.tsx                 ← Account overview + recent transactions
├── transactions/page.tsx    ← Full transaction history (DataTable)
├── transfer/page.tsx        ← Send money form
├── bills/page.tsx           ← Bill payments
└── cards/page.tsx           ← Card management
```

**Prompt:**
```
Build a Personal Banking Dashboard example for noorui-rtl.

Page structure:
1. /banking — Overview:
   - Account cards: Current (AED 24,500), Savings (AED 156,000) — show IBAN, card last 4
   - Quick actions row: Transfer, Pay Bills, Card Controls, Statements
   - Recent transactions list (last 5): merchant, category icon, amount (+/- colored)
   - Monthly spending chart placeholder
   - Alerts: credit card payment due, suspicious activity

2. /banking/transactions — Full history:
   - DataTable: Date, Description, Category badge, Reference, Amount
   - Filter: date range, category select, amount range
   - Search by merchant name
   - Export button

3. /banking/transfer — Send money:
   - Beneficiary select (saved beneficiaries as Avatar + name cards)
   - OR new beneficiary form (name, IBAN, bank)
   - Amount input with ArabicNumber formatting
   - Purpose of transfer select
   - Review and confirm dialog

4. /banking/bills — Bill payments:
   - Registered billers grid: DEWA, Etisalat, Du, Salik, Municipality
   - Each with: last paid, next due, amount, "Pay" button
   - Payment history tab
   - Add new biller dialog

5. /banking/cards — Card management:
   - Card display (styled card with last 4 digits, expiry)
   - Card controls: freeze toggle, spending limit slider, online payments switch
   - Recent card transactions
   - Request new card dialog

Use AED throughout. Arabic number formatting with ArabicNumber component.
```

---

### Tier 2 — Single page + detail (lighter scope)

| Example | Main page | Detail page | Key components |
|---|---|---|---|
| **Restaurant / Food Order** | Menu with category tabs | Cart sheet + checkout | Card, Sheet, Badge, Tabs |
| **HR Employee Directory** | Employee DataTable | Employee profile | DataTable, Avatar, Tabs |
| **Fitness / Gym** | Dashboard with schedule | Workout plan detail | Calendar, Progress, Card |
| **News / Media** | Article grid | Article reader | Card, Blockquote, RichText |
| **Charity / Donations** | Campaign listings | Campaign detail + donate form | Progress, Card, Input |
| **Car Dealership** | Vehicle listings + filters | Vehicle detail + booking | ListingCard, RangeSlider |
| **Prayer & Quran** | Dashboard with prayer times | Reading tracker | PrayerTimes, HijriDate |
| **Recipe / Cooking** | Recipe grid | Recipe steps with checklist | Card, Stepper, Checkbox |
| **Logistics Tracker** | Shipment DataTable | Tracking timeline | DataTable, Progress, Badge |
| **Wedding Planner** | Checklist dashboard | Vendor/venue detail | Checkbox, Calendar, Card |

For Tier 2, use the same prompt structure but with 2 pages instead of 5.

---

## Creating a New Agent: `example-generator`

You could add this to `.claude/agents/`:

```markdown
---
name: example-generator
description: Generates multi-page example apps for noorui-rtl. Builds page structure,
fills with real components and bilingual data, then runs visual QA loop on each page.
tools: Read, Grep, Glob, Write, Edit, Bash
model: opus
---

# Example Generator Agent

## Your Role
Build complete, multi-page example applications for the noorui-rtl component library.
Each example should feel like a real product — not a demo.

## Before Building

1. Read EXAMPLE_GENERATION_GUIDE.md for the example spec
2. Read 1-2 existing multi-page examples for patterns:
   - app/examples/marketplace/ (6 pages, e-commerce flow)
   - app/examples/real-estate/ (listing + detail)
   - app/examples/b2b-marketplace/ (listing + detail + RFQ)
3. Read the components index to know what's available

## Building Rules

1. **Use only existing components** — never create new ones for an example
2. **Bilingual data** — every text must have Arabic and English, use `content` from i18n
3. **Realistic data** — real GCC city names, Arabic names, proper currency formatting
4. **Navigation works** — Link between pages, breadcrumbs, back buttons
5. **Follow the pattern exactly** — 'use client', useDirection(), content from i18n
6. **Responsive** — mobile-first grid with breakpoints
7. **Download images locally** — never link to external services (Unsplash, etc.). Store in `public/examples/<example-name>/` and reference via local paths
8. **Use semantic CSS tokens** — `text-destructive`, `text-success`, `bg-warning/10`, etc. Never hardcoded colors like `text-red-500`
9. **Use noorui-rtl components** over native HTML inputs — e.g. DatePicker instead of `<input type="date">`

## Page-by-Page Process

For each page in the example:

### Build
- Create the page file following existing patterns
- Import components from @/components/ui/
- Use Phosphor Icons
- Write realistic sample data

### Screenshot
```bash
npx playwright screenshot http://localhost:3000/examples/[name]/[page] \
  screenshots/examples/[name]-[page]-draft.png \
  --viewport-size=1280,900 --wait-for-timeout=2000
```

### Evaluate
Read the screenshot. Check:
- Visual balance and proportions
- Component variety (using enough noorui components?)
- Content realism
- Spacing consistency
- Responsive grid setup

### Fix and repeat (max 3 iterations per page)

## After All Pages Built

1. Screenshot each page in RTL mode
2. Run visual-analyzer on all screenshots
3. Fix any RTL issues found
4. Present final summary with all screenshots

## Output

For each example, deliver:
- All page files created
- Screenshots of every page (LTR + RTL)
- Summary of components used
- Any issues that need human review
```

## But Do You Need a New Agent?

Honestly, **probably not**. Your existing setup is powerful enough:

- Use the **visual-qa-loop prompt** to orchestrate the build → screenshot → fix cycle
- The **visual-analyzer agent** already handles screenshot evaluation
- The **component-creator agent** is there if an example needs a new component

What you really need is just **the prompt** (this guide) + the discipline of the workflow.
The guide above gives Claude Code everything it needs in a single `claude` command.

---

## Registering the Examples

After building an example, add it to the examples index page so it shows up on noorui.com/examples.
Check `app/examples/layout.tsx` or wherever the examples listing is configured.

---

## FAQ

**Q: How long does one example take?**
A Tier 1 example (5 pages) takes roughly one Claude Code session. A Tier 2 (2 pages) is quicker.

**Q: Can I run multiple examples in parallel?**
Yes — use separate Claude Code sessions or worktrees for each example.

**Q: What if a component doesn't exist yet?**
Either use the component-creator agent first, or substitute with the closest existing component.

**Q: Should I build all 15 examples?**
Start with 2-3 Tier 1 examples. They'll have the most impact on showcasing the library.
Recommended first: Healthcare, Government Portal, Banking — they cover the most components.
