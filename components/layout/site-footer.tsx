'use client'

import * as React from 'react'
import Link from 'next/link'
import { Sunrise } from 'lucide-react'
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
      sitemap: 'Sitemap',
      license: 'License',
      community: 'Community',
      github: 'GitHub',
      npmPackage: 'npm Package',
      discord: 'Discord',
      twitter: 'Twitter',
      createdBy: 'Created by',
      website: 'Website',
      blog: 'Blog',
      copyright: '© 2025 Noor UI. Built with Next.js, TypeScript, and Tailwind CSS.',
      trademark: '"Noor UI" is a trademark of Nuno Marques. Code licensed under MIT.',
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
      sitemap: 'خريطة الموقع',
      license: 'الترخيص',
      community: 'المجتمع',
      github: 'GitHub',
      npmPackage: 'حزمة npm',
      discord: 'Discord',
      twitter: 'Twitter',
      createdBy: 'من تطوير',
      website: 'الموقع',
      blog: 'المدونة',
      copyright: '© 2025 Noor UI. بُني باستخدام Next.js وTypeScript وTailwind CSS.',
      trademark: '"Noor UI" علامة تجارية لـ Nuno Marques. الكود مرخص بموجب MIT.',
    },
  }

  const content = footerContent[locale]

  return (
    <footer className="border-t py-12 bg-background">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sunrise className="h-5 w-5 text-primary" />
              <span className="font-bold">Noor UI</span>
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
                  href="/documentation#accessibility"
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
              <li>
                <Link
                  href="/sitemap"
                  className="hover:text-foreground transition-colors"
                >
                  {content.sitemap}
                </Link>
              </li>
              <li>
                <Link
                  href="/license"
                  className="hover:text-foreground transition-colors"
                >
                  {content.license}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{content.community}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="cursor-default">
                  {content.github}
                </span>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/noorui-rtl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {content.npmPackage}
                </a>
              </li>
              <li>
                <span className="cursor-default">
                  {content.discord}
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  {content.twitter}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{content.createdBy}</h4>
            <p className="text-sm font-medium mb-2">Nuno Marques</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://ositaka.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {content.website}
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ositaka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://design-code.tips/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {content.blog}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground">{content.copyright}</div>
          <div className="text-xs text-muted-foreground">{content.trademark}</div>
        </div>
      </div>
    </footer>
  )
}
