# Quick Start: Test noorui-rtl Package

Want to see your published package in action? Here's a 5-minute test!

## Option 1: Quick Test in a New Next.js App (Recommended)

```bash
# Create a test directory
cd ~/Desktop
mkdir test-noorui && cd test-noorui

# Create a new Next.js app
npx create-next-app@latest . --typescript --tailwind --app

# Install noorui-rtl (your published package!)
npm install noorui-rtl

# Start the dev server
npm run dev
```

Now create a test page:

**app/page.tsx:**
```typescript
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Label } from 'noorui-rtl'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Testing noorui-rtl! 🎉</CardTitle>
          <CardDescription>
            Your published package is working!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>

          <Button className="w-full">
            Submit
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
```

**Update tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Add noorui-rtl components
    './node_modules/noorui-rtl/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

**Add CSS variables to app/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
}
```

Visit **http://localhost:3000** and see your components! 🎉

## Option 2: Test with RTL Support

Create a more advanced test with RTL/LTR switching:

**app/page.tsx:**
```typescript
'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from 'noorui-rtl'

export default function Home() {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')

  return (
    <div dir={direction} className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">noorui-rtl Demo</h1>
          <Button
            onClick={() => setDirection(d => d === 'ltr' ? 'rtl' : 'ltr')}
            variant="outline"
          >
            Switch to {direction === 'ltr' ? 'RTL (العربية)' : 'LTR (English)'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {direction === 'ltr' ? 'Components Working!' : 'المكونات تعمل!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>

            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">
                  {direction === 'ltr' ? 'Tab 1' : 'تبويب 1'}
                </TabsTrigger>
                <TabsTrigger value="tab2">
                  {direction === 'ltr' ? 'Tab 2' : 'تبويب 2'}
                </TabsTrigger>
                <TabsTrigger value="tab3">
                  {direction === 'ltr' ? 'Tab 3' : 'تبويب 3'}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4">
                {direction === 'ltr'
                  ? 'Notice how the tabs flow correctly in both directions!'
                  : 'لاحظ كيف تتدفق التبويبات بشكل صحيح في كلا الاتجاهين!'}
              </TabsContent>
              <TabsContent value="tab2" className="p-4">
                {direction === 'ltr'
                  ? 'RTL support is built-in!'
                  : 'دعم RTL مدمج!'}
              </TabsContent>
              <TabsContent value="tab3" className="p-4">
                {direction === 'ltr'
                  ? 'All components use logical properties!'
                  : 'جميع المكونات تستخدم الخصائص المنطقية!'}
              </TabsContent>
            </Tabs>

            <div className="flex gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

## Option 3: Test Luxury Platform Migration

Follow the **MIGRATION_GUIDE.md** to move your luxury reseller platform and see it working with the published package!

## What to Test

✅ **Component imports** - All components import from `noorui-rtl`
✅ **RTL support** - Direction changes work correctly
✅ **Styling** - Components look correct
✅ **TypeScript** - No type errors
✅ **Tree shaking** - Only imported components are bundled

## Expected Results

You should see:
- ✅ Beautiful, working components
- ✅ RTL/LTR switching works perfectly
- ✅ No console errors
- ✅ TypeScript autocomplete works
- ✅ Fast build times

## Troubleshooting

### Components not styled
Make sure you:
1. Added `node_modules/noorui-rtl/**/*` to Tailwind content
2. Added CSS variables to globals.css

### Import errors
```bash
# Reinstall the package
npm install noorui-rtl@latest

# Clear cache
rm -rf .next node_modules/.cache
npm run dev
```

### TypeScript errors
Make sure your `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true
  }
}
```

---

**Enjoy your published package!** 🚀

Share your results:
- Twitter: "Just published noorui-rtl - RTL-first React components! 🎉"
- GitHub: Star the repo at github.com/ositaka/noor-ui
- npm: npmjs.com/package/noorui-rtl
