'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactionPicker, Reaction } from '@/components/ui/reaction-picker'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { BestPractices } from '@/components/docs/best-practices'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getReactionPickerProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'reactions',
    type: 'Reaction[]',
    default: 'undefined',
    required: true,
    description: t.reactionPickerComponent.props.reactions,
  },
  {
    name: 'variant',
    type: "'compact' | 'expanded'",
    default: "'compact'",
    required: false,
    description: t.reactionPickerComponent.props.variant,
  },
  {
    name: 'availableReactions',
    type: 'string[]',
    default: "['\ud83d\udc4d', '\u2764\ufe0f', '\ud83d\udca1', '\ud83d\ude80', '\ud83c\udf89', '\ud83d\udc40']",
    required: false,
    description: t.reactionPickerComponent.props.availableReactions,
  },
  {
    name: 'maxVisible',
    type: 'number',
    default: '3',
    required: false,
    description: t.reactionPickerComponent.props.maxVisible,
  },
  {
    name: 'onReact',
    type: '(emoji: string) => void',
    default: 'undefined',
    required: true,
    description: t.reactionPickerComponent.props.onReact,
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "'React to comment'",
    required: false,
    description: t.reactionPickerComponent.props.ariaLabel,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.reactionPickerComponent.props.className,
  },
]

export default function ReactionPickerPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const reactionPickerProps = getReactionPickerProps(t)

  // Demo state for compact mode
  const [compactReactions, setCompactReactions] = React.useState<Reaction[]>([
    { emoji: '👍', count: 12, hasReacted: false },
    { emoji: '❤️', count: 5, hasReacted: false },
    { emoji: '💡', count: 3, hasReacted: false },
  ])

  // Demo state for expanded mode
  const [expandedReactions, setExpandedReactions] = React.useState<Reaction[]>([
    { emoji: '👍', count: 12, hasReacted: false },
    { emoji: '❤️', count: 5, hasReacted: true },
    { emoji: '🚀', count: 2, hasReacted: false },
  ])

  const handleCompactReact = (emoji: string) => {
    setCompactReactions((prev) => {
      const existing = prev.find((r) => r.emoji === emoji)
      if (existing) {
        return prev.map((r) =>
          r.emoji === emoji
            ? { ...r, count: r.hasReacted ? r.count - 1 : r.count + 1, hasReacted: !r.hasReacted }
            : { ...r, hasReacted: false }
        )
      }
      return [...prev, { emoji, count: 1, hasReacted: true }]
    })
  }

  const handleExpandedReact = (emoji: string) => {
    setExpandedReactions((prev) => {
      const existing = prev.find((r) => r.emoji === emoji)
      if (existing) {
        if (existing.hasReacted) {
          return prev.map((r) =>
            r.emoji === emoji ? { ...r, count: r.count - 1, hasReacted: false } : r
          ).filter((r) => r.count > 0)
        }
        return prev.map((r) =>
          r.emoji === emoji ? { ...r, count: r.count + 1, hasReacted: true } : r
        )
      }
      return [...prev, { emoji, count: 1, hasReacted: true }]
    })
  }

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
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">ReactionPicker</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.reactionPickerComponent.title}</h1>
            <Badge>v0.4.0</Badge>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {t.reactionPickerComponent.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Social</Badge>
            <Badge variant="secondary">Interactive</Badge>
            <Badge variant="secondary">RTL-ready</Badge>
          </div>
        </div>

        {/* Live Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.reactionPickerComponent.liveDemo}</h2>
          <Tabs defaultValue="compact">
            <TabsList>
              <TabsTrigger value="compact">{t.reactionPickerComponent.compactMode}</TabsTrigger>
              <TabsTrigger value="expanded">{t.reactionPickerComponent.expandedMode}</TabsTrigger>
            </TabsList>

            <TabsContent value="compact" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.reactionPickerComponent.compactMode}</CardTitle>
                  <CardDescription>
                    {t.reactionPickerComponent.compactDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-6 border rounded-lg bg-muted/50">
                    <ReactionPicker
                      reactions={compactReactions}
                      variant="compact"
                      onReact={handleCompactReact}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t.reactionPickerComponent.totalReactions}: {compactReactions.reduce((sum, r) => sum + r.count, 0)}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expanded" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.reactionPickerComponent.expandedMode}</CardTitle>
                  <CardDescription>
                    {t.reactionPickerComponent.expandedDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 border rounded-lg bg-muted/50">
                    <ReactionPicker
                      reactions={expandedReactions}
                      variant="expanded"
                      onReact={handleExpandedReact}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.reactionPickerComponent.installation}</h2>
          <CodeBlock code="npm install noorui-rtl" language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.reactionPickerComponent.usage}</h2>
          <CodeBlock code={`import { ReactionPicker, Reaction } from 'noorui-rtl'

function CommentReactions() {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: '👍', count: 12, hasReacted: false },
    { emoji: '❤️', count: 5, hasReacted: true },
  ])

  const handleReact = (emoji: string) => {
    // Toggle user's reaction (one reaction per user)
    setReactions(prev => {
      const existing = prev.find(r => r.emoji === emoji)
      if (existing) {
        return prev.map(r =>
          r.emoji === emoji
            ? { ...r, count: r.hasReacted ? r.count - 1 : r.count + 1, hasReacted: !r.hasReacted }
            : { ...r, hasReacted: false } // Remove other reactions
        )
      }
      return [...prev, { emoji, count: 1, hasReacted: true }]
    })
  }

  return (
    <ReactionPicker
      reactions={reactions}
      variant="compact"
      onReact={handleReact}
    />
  )
}`} language="tsx" />
        </section>

        <Separator className="my-12" />

        {/* Props API */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.reactionPickerComponent.props.title}</h2>
          <PropsTable props={reactionPickerProps} />
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={t.reactionPickerComponent.bestPractices.doList}
            donts={t.reactionPickerComponent.bestPractices.dontList}
          />
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.reactionPickerComponent.features.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t.reactionPickerComponent.features.compactModeTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-2 list-disc list-inside text-sm">
                  {t.reactionPickerComponent.features.compactModeItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.reactionPickerComponent.features.expandedModeTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-2 list-disc list-inside text-sm">
                  {t.reactionPickerComponent.features.expandedModeItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.reactionPickerComponent.features.rtlTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-2 list-disc list-inside text-sm">
                  {t.reactionPickerComponent.features.rtlItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.reactionPickerComponent.features.accessibilityTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-2 list-disc list-inside text-sm">
                  {t.reactionPickerComponent.features.accessibilityItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t.reactionPickerComponent.useCases.title}</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {t.reactionPickerComponent.useCases.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
