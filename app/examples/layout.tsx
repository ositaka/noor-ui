import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Examples - Noor UI',
    template: '%s - Noor UI',
  },
  description:
    'Real-world examples and demos showcasing RTL-first components in action. Explore dashboards, forms, data tables, and more with full bilingual support for English and Arabic.',
  keywords: [
    'RTL examples',
    'Arabic dashboard',
    'bilingual forms',
    'Islamic finance dashboard',
    'GCC dashboard',
    'RTL data tables',
    'Arabic UI examples',
    'bidirectional examples',
    'React examples',
    'design system demos',
    'Noor UI',
    'MENA',
  ],
  openGraph: {
    title: 'Examples - Noor UI',
    description:
      'Real-world examples showcasing RTL-first components with full bilingual support.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Examples - Noor UI',
    description:
      'Real-world examples of RTL-first components with bilingual support.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
