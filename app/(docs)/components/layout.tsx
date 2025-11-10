import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Components - Noor UI',
    template: '%s - Noor UI',
  },
  description:
    'Browse our comprehensive collection of accessible, RTL-first components built with React, TypeScript, and Tailwind CSS. Featuring bilingual support for English and Arabic with proper bidirectional text handling.',
  keywords: [
    'RTL components',
    'Arabic UI components',
    'bilingual components',
    'React components',
    'TypeScript',
    'Tailwind CSS',
    'accessibility',
    'design system',
    'UI library',
    'bidirectional text',
    'right-to-left',
    'Islamic design',
    'GCC region',
    'Noor UI',
    'MENA',
  ],
  openGraph: {
    title: 'Components - Noor UI',
    description:
      'Explore accessible, RTL-first UI components with full bilingual support for modern web applications.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Components - Noor UI',
    description:
      'Accessible, RTL-first UI components with full bilingual support.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
