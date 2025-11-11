import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { DirectionProvider } from '@/components/providers/direction-provider'
import { DesignSystemProvider } from '@/components/providers/design-system-provider'
import { AuthProvider } from '@/starters/blog-dashboard/hooks/use-auth'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import '@/styles/globals.css'

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

export const metadata: Metadata = {
  title: 'Noor UI Blog - نور مدونة',
  description: 'A bilingual blog dashboard built with Noor UI components and Supabase',
  keywords: ['blog', 'dashboard', 'bilingual', 'RTL', 'Arabic', 'Supabase', 'Next.js', 'Noor UI'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexSansArabic.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <DirectionProvider>
            <DesignSystemProvider>
              <AuthProvider>
                <TooltipProvider>
                  {children}
                  <Toaster />
                </TooltipProvider>
              </AuthProvider>
            </DesignSystemProvider>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
