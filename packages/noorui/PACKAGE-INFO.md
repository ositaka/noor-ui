# Noor UI Package Information

## Package Stats

- **Name**: noorui-rtl
- **Version**: 0.1.2
- **Package Size**: 4.3 kB
- **Unpacked Size**: 12.5 kB
- **Total Files**: 7

## What Gets Published

When you run `npm publish`, users will receive:

```
noorui-rtl-0.1.2.tgz
├── LICENSE (1.1 kB)
├── README.md (2.3 kB)
├── package.json (2.5 kB)
└── dist/
    ├── index.js (3.0 kB) - CommonJS
    ├── index.mjs (1.3 kB) - ESM
    ├── index.d.ts (1.2 kB) - TypeScript declarations
    └── index.d.mts (1.2 kB) - TypeScript ESM declarations
```

## What's NOT Published

Thanks to `.npmignore`, these files stay in your repo:
- `src/` - Source TypeScript files
- `tsconfig.json` - Build configuration
- `node_modules/` - Dependencies
- `*.tsbuildinfo` - TypeScript cache
- Development files

## Installation

Once published, users can install with:

```bash
npm install noorui-rtl
```

Or with specific version:

```bash
npm install noorui-rtl@0.1.2
```

## Import Methods

### ESM (Modern)
```typescript
import { NoorProvider, version } from 'noorui-rtl';
```

### CommonJS (Legacy)
```javascript
const { NoorProvider, version } = require('noorui-rtl');
```

### TypeScript
Full TypeScript support with auto-complete and type checking:
```typescript
import { NoorProvider } from 'noorui-rtl';

// Types are automatically available
const provider: typeof NoorProvider = NoorProvider;
```

## Package Dependencies

### Peer Dependencies (Required by Users)
- `react` ^18.0.0
- `react-dom` ^18.0.0

### Bundled Dependencies
All Radix UI primitives and utilities are included:
- @radix-ui/react-* (all primitives)
- class-variance-authority
- clsx
- lucide-react
- tailwind-merge

## Build Commands

```bash
# Development build (watch mode)
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Lint
npm run lint
```

## Quality Checks

✅ TypeScript compilation: No errors
✅ Build output: Clean, no warnings
✅ Package size: Small and efficient (4.3 kB)
✅ Exports: Properly configured
✅ Type definitions: Generated correctly
✅ License: MIT included
✅ Documentation: README included

## npm Package Page

After publishing, your package will be available at:
https://www.npmjs.com/package/noorui-rtl

The page will show:
- Package description
- Installation instructions
- README content
- Version history
- Weekly downloads
- Dependencies
- Repository link
- Homepage link

## Verification Commands

Before publishing, verify everything:

```bash
# Check what will be published
npm pack --dry-run

# Create actual tarball for testing
npm pack

# Install locally in test project
npm install ./noorui-rtl-0.1.2.tgz

# Verify package info
npm view noorui-rtl  # After publishing
```

## Publishing Checklist

- [ ] Version updated in package.json
- [ ] Build completed successfully (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] README is complete
- [ ] LICENSE file present
- [ ] Logged into npm (`npm login`)
- [ ] Ready to publish (`npm publish --access public`)

## Post-Publish

After successful publish:

1. Package appears on npm: https://www.npmjs.com/package/noorui-rtl
2. Can be installed: `npm install noorui-rtl`
3. Create git tag: `git tag -a v0.1.2 -m "Release v0.1.2"`
4. Push tag: `git push origin v0.1.2`
5. Create GitHub release (optional)
6. Announce on social media (optional)

## Future Versions

To publish updates:

```bash
# Update version (choose one)
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.0 -> 0.2.0
npm version major  # 0.1.0 -> 1.0.0

# Build
npm run build

# Publish
npm publish
```

## Support

- Documentation: https://noorui.com
- Issues: https://github.com/ositaka/noor-ui/issues
- npm: https://www.npmjs.com/package/noorui-rtl
