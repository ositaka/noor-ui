'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDirection } from '@/components/providers/direction-provider'
import { FileText, Inbox, Search, Users, Plus } from 'lucide-react'

export default function EmptyStatePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'

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
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {isRTL ? 'المكونات' : 'Components'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{isRTL ? 'حالة فارغة' : 'Empty State'}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {isRTL ? 'حالة فارغة' : 'Empty State'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {isRTL
              ? 'اعرض رسائل تعليمية عندما لا يكون هناك محتوى للعرض'
              : 'Display helpful messages when there is no content to show'}
          </p>
        </div>

      {/* Basic Example */}
      <ComponentShowcase
        title={isRTL ? 'الاستخدام الأساسي' : 'Basic Usage'}
        description={isRTL ? 'حالة فارغة بسيطة مع أيقونة وعنوان ووصف وإجراء' : 'Simple empty state with icon, title, description, and action'}
      >
        <Card className="p-8">
          <EmptyState
            icon={<FileText />}
            title={isRTL ? 'لم يتم العثور على مقالات' : 'No articles found'}
            description={
              isRTL
                ? 'ابدأ بإنشاء مقالتك الأولى'
                : 'Get started by creating your first article'
            }
            action={
              <Button>
                <Plus className="me-2 h-4 w-4" />
                {isRTL ? 'إنشاء مقالة' : 'Create Article'}
              </Button>
            }
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock
        code={basicUsage}
        language="tsx"
        title={isRTL ? 'الكود' : 'Code'}
      />

      {/* Without Action */}
      <ComponentShowcase
        title={isRTL ? 'بدون إجراء' : 'Without Action'}
        description={isRTL ? 'حالة فارغة بدون زر إجراء' : 'Empty state without action button'}
      >
        <Card className="p-8">
          <EmptyState
            icon={<Inbox />}
            title={isRTL ? 'البريد الوارد فارغ' : 'Inbox is empty'}
            description={
              isRTL
                ? 'أنت على اطلاع! لا توجد رسائل جديدة.'
                : "You're all caught up! No new messages."
            }
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock code={withoutAction} language="tsx" />

      {/* Search Results */}
      <ComponentShowcase
        title={isRTL ? 'نتائج البحث' : 'Search Results'}
        description={isRTL ? 'حالة فارغة لنتائج البحث' : 'Empty state for search results'}
      >
        <Card className="p-8">
          <EmptyState
            icon={<Search />}
            title={isRTL ? 'لم يتم العثور على نتائج' : 'No results found'}
            description={
              isRTL
                ? 'حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه.'
                : "Try adjusting your search or filter to find what you're looking for."
            }
            action={
              <Button variant="outline">
                {isRTL ? 'مسح الفلاتر' : 'Clear Filters'}
              </Button>
            }
          />
        </Card>
      </ComponentShowcase>

      <CodeBlock code={searchResults} language="tsx" />

      {/* Multiple Actions */}
      <ComponentShowcase
        title={isRTL ? 'إجراءات متعددة' : 'Multiple Actions'}
        description={isRTL ? 'حالة فارغة مع عدة أزرار إجراء' : 'Empty state with multiple action buttons'}
      >
        <Card className="p-8">
          <EmptyState
            icon={<Users />}
            title={isRTL ? 'لا يوجد أعضاء فريق بعد' : 'No team members yet'}
            description={
              isRTL
                ? 'ادع فريقك لبدء التعاون'
                : 'Invite your team to start collaborating'
            }
            action={
              <>
                <Button>
                  <Plus className="me-2 h-4 w-4" />
                  {isRTL ? 'دعوة أعضاء' : 'Invite Members'}
                </Button>
                <Button variant="outline">
                  {isRTL ? 'معرفة المزيد' : 'Learn More'}
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
          {isRTL ? 'الخصائص' : 'Props'}
        </h2>

        <PropsTable
          props={[
            {
              name: 'icon',
              type: 'React.ReactNode',
              description: isRTL
                ? 'الأيقونة المعروضة في الأعلى'
                : 'Icon to display at the top',
              required: false,
            },
            {
              name: 'title',
              type: 'string',
              description: isRTL ? 'عنوان الحالة الفارغة' : 'Title of the empty state',
            },
            {
              name: 'description',
              type: 'string',
              description: isRTL ? 'نص وصفي اختياري' : 'Optional descriptive text',
              required: false,
            },
            {
              name: 'action',
              type: 'React.ReactNode',
              description: isRTL
                ? 'زر أو أزرار الإجراء'
                : 'Action button(s) to display',
              required: false,
            },
            {
              name: 'className',
              type: 'string',
              description: isRTL
                ? 'فئات CSS إضافية'
                : 'Additional CSS classes',
              required: false,
            },
          ]}
        />
      </div>

      {/* Usage Guidelines */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {isRTL ? 'إرشادات الاستخدام' : 'Usage Guidelines'}
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <h3 className="font-semibold mb-1">
              {isRTL ? 'متى تستخدم' : 'When to use'}
            </h3>
            <ul className="list-disc ps-5 space-y-1 text-muted-foreground">
              <li>
                {isRTL
                  ? 'عندما لا يكون هناك محتوى للعرض (قوائم فارغة، نتائج بحث، إلخ)'
                  : 'When there is no content to display (empty lists, search results, etc.)'}
              </li>
              <li>
                {isRTL
                  ? 'لتوجيه المستخدمين نحو الإجراء التالي'
                  : 'To guide users towards the next action'}
              </li>
              <li>
                {isRTL
                  ? 'لتوفير تفسير لماذا لا يوجد محتوى'
                  : 'To provide an explanation for why there is no content'}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              {isRTL ? 'أفضل الممارسات' : 'Best practices'}
            </h3>
            <ul className="list-disc ps-5 space-y-1 text-muted-foreground">
              <li>
                {isRTL
                  ? 'استخدم أيقونات ذات صلة تمثل المحتوى المفقود'
                  : 'Use relevant icons that represent the missing content'}
              </li>
              <li>
                {isRTL
                  ? 'اجعل العنوان واضحًا وموجزًا'
                  : 'Keep titles clear and concise'}
              </li>
              <li>
                {isRTL
                  ? 'قدم إجراءً واضحًا إذا كان بإمكان المستخدم إصلاح الموقف'
                  : 'Provide a clear action if the user can fix the situation'}
              </li>
              <li>
                {isRTL
                  ? 'استخدم لهجة ودية ومفيدة'
                  : 'Use a friendly and helpful tone'}
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
