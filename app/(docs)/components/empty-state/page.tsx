'use client'

import * as React from 'react'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { BestPractices } from '@/components/docs/best-practices'
import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { FileText, Tray, MagnifyingGlass, Users, Plus } from '@phosphor-icons/react'
import { StorybookLink } from '@/components/docs/storybook-link'
import { ComponentDocSections } from '@/components/docs/component-doc-sections'

export default function EmptyStatePage() {
  const { direction, locale } = useDirection()
  const t = content[locale]
  const emptyStateT = t.emptyStateComponent

  const basicUsage = `import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import { FileText } from '@phosphor-icons/react'

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
  icon={<Tray />}
  title="Inbox is empty"
  description="You're all caught up! No new messages."
/>`

  const searchResults = `<EmptyState
  icon={<MagnifyingGlass />}
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
          {emptyStateT.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {emptyStateT.description}
        </p>
      
      <div className="mt-4">
        <StorybookLink />
      </div>
      </div>

      {/* Basic Example */}
      <ComponentShowcase
        title={emptyStateT.sections.basicUsage}
        description={emptyStateT.sections.basicUsageDesc}
      >
        <Card className="p-8">
          <EmptyState
            icon={<FileText />}
            title={emptyStateT.examples.noArticlesFound}
            description={emptyStateT.examples.getStartedCreatingArticle}
            action={
              <Button>
                <Plus className="me-2 h-4 w-4" />
                {emptyStateT.examples.createArticle}
              </Button>
            }
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock
        code={basicUsage}
        language="tsx"
        title={emptyStateT.sections.code}
      />

      {/* Without Action */}
      <ComponentShowcase
        title={emptyStateT.sections.withoutAction}
        description={emptyStateT.sections.withoutActionDesc}
      >
        <Card className="p-8">
          <EmptyState
            icon={<Tray />}
            title={emptyStateT.examples.inboxEmpty}
            description={emptyStateT.examples.allCaughtUp}
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock code={withoutAction} language="tsx" />

      {/* Search Results */}
      <ComponentShowcase
        title={emptyStateT.sections.searchResults}
        description={emptyStateT.sections.searchResultsDesc}
      >
        <Card className="p-8">
          <EmptyState
            icon={<MagnifyingGlass />}
            title={emptyStateT.examples.noResultsFound}
            description={emptyStateT.examples.tryAdjustingSearch}
            action={
              <Button variant="outline">
                {emptyStateT.examples.clearFilters}
              </Button>
            }
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock code={searchResults} language="tsx" />

      {/* Multiple Actions */}
      <ComponentShowcase
        title={emptyStateT.sections.multipleActions}
        description={emptyStateT.sections.multipleActionsDesc}
      >
        <Card className="p-8">
          <EmptyState
            icon={<Users />}
            title={emptyStateT.examples.noTeamMembers}
            description={emptyStateT.examples.inviteTeamToCollaborate}
            action={
              <>
                <Button>
                  <Plus className="me-2 h-4 w-4" />
                  {emptyStateT.examples.inviteMembers}
                </Button>
                <Button variant="outline">
                  {emptyStateT.examples.learnMore}
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
          {emptyStateT.sections.props}
        </h2>

        <PropsTable
          props={[
            {
              name: 'icon',
              type: 'React.ReactNode',
              description: emptyStateT.props.iconDisplayedAtTop,
              required: false,
            },
            {
              name: 'title',
              type: 'string',
              description: emptyStateT.props.titleOfEmptyState,
            },
            {
              name: 'description',
              type: 'string',
              description: emptyStateT.props.optionalDescriptiveText,
              required: false,
            },
            {
              name: 'action',
              type: 'React.ReactNode',
              description: emptyStateT.props.actionButtons,
              required: false,
            },
            {
              name: 'className',
              type: 'string',
              description: emptyStateT.props.additionalCssClasses,
              required: false,
            },
          ]}
        />
      </div>

      {/* Usage Guidelines */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {emptyStateT.sections.usageGuidelines}
        </h2>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">
              {emptyStateT.sections.whenToUse}
            </h3>
            <ul className="list-disc ps-5 space-y-1 text-sm text-muted-foreground">
              <li>{emptyStateT.usageGuidelines.whenNoContentToDisplay}</li>
              <li>{emptyStateT.usageGuidelines.toGuideUsersNextAction}</li>
              <li>{emptyStateT.usageGuidelines.toProvideExplanation}</li>
            </ul>
          </CardContent>
        </Card>
      </section>
        <ComponentDocSections />
    </div>
  )
}
