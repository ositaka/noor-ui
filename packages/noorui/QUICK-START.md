# Quick Start Guide

## 🚀 Publishing to npm (First Time)

```bash
# 1. Navigate to package directory
cd packages/noorui

# 2. Login to npm (one time)
npm login

# 3. Build the package
npm run build

# 4. Publish to npm
npm publish --access public
```

## ✅ Done!

Your package is now live at: https://www.npmjs.com/package/noorui-rtl

## 📦 Users Can Now Install

```bash
npm install noorui-rtl
```

## 🔄 Publishing Updates

```bash
# Update version
npm version patch  # Bug fixes: 0.1.0 -> 0.1.1
npm version minor  # New features: 0.1.0 -> 0.2.0
npm version major  # Breaking changes: 0.1.0 -> 1.0.0

# Build & publish
npm run build
npm publish
```

## 🧪 Test Before Publishing

```bash
# See what will be published
npm pack --dry-run

# Create test package
npm pack

# Install in test project
npm install /path/to/noorui-rtl-0.1.2.tgz
```

## 📝 Current Package Info

- **Name**: noorui-rtl
- **Version**: 0.1.2
- **Size**: 4.3 kB
- **Files**: 7 (LICENSE, README, package.json, dist/*)
- **License**: MIT

## 🛠️ Development Commands

```bash
npm run dev         # Watch mode
npm run build       # Production build
npm run type-check  # TypeScript validation
```

## 📚 More Info

- Full guide: `PUBLISHING.md`
- Package details: `PACKAGE-INFO.md`
- Main README: `README.md`
