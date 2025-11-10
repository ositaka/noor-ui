# Testing Guide

This project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/react) for unit and component testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Test Structure

```
__tests__/
├── lib/                    # Unit tests for utility functions
│   ├── utils.test.ts      # Tests for lib/utils.ts
│   └── arabic-numbers.test.ts  # Tests for Arabic number formatting
├── components/             # Component tests
│   ├── button.test.tsx    # Button component tests
│   └── card.test.tsx      # Card component tests
└── README.md              # This file
```

## Writing Tests

### Unit Tests (Utilities)

```typescript
import { describe, it, expect } from 'vitest'
import { yourFunction } from '@/lib/utils'

describe('yourFunction', () => {
  it('should do something', () => {
    const result = yourFunction('input')
    expect(result).toBe('expected')
  })
})
```

### Component Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { YourComponent } from '@/components/ui/your-component'

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent>Test</YourComponent>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<YourComponent onClick={handleClick}>Click me</YourComponent>)
    await user.click(screen.getByText('Click me'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Test Coverage

Run `npm run test:coverage` to generate a coverage report. The report will be available in the `coverage/` directory.

## Best Practices

1. **Test behavior, not implementation** - Focus on what the component does, not how it does it
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText`, `getByText` over `getByTestId`
3. **Test accessibility** - Ensure components are accessible (proper ARIA labels, keyboard navigation)
4. **Keep tests simple** - Each test should test one thing
5. **Use descriptive test names** - Test names should describe what is being tested
6. **Mock external dependencies** - Use `vi.mock()` to mock modules and dependencies

## CI/CD Integration

Tests run automatically in the CI/CD pipeline on every push and pull request. See `.github/workflows/ci.yml` for details.

## Test Configuration

- **Config file**: `vitest.config.ts`
- **Setup file**: `vitest.setup.ts`
- **Environment**: jsdom (browser environment simulation)
- **Coverage provider**: v8

## Current Test Coverage

- **44 tests passing** ✅
- **Components tested**: Button, Card
- **Utilities tested**: cn, truncate, generateId, Arabic number formatting
- **Coverage**: Run `npm run test:coverage` for details

## Adding New Tests

1. Create a test file next to the file you're testing (or in `__tests__/` directory)
2. Import necessary testing utilities
3. Write tests using `describe` and `it` blocks
4. Run tests to ensure they pass
5. Commit tests with your code changes
