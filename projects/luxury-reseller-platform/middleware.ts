import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n/request'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Automatically detect user's locale
  localeDetection: true,
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fa|ar|en)/:path*'],
}
