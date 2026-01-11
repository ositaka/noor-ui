# Test noorui-rtl Package - Complete Setup Guide

Follow these steps to create a test Next.js app and see your published `noorui-rtl` package in action!

## Step 1: Create Test Directory

```bash
cd ~/Desktop
mkdir test-noorui
cd test-noorui
```

## Step 2: Initialize Next.js App

```bash
# Create Next.js app
npx create-next-app@latest . --typescript --tailwind --app

# Answer the prompts:
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use `src/` directory? No
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias? No
# ✔ Would you like to use React Compiler? No
```

## Step 3: Install noorui-rtl

```bash
npm install noorui-rtl
```

Verify installation:
```bash
npm list noorui-rtl
# Should show: test-noorui@0.1.0
# └── noorui-rtl@0.2.1
```

## Step 4: Open in Claude Code

```bash
# Open the test-noorui folder in Claude Code
code .
# or however you launch Claude Code
```

## Step 5: Tell Claude Code

Once Claude Code opens, say:

> "I've just created this test Next.js app and installed noorui-rtl@0.2.1. Can you help me create a demo page that imports and uses components from the noorui-rtl package? I want to test Button, Card, Input, Badge, and Tabs components with RTL support."

Claude will then:
1. Update `tailwind.config.ts` to include noorui-rtl
2. Add CSS variables to `app/globals.css`
3. Create a demo page in `app/page.tsx`
4. Help you run and test it

## Files Claude Code Will Create/Modify

### 1. `tailwind.config.ts`
Will add noorui-rtl to content array

### 2. `app/globals.css`
Will add CSS variables for components

### 3. `app/page.tsx`
Will create demo page with your components

### 4. Package verification
Will test that imports work correctly

## Expected Result

You should be able to:
- ✅ Import components: `import { Button } from 'noorui-rtl'`
- ✅ See styled components working
- ✅ Test RTL/LTR switching
- ✅ No TypeScript errors
- ✅ Fast build times

## Troubleshooting

If you get stuck before opening Claude Code:

### "npx: command not found"
Install Node.js from nodejs.org

### "npm install fails"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Directory not empty error
```bash
cd ~/Desktop
rm -rf test-noorui
mkdir test-noorui
cd test-noorui
# Try again
```

---

**Next**: Open Claude Code in the `test-noorui` folder and ask for help creating the demo! 🚀

## Alternative: Manual Setup (No Claude Code)

If you want to set it up manually, follow these steps after Step 3:

### Update tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Add this line:
    './node_modules/noorui-rtl/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

### Update app/globals.css
Add this after the Tailwind directives:

```css
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

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

### Create app/page.tsx
```typescript
'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Label,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from 'noorui-rtl'

export default function Home() {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')

  return (
    <div dir={direction} className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">noorui-rtl Test</h1>
            <p className="text-muted-foreground mt-2">
              Testing published package v0.2.1
            </p>
          </div>
          <Button
            onClick={() => setDirection(d => d === 'ltr' ? 'rtl' : 'ltr')}
            variant="outline"
            size="lg"
          >
            {direction === 'ltr' ? '→ RTL' : 'LTR ←'}
          </Button>
        </div>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>✅ Package Loaded Successfully!</CardTitle>
            <CardDescription>
              All components are working from the published noorui-rtl package
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>
              Testing Input, Label, and Button
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
              />
            </div>

            <div className="flex gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Example */}
        <Card>
          <CardHeader>
            <CardTitle>Direction-Aware Tabs</CardTitle>
            <CardDescription>
              Tabs automatically adapt to text direction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Details</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="space-y-2 pt-4">
                <p className="text-sm text-muted-foreground">
                  This tab content flows correctly in both LTR and RTL modes.
                  Try switching the direction to see how the layout adapts!
                </p>
              </TabsContent>
              <TabsContent value="tab2" className="space-y-2 pt-4">
                <p className="text-sm text-muted-foreground">
                  All components use logical properties (margin-inline-start,
                  padding-inline-end, etc.) for proper RTL support.
                </p>
              </TabsContent>
              <TabsContent value="tab3" className="space-y-2 pt-4">
                <p className="text-sm text-muted-foreground">
                  The package includes 74+ components with comprehensive
                  coverage of common UI patterns.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Success Message */}
        <div className="p-6 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-950">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            🎉 Your Package is Working!
          </h3>
          <p className="text-sm text-green-800 dark:text-green-200">
            You're now using components from the published noorui-rtl package
            (v0.2.1). Try switching the direction to see RTL support in action!
          </p>
        </div>
      </div>
    </div>
  )
}
```

### Run the dev server
```bash
npm run dev
```

Open **http://localhost:3000** and enjoy! 🎉
