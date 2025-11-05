import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ClientProviders } from '@/components/providers/client-providers'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'RTL-First Design System',
  description: 'A comprehensive, modern design system with full bilingual support for Arabic and English',
  keywords: ['design system', 'RTL', 'Arabic', 'components', 'accessibility', 'React', 'Next.js'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
