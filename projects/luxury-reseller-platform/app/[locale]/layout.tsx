import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { LenisProvider } from '@/components/providers/lenis-provider'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Luxury Reseller Platform',
  description: 'Premium products from Dubai to Iran',
}

const locales = ['en', 'fa', 'ar']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale)) {
    notFound()
  }

  // Get messages for the current locale
  const messages = await getMessages()

  // Determine text direction
  const direction = locale === 'fa' || locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="font-body antialiased">
        <LenisProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </LenisProvider>
      </body>
    </html>
  )
}
