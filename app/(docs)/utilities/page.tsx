'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Clock, Hash, TextT, ArrowsLeftRight, Swatches, ArrowsClockwise } from '@phosphor-icons/react'
import { CodeBlock } from '@/components/docs/code-block'

export default function UtilitiesPage() {
  const { locale } = useDirection()
  const t = content[locale]

  const hooksList = [
    {
      name: 'useRelativeTime',
      description: t.utilitiesPage.hooks.useRelativeTime.description,
      icon: Clock,
      href: '#use-relative-time',
      category: t.utilitiesPage.categories.hooks,
      status: 'ready',
    },
    {
      name: 'useSwipeDirection',
      description: t.utilitiesPage.hooks.useSwipeDirection.description,
      icon: Swatches,
      href: '#use-swipe-direction',
      category: t.utilitiesPage.categories.hooks,
      status: 'ready',
    },
    {
      name: 'useRTLAnimation',
      description: t.utilitiesPage.hooks.useRTLAnimation.description,
      icon: ArrowsClockwise,
      href: '#use-rtl-animation',
      category: t.utilitiesPage.categories.hooks,
      status: 'ready',
    },
  ]

  const utilsList = [
    {
      name: 'formatDate',
      description: t.utilitiesPage.utils.formatDate.description,
      icon: Clock,
      href: '#coming-soon',
      category: t.utilitiesPage.categories.dateTime,
      status: 'coming-soon',
    },
    {
      name: 'formatNumber',
      description: t.utilitiesPage.utils.formatNumber.description,
      icon: Hash,
      href: '#coming-soon',
      category: t.utilitiesPage.categories.numbers,
      status: 'coming-soon',
    },
    {
      name: 'toArabicNumerals',
      description: t.utilitiesPage.utils.toArabicNumerals.description,
      icon: Hash,
      href: '#coming-soon',
      category: t.utilitiesPage.categories.numbers,
      status: 'coming-soon',
    },
    {
      name: 'getTextDirection',
      description: t.utilitiesPage.utils.getTextDirection.description,
      icon: ArrowsLeftRight,
      href: '#coming-soon',
      category: t.utilitiesPage.categories.textDirection,
      status: 'coming-soon',
    },
    {
      name: 'isRTL',
      description: t.utilitiesPage.utils.isRTL.description,
      icon: TextT,
      href: '#coming-soon',
      category: t.utilitiesPage.categories.textDirection,
      status: 'coming-soon',
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground font-medium">{t.utilitiesPage.breadcrumb}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.utilitiesPage.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">
            {t.utilitiesPage.description}
          </p>
        </div>

        {/* Tabs for Hooks and Utils */}
        <Tabs defaultValue="hooks" className="mb-12">
          <TabsList>
            <TabsTrigger value="hooks">{t.utilitiesPage.hooksTab} ({hooksList.length})</TabsTrigger>
            <TabsTrigger value="utils">{t.utilitiesPage.utilsTab} ({utilsList.length})</TabsTrigger>
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
                          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                          {hook.status === 'ready' ? (
                            <Badge variant="default">{t.utilitiesPage.statusReady}</Badge>
                          ) : (
                            <Badge variant="secondary">{t.utilitiesPage.statusComingSoon}</Badge>
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
                          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                          {util.status === 'ready' ? (
                            <Badge variant="default">{t.utilitiesPage.statusReady}</Badge>
                          ) : (
                            <Badge variant="secondary">{t.utilitiesPage.statusComingSoon}</Badge>
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
        <section id="use-relative-time" className="max-w-4xl scroll-mt-20">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">useRelativeTime</h2>
              <Badge>{t.utilitiesPage.hookBadge}</Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {t.utilitiesPage.useRelativeTime.subtitle}
            </p>
          </div>

          {/* Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.utilitiesPage.overview}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">useRelativeTime</code> hook
                {' '}{t.utilitiesPage.useRelativeTime.overviewP1}
              </p>
              <p>
                {t.utilitiesPage.useRelativeTime.overviewP2}
              </p>
            </CardContent>
          </Card>

          {/* Usage Example */}
          <CodeBlock
            title={t.utilitiesPage.usage}
            language="tsx"
            className="mb-6"
            code={`import { useRelativeTime } from 'noorui-rtl'

function CommentTimestamp({ createdAt, locale }) {
  const timeAgo = useRelativeTime(createdAt, locale)

  return <span>{timeAgo}</span>
}

// Example output (English): "2 hours ago"
// Example output (Arabic): "منذ ساعتين"`}
          />

          {/* API Reference */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.utilitiesPage.apiReference}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.parameter}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.type}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.default}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">
                        <code className="px-2 py-0.5 bg-muted text-foreground rounded">date</code>
                      </td>
                      <td className="p-3">
                        <code>Date | string</code>
                      </td>
                      <td className="p-3">-</td>
                      <td className="p-3">{t.utilitiesPage.useRelativeTime.params.date}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <code className="px-2 py-0.5 bg-muted text-foreground rounded">locale</code>
                      </td>
                      <td className="p-3">
                        <code>&apos;en&apos; | &apos;ar&apos; | &apos;fr&apos; | &apos;ur&apos;</code>
                      </td>
                      <td className="p-3">
                        <code>&apos;en&apos;</code>
                      </td>
                      <td className="p-3">{t.utilitiesPage.useRelativeTime.params.locale}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <code className="px-2 py-0.5 bg-muted text-foreground rounded">options.updateInterval</code>
                      </td>
                      <td className="p-3">
                        <code>number</code>
                      </td>
                      <td className="p-3">
                        <code>60000</code>
                      </td>
                      <td className="p-3">{t.utilitiesPage.useRelativeTime.params.updateInterval}</td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <code className="px-2 py-0.5 bg-muted text-foreground rounded">options.format</code>
                      </td>
                      <td className="p-3">
                        <code>&apos;short&apos; | &apos;long&apos;</code>
                      </td>
                      <td className="p-3">
                        <code>&apos;long&apos;</code>
                      </td>
                      <td className="p-3">{t.utilitiesPage.useRelativeTime.params.format}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>{t.utilitiesPage.features}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                {t.utilitiesPage.useRelativeTime.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* useSwipeDirection Hook Documentation */}
        <section id="use-swipe-direction" className="max-w-4xl scroll-mt-20">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">useSwipeDirection</h2>
              <Badge>{t.utilitiesPage.hookBadge}</Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {t.utilitiesPage.useSwipeDirection.subtitle}
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.utilitiesPage.overview}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">useSwipeDirection</code> hook
                {' '}{t.utilitiesPage.useSwipeDirection.overviewP1}
              </p>
              <p>
                {t.utilitiesPage.useSwipeDirection.overviewP2Prefix}{' '}
                <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">getCarouselDirection</code>{' '}
                {t.utilitiesPage.useSwipeDirection.overviewP2Suffix}{' '}
                {t.utilitiesPage.useSwipeDirection.overviewP2}
              </p>
            </CardContent>
          </Card>

          <CodeBlock
            title={t.utilitiesPage.usage}
            language="tsx"
            className="mb-6"
            code={`import { useSwipeDirection } from '@/hooks/use-swipe-direction'

function SwipeableCard() {
  const { next, previous, slideIn, mirror } = useSwipeDirection()

  // LTR: next = 'left',  slideIn = 100
  // RTL: next = 'right', slideIn = -100

  return (
    <div onSwipedLeft={() => goTo(next === 'left' ? 'next' : 'prev')}>
      {/* content */}
    </div>
  )
}`}
          />

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.utilitiesPage.apiReferenceReturnValues}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.property}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.type}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.ltr}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.rtl}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">next</code></td>
                      <td className="p-3"><code>SwipeDirection</code></td>
                      <td className="p-3"><code>&apos;left&apos;</code></td>
                      <td className="p-3"><code>&apos;right&apos;</code></td>
                      <td className="p-3">{t.utilitiesPage.useSwipeDirection.returnValues.next}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">previous</code></td>
                      <td className="p-3"><code>SwipeDirection</code></td>
                      <td className="p-3"><code>&apos;right&apos;</code></td>
                      <td className="p-3"><code>&apos;left&apos;</code></td>
                      <td className="p-3">{t.utilitiesPage.useSwipeDirection.returnValues.previous}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">forward</code></td>
                      <td className="p-3"><code>number</code></td>
                      <td className="p-3"><code>1</code></td>
                      <td className="p-3"><code>-1</code></td>
                      <td className="p-3">{t.utilitiesPage.useSwipeDirection.returnValues.forward}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">slideIn</code></td>
                      <td className="p-3"><code>number</code></td>
                      <td className="p-3"><code>100</code></td>
                      <td className="p-3"><code>-100</code></td>
                      <td className="p-3">{t.utilitiesPage.useSwipeDirection.returnValues.slideIn}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">slideOut</code></td>
                      <td className="p-3"><code>number</code></td>
                      <td className="p-3"><code>-100</code></td>
                      <td className="p-3"><code>100</code></td>
                      <td className="p-3">{t.utilitiesPage.useSwipeDirection.returnValues.slideOut}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">isRTL</code></td>
                      <td className="p-3"><code>boolean</code></td>
                      <td className="p-3"><code>false</code></td>
                      <td className="p-3"><code>true</code></td>
                      <td className="p-3">{t.utilitiesPage.useSwipeDirection.returnValues.isRTL}</td>
                    </tr>
                    <tr>
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">mirror(value)</code></td>
                      <td className="p-3"><code>(T) =&gt; T</code></td>
                      <td className="p-3">{t.utilitiesPage.useSwipeDirection.mirrorLTR}</td>
                      <td className="p-3">{t.utilitiesPage.useSwipeDirection.mirrorRTL}</td>
                      <td className="p-3">{t.utilitiesPage.useSwipeDirection.returnValues.mirror}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.utilitiesPage.features}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                {t.utilitiesPage.useSwipeDirection.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
                <li>{t.utilitiesPage.useSwipeDirection.featureGenericPrefix} <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">mirror()</code> {t.utilitiesPage.useSwipeDirection.featureMirror}</li>
                <li>{t.utilitiesPage.useSwipeDirection.featureCarouselPrefix} <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">getCarouselDirection()</code> {t.utilitiesPage.useSwipeDirection.featureCarousel}</li>
                <li>{t.utilitiesPage.useSwipeDirection.featureTypescript}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* useRTLAnimation Hook Documentation */}
        <section id="use-rtl-animation" className="max-w-4xl scroll-mt-20">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">useRTLAnimation</h2>
              <Badge>{t.utilitiesPage.hookBadge}</Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {t.utilitiesPage.useRTLAnimation.subtitle}
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.utilitiesPage.overview}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">useRTLAnimation</code> hook
                {' '}{t.utilitiesPage.useRTLAnimation.overviewP1}
              </p>
              <p>
                {t.utilitiesPage.useRTLAnimation.overviewP2Prefix}{' '}
                <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">useRTLDragConstraints</code>{' '}
                {t.utilitiesPage.useRTLAnimation.overviewP2}
              </p>
            </CardContent>
          </Card>

          <CodeBlock
            title={t.utilitiesPage.usage}
            language="tsx"
            className="mb-6"
            code={`import { useRTLAnimation } from '@/hooks/use-rtl-animation'
import { motion, AnimatePresence } from 'framer-motion'

function Carousel({ items, currentIndex, direction }) {
  const { slideVariants } = useRTLAnimation()

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentIndex}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
      >
        {items[currentIndex]}
      </motion.div>
    </AnimatePresence>
  )
}`}
          />

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.utilitiesPage.apiReferenceConfig}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.parameter}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.type}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.default}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">distance</code></td>
                      <td className="p-3"><code>number</code></td>
                      <td className="p-3"><code>100</code></td>
                      <td className="p-3">{t.utilitiesPage.useRTLAnimation.configParams.distance}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">duration</code></td>
                      <td className="p-3"><code>number</code></td>
                      <td className="p-3"><code>0.3</code></td>
                      <td className="p-3">{t.utilitiesPage.useRTLAnimation.configParams.duration}</td>
                    </tr>
                    <tr>
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">ease</code></td>
                      <td className="p-3"><code>Easing</code></td>
                      <td className="p-3"><code>&apos;easeInOut&apos;</code></td>
                      <td className="p-3">{t.utilitiesPage.useRTLAnimation.configParams.ease}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.utilitiesPage.apiReferenceReturnValues}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.property}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.type}</th>
                      <th scope="col" className="text-start p-3 font-semibold">{t.utilitiesPage.tableHeaders.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">slideVariants</code></td>
                      <td className="p-3"><code>Variants</code></td>
                      <td className="p-3">{t.utilitiesPage.useRTLAnimation.returnValues.slideVariants}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">fadeSlideVariants</code></td>
                      <td className="p-3"><code>Variants</code></td>
                      <td className="p-3">{t.utilitiesPage.useRTLAnimation.returnValues.fadeSlideVariants}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">swipeVariants</code></td>
                      <td className="p-3"><code>Variants</code></td>
                      <td className="p-3">{t.utilitiesPage.useRTLAnimation.returnValues.swipeVariants}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">isRTL</code></td>
                      <td className="p-3"><code>boolean</code></td>
                      <td className="p-3">{t.utilitiesPage.useRTLAnimation.returnValues.isRTL}</td>
                    </tr>
                    <tr>
                      <td className="p-3"><code className="px-2 py-0.5 bg-muted text-foreground rounded">getDirection(n)</code></td>
                      <td className="p-3"><code>(number) =&gt; number</code></td>
                      <td className="p-3">{t.utilitiesPage.useRTLAnimation.returnValues.getDirection}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.utilitiesPage.features}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                {t.utilitiesPage.useRTLAnimation.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
                <li>{t.utilitiesPage.useRTLAnimation.featureCustomDirectionPrefix} <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">custom</code> {t.utilitiesPage.useRTLAnimation.featureCustomDirection}</li>
                <li>{t.utilitiesPage.useRTLAnimation.featureConfigurable}</li>
                <li>{t.utilitiesPage.useRTLAnimation.featureBuiltOnPrefix} <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">useSwipeDirection</code> {t.utilitiesPage.useRTLAnimation.featureBuiltOn}</li>
                <li>{t.utilitiesPage.useRTLAnimation.featureCompanionPrefix} <code className="px-2 py-0.5 bg-muted text-foreground rounded text-sm">useRTLDragConstraints</code> {t.utilitiesPage.useRTLAnimation.featureCompanion}</li>
                <li>{t.utilitiesPage.useRTLAnimation.featureTypescript}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Coming Soon Section */}
        <section id="coming-soon" className="max-w-4xl scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">{t.utilitiesPage.comingSoon}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {utilsList.filter(u => u.status === 'coming-soon').map((util) => {
              const Icon = util.icon
              return (
                <Card key={util.name}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
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
      </div>
    </div>
  )
}
