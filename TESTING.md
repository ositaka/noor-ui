# Testing Guide

## What's New

This update implements a complete theme system with URL persistence and visual differentiation between themes.

### New Features

1. **Global Theme Switcher Button** - Floating button in bottom-right corner (all pages)
2. **URL-Based Theme Persistence** - Themes sync via URL query parameters
3. **Actual Visual Changes** - Each theme now has distinct spacing, typography, and feel
4. **Client-Side Only Rendering** - Proper handling of SSR/client hydration

## How to Test

### 1. Theme Switcher

**Location**: Bottom-right corner of every page (floating button)

**Actions**:
- Click the palette icon to open theme picker
- Select different themes
- Notice the URL updates with `?theme=cozy` (or minimal/futuristic/artistic)
- Close and reopen - theme should persist

**Expected**:
- Smooth transitions between themes
- URL parameter updates immediately
- Theme persists across page navigation
- No page reload required

### 2. Theme Visual Differences

Navigate to any page (homepage recommended) and try each theme:

#### Minimal Theme
```
?theme=minimal
```
- **Typography**: Tight letter-spacing (-0.02em), font-weight 600
- **Spacing**: Clean, controlled spacing
- **Feel**: Professional, focused
- **Colors**: Neutral grays, subtle borders

#### Futuristic Theme
```
?theme=futuristic
```
- **Typography**: Compact line-height (1.5), tight letter-spacing (-0.025em)
- **Spacing**: Tighter, more compact
- **Feel**: Modern, enterprise
- **Colors**: Dark mode optimized, purples and cyans
- **Font-weight**: 600 for headings

#### Cozy Theme
```
?theme=cozy
```
- **Typography**: Relaxed line-height (1.7), letter-spacing (0.015em)
- **Spacing**: **MUCH more spacious** - containers have 3rem padding, paragraphs have 1.25rem margin-bottom
- **Feel**: Warm, comfortable, personal
- **Colors**: Warm oranges and ambers
- **Border-radius**: 1.25rem (very rounded)
- **Buttons**: Larger padding (0.75rem top/bottom, 1.5rem left/right)
- **Cards**: 2rem padding (very spacious)

#### Artistic Theme
```
?theme=artistic
```
- **Typography**: **Serif fonts** (Georgia, Noto Naskh Arabic for RTL)
- **Line-height**: 1.8 body, 1.9 paragraphs
- **Spacing**: Generous paragraph margins (1.5rem)
- **Feel**: Elegant, typography-focused
- **Font-weight**: 400 (lighter, more elegant)
- **Letter-spacing**: 0.02em for headings

### 3. Spacing Changes (Cozy Theme)

To really see the spacing difference:

1. Start on homepage with **Minimal** theme
2. Notice button sizes, card padding, heading margins
3. Switch to **Cozy** theme
4. You should see:
   - Buttons become taller and wider
   - Cards have much more internal padding
   - Headings have more space below them
   - Overall "breathing room" increases dramatically
   - Line-height makes text more readable

### 4. Typography Changes (Artistic Theme)

1. Start on any page
2. Switch to **Artistic** theme
3. You should see:
   - **Font family changes to Georgia** (serif)
   - Headings become lighter weight (400 instead of 600)
   - More elegant, book-like appearance
   - Better for longer reading

### 5. URL Persistence

**Test**:
1. Go to homepage: `/`
2. Open theme switcher, select "Cozy"
3. URL becomes: `/?theme=cozy`
4. Navigate to components: `/components?theme=cozy` (should preserve theme)
5. Copy URL and open in new tab - theme should be applied
6. Refresh page - theme persists

### 6. RTL with Themes

**Test**:
1. Select a theme (e.g., Cozy)
2. Click "العربية" button to switch to RTL
3. Font should change to IBM Plex Sans Arabic
4. For Artistic theme in RTL, font should be Noto Naskh Arabic (serif)
5. Spacing and typography rules should still apply

### 7. Light/Dark Mode with Themes

**Test**:
1. Select Cozy theme
2. Toggle light/dark mode
3. Colors should change, but spacing/typography remains
4. Each theme has light and dark color variants

## Expected Visual Differences Summary

| Theme | Font | Line Height | Letter Spacing | Feel |
|-------|------|-------------|----------------|------|
| **Minimal** | Inter | 1.6 | -0.02em (headings) | Clean, professional |
| **Futuristic** | Inter | 1.5 | -0.025em (headings) | Compact, modern |
| **Cozy** | Inter | **1.7** | **0.015em** | **Spacious, warm** |
| **Artistic** | **Georgia** | **1.8-1.9** | 0.01-0.02em | Elegant, readable |

## Known Issues / Limitations

1. **Puppeteer**: Could not install due to network restrictions - manual testing required
2. **Font Warning**: ESLint warns about fonts in `<head>` - this is intentional for now
3. **Static Generation**: Some pages use client-side features (theme switcher) so they're partially client-rendered

## Build Status

```
✅ npm run build - SUCCESS
✅ TypeScript compilation - PASS
✅ ESLint validation - PASS (1 font warning - safe to ignore)
✅ All 7 pages generate successfully
```

## Files Changed

- `components/providers/design-system-provider.tsx` (NEW) - Theme context with URL sync
- `components/providers/client-providers.tsx` (NEW) - Wrapper for all client providers
- `components/docs/global-theme-switcher.tsx` (NEW) - Floating theme switcher UI
- `app/layout.tsx` - Updated to use ClientProviders
- `styles/globals.css` - Added extensive theme-specific typography and spacing rules

## Developer Notes

### Theme CSS Structure

Themes are applied via classes on `<html>` element:
- `.theme-minimal`
- `.theme-futuristic`
- `.theme-cozy`
- `.theme-artistic`

Each theme has:
1. CSS custom properties for colors (defined earlier)
2. Typography rules (`line-height`, `letter-spacing`, `font-weight`)
3. Spacing rules (container padding, margins, etc.)
4. Font family overrides (Artistic uses serif)

### URL Parameter Format

```
?theme=minimal|futuristic|cozy|artistic
```

Theme is stored in:
1. URL query parameter (for sharing)
2. localStorage (for persistence across sessions)
3. React context (for reactivity)

### Adding New Themes

1. Add to `lib/tokens.ts` - `Theme` type and `themeConfig`
2. Add CSS in `styles/globals.css`:
   ```css
   .theme-yourtheme {
     /* CSS custom properties */
     /* Typography rules */
     /* Spacing rules */
   }
   ```
3. Theme will automatically appear in switcher

## Questions?

If themes aren't visually distinct enough, or if Cozy theme isn't spacious enough, let me know and I can adjust the CSS values!
