import { describe, it, expect } from 'vitest'
import {
  toArabicNumerals,
  toWesternNumerals,
  formatSAR,
  formatNumber,
  formatPercentage,
} from '@/lib/arabic-numbers'

describe('Arabic Numbers', () => {
  describe('toArabicNumerals()', () => {
    it('should convert western numerals to Arabic-Indic numerals', () => {
      expect(toArabicNumerals('0123456789')).toBe('٠١٢٣٤٥٦٧٨٩')
    })

    it('should preserve non-numeric characters', () => {
      expect(toArabicNumerals('Price: 123')).toBe('Price: ١٢٣')
    })

    it('should handle decimal numbers', () => {
      expect(toArabicNumerals('12.34')).toBe('١٢.٣٤')
    })

    it('should handle empty string', () => {
      expect(toArabicNumerals('')).toBe('')
    })
  })

  describe('toWesternNumerals()', () => {
    it('should convert Arabic-Indic numerals to western numerals', () => {
      expect(toWesternNumerals('٠١٢٣٤٥٦٧٨٩')).toBe('0123456789')
    })

    it('should preserve non-numeric characters', () => {
      expect(toWesternNumerals('السعر: ١٢٣')).toBe('السعر: 123')
    })

    it('should handle mixed content', () => {
      expect(toWesternNumerals('Test ١٢٣ more')).toBe('Test 123 more')
    })
  })

  describe('formatSAR()', () => {
    it('should format currency with default options', () => {
      const result = formatSAR(1234.56)
      expect(result).toContain('1,234.56')
      expect(result).toContain('SAR')
    })

    it('should format currency with Arabic numerals', () => {
      const result = formatSAR(1234.56, { useArabicNumerals: true })
      expect(result).toContain('١')
      expect(result).toContain('٢')
      expect(result).toContain('٣')
      expect(result).toContain('٤')
    })

    it('should format currency with Arabic locale', () => {
      const result = formatSAR(1234.56, { locale: 'ar' })
      expect(result).toContain('ر.س')
    })

    it('should handle zero', () => {
      const result = formatSAR(0)
      expect(result).toContain('0')
    })

    it('should handle negative numbers', () => {
      const result = formatSAR(-1234.56)
      expect(result).toContain('1,234.56')
      expect(result).toMatch(/-/)
    })
  })

  describe('formatNumber()', () => {
    it('should format number with thousands separator', () => {
      const result = formatNumber(123456)
      expect(result).toBe('123,456')
    })

    it('should format with Arabic numerals', () => {
      const result = formatNumber(123456, { useArabicNumerals: true })
      expect(result).toContain('١')
      expect(result).toContain('٢')
      expect(result).toContain('٣')
    })

    it('should handle decimals', () => {
      const result = formatNumber(123.456, { decimals: 2 })
      expect(result).toBe('123.46')
    })

    it('should round to specified decimals', () => {
      const result = formatNumber(123.456789, { decimals: 2 })
      expect(result).toBe('123.46')
    })
  })

  describe('formatPercentage()', () => {
    it('should format percentage', () => {
      const result = formatPercentage(0.1234)
      expect(result).toContain('12')
      expect(result).toContain('%')
    })

    it('should format with Arabic numerals', () => {
      const result = formatPercentage(0.1234, { useArabicNumerals: true })
      expect(result).toContain('١')
      expect(result).toContain('٢')
      expect(result).toMatch(/%|٪/)
    })

    it('should handle whole numbers', () => {
      const result = formatPercentage(0.5)
      expect(result).toContain('50')
      expect(result).toContain('%')
    })

    it('should handle custom decimals', () => {
      const result = formatPercentage(0.123456, { decimals: 1 })
      expect(result).toContain('12')
      expect(result).toContain('%')
    })
  })
})
