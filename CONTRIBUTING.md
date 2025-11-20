# Contributing to Noor UI

Thank you for considering contributing to Noor UI! This document outlines how you can help improve this RTL-first component library.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Component Guidelines](#component-guidelines)
- [RTL Guidelines](#rtl-guidelines)
- [Submitting Changes](#submitting-changes)
- [Style Guide](#style-guide)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots or code samples** if applicable
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear use case** for the feature
- **Proposed API or implementation** if possible
- **Examples** from other libraries (if relevant)
- **RTL considerations** for the feature

### Contributing Code

1. **Fork the repository** and create a branch from `main`
2. **Make your changes** following the style guide
3. **Add tests** for new functionality
4. **Update documentation** as needed
5. **Ensure all tests pass** and there are no linting errors
6. **Submit a pull request** with a clear description

## Development Setup

### Prerequisites

- Node.js 20+
- npm or yarn
- Git

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/noor-ui.git
cd noor-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server (documentation site)
- `npm run build` - Build for production (includes checks)
- `npm run build:skip-checks` - Build without running checks
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run check:translations` - Verify translation completeness
- `npm run check:links` - Check for broken links
- `npm run check:all` - Run all checks
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

## Component Guidelines

### Component Structure

Each component should:

1. **Use TypeScript** with proper type definitions
2. **Export interface** for props
3. **Use forwardRef** for ref forwarding
4. **Include displayName** for debugging
5. **Support className** for customization
6. **Use Radix UI** primitives when applicable

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'special'
  // Other props
}

export const Component = React.forwardRef<
  HTMLDivElement,
  ComponentProps
>(({ variant = 'default', className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'base-styles',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
})

Component.displayName = 'Component'
```

### Accessibility Requirements

All components must:

- Use semantic HTML elements
- Include proper ARIA labels and roles
- Support keyboard navigation
- Maintain focus management
- Provide sufficient color contrast (WCAG AA)
- Respect `prefers-reduced-motion`

### Testing

Components should include:

- Unit tests for core functionality
- Accessibility tests (keyboard navigation, ARIA)
- RTL/LTR rendering tests
- Theme variation tests

## RTL Guidelines

### Critical Rules

1. **Use logical properties only**
   - `ms-*` not `ml-*` (margin-inline-start)
   - `me-*` not `mr-*` (margin-inline-end)
   - `ps-*` not `pl-*` (padding-inline-start)
   - `pe-*` not `pr-*` (padding-inline-end)

2. **No hardcoded directional values**
   - ❌ `left-0`, `right-4`, `float-left`
   - ✅ `start-0`, `end-4`, `float-start`

3. **Test in both directions**
   - Always verify components work in both LTR and RTL
   - Check icon positions and text alignment
   - Verify keyboard navigation (Tab order)

4. **Use direction context**
   ```tsx
   import { useDirection } from '@/components/providers/direction-provider'

   const { direction, locale } = useDirection()
   ```

### Common RTL Patterns

**Icons with text:**
```tsx
<Button>
  <Icon className="me-2 h-4 w-4" />
  Text
</Button>
```

**Flexbox alignment:**
```tsx
<div className="flex items-center justify-start">
  {/* Content flows correctly in both directions */}
</div>
```

**Conditional rendering:**
```tsx
const { direction } = useDirection()
const ArrowIcon = direction === 'rtl' ? ArrowRight : ArrowLeft
```

## Submitting Changes

### Pull Request Process

1. **Update documentation** for any changed functionality
2. **Add tests** for new features or bug fixes
3. **Follow the style guide** (ESLint rules)
4. **Ensure all checks pass**:
   - `npm run type-check`
   - `npm run lint`
   - `npm run check:all`
   - `npm test`
5. **Write clear commit messages** (see below)
6. **Reference related issues** in PR description

### Commit Message Format

Use conventional commits:

```
type(scope): brief description

Longer description if needed

Fixes #123
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or tooling changes

**Examples:**
```
feat(button): add loading state with spinner

fix(tabs): correct RTL keyboard navigation direction

docs(readme): update installation instructions

test(calendar): add Hijri date conversion tests
```

### Review Process

1. At least one maintainer must review the PR
2. All CI checks must pass
3. Documentation must be updated
4. Breaking changes require discussion

## Style Guide

### TypeScript

- Use strict mode
- Prefer interfaces over types for props
- Export all public types
- Avoid `any` - use `unknown` if needed

### React

- Use functional components
- Use hooks for state management
- Prefer composition over inheritance
- Extract complex logic into custom hooks

### CSS/Tailwind

- Use Tailwind utility classes
- Use `cn()` utility for conditional classes
- Follow mobile-first approach
- Use design tokens from theme

### File Naming

- Components: `kebab-case.tsx`
- Types: `kebab-case.ts`
- Utilities: `kebab-case.ts`
- Tests: `component.test.tsx`

### Code Organization

```
components/
  ui/
    component-name.tsx        # Component implementation
  docs/
    component-name-docs.tsx   # Documentation component
lib/
  utils.ts                    # Utility functions
  tokens.ts                   # Design tokens
hooks/
  use-custom-hook.ts          # Custom hooks
```

## Questions?

- 💬 Open an issue for questions
- 📧 Email: info@ositaka.com
- 🐛 Report bugs via GitHub issues

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Noor UI! 🌟
