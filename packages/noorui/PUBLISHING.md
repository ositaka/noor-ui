# Publishing Guide for noorui-rtl

This guide covers how to publish the `noorui-rtl` package to npm.

## Prerequisites

1. **npm account**: You need an npm account. Sign up at https://www.npmjs.com/signup
2. **npm login**: Login to npm in your terminal:
   ```bash
   npm login
   ```
3. **Package name availability**: The name `noorui-rtl` is available on npm

## Pre-publish Checklist

Before publishing, ensure:

- [ ] All tests pass
- [ ] Build succeeds without errors
- [ ] README.md is complete and accurate
- [ ] LICENSE file is present
- [ ] Version number is correct in package.json
- [ ] Dependencies are correctly listed
- [ ] .npmignore excludes development files

## Publishing Steps

### 1. Build the Package

```bash
cd packages/noorui
npm run build
```

This will create the `dist/` folder with:
- `index.js` (CommonJS)
- `index.mjs` (ESM)
- `index.d.ts` (TypeScript declarations)

### 2. Test Locally (Optional but Recommended)

You can test the package locally before publishing:

```bash
# In the noorui package directory
npm pack
```

This creates a `.tgz` file that you can install in a test project:

```bash
# In your test project
npm install /path/to/noorui-rtl-0.4.7.tgz
```

### 3. Publish to npm

#### First Time Publishing (Public Package)

```bash
npm publish --access public
```

#### Subsequent Updates

```bash
# Update version first
npm version patch  # for bug fixes (0.1.0 -> 0.1.1)
npm version minor  # for new features (0.1.0 -> 0.2.0)
npm version major  # for breaking changes (0.1.0 -> 1.0.0)

# Then publish
npm publish
```

## Version Management

We follow [Semantic Versioning](https://semver.org/):

- **PATCH** (0.1.x): Bug fixes, no API changes
- **MINOR** (0.x.0): New features, backward compatible
- **MAJOR** (x.0.0): Breaking changes

## Package Structure

The published package includes:

```
noorui-rtl/
├── dist/
│   ├── index.js      # CommonJS build
│   ├── index.mjs     # ESM build
│   ├── index.d.ts    # TypeScript declarations
│   └── index.d.mts   # TypeScript ESM declarations
├── README.md
└── LICENSE
```

## After Publishing

1. **Verify on npm**: Visit https://www.npmjs.com/package/noorui-rtl
2. **Test installation**:
   ```bash
   npm install noorui-rtl
   ```
3. **Update documentation**: Update the main project README if needed
4. **Tag the release**: Create a git tag for the version
   ```bash
   git tag -a v0.4.7 -m "Release version 0.4.7"
   git push origin v0.4.7
   ```

## Common Issues

### Package name already taken

The package name `noorui-rtl` is available and ready to use. When publishing scoped packages, always use:
```bash
npm publish --access public
```

### Authentication errors

```bash
npm login
npm whoami  # Verify you're logged in
```

### Permission denied

Make sure you own the package name or are added as a maintainer:
```bash
npm owner add username noorui-rtl
```

## Automation (Future)

Consider setting up:
- **GitHub Actions**: Automated publishing on git tags
- **Changesets**: Better version management
- **Semantic Release**: Automated versioning based on commits

## Support

- Documentation: https://noorui.com
- Storybook: https://storybook.noorui.com
- npm documentation: https://docs.npmjs.com/
- Issues: https://github.com/ositaka/noor-ui/issues
