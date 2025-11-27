# Website & README Updates Needed

After publishing noorui-rtl to npm, these updates are needed:

## 🔴 Critical Updates

### 1. Replace README.md

**Current**: README shows how to run the documentation site locally
**Needed**: README should show how to **install and use the npm package**

**Action**:
```bash
# Backup current README
mv README.md README_DOCS_SITE.md

# Use the npm-focused README
mv README_NPM.md README.md

# Commit
git add README.md README_DOCS_SITE.md
git commit -m "docs: update README for npm package usage"
```

The new README includes:
- ✅ npm installation instructions
- ✅ Quick start guide
- ✅ Tailwind config setup
- ✅ CSS variables setup
- ✅ Usage examples
- ✅ Component list
- ✅ RTL examples
- ✅ Links to noorui.com docs

### 2. Update Homepage (app/page.tsx)

Add installation instructions prominently:

```tsx
<section className="installation">
  <h2>Installation</h2>
  <CodeBlock language="bash">
    npm install noorui-rtl
  </CodeBlock>

  <CodeBlock language="tsx">
    import { Button, Card } from 'noorui-rtl'
  </CodeBlock>
</section>
```

### 3. Update Getting Started Page

**File**: `app/(docs)/getting-started/page.tsx`

Should include:
- npm installation: `npm install noorui-rtl`
- Tailwind config setup
- CSS variables setup
- First component example
- Link to full setup guide

### 4. Add "Installation" Section to Docs

Create a dedicated installation guide at:
**File**: `app/(docs)/documentation/installation/page.tsx`

Should cover:
- Prerequisites (Node.js, React, Next.js)
- npm installation
- Tailwind CSS configuration
- CSS variables setup
- TypeScript configuration
- First example
- Troubleshooting

## 🟡 Important Updates

### 5. Update Package Info Display

Add package stats/info somewhere visible:

```tsx
<div className="package-info">
  <Badge>v0.2.2</Badge>
  <Badge>64 Components</Badge>
  <Badge>MIT License</Badge>
  <a href="https://www.npmjs.com/package/noorui-rtl">
    <Badge>npm →</Badge>
  </a>
</div>
```

### 6. Update Component Pages

Each component page should show imports from the package:

**Before**:
```tsx
import { Button } from '@/components/ui/button'
```

**After**:
```tsx
import { Button } from 'noorui-rtl'
```

### 7. Add npm Badge to Header

In `components/layout/site-header.tsx`:

```tsx
<a href="https://www.npmjs.com/package/noorui-rtl">
  <Badge variant="outline">
    npm: noorui-rtl
  </Badge>
</a>
```

### 8. Update Footer Links

Add npm package link in footer:

```tsx
<a href="https://www.npmjs.com/package/noorui-rtl">
  npm Package
</a>
```

## 🟢 Nice-to-Have Updates

### 9. Add Installation Command to Multiple Places

Show the install command prominently:
- Homepage hero section
- Getting started page
- Component overview page
- Examples page

### 10. Create "Quick Start" Video/GIF

Show:
1. `npm install noorui-rtl`
2. Import a component
3. Use it in app
4. Show it running

### 11. Add Package Stats Widget

Consider adding:
- Weekly downloads count
- Current version
- License
- Bundle size

Could use https://badgen.net/ or https://shields.io/

Example:
```markdown
![npm](https://img.shields.io/npm/v/noorui-rtl)
![downloads](https://img.shields.io/npm/dw/noorui-rtl)
![license](https://img.shields.io/npm/l/noorui-rtl)
```

### 12. Update Social Preview Image

Update og:image to show:
- Package name: noorui-rtl
- npm install command
- Version number
- Key features

## 📋 Update Checklist

- [ ] Replace README.md with npm-focused version
- [ ] Update homepage with installation instructions
- [ ] Update getting started guide
- [ ] Create dedicated installation page
- [ ] Update all code examples to show `noorui-rtl` imports
- [ ] Add npm badge to header
- [ ] Add npm link to footer
- [ ] Update meta tags (title, description, og:tags)
- [ ] Add package stats/badges
- [ ] Test all links work
- [ ] Deploy updated site

## 🎯 Priority Order

1. **High Priority** (Do First):
   - Replace README.md
   - Update homepage installation section
   - Update getting started page

2. **Medium Priority** (Do Soon):
   - Create installation guide page
   - Update code examples
   - Add npm badges/links

3. **Low Priority** (Nice to Have):
   - Package stats widgets
   - Quick start video
   - Social preview updates

## 🚀 After Updates

Once the website is updated:
1. Deploy to production
2. Share on social media
3. Update GitHub repository description
4. Add topics/tags to GitHub repo
5. Submit to component directories (React, Next.js, etc.)

---

**Current Status**: Package published to npm as `noorui-rtl@0.2.2`
**Next Step**: Update website/README to reflect npm package availability
