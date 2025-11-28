'use client'

import { useState, useEffect } from 'react'

interface UseRelativeTimeOptions {
  updateInterval?: number // Milliseconds, default: 60000 (1 minute)
  format?: 'short' | 'long' // Default: long
}

const translations = {
  en: {
    justNow: 'just now',
    minuteAgo: '1 minute ago',
    minutesAgo: (n: number) => `${n} minutes ago`,
    hourAgo: '1 hour ago',
    hoursAgo: (n: number) => `${n} hours ago`,
    dayAgo: '1 day ago',
    daysAgo: (n: number) => `${n} days ago`,
    weekAgo: '1 week ago',
    weeksAgo: (n: number) => `${n} weeks ago`,
    monthAgo: '1 month ago',
    monthsAgo: (n: number) => `${n} months ago`,
    yearAgo: '1 year ago',
    yearsAgo: (n: number) => `${n} years ago`,
  },
  ar: {
    justNow: 'الآن',
    minuteAgo: 'منذ دقيقة',
    minutesAgo: (n: number) => `منذ ${n} دقائق`,
    hourAgo: 'منذ ساعة',
    hoursAgo: (n: number) => `منذ ${n} ساعات`,
    dayAgo: 'منذ يوم',
    daysAgo: (n: number) => `منذ ${n} أيام`,
    weekAgo: 'منذ أسبوع',
    weeksAgo: (n: number) => `منذ ${n} أسابيع`,
    monthAgo: 'منذ شهر',
    monthsAgo: (n: number) => `منذ ${n} أشهر`,
    yearAgo: 'منذ سنة',
    yearsAgo: (n: number) => `منذ ${n} سنوات`,
  },
  fr: {
    justNow: 'à l\'instant',
    minuteAgo: 'il y a 1 minute',
    minutesAgo: (n: number) => `il y a ${n} minutes`,
    hourAgo: 'il y a 1 heure',
    hoursAgo: (n: number) => `il y a ${n} heures`,
    dayAgo: 'il y a 1 jour',
    daysAgo: (n: number) => `il y a ${n} jours`,
    weekAgo: 'il y a 1 semaine',
    weeksAgo: (n: number) => `il y a ${n} semaines`,
    monthAgo: 'il y a 1 mois',
    monthsAgo: (n: number) => `il y a ${n} mois`,
    yearAgo: 'il y a 1 an',
    yearsAgo: (n: number) => `il y a ${n} ans`,
  },
  ur: {
    justNow: 'ابھی',
    minuteAgo: '1 منٹ پہلے',
    minutesAgo: (n: number) => `${n} منٹ پہلے`,
    hourAgo: '1 گھنٹہ پہلے',
    hoursAgo: (n: number) => `${n} گھنٹے پہلے`,
    dayAgo: '1 دن پہلے',
    daysAgo: (n: number) => `${n} دن پہلے`,
    weekAgo: '1 ہفتہ پہلے',
    weeksAgo: (n: number) => `${n} ہفتے پہلے`,
    monthAgo: '1 مہینہ پہلے',
    monthsAgo: (n: number) => `${n} مہینے پہلے`,
    yearAgo: '1 سال پہلے',
    yearsAgo: (n: number) => `${n} سال پہلے`,
  },
}

type Locale = keyof typeof translations

/**
 * Hook to format dates as relative time strings ("2 hours ago")
 * with auto-updates and localization support
 *
 * @param date - The date to format
 * @param locale - The locale to use (en, ar, fr, ur)
 * @param options - Configuration options
 * @returns Formatted relative time string
 *
 * @example
 * const timeAgo = useRelativeTime(comment.createdAt, 'en')
 * // Returns: "2 hours ago"
 */
export function useRelativeTime(
  date: Date | string,
  locale: string = 'en',
  options: UseRelativeTimeOptions = {}
): string {
  const { updateInterval = 60000, format = 'long' } = options

  // Parse date
  const targetDate = typeof date === 'string' ? new Date(date) : date

  // Get locale translations
  const t = translations[locale as Locale] || translations.en

  // Calculate relative time
  const getRelativeTime = (): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

    // Just now (< 1 minute)
    if (diffInSeconds < 60) {
      return t.justNow
    }

    // Minutes
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      if (diffInMinutes === 1) return t.minuteAgo
      return t.minutesAgo(diffInMinutes)
    }

    // Hours
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      if (diffInHours === 1) return t.hourAgo
      return t.hoursAgo(diffInHours)
    }

    // Days
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      if (diffInDays === 1) return t.dayAgo
      return t.daysAgo(diffInDays)
    }

    // Weeks
    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) {
      if (diffInWeeks === 1) return t.weekAgo
      return t.weeksAgo(diffInWeeks)
    }

    // Months
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
      if (diffInMonths === 1) return t.monthAgo
      return t.monthsAgo(diffInMonths)
    }

    // Years
    const diffInYears = Math.floor(diffInMonths / 12)
    if (diffInYears === 1) return t.yearAgo
    return t.yearsAgo(diffInYears)
  }

  // State for relative time string
  const [relativeTime, setRelativeTime] = useState(getRelativeTime())

  // Update relative time periodically
  useEffect(() => {
    // Update immediately
    setRelativeTime(getRelativeTime())

    // Set up interval
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime())
    }, updateInterval)

    // Cleanup
    return () => clearInterval(interval)
  }, [date, locale, updateInterval])

  return relativeTime
}
