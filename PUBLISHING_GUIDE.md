# NPM Publishing Guide for Noor UI

This guide walks you through publishing Noor UI to npm as `noorui-rtl`.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup) if you don't have one
2. **Organization**: Create the `@ositaka` organization on npm (or use your existing one)
3. **Authentication**: Log in via CLI:
   ```bash
   npm login
   ```

## Pre-Publishing Checklist

Before publishing, verify everything is ready:

### 1. Version Check

Ensure `package.json` has the correct version:
```json
{
  "version": "0.2.0"
}
```

For subsequent releases, update the version:
```bash
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.0 -> 0.2.0
npm version major  # 0.1.0 -> 1.0.0
npm version prerelease --preid=beta  # 0.2.0 -> 0.1.0-beta.2
```

### 2. Build and Test

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run all checks
npm run check:all

# Run tests
npm test
```

All checks must pass before publishing.

### 3. Verify Package Contents

See what will be published:
```bash
npm pack --dry-run
```

Expected output:
- Package size: ~250 kB
- Unpacked size: ~1.1 MB
- Files: ~115 files
- Should include:
  - `components/ui/*` - All UI components
  - `components/providers/*` - Context providers
  - `components/index.ts` - Barrel export
  - `lib/utils.ts`, `lib/tokens.ts`, `lib/arabic-numbers.ts`
  - `lib/i18n/*` - Internationalization content
  - `hooks/*` - Custom hooks
  - `styles/*` - Global styles
  - `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE`

Should NOT include:
- `app/*` - Documentation site
- `components/docs/*` - Documentation components
- `components/layout/*` - Layout components
- `public/*` - Static assets
- Build artifacts (`.next/*`)

### 4. Test Local Installation

Create a test tarball and install it locally:

```bash
# Create tarball
npm pack

# In a test project directory
npm install /path/to/ositaka-noorui-0.2.0.tgz

# Test importing components
# In your test project:
# import { Button, Card } from 'noorui-rtl'
```

## Publishing

### First-Time Setup

1. **Log in to npm:**
   ```bash
   npm login
   ```

2. **Verify authentication:**
   ```bash
   npm whoami
   ```

3. **Check organization access:**
   ```bash
   npm org ls @ositaka
   ```

### Publishing Beta Version

For the initial beta release:

```bash
# Publish with beta tag
npm publish --access public --tag beta
```

Flags explained:
- `--access public`: Required for scoped packages to be publicly accessible
- `--tag beta`: Tags the release as "beta" instead of "latest"

Users install beta with:
```bash
npm install noorui-rtl@beta
```

### Publishing Stable Version

When ready for stable release:

```bash
# Update version to remove beta
npm version 0.1.0

# Publish with latest tag (default)
npm publish --access public
```

Users install with:
```bash
npm install noorui-rtl
```

### Publishing Updates

For subsequent beta releases:
```bash
# Increment beta version
npm version prerelease --preid=beta  # 0.2.0 -> 0.1.0-beta.2

# Publish
npm publish --access public --tag beta
```

For stable updates:
```bash
# Increment version
npm version patch  # Bug fixes: 0.1.0 -> 0.1.1
npm version minor  # New features: 0.1.0 -> 0.2.0
npm version major  # Breaking changes: 0.1.0 -> 1.0.0

# Publish
npm publish --access public
```

## Post-Publishing

### 1. Verify on npm

Check the package page:
- https://www.npmjs.com/package/noorui-rtl

Verify:
- ✅ Version number is correct
- ✅ README displays properly
- ✅ Files list shows expected files
- ✅ Dependencies are correct

### 2. Test Installation

In a fresh project:
```bash
npm install noorui-rtl@beta
```

Test imports:
```typescript
import { Button, Card, Input } from 'noorui-rtl'
import { cn } from 'noorui-rtl'
```

### 3. Git Tag

Create a git tag for the release:
```bash
# Tag the release
git tag -a v0.2.0 -m "Release v0.2.0"

# Push tag to remote
git push origin v0.2.0
```

### 4. Update Documentation

- Update README with installation instructions
- Add release notes to CHANGELOG.md
- Create GitHub release with notes

### 5. Announce

Share the release:
- Twitter/X announcement
- LinkedIn post
- Dev.to or Medium article
- Update project website
- Share in relevant communities (Reddit, Discord, etc.)

## Version Strategy

### Beta Phase (0.1.0-beta.x)
- Test with real-world usage
- Gather feedback
- API may change based on feedback
- Published with `@beta` tag

### Release Candidate (0.1.0-rc.x)
- API is stable
- Final testing phase
- Bug fixes only
- Published with `@rc` tag

### Stable Release (0.1.0)
- Production-ready
- Semantic versioning
- Published with `@latest` tag (default)

### Semantic Versioning

- **Patch (0.1.X)**: Bug fixes, no API changes
- **Minor (0.X.0)**: New features, backward compatible
- **Major (X.0.0)**: Breaking changes

## Troubleshooting

### Error: 403 Forbidden

**Cause**: Not logged in or no access to organization

**Solution**:
```bash
npm login
npm org ls @ositaka
```

### Error: Package already published

**Cause**: Version number already exists

**Solution**:
```bash
npm version patch  # Or appropriate increment
npm publish --access public
```

### Error: Package name too similar

**Cause**: Package name too similar to existing package

**Solution**: Choose a different package name in `package.json`

### Files Missing After Installation

**Cause**: Files not included in `package.json` "files" array or blocked by `.npmignore`

**Solution**:
1. Check `package.json` "files" array
2. Check `.npmignore` isn't blocking needed files
3. Run `npm pack --dry-run` to verify

## Unpublishing (Emergency Only)

**Warning**: Only use in emergencies (security issues, critical bugs). npm has strict unpublish policies.

```bash
# Unpublish specific version (within 72 hours)
npm unpublish noorui-rtl@0.2.0

# Deprecate instead (preferred)
npm deprecate noorui-rtl@0.2.0 "Critical bug, use 0.1.0-beta.2 instead"
```

## Support and Resources

- **npm Documentation**: https://docs.npmjs.com/
- **Semantic Versioning**: https://semver.org/
- **Package Naming**: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name
- **Scoped Packages**: https://docs.npmjs.com/cli/v10/using-npm/scope

## Quick Reference

```bash
# Pre-publish checks
npm run check:all
npm pack --dry-run

# Version management
npm version prerelease --preid=beta  # Beta increment
npm version patch                    # 0.1.0 -> 0.1.1
npm version minor                    # 0.1.0 -> 0.2.0
npm version major                    # 0.1.0 -> 1.0.0

# Publishing
npm publish --access public --tag beta    # Beta release
npm publish --access public               # Stable release

# Post-publish
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin v0.2.0

# Management
npm deprecate noorui-rtl@0.1.0 "Use 0.2.0 instead"
npm unpublish noorui-rtl@0.1.0  # Emergency only
```

---

**Ready to publish?** Follow the checklist above, and you'll have Noor UI live on npm in minutes! 🚀
