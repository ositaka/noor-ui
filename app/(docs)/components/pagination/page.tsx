'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getPaginationLinkProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'isActive',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.paginationComponent.propDescriptions.isActive,
  },
  {
    name: 'size',
    type: '"default" | "sm" | "lg" | "icon"',
    default: '"icon"',
    required: false,
    description: t.paginationComponent.propDescriptions.size,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`

const withEllipsisCode = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        6
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">7</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`

const controlledCode = `const [currentPage, setCurrentPage] = React.useState(1)
const totalPages = 10

const handlePageChange = (page: number) => {
  setCurrentPage(page)
  // Fetch data for the new page
}

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        href="#"
        onClick={(e) => {
          e.preventDefault()
          if (currentPage > 1) handlePageChange(currentPage - 1)
        }}
        aria-disabled={currentPage === 1}
      />
    </PaginationItem>
    {[...Array(totalPages)].map((_, i) => (
      <PaginationItem key={i + 1}>
        <PaginationLink
          href="#"
          isActive={currentPage === i + 1}
          onClick={(e) => {
            e.preventDefault()
            handlePageChange(i + 1)
          }}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationNext
        href="#"
        onClick={(e) => {
          e.preventDefault()
          if (currentPage < totalPages) handlePageChange(currentPage + 1)
        }}
        aria-disabled={currentPage === totalPages}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>`

export default function PaginationPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const paginationLinkProps = getPaginationLinkProps(t)
  const [currentPage, setCurrentPage] = React.useState(2)

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.paginationComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.paginationComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.paginationComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.paginationComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#">{t.paginationComponent.demo.previous}</PaginationPrevious>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#">{t.paginationComponent.demo.next}</PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Installation</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.paginationComponent.examples.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.paginationComponent.examples.withEllipsis}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#">{t.paginationComponent.demo.previous}</PaginationPrevious>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">5</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          6
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">7</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">10</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#">{t.paginationComponent.demo.next}</PaginationNext>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </ComponentShowcase.Demo>
              </ComponentShowcase>
              <CodeBlock code={withEllipsisCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Controlled</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.paginationComponent.demo.currentPage} {currentPage}</p>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage > 1) setCurrentPage(currentPage - 1)
                            }}
                          >{t.paginationComponent.demo.previous}</PaginationPrevious>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === 1}
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(1)
                            }}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === 2}
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(2)
                            }}
                          >
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === 3}
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(3)
                            }}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage < 3) setCurrentPage(currentPage + 1)
                            }}
                          >{t.paginationComponent.demo.next}</PaginationNext>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </ComponentShowcase.Demo>
              </ComponentShowcase>
              <CodeBlock code={controlledCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.paginationComponent.examples.rtlExample}</h2>
          <p className="text-muted-foreground mb-6">
            {t.paginationComponent.rtlExampleDesc}
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#">{t.paginationComponent.demo.previous}</PaginationPrevious>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#">{t.paginationComponent.demo.next}</PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.paginationComponent.props.title}</h2>
          <PropsTable props={paginationLinkProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.paginationComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.paginationComponent.accessibilityDetails.keyboard}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - {t.paginationComponent.accessibilityDetails.tab}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> - {t.paginationComponent.accessibilityDetails.enter}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd> - {t.paginationComponent.accessibilityDetails.space}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.paginationComponent.accessibilityDetails.ariaAttributes}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>{t.paginationComponent.accessibilityDetails.roleNavigation}</li>
                  <li>{t.paginationComponent.accessibilityDetails.ariaCurrent}</li>
                  <li>{t.paginationComponent.accessibilityDetails.ariaLabel}</li>
                  <li>{t.paginationComponent.accessibilityDetails.ariaHidden}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.paginationComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {t.paginationComponent.rtl.description}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{t.paginationComponent.rtlDetails.prevNextSwap}</li>
                <li>{t.paginationComponent.rtlDetails.chevronMirror}</li>
                <li>{t.paginationComponent.rtlDetails.pageNumberOrder}</li>
                <li>{t.paginationComponent.rtlDetails.focusIndicators}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.paginationComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/breadcrumb">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.paginationComponent.related.breadcrumb}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.paginationComponent.related.breadcrumbDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.paginationComponent.related.button}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.paginationComponent.related.buttonDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
