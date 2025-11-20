import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, messages, type Locale } from './config'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound()

  return {
    messages: messages[locale as Locale],
  }
})

export { locales, type Locale }
