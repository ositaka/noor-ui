'use client'

import * as React from 'react'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { BestPractices } from '@/components/docs/best-practices'
import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { FileText, Inbox, Search, Users, Plus } from 'lucide-react'

export default function EmptyStatePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]

  const basicUsage = `import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export function Example() {
  return (
    <EmptyState
      icon={<FileText />}
      title="No articles found"
      description="Get started by creating your first article"
      action={
        <Button>
          Create Article
        </Button>
      }
    />
  )
}`

  const withoutAction = `<EmptyState
  icon={<Inbox />}
  title="Inbox is empty"
  description="You're all caught up! No new messages."
/>`

  const searchResults = `<EmptyState
  icon={<Search />}
  title="No results found"
  description="Try adjusting your search or filter to find what you're looking for."
  action={
    <Button variant="outline">
      Clear Filters
    </Button>
  }
/>`

  const multipleActions = `<EmptyState
  icon={<Users />}
  title="No team members yet"
  description="Invite your team to start collaborating"
  action={
    <>
      <Button>
        Invite Members
      </Button>
      <Button variant="outline">
        Learn More
      </Button>
    </>
  }
/>`

  return (
    <div className="container mx-auto py-8 space-y-12" dir={direction}>
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">
          {t.emptyStateComponent.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t.emptyStateComponent.description}
        </p>
      </div>

      {/* Basic Example */}
      <ComponentShowcase
        title={t.emptyStateComponent.sections.basicUsage}
        description={t.emptyStateComponent.sections.basicUsageDesc}
      >
        <Card className="p-8">
          <EmptyState
            icon={<FileText />}
            title={t.emptyStateComponent.examples.noArticlesFound}
            description={t.emptyStateComponent.examples.getStartedCreatingArticle}
            action={
              <Button>
                <Plus className="me-2 h-4 w-4" />
                {t.emptyStateComponent.examples.createArticle}
              </Button>
            }
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock
        code={basicUsage}
        language="tsx"
        title={t.emptyStateComponent.sections.code}
      />

      {/* Without Action */}
      <ComponentShowcase
        title={t.emptyStateComponent.sections.withoutAction}
        description={t.emptyStateComponent.sections.withoutActionDesc}
      >
        <Card className="p-8">
          <EmptyState
            icon={<Inbox />}
            title={t.emptyStateComponent.examples.inboxEmpty}
            description={t.emptyStateComponent.examples.allCaughtUp}
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock code={withoutAction} language="tsx" />

      {/* Search Results */}
      <ComponentShowcase
        title={t.emptyStateComponent.sections.searchResults}
        description={t.emptyStateComponent.sections.searchResultsDesc}
      >
        <Card className="p-8">
          <EmptyState
            icon={<Search />}
            title={t.emptyStateComponent.examples.noResultsFound}
            description={t.emptyStateComponent.examples.tryAdjustingSearch}
            action={
              <Button variant="outline">
                {t.emptyStateComponent.examples.clearFilters}
              </Button>
            }
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock code={searchResults} language="tsx" />

      {/* Multiple Actions */}
      <ComponentShowcase
        title={t.emptyStateComponent.sections.multipleActions}
        description={t.emptyStateComponent.sections.multipleActionsDesc}
      >
        <Card className="p-8">
          <EmptyState
            icon={<Users />}
            title={t.emptyStateComponent.examples.noTeamMembers}
            description={t.emptyStateComponent.examples.inviteTeamToCollaborate}
            action={
              <>
                <Button>
                  <Plus className="me-2 h-4 w-4" />
                  {t.emptyStateComponent.examples.inviteMembers}
                </Button>
                <Button variant="outline">
                  {t.emptyStateComponent.examples.learnMore}
                </Button>
              </>
            }
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock code={multipleActions} language="tsx" />

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {t.emptyStateComponent.sections.props}
        </h2>

        <PropsTable
          props={[
            {
              name: 'icon',
              type: 'React.ReactNode',
              description: t.emptyStateComponent.props.iconDisplayedAtTop,
              required: false,
            },
            {
              name: 'title',
              type: 'string',
              description: t.emptyStateComponent.props.titleOfEmptyState,
            },
            {
              name: 'description',
              type: 'string',
              description: t.emptyStateComponent.props.optionalDescriptiveText,
              required: false,
            },
            {
              name: 'action',
              type: 'React.ReactNode',
              description: t.emptyStateComponent.props.actionButtons,
              required: false,
            },
            {
              name: 'className',
              type: 'string',
              description: t.emptyStateComponent.props.additionalCssClasses,
              required: false,
            },
          ]}
        />
      </div>

      {/* Usage Guidelines */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {t.emptyStateComponent.sections.usageGuidelines}
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <h3 className="font-semibold mb-1">
              {t.emptyStateComponent.sections.whenToUse}
            </h3>
            <ul className="list-disc ps-5 space-y-1 text-muted-foreground">
              <li>{t.emptyStateComponent.usageGuidelines.whenNoContentToDisplay}</li>
              <li>{t.emptyStateComponent.usageGuidelines.toGuideUsersNextAction}</li>
              <li>{t.emptyStateComponent.usageGuidelines.toProvideExplanation}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.emptyStateComponent.sections.bestPractices}
        </h2>
        <BestPractices
          dos={t.emptyStateComponent.bestPractices.doList}
          donts={t.emptyStateComponent.bestPractices.dontList}
        />
      </section>
    </div>
  )
}
