'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Clock, Hash, Type, ArrowLeftRight } from 'lucide-react'

export default function UtilitiesPage() {
  const { locale } = useDirection()
  const t = content[locale]

  const hooksList = [
    {
      name: 'useRelativeTime',
      description: 'Format dates as relative time strings ("2 hours ago") with auto-updates and multilingual support',
      icon: Clock,
      href: '#use-relative-time',
      category: 'Hooks',
      status: 'ready',
    },
  ]

  const utilsList = [
    {
      name: 'formatDate',
      description: 'Locale-aware date formatting with Arabic numerals',
      icon: Clock,
      href: '#format-date',
      category: 'Date & Time',
      status: 'coming-soon',
    },
    {
      name: 'formatNumber',
      description: 'Locale-aware number formatting',
      icon: Hash,
      href: '#format-number',
      category: 'Numbers',
      status: 'coming-soon',
    },
    {
      name: 'toArabicNumerals',
      description: 'Convert numbers to Eastern Arabic numerals (٠١٢٣)',
      icon: Hash,
      href: '#to-arabic-numerals',
      category: 'Numbers',
      status: 'coming-soon',
    },
    {
      name: 'getTextDirection',
      description: 'Auto-detect text direction from content',
      icon: ArrowLeftRight,
      href: '#get-text-direction',
      category: 'Text & Direction',
      status: 'coming-soon',
    },
    {
      name: 'isRTL',
      description: 'Check if a locale is RTL',
      icon: Type,
      href: '#is-rtl',
      category: 'Text & Direction',
      status: 'coming-soon',
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
            <li className="text-foreground font-medium">Utilities</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Utilities & Helpers</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Helper functions and hooks for building RTL-first applications. These utilities handle
            common patterns like date formatting, text direction, and multilingual number display.
          </p>
        </div>

        {/* Tabs for Hooks and Utils */}
        <Tabs defaultValue="hooks" className="mb-12">
          <TabsList>
            <TabsTrigger value="hooks">Hooks ({hooksList.length})</TabsTrigger>
            <TabsTrigger value="utils">Utilities ({utilsList.length})</TabsTrigger>
          </TabsList>

          {/* Hooks Tab */}
          <TabsContent value="hooks" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hooksList.map((hook) => {
                const Icon = hook.icon
                return (
                  <Link key={hook.name} href={hook.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Icon className="h-5 w-5 text-primary" />
                          {hook.status === 'ready' ? (
                            <Badge variant="default">Ready</Badge>
                          ) : (
                            <Badge variant="secondary">Coming Soon</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{hook.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{hook.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </TabsContent>

          {/* Utilities Tab */}
          <TabsContent value="utils" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {utilsList.map((util) => {
                const Icon = util.icon
                return (
                  <Link key={util.name} href={util.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Icon className="h-5 w-5 text-primary" />
                          {util.status === 'ready' ? (
                            <Badge variant="default">Ready</Badge>
                          ) : (
                            <Badge variant="secondary">Coming Soon</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{util.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{util.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-12" />

        {/* useRelativeTime Hook Documentation */}
        <section id="use-relative-time" className="max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">useRelativeTime</h2>
              <Badge>Hook</Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              Format dates as relative time strings with auto-updates and multilingual support
            </p>
          </div>

          {/* Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The <code className="px-2 py-0.5 bg-muted rounded text-sm">useRelativeTime</code> hook
                formats dates as relative time strings (e.g., &quot;2 hours ago&quot;, &quot;منذ ساعتين&quot;) and
                automatically updates them at a specified interval.
              </p>
              <p>
                It supports 4 locales (English, Arabic, French, Urdu) and handles all time ranges from
                seconds to years with proper pluralization.
              </p>
            </CardContent>
          </Card>

          {/* Usage Example */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { useRelativeTime } from 'noorui-rtl'

function CommentTimestamp({ createdAt, locale }) {
  const timeAgo = useRelativeTime(createdAt, locale)

  return <span>{timeAgo}</span>
}

// Example output (English): "2 hours ago"
// Example output (Arabic): "منذ ساعتين"`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* API Reference */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-start p-3 font-semibold">Parameter</th>
                      <th className="text-start p-3 font-semibold">Type</th>
                      <th className="text-start p-3 font-semibold">Default</th>
                      <th className="text-start p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">
                        <code className="px-2 py-0.5 bg-muted rounded">date</code>
                      </td>
                      <td className="p-3">
                        <code>Date | string</code>
                      </td>
                      <td className="p-3">-</td>
                      <td className="p-3">The date to format (Date object or ISO string)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <code className="px-2 py-0.5 bg-muted rounded">locale</code>
                      </td>
                      <td className="p-3">
                        <code>&apos;en&apos; | &apos;ar&apos; | &apos;fr&apos; | &apos;ur&apos;</code>
                      </td>
                      <td className="p-3">
                        <code>&apos;en&apos;</code>
                      </td>
                      <td className="p-3">Locale for translations</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <code className="px-2 py-0.5 bg-muted rounded">options.updateInterval</code>
                      </td>
                      <td className="p-3">
                        <code>number</code>
                      </td>
                      <td className="p-3">
                        <code>60000</code>
                      </td>
                      <td className="p-3">Update interval in milliseconds (default: 1 minute)</td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <code className="px-2 py-0.5 bg-muted rounded">options.format</code>
                      </td>
                      <td className="p-3">
                        <code>&apos;short&apos; | &apos;long&apos;</code>
                      </td>
                      <td className="p-3">
                        <code>&apos;long&apos;</code>
                      </td>
                      <td className="p-3">Format style (not yet implemented)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                <li>Automatic updates at customizable intervals</li>
                <li>Full localization for 4 locales (en, ar, fr, ur)</li>
                <li>Handles all time ranges (seconds, minutes, hours, days, weeks, months, years)</li>
                <li>Proper pluralization for each locale</li>
                <li>Automatic cleanup on unmount</li>
                <li>TypeScript support with full type safety</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Coming Soon Section */}
        <section className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {utilsList.filter(u => u.status === 'coming-soon').map((util) => {
              const Icon = util.icon
              return (
                <Card key={util.name}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <Badge variant="secondary">{util.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{util.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{util.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
