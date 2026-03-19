import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges class names correctly', () => {
    const result = cn('px-2', 'py-1')
    expect(result).toBe('px-2 py-1')
  })

  it('handles conditional class names', () => {
    const isActive = true
    const result = cn('px-2', isActive && 'text-blue-600')
    expect(result).toContain('px-2')
    expect(result).toContain('text-blue-600')
  })

  it('merges tailwind classes correctly', () => {
    // px-2 takes precedence over px-4
    const result = cn('px-4 py-2', 'px-2')
    expect(result).toContain('px-2')
    expect(result).not.toContain('px-4')
  })

  it('removes falsy values', () => {
    const result = cn('px-2', false && 'py-1', null, undefined, 'text-sm')
    expect(result).toBe('px-2 text-sm')
  })

  it('handles array of classes', () => {
    const result = cn(['px-2', 'py-1'], 'text-sm')
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
    expect(result).toContain('text-sm')
  })
})
