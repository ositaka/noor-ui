'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  CheckCircle2,
  Circle,
  Clock,
  Target,
  TrendingUp,
  Users,
  Package,
  Sparkles,
  Calendar,
} from 'lucide-react'

export default function RoadmapPage() {
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
            <li className="text-foreground font-medium">Roadmap</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Development Roadmap</h1>
          <p className="text-xl text-muted-foreground">
            Our transparent development plan for building the best RTL-first design system.
            We believe in real examples over theoretical components, and quality over quantity.
          </p>
        </div>

        {/* Vision */}
        <section className="mb-16">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                  <CardDescription className="text-base mt-1">
                    What we&apos;re building towards
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Build the <strong>go-to design system for bilingual (LTR/RTL) web applications</strong>,
                starting with English and Arabic, with a focus on the MENA market and global multilingual products.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">RTL-first, not RTL-as-afterthought</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">Real examples over theoretical components</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">Quality over quantity</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">Production-ready, not just showcase</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Current Status */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Current Status: Phase 1 - Week 1</h2>
            <p className="text-muted-foreground">
              Foundation & Discovery phase. Building components through real dashboard examples.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">41</div>
                <p className="text-xs text-muted-foreground mt-1">Production-ready</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6</div>
                <p className="text-xs text-muted-foreground mt-1">Complete demos</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1</div>
                <p className="text-xs text-muted-foreground mt-1">of 4 phases</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Wins</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">P0 and P1 performance optimizations complete</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">Loading skeletons added to all routes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">Comprehensive component library (41+ components)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">Complete rebranding to Noor UI</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Phases */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Phased Approach</h2>
            <p className="text-muted-foreground">
              Our development is organized in 4 phases, each building on the previous one.
            </p>
          </div>

          <div className="space-y-6">
            {/* Phase 1 */}
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Phase 1: Foundation & Discovery</CardTitle>
                      <CardDescription>Current - 4-6 weeks</CardDescription>
                    </div>
                  </div>
                  <Badge>In Progress</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Build real dashboard examples to discover what components are actually needed.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Week 1-2: Component Building</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ms-4">
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Build 8-10 essential dashboard components</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Priority: FileUpload, RichTextEditor, DashboardShell, UserMenu, NotificationCenter</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Week 3-4: First Dashboard Example</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ms-4">
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Build complete Blog Dashboard with Supabase backend</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Implement multilingual content management</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Week 5-6: Polish & Document</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ms-4">
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Refine components based on real usage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Write comprehensive documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 2 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>Phase 2: Second Example & Refinement</CardTitle>
                      <CardDescription>6-8 weeks</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Planned</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Validate patterns with a different use case and refine components.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Build second dashboard project (Portfolio, Real Estate, or Marketplace)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Improve component APIs based on learnings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Set up GitHub Discussions and Discord community</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 3 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>Phase 3: NPM Package & Distribution</CardTitle>
                      <CardDescription>2-3 weeks</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Planned</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Package the design system for easy consumption by others.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Set up monorepo structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Publish to NPM as @noorui/components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Create installation and migration guides</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 4 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>Phase 4: Scale & Expand</CardTitle>
                      <CardDescription>Ongoing</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Planned</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Build remaining demo projects, expand to more languages, grow community.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Build 3 more demo projects (Marketplace, Analytics, CMS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Add support for more RTL languages (Urdu, Hebrew, Farsi)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Figma component library and theme builder tool</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Success Metrics */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Success Metrics</h2>
            <p className="text-muted-foreground">
              How we measure progress at each phase.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Phase 1 Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>1 complete demo deployed and publicly accessible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>10+ dashboard components fully documented</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>5+ users testing and providing feedback</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Phase 2 Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>2 demos with different use cases working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>Component reuse rate &gt; 80% between projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>50+ GitHub stars and Discord members</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Phase 3 Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>NPM package published</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>100+ weekly NPM downloads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>3+ external projects using the package</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Phase 4 Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>1000+ weekly NPM downloads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>500+ GitHub stars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>Featured in newsletters and conference talks</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* North Star */}
        <section className="mb-16">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>North Star Metric</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold mb-2">
                "Number of production applications using Noor UI in bilingual contexts"
              </p>
              <p className="text-muted-foreground">
                Not vanity metrics like stars or downloads, but <strong>real products solving real problems</strong>.
                That&apos;s what matters.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Timeline Overview</h2>
            <p className="text-muted-foreground">
              Realistic timeline from foundation to first NPM package.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-48">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Phase 1</span>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-primary rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground w-24 text-end">Weeks 1-6</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-48">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Phase 2</span>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full" />
                  <span className="text-sm text-muted-foreground w-24 text-end">Weeks 7-14</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-48">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Phase 3</span>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full" />
                  <span className="text-sm text-muted-foreground w-24 text-end">Weeks 15-17</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-48">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Phase 4</span>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full" />
                  <span className="text-sm text-muted-foreground w-24 text-end">Month 5+</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                <strong>Total to first NPM package:</strong> ~4 months<br />
                <strong>Total to 5 demo projects:</strong> ~6-8 months
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section>
          <Card className="border-primary">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Want to Follow Along?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We update this roadmap weekly. Star us on GitHub to stay informed about new components,
                  examples, and releases.
                </p>
                <div className="flex gap-3 justify-center pt-2">
                  <Link
                    href="/examples"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    View Examples
                  </Link>
                  <Link
                    href="/components"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    Browse Components
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
