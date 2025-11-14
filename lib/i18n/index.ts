/**
 * Internationalization content
 * Main entry point - imports and combines all language sections
 */

export type { Locale } from './types'
export { en } from './en'
export { ar } from './ar'

import { en } from './en'
import { ar } from './ar'

export const content = {
  en,
  ar,
}
