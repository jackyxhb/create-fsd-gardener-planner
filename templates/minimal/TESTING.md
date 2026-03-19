# Testing Guide

This project uses **Vitest** for unit testing, with **React Testing Library** for component tests.

## Quick Start

### Run tests

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

## Project Structure

- **Unit tests**: Colocated with source files (e.g., `Button.test.tsx` next to `Button.tsx`)
- **Setup**: `src/test-setup.ts` - Global test configuration
- **Config**: `vitest.config.ts` - Vitest configuration

## Writing Tests

### Component Test Example

```tsx
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders and handles clicks', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

### Unit Test Example

```ts
import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })
})
```

## Best Practices

- **Colocate tests** with source files for easier maintenance
- **Test behavior, not implementation** - focus on what users see/interact with
- **Use semantic queries** - prefer `getByRole`, `getByLabelText` over `getByTestId`
- **Mock sparingly** - only mock external dependencies and API calls
- **Keep tests focused** - each test should verify one thing

## Useful Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library Docs](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
