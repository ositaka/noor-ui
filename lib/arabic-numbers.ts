/**
 * Arabic Number Utilities
 *
 * Utilities for formatting numbers in Arabic contexts, including:
 * - Arabic-Indic numeral conversion (٠١٢٣٤٥٦٧٨٩)
 * - SAR currency formatting
 * - Locale-aware number formatting
 * - Percentage formatting
 */

// ============================================================================
// Constants
// ============================================================================

const WESTERN_NUMERALS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const ARABIC_INDIC_NUMERALS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

// ============================================================================
// Numeral Conversion
// ============================================================================

/**
 * Convert Western numerals (0-9) to Arabic-Indic numerals (٠-٩)
 * @param input - String or number to convert
 * @returns String with Arabic-Indic numerals
 * @example
 * toArabicNumerals(123) // "١٢٣"
 * toArabicNumerals("2025") // "٢٠٢٥"
 */
export function toArabicNumerals(input: string | number): string {
  const str = String(input)
  return str
    .split('')
    .map((char) => {
      const index = WESTERN_NUMERALS.indexOf(char)
      return index !== -1 ? ARABIC_INDIC_NUMERALS[index] : char
    })
    .join('')
}

/**
 * Convert Arabic-Indic numerals (٠-٩) to Western numerals (0-9)
 * @param input - String with Arabic-Indic numerals
 * @returns String with Western numerals
 * @example
 * toWesternNumerals("١٢٣") // "123"
 * toWesternNumerals("٢٠٢٥") // "2025"
 */
export function toWesternNumerals(input: string): string {
  return input
    .split('')
    .map((char) => {
      const index = ARABIC_INDIC_NUMERALS.indexOf(char)
      return index !== -1 ? WESTERN_NUMERALS[index] : char
    })
    .join('')
}

// ============================================================================
// Currency Formatting
// ============================================================================

export interface CurrencyFormatOptions {
  /** Use Arabic-Indic numerals */
  useArabicNumerals?: boolean
  /** Show currency symbol */
  showSymbol?: boolean
  /** Locale for formatting */
  locale?: 'en' | 'ar'
  /** Number of decimal places */
  decimals?: number
}

/**
 * Format a number as SAR (Saudi Riyal) currency
 * @param amount - Amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 * @example
 * formatSAR(1234.56) // "1,234.56 SAR"
 * formatSAR(1234.56, { locale: 'ar', useArabicNumerals: true }) // "١٬٢٣٤٫٥٦ ر.س"
 */
export function formatSAR(amount: number, options: CurrencyFormatOptions = {}): string {
  const {
    useArabicNumerals = false,
    showSymbol = true,
    locale = 'en',
    decimals = 2,
  } = options

  // Format the number with proper thousands separators
  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)

  // Add currency symbol
  let result = formatted
  if (showSymbol) {
    result = locale === 'ar' ? `${formatted} ر.س` : `${formatted} SAR`
  }

  // Convert to Arabic-Indic numerals if requested
  if (useArabicNumerals) {
    result = toArabicNumerals(result)
  }

  return result
}

// ============================================================================
// Number Formatting
// ============================================================================

export interface NumberFormatOptions {
  /** Use Arabic-Indic numerals */
  useArabicNumerals?: boolean
  /** Locale for formatting */
  locale?: 'en' | 'ar'
  /** Number of decimal places */
  decimals?: number
  /** Minimum decimal places */
  minDecimals?: number
  /** Show thousands separator */
  useGrouping?: boolean
}

/**
 * Format a number with locale-specific formatting
 * @param num - Number to format
 * @param options - Formatting options
 * @returns Formatted number string
 * @example
 * formatNumber(1234567.89) // "1,234,567.89"
 * formatNumber(1234567.89, { locale: 'ar', useArabicNumerals: true }) // "١٬٢٣٤٬٥٦٧٫٨٩"
 */
export function formatNumber(num: number, options: NumberFormatOptions = {}): string {
  const {
    useArabicNumerals = false,
    locale = 'en',
    decimals,
    minDecimals = 0,
    useGrouping = true,
  } = options

  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: decimals ?? 20,
    useGrouping,
  }).format(num)

  return useArabicNumerals ? toArabicNumerals(formatted) : formatted
}

// ============================================================================
// Percentage Formatting
// ============================================================================

export interface PercentageFormatOptions {
  /** Use Arabic-Indic numerals */
  useArabicNumerals?: boolean
  /** Locale for formatting */
  locale?: 'en' | 'ar'
  /** Number of decimal places */
  decimals?: number
}

/**
 * Format a number as a percentage
 * @param num - Number to format (0.15 = 15%)
 * @param options - Formatting options
 * @returns Formatted percentage string
 * @example
 * formatPercentage(0.156) // "15.6%"
 * formatPercentage(0.156, { locale: 'ar', useArabicNumerals: true }) // "٪١٥٫٦"
 */
export function formatPercentage(num: number, options: PercentageFormatOptions = {}): string {
  const { useArabicNumerals = false, locale = 'en', decimals = 1 } = options

  const percentage = num * 100
  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(percentage)

  const result = locale === 'ar' ? `٪${formatted}` : `${formatted}%`

  return useArabicNumerals ? toArabicNumerals(result) : result
}

// ============================================================================
// Compact Number Formatting
// ============================================================================

export interface CompactNumberFormatOptions {
  /** Use Arabic-Indic numerals */
  useArabicNumerals?: boolean
  /** Locale for formatting */
  locale?: 'en' | 'ar'
  /** Notation type */
  notation?: 'standard' | 'compact'
}

/**
 * Format large numbers in compact form (1K, 1M, etc.)
 * @param num - Number to format
 * @param options - Formatting options
 * @returns Formatted compact number string
 * @example
 * formatCompactNumber(1234567) // "1.2M"
 * formatCompactNumber(1234567, { locale: 'ar', useArabicNumerals: true }) // "١٫٢ مليون"
 */
export function formatCompactNumber(num: number, options: CompactNumberFormatOptions = {}): string {
  const { useArabicNumerals = false, locale = 'en', notation = 'compact' } = options

  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    notation,
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(num)

  return useArabicNumerals ? toArabicNumerals(formatted) : formatted
}

// ============================================================================
// Ordinal Formatting
// ============================================================================

/**
 * Format a number as an ordinal (1st, 2nd, 3rd, etc.)
 * Note: Arabic ordinals are complex and context-dependent, so this provides basic support
 * @param num - Number to format
 * @param locale - Locale for formatting
 * @returns Formatted ordinal string
 * @example
 * formatOrdinal(1) // "1st"
 * formatOrdinal(2) // "2nd"
 * formatOrdinal(3, 'ar') // "الثالث"
 */
export function formatOrdinal(num: number, locale: 'en' | 'ar' = 'en'): string {
  if (locale === 'ar') {
    // Basic Arabic ordinals (masculine form)
    const arabicOrdinals: { [key: number]: string } = {
      1: 'الأول',
      2: 'الثاني',
      3: 'الثالث',
      4: 'الرابع',
      5: 'الخامس',
      6: 'السادس',
      7: 'السابع',
      8: 'الثامن',
      9: 'التاسع',
      10: 'العاشر',
    }
    return arabicOrdinals[num] || `${toArabicNumerals(num)}`
  }

  // English ordinals
  const suffix = ['th', 'st', 'nd', 'rd']
  const value = num % 100
  return num + (suffix[(value - 20) % 10] || suffix[value] || suffix[0])
}
