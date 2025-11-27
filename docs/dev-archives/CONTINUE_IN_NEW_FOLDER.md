# Continue Testing in New Folder

## Quick Steps

1. **Create and setup the test folder:**
   ```bash
   cd ~/Desktop
   mkdir test-noorui
   cd test-noorui
   npx create-next-app@latest . --typescript --tailwind --app
   npm install noorui-rtl
   ```

2. **Open Claude Code in the new folder:**
   ```bash
   code .  # or however you open Claude Code
   ```

3. **Say this to Claude Code:**
   > "Hi! I just set up this Next.js app and installed noorui-rtl@0.2.1. I have the TEST_NOORUI_SETUP.md guide from the main repo. Can you help me create the demo page following that guide? I want to test the Button, Card, Input, Badge, and Tabs components with RTL support."

Claude Code will then:
- ✅ Read the TEST_NOORUI_SETUP.md file
- ✅ Update tailwind.config.ts
- ✅ Update app/globals.css with CSS variables
- ✅ Create the demo page in app/page.tsx
- ✅ Help you run and test it

## What You'll Have

A working demo showing:
- ✅ Components imported from published package
- ✅ RTL/LTR direction switching
- ✅ Form components (Input, Label, Button)
- ✅ Layout components (Card, Badge)
- ✅ Navigation (Tabs)
- ✅ All styled and working!

## Files to Reference

Located in the main noor-ui repo:
- `TEST_NOORUI_SETUP.md` - Complete setup guide with all code
- `QUICK_START_TEST.md` - Alternative quick start
- `MIGRATION_GUIDE.md` - For moving luxury platform later

## If You Prefer Manual Setup

Just follow **TEST_NOORUI_SETUP.md** - it has all the code you need to copy/paste!

---

**Ready?** Create the folder and open Claude Code there! 🚀

## Command Summary

```bash
# Setup
cd ~/Desktop && mkdir test-noorui && cd test-noorui
npx create-next-app@latest . --typescript --tailwind --app
npm install noorui-rtl

# Verify
npm list noorui-rtl  # Should show 0.2.1

# Open in Claude Code
code .

# Or do it manually following TEST_NOORUI_SETUP.md
```
