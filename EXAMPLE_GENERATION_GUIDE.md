# Noor UI — Example Generation Guide

Generate real-world, multi-page example apps that showcase the noorui-rtl
component library. Uses Claude Code's visual QA loop to iteratively build
and refine each example until it looks polished.

---

## Guiding Principle

> **Every example should feel like a real product someone would use, not a component gallery.**
>
> Include: login/onboarding, personalized data, contextual notifications, realistic workflows,
> today-aware content, and meaningful interactions between pages.
>
> Research the **GCC-specific domain** (education, healthcare, government, banking) to include
> authentic local details — grading systems, ID formats, calendar specifics, cultural norms.
>
> The goal: someone looking at the example thinks "I could ship this."

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

#### 2. School / Education Portal ✅ COMPLETED

**Status:** Implemented with 8 pages (login + 7 internal pages)

**Why:** Parent-facing portal — great for showcasing progress bars, grades tables, schedules.
Authentic Saudi educational experience with Noor System (نظام نور) branding.

**Page map (implemented):**
```
app/examples/education/
├── page.tsx                   ← Login page with school branding + credentials
├── dashboard/page.tsx         ← Student dashboard ("home" after login)
├── grades/page.tsx            ← Full gradebook with Saudi grading scale
├── schedule/page.tsx          ← Weekly timetable (Sun–Thu, 7 periods)
├── assignments/page.tsx       ← Assignments with progress tracking
├── assignments/[id]/page.tsx  ← Assignment detail with submission + feedback
├── attendance/page.tsx        ← Attendance calendar with color-coded days
└── teachers/page.tsx          ← Teachers directory with messaging
```

**Saudi/GCC Authenticity Details:**
- Saudi 2-semester system (1447-1448 AH / 2025-2026 AD)
- Saudi grading scale: ممتاز (90-100), جيد جداً (80-89), جيد (70-79), مقبول (60-69)
- Sunday–Thursday school week, 7 periods/day, 6:45 AM assembly
- 10 subjects including AI (SDAIA initiative) and Islamic Studies
- SAR currency for fees, 10-digit National ID format
- Bilingual throughout with authentic Saudi teacher/student names

**Components used:** Card, StatsCard, DataTable, Progress, Badge, Tabs, Calendar,
Avatar, Breadcrumb, ButtonArrow, Callout, Alert, Dialog, FeatureCard, Input,
Select, Textarea, Checkbox, Label, Separator

---

#### 3. Government Services Portal

**Why:** Multi-step forms, document tracking, status timelines — very relevant to GCC.
Modeled after real UAE government portals (TAMM, ICP, MOHRE). Formal, institutional,
trustworthy — shows NoorUI works for serious, high-stakes interfaces.

**Page map:**
```
app/examples/government/
├── page.tsx                    ← Login with UAE PASS / national ID authentication
├── dashboard/page.tsx          ← Services catalog + active requests + notifications
├── services/[id]/page.tsx      ← Service detail + multi-step application form
├── applications/page.tsx       ← My applications tracker (DataTable)
├── applications/[id]/page.tsx  ← Application detail with status timeline
└── documents/page.tsx          ← Document vault / uploads
```

**UAE/GCC Authenticity Details:**
- Inspired by Abu Dhabi's TAMM platform (تم) — the unified government services portal
- Portal name: "بوابة الخدمات الحكومية" (Government Services Gateway)
- UAE PASS authentication (الهوية الرقمية) — the real national digital identity system
- Emirates ID format: 784-YYYY-NNNNNNN-C (784 = UAE country code)
- Unified Number (الرقم الموحد) for residency tracking
- Service categories match real UAE government: Visa & Residency (تأشيرات وإقامة),
  Business Licensing (تراخيص تجارية), Civil Affairs (الأحوال المدنية),
  Traffic & Vehicles (المرور والمركبات), Housing (الإسكان)
- Fee payments in AED with 5% VAT
- Hijri dates alongside Gregorian for official documents
- SLA timelines: "3-5 business days" for standard, "24 hours" for urgent
- Document types: Emirates ID copy, passport, tenancy contract (عقد إيجار),
  salary certificate, NOC letter, photos (white background 4x6cm)
- Application statuses: مقدم (Submitted), قيد المراجعة (Under Review),
  مطلوب مستندات إضافية (Additional Documents Required),
  معتمد (Approved), مرفوض (Rejected), مكتمل (Completed)
- Bilingual throughout — Arabic as primary with English labels

**Components used:** Card, FeatureCard, StatsCard, Stepper, Progress, DataTable, Badge,
Input, Select, DatePicker, FileUpload, Alert, Breadcrumb, Tabs, Dialog, EmptyState,
Callout, Button, ButtonArrow, Checkbox, Label, Separator, Tooltip

**Image strategy:** Download UAE government-style imagery locally to
`public/examples/government/`. Needs: UAE flag/emblem-inspired icon for branding,
abstract geometric patterns for the login page background (Islamic geometry motif).
No photos of real government buildings needed — keep it clean and institutional.

**Prompt:**
```
Build a Government Services Portal example for noorui-rtl.
Follow EXAMPLE_GENERATION_GUIDE.md for the full spec.

Page structure:
1. /government — Login page:
   - Clean institutional header with portal name + UAE-inspired emblem icon
   - "بوابة الخدمات الحكومية" / "Government Services Gateway"
   - Subtitle: "Abu Dhabi Digital Government"
   - Login form: Emirates ID input (784-XXXX-XXXXXXX-X format), password
   - "Sign in with UAE PASS" primary button (orange)
   - Demo Credentials callout (like Education example)
   - Footer: "Abu Dhabi Government © 2026" with Hijri year
   - Subtle geometric pattern background (CSS, not image)

2. /government/dashboard — Home after login:
   - Welcome: "مرحباً، أحمد" with user's name, Emirates ID, last login
   - Stats row: Active Requests (3), Approved (12), Pending Documents (1), Completed (28)
   - Featured services grid (6 services as FeatureCards):
     * Visa & Residency — تأشيرات وإقامة
     * Business Licensing — تراخيص تجارية
     * Civil Affairs — الأحوال المدنية
     * Traffic & Vehicles — المرور والمركبات
     * Housing — الإسكان
     * Employment — العمل والتوظيف
   - Active requests summary cards (2-3 recent with status badges)
   - Important announcements in Callout: "Ramadan working hours: 9 AM - 2 PM"
   - Quick actions: New Application, Track Request, Upload Document

3. /government/services/[id] — Service application:
   - Service header: icon, title, description, estimated processing time, fee
   - Required documents checklist before starting
   - Multi-step form (4 steps) with Stepper component:
     Step 1: Personal Info — Full name (AR+EN), Emirates ID, DOB, nationality, phone, email
     Step 2: Documents — FileUpload for each required doc, document type Select
     Step 3: Payment — Fee summary, payment method select (card/bank transfer)
     Step 4: Review — Summary of all entered data, terms checkbox, submit
   - Sidebar: "What you'll need" card with requirements list

4. /government/applications — My applications:
   - DataTable: Request # (GOV-2026-XXXXX), Service Type, Submitted Date (Hijri+Gregorian),
     Status badge (color-coded), SLA remaining, Actions
   - Filter tabs: All, Pending, Approved, Rejected, Completed
   - Search by request number
   - Export button

5. /government/applications/[id] — Application detail:
   - Status timeline/stepper (vertical): Submitted → Under Review → Approved → Completed
     with dates and officer names at each step
   - Application summary card with all submitted data
   - Attached documents list with download links
   - Officer notes section: "Additional document required: updated salary certificate"
   - Actions: Cancel Application, Submit Appeal, Download Certificate
   - SLA indicator: "Estimated completion: 2 business days remaining"

6. /government/documents — Document vault:
   - Grid of uploaded documents with file type icons (PDF, JPG, DOC)
   - Each card: document name, type badge, upload date, file size, expiry date
   - Categories tabs: All, ID Documents, Certificates, Financial, Photos
   - Upload new document dialog with FileUpload + document type Select
   - Expiry warnings: Alert for documents expiring within 30 days

Navigation: shared layout with sidebar nav (Dashboard, Services, Applications, Documents).
Formal tone. Official-looking styling — clean, minimal, trustworthy.
Arabic as primary language throughout.
```

---

#### 4. Hotel Booking Platform

**Why:** Visually rich — image galleries, date pickers, search/filter, pricing breakdowns.
Universally relatable UX that any hiring manager instantly understands. Heavy use of
DatePicker, RangeSlider, and Cards. Great complement to Real Estate.

**Page map:**
```
app/examples/hotel/
├── page.tsx                 ← Landing with search + featured hotels
├── search/page.tsx          ← Search results with filters
├── [id]/page.tsx            ← Hotel detail + room selection + reviews
├── booking/page.tsx         ← Multi-step booking form
└── reservations/page.tsx    ← My reservations (login-gated feel)
```

**GCC/Hospitality Authenticity Details:**
- Platform name: "نزل" (Nuzul — Arabic for "lodging/accommodation")
- Tagline: "اكتشف أفضل الفنادق في الخليج" / "Discover the finest hotels in the Gulf"
- Hotels in real GCC cities: Dubai, Abu Dhabi, Doha, Muscat, Riyadh, Jeddah, Bahrain
- Hotel names with Arabic character:
  * فندق اللؤلؤة الكبير / Pearl Grand Hotel — Dubai Marina (5★)
  * منتجع النخيل / Al Nakheel Resort — Abu Dhabi Corniche (5★)
  * فندق الديرة بوتيك / Al Deira Boutique Hotel — Doha (4★)
  * فندق الواحة / Al Waha Hotel — Muscat (4★)
  * أبراج الرياض / Riyadh Towers Hotel — Riyadh (5★)
  * فندق البحر الأحمر / Red Sea Hotel — Jeddah (4★)
- Room types: Standard (قياسية), Deluxe (ديلوكس), Suite (جناح), Royal Suite (الجناح الملكي)
- Prices in AED (cross-GCC booking), with SAR/QAR/OMR noted for local hotels
- 5% UAE tourism dirham fee + 10% service charge + 5% VAT (real UAE hotel tax structure)
- Amenities use real GCC hotel features: prayer room (مصلى), Quran in room,
  qibla direction sticker, halal dining, separate pool hours, spa
- Check-in/out times: 3:00 PM / 12:00 PM (standard GCC)
- Hijri date display alongside Gregorian for booking dates
- Guest reviews with Arabic and English names, realistic ratings
- Cancellation policy: free cancellation 48h before (standard GCC hotel policy)

**Components used:** Card, ListingCard, DatePicker, RangeSlider, Select, Input,
Badge, Tabs, Avatar, Breadcrumb, Button, ButtonArrow, Dialog, Checkbox,
Separator, StatsCard, Pagination, EmptyState, Stepper

**Image strategy:** Download hotel/hospitality images locally to
`public/examples/hotel/`. Needs: 6 hotel exterior/lobby photos (one per hotel),
3-4 room type photos (standard, deluxe, suite, royal), 1-2 amenity images,
1 hero/landing image. Source from freely licensed photography.

**Prompt:**
```
Build a Hotel Booking Platform example for noorui-rtl.
Follow EXAMPLE_GENERATION_GUIDE.md for the full spec.

Page structure:
1. /hotel — Landing page:
   - Hero section: large background image with overlay text
     "اكتشف أفضل الفنادق في الخليج" / "Discover the finest hotels in the Gulf"
   - Prominent search bar: Destination (Input with city suggestions),
     Check-in/Check-out (DatePicker pair), Guests (Select: 1-6), "Search" button
   - Stats row: 200+ Hotels, 50K+ Reviews, 15 Cities, 99% Satisfaction
   - Featured hotels section: 3 top-rated hotels as large cards with photos,
     star rating, location, starting price, "View Details" button
   - Popular destinations: city cards (Dubai, Doha, Riyadh, Muscat) with
     hotel count and starting prices
   - "Why Book With Us" section: 3 FeatureCards — Best Price Guarantee,
     Free Cancellation, 24/7 Arabic Support

2. /hotel/search — Search results:
   - Search bar (sticky top, pre-filled from landing)
   - Left sidebar filters:
     * Price range: RangeSlider (100-2000 AED/night)
     * Star rating: Checkbox group (3★, 4★, 5★)
     * Amenities: Checkboxes (Pool, Spa, Prayer Room, Free WiFi, Parking, Gym)
     * Property type: Select (Hotel, Resort, Boutique, Apartment)
   - Results count: "24 hotels found in Dubai"
   - Sort dropdown: Recommended, Price (low-high), Price (high-low), Rating, Distance
   - Hotel listing cards (6 results): photo, name (AR+EN), star rating, location,
     key amenities icons, price/night, "View" button
   - Pagination at bottom

3. /hotel/[id] — Hotel detail:
   - Image gallery: hero image + 4 thumbnail grid
   - Hotel header: name (AR+EN), star rating, location badge, "From X AED/night"
   - Tabs: Rooms, Amenities, Reviews, Policies
   - Rooms tab: room type cards with photo, bed type, max guests,
     amenities list, price/night, "Book This Room" button
   - Amenities tab: categorized grid (General, Wellness, Dining, Business)
   - Reviews tab: overall score (4.6/5), rating breakdown bar chart,
     guest reviews with Avatar, name, country flag, date, rating, comment
   - Policies tab: check-in/out, cancellation, children policy, pet policy

4. /hotel/booking — Booking flow:
   - Sticky sidebar: booking summary (hotel name, room, dates, nights, price breakdown
     including tourism fee, service charge, VAT, total in AED)
   - Multi-step form with Stepper (3 steps):
     Step 1: Guest Details — name, email, phone (+971), nationality select,
             special requests textarea, arrival time select
     Step 2: Payment — card number, expiry, CVV, cardholder name
             OR "Pay at Hotel" option
     Step 3: Review & Confirm — full summary, cancellation policy note,
             terms checkbox, "Confirm Booking" button
   - Confirmation state: success message with booking reference (NZL-2026-XXXXX),
     "View My Reservations" link

5. /hotel/reservations — My reservations:
   - Tabs: Upcoming (2), Past (5), Cancelled (1)
   - Reservation cards: hotel photo, hotel name, room type, check-in/out dates,
     number of nights, total price, status badge, confirmation number
   - Actions per card: View Details, Cancel (for upcoming), Rebook (for past)
   - Empty state for cancelled tab if empty

Navigation via breadcrumbs. Shared header with logo "نزل" + search + "My Reservations" link.
Warm, inviting design — slightly more visual than the institutional government example.
```

---

#### 5. Banking / Personal Finance

**Why:** Card management, transaction tables, money transfers, bill payments — every hiring
manager at a fintech instantly connects. Heavy use of DataTable, forms, ArabicNumber,
and interactive controls (Switch, Slider). Shows NoorUI handles data-dense financial UIs.

**Page map:**
```
app/examples/banking/
├── page.tsx                 ← Login with bank branding + biometric prompt
├── dashboard/page.tsx       ← Account overview + recent transactions
├── transactions/page.tsx    ← Full transaction history (DataTable)
├── transfer/page.tsx        ← Send money form
├── bills/page.tsx           ← Bill payments
└── cards/page.tsx           ← Card management
```

**UAE Banking Authenticity Details:**
- Bank name: "بنك النور" (Noor Bank — real name, now merged with DIB, but recognizable)
  OR use a fictional: "بنك الخليج الرقمي" / "Gulf Digital Bank" to avoid trademark issues
- UAE IBAN format: AE07 0331 2345 6789 0123 456 (AE + 2 check + 3 bank + 16 account)
- Emirates ID for login (784-YYYY-NNNNNNN-C)
- Account types: Current Account (حساب جاري), Savings Account (حساب توفير),
  Islamic Account (حساب إسلامي) — profit rate not interest rate
- Card types: Visa Signature (بطاقة فيزا سيجنتشر), Mastercard World (ماستركارد وورلد)
- Real UAE merchants for transactions:
  * Carrefour (كارفور), Lulu Hypermarket (لولو), ADNOC (أدنوك), Noon (نون),
  * Emirates Airlines, Deliveroo, Talabat, Namshi, DEWA, Etisalat, du
- Real UAE billers: DEWA (كهرباء ومياه دبي), Etisalat (اتصالات), du (دو),
  Salik (سالك — road tolls), ADDC (شركة أبوظبي للتوزيع), Municipality fees
- Transfer purposes (required by UAE Central Bank):
  Family Support (دعم عائلي), Rent (إيجار), Salary (راتب), Personal (شخصي),
  Business (أعمال), Education (تعليم)
- Currency: AED (د.إ) with proper Arabic number formatting
- 5% VAT on banking fees
- Spending categories: Groceries (بقالة), Dining (مطاعم), Transport (مواصلات),
  Shopping (تسوق), Bills (فواتير), Entertainment (ترفيه), Healthcare (صحة)
- Notifications: SMS OTP for transfers, biometric for login
- Islamic banking terminology where relevant: profit (ربح) not interest (فائدة),
  Murabaha (مرابحة) for financing

**Components used:** Card, StatsCard, DataTable, Badge, Input, Select, Switch,
Slider, RangeSlider, Button, ButtonArrow, Dialog, Tabs, Avatar, Breadcrumb,
Alert, Callout, Separator, Progress, ArabicNumber, Tooltip, Label, Checkbox

**Image strategy:** Minimal imagery needed — banking is data-driven.
Download to `public/examples/banking/`. Needs: bank logo/icon,
1-2 abstract fintech-style hero images for login page,
card brand logos (Visa, Mastercard) as simple SVG-style badges.
CSS-styled card designs (gradient backgrounds) rather than photos.

**Prompt:**
```
Build a Personal Banking Dashboard example for noorui-rtl.
Follow EXAMPLE_GENERATION_GUIDE.md for the full spec.

Page structure:
1. /banking — Login page:
   - Bank branding header: "بنك الخليج الرقمي" / "Gulf Digital Bank"
   - Tagline: "مصرفك الرقمي الأول" / "Your Digital-First Bank"
   - Login form: Emirates ID input (784-XXXX-XXXXXXX-X), password
   - "Sign in with Face ID" secondary option (icon button)
   - Remember this device checkbox
   - Demo Credentials callout (like Education example)
   - Footer: "Licensed by UAE Central Bank" + "Deposits insured up to AED 500,000"
   - Clean, modern, fintech aesthetic — dark navy/white with accent color

2. /banking/dashboard — Account overview:
   - Welcome: "صباح الخير، أحمد" with last login timestamp
   - Account cards (2 side-by-side, styled as bank cards with gradients):
     * Current Account: AED 24,567.89 — IBAN: AE07 0331 XXXX (masked) — Visa ****4532
     * Savings Account: AED 156,230.00 — IBAN: AE12 0331 XXXX — Profit rate: 3.5%
   - Quick actions row: Transfer (تحويل), Pay Bills (دفع فواتير),
     Card Controls (بطاقات), Statements (كشف حساب)
   - Recent transactions (last 5): merchant icon, name (AR), category badge,
     date, amount (+green / -red) with ArabicNumber formatting
   - Monthly spending breakdown: category list with Progress bars
     (Groceries 35%, Dining 20%, Transport 15%, Shopping 15%, Other 15%)
   - Alerts section: credit card payment due in 3 days, new security feature available

3. /banking/transactions — Full history:
   - DataTable: Date, Description (merchant AR+EN), Category badge,
     Reference #, Amount (colored +/-)
   - Filter bar: DatePicker range, Category select, Amount RangeSlider
   - Search by merchant name
   - Export CSV button
   - Summary cards at top: Total In (+12,450 AED), Total Out (-8,320 AED),
     Net (+4,130 AED) for selected period
   - Pagination

4. /banking/transfer — Send money:
   - Tabs: Saved Beneficiaries | New Transfer
   - Saved beneficiaries: cards with Avatar, name, bank name, last 4 of IBAN,
     last transfer date, "Send" button
   - New transfer form:
     * Beneficiary name (AR+EN), IBAN input with format validation,
       Bank select (Emirates NBD, ADCB, FAB, DIB, Mashreq)
     * Amount input with live ArabicNumber preview
     * Purpose of transfer select (required by Central Bank)
     * Notes textarea (optional)
   - Review dialog: full summary, OTP verification prompt, "Confirm Transfer"
   - Success state: transfer reference, "View in Transactions" link

5. /banking/bills — Bill payments:
   - Registered billers grid (6 cards):
     * DEWA — كهرباء ومياه دبي — Due: AED 450 — Due date: Mar 25
     * Etisalat — اتصالات — Due: AED 320 — Due date: Mar 20
     * du — دو — Due: AED 199 — Due date: Mar 22
     * Salik — سالك — Balance: AED 85 — Auto-recharge: ON
     * ADDC — شركة أبوظبي للتوزيع — Due: AED 380 — Due date: Mar 28
     * Municipality — البلدية — Due: AED 0 — Paid
   - Each card: biller logo area, name, account #, amount due, due date,
     last paid date, "Pay Now" button
   - Tabs: Active Billers | Payment History
   - "Add New Biller" dialog with biller type select, account number input
   - Payment history: DataTable with date, biller, amount, reference, status

6. /banking/cards — Card management:
   - Card display: CSS-styled bank card with gradient background,
     card number (masked ****4532), cardholder name, expiry (09/28),
     Visa/Mastercard badge, contactless icon
   - Card controls panel:
     * Freeze card: Switch toggle (with confirmation dialog)
     * Online purchases: Switch toggle
     * International transactions: Switch toggle
     * Contactless payments: Switch toggle
     * Daily spending limit: Slider (500-50,000 AED)
     * ATM withdrawal limit: Slider (1,000-10,000 AED)
   - Recent card transactions (last 10): similar to main transactions
   - "Request New Card" dialog: card type select, delivery address, reason
   - Card details section: credit limit, available balance, statement date,
     minimum payment due

Navigation: shared layout with sidebar nav (Dashboard, Transactions, Transfer, Bills, Cards).
Data-dense but clean. ArabicNumber component for ALL monetary values.
Modern fintech aesthetic.
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
7. **DataTable i18n** — DataTable has no built-in translations. Pass localized strings for all UI text props: `header` (in column defs), `searchPlaceholder`, `emptyMessage`, `clearSearchLabel`, `nextLabel`, `previousLabel`, `pageLabel`. Never use `headerAr` or `*Ar` suffix props (removed).
8. **Download images locally** — never link to external services (Unsplash, etc.). Store in `public/examples/<example-name>/` and reference via local paths
9. **Use semantic CSS tokens** — `text-destructive`, `text-success`, `bg-warning/10`, etc. Never hardcoded colors like `text-red-500`
10. **Use noorui-rtl components** over native HTML inputs — e.g. DatePicker instead of `<input type="date">`

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
