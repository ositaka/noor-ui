'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, Code2, Palette, Globe2, Accessibility, type LucideIcon } from 'lucide-react'

interface DocumentationSection {
  title: string
  description: string
  icon: LucideIcon
  links: Array<{ title: string; href: string }>
  id?: string
}

const docSections: DocumentationSection[] = [
  {
    title: 'Getting Started',
    description: 'Learn how to set up and use the design system',
    icon: Book,
    links: [
      { title: 'Installation', href: '/documentation/installation' },
      { title: 'Quick Start', href: '/documentation/quick-start' },
      { title: 'Configuration', href: '/documentation/configuration' },
    ],
  },
  {
    title: 'Components',
    description: 'Browse all available UI components',
    icon: Code2,
    links: [
      { title: 'Component Library', href: '/components' },
      { title: 'Props Documentation', href: '/documentation/props' },
      { title: 'Examples', href: '/documentation/examples' },
    ],
  },
  {
    title: 'Design Tokens',
    description: 'Customize colors, spacing, typography and more',
    icon: Palette,
    links: [
      { title: 'Color System', href: '/tokens#colors' },
      { title: 'Typography', href: '/tokens#typography' },
      { title: 'Spacing', href: '/tokens#spacing' },
    ],
  },
  {
    title: 'RTL Support',
    description: 'Building for Arabic and other RTL languages',
    icon: Globe2,
    links: [
      { title: 'RTL Guidelines', href: '/documentation/rtl' },
      { title: 'Bidirectional Components', href: '/documentation/bidi' },
      { title: 'Arabic Typography', href: '/documentation/arabic' },
    ],
  },
  {
    title: 'Accessibility',
    description: 'Building inclusive and accessible interfaces',
    icon: Accessibility,
    id: 'accessibility',
    links: [
      { title: 'WCAG Compliance', href: '/documentation/wcag' },
      { title: 'Keyboard Navigation', href: '/documentation/keyboard' },
      { title: 'Screen Readers', href: '/documentation/screen-readers' },
    ],
  },
]

export default function DocumentationPage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Documentation</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about building with our RTL-first design system.
            Comprehensive guides, API references, and examples.
          </p>
        </div>

        {/* Documentation Sections */}
        <div className="grid gap-8">
          {docSections.map((section) => {
            const Icon = section.icon

            return (
              <Card key={section.title} id={section.id}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {section.description}
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
                        <span className="font-medium">{link.title}</span>
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
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>
              Jump directly to the most frequently accessed resources
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/components"
              className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-semibold group-hover:text-accent-foreground">
                All Components
              </span>
              <span className="text-sm text-muted-foreground">
                Browse the complete component library
              </span>
            </Link>
            <Link
              href="/tokens"
              className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-semibold group-hover:text-accent-foreground">
                Design Tokens
              </span>
              <span className="text-sm text-muted-foreground">
                Explore the token system
              </span>
            </Link>
            <Link
              href="/themes"
              className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-semibold group-hover:text-accent-foreground">
                Themes
              </span>
              <span className="text-sm text-muted-foreground">
                See all available themes
              </span>
            </Link>
            <Link
              href="/examples"
              className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-semibold group-hover:text-accent-foreground">
                Examples
              </span>
              <span className="text-sm text-muted-foreground">
                Real-world usage examples
              </span>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
