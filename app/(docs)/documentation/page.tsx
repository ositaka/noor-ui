'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, Code2, Palette, Globe2, Accessibility, type LucideIcon } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

interface DocumentationSection {
  icon: LucideIcon
  id?: string
  titleKey: string
  descriptionKey: string
  links: Array<{ titleKey: string; href: string }>
}

export default function DocumentationPage() {
  const { locale } = useDirection()
  const t = content[locale].documentationPages

  const docSections: DocumentationSection[] = [
    {
      icon: Book,
      titleKey: 'gettingStarted',
      descriptionKey: 'gettingStarted',
      links: [
        { titleKey: 'installation', href: '/documentation/installation' },
        { titleKey: 'quickStart', href: '/documentation/quick-start' },
        { titleKey: 'configuration', href: '/documentation/configuration' },
      ],
    },
    {
      icon: Code2,
      titleKey: 'components',
      descriptionKey: 'components',
      links: [
        { titleKey: 'library', href: '/components' },
        { titleKey: 'props', href: '/documentation/props' },
        { titleKey: 'examples', href: '/documentation/examples' },
      ],
    },
    {
      icon: Palette,
      titleKey: 'designTokens',
      descriptionKey: 'designTokens',
      links: [
        { titleKey: 'colors', href: '/tokens#colors' },
        { titleKey: 'typography', href: '/tokens#typography' },
        { titleKey: 'spacing', href: '/tokens#spacing' },
      ],
    },
    {
      icon: Globe2,
      titleKey: 'rtlSupport',
      descriptionKey: 'rtlSupport',
      links: [
        { titleKey: 'guidelines', href: '/documentation/rtl' },
        { titleKey: 'bidi', href: '/documentation/bidi' },
        { titleKey: 'arabic', href: '/documentation/arabic' },
      ],
    },
    {
      icon: Accessibility,
      id: 'accessibility',
      titleKey: 'accessibilitySection',
      descriptionKey: 'accessibilitySection',
      links: [
        { titleKey: 'wcag', href: '/documentation/wcag' },
        { titleKey: 'keyboard', href: '/documentation/keyboard' },
        { titleKey: 'screenReaders', href: '/documentation/screen-readers' },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.common.documentation}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.main.title}</h1>
          <p className="text-xl text-muted-foreground">
            {t.main.subtitle}
          </p>
        </div>

        {/* Documentation Sections */}
        <div className="grid gap-8">
          {docSections.map((section) => {
            const Icon = section.icon
            const sectionData = t.main[section.titleKey as keyof typeof t.main] as any

            return (
              <Card key={section.titleKey} id={section.id}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{sectionData.title}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {sectionData.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="font-medium">{sectionData[link.titleKey]}</span>
                        <svg
                          className="h-4 w-4 ms-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Links */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>{t.main.quickLinks.title}</CardTitle>
            <CardDescription>
              {t.main.quickLinks.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/components"
              className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-semibold group-hover:text-accent-foreground">
                {t.main.quickLinks.allComponents}
              </span>
              <span className="text-sm text-muted-foreground">
                {t.main.quickLinks.allComponentsDesc}
              </span>
            </Link>
            <Link
              href="/tokens"
              className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-semibold group-hover:text-accent-foreground">
                {t.main.quickLinks.designTokens}
              </span>
              <span className="text-sm text-muted-foreground">
                {t.main.quickLinks.designTokensDesc}
              </span>
            </Link>
            <Link
              href="/themes"
              className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-semibold group-hover:text-accent-foreground">
                {t.main.quickLinks.themes}
              </span>
              <span className="text-sm text-muted-foreground">
                {t.main.quickLinks.themesDesc}
              </span>
            </Link>
            <Link
              href="/examples"
              className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-semibold group-hover:text-accent-foreground">
                {t.main.quickLinks.examples}
              </span>
              <span className="text-sm text-muted-foreground">
                {t.main.quickLinks.examplesDesc}
              </span>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
