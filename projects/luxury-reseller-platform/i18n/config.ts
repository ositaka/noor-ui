import en from './messages/en.json'
import fa from './messages/fa.json'
import ar from './messages/ar.json'

export const locales = ['en', 'fa', 'ar'] as const
export type Locale = (typeof locales)[number]

export const messages = {
  en,
  fa,
  ar,
}
