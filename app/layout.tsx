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
  title: 'Noor UI - نور',
  description: 'A comprehensive, modern design system with full bilingual support for Arabic and English. Bringing light to multilingual interface design.',
  keywords: ['design system', 'RTL', 'Arabic', 'components', 'accessibility', 'React', 'Next.js', 'Noor UI', 'bilingual', 'MENA'],
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
