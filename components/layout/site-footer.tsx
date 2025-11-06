'use client'

import * as React from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'

export function SiteFooter() {
  const { locale } = useDirection()

  const footerContent = {
    en: {
      tagline: 'Built for the GCC market with love.',
      documentation: 'Documentation',
      gettingStarted: 'Getting Started',
      components: 'Components',
      designTokens: 'Design Tokens',
      themes: 'Themes',
      resources: 'Resources',
      examples: 'Examples',
      accessibility: 'Accessibility',
      rtlGuide: 'RTL Guide',
      community: 'Community',
      github: 'GitHub',
      discord: 'Discord',
      twitter: 'Twitter',
      copyright: '© 2024 RTL Design System. Built with Next.js, TypeScript, and Tailwind CSS.',
    },
    ar: {
      tagline: 'مصمم لسوق الخليج بكل حب.',
      documentation: 'التوثيق',
      gettingStarted: 'البداية',
      components: 'المكونات',
      designTokens: 'رموز التصميم',
      themes: 'السمات',
      resources: 'الموارد',
      examples: 'الأمثلة',
      accessibility: 'إمكانية الوصول',
      rtlGuide: 'دليل RTL',
      community: 'المجتمع',
      github: 'GitHub',
      discord: 'Discord',
      twitter: 'Twitter',
      copyright: '© 2024 نظام تصميم RTL. بُني باستخدام Next.js وTypeScript وTailwind CSS.',
    },
  }

  const content = footerContent[locale]

  return (
    <footer className="border-t py-12 bg-background">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-bold">RTL Design</span>
            </div>
            <p className="text-sm text-muted-foreground">{content.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{content.documentation}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/getting-started"
                  className="hover:text-foreground transition-colors"
                >
                  {content.gettingStarted}
                </Link>
              </li>
              <li>
                <Link
                  href="/components"
                  className="hover:text-foreground transition-colors"
                >
                  {content.components}
                </Link>
              </li>
              <li>
                <Link href="/tokens" className="hover:text-foreground transition-colors">
                  {content.designTokens}
                </Link>
              </li>
              <li>
                <Link href="/themes" className="hover:text-foreground transition-colors">
                  {content.themes}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{content.resources}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/examples"
                  className="hover:text-foreground transition-colors"
                >
                  {content.examples}
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="hover:text-foreground transition-colors"
                >
                  {content.accessibility}
                </Link>
              </li>
              <li>
                <Link
                  href="/rtl-guide"
                  className="hover:text-foreground transition-colors"
                >
                  {content.rtlGuide}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{content.community}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/github" className="hover:text-foreground transition-colors">
                  {content.github}
                </Link>
              </li>
              <li>
                <Link href="/discord" className="hover:text-foreground transition-colors">
                  {content.discord}
                </Link>
              </li>
              <li>
                <Link href="/twitter" className="hover:text-foreground transition-colors">
                  {content.twitter}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">{content.copyright}</div>
      </div>
    </footer>
  )
}
