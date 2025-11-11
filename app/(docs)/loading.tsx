import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DocsLoading() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <span className="text-muted-foreground">/</span>
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Header Skeleton */}
        <div className="max-w-3xl mb-12 space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-12">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-32 mb-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-40 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full rounded-lg" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
