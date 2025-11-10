import { describe, it, expect } from 'vitest'
import { cn, isRTL, getDirectionalValue, truncate, generateId } from '@/lib/utils'

describe('Utils', () => {
  describe('cn()', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })

    it('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
      expect(result).toContain('base-class')
      expect(result).toContain('conditional-class')
      expect(result).not.toContain('hidden-class')
    })
  })

  describe('truncate()', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated'
      const result = truncate(longText, 20)
      expect(result).toBe('This is a very long ...')
      expect(result.length).toBe(23) // 20 + '...'
    })

    it('should not truncate short text', () => {
      const shortText = 'Short text'
      const result = truncate(shortText, 20)
      expect(result).toBe(shortText)
    })

    it('should handle empty string', () => {
      const result = truncate('', 10)
      expect(result).toBe('')
    })
  })

  describe('generateId()', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('should use custom prefix', () => {
      const id = generateId('test')
      expect(id).toMatch(/^test-/)
    })

    it('should generate ID with default prefix', () => {
      const id = generateId()
      expect(id).toMatch(/^id-/)
    })
  })

  describe('getDirectionalValue()', () => {
    it('should return LTR value when direction is LTR', () => {
      // Note: This test depends on document.documentElement.dir
      // In test environment, it defaults to 'ltr'
      const result = getDirectionalValue('left', 'right')
      expect(result).toBe('left')
    })
  })
})
