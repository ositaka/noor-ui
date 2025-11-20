# Migration Guide: Moving Luxury Reseller Platform

This guide helps you move the luxury reseller platform from `/projects/` to its own repository and use the published `noorui-rtl` package.

## Step 1: Create New Repository

```bash
# Navigate to your projects directory
cd ~/Desktop

# Create new directory for the luxury platform
mkdir noorui-luxury-platform
cd noorui-luxury-platform

# Initialize new Next.js 15 project
npx create-next-app@latest . --typescript --tailwind --app

# Answer prompts:
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use `src/` directory? No
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias? No
```

## Step 2: Install Dependencies

```bash
# Install noorui-rtl (your published package!)
npm install noorui-rtl

# Install next-intl for i18n
npm install next-intl

# Install Lenis for smooth scroll
npm install @studio-freight/lenis

# Install other dependencies you need
npm install @supabase/supabase-js  # If using Supabase
```

## Step 3: Copy Your Work

```bash
# From the old project, copy these folders:
# Source: ~/Desktop/claude-code-bidirectional/projects/luxury-reseller-platform/

# Copy app directory (your pages)
cp -r ~/Desktop/claude-code-bidirectional/projects/luxury-reseller-platform/app ./

# Copy i18n directory
cp -r ~/Desktop/claude-code-bidirectional/projects/luxury-reseller-platform/i18n ./

# Copy lib directory (data, utils)
cp -r ~/Desktop/claude-code-bidirectional/projects/luxury-reseller-platform/lib ./

# Copy styles directory
cp -r ~/Desktop/claude-code-bidirectional/projects/luxury-reseller-platform/styles ./

# Copy public directory (images, fonts)
cp -r ~/Desktop/claude-code-bidirectional/projects/luxury-reseller-platform/public ./

# Copy config files
cp ~/Desktop/claude-code-bidirectional/projects/luxury-reseller-platform/next.config.js ./
cp ~/Desktop/claude-code-bidirectional/projects/luxury-reseller-platform/tailwind.config.ts ./
cp ~/Desktop/claude-code-bidirectional/projects/luxury-reseller-platform/tsconfig.json ./
```

## Step 4: Update Imports

Now the exciting part - update all component imports to use the published package!

**Before (local components):**
```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
```

**After (published package):**
```typescript
import { Button, Card, cn } from 'noorui-rtl'
```

### Find and Replace All Imports

Run these commands to update all imports:

```bash
# Update component imports
find app lib -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s|from '@/components/ui/\([^']*\)'|from 'noorui-rtl'|g"

# Update utils imports
find app lib -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s|from '@/lib/utils'|from 'noorui-rtl'|g"

# Update provider imports
find app lib -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s|from '@/components/providers/\([^']*\)'|from 'noorui-rtl'|g"
```

### Manual Updates Needed

Some imports might need manual updates:

1. **Direction Provider:**
```typescript
// Update this
import { useDirection } from '@/components/providers/direction-provider'

// To this
import { useDirection } from 'noorui-rtl'
```

2. **Multiple Component Imports:**
```typescript
// Before
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// After (cleaner!)
import { Button, Card, CardContent, CardHeader, Input } from 'noorui-rtl'
```

## Step 5: Update Tailwind Config

Your `tailwind.config.ts` should point to the noorui-rtl package:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add noorui-rtl components
    './node_modules/noorui-rtl/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Your custom theme
    },
  },
  plugins: [],
}

export default config
```

## Step 6: Setup next-intl

Create `i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['en', 'fa', 'ar'] as const
type Locale = (typeof locales)[number]

// Import your messages
import en from './messages/en.json'
import fa from './messages/fa.json'
import ar from './messages/ar.json'

const messages = { en, fa, ar }

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound()

  return {
    messages: messages[locale as Locale],
    locale,
  }
})

export { locales, type Locale }
```

Update `next.config.js`:

```javascript
const withNextIntl = require('next-intl/plugin')('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your config
}

module.exports = withNextIntl(nextConfig)
```

## Step 7: Test the Application

```bash
# Run the development server
npm run dev

# Open http://localhost:3000
```

**Test that:**
- ✅ All components render correctly from `noorui-rtl`
- ✅ RTL/LTR switching works
- ✅ Locale switching works (en/fa/ar)
- ✅ Smooth scroll (Lenis) works
- ✅ All pages load without errors

## Step 8: Initialize Git

```bash
# Initialize git repository
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOF

# First commit
git add .
git commit -m "Initial commit: Luxury reseller platform using noorui-rtl"

# Create GitHub repo and push
# (Create repo on GitHub first, then:)
git remote add origin https://github.com/ositaka/noorui-luxury-platform.git
git branch -M main
git push -u origin main
```

## Step 9: Clean Up Main Repo

Back in the main `noor-ui` repository:

```bash
cd ~/Desktop/claude-code-bidirectional

# Remove projects folder
git rm -r projects/

# Update .gitignore
echo "projects/" >> .gitignore

# Commit the cleanup
git add .gitignore
git commit -m "chore: remove projects folder - moved to separate repository

The luxury reseller platform has been moved to its own repository
and now uses the published noorui-rtl package.

See: https://github.com/ositaka/noorui-luxury-platform"

# Push to GitHub
git push origin main
```

## Benefits of This Setup

✅ **Clean separation** - Library code vs. application code
✅ **Real-world test** - Actually using the published package
✅ **Independent development** - Can update platform without affecting library
✅ **Better for contributors** - Clear what's library vs. demo
✅ **Can deploy separately** - Platform can go to Vercel/Netlify
✅ **Smaller main repo** - Faster clones, clearer purpose

## Next Steps

1. **Deploy the platform** - Deploy to Vercel or Netlify
2. **Link repos** - Add link in main README to the platform
3. **Create demo video** - Show noorui-rtl in action
4. **Share on social media** - Showcase both the library and the platform

## Troubleshooting

### Import errors
If you see "Module not found" errors:
```bash
# Make sure noorui-rtl is installed
npm install noorui-rtl

# Clear cache and restart
rm -rf .next
npm run dev
```

### Style issues
If styles don't load:
- Check `tailwind.config.ts` includes `node_modules/noorui-rtl/**/*`
- Make sure `styles/globals.css` imports Tailwind CSS

### TypeScript errors
If you see TypeScript errors:
- Run `npm run type-check` to see specific errors
- Make sure all `@/components/ui/*` imports are updated to `noorui-rtl`

---

**Ready to see your published package in action!** 🚀
