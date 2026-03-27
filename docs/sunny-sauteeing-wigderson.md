# MyMantras App — Complete Specification

A React + TypeScript quotes and mantras dashboard with Human Design personalization, invite-only auth, credit-based monetization, and admin dashboard.

**Live:** mymantras.app | **Stack:** React 18, TypeScript, Vite, Supabase, Tailwind CSS, shadcn/ui, React Router, TanStack React Query, Framer Motion

---

## 1. Auth & Roles

**Provider:** Supabase Auth (email/password, invite-only registration)

**Roles:** `admin` (super admin), `moderator` (content management), `registered` (default)

**Registration flow:**
1. User enters invite code (8 chars) — validated against `invites` table (not expired, not used)
2. Username validation: 3-20 chars, lowercase + numbers + underscores
3. Password: min 6 chars with confirmation
4. Must accept Terms of Service
5. On signup: Supabase Auth creates user → DB trigger creates profile + grants bonus credits (5 credits, was 25 during beta)
6. Invite marked as used

**Route protection:**
- Public: Home, Auth, Public Collections, Collection Detail, User Profile, Terms, Privacy
- Login required: Favorites, Settings, Credits Success, Dashboard (all)
- Admin only: Dashboard Users, Dashboard Invites

---

## 2. Pages & Features

### Public Pages

**Home (`/`)** — Single quote card display. Shows daily quote (date-seeded) or shared quote from URL param. "New Inspiration" button cycles random quotes. Drawer actions: share, favorite (if logged in), decode (if HD profile set).

**Auth (`/auth`)** — Login/Register/Forgot Password modes. Invite code required for registration.

**Reset Password (`/auth/reset-password`)** — New password form after clicking email reset link.

**Public Collections (`/lists`)** — Browse public collections (only those with 1+ quotes). Shows collection cards with name, description, quote count, owner.

**Collection Detail (`/lists/:id`)** — Carousel view of quotes in a collection. Keyboard navigation (arrows). Deep-link sharing via URL params (`?quote=456`). URL updates as user navigates. Drawer actions: share, favorite, decode.

**User Profile (`/user/:username`)** — Public profile page showing user's public collections.

**Terms (`/terms`)** — 13-section legal doc. Pricing: 5 free credits, 10/5EUR, 25/10EUR packages.

**Privacy (`/privacy`)** — GDPR-compliant privacy policy. Data controller info, third-party services (Supabase, Stripe, Resend, Anthropic Claude).

### Protected Pages

**Favorites (`/favorites`)** — Carousel view of user's saved favorite quotes.

**Settings (`/settings`)** — Two sections:
1. **Credits:** Balance display, buy credits button (opens BuyCreditsDialog), transaction history table
2. **HD Profile form** with fields:
   - Type (dropdown, 5 options) — auto-fills Strategy + Not-Self Theme
   - Profile (dropdown, 12 options)
   - Authority (dropdown, 9 options)
   - Strategy (dropdown, 4 options, auto-filled)
   - Definition (dropdown, 5 options)
   - Not-Self Theme (dropdown, 4 options, auto-filled)
   - Sun Gate (dropdown, 64 I Ching gates formatted "number — name")
   - Earth Gate (dropdown, same 64 options)
   - Defined Centers (checkbox grid, 9 centers: Head, Ajna, Throat, G-Center, Heart/Will, Sacral, Solar Plexus, Spleen, Root)
   - Open Centers (read-only, auto-derived inverse of defined centers)
   - Defined Channels (searchable multi-select with badges, 35 channels formatted "X-Y — name")
   - Incarnation Cross (text input, optional)
   - Clear All + Save Changes buttons

**Credits Success (`/credits/success`)** — Confirmation after Stripe payment. Shows session ID, current balance.

### Dashboard Pages (all require login)

**Overview (`/dashboard`)** — Role-based stats. Admin sees: total quotes, collections, users, public quotes. Regular user sees: my quotes, my collections, my favorites, credits. Plus recent quotes.

**My Quotes (`/dashboard/quotes`)** — CRUD for quotes. Fields: text (required), author (optional), source URL (optional), public/private toggle.

**My Collections (`/dashboard/collections`)** — Create/delete collections. Fields: name (required), description (optional), public toggle.

**Collection Detail (`/dashboard/collections/:id`)** — Edit collection metadata (name, description, public, random order toggles). Add quotes (create new or select existing). Edit/remove quotes from collection. Delete collection.

**Users (`/dashboard/users`)** — Admin only. List of all users with role icons. Currently uses static JSON (DB integration planned).

**Invites (`/dashboard/invites`)** — Admin only. Generate invite codes with expiration (never, 1/7/30 days). Tabs: available vs used invites. Copy code to clipboard, delete unused codes.

---

## 3. Database Schema (Supabase PostgreSQL)

### Tables

**profiles** — `id` (uuid, PK, FK auth.users), `username` (unique), `email`, `role` (default 'registered'), `hd_type`, `hd_profile`, `hd_authority`, `hd_strategy`, `hd_definition`, `hd_not_self_theme`, `hd_incarnation_cross`, `hd_sun_gate`, `hd_earth_gate`, `hd_defined_centers`, `hd_open_centers`, `hd_defined_channels`, `created_at`, `updated_at`. CHECK constraints on all HD enum fields and role.

**quotes** — `id` (uuid, PK), `text`, `author`, `source_url?`, `added_by` (FK profiles), `is_public` (default true), `created_at`. Indexes on `is_public`, `added_by`.

**collections** — `id` (uuid, PK), `name`, `description?`, `owner_id` (FK profiles), `is_public` (default true), `random_order` (default false), `created_at`. Indexes on `is_public`, `owner_id`.

**collection_quotes** — `collection_id` + `quote_id` (composite PK, both FK with CASCADE delete), `added_at`.

**user_favorites** — `user_id` + `quote_id` (composite PK, both FK with CASCADE delete), `created_at`.

**quote_analyses** — `id` (uuid, PK), `quote_id` + `user_id` (both FK with CASCADE), all HD fields as snapshot, `analysis_text`, `is_public` (default false), `created_at`. UNIQUE on (quote_id, user_id, hd_type, hd_profile).

**user_credits** — `user_id` (PK, FK profiles with CASCADE), `balance` (int, default 0, CHECK >= 0), `updated_at`.

**credit_transactions** — `id` (uuid, PK), `user_id` (FK profiles), `amount` (int), `type` ('purchase'|'usage'|'bonus'|'refund'), `description?`, `stripe_session_id?`, `related_analysis_id?` (FK quote_analyses), `receipt_url?`, `created_at`.

**invites** — `id` (uuid, PK), `code` (unique), `created_by` (FK profiles), `used_by?` (FK profiles), `used_at?`, `expires_at?`, `created_at`.

### Database Functions

- **handle_new_user()** — Trigger on auth.users INSERT. Creates profile + user_credits + bonus credit transaction.
- **deduct_credit(user_id, amount, description, analysis_id)** — Atomic credit deduction + transaction record. Returns false if insufficient. SECURITY DEFINER.
- **update_updated_at()** — Trigger to set updated_at = now().

### RLS Summary
- Quotes/Collections: Public ones viewable by all; auth users see all; admins/moderators full CRUD; users own CRUD.
- Favorites/Credits/Transactions: Users see/manage own only.
- Analyses: Users create/view own; public ones viewable by all.
- Invites: Admins manage all; anyone can validate unused codes.

---

## 4. Data Layer (React)

### Query Keys (centralized in `src/lib/queryKeys.ts`)
```
quotes.all, quotes.byId(id), quotes.byUser(userId)
collections.all, collections.byId(id), collections.byUser(userId)
collectionQuotes.byCollection(id)
profiles.all, profiles.byId(id), profiles.byUsername(username)
favorites.byUser(userId)
analyses.all, analyses.byQuote(quoteId), analyses.byUser(userId), analyses.byQuoteAndUser(quoteId, userId)
credits.byUser(userId)
transactions.byUser(userId)
invites.all, invites.byCode(code)
```

### Custom Hooks

**useQuotes()** — CRUD + filtering. Methods: getPublicQuotes, getQuoteById, getQuotesByUser, getQuotesByIds, getRandomPublicQuote, getDailyQuote (date-seeded), getUserById (lazy-loads profiles). Mutations: addQuote, updateQuote, deleteQuote.

**useLists()** — Collection CRUD. Methods: getPublicLists, getListById, getListsByUser. Mutations: addList (with optional quoteIds), updateList, deleteList, addQuoteToList, removeQuoteFromList.

**useFavorites()** — Favorite toggle. Methods: isFavorite(quoteId). Mutations: toggleFavorite (insert or delete).

**useHDAnalysis()** — HD quote interpretation. Checks: hasHDProfile (type + profile set), hasCredits (balance >= 1). Calls n8n webhook with full HD profile + quote. Saves analysis to quote_analyses (upsert). Deducts credit via deduct_credit() RPC. Returns: analyze mutation, useExistingAnalysis(quoteId) query (infinite staleTime).

**useCredits()** — Returns balance (default 0).

**useTransactions()** — Returns last 20 transactions descending.

**useUser(userId)** / **useUserByUsername(username)** — Profile lookup with 5min staleTime.

**useInvites()** — Admin invite management. Methods: getUnusedInvites, getUsedInvites, validateInviteCode, markInviteUsed. Mutations: createInvite (generates 8-char code), deleteInvite.

**useDrawerActions(options)** — Registers contextual drawer actions (share, favorite, decode) via DrawerContext.

### Contexts

**AuthContext** — State: user, session, isLoading. Computed: isAdmin, isModerator, canManageContent. Methods: login, signup, logout.

**DrawerContext** — Manages drawer action callbacks via ref (no re-renders). Methods: setActions, clearActions.

---

## 5. Edge Functions (Stripe Integration)

**create-checkout-session** — POST with Bearer token + `{ priceId }`. Maps priceId to credits (10 or 25). Creates Stripe checkout session with metadata. Returns `{ url }`.

**stripe-webhook** — Handles `checkout.session.completed`. Verifies signature, updates user_credits balance, records transaction with receipt_url.

**Pricing:** 10 credits = 5 EUR (`price_1StmEaEPyTzpZHyfqOp1nU07`), 25 credits = 10 EUR (`price_1StmEoEPyTzpZHyf9ZNx5mIF`)

---

## 6. HD Analysis Flow (n8n Webhook)

1. User opens AnalysisSheet on a quote
2. Hook checks for cached analysis (same quote + user + hd_type + hd_profile)
3. If not cached: calls `n8n.ositaka.com/webhook/analyze-quote` with all HD fields + quote
4. Saves response to quote_analyses with HD snapshot (upsert for idempotence)
5. Deducts 1 credit via deduct_credit() RPC
6. Invalidates analysis + credits queries

**HD fields sent:** hd_type, hd_profile, hd_authority, hd_strategy, hd_definition, hd_not_self_theme, hd_incarnation_cross, hd_sun_gate, hd_earth_gate, hd_defined_centers, hd_open_centers, hd_defined_channels (empty = "Not specified")

---

## 7. Design System

### Colors (HSL CSS Variables)
- **Background:** Warm cream `hsl(35 25% 96%)` / Dark: `hsl(0 15% 12%)`
- **Foreground:** Dark charcoal `hsl(0 15% 20%)` / Dark: cream
- **Primary:** Rich burgundy `hsl(350 65% 45%)` / Dark: brighter `hsl(350 70% 55%)`
- **Accent:** Bright gold `hsl(45 90% 55%)`
- **Card:** White / Dark: `hsl(0 10% 15%)`

### Typography
- **Headings:** Playfair Display (serif, weights 400-700)
- **Body:** Cormorant (serif, weights 300-400)
- **Base size:** 20px

### Key UI Patterns
- Cards: `bg-card/50 border border-border/30 rounded-xl`
- Muted text: `text-muted-foreground` + Cormorant font
- Links: `hover:text-primary hover:underline transition-colors`
- Decorative lines: `h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent`
- Quote display: Large decorative quotation marks (8-9xl, primary/10 opacity), golden shimmer accent line with Sparkles icon

### Animations (Framer Motion + Tailwind)
- Page transitions: 0.3s opacity fade (AnimatePresence)
- Quote changes: 300ms fade + translate-y
- Shimmer: 2s infinite opacity pulse on accent elements
- Carousel: 300ms fade with prefers-reduced-motion respect

### Responsive
- Custom `xs: 480px` breakpoint
- AppDrawer: visible on mobile, hidden lg+
- DashboardLayout sidebar: hidden mobile, visible lg+
- Quote text scales: 3xl → 7xl across breakpoints

### Dark Mode
- Tailwind `darkMode: ["class"]` on `<html>`
- All colors defined as CSS variable pairs

---

## 8. Key Components

**QuoteDisplay** — Blockquote with decorative quotes, golden accent line, author citation, optional source URL link, optional "added by" user link. Responsive text 3xl-7xl.

**QuoteCard** — Home page hero. Daily quote on load, "New Inspiration" button, HD analysis integration, drawer actions.

**QuoteCarousel** — Generic carousel with keyboard nav (arrows, 500ms throttle), counter "X of Y", prev/next buttons. Respects reduced-motion.

**CollectionCard** — Linked card with BookOpen icon, title, description (2-line clamp), metadata (count + owner).

**AnalysisSheet** — Bottom sheet (85vh). Auto-triggers analysis, shows loading spinner, renders markdown-like content (## headers, **bold**, *italic*), error handling, credit display.

**BuyCreditsDialog** — Modal with radio group packages (10/5EUR, 25/10EUR with "Best Value" badge), per-analysis cost, Stripe redirect.

**AppDrawer** — Mobile nav with contextual actions, main nav, dashboard section (conditional), user info + credits.

**DashboardLayout** — Sidebar (lg+) + mobile drawer. Route-based transitions.

**PageHeader** — Back link + icon + title + subtitle.

**StatCard** — Dashboard stat with icon + value + label.

**TransactionHistory** — Table with type badges, amounts (green positive), receipt links, skeleton loading.

### Form Components
- **FormField** — Label + children + description wrapper
- **SelectField** — Label + shadcn Select + description
- **SwitchField** — Label + shadcn Switch + description
- **PasswordInput** — Input with Eye/EyeOff toggle

---

## 9. Auto-fill Logic (HD Profile)

**Type → Strategy mapping:**
- Manifestor → Inform
- Generator → Wait to Respond
- Manifesting Generator → Wait to Respond
- Projector → Wait for Invitation
- Reflector → Wait for Lunar Cycle

**Type → Not-Self Theme mapping:**
- Manifestor → Anger
- Generator → Frustration
- Manifesting Generator → Frustration
- Projector → Bitterness
- Reflector → Disappointment

**Defined Centers → Open Centers:** Auto-derived as inverse (all 9 centers minus defined ones)

---

## 10. Mantra Generator (Upcoming Feature)

### Overview

The Mantra Generator creates **original wisdom born from the user's HD chart**, tailored to a specific life topic. Unlike the Quote Decode (which reflects external quotes through the chart), this generates personalized mantras rooted in the user's unique design mechanics.

**Input:** Life topic + full HD profile
**Output:** 8-12 mantras, each with a 2-3 sentence explanation connecting the mantra to a specific HD mechanic
**Credit cost:** Premium (3-5x decode cost)

### Decode vs Mantra Generator

| | Quote Decode | Mantra Generator |
|---|---|---|
| Input | External quote + HD profile | Life topic + HD profile |
| Output | One reflection (200-300 words) | 8-12 mantras with explanations |
| Source of wisdom | Someone else's quote, filtered through chart | The chart itself |
| Usage pattern | Read once, reflect | Write down, carry daily, revisit for weeks |
| Value to user | Insight | Tool |
| Credit cost | Standard (1) | Premium (3-5x) |
| Content potential | Needs quote library | Infinite — every topic x every profile |

### Topic Categories

Users select from predefined categories:
- Cravings & Habits
- Productivity & Focus
- Relationships & Boundaries
- Creative Blocks
- Money & Resources
- Rest & Recovery
- Decision-Making
- Self-Worth
- Career Transitions
- Solitude & Social Energy

### UX Flow

1. User navigates to Mantra Generator page
2. Selects a topic category
3. System validates HD profile is complete (type + profile minimum)
4. System checks credits (premium cost)
5. Calls n8n webhook with full HD profile + topic + random approach seed
6. Displays 8-12 mantras in a scrollable/carousel view
7. Each mantra shown as: bold quote + explanation paragraph
8. Deducts credits, caches result

### Mantra Format

Each mantra entry consists of:
- **The mantra itself** — One sentence (max two), in first person ("I" or "My"), punchy enough for a sticky note
- **The explanation** — 2-3 sentences connecting the mantra to a specific HD mechanic (gate, channel, center, authority, profile line, or cross theme), written as felt experience not jargon

### Approach Seeds (Variety System)

The system rotates through 8 approach seeds to ensure variety across generations. One seed is selected per generation based on timestamp:

1. **Open centers focus** — Frame mantras around what the user absorbs, how it distorts the topic, and the wisdom developed through openness
2. **Defined channels focus** — Frame around consistent energy and how it applies to the topic
3. **Sun/Earth polarity** — Frame around the tension between conscious identity (Sun) and grounding force (Earth)
4. **Authority & strategy** — Frame as decision-making instructions specific to the topic
5. **Profile lines** — Frame around conscious/unconscious line patterns, strengths, and vulnerabilities
6. **Incarnation cross** — Connect the topic to larger purpose arc
7. **Mixed elements** — Most relevant chart element per mantra, maximizing variety
8. **Not-self theme** — Frame as tools for recognizing and redirecting misalignment

### n8n System Prompt

```
You generate personalized mantras rooted in someone's Human Design chart. Your goal: create practical, specific operating instructions for their life — not generic affirmations with HD terminology sprinkled on top.

## Core Rules

1. Every mantra must be mechanically specific. Reference a concrete element — gate, channel, center, authority, profile line, or incarnation cross theme. If you could swap in a different profile and the mantra still works, you've failed.

2. Each mantra gets a 2-3 sentence explanation connecting the mantra to the specific HD mechanic, written as felt experience not jargon.

3. Generate 8-12 mantras per set. Distribute across different chart elements — don't anchor every mantra to the same gate or channel.

4. The topic shapes the lens, not the content. Every mantra should speak to the topic through the chart.

5. Frame as personal declarations, not advice. Mantras start with "I" or "My" — spoken in the user's voice. Direct. Personal. Uncompromising.

6. Open centers carry both shadow and wisdom. Name the conditioning trap AND the discernment developed.

7. Mantras should be short enough to remember. One sentence, max two. The explanation does the heavy lifting.

## Voice
Direct. Warm. Uncompromising. Operating instructions, not suggestions. No mystical language. No hedging.

## Format
Numbered list. Each entry: mantra in quotes (bolded) + 2-3 sentence explanation beneath. No headers or sections beyond numbering.
```

### User Message Template

```
Generate a personalized mantra set for my Human Design profile.

## Topic
{{ topic }}

## My Design
- Type: {{ hd_type }}
- Profile: {{ hd_profile }}
- Authority: {{ hd_authority }}
- Strategy: {{ hd_strategy }}
- Definition: {{ hd_definition }}
- Not-Self Theme: {{ hd_not_self_theme }}
- Incarnation Cross: {{ hd_incarnation_cross }}
- Sun Gate: {{ hd_sun_gate }}
- Earth Gate: {{ hd_earth_gate }}
- Defined Centers: {{ hd_defined_centers }}
- Open Centers: {{ hd_open_centers }}
- Defined Channels: {{ hd_defined_channels }}

{{ approach_seed }}
```

### Example Mantra (for reference)

For a Manifestor 5/1, Splenic Authority, topic "Cravings & Habits":

> **"My Splenic knowing is instant. If I have to convince myself, the answer is no."**
>
> Your Splenic Authority works in the moment. It's a quiet "yes" or "no" that doesn't need reasoning. When you find yourself building a case — "just this once," "I deserve it" — that's your mind overriding your intuition. The real answer came already. Trust that first knowing.

> **"The void is not a problem to solve. It's where my power returns."**
>
> You have no defined Sacral, no defined Root, no defined Solar Plexus. That openness can feel like emptiness after a long day — a hollow space that sugar, comfort food, or stimulation seems to fill. But that space isn't broken. It's your system clearing other people's energy. The craving is trying to fill a void that was never yours to begin with.

> **"My will is a blade, not a blanket. I use it precisely."**
>
> Channel 21-45 gives you material willpower — the force to command resources and direct outcomes. But the Heart center is a finite fuel tank. Spending willpower fighting cravings all evening depletes what you need for morning creation. Don't fight the craving with will. Remove the trigger. Redirect the energy.

### Data Model (Proposed)

**mantra_sets** table:
- `id` (uuid, PK)
- `user_id` (FK profiles)
- `topic` (text) — selected category
- `approach_seed` (text) — which seed was used
- All HD fields as snapshot (same pattern as quote_analyses)
- `mantras` (jsonb) — array of `{ mantra: string, explanation: string }`
- `credit_cost` (int) — credits charged
- `is_public` (boolean, default false)
- `created_at`
- UNIQUE on (user_id, topic, hd_type, hd_profile) or allow multiple per topic

### Content Machine Potential

One mantra set produces ~15-25 social media assets:
- 8-12 individual mantra cards
- 4-6 carousel posts (mantra + explanation slides)
- 2-3 topic teasers (multiple mantras previewed)
- 1 type comparison post (same topic, different types)

10 topics x 5 types = 50 sets = 750-1250 social assets.

---

---

## 11. NoorUI-RTL Component Mapping

### Available Components (v0.11.0 — 77+ components)

**Coming Soon in noorui-rtl:** Color Picker, Sidebar, App Shell
**Also found in Storybook:** Markdown Editor, Toggle, Toggle Group (not yet on website)
**Existing examples closest to MyMantras:** Banking & Personal Finance (credits/transactions pattern), AI Playground (streaming text + generation), Hotel Booking (carousel + stepper flow)

The package already covers most of what MyMantras needs:

| MyMantras Need | NoorUI-RTL Component | Notes |
|---|---|---|
| Quote blockquote | `Blockquote`, `PullQuote` | May need decorative enhancement (large quotation marks, shimmer line) |
| Quote carousel | `Carousel` | Needs keyboard nav + counter overlay |
| Collection cards | `Card`, `ListingCard` | ListingCard has image + metadata pattern |
| Mantra display | `Blockquote` + `Card` | Combine for mantra + explanation pattern |
| HD Profile form | `Select`, `Checkbox`, `Input`, `Form`, `Label` | All available |
| Multi-select (channels) | `Command` + `Popover` + `Badge` | Composable pattern, same as current |
| Navigation drawer | `Sheet` | Left-side sheet variant |
| Dashboard layout | `DashboardShell` | Built-in sidebar + content layout |
| Stats cards | `StatsCard` | Icon + value + label pattern |
| Transaction history | `Table`, `DataTable` | DataTable has sorting/filtering |
| Dialogs (buy credits) | `Dialog` | Full dialog with header/footer |
| Bottom sheet (analysis) | `Sheet` | Bottom variant |
| Toasts | `Toast`, `Toaster` | Built-in toast system |
| Loading states | `Skeleton`, `LoadingSpinner` | Both available |
| Empty states | `EmptyState` | Built-in empty state component |
| Tabs (invites, collections) | `Tabs` | Full tabs component |
| Auth forms | `Form`, `Input`, `Button`, `Checkbox` | All available |
| Password toggle | `Input` | May need PasswordInput wrapper |
| Badges (role, type) | `Badge`, `UserBadge` | UserBadge has role variants |
| User menu | `UserMenu` | Built-in user dropdown |
| Topic selection (mantras) | `Card` + `RadioGroup` or custom | FeatureCard could work |
| Stepper (mantra generation) | `Stepper` | Step-by-step flow |
| Markdown rendering | `ContentRenderer` | May handle analysis text |
| Callouts/alerts | `Callout`, `Alert` | Info, success, warning, error variants |
| Streaming text (AI) | `StreamingText` | For real-time mantra generation display |
| Thinking indicator | `ThinkingIndicator` | Loading state during AI generation |
| Markdown rendering | `ContentRenderer` | Analysis text with headers/bold/italic |
| Topic selection cards | `FeatureCard` | Visual topic category picker |
| Mantra generation flow | `Stepper` | Multi-step: topic → generating → results |
| User role badges | `UserBadge` | Admin/moderator/user role display |
| Rich text editing | `RichTextEditor`, `Markdown Editor` | Quote text editing in dashboard |
| Notification bell | `NotificationCenter` | Future: notify when generation completes |
| Reaction picker | `ReactionPicker` | Future: react to mantras |
| Timeline | `Timeline` | Transaction history alternative |
| Toggle/Toggle Group | `Toggle`, `ToggleGroup` | Public/private toggle, view mode switch |

### Missing Components — Need to Build

#### 1. AudioPlayer
A music player component for the Void Frequencies pairing feature.

**Subcomponents needed:**
- `AudioPlayer` — Full player with waveform/progress bar, play/pause, volume, current time/duration, track info (title, artist, album art)
- `MiniPlayer` — Minimized sticky bar (bottom of screen) with track info, play/pause, progress. Expandable to full player
- `PlayerControls` — Play, pause, skip prev/next, shuffle, repeat buttons
- `VolumeControl` — Volume slider with mute toggle
- `ProgressBar` — Seekable track progress with time display
- `TrackInfo` — Album art thumbnail + title + artist

**Props pattern:**
```typescript
interface AudioPlayerProps {
  src: string
  title: string
  artist?: string
  albumArt?: string
  autoPlay?: boolean
  onEnded?: () => void
  onNext?: () => void
  onPrevious?: () => void
  variant?: 'full' | 'mini' | 'inline'
}
```

#### 2. Playlist
Display and manage ordered lists of audio/video tracks.

**Subcomponents needed:**
- `Playlist` — Scrollable list of tracks with current-playing indicator
- `PlaylistCard` — Card preview of a playlist (cover art, name, track count, duration)
- `TrackItem` — Single track row: number, art, title, artist, duration, play button, actions menu
- `PlaylistHeader` — Playlist title, description, cover art, play all / shuffle buttons

**Props pattern:**
```typescript
interface Track {
  id: string
  title: string
  artist: string
  src: string
  duration?: number // seconds
  albumArt?: string
}

interface PlaylistProps {
  tracks: Track[]
  currentTrackId?: string
  onTrackSelect: (track: Track) => void
  onTrackReorder?: (tracks: Track[]) => void
  variant?: 'list' | 'grid'
}
```

#### 3. VideoPlayer
Video playback component for content integration.

**Subcomponents needed:**
- `VideoPlayer` — HTML5 video with custom controls overlay, fullscreen, PiP support
- `VideoPlaylist` — List of videos with thumbnails, titles, current-playing state
- `VideoCard` — Preview card with thumbnail, play icon overlay, title, duration badge

**Props pattern:**
```typescript
interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  autoPlay?: boolean
  controls?: boolean
  onEnded?: () => void
}
```

#### 4. MantraCard (MyMantras-specific, optional for noorui-rtl)
A specialized display component for mantra + explanation pairs.

**Structure:**
- Large mantra text in quotes (decorative quotation marks)
- Divider/accent line
- Explanation paragraph
- Optional: HD element tag (e.g., "Splenic Authority", "Channel 21-45")
- Optional: number badge (1 of 12)

Could be built by composing `Blockquote` + `Card` + `Badge` rather than a dedicated component.

#### 5. QuoteDisplay (MyMantras-specific, optional for noorui-rtl)
Enhanced blockquote with:
- Decorative oversized quotation marks
- Golden accent/shimmer line with sparkle icon
- Author citation with tracking
- Optional source link and "added by" credit

Could extend the existing `Blockquote` or `PullQuote` component.

### Summary of New Components to Add to noorui-rtl

| Priority | Component | Reason |
|---|---|---|
| High | `AudioPlayer` (full, mini, inline variants) | Void Frequencies pairing, general media apps |
| High | `Playlist` + `TrackItem` | Track lists for audio content |
| High | `PlaylistCard` | Playlist preview cards |
| Medium | `VideoPlayer` | Video content support |
| Medium | `VideoPlaylist` + `VideoCard` | Video list management |
| Low | `MantraCard` | Could compose from existing components |
| Low | `QuoteDisplay` | Could extend Blockquote/PullQuote |

---

## 12. External Services

- **Supabase:** Auth + PostgreSQL + Edge Functions + Storage
- **Stripe:** Credit purchases (checkout sessions + webhooks)
- **n8n:** HD quote analysis webhook (`n8n.ositaka.com/webhook/analyze-quote`)
- **Resend:** Transactional email (noreply@mymantras.app via Supabase SMTP)
- **ImprovMX:** Email forwarding (hello@mymantras.app → personal)
- **Netlify:** Hosting (mymantras.app)
