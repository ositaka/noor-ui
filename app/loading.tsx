import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section Skeleton */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <Skeleton className="h-7 w-40 mx-auto rounded-lg" />
            <Skeleton className="h-16 w-full max-w-3xl mx-auto" />
            <Skeleton className="h-8 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-full max-w-xl mx-auto" />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-11 w-48" />
              <Skeleton className="h-11 w-48" />
            </div>

            {/* Live Demo Card */}
            <Card className="mt-12">
              <CardHeader className="space-y-3">
                <Skeleton className="h-7 w-48 mx-auto" />
                <Skeleton className="h-5 w-64 mx-auto" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center gap-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Features Section Skeleton */}
        <section className="container py-16 md:py-24">
          <div className="text-center space-y-4 mb-12">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="space-y-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Quick Start Section Skeleton */}
        <section className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-48 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>

            <Card>
              <CardHeader className="border-b bg-muted/30">
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="p-0">
                <Skeleton className="h-64 w-full rounded-none" />
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Skeleton className="h-11 w-48" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
