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

const paginationLinkProps: PropDefinition[] = [
  {
    name: 'isActive',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether this page is the currently active page',
  },
  {
    name: 'size',
    type: '"default" | "sm" | "lg" | "icon"',
    default: '"icon"',
    required: false,
    description: 'The size variant of the pagination link',
  },
]

const installCode = `npm install @noorui/components`

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
  const [currentPage, setCurrentPage] = React.useState(2)

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Pagination</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Pagination</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Pagination with page navigation, allowing users to navigate through multiple pages of content.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">With Ellipsis</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <Pagination>
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
                    <p className="text-sm text-muted-foreground">Current page: {currentPage}</p>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage > 1) setCurrentPage(currentPage - 1)
                            }}
                          />
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
                          />
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support Example</h2>
          <p className="text-muted-foreground mb-6">
            The Pagination component automatically adapts to RTL layouts. Previous/Next buttons and chevrons mirror correctly.
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
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
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Props</h2>
          <PropsTable props={paginationLinkProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - Move focus between pagination links</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> - Activate the focused page link</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd> - Activate the focused page link</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>role=&quot;navigation&quot; with aria-label=&quot;pagination&quot;</li>
                  <li>aria-current=&quot;page&quot; on the active page link</li>
                  <li>aria-label on Previous and Next buttons for screen readers</li>
                  <li>aria-hidden on ellipsis with descriptive sr-only text</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">RTL Support</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                The Pagination component is fully RTL-compatible with automatic icon mirroring and layout adaptation.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Previous/Next buttons swap positions in RTL mode</li>
                <li>Chevron icons mirror automatically</li>
                <li>Page number ordering follows reading direction</li>
                <li>Focus indicators position correctly</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/breadcrumb">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Breadcrumb</h3>
                  <p className="text-sm text-muted-foreground">
                    Display navigation hierarchy
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Button</h3>
                  <p className="text-sm text-muted-foreground">
                    Trigger actions and navigation
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
