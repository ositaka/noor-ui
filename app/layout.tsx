import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans_Arabic, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ClientProviders } from '@/components/providers/client-providers'
import '@/styles/globals.css'

// Font configurations with Next.js optimization
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://noorui.com'),
  title: 'Noor UI - نور',
  description: 'Beautiful RTL-first React components for bilingual applications. 74+ components, 4 themes, full Arabic support.',
  keywords: ['design system', 'RTL', 'Arabic', 'components', 'accessibility', 'React', 'Next.js', 'Noor UI', 'bilingual', 'MENA', 'React components', 'UI library'],
  authors: [{ name: 'Nuno Marques', url: 'https://ositaka.com' }],
  creator: 'Nuno Marques',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    url: 'https://noorui.com',
    title: 'Noor UI - Beautiful RTL-first React Components',
    description: 'Beautiful RTL-first React components for bilingual applications. 74+ components, 4 themes, full Arabic support.',
    siteName: 'Noor UI',
    images: [
      {
        url: '/noorui--og-image--bilingual.png',
        width: 1200,
        height: 630,
        alt: 'Noor UI - Beautiful RTL-first React components for bilingual applications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noor UI - Beautiful RTL-first React Components',
    description: 'Beautiful RTL-first React components for bilingual applications. 74+ components, 4 themes, full Arabic support.',
    images: ['/noorui--og-image--bilingual.png'],
    creator: '@ositaka',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexSansArabic.variable} ${jetBrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ClientProviders>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
            >
              Skip to main content
            </a>
            {children}
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
